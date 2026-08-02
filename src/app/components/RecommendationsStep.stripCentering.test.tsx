import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecommendationsStep } from './RecommendationsStep';

// P1-7: the week strip must centre on today whenever its scroll container
// mounts - not only when mealPlan changes. Before the fix, switching
// Schedule -> Meals remounted the strip DOM without a mealPlan change, so the
// strip stayed scrolled to the window start (today minus 14 days).

const { authedPost } = vi.hoisted(() => ({ authedPost: vi.fn() }));
vi.mock('../utils/apiClient', () => ({ authedPost }));

// The schedule feature is launch-gated off by default - force it on so the
// schedule sub-view is reachable.
vi.mock('../config/launchPolicy', () => ({ launchPolicy: { scheduleEnabled: true } }));

const { getUser } = vi.hoisted(() => ({ getUser: vi.fn() }));
vi.mock('../../utils/supabaseClient', () => ({
  supabase: { auth: { getUser } },
}));

vi.mock('../utils/recipeImages', () => ({
  getRecipeImageWithCache: vi.fn().mockResolvedValue(null),
}));

vi.mock('../utils/systemCalendar', () => ({
  calendarImportSupported: true,
  currentWeekStart: () => new Date('2026-07-05T00:00:00'),
}));

vi.mock('../hooks/useMealReminders', () => ({
  useMealReminders: () => ({
    activeConflicts: [],
    dismissConflict: vi.fn(),
    requestNotificationPermission: vi.fn(),
  }),
}));

vi.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

vi.mock('./CelebrationOverlay', () => ({ CelebrationOverlay: () => null }));

vi.mock('./PlanTabSubNav', () => ({
  PlanTabSubNav: ({ onViewChange }: { onViewChange: (view: 'meals' | 'schedule') => void }) => (
    <div>
      <button onClick={() => onViewChange('schedule')}>show-schedule</button>
      <button onClick={() => onViewChange('meals')}>show-meals</button>
    </div>
  ),
}));

vi.mock('./ScheduleSettingsView', () => ({
  ScheduleSettingsView: () => <div>schedule-view</div>,
}));

const preferences = {
  gender: null,
  location: '',
  selectedStore: null,
  selectedStores: [],
  shoppingDate: '2026-07-05',
  mealsPerDay: 1,
  budget: 70,
  goal: 'study',
  maxCookingTime: 60,
  avoidIngredients: [],
  dietaryRestrictions: [],
  mealTimes: { breakfast: '08:00', lunch: '12:00', dinner: '18:00' },
  selectedMealSlots: ['breakfast'],
} as any;

const savedMealPlan = {
  meals: [
    {
      id: 'meal-1',
      name: 'Oats',
      description: '',
      image: '',
      mealType: 'Breakfast',
      category: 'breakfast',
      cookingTime: 5,
      servings: 1,
      difficulty: 'easy',
      tags: [],
      ingredients: [],
      ingredientNames: [],
      instructions: [],
      cost: 1,
      totalCost: 1,
      nutrition: { calories: 300, protein: 12, carbs: 40, fats: 8 },
      dayNumber: 1,
    },
  ],
  totalCost: 1,
  dailyBudget: 10,
  weeklyBudget: 70,
  withinBudget: true,
};

const scrollToSpy = vi.fn();

beforeEach(() => {
  authedPost.mockReset();
  authedPost.mockResolvedValue({});
  getUser.mockReset();
  getUser.mockResolvedValue({
    data: { user: { id: 'user-1', email: 'will@example.com', user_metadata: {} } },
  });
  scrollToSpy.mockReset();
  Element.prototype.scrollTo = scrollToSpy;
  window.scrollTo = vi.fn();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

/** Calls that look like the strip's instant centring (not window scroll resets). */
function centringCalls() {
  return scrollToSpy.mock.calls.filter(
    ([arg]) => arg && typeof arg === 'object' && arg.behavior === 'instant',
  );
}

describe('RecommendationsStep - week strip centring (P1-7)', () => {
  it('centres the strip on mount and again after a Schedule -> Meals sub-view switch', async () => {
    render(
      <RecommendationsStep
        preferences={preferences}
        onBack={vi.fn()}
        onReset={vi.fn()}
        activePlanId="plan-1"
        activeNavTab="plan"
        savedMealPlan={savedMealPlan}
        academicSchedule={null}
        onSaveSchedule={vi.fn()}
      />,
    );

    // Initial mount: the strip centres instantly on the selected day.
    await waitFor(() => expect(centringCalls().length).toBeGreaterThan(0));
    const initialCentrings = centringCalls().length;

    // Leaving the meals sub-view unmounts the strip DOM...
    fireEvent.click(await screen.findByRole('button', { name: 'show-schedule' }));
    expect(screen.getByText('schedule-view')).toBeInTheDocument();

    // ...and returning remounts it. The centring effect must fire again even
    // though mealPlan did not change (the pre-fix behavior left the strip at
    // the far-past left edge of its 14-days-back window).
    fireEvent.click(screen.getByRole('button', { name: 'show-meals' }));
    await waitFor(() => expect(centringCalls().length).toBeGreaterThan(initialCentrings));
  });
});
