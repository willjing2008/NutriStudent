import { describe, it, expect, vi, beforeEach } from 'vitest'

// kv_store loads `jsr:@supabase/supabase-js` and reads Deno.env at module top
// level — neither resolves under Node/Vitest. The functions under test
// (toMealPlanMeal / toSwapOption) are pure and never touch kv, so we replace
// the module entirely to make the import graph loadable.
vi.mock('../kv_store.tsx', () => ({
  set: vi.fn(),
  get: vi.fn(),
  del: vi.fn(),
  mset: vi.fn(),
  mget: vi.fn(),
  mdel: vi.fn(),
  escapeLikePrefix: (p: string) => p,
  getByPrefix: vi.fn(),
}))

import {
  toMealPlanMeal,
  toSwapOption,
  getRecipesByMealType,
  getAllRecipesFromDB,
  getRecipesByFocusType,
  getSleepFriendlyRecipes,
} from '../recipe-adapter.ts'
import * as kv from '../kv_store.tsx'
import { makeRecipe } from './factory.ts'

describe('toMealPlanMeal', () => {
  it('maps core fields and stringifies the id', () => {
    const recipe = makeRecipe({ id: 42, name: 'Veggie Bowl', servings: '4' })
    const meal = toMealPlanMeal(recipe, 3, 2, 'lunch')
    expect(meal.id).toBe('42')
    expect(meal.name).toBe('Veggie Bowl')
    expect(meal.servings).toBe(4)
    expect(meal.dayNumber).toBe(3)
    expect(meal.mealNumber).toBe(2)
  })

  it('uses the assigned slot for mealType label and category', () => {
    const meal = toMealPlanMeal(makeRecipe({ recipe_category: 'Soup' }), 1, 1, 'breakfast')
    expect(meal.category).toBe('breakfast')
    expect(meal.mealType).toBe('Breakfast')
  })

  it('falls back to the recipe category slot when no slot is assigned', () => {
    // recipe_category "Salad" maps to the lunch slot
    const meal = toMealPlanMeal(makeRecipe({ recipe_category: 'Salad' }), 1, 1)
    expect(meal.category).toBe('lunch')
    expect(meal.mealType).toBe('Lunch')
  })

  it('strips quantities and units from ingredient names while keeping the raw amount', () => {
    const recipe = makeRecipe({
      ingredients: ['2 cups vanilla yogurt', '1/2 teaspoon salt', '8 blackberries'],
    })
    const meal = toMealPlanMeal(recipe, 1, 1, 'breakfast')
    expect(meal.ingredients.map((i) => i.name)).toEqual(['Vanilla Yogurt', 'Salt', 'Blackberries'])
    expect(meal.ingredients[0].amount).toBe('2 cups vanilla yogurt')
    expect(meal.ingredients[0].category).toBe('pantry')
  })

  it('infers difficulty from total cooking time', () => {
    expect(toMealPlanMeal(makeRecipe({ total_time_minutes: null }), 1, 1).difficulty).toBe('easy')
    expect(toMealPlanMeal(makeRecipe({ total_time_minutes: 15 }), 1, 1).difficulty).toBe('easy')
    expect(toMealPlanMeal(makeRecipe({ total_time_minutes: 45 }), 1, 1).difficulty).toBe('medium')
    expect(toMealPlanMeal(makeRecipe({ total_time_minutes: 60 }), 1, 1).difficulty).toBe('hard')
  })

  it('derives nutrition benefits from the per-serving macros', () => {
    // defaults: protein 30, fiber 5, calories 500 -> High Protein, High Fiber, Energy Dense
    const meal = toMealPlanMeal(makeRecipe({ ingredients: ['1 cup flour'] }), 1, 1)
    expect(meal.benefits).toEqual(expect.arrayContaining(['High Protein', 'High Fiber', 'Energy Dense']))
    expect(meal.nutrition).toEqual({ calories: 500, protein: 30, carbs: 50, fats: 20, fiber: 5 })
  })

  it('falls back to "Balanced Nutrition" when no macro thresholds are met', () => {
    const recipe = makeRecipe({
      ingredients: ['1 cup flour'],
      nutrition_per_serving: { protein_g: 20, calories: 450, fiber_g: 2, total_fat_g: 15, sugar_g: 10 },
    })
    expect(toMealPlanMeal(recipe, 1, 1).benefits).toEqual(['Balanced Nutrition'])
  })
})

describe('toSwapOption', () => {
  it('maps the recipe to a swap option with category-derived slot', () => {
    const recipe = makeRecipe({ id: 7, name: 'Tomato Soup', recipe_category: 'Soup' })
    const option = toSwapOption(recipe)
    expect(option.id).toBe('7')
    expect(option.name).toBe('Tomato Soup')
    expect(option.category).toBe('lunch')
    expect(option.mealType).toBe('Soup')
  })

  it('strips ingredient names the same way as the meal-plan adapter', () => {
    const option = toSwapOption(makeRecipe({ ingredients: ['3 cloves garlic'] }))
    expect(option.ingredients[0].name).toBe('Garlic')
  })
})

describe('kv-backed recipe fetchers', () => {
  beforeEach(() => {
    vi.mocked(kv.getByPrefix).mockReset()
  })

  it('getRecipesByMealType parses JSON strings and passes objects through', async () => {
    vi.mocked(kv.getByPrefix).mockResolvedValue([makeRecipe({ id: 1 }), JSON.stringify(makeRecipe({ id: 2 }))])
    const result = await getRecipesByMealType('study')
    expect(result.map((r) => r.id)).toEqual([1, 2])
    expect(kv.getByPrefix).toHaveBeenCalledWith('recipe:study:')
  })

  it('getAllRecipesFromDB drops nullish and metadata entries', async () => {
    vi.mocked(kv.getByPrefix).mockResolvedValue([
      makeRecipe({ id: 1 }),
      null,
      undefined,
      JSON.stringify(makeRecipe({ id: 2 })),
      { schemaVersion: 3 }, // metadata: no id
    ])
    const result = await getAllRecipesFromDB()
    expect(result.map((r) => r.id)).toEqual([1, 2])
  })

  it('getRecipesByFocusType returns everything when focus mode is off', async () => {
    vi.mocked(kv.getByPrefix).mockResolvedValue([makeRecipe({ id: 1 }), makeRecipe({ id: 2 })])
    expect(await getRecipesByFocusType('study', false)).toHaveLength(2)
  })

  it('getRecipesByFocusType filters to focus-promoting recipes when plenty exist', async () => {
    const focus = Array.from({ length: 15 }, (_, i) =>
      makeRecipe({ id: i + 1, ingredients: ['2 fillets salmon', '1 cup spinach'] }),
    )
    const nonFocus = [
      makeRecipe({ id: 100, ingredients: ['1 cup flour'] }),
      makeRecipe({ id: 101, ingredients: ['1 cup flour'] }),
    ]
    vi.mocked(kv.getByPrefix).mockResolvedValue([...focus, ...nonFocus])
    const result = await getRecipesByFocusType('study', true)
    expect(result).toHaveLength(15)
    expect(result.every((r) => r.id < 100)).toBe(true)
  })

  it('getRecipesByFocusType supplements by focus score when too few qualify', async () => {
    vi.mocked(kv.getByPrefix).mockResolvedValue([
      makeRecipe({ id: 1, ingredients: ['2 fillets salmon', '1 cup spinach'] }), // focus
      makeRecipe({ id: 2, ingredients: ['1 cup flour'] }), // not
    ])
    const result = await getRecipesByFocusType('study', true)
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe(1) // focus recipe ranked first
  })

  it('getSleepFriendlyRecipes prioritises sleep-promoting recipes', async () => {
    vi.mocked(kv.getByPrefix).mockResolvedValue([
      makeRecipe({ id: 1, ingredients: ['1 cup milk', '2 bananas'] }), // sleep
      makeRecipe({ id: 2, ingredients: ['1 cup flour'] }), // not
    ])
    const result = await getSleepFriendlyRecipes('study')
    expect(result[0].id).toBe(1)
  })
})
