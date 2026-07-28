import { normalizeAllergyChoices } from './allergy-contract.ts'

export const BUDGET_MIN_GBP = 1
export const BUDGET_MAX_GBP = 50
export const UNPRICED_RECIPE_FALLBACK_GBP = 2.5
export const LEGACY_QUEUE_BUDGET_PER_MEAL_GBP = 5
export const LEGACY_DEFAULT_PLAN_DAYS = 7
export const PREFERENCES_SCHEMA_VERSION = 3

const DECIMAL_GBP_PATTERN = /^\d+(?:\.\d{1,2})?$/
const PRECISION_EPSILON = 1e-8

export function toPence(gbp: number): number {
  return Math.round(gbp * 100)
}

function hasAtMostTwoDecimalPlaces(value: number): boolean {
  return Math.abs(value * 100 - toPence(value)) < PRECISION_EPSILON
}

export function parseBudgetPerMealGbp(value: unknown): number | null {
  let numeric: number

  if (typeof value === 'number') {
    numeric = value
  } else if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!DECIMAL_GBP_PATTERN.test(trimmed)) return null
    numeric = Number(trimmed)
  } else {
    return null
  }

  if (!Number.isFinite(numeric)) return null
  if (!hasAtMostTwoDecimalPlaces(numeric)) return null
  if (numeric < BUDGET_MIN_GBP || numeric > BUDGET_MAX_GBP) return null
  return toPence(numeric) / 100
}

export function formatBudgetGbp(value: number): string {
  return `£${value.toFixed(2)}`
}

const finitePositiveNumber = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null

export function deriveLegacyBudgetPerMealGbp(
  legacyBudget: unknown,
  planDays: unknown,
  mealsPerDay: unknown,
): number | null {
  const total = finitePositiveNumber(legacyBudget)
  // Clients released before plan-length selection always generated seven-day
  // plans and therefore omitted planDays entirely. Only absence gets this
  // compatibility default; an explicitly malformed value remains invalid.
  const days = planDays === undefined
    ? LEGACY_DEFAULT_PLAN_DAYS
    : finitePositiveNumber(planDays)
  const meals = finitePositiveNumber(mealsPerDay)
  if (total === null || days === null || meals === null) return null

  const derived = toPence(total / (days * meals)) / 100
  return Math.min(BUDGET_MAX_GBP, Math.max(BUDGET_MIN_GBP, derived))
}

export type BudgetResolutionSource = 'canonical' | 'legacy' | 'invalid'

export interface BudgetResolution {
  value: number | null
  source: BudgetResolutionSource
}

export function resolveBudgetPerMealGbp(
  input: Record<string, unknown> | null | undefined,
): BudgetResolution {
  if (!input) return { value: null, source: 'invalid' }

  if (Object.prototype.hasOwnProperty.call(input, 'budgetPerMealGbp')) {
    const canonical = parseBudgetPerMealGbp(input.budgetPerMealGbp)
    return canonical === null
      ? { value: null, source: 'invalid' }
      : { value: canonical, source: 'canonical' }
  }

  const legacy = deriveLegacyBudgetPerMealGbp(
    input.budget,
    input.planDays,
    input.mealsPerDay,
  )
  return legacy === null
    ? { value: null, source: 'invalid' }
    : { value: legacy, source: 'legacy' }
}

export function resolveMutationBudgetPerMealGbp(
  input: Record<string, unknown> | null | undefined,
): number | null {
  return parseBudgetPerMealGbp(input?.budgetPerMealGbp)
}

const PERSISTED_PREFERENCE_KEYS = [
  'gender',
  'location',
  'selectedStore',
  'selectedStores',
  'shoppingDate',
  'planDays',
  'mealsPerDay',
  'goal',
  'maxCookingTime',
  'avoidIngredients',
  'dietaryRestrictions',
  'mealTimes',
  'selectedMealSlots',
] as const

export function normalizePreferenceBudget(
  input: unknown,
): Record<string, unknown> | null {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return null
  const record = input as Record<string, unknown>
  const resolution = resolveBudgetPerMealGbp(record)
  const normalized: Record<string, unknown> = {}
  for (const key of PERSISTED_PREFERENCE_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue
    normalized[key] = key === 'avoidIngredients' || key === 'dietaryRestrictions'
      ? normalizeAllergyChoices(record[key], key === 'dietaryRestrictions' ? 10 : 50)
      : record[key]
  }
  if (
    resolution.source === 'legacy'
    && !Object.prototype.hasOwnProperty.call(record, 'planDays')
  ) {
    normalized.planDays = LEGACY_DEFAULT_PLAN_DAYS
  }
  return {
    ...normalized,
    budgetPerMealGbp: resolution.value,
    preferencesSchemaVersion: PREFERENCES_SCHEMA_VERSION,
  }
}

export function buildPreferenceResponse(
  input: unknown,
): Record<string, unknown> | null {
  const normalized = normalizePreferenceBudget(input)
  if (!normalized) return null

  const record = input as Record<string, unknown>
  const resolution = resolveBudgetPerMealGbp(record)
  const planDays = finitePositiveNumber(normalized.planDays)
  const mealsPerDay = finitePositiveNumber(normalized.mealsPerDay)
  const canonicalBudget = parseBudgetPerMealGbp(normalized.budgetPerMealGbp)

  const legacyBudget = resolution.source === 'legacy'
    ? finitePositiveNumber(record.budget)
    : canonicalBudget !== null && planDays !== null && mealsPerDay !== null
      ? toPence(canonicalBudget * planDays * mealsPerDay) / 100
      : null

  return legacyBudget === null
    ? normalized
    : { ...normalized, budget: legacyBudget }
}
