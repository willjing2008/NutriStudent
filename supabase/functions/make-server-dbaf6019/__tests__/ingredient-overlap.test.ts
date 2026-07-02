import { describe, it, expect } from 'vitest'
import {
  extractBaseIngredient,
  computeIngredientKeywords,
  overlapScore,
  selectOverlapCluster,
  selectAllCoreRecipes,
  buildRotationSchedule,
  TRIVIAL_ITEMS,
  type ScoredRecipe,
  type RecipeBias,
} from '../ingredient-overlap.ts'
import { makeRecipe } from './factory.ts'

const scored = (id: number, keywords: string[]): ScoredRecipe => ({
  recipe: makeRecipe({ id, name: `Recipe ${id}` }),
  keywords: new Set(keywords),
})

const biasFrom = (scores: Record<number, number>, weight = 2): RecipeBias => ({
  scoreFn: r => scores[r.id] ?? 0,
  weight,
})

describe('extractBaseIngredient', () => {
  it('strips leading quantity and unit words', () => {
    expect(extractBaseIngredient('2 cups vanilla yogurt')).toBe('vanilla yogurt')
    expect(extractBaseIngredient('200g chicken breast')).toBe('chicken breast')
  })

  it('strips unicode fractions and units', () => {
    expect(extractBaseIngredient('½ teaspoon vanilla extract')).toBe('vanilla extract')
    expect(extractBaseIngredient('1 1/2 cups flour')).toBe('flour')
  })

  it('strips parenthetical info', () => {
    expect(extractBaseIngredient('1 (8 ounce) package cream cheese, softened')).toBe('cream cheese')
  })

  it('removes preparation adjectives', () => {
    expect(extractBaseIngredient('2 cups chopped fresh spinach')).toBe('spinach')
    expect(extractBaseIngredient('finely diced red onion')).toBe('red onion')
  })

  it('strips trailing prep after a comma', () => {
    expect(extractBaseIngredient('butter, softened')).toBe('butter')
  })

  it('strips trailing serving phrases', () => {
    expect(extractBaseIngredient('olive oil for frying')).toBe('olive oil')
    expect(extractBaseIngredient('to taste')).toBe('')
  })

  it('never strips the final remaining word even if it is a unit', () => {
    // guard against the while-loop consuming the last token
    expect(extractBaseIngredient('cup')).toBe('cup')
  })
})

describe('computeIngredientKeywords', () => {
  it('dedupes base ingredients and excludes trivial items', () => {
    const recipe = makeRecipe({
      ingredients: ['2 cups water', '1 tsp salt', '200g chicken breast', '1 chicken breast'],
    })
    const keywords = computeIngredientKeywords(recipe)
    expect(keywords).toEqual(new Set(['chicken breast']))
  })

  it('excludes ingredients that reduce to an empty base', () => {
    const recipe = makeRecipe({ ingredients: ['to taste', '1 onion'] })
    expect(computeIngredientKeywords(recipe)).toEqual(new Set(['onion']))
  })

  it('returns an empty set for a recipe with no ingredients', () => {
    expect(computeIngredientKeywords(makeRecipe({ ingredients: [] }))).toEqual(new Set())
  })
})

describe('TRIVIAL_ITEMS', () => {
  it('contains common pantry staples that should not count as overlap', () => {
    expect(TRIVIAL_ITEMS.has('water')).toBe(true)
    expect(TRIVIAL_ITEMS.has('salt')).toBe(true)
    expect(TRIVIAL_ITEMS.has('chicken breast')).toBe(false)
  })
})

describe('overlapScore', () => {
  it('scores exact matches as 1 each', () => {
    const a = new Set(['tomato', 'onion', 'garlic'])
    const b = new Set(['tomato', 'onion'])
    expect(overlapScore(a, b)).toBe(2)
  })

  it('gives partial credit when a whole word is shared', () => {
    expect(overlapScore(new Set(['cheese']), new Set(['cream cheese']))).toBe(0.5)
    expect(overlapScore(new Set(['chicken breast']), new Set(['chicken thigh']))).toBe(0.5)
  })

  it('does not false-match on raw substrings', () => {
    expect(overlapScore(new Set(['egg']), new Set(['eggplant']))).toBe(0)
    expect(overlapScore(new Set(['pea']), new Set(['peanut']))).toBe(0)
  })

  it('returns 0 for disjoint sets and for empty sets', () => {
    expect(overlapScore(new Set(['milk']), new Set(['beef']))).toBe(0)
    expect(overlapScore(new Set(), new Set(['beef']))).toBe(0)
  })
})

describe('selectOverlapCluster', () => {
  it('returns a copy of all candidates when count <= target', () => {
    const candidates = [scored(1, ['a']), scored(2, ['b'])]
    const result = selectOverlapCluster(candidates, 5, [])
    expect(result).toHaveLength(2)
    expect(result).not.toBe(candidates)
  })

  it('returns exactly targetCount when there are more candidates', () => {
    const candidates = [scored(1, ['a']), scored(2, ['b']), scored(3, ['c']), scored(4, ['d'])]
    expect(selectOverlapCluster(candidates, 2, [])).toHaveLength(2)
  })

  it('always selects the most-connected recipe as the seed', () => {
    const hub = scored(1, ['a', 'b', 'c'])
    const candidates = [hub, scored(2, ['a']), scored(3, ['b']), scored(4, ['q'])]
    const result = selectOverlapCluster(candidates, 2, [])
    expect(result.map((r) => r.recipe.id)).toContain(1)
  })

  it('a zero bias leaves selection identical to no bias (regression guard)', () => {
    const candidates = [scored(1, ['x']), scored(2, ['x']), scored(3, ['y']), scored(4, ['x'])]
    const without = selectOverlapCluster(candidates, 2, []).map((r) => r.recipe.id)
    const zeroBias = selectOverlapCluster(candidates, 2, [], { scoreFn: () => 0, weight: 5 }).map((r) => r.recipe.id)
    expect(zeroBias).toEqual(without)
  })

  it('biases the seed toward the higher goal score when overlap ties', () => {
    // All four share keyword 'x' so pairwise overlap is identical — the bias decides.
    const candidates = [scored(1, ['x']), scored(2, ['x']), scored(3, ['x']), scored(4, ['x'])]
    const result = selectOverlapCluster(candidates, 2, [], biasFrom({ 1: 0.1, 2: 0.2, 3: 0.9, 4: 0.3 }))
    expect(result[0].recipe.id).toBe(3)
  })

  it('lets strong ingredient overlap outweigh the goal nudge (overlap stays dominant)', () => {
    // id1 shares ingredients with two others (high mean overlap); id4 is isolated
    // but has max goal score. At the default 0.5 weight, overlap still seats id1.
    const candidates = [scored(1, ['a', 'b']), scored(2, ['a']), scored(3, ['b']), scored(4, ['z'])]
    const result = selectOverlapCluster(candidates, 2, [], biasFrom({ 1: 0, 2: 0, 3: 0, 4: 1 }, 0.5))
    expect(result[0].recipe.id).toBe(1)
  })
})

describe('selectAllCoreRecipes', () => {
  const pool = (ids: number[]) => ids.map((id) => scored(id, ['shared', `k${id}`]))

  it('uses default cluster sizes (breakfast 3, lunch 4, dinner 4)', () => {
    const result = selectAllCoreRecipes(pool([1, 2, 3, 4, 5]), pool([6, 7, 8, 9, 10, 11]), pool([12, 13, 14, 15, 16, 17]))
    expect(result.breakfast).toHaveLength(3)
    expect(result.lunch).toHaveLength(4)
    expect(result.dinner).toHaveLength(4)
  })

  it('honours custom cluster sizes', () => {
    const result = selectAllCoreRecipes(
      pool([1, 2, 3, 4, 5, 6, 7]),
      pool([8, 9, 10, 11, 12, 13, 14, 15, 16]),
      pool([17, 18, 19, 20, 21, 22, 23, 24, 25]),
      { breakfast: 6, lunch: 8, dinner: 8 },
    )
    expect(result.breakfast).toHaveLength(6)
    expect(result.lunch).toHaveLength(8)
    expect(result.dinner).toHaveLength(8)
  })
})

describe('buildRotationSchedule', () => {
  const core = {
    breakfast: [scored(1, ['oats']), scored(2, ['egg']), scored(3, ['toast'])],
    lunch: [scored(4, ['rice']), scored(5, ['bean']), scored(6, ['wrap'])],
    dinner: [scored(7, ['pasta']), scored(8, ['curry']), scored(9, ['stew'])],
  }

  it('produces one entry per cooking day with sequential day numbers', () => {
    const schedule = buildRotationSchedule(core, 3, 7)
    expect(schedule).toHaveLength(7)
    expect(schedule.map((d) => d.dayNumber)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('fills all three slots when mealsPerDay >= 3', () => {
    const schedule = buildRotationSchedule(core, 3, 5)
    for (const day of schedule) {
      expect(day.meals.map((m) => m.slot)).toEqual(['breakfast', 'lunch', 'dinner'])
      expect(day.meals.map((m) => m.mealNumber)).toEqual([1, 2, 3])
    }
  })

  it('uses dinner only when mealsPerDay is 1', () => {
    const schedule = buildRotationSchedule(core, 1, 4)
    for (const day of schedule) {
      expect(day.meals).toHaveLength(1)
      expect(day.meals[0].slot).toBe('dinner')
    }
  })

  it('respects selectedMealSlots in canonical order', () => {
    const schedule = buildRotationSchedule(core, 2, 3, ['dinner', 'breakfast'])
    for (const day of schedule) {
      expect(day.meals.map((m) => m.slot)).toEqual(['breakfast', 'dinner'])
    }
  })

  it('pulls extra meals beyond the three slots from the dinner rotation', () => {
    const schedule = buildRotationSchedule(core, 4, 3)
    for (const day of schedule) {
      expect(day.meals).toHaveLength(4)
      expect(day.meals[3].slot).toBe('dinner')
      expect(day.meals[3].mealNumber).toBe(4)
    }
  })

  it('does not crash when a category pool is empty', () => {
    const sparse = { breakfast: [], lunch: [], dinner: core.dinner }
    const schedule = buildRotationSchedule(sparse, 3, 5)
    expect(schedule).toHaveLength(5)
  })
})
