import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  initializeRevenueCat,
  loginUser,
  logoutUser,
  getCustomerInfo,
  addCustomerInfoListener,
  hasProEntitlement,
  getCurrentOffering,
  purchasePackage as rcPurchasePackage,
  restorePurchases as rcRestorePurchases,
  syncPurchases,
  presentPaywall as rcPresentPaywall,
  presentPaywallIfNeeded as rcPresentPaywallIfNeeded,
  presentCustomerCenter as rcPresentCustomerCenter,
  getPackagesByType,
  isNativePlatform,
  isRevenueCatConfigured,
  ENTITLEMENT_ID,
  type CustomerInfo,
  type PurchasesOffering,
  type PurchasesPackage,
  type PurchaseResult,
} from '../services/revenuecat';
import { LAUNCH_CONFIG } from '../../../supabase/functions/_shared/launch-config';

const FREE_LAUNCH_SUBSCRIPTION_MESSAGE =
  'Subscriptions are not available during the free launch.';

// ── Context Types ──────────────────────────────────────────────────────────────

interface SubscriptionState {
  /** Whether the SDK has finished initialising */
  isReady: boolean;
  /** Whether a network operation is in progress */
  isLoading: boolean;
  /** The user has an active "NutriStudent Pro" entitlement */
  isPro: boolean;
  /**
   * RevenueCat is configured and purchases can actually be attempted.
   * False on web and in native builds shipped without a RevenueCat API key -
   * the paywall UI must degrade to a "not available yet" state instead of
   * calling the SDK (unconfigured native paywall calls crash Release builds).
   */
  subscriptionsAvailable: boolean;
  /** Latest customer info from RevenueCat */
  customerInfo: CustomerInfo | null;
  /** Current offering (packages available for purchase) */
  currentOffering: PurchasesOffering | null;
  /** Typed package shortcuts */
  packages: {
    monthly?: PurchasesPackage;
    yearly?: PurchasesPackage;
    lifetime?: PurchasesPackage;
  };
}

interface SubscriptionActions {
  /** Identify the user with RevenueCat after auth login */
  identify: (userId: string) => Promise<void>;
  /** Reset identity on logout */
  reset: () => Promise<void>;
  /** Refresh customer info & offerings */
  refresh: () => Promise<void>;
  /** Purchase a specific package */
  purchase: (pkg: PurchasesPackage) => Promise<PurchaseResult>;
  /** User-initiated restore */
  restore: () => Promise<PurchaseResult>;
  /** Show the RevenueCat paywall */
  showPaywall: () => Promise<boolean>;
  /** Show the paywall only if the user is not already Pro */
  showPaywallIfNeeded: () => Promise<boolean>;
  /** Show the Customer Center (manage subscription) */
  showCustomerCenter: () => Promise<void>;
}

type SubscriptionContextValue = SubscriptionState & SubscriptionActions;

// ── Context ────────────────────────────────────────────────────────────────────

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────────

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [subscriptionsAvailable, setSubscriptionsAvailable] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);
  const [packages, setPackages] = useState<SubscriptionState['packages']>({});
  const initializedRef = useRef(false);

  // Update derived state whenever customerInfo changes
  // On non-native platforms (web), bypass the paywall entirely
  const processCustomerInfo = useCallback((info: CustomerInfo) => {
    setCustomerInfo(info);
    setIsPro(isNativePlatform ? hasProEntitlement(info) : true);
  }, []);

  // Fetch offerings and extract packages
  const loadOfferings = useCallback(async () => {
    try {
      const offering = await getCurrentOffering();
      setCurrentOffering(offering);
      if (offering) {
        setPackages(getPackagesByType(offering));
      }
    } catch {
      // Offerings might not be configured yet - non-fatal
    }
  }, []);

  // Initialise the SDK once on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Free launch: subscriptions are policy-disabled, so the provider reports
    // ready without touching the RevenueCat SDK at all.
    if (!LAUNCH_CONFIG.subscriptionsEnabled) {
      setIsReady(true);
      return;
    }

    (async () => {
      try {
        await initializeRevenueCat();
        setSubscriptionsAvailable(isRevenueCatConfigured());

        // Listen for real-time customer info updates
        await addCustomerInfoListener(processCustomerInfo);

        // Fetch initial customer info
        const info = await getCustomerInfo();
        processCustomerInfo(info);

        // Silently sync any existing store purchases
        await syncPurchases();

        // Load offerings
        await loadOfferings();
      } catch (error) {
        console.error('[SubscriptionProvider] Init error:', error);
      } finally {
        setIsReady(true);
      }
    })();
  }, [processCustomerInfo, loadOfferings]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const identify = useCallback(async (userId: string) => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) return;
    setIsLoading(true);
    try {
      const info = await loginUser(userId);
      processCustomerInfo(info);
      await loadOfferings();
    } finally {
      setIsLoading(false);
    }
  }, [processCustomerInfo, loadOfferings]);

  const reset = useCallback(async () => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) return;
    setIsLoading(true);
    try {
      const info = await logoutUser();
      processCustomerInfo(info);
    } finally {
      setIsLoading(false);
    }
  }, [processCustomerInfo]);

  const refresh = useCallback(async () => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) return;
    setIsLoading(true);
    try {
      const info = await getCustomerInfo();
      processCustomerInfo(info);
      await loadOfferings();
    } finally {
      setIsLoading(false);
    }
  }, [processCustomerInfo, loadOfferings]);

  const purchase = useCallback(async (pkg: PurchasesPackage): Promise<PurchaseResult> => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) {
      return { success: false, error: FREE_LAUNCH_SUBSCRIPTION_MESSAGE };
    }
    setIsLoading(true);
    try {
      const result = await rcPurchasePackage(pkg);
      if (result.customerInfo) {
        processCustomerInfo(result.customerInfo);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [processCustomerInfo]);

  const restore = useCallback(async (): Promise<PurchaseResult> => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) {
      return { success: false, error: FREE_LAUNCH_SUBSCRIPTION_MESSAGE };
    }
    setIsLoading(true);
    try {
      const result = await rcRestorePurchases();
      if (result.customerInfo) {
        processCustomerInfo(result.customerInfo);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [processCustomerInfo]);

  const showPaywall = useCallback(async (): Promise<boolean> => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) return false;
    const purchased = await rcPresentPaywall(currentOffering ?? undefined);
    if (purchased) await refresh();
    return purchased;
  }, [currentOffering, refresh]);

  const showPaywallIfNeeded = useCallback(async (): Promise<boolean> => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) return false;
    const purchased = await rcPresentPaywallIfNeeded(ENTITLEMENT_ID);
    if (purchased) await refresh();
    return purchased;
  }, [refresh]);

  const showCustomerCenter = useCallback(async (): Promise<void> => {
    if (!LAUNCH_CONFIG.subscriptionsEnabled) return;
    await rcPresentCustomerCenter();
    // Refresh after managing subscription
    await refresh();
  }, [refresh]);

  // ── Value ──────────────────────────────────────────────────────────────────

  const value: SubscriptionContextValue = {
    isReady,
    isLoading,
    isPro,
    subscriptionsAvailable,
    customerInfo,
    currentOffering,
    packages,
    identify,
    reset,
    refresh,
    purchase,
    restore,
    showPaywall,
    showPaywallIfNeeded,
    showCustomerCenter,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

// ── Hooks ──────────────────────────────────────────────────────────────────────

/**
 * Access the full subscription context.
 */
export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription must be used inside <SubscriptionProvider>');
  }
  return ctx;
}

/**
 * Convenience hook: returns `true` when the user has the Pro entitlement.
 */
export function useIsPro(): boolean {
  const { isPro } = useSubscription();
  return isPro;
}
