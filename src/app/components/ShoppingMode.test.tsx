import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ShoppingMode } from './ShoppingMode';

// BottomNavigation (rendered by ShoppingMode) calls useLanguage(); mock it so
// the unit renders in isolation without the real provider.
vi.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (k: string) => k,
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

type ShoppingIngredient = {
  name: string;
  amount: string;
  category: 'dairy' | 'produce' | 'meat' | 'pantry' | 'frozen' | 'bakery';
  estimatedPrice: number;
  checked: boolean;
};

// NOTE: ShoppingMode re-categorizes by ingredient *name* (categorizeIngredient),
// not by the `category` field — the field is intentionally "wrong" here to prove
// grouping comes from the name. Names chosen to land in 4 distinct sections:
//   Spinach -> produce, Chicken Breast -> meat, Milk -> dairy, Olive Oil -> pantry
function makeIngredient(
  overrides: Partial<ShoppingIngredient> = {},
): ShoppingIngredient {
  return {
    name: 'Spinach',
    amount: '200g',
    category: 'pantry',
    estimatedPrice: 1.5,
    checked: false,
    ...overrides,
  };
}

function fourAcrossCategories(): ShoppingIngredient[] {
  return [
    makeIngredient({ name: 'Spinach' }), // produce
    makeIngredient({ name: 'Chicken Breast' }), // meat
    makeIngredient({ name: 'Milk' }), // dairy
    makeIngredient({ name: 'Olive Oil' }), // pantry (fallback)
  ];
}

// Each shopping-list item is a button labelled "<name>, mark as collected".
function getItemButton(name: string): HTMLElement {
  return screen.getByRole('button', { name: `${name}, mark as collected` });
}

describe('ShoppingMode — grouping by category', () => {
  it('renders each ingredient under its name-derived category section', () => {
    render(
      <ShoppingMode
        ingredients={fourAcrossCategories()}
        storeName="Tesco"
        onBack={vi.fn()}
      />,
    );

    // All four category headers present (labels come from CATEGORY_CONFIG).
    expect(screen.getByText('Fresh Produce')).toBeInTheDocument();
    expect(screen.getByText('Meat & Fish')).toBeInTheDocument();
    expect(screen.getByText('Dairy & Eggs')).toBeInTheDocument();
    expect(screen.getByText('Pantry & Dry Goods')).toBeInTheDocument();

    // Items render by name.
    expect(getItemButton('Spinach')).toBeInTheDocument();
    expect(getItemButton('Chicken Breast')).toBeInTheDocument();
    expect(getItemButton('Milk')).toBeInTheDocument();
    expect(getItemButton('Olive Oil')).toBeInTheDocument();
  });

  it('groups multiple items of the same category together and orders produce before dairy', () => {
    const ingredients = [
      makeIngredient({ name: 'Milk' }), // dairy
      makeIngredient({ name: 'Spinach' }), // produce
      makeIngredient({ name: 'Tomato' }), // produce
    ];
    render(
      <ShoppingMode
        ingredients={ingredients}
        storeName="Tesco"
        onBack={vi.fn()}
      />,
    );

    // Two produce items, one dairy item — category counters reflect group sizes.
    const produceHeader = screen.getByText('Fresh Produce').closest('div');
    const dairyHeader = screen.getByText('Dairy & Eggs').closest('div');
    expect(produceHeader).not.toBeNull();
    expect(dairyHeader).not.toBeNull();
    // Header row shows "<checked>/<count>" for the section.
    expect(within(produceHeader!.parentElement!).getByText('0/2')).toBeInTheDocument();
    expect(within(dairyHeader!.parentElement!).getByText('0/1')).toBeInTheDocument();

    // Category order: produce header appears in the DOM before dairy header.
    const headers = screen.getAllByRole('heading', { level: 2 });
    const labels = headers.map((h) => h.textContent);
    expect(labels.indexOf('Fresh Produce')).toBeLessThan(
      labels.indexOf('Dairy & Eggs'),
    );
  });
});

describe('ShoppingMode — progress + footer state', () => {
  it('starts at 0 collected / 0% with all items remaining', () => {
    render(
      <ShoppingMode
        ingredients={fourAcrossCategories()}
        storeName="Tesco"
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByText('0 of 4 items collected')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();

    const progressbar = screen.getByRole('progressbar', { name: 'Items collected' });
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');

    // Footer.
    expect(screen.getByText('4 items remaining')).toBeInTheDocument();
    expect(screen.getByText('0/4 done')).toBeInTheDocument();
  });

  it('updates the collected count, percentage and footer when an item is toggled', () => {
    render(
      <ShoppingMode
        ingredients={fourAcrossCategories()}
        storeName="Tesco"
        onBack={vi.fn()}
      />,
    );

    fireEvent.click(getItemButton('Chicken Breast'));

    // 1 of 4 = 25%.
    expect(screen.getByText('1 of 4 items collected')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Items collected' }),
    ).toHaveAttribute('aria-valuenow', '25');

    // Footer reflects new state.
    expect(screen.getByText('3 items remaining')).toBeInTheDocument();
    expect(screen.getByText('1/4 done')).toBeInTheDocument();

    // The toggled button is now pressed; the meat section counter is 1/1.
    expect(getItemButton('Chicken Breast')).toHaveAttribute('aria-pressed', 'true');
    const meatHeader = screen.getByText('Meat & Fish').closest('div');
    expect(within(meatHeader!.parentElement!).getByText('1/1')).toBeInTheDocument();
  });

  it('toggles an item back off, restoring the count and remaining footer', () => {
    render(
      <ShoppingMode
        ingredients={fourAcrossCategories()}
        storeName="Tesco"
        onBack={vi.fn()}
      />,
    );

    const milk = () => getItemButton('Milk');

    fireEvent.click(milk());
    expect(screen.getByText('1 of 4 items collected')).toBeInTheDocument();
    expect(milk()).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(milk());
    expect(screen.getByText('0 of 4 items collected')).toBeInTheDocument();
    expect(screen.getByText('4 items remaining')).toBeInTheDocument();
    expect(screen.getByText('0/4 done')).toBeInTheDocument();
    expect(milk()).toHaveAttribute('aria-pressed', 'false');
  });

  it('reaches 100% / 0 remaining when every item is checked', () => {
    render(
      <ShoppingMode
        ingredients={fourAcrossCategories()}
        storeName="Tesco"
        onBack={vi.fn()}
      />,
    );

    ['Spinach', 'Chicken Breast', 'Milk', 'Olive Oil'].forEach((name) =>
      fireEvent.click(getItemButton(name)),
    );

    expect(screen.getByText('4 of 4 items collected')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('0 items remaining')).toBeInTheDocument();
    expect(screen.getByText('4/4 done')).toBeInTheDocument();
  });
});

describe('ShoppingMode — essentials + edge cases', () => {
  it('counts missing essentials into the total and toggles them independently', () => {
    const essentials = [
      {
        id: 'salt-1',
        name: 'Salt',
        emoji: '🧂',
        price: 0.5,
        unit: 'pack',
        amount: '1',
        category: 'pantry' as const,
      },
    ];
    render(
      <ShoppingMode
        ingredients={[makeIngredient({ name: 'Spinach' })]}
        storeName="Tesco"
        onBack={vi.fn()}
        missingEssentials={essentials}
      />,
    );

    // 1 ingredient + 1 essential = 2 total.
    expect(screen.getByText('0 of 2 items collected')).toBeInTheDocument();
    expect(screen.getByText('Essential Kitchen Items')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Salt, mark as collected' }),
    );

    expect(screen.getByText('1 of 2 items collected')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('1 items remaining')).toBeInTheDocument();
  });

  it('deduplicates ingredients with the same name (case-insensitive)', () => {
    const ingredients = [
      makeIngredient({ name: 'Milk' }),
      makeIngredient({ name: 'milk' }),
      makeIngredient({ name: 'MILK' }),
    ];
    render(
      <ShoppingMode
        ingredients={ingredients}
        storeName="Tesco"
        onBack={vi.fn()}
      />,
    );

    // Collapsed to a single item -> total of 1.
    expect(screen.getByText('0 of 1 items collected')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /mark as collected/ }),
    ).toHaveLength(1);
  });

  it('shows the empty state when there are no ingredients or essentials', () => {
    render(<ShoppingMode ingredients={[]} storeName="Tesco" onBack={vi.fn()} />);

    expect(screen.getByText('No Items Yet')).toBeInTheDocument();
    expect(screen.getByText('0 of 0 items collected')).toBeInTheDocument();
    // Guards against division-by-zero in the progress calc.
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('0 items remaining')).toBeInTheDocument();
  });

  it('fires onBack when the header back button is pressed', () => {
    const onBack = vi.fn();
    render(
      <ShoppingMode
        ingredients={fourAcrossCategories()}
        storeName="Tesco"
        onBack={onBack}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
