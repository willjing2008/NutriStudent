import { NewRecipe } from "./recipe-data.ts";
import { toMealPlanMeal, getRecipesByFocusType, getSleepFriendlyRecipes } from "./recipe-adapter.ts";
import { computeIngredientKeywords, selectAllCoreRecipes, buildRotationSchedule, ScoredRecipe } from "./ingredient-overlap.ts";
import { classifyRecipe } from "./focus-classifier.ts";

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
}

export interface GenerateQueueParams {
  userId: string;
  mealsPerDay: number;
  goal: string;
  focusMode: boolean;
  avoidIngredients?: string[];
  maxCookingTime?: number;
  preferSleepDinners?: boolean;
  queueDays?: number;
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

export async function generateRecipeQueue(params: GenerateQueueParams): Promise<RecipeQueue> {
  const {
    userId,
    mealsPerDay,
    goal,
    focusMode,
    avoidIngredients = [],
    maxCookingTime,
    preferSleepDinners = false,
    queueDays = 28,
  } = params;

  // 1. Fetch recipes based on focus mode
  const mealTypeMap: Record<string, string> = { study: "study", work: "work", fitness: "fitness" };
  const mealType = mealTypeMap[goal] || "study";
  let recipes = await getRecipesByFocusType(mealType, focusMode);

  if (recipes.length === 0) {
    throw new Error("No recipes found. Please run /init-recipes first.");
  }

  // 2. Apply avoidIngredients filter
  if (avoidIngredients.length > 0) {
    const avoidLower = avoidIngredients.map((i) => i.toLowerCase());
    const filtered = recipes.filter((r) =>
      !avoidLower.some((avoid) =>
        r.ingredients.some((ing) => ing.toLowerCase().includes(avoid))
      )
    );
    if (filtered.length > 0) recipes = filtered;
  }

  // 3. Apply maxCookingTime filter
  if (maxCookingTime && maxCookingTime > 0) {
    const filtered = recipes.filter(
      (r) => (r.total_time_minutes ?? r.cook_time_minutes ?? 0) <= maxCookingTime
    );
    if (filtered.length > 0) recipes = filtered;
  }

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

  const coreRecipes = selectAllCoreRecipes(
    ensurePool(breakfastPool),
    ensurePool(lunchPool),
    finalDinnerPool,
    clusterSizes
  );

  // 7. Build rotation schedule
  const schedule = buildRotationSchedule(coreRecipes, mealsPerDay, queueDays);

  // 8. Convert to QueuedMeal format
  const meals: QueuedMeal[] = [];
  for (const day of schedule) {
    for (const m of day.meals) {
      const mealPlanMeal = toMealPlanMeal(m.recipe, day.dayNumber, m.mealNumber);
      meals.push({
        recipeId: String(m.recipe.id),
        recipe: mealPlanMeal,
        dayNumber: day.dayNumber,
        mealSlot: getMealSlot(m.mealNumber, mealsPerDay),
        mealNumber: m.mealNumber,
        isConsumed: false,
      });
    }
  }

  const queueId = crypto.randomUUID();
  return {
    userId,
    queueId,
    createdAt: new Date().toISOString(),
    focusMode,
    meals,
    mealsPerDay,
    goal,
  };
}

// ── Queue Week Extraction ────────────────────────────────────────────

/** Extract a week slice from the queue in the MealPlan shape the frontend expects. */
export function getQueueWeekAsMealPlan(
  queue: RecipeQueue,
  weekNumber: number,
  weeklyBudget: number = 100
) {
  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = startDay + 6;

  const weekMeals = queue.meals
    .filter((m) => m.dayNumber >= startDay && m.dayNumber <= endDay)
    .map((m) => ({
      ...m.recipe,
      // Remap dayNumber to 1-7 for the week view
      dayNumber: m.dayNumber - startDay + 1,
      isConsumed: m.isConsumed,
    }));

  return {
    meals: weekMeals,
    totalCost: 0,
    dailyBudget: weeklyBudget / 7,
    weeklyBudget,
    withinBudget: true,
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
