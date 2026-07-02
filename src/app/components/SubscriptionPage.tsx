import React, { useState } from 'react';
import {
  Crown,
  Check,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  ChefHat,
  BarChart3,
  ShieldCheck,
  Loader2,
  Settings,
} from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import type { PurchasesPackage } from '../services/revenuecat';

interface SubscriptionPageProps {
  onBack?: () => void;
  mandatory?: boolean;
  onLogout?: () => void;
}

// ── Feature list shown on the page ─────────────────────────────────────────────

const PRO_FEATURES = [
  { icon: ChefHat, label: 'Unlimited meal plans' },
  { icon: Sparkles, label: 'AI-powered recipe customisation' },
  { icon: BarChart3, label: 'Advanced nutrition analytics' },
  { icon: ShieldCheck, label: 'Exclusive recipes & cuisines' },
];

// ── Plan card type ─────────────────────────────────────────────────────────────

type PlanId = 'monthly' | 'yearly';

interface PlanOption {
  id: PlanId;
  label: string;
  badge?: string;
  getPrice: (pkg?: PurchasesPackage) => string;
  getDetail: (pkg?: PurchasesPackage) => string;
}

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'yearly',
    label: 'Yearly',
    badge: 'Best Value',
    getPrice: (pkg) => pkg?.product.priceString ?? '£49.99/yr',
    getDetail: (pkg) => {
      if (!pkg) return '~£4.17/mo';
      const price = pkg.product.price ?? 49.99;
      return `~£${(price / 12).toFixed(2)}/mo`;
    },
  },
  {
    id: 'monthly',
    label: 'Monthly',
    getPrice: (pkg) => pkg?.product.priceString ?? '£4.99/mo',
    getDetail: () => 'Cancel any time',
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export function SubscriptionPage({ onBack, mandatory = false, onLogout }: SubscriptionPageProps) {
  const {
    isPro,
    isLoading,
    packages,
    customerInfo,
    purchase,
    restore,
    showPaywall,
    showCustomerCenter,
  } = useSubscription();

  const [selectedPlan, setSelectedPlan] = useState<PlanId>('yearly');
  const [error, setError] = useState<string | null>(null);

  // ── Active subscriber view ───────────────────────────────────────────────

  if (isPro) {
    const activeEntitlement = customerInfo?.entitlements.active['NutriStudent Pro'];
    const expirationDate = activeEntitlement?.expirationDate
      ? new Date(activeEntitlement.expirationDate).toLocaleDateString()
      : null;

    return (
      <div
        className="bg-[#0A0A0A] flex flex-col overflow-hidden"
        style={{
          height: '100dvh',
          maxHeight: '100dvh',
        }}
      >
        {/* Header */}
        <div className="px-5 pt-6 pb-2 shrink-0">
          {!mandatory && onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#9CA3AF] mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center mx-auto mb-3">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">NutriStudent Pro</h1>
            <p className="text-[#22C55E] font-medium">Active</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col justify-center px-5 py-3 gap-4">
          {expirationDate && (
            <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#2D2D2D]">
              <div className="text-[#6B7280] text-sm">Next renewal</div>
              <div className="text-white font-semibold text-lg">{expirationDate}</div>
            </div>
          )}

          {/* Features unlocked */}
          <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#2D2D2D]">
            <h3 className="text-white font-semibold mb-3">Your Pro Features</h3>
            <div className="space-y-2.5">
              {PRO_FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#22C55E]/20 flex items-center justify-center shrink-0">
                    <f.icon className="w-3.5 h-3.5 text-[#22C55E]" />
                  </div>
                  <span className="text-white text-sm">{f.label}</span>
                  <Check className="w-4 h-4 text-[#22C55E] ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom action — pinned */}
        <div className="px-5 pb-6 pt-2 shrink-0">
          <button
            onClick={showCustomerCenter}
            className="w-full flex items-center justify-center gap-3 p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl text-white font-medium hover:bg-[#222222] transition-colors"
          >
            <Settings className="w-5 h-5 text-[#9CA3AF]" />
            Manage Subscription
          </button>
        </div>
      </div>
    );
  }

  // ── Non-subscriber (paywall) view ────────────────────────────────────────

  const handlePurchase = async () => {
    setError(null);
    const pkg = packages[selectedPlan];

    if (!pkg) {
      // Fall back to RevenueCat's built-in paywall if packages aren't loaded
      const purchased = await showPaywall();
      if (!purchased) setError('Purchase was cancelled or failed.');
      return;
    }

    const result = await purchase(pkg);
    if (!result.success && !result.cancelled) {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  const handleRestore = async () => {
    setError(null);
    const result = await restore();
    if (!result.success) {
      setError(result.error ?? 'No previous purchases found.');
    }
  };

  return (
    <div
      className="bg-[#0A0A0A] flex flex-col overflow-hidden"
      style={{
        height: 'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))',
        maxHeight: 'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-2 shrink-0">
        {!mandatory && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#9CA3AF] mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Upgrade to Pro</h1>
          <p className="text-[#9CA3AF] text-sm max-w-xs mx-auto">
            Unlock the full NutriStudent experience
          </p>
        </div>
      </div>

      {/* Scrollable middle content */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-5 py-3 gap-3">
        {/* Features */}
        <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#2D2D2D]">
          <div className="space-y-2.5">
            {PRO_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#22C55E]/20 flex items-center justify-center shrink-0">
                  <f.icon className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
                <span className="text-white text-sm">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan selection */}
        <div className="space-y-2.5">
          {PLAN_OPTIONS.map((plan) => {
            const pkg = packages[plan.id];
            const isSelected = selectedPlan === plan.id;

            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full p-3.5 rounded-2xl border-2 transition-all text-left relative ${
                  isSelected
                    ? 'border-[#22C55E] bg-[#22C55E]/10'
                    : 'border-[#2D2D2D] bg-[#1A1A1A]'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-[#22C55E] text-[#052E16] text-[10px] font-bold uppercase rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{plan.label}</div>
                    <div className="text-[#6B7280] text-xs mt-0.5">
                      {plan.getDetail(pkg)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">
                      {plan.getPrice(pkg)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
      </div>

      {/* Bottom actions — pinned */}
      <div className="px-5 pb-6 pt-2 shrink-0 space-y-3">
        {/* Subscribe button */}
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-bold text-lg rounded-2xl disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Crown className="w-5 h-5" />
              Subscribe Now
            </>
          )}
        </button>

        {/* Restore purchases */}
        <div className="text-center">
          <button
            onClick={handleRestore}
            disabled={isLoading}
            className="text-[#6B7280] text-sm flex items-center gap-1.5 mx-auto hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restore Purchases
          </button>
        </div>

        {/* Sign out link for mandatory paywall */}
        {onLogout && (
          <div className="text-center">
            <button
              onClick={onLogout}
              className="text-[#6B7280] text-sm hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
