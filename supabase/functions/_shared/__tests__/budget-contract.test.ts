import { describe, expect, it } from 'vitest'
import {
  BUDGET_MAX_GBP,
  BUDGET_MIN_GBP,
  deriveLegacyBudgetPerMealGbp,
  formatBudgetGbp,
  buildPreferenceResponse,
  normalizePreferenceBudget,
  parseBudgetPerMealGbp,
  resolveBudgetPerMealGbp,
  resolveMutationBudgetPerMealGbp,
  toPence,
} from '../budget-contract.ts'

describe('budget per meal contract', () => {
  it.each([1, 4.25, 50, '1', '4.25', '50.00'])(
    'accepts a canonical amount: %s',
    (value) => {
      expect(parseBudgetPerMealGbp(value)).toBe(Number(value))
    },
  )

  it.each([undefined, null, '', ' ', Number.NaN, Infinity, 0.99, 50.01, 4.251, '4.251', '£4.25', '4.2.5'])(
    'rejects invalid canonical input: %s',
    (value) => {
      expect(parseBudgetPerMealGbp(value)).toBeNull()
    },
  )

  it('exports the approved inclusive range', () => {
    expect(BUDGET_MIN_GBP).toBe(1)
    expect(BUDGET_MAX_GBP).toBe(50)
  })

  it('converts comparisons to integer pence', () => {
    expect(toPence(4.25)).toBe(425)
    expect(toPence(4.255)).toBe(426)
  })

  it('formats user-facing amounts with two decimals', () => {
    expect(formatBudgetGbp(4)).toBe('£4.00')
    expect(formatBudgetGbp(4.25)).toBe('£4.25')
  })
})

describe('legacy budget migration', () => {
  it('migrates the old £100 default to £4.76 per meal', () => {
    expect(deriveLegacyBudgetPerMealGbp(100, 7, 3)).toBe(4.76)
  })

  it('uses the historical seven-day plan for pre-planDays clients', () => {
    expect(deriveLegacyBudgetPerMealGbp(100, undefined, 3)).toBe(4.76)
    expect(resolveBudgetPerMealGbp({ budget: 100, mealsPerDay: 3 })).toEqual({
      value: 4.76,
      source: 'legacy',
    })
  })

  it('migrates the reproduced £80 plan to £3.81 per meal', () => {
    expect(deriveLegacyBudgetPerMealGbp(80, 7, 3)).toBe(3.81)
  })

  it('clamps only derived legacy values to the supported range', () => {
    expect(deriveLegacyBudgetPerMealGbp(1, 14, 3)).toBe(1)
    expect(deriveLegacyBudgetPerMealGbp(100_000, 1, 1)).toBe(50)
  })

  it('does not derive from malformed legacy values', () => {
    expect(deriveLegacyBudgetPerMealGbp('bad', 7, 3)).toBeNull()
    expect(deriveLegacyBudgetPerMealGbp(100, 0, 3)).toBeNull()
    expect(deriveLegacyBudgetPerMealGbp(100, 7, Number.NaN)).toBeNull()
  })

  it('prefers a canonical field over the legacy total', () => {
    expect(resolveBudgetPerMealGbp({
      budgetPerMealGbp: 4.25,
      budget: 100,
      planDays: 7,
      mealsPerDay: 3,
    })).toEqual({ value: 4.25, source: 'canonical' })
  })

  it('rejects an invalid supplied canonical field instead of falling back', () => {
    expect(resolveBudgetPerMealGbp({
      budgetPerMealGbp: 0.5,
      budget: 100,
      planDays: 7,
      mealsPerDay: 3,
    })).toEqual({ value: null, source: 'invalid' })
  })

  it('supports a legacy-only request for one compatibility release', () => {
    expect(resolveBudgetPerMealGbp({ budget: 80, planDays: 7, mealsPerDay: 3 }))
      .toEqual({ value: 3.81, source: 'legacy' })
  })

  it('requires canonical context for recipe mutations', () => {
    expect(resolveMutationBudgetPerMealGbp({ budgetPerMealGbp: 3.81 })).toBe(3.81)
    expect(resolveMutationBudgetPerMealGbp({ budget: 80, planDays: 7, mealsPerDay: 3 })).toBeNull()
    expect(resolveMutationBudgetPerMealGbp({})).toBeNull()
  })

  it('normalizes persisted preferences to schema version 3 without ambiguous fields', () => {
    expect(normalizePreferenceBudget({
      budget: 80,
      planDays: 7,
      mealsPerDay: 3,
      goal: 'study',
      avoidIngredients: ['Peanuts', 'Tree Nuts', 'Fish', 'Shellfish'],
      dietaryRestrictions: ['fish', 'vegan'],
      injectedRole: 'admin',
    })).toEqual({
      planDays: 7,
      mealsPerDay: 3,
      goal: 'study',
      avoidIngredients: ['Nuts', 'Seafood'],
      dietaryRestrictions: ['Seafood', 'vegan'],
      budgetPerMealGbp: 3.81,
      preferencesSchemaVersion: 3,
    })
  })

  it('normalizes a pre-planDays saved plan with an explicit seven-day policy', () => {
    expect(normalizePreferenceBudget({
      budget: 100,
      mealsPerDay: 3,
      goal: 'study',
    })).toEqual({
      planDays: 7,
      mealsPerDay: 3,
      goal: 'study',
      budgetPerMealGbp: 4.76,
      preferencesSchemaVersion: 3,
    })
  })

  it('keeps malformed saved preferences viewable with a required-edit null budget', () => {
    expect(normalizePreferenceBudget({ goal: 'study' })).toEqual({
      goal: 'study',
      budgetPerMealGbp: null,
      preferencesSchemaVersion: 3,
    })
  })

  it('returns the exact legacy total alongside canonical preferences', () => {
    expect(buildPreferenceResponse({
      budget: 80,
      planDays: 7,
      mealsPerDay: 3,
      goal: 'study',
    })).toMatchObject({
      budget: 80,
      budgetPerMealGbp: 3.81,
      planDays: 7,
      mealsPerDay: 3,
    })
  })

  it('derives the legacy response alias from canonical stored preferences', () => {
    expect(buildPreferenceResponse({
      budgetPerMealGbp: 3.81,
      planDays: 7,
      mealsPerDay: 3,
      goal: 'study',
    })).toMatchObject({
      budget: 80.01,
      budgetPerMealGbp: 3.81,
      planDays: 7,
      mealsPerDay: 3,
    })
  })
})
