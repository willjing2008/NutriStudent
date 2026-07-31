import { describe, it, expect } from 'vitest';
import { eventsToClasses, type ImportableEvent } from './eventsToClasses';

// A Monday: 2026-06-15 is a Monday. Build local-time events off it.
function at(year: number, month1: number, day: number, h: number, m: number): number {
  return new Date(year, month1 - 1, day, h, m, 0).getTime();
}

function makeEvent(overrides: Partial<ImportableEvent> = {}): ImportableEvent {
  return {
    id: 'e1',
    title: 'CS 101',
    calendarId: 'cal-school',
    location: 'Room 204',
    startDate: at(2026, 6, 15, 9, 0),  // Mon 09:00
    endDate: at(2026, 6, 15, 10, 30),  // Mon 10:30
    isAllDay: false,
    ...overrides,
  };
}

describe('eventsToClasses', () => {
  it('maps an occurrence to a ClassEntry (day/time/name/location)', () => {
    const [cls] = eventsToClasses([makeEvent()]);
    expect(cls).toMatchObject({
      id: `e1:${at(2026, 6, 15, 9, 0)}`,
      name: 'CS 101',
      dayOfWeek: 1, // Monday
      startTime: '09:00',
      endTime: '10:30',
      location: 'Room 204',
    });
    expect(cls.color).toMatch(/^#/);
  });

  it('zero-pads single-digit hours and minutes', () => {
    const [cls] = eventsToClasses([
      makeEvent({ startDate: at(2026, 6, 16, 8, 5), endDate: at(2026, 6, 16, 9, 9) }),
    ]);
    expect(cls.startTime).toBe('08:05');
    expect(cls.endTime).toBe('09:09');
    expect(cls.dayOfWeek).toBe(2); // Tuesday
  });

  it('skips all-day events', () => {
    expect(eventsToClasses([makeEvent({ isAllDay: true })])).toEqual([]);
  });

  it('skips all-day events serialized under the iOS bridge key `allDay`', () => {
    // The plugin's iOS bridge emits `"allDay"` while its TS interface declares
    // `isAllDay`; relying on `isAllDay` alone imported all-day events as fake
    // midnight-to-midnight classes (P1-2).
    expect(eventsToClasses([makeEvent({ isAllDay: undefined, allDay: true })])).toEqual([]);
  });

  it('defensively drops events spanning the whole waking day even when both all-day flags are missing', () => {
    // EventKit reports all-day occurrences as 00:00-23:59.
    expect(
      eventsToClasses([
        makeEvent({
          isAllDay: undefined,
          allDay: undefined,
          startDate: at(2026, 6, 15, 0, 0),
          endDate: at(2026, 6, 15, 23, 59),
        }),
      ]),
    ).toEqual([]);
  });

  it('keeps a long but plausible same-day event (e.g. an 8-hour field trip)', () => {
    const [cls] = eventsToClasses([
      makeEvent({ startDate: at(2026, 6, 15, 9, 0), endDate: at(2026, 6, 15, 17, 0) }),
    ]);
    expect(cls).toMatchObject({ startTime: '09:00', endTime: '17:00' });
  });

  it('drops events lasting at least 16 real hours', () => {
    expect(
      eventsToClasses([
        makeEvent({
          startDate: at(2026, 6, 15, 1, 0),
          endDate: at(2026, 6, 15, 17, 0),
        }),
      ]),
    ).toEqual([]);
  });

  it('drops events whose local start and end dates differ', () => {
    expect(
      eventsToClasses([
        makeEvent({
          startDate: at(2026, 6, 15, 9, 0),
          endDate: at(2026, 6, 16, 10, 0),
        }),
      ]),
    ).toEqual([]);
  });

  it('gives recurring occurrences distinct ids', () => {
    const mondayStart = at(2026, 6, 15, 9, 0);
    const tuesdayStart = at(2026, 6, 16, 9, 0);
    const result = eventsToClasses([
      makeEvent({ startDate: mondayStart, endDate: at(2026, 6, 15, 10, 30) }),
      makeEvent({ startDate: tuesdayStart, endDate: at(2026, 6, 16, 10, 30) }),
    ]);

    expect(result.map(cls => cls.id)).toEqual([`e1:${mondayStart}`, `e1:${tuesdayStart}`]);
  });

  it('skips events with a blank title', () => {
    expect(eventsToClasses([makeEvent({ title: '   ' })])).toEqual([]);
  });

  it('omits location when absent', () => {
    const [cls] = eventsToClasses([makeEvent({ location: null })]);
    expect(cls).not.toHaveProperty('location');
  });

  it('drops degenerate events whose end is not after the start', () => {
    expect(
      eventsToClasses([makeEvent({ startDate: at(2026, 6, 15, 12, 0), endDate: at(2026, 6, 15, 12, 0) })]),
    ).toEqual([]);
  });

  it('drops cross-midnight events (endTime wraps before startTime)', () => {
    expect(
      eventsToClasses([makeEvent({ startDate: at(2026, 6, 15, 23, 0), endDate: at(2026, 6, 16, 1, 0) })]),
    ).toEqual([]);
  });

  it('keeps only events from the chosen calendars when calendarIds is given', () => {
    const events = [
      makeEvent({ id: 'a', calendarId: 'cal-school' }),
      makeEvent({ id: 'b', calendarId: 'cal-personal' }),
    ];
    const result = eventsToClasses(events, ['cal-school']);
    expect(result.map(c => c.id)).toEqual([`a:${at(2026, 6, 15, 9, 0)}`]);
  });

  it('keeps all calendars when calendarIds is undefined', () => {
    const events = [
      makeEvent({ id: 'a', calendarId: 'cal-school' }),
      makeEvent({ id: 'b', calendarId: 'cal-personal' }),
    ];
    expect(eventsToClasses(events).map(c => c.id)).toEqual([
      `a:${at(2026, 6, 15, 9, 0)}`,
      `b:${at(2026, 6, 15, 9, 0)}`,
    ]);
  });

  it('returns an empty array for no events', () => {
    expect(eventsToClasses([])).toEqual([]);
  });
});
