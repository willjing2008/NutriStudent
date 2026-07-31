import { NewRecipe } from "./recipe-data.ts";
import {
  allergyKeywordsForChoice,
  BROAD_ALLERGY_KEYWORDS,
  normalizeAllergyChoices,
} from "../_shared/allergy-contract.ts";

// Ingredient keywords forbidden by each dietary restriction. Matching is
// intentionally cautious (better to over-exclude than serve a forbidden food).
// The generic "nut" keyword uses word boundaries so coconut and butternut do
// not become false positives.
const MEAT_KEYWORDS = ['chicken', 'beef', 'pork', 'lamb', 'turkey', 'bacon', 'ham', 'sausage', 'steak', 'mince', 'prosciutto', 'salami', 'duck', 'veal', 'gelatin', 'gelatine'];
const SEAFOOD_KEYWORDS = [...BROAD_ALLERGY_KEYWORDS.Seafood];
const DAIRY_EGG_KEYWORDS = [...BROAD_ALLERGY_KEYWORDS.Dairy, ...BROAD_ALLERGY_KEYWORDS.Eggs, 'honey'];
const GLUTEN_KEYWORDS = [...BROAD_ALLERGY_KEYWORDS['Gluten/Wheat'], 'breadcrumb'];
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
  ['dairy', BROAD_ALLERGY_KEYWORDS.Dairy],
  ['gluten/wheat', BROAD_ALLERGY_KEYWORDS['Gluten/Wheat']],
  ['eggs', BROAD_ALLERGY_KEYWORDS.Eggs],
  ['soy', BROAD_ALLERGY_KEYWORDS.Soy],
  ['keto', KETO_KEYWORDS],
]);

export function dietaryForbiddenKeywords(restrictions: string[]): string[] {
  const set = new Set<string>();
  for (const restriction of normalizeAllergyChoices(restrictions, 10)) {
    const words = DIETARY_KEYWORDS.get(restriction.toLowerCase())
      ?? allergyKeywordsForChoice(restriction);
    for (const word of words) set.add(word);
  }
  return [...set];
}

// Short stems that appear inside unrelated ingredient words get word-boundary
// matching (coconut/butternut, eggplant, casserole); everything else matches
// as a cautious substring.
const WORD_BOUNDARY_PATTERNS = new Map<string, RegExp>([
  ['nut', /\bnuts?\b/i],
  ['egg', /\beggs?\b/i],
  ['sole', /\bsole\b/i],
]);

const ingredientContainsKeyword = (ingredient: string, keyword: string): boolean => {
  const pattern = WORD_BOUNDARY_PATTERNS.get(keyword);
  return pattern ? pattern.test(ingredient) : ingredient.toLowerCase().includes(keyword);
};

const containsKeyword = (recipe: NewRecipe, keywords: readonly string[]): boolean =>
  keywords.some(keyword => recipe.ingredients.some(
    ingredient => ingredientContainsKeyword(ingredient, keyword),
  ));

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
      // Taxonomy choices carry keyword sets (a group's full union or a single
      // sub-option family); free-text dislikes match literally by name.
      const taxonomyKeywords = allergyKeywordsForChoice(choice);
      return taxonomyKeywords.length > 0
        ? containsKeyword(recipe, taxonomyKeywords)
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
