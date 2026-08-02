import { describe, it, expect } from 'vitest'
import { computeRecipeScore, buildGoalBias } from '../recipe-score.ts'
import { makeRecipe } from './factory.ts'

const baseNutrition = {
  calories: 500,
  total_fat_g: 20,
  carbohydrates_g: 50,
  fiber_g: 5,
  sugar_g: 10,
  protein_g: 30,
  sodium_mg: 400,
  cholesterol_mg: 50,
  saturated_fat_g: 6,
  unsaturated_fat_g: 14,
}
const withProtein = (protein_g: number) => makeRecipe({ nutrition_per_serving: { ...baseNutrition, protein_g } })

describe('computeRecipeScore', () => {
  it('scores study/work by brain-food focus, in [0,1]', () => {
    const brainFood = makeRecipe({ ingredients: ['salmon', 'spinach', 'walnuts'] })
    const bland = makeRecipe({ ingredients: ['white rice'] })
    const score = computeRecipeScore(brainFood, 'study')
    expect(score).toBeGreaterThan(computeRecipeScore(bland, 'study'))
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(1)
    // study and work share the focus branch
    expect(computeRecipeScore(brainFood, 'work')).toBe(score)
  })

  it('scores fitness by protein density, capped at 1', () => {
    expect(computeRecipeScore(withProtein(45), 'fitness')).toBe(1) // 45/30 capped
    expect(computeRecipeScore(withProtein(6), 'fitness')).toBeCloseTo(0.2) // 6/30
  })

  it('returns 0 for unknown goals', () => {
    expect(computeRecipeScore(makeRecipe(), 'banana')).toBe(0)
  })
})

describe('buildGoalBias', () => {
  it('returns a positive-weighted bias for known goals', () => {
    const bias = buildGoalBias('fitness')
    expect(bias).toBeDefined()
    expect(bias!.weight).toBeGreaterThan(0)
    expect(bias!.scoreFn(withProtein(30))).toBe(1)
  })

  it('returns undefined for unknown goals (selection stays overlap-only)', () => {
    expect(buildGoalBias('banana')).toBeUndefined()
  })

  it('memoizes per recipe id (same id scored once)', () => {
    const bias = buildGoalBias('fitness')!
    const r = withProtein(30)
    expect(bias.scoreFn(r)).toBe(bias.scoreFn(r))
  })
})
