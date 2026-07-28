import { NewRecipe } from "./recipe-data.ts";
import { toMealPlanMeal, getRecipesByFocusType } from "./recipe-adapter.ts";
import { computeIngredientKeywords, selectAllCoreRecipes, buildRotationSchedule, ScoredRecipe } from "./ingredient-overlap.ts";
import { classifyRecipe } from "./focus-classifier.ts";
import { filterRecipes } from "./meal-filter.ts";
import {
  LEGACY_QUEUE_BUDGET_PER_MEAL_GBP,
  parseBudgetPerMealGbp,
} from "../_shared/budget-contract.ts";
import {
  assertMealsWithinBudget,
  BudgetNoMatchError,
  filterRecipesByBudget,
  isCostWithinBudget,
  summarizeMealBudget,
} from "./recipe-budget.ts";

// ── Types ────────────────────────────────────────────────────────────

export interface QueuedMeal {
  recipeId: string;
  recipe: ReturnType<typeof toMealPlanMeal>;
  dayNumber: number;          // 1-28
  mealSlot: "breakfast" | "lunch" | "dinner";
  mealNumber: number;
  isConsumed: boolean;
  swappedFrom?: string;
}

export interface RecipeQueue {
  userId: string;
  queueId: string;
  createdAt: string;
  focusMode: boolean;
  meals: QueuedMeal[];
  mealsPerDay: number;
  goal: string;
  budgetPerMealGbp: number;
}

export interface GenerateQueueParams {
  userId: string;
  mealsPerDay: number;
  goal: string;
  focusMode: boolean;
  budgetPerMealGbp: number;
  avoidIngredients?: string[];
  dietaryRestrictions?: string[];
  maxCookingTime?: number;
  preferSleepDinners?: boolean;
  queueDays?: number;
  selectedMealSlots?: string[];
}

// ── Helpers ──────────────────────────────────────────────────────────

function getMealSlot(mealNumber: number, mealsPerDay: number): "breakfast" | "lunch" | "dinner" {
  if (mealsPerDay === 1) return "dinner";
  if (mealsPerDay === 2) {
    return mealNumber === 1 ? "breakfast" : "dinner";
  }
  // 3+ meals
  if (mealNumber === 1) return "breakfast";
  if (mealNumber === 2) return "lunch";
  return "dinner";
}

// ── Queue Generation ─────────────────────────────────────────────────

export class QueuePreferenceNoMatchError extends Error {
  constructor() {
    super("No recipes match your dietary restrictions. Try removing some restrictions, or check back as we add more recipes.");
    this.name = "QueuePreferenceNoMatchError";
  }
}

export async function generateRecipeQueue(params: GenerateQueueParams): Promise<RecipeQueue> {
  const {
    userId,
    mealsPerDay,
    goal,
    focusMode,
    budgetPerMealGbp,
    avoidIngredients = [],
    dietaryRestrictions = [],
    maxCookingTime,
    preferSleepDinners = false,
    queueDays = 28,
    selectedMealSlots,
  } = params;

  // 1. Fetch recipes based on focus mode
  const mealTypeMap: Record<string, string> = { study: "study", work: "work", fitness: "fitness" };
  const mealType = mealTypeMap[goal] || "study";
  let recipes = await getRecipesByFocusType(mealType, focusMode);

  if (recipes.length === 0) {
    throw new Error("No recipes found. Please run /init-recipes first.");
  }

  // Dietary and avoided-ingredient rules are hard safety filters. The shared
  // filter may relax only cooking time, never food safety.
  recipes = filterRecipes(recipes, {
    avoidIngredients,
    dietaryRestrictions,
    maxCookingTime,
  });
  if (recipes.length === 0) {
    throw new QueuePreferenceNoMatchError();
  }

  // Budget is a hard filter and is never relaxed.
  const affordableRecipes = filterRecipesByBudget(recipes, budgetPerMealGbp);
  if (affordableRecipes.length === 0) {
    throw new BudgetNoMatchError(budgetPerMealGbp);
  }
  recipes = affordableRecipes;

  // 4. Categorize into pools
  const toScored = (r: NewRecipe): ScoredRecipe => ({
    recipe: r,
    keywords: computeIngredientKeywords(r),
  });

  const breakfastPool = recipes
    .filter((r) => ["Breakfast", "Brunch"].includes(r.recipe_category || ""))
    .map(toScored);
  const lunchPool = recipes
    .filter((r) => ["Lunch", "Salad", "Sandwich", "Soup"].includes(r.recipe_category || ""))
    .map(toScored);
  const dinnerPool = recipes
    .filter((r) => !["Breakfast", "Brunch", "Lunch", "Salad", "Sandwich", "Soup"].includes(r.recipe_category || ""))
    .map(toScored);

  // Fallback: if any pool is empty, use all recipes
  const allScored = recipes.map(toScored);
  const ensurePool = (pool: ScoredRecipe[]) => (pool.length > 0 ? pool : allScored);

  // 5. If preferring sleep-friendly dinners, reorder dinner pool
  let finalDinnerPool = ensurePool(dinnerPool);
  if (preferSleepDinners) {
    // Sort sleep-friendly recipes to the front
    finalDinnerPool = [...finalDinnerPool].sort((a, b) => {
      const aScore = classifyRecipe(a.recipe).sleep_score;
      const bScore = classifyRecipe(b.recipe).sleep_score;
      return bScore - aScore;
    });
  }

  // 6. Select core clusters with larger sizes for 28-day rotation
  const clusterSizes = queueDays <= 7
    ? { breakfast: 3, lunch: 4, dinner: 4 }
    : { breakfast: 6, lunch: 8, dinner: 8 };

  // No goal bias here (5th arg omitted): the queue already applies its own
  // focus/sleep steering upstream (focusMode pre-filter + preferSleepDinners).
  // Unifying onto the shared recipe-score bias is a deliberate follow-up.
  const coreRecipes = selectAllCoreRecipes(
    ensurePool(breakfastPool),
    ensurePool(lunchPool),
    finalDinnerPool,
    clusterSizes
  );

  // 7. Build rotation schedule
  const schedule = buildRotationSchedule(coreRecipes, mealsPerDay, queueDays, selectedMealSlots);

  // 8. Convert to QueuedMeal format
  const meals: QueuedMeal[] = [];
  for (const day of schedule) {
    for (const m of day.meals) {
      const mealPlanMeal = toMealPlanMeal(m.recipe, day.dayNumber, m.mealNumber, m.slot);
      meals.push({
        recipeId: String(m.recipe.id),
        recipe: mealPlanMeal,
        dayNumber: day.dayNumber,
        mealSlot: (m.slot as "breakfast" | "lunch" | "dinner") || getMealSlot(m.mealNumber, mealsPerDay),
        mealNumber: m.mealNumber,
        isConsumed: false,
      });
    }
  }

  assertMealsWithinBudget(meals.map((meal) => meal.recipe), budgetPerMealGbp);

  const queueId = crypto.randomUUID();
  return {
    userId,
    queueId,
    createdAt: new Date().toISOString(),
    focusMode,
    meals,
    mealsPerDay,
    goal,
    budgetPerMealGbp,
  };
}

// ── Queue Week Extraction ────────────────────────────────────────────

/** Extract a week slice from the queue in the MealPlan shape the frontend expects. */
export function getQueueWeekAsMealPlan(
  queue: RecipeQueue,
  weekNumber: number,
) {
  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = startDay + 6;

  const weekMeals = queue.meals
    .filter((m) => m.dayNumber >= startDay && m.dayNumber <= endDay)
    .map((m) => ({
      ...m.recipe,
      // Remap dayNumber to 1-7 for the week view
      dayNumber: m.dayNumber - startDay + 1,
      // The queue slot is the single source of truth for mutations
      // (queue-swap-meal / mark-queue-meal-consumed key on absolute day +
      // mealSlot). recipe.category can drift from mealSlot after a swap, so
      // both are carried explicitly.
      queueDayNumber: m.dayNumber,
      mealSlot: m.mealSlot,
      isConsumed: m.isConsumed,
    }));

  const budgetPerMealGbp = parseBudgetPerMealGbp(queue.budgetPerMealGbp)
    ?? LEGACY_QUEUE_BUDGET_PER_MEAL_GBP;
  const budgetSummary = summarizeMealBudget(weekMeals, budgetPerMealGbp);

  return {
    meals: weekMeals,
    ...budgetSummary,
    // Deprecated aliases for installed clients during the compatibility window.
    dailyBudget: budgetPerMealGbp,
    weeklyBudget: budgetSummary.totalBudgetGbp,
    cookingDays: 7,
    totalMealsNeeded: 7 * queue.mealsPerDay,
    mealsPerDay: queue.mealsPerDay,
    weekNumber,
    totalWeeks: Math.ceil(queue.meals.length / (7 * queue.mealsPerDay)) || 4,
  };
}

// ── Queue Shopping List ──────────────────────────────────────────────

export interface ShoppingIngredient {
  name: string;
  amount: string;
  category: "dairy" | "produce" | "meat" | "pantry" | "frozen" | "bakery";
  estimatedPrice: number;
  checked: boolean;
}

/** Extract and deduplicate ingredients for a given week of the queue. */
export function getQueueWeekShoppingList(
  queue: RecipeQueue,
  weekNumber: number
): ShoppingIngredient[] {
  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = startDay + 6;

  const weekMeals = queue.meals.filter(
    (m) => m.dayNumber >= startDay && m.dayNumber <= endDay
  );

  const ingredientMap = new Map<string, ShoppingIngredient>();
  for (const meal of weekMeals) {
    for (const ing of meal.recipe.ingredients) {
      const key = ing.name.toLowerCase().trim();
      if (!ingredientMap.has(key)) {
        ingredientMap.set(key, {
          name: ing.name,
          amount: ing.amount,
          category: ing.category,
          estimatedPrice: ing.estimatedPrice,
          checked: false,
        });
      }
    }
  }

  return Array.from(ingredientMap.values());
}

// ── Queue Swap ───────────────────────────────────────────────────────

/** Swap a meal in the queue. Returns updated queue. */
export function swapQueueMeal(
  queue: RecipeQueue,
  dayNumber: number,
  mealSlot: string,
  newRecipe: ReturnType<typeof toMealPlanMeal>
): RecipeQueue {
  const budgetPerMealGbp = parseBudgetPerMealGbp(queue.budgetPerMealGbp)
    ?? LEGACY_QUEUE_BUDGET_PER_MEAL_GBP;
  if (!isCostWithinBudget(newRecipe.totalCost, budgetPerMealGbp)) {
    throw new BudgetNoMatchError(budgetPerMealGbp);
  }

  const updatedMeals = queue.meals.map((m) => {
    if (m.dayNumber === dayNumber && m.mealSlot === mealSlot) {
      return {
        ...m,
        swappedFrom: m.recipeId,
        recipeId: newRecipe.id,
        recipe: newRecipe,
      };
    }
    return m;
  });

  return { ...queue, meals: updatedMeals };
}
