import type { NewRecipe } from '../recipe-data.ts'

/**
 * Build a fully-typed NewRecipe fixture with sensible defaults.
 * Returns a new object every call; pass `overrides` to customise specific fields.
 *
 * Lives under the backend `__tests__` dir (outside the browser app's tsconfig)
 * so importing the recipe types here never drags the 907 KB recipe-data array
 * into the app type-check.
 */
export function makeRecipe(overrides: Partial<NewRecipe> = {}): NewRecipe {
  const base: NewRecipe = {
    url: 'https://example.test/recipe',
    category: 'general',
    id: 1,
    name: 'Test Recipe',
    description: 'A recipe used in tests.',
    author: 'Test Author',
    image: { url: 'https://example.test/img.jpg', alt: 'Test image' },
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    total_time_minutes: 30,
    servings: '2',
    ingredients: [],
    instructions: ['Mix', 'Cook'],
    nutrition_per_serving: {
      calories: 500,
      total_fat_g: 20,
      carbohydrates_g: 50,
      fiber_g: 5,
      sugar_g: 10,
      protein_g: 30,
      sodium_mg: 400,
      cholesterol_mg: 50,
      saturated_fat_g: 6,
      unsaturated_fat_g: 14,
    },
    rating: 4.5,
    review_count: 100,
    recipe_category: 'main',
    cuisine: 'general',
    meal_type: 'work',
  }

  return {
    ...base,
    ...overrides,
    // Preserve nested defaults when caller overrides only part of a nested object.
    image: { ...base.image, ...overrides.image },
    nutrition_per_serving: {
      ...base.nutrition_per_serving,
      ...overrides.nutrition_per_serving,
    },
  }
}
