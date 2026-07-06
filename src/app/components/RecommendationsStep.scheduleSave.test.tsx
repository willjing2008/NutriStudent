import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecommendationsStep } from './RecommendationsStep';

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
    <button onClick={() => onViewChange('schedule')}>show-schedule</button>
  ),
}));

vi.mock('./ScheduleSettingsView', () => ({
  ScheduleSettingsView: ({
    onImportClasses,
    onManageClasses,
  }: {
    onImportClasses: () => void;
    onManageClasses: () => void;
  }) => (
    <div>
      <button onClick={onImportClasses}>open-import</button>
      <button onClick={onManageClasses}>open-editor</button>
    </div>
  ),
}));

vi.mock('./AcademicScheduleEditor', () => ({
  AcademicScheduleEditor: ({
    onSave,
  }: {
    onSave: (schedule: any) => Promise<void>;
  }) => (
    <button
      onClick={() => {
        void onSave({
          classes: [],
          testingPeriods: [],
          sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
          mealTimeOverrides: [],
        });
      }}
    >
      trigger-save-schedule
    </button>
  ),
}));

const importOutcome = vi.hoisted(() => ({
  current: 'idle' as 'idle' | 'resolved' | 'rejected',
}));

vi.mock('./CalendarImportModal', () => ({
  CalendarImportModal: ({
    onImport,
  }: {
    onImport: (classes: any[]) => Promise<void>;
  }) => (
    <button
      onClick={() => {
        Promise.resolve()
          .then(() => onImport([
            {
              id: 'class-1',
              name: 'Biology',
              dayOfWeek: 1,
              startTime: '09:00',
              endTime: '10:00',
            },
          ]))
          .then(() => { importOutcome.current = 'resolved'; })
          .catch(() => { importOutcome.current = 'rejected'; });
      }}
    >
      trigger-import-classes
    </button>
  ),
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

function renderPlan(onSaveSchedule: ReturnType<typeof vi.fn>) {
  render(
    <RecommendationsStep
      preferences={preferences}
      onBack={vi.fn()}
      onReset={vi.fn()}
      activePlanId="plan-1"
      activeNavTab="plan"
      savedMealPlan={savedMealPlan}
      academicSchedule={null}
      onSaveSchedule={onSaveSchedule}
    />,
  );
}

beforeEach(() => {
  importOutcome.current = 'idle';
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

describe('RecommendationsStep - schedule persistence failures', () => {
  it('opens shopping mode when persisted preferences do not include selectedStores', () => {
    const preferencesWithoutStores = { ...preferences } as any;
    delete preferencesWithoutStores.selectedStores;

    render(
      <RecommendationsStep
        preferences={preferencesWithoutStores}
        onBack={vi.fn()}
        onReset={vi.fn()}
        activePlanId="plan-1"
        activeNavTab="plan"
        savedMealPlan={savedMealPlan}
        academicSchedule={null}
        onSaveSchedule={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /go shopping/i }));

    expect(
      screen.getByRole('heading', { name: 'Shopping List' }),
    ).toBeInTheDocument();
  });

  it('keeps the schedule editor open when save returns null', async () => {
    const onSaveSchedule = vi.fn().mockResolvedValue(null);
    renderPlan(onSaveSchedule);

    fireEvent.click(await screen.findByRole('button', { name: 'show-schedule' }));
    fireEvent.click(screen.getByRole('button', { name: 'open-editor' }));
    fireEvent.click(screen.getByRole('button', { name: 'trigger-save-schedule' }));

    await waitFor(() => expect(onSaveSchedule).toHaveBeenCalledTimes(1));
    expect(
      screen.getByRole('button', { name: 'trigger-save-schedule' }),
    ).toBeInTheDocument();
  });

  it('rejects calendar import when saving imported classes returns null', async () => {
    const onSaveSchedule = vi.fn().mockResolvedValue(null);
    renderPlan(onSaveSchedule);

    fireEvent.click(await screen.findByRole('button', { name: 'show-schedule' }));
    fireEvent.click(screen.getByRole('button', { name: 'open-import' }));
    fireEvent.click(screen.getByRole('button', { name: 'trigger-import-classes' }));

    await waitFor(() => expect(importOutcome.current).toBe('rejected'));
  });
});
