import { useEffect, useState } from 'react';
import { X, CalendarDays, Check, Loader2, AlertTriangle } from 'lucide-react';
import type { Calendar } from '@ebarooni/capacitor-calendar';
import type { ClassEntry } from '../types/calendar';
import { requestAccess, listCalendars, readWeekEvents } from '../utils/systemCalendar';
import { eventsToClasses } from '../utils/eventsToClasses';

interface CalendarImportModalProps {
  /** Start of the week whose occurrences are read (local-midnight Sunday). */
  weekStart: Date;
  /** Receives the mapped classes; the parent persists them and closes on success. */
  onImport: (classes: ClassEntry[]) => Promise<void>;
  onClose: () => void;
}

type Phase = 'requesting' | 'denied' | 'picking' | 'importing' | 'empty' | 'error';

export function CalendarImportModal({ weekStart, onImport, onClose }: CalendarImportModalProps) {
  const [phase, setPhase] = useState<Phase>('requesting');
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // On open: request access, then load the calendar list for the picker.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const granted = await requestAccess();
      if (cancelled) return;
      if (!granted) {
        setPhase('denied');
        return;
      }
      const cals = await listCalendars();
      if (cancelled) return;
      setCalendars(cals);
      setSelected(new Set(cals.map(c => c.id))); // default: all calendars count as classes
      setPhase('picking');
    })();
    return () => { cancelled = true; };
  }, []);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleImport = async () => {
    setPhase('importing');
    try {
      const events = await readWeekEvents(weekStart);
      const classes = eventsToClasses(events, [...selected]);
      if (classes.length === 0) {
        setPhase('empty');
        return;
      }
      await onImport(classes);
    } catch (err) {
      console.error('Calendar import failed:', err);
      setPhase('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[70]">
      <div className="bg-[#0A1F13] w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col border border-[#1E4029]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1E4029]">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#22C55E]" />
            <h2 className="text-lg font-bold text-white">Import from Calendar</h2>
          </div>
          <button onClick={onClose} className="text-[#6B7280] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(phase === 'requesting' || phase === 'importing') && (
            <div className="flex flex-col items-center gap-3 py-10 text-[#9CA3AF]">
              <Loader2 className="w-6 h-6 animate-spin text-[#22C55E]" />
              <p className="text-sm">{phase === 'requesting' ? 'Requesting calendar access…' : 'Importing this week’s classes…'}</p>
            </div>
          )}

          {phase === 'denied' && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <p className="text-sm text-white font-medium">Calendar access is off</p>
              <p className="text-xs text-[#9CA3AF] max-w-xs">
                To import your classes, enable Calendar access for NutriStudent in iOS Settings → Privacy → Calendars, then try again.
              </p>
            </div>
          )}

          {phase === 'error' && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <p className="text-sm text-white font-medium">Couldn’t read your calendar</p>
              <p className="text-xs text-[#9CA3AF]">Something went wrong reading events. Please try again.</p>
            </div>
          )}

          {phase === 'empty' && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CalendarDays className="w-6 h-6 text-[#6B7280]" />
              <p className="text-sm text-white font-medium">No classes found this week</p>
              <p className="text-xs text-[#9CA3AF] max-w-xs">
                We didn’t find any timed events in the selected calendar(s) for this week. Pick different calendars, or add classes manually.
              </p>
            </div>
          )}

          {phase === 'picking' && (
            <>
              <p className="text-[#9CA3AF] text-sm">
                Choose which calendars hold your classes. We’ll import this week’s events from them and schedule meals around them.
              </p>
              {calendars.length === 0 ? (
                <p className="text-sm text-[#6B7280]">No calendars available on this device.</p>
              ) : (
                <div className="space-y-2">
                  {calendars.map(cal => {
                    const isOn = selected.has(cal.id);
                    return (
                      <button
                        key={cal.id}
                        onClick={() => toggle(cal.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          isOn ? 'bg-[#142A1D] border-[#22C55E]' : 'bg-[#0A1F13] border-[#1E4029]'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cal.color || '#6B7280' }} />
                        <span className="flex-1 min-w-0 text-sm text-white truncate">{cal.title}</span>
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                            isOn ? 'bg-[#22C55E] text-[#052E16]' : 'border border-[#2D5A3D]'
                          }`}
                        >
                          {isOn && <Check className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E4029]">
          {phase === 'picking' ? (
            <button
              onClick={handleImport}
              disabled={selected.size === 0}
              className="w-full py-3 bg-[#22C55E] text-[#052E16] rounded-xl font-semibold hover:bg-[#4ADE80] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              Import classes
            </button>
          ) : (phase === 'denied' || phase === 'error' || phase === 'empty') ? (
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#142A1D] text-white rounded-xl font-semibold border border-[#1E4029] hover:border-[#22C55E]/50 transition-all"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
