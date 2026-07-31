import { describe, it, expect } from 'vitest'
import {
  generateImageQuery,
  generateFocusedImageQuery,
  enhanceImageQuery,
  IMAGE_QUERY_TEMPLATES,
} from '../image-query-helper.ts'

describe('generateImageQuery', () => {
  it('matches the documented full example', () => {
    const query = generateImageQuery('Chicken Tikka Masala', 'indian', 'one-pot', ['creamy sauce', 'basmati rice'])
    expect(query).toBe(
      'Chicken Tikka Masala, food photography, colorful spices, vibrant, single pot, creamy sauce, basmati rice, high quality, appetizing, detailed close-up',
    )
  })

  it('produces a minimal query when only the name is given', () => {
    expect(generateImageQuery('Toast')).toBe('Toast, food photography, high quality, appetizing, detailed close-up')
  })

  it('skips cuisine styling for the "base" cuisine and for unknown cuisines', () => {
    const base = generateImageQuery('Soup', 'base')
    const unknown = generateImageQuery('Soup', 'klingon')
    expect(base).toBe('Soup, food photography, high quality, appetizing, detailed close-up')
    expect(unknown).toBe(base)
  })

  it('uses only the first two cuisine styles', () => {
    const query = generateImageQuery('Pasta', 'italian')
    expect(query).toContain('rustic')
    expect(query).toContain('mediterranean style')
    expect(query).not.toContain('wooden table')
  })

  it('uses only the first category style', () => {
    const query = generateImageQuery('Stew', undefined, 'one-pot')
    expect(query).toContain('single pot')
    expect(query).not.toContain('family style')
  })
})

describe('generateFocusedImageQuery', () => {
  it('matches the documented example with negative prompts', () => {
    const query = generateFocusedImageQuery(
      'poached egg',
      ['runny yolk', 'toast', 'breakfast'],
      ['multiple eggs', 'fried', 'scrambled'],
    )
    expect(query).toBe(
      'poached egg, runny yolk, toast, breakfast, food photography, professional lighting, macro shot --no multiple eggs, fried, scrambled',
    )
  })

  it('omits the --no clause when there are no exclusions', () => {
    expect(generateFocusedImageQuery('poached egg', ['runny yolk'])).toBe(
      'poached egg, runny yolk, food photography, professional lighting, macro shot',
    )
  })

  it('omits the --no clause for an empty exclusion list', () => {
    expect(generateFocusedImageQuery('poached egg', ['runny yolk'], [])).not.toContain('--no')
  })
})

describe('enhanceImageQuery', () => {
  it('appends photography keywords when none are present', () => {
    expect(enhanceImageQuery('grilled cheese')).toBe(
      'grilled cheese, food photography, professional, appetizing, high quality',
    )
  })

  it('leaves a query untouched when it already has photography keywords', () => {
    expect(enhanceImageQuery('tacos food photography')).toBe('tacos food photography')
  })

  it('detects existing keywords case-insensitively', () => {
    expect(enhanceImageQuery('Pizza PROFESSIONAL shot')).toBe('Pizza PROFESSIONAL shot')
  })
})

describe('IMAGE_QUERY_TEMPLATES', () => {
  it('exposes string templates for the common recipe groups', () => {
    expect(typeof IMAGE_QUERY_TEMPLATES.breakfast.eggs).toBe('string')
    expect(typeof IMAGE_QUERY_TEMPLATES.mains.pasta).toBe('string')
    expect(typeof IMAGE_QUERY_TEMPLATES.microwave.mugCake).toBe('string')
    expect(typeof IMAGE_QUERY_TEMPLATES.categories.onePot).toBe('string')
  })
})
