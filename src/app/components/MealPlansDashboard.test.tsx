import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MealPlansDashboard } from './MealPlansDashboard';

// useLanguage is mocked to echo translation keys so assertions can target the
// raw keys (e.g. "createNewPlan", "save", "cancel"). This covers both this
// component and the nested BottomNavigation, which also calls useLanguage.
vi.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

// authedPost is fired on mount (fetchMyRecipes) and on rename. We control it so
// the unit never hits the network.
const { authedPost } = vi.hoisted(() => ({ authedPost: vi.fn() }));
vi.mock('../utils/apiClient', () => ({
  authedPost,
  getUserFacingApiErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Network request failed',
}));

// ImageWithFallback pulls in figma image helpers / network; stub to a plain img.
vi.mock('./figma/ImageWithFallback', () => ({
  ImageWithFallback: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

type MealPlan = {
  id: string;
  name: string;
  description: string;
  image: string;
  week?: number;
  calories: number;
  protein: number;
  isActive?: boolean;
  onTrack?: boolean;
  tags?: string[];
};

const user = { id: 'user-1', email: 'will@example.com', user_metadata: { name: 'Will' } };

const activePlan: MealPlan = {
  id: 'plan-active',
  name: 'Bulk Week',
  description: 'High protein bulking plan',
  image: 'active.jpg',
  week: 2,
  calories: 2800,
  protein: 180,
  isActive: true,
  onTrack: true,
};

const savedPlan: MealPlan = {
  id: 'plan-saved',
  name: 'Cut Week',
  description: 'Lean cutting plan',
  image: 'saved.jpg',
  calories: 1900,
  protein: 150,
};

function renderDashboard(overrides: Partial<Parameters<typeof MealPlansDashboard>[0]> = {}) {
  const props = {
    user,
    onCreateNew: vi.fn(),
    onViewPlan: vi.fn(),
    onNavigateHome: vi.fn(),
    onNavigateGrocery: vi.fn(),
    onNavigateProfile: vi.fn(),
    activePlan,
    savedPlans: [savedPlan],
    onDeletePlan: vi.fn().mockResolvedValue(undefined),
    onEditPlan: vi.fn(),
    ...overrides,
  };
  render(<MealPlansDashboard {...props} />);
  return props;
}

beforeEach(() => {
  authedPost.mockReset();
  // fetchMyRecipes on mount resolves to no recipes by default.
  authedPost.mockResolvedValue({ recipes: [] });
});

describe('MealPlansDashboard — tab switching', () => {
  it('shows the active plan on the default Active tab', () => {
    renderDashboard();

    expect(screen.getByText('Bulk Week')).toBeInTheDocument();
    expect(screen.getByText('currentlyActive')).toBeInTheDocument();
    // History empty state should not be present on the Active tab.
    expect(screen.queryByText('No History Yet')).not.toBeInTheDocument();
  });

  it('switches to Saved and hides the active plan card', () => {
    renderDashboard();

    fireEvent.click(screen.getByText('Saved'));

    // Saved tab keeps the saved-plans list but drops the "currently active" header.
    expect(screen.queryByText('currentlyActive')).not.toBeInTheDocument();
    expect(screen.getByText('savedPlans')).toBeInTheDocument();
    expect(screen.getByText('Cut Week')).toBeInTheDocument();
  });

  it('shows the History empty state when the History tab is selected', () => {
    renderDashboard();

    fireEvent.click(screen.getByText('History'));

    expect(screen.getByText('No History Yet')).toBeInTheDocument();
    expect(
      screen.getByText('Your completed meal plans will appear here'),
    ).toBeInTheDocument();
    // Active/saved content is gone on History.
    expect(screen.queryByText('Bulk Week')).not.toBeInTheDocument();
    expect(screen.queryByText('savedPlans')).not.toBeInTheDocument();
  });
});

describe('MealPlansDashboard — navigation callbacks', () => {
  it('calls onNavigateProfile when the avatar button is clicked', () => {
    const { onNavigateProfile } = renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: 'Open profile' }));

    expect(onNavigateProfile).toHaveBeenCalledTimes(1);
  });

  it('calls onCreateNew from the header plus button', () => {
    const { onCreateNew } = renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: 'Create new plan' }));

    expect(onCreateNew).toHaveBeenCalledTimes(1);
  });

  it('calls onCreateNew from the large "Create New Plan" CTA when a plan is active', () => {
    const { onCreateNew } = renderDashboard();

    fireEvent.click(screen.getByText('createNewPlan'));

    expect(onCreateNew).toHaveBeenCalledTimes(1);
  });

  it('calls onViewPlan with the plan id when a saved plan card is clicked', () => {
    const { onViewPlan } = renderDashboard();

    // The card's clickable region is the plan name text inside the card button.
    fireEvent.click(screen.getByText('Cut Week'));

    expect(onViewPlan).toHaveBeenCalledWith('plan-saved');
  });
});

describe('MealPlansDashboard — empty active state', () => {
  it('renders the no-active-plan empty state and its Create Plan button', () => {
    const { onCreateNew } = renderDashboard({ activePlan: null });

    expect(screen.getByText('No Active Plan')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Create Plan'));
    expect(onCreateNew).toHaveBeenCalledTimes(1);
  });
});

describe('MealPlansDashboard — inline rename editor', () => {
  it('opens the inline editor with Save and Cancel when the pencil is clicked', () => {
    renderDashboard();

    expect(screen.queryByText('save')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Edit name of Cut Week' }));

    expect(screen.getByText('save')).toBeInTheDocument();
    expect(screen.getByText('cancel')).toBeInTheDocument();
    // Editor is seeded with the current plan name.
    expect(screen.getByDisplayValue('Cut Week')).toBeInTheDocument();
  });

  it('closes the editor without saving when Cancel is clicked', () => {
    renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: 'Edit name of Cut Week' }));
    fireEvent.click(screen.getByText('cancel'));

    expect(screen.queryByText('save')).not.toBeInTheDocument();
    // rename endpoint must not have been called (only the mount fetch).
    expect(authedPost).not.toHaveBeenCalledWith(
      'rename-meal-plan',
      expect.anything(),
    );
  });

  it('persists a new name via authedPost and closes the editor on Save', async () => {
    renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: 'Edit name of Cut Week' }));
    fireEvent.change(screen.getByDisplayValue('Cut Week'), {
      target: { value: 'Maintenance Week' },
    });
    fireEvent.click(screen.getByText('save'));

    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith('rename-meal-plan', {
        planId: 'plan-saved',
        planName: 'Maintenance Week',
      }),
    );
    // Optimistic update renames the card and the editor closes.
    expect(screen.getByText('Maintenance Week')).toBeInTheDocument();
    expect(screen.queryByText('save')).not.toBeInTheDocument();
  });
});

describe('MealPlansDashboard — custom recipes network states', () => {
  it('shows a retry state when custom recipes fail to load', async () => {
    authedPost
      .mockRejectedValueOnce(new Error("You're offline. Connect to the internet and try again."))
      .mockResolvedValueOnce({
        recipes: [
          {
            recipeId: 'recipe-1',
            name: 'Exam Day Porridge',
            category: 'breakfast',
            timesCooked: 2,
            lastCooked: '2026-06-17T08:00:00.000Z',
          },
        ],
      });

    renderDashboard();

    expect(await screen.findByText("Couldn't load your recipes")).toBeInTheDocument();
    expect(
      screen.getByText("You're offline. Connect to the internet and try again."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByText('Exam Day Porridge')).toBeInTheDocument();
    expect(screen.queryByText("Couldn't load your recipes")).not.toBeInTheDocument();
  });
});
