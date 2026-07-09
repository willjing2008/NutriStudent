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
      id: 'e1',
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
    expect(result.map(c => c.id)).toEqual(['a']);
  });

  it('keeps all calendars when calendarIds is undefined', () => {
    const events = [
      makeEvent({ id: 'a', calendarId: 'cal-school' }),
      makeEvent({ id: 'b', calendarId: 'cal-personal' }),
    ];
    expect(eventsToClasses(events).map(c => c.id)).toEqual(['a', 'b']);
  });

  it('returns an empty array for no events', () => {
    expect(eventsToClasses([])).toEqual([]);
  });
});
