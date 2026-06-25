import { NewRecipe } from "./recipe-data.ts";

// Pure helpers + the structured-output schema for per-recipe GBP cost estimation.
// The model call and the resumable batch backfill live in recipe-backfill.ts so
// the Anthropic SDK (a Deno `npm:` import) stays out of these unit-tested helpers.
// Costs are computed once at backfill time so meal-plan generation just reads them.

// ponytail: a single UK-average per-serving fallback used when a recipe hasn't
// been priced yet or a Gemini call fails — so the budget is always a real number
// and never hard-breaks. Per-recipe estimates replace it once the backfill runs.
export const FLAT_FALLBACK_GBP = 2.5;

export interface PricedIngredient {
  name: string;
  gbp: number;
}

// ── Pure helpers (unit-tested) ───────────────────────────────────────

/** Per-serving cost for budget math; falls back to the flat estimate when unpriced. */
export function recipeCostPerServing(recipe: NewRecipe): number {
  return recipe.cost_per_serving_gbp ?? FLAT_FALLBACK_GBP;
}

function parseServings(servings: string | undefined): number {
  const n = parseInt(String(servings ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

/** Sum priced ingredients (the recipe makes `servings`), divided to per-serving GBP. */
export function costPerServing(ingredients: PricedIngredient[], servings: string | undefined): number {
  const total = ingredients.reduce((sum, i) => sum + (Number.isFinite(i.gbp) ? i.gbp : 0), 0);
  return Math.round((total / parseServings(servings)) * 100) / 100;
}

/** One prompt for a batch of recipes; asks for per-recipe priced ingredients keyed by id. */
export function buildBatchPrompt(recipes: NewRecipe[]): string {
  const payload = recipes.map(r => ({ id: r.id, ingredients: r.ingredients }));
  return [
    "You are a UK grocery pricing assistant. For each recipe below, estimate the typical UK",
    "supermarket cost in GBP of each ingredient AT THE QUANTITY STATED in the ingredient line",
    "('2 cups' of something costs more than '1 tbsp'). Return one entry per recipe: its id and",
    "an array of {name, gbp} for its ingredients, where gbp is a number in pounds (e.g. 0.45).",
    "Recipes (JSON):",
    JSON.stringify(payload),
  ].join("\n");
}

// Claude structured-output schema (standard JSON Schema, lowercase types).
// Root must be an object (not an array), and every object needs
// additionalProperties:false for strict structured outputs — so the per-recipe
// array is wrapped under `recipes`.
export const BATCH_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    recipes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          ingredients: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                gbp: { type: "number" },
              },
              required: ["name", "gbp"],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "ingredients"],
        additionalProperties: false,
      },
    },
  },
  required: ["recipes"],
  additionalProperties: false,
};

/** Parse the model's JSON text into a map of recipe id → priced ingredients (bad entries dropped). */
export function parseBatchResponse(text: string): Map<number, PricedIngredient[]> {
  const root = JSON.parse(text);
  const parsed = root?.recipes;
  if (!Array.isArray(parsed)) throw new Error("Claude cost response missing a recipes array");
  const byId = new Map<number, PricedIngredient[]>();
  for (const entry of parsed) {
    if (!entry || typeof entry.id !== "number" || !Array.isArray(entry.ingredients)) continue;
    const ingredients = entry.ingredients
      .filter((i: unknown): i is PricedIngredient =>
        !!i && typeof (i as PricedIngredient).name === "string" &&
        typeof (i as PricedIngredient).gbp === "number" &&
        Number.isFinite((i as PricedIngredient).gbp) && (i as PricedIngredient).gbp >= 0)
      .map((i: PricedIngredient) => ({ name: i.name, gbp: i.gbp }));
    byId.set(entry.id, ingredients);
  }
  return byId;
}

/**
 * Attach costs to the recipes that came back priced. Recipes absent or empty in
 * the response are returned unchanged (no cost field) — callers treat absence as
 * the flat fallback via recipeCostPerServing.
 */
export function applyCosts(recipes: NewRecipe[], costs: Map<number, PricedIngredient[]>): NewRecipe[] {
  return recipes.map(recipe => {
    const priced = costs.get(recipe.id);
    if (!priced || priced.length === 0) return recipe;
    return {
      ...recipe,
      priced_ingredients: priced,
      cost_per_serving_gbp: costPerServing(priced, recipe.servings),
    };
  });
}

