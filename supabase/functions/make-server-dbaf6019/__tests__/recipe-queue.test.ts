import { describe, it, expect, vi } from 'vitest'

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

import { toMealPlanMeal } from '../recipe-adapter.ts'
import {
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

  it('defaults the weekly budget to 100 and derives the daily budget', () => {
    const week = getQueueWeekAsMealPlan(fourteenDayQueue(), 1)
    expect(week.weeklyBudget).toBe(100)
    expect(week.dailyBudget).toBeCloseTo(100 / 7)
  })

  it('honours a custom weekly budget', () => {
    const week = getQueueWeekAsMealPlan(fourteenDayQueue(), 1, 70)
    expect(week.weeklyBudget).toBe(70)
    expect(week.dailyBudget).toBeCloseTo(10)
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
})
