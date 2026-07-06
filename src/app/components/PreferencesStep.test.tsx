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
    planDays: 7,
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

  it('persists the selected plan budget', () => {
    const updatePreferences = vi.fn()
    render(
      <PreferencesStep
        preferences={basePrefs()}
        updatePreferences={updatePreferences}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByText('£80'))
    fireEvent.click(screen.getByText('Continue'))

    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ budget: 80 }),
    )
  })
})

describe('PreferencesStep — plan days', () => {
  function renderStep(overrides: Partial<UserPreferences> = {}) {
    const updatePreferences = vi.fn()
    render(
      <PreferencesStep
        preferences={basePrefs(overrides)}
        updatePreferences={updatePreferences}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    )
    return updatePreferences
  }

  const daysInput = () => screen.getByRole('spinbutton', { name: /number of days/i })

  it('defaults to 7 and includes planDays when continuing', () => {
    const updatePreferences = renderStep({ planDays: undefined as any })
    expect(daysInput()).toHaveValue(7)

    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ planDays: 7 }),
    )
  })

  it('seeds from preferences.planDays and persists stepper changes', () => {
    const updatePreferences = renderStep({ planDays: 3 })
    expect(daysInput()).toHaveValue(3)

    fireEvent.click(screen.getByRole('button', { name: /more days/i }))
    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ planDays: 4 }),
    )
  })

  it('clamps typed values to the 1-14 range', () => {
    const updatePreferences = renderStep()

    fireEvent.change(daysInput(), { target: { value: '99' } })
    expect(daysInput()).toHaveValue(14)

    fireEvent.change(daysInput(), { target: { value: '0' } })
    expect(daysInput()).toHaveValue(1)

    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ planDays: 1 }),
    )
  })

  it('clamps the stepper at both bounds', () => {
    renderStep({ planDays: 14 })
    fireEvent.click(screen.getByRole('button', { name: /more days/i }))
    expect(daysInput()).toHaveValue(14)

    fireEvent.change(daysInput(), { target: { value: '1' } })
    fireEvent.click(screen.getByRole('button', { name: /fewer days/i }))
    expect(daysInput()).toHaveValue(1)
  })
})
