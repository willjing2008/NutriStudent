import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type {
  CustomerInfo,
  PurchasesOffering,
  PurchasesPackage,
} from '@revenuecat/purchases-capacitor';

// ── Mock specifiers (must match the exact imports in revenuecat.ts) ──────────────
//
// `isNativePlatform` is captured at module-load time as a const, so to exercise
// both the web-stub branch and the native branch we control this mock's return
// value and re-import the module fresh (vi.resetModules + dynamic import) per
// scenario.
const isNativePlatformMock = vi.fn((): boolean => false);

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: () => isNativePlatformMock(),
  },
}));

// Hoisted handles to every Purchases SDK method the source calls, so individual
// tests can drive resolve/reject behaviour.
const purchasesMock = vi.hoisted(() => ({
  setLogLevel: vi.fn(),
  configure: vi.fn(),
  logIn: vi.fn(),
  logOut: vi.fn(),
  getCustomerInfo: vi.fn(),
  addCustomerInfoUpdateListener: vi.fn(),
  getOfferings: vi.fn(),
  purchasePackage: vi.fn(),
  restorePurchases: vi.fn(),
  syncPurchases: vi.fn(),
}));

const revenueCatUIMock = vi.hoisted(() => ({
  presentPaywall: vi.fn(),
  presentPaywallIfNeeded: vi.fn(),
  presentCustomerCenter: vi.fn(),
}));

// Enum string values mirror the real SDK (verified against the installed pkgs).
vi.mock('@revenuecat/purchases-capacitor', () => ({
  Purchases: purchasesMock,
  LOG_LEVEL: { VERBOSE: 'VERBOSE', DEBUG: 'DEBUG', INFO: 'INFO', WARN: 'WARN', ERROR: 'ERROR' },
  PURCHASES_ERROR_CODE: {
    PURCHASE_CANCELLED_ERROR: '1',
    STORE_PROBLEM_ERROR: '2',
    PURCHASE_NOT_ALLOWED_ERROR: '3',
    NETWORK_ERROR: '10',
  },
  PACKAGE_TYPE: { ANNUAL: 'ANNUAL', MONTHLY: 'MONTHLY' },
  VERIFICATION_RESULT: { NOT_REQUESTED: 'NOT_REQUESTED' },
}));

vi.mock('@revenuecat/purchases-capacitor-ui', () => ({
  RevenueCatUI: revenueCatUIMock,
  PAYWALL_RESULT: {
    NOT_PRESENTED: 'NOT_PRESENTED',
    ERROR: 'ERROR',
    CANCELLED: 'CANCELLED',
    PURCHASED: 'PURCHASED',
    RESTORED: 'RESTORED',
  },
}));

// ── Helpers ──────────────────────────────────────────────────────────────────

type RevenueCatModule = typeof import('./revenuecat');

/** Re-import the module with `isNativePlatform` resolved to `native`. */
async function loadModule(native: boolean): Promise<RevenueCatModule> {
  isNativePlatformMock.mockReturnValue(native);
  vi.resetModules();
  return import('./revenuecat');
}

/** Minimal CustomerInfo whose only meaningful field is the active entitlements map. */
function customerInfoWithEntitlements(active: Record<string, unknown>): CustomerInfo {
  return {
    entitlements: { all: {}, active, verification: 'NOT_REQUESTED' },
  } as unknown as CustomerInfo;
}

beforeEach(() => {
  vi.clearAllMocks();
  // Silence the service's diagnostic logging without losing call assertions.
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'info').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── Web / non-native stub branch ─────────────────────────────────────────────

describe('web (non-native) stub branch', () => {
  it('initializeRevenueCat skips the SDK and never configures', async () => {
    const rc = await loadModule(false);
    await expect(rc.initializeRevenueCat('user-1')).resolves.toBeUndefined();
    expect(purchasesMock.configure).not.toHaveBeenCalled();
    expect(purchasesMock.setLogLevel).not.toHaveBeenCalled();
  });

  it('loginUser / logoutUser return the empty stub without touching the SDK', async () => {
    const rc = await loadModule(false);

    const loggedIn = await rc.loginUser('user-1');
    const loggedOut = await rc.logoutUser();

    expect(loggedIn.activeSubscriptions).toEqual([]);
    expect(loggedIn.originalAppUserId).toBe('');
    expect(loggedOut.entitlements.active).toEqual({});
    expect(purchasesMock.logIn).not.toHaveBeenCalled();
    expect(purchasesMock.logOut).not.toHaveBeenCalled();
  });

  it('getCustomerInfo returns the empty stub (no Pro entitlement)', async () => {
    const rc = await loadModule(false);
    const info = await rc.getCustomerInfo();

    expect(rc.hasProEntitlement(info)).toBe(false);
    expect(purchasesMock.getCustomerInfo).not.toHaveBeenCalled();
  });

  it('checkProAccess short-circuits to false on web', async () => {
    const rc = await loadModule(false);
    await expect(rc.checkProAccess()).resolves.toBe(false);
    expect(purchasesMock.getCustomerInfo).not.toHaveBeenCalled();
  });

  it('addCustomerInfoListener is a no-op on web', async () => {
    const rc = await loadModule(false);
    await rc.addCustomerInfoListener(() => {});
    expect(purchasesMock.addCustomerInfoUpdateListener).not.toHaveBeenCalled();
  });

  it('getOfferings returns an empty offerings stub', async () => {
    const rc = await loadModule(false);
    const offerings = await rc.getOfferings();

    expect(offerings.current).toBeNull();
    expect(offerings.all).toEqual({});
    expect(purchasesMock.getOfferings).not.toHaveBeenCalled();
  });

  it('getCurrentOffering resolves to null when there is no current offering', async () => {
    const rc = await loadModule(false);
    await expect(rc.getCurrentOffering()).resolves.toBeNull();
  });

  it('purchasePackage fails gracefully with a web message', async () => {
    const rc = await loadModule(false);
    const result = await rc.purchasePackage({} as PurchasesPackage);

    expect(result).toEqual({ success: false, error: 'Purchases are not available on web.' });
    expect(purchasesMock.purchasePackage).not.toHaveBeenCalled();
  });

  it('restorePurchases fails gracefully with a web message', async () => {
    const rc = await loadModule(false);
    const result = await rc.restorePurchases();

    expect(result).toEqual({ success: false, error: 'Restore is not available on web.' });
    expect(purchasesMock.restorePurchases).not.toHaveBeenCalled();
  });

  it('syncPurchases is a silent no-op on web', async () => {
    const rc = await loadModule(false);
    await expect(rc.syncPurchases()).resolves.toBeUndefined();
    expect(purchasesMock.syncPurchases).not.toHaveBeenCalled();
  });

  it('presentPaywall / presentPaywallIfNeeded return false on web', async () => {
    const rc = await loadModule(false);

    await expect(rc.presentPaywall()).resolves.toBe(false);
    await expect(rc.presentPaywallIfNeeded()).resolves.toBe(false);
    expect(revenueCatUIMock.presentPaywall).not.toHaveBeenCalled();
    expect(revenueCatUIMock.presentPaywallIfNeeded).not.toHaveBeenCalled();
  });

  it('presentCustomerCenter is a no-op on web', async () => {
    const rc = await loadModule(false);
    await expect(rc.presentCustomerCenter()).resolves.toBeUndefined();
    expect(revenueCatUIMock.presentCustomerCenter).not.toHaveBeenCalled();
  });
});

// ── Entitlement parsing (hasProEntitlement) — pure, platform-agnostic ────────────

describe('hasProEntitlement', () => {
  it('returns true when the Pro entitlement is in the active map', async () => {
    const rc = await loadModule(false);
    const info = customerInfoWithEntitlements({ [rc.ENTITLEMENT_ID]: { isActive: true } });
    expect(rc.hasProEntitlement(info)).toBe(true);
  });

  it('returns false when only an unrelated entitlement is active', async () => {
    const rc = await loadModule(false);
    const info = customerInfoWithEntitlements({ 'Some Other Tier': { isActive: true } });
    expect(rc.hasProEntitlement(info)).toBe(false);
  });

  it('returns false when the active map is empty', async () => {
    const rc = await loadModule(false);
    expect(rc.hasProEntitlement(customerInfoWithEntitlements({}))).toBe(false);
  });

  it('falls back to false when entitlements.active is nullish', async () => {
    const rc = await loadModule(false);
    const info = {
      entitlements: { all: {}, active: undefined, verification: 'NOT_REQUESTED' },
    } as unknown as CustomerInfo;
    expect(rc.hasProEntitlement(info)).toBe(false);
  });
});

// ── Native happy paths ──────────────────────────────────────────────────────────

describe('native platform — happy paths', () => {
  it('initializeRevenueCat configures the SDK exactly once', async () => {
    const rc = await loadModule(true);
    purchasesMock.setLogLevel.mockResolvedValue(undefined);
    purchasesMock.configure.mockResolvedValue(undefined);

    await rc.initializeRevenueCat('user-42');
    await rc.initializeRevenueCat('user-42'); // second call guarded by isInitialized

    expect(purchasesMock.configure).toHaveBeenCalledTimes(1);
    expect(purchasesMock.configure).toHaveBeenCalledWith(
      expect.objectContaining({ appUserID: 'user-42' }),
    );
  });

  it('initializeRevenueCat omits appUserID when none is provided', async () => {
    const rc = await loadModule(true);
    purchasesMock.setLogLevel.mockResolvedValue(undefined);
    purchasesMock.configure.mockResolvedValue(undefined);

    await rc.initializeRevenueCat();

    const arg = purchasesMock.configure.mock.calls[0][0] as Record<string, unknown>;
    expect('appUserID' in arg).toBe(false);
  });

  it('getCustomerInfo unwraps the SDK response', async () => {
    const rc = await loadModule(true);
    const info = customerInfoWithEntitlements({ [rc.ENTITLEMENT_ID]: {} });
    purchasesMock.getCustomerInfo.mockResolvedValue({ customerInfo: info });

    await expect(rc.getCustomerInfo()).resolves.toBe(info);
  });

  it('checkProAccess reads live customer info and detects Pro', async () => {
    const rc = await loadModule(true);
    const info = customerInfoWithEntitlements({ [rc.ENTITLEMENT_ID]: {} });
    purchasesMock.getCustomerInfo.mockResolvedValue({ customerInfo: info });

    await expect(rc.checkProAccess()).resolves.toBe(true);
  });

  it('addCustomerInfoListener registers the callback with the SDK', async () => {
    const rc = await loadModule(true);
    purchasesMock.addCustomerInfoUpdateListener.mockResolvedValue(undefined);
    const cb = vi.fn();

    await rc.addCustomerInfoListener(cb);

    expect(purchasesMock.addCustomerInfoUpdateListener).toHaveBeenCalledWith(cb);
  });

  it('purchasePackage returns success with customerInfo', async () => {
    const rc = await loadModule(true);
    const info = customerInfoWithEntitlements({ [rc.ENTITLEMENT_ID]: {} });
    purchasesMock.purchasePackage.mockResolvedValue({ customerInfo: info });

    const result = await rc.purchasePackage({ identifier: 'monthly' } as PurchasesPackage);

    expect(result).toEqual({ success: true, customerInfo: info });
    expect(purchasesMock.purchasePackage).toHaveBeenCalledWith({
      aPackage: { identifier: 'monthly' },
    });
  });

  it('restorePurchases returns success with customerInfo', async () => {
    const rc = await loadModule(true);
    const info = customerInfoWithEntitlements({});
    purchasesMock.restorePurchases.mockResolvedValue({ customerInfo: info });

    await expect(rc.restorePurchases()).resolves.toEqual({ success: true, customerInfo: info });
  });

  it('getPackagesByType maps MONTHLY and ANNUAL packages by packageType', async () => {
    const rc = await loadModule(true);
    const monthly = { identifier: 'm', packageType: rc.PACKAGE_TYPE.MONTHLY } as PurchasesPackage;
    const yearly = { identifier: 'y', packageType: rc.PACKAGE_TYPE.ANNUAL } as PurchasesPackage;
    const offering = { availablePackages: [monthly, yearly] } as unknown as PurchasesOffering;

    const result = rc.getPackagesByType(offering);

    expect(result.monthly).toBe(monthly);
    expect(result.yearly).toBe(yearly);
  });

  it('getPackagesByType yields undefined for a missing package type', async () => {
    const rc = await loadModule(true);
    const monthly = { identifier: 'm', packageType: rc.PACKAGE_TYPE.MONTHLY } as PurchasesPackage;
    const offering = { availablePackages: [monthly] } as unknown as PurchasesOffering;

    const result = rc.getPackagesByType(offering);

    expect(result.monthly).toBe(monthly);
    expect(result.yearly).toBeUndefined();
  });

  it('getCurrentOffering returns the SDK current offering', async () => {
    const rc = await loadModule(true);
    const current = { identifier: 'default' } as unknown as PurchasesOffering;
    purchasesMock.getOfferings.mockResolvedValue({ all: {}, current });

    await expect(rc.getCurrentOffering()).resolves.toBe(current);
  });
});

// ── Error-code mapping & error paths (native) ────────────────────────────────────

describe('native platform — error handling', () => {
  it('purchasePackage maps the cancellation error code to { cancelled: true }', async () => {
    const rc = await loadModule(true);
    purchasesMock.purchasePackage.mockRejectedValue({
      code: rc.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR,
      message: 'User cancelled',
    });

    const result = await rc.purchasePackage({} as PurchasesPackage);

    expect(result).toEqual({ success: false, cancelled: true });
    expect(result.error).toBeUndefined();
  });

  it('purchasePackage surfaces non-cancellation errors via error.message', async () => {
    const rc = await loadModule(true);
    purchasesMock.purchasePackage.mockRejectedValue({
      code: rc.PURCHASES_ERROR_CODE.NETWORK_ERROR,
      message: 'No connection',
    });

    const result = await rc.purchasePackage({} as PurchasesPackage);

    expect(result).toEqual({ success: false, error: 'No connection' });
    expect(result.cancelled).toBeUndefined();
  });

  it('purchasePackage falls back to a generic message when error has no message', async () => {
    const rc = await loadModule(true);
    purchasesMock.purchasePackage.mockRejectedValue({
      code: rc.PURCHASES_ERROR_CODE.STORE_PROBLEM_ERROR,
    });

    const result = await rc.purchasePackage({} as PurchasesPackage);

    expect(result).toEqual({ success: false, error: 'Purchase failed' });
  });

  it('purchasePackage handles null SDK rejections without throwing', async () => {
    const rc = await loadModule(true);
    purchasesMock.purchasePackage.mockRejectedValue(null);

    const result = await rc.purchasePackage({} as PurchasesPackage);

    expect(result).toEqual({ success: false, error: 'Purchase failed' });
  });

  it('restorePurchases reports failure with the error message', async () => {
    const rc = await loadModule(true);
    purchasesMock.restorePurchases.mockRejectedValue({ message: 'Restore exploded' });

    await expect(rc.restorePurchases()).resolves.toEqual({
      success: false,
      error: 'Restore exploded',
    });
  });

  it('restorePurchases falls back to a generic message', async () => {
    const rc = await loadModule(true);
    purchasesMock.restorePurchases.mockRejectedValue({});

    await expect(rc.restorePurchases()).resolves.toEqual({
      success: false,
      error: 'Restore failed',
    });
  });

  it('restorePurchases handles null SDK rejections without throwing', async () => {
    const rc = await loadModule(true);
    purchasesMock.restorePurchases.mockRejectedValue(null);

    await expect(rc.restorePurchases()).resolves.toEqual({
      success: false,
      error: 'Restore failed',
    });
  });

  it('initializeRevenueCat rethrows configure failures', async () => {
    const rc = await loadModule(true);
    purchasesMock.setLogLevel.mockResolvedValue(undefined);
    purchasesMock.configure.mockRejectedValue(new Error('configure boom'));

    await expect(rc.initializeRevenueCat()).rejects.toThrow('configure boom');
  });

  it('loginUser rethrows SDK errors', async () => {
    const rc = await loadModule(true);
    purchasesMock.logIn.mockRejectedValue(new Error('login boom'));
    await expect(rc.loginUser('user-x')).rejects.toThrow('login boom');
  });

  it('getCustomerInfo rethrows SDK errors', async () => {
    const rc = await loadModule(true);
    purchasesMock.getCustomerInfo.mockRejectedValue(new Error('info boom'));
    await expect(rc.getCustomerInfo()).rejects.toThrow('info boom');
  });

  it('getOfferings rethrows SDK errors', async () => {
    const rc = await loadModule(true);
    purchasesMock.getOfferings.mockRejectedValue(new Error('offerings boom'));
    await expect(rc.getOfferings()).rejects.toThrow('offerings boom');
  });

  it('syncPurchases swallows SDK errors (fire-and-forget)', async () => {
    const rc = await loadModule(true);
    purchasesMock.syncPurchases.mockRejectedValue(new Error('sync boom'));
    await expect(rc.syncPurchases()).resolves.toBeUndefined();
  });
});

// ── Paywall result mapping (native) ──────────────────────────────────────────────

describe('native platform — paywall result mapping', () => {
  it('presentPaywall returns true for PURCHASED and RESTORED', async () => {
    const rc = await loadModule(true);

    revenueCatUIMock.presentPaywall.mockResolvedValueOnce({
      result: rc.PAYWALL_RESULT.PURCHASED,
    });
    await expect(rc.presentPaywall()).resolves.toBe(true);

    revenueCatUIMock.presentPaywall.mockResolvedValueOnce({
      result: rc.PAYWALL_RESULT.RESTORED,
    });
    await expect(rc.presentPaywall()).resolves.toBe(true);
  });

  it('presentPaywall returns false for CANCELLED / ERROR / NOT_PRESENTED', async () => {
    const rc = await loadModule(true);

    for (const result of [
      rc.PAYWALL_RESULT.CANCELLED,
      rc.PAYWALL_RESULT.ERROR,
      rc.PAYWALL_RESULT.NOT_PRESENTED,
    ]) {
      revenueCatUIMock.presentPaywall.mockResolvedValueOnce({ result });
      await expect(rc.presentPaywall()).resolves.toBe(false);
    }
  });

  it('presentPaywall forwards the offering when provided', async () => {
    const rc = await loadModule(true);
    const offering = { identifier: 'promo' } as unknown as PurchasesOffering;
    revenueCatUIMock.presentPaywall.mockResolvedValue({ result: rc.PAYWALL_RESULT.PURCHASED });

    await rc.presentPaywall(offering);

    expect(revenueCatUIMock.presentPaywall).toHaveBeenCalledWith({ offering });
  });

  it('presentPaywall passes empty options when no offering is provided', async () => {
    const rc = await loadModule(true);
    revenueCatUIMock.presentPaywall.mockResolvedValue({ result: rc.PAYWALL_RESULT.CANCELLED });

    await rc.presentPaywall();

    expect(revenueCatUIMock.presentPaywall).toHaveBeenCalledWith({});
  });

  it('presentPaywall returns false when the UI call throws', async () => {
    const rc = await loadModule(true);
    revenueCatUIMock.presentPaywall.mockRejectedValue(new Error('paywall boom'));
    await expect(rc.presentPaywall()).resolves.toBe(false);
  });

  it('presentPaywallIfNeeded uses the default entitlement id and maps RESTORED to true', async () => {
    const rc = await loadModule(true);
    revenueCatUIMock.presentPaywallIfNeeded.mockResolvedValue({
      result: rc.PAYWALL_RESULT.RESTORED,
    });

    await expect(rc.presentPaywallIfNeeded()).resolves.toBe(true);
    expect(revenueCatUIMock.presentPaywallIfNeeded).toHaveBeenCalledWith({
      requiredEntitlementIdentifier: rc.ENTITLEMENT_ID,
    });
  });

  it('presentPaywallIfNeeded honours a custom entitlement id and maps CANCELLED to false', async () => {
    const rc = await loadModule(true);
    revenueCatUIMock.presentPaywallIfNeeded.mockResolvedValue({
      result: rc.PAYWALL_RESULT.CANCELLED,
    });

    await expect(rc.presentPaywallIfNeeded('Custom Tier')).resolves.toBe(false);
    expect(revenueCatUIMock.presentPaywallIfNeeded).toHaveBeenCalledWith({
      requiredEntitlementIdentifier: 'Custom Tier',
    });
  });

  it('presentPaywallIfNeeded returns false when the UI call throws', async () => {
    const rc = await loadModule(true);
    revenueCatUIMock.presentPaywallIfNeeded.mockRejectedValue(new Error('ifNeeded boom'));
    await expect(rc.presentPaywallIfNeeded()).resolves.toBe(false);
  });

  it('presentCustomerCenter delegates to the UI SDK and swallows errors', async () => {
    const rc = await loadModule(true);

    revenueCatUIMock.presentCustomerCenter.mockResolvedValueOnce(undefined);
    await expect(rc.presentCustomerCenter()).resolves.toBeUndefined();
    expect(revenueCatUIMock.presentCustomerCenter).toHaveBeenCalledTimes(1);

    revenueCatUIMock.presentCustomerCenter.mockRejectedValueOnce(new Error('center boom'));
    await expect(rc.presentCustomerCenter()).resolves.toBeUndefined();
  });
});
