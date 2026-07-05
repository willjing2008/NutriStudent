import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the native plugin + Capacitor core. The wrapper must never throw and must
// translate a denied/failed permission into `false` (the permission-denied path).
const requestFullCalendarAccess = vi.fn();
const listCalendarsFn = vi.fn();
const listEventsInRange = vi.fn();

vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: () => true },
}));

vi.mock('@ebarooni/capacitor-calendar', () => ({
  CapacitorCalendar: {
    requestFullCalendarAccess: () => requestFullCalendarAccess(),
    listCalendars: () => listCalendarsFn(),
    listEventsInRange: (opts: { from: number; to: number }) => listEventsInRange(opts),
  },
}));

import { requestAccess, listCalendars, readWeekEvents, currentWeekStart } from './systemCalendar';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('requestAccess', () => {
  it('returns true when access is granted', async () => {
    requestFullCalendarAccess.mockResolvedValue({ result: 'granted' });
    expect(await requestAccess()).toBe(true);
  });

  it('returns false when access is denied', async () => {
    requestFullCalendarAccess.mockResolvedValue({ result: 'denied' });
    expect(await requestAccess()).toBe(false);
  });

  it('returns false (does not throw) when the plugin rejects', async () => {
    requestFullCalendarAccess.mockRejectedValue(new Error('no plugin'));
    await expect(requestAccess()).resolves.toBe(false);
  });
});

describe('listCalendars', () => {
  it('unwraps the plugin result', async () => {
    listCalendarsFn.mockResolvedValue({ result: [{ id: 'c1', title: 'School' }] });
    expect(await listCalendars()).toEqual([{ id: 'c1', title: 'School' }]);
  });

  it('returns [] when the plugin rejects', async () => {
    listCalendarsFn.mockRejectedValue(new Error('boom'));
    expect(await listCalendars()).toEqual([]);
  });
});

describe('readWeekEvents', () => {
  it('queries the 7-day window from weekStart and returns events', async () => {
    listEventsInRange.mockResolvedValue({ result: [{ id: 'e1' }] });
    const weekStart = new Date(2026, 5, 14); // Sun 2026-06-14 local
    const events = await readWeekEvents(weekStart);

    expect(events).toEqual([{ id: 'e1' }]);
    const { from, to } = listEventsInRange.mock.calls[0][0];
    expect(from).toBe(weekStart.getTime());
    expect(to - from).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('returns [] when the plugin rejects', async () => {
    listEventsInRange.mockRejectedValue(new Error('boom'));
    expect(await readWeekEvents(new Date())).toEqual([]);
  });
});

describe('currentWeekStart', () => {
  it('returns the local-midnight Sunday of the given week', () => {
    const ws = currentWeekStart(new Date(2026, 5, 17, 15, 30)); // Wed 2026-06-17
    expect(ws.getFullYear()).toBe(2026);
    expect(ws.getMonth()).toBe(5);
    expect(ws.getDate()).toBe(14); // Sunday
    expect(ws.getHours()).toBe(0);
    expect(ws.getMinutes()).toBe(0);
  });

  it('is idempotent when already on a Sunday', () => {
    const ws = currentWeekStart(new Date(2026, 5, 14, 9, 0));
    expect(ws.getDate()).toBe(14);
  });
});
