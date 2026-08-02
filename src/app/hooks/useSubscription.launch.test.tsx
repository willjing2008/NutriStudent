import React from 'react';
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Pins the SHIPPED free-launch state (subscriptionsEnabled: false, the real
// launch-config value): the provider must report ready without ever touching
// the RevenueCat SDK, and every purchase surface must be inert.

const rc = vi.hoisted(() => ({
  initializeRevenueCat: vi.fn(async () => {}),
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
  getCustomerInfo: vi.fn(),
  addCustomerInfoListener: vi.fn(async () => {}),
  hasProEntitlement: vi.fn(() => false),
  getCurrentOffering: vi.fn(),
  purchasePackage: vi.fn(),
  restorePurchases: vi.fn(),
  syncPurchases: vi.fn(async () => {}),
  presentPaywall: vi.fn(),
  presentPaywallIfNeeded: vi.fn(),
  presentCustomerCenter: vi.fn(),
  getPackagesByType: vi.fn(() => ({})),
  isRevenueCatConfigured: vi.fn(() => false),
}));

vi.mock('../services/revenuecat', () => ({
  ...rc,
  ENTITLEMENT_ID: 'NutriStudent Pro',
  isNativePlatform: false,
}));

import { SubscriptionProvider, useSubscription } from './useSubscription';

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(SubscriptionProvider, null, children);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useSubscription free launch (subscriptions disabled)', () => {
  it('becomes ready without initializing or querying RevenueCat', async () => {
    const { result } = renderHook(() => useSubscription(), { wrapper });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.subscriptionsAvailable).toBe(false);
    expect(result.current.isPro).toBe(false);
    expect(rc.initializeRevenueCat).not.toHaveBeenCalled();
    expect(rc.addCustomerInfoListener).not.toHaveBeenCalled();
    expect(rc.getCustomerInfo).not.toHaveBeenCalled();
    expect(rc.syncPurchases).not.toHaveBeenCalled();
  });

  it('keeps identify and reset inert', async () => {
    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    await act(async () => {
      await result.current.identify('user-1');
      await result.current.reset();
    });
    expect(rc.loginUser).not.toHaveBeenCalled();
    expect(rc.logoutUser).not.toHaveBeenCalled();
  });

  it('rejects purchase and restore without calling the SDK', async () => {
    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    const purchase = await result.current.purchase({} as never);
    const restore = await result.current.restore();
    expect(purchase).toEqual({
      success: false,
      error: 'Subscriptions are not available during the free launch.',
    });
    expect(restore.success).toBe(false);
    expect(rc.purchasePackage).not.toHaveBeenCalled();
    expect(rc.restorePurchases).not.toHaveBeenCalled();
  });

  it('never presents a paywall or customer center', async () => {
    const { result } = renderHook(() => useSubscription(), { wrapper });
    await waitFor(() => expect(result.current.isReady).toBe(true));

    await act(async () => {
      expect(await result.current.showPaywall()).toBe(false);
      expect(await result.current.showPaywallIfNeeded()).toBe(false);
      await result.current.showCustomerCenter();
    });
    expect(rc.presentPaywall).not.toHaveBeenCalled();
    expect(rc.presentPaywallIfNeeded).not.toHaveBeenCalled();
    expect(rc.presentCustomerCenter).not.toHaveBeenCalled();
  });
});
