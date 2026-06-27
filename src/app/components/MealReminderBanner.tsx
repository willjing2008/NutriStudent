import { X, AlertTriangle } from 'lucide-react';
import type { MealConflict } from '../types/calendar';

interface MealReminderBannerProps {
  conflicts: MealConflict[];
  onDismiss: (conflict: MealConflict) => void;
}

export function MealReminderBanner({ conflicts, onDismiss }: MealReminderBannerProps) {
  if (conflicts.length === 0) return null;

  return (
    <div className="px-5 mb-3 flex flex-col gap-2">
      {conflicts.map((conflict) => (
        <div
          key={`${conflict.mealSlot}-${conflict.className}`}
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-amber-200 text-sm font-medium">
              {conflict.className} ({conflict.classStart}–{conflict.classEnd})
            </p>
            <p className="text-amber-300/70 text-xs mt-0.5">{conflict.suggestion}</p>
          </div>
          <button
            onClick={() => onDismiss(conflict)}
            className="text-amber-400/50 hover:text-amber-400 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
