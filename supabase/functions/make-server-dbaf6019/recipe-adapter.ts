import { NewRecipe } from "./recipe-data.ts";
import * as kv from "./kv_store.tsx";
import { classifyRecipe } from "./focus-classifier.ts";
import { recipeCostPerServing, alignIngredientPrices } from "./recipe-cost.ts";

// Strip leading quantity and measurement units from an ingredient string.
// e.g. "2 cups vanilla yogurt" → "Vanilla Yogurt"
//      "1/2 teaspoon salt"     → "Salt"
//      "8 blackberries"        → "Blackberries"
const MEASUREMENT_WORDS = new Set([
  "cup","cups","tbsp","tablespoon","tablespoons","tsp","teaspoon","teaspoons",
  "oz","ounce","ounces","lb","lbs","pound","pounds","g","gram","grams",
  "kg","ml","liter","liters","litre","litres","pinch","pinches","dash",
  "handful","handfuls","slice","slices","piece","pieces","can","cans",
  "clove","cloves","sprig","sprigs","bunch","bunches","stick","sticks",
  "head","heads","stalk","stalks","fillet","fillets","breast","breasts",
  "large","medium","small","whole","half","fresh","dried","chopped",
  "minced","diced","sliced","crushed","grated","shredded","ground",
  "packed","heaping","level","rounded",
]);

// Leading conjunctions / preparation adjectives to drop from the front of an
// ingredient so display names read cleanly
// (e.g. "and chilled, cooked chicken meat" -> "Chicken Meat").
// Note: meaning-bearing words like "raw"/"ripe" are intentionally excluded so
// names like "raw honey" / "ripe plantains" keep their descriptor.
const DESCRIPTOR_WORDS = new Set([
  "and","or","plus",
  "cooked","uncooked","chilled","warmed","frozen","canned","drained",
  "rinsed","peeled","seeded","trimmed","halved","quartered","boneless",
  "skinless","melted","softened","prepared","finely","roughly",
  "thinly","freshly","lightly","optional",
]);

function stripMeasurement(raw: string): string {
  // Remove parenthetical notes like "(about 1 lb)" or "(optional)"
  let s = raw.replace(/\(.*?\)/g, "").trim();
  // Split into tokens
  const tokens = s.split(/\s+/);
  // Skip leading numbers (including fractions like "1/2", "1½") and measurement words
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i].toLowerCase().replace(/[,;]/g, "");
    // Skip numbers and fractions
    if (/^[\d\/.½¼¾⅓⅔⅛]+$/.test(t)) { i++; continue; }
    // Skip "of" connectors
    if (t === "of") { i++; continue; }
    // Skip measurement words
    if (MEASUREMENT_WORDS.has(t)) { i++; continue; }
    // Skip leading conjunctions / preparation adjectives
    if (DESCRIPTOR_WORDS.has(t)) { i++; continue; }
    break;
  }
  const name = tokens.slice(i).join(" ").replace(/[,;]+$/, "").trim();
  if (!name) return raw.trim(); // fallback to original if everything got stripped
  // Capitalise first letter of each word
  return name.replace(/\b\w/g, (c) => c.toUpperCase());
}

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

// Generate benefit tags from nutrition data and focus/sleep classification
function generateBenefits(
  n: NewRecipe["nutrition_per_serving"],
  recipe?: NewRecipe
): string[] {
  const benefits: string[] = [];
  if (n.protein_g >= 25) benefits.push("High Protein");
  if (n.calories <= 400) benefits.push("Low Calorie");
  if (n.fiber_g >= 5) benefits.push("High Fiber");
  if (n.total_fat_g <= 10) benefits.push("Low Fat");
  if (n.sugar_g <= 5) benefits.push("Low Sugar");
  if (n.calories >= 500) benefits.push("Energy Dense");
  if (recipe) {
    const classification = classifyRecipe(recipe);
    if (classification.promotes_focus) benefits.push("Brain Food");
    if (classification.promotes_sleep) benefits.push("Sleep Friendly");
  }
  if (benefits.length === 0) benefits.push("Balanced Nutrition");
  return benefits;
}

// Build the frontend ingredient rows with real per-ingredient GBP prices.
// Shared by toMealPlanMeal and toSwapOption (previously duplicated verbatim).
function toPricedIngredients(recipe: NewRecipe) {
  const prices = alignIngredientPrices(recipe.ingredients, recipe.priced_ingredients);
  return recipe.ingredients.map((str, i) => ({
    name: stripMeasurement(str),
    amount: str,
    category: "pantry" as const,
    // Real per-ingredient cost from priced_ingredients (0 until priced or if a
    // line can't be matched), so the shopping list shows real prices.
    estimatedPrice: prices[i],
    price: prices[i],
    unit: "",
    available: true,
  }));
}

// Convert a NewRecipe into the MealPlanMeal shape the frontend expects
export function toMealPlanMeal(
  recipe: NewRecipe,
  dayNumber: number,
  mealNumber: number,
  assignedSlot?: string
) {
  const cookingTime = recipe.total_time_minutes ?? recipe.cook_time_minutes ?? 0;
  const classification = classifyRecipe(recipe);
  const benefits = generateBenefits(recipe.nutrition_per_serving, recipe);

  // Use the assigned slot if provided, otherwise fall back to recipe's own category
  const slot = assignedSlot || getCategorySlot(recipe.recipe_category);
  const slotLabel = slot.charAt(0).toUpperCase() + slot.slice(1);

  return {
    id: String(recipe.id),
    name: recipe.name,
    description: recipe.description,
    image: recipe.image?.url || "",
    imageUrl: recipe.image?.url || null,
    rationale: benefits.join(". "),
    benefits,
    mealType: slotLabel,
    category: slot,
    cookingTime,
    servings: parseInt(recipe.servings) || 1,
    difficulty: inferDifficulty(recipe.total_time_minutes),
    tags: [recipe.meal_type, recipe.recipe_category, recipe.cuisine].filter(Boolean),
    ingredients: toPricedIngredients(recipe),
    ingredientNames: recipe.ingredients,
    instructions: recipe.instructions,
    cost: recipeCostPerServing(recipe),
    totalCost: recipeCostPerServing(recipe),
    nutrition: {
      calories: recipe.nutrition_per_serving.calories,
      protein: recipe.nutrition_per_serving.protein_g,
      carbs: recipe.nutrition_per_serving.carbohydrates_g,
      fats: recipe.nutrition_per_serving.total_fat_g,
      fiber: recipe.nutrition_per_serving.fiber_g,
    },
    sourceUrl: recipe.url,
    dayNumber,
    mealNumber,
    // Extra fields from new data
    rating: recipe.rating,
    reviewCount: recipe.review_count,
    author: recipe.author,
    cuisine: recipe.cuisine,
    mealTypeTag: recipe.meal_type,
    // Focus/sleep classification
    promotes_focus: classification.promotes_focus,
    promotes_sleep: classification.promotes_sleep,
    focus_score: classification.focus_score,
    sleep_score: classification.sleep_score,
  };
}

// Convert a NewRecipe to a simpler format for swap option display
export function toSwapOption(recipe: NewRecipe) {
  const cookingTime = recipe.total_time_minutes ?? recipe.cook_time_minutes ?? 0;
  const benefits = generateBenefits(recipe.nutrition_per_serving, recipe);

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
    ingredients: toPricedIngredients(recipe),
    ingredientNames: recipe.ingredients,
    instructions: recipe.instructions,
    cost: recipeCostPerServing(recipe),
    totalCost: recipeCostPerServing(recipe),
    nutrition: {
      calories: recipe.nutrition_per_serving.calories,
      protein: recipe.nutrition_per_serving.protein_g,
      carbs: recipe.nutrition_per_serving.carbohydrates_g,
      fats: recipe.nutrition_per_serving.total_fat_g,
      fiber: recipe.nutrition_per_serving.fiber_g,
    },
    sourceUrl: recipe.url,
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

// Fetch recipes filtered by focus-promotion status
export async function getRecipesByFocusType(
  mealType: string,
  focusMode: boolean
): Promise<NewRecipe[]> {
  const allRecipes = await getRecipesByMealType(mealType);
  if (!focusMode) return allRecipes;
  // In focus mode: return recipes that promote focus
  const focusRecipes = allRecipes.filter((r) => classifyRecipe(r).promotes_focus);
  // If too few focus recipes, supplement with highest focus_score
  if (focusRecipes.length < 15) {
    const scored = allRecipes
      .map((r) => ({ recipe: r, score: classifyRecipe(r).focus_score }))
      .sort((a, b) => b.score - a.score);
    const ids = new Set(focusRecipes.map((r) => r.id));
    for (const s of scored) {
      if (ids.has(s.recipe.id)) continue;
      focusRecipes.push(s.recipe);
      if (focusRecipes.length >= 15) break;
    }
  }
  return focusRecipes;
}

// Fetch sleep-friendly recipes for evening meals
export async function getSleepFriendlyRecipes(
  mealType: string
): Promise<NewRecipe[]> {
  const allRecipes = await getRecipesByMealType(mealType);
  const sleepRecipes = allRecipes.filter((r) => classifyRecipe(r).promotes_sleep);
  // If too few, supplement with highest sleep_score
  if (sleepRecipes.length < 10) {
    const scored = allRecipes
      .map((r) => ({ recipe: r, score: classifyRecipe(r).sleep_score }))
      .sort((a, b) => b.score - a.score);
    const ids = new Set(sleepRecipes.map((r) => r.id));
    for (const s of scored) {
      if (ids.has(s.recipe.id)) continue;
      sleepRecipes.push(s.recipe);
      if (sleepRecipes.length >= 10) break;
    }
  }
  return sleepRecipes;
}
