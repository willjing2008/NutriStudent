import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL, PURCHASES_ERROR_CODE, PACKAGE_TYPE } from '@revenuecat/purchases-capacitor';
import { RevenueCatUI, PAYWALL_RESULT } from '@revenuecat/purchases-capacitor-ui';
import type {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesOffering,
  PurchasesPackage,
} from '@revenuecat/purchases-capacitor';

// ── Configuration ──────────────────────────────────────────────────────────────

const REVENUECAT_API_KEY = 'test_dqGpabdLnErIJBfaBVIMvAAFMAH';

export const ENTITLEMENT_ID = 'NutriStudent Pro';

export const PRODUCT_IDS = {
  monthly: 'monthly',
  yearly: 'yearly',
} as const;

// ── Platform guard ─────────────────────────────────────────────────────────────

/**
 * Returns `true` when running on a native platform (iOS / Android).
 * All RevenueCat calls are no-ops on web to prevent console errors during dev.
 */
export const isNativePlatform = Capacitor.isNativePlatform();

/** Stub CustomerInfo returned on web so the rest of the app keeps working. */
const EMPTY_CUSTOMER_INFO: CustomerInfo = {
  entitlements: { all: {}, active: {}, verification: 'NOT_REQUESTED' as any },
  activeSubscriptions: [],
  allPurchasedProductIdentifiers: [],
  latestExpirationDate: null,
  firstSeen: new Date().toISOString(),
  originalAppUserId: '',
  requestDate: new Date().toISOString(),
  allExpirationDates: {},
  allPurchaseDates: {},
  originalApplicationVersion: null,
  originalPurchaseDate: null,
  managementURL: null,
  nonSubscriptionTransactions: [],
} as unknown as CustomerInfo;

// ── Initialization ─────────────────────────────────────────────────────────────

let isInitialized = false;

/**
 * Initialize the RevenueCat SDK. Call this once at app startup.
 * Pass an optional `appUserID` to identify a logged-in user; omit for anonymous.
 */
export async function initializeRevenueCat(appUserID?: string): Promise<void> {
  if (!isNativePlatform) {
    console.info('[RevenueCat] Skipping init — running on web');
    isInitialized = true;
    return;
  }
  if (isInitialized) return;

  try {
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      ...(appUserID ? { appUserID } : {}),
    });
    isInitialized = true;
    console.log('[RevenueCat] SDK initialized');
  } catch (error) {
    console.error('[RevenueCat] Failed to initialize:', error);
    throw error;
  }
}

// ── User Identity ──────────────────────────────────────────────────────────────

/**
 * Log in a user after they authenticate in your app.
 * Returns the updated CustomerInfo.
 */
export async function loginUser(appUserID: string): Promise<CustomerInfo> {
  if (!isNativePlatform) return EMPTY_CUSTOMER_INFO;

  try {
    const { customerInfo } = await Purchases.logIn({ appUserID });
    console.log('[RevenueCat] User logged in:', appUserID);
    return customerInfo;
  } catch (error) {
    console.error('[RevenueCat] Login failed:', error);
    throw error;
  }
}

/**
 * Log out the current user (reverts to anonymous).
 */
export async function logoutUser(): Promise<CustomerInfo> {
  if (!isNativePlatform) return EMPTY_CUSTOMER_INFO;

  try {
    const { customerInfo } = await Purchases.logOut();
    console.log('[RevenueCat] User logged out');
    return customerInfo;
  } catch (error) {
    console.error('[RevenueCat] Logout failed:', error);
    throw error;
  }
}

// ── Customer Info ──────────────────────────────────────────────────────────────

/**
 * Fetch the latest customer info from RevenueCat.
 */
export async function getCustomerInfo(): Promise<CustomerInfo> {
  if (!isNativePlatform) return EMPTY_CUSTOMER_INFO;

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (error) {
    console.error('[RevenueCat] Failed to get customer info:', error);
    throw error;
  }
}

/**
 * Register a listener that fires whenever customer info changes
 * (e.g. subscription renewed, expired, or new purchase).
 */
export async function addCustomerInfoListener(
  callback: (info: CustomerInfo) => void,
): Promise<void> {
  if (!isNativePlatform) return;
  await Purchases.addCustomerInfoUpdateListener(callback);
}

// ── Entitlement Checking ───────────────────────────────────────────────────────

/**
 * Check whether the user currently has the "NutriStudent Pro" entitlement.
 */
export function hasProEntitlement(customerInfo: CustomerInfo): boolean {
  return ENTITLEMENT_ID in (customerInfo.entitlements.active ?? {});
}

/**
 * Convenience: fetch customer info and check for Pro in one call.
 */
export async function checkProAccess(): Promise<boolean> {
  if (!isNativePlatform) return false;
  const info = await getCustomerInfo();
  return hasProEntitlement(info);
}

// ── Offerings & Products ───────────────────────────────────────────────────────

/**
 * Fetch the current offerings configured in RevenueCat.
 */
export async function getOfferings(): Promise<PurchasesOfferings> {
  if (!isNativePlatform) return { all: {}, current: null } as unknown as PurchasesOfferings;

  try {
    const offerings = await Purchases.getOfferings();
    return offerings;
  } catch (error) {
    console.error('[RevenueCat] Failed to get offerings:', error);
    throw error;
  }
}

/**
 * Convenience: get the default (current) offering.
 */
export async function getCurrentOffering(): Promise<PurchasesOffering | null> {
  const offerings = await getOfferings();
  return offerings.current ?? null;
}

/**
 * Extract typed packages from an offering.
 */
export function getPackagesByType(offering: PurchasesOffering) {
  return {
    monthly: offering.availablePackages.find(
      (p) => p.packageType === PACKAGE_TYPE.MONTHLY,
    ),
    yearly: offering.availablePackages.find(
      (p) => p.packageType === PACKAGE_TYPE.ANNUAL,
    ),
  };
}

// ── Purchases ──────────────────────────────────────────────────────────────────

export interface PurchaseResult {
  success: boolean;
  customerInfo?: CustomerInfo;
  cancelled?: boolean;
  error?: string;
}

/**
 * Purchase a specific package. Returns a normalised result object.
 */
export async function purchasePackage(
  pkg: PurchasesPackage,
): Promise<PurchaseResult> {
  if (!isNativePlatform) {
    return { success: false, error: 'Purchases are not available on web.' };
  }

  try {
    const { customerInfo } = await Purchases.purchasePackage({
      aPackage: pkg,
    });
    return { success: true, customerInfo };
  } catch (error: any) {
    if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return { success: false, cancelled: true };
    }
    console.error('[RevenueCat] Purchase failed:', error);
    return { success: false, error: error.message ?? 'Purchase failed' };
  }
}

// ── Restore Purchases ──────────────────────────────────────────────────────────

/**
 * Restore previous purchases (user-initiated only — shows OS sign-in prompt).
 */
export async function restorePurchases(): Promise<PurchaseResult> {
  if (!isNativePlatform) {
    return { success: false, error: 'Restore is not available on web.' };
  }

  try {
    const { customerInfo } = await Purchases.restorePurchases();
    return { success: true, customerInfo };
  } catch (error: any) {
    console.error('[RevenueCat] Restore failed:', error);
    return { success: false, error: error.message ?? 'Restore failed' };
  }
}

/**
 * Programmatic sync — safe to call silently without user interaction.
 */
export async function syncPurchases(): Promise<void> {
  if (!isNativePlatform) return;

  try {
    await Purchases.syncPurchases();
  } catch (error) {
    console.error('[RevenueCat] Sync failed:', error);
  }
}

// ── Paywalls (RevenueCatUI) ────────────────────────────────────────────────────

/**
 * Present the RevenueCat paywall. Returns whether a purchase or restore occurred.
 */
export async function presentPaywall(
  offering?: PurchasesOffering,
): Promise<boolean> {
  if (!isNativePlatform) {
    console.warn('[RevenueCat] Paywalls are not available on web.');
    return false;
  }

  try {
    const options = offering ? { offering } : {};
    const { result } = await RevenueCatUI.presentPaywall(options);

    switch (result) {
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
      default:
        return false;
    }
  } catch (error) {
    console.error('[RevenueCat] Paywall error:', error);
    return false;
  }
}

/**
 * Present the paywall only if the user does NOT already have the given entitlement.
 */
export async function presentPaywallIfNeeded(
  entitlementId: string = ENTITLEMENT_ID,
): Promise<boolean> {
  if (!isNativePlatform) {
    console.warn('[RevenueCat] Paywalls are not available on web.');
    return false;
  }

  try {
    const { result } = await RevenueCatUI.presentPaywallIfNeeded({
      requiredEntitlementIdentifier: entitlementId,
    });

    switch (result) {
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.error('[RevenueCat] PaywallIfNeeded error:', error);
    return false;
  }
}

// ── Customer Center ────────────────────────────────────────────────────────────

/**
 * Present the RevenueCat Customer Center (subscription management UI).
 */
export async function presentCustomerCenter(): Promise<void> {
  if (!isNativePlatform) {
    console.warn('[RevenueCat] Customer Center is not available on web.');
    return;
  }

  try {
    await RevenueCatUI.presentCustomerCenter();
  } catch (error) {
    console.error('[RevenueCat] Customer Center error:', error);
  }
}

// ── Re-exports for convenience ─────────────────────────────────────────────────

export { PAYWALL_RESULT, PURCHASES_ERROR_CODE, PACKAGE_TYPE };
export type { CustomerInfo, PurchasesOfferings, PurchasesOffering, PurchasesPackage };
