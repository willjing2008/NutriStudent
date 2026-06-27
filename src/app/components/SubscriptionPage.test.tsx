import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SubscriptionPage } from './SubscriptionPage';
import type { PurchasesPackage } from '../services/revenuecat';

// ── Mock the subscription context ────────────────────────────────────────────
// SubscriptionPage calls useSubscription() at the top of render. We mock the
// hook so the unit renders without <SubscriptionProvider> and never touches the
// RevenueCat SDK / network. Each test seeds the return value via setSubState().

type PurchaseResult = {
  success: boolean;
  cancelled?: boolean;
  error?: string;
};

type SubState = {
  isPro: boolean;
  isLoading: boolean;
  packages: { monthly?: PurchasesPackage; yearly?: PurchasesPackage };
  customerInfo: unknown;
  purchase: ReturnType<typeof vi.fn>;
  restore: ReturnType<typeof vi.fn>;
  showPaywall: ReturnType<typeof vi.fn>;
  showCustomerCenter: ReturnType<typeof vi.fn>;
};

const { useSubscription, subState } = vi.hoisted(() => {
  const subState = { current: null as unknown as SubState };
  return {
    subState,
    useSubscription: () => subState.current,
  };
});

vi.mock('../hooks/useSubscription', () => ({ useSubscription }));

// ── Helpers ──────────────────────────────────────────────────────────────────

// Build a minimal package shaped like what the component reads (product.price /
// product.priceString). Cast through unknown because the real PurchasesPackage
// has many readonly fields the component never touches.
function makePackage(
  id: string,
  priceString: string,
  price: number,
): PurchasesPackage {
  return {
    identifier: id,
    product: { identifier: id, priceString, price },
  } as unknown as PurchasesPackage;
}

const YEARLY_PKG = makePackage('yearly', '£49.99/yr', 49.99);
const MONTHLY_PKG = makePackage('monthly', '£4.99/mo', 4.99);

function setSubState(overrides: Partial<SubState> = {}): SubState {
  const state: SubState = {
    isPro: false,
    isLoading: false,
    packages: { yearly: YEARLY_PKG, monthly: MONTHLY_PKG },
    customerInfo: null,
    purchase: vi.fn().mockResolvedValue({ success: true } as PurchaseResult),
    restore: vi.fn().mockResolvedValue({ success: true } as PurchaseResult),
    showPaywall: vi.fn().mockResolvedValue(true),
    showCustomerCenter: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
  subState.current = state;
  return state;
}

// The plan cards are the <button>s containing the plan label text. selectedPlan
// is reflected by the green selected border class on the chosen card.
function getPlanCard(label: 'Yearly' | 'Monthly'): HTMLElement {
  const card = screen.getByText(label).closest('button');
  if (!card) throw new Error(`Plan card "${label}" not found`);
  return card;
}

function isSelected(card: HTMLElement): boolean {
  return card.className.includes('border-[#22C55E]');
}

beforeEach(() => {
  setSubState();
});

describe('SubscriptionPage — paywall view', () => {
  it('renders the upgrade headline and both plan options', () => {
    render(<SubscriptionPage />);

    expect(screen.getByText('Upgrade to Pro')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    // Prices come from the seeded packages.
    expect(screen.getByText('£49.99/yr')).toBeInTheDocument();
    expect(screen.getByText('£4.99/mo')).toBeInTheDocument();
  });

  it('defaults the Yearly plan to selected and Monthly to unselected', () => {
    render(<SubscriptionPage />);

    expect(isSelected(getPlanCard('Yearly'))).toBe(true);
    expect(isSelected(getPlanCard('Monthly'))).toBe(false);
  });

  it('moves the selection to Monthly when its card is clicked', () => {
    render(<SubscriptionPage />);

    fireEvent.click(getPlanCard('Monthly'));

    expect(isSelected(getPlanCard('Monthly'))).toBe(true);
    expect(isSelected(getPlanCard('Yearly'))).toBe(false);
  });

  it('moves the selection back to Yearly after selecting Monthly', () => {
    render(<SubscriptionPage />);

    fireEvent.click(getPlanCard('Monthly'));
    fireEvent.click(getPlanCard('Yearly'));

    expect(isSelected(getPlanCard('Yearly'))).toBe(true);
    expect(isSelected(getPlanCard('Monthly'))).toBe(false);
  });
});

describe('SubscriptionPage — subscribe action', () => {
  it('purchases the default (Yearly) package when Subscribe is pressed', async () => {
    const state = setSubState();
    render(<SubscriptionPage />);

    fireEvent.click(screen.getByRole('button', { name: /Subscribe Now/i }));

    await waitFor(() => expect(state.purchase).toHaveBeenCalledTimes(1));
    expect(state.purchase).toHaveBeenCalledWith(YEARLY_PKG);
    expect(state.showPaywall).not.toHaveBeenCalled();
  });

  it('purchases the Monthly package after switching the selected plan', async () => {
    const state = setSubState();
    render(<SubscriptionPage />);

    fireEvent.click(getPlanCard('Monthly'));
    fireEvent.click(screen.getByRole('button', { name: /Subscribe Now/i }));

    await waitFor(() => expect(state.purchase).toHaveBeenCalledTimes(1));
    expect(state.purchase).toHaveBeenCalledWith(MONTHLY_PKG);
  });

  it('falls back to the RevenueCat paywall when the selected package is missing', async () => {
    const state = setSubState({ packages: {} });
    render(<SubscriptionPage />);

    fireEvent.click(screen.getByRole('button', { name: /Subscribe Now/i }));

    await waitFor(() => expect(state.showPaywall).toHaveBeenCalledTimes(1));
    expect(state.purchase).not.toHaveBeenCalled();
  });

  it('shows an error message when the purchase fails (not cancelled)', async () => {
    const state = setSubState();
    state.purchase.mockResolvedValue({
      success: false,
      error: 'Card declined',
    } as PurchaseResult);
    render(<SubscriptionPage />);

    fireEvent.click(screen.getByRole('button', { name: /Subscribe Now/i }));

    expect(await screen.findByText('Card declined')).toBeInTheDocument();
  });

  it('does not surface an error when the purchase is cancelled by the user', async () => {
    const state = setSubState();
    state.purchase.mockResolvedValue({
      success: false,
      cancelled: true,
    } as PurchaseResult);
    render(<SubscriptionPage />);

    fireEvent.click(screen.getByRole('button', { name: /Subscribe Now/i }));

    await waitFor(() => expect(state.purchase).toHaveBeenCalledTimes(1));
    expect(
      screen.queryByText(/Something went wrong/i),
    ).not.toBeInTheDocument();
  });

  it('disables the Subscribe button (showing a spinner) while loading', () => {
    setSubState({ isLoading: true });
    const { container } = render(<SubscriptionPage />);

    // While loading the "Subscribe Now" label is replaced by a spinner, so
    // target the button that contains the animated spinner icon.
    const spinner = container.querySelector('.animate-spin');
    const subscribeBtn = spinner?.closest('button');
    expect(subscribeBtn).not.toBeNull();
    expect(subscribeBtn).toBeDisabled();
  });
});

describe('SubscriptionPage — restore action', () => {
  it('calls restore when Restore Purchases is pressed', async () => {
    const state = setSubState();
    render(<SubscriptionPage />);

    fireEvent.click(
      screen.getByRole('button', { name: /Restore Purchases/i }),
    );

    await waitFor(() => expect(state.restore).toHaveBeenCalledTimes(1));
    expect(state.purchase).not.toHaveBeenCalled();
  });

  it('shows an error message when restore finds no purchases', async () => {
    const state = setSubState();
    state.restore.mockResolvedValue({
      success: false,
      error: 'Nothing to restore',
    } as PurchaseResult);
    render(<SubscriptionPage />);

    fireEvent.click(
      screen.getByRole('button', { name: /Restore Purchases/i }),
    );

    expect(await screen.findByText('Nothing to restore')).toBeInTheDocument();
  });
});

describe('SubscriptionPage — sign out & back', () => {
  it('renders the Sign out link and fires onLogout when pressed', () => {
    const onLogout = vi.fn();
    render(<SubscriptionPage onLogout={onLogout} />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('omits the Sign out link when no onLogout handler is provided', () => {
    render(<SubscriptionPage />);

    expect(
      screen.queryByRole('button', { name: 'Sign out' }),
    ).not.toBeInTheDocument();
  });

  it('fires onBack from the header back button when not mandatory', () => {
    const onBack = vi.fn();
    render(<SubscriptionPage onBack={onBack} />);

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('hides the back button when the paywall is mandatory', () => {
    render(<SubscriptionPage onBack={vi.fn()} mandatory />);

    expect(
      screen.queryByRole('button', { name: 'Back' }),
    ).not.toBeInTheDocument();
  });
});

describe('SubscriptionPage — active subscriber view', () => {
  it('shows the active state and Manage Subscription instead of the paywall', () => {
    setSubState({ isPro: true });
    render(<SubscriptionPage />);

    expect(screen.getByText('NutriStudent Pro')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Manage Subscription/i }),
    ).toBeInTheDocument();
    // Paywall controls are absent for an active subscriber.
    expect(
      screen.queryByRole('button', { name: /Subscribe Now/i }),
    ).not.toBeInTheDocument();
  });

  it('opens the Customer Center when Manage Subscription is pressed', async () => {
    const state = setSubState({ isPro: true });
    render(<SubscriptionPage />);

    fireEvent.click(
      screen.getByRole('button', { name: /Manage Subscription/i }),
    );

    await waitFor(() =>
      expect(state.showCustomerCenter).toHaveBeenCalledTimes(1),
    );
  });
});
