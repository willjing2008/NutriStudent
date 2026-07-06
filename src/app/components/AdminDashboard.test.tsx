import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AdminDashboard } from './AdminDashboard';
import { ConfirmProvider } from '../hooks/useConfirm';

const { mockAuthedFetch } = vi.hoisted(() => ({ mockAuthedFetch: vi.fn() }));

vi.mock('../utils/apiClient', () => ({
  authedFetch: mockAuthedFetch,
  authedPost: vi.fn(),
  getUserFacingApiErrorMessage: (e: unknown) => String(e),
}));

// Seeded recipes can have ingredients with no estimatedPrice and no nutrition
// block at all — the detail view crashed the whole app on those (P0).
const pricelessRecipe = {
  id: '1',
  name: 'Priceless Pie',
  description: 'A recipe with no ingredient prices',
  cuisine: 'british',
  category: 'dinner',
  cookingTime: 30,
  servings: 2,
  difficulty: 'easy',
  ingredients: [
    { name: 'Flour', amount: '200g' }, // no estimatedPrice
    { name: 'Butter', amount: '100g', estimatedPrice: null },
    { name: 'Sugar', amount: '50g', estimatedPrice: 0.65 },
  ],
  instructions: ['Mix', 'Bake'],
  nutrition: undefined,
  tags: [],
  benefits: [],
  meal_type: 'work',
  recipe_category: 'Dinner',
};

const jsonResponse = (body: unknown) => ({ json: async () => body });

beforeEach(() => {
  mockAuthedFetch.mockReset();
  mockAuthedFetch.mockImplementation(async (path: string) => {
    if (path === 'admin/all-recipes') {
      return jsonResponse({
        recipes: [{ key: 'recipe:work:1', id: '1', name: 'Priceless Pie', meal_type: 'work', recipe_category: 'Dinner', cookingTime: 30 }],
      });
    }
    if (path === 'admin/recipe/work/1') {
      return jsonResponse({ recipe: pricelessRecipe });
    }
    return jsonResponse({});
  });
});

describe('AdminDashboard recipe detail', () => {
  it('renders a recipe whose ingredients have no estimatedPrice without throwing', async () => {
    render(
      <ConfirmProvider>
        <AdminDashboard />
      </ConfirmProvider>
    );

    fireEvent.click(await screen.findByText('Priceless Pie'));

    // Detail opened (heading) instead of crashing the tree
    expect(await screen.findByRole('heading', { name: 'Priceless Pie' })).toBeInTheDocument();
    expect(screen.getByText('Flour')).toBeInTheDocument();
    // Missing/null prices render a dash; real prices still render
    expect(screen.getAllByText('—').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('£0.65')).toBeInTheDocument();
  });
});
