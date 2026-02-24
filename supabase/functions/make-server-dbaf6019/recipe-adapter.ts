import { NewRecipe } from "./recipe-data.ts";
import * as kv from "./kv_store.tsx";

// Maps recipe_category to a simplified meal slot
function getCategorySlot(recipeCategory: string): string {
  const cat = (recipeCategory || "").toLowerCase();
  if (cat === "breakfast" || cat === "brunch") return "breakfast";
  if (["lunch", "salad", "sandwich", "soup"].includes(cat)) return "lunch";
  return "dinner"; // dinner, appetizer, entree, side dish, snack, dessert, drink, etc.
}

// Infer difficulty from total cooking time
function inferDifficulty(totalMinutes: number | null): "easy" | "medium" | "hard" {
  if (!totalMinutes || totalMinutes <= 15) return "easy";
  if (totalMinutes <= 45) return "medium";
  return "hard";
}

// Generate benefit tags from nutrition data
function generateBenefits(n: NewRecipe["nutrition_per_serving"]): string[] {
  const benefits: string[] = [];
  if (n.protein_g >= 25) benefits.push("High Protein");
  if (n.calories <= 400) benefits.push("Low Calorie");
  if (n.fiber_g >= 5) benefits.push("High Fiber");
  if (n.total_fat_g <= 10) benefits.push("Low Fat");
  if (n.sugar_g <= 5) benefits.push("Low Sugar");
  if (n.calories >= 500) benefits.push("Energy Dense");
  if (benefits.length === 0) benefits.push("Balanced Nutrition");
  return benefits;
}

// Convert a NewRecipe into the MealPlanMeal shape the frontend expects
export function toMealPlanMeal(
  recipe: NewRecipe,
  dayNumber: number,
  mealNumber: number
) {
  const cookingTime = recipe.total_time_minutes ?? recipe.cook_time_minutes ?? 0;
  const benefits = generateBenefits(recipe.nutrition_per_serving);

  return {
    id: String(recipe.id),
    name: recipe.name,
    description: recipe.description,
    image: recipe.image?.url || "",
    imageUrl: recipe.image?.url || null,
    rationale: benefits.join(". "),
    benefits,
    mealType: recipe.recipe_category || "Dinner",
    category: getCategorySlot(recipe.recipe_category),
    cookingTime,
    servings: parseInt(recipe.servings) || 1,
    difficulty: inferDifficulty(recipe.total_time_minutes),
    tags: [recipe.meal_type, recipe.recipe_category, recipe.cuisine].filter(Boolean),
    ingredients: recipe.ingredients.map((str) => ({
      name: str,
      amount: str,
      category: "pantry" as const,
      estimatedPrice: 0,
      price: 0,
      unit: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      available: true,
    })),
    ingredientNames: recipe.ingredients,
    instructions: recipe.instructions,
    cost: 0,
    totalCost: 0,
    nutrition: {
      calories: recipe.nutrition_per_serving.calories,
      protein: recipe.nutrition_per_serving.protein_g,
      carbs: recipe.nutrition_per_serving.carbohydrates_g,
      fats: recipe.nutrition_per_serving.total_fat_g,
      fiber: recipe.nutrition_per_serving.fiber_g,
    },
    sourceUrl: recipe.url,
    youtubeUrl: undefined,
    dayNumber,
    mealNumber,
    // Extra fields from new data
    rating: recipe.rating,
    reviewCount: recipe.review_count,
    author: recipe.author,
    cuisine: recipe.cuisine,
    mealTypeTag: recipe.meal_type,
  };
}

// Convert a NewRecipe to a simpler format for swap option display
export function toSwapOption(recipe: NewRecipe) {
  const cookingTime = recipe.total_time_minutes ?? recipe.cook_time_minutes ?? 0;
  const benefits = generateBenefits(recipe.nutrition_per_serving);

  return {
    id: String(recipe.id),
    name: recipe.name,
    description: recipe.description,
    image: recipe.image?.url || "",
    imageUrl: recipe.image?.url || null,
    rationale: benefits.join(". "),
    benefits,
    mealType: recipe.recipe_category || "Dinner",
    category: getCategorySlot(recipe.recipe_category),
    cookingTime,
    servings: parseInt(recipe.servings) || 1,
    difficulty: inferDifficulty(recipe.total_time_minutes),
    tags: [recipe.meal_type, recipe.recipe_category, recipe.cuisine].filter(Boolean),
    ingredients: recipe.ingredients.map((str) => ({
      name: str,
      amount: str,
      category: "pantry" as const,
      estimatedPrice: 0,
      price: 0,
      unit: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      available: true,
    })),
    ingredientNames: recipe.ingredients,
    instructions: recipe.instructions,
    cost: 0,
    totalCost: 0,
    nutrition: {
      calories: recipe.nutrition_per_serving.calories,
      protein: recipe.nutrition_per_serving.protein_g,
      carbs: recipe.nutrition_per_serving.carbohydrates_g,
      fats: recipe.nutrition_per_serving.total_fat_g,
      fiber: recipe.nutrition_per_serving.fiber_g,
    },
    sourceUrl: recipe.url,
    youtubeUrl: undefined,
    cuisine: recipe.cuisine,
    mealTypeTag: recipe.meal_type,
  };
}

// Fetch recipes from kv_store by meal_type
export async function getRecipesByMealType(mealType: string): Promise<NewRecipe[]> {
  const prefix = `recipe:${mealType}:`;
  const values = await kv.getByPrefix(prefix);
  return values.map((v: any) => (typeof v === "string" ? JSON.parse(v) : v));
}

// Fetch all recipes from kv_store
export async function getAllRecipesFromDB(): Promise<NewRecipe[]> {
  const values = await kv.getByPrefix("recipe:");
  return values
    .filter((v: any) => v !== null && v !== undefined)
    .map((v: any) => (typeof v === "string" ? JSON.parse(v) : v))
    // Filter out the metadata entry
    .filter((v: any) => v && typeof v === "object" && "id" in v);
}
