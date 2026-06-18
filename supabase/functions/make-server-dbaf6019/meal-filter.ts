import { NewRecipe } from "./recipe-data.ts";

// Ingredient keywords forbidden by each dietary restriction. Keyword/substring
// matching is intentionally cautious (better to over-exclude than serve a
// forbidden food); curated to avoid the worst false positives (e.g. nut names
// rather than bare "nut", which would catch coconut/butternut).
const MEAT_KEYWORDS = ['chicken', 'beef', 'pork', 'lamb', 'turkey', 'bacon', 'ham', 'sausage', 'steak', 'mince', 'prosciutto', 'salami', 'duck', 'veal', 'gelatin', 'gelatine'];
const FISH_KEYWORDS = ['fish', 'salmon', 'tuna', 'cod', 'prawn', 'shrimp', 'crab', 'lobster', 'anchovy', 'mackerel', 'sardine', 'squid', 'oyster', 'mussel'];
const DAIRY_EGG_KEYWORDS = ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'yoghurt', 'egg', 'honey', 'ghee', 'custard'];
const GLUTEN_KEYWORDS = ['wheat', 'bread', 'pasta', 'flour', 'barley', 'rye', 'couscous', 'noodle', 'cracker', 'breadcrumb', 'tortilla', 'pita', 'bagel', 'pastry'];
const NUT_KEYWORDS = ['almond', 'peanut', 'cashew', 'walnut', 'hazelnut', 'pecan', 'pistachio', 'macadamia', 'pine nut', 'brazil nut'];
const KETO_KEYWORDS = ['rice', 'pasta', 'bread', 'potato', 'sugar', 'oats', 'flour', 'noodle', 'corn', 'banana', 'tortilla'];

const DIETARY_KEYWORDS: Record<string, string[]> = {
  vegetarian: [...MEAT_KEYWORDS, ...FISH_KEYWORDS],
  vegan: [...MEAT_KEYWORDS, ...FISH_KEYWORDS, ...DAIRY_EGG_KEYWORDS],
  'gluten-free': GLUTEN_KEYWORDS,
  'nut-free': NUT_KEYWORDS,
  keto: KETO_KEYWORDS,
};

export function dietaryForbiddenKeywords(restrictions: string[]): string[] {
  const set = new Set<string>();
  for (const r of restrictions) {
    for (const word of DIETARY_KEYWORDS[r.toLowerCase()] ?? []) set.add(word);
  }
  return [...set];
}

const containsKeyword = (recipe: NewRecipe, keywords: string[]): boolean =>
  keywords.some(word => recipe.ingredients.some(ing => ing.toLowerCase().includes(word)));

export interface MealFilterOptions {
  avoidIngredients?: string[];
  dietaryRestrictions?: string[];
  maxCookingTime?: number;
}

/**
 * Filter a recipe pool by the user's preferences.
 *
 * Dietary restrictions and avoided ingredients are HARD safety filters and are
 * NEVER relaxed — relaxing them could serve an allergen or a forbidden food.
 * maxCookingTime is a soft preference, relaxed only when it would otherwise
 * empty the pool.
 *
 * Returns [] when no recipe satisfies the hard filters. Callers MUST treat an
 * empty result as "no compliant recipes" and must NOT fall back to the
 * unfiltered pool (doing so is how a vegan/coeliac ends up served meat/gluten).
 */
export function filterRecipes(recipes: NewRecipe[], opts: MealFilterOptions = {}): NewRecipe[] {
  const { avoidIngredients, dietaryRestrictions, maxCookingTime } = opts;

  let dietarySafe = recipes;

  if (avoidIngredients && avoidIngredients.length > 0) {
    const avoidLowercase = avoidIngredients.map(i => i.toLowerCase());
    dietarySafe = dietarySafe.filter(recipe => !containsKeyword(recipe, avoidLowercase));
  }

  if (dietaryRestrictions && dietaryRestrictions.length > 0) {
    const forbidden = dietaryForbiddenKeywords(dietaryRestrictions);
    if (forbidden.length > 0) {
      dietarySafe = dietarySafe.filter(recipe => !containsKeyword(recipe, forbidden));
    }
  }

  if (maxCookingTime && maxCookingTime > 0) {
    const withinTime = dietarySafe.filter(
      r => (r.total_time_minutes ?? r.cook_time_minutes ?? 0) <= maxCookingTime
    );
    // Relax ONLY the cooking-time preference if it empties the pool — never the
    // dietary/avoid safety filters above.
    return withinTime.length > 0 ? withinTime : dietarySafe;
  }

  return dietarySafe;
}
