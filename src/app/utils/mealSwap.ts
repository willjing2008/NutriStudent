// Shared meal-swap slot logic.
//
// The plan view (RecommendationsStep, queue mode) swaps a recipe out of a
// specific plan slot via `swapQueueMeal`, keyed by an absolute (queue) day +
// meal slot. The day/slot math lives here so any future swap surface reuses it
// instead of re-deriving it inline.

/** Minimal shape a plan meal needs for swap-slot resolution. */
export interface SwapSlotMeal {
  id: string;
  /** Week-relative day (1-7) as rendered by the plan view. */
  dayNumber?: number;
  category?: string;
  /**
   * Absolute queue day stamped by get-queue-week. When present it is the
   * source of truth; the (weekNumber-1)*7 reconstruction is only a fallback
   * for meals that predate the stamped field.
   */
  queueDayNumber?: number;
  /**
   * Queue slot stamped by get-queue-week. Preferred over `category`, which
   * can drift from the slot (e.g. a dinner-categorised recipe swapped into a
   * breakfast slot).
   */
  mealSlot?: string;
}

export interface ResolvedSwapSlot {
  /** The plan meal occupying the slot. */
  target: SwapSlotMeal;
  /** Absolute queue day (1-28). */
  absoluteDay: number;
  /** Meal slot/category being targeted. */
  slot: string;
}

/**
 * Resolve the queue slot a rendered plan meal occupies. The meal object itself
 * is the key (its day + slot) — deliberately NOT a recipe-id lookup, which
 * would always hit the first occurrence of a recipe appearing on several days
 * and mutate a slot the user never saw. Returns null when there is no meal or
 * no slot to target. A missing `dayNumber` defaults to day 1, matching the
 * original in-plan swap behaviour.
 */
export function resolveSwapSlot(
  meal: SwapSlotMeal | null | undefined,
  weekNumber: number,
): ResolvedSwapSlot | null {
  if (!meal) return null;
  const slot = meal.mealSlot || meal.category;
  if (!slot) return null;
  const absoluteDay =
    meal.queueDayNumber ?? (weekNumber - 1) * 7 + (meal.dayNumber || 1);
  return { target: meal, absoluteDay, slot };
}

/**
 * Apply a queue-mode meal swap: resolve the slot the given plan meal occupies
 * and persist the swap through `swapQueueMeal`, so every swap surface computes
 * the slot identically. Returns the `swapQueueMeal` result, or null when
 * there is no resolvable slot.
 */
export async function applyQueueMealSwap(params: {
  meal: SwapSlotMeal | null | undefined;
  weekNumber: number;
  userId: string;
  newRecipeId: string;
  swapQueueMeal: (
    userId: string,
    dayNumber: number,
    mealSlot: string,
    newRecipeId: string,
  ) => Promise<any>;
}): Promise<any | null> {
  const resolved = resolveSwapSlot(params.meal, params.weekNumber);
  if (!resolved) return null;
  return params.swapQueueMeal(
    params.userId,
    resolved.absoluteDay,
    resolved.slot,
    params.newRecipeId,
  );
}
