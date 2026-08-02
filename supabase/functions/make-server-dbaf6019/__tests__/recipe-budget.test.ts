import { describe, expect, it } from 'vitest'
import { makeRecipe } from './factory.ts'
import {
  assertMealsWithinBudget,
  BudgetNoMatchError,
  filterRecipesByBudget,
  noBudgetMatchMessage,
  summarizeMealBudget,
} from '../recipe-budget.ts'

describe('hard recipe budget filter', () => {
  it('keeps recipes at or below the cap and rejects recipes one penny over', () => {
    const recipes = [
      makeRecipe({ id: 1, cost_per_serving_gbp: 3.99 }),
      makeRecipe({ id: 2, cost_per_serving_gbp: 4.25 }),
      makeRecipe({ id: 3, cost_per_serving_gbp: 4.26 }),
    ]
    expect(filterRecipesByBudget(recipes, 4.25).map((recipe) => recipe.id)).toEqual([1, 2])
  })

  it('treats unpriced recipes as the existing £2.50 fallback', () => {
    const unpriced = makeRecipe({ id: 1, cost_per_serving_gbp: undefined })
    expect(filterRecipesByBudget([unpriced], 2.49)).toEqual([])
    expect(filterRecipesByBudget([unpriced], 2.5)).toEqual([unpriced])
  })

  it('returns the approved actionable no-match message', () => {
    expect(noBudgetMatchMessage(4.25)).toBe(
      'No recipes fit your £4.25 per-meal budget. Increase your budget and try again.',
    )
    const error = new BudgetNoMatchError(4.25)
    expect(error.name).toBe('BudgetNoMatchError')
    expect(error.message).toBe(noBudgetMatchMessage(4.25))
  })
})

describe('meal plan budget invariant', () => {
  const meals = [{ totalCost: 3.5 }, { totalCost: 4.25 }, { totalCost: 4.26 }]

  it('summarizes real totals and over-budget meal count', () => {
    expect(summarizeMealBudget(meals, 4.25)).toEqual({
      budgetPerMealGbp: 4.25,
      totalBudgetGbp: 12.75,
      totalCost: 12.01,
      withinBudget: false,
      overBudgetMealCount: 1,
    })
  })

  it('treats missing or non-finite meal cost as an invariant violation', () => {
    expect(summarizeMealBudget([{}, { totalCost: Number.NaN }], 4.25)).toEqual({
      budgetPerMealGbp: 4.25,
      totalBudgetGbp: 8.5,
      totalCost: Number.POSITIVE_INFINITY,
      withinBudget: false,
      overBudgetMealCount: 2,
    })
  })

  it('throws if an adapter ever produces an over-cap generated meal', () => {
    expect(() => assertMealsWithinBudget(meals, 4.25)).toThrow(/hard budget cap/)
    expect(() => assertMealsWithinBudget(meals.slice(0, 2), 4.25)).not.toThrow()
  })
})
