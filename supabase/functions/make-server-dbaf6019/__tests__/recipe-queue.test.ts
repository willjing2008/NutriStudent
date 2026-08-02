import { describe, it, expect, vi, beforeEach } from 'vitest'

// recipe-queue imports recipe-adapter, which imports kv_store (jsr: + Deno.env).
// Replace kv_store so the import graph loads under Node/Vitest.
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

// Keep the real pure transforms (toMealPlanMeal) but stub the kv-backed
// fetchers so generateRecipeQueue can be driven with fixture recipes.
vi.mock('../recipe-adapter.ts', async (importActual) => {
  const actual = await importActual<typeof import('../recipe-adapter.ts')>()
  return { ...actual, getRecipesByFocusType: vi.fn(), getSleepFriendlyRecipes: vi.fn() }
})

import { toMealPlanMeal, getRecipesByFocusType } from '../recipe-adapter.ts'
import {
  generateRecipeQueue,
  getQueueWeekAsMealPlan,
  getQueueWeekShoppingList,
  swapQueueMeal,
  type RecipeQueue,
  type QueuedMeal,
} from '../recipe-queue.ts'
import { makeRecipe } from './factory.ts'

type MealRecipe = ReturnType<typeof toMealPlanMeal>

const mealRecipe = (id: number, day: number, extras: Parameters<typeof makeRecipe>[0] = {}): MealRecipe =>
  toMealPlanMeal(makeRecipe({ id, name: `Day ${day}`, ...extras }), day, 1, 'dinner')

const queuedMeal = (day: number, recipe: MealRecipe): QueuedMeal => ({
  recipeId: recipe.id,
  recipe,
  dayNumber: day,
  mealSlot: 'dinner',
  mealNumber: 1,
  isConsumed: false,
})

const buildQueue = (meals: QueuedMeal[]): RecipeQueue => ({
  userId: 'u1',
  queueId: 'q1',
  createdAt: '2026-01-01T00:00:00Z',
  focusMode: false,
  meals,
  mealsPerDay: 1,
  goal: 'study',
  budgetPerMealGbp: 4,
})

const fourteenDayQueue = () =>
  buildQueue(Array.from({ length: 14 }, (_, i) => queuedMeal(i + 1, mealRecipe(i + 1, i + 1))))

describe('getQueueWeekAsMealPlan', () => {
  it('slices week 1 and remaps day numbers to 1-7', () => {
    const week = getQueueWeekAsMealPlan(fourteenDayQueue(), 1)
    expect(week.meals).toHaveLength(7)
    expect(week.meals.map((m) => m.dayNumber)).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(week.meals[0].name).toBe('Day 1')
    expect(week.totalWeeks).toBe(2)
    expect(week.weekNumber).toBe(1)
  })

  it('slices week 2 from days 8-14 and remaps them back to 1-7', () => {
    const week = getQueueWeekAsMealPlan(fourteenDayQueue(), 2)
    expect(week.meals.map((m) => m.dayNumber)).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(week.meals[0].name).toBe('Day 8')
  })

  it('stamps each meal with its absolute queue day and queue slot for mutations', () => {
    // queueDayNumber + mealSlot are what the frontend sends back to
    // queue-swap-meal / mark-queue-meal-consumed. Without the stamp it has to
    // reconstruct the slot from week math, which can diverge from the render.
    const week = getQueueWeekAsMealPlan(fourteenDayQueue(), 2)
    expect(week.meals.map((m) => m.queueDayNumber)).toEqual([8, 9, 10, 11, 12, 13, 14])
    expect(week.meals.every((m) => m.mealSlot === 'dinner')).toBe(true)
  })

  it('uses the queue-owned per-meal cap and calculates real week totals', () => {
    const week = getQueueWeekAsMealPlan(fourteenDayQueue(), 1)
    expect(week.budgetPerMealGbp).toBe(4)
    expect(week.totalBudgetGbp).toBe(28)
    expect(week.totalCost).toBe(17.5)
    expect(week.withinBudget).toBe(true)
    expect(week.overBudgetMealCount).toBe(0)
    // Compatibility aliases are derived rather than caller-controlled.
    expect(week.dailyBudget).toBe(4)
    expect(week.weeklyBudget).toBe(28)
  })

  it('keeps the legacy daily alias at the full daily allowance', () => {
    const queue = {
      ...buildQueue(
        Array.from({ length: 21 }, (_, index) => {
          const day = Math.floor(index / 3) + 1
          return queuedMeal(day, mealRecipe(index + 1, day))
        }),
      ),
      mealsPerDay: 3,
      budgetPerMealGbp: 4.25,
    }

    const week = getQueueWeekAsMealPlan(queue, 1)

    expect(week.totalBudgetGbp).toBe(89.25)
    expect(week.dailyBudget).toBe(12.75)
  })

  it('keeps the persisted cap and totals after a queue swap', () => {
    const queue = fourteenDayQueue()
    const replacement = toMealPlanMeal(
      makeRecipe({ id: 999, name: 'Swapped', cost_per_serving_gbp: 3.75 }),
      1,
      1,
      'dinner',
    )
    const swapped = swapQueueMeal(queue, 1, 'dinner', replacement)
    const week = getQueueWeekAsMealPlan(swapped, 1)
    expect(swapped.budgetPerMealGbp).toBe(4)
    expect(week.budgetPerMealGbp).toBe(4)
    expect(week.totalCost).toBe(18.75)
    expect(week.withinBudget).toBe(true)
  })

  it('uses the documented cap for a persisted legacy queue without a budget field', () => {
    const legacyQueue = fourteenDayQueue() as RecipeQueue & { budgetPerMealGbp?: number }
    delete legacyQueue.budgetPerMealGbp

    const week = getQueueWeekAsMealPlan(legacyQueue as RecipeQueue, 1)
    expect(week.budgetPerMealGbp).toBe(5)
    expect(week.totalBudgetGbp).toBe(35)
    expect(week.meals.map((meal) => meal.id)).toEqual(['1', '2', '3', '4', '5', '6', '7'])
  })
})

describe('getQueueWeekShoppingList', () => {
  const queue = buildQueue([
    queuedMeal(1, mealRecipe(1, 1, { ingredients: ['2 cups pasta', '1 onion'] })),
    queuedMeal(2, mealRecipe(2, 2, { ingredients: ['1 cup pasta', '2 cloves garlic'] })),
    queuedMeal(8, mealRecipe(3, 8, { ingredients: ['1 cup rice'] })),
  ])

  it('deduplicates ingredients by name within the requested week', () => {
    const list = getQueueWeekShoppingList(queue, 1)
    expect(list.map((i) => i.name).sort()).toEqual(['Garlic', 'Onion', 'Pasta'])
  })

  it('excludes ingredients from meals outside the week', () => {
    const list = getQueueWeekShoppingList(queue, 1)
    expect(list.map((i) => i.name)).not.toContain('Rice')
  })

  it('marks every shopping item unchecked with a category', () => {
    const list = getQueueWeekShoppingList(queue, 1)
    for (const item of list) {
      expect(item.checked).toBe(false)
      expect(item.category).toBe('pantry')
    }
  })
})

describe('swapQueueMeal', () => {
  it('replaces the matching meal and records swappedFrom without mutating the original', () => {
    const queue = fourteenDayQueue()
    const replacement = toMealPlanMeal(makeRecipe({ id: 999, name: 'Swapped' }), 1, 1, 'dinner')
    const result = swapQueueMeal(queue, 1, 'dinner', replacement)

    expect(result).not.toBe(queue)
    expect(result.meals).not.toBe(queue.meals)
    expect(result.meals[0].recipeId).toBe('999')
    expect(result.meals[0].recipe.name).toBe('Swapped')
    expect(result.meals[0].swappedFrom).toBe('1')
    // other meals untouched
    expect(result.meals[1].recipeId).toBe('2')
    // original queue is unchanged
    expect(queue.meals[0].recipeId).toBe('1')
    expect(queue.meals[0].swappedFrom).toBeUndefined()
  })

  it('returns an equivalent queue when no meal matches the day/slot', () => {
    const queue = fourteenDayQueue()
    const replacement = toMealPlanMeal(makeRecipe({ id: 999 }), 1, 1, 'dinner')
    const result = swapQueueMeal(queue, 99, 'dinner', replacement)
    expect(result.meals[0].recipeId).toBe('1')
    expect(result.meals.some((m) => m.recipeId === '999')).toBe(false)
  })

  it('rejects a replacement over the persisted queue cap', () => {
    const queue = fourteenDayQueue()
    const replacement = toMealPlanMeal(
      makeRecipe({ id: 999, cost_per_serving_gbp: 4.01 }),
      1,
      1,
      'dinner',
    )
    expect(() => swapQueueMeal(queue, 1, 'dinner', replacement)).toThrow(
      'No recipes fit your £4.00 per-meal budget. Increase your budget and try again.',
    )
    expect(queue.meals[0].recipeId).toBe('1')
  })
})

describe('generateRecipeQueue', () => {
  const recipePool = () => [
    ...Array.from({ length: 4 }, (_, i) =>
      makeRecipe({ id: i + 1, recipe_category: 'Breakfast', ingredients: ['1 cup oats', '1 banana'] }),
    ),
    ...Array.from({ length: 5 }, (_, i) =>
      makeRecipe({ id: i + 10, recipe_category: 'Lunch', ingredients: ['1 cup rice', '1 onion'] }),
    ),
    ...Array.from({ length: 6 }, (_, i) =>
      makeRecipe({ id: i + 20, recipe_category: 'Dinner', ingredients: ['1 cup pasta', '2 cloves garlic'] }),
    ),
  ]

  beforeEach(() => {
    vi.mocked(getRecipesByFocusType).mockReset()
  })

  it('builds a queue with one meal per slot per cooking day', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue(recipePool())
    const queue = await generateRecipeQueue({
      userId: 'u1',
      mealsPerDay: 3,
      goal: 'study',
      focusMode: false,
      budgetPerMealGbp: 4.25,
      queueDays: 7,
      selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
    })
    expect(queue.userId).toBe('u1')
    expect(queue.queueId).toBeTruthy()
    expect(queue.meals).toHaveLength(21) // 7 days × 3 meals
    expect(queue.meals.every((m) => m.dayNumber >= 1 && m.dayNumber <= 7)).toBe(true)
  })

  it('throws when no recipes are available', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue([])
    await expect(
      generateRecipeQueue({ userId: 'u1', mealsPerDay: 3, goal: 'study', focusMode: false, budgetPerMealGbp: 4.25, queueDays: 7 }),
    ).rejects.toThrow(/No recipes found/)
  })

  it('excludes avoided ingredients from the generated meals', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue([
      ...recipePool(),
      makeRecipe({ id: 99, recipe_category: 'Dinner', ingredients: ['2 fillets salmon'] }),
    ])
    const queue = await generateRecipeQueue({
      userId: 'u1',
      mealsPerDay: 3,
      goal: 'study',
      focusMode: false,
      budgetPerMealGbp: 4.25,
      queueDays: 7,
      avoidIngredients: ['salmon'],
      selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
    })
    const allIngredients = queue.meals.flatMap((m) => m.recipe.ingredientNames)
    expect(allIngredients.some((i) => i.toLowerCase().includes('salmon'))).toBe(false)
  })

  it('never relaxes avoided ingredients when they empty the queue pool', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue(
      recipePool().map((recipe, index) => ({
        ...recipe,
        ingredients: [index % 2 === 0 ? 'peanuts' : 'almonds'],
      })),
    )
    await expect(generateRecipeQueue({
      userId: 'u1',
      mealsPerDay: 3,
      goal: 'study',
      focusMode: false,
      budgetPerMealGbp: 4.25,
      queueDays: 7,
      avoidIngredients: ['Nuts'],
    })).rejects.toThrow(/No recipes match your dietary restrictions/)
  })

  it('uses larger cluster sizes for a 28-day queue', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue(recipePool())
    const queue = await generateRecipeQueue({
      userId: 'u1',
      mealsPerDay: 1,
      goal: 'study',
      focusMode: false,
      budgetPerMealGbp: 4.25,
      queueDays: 28,
    })
    expect(queue.meals).toHaveLength(28) // 28 days × 1 dinner
  })

  it('handles preferSleepDinners and maxCookingTime without error', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue(recipePool())
    const queue = await generateRecipeQueue({
      userId: 'u1',
      mealsPerDay: 2,
      goal: 'fitness',
      focusMode: true,
      budgetPerMealGbp: 4.25,
      queueDays: 7,
      preferSleepDinners: true,
      maxCookingTime: 60,
      selectedMealSlots: ['breakfast', 'dinner'],
    })
    expect(queue.meals.length).toBeGreaterThan(0)
    expect(queue.mealsPerDay).toBe(2)
  })

  it('never places a recipe over the hard per-meal cap', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue([
      ...recipePool().map((recipe) => ({ ...recipe, cost_per_serving_gbp: 3.5 })),
      makeRecipe({ id: 999, recipe_category: 'Dinner', cost_per_serving_gbp: 4.26 }),
    ])
    const queue = await generateRecipeQueue({
      userId: 'u1',
      mealsPerDay: 3,
      goal: 'study',
      focusMode: false,
      budgetPerMealGbp: 4.25,
      queueDays: 7,
      selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
    })
    expect(queue.budgetPerMealGbp).toBe(4.25)
    expect(queue.meals.every((meal) => meal.recipe.totalCost <= 4.25)).toBe(true)
    expect(queue.meals.some((meal) => meal.recipeId === '999')).toBe(false)
  })

  it('fails clearly when no recipe fits the hard cap', async () => {
    vi.mocked(getRecipesByFocusType).mockResolvedValue(
      recipePool().map((recipe) => ({ ...recipe, cost_per_serving_gbp: 4.26 })),
    )
    await expect(generateRecipeQueue({
      userId: 'u1',
      mealsPerDay: 3,
      goal: 'study',
      focusMode: false,
      budgetPerMealGbp: 4.25,
      queueDays: 7,
    })).rejects.toThrow(
      'No recipes fit your £4.25 per-meal budget. Increase your budget and try again.',
    )
  })
})
