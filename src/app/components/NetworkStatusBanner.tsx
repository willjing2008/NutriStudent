import { WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export function NetworkStatusBanner() {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

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
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-100">No internet connection</p>
          <p className="mt-0.5 text-xs leading-5 text-amber-100/75">
            Saved meal plans still work, but new plans and changes need a connection.
          </p>
        </div>
      </div>
    </div>
  );
}
