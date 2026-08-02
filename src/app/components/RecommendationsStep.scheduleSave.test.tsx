import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecommendationsStep } from './RecommendationsStep';

const { authedPost } = vi.hoisted(() => ({ authedPost: vi.fn() }));
vi.mock('../utils/apiClient', () => ({ authedPost }));

// These tests exercise the schedule feature, which is launch-gated off by
// default - force it on so the schedule UI is reachable.
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
    <button onClick={() => onViewChange('schedule')}>show-schedule</button>
  ),
}));

vi.mock('./ScheduleSettingsView', () => ({
  ScheduleSettingsView: ({
    onImportClasses,
    onManageClasses,
    onDeleteClass,
  }: {
    onImportClasses: () => void;
    onManageClasses: () => void;
    onDeleteClass?: (classId: string) => void;
  }) => (
    <div>
      <button onClick={onImportClasses}>open-import</button>
      <button onClick={onManageClasses}>open-editor</button>
      {onDeleteClass && (
        <button onClick={() => onDeleteClass('class-old')}>trigger-delete-class</button>
      )}
    </div>
  ),
}));

vi.mock('./AcademicScheduleEditor', () => ({
  AcademicScheduleEditor: ({
    onSave,
    saveError,
  }: {
    onSave: (schedule: any) => Promise<void>;
    saveError?: string | null;
  }) => (
    <div>
      {saveError && <div role="alert">{saveError}</div>}
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
    </div>
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

function renderPlan(onSaveSchedule: ReturnType<typeof vi.fn>, academicSchedule: any = null) {
  render(
    <RecommendationsStep
      preferences={preferences}
      onBack={vi.fn()}
      onReset={vi.fn()}
      activePlanId="plan-1"
      activeNavTab="plan"
      savedMealPlan={savedMealPlan}
      academicSchedule={academicSchedule}
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

  it('shows the save failure inside the schedule editor modal (P1-6)', async () => {
    const onSaveSchedule = vi.fn().mockResolvedValue(null);
    renderPlan(onSaveSchedule);

    fireEvent.click(await screen.findByRole('button', { name: 'show-schedule' }));
    fireEvent.click(screen.getByRole('button', { name: 'open-editor' }));
    fireEvent.click(screen.getByRole('button', { name: 'trigger-save-schedule' }));

    await waitFor(() => expect(onSaveSchedule).toHaveBeenCalledTimes(1));
    // Editor stays open with the error rendered inside it, not on the page
    // underneath the bottom sheet.
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/could not save your schedule/i);
    expect(screen.getByRole('button', { name: 'trigger-save-schedule' })).toBeInTheDocument();
  });
});

describe('RecommendationsStep - native per-class delete (P1-3)', () => {
  const existingSchedule = {
    classes: [
      { id: 'class-old', name: 'Mock Results Day', dayOfWeek: 4, startTime: '00:00', endTime: '23:59' },
      { id: 'class-keep', name: 'Maths', dayOfWeek: 1, startTime: '09:00', endTime: '10:00' },
    ],
    testingPeriods: [
      { id: 'p1', name: 'A-Levels', startDate: '2026-07-29', endDate: '2026-08-05', type: 'exam' },
    ],
    sleepSchedule: { bedtime: '22:30', wakeTime: '06:45', lastMealBeforeBed: 90 },
    mealTimeOverrides: [{ dayOfWeek: 1, mealSlot: 'lunch', time: '13:00' }],
    updatedAt: '2026-07-28T00:00:00.000Z',
  };

  it('deletes only the chosen class and re-sends exam periods, sleep and overrides', async () => {
    const onSaveSchedule = vi.fn().mockResolvedValue(existingSchedule);
    renderPlan(onSaveSchedule, existingSchedule);

    fireEvent.click(await screen.findByRole('button', { name: 'show-schedule' }));
    fireEvent.click(screen.getByRole('button', { name: 'trigger-delete-class' }));

    await waitFor(() => expect(onSaveSchedule).toHaveBeenCalledTimes(1));
    const [, payload] = onSaveSchedule.mock.calls[0];
    expect(payload.classes.map((c: { id: string }) => c.id)).toEqual(['class-keep']);
    // buildAcademicSchedule replaces the whole blob - anything omitted here
    // would silently wipe focus mode, sleep dinners and conflict overrides.
    expect(payload.testingPeriods).toEqual(existingSchedule.testingPeriods);
    expect(payload.sleepSchedule).toEqual(existingSchedule.sleepSchedule);
    expect(payload.mealTimeOverrides).toEqual(existingSchedule.mealTimeOverrides);
  });

  it('surfaces a delete failure instead of swallowing it', async () => {
    const onSaveSchedule = vi.fn().mockResolvedValue(null);
    renderPlan(onSaveSchedule, existingSchedule);

    fireEvent.click(await screen.findByRole('button', { name: 'show-schedule' }));
    fireEvent.click(screen.getByRole('button', { name: 'trigger-delete-class' }));

    await waitFor(() => expect(onSaveSchedule).toHaveBeenCalledTimes(1));
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/could not/i);
  });
});
