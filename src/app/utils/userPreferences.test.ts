import { describe, expect, it } from 'vitest'
import { createDefaultUserPreferences, normalizeUserPreferences } from './userPreferences'

describe('createDefaultUserPreferences', () => {
  it('starts with an empty (null) per-meal budget - never a prefill', () => {
    const defaults = createDefaultUserPreferences()
    expect(defaults.budgetPerMealGbp).toBeNull()
    expect(defaults).not.toHaveProperty('budget')
    expect(defaults.planDays).toBe(7)
    expect(defaults.mealsPerDay).toBe(3)
  })
})

describe('normalizeUserPreferences', () => {
  it('keeps a canonical per-meal budget as-is', () => {
    const normalized = normalizeUserPreferences({
      ...createDefaultUserPreferences(),
      budgetPerMealGbp: 3.75,
    })
    expect(normalized.budgetPerMealGbp).toBe(3.75)
  })

  it('lazily migrates a legacy whole-plan budget via budget/(planDays*mealsPerDay)', () => {
    const normalized = normalizeUserPreferences({
      shoppingDate: '2026-08-01',
      planDays: 7,
      mealsPerDay: 3,
      budget: 100,
      goal: 'study',
    })
    // 100 / 21 = 4.7619... -> 4.76 at integer-pence precision.
    expect(normalized.budgetPerMealGbp).toBe(4.76)
    expect(normalized).not.toHaveProperty('budget')
  })

  it('defaults pre-planDays legacy plans to seven days before deriving', () => {
    const normalized = normalizeUserPreferences({ budget: 84, mealsPerDay: 3 })
    expect(normalized.budgetPerMealGbp).toBe(4)
    expect(normalized.planDays).toBe(7)
  })

  it('leaves the budget empty when nothing usable is stored', () => {
    expect(normalizeUserPreferences({ goal: 'study' }).budgetPerMealGbp).toBeNull()
    expect(normalizeUserPreferences(undefined).budgetPerMealGbp).toBeNull()
    expect(normalizeUserPreferences({ budgetPerMealGbp: 999 }).budgetPerMealGbp).toBeNull()
  })

  it('normalizes allergy values onto the shared taxonomy on load', () => {
    const normalized = normalizeUserPreferences({
      avoidIngredients: ['peanuts', 'fish', 'milk', 'Coriander'],
      dietaryRestrictions: ['vegan'],
    })
    expect(normalized.avoidIngredients).toEqual(['Peanuts', 'Fish', 'Milk', 'Coriander'])
    expect(normalized.dietaryRestrictions).toEqual(['vegan'])
  })

  it('bounds malformed numeric fields instead of propagating them', () => {
    const normalized = normalizeUserPreferences({
      planDays: 99,
      mealsPerDay: 0,
      maxCookingTime: -5,
      goal: 'not-a-goal',
      selectedMealSlots: ['brunch', 'dinner', 'dinner'],
      mealTimes: { breakfast: '25:99', lunch: '12:30' },
    })
    expect(normalized.planDays).toBe(14)
    expect(normalized.mealsPerDay).toBe(1)
    expect(normalized.maxCookingTime).toBe(1)
    expect(normalized.goal).toBeNull()
    expect(normalized.selectedMealSlots).toEqual(['dinner'])
    expect(normalized.mealTimes).toEqual({ breakfast: '08:00', lunch: '12:30', dinner: '18:00' })
  })
})
