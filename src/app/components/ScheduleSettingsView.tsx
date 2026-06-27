import { CalendarDays, GraduationCap, Plus, BookOpen, Sparkles } from 'lucide-react';
import type { AcademicSchedule } from '../types/calendar';
import { calendarImportSupported } from '../utils/systemCalendar';

interface ScheduleSettingsViewProps {
  schedule: AcademicSchedule | null;
  isTestingPeriod?: boolean;
  /** Native only: open the calendar-import flow. */
  onImportClasses: () => void;
  /** Web fallback: open the editor to add/edit classes manually. */
  onManageClasses: () => void;
  /** Open the editor on exam periods + sleep. */
  onEditExamsSleep: () => void;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatTime12(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`;
}

export function ScheduleSettingsView({
  schedule,
  isTestingPeriod,
  onImportClasses,
  onManageClasses,
  onEditExamsSleep,
}: ScheduleSettingsViewProps) {
  const classes = [...(schedule?.classes || [])].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime),
  );
  const examCount = schedule?.testingPeriods?.length || 0;

  return (
    <div className="px-5 space-y-4">
      {/* Classes section */}
      <div className="bg-[#142A1D] rounded-2xl border border-[#1E4029] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#22C55E]" />
            <h3 className="text-white font-semibold text-sm">Your Classes</h3>
          </div>
          {calendarImportSupported ? (
            <button
              onClick={onImportClasses}
              className="flex items-center gap-1.5 text-xs font-medium text-[#22C55E] bg-[#0A1F13] border border-[#22C55E]/40 rounded-lg px-3 py-1.5 hover:bg-[#22C55E]/10 transition-colors"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              {classes.length ? 'Re-import' : 'Import from Calendar'}
            </button>
          ) : (
            <button
              onClick={onManageClasses}
              className="flex items-center gap-1.5 text-xs font-medium text-[#22C55E] bg-[#0A1F13] border border-[#22C55E]/40 rounded-lg px-3 py-1.5 hover:bg-[#22C55E]/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              {classes.length ? 'Edit' : 'Add classes'}
            </button>
          )}
        </div>

        {classes.length === 0 ? (
          <p className="text-[#9CA3AF] text-xs leading-relaxed">
            {calendarImportSupported
              ? 'Import this week’s classes from your calendar so we can schedule meals around them. We never change your calendar.'
              : 'Add your classes so we can schedule meals around them.'}
          </p>
        ) : (
          <div className="space-y-2">
            {classes.map((cls) => (
              <div key={cls.id} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cls.color || '#22C55E' }} />
                <span className="text-white text-sm flex-1 min-w-0 truncate">{cls.name || 'Untitled'}</span>
                <span className="text-[#6B7280] text-xs flex-shrink-0">{DAY_LABELS[cls.dayOfWeek]}</span>
                <span className="text-[#9CA3AF] text-xs flex-shrink-0 tabular-nums">
                  {formatTime12(cls.startTime)}–{formatTime12(cls.endTime)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exam periods + sleep */}
      <button
        onClick={onEditExamsSleep}
        className="w-full bg-[#142A1D] rounded-2xl border border-[#1E4029] p-4 flex items-center gap-3 hover:border-[#22C55E]/40 transition-colors text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-[#0A1F13] flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-4.5 h-4.5 text-[#22C55E]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">Exam periods &amp; sleep</span>
            {isTestingPeriod && (
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300">
                <Sparkles className="w-2.5 h-2.5" /> FOCUS
              </span>
            )}
          </div>
          <p className="text-[#6B7280] text-xs mt-0.5">
            {examCount ? `${examCount} exam period${examCount > 1 ? 's' : ''} · ` : ''}
            Tune Focus Mode and sleep-friendly dinners.
          </p>
        </div>
      </button>
    </div>
  );
}
