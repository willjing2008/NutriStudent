import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL, PURCHASES_ERROR_CODE, PACKAGE_TYPE, VERIFICATION_RESULT } from '@revenuecat/purchases-capacitor';
import { RevenueCatUI, PAYWALL_RESULT } from '@revenuecat/purchases-capacitor-ui';
import type {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesOffering,
  PurchasesPackage,
} from '@revenuecat/purchases-capacitor';

// ── Configuration ──────────────────────────────────────────────────────────────

const SANDBOX_IOS_API_KEY = 'test_dqGpabdLnErIJBfaBVIMvAAFMAH';

// Read the real iOS public key from env. The sandbox (Test Store) key is a
// dev-only fallback: the RevenueCat iOS SDK fatalError()s any non-DEBUG build
// configured with a test_ key, so a production bundle must never carry it.
// A production build without VITE_REVENUECAT_IOS_API_KEY gets an empty key and
// skips configure entirely (app boots, subscriptions disabled).
const REVENUECAT_API_KEY =
  import.meta.env.VITE_REVENUECAT_IOS_API_KEY ||
  (import.meta.env.DEV ? SANDBOX_IOS_API_KEY : '');

if (!import.meta.env.VITE_REVENUECAT_IOS_API_KEY && import.meta.env.PROD) {
  console.warn(
    '[revenuecat] VITE_REVENUECAT_IOS_API_KEY is unset in a production build; RevenueCat will not be configured and subscriptions are disabled.',
  );
}

export const ENTITLEMENT_ID = 'NutriStudent Pro';

/**
 * User-facing message for builds where the RevenueCat SDK was never configured
 * (production bundle without VITE_REVENUECAT_IOS_API_KEY). Purchases are
 * deliberately disabled in those builds; the UI shows this instead of calling
 * into the SDK.
 */
export const SUBSCRIPTIONS_UNAVAILABLE_MESSAGE =
  "Subscriptions aren't available in this build yet. Please check back after the next update.";

export const PRODUCT_IDS = {
  monthly: 'monthly',
  yearly: 'yearly',
} as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const getSdkErrorCode = (error: unknown): unknown =>
  isRecord(error) ? error.code : undefined;

const getSdkErrorMessage = (error: unknown, fallback: string): string => {
  const message = isRecord(error) ? error.message : undefined;
  return typeof message === 'string' && message.trim() ? message : fallback;
};

// ── Platform guard ─────────────────────────────────────────────────────────────

/**
 * Returns `true` when running on a native platform (iOS / Android).
 * All RevenueCat calls are no-ops on web to prevent console errors during dev.
 */
export const isNativePlatform = Capacitor.isNativePlatform();

/** Stub CustomerInfo returned on web so the rest of the app keeps working. */
const EMPTY_CUSTOMER_INFO: CustomerInfo = {
  entitlements: { all: {}, active: {}, verification: VERIFICATION_RESULT.NOT_REQUESTED },
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

// True only after Purchases.configure succeeded on a native platform. When
// false on native, NO RevenueCat call may reach the SDK: the native layer
// (e.g. RevenueCatUI's PaywallView) fatalError()s a Release build when
// Purchases is unconfigured - a JS try/catch cannot stop that. Every exported
// function below must therefore check sdkUnavailable() before touching the SDK.
let isConfigured = false;

/** True when RevenueCat was successfully configured and purchases can be attempted. */
export function isRevenueCatConfigured(): boolean {
  return isConfigured;
}

/** Native platform but the SDK was never configured - all SDK calls must be skipped. */
const sdkUnavailable = (): boolean => isNativePlatform && !isConfigured;

/**
 * Initialize the RevenueCat SDK. Call this once at app startup.
 * Pass an optional `appUserID` to identify a logged-in user; omit for anonymous.
 */
export async function initializeRevenueCat(appUserID?: string): Promise<void> {
  if (!isNativePlatform) {
    console.info('[RevenueCat] Skipping init - running on web');
    isInitialized = true;
    return;
  }
  if (isInitialized) return;

  if (!REVENUECAT_API_KEY) {
    console.error(
      '[RevenueCat] No API key for this build - skipping configure; subscriptions disabled.',
    );
    return;
  }

  try {
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      ...(appUserID ? { appUserID } : {}),
    });
    isInitialized = true;
    isConfigured = true;
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
  if (sdkUnavailable()) return EMPTY_CUSTOMER_INFO;

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
  if (sdkUnavailable()) return EMPTY_CUSTOMER_INFO;

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
  if (sdkUnavailable()) return EMPTY_CUSTOMER_INFO;

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
  if (sdkUnavailable()) return;
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
  if (sdkUnavailable()) return { all: {}, current: null } as unknown as PurchasesOfferings;

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
  if (sdkUnavailable()) {
    return { success: false, error: SUBSCRIPTIONS_UNAVAILABLE_MESSAGE };
  }

  try {
    const { customerInfo } = await Purchases.purchasePackage({
      aPackage: pkg,
    });
    return { success: true, customerInfo };
  } catch (error: unknown) {
    if (getSdkErrorCode(error) === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return { success: false, cancelled: true };
    }
    console.error('[RevenueCat] Purchase failed:', error);
    return { success: false, error: getSdkErrorMessage(error, 'Purchase failed') };
  }
}

// ── Restore Purchases ──────────────────────────────────────────────────────────

/**
 * Restore previous purchases (user-initiated only - shows OS sign-in prompt).
 */
export async function restorePurchases(): Promise<PurchaseResult> {
  if (!isNativePlatform) {
    return { success: false, error: 'Restore is not available on web.' };
  }
  if (sdkUnavailable()) {
    return { success: false, error: SUBSCRIPTIONS_UNAVAILABLE_MESSAGE };
  }

  try {
    const { customerInfo } = await Purchases.restorePurchases();
    return { success: true, customerInfo };
  } catch (error: unknown) {
    console.error('[RevenueCat] Restore failed:', error);
    return { success: false, error: getSdkErrorMessage(error, 'Restore failed') };
  }
}

/**
 * Programmatic sync - safe to call silently without user interaction.
 */
export async function syncPurchases(): Promise<void> {
  if (!isNativePlatform) return;
  if (sdkUnavailable()) return;

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
  // CRASH GUARD: RevenueCatUI's PaywallView fatalError()s a non-DEBUG build
  // when Purchases is unconfigured (DebugErrorView releaseBehavior: .fatalError).
  // Never present the paywall without a configured SDK.
  if (sdkUnavailable()) {
    console.warn('[RevenueCat] Paywall skipped - SDK not configured in this build.');
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
  // Same native fatalError as presentPaywall - never call unconfigured.
  if (sdkUnavailable()) {
    console.warn('[RevenueCat] Paywall skipped - SDK not configured in this build.');
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
  if (sdkUnavailable()) {
    console.warn('[RevenueCat] Customer Center skipped - SDK not configured in this build.');
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
