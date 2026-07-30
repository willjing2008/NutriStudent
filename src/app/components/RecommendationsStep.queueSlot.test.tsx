import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecommendationsStep } from './RecommendationsStep';

// Regression tests for the P0 wrong-slot bug: in queue mode the Plan tab
// rendered one plan (the saved plan overwrote the queue week on mount) while
// swap and mark-as-cooked mutated queue slots reconstructed from that other
// plan's day numbers - the two core daily actions silently landed on a slot
// the user never saw. The invariant under test: the slot targeted by a
// mutation is exactly the slot rendered for the selected day.

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

// Native-calendar wrapper pulls in Capacitor; not under test here.
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

// Echo translation keys (matches the other component tests); covers
// PlanTabSubNav and BottomNavigation, which require the language context.
vi.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

// Animation overlay uses timers; irrelevant to slot targeting.
vi.mock('./CelebrationOverlay', () => ({ CelebrationOverlay: () => null }));

// Stub the swap modal to a single button that applies a fixed replacement -
// the modal's own await/error UX is covered by MealSwapModal.test.tsx. Here we
// only care which queue slot RecommendationsStep resolves for the apply, and
// whether the apply promise resolves or rejects (the modal keys its
// success/error UI off that), so the stub records the outcome.
const { swapBudget } = vi.hoisted(() => ({ swapBudget: { current: null as number | null } }));
const swapOutcome: { current: null | { status: 'resolved' | 'rejected'; message?: string } } = { current: null };
vi.mock('./MealSwapModal', () => ({
  MealSwapModal: ({ onSwap, budgetPerMealGbp }: { onSwap: (meal: any) => void | Promise<unknown>; budgetPerMealGbp: number }) => {
    swapBudget.current = budgetPerMealGbp;
    return (
    <button
      onClick={() => {
        Promise.resolve()
          .then(() => onSwap(NEW_MEAL))
          .then(() => { swapOutcome.current = { status: 'resolved' }; })
          .catch((e: any) => { swapOutcome.current = { status: 'rejected', message: e?.message }; });
      }}
    >
      apply-test-swap
    </button>
    );
  },
}));

const NEW_MEAL = {
  id: 'new-recipe-1',
  name: 'Replacement Meal',
  description: '',
  category: 'breakfast',
  cookingTime: 10,
  servings: 1,
  totalCost: 2,
  cost: 2,
  nutrition: { calories: 300, protein: 20, carbs: 30, fats: 10 },
  ingredients: [],
  ingredientNames: [],
  instructions: [],
};

// --- Fixtures ---------------------------------------------------------------
const TODAY_ISO = (() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
})();

function queueMeal(over: Record<string, unknown> = {}) {
  return {
    id: 'q-oats',
    name: 'Queue Oats',
    description: 'oats',
    image: '',
    mealType: 'Breakfast',
    // category deliberately drifts from the queue slot (this happens after a
    // recipe of another category is swapped into a slot): the mutation must
    // use mealSlot, not category.
    category: 'dinner',
    mealSlot: 'breakfast',
    cookingTime: 5,
    servings: 1,
    difficulty: 'easy',
    tags: [],
    ingredients: [],
    ingredientNames: [],
    instructions: [],
    cost: 2,
    totalCost: 2,
    nutrition: { calories: 350, protein: 12, carbs: 50, fats: 8 },
    dayNumber: 1,
    queueDayNumber: 8, // week 2, day 1
    isConsumed: false,
    ...over,
  };
}

// The queue week the backend returns for week 2 (days 8-14 remapped to 1-7).
const currentWeekMealPlan = {
  meals: [
    queueMeal(),
    queueMeal({ id: 'q-curry', name: 'Queue Curry', mealSlot: 'dinner', category: 'dinner', mealType: 'Dinner', dayNumber: 2, queueDayNumber: 9 }),
  ],
  budgetPerMealGbp: 3.81,
  totalCost: 0,
  dailyBudget: 10,
  weeklyBudget: 70,
  withinBudget: true,
  cookingDays: 7,
  totalMealsNeeded: 7,
  mealsPerDay: 1,
  weekNumber: 2,
  totalWeeks: 4,
};

// A saved plan with entirely different recipes/day numbers. Before the fix it
// overwrote the queue week on mount, so this is what got rendered while the
// mutations wrote into the queue.
const savedMealPlan = {
  meals: [
    queueMeal({ id: 's-frittata', name: 'Saved Frittata', mealSlot: undefined, queueDayNumber: undefined, category: 'breakfast', dayNumber: 1 }),
  ],
  totalCost: 5,
  dailyBudget: 10,
  weeklyBudget: 70,
  withinBudget: true,
};

const preferences = {
  goal: 'study',
  budget: 70,
  mealsPerDay: 1,
  shoppingDate: TODAY_ISO, // today = calendar offset 0 = first rendered day
  maxCookingTime: 60,
  avoidIngredients: [],
  dietaryRestrictions: [],
  selectedMealSlots: ['breakfast'],
} as any;

function renderPlanTab(over: Record<string, unknown> = {}) {
  const props = {
    preferences,
    onBack: vi.fn(),
    onReset: vi.fn(),
    activeNavTab: 'plan' as const,
    onNavTabChange: vi.fn(),
    savedMealPlan,
    currentWeekMealPlan,
    onSwapQueueMeal: vi.fn().mockResolvedValue(currentWeekMealPlan),
    onMarkMealConsumed: vi.fn().mockResolvedValue(true),
    ...over,
  };
  render(<RecommendationsStep {...(props as any)} />);
  return props;
}

beforeEach(() => {
  swapBudget.current = null;
  swapOutcome.current = null;
  authedPost.mockReset();
  authedPost.mockResolvedValue({});
  getUser.mockReset();
  getUser.mockResolvedValue({ data: { user: { id: 'user-1', email: 'w@x.com', user_metadata: {} } } });
  // jsdom has no scrollTo; the calendar strip centres itself on mount.
  Element.prototype.scrollTo = vi.fn();
  window.scrollTo = vi.fn();
});

describe('RecommendationsStep - queue mode slot targeting', () => {
  it('renders the queue week, not the saved plan, when both exist', async () => {
    renderPlanTab();

    // The queue week is the rendered source of truth...
    expect(await screen.findByText('Queue Oats')).toBeInTheDocument();
    // ...and the saved plan's meals must NOT leak into the plan view (when
    // they did, mutations wrote to queue slots derived from saved-plan days).
    expect(screen.queryByText('Saved Frittata')).not.toBeInTheDocument();
  });

  it('passes the queue cap to shuffle and swap mutations', async () => {
    authedPost.mockImplementation((endpoint: string) => {
      if (endpoint === 'shuffle-recipe') {
        return Promise.resolve({ replacementMeal: queueMeal({ id: 'replacement', name: 'Replacement Meal' }) });
      }
      return Promise.resolve({});
    });
    renderPlanTab();

    fireEvent.click(await screen.findByText('Queue Oats'));
    fireEvent.click(screen.getByRole('button', { name: 'Shuffle' }));

    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith(
        'shuffle-recipe',
        expect.objectContaining({ budgetPerMealGbp: 3.81 }),
      ),
    );

    fireEvent.click(await screen.findByText('Replacement Meal'));
    fireEvent.click(screen.getByRole('button', { name: 'Swap Meal' }));

    await waitFor(() => expect(swapBudget.current).toBe(3.81));
  });

  it('opens recipe detail without crashing when optional recipe data is missing', async () => {
    renderPlanTab({
      currentWeekMealPlan: {
        ...currentWeekMealPlan,
        meals: [
          queueMeal({
            nutrition: undefined,
            ingredients: undefined,
            instructions: undefined,
          }),
        ],
      },
    });

    fireEvent.click(await screen.findByText('Queue Oats'));

    expect(await screen.findByText('Ingredients')).toBeInTheDocument();
    expect(screen.getByText('No ingredients listed.')).toBeInTheDocument();
    expect(screen.getByText('No instructions listed.')).toBeInTheDocument();
    expect(screen.getAllByText('-').length).toBeGreaterThan(0);
  });

  it('marks cooked exactly the rendered slot: stamped absolute queue day + queue mealSlot', async () => {
    const { onMarkMealConsumed } = renderPlanTab();

    const markButton = await screen.findByRole('button', { name: /mark breakfast as cooked/i });
    fireEvent.click(markButton);

    await waitFor(() => expect(onMarkMealConsumed).toHaveBeenCalledTimes(1));
    // Day 8 = the rendered meal's queueDayNumber (week 2, day 1); slot is the
    // queue's mealSlot ('breakfast'), not the drifted recipe category ('dinner').
    expect(onMarkMealConsumed).toHaveBeenCalledWith('user-1', 8, 'breakfast');
  });

  it('swaps exactly the rendered slot and reports failure to the caller', async () => {
    const { onSwapQueueMeal } = renderPlanTab();

    // Open the rendered meal's recipe modal, then the swap modal.
    fireEvent.click(await screen.findByText('Queue Oats'));
    fireEvent.click(await screen.findByRole('button', { name: /swap meal/i }));

    // Apply the swap from the (stubbed) modal.
    fireEvent.click(await screen.findByRole('button', { name: 'apply-test-swap' }));

    await waitFor(() => expect(onSwapQueueMeal).toHaveBeenCalledTimes(1));
    expect(onSwapQueueMeal).toHaveBeenCalledWith('user-1', 8, 'breakfast', 'new-recipe-1');
    await waitFor(() => expect(swapOutcome.current?.status).toBe('resolved'));
  });

  it('rejects the swap apply (so the modal can show the error) when the backend swap fails', async () => {
    // The calendar hook returns null when queue-swap-meal fails.
    const onSwapQueueMeal = vi.fn().mockResolvedValue(null);
    renderPlanTab({ onSwapQueueMeal });

    fireEvent.click(await screen.findByText('Queue Oats'));
    fireEvent.click(await screen.findByRole('button', { name: /swap meal/i }));
    fireEvent.click(await screen.findByRole('button', { name: 'apply-test-swap' }));

    await waitFor(() => expect(swapOutcome.current?.status).toBe('rejected'));
    expect(swapOutcome.current?.message).toMatch(/failed to swap/i);
  });
});
