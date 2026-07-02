// Shared meal-swap slot logic.
//
// Both the plan view (RecommendationsStep, queue mode) and the My-Recipe
// dashboard swap a recipe out of a specific plan slot via `swapQueueMeal`,
// keyed by an absolute (queue) day + meal slot. The day/slot math lives here so
// the two call sites cannot drift.

/** Minimal shape a plan meal needs for swap-slot resolution. */
export interface SwapSlotMeal {
  id: string;
  dayNumber?: number;
  category?: string;
}

export interface ResolvedSwapSlot {
  /** The plan meal currently occupying the slot. */
  target: SwapSlotMeal;
  /** Absolute queue day: (weekNumber - 1) * 7 + dayNumber. */
  absoluteDay: number;
  /** Meal slot/category being swapped. */
  slot: string;
}

/**
 * Resolve which plan slot a recipe occupies, computing its absolute queue day.
 * Returns null when the recipe is not in `meals` (nothing to swap) or the
 * matched meal has no category (no slot to target). A missing `dayNumber`
 * defaults to day 1, matching the original in-plan swap behaviour.
 */
export function resolveSwapSlot(
  meals: SwapSlotMeal[] | undefined,
  recipeId: string,
  weekNumber: number,
): ResolvedSwapSlot | null {
  const target = meals?.find((m) => m.id === recipeId);
  if (!target || !target.category) return null;
  const absoluteDay = (weekNumber - 1) * 7 + (target.dayNumber || 1);
  return { target, absoluteDay, slot: target.category };
}

/**
 * Apply a queue-mode meal swap: resolve the slot the recipe occupies and
 * persist the swap through `swapQueueMeal`. Shared by the plan view and the
 * My-Recipe dashboard so both compute the slot identically. Returns the
 * `swapQueueMeal` result, or null when there is no matching slot.
 */
export async function applyQueueMealSwap(params: {
  meals: SwapSlotMeal[] | undefined;
  recipeId: string;
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
  const resolved = resolveSwapSlot(params.meals, params.recipeId, params.weekNumber);
  if (!resolved) return null;
  return params.swapQueueMeal(
    params.userId,
    resolved.absoluteDay,
    resolved.slot,
    params.newRecipeId,
  );
}
