import { describe, it, expect, vi } from 'vitest';
import { resolveSwapSlot, applyQueueMealSwap } from './mealSwap';

describe('resolveSwapSlot', () => {
  it('uses the queueDayNumber stamped by get-queue-week as the source of truth', () => {
    // Week math would say (1-1)*7 + 2 = 2; the stamped absolute day wins.
    const meal = { id: 'r1', dayNumber: 2, queueDayNumber: 9, category: 'breakfast' };
    expect(resolveSwapSlot(meal, 1)).toEqual({
      target: meal,
      absoluteDay: 9,
      slot: 'breakfast',
    });
  });

  it('falls back to (weekNumber-1)*7 + dayNumber when queueDayNumber is absent', () => {
    // week 3, day 3 -> (3-1)*7 + 3 = 17
    expect(resolveSwapSlot({ id: 'r1', dayNumber: 3, category: 'dinner' }, 3)?.absoluteDay).toBe(17);
  });

  it('prefers the queue mealSlot over the recipe category (they drift after swaps)', () => {
    const meal = { id: 'r1', dayNumber: 1, category: 'dinner', mealSlot: 'breakfast' };
    expect(resolveSwapSlot(meal, 1)?.slot).toBe('breakfast');
  });

  it('keys by the meal object, so a recipe repeated across days resolves to the tapped occurrence', () => {
    // The same recipe id appears on days 2 and 6 (queue rotation does this).
    // Resolving the day-6 instance must target day 6, never the first match.
    const occurrences = [
      { id: 'frittata', dayNumber: 2, queueDayNumber: 2, category: 'breakfast' },
      { id: 'frittata', dayNumber: 6, queueDayNumber: 6, category: 'breakfast' },
    ];
    expect(resolveSwapSlot(occurrences[1], 1)?.absoluteDay).toBe(6);
  });

  it('defaults a missing dayNumber to 1', () => {
    expect(resolveSwapSlot({ id: 'x', category: 'lunch' }, 2)?.absoluteDay).toBe(8);
  });

  it('returns null when there is no meal to swap', () => {
    expect(resolveSwapSlot(null, 1)).toBeNull();
    expect(resolveSwapSlot(undefined, 1)).toBeNull();
  });

  it('returns null when the meal has no slot to target', () => {
    expect(resolveSwapSlot({ id: 'x', dayNumber: 1 }, 1)).toBeNull();
  });
});

describe('applyQueueMealSwap', () => {
  it('calls swapQueueMeal with the resolved absolute day + slot', async () => {
    const swapQueueMeal = vi.fn().mockResolvedValue('ok');
    const result = await applyQueueMealSwap({
      meal: { id: 'r-dinner', dayNumber: 3, category: 'dinner' },
      weekNumber: 2,
      userId: 'user-1',
      newRecipeId: 'new-recipe',
      swapQueueMeal,
    });
    // week 2, day 3 -> (2-1)*7 + 3 = 10
    expect(swapQueueMeal).toHaveBeenCalledWith('user-1', 10, 'dinner', 'new-recipe');
    expect(result).toBe('ok');
  });

  it('targets the stamped queueDayNumber when present', async () => {
    const swapQueueMeal = vi.fn().mockResolvedValue('ok');
    await applyQueueMealSwap({
      meal: { id: 'r1', dayNumber: 4, queueDayNumber: 25, mealSlot: 'lunch' },
      weekNumber: 1,
      userId: 'user-1',
      newRecipeId: 'new-recipe',
      swapQueueMeal,
    });
    expect(swapQueueMeal).toHaveBeenCalledWith('user-1', 25, 'lunch', 'new-recipe');
  });

  it('does not call swapQueueMeal and returns null when there is no slot to target', async () => {
    const swapQueueMeal = vi.fn();
    const result = await applyQueueMealSwap({
      meal: undefined,
      weekNumber: 1,
      userId: 'user-1',
      newRecipeId: 'new-recipe',
      swapQueueMeal,
    });
    expect(swapQueueMeal).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
