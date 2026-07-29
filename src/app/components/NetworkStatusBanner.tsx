import { useEffect, useState } from 'react';
import { WifiOff, X } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export function NetworkStatusBanner() {
  const { isOnline } = useNetworkStatus();
  const [dismissed, setDismissed] = useState(false);

  // A dismissal only lasts for the current offline episode: reconnecting
  // resets it so the next offline episode shows the banner again.
  useEffect(() => {
    if (isOnline) setDismissed(false);
  }, [isOnline]);

  if (isOnline || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-3 right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[1000] rounded-2xl border border-amber-400/30 bg-[#1F1300]/95 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-md"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-amber-400/15 p-2">
          <WifiOff className="h-4 w-4 text-amber-300" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-amber-100">No internet connection</p>
          <p className="mt-0.5 text-xs leading-5 text-amber-100/75">
            Saved meal plans still work, but new plans and changes need a connection.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="-my-2 -mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-amber-200/70 transition-colors hover:text-amber-100 active:bg-amber-400/10"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
