import { useState, useMemo } from 'react';
import { X, Plus, Trash2, BookOpen, Clock, Save, Loader2, AlertTriangle, Sunrise, Sun, Moon } from 'lucide-react';
import type { AcademicSchedule, ClassEntry, SleepSchedule } from '../types/calendar';
import type { MealTimes } from '../App';

interface ClassConflictWarning {
  classId: string;
  className: string;
  mealSlot: string;
  mealTime: string;
  classTime: string;
}

interface AcademicScheduleEditorProps {
  schedule: AcademicSchedule | null;
  onSave: (schedule: Omit<AcademicSchedule, 'updatedAt'>, mealTimes?: MealTimes, selectedMealSlots?: ('breakfast' | 'lunch' | 'dinner')[]) => Promise<any>;
  onClose: () => void;
  isSaving?: boolean;
  initialTab?: 'classes' | 'meals';
  mealTimes?: MealTimes;
  mealsPerDay?: number;
  selectedMealSlots?: ('breakfast' | 'lunch' | 'dinner')[];
}

const DAY_OPTIONS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const COLOR_OPTIONS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#06B6D4'];

function createEmptyClass(): ClassEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    color: COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)],
  };
}

const DEFAULT_SLEEP: SleepSchedule = {
  bedtime: '23:00',
  wakeTime: '07:00',
  lastMealBeforeBed: 120,
};

function addOneHour(time: string): string {
  const [h, m] = time.split(':').map(Number);
  return `${String(Math.min(h + 1, 23)).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function formatTime12(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`;
}

export function AcademicScheduleEditor({ schedule, onSave, onClose, isSaving, initialTab, mealTimes, mealsPerDay = 3, selectedMealSlots: initialSelectedSlots }: AcademicScheduleEditorProps) {
  const [classes, setClasses] = useState<ClassEntry[]>(schedule?.classes || []);
  const [sleepSchedule, setSleepSchedule] = useState<SleepSchedule>(schedule?.sleepSchedule || DEFAULT_SLEEP);
  const [activeTab, setActiveTab] = useState<'classes' | 'meals'>(initialTab === 'classes' ? 'classes' : initialTab === 'meals' ? 'meals' : 'classes');
  const [editedMealTimes, setEditedMealTimes] = useState<MealTimes>(
    mealTimes || { breakfast: '08:00', lunch: '12:00', dinner: '18:00' }
  );
  const [editedMealSlots, setEditedMealSlots] = useState<Set<'breakfast' | 'lunch' | 'dinner'>>(
    new Set(initialSelectedSlots || ['breakfast', 'lunch', 'dinner'])
  );

  // Detect meal/class conflicts in real-time as classes are edited
  const classConflictWarnings = useMemo<ClassConflictWarning[]>(() => {
    const activeSlots = mealsPerDay >= 3
      ? (['breakfast', 'lunch', 'dinner'] as const)
      : (['breakfast', 'lunch', 'dinner'] as const).filter(k => editedMealSlots.has(k));
    const meals = activeSlots.map(slot => ({
      slot,
      start: editedMealTimes[slot],
      end: addOneHour(editedMealTimes[slot]),
    }));

    const warnings: ClassConflictWarning[] = [];
    for (const cls of classes) {
      if (!cls.startTime || !cls.endTime) continue;
      for (const meal of meals) {
        if (cls.startTime < meal.end && cls.endTime > meal.start) {
          warnings.push({
            classId: cls.id,
            className: cls.name || 'Untitled Class',
            mealSlot: meal.slot,
            mealTime: `${formatTime12(meal.start)} – ${formatTime12(meal.end)}`,
            classTime: `${formatTime12(cls.startTime)} – ${formatTime12(cls.endTime)}`,
          });
        }
      }
    }
    return warnings;
  }, [classes, editedMealTimes, editedMealSlots, mealsPerDay]);

  // Classes whose end time is not after their start time — these corrupt
  // conflict detection and the displayed range, so saving is blocked.
  const invalidTimeClassIds = useMemo(
    () =>
      new Set(
        classes
          .filter(c => c.startTime && c.endTime && c.endTime <= c.startTime)
          .map(c => c.id),
      ),
    [classes],
  );

  const handleSave = async () => {
    if (invalidTimeClassIds.size > 0) {
      setActiveTab('classes');
      return;
    }
    const activeSlots: ('breakfast' | 'lunch' | 'dinner')[] = mealsPerDay >= 3
      ? ['breakfast', 'lunch', 'dinner']
      : [...editedMealSlots];
    await onSave(
      { classes, testingPeriods: schedule?.testingPeriods || [], sleepSchedule },
      editedMealTimes,
      activeSlots,
    );
  };

  const updateClass = (id: string, field: keyof ClassEntry, value: any) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[70]">
      <div className="bg-[#0A1F13] w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col border border-[#1E4029]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1E4029]">
          <h2 className="text-lg font-bold text-white">Schedule Settings</h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-[#1E4029]">
          {[
            { id: 'classes' as const, label: 'Classes', icon: BookOpen },
            { id: 'meals' as const, label: 'Meal Times', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#22C55E] border-b-2 border-[#22C55E]'
                  : 'text-[#6B7280] hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <>
              {classes.map((cls) => (
                <div key={cls.id} className="bg-[#142A1D] rounded-xl p-4 border border-[#1E4029] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cls.color }} />
                      <input
                        value={cls.name}
                        onChange={(e) => updateClass(cls.id, 'name', e.target.value)}
                        placeholder="Class name (e.g., CS 101)"
                        className="bg-transparent text-white text-sm font-medium focus:outline-none placeholder-[#6B7280] w-full"
                      />
                    </div>
                    <button
                      onClick={() => setClasses((prev) => prev.filter((c) => c.id !== cls.id))}
                      className="text-red-400/50 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                    <select
                      value={cls.dayOfWeek}
                      onChange={(e) => updateClass(cls.id, 'dayOfWeek', Number(e.target.value))}
                      className="bg-[#0A1F13] text-white text-xs rounded-lg px-2 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] min-w-0"
                    >
                      {DAY_OPTIONS.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                    <input
                      type="time"
                      value={cls.startTime}
                      onChange={(e) => updateClass(cls.id, 'startTime', e.target.value)}
                      className="bg-[#0A1F13] text-white text-xs rounded-lg px-3 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark] w-[100px]"
                    />
                    <input
                      type="time"
                      value={cls.endTime}
                      onChange={(e) => updateClass(cls.id, 'endTime', e.target.value)}
                      className="bg-[#0A1F13] text-white text-xs rounded-lg px-3 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark] w-[100px]"
                    />
                  </div>

                  {invalidTimeClassIds.has(cls.id) && (
                    <div className="flex items-center gap-1.5 text-[11px] text-red-300">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      End time must be after the start time.
                    </div>
                  )}

                  <input
                    value={cls.location || ''}
                    onChange={(e) => updateClass(cls.id, 'location', e.target.value)}
                    placeholder="Location (optional)"
                    className="w-full bg-[#0A1F13] text-white text-xs rounded-lg px-3 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] placeholder-[#6B7280]"
                  />

                  {/* Color picker */}
                  <div className="flex gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateClass(cls.id, 'color', color)}
                        className={`w-5 h-5 rounded-full transition-all ${
                          cls.color === color ? 'ring-2 ring-white ring-offset-1 ring-offset-[#142A1D]' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Meal/class conflict warnings */}
              {classConflictWarnings.length > 0 && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Meal Time Conflicts Detected
                  </div>
                  {classConflictWarnings.map((w, i) => (
                    <div key={i} className="text-[11px] text-red-300/80 pl-5">
                      <span className="font-medium text-red-300">{w.className}</span>
                      {' '}({w.classTime}) overlaps with{' '}
                      <span className="font-medium text-red-300">{w.mealSlot}</span>
                      {' '}({w.mealTime})
                    </div>
                  ))}
                  <div className="text-[10px] text-red-400/60 pl-5">
                    You can adjust meal times for conflict days from the schedule view.
                  </div>
                </div>
              )}

              <button
                onClick={() => setClasses((prev) => [...prev, createEmptyClass()])}
                className="w-full py-3 border-2 border-dashed border-[#1E4029] rounded-xl text-[#22C55E] text-sm font-medium hover:border-[#22C55E]/50 hover:bg-[#142A1D]/50 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Class
              </button>
            </>
          )}

          {/* Meal Times Tab */}
          {activeTab === 'meals' && (
            <div className="space-y-4">
              <p className="text-[#6B7280] text-sm">
                {mealsPerDay < 3
                  ? `Pick which ${mealsPerDay === 1 ? 'meal' : 'meals'} you'd like, then set the time.`
                  : 'Set when you usually eat. This helps schedule meals around your classes.'}
              </p>

              {/* Slot picker — shown when fewer than 3 meals */}
              {mealsPerDay < 3 && (
                <div className="flex gap-2">
                  {([
                    { key: 'breakfast' as const, label: 'Breakfast', icon: Sunrise, color: '#F59E0B' },
                    { key: 'lunch' as const, label: 'Lunch', icon: Sun, color: '#22C55E' },
                    { key: 'dinner' as const, label: 'Dinner', icon: Moon, color: '#8B5CF6' },
                  ]).map(({ key, label, icon: MealIcon, color }) => {
                    const active = editedMealSlots.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setEditedMealSlots(prev => {
                            const next = new Set(prev);
                            if (active) {
                              if (next.size > 1) next.delete(key);
                            } else {
                              if (next.size < mealsPerDay) next.add(key);
                              else {
                                const first = [...next][0];
                                next.delete(first);
                                next.add(key);
                              }
                            }
                            return next;
                          });
                        }}
                        className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all ${
                          active
                            ? 'bg-[#0A1F13] border-2 border-[#22C55E]'
                            : 'bg-[#0A1F13] border border-[#2D5A3D] opacity-50 hover:opacity-75'
                        }`}
                      >
                        <MealIcon className="w-4 h-4" style={{ color: active ? color : '#6B7280' }} />
                        <span className={`text-xs font-medium ${active ? 'text-white' : 'text-[#6B7280]'}`}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Time pickers for active slots */}
              <div className="space-y-3">
                {([
                  { key: 'breakfast' as const, label: 'Breakfast', icon: Sunrise, color: '#F59E0B' },
                  { key: 'lunch' as const, label: 'Lunch', icon: Sun, color: '#22C55E' },
                  { key: 'dinner' as const, label: 'Dinner', icon: Moon, color: '#8B5CF6' },
                ]).filter(({ key }) => mealsPerDay >= 3 || editedMealSlots.has(key))
                  .slice(0, mealsPerDay >= 3 ? 3 : mealsPerDay)
                  .map(({ key, label, icon: MealIcon, color }) => (
                  <div key={key} className="flex items-center gap-3 p-3 bg-[#142A1D] rounded-xl border border-[#1E4029]">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}20` }}>
                      <MealIcon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-sm font-medium">{label}</span>
                    </div>
                    <input
                      type="time"
                      value={editedMealTimes[key]}
                      onChange={(e) => setEditedMealTimes(prev => ({ ...prev, [key]: e.target.value }))}
                      className="bg-[#0A1F13] text-white text-sm rounded-lg px-4 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark] w-[140px]"
                    />
                  </div>
                ))}
              </div>

              {/* Conflict warnings with classes */}
              {classConflictWarnings.length > 0 && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Meal Time Conflicts Detected
                  </div>
                  {classConflictWarnings.map((w, i) => (
                    <div key={i} className="text-[11px] text-red-300/80 pl-5">
                      <span className="font-medium text-red-300">{w.className}</span>
                      {' '}({w.classTime}) overlaps with{' '}
                      <span className="font-medium text-red-300">{w.mealSlot}</span>
                      {' '}({w.mealTime})
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E4029]">
          <button
            onClick={handleSave}
            disabled={isSaving || invalidTimeClassIds.size > 0}
            className="w-full py-3 bg-[#22C55E] text-[#052E16] rounded-xl font-semibold hover:bg-[#4ADE80] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
