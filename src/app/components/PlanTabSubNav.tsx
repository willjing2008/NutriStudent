import { useLanguage } from '../hooks/useLanguage';

interface PlanTabSubNavProps {
  activeView: 'meals' | 'schedule';
  onViewChange: (view: 'meals' | 'schedule') => void;
  isTestingPeriod?: boolean;
  scheduleDisabled?: boolean;
}

export function PlanTabSubNav({ activeView, onViewChange, isTestingPeriod, scheduleDisabled }: PlanTabSubNavProps) {
  const { t } = useLanguage();

  return (
    <div className="px-5 mb-4">
      <div className="flex bg-[#142A1D] rounded-xl p-1 border border-[#1E4029]">
        <button
          onClick={() => onViewChange('meals')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeView === 'meals'
              ? 'bg-[#22C55E] text-[#052E16]'
              : 'text-[#9CA3AF] hover:text-white'
          }`}
        >
          {t('plan') || 'Meals'}
          {isTestingPeriod && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeView === 'meals'
                ? 'bg-[#052E16]/30 text-[#052E16]'
                : 'bg-purple-500/20 text-purple-300'
            }`}>
              FOCUS
            </span>
          )}
        </button>
        <button
          onClick={() => !scheduleDisabled && onViewChange('schedule')}
          disabled={scheduleDisabled}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            scheduleDisabled
              ? 'text-[#4B5563] cursor-not-allowed opacity-50'
              : activeView === 'schedule'
                ? 'bg-[#22C55E] text-[#052E16]'
                : 'text-[#9CA3AF] hover:text-white'
          }`}
        >
          Schedule
        </button>
      </div>
    </div>
  );
}
