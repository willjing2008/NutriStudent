import { NewRecipe } from "./recipe-data.ts";
import { extractBaseIngredient, TRIVIAL_ITEMS } from "./ingredient-overlap.ts";

// ── Focus-promoting ingredient keywords (brain-food science) ─────────
// Substring matches against lowercased, cleaned ingredient strings.

const FOCUS_INGREDIENTS = [
  "salmon", "tuna", "mackerel", "sardine", "trout",  // omega-3 fatty fish
  "blueberr", "blackberr", "strawberr", "raspberr",  // antioxidant berries (prefix)
  "walnut", "almond", "pecan", "cashew", "pistachio", // nuts
  "egg",                                               // choline
  "spinach", "kale", "broccoli", "arugula",            // leafy greens
  "avocado",                                           // healthy fats
  "dark chocolate", "cocoa",                           // flavonoids
  "turmeric",                                          // anti-inflammatory
  "pumpkin seed", "sunflower seed", "flaxseed", "chia seed", // seeds
  "greek yogurt", "yogurt",                            // probiotics / gut-brain
  "olive oil",                                         // healthy fats
  "quinoa", "oat",                                     // complex carbs
  "sweet potato",                                      // complex carbs + vitamin A
  "lentil", "chickpea", "black bean",                  // legumes
  "green tea", "matcha",                               // L-theanine
  "beet",                                              // nitrates → blood flow
  "pumpkin",                                           // zinc + magnesium
  "edamame", "tofu",                                   // plant protein + iron
];

// ── Sleep-promoting ingredient keywords ──────────────────────────────

const SLEEP_INGREDIENTS = [
  "turkey",                           // tryptophan
  "milk", "warm milk",                // tryptophan + calcium
  "chamomile",                        // calming
  "cherry", "tart cherry",            // melatonin
  "banana",                           // magnesium + tryptophan
  "almond",                           // magnesium
  "oat", "oatmeal",                   // melatonin
  "honey",                            // helps tryptophan cross BBB
  "kiwi",                             // serotonin
  "walnut",                           // melatonin
  "rice", "jasmine rice", "white rice", // high GI for serotonin
  "sweet potato",                     // complex carbs + potassium
  "cottage cheese",                   // casein protein
  "pumpkin seed",                     // tryptophan + zinc
  "lettuce",                          // lactucarium (mild sedative)
  "passionflower",                    // GABA
];

// Ingredients that disrupt sleep — disqualify from sleep-friendly
const SLEEP_AVOID = new Set([
  "coffee", "espresso", "caffeine",
  "dark chocolate", "cocoa", "cacao",
  "hot sauce", "sriracha", "jalapeno", "habanero", "cayenne",
  "soda", "energy drink", "cola",
  "green tea", "matcha", "black tea",
]);

// ── Nutritional thresholds ───────────────────────────────────────────

const FOCUS_NUTRITION = {
  minProtein: 15,
  minFiber: 3,
  maxSugar: 20,
};

// ── Classification result ────────────────────────────────────────────

export interface RecipeClassification {
  promotes_focus: boolean;
  focus_score: number;          // 0-10
  promotes_sleep: boolean;
  sleep_score: number;          // 0-10
  focus_ingredients_found: string[];
  sleep_ingredients_found: string[];
}

// ── Helpers ──────────────────────────────────────────────────────────

/** Scan all ingredients in a recipe for substring matches against a keyword list. */
function findMatchingIngredients(
  ingredients: string[],
  keywords: string[]
): string[] {
  const found = new Set<string>();
  for (const raw of ingredients) {
    const cleaned = extractBaseIngredient(raw);
    if (!cleaned || TRIVIAL_ITEMS.has(cleaned)) continue;
    const lower = cleaned.toLowerCase();
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        found.add(kw);
      }
    }
  }
  return Array.from(found);
}

/** Check if any ingredient matches a sleep-disrupting keyword. */
function hasSleepDisruptors(ingredients: string[]): boolean {
  for (const raw of ingredients) {
    const lower = raw.toLowerCase();
    for (const avoid of SLEEP_AVOID) {
      if (lower.includes(avoid)) return true;
    }
  }
  return false;
}

// ── Main classifier ──────────────────────────────────────────────────

export function classifyRecipe(recipe: NewRecipe): RecipeClassification {
  const n = recipe.nutrition_per_serving;

  // Focus classification
  const focusIngredients = findMatchingIngredients(recipe.ingredients, FOCUS_INGREDIENTS);
  const meetsNutrition =
    n.protein_g >= FOCUS_NUTRITION.minProtein &&
    n.fiber_g >= FOCUS_NUTRITION.minFiber &&
    n.sugar_g <= FOCUS_NUTRITION.maxSugar;

  const focusIngredientCount = focusIngredients.length;
  const promotes_focus = focusIngredientCount >= 2 && meetsNutrition;

  // Focus score: 0-10 based on ingredient matches + nutrition quality
  const focusNutritionBonus =
    (n.protein_g >= FOCUS_NUTRITION.minProtein ? 1 : 0) +
    (n.fiber_g >= FOCUS_NUTRITION.minFiber ? 1 : 0) +
    (n.sugar_g <= FOCUS_NUTRITION.maxSugar ? 1 : 0);
  const focus_score = Math.min(10, Math.round(focusIngredientCount * 2 + focusNutritionBonus));

  // Sleep classification
  const sleepIngredients = findMatchingIngredients(recipe.ingredients, SLEEP_INGREDIENTS);
  const hasDisruptors = hasSleepDisruptors(recipe.ingredients);
  const sleepIngredientCount = sleepIngredients.length;
  const promotes_sleep = sleepIngredientCount >= 2 && !hasDisruptors;

  // Sleep score: 0-10 based on ingredient matches (penalized by disruptors)
  const sleep_score = hasDisruptors ? 0 : Math.min(10, Math.round(sleepIngredientCount * 2.5));

  return {
    promotes_focus,
    focus_score,
    promotes_sleep,
    sleep_score,
    focus_ingredients_found: focusIngredients,
    sleep_ingredients_found: sleepIngredients,
  };
}
