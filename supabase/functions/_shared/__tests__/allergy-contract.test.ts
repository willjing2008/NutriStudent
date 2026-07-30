import { describe, expect, it } from 'vitest'
import {
  normalizeAllergyChoice,
  normalizeAllergyChoices,
} from '../allergy-contract.ts'

describe('normalizeAllergyChoice', () => {
  it.each(['Peanuts', 'Tree Nuts', 'nuts', ' NUTS '])(
    'maps %s to the broad Nuts category',
    (value) => expect(normalizeAllergyChoice(value)).toBe('Nuts'),
  )

  it.each(['Fish', 'Shellfish', 'seafood', ' SEAFOOD '])(
    'maps %s to the broad Seafood category',
    (value) => expect(normalizeAllergyChoice(value)).toBe('Seafood'),
  )

  it('preserves trimmed custom ingredients without prototype-key coercion', () => {
    expect(normalizeAllergyChoice('  Sesame  ')).toBe('Sesame')
    expect(normalizeAllergyChoice('__proto__')).toBe('__proto__')
  })
})

describe('normalizeAllergyChoices', () => {
  it('deduplicates legacy and canonical broad categories in stable order', () => {
    expect(normalizeAllergyChoices([
      'Peanuts',
      'Tree Nuts',
      'Nuts',
      'Fish',
      'Shellfish',
      'Seafood',
      'Eggs',
    ])).toEqual(['Nuts', 'Seafood', 'Eggs'])
  })

  it('drops malformed and blank values and bounds the result', () => {
    expect(normalizeAllergyChoices([' ', null, 'Milk', 3, 'Eggs'], 1)).toEqual(['Milk'])
  })
})
