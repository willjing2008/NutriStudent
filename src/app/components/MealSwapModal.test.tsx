import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MealSwapModal } from './MealSwapModal';

// --- IO mocks -------------------------------------------------------------
// MealSwapModal hits these apiClient helpers (all authed — get-swap-options is a
// premium route gated server-side, so it sends the session JWT):
//   authedPost('get-swap-options')          -> Browse tab options (on mount)
//   authedPost('list-community-recipes')    -> Community tab (on switch)
//   authedPost('toggle-community-like')     -> like button
//   authedPost('save-community-recipe')     -> Create tab "share" path
//   authedFetch('upload-recipe-image')      -> Create tab image upload
// We control all of them so the unit never touches the network.
const { authedPost, authedFetch } = vi.hoisted(() => ({
  authedPost: vi.fn(),
  authedFetch: vi.fn(),
}));
vi.mock('../utils/apiClient', () => ({ authedPost, authedFetch }));

// authedPost serves several endpoints with different response shapes; dispatch
// by endpoint so each test gets the right payload from one shared mock.
function mockAuthedPost(over: { swapOptions?: unknown[]; recipes?: unknown[] } = {}) {
  const swapOptions = over.swapOptions;
  const recipes = over.recipes ?? [];
  authedPost.mockImplementation((endpoint: string) => {
    if (endpoint === 'get-swap-options') return Promise.resolve({ swapOptions });
    if (endpoint === 'list-community-recipes') return Promise.resolve({ recipes });
    return Promise.resolve({});
  });
}

// The component reads the current user via supabase.auth.getUser() on mount
// (needed before the Community fetch fires). Stub the shared client.
const { getUser } = vi.hoisted(() => ({ getUser: vi.fn() }));
vi.mock('../../utils/supabaseClient', () => ({
  supabase: { auth: { getUser } },
}));

// ImageWithFallback pulls in figma image helpers / network; stub to a plain img.
vi.mock('./figma/ImageWithFallback', () => ({
  ImageWithFallback: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

// --- Fixtures -------------------------------------------------------------
const currentMeal = {
  id: 'meal-current',
  name: 'Plain Chicken Rice',
  totalCost: 4,
  nutrition: { calories: 500, protein: 40, carbs: 50, fats: 10 },
  cookingTime: 20,
  servings: 2,
  category: 'lunch',
};

// Two browse options: one higher in calories/protein, one lower, so the
// nutrition deltas render with both signs.
function makeSwapOption(overrides: Record<string, unknown> = {}) {
  return {
    id: 'opt-1',
    name: 'Beef Burrito Bowl',
    description: 'A hearty high-protein bowl',
    cuisine: 'Mexican',
    image: 'beef.jpg',
    category: 'lunch',
    cookingTime: 25,
    servings: 2,
    difficulty: 'medium',
    tags: ['high-protein'],
    ingredients: [],
    ingredientNames: ['Beef', 'Rice'],
    instructions: ['Cook beef', 'Assemble'],
    totalCost: 6,
    nutrition: { calories: 650, protein: 55, carbs: 60, fats: 18 },
    similarity: {
      calorieMatch: 'close',
      proteinMatch: 'close',
      matchScore: '88',
    },
    imageUrl: 'beef.jpg',
    ...overrides,
  };
}

const optionHigher = makeSwapOption();
const optionLower = makeSwapOption({
  id: 'opt-2',
  name: 'Veggie Wrap',
  description: 'A light lunch wrap',
  cuisine: 'Mediterranean',
  category: 'lunch',
  nutrition: { calories: 400, protein: 20, carbs: 45, fats: 8 },
  similarity: { calorieMatch: 'close', proteinMatch: 'low', matchScore: '72' },
});

const communityRecipe = {
  id: 'com-1',
  name: 'Shared Tofu Stir Fry',
  description: 'A student favourite',
  image: 'tofu.jpg',
  imageUrl: 'tofu.jpg',
  category: 'dinner',
  cookingTime: 15,
  servings: 1,
  difficulty: 'easy',
  cuisine: 'Asian',
  tags: ['vegan'],
  ingredients: [],
  ingredientNames: ['Tofu'],
  instructions: ['Stir fry'],
  totalCost: 3,
  nutrition: { calories: 420, protein: 30, carbs: 35, fats: 12 },
  creatorId: 'creator-9',
  creatorName: 'Alex',
  createdAt: '2026-01-01',
  timesCooked: 4,
  likesCount: 2,
  likedByMe: false,
};

function renderModal(overrides: Partial<Parameters<typeof MealSwapModal>[0]> = {}) {
  const props = {
    currentMeal,
    goal: 'bulk',
    currentMealIds: ['meal-current'],
    onSwap: vi.fn(),
    onClose: vi.fn(),
    ...overrides,
  };
  render(<MealSwapModal {...props} />);
  return props;
}

beforeEach(() => {
  authedPost.mockReset();
  authedFetch.mockReset();
  getUser.mockReset();

  // Default: Browse fetch returns two options; community list is empty.
  mockAuthedPost({ swapOptions: [optionHigher, optionLower] });
  // Default: a logged-in user (so the Community fetch can fire).
  getUser.mockResolvedValue({
    data: { user: { id: 'user-1', email: 'will@example.com', user_metadata: {} } },
  });
});

describe('MealSwapModal — layering', () => {
  it('renders the full-screen modal above the bottom navigation so the apply button is tappable', () => {
    // BottomNavigation is fixed at z-[60]; the swap modal is a full-screen
    // takeover, so its root must sit ABOVE the nav — otherwise the nav overlaps
    // and intercepts taps on the footer "Swap Meal" button and the swap can't be
    // completed on mobile (even though the backend applies it).
    const { container } = render(
      <MealSwapModal
        currentMeal={currentMeal}
        goal="bulk"
        currentMealIds={[]}
        onSwap={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('fixed');
    expect(root.className).toContain('inset-0');
    expect(root.className).toContain('z-[70]');
  });
});

describe('MealSwapModal — Browse tab', () => {
  it('renders swap options with their nutrition deltas after the mount fetch', async () => {
    renderModal();

    // get-swap-options is fired on mount with the current meal context.
    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith(
        'get-swap-options',
        expect.objectContaining({
          currentRecipeId: 'meal-current',
          goal: 'bulk',
          currentMealIds: ['meal-current'],
        }),
      ),
    );

    // Both options render once loading resolves.
    expect(await screen.findByText('Beef Burrito Bowl')).toBeInTheDocument();
    expect(screen.getByText('Veggie Wrap')).toBeInTheDocument();

    // Match-score badge.
    expect(screen.getByText('88% Match')).toBeInTheDocument();

    // Nutrition deltas vs the current meal (500 cal / 40g protein):
    //   higher option: +150 cal, +15g protein
    //   lower option:  -100 cal, -20g protein
    expect(screen.getByText('(+150)')).toBeInTheDocument();
    expect(screen.getByText('(+15g)')).toBeInTheDocument();
    expect(screen.getByText('(-100)')).toBeInTheDocument();
    expect(screen.getByText('(-20g)')).toBeInTheDocument();
  });

  it('selecting an option enables the Swap action and calls onSwap with the mapped meal', async () => {
    const { onSwap, onClose } = renderModal();

    const optionCard = await screen.findByText('Beef Burrito Bowl');

    // Swap button is disabled until an option is selected.
    const swapButton = screen.getByRole('button', { name: /Swap Meal/i });
    expect(swapButton).toBeDisabled();
    expect(screen.getByText('Select a meal to swap')).toBeInTheDocument();

    fireEvent.click(optionCard);

    // Selection state surfaces in the footer and enables the button.
    expect(
      screen.getByText('✓ Beef Burrito Bowl selected'),
    ).toBeInTheDocument();
    expect(swapButton).toBeEnabled();

    fireEvent.click(swapButton);

    await waitFor(() => expect(onSwap).toHaveBeenCalledTimes(1));
    // The swapped meal carries derived fields (per-serving cost, mealType).
    expect(onSwap).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'opt-1',
        name: 'Beef Burrito Bowl',
        cost: 3, // totalCost 6 / servings 2
        mealType: 'Lunch',
      }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows the empty state when no swap options come back', async () => {
    mockAuthedPost({ swapOptions: [] });
    renderModal();

    expect(
      await screen.findByText(
        'No alternative meals found. Try adjusting your preferences.',
      ),
    ).toBeInTheDocument();
  });
});

describe('MealSwapModal — tab switching', () => {
  it('switches between Browse, Community and Create tabs', async () => {
    renderModal();

    // Default tab is Browse: option grid is shown.
    expect(await screen.findByText('Beef Burrito Bowl')).toBeInTheDocument();

    // Community tab -> empty state copy (default mock returns no recipes).
    fireEvent.click(screen.getByRole('button', { name: 'Community' }));
    expect(
      await screen.findByText('No community recipes yet'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Beef Burrito Bowl')).not.toBeInTheDocument();

    // Create tab -> the recipe form (Recipe Name field) is shown.
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(
      screen.getByPlaceholderText('e.g. Chicken Stir Fry'),
    ).toBeInTheDocument();
    expect(screen.queryByText('No community recipes yet')).not.toBeInTheDocument();

    // Back to Browse.
    fireEvent.click(screen.getByRole('button', { name: 'Browse' }));
    expect(screen.getByText('Beef Burrito Bowl')).toBeInTheDocument();
  });
});

describe('MealSwapModal — Community tab', () => {
  it('shows the empty state and fetches with the resolved user id', async () => {
    renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Community' }));

    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith('list-community-recipes', {
        userId: 'user-1',
      }),
    );
    expect(
      await screen.findByText('No community recipes yet'),
    ).toBeInTheDocument();
  });

  it('renders community recipes and enables swapping a selected one', async () => {
    mockAuthedPost({ swapOptions: [optionHigher, optionLower], recipes: [communityRecipe] });
    const { onSwap, onClose } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Community' }));

    const recipeCard = await screen.findByText('Shared Tofu Stir Fry');
    expect(screen.getByText('by Alex')).toBeInTheDocument();

    // Footer Swap button disabled until a recipe is selected.
    const communitySwap = screen.getByRole('button', { name: /Swap Meal/i });
    expect(communitySwap).toBeDisabled();

    fireEvent.click(recipeCard);
    expect(
      screen.getByText('✓ Shared Tofu Stir Fry selected'),
    ).toBeInTheDocument();
    expect(communitySwap).toBeEnabled();

    fireEvent.click(communitySwap);
    expect(onSwap).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'com-1',
        name: 'Shared Tofu Stir Fry',
        mealType: 'Dinner',
      }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('MealSwapModal — Create tab gating', () => {
  it('keeps Create & Swap disabled until name, image, ingredient and instruction are all set', async () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    const createButton = screen.getByRole('button', { name: /Create & Swap/i });
    expect(createButton).toBeDisabled();
    expect(
      screen.getByText('Fill in image, name, ingredients & instructions'),
    ).toBeInTheDocument();

    // Fill name.
    fireEvent.change(screen.getByPlaceholderText('e.g. Chicken Stir Fry'), {
      target: { value: 'My Custom Bowl' },
    });
    // Fill the first ingredient + instruction rows.
    fireEvent.change(screen.getByPlaceholderText('Ingredient 1'), {
      target: { value: 'Rice' },
    });
    fireEvent.change(screen.getByPlaceholderText('Step 1'), {
      target: { value: 'Cook the rice' },
    });

    // Still disabled: the required image is missing.
    expect(createButton).toBeDisabled();

    // Supply an image file via the hidden file input.
    const file = new File(['x'], 'bowl.png', { type: 'image/png' });
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(createButton).toBeEnabled());
    expect(screen.getByText('Ready to create your recipe')).toBeInTheDocument();
  });
});

describe('MealSwapModal — close', () => {
  it('calls onClose from the header close button', async () => {
    const { onClose } = renderModal();
    await screen.findByText('Beef Burrito Bowl');

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
