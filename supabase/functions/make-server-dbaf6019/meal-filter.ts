import { NewRecipe } from "./recipe-data.ts";
import {
  BROAD_ALLERGY_KEYWORDS,
  broadAllergyKeywords,
  normalizeAllergyChoices,
} from "../_shared/allergy-contract.ts";

// Ingredient keywords forbidden by each dietary restriction. Matching is
// intentionally cautious (better to over-exclude than serve a forbidden food).
// The generic "nut" keyword uses word boundaries so coconut and butternut do
// not become false positives.
const MEAT_KEYWORDS = ['chicken', 'beef', 'pork', 'lamb', 'turkey', 'bacon', 'ham', 'sausage', 'steak', 'mince', 'prosciutto', 'salami', 'duck', 'veal', 'gelatin', 'gelatine'];
const SEAFOOD_KEYWORDS = [...BROAD_ALLERGY_KEYWORDS.Seafood];
const DAIRY_EGG_KEYWORDS = ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'yoghurt', 'egg', 'honey', 'ghee', 'custard'];
const GLUTEN_KEYWORDS = ['wheat', 'bread', 'pasta', 'flour', 'barley', 'rye', 'couscous', 'noodle', 'cracker', 'breadcrumb', 'tortilla', 'pita', 'bagel', 'pastry'];
const NUT_KEYWORDS = [...BROAD_ALLERGY_KEYWORDS.Nuts];
// High-carb legumes named specifically (like NUT_KEYWORDS) so keto excludes
// lentils/chickpeas/starchy beans without catching keto-friendly green beans.
const KETO_KEYWORDS = ['rice', 'pasta', 'bread', 'potato', 'sugar', 'oats', 'flour', 'noodle', 'corn', 'banana', 'tortilla', 'lentil', 'chickpea', 'kidney bean', 'black bean', 'baked bean'];

const DIETARY_KEYWORDS = new Map<string, readonly string[]>([
  ['vegetarian', [...MEAT_KEYWORDS, ...SEAFOOD_KEYWORDS]],
  ['vegan', [...MEAT_KEYWORDS, ...SEAFOOD_KEYWORDS, ...DAIRY_EGG_KEYWORDS]],
  ['gluten-free', GLUTEN_KEYWORDS],
  ['nut-free', NUT_KEYWORDS],
  ['nuts', NUT_KEYWORDS],
  ['seafood', SEAFOOD_KEYWORDS],
  ['keto', KETO_KEYWORDS],
]);

export function dietaryForbiddenKeywords(restrictions: string[]): string[] {
  const set = new Set<string>();
  for (const restriction of normalizeAllergyChoices(restrictions, 10)) {
    for (const word of DIETARY_KEYWORDS.get(restriction.toLowerCase()) ?? []) set.add(word);
  }
  return [...set];
}

const ingredientContainsKeyword = (ingredient: string, keyword: string): boolean =>
  keyword === 'nut'
    ? /\bnuts?\b/i.test(ingredient)
    : ingredient.toLowerCase().includes(keyword);

const containsKeyword = (recipe: NewRecipe, keywords: readonly string[]): boolean =>
  keywords.some(keyword => recipe.ingredients.some(
    ingredient => ingredientContainsKeyword(ingredient, keyword),
  ));

const containsBroadAllergy = (recipe: NewRecipe, choice: string): boolean => {
  const broadKeywords = broadAllergyKeywords(choice);
  return broadKeywords.length > 0 && containsKeyword(recipe, broadKeywords);
};

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
    const normalizedAvoid = normalizeAllergyChoices(avoidIngredients, 50);
    dietarySafe = dietarySafe.filter(recipe => !normalizedAvoid.some((choice) => {
      const broadKeywords = broadAllergyKeywords(choice);
      return broadKeywords.length > 0
        ? containsBroadAllergy(recipe, choice)
        : containsKeyword(recipe, [choice.toLowerCase()]);
    }));
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
