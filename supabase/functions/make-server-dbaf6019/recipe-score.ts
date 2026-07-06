import { NewRecipe } from "./recipe-data.ts";
import { classifyRecipe } from "./focus-classifier.ts";
import type { RecipeBias } from "./ingredient-overlap.ts";

// Goal-aware per-recipe suitability, normalized to [0,1]. Used to NUDGE
// meal-plan selection toward the user's goal without overriding the
// ingredient-overlap clustering that keeps the shopping list compact.
//   study / work → brain-food focus (focus_score from focus-classifier)
//   fitness      → protein density
// Unknown goals score 0, so selection stays purely overlap-driven.

// ponytail: the two tuning knobs. PROTEIN_REFERENCE_G is the protein/serving
// that earns a full fitness score; GOAL_SCORE_WEIGHT is how hard the nudge
// pushes against ingredient overlap. The selector normalizes overlap to a mean
// per comparison (~0–1.5), so 0.5 lets the goal break near-ties and favor goal
// recipes that also share ingredients, while a strongly-overlapping recipe
// still wins. Tuning is monotonic: raise for more goal-leaning plans, lower
// toward a pure tie-break.
const PROTEIN_REFERENCE_G = 30;
const GOAL_SCORE_WEIGHT = 0.5;

export function computeRecipeScore(recipe: NewRecipe, goal: string): number {
  switch (goal) {
    case "study":
    case "work":
      return classifyRecipe(recipe).focus_score / 10; // 0–10 → 0–1
    case "fitness":
      return Math.min(1, (recipe.nutrition_per_serving?.protein_g ?? 0) / PROTEIN_REFERENCE_G);
    default:
      return 0;
  }
}

// Build the selection bias for a goal, or undefined when the goal carries no
// signal (keeps default callers and the 28-day queue path purely overlap-based).
// Memoizes per recipe id so the greedy selector never re-classifies a recipe.
export function buildGoalBias(goal: string): RecipeBias | undefined {
  if (goal !== "study" && goal !== "work" && goal !== "fitness") return undefined;
  const cache = new Map<number, number>();
  const scoreFn = (recipe: NewRecipe): number => {
    const cached = cache.get(recipe.id);
    if (cached !== undefined) return cached;
    const score = computeRecipeScore(recipe, goal);
    cache.set(recipe.id, score);
    return score;
  };
  return { scoreFn, weight: GOAL_SCORE_WEIGHT };
}
