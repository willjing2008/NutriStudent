import { describe, it, expect } from 'vitest'
import { getNutritionTargets } from './nutritionTargets'

describe('getNutritionTargets', () => {
  it('returns male targets for "male"', () => {
    expect(getNutritionTargets('male')).toEqual({
      calories: 2500,
      protein: 75,
      carbs: 300,
      fats: 80,
      fiber: 35,
    })
  })

  it('returns female targets for "female"', () => {
    expect(getNutritionTargets('female').calories).toBe(2000)
  })

  it('falls back to "decline" targets when gender is null', () => {
    expect(getNutritionTargets(null)).toEqual(getNutritionTargets('decline'))
  })

  it('falls back to "decline" targets for an unknown value', () => {
    // @ts-expect-error — exercising the runtime guard against bad input
    expect(getNutritionTargets('other')).toEqual(getNutritionTargets('decline'))
  })
})
