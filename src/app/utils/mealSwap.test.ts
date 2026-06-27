import { describe, it, expect, vi } from 'vitest';
import { resolveSwapSlot, applyQueueMealSwap } from './mealSwap';

const meals = [
  { id: 'r-breakfast', dayNumber: 1, category: 'breakfast' },
  { id: 'r-lunch', dayNumber: 2, category: 'lunch' },
  { id: 'r-dinner', dayNumber: 3, category: 'dinner' },
];

describe('resolveSwapSlot', () => {
  it('resolves the slot and absolute day for an in-plan recipe (week 1)', () => {
    expect(resolveSwapSlot(meals, 'r-lunch', 1)).toEqual({
      target: meals[1],
      absoluteDay: 2,
      slot: 'lunch',
    });
  });

  it('offsets the absolute day by week', () => {
    // week 3, day 3 -> (3-1)*7 + 3 = 17
    expect(resolveSwapSlot(meals, 'r-dinner', 3)?.absoluteDay).toBe(17);
  });

  it('defaults a missing dayNumber to 1', () => {
    expect(resolveSwapSlot([{ id: 'x', category: 'lunch' }], 'x', 2)?.absoluteDay).toBe(8);
  });

  it('returns null when the recipe is not in the plan', () => {
    expect(resolveSwapSlot(meals, 'not-in-plan', 1)).toBeNull();
  });

  it('returns null when the matched meal has no category (no slot to target)', () => {
    expect(resolveSwapSlot([{ id: 'x', dayNumber: 1 }], 'x', 1)).toBeNull();
  });

  it('returns null for undefined meals', () => {
    expect(resolveSwapSlot(undefined, 'r-lunch', 1)).toBeNull();
  });
});

describe('applyQueueMealSwap', () => {
  it('calls swapQueueMeal with the resolved absolute day + slot', async () => {
    const swapQueueMeal = vi.fn().mockResolvedValue('ok');
    const result = await applyQueueMealSwap({
      meals,
      recipeId: 'r-dinner',
      weekNumber: 2,
      userId: 'user-1',
      newRecipeId: 'new-recipe',
      swapQueueMeal,
    });
    // week 2, day 3 -> (2-1)*7 + 3 = 10
    expect(swapQueueMeal).toHaveBeenCalledWith('user-1', 10, 'dinner', 'new-recipe');
    expect(result).toBe('ok');
  });

  it('does not call swapQueueMeal and returns null when the recipe is not in the plan', async () => {
    const swapQueueMeal = vi.fn();
    const result = await applyQueueMealSwap({
      meals,
      recipeId: 'not-in-plan',
      weekNumber: 1,
      userId: 'user-1',
      newRecipeId: 'new-recipe',
      swapQueueMeal,
    });
    expect(swapQueueMeal).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
