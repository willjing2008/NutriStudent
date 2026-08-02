import type { ClassEntry } from '../types/calendar';

/**
 * The subset of a system-calendar event (EventKit / @ebarooni/capacitor-calendar
 * `CalendarEvent`) that the import mapper needs. Kept as a local shape so the
 * mapper stays pure and unit-testable without the native plugin.
 */
export interface ImportableEvent {
  id: string;
  title: string;
  calendarId: string | null;
  location: string | null;
  startDate: number; // epoch ms
  endDate: number;   // epoch ms
  /** All-day flag per the plugin's TypeScript interface. */
  isAllDay?: boolean;
  /**
   * All-day flag as the plugin's iOS bridge actually serializes it
   * (`ImplementationHelper.swift` emits `"allDay"`, not `isAllDay`).
   * Check BOTH keys or all-day events import as fake midnight classes.
   */
  allDay?: boolean;
}

const COLOR_OPTIONS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#06B6D4'];

// A "class" spanning 16+ hours is an all-day-ish event whatever its flags say
// (EventKit reports all-day occurrences as 00:00-23:59). Dropping these is the
// defensive backstop for bridges that lose the all-day flag entirely.
const MAX_CLASS_DURATION_MS = 16 * 60 * 60 * 1000;

/** "HH:MM" (24h, zero-padded) for a Date's LOCAL wall-clock time. */
function toHHMM(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function isSameLocalDate(start: Date, end: Date): boolean {
  return start.getFullYear() === end.getFullYear()
    && start.getMonth() === end.getMonth()
    && start.getDate() === end.getDate();
}

/**
 * Map this week's expanded calendar occurrences to `ClassEntry[]`.
 *
 * EventKit returns concrete per-day occurrences for a date range, so each event
 * is already a single weekly instance - no RRULE parsing needed. Each occurrence
 * becomes one class keyed by its local day-of-week and start/end wall-clock time.
 *
 * @param events   raw calendar occurrences for the queried week
 * @param calendarIds when provided, only events from these calendars are kept
 *                    (lets the user scope which calendars count as "classes").
 *                    `undefined` = keep all calendars.
 */
export function eventsToClasses(events: ImportableEvent[], calendarIds?: string[]): ClassEntry[] {
  const allow = calendarIds ? new Set(calendarIds) : null;
  const classes: ClassEntry[] = [];

  for (const ev of events) {
    if (ev.isAllDay ?? ev.allDay) continue;                       // all-day events are never classes
    const name = (ev.title || '').trim();
    if (!name) continue;                                          // unnamed events carry no class info
    if (allow && !allow.has(ev.calendarId ?? '')) continue;       // scoped out by the calendar picker

    const durationMs = ev.endDate - ev.startDate;
    if (!Number.isFinite(durationMs) || durationMs <= 0 || durationMs >= MAX_CLASS_DURATION_MS) continue;

    const start = new Date(ev.startDate);
    const end = new Date(ev.endDate);
    if (!isSameLocalDate(start, end)) continue;

    const startTime = toHHMM(start);
    const endTime = toHHMM(end);
    // ponytail: drop degenerate / cross-midnight events. Classes are same-day and
    // end after they start; anything else corrupts conflict detection downstream.
    if (endTime <= startTime) continue;
    const location = (ev.location || '').trim();
    classes.push({
      id: `${ev.id}:${ev.startDate}`,
      name,
      dayOfWeek: start.getDay(),
      startTime,
      endTime,
      ...(location ? { location } : {}),
      color: COLOR_OPTIONS[classes.length % COLOR_OPTIONS.length],
    });
  }

  return classes;
}
