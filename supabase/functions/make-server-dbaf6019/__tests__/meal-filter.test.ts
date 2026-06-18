import { describe, it, expect } from 'vitest'
import { filterRecipes, dietaryForbiddenKeywords } from '../meal-filter.ts'
import { makeRecipe } from './factory.ts'

const recipe = (id: number, ingredients: string[], time = 30) =>
  makeRecipe({ id, name: `Recipe ${id}`, ingredients, total_time_minutes: time })

describe('dietaryForbiddenKeywords', () => {
  it('expands vegan to meat, fish and dairy/egg keywords', () => {
    const words = dietaryForbiddenKeywords(['vegan'])
    expect(words).toContain('chicken')
    expect(words).toContain('salmon')
    expect(words).toContain('cheese')
  })

  it('is case-insensitive and ignores unknown restrictions', () => {
    expect(dietaryForbiddenKeywords(['VEGAN'])).toContain('chicken')
    expect(dietaryForbiddenKeywords(['paleo-unknown'])).toEqual([])
  })

  it('deduplicates keywords shared across restrictions', () => {
    const words = dietaryForbiddenKeywords(['vegetarian', 'vegan'])
    expect(words.filter(w => w === 'chicken')).toHaveLength(1)
  })
})

describe('filterRecipes', () => {
  it('returns the full pool when no options are given', () => {
    const pool = [recipe(1, ['oats']), recipe(2, ['rice'])]
    expect(filterRecipes(pool)).toHaveLength(2)
  })

  it('excludes recipes containing an avoided ingredient (substring match)', () => {
    const pool = [recipe(1, ['peanut butter']), recipe(2, ['oats'])]
    const out = filterRecipes(pool, { avoidIngredients: ['peanut'] })
    expect(out.map(r => r.id)).toEqual([2])
  })

  it('excludes meat recipes for a vegan restriction', () => {
    const pool = [recipe(1, ['chicken breast']), recipe(2, ['tofu', 'rice'])]
    const out = filterRecipes(pool, { dietaryRestrictions: ['vegan'] })
    expect(out.map(r => r.id)).toEqual([2])
  })

  it('excludes high-carb legumes for keto but keeps keto-friendly greens', () => {
    const pool = [
      recipe(1, ['red lentil', 'stock']),
      recipe(2, ['kidney bean', 'tomato']),
      recipe(3, ['green beans', 'olive oil']),
    ]
    const out = filterRecipes(pool, { dietaryRestrictions: ['keto'] })
    expect(out.map(r => r.id)).toEqual([3])
  })

  // The launch-blocking safety regression: when every recipe in the goal-pool
  // violates the diet, the result MUST be empty — never the forbidden recipes.
  it('returns [] (never forbidden food) when no recipe satisfies the diet', () => {
    const pool = [recipe(1, ['chicken']), recipe(2, ['beef']), recipe(3, ['salmon'])]
    expect(filterRecipes(pool, { dietaryRestrictions: ['vegan'] })).toEqual([])
  })

  it('relaxes maxCookingTime when it would empty the pool', () => {
    const pool = [recipe(1, ['oats'], 60), recipe(2, ['rice'], 90)]
    // No recipe is within 15 min, so the time preference is relaxed.
    expect(filterRecipes(pool, { maxCookingTime: 15 })).toHaveLength(2)
  })

  it('never reintroduces forbidden food when relaxing maxCookingTime', () => {
    // Vegan pick is slow (60 min); the fast pick (10 min) contains meat.
    const pool = [recipe(1, ['tofu'], 60), recipe(2, ['chicken'], 10)]
    const out = filterRecipes(pool, { dietaryRestrictions: ['vegan'], maxCookingTime: 15 })
    // Time relaxes to the dietary-safe set — the vegan recipe, not the chicken.
    expect(out.map(r => r.id)).toEqual([1])
  })

  it('keeps recipes within maxCookingTime when some qualify', () => {
    const pool = [recipe(1, ['oats'], 10), recipe(2, ['rice'], 90)]
    expect(filterRecipes(pool, { maxCookingTime: 30 }).map(r => r.id)).toEqual([1])
  })
})
