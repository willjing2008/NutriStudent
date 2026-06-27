import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import type { CustomerInfo, PurchaseResult } from '../services/revenuecat';

// ── Mocked revenuecat service ────────────────────────────────────────────────
//
// useSubscription imports everything (including the module-level boolean
// `isNativePlatform`) from ../services/revenuecat. We mock the whole module so
// the hook renders in isolation with no Capacitor / network / SDK calls.
//
// `isNativePlatform` is exposed via a getter backed by a hoisted holder so each
// test can flip web vs native BEFORE the module under test is (re)imported.
const rc = vi.hoisted(() => {
  const holder = { isNative: false };
  return {
    holder,
    initializeRevenueCat: vi.fn(async () => {}),
    loginUser: vi.fn(),
    logoutUser: vi.fn(),
    getCustomerInfo: vi.fn(),
    addCustomerInfoListener: vi.fn(async () => {}),
    hasProEntitlement: vi.fn(),
    getCurrentOffering: vi.fn(),
    purchasePackage: vi.fn(),
    restorePurchases: vi.fn(),
    syncPurchases: vi.fn(async () => {}),
    presentPaywall: vi.fn(),
    presentPaywallIfNeeded: vi.fn(),
    presentCustomerCenter: vi.fn(),
    getPackagesByType: vi.fn(),
  };
});

vi.mock('../services/revenuecat', () => ({
  initializeRevenueCat: rc.initializeRevenueCat,
  loginUser: rc.loginUser,
  logoutUser: rc.logoutUser,
  getCustomerInfo: rc.getCustomerInfo,
  addCustomerInfoListener: rc.addCustomerInfoListener,
  hasProEntitlement: rc.hasProEntitlement,
  getCurrentOffering: rc.getCurrentOffering,
  purchasePackage: rc.purchasePackage,
  restorePurchases: rc.restorePurchases,
  syncPurchases: rc.syncPurchases,
  presentPaywall: rc.presentPaywall,
  presentPaywallIfNeeded: rc.presentPaywallIfNeeded,
  presentCustomerCenter: rc.presentCustomerCenter,
  getPackagesByType: rc.getPackagesByType,
  ENTITLEMENT_ID: 'NutriStudent Pro',
  get isNativePlatform() {
    return rc.holder.isNative;
  },
}));

// ── Test helpers ─────────────────────────────────────────────────────────────

// A CustomerInfo whose `active` entitlements decide Pro status. We only ever
// read it through the mocked hasProEntitlement, so a minimal shape is fine.
const customerInfo = (active: Record<string, unknown> = {}): CustomerInfo =>
  ({
    entitlements: { active },
  }) as unknown as CustomerInfo;

const PRO_INFO = customerInfo({ 'NutriStudent Pro': { isActive: true } });
const FREE_INFO = customerInfo({});

// Renders the provider tree around the hook under test.
const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(SubscriptionProvider, null, children);

// We re-import the module per test so the mocked `isNativePlatform` getter is
// evaluated freshly for each web/native scenario.
let SubscriptionProvider: typeof import('./useSubscription').SubscriptionProvider;
let useSubscription: typeof import('./useSubscription').useSubscription;
let useIsPro: typeof import('./useSubscription').useIsPro;

async function loadHook() {
  vi.resetModules();
  const mod = await import('./useSubscription');
  SubscriptionProvider = mod.SubscriptionProvider;
  useSubscription = mod.useSubscription;
  useIsPro = mod.useIsPro;
}

beforeEach(() => {
  vi.clearAllMocks();
  rc.holder.isNative = false;
  // hasProEntitlement defaults to a faithful reimplementation of the real one.
  rc.hasProEntitlement.mockImplementation(
    (info: CustomerInfo) => 'NutriStudent Pro' in (info.entitlements.active ?? {}),
  );
  rc.getCustomerInfo.mockResolvedValue(FREE_INFO);
  rc.getCurrentOffering.mockResolvedValue(null);
  rc.getPackagesByType.mockReturnValue({});
  // Silence the provider's console.error on init failures.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── Tests ────────────────────────────────────────────────────────────────────

describe('useSubscription — guard', () => {
  it('throws when used outside of a SubscriptionProvider', async () => {
    await loadHook();
    // Suppress React's error-boundary console noise for the expected throw.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useSubscription())).toThrow(
      'useSubscription must be used inside <SubscriptionProvider>',
    );
    spy.mockRestore();
  });
});

describe('useSubscription — isReady transition', () => {
  it('starts not-ready and flips to ready after init completes', async () => {
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(rc.initializeRevenueCat).toHaveBeenCalledTimes(1);
    expect(rc.addCustomerInfoListener).toHaveBeenCalledTimes(1);
    expect(rc.getCustomerInfo).toHaveBeenCalled();
    expect(rc.syncPurchases).toHaveBeenCalledTimes(1);
  });

  it('still becomes ready when initialization throws', async () => {
    await loadHook();
    rc.initializeRevenueCat.mockRejectedValueOnce(new Error('boom'));

    const { result } = renderHook(() => useSubscription(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
  });
});

describe('isPro derivation — web vs native (documented current behaviour)', () => {
  it('on web: isPro is true regardless of entitlement (paywall bypassed)', async () => {
    rc.holder.isNative = false;
    await loadHook();
    // Even with NO active entitlement, web users are treated as Pro.
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.isPro).toBe(true);
    // The web branch must NOT consult the entitlement check.
    expect(rc.hasProEntitlement).not.toHaveBeenCalled();
  });

  it('on native with an active entitlement: isPro is true', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(PRO_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.isPro).toBe(true);
    expect(rc.hasProEntitlement).toHaveBeenCalledWith(PRO_INFO);
  });

  it('on native without an active entitlement: isPro is false', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.isPro).toBe(false);
    expect(rc.hasProEntitlement).toHaveBeenCalledWith(FREE_INFO);
  });
});

describe('useIsPro convenience hook', () => {
  it('mirrors the isPro value from context (native, free user => false)', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);

    const { result } = renderHook(() => useIsPro(), { wrapper });

    await waitFor(() => expect(result.current).toBe(false));
  });
});

describe('identify — delegates to the service', () => {
  it('logs the user in and processes the returned customer info (native => Pro)', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO); // anonymous at init
    rc.loginUser.mockResolvedValue(PRO_INFO); // becomes Pro after identify

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.isPro).toBe(false);

    await act(async () => {
      await result.current.identify('user-42');
    });

    expect(rc.loginUser).toHaveBeenCalledWith('user-42');
    expect(result.current.isPro).toBe(true);
    expect(result.current.customerInfo).toBe(PRO_INFO);
  });

  it('clears isLoading after identify resolves', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.loginUser.mockResolvedValue(FREE_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    await act(async () => {
      await result.current.identify('user-1');
    });

    expect(result.current.isLoading).toBe(false);
  });
});

describe('reset — delegates to the service', () => {
  it('logs the user out and reprocesses customer info (native => drops Pro)', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(PRO_INFO); // Pro at init
    rc.logoutUser.mockResolvedValue(FREE_INFO); // anonymous after reset

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.isPro).toBe(true);

    await act(async () => {
      await result.current.reset();
    });

    expect(rc.logoutUser).toHaveBeenCalledTimes(1);
    expect(result.current.isPro).toBe(false);
    expect(result.current.customerInfo).toBe(FREE_INFO);
  });
});

describe('purchase — delegates to the service', () => {
  it('processes the returned customerInfo on a successful purchase (native)', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);
    const purchaseResult: PurchaseResult = { success: true, customerInfo: PRO_INFO };
    rc.purchasePackage.mockResolvedValue(purchaseResult);

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.isPro).toBe(false);

    const pkg = { identifier: 'monthly' } as unknown as Parameters<
      typeof result.current.purchase
    >[0];

    let returned: PurchaseResult | undefined;
    await act(async () => {
      returned = await result.current.purchase(pkg);
    });

    expect(rc.purchasePackage).toHaveBeenCalledWith(pkg);
    expect(returned).toBe(purchaseResult);
    expect(result.current.isPro).toBe(true);
  });

  it('does not change customerInfo when the purchase result has none', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);
    rc.purchasePackage.mockResolvedValue({ success: false, cancelled: true });

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    const pkg = { identifier: 'monthly' } as unknown as Parameters<
      typeof result.current.purchase
    >[0];

    await act(async () => {
      await result.current.purchase(pkg);
    });

    expect(result.current.customerInfo).toBe(FREE_INFO);
    expect(result.current.isPro).toBe(false);
  });
});

describe('restore — delegates to the service', () => {
  it('processes the returned customerInfo on a successful restore (native)', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);
    const restoreResult: PurchaseResult = { success: true, customerInfo: PRO_INFO };
    rc.restorePurchases.mockResolvedValue(restoreResult);

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    let returned: PurchaseResult | undefined;
    await act(async () => {
      returned = await result.current.restore();
    });

    expect(rc.restorePurchases).toHaveBeenCalledTimes(1);
    expect(returned).toBe(restoreResult);
    expect(result.current.isPro).toBe(true);
  });
});

describe('paywall actions — delegate to the service and refresh on success', () => {
  it('showPaywall refreshes customer info when a purchase occurs', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValueOnce(FREE_INFO); // init
    rc.presentPaywall.mockResolvedValue(true);
    // The refresh() triggered after a successful paywall sees the Pro user.
    rc.getCustomerInfo.mockResolvedValue(PRO_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    let purchased: boolean | undefined;
    await act(async () => {
      purchased = await result.current.showPaywall();
    });

    expect(rc.presentPaywall).toHaveBeenCalledTimes(1);
    expect(purchased).toBe(true);
    // refresh() pulled the new (Pro) customer info.
    expect(result.current.isPro).toBe(true);
  });

  it('showPaywall does NOT refresh when no purchase occurs', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValue(FREE_INFO);
    rc.presentPaywall.mockResolvedValue(false);

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));
    const callsAfterInit = rc.getCustomerInfo.mock.calls.length;

    let purchased: boolean | undefined;
    await act(async () => {
      purchased = await result.current.showPaywall();
    });

    expect(purchased).toBe(false);
    // No extra getCustomerInfo call => refresh() was skipped.
    expect(rc.getCustomerInfo.mock.calls.length).toBe(callsAfterInit);
  });

  it('showPaywallIfNeeded passes the entitlement id and refreshes on success', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValueOnce(FREE_INFO);
    rc.presentPaywallIfNeeded.mockResolvedValue(true);
    rc.getCustomerInfo.mockResolvedValue(PRO_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    let purchased: boolean | undefined;
    await act(async () => {
      purchased = await result.current.showPaywallIfNeeded();
    });

    expect(rc.presentPaywallIfNeeded).toHaveBeenCalledWith('NutriStudent Pro');
    expect(purchased).toBe(true);
    expect(result.current.isPro).toBe(true);
  });

  it('showCustomerCenter opens the center and then refreshes', async () => {
    rc.holder.isNative = true;
    await loadHook();
    rc.getCustomerInfo.mockResolvedValueOnce(FREE_INFO);
    rc.presentCustomerCenter.mockResolvedValue(undefined);
    rc.getCustomerInfo.mockResolvedValue(PRO_INFO);

    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    await act(async () => {
      await result.current.showCustomerCenter();
    });

    expect(rc.presentCustomerCenter).toHaveBeenCalledTimes(1);
    // refresh() after closing the center pulled the updated (Pro) info.
    expect(result.current.isPro).toBe(true);
  });
});

describe('offerings & packages loaded on init', () => {
  it('stores the current offering and derived packages', async () => {
    rc.holder.isNative = true;
    await loadHook();
    const offering = { identifier: 'default', availablePackages: [] };
    const pkgs = { monthly: { identifier: 'monthly' } };
    rc.getCurrentOffering.mockResolvedValue(offering);
    rc.getPackagesByType.mockReturnValue(pkgs);

    const { result } = renderHook(() => useSubscription(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.currentOffering).toBe(offering);
    expect(rc.getPackagesByType).toHaveBeenCalledWith(offering);
    expect(result.current.packages).toBe(pkgs);
  });
});
