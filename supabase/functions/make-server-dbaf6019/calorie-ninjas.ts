// CalorieNinjas API integration for automatic nutrition calculation
// API docs: https://calorieninjas.com/api

export interface CalorieNinjasItem {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

export interface NutritionResult {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface IngredientNutritionResult {
  name: string;
  amount: string;
  normalizedQuery: string;
  nutrition: NutritionResult | null;
  warning?: string;
  error?: string;
}

// Negligible amounts that contribute virtually nothing nutritionally
const NEGLIGIBLE_AMOUNTS = [
  'pinch', 'to taste', 'dash', 'splash', 'drizzle', 'garnish',
  'pinch of', 'to garnish', 'for garnish', 'as needed',
];

// Build a query string for the CalorieNinjas API from ingredient name and amount
export function buildIngredientQuery(name: string, amount: string): string {
  const lowerAmount = amount.toLowerCase().trim();

  // Check for negligible amounts
  for (const neg of NEGLIGIBLE_AMOUNTS) {
    if (lowerAmount === neg || lowerAmount.startsWith(neg)) {
      return `1g ${name}`;
    }
  }

  // Extract weight from package descriptions like "400g tin", "200g can"
  const packageMatch = lowerAmount.match(/^(\d+\s*(?:g|kg|ml|l))\s+(?:tin|can|pack|packet|bag|box|jar|bottle|carton)/i);
  if (packageMatch) {
    return `${packageMatch[1]} ${name}`;
  }

  // Approximate size-based amounts like "2cm piece", "5cm piece"
  const sizeMatch = lowerAmount.match(/^(\d+)\s*cm\s+piece/i);
  if (sizeMatch) {
    const cm = parseInt(sizeMatch[1]);
    const approxGrams = cm * 5; // rough approximation: 5g per cm
    return `${approxGrams}g ${name}`;
  }

  // Standard amounts — pass through as-is (API handles "400g", "2 tbsp", "1 large", "3 cloves" etc.)
  return `${amount} ${name}`;
}

// Query CalorieNinjas API for a single ingredient
export async function queryIngredientNutrition(
  apiKey: string,
  name: string,
  amount: string
): Promise<IngredientNutritionResult> {
  const normalizedQuery = buildIngredientQuery(name, amount);

  try {
    const response = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(normalizedQuery)}`,
      {
        headers: { 'X-Api-Key': apiKey },
      }
    );

    if (!response.ok) {
      return {
        name,
        amount,
        normalizedQuery,
        nutrition: null,
        error: `API returned ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    const items: CalorieNinjasItem[] = data.items || [];

    if (items.length === 0) {
      return {
        name,
        amount,
        normalizedQuery,
        nutrition: null,
        warning: `No nutrition data found for "${normalizedQuery}"`,
      };
    }

    // Sum all returned items (API may split compound queries)
    const nutrition: NutritionResult = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
    };

    for (const item of items) {
      nutrition.calories += item.calories;
      nutrition.protein += item.protein_g;
      nutrition.carbs += item.carbohydrates_total_g;
      nutrition.fats += item.fat_total_g;
      nutrition.fiber += item.fiber_g;
    }

    // Round to 1 decimal place
    nutrition.calories = Math.round(nutrition.calories);
    nutrition.protein = Math.round(nutrition.protein * 10) / 10;
    nutrition.carbs = Math.round(nutrition.carbs * 10) / 10;
    nutrition.fats = Math.round(nutrition.fats * 10) / 10;
    nutrition.fiber = Math.round(nutrition.fiber * 10) / 10;

    return {
      name,
      amount,
      normalizedQuery,
      nutrition,
    };
  } catch (err: any) {
    return {
      name,
      amount,
      normalizedQuery,
      nutrition: null,
      error: err.message || 'Unknown error querying CalorieNinjas',
    };
  }
}

// Calculate total recipe nutrition from all ingredients, returns per-serving values
export async function calculateRecipeNutrition(
  apiKey: string,
  ingredients: Array<{ name: string; amount: string }>,
  servings: number
): Promise<{
  perServing: NutritionResult;
  total: NutritionResult;
  ingredientDetails: IngredientNutritionResult[];
  warnings: string[];
  errors: string[];
}> {
  const ingredientDetails: IngredientNutritionResult[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  const total: NutritionResult = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  };

  // Query each ingredient sequentially to respect rate limits
  for (const ingredient of ingredients) {
    const result = await queryIngredientNutrition(apiKey, ingredient.name, ingredient.amount);
    ingredientDetails.push(result);

    if (result.error) {
      errors.push(`${ingredient.name}: ${result.error}`);
    } else if (result.warning) {
      warnings.push(result.warning);
    }

    if (result.nutrition) {
      total.calories += result.nutrition.calories;
      total.protein += result.nutrition.protein;
      total.carbs += result.nutrition.carbs;
      total.fats += result.nutrition.fats;
      total.fiber += result.nutrition.fiber;
    }
  }

  const effectiveServings = servings > 0 ? servings : 1;
  const perServing: NutritionResult = {
    calories: Math.round(total.calories / effectiveServings),
    protein: Math.round((total.protein / effectiveServings) * 10) / 10,
    carbs: Math.round((total.carbs / effectiveServings) * 10) / 10,
    fats: Math.round((total.fats / effectiveServings) * 10) / 10,
    fiber: Math.round((total.fiber / effectiveServings) * 10) / 10,
  };

  return { perServing, total, ingredientDetails, warnings, errors };
}
