import { describe, it, expect } from 'vitest'
import { classifyRecipe } from '../focus-classifier.ts'
import { makeRecipe } from './factory.ts'

describe('classifyRecipe — focus', () => {
  it('promotes focus when >=2 brain-food ingredients meet nutrition thresholds', () => {
    // default nutrition: protein 30, fiber 5, sugar 10 -> meets thresholds
    const recipe = makeRecipe({ ingredients: ['2 fillets salmon', '1 cup spinach'] })
    const result = classifyRecipe(recipe)
    expect(result.promotes_focus).toBe(true)
    expect(result.focus_ingredients_found).toEqual(expect.arrayContaining(['salmon', 'spinach']))
    expect(result.focus_ingredients_found).toHaveLength(2)
    // 2 ingredients * 2 + 3 nutrition bonuses = 7
    expect(result.focus_score).toBe(7)
  })

  it('does not promote focus when nutrition thresholds fail, but still scores ingredients', () => {
    const recipe = makeRecipe({
      ingredients: ['2 fillets salmon', '1 cup spinach'],
      nutrition_per_serving: { protein_g: 5, fiber_g: 1, sugar_g: 30 },
    })
    const result = classifyRecipe(recipe)
    expect(result.promotes_focus).toBe(false)
    // 2 ingredients * 2 + 0 nutrition bonus = 4
    expect(result.focus_score).toBe(4)
  })

  it('requires at least two focus ingredients even with great nutrition', () => {
    const recipe = makeRecipe({ ingredients: ['2 fillets salmon', '1 onion'] })
    const result = classifyRecipe(recipe)
    expect(result.promotes_focus).toBe(false)
    expect(result.focus_ingredients_found).toEqual(['salmon'])
  })

  it('caps the focus score at 10', () => {
    const recipe = makeRecipe({
      ingredients: ['2 fillets salmon', '1 cup spinach', 'handful walnuts', '1 avocado', '1 cup blueberries', '2 eggs'],
    })
    const result = classifyRecipe(recipe)
    expect(result.promotes_focus).toBe(true)
    expect(result.focus_score).toBe(10)
  })
})

describe('classifyRecipe — sleep', () => {
  it('promotes sleep when >=2 sleep ingredients and no disruptors', () => {
    const recipe = makeRecipe({ ingredients: ['1 cup milk', '2 bananas'] })
    const result = classifyRecipe(recipe)
    expect(result.promotes_sleep).toBe(true)
    expect(result.sleep_ingredients_found).toEqual(expect.arrayContaining(['milk', 'banana']))
    // 2 ingredients * 2.5 = 5
    expect(result.sleep_score).toBe(5)
  })

  it('disqualifies sleep and zeroes the score when a disruptor is present', () => {
    const recipe = makeRecipe({ ingredients: ['1 cup milk', '2 bananas', '1 tbsp cocoa powder'] })
    const result = classifyRecipe(recipe)
    expect(result.promotes_sleep).toBe(false)
    expect(result.sleep_score).toBe(0)
  })
})

describe('classifyRecipe — neutral recipes', () => {
  it('returns all-false / zero for a recipe with no relevant ingredients', () => {
    const recipe = makeRecipe({
      ingredients: ['2 cups flour', '1 cup white sugar'],
      nutrition_per_serving: { protein_g: 2, fiber_g: 0, sugar_g: 50 },
    })
    const result = classifyRecipe(recipe)
    expect(result).toEqual({
      promotes_focus: false,
      focus_score: 0,
      promotes_sleep: false,
      sleep_score: 0,
      focus_ingredients_found: [],
      sleep_ingredients_found: [],
    })
  })
})
