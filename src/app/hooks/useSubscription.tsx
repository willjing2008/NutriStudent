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
  ENTITLEMENT_ID,
  type CustomerInfo,
  type PurchasesOffering,
  type PurchasesPackage,
  type PurchaseResult,
} from '../services/revenuecat';

// ── Context Types ──────────────────────────────────────────────────────────────

interface SubscriptionState {
  /** Whether the SDK has finished initialising */
  isReady: boolean;
  /** Whether a network operation is in progress */
  isLoading: boolean;
  /** The user has an active "NutriStudent Pro" entitlement */
  isPro: boolean;
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
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);
  const [packages, setPackages] = useState<SubscriptionState['packages']>({});
  const initializedRef = useRef(false);

  // Update derived state whenever customerInfo changes
  const processCustomerInfo = useCallback((info: CustomerInfo) => {
    setCustomerInfo(info);
    setIsPro(hasProEntitlement(info));
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
      // Offerings might not be configured yet — non-fatal
    }
  }, []);

  // Initialise the SDK once on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    (async () => {
      try {
        await initializeRevenueCat();

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
    setIsLoading(true);
    try {
      const info = await logoutUser();
      processCustomerInfo(info);
    } finally {
      setIsLoading(false);
    }
  }, [processCustomerInfo]);

  const refresh = useCallback(async () => {
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
    const purchased = await rcPresentPaywall(currentOffering ?? undefined);
    if (purchased) await refresh();
    return purchased;
  }, [currentOffering, refresh]);

  const showPaywallIfNeeded = useCallback(async (): Promise<boolean> => {
    const purchased = await rcPresentPaywallIfNeeded(ENTITLEMENT_ID);
    if (purchased) await refresh();
    return purchased;
  }, [refresh]);

  const showCustomerCenter = useCallback(async (): Promise<void> => {
    await rcPresentCustomerCenter();
    // Refresh after managing subscription
    await refresh();
  }, [refresh]);

  // ── Value ──────────────────────────────────────────────────────────────────

  const value: SubscriptionContextValue = {
    isReady,
    isLoading,
    isPro,
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
