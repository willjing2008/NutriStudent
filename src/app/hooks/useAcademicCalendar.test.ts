import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock the apiClient module (this is what transitively imports the supabase
// client, so mocking here keeps the test free of any real network/SDK calls).
const authedFetch = vi.fn();
vi.mock('../utils/apiClient', () => ({
  authedFetch: (...args: unknown[]) => authedFetch(...args),
}));

import { useAcademicCalendar } from './useAcademicCalendar';
import type { RecipeQueue, MealConflict } from '../types/calendar';
import type { MealTimes } from '../App';

// ── Helpers ───────────────────────────────────────────────────────────

interface FetchCall {
  endpoint: string;
  body: Record<string, unknown>;
}

/** Decode the (endpoint, init) pair from a recorded authedFetch call. */
function decodeCall(call: unknown[]): FetchCall {
  const endpoint = call[0] as string;
  const init = call[1] as { body?: string } | undefined;
  const body = init?.body ? (JSON.parse(init.body) as Record<string, unknown>) : {};
  return { endpoint, body };
}

/** All recorded calls, decoded. */
function decodedCalls(): FetchCall[] {
  return authedFetch.mock.calls.map(decodeCall);
}

/** Build a fake ok/!ok Response whose .json() resolves to `payload`. */
function fakeResponse(payload: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => payload,
  } as unknown as Response;
}

/**
 * Default fetch behavior: route each endpoint to an empty-but-valid payload so
 * the hook's many Promise.all fan-outs resolve. Individual tests override.
 */
function routeDefault(endpoint: string): unknown {
  switch (endpoint) {
    case 'get-academic-schedule':
      return { schedule: null };
    case 'check-testing-period':
      return { inTestingPeriod: false };
    case 'get-meal-conflicts':
      return { conflicts: [] };
    case 'get-recipe-queue':
      return { queue: null, needsRefresh: false };
    case 'get-queue-week':
      return { mealPlan: { weekNumber: 1, meals: [] } };
    case 'get-queue-shopping-list':
      return { ingredients: [] };
    default:
      return {};
  }
}

const MEAL_TIMES: MealTimes = { breakfast: '08:00', lunch: '12:00', dinner: '18:00' };

function makeQueue(overrides: Partial<RecipeQueue> = {}): RecipeQueue {
  return {
    userId: 'u1',
    queueId: 'q1',
    createdAt: '2026-01-01T00:00:00.000Z',
    focusMode: false,
    mealsPerDay: 3,
    goal: 'study',
    meals: [
      {
        recipeId: 'r1',
        recipe: {},
        dayNumber: 1,
        mealSlot: 'breakfast',
        mealNumber: 1,
        isConsumed: false,
      },
      {
        recipeId: 'r2',
        recipe: {},
        dayNumber: 1,
        mealSlot: 'lunch',
        mealNumber: 2,
        isConsumed: false,
      },
    ],
    ...overrides,
  };
}

const conflict = (mealSlot: string): MealConflict => ({
  mealSlot,
  className: 'Maths',
  classStart: '09:00',
  classEnd: '10:00',
  suggestion: 'Eat earlier',
});

beforeEach(() => {
  authedFetch.mockReset();
  // By default every endpoint resolves with a valid, empty payload.
  authedFetch.mockImplementation((endpoint: string) =>
    Promise.resolve(fakeResponse(routeDefault(endpoint))),
  );
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// ── loadMealConflicts: today's local ISO date in the payload ────────────

describe('useAcademicCalendar — loadMealConflicts date logic', () => {
  it('sends today as a LOCAL ISO date (not UTC) in the conflicts request', async () => {
    // A late local evening that is still "tomorrow" in UTC would, under the old
    // UTC formatting, resolve to the wrong calendar day. Pin a fixed clock.
    vi.useFakeTimers();
    // 2026-03-15 23:30 local time.
    vi.setSystemTime(new Date(2026, 2, 15, 23, 30, 0));

    const { result } = renderHook(() => useAcademicCalendar());

    let returned: MealConflict[] | undefined;
    await act(async () => {
      returned = await result.current.loadMealConflicts('user-1', MEAL_TIMES);
    });

    const call = decodedCalls().find(c => c.endpoint === 'get-meal-conflicts');
    expect(call).toBeDefined();
    expect(call?.body.date).toBe('2026-03-15');
    expect(call?.body.userId).toBe('user-1');
    expect(call?.body.mealTimes).toEqual(MEAL_TIMES);
    expect(returned).toEqual([]);
  });

  it('stores returned conflicts in state and returns them', async () => {
    const conflicts = [conflict('breakfast')];
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-meal-conflicts') {
        return Promise.resolve(fakeResponse({ conflicts }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let returned: MealConflict[] | undefined;
    await act(async () => {
      returned = await result.current.loadMealConflicts('user-1');
    });

    expect(returned).toEqual(conflicts);
    expect(result.current.mealConflicts).toEqual(conflicts);
  });

  it('returns [] and does not throw when the request fails', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-meal-conflicts') {
        return Promise.reject(new Error('network down'));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let returned: MealConflict[] | undefined;
    await act(async () => {
      returned = await result.current.loadMealConflicts('user-1');
    });

    expect(returned).toEqual([]);
    expect(result.current.mealConflicts).toEqual([]);
  });
});

// ── loadWeekConflicts: the 7-day week-window math (Sun..Sat) ─────────────

describe('useAcademicCalendar — loadWeekConflicts week-window math', () => {
  it('requests the 7 calendar days of the CURRENT week aligned to Sun..Sat', async () => {
    vi.useFakeTimers();
    // 2026-03-18 is a Wednesday (getDay() === 3).
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0));

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.loadWeekConflicts('user-1', MEAL_TIMES);
    });

    const dates = decodedCalls()
      .filter(c => c.endpoint === 'get-meal-conflicts')
      .map(c => c.body.date as string);

    // Wed 2026-03-18 -> week runs Sun 03-15 through Sat 03-21.
    expect(dates).toEqual([
      '2026-03-15', // Sun (i=0)
      '2026-03-16', // Mon
      '2026-03-17', // Tue
      '2026-03-18', // Wed (today)
      '2026-03-19', // Thu
      '2026-03-20', // Fri
      '2026-03-21', // Sat
    ]);
  });

  it('handles today being Sunday (dow=0): week starts today', async () => {
    vi.useFakeTimers();
    // 2026-03-15 is a Sunday.
    vi.setSystemTime(new Date(2026, 2, 15, 9, 0, 0));

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.loadWeekConflicts('user-1');
    });

    const dates = decodedCalls()
      .filter(c => c.endpoint === 'get-meal-conflicts')
      .map(c => c.body.date as string);

    expect(dates[0]).toBe('2026-03-15');
    expect(dates[6]).toBe('2026-03-21');
  });

  it('spans a month boundary correctly', async () => {
    vi.useFakeTimers();
    // 2026-03-31 is a Tuesday (getDay() === 2). Week: Sun 03-29 .. Sat 04-04.
    vi.setSystemTime(new Date(2026, 2, 31, 12, 0, 0));

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.loadWeekConflicts('user-1');
    });

    const dates = decodedCalls()
      .filter(c => c.endpoint === 'get-meal-conflicts')
      .map(c => c.body.date as string);

    expect(dates).toEqual([
      '2026-03-29',
      '2026-03-30',
      '2026-03-31',
      '2026-04-01',
      '2026-04-02',
      '2026-04-03',
      '2026-04-04',
    ]);
  });

  it('keys the result Map by day index and OMITS days with no conflicts', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0)); // Wed

    // Only Mon (03-16) and Thu (03-19) have conflicts.
    authedFetch.mockImplementation((endpoint: string, init?: { body?: string }) => {
      if (endpoint === 'get-meal-conflicts') {
        const date = JSON.parse(init?.body ?? '{}').date as string;
        if (date === '2026-03-16') {
          return Promise.resolve(fakeResponse({ conflicts: [conflict('lunch')] }));
        }
        if (date === '2026-03-19') {
          return Promise.resolve(
            fakeResponse({ conflicts: [conflict('breakfast'), conflict('dinner')] }),
          );
        }
        return Promise.resolve(fakeResponse({ conflicts: [] }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let wc: Map<number, MealConflict[]> | undefined;
    await act(async () => {
      wc = await result.current.loadWeekConflicts('user-1');
    });

    expect(wc).toBeInstanceOf(Map);
    expect(wc?.size).toBe(2);
    // Mon is day index 1, Thu is day index 4 (Sun=0 .. Sat=6).
    expect(wc?.get(1)).toHaveLength(1);
    expect(wc?.get(4)).toHaveLength(2);
    expect(wc?.has(0)).toBe(false);
    expect(wc?.has(3)).toBe(false);
  });

  it('returns an empty Map when any day request rejects', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0));

    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-meal-conflicts') {
        return Promise.reject(new Error('boom'));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let wc: Map<number, MealConflict[]> | undefined;
    await act(async () => {
      wc = await result.current.loadWeekConflicts('user-1');
    });

    expect(wc).toBeInstanceOf(Map);
    expect(wc?.size).toBe(0);
  });
});

// ── saveSchedule -> refreshAllConflicts: writes weekConflicts to state ──
// refreshAllConflicts is an internal helper; it is exercised here through the
// public saveSchedule action (which awaits it after a successful save).

describe('useAcademicCalendar — saveSchedule refreshes conflicts', () => {
  it('updates both mealConflicts and weekConflicts state after a save', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0)); // Wed

    const savedSchedule = {
      classes: [],
      testingPeriods: [],
      sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
      updatedAt: '2026-03-18T00:00:00.000Z',
    };

    authedFetch.mockImplementation((endpoint: string, init?: { body?: string }) => {
      if (endpoint === 'save-academic-schedule') {
        return Promise.resolve(fakeResponse({ schedule: savedSchedule }));
      }
      if (endpoint === 'get-meal-conflicts') {
        const date = JSON.parse(init?.body ?? '{}').date as string;
        // Today (Wed 03-18) is what loadMealConflicts asks for.
        if (date === '2026-03-18') {
          return Promise.resolve(fakeResponse({ conflicts: [conflict('lunch')] }));
        }
        return Promise.resolve(fakeResponse({ conflicts: [] }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.saveSchedule(
        'user-1',
        {
          classes: [],
          testingPeriods: [],
          sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
        },
        MEAL_TIMES,
      );
    });

    expect(result.current.schedule).toEqual(savedSchedule);
    expect(result.current.error).toBeNull();
    expect(result.current.mealConflicts).toHaveLength(1);
    // Wed is day index 3.
    expect(result.current.weekConflicts.get(3)).toHaveLength(1);
  });
});

// ── checkTestingPeriod: boolean branch + error fallback ─────────────────

describe('useAcademicCalendar — checkTestingPeriod', () => {
  it('reflects the API true/false and stores it in isTestingPeriod', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'check-testing-period') {
        return Promise.resolve(fakeResponse({ inTestingPeriod: true }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let inPeriod: boolean | undefined;
    await act(async () => {
      inPeriod = await result.current.checkTestingPeriod('user-1');
    });

    expect(inPeriod).toBe(true);
    expect(result.current.isTestingPeriod).toBe(true);
  });

  it('returns false on error without touching isTestingPeriod', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'check-testing-period') {
        return Promise.reject(new Error('fail'));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let inPeriod: boolean | undefined;
    await act(async () => {
      inPeriod = await result.current.checkTestingPeriod('user-1');
    });

    expect(inPeriod).toBe(false);
    expect(result.current.isTestingPeriod).toBe(false);
  });
});

// ── apiPost error surfacing: non-ok response throws data.error ──────────

describe('useAcademicCalendar — apiPost error handling', () => {
  it('saveSchedule stores the server error message from a non-ok response', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'save-academic-schedule') {
        return Promise.resolve(
          fakeResponse({ error: 'schedule invalid' }, false, 400),
        );
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let saved: unknown;
    await act(async () => {
      saved = await result.current.saveSchedule('user-1', {
        classes: [],
        testingPeriods: [],
        sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
      });
    });

    expect(saved).toBeNull();
    expect(result.current.error).toBe('schedule invalid');
    expect(result.current.isLoading).toBe(false);
  });
});

// ── null rejection handling: unknown-safe error fallback ────────────────

describe('useAcademicCalendar — unknown error handling', () => {
  it('saveSchedule stores a fallback error when the request rejects null', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'save-academic-schedule') {
        return Promise.reject(null);
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let saved: unknown;
    await act(async () => {
      saved = await result.current.saveSchedule('user-1', {
        classes: [],
        testingPeriods: [],
        sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
      });
    });

    expect(saved).toBeNull();
    expect(result.current.error).toBe('Failed to save academic schedule');
  });

  it('generateQueue stores a fallback error when queue generation rejects null', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'generate-recipe-queue') {
        return Promise.reject(null);
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let queue: RecipeQueue | null | undefined;
    await act(async () => {
      queue = await result.current.generateQueue('user-1', {
        mealsPerDay: 3,
        goal: 'study',
      });
    });

    expect(queue).toBeNull();
    expect(result.current.error).toBe('Failed to generate recipe queue');
  });

  it('generateQueue preserves an Error-like object message', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'generate-recipe-queue') {
        return Promise.reject({ message: 'Queue API unavailable' });
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.generateQueue('user-1', {
        mealsPerDay: 3,
        goal: 'study',
      });
    });

    expect(result.current.error).toBe('Queue API unavailable');
  });

  it('loadQueueWeek stores a fallback error when the week request rejects null', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-queue-week') {
        return Promise.reject(null);
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let week: unknown;
    await act(async () => {
      week = await result.current.loadQueueWeek('user-1', 2);
    });

    expect(week).toBeNull();
    expect(result.current.error).toBe('Failed to load queue week');
  });

  it('swapQueueMeal stores a fallback error when the swap request rejects null', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'queue-swap-meal') {
        return Promise.reject(null);
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let mealPlan: unknown;
    await act(async () => {
      mealPlan = await result.current.swapQueueMeal('user-1', 1, 'breakfast', 'r-new');
    });

    expect(mealPlan).toBeNull();
    expect(result.current.error).toBe('Failed to swap queue meal');
  });
});

// ── markMealConsumed: immutable local queue update ──────────────────────

describe('useAcademicCalendar — markMealConsumed local state update', () => {
  it('flips only the matching meal to isConsumed without mutating the original', async () => {
    const queue = makeQueue();
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-recipe-queue') {
        return Promise.resolve(fakeResponse({ queue, needsRefresh: false }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    // Seed the queue into state via loadQueue.
    await act(async () => {
      await result.current.loadQueue('user-1');
    });

    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.markMealConsumed('user-1', 1, 'breakfast');
    });

    expect(ok).toBe(true);
    const meals = result.current.recipeQueue?.meals ?? [];
    const breakfast = meals.find(m => m.mealSlot === 'breakfast');
    const lunch = meals.find(m => m.mealSlot === 'lunch');
    expect(breakfast?.isConsumed).toBe(true);
    expect(lunch?.isConsumed).toBe(false);
    // Original source object must not have been mutated (immutability rule).
    expect(queue.meals[0].isConsumed).toBe(false);
  });

  it('returns false when the consume request rejects', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'mark-queue-meal-consumed') {
        return Promise.reject(new Error('nope'));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.markMealConsumed('user-1', 1, 'breakfast');
    });

    expect(ok).toBe(false);
  });
});

// ── swapQueueMeal: weekNumber = ceil(dayNumber / 7) for shopping list ────

describe('useAcademicCalendar — swapQueueMeal week derivation', () => {
  it('derives weekNumber via Math.ceil(dayNumber / 7) for the shopping-list refresh', async () => {
    const queue = makeQueue();
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'queue-swap-meal') {
        return Promise.resolve(
          fakeResponse({ mealPlan: { weekNumber: 2, meals: [] }, queue }),
        );
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    // dayNumber 10 -> ceil(10/7) === 2.
    await act(async () => {
      await result.current.swapQueueMeal('user-1', 10, 'dinner', 'r-new');
    });

    const shopCall = decodedCalls().find(c => c.endpoint === 'get-queue-shopping-list');
    expect(shopCall?.body.weekNumber).toBe(2);
  });

  it('uses week 1 for day 7 (boundary) and week 2 for day 8', async () => {
    const queue = makeQueue();
    authedFetch.mockImplementation((endpoint: string) =>
      endpoint === 'queue-swap-meal'
        ? Promise.resolve(fakeResponse({ mealPlan: { weekNumber: 1, meals: [] }, queue }))
        : Promise.resolve(fakeResponse(routeDefault(endpoint))),
    );

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.swapQueueMeal('user-1', 7, 'lunch', 'r-a');
    });
    const week1Call = decodedCalls()
      .filter(c => c.endpoint === 'get-queue-shopping-list')
      .pop();
    expect(week1Call?.body.weekNumber).toBe(1);

    authedFetch.mockClear();

    await act(async () => {
      await result.current.swapQueueMeal('user-1', 8, 'lunch', 'r-b');
    });
    const week2Call = decodedCalls()
      .filter(c => c.endpoint === 'get-queue-shopping-list')
      .pop();
    expect(week2Call?.body.weekNumber).toBe(2);
  });
});

// ── saveMealTimeOverride / removeMealTimeOverride: pure override merging ──

describe('useAcademicCalendar — meal time override merging', () => {
  it('no-ops when there is no loaded schedule', async () => {
    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.saveMealTimeOverride('user-1', {
        dayOfWeek: 1,
        mealSlot: 'lunch',
        time: '13:00',
      });
    });

    // Nothing should have been persisted.
    expect(decodedCalls().some(c => c.endpoint === 'save-academic-schedule')).toBe(false);
    expect(result.current.schedule).toBeNull();
  });

  it('replaces an existing override for the same day/slot rather than duplicating it', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0));

    const schedule = {
      classes: [],
      testingPeriods: [],
      sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
      mealTimeOverrides: [
        { dayOfWeek: 1, mealSlot: 'lunch', time: '12:30' },
        { dayOfWeek: 2, mealSlot: 'dinner', time: '19:00' },
      ],
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-academic-schedule') {
        return Promise.resolve(fakeResponse({ schedule }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.loadSchedule('user-1');
    });

    authedFetch.mockClear();

    await act(async () => {
      await result.current.saveMealTimeOverride('user-1', {
        dayOfWeek: 1,
        mealSlot: 'lunch',
        time: '13:15',
      });
    });

    const saveCall = decodedCalls().find(c => c.endpoint === 'save-academic-schedule');
    expect(saveCall).toBeDefined();
    const overrides = saveCall?.body.mealTimeOverrides as Array<{
      dayOfWeek: number;
      mealSlot: string;
      time: string;
    }>;
    // The Mon/lunch entry is replaced (not duplicated); Tue/dinner is kept.
    const monLunch = overrides.filter(o => o.dayOfWeek === 1 && o.mealSlot === 'lunch');
    expect(monLunch).toHaveLength(1);
    expect(monLunch[0].time).toBe('13:15');
    expect(overrides).toHaveLength(2);
    expect(overrides.some(o => o.dayOfWeek === 2 && o.mealSlot === 'dinner')).toBe(true);

    // State reflects the new override and gets a fresh updatedAt.
    expect(result.current.schedule?.mealTimeOverrides).toHaveLength(2);
  });

  it('removeMealTimeOverride drops only the matching day/slot entry', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0));

    const schedule = {
      classes: [],
      testingPeriods: [],
      sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
      mealTimeOverrides: [
        { dayOfWeek: 1, mealSlot: 'lunch', time: '12:30' },
        { dayOfWeek: 2, mealSlot: 'dinner', time: '19:00' },
      ],
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-academic-schedule') {
        return Promise.resolve(fakeResponse({ schedule }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.loadSchedule('user-1');
    });
    authedFetch.mockClear();

    await act(async () => {
      await result.current.removeMealTimeOverride('user-1', 1, 'lunch');
    });

    const saveCall = decodedCalls().find(c => c.endpoint === 'save-academic-schedule');
    const overrides = saveCall?.body.mealTimeOverrides as Array<{
      dayOfWeek: number;
      mealSlot: string;
    }>;
    expect(overrides).toHaveLength(1);
    expect(overrides[0]).toMatchObject({ dayOfWeek: 2, mealSlot: 'dinner' });
    expect(result.current.schedule?.mealTimeOverrides).toHaveLength(1);
  });

  it('removeMealTimeOverride no-ops when there is no schedule', async () => {
    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.removeMealTimeOverride('user-1', 1, 'lunch');
    });

    expect(decodedCalls().some(c => c.endpoint === 'save-academic-schedule')).toBe(false);
  });
});

// ── checkQueueTestingChange: passthrough + error shape ──────────────────

describe('useAcademicCalendar — checkQueueTestingChange', () => {
  it('returns the server decision payload', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'check-queue-testing-change') {
        return Promise.resolve(
          fakeResponse({ shouldRegenerate: true, reason: 'testing-period-added' }),
        );
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let res: { shouldRegenerate: boolean; reason: string } | undefined;
    await act(async () => {
      res = await result.current.checkQueueTestingChange('user-1');
    });

    expect(res).toEqual({ shouldRegenerate: true, reason: 'testing-period-added' });
  });

  it('returns a safe default on error', async () => {
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'check-queue-testing-change') {
        return Promise.reject(new Error('x'));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    let res: { shouldRegenerate: boolean; reason: string } | undefined;
    await act(async () => {
      res = await result.current.checkQueueTestingChange('user-1');
    });

    expect(res).toEqual({ shouldRegenerate: false, reason: 'error' });
  });
});

// ── initCalendar: orchestration + loading flag ──────────────────────────

describe('useAcademicCalendar — initCalendar orchestration', () => {
  it('loads schedule/testing/conflicts/queue and settles isLoading to false', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0));

    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'check-testing-period') {
        return Promise.resolve(fakeResponse({ inTestingPeriod: true }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.initCalendar('user-1', MEAL_TIMES);
    });

    // The awaited act() above lets initCalendar's finally{} flip isLoading off.
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isTestingPeriod).toBe(true);

    const endpoints = decodedCalls().map(c => c.endpoint);
    expect(endpoints).toContain('get-academic-schedule');
    expect(endpoints).toContain('check-testing-period');
    expect(endpoints).toContain('get-meal-conflicts');
    expect(endpoints).toContain('get-recipe-queue');
    // No queue present, so the week-1 load is skipped.
    expect(endpoints).not.toContain('get-queue-week');
  });

  it('loads queue week 1 only when a queue exists', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 18, 10, 0, 0));

    const queue = makeQueue();
    authedFetch.mockImplementation((endpoint: string) => {
      if (endpoint === 'get-recipe-queue') {
        return Promise.resolve(fakeResponse({ queue, needsRefresh: false }));
      }
      return Promise.resolve(fakeResponse(routeDefault(endpoint)));
    });

    const { result } = renderHook(() => useAcademicCalendar());

    await act(async () => {
      await result.current.initCalendar('user-1');
    });

    const weekCall = decodedCalls().find(c => c.endpoint === 'get-queue-week');
    expect(weekCall).toBeDefined();
    expect(weekCall?.body.weekNumber).toBe(1);
  });
});
