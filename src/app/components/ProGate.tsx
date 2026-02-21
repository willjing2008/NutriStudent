import React from 'react';
import { Crown, Lock } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

interface ProGateProps {
  children: React.ReactNode;
  /** Optional fallback shown to free users. If omitted, a default upgrade prompt is shown. */
  fallback?: React.ReactNode;
}

/**
 * Renders `children` only when the user has the Pro entitlement.
 * Free users see either the custom `fallback` or a default upgrade prompt.
 */
export function ProGate({ children, fallback }: ProGateProps) {
  const { isPro, showPaywallIfNeeded } = useSubscription();

  if (isPro) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <button
      onClick={() => showPaywallIfNeeded()}
      className="w-full p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl flex items-center gap-3 hover:bg-[#222222] transition-colors"
    >
      <div className="w-10 h-10 rounded-xl bg-[#22C55E]/20 flex items-center justify-center">
        <Lock className="w-5 h-5 text-[#22C55E]" />
      </div>
      <div className="flex-1 text-left">
        <div className="text-white font-medium text-sm">Pro Feature</div>
        <div className="text-[#6B7280] text-xs">Tap to upgrade to NutriStudent Pro</div>
      </div>
      <Crown className="w-5 h-5 text-[#22C55E]" />
    </button>
  );
}
