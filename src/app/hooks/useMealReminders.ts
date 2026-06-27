import { useState, useEffect, useCallback } from 'react';
import type { AcademicSchedule, MealConflict } from '../types/calendar';
import type { MealTimes } from '../App';

/** Parse "HH:MM" to minutes since midnight. */
function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Get minutes until a given "HH:MM" time today. Negative if already past. */
function minutesUntil(time: string): number {
  const now = new Date();
  const target = timeToMinutes(time);
  const current = now.getHours() * 60 + now.getMinutes();
  return target - current;
}

function addHour(time: string): string {
  const [h, m] = time.split(':').map(Number);
  return `${String(Math.min(h + 1, 23)).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getMealWindows(mealTimes?: MealTimes) {
  const bt = mealTimes?.breakfast || '08:00';
  const lt = mealTimes?.lunch || '12:00';
  const dt = mealTimes?.dinner || '18:00';
  return [
    { slot: 'breakfast', start: bt, end: addHour(bt) },
    { slot: 'lunch', start: lt, end: addHour(lt) },
    { slot: 'dinner', start: dt, end: addHour(dt) },
  ];
}

const REMINDER_MINUTES_BEFORE = 30;

export function useMealReminders(
  schedule: AcademicSchedule | null,
  conflicts: MealConflict[],
  mealTimes?: MealTimes
) {
  const mealWindows = getMealWindows(mealTimes);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(() => {
    try {
      const stored = sessionStorage.getItem('dismissedMealReminders');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const activeConflicts = conflicts.filter(
    (c) => !dismissedIds.has(`${c.mealSlot}-${c.className}`)
  );

  const dismissConflict = useCallback((conflict: MealConflict) => {
    const id = `${conflict.mealSlot}-${conflict.className}`;
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      sessionStorage.setItem('dismissedMealReminders', JSON.stringify([...next]));
      return next;
    });
  }, []);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }, []);

  // Schedule browser notifications for today's conflicts
  useEffect(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if (conflicts.length === 0) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (const conflict of conflicts) {
      // Find the meal window for this conflict
      const window = mealWindows.find((w) => w.slot === conflict.mealSlot);
      if (!window) continue;

      // Schedule notification 30 min before the meal window starts
      const minUntil = minutesUntil(window.start) - REMINDER_MINUTES_BEFORE;
      if (minUntil > 0) {
        const timeout = setTimeout(() => {
          new Notification(`Meal Reminder: ${conflict.mealSlot}`, {
            body: conflict.suggestion,
            icon: '/favicon.ico',
          });
        }, minUntil * 60 * 1000);
        timeouts.push(timeout);
      }
    }

    return () => timeouts.forEach(clearTimeout);
  }, [conflicts]);

  return {
    activeConflicts,
    dismissConflict,
    requestNotificationPermission,
    hasNotificationSupport: typeof window !== 'undefined' && 'Notification' in window,
    notificationPermission: typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'denied',
  };
}
