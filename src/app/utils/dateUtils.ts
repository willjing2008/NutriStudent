import { addDays as fnsAddDays, differenceInCalendarDays, startOfDay } from 'date-fns'

/**
 * Local-time date helpers.
 *
 * The app previously keyed meal plans and conflicts off
 * `new Date().toISOString().split('T')[0]`, which formats in UTC. For any
 * user not on UTC that can yield the wrong calendar day (e.g. a UK evening
 * during BST resolves to *yesterday*), which is why meal plans failed to line
 * up with "today". These helpers format and parse in LOCAL time instead.
 */

/** Format a Date as `YYYY-MM-DD` using its LOCAL calendar date (never UTC). */
export function toLocalISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Parse a `YYYY-MM-DD` string as LOCAL midnight (not UTC midnight). */
export function parseLocalDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Today at local midnight. */
export function getLocalToday(): Date {
  return startOfDay(new Date())
}

/** Today's local calendar date as `YYYY-MM-DD`. */
export function getLocalTodayISO(): string {
  return toLocalISODate(new Date())
}

/** Whole calendar days from `from` to `to` (`to - from`), local time. */
export function daysBetween(from: Date, to: Date): number {
  return differenceInCalendarDays(to, from)
}

/** Add `amount` days to a date (re-exported for a single date-arithmetic source). */
export function addDays(date: Date, amount: number): Date {
  return fnsAddDays(date, amount)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * The day index that should be selected when a plan opens: today's position
 * within the plan, clamped so it always lands on a real plan day. This
 * prevents the "Today's Meals empty" bug, where a plan carrying a stale past
 * shopping date pushed the index past the end of the plan.
 *
 * @param planStartISO the plan's start (shopping) date as YYYY-MM-DD, or null
 * @param todayISO     today's local date as YYYY-MM-DD
 * @param planLength   number of days the plan covers
 */
export function initialPlanOffset(
  planStartISO: string | null | undefined,
  todayISO: string,
  planLength: number,
): number {
  if (planLength <= 0) return 0
  if (!planStartISO) return 0
  const diff = daysBetween(parseLocalDate(planStartISO), parseLocalDate(todayISO))
  return clamp(diff, 0, planLength - 1)
}
