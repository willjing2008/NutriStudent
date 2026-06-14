import { describe, it, expect } from 'vitest'
import { categorizeIngredient } from './ingredientCategory'

describe('categorizeIngredient', () => {
  it('categorizes produce', () => {
    for (const n of ['Romaine Lettuce', 'cherry tomatoes', 'Celery', 'Seedless Grapes', 'Avocado'])
      expect(categorizeIngredient(n)).toBe('produce')
  })

  it('categorizes dairy & eggs', () => {
    for (const n of ['Butter', 'Whole Milk', 'Cheddar Cheese', 'Egg', 'Greek Yogurt'])
      expect(categorizeIngredient(n)).toBe('dairy')
  })

  it('categorizes meat & fish', () => {
    for (const n of ['Chicken Breast', 'Ground Beef', 'Salmon Fillet', 'Smoked Bacon', 'Tuna'])
      expect(categorizeIngredient(n)).toBe('meat')
  })

  it('categorizes bakery', () => {
    for (const n of ['Sourdough Bread', 'Bagel', 'Flour Tortilla', 'Blueberry Muffin'])
      expect(categorizeIngredient(n)).toBe('bakery')
  })

  it('categorizes frozen', () => {
    for (const n of ['Frozen Peas', 'Vanilla Ice Cream'])
      expect(categorizeIngredient(n)).toBe('frozen')
  })

  it('defaults to pantry for dry/unknown goods', () => {
    for (const n of ['Salt', 'Olive Oil', 'White Rice', 'Baking Powder'])
      expect(categorizeIngredient(n)).toBe('pantry')
  })

  it('handles messy names by keyword (regression for "...Chicken Meat")', () => {
    expect(categorizeIngredient('And Chilled, Cooked Chicken Meat')).toBe('meat')
  })

  it('does not misread eggplant as dairy', () => {
    expect(categorizeIngredient('Eggplant')).toBe('produce')
  })

  it('is case-insensitive and trims', () => {
    expect(categorizeIngredient('  CHICKEN  ')).toBe('meat')
  })
})
