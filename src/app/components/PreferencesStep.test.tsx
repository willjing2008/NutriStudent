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
    budgetPerMealGbp: 4.25,
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

describe('PreferencesStep — budget per meal', () => {
  function renderStep(overrides: Partial<UserPreferences> = {}) {
    const updatePreferences = vi.fn()
    const onNext = vi.fn()
    render(
      <PreferencesStep
        preferences={basePrefs(overrides)}
        updatePreferences={updatePreferences}
        onNext={onNext}
        onBack={vi.fn()}
      />,
    )
    return { updatePreferences, onNext }
  }

  const budgetInput = () => screen.getByRole('spinbutton', { name: /budget per meal/i }) as HTMLInputElement
  const continueButton = () => screen.getByText('Continue').closest('button') as HTMLButtonElement

  it('offers no preset amount buttons — typed entry only', () => {
    renderStep()
    for (const amount of ['£40', '£60', '£80', '£100']) {
      expect(screen.queryByText(amount)).not.toBeInTheDocument()
    }
    expect(budgetInput()).toBeInTheDocument()
  })

  it('starts empty with a dim placeholder and blocks Continue until filled', () => {
    const { onNext } = renderStep({ budgetPerMealGbp: null })
    expect(budgetInput().value).toBe('')
    expect(budgetInput().placeholder).toBe('4.25')
    expect(budgetInput()).toBeRequired()
    expect(continueButton()).toBeDisabled()

    fireEvent.click(continueButton())
    expect(onNext).not.toHaveBeenCalled()

    fireEvent.change(budgetInput(), { target: { value: '3.50' } })
    expect(continueButton()).toBeEnabled()
  })

  it('persists a valid canonical per-meal budget and formats it on blur', () => {
    const { updatePreferences } = renderStep({ budgetPerMealGbp: null })

    fireEvent.change(budgetInput(), { target: { value: '3.5' } })
    fireEvent.blur(budgetInput())
    expect(budgetInput().value).toBe('3.50')

    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ budgetPerMealGbp: 3.5 }),
    )
    expect(updatePreferences.mock.calls[0][0]).not.toHaveProperty('budget')
  })

  it.each(['0.99', '50.01', '3.999', '-2'])(
    'rejects out-of-contract amount %s with a visible error',
    (value) => {
      const { onNext } = renderStep({ budgetPerMealGbp: null })

      fireEvent.change(budgetInput(), { target: { value } })
      expect(continueButton()).toBeDisabled()
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Enter an amount from £1.00 to £50.00.',
      )

      fireEvent.click(continueButton())
      expect(onNext).not.toHaveBeenCalled()
    },
  )

  it.each(['1', '50', '4.25'])('accepts boundary amount %s', (value) => {
    const { updatePreferences } = renderStep({ budgetPerMealGbp: null })

    fireEvent.change(budgetInput(), { target: { value } })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ budgetPerMealGbp: Number(value) }),
    )
  })

  it('seeds an existing per-meal budget without re-requiring entry', () => {
    const { updatePreferences } = renderStep({ budgetPerMealGbp: 2.5 })
    expect(budgetInput().value).toBe('2.50')

    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ budgetPerMealGbp: 2.5 }),
    )
  })
})

describe('PreferencesStep — hierarchical allergy picker', () => {
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

  it('offers the six launch groups as one-tap chips', () => {
    renderStep()
    for (const group of ['Nuts', 'Seafood', 'Dairy', 'Gluten/Wheat', 'Eggs', 'Soy']) {
      expect(screen.getByRole('button', { name: new RegExp(`^${group.replace('/', '\\/')}`) })).toBeInTheDocument()
    }
  })

  it('selecting a broad group persists the group choice', () => {
    const updatePreferences = renderStep()

    fireEvent.click(screen.getByRole('button', { name: /^Seafood/ }))
    fireEvent.click(screen.getByText('Continue'))

    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ avoidIngredients: ['Seafood'] }),
    )
  })

  it('selecting only a sub-option persists just that one', () => {
    const updatePreferences = renderStep()

    fireEvent.click(screen.getByRole('button', { name: 'Show Seafood options' }))
    fireEvent.click(screen.getByRole('button', { name: 'Fish' }))
    fireEvent.click(screen.getByText('Continue'))

    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ avoidIngredients: ['Fish'] }),
    )
  })

  it('selecting a group absorbs its sub-options and disables their chips', () => {
    const updatePreferences = renderStep()

    fireEvent.click(screen.getByRole('button', { name: 'Show Nuts options' }))
    fireEvent.click(screen.getByRole('button', { name: 'Peanuts' }))
    fireEvent.click(screen.getByRole('button', { name: /^Nuts/ }))

    expect(screen.getByRole('button', { name: 'Peanuts' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Tree Nuts' })).toBeDisabled()

    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ avoidIngredients: ['Nuts'] }),
    )
  })

  it('normalizes legacy saved values into canonical taxonomy choices', () => {
    const updatePreferences = renderStep({
      avoidIngredients: ['peanuts', 'milk', 'gluten', 'Coriander'],
    })

    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({
        avoidIngredients: ['Peanuts', 'Milk', 'Gluten/Wheat', 'Coriander'],
      }),
    )
  })

  it('keeps free-text dislikes through the search box', () => {
    const updatePreferences = renderStep()

    const search = screen.getByPlaceholderText('Search ingredients to avoid...')
    fireEvent.change(search, { target: { value: 'Onion' } })
    fireEvent.click(screen.getByRole('button', { name: 'Onion' }))
    fireEvent.click(screen.getByText('Continue'))

    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ avoidIngredients: ['Onion'] }),
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

  it('allows clearing the field while typing and defaults to 7 on blur', () => {
    renderStep({ planDays: 3 })

    fireEvent.change(daysInput(), { target: { value: '' } })
    expect(daysInput()).toHaveValue(null)

    fireEvent.change(daysInput(), { target: { value: '12' } })
    expect(daysInput()).toHaveValue(12)

    fireEvent.change(daysInput(), { target: { value: '' } })
    fireEvent.blur(daysInput())
    expect(daysInput()).toHaveValue(7)
  })

  it('persists 7 when continuing with an empty field', () => {
    const updatePreferences = renderStep({ planDays: 3 })

    fireEvent.change(daysInput(), { target: { value: '' } })
    fireEvent.click(screen.getByText('Continue'))
    expect(updatePreferences).toHaveBeenCalledWith(
      expect.objectContaining({ planDays: 7 }),
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
