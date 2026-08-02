import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecommendationsStep } from './RecommendationsStep';

// This file deliberately does NOT mock ../config/launchPolicy: it pins the
// shipped default (scheduleEnabled: false), asserting no schedule UI leaks
// into the dashboard. If the flag is flipped back on, retire this file.

const { authedPost } = vi.hoisted(() => ({ authedPost: vi.fn() }));
vi.mock('../utils/apiClient', () => ({ authedPost }));

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

vi.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

vi.mock('./CelebrationOverlay', () => ({ CelebrationOverlay: () => null }));

// Sentinel stubs: if any of these render, the launch gate has a hole.
vi.mock('./PlanTabSubNav', () => ({
  PlanTabSubNav: () => <div data-testid="plan-tab-sub-nav" />,
}));
vi.mock('./ScheduleSettingsView', () => ({
  ScheduleSettingsView: () => <div data-testid="schedule-settings-view" />,
}));
vi.mock('./MealReminderBanner', () => ({
  MealReminderBanner: () => <div data-testid="meal-reminder-banner" />,
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

const conflict = {
  classId: 'class-1',
  className: 'Maths',
  classStart: '12:00',
  classEnd: '13:00',
  mealSlot: 'lunch',
  suggestion: 'Eat lunch after 13:00',
} as any;

beforeEach(() => {
  authedPost.mockReset();
  authedPost.mockResolvedValue({});
  getUser.mockReset();
  getUser.mockResolvedValue({
    data: { user: { id: 'user-1', email: 'will@example.com', user_metadata: {} } },
  });
  Element.prototype.scrollTo = vi.fn();
  window.scrollTo = vi.fn();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('RecommendationsStep - schedule feature launch-gated off', () => {
  it('renders the meal plan without any schedule surfaces, even with schedule data present', async () => {
    render(
      <RecommendationsStep
        preferences={preferences}
        onBack={vi.fn()}
        onReset={vi.fn()}
        activePlanId="plan-1"
        activeNavTab="plan"
        savedMealPlan={savedMealPlan}
        academicSchedule={{
          classes: [{ id: 'class-1', name: 'Maths', dayOfWeek: 1, startTime: '12:00', endTime: '13:00' }],
          testingPeriods: [],
          sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
          mealTimeOverrides: [],
          updatedAt: '2026-07-28T00:00:00.000Z',
        } as any}
        isTestingPeriod={true}
        mealConflicts={[conflict]}
        weekConflicts={new Map([[1, [conflict]], [2, [conflict]], [3, [conflict]]])}
        onSaveSchedule={vi.fn()}
      />,
    );

    // The meals view itself renders...
    expect(await screen.findByText('Oats')).toBeInTheDocument();
    // ...but the Plan | Schedule toggle, schedule view and reminder banner do not.
    expect(screen.queryByTestId('plan-tab-sub-nav')).not.toBeInTheDocument();
    expect(screen.queryByTestId('schedule-settings-view')).not.toBeInTheDocument();
    expect(screen.queryByTestId('meal-reminder-banner')).not.toBeInTheDocument();
    // The week strip stays, but carries no conflict "!" badges despite conflicts.
    expect(screen.queryByText('!')).not.toBeInTheDocument();
  });
});
