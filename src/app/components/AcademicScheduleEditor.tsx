import { useState, useMemo } from 'react';
import { X, Plus, Trash2, BookOpen, Save, Loader2, AlertTriangle, GraduationCap, Moon } from 'lucide-react';
import type { AcademicSchedule, ClassEntry, SleepSchedule, TestingPeriod } from '../types/calendar';
import type { MealTimes } from '../App';
import { calendarImportSupported } from '../utils/systemCalendar';

interface ClassConflictWarning {
  classId: string;
  className: string;
  mealSlot: string;
  mealTime: string;
  classTime: string;
}

type EditorTab = 'classes' | 'exams' | 'sleep';

interface AcademicScheduleEditorProps {
  schedule: AcademicSchedule | null;
  onSave: (schedule: Omit<AcademicSchedule, 'updatedAt'>) => Promise<any>;
  onClose: () => void;
  isSaving?: boolean;
  initialTab?: EditorTab;
  /** Base meal times (from preferences) — used only to preview class/meal conflicts. */
  mealTimes?: MealTimes;
  mealsPerDay?: number;
  selectedMealSlots?: ('breakfast' | 'lunch' | 'dinner')[];
  /** When false (web fallback), manual class entry stays available. On native, classes are imported. */
  allowClassEntry?: boolean;
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

const TESTING_TYPES: { value: TestingPeriod['type']; label: string }[] = [
  { value: 'midterm', label: 'Midterm' },
  { value: 'final', label: 'Final' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'custom', label: 'Custom' },
];

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

function createEmptyTestingPeriod(): TestingPeriod {
  return { id: crypto.randomUUID(), name: '', startDate: '', endDate: '', type: 'midterm' };
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

export function AcademicScheduleEditor({
  schedule,
  onSave,
  onClose,
  isSaving,
  initialTab,
  mealTimes,
  mealsPerDay = 3,
  selectedMealSlots,
  allowClassEntry = !calendarImportSupported,
}: AcademicScheduleEditorProps) {
  const [classes, setClasses] = useState<ClassEntry[]>(schedule?.classes || []);
  const [testingPeriods, setTestingPeriods] = useState<TestingPeriod[]>(schedule?.testingPeriods || []);
  const [sleepSchedule, setSleepSchedule] = useState<SleepSchedule>(schedule?.sleepSchedule || DEFAULT_SLEEP);
  const [activeTab, setActiveTab] = useState<EditorTab>(initialTab || (allowClassEntry ? 'classes' : 'exams'));

  const previewMealTimes = mealTimes || { breakfast: '08:00', lunch: '12:00', dinner: '18:00' };

  // Preview meal/class conflicts as classes are edited (web manual entry only).
  const classConflictWarnings = useMemo<ClassConflictWarning[]>(() => {
    const slotSet = new Set(selectedMealSlots || ['breakfast', 'lunch', 'dinner']);
    const activeSlots = mealsPerDay >= 3
      ? (['breakfast', 'lunch', 'dinner'] as const)
      : (['breakfast', 'lunch', 'dinner'] as const).filter(k => slotSet.has(k));
    const meals = activeSlots.map(slot => ({
      slot,
      start: previewMealTimes[slot],
      end: addOneHour(previewMealTimes[slot]),
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
  }, [classes, previewMealTimes, selectedMealSlots, mealsPerDay]);

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

  // Testing periods whose end date is before their start date are invalid.
  const invalidPeriodIds = useMemo(
    () =>
      new Set(
        testingPeriods
          .filter(p => p.startDate && p.endDate && p.endDate < p.startDate)
          .map(p => p.id),
      ),
    [testingPeriods],
  );

  const handleSave = async () => {
    if (invalidTimeClassIds.size > 0) {
      setActiveTab('classes');
      return;
    }
    if (invalidPeriodIds.size > 0) {
      setActiveTab('exams');
      return;
    }
    // Persist only usable testing periods (a date range is required to drive focus mode).
    const cleanPeriods = testingPeriods.filter(p => p.startDate && p.endDate);
    await onSave({
      classes,
      testingPeriods: cleanPeriods,
      sleepSchedule,
      // Preserve overrides — buildAcademicSchedule replaces the whole blob.
      mealTimeOverrides: schedule?.mealTimeOverrides ?? [],
    });
  };

  const updateClass = (id: string, field: keyof ClassEntry, value: any) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const updatePeriod = (id: string, field: keyof TestingPeriod, value: any) => {
    setTestingPeriods((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const tabs: { id: EditorTab; label: string; icon: typeof BookOpen }[] = [
    ...(allowClassEntry ? [{ id: 'classes' as const, label: 'Classes', icon: BookOpen }] : []),
    { id: 'exams', label: 'Exam Periods', icon: GraduationCap },
    { id: 'sleep', label: 'Sleep', icon: Moon },
  ];

  const saveDisabled = isSaving || invalidTimeClassIds.size > 0 || invalidPeriodIds.size > 0;

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
          {tabs.map((tab) => (
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
          {/* Classes Tab (web fallback only) */}
          {activeTab === 'classes' && allowClassEntry && (
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

          {/* Exam Periods Tab — drives Focus Mode */}
          {activeTab === 'exams' && (
            <>
              <p className="text-[#9CA3AF] text-sm">
                Add your exam periods. During these dates the app switches to Focus Mode and favors focus-friendly meals.
              </p>
              {testingPeriods.map((p) => (
                <div key={p.id} className="bg-[#142A1D] rounded-xl p-4 border border-[#1E4029] space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      value={p.name}
                      onChange={(e) => updatePeriod(p.id, 'name', e.target.value)}
                      placeholder="Name (e.g., Midterm Exams)"
                      className="bg-transparent text-white text-sm font-medium focus:outline-none placeholder-[#6B7280] w-full"
                    />
                    <button
                      onClick={() => setTestingPeriods((prev) => prev.filter((x) => x.id !== p.id))}
                      className="text-red-400/50 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <select
                    value={p.type}
                    onChange={(e) => updatePeriod(p.id, 'type', e.target.value as TestingPeriod['type'])}
                    className="w-full bg-[#0A1F13] text-white text-xs rounded-lg px-2 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E]"
                  >
                    {TESTING_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex flex-col gap-1 text-[11px] text-[#6B7280]">
                      Start
                      <input
                        type="date"
                        value={p.startDate}
                        onChange={(e) => updatePeriod(p.id, 'startDate', e.target.value)}
                        className="bg-[#0A1F13] text-white text-xs rounded-lg px-3 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark]"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-[11px] text-[#6B7280]">
                      End
                      <input
                        type="date"
                        value={p.endDate}
                        onChange={(e) => updatePeriod(p.id, 'endDate', e.target.value)}
                        className="bg-[#0A1F13] text-white text-xs rounded-lg px-3 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark]"
                      />
                    </label>
                  </div>

                  {invalidPeriodIds.has(p.id) && (
                    <div className="flex items-center gap-1.5 text-[11px] text-red-300">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      End date must be on or after the start date.
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => setTestingPeriods((prev) => [...prev, createEmptyTestingPeriod()])}
                className="w-full py-3 border-2 border-dashed border-[#1E4029] rounded-xl text-[#22C55E] text-sm font-medium hover:border-[#22C55E]/50 hover:bg-[#142A1D]/50 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Exam Period
              </button>
            </>
          )}

          {/* Sleep Tab — drives sleep-friendly dinners */}
          {activeTab === 'sleep' && (
            <div className="space-y-3">
              <p className="text-[#9CA3AF] text-sm">
                Your sleep window lets the app prefer lighter, sleep-friendly dinners.
              </p>
              <div className="flex items-center gap-3 p-3 bg-[#142A1D] rounded-xl border border-[#1E4029]">
                <span className="flex-1 text-white text-sm font-medium">Bedtime</span>
                <input
                  type="time"
                  value={sleepSchedule.bedtime}
                  onChange={(e) => setSleepSchedule((s) => ({ ...s, bedtime: e.target.value }))}
                  className="bg-[#0A1F13] text-white text-sm rounded-lg px-4 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark] w-[140px]"
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#142A1D] rounded-xl border border-[#1E4029]">
                <span className="flex-1 text-white text-sm font-medium">Wake time</span>
                <input
                  type="time"
                  value={sleepSchedule.wakeTime}
                  onChange={(e) => setSleepSchedule((s) => ({ ...s, wakeTime: e.target.value }))}
                  className="bg-[#0A1F13] text-white text-sm rounded-lg px-4 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark] w-[140px]"
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#142A1D] rounded-xl border border-[#1E4029]">
                <span className="flex-1 text-white text-sm font-medium">Last meal before bed</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={360}
                    step={15}
                    value={sleepSchedule.lastMealBeforeBed}
                    onChange={(e) => setSleepSchedule((s) => ({ ...s, lastMealBeforeBed: Number(e.target.value) }))}
                    className="bg-[#0A1F13] text-white text-sm rounded-lg px-4 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] w-[90px]"
                  />
                  <span className="text-[#6B7280] text-xs">min</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E4029]">
          <button
            onClick={handleSave}
            disabled={saveDisabled}
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
