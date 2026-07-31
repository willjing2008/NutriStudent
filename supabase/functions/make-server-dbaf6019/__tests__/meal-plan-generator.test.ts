import { describe, expect, it, vi } from 'vitest'

vi.mock('../kv_store.tsx', () => ({
  set: vi.fn(),
  get: vi.fn(),
  del: vi.fn(),
  mset: vi.fn(),
  mget: vi.fn(),
  mdel: vi.fn(),
  escapeLikePrefix: (prefix: string) => prefix,
  getByPrefix: vi.fn(),
}))

import { generateMealPlanFromRecipes } from '../meal-plan-generator.ts'
import { makeRecipe } from './factory.ts'

const pool = () => [
  makeRecipe({ id: 1, recipe_category: 'Breakfast', ingredients: ['oats'], cost_per_serving_gbp: 3.5 }),
  makeRecipe({ id: 2, recipe_category: 'Lunch', ingredients: ['rice'], cost_per_serving_gbp: 4.25 }),
  makeRecipe({ id: 3, recipe_category: 'Dinner', ingredients: ['pasta'], cost_per_serving_gbp: 4.26 }),
]

describe('generateMealPlanFromRecipes hard cap', () => {
  it('builds every generated meal from the affordable set', () => {
    const plan = generateMealPlanFromRecipes(
      pool(),
      3,
      4.25,
      'study',
      60,
      2,
      [],
      ['breakfast', 'lunch', 'dinner'],
      [],
    )

    expect(plan.noMatchReason).toBeNull()
    expect(plan.meals).toHaveLength(6)
    expect(plan.meals.every((meal) => meal.totalCost <= 4.25)).toBe(true)
    expect(plan.meals.some((meal) => meal.id === '3')).toBe(false)
    expect(plan).toMatchObject({
      budgetPerMealGbp: 4.25,
      totalBudgetGbp: 25.5,
      dailyBudget: 12.75,
      withinBudget: true,
      overBudgetMealCount: 0,
    })
  })

  it('returns budget no-match only after safety filters have candidates', () => {
    const plan = generateMealPlanFromRecipes(
      pool().map((recipe) => ({ ...recipe, cost_per_serving_gbp: 4.26 })),
      3,
      4.25,
      'study',
      60,
      1,
    )
    expect(plan.meals).toEqual([])
    expect(plan.noMatchReason).toBe('budget')
  })

  it('reports preference no-match before budget when avoided food removes the pool', () => {
    const plan = generateMealPlanFromRecipes(
      [makeRecipe({ ingredients: ['almonds'], cost_per_serving_gbp: 2 })],
      1,
      4.25,
      'study',
      60,
      1,
      ['Nuts'],
    )
    expect(plan.meals).toEqual([])
    expect(plan.noMatchReason).toBe('preferences')
  })
})
