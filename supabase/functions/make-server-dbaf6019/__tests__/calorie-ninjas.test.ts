import { describe, it, expect } from 'vitest'
import { buildIngredientQuery } from '../calorie-ninjas.ts'

describe('buildIngredientQuery', () => {
  it('treats negligible amounts as 1g', () => {
    expect(buildIngredientQuery('basil', 'to taste')).toBe('1g basil')
    expect(buildIngredientQuery('salt', 'pinch')).toBe('1g salt')
    expect(buildIngredientQuery('parsley', 'for garnish')).toBe('1g parsley')
  })

  it('extracts the weight from package descriptions', () => {
    expect(buildIngredientQuery('tomatoes', '400g tin')).toBe('400g tomatoes')
    expect(buildIngredientQuery('beans', '200g can')).toBe('200g beans')
  })

  it('approximates cm-based sizes at 5g per cm', () => {
    expect(buildIngredientQuery('ginger', '5cm piece')).toBe('25g ginger')
  })

  it('passes standard amounts through unchanged', () => {
    expect(buildIngredientQuery('flour', '2 cups')).toBe('2 cups flour')
    expect(buildIngredientQuery('garlic', '3 cloves')).toBe('3 cloves garlic')
  })
})
