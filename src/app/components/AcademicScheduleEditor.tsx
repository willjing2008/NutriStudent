import { useState } from 'react';
import { X, Plus, Trash2, BookOpen, Calendar, Moon, Save, Loader2 } from 'lucide-react';
import type { AcademicSchedule, ClassEntry, TestingPeriod, SleepSchedule } from '../types/calendar';

interface AcademicScheduleEditorProps {
  schedule: AcademicSchedule | null;
  onSave: (schedule: Omit<AcademicSchedule, 'updatedAt'>) => Promise<any>;
  onClose: () => void;
  isSaving?: boolean;
  initialTab?: 'classes' | 'exams' | 'sleep';
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

const PERIOD_TYPES = [
  { value: 'midterm', label: 'Midterm' },
  { value: 'final', label: 'Finals' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'custom', label: 'Custom' },
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

function createEmptyPeriod(): TestingPeriod {
  const today = new Date();
  const twoWeeks = new Date(today.getTime() + 14 * 86400000);
  return {
    id: crypto.randomUUID(),
    name: '',
    startDate: today.toISOString().split('T')[0],
    endDate: twoWeeks.toISOString().split('T')[0],
    type: 'midterm',
  };
}

const DEFAULT_SLEEP: SleepSchedule = {
  bedtime: '23:00',
  wakeTime: '07:00',
  lastMealBeforeBed: 120,
};

export function AcademicScheduleEditor({ schedule, onSave, onClose, isSaving, initialTab }: AcademicScheduleEditorProps) {
  const [classes, setClasses] = useState<ClassEntry[]>(schedule?.classes || []);
  const [testingPeriods, setTestingPeriods] = useState<TestingPeriod[]>(schedule?.testingPeriods || []);
  const [sleepSchedule, setSleepSchedule] = useState<SleepSchedule>(schedule?.sleepSchedule || DEFAULT_SLEEP);
  const [activeTab, setActiveTab] = useState<'classes' | 'exams' | 'sleep'>(initialTab || 'classes');

  const handleSave = async () => {
    await onSave({ classes, testingPeriods, sleepSchedule });
  };

  const updateClass = (id: string, field: keyof ClassEntry, value: any) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const updatePeriod = (id: string, field: keyof TestingPeriod, value: any) => {
    setTestingPeriods((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[70]">
      <div className="bg-[#0A1F13] w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col border border-[#1E4029]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1E4029]">
          <h2 className="text-lg font-bold text-white">Academic Schedule</h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-[#1E4029]">
          {[
            { id: 'classes' as const, label: 'Classes', icon: BookOpen },
            { id: 'exams' as const, label: 'Exams', icon: Calendar },
            { id: 'sleep' as const, label: 'Sleep', icon: Moon },
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

              <button
                onClick={() => setClasses((prev) => [...prev, createEmptyClass()])}
                className="w-full py-3 border-2 border-dashed border-[#1E4029] rounded-xl text-[#22C55E] text-sm font-medium hover:border-[#22C55E]/50 hover:bg-[#142A1D]/50 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Class
              </button>
            </>
          )}

          {/* Exams Tab */}
          {activeTab === 'exams' && (
            <>
              {testingPeriods.map((period) => (
                <div key={period.id} className="bg-[#142A1D] rounded-xl p-4 border border-[#1E4029] space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      value={period.name}
                      onChange={(e) => updatePeriod(period.id, 'name', e.target.value)}
                      placeholder="Period name (e.g., Midterm Exams)"
                      className="bg-transparent text-white text-sm font-medium focus:outline-none placeholder-[#6B7280] flex-1"
                    />
                    <button
                      onClick={() => setTestingPeriods((prev) => prev.filter((p) => p.id !== period.id))}
                      className="text-red-400/50 hover:text-red-400 transition-colors ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={period.type}
                      onChange={(e) => updatePeriod(period.id, 'type', e.target.value)}
                      className="bg-[#0A1F13] text-white text-xs rounded-lg px-2 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E]"
                    >
                      {PERIOD_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={period.startDate}
                      onChange={(e) => updatePeriod(period.id, 'startDate', e.target.value)}
                      className="bg-[#0A1F13] text-white text-xs rounded-lg px-2 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E]"
                    />
                    <input
                      type="date"
                      value={period.endDate}
                      onChange={(e) => updatePeriod(period.id, 'endDate', e.target.value)}
                      className="bg-[#0A1F13] text-white text-xs rounded-lg px-2 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => setTestingPeriods((prev) => [...prev, createEmptyPeriod()])}
                className="w-full py-3 border-2 border-dashed border-[#1E4029] rounded-xl text-[#22C55E] text-sm font-medium hover:border-[#22C55E]/50 hover:bg-[#142A1D]/50 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Testing Period
              </button>

              {testingPeriods.length > 0 && (
                <p className="text-[#6B7280] text-xs text-center">
                  During testing periods, your meal plan will prioritize brain-boosting recipes.
                </p>
              )}
            </>
          )}

          {/* Sleep Tab */}
          {activeTab === 'sleep' && (
            <div className="space-y-4">
              <div className="bg-[#142A1D] rounded-xl p-4 border border-[#1E4029] space-y-4">
                <h3 className="text-white text-sm font-medium">Sleep Schedule</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#6B7280] text-xs mb-1 block">Bedtime</label>
                    <input
                      type="time"
                      value={sleepSchedule.bedtime}
                      onChange={(e) => setSleepSchedule((s) => ({ ...s, bedtime: e.target.value }))}
                      className="w-full bg-[#0A1F13] text-white text-sm rounded-lg px-3 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-[#6B7280] text-xs mb-1 block">Wake Time</label>
                    <input
                      type="time"
                      value={sleepSchedule.wakeTime}
                      onChange={(e) => setSleepSchedule((s) => ({ ...s, wakeTime: e.target.value }))}
                      className="w-full bg-[#0A1F13] text-white text-sm rounded-lg px-3 py-2 border border-[#1E4029] focus:outline-none focus:border-[#22C55E] [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#6B7280] text-xs mb-2 block">
                    Last meal before bed: <span className="text-white">{sleepSchedule.lastMealBeforeBed} min</span>
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={240}
                    step={15}
                    value={sleepSchedule.lastMealBeforeBed}
                    onChange={(e) => setSleepSchedule((s) => ({ ...s, lastMealBeforeBed: Number(e.target.value) }))}
                    className="w-full accent-[#22C55E]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B7280]">
                    <span>30 min</span>
                    <span>4 hrs</span>
                  </div>
                </div>
              </div>

              <p className="text-[#6B7280] text-xs text-center">
                Evening meals will feature sleep-friendly recipes based on your bedtime.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E4029]">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3 bg-[#22C55E] text-[#052E16] rounded-xl font-semibold hover:bg-[#4ADE80] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Schedule
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
