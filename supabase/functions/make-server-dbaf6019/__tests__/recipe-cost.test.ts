import { describe, it, expect } from 'vitest'
import {
  recipeCostPerServing,
  costPerServing,
  buildBatchPrompt,
  parseBatchResponse,
  applyCosts,
  FLAT_FALLBACK_GBP,
} from '../recipe-cost.ts'
import { makeRecipe } from './factory.ts'

describe('recipeCostPerServing', () => {
  it('uses the stored estimate when present', () => {
    expect(recipeCostPerServing(makeRecipe({ cost_per_serving_gbp: 1.99 }))).toBe(1.99)
  })
  it('falls back to the flat estimate when unpriced', () => {
    expect(recipeCostPerServing(makeRecipe())).toBe(FLAT_FALLBACK_GBP)
  })
})

describe('costPerServing', () => {
  it('sums ingredients and divides by servings, rounded to 2dp', () => {
    expect(costPerServing([{ name: 'a', gbp: 1.0 }, { name: 'b', gbp: 2.0 }], '2')).toBe(1.5)
  })
  it('treats invalid/zero servings as 1', () => {
    expect(costPerServing([{ name: 'a', gbp: 3 }], '0')).toBe(3)
    expect(costPerServing([{ name: 'a', gbp: 3 }], 'abc')).toBe(3)
  })
  it('ignores non-finite ingredient prices', () => {
    expect(costPerServing([{ name: 'a', gbp: NaN }, { name: 'b', gbp: 2 }], '1')).toBe(2)
  })
})

describe('parseBatchResponse', () => {
  it('maps recipe id to priced ingredients', () => {
    const map = parseBatchResponse('[{"id":1,"ingredients":[{"name":"egg","gbp":0.3}]}]')
    expect(map.get(1)).toEqual([{ name: 'egg', gbp: 0.3 }])
  })
  it('drops malformed ingredients (bad/negative gbp, wrong types)', () => {
    const map = parseBatchResponse(
      '[{"id":1,"ingredients":[{"name":"egg","gbp":0.3},{"name":"x","gbp":-1},{"name":"y","gbp":"free"}]}]',
    )
    expect(map.get(1)).toEqual([{ name: 'egg', gbp: 0.3 }])
  })
  it('skips entries without a numeric id or an ingredients array', () => {
    const map = parseBatchResponse('[{"id":"1","ingredients":[]},{"ingredients":[]},{"id":2,"ingredients":[]}]')
    expect(map.has(2)).toBe(true)
    expect(map.size).toBe(1)
  })
  it('throws when the response is not an array', () => {
    expect(() => parseBatchResponse('{"id":1}')).toThrow()
  })
})

describe('applyCosts', () => {
  it('prices recipes present in the cost map', () => {
    const recipes = [makeRecipe({ id: 1, servings: '2' }), makeRecipe({ id: 2 })]
    const costs = new Map([[1, [{ name: 'flour', gbp: 1.0 }, { name: 'egg', gbp: 1.0 }]]])
    const [r1, r2] = applyCosts(recipes, costs)
    expect(r1.cost_per_serving_gbp).toBe(1) // (1+1)/2
    expect(r1.priced_ingredients).toHaveLength(2)
    expect(r2.cost_per_serving_gbp).toBeUndefined() // absent -> flat fallback at read time
  })
  it('leaves a recipe unchanged when its cost list is empty', () => {
    const [r] = applyCosts([makeRecipe({ id: 1 })], new Map([[1, []]]))
    expect(r.cost_per_serving_gbp).toBeUndefined()
  })
})

describe('buildBatchPrompt', () => {
  it('includes each recipe id and its ingredients', () => {
    const prompt = buildBatchPrompt([makeRecipe({ id: 7, ingredients: ['2 eggs'] })])
    expect(prompt).toContain('"id":7')
    expect(prompt).toContain('2 eggs')
  })
})
