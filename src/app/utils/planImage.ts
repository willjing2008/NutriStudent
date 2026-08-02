export const DEFAULT_PLAN_IMAGE =
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400';

interface MealImageFields {
  image?: string;
  imageUrl?: string | null;
}

/**
 * Pick a meal plan's cover image from the first meal that has a recipe image,
 * falling back to a shared default when none is available.
 */
export function firstMealImage(meals: MealImageFields[] | null | undefined): string {
  if (!Array.isArray(meals)) return DEFAULT_PLAN_IMAGE;
  for (const meal of meals) {
    const img = meal?.image || meal?.imageUrl || '';
    if (img) return img;
  }
  return DEFAULT_PLAN_IMAGE;
}
