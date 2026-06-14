import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PreferencesStep } from './PreferencesStep'
import type { UserPreferences } from '../App'

function basePrefs(overrides: Partial<UserPreferences> = {}): UserPreferences {
  return {
    gender: null,
    location: '',
    selectedStore: null,
    selectedStores: [],
    shoppingDate: '2026-06-20',
    mealsPerDay: 3,
    budget: 100,
    goal: 'study',
    maxCookingTime: 30,
    avoidIngredients: [],
    mealTimes: { breakfast: '08:00', lunch: '12:00', dinner: '18:00' },
    selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
    dietaryRestrictions: [],
    ...overrides,
  }
}

describe('PreferencesStep — dietary restrictions', () => {
  it('persists a toggled restriction when continuing', () => {
    const updatePreferences = vi.fn()
    render(
      <PreferencesStep
        preferences={basePrefs()}
        updatePreferences={updatePreferences}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByText('Vegetarian'))
    fireEvent.click(screen.getByText('Continue'))

    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ dietaryRestrictions: ['vegetarian'] }),
    )
  })

  it('seeds existing restrictions from preferences', () => {
    const updatePreferences = vi.fn()
    render(
      <PreferencesStep
        preferences={basePrefs({ dietaryRestrictions: ['vegan'] })}
        updatePreferences={updatePreferences}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByText('Continue'))

    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ dietaryRestrictions: ['vegan'] }),
    )
  })
})
