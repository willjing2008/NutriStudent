import {
  PREFERENCES_SCHEMA_VERSION,
  resolveBudgetPerMealGbp,
} from '../../../supabase/functions/_shared/budget-contract'
import { normalizeAllergyChoices } from '../../../supabase/functions/_shared/allergy-contract'
import type { UserPreferences } from '../App'
import type { Gender } from './nutritionTargets'

const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner'] as const
const GOALS = ['study', 'work', 'fitness'] as const
const GENDERS: Gender[] = ['male', 'female', 'decline', null]
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const boundedInteger = (
  value: unknown,
  minimum: number,
  maximum: number,
  fallback: number,
): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback
  return Math.min(maximum, Math.max(minimum, Math.round(value)))
}

const validTime = (value: unknown, fallback: string): string =>
  typeof value === 'string' && TIME_PATTERN.test(value) ? value : fallback

export function createDefaultUserPreferences(): UserPreferences {
  return {
    gender: null,
    location: '',
    selectedStore: null,
    selectedStores: [],
    shoppingDate: '',
    planDays: 7,
    mealsPerDay: 3,
    // Deliberately empty: the user must type a per-meal budget before a plan
    // can be generated (empty-required, no prefill).
    budgetPerMealGbp: null,
    preferencesSchemaVersion: PREFERENCES_SCHEMA_VERSION,
    goal: null,
    maxCookingTime: 30,
    avoidIngredients: [],
    dietaryRestrictions: [],
    mealTimes: { breakfast: '08:00', lunch: '12:00', dinner: '18:00' },
    selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
  }
}

/**
 * Validate and migrate a saved preference blob into the canonical client
 * shape. Legacy plans carrying only a whole-plan `budget` are lazily migrated
 * to `budgetPerMealGbp` via budget/(planDays*mealsPerDay); allergy values are
 * normalized onto the shared taxonomy.
 */
export function normalizeUserPreferences(raw: unknown): UserPreferences {
  const defaults = createDefaultUserPreferences()
  if (!isRecord(raw)) return defaults

  const budget = resolveBudgetPerMealGbp(raw)
  const rawMealTimes = isRecord(raw.mealTimes) ? raw.mealTimes : {}
  const selectedMealSlots = Array.isArray(raw.selectedMealSlots)
    ? [...new Set(raw.selectedMealSlots)].filter(
        (slot): slot is typeof MEAL_SLOTS[number] =>
          typeof slot === 'string' && MEAL_SLOTS.includes(slot as typeof MEAL_SLOTS[number]),
      )
    : defaults.selectedMealSlots

  const gender = GENDERS.includes(raw.gender as Gender)
    ? raw.gender as Gender
    : defaults.gender
  const goal = GOALS.includes(raw.goal as typeof GOALS[number])
    ? raw.goal as typeof GOALS[number]
    : null

  return {
    ...defaults,
    gender,
    location: typeof raw.location === 'string' ? raw.location : defaults.location,
    selectedStore: isRecord(raw.selectedStore)
      ? raw.selectedStore as UserPreferences['selectedStore']
      : null,
    selectedStores: Array.isArray(raw.selectedStores)
      ? raw.selectedStores.filter(isRecord) as UserPreferences['selectedStores']
      : [],
    shoppingDate: typeof raw.shoppingDate === 'string' ? raw.shoppingDate : '',
    planDays: boundedInteger(raw.planDays, 1, 14, defaults.planDays),
    mealsPerDay: boundedInteger(raw.mealsPerDay, 1, 3, defaults.mealsPerDay),
    budgetPerMealGbp: budget.value,
    preferencesSchemaVersion: PREFERENCES_SCHEMA_VERSION,
    goal,
    maxCookingTime: boundedInteger(raw.maxCookingTime, 1, 240, defaults.maxCookingTime),
    avoidIngredients: normalizeAllergyChoices(raw.avoidIngredients, 50),
    dietaryRestrictions: normalizeAllergyChoices(raw.dietaryRestrictions, 10),
    mealTimes: {
      breakfast: validTime(rawMealTimes.breakfast, defaults.mealTimes.breakfast),
      lunch: validTime(rawMealTimes.lunch, defaults.mealTimes.lunch),
      dinner: validTime(rawMealTimes.dinner, defaults.mealTimes.dinner),
    },
    selectedMealSlots: selectedMealSlots.length > 0
      ? selectedMealSlots
      : defaults.selectedMealSlots,
  }
}
