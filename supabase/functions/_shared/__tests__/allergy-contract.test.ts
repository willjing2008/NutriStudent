import { describe, expect, it } from 'vitest'
import {
  ALLERGY_GROUPS,
  BROAD_ALLERGY_CHOICES,
  BROAD_ALLERGY_KEYWORDS,
  allergyGroupForSubOption,
  allergyKeywordsForChoice,
  normalizeAllergyChoice,
  normalizeAllergyChoices,
} from '../allergy-contract.ts'

describe('allergy taxonomy', () => {
  it('ships the six launch groups with their classified sub-options', () => {
    expect(ALLERGY_GROUPS).toEqual({
      'Nuts': ['Peanuts', 'Tree Nuts'],
      'Seafood': ['Fish', 'Shellfish'],
      'Dairy': ['Milk', 'Cheese', 'Butter', 'Cream', 'Yogurt'],
      'Gluten/Wheat': [],
      'Eggs': [],
      'Soy': [],
    })
    expect(BROAD_ALLERGY_CHOICES).toEqual([
      'Nuts', 'Seafood', 'Dairy', 'Gluten/Wheat', 'Eggs', 'Soy',
    ])
  })

  it('resolves the owning group of every sub-option', () => {
    expect(allergyGroupForSubOption('Peanuts')).toBe('Nuts')
    expect(allergyGroupForSubOption('shellfish')).toBe('Seafood')
    expect(allergyGroupForSubOption('Yogurt')).toBe('Dairy')
    expect(allergyGroupForSubOption('Nuts')).toBeNull()
    expect(allergyGroupForSubOption('Sesame')).toBeNull()
  })
})

describe('normalizeAllergyChoice', () => {
  it.each([
    ['peanut', 'Peanuts'],
    ['PEANUTS', 'Peanuts'],
    [' tree nuts ', 'Tree Nuts'],
    ['nuts', 'Nuts'],
    ['fish', 'Fish'],
    ['shellfish', 'Shellfish'],
    ['seafood', 'Seafood'],
    ['milk', 'Milk'],
    ['cheese', 'Cheese'],
    ['butter', 'Butter'],
    ['cream', 'Cream'],
    ['yoghurt', 'Yogurt'],
    ['dairy', 'Dairy'],
    ['lactose', 'Dairy'],
    ['wheat', 'Gluten/Wheat'],
    ['gluten', 'Gluten/Wheat'],
    ['egg', 'Eggs'],
    ['eggs', 'Eggs'],
    ['soya', 'Soy'],
    ['soy', 'Soy'],
  ])('maps legacy %s to canonical %s', (value, canonical) => {
    expect(normalizeAllergyChoice(value)).toBe(canonical)
  })

  it('keeps sub-options narrow instead of broadening them to their group', () => {
    expect(normalizeAllergyChoice('Fish')).toBe('Fish')
    expect(normalizeAllergyChoice('Peanuts')).toBe('Peanuts')
    expect(normalizeAllergyChoice('Milk')).toBe('Milk')
  })

  it('leaves dietary-restriction ids untouched', () => {
    for (const id of ['vegetarian', 'vegan', 'gluten-free', 'nut-free', 'keto']) {
      expect(normalizeAllergyChoice(id)).toBe(id)
    }
  })

  it('preserves trimmed custom ingredients without prototype-key coercion', () => {
    expect(normalizeAllergyChoice('  Sesame  ')).toBe('Sesame')
    expect(normalizeAllergyChoice('__proto__')).toBe('__proto__')
  })
})

describe('normalizeAllergyChoices', () => {
  it('deduplicates aliases onto canonical values in stable order', () => {
    expect(normalizeAllergyChoices([
      'peanut',
      'Peanuts',
      'nuts',
      'Nuts',
      'fish',
      'egg',
      'Eggs',
    ])).toEqual(['Peanuts', 'Nuts', 'Fish', 'Eggs'])
  })

  it('keeps a group and its sub-options as distinct selections', () => {
    expect(normalizeAllergyChoices(['Nuts', 'Peanuts', 'Dairy', 'Milk']))
      .toEqual(['Nuts', 'Peanuts', 'Dairy', 'Milk'])
  })

  it('drops malformed and blank values and bounds the result', () => {
    expect(normalizeAllergyChoices([' ', null, 'Milk', 3, 'Eggs'], 1)).toEqual(['Milk'])
  })
})

describe('allergyKeywordsForChoice', () => {
  it('gives a broad group the union of its sub-option keyword families', () => {
    const nuts = allergyKeywordsForChoice('Nuts')
    expect(nuts).toContain('nut')
    expect(nuts).toContain('peanut')
    expect(nuts).toContain('almond')

    const seafood = allergyKeywordsForChoice('Seafood')
    expect(seafood).toContain('seafood')
    expect(seafood).toContain('salmon')
    expect(seafood).toContain('prawn')

    const dairy = allergyKeywordsForChoice('Dairy')
    expect(dairy).toContain('milk')
    expect(dairy).toContain('cheddar')
    expect(dairy).toContain('ghee')
    expect(dairy).toContain('yoghurt')
  })

  it('restricts a sub-option to its own family only', () => {
    const fish = allergyKeywordsForChoice('Fish')
    expect(fish).toContain('salmon')
    expect(fish).not.toContain('prawn')

    const peanuts = allergyKeywordsForChoice('Peanuts')
    expect(peanuts).toContain('peanut')
    expect(peanuts).not.toContain('almond')

    const milk = allergyKeywordsForChoice('Milk')
    expect(milk).toContain('whey')
    expect(milk).not.toContain('cheese')
  })

  it('covers the sub-option-less groups directly', () => {
    expect(allergyKeywordsForChoice('Gluten/Wheat')).toContain('wheat')
    expect(allergyKeywordsForChoice('wheat')).toContain('gluten')
    expect(allergyKeywordsForChoice('Eggs')).toContain('egg')
    expect(allergyKeywordsForChoice('Soy')).toContain('tofu')
  })

  it('returns [] for free-text dislikes', () => {
    expect(allergyKeywordsForChoice('Coriander')).toEqual([])
    expect(allergyKeywordsForChoice('vegan')).toEqual([])
  })

  it('exposes the same unions through BROAD_ALLERGY_KEYWORDS for every group', () => {
    for (const group of BROAD_ALLERGY_CHOICES) {
      expect(BROAD_ALLERGY_KEYWORDS[group]).toEqual(allergyKeywordsForChoice(group))
      expect(BROAD_ALLERGY_KEYWORDS[group].length).toBeGreaterThan(0)
    }
  })
})
