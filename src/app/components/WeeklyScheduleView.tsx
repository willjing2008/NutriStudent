import { useState, useRef, useEffect } from 'react';
import { Plus, Edit3, X, MapPin, Clock, Flame, ChevronRight, AlertTriangle } from 'lucide-react';
import type { AcademicSchedule, ClassEntry, MealConflict } from '../types/calendar';
import type { MealTimes } from '../App';

interface WeeklyScheduleViewProps {
  schedule: AcademicSchedule | null;
  mealConflicts: MealConflict[];
  isTestingPeriod: boolean;
  testingPeriodName?: string;
  onEditSchedule: (tab?: 'classes' | 'exams' | 'sleep') => void;
  onViewMeal?: (dayIdx: number, mealSlot: string) => void;
  currentWeekMeals?: any[];
  mealTimes?: MealTimes;
}

type PopoverTarget =
  | { type: 'class'; cls: ClassEntry; color: string }
  | { type: 'meal'; dayIdx: number; slot: string; label: string; emoji: string; meal?: any; hasConflict: boolean; conflict?: MealConflict };

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 17 }, (_, i) => i + 7); // 7am to 11pm

const DEFAULT_COLORS = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#06B6D4',
];

function formatHour(hour: number): string {
  if (hour === 0 || hour === 12) return hour === 0 ? '12am' : '12pm';
  return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
}

function formatTimeRange(start: string, end: string): string {
  const fmt = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    const suffix = h >= 12 ? 'pm' : 'am';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return m === 0 ? `${h12}${suffix}` : `${h12}:${m.toString().padStart(2, '0')}${suffix}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

function timeToRow(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h - 7) * 2 + Math.floor(m / 30);
}

function getRowSpan(start: string, end: string): number {
  return Math.max(1, timeToRow(end) - timeToRow(start));
}

function addHourToTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  return `${String(Math.min(h + 1, 23)).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getMealSlotTimes(mealTimes?: MealTimes) {
  const bt = mealTimes?.breakfast || '08:00';
  const lt = mealTimes?.lunch || '12:00';
  const dt = mealTimes?.dinner || '18:00';
  return {
    breakfast: { start: bt, end: addHourToTime(bt), label: 'Breakfast', emoji: '🌅' },
    lunch: { start: lt, end: addHourToTime(lt), label: 'Lunch', emoji: '☀️' },
    dinner: { start: dt, end: addHourToTime(dt), label: 'Dinner', emoji: '🌙' },
  };
}

export function WeeklyScheduleView({
  schedule,
  mealConflicts,
  isTestingPeriod,
  testingPeriodName,
  onEditSchedule,
  onViewMeal,
  currentWeekMeals,
  mealTimes,
}: WeeklyScheduleViewProps) {
  const MEAL_SLOT_TIMES = getMealSlotTimes(mealTimes);
  const classes = schedule?.classes || [];
  const [popover, setPopover] = useState<{ target: PopoverTarget; x: number; y: number } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!popover) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopover(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [popover]);

  // Build a lookup: mealsByDayAndSlot[dayIdx][slot] = meal object
  const mealsByDayAndSlot = new Map<string, any>();
  if (currentWeekMeals) {
    for (const meal of currentWeekMeals) {
      const dow = meal.dayNumber % 7;
      const slot = meal.category || 'dinner';
      mealsByDayAndSlot.set(`${dow}-${slot}`, meal);
    }
  }

  const conflictMap = new Map<string, MealConflict>();
  for (const c of mealConflicts) {
    conflictMap.set(c.mealSlot, c);
  }

  const handleBlockClick = (e: React.MouseEvent, target: PopoverTarget) => {
    e.stopPropagation();
    if (!gridRef.current) return;
    const gridRect = gridRef.current.getBoundingClientRect();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Position popover near the clicked block, relative to grid container
    const x = rect.left - gridRect.left + rect.width / 2;
    const y = rect.bottom - gridRect.top + 4;
    setPopover({ target, x, y });
  };

  if (!schedule || classes.length === 0) {
    return (
      <div className="px-5 flex-1 flex flex-col items-center justify-center">
        <div className="bg-[#142A1D] border border-[#1E4029] rounded-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-[#22C55E]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Set Up Your Schedule</h2>
          <p className="text-[#9CA3AF] mb-6">
            Add your class schedule to get personalized meal reminders and avoid conflicts.
          </p>
          <button
            onClick={() => onEditSchedule('classes')}
            className="px-6 py-3 bg-[#22C55E] text-[#052E16] rounded-full font-semibold hover:bg-[#4ADE80] transition-all"
          >
            Add Classes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 flex flex-col">
      {/* Testing period banner — tappable */}
      {isTestingPeriod && (
        <button
          onClick={() => onEditSchedule('exams')}
          className="mx-3 mb-3 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-between hover:bg-purple-500/30 transition-colors text-left w-full"
        >
          <span className="text-purple-300 text-sm font-medium">
            {testingPeriodName || 'Testing Period'} — Focus meals active
          </span>
          <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
        </button>
      )}

      {/* Edit button */}
      <div className="flex justify-end px-3 mb-2">
        <button
          onClick={() => onEditSchedule('classes')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#22C55E] bg-[#142A1D] rounded-lg border border-[#1E4029] hover:bg-[#1E4029] transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Schedule
        </button>
      </div>

      {/* Weekly grid */}
      <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-xl border border-[#1E4029]">
        <div className="min-w-[600px]">
          {/* Day headers */}
          <div className="grid grid-cols-[50px_repeat(7,1fr)] sticky top-0 z-10 bg-[#0A1F13] border-b border-[#1E4029]">
            <div className="p-2" />
            {DAY_LABELS.map((label) => (
              <div key={label} className="p-2 text-center text-xs font-medium text-[#9CA3AF] border-l border-[#1E4029]/50">
                {label}
              </div>
            ))}
          </div>

          {/* Time grid body */}
          <div ref={gridRef} className="relative grid grid-cols-[50px_repeat(7,1fr)]">
            {/* Time labels + grid lines */}
            {HOURS.map((hour) => (
              <div key={hour} className="contents">
                <div className="h-12 flex items-start justify-end pr-2 pt-0.5 text-[10px] text-[#6B7280]">
                  {formatHour(hour)}
                </div>
                {DAY_LABELS.map((_, dayIdx) => (
                  <div
                    key={`${hour}-${dayIdx}`}
                    className="h-12 border-l border-t border-[#1E4029]/30"
                  />
                ))}
              </div>
            ))}

            {/* Class blocks — interactive */}
            {classes.map((cls, i) => {
              const startRow = timeToRow(cls.startTime);
              const span = getRowSpan(cls.startTime, cls.endTime);
              const color = cls.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];

              return (
                <button
                  key={cls.id}
                  onClick={(e) => handleBlockClick(e, { type: 'class', cls, color })}
                  className="absolute rounded-md px-1.5 py-1 overflow-hidden text-[10px] leading-tight font-medium text-left cursor-pointer hover:brightness-125 active:scale-[0.97] transition-all"
                  style={{
                    backgroundColor: `${color}20`,
                    borderLeft: `3px solid ${color}`,
                    color: color,
                    top: `${startRow * 24}px`,
                    height: `${span * 24}px`,
                    left: `calc(${((cls.dayOfWeek + 1) / 8) * 100}% + 2px)`,
                    width: `calc(${(1 / 8) * 100}% - 4px)`,
                  }}
                >
                  <div className="truncate">{cls.name}</div>
                  {cls.location && (
                    <div className="truncate opacity-70">{cls.location}</div>
                  )}
                </button>
              );
            })}

            {/* Meal slot indicators — interactive */}
            {Object.entries(MEAL_SLOT_TIMES).map(([slot, info]) => {
              const startRow = timeToRow(info.start);
              const span = getRowSpan(info.start, info.end);
              const hasConflict = conflictMap.has(slot);
              const conflict = conflictMap.get(slot);

              return DAY_LABELS.map((_, dayIdx) => {
                const meal = mealsByDayAndSlot.get(`${dayIdx}-${slot}`);

                return (
                  <button
                    key={`meal-${slot}-${dayIdx}`}
                    onClick={(e) => handleBlockClick(e, {
                      type: 'meal', dayIdx, slot, label: info.label, emoji: info.emoji,
                      meal, hasConflict, conflict,
                    })}
                    className={`absolute rounded-md px-1.5 py-1 text-[10px] font-medium text-left cursor-pointer active:scale-[0.97] transition-all ${
                      hasConflict
                        ? 'bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25'
                        : 'bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]/60 hover:bg-[#22C55E]/20'
                    }`}
                    style={{
                      top: `${startRow * 24}px`,
                      height: `${span * 24}px`,
                      left: `calc(${((dayIdx + 1) / 8) * 100}% + 2px)`,
                      width: `calc(${(1 / 8) * 100}% - 4px)`,
                    }}
                  >
                    <span>{info.emoji}</span>
                    {meal && <span className="ml-0.5 truncate">{meal.name?.slice(0, 8)}</span>}
                  </button>
                );
              });
            })}

            {/* Popover */}
            {popover && (
              <div
                ref={popoverRef}
                className="absolute z-20 w-56 bg-[#1A2A1F] border border-[#2D4033] rounded-xl shadow-2xl shadow-black/60 overflow-hidden"
                style={{
                  left: `${Math.max(8, Math.min(popover.x - 112, (gridRef.current?.offsetWidth || 600) - 232))}px`,
                  top: `${popover.y}px`,
                }}
              >
                {popover.target.type === 'class' && (
                  <ClassPopover
                    cls={popover.target.cls}
                    color={popover.target.color}
                    onEdit={() => { setPopover(null); onEditSchedule('classes'); }}
                    onClose={() => setPopover(null)}
                  />
                )}
                {popover.target.type === 'meal' && (
                  <MealPopover
                    dayIdx={popover.target.dayIdx}
                    slot={popover.target.slot}
                    label={popover.target.label}
                    emoji={popover.target.emoji}
                    meal={popover.target.meal}
                    hasConflict={popover.target.hasConflict}
                    conflict={popover.target.conflict}
                    onViewMeal={onViewMeal ? () => { setPopover(null); onViewMeal(popover.target.type === 'meal' ? popover.target.dayIdx : 0, popover.target.type === 'meal' ? popover.target.slot : ''); } : undefined}
                    onClose={() => setPopover(null)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Class detail popover ────────────────────────────────────────────────

function ClassPopover({ cls, color, onEdit, onClose }: {
  cls: ClassEntry; color: string; onEdit: () => void; onClose: () => void;
}) {
  return (
    <div>
      <div className="px-4 pt-3 pb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="text-white font-semibold text-sm truncate">{cls.name || 'Untitled Class'}</span>
        </div>
        <button onClick={onClose} className="text-[#6B7280] hover:text-white transition-colors flex-shrink-0">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="px-4 pb-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span>{DAY_LABELS[cls.dayOfWeek]}, {formatTimeRange(cls.startTime, cls.endTime)}</span>
        </div>
        {cls.location && (
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{cls.location}</span>
          </div>
        )}
      </div>
      <div className="border-t border-[#2D4033]">
        <button
          onClick={onEdit}
          className="w-full px-4 py-2.5 text-xs font-medium text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors flex items-center justify-between"
        >
          Edit Class
          <Edit3 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ── Meal detail popover ─────────────────────────────────────────────────

function MealPopover({ dayIdx, slot, label, emoji, meal, hasConflict, conflict, onViewMeal, onClose }: {
  dayIdx: number; slot: string; label: string; emoji: string;
  meal?: any; hasConflict: boolean; conflict?: MealConflict;
  onViewMeal?: () => void; onClose: () => void;
}) {
  return (
    <div>
      <div className="px-4 pt-3 pb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">{emoji}</span>
          <div className="min-w-0">
            <span className="text-white font-semibold text-sm block truncate">
              {label} — {DAY_LABELS[dayIdx]}
            </span>
            {meal && (
              <span className="text-[#9CA3AF] text-xs block truncate">{meal.name}</span>
            )}
          </div>
        </div>
        <button onClick={onClose} className="text-[#6B7280] hover:text-white transition-colors flex-shrink-0">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Meal nutrition preview */}
      {meal?.nutrition && (
        <div className="px-4 pb-2 flex items-center gap-3 text-[10px] text-[#9CA3AF]">
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-400" />
            {meal.nutrition.calories} cal
          </span>
          <span>{meal.nutrition.protein}g protein</span>
          {meal.cookingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {meal.cookingTime}m
            </span>
          )}
        </div>
      )}

      {/* Conflict warning */}
      {hasConflict && conflict && (
        <div className="mx-4 mb-2 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] text-red-300 flex items-start gap-1.5">
          <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span>{conflict.className} at {formatTimeRange(conflict.classStart, conflict.classEnd)} — {conflict.suggestion}</span>
        </div>
      )}

      {!meal && (
        <div className="px-4 pb-2 text-xs text-[#6B7280]">
          No meal assigned yet
        </div>
      )}

      {onViewMeal && (
        <div className="border-t border-[#2D4033]">
          <button
            onClick={onViewMeal}
            className="w-full px-4 py-2.5 text-xs font-medium text-[#22C55E] hover:bg-[#22C55E]/10 transition-colors flex items-center justify-between"
          >
            {meal ? 'View Meal' : 'Go to Meals'}
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
