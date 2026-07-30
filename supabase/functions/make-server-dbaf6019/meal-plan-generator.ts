import type { NewRecipe } from './recipe-data.ts'
import { toMealPlanMeal } from './recipe-adapter.ts'
import {
  buildRotationSchedule,
  computeIngredientKeywords,
  selectAllCoreRecipes,
  type ScoredRecipe,
} from './ingredient-overlap.ts'
import { filterRecipes } from './meal-filter.ts'
import { buildGoalBias } from './recipe-score.ts'
import {
  assertMealsWithinBudget,
  filterRecipesByBudget,
  summarizeMealBudget,
} from './recipe-budget.ts'

export function generateMealPlanFromRecipes(
  recipes: NewRecipe[],
  mealsPerDay: number,
  budgetPerMealGbp: number,
  goal: string,
  maxCookingTime?: number,
  cookingDays: number = 7,
  avoidIngredients?: string[],
  selectedMealSlots?: string[],
  dietaryRestrictions?: string[],
) {
  const totalMealsNeeded = cookingDays * mealsPerDay
  const filteredRecipes = filterRecipes(recipes, {
    avoidIngredients,
    dietaryRestrictions,
    maxCookingTime,
  })
  if (filteredRecipes.length === 0) {
    return emptyMealPlan('preferences', budgetPerMealGbp, cookingDays, totalMealsNeeded, mealsPerDay)
  }

  // Safety preferences are applied first. Budget is then a hard filter and is
  // never relaxed, including when the cooking-time filter used its fallback.
  const affordableRecipes = filterRecipesByBudget(filteredRecipes, budgetPerMealGbp)
  if (affordableRecipes.length === 0) {
    return emptyMealPlan('budget', budgetPerMealGbp, cookingDays, totalMealsNeeded, mealsPerDay)
  }

  const toScored = (recipe: NewRecipe): ScoredRecipe => ({
    recipe,
    keywords: computeIngredientKeywords(recipe),
  })
  const breakfastPool = affordableRecipes
    .filter((recipe) => ['Breakfast', 'Brunch'].includes(recipe.recipe_category || ''))
    .map(toScored)
  const lunchPool = affordableRecipes
    .filter((recipe) => ['Lunch', 'Salad', 'Sandwich', 'Soup'].includes(recipe.recipe_category || ''))
    .map(toScored)
  const dinnerPool = affordableRecipes
    .filter((recipe) => !['Breakfast', 'Brunch', 'Lunch', 'Salad', 'Sandwich', 'Soup'].includes(recipe.recipe_category || ''))
    .map(toScored)
  const allScored = affordableRecipes.map(toScored)
  const ensurePool = (pool: ScoredRecipe[]) => pool.length > 0 ? pool : allScored

  const coreRecipes = selectAllCoreRecipes(
    ensurePool(breakfastPool),
    ensurePool(lunchPool),
    ensurePool(dinnerPool),
    undefined,
    buildGoalBias(goal),
  )
  const schedule = buildRotationSchedule(
    coreRecipes,
    mealsPerDay,
    cookingDays,
    selectedMealSlots,
  )
  const meals = schedule.flatMap((day) =>
    day.meals.map((meal) =>
      toMealPlanMeal(meal.recipe, day.dayNumber, meal.mealNumber, meal.slot)
    )
  )
  assertMealsWithinBudget(meals, budgetPerMealGbp)
  const budgetSummary = summarizeMealBudget(meals, budgetPerMealGbp)

  return {
    meals,
    ...budgetSummary,
    // Deprecated aliases retained for installed clients during one compatibility release.
    dailyBudget: budgetSummary.totalBudgetGbp / cookingDays,
    weeklyBudget: budgetSummary.totalBudgetGbp,
    cookingDays,
    totalMealsNeeded,
    mealsPerDay,
    noMatchReason: null as null,
  }
}

function emptyMealPlan(
  noMatchReason: 'preferences' | 'budget',
  budgetPerMealGbp: number,
  cookingDays: number,
  totalMealsNeeded: number,
  mealsPerDay: number,
) {
  const budgetSummary = summarizeMealBudget([], budgetPerMealGbp)
  return {
    meals: [],
    ...budgetSummary,
    dailyBudget: budgetSummary.totalBudgetGbp / cookingDays,
    weeklyBudget: 0,
    cookingDays,
    totalMealsNeeded,
    mealsPerDay,
    noMatchReason,
  }
}
