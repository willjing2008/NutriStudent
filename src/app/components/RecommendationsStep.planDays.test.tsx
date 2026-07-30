import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { RecommendationsStep } from './RecommendationsStep';

// The backend generates whatever length it is told; this pins the contract
// that the frontend actually sends the user's chosen planDays (a payload
// without it silently falls back to a 7-day plan server-side).

// --- IO mocks ---------------------------------------------------------------
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
  calendarImportSupported: false,
  currentWeekStart: () => new Date('2026-07-01T00:00:00'),
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

const preferences = {
  goal: 'study',
  budget: 70,
  mealsPerDay: 3,
  shoppingDate: '2026-07-10',
  planDays: 3,
  maxCookingTime: 60,
  avoidIngredients: [],
  dietaryRestrictions: [],
  mealTimes: { breakfast: '08:00', lunch: '12:00', dinner: '18:00' },
  selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
} as any;

beforeEach(() => {
  authedPost.mockReset();
  authedPost.mockResolvedValue({ mealPlan: { meals: [] } });
  getUser.mockReset();
  getUser.mockResolvedValue({ data: { user: { id: 'user-1', email: 'w@x.com', user_metadata: {} } } });
  Element.prototype.scrollTo = vi.fn();
  window.scrollTo = vi.fn();
});

describe('RecommendationsStep - generate payload', () => {
  it('sends the chosen planDays to generate-meal-plan', async () => {
    // No saved plan and no queue week: mount triggers a fresh generation.
    render(
      <RecommendationsStep
        {...({
          preferences,
          onBack: vi.fn(),
          onReset: vi.fn(),
          activeNavTab: 'plan',
          onNavTabChange: vi.fn(),
          savedMealPlan: null,
          currentWeekMealPlan: null,
        } as any)}
      />,
    );

    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith(
        'generate-meal-plan',
        expect.objectContaining({ planDays: 3, shoppingDate: '2026-07-10' }),
      ),
    );
  });
});
