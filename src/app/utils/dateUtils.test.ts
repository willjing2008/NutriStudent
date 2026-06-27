import { describe, it, expect } from 'vitest'
import {
  toLocalISODate,
  parseLocalDate,
  getLocalToday,
  getLocalTodayISO,
  daysBetween,
  addDays,
  initialPlanOffset,
} from './dateUtils'

describe('toLocalISODate', () => {
  it('formats using the local calendar date', () => {
    expect(toLocalISODate(new Date(2026, 5, 14))).toBe('2026-06-14') // month is 0-indexed
  })

  it('zero-pads month and day', () => {
    expect(toLocalISODate(new Date(2026, 0, 3))).toBe('2026-01-03')
  })

  it('keeps the local day for a late-evening time (the bug toISOString caused)', () => {
    // 23:30 local. toISOString() would roll this forward/back to another UTC
    // day for non-UTC users; toLocalISODate must stay on the local day.
    const lateEvening = new Date(2026, 5, 14, 23, 30, 0)
    expect(toLocalISODate(lateEvening)).toBe('2026-06-14')
  })
})

describe('parseLocalDate', () => {
  it('parses YYYY-MM-DD as local midnight, not UTC midnight', () => {
    const d = parseLocalDate('2026-06-14')
    expect(d.getFullYear()).toBe(2026)
    expect(d.getMonth()).toBe(5)
    expect(d.getDate()).toBe(14)
    expect(d.getHours()).toBe(0)
  })

  it('round-trips with toLocalISODate', () => {
    expect(toLocalISODate(parseLocalDate('2026-03-09'))).toBe('2026-03-09')
  })
})

describe('getLocalToday / getLocalTodayISO', () => {
  it('returns local midnight', () => {
    const t = getLocalToday()
    expect(t.getHours()).toBe(0)
    expect(t.getMinutes()).toBe(0)
    expect(t.getSeconds()).toBe(0)
  })

  it('ISO form matches the formatted local today', () => {
    expect(getLocalTodayISO()).toBe(toLocalISODate(new Date()))
  })
})

describe('daysBetween', () => {
  it('counts whole calendar days forward', () => {
    expect(daysBetween(parseLocalDate('2026-06-14'), parseLocalDate('2026-06-25'))).toBe(11)
  })

  it('is negative when the target is in the past', () => {
    expect(daysBetween(parseLocalDate('2026-06-14'), parseLocalDate('2026-03-10'))).toBeLessThan(0)
  })

  it('is zero for the same day regardless of time of day', () => {
    expect(daysBetween(new Date(2026, 5, 14, 1, 0), new Date(2026, 5, 14, 23, 0))).toBe(0)
  })
})

describe('addDays', () => {
  it('adds days and preserves local date semantics', () => {
    expect(toLocalISODate(addDays(parseLocalDate('2026-06-14'), 7))).toBe('2026-06-21')
  })

  it('handles month rollover', () => {
    expect(toLocalISODate(addDays(parseLocalDate('2026-06-28'), 5))).toBe('2026-07-03')
  })
})

describe('initialPlanOffset', () => {
  it('selects day 0 when the plan starts today', () => {
    expect(initialPlanOffset('2026-06-14', '2026-06-14', 7)).toBe(0)
  })

  it('selects the matching day when today is mid-plan', () => {
    expect(initialPlanOffset('2026-06-14', '2026-06-17', 7)).toBe(3)
  })

  it('clamps to the last plan day when today is past the plan end', () => {
    expect(initialPlanOffset('2026-06-14', '2026-06-30', 7)).toBe(6)
  })

  it('REGRESSION: a stale past shopping date clamps in-range instead of overrunning to empty', () => {
    // The observed bug: plan shoppingDate "10 Mar" with today "14 Jun" produced
    // an offset of ~96, which indexed past the 7-day plan and showed no meals.
    expect(initialPlanOffset('2026-03-10', '2026-06-14', 7)).toBe(6)
  })

  it('selects day 0 when there is no shopping date', () => {
    expect(initialPlanOffset(null, '2026-06-14', 7)).toBe(0)
  })

  it('selects day 0 when today is before the plan starts', () => {
    expect(initialPlanOffset('2026-06-20', '2026-06-14', 7)).toBe(0)
  })

  it('returns 0 for an empty plan', () => {
    expect(initialPlanOffset('2026-06-14', '2026-06-14', 0)).toBe(0)
  })
})
