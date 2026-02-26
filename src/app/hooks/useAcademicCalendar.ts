import { useState, useCallback } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import type {
  AcademicSchedule,
  RecipeQueue,
  MealConflict,
  QueueWeekMealPlan,
  ShoppingIngredient,
} from '../types/calendar';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;

const apiHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

async function apiPost<T>(endpoint: string, body: object): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: apiHeaders,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `API error: ${res.status}`);
  return data;
}

export interface AcademicCalendarState {
  schedule: AcademicSchedule | null;
  recipeQueue: RecipeQueue | null;
  currentQueueWeek: number;
  currentWeekMealPlan: QueueWeekMealPlan | null;
  isTestingPeriod: boolean;
  mealConflicts: MealConflict[];
  queueShoppingList: ShoppingIngredient[];
  isLoading: boolean;
  error: string | null;
}

export function useAcademicCalendar() {
  const [schedule, setSchedule] = useState<AcademicSchedule | null>(null);
  const [recipeQueue, setRecipeQueue] = useState<RecipeQueue | null>(null);
  const [currentQueueWeek, setCurrentQueueWeek] = useState(1);
  const [currentWeekMealPlan, setCurrentWeekMealPlan] = useState<QueueWeekMealPlan | null>(null);
  const [isTestingPeriod, setIsTestingPeriod] = useState(false);
  const [mealConflicts, setMealConflicts] = useState<MealConflict[]>([]);
  const [queueShoppingList, setQueueShoppingList] = useState<ShoppingIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load academic schedule
  const loadSchedule = useCallback(async (userId: string) => {
    try {
      const data = await apiPost<{ schedule: AcademicSchedule | null }>('get-academic-schedule', { userId });
      setSchedule(data.schedule);
      return data.schedule;
    } catch (err: any) {
      console.error('Failed to load academic schedule:', err);
      return null;
    }
  }, []);

  // Save academic schedule
  const saveSchedule = useCallback(async (userId: string, newSchedule: Omit<AcademicSchedule, 'updatedAt'>) => {
    try {
      setIsLoading(true);
      const data = await apiPost<{ schedule: AcademicSchedule }>('save-academic-schedule', {
        userId,
        ...newSchedule,
      });
      setSchedule(data.schedule);
      setError(null);
      return data.schedule;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check testing period for today
  const checkTestingPeriod = useCallback(async (userId: string) => {
    try {
      const data = await apiPost<{ inTestingPeriod: boolean }>('check-testing-period', { userId });
      setIsTestingPeriod(data.inTestingPeriod);
      return data.inTestingPeriod;
    } catch {
      return false;
    }
  }, []);

  // Load meal conflicts for today
  const loadMealConflicts = useCallback(async (userId: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const data = await apiPost<{ conflicts: MealConflict[] }>('get-meal-conflicts', { userId, date: today });
      setMealConflicts(data.conflicts);
      return data.conflicts;
    } catch {
      return [];
    }
  }, []);

  // Load recipe queue
  const loadQueue = useCallback(async (userId: string) => {
    try {
      const data = await apiPost<{ queue: RecipeQueue | null; needsRefresh: boolean }>('get-recipe-queue', { userId });
      setRecipeQueue(data.queue);
      return data;
    } catch (err: any) {
      console.error('Failed to load queue:', err);
      return { queue: null, needsRefresh: true };
    }
  }, []);

  // Generate recipe queue
  const generateQueue = useCallback(async (
    userId: string,
    params: { mealsPerDay: number; goal: string; avoidIngredients?: string[]; maxCookingTime?: number; budget?: number }
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiPost<{ queue: RecipeQueue }>('generate-recipe-queue', { userId, ...params });
      setRecipeQueue(data.queue);
      setCurrentQueueWeek(1);
      // Also load first week
      const weekData = await apiPost<{ mealPlan: QueueWeekMealPlan }>('get-queue-week', {
        userId,
        weekNumber: 1,
        budget: params.budget,
      });
      setCurrentWeekMealPlan(weekData.mealPlan);
      // Load shopping list for week 1
      const shopData = await apiPost<{ ingredients: ShoppingIngredient[] }>('get-queue-shopping-list', {
        userId,
        weekNumber: 1,
      });
      setQueueShoppingList(shopData.ingredients);
      return data.queue;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load a specific queue week
  const loadQueueWeek = useCallback(async (userId: string, weekNumber: number, budget?: number) => {
    try {
      setIsLoading(true);
      setCurrentQueueWeek(weekNumber);
      const [weekData, shopData] = await Promise.all([
        apiPost<{ mealPlan: QueueWeekMealPlan }>('get-queue-week', { userId, weekNumber, budget }),
        apiPost<{ ingredients: ShoppingIngredient[] }>('get-queue-shopping-list', { userId, weekNumber }),
      ]);
      setCurrentWeekMealPlan(weekData.mealPlan);
      setQueueShoppingList(shopData.ingredients);
      return weekData.mealPlan;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Swap a meal in the queue
  const swapQueueMeal = useCallback(async (
    userId: string,
    dayNumber: number,
    mealSlot: string,
    newRecipeId: string
  ) => {
    try {
      setIsLoading(true);
      const data = await apiPost<{ mealPlan: QueueWeekMealPlan; queue: RecipeQueue }>('queue-swap-meal', {
        userId,
        dayNumber,
        mealSlot,
        newRecipeId,
      });
      setRecipeQueue(data.queue);
      setCurrentWeekMealPlan(data.mealPlan);
      // Refresh shopping list
      const weekNumber = Math.ceil(dayNumber / 7);
      const shopData = await apiPost<{ ingredients: ShoppingIngredient[] }>('get-queue-shopping-list', {
        userId,
        weekNumber,
      });
      setQueueShoppingList(shopData.ingredients);
      return data.mealPlan;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mark a meal as consumed
  const markMealConsumed = useCallback(async (userId: string, dayNumber: number, mealSlot: string) => {
    try {
      await apiPost('mark-queue-meal-consumed', { userId, dayNumber, mealSlot });
      // Update local queue state
      if (recipeQueue) {
        const updated = { ...recipeQueue, meals: recipeQueue.meals.map(m =>
          m.dayNumber === dayNumber && m.mealSlot === mealSlot
            ? { ...m, isConsumed: true }
            : m
        )};
        setRecipeQueue(updated);
      }
      return true;
    } catch {
      return false;
    }
  }, [recipeQueue]);

  // Check if queue needs regeneration due to testing period change
  const checkQueueTestingChange = useCallback(async (userId: string) => {
    try {
      const data = await apiPost<{ shouldRegenerate: boolean; reason: string }>('check-queue-testing-change', { userId });
      return data;
    } catch {
      return { shouldRegenerate: false, reason: 'error' };
    }
  }, []);

  // Load all calendar data on init
  const initCalendar = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const [sched, testPeriod, conflicts, queueData] = await Promise.all([
        loadSchedule(userId),
        checkTestingPeriod(userId),
        loadMealConflicts(userId),
        loadQueue(userId),
      ]);

      // Load first week if queue exists
      if (queueData.queue) {
        await loadQueueWeek(userId, 1);
      }
    } catch (err: any) {
      console.error('Failed to init calendar:', err);
    } finally {
      setIsLoading(false);
    }
  }, [loadSchedule, checkTestingPeriod, loadMealConflicts, loadQueue, loadQueueWeek]);

  return {
    // State
    schedule,
    recipeQueue,
    currentQueueWeek,
    currentWeekMealPlan,
    isTestingPeriod,
    mealConflicts,
    queueShoppingList,
    isLoading,
    error,
    // Actions
    loadSchedule,
    saveSchedule,
    checkTestingPeriod,
    loadMealConflicts,
    loadQueue,
    generateQueue,
    loadQueueWeek,
    swapQueueMeal,
    markMealConsumed,
    checkQueueTestingChange,
    initCalendar,
    setCurrentQueueWeek,
  };
}
