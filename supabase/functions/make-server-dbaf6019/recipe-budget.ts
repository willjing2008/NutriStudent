import { formatBudgetGbp, toPence } from '../_shared/budget-contract.ts'
import type { NewRecipe } from './recipe-data.ts'
import { recipeCostPerServing } from './recipe-cost.ts'

export function isCostWithinBudget(costGbp: number, budgetPerMealGbp: number): boolean {
  return Number.isFinite(costGbp) && toPence(costGbp) <= toPence(budgetPerMealGbp)
}

export function filterRecipesByBudget<T extends NewRecipe>(
  recipes: T[],
  budgetPerMealGbp: number,
): T[] {
  return recipes.filter((recipe) =>
    isCostWithinBudget(recipeCostPerServing(recipe), budgetPerMealGbp)
  )
}

export function noBudgetMatchMessage(budgetPerMealGbp: number): string {
  return `No recipes fit your ${formatBudgetGbp(budgetPerMealGbp)} per-meal budget. Increase your budget and try again.`
}

export class BudgetNoMatchError extends Error {
  constructor(budgetPerMealGbp: number) {
    super(noBudgetMatchMessage(budgetPerMealGbp))
    this.name = 'BudgetNoMatchError'
  }
}

interface MealWithCost {
  totalCost?: unknown
}

export function summarizeMealBudget(
  meals: MealWithCost[],
  budgetPerMealGbp: number,
) {
  const costs = meals.map((meal) =>
    typeof meal.totalCost === 'number' && Number.isFinite(meal.totalCost)
      ? meal.totalCost
      : Number.POSITIVE_INFINITY
  )
  const finiteTotal = costs.every(Number.isFinite)
    ? costs.reduce((sum, cost) => sum + cost, 0)
    : Number.POSITIVE_INFINITY
  const overBudgetMealCount = costs.filter(
    (cost) => !isCostWithinBudget(cost, budgetPerMealGbp),
  ).length

  return {
    budgetPerMealGbp,
    totalBudgetGbp: Math.round(budgetPerMealGbp * meals.length * 100) / 100,
    totalCost: Number.isFinite(finiteTotal)
      ? Math.round(finiteTotal * 100) / 100
      : finiteTotal,
    withinBudget: overBudgetMealCount === 0,
    overBudgetMealCount,
  }
}

export function assertMealsWithinBudget(
  meals: MealWithCost[],
  budgetPerMealGbp: number,
): void {
  const summary = summarizeMealBudget(meals, budgetPerMealGbp)
  if (!summary.withinBudget) {
    throw new Error('Generated meal violated the hard budget cap')
  }
}
