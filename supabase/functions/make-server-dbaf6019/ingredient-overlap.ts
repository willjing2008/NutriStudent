import { NewRecipe } from "./recipe-data.ts";

// ── 1a. Ingredient keyword extraction ──────────────────────────────

const UNIT_WORDS = new Set([
  "cup", "cups", "tablespoon", "tablespoons", "tbsp", "teaspoon", "teaspoons",
  "tsp", "pound", "pounds", "lb", "lbs", "ounce", "ounces", "oz", "clove",
  "cloves", "slice", "slices", "piece", "pieces", "can", "cans", "package",
  "packages", "pkg", "bunch", "bunches", "head", "heads", "stalk", "stalks",
  "sprig", "sprigs", "pinch", "pinches", "dash", "dashes", "handful",
  "handfuls", "quart", "quarts", "pint", "pints", "gallon", "gallons",
  "liter", "liters", "milliliter", "milliliters", "ml", "gram", "grams", "g",
  "kilogram", "kilograms", "kg", "small", "medium", "large", "extra-large",
]);

const REMOVE_ADJECTIVES = new Set([
  "fresh", "frozen", "dried", "canned", "cooked", "raw", "chopped", "diced",
  "minced", "sliced", "grated", "shredded", "crushed", "ground", "whole",
  "boneless", "skinless", "melted", "softened", "room-temperature", "warm",
  "cold", "hot", "thick", "thin", "finely", "roughly", "thinly", "firmly",
  "lightly", "packed", "sifted", "divided", "optional", "prepared", "ripe",
  "uncooked", "peeled", "seeded", "trimmed", "halved", "quartered",
]);

const TRAILING_PHRASES = [
  "to taste", "as needed", "for garnish", "for serving", "for topping",
  "or to taste", "or as needed", "or more to taste", "divided",
  "at room temperature", "for frying", "for greasing",
];

export const TRIVIAL_ITEMS = new Set([
  "water", "salt", "pepper", "black pepper", "cooking spray", "nonstick cooking spray",
  "ice", "ice cubes", "oil", "vegetable oil", "canola oil",
]);

/** Parse "2 cups vanilla yogurt" → "vanilla yogurt" */
export function extractBaseIngredient(raw: string): string {
  let s = raw.toLowerCase().trim();

  // Strip parenthetical info like "(8 ounce)"
  s = s.replace(/\([^)]*\)/g, "");

  // Strip leading numbers / fractions / decimals: "2 1/2", "0.5", "½"
  s = s.replace(/^[\d\s./½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞-]+/, "");

  // Strip leading unit words
  const words = s.trim().split(/\s+/);
  while (words.length > 1 && UNIT_WORDS.has(words[0])) {
    words.shift();
  }
  s = words.join(" ");

  // Strip trailing preparation after comma: ", softened", ", diced"
  s = s.replace(/,.*$/, "").trim();

  // Strip trailing phrases
  for (const phrase of TRAILING_PHRASES) {
    if (s.endsWith(phrase)) {
      s = s.slice(0, -phrase.length).trim();
    }
  }

  // Remove common adjectives
  const cleaned = s
    .split(/\s+/)
    .filter((w) => !REMOVE_ADJECTIVES.has(w))
    .join(" ");

  // Collapse whitespace
  return cleaned.replace(/\s+/g, " ").trim();
}

/** Returns the set of base ingredient names for a recipe, excluding trivials. */
export function computeIngredientKeywords(recipe: NewRecipe): Set<string> {
  const keywords = new Set<string>();
  for (const raw of recipe.ingredients) {
    const base = extractBaseIngredient(raw);
    if (base && !TRIVIAL_ITEMS.has(base)) {
      keywords.add(base);
    }
  }
  return keywords;
}

// ── 1b. Overlap scoring ────────────────────────────────────────────

/** Count overlapping ingredients between two keyword sets. Partial credit for substring matches. */
export function overlapScore(
  keywordsA: Set<string>,
  keywordsB: Set<string>
): number {
  let score = 0;
  for (const a of keywordsA) {
    for (const b of keywordsB) {
      if (a === b) {
        score += 1;
      } else if (a.includes(b) || b.includes(a)) {
        score += 0.5;
      }
    }
  }
  return score;
}

// ── 1c. Greedy cluster selection ───────────────────────────────────

export interface ScoredRecipe {
  recipe: NewRecipe;
  keywords: Set<string>;
}

/**
 * Greedy selection of `targetCount` recipes from `candidates` that maximize
 * ingredient overlap among themselves AND with `alreadySelected` recipes.
 */
export function selectOverlapCluster(
  candidates: ScoredRecipe[],
  targetCount: number,
  alreadySelected: ScoredRecipe[]
): ScoredRecipe[] {
  if (candidates.length <= targetCount) return [...candidates];

  // Score each candidate: total overlap with all other candidates + cross-category bonus
  const seedScores = candidates.map((c, i) => {
    let score = 0;
    // Overlap with other candidates in this pool
    for (let j = 0; j < candidates.length; j++) {
      if (i !== j) score += overlapScore(c.keywords, candidates[j].keywords);
    }
    // Cross-category bonus (1.5× weight)
    for (const sel of alreadySelected) {
      score += overlapScore(c.keywords, sel.keywords) * 1.5;
    }
    return { index: i, score };
  });

  seedScores.sort((a, b) => b.score - a.score);
  const selected: ScoredRecipe[] = [candidates[seedScores[0].index]];
  const usedIndices = new Set([seedScores[0].index]);

  // Greedily add recipes maximizing marginal overlap
  while (selected.length < targetCount) {
    let bestIdx = -1;
    let bestScore = -1;

    for (let i = 0; i < candidates.length; i++) {
      if (usedIndices.has(i)) continue;

      let marginal = 0;
      for (const sel of selected) {
        marginal += overlapScore(candidates[i].keywords, sel.keywords);
      }
      for (const sel of alreadySelected) {
        marginal += overlapScore(candidates[i].keywords, sel.keywords) * 1.5;
      }

      if (marginal > bestScore) {
        bestScore = marginal;
        bestIdx = i;
      }
    }

    if (bestIdx === -1) break;
    selected.push(candidates[bestIdx]);
    usedIndices.add(bestIdx);
  }

  return selected;
}

/**
 * Select core recipes across all three categories, maximizing cross-category overlap.
 * Dinner first (4), then lunch (4), then breakfast (3).
 */
export function selectAllCoreRecipes(
  breakfastPool: ScoredRecipe[],
  lunchPool: ScoredRecipe[],
  dinnerPool: ScoredRecipe[]
): { breakfast: ScoredRecipe[]; lunch: ScoredRecipe[]; dinner: ScoredRecipe[] } {
  // Dinner first — largest pool, most freedom
  const dinner = selectOverlapCluster(dinnerPool, 4, []);

  // Lunch — cross-overlap with dinner
  const lunch = selectOverlapCluster(lunchPool, 4, dinner);

  // Breakfast — cross-overlap with dinner + lunch
  const breakfast = selectOverlapCluster(breakfastPool, 3, [...dinner, ...lunch]);

  return { breakfast, lunch, dinner };
}

// ── 1d. 7-day rotation ─────────────────────────────────────────────

/** Fisher-Yates shuffle (returns new array) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a rotation of `coreRecipes` across `days` days.
 * Ensures no same recipe on consecutive days (swap with next in cycle).
 */
function rotateCategory(core: ScoredRecipe[], days: number): NewRecipe[] {
  if (core.length === 0) return [];
  const shuffled = shuffle(core);
  const result: NewRecipe[] = [];

  for (let d = 0; d < days; d++) {
    const idx = d % shuffled.length;
    result.push(shuffled[idx].recipe);
  }

  // Fix consecutive duplicates
  for (let d = 1; d < result.length; d++) {
    if (result[d].id === result[d - 1].id && core.length > 1) {
      // Swap with next in cycle
      const nextIdx = (d + 1) % result.length;
      if (result[nextIdx].id !== result[d - 1].id) {
        [result[d], result[nextIdx]] = [result[nextIdx], result[d]];
      }
    }
  }

  return result;
}

export interface DayMeals {
  dayNumber: number;
  meals: { recipe: NewRecipe; mealNumber: number }[];
}

/**
 * Build a 7-day rotation schedule from core recipes.
 * mealsPerDay: 1 = dinner only, 2 = breakfast+dinner, 3+ = breakfast+lunch+dinner (extras from dinner)
 */
export function buildRotationSchedule(
  coreRecipes: { breakfast: ScoredRecipe[]; lunch: ScoredRecipe[]; dinner: ScoredRecipe[] },
  mealsPerDay: number,
  cookingDays: number
): DayMeals[] {
  const dinnerRotation = rotateCategory(coreRecipes.dinner, cookingDays);
  const lunchRotation = rotateCategory(coreRecipes.lunch, cookingDays);
  const breakfastRotation = rotateCategory(coreRecipes.breakfast, cookingDays);

  const schedule: DayMeals[] = [];

  for (let d = 0; d < cookingDays; d++) {
    const meals: { recipe: NewRecipe; mealNumber: number }[] = [];

    if (mealsPerDay === 1) {
      // Dinner only
      if (dinnerRotation[d]) meals.push({ recipe: dinnerRotation[d], mealNumber: 1 });
    } else if (mealsPerDay === 2) {
      // Breakfast + Dinner
      if (breakfastRotation[d]) meals.push({ recipe: breakfastRotation[d], mealNumber: 1 });
      if (dinnerRotation[d]) meals.push({ recipe: dinnerRotation[d], mealNumber: 2 });
    } else {
      // 3+ meals: Breakfast + Lunch + Dinner (+ extras from dinner pool)
      if (breakfastRotation[d]) meals.push({ recipe: breakfastRotation[d], mealNumber: 1 });
      if (lunchRotation[d]) meals.push({ recipe: lunchRotation[d], mealNumber: 2 });
      if (dinnerRotation[d]) meals.push({ recipe: dinnerRotation[d], mealNumber: 3 });

      // Extra meals beyond 3 pull from dinner rotation (offset to avoid same recipe)
      for (let extra = 3; extra < mealsPerDay; extra++) {
        const offsetIdx = (d + extra) % dinnerRotation.length;
        if (dinnerRotation[offsetIdx]) {
          meals.push({ recipe: dinnerRotation[offsetIdx], mealNumber: extra + 1 });
        }
      }
    }

    schedule.push({ dayNumber: d + 1, meals });
  }

  return schedule;
}
