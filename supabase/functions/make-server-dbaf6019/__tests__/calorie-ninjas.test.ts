import { describe, it, expect, vi, afterEach } from 'vitest'
import { buildIngredientQuery, queryIngredientNutrition, calculateRecipeNutrition } from '../calorie-ninjas.ts'

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

// Minimal CalorieNinjas item shape (only fields the summing logic reads).
const item = (over: Record<string, number> = {}) => ({
  calories: 0,
  protein_g: 0,
  carbohydrates_total_g: 0,
  fat_total_g: 0,
  fiber_g: 0,
  ...over,
})

const stubFetch = (impl: () => unknown) => {
  const mock = vi.fn(async () => impl())
  vi.stubGlobal('fetch', mock)
  return mock
}

const okResponse = (body: unknown) => ({ ok: true, status: 200, statusText: 'OK', json: async () => body })

describe('queryIngredientNutrition', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('sums and rounds nutrition from the API response', async () => {
    stubFetch(() =>
      okResponse({
        items: [
          item({ calories: 100, protein_g: 10, carbohydrates_total_g: 20, fat_total_g: 5, fiber_g: 3 }),
          item({ calories: 50, protein_g: 5.04, carbohydrates_total_g: 10, fat_total_g: 2, fiber_g: 1 }),
        ],
      }),
    )
    const result = await queryIngredientNutrition('key', 'rice', '1 cup')
    expect(result.normalizedQuery).toBe('1 cup rice')
    expect(result.nutrition).toEqual({ calories: 150, protein: 15, carbs: 30, fats: 7, fiber: 4 })
  })

  it('rounds protein to one decimal place', async () => {
    stubFetch(() => okResponse({ items: [item({ protein_g: 12.34 })] }))
    const result = await queryIngredientNutrition('key', 'tofu', '100g')
    expect(result.nutrition?.protein).toBe(12.3)
  })

  it('returns an error result when the API responds non-OK', async () => {
    stubFetch(() => ({ ok: false, status: 429, statusText: 'Too Many Requests', json: async () => ({}) }))
    const result = await queryIngredientNutrition('key', 'rice', '1 cup')
    expect(result.nutrition).toBeNull()
    expect(result.error).toBe('API returned 429: Too Many Requests')
  })

  it('returns a warning when no items are found', async () => {
    stubFetch(() => okResponse({ items: [] }))
    const result = await queryIngredientNutrition('key', 'unobtainium', '1g')
    expect(result.nutrition).toBeNull()
    expect(result.warning).toContain('No nutrition data found')
  })

  it('captures thrown errors from fetch', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    const result = await queryIngredientNutrition('key', 'rice', '1 cup')
    expect(result.nutrition).toBeNull()
    expect(result.error).toBe('network down')
  })
})

describe('calculateRecipeNutrition', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('aggregates ingredients and divides by servings', async () => {
    stubFetch(() => okResponse({ items: [item({ calories: 100, protein_g: 10 })] }))
    const result = await calculateRecipeNutrition('key', [{ name: 'rice', amount: '1 cup' }, { name: 'beans', amount: '1 cup' }], 2)
    expect(result.total.calories).toBe(200)
    expect(result.perServing.calories).toBe(100)
    expect(result.perServing.protein).toBe(10)
    expect(result.ingredientDetails).toHaveLength(2)
  })

  it('treats zero servings as one', async () => {
    stubFetch(() => okResponse({ items: [item({ calories: 100 })] }))
    const result = await calculateRecipeNutrition('key', [{ name: 'rice', amount: '1 cup' }], 0)
    expect(result.perServing.calories).toBe(100)
  })

  it('collects per-ingredient errors', async () => {
    stubFetch(() => ({ ok: false, status: 500, statusText: 'Server Error', json: async () => ({}) }))
    const result = await calculateRecipeNutrition('key', [{ name: 'rice', amount: '1 cup' }], 1)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]).toContain('rice')
  })

  it('collects per-ingredient warnings when no data is found', async () => {
    stubFetch(() => okResponse({ items: [] }))
    const result = await calculateRecipeNutrition('key', [{ name: 'rice', amount: '1 cup' }], 1)
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]).toContain('No nutrition data found')
  })
})
