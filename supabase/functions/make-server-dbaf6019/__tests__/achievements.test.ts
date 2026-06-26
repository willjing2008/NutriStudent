import { describe, it, expect } from 'vitest'
import { ACHIEVEMENTS, type Achievement } from '../achievements.ts'

const VALID_CATEGORIES: Achievement['category'][] = ['cooking', 'streak', 'budget', 'variety']

describe('ACHIEVEMENTS catalogue', () => {
  it('is a non-empty list', () => {
    expect(ACHIEVEMENTS.length).toBeGreaterThan(0)
  })

  it('has unique achievement ids', () => {
    const ids = ACHIEVEMENTS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('uses only known categories', () => {
    for (const a of ACHIEVEMENTS) {
      expect(VALID_CATEGORIES).toContain(a.category)
    }
  })

  it('has positive requirement values and complete metadata', () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.requirement.value).toBeGreaterThan(0)
      expect(a.name.length).toBeGreaterThan(0)
      expect(a.description.length).toBeGreaterThan(0)
      expect(a.icon.length).toBeGreaterThan(0)
    }
  })

  it('exposes the first-cook achievement with a threshold of 1 meal', () => {
    const firstCook = ACHIEVEMENTS.find((a) => a.id === 'first_cook')
    expect(firstCook?.requirement).toEqual({ type: 'meals_cooked', value: 1 })
  })
})
