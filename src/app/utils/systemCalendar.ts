import { Capacitor } from '@capacitor/core';
import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import type { Calendar, CalendarEvent } from '@ebarooni/capacitor-calendar';

/**
 * Thin wrapper over @ebarooni/capacitor-calendar (EventKit on iOS). Import-only:
 * we read the user's calendars and this week's events, never write back.
 *
 * On iOS the native Calendar app federates Google/iCloud/Exchange accounts, so an
 * EventKit read returns the student's Google class events too - no separate OAuth.
 * The browser has no EventKit, hence `calendarImportSupported`.
 */
export const calendarImportSupported = Capacitor.isNativePlatform();

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Ask for full calendar access (iOS 17+ split-permission). Returns `true` only
 * when the user grants it; a denied/prompt result or any thrown error resolves
 * to `false` so callers can degrade gracefully instead of crashing.
 */
export async function requestAccess(): Promise<boolean> {
  try {
    const { result } = await CapacitorCalendar.requestFullCalendarAccess();
    return result === 'granted';
  } catch (err) {
    console.error('Calendar access request failed:', err);
    return false;
  }
}

/** The user's calendars (for the import picker). Empty array on failure. */
export async function listCalendars(): Promise<Calendar[]> {
  try {
    const { result } = await CapacitorCalendar.listCalendars();
    return result;
  } catch (err) {
    console.error('Listing calendars failed:', err);
    return [];
  }
}

/**
 * Read the expanded event occurrences in the 7-day window starting at
 * `weekStart`. EventKit returns concrete per-day instances for recurring events,
 * which `eventsToClasses` maps directly to classes.
 */
export async function readWeekEvents(weekStart: Date): Promise<CalendarEvent[]> {
  try {
    const from = weekStart.getTime();
    const { result } = await CapacitorCalendar.listEventsInRange({ from, to: from + WEEK_MS });
    return result;
  } catch (err) {
    console.error('Reading week events failed:', err);
    return [];
  }
}

/** Local midnight of the Sunday that starts the current week. */
export function currentWeekStart(now: Date = new Date()): Date {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  start.setDate(start.getDate() - start.getDay());
  return start;
}
