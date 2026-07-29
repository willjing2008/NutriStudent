/**
 * Which calendars the import picker should pre-select.
 *
 * First run: everything except obvious non-class calendars (holidays,
 * birthdays) - a timed dentist appointment in a personal calendar is
 * recoverable, but pre-selecting "UK Holidays"/"Birthdays" guarantees junk.
 * Later runs: the calendars the user actually imported from last time
 * (persisted device-side in localStorage, which WKWebView keeps across
 * launches), intersected with the calendars that still exist.
 */

export interface SelectableCalendar {
  id: string;
  title: string;
}

const STORAGE_KEY = 'chefpocket.calendarImportSelection';

const NON_CLASS_CALENDAR = /birthday|holiday/i;

/** First-run default: all calendars except holiday/birthday ones. */
export function defaultCalendarSelection(calendars: SelectableCalendar[]): Set<string> {
  const preferred = calendars.filter(c => !NON_CLASS_CALENDAR.test(c.title || ''));
  // If everything looked like a non-class calendar, fall back to all of them
  // so the picker never opens with nothing selectable-looking.
  const chosen = preferred.length > 0 ? preferred : calendars;
  return new Set(chosen.map(c => c.id));
}

/** The persisted last-used selection, or null if absent/corrupt. */
export function loadStoredCalendarSelection(storage: Pick<Storage, 'getItem'> = localStorage): string[] | null {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(id => typeof id === 'string')) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Persist the selection the user imported with. Best-effort. */
export function saveStoredCalendarSelection(ids: string[], storage: Pick<Storage, 'setItem'> = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Quota/private-mode failures just mean no memory next time.
  }
}

/**
 * The selection the picker opens with: the remembered selection restricted to
 * calendars that still exist, or the first-run default when nothing usable
 * was remembered.
 */
export function initialCalendarSelection(
  calendars: SelectableCalendar[],
  storage: Pick<Storage, 'getItem'> = localStorage,
): Set<string> {
  const available = new Set(calendars.map(c => c.id));
  const stored = loadStoredCalendarSelection(storage);
  if (stored) {
    const usable = stored.filter(id => available.has(id));
    if (usable.length > 0) return new Set(usable);
  }
  return defaultCalendarSelection(calendars);
}
