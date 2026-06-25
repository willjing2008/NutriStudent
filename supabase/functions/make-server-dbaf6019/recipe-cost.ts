import { NewRecipe } from "./recipe-data.ts";

// Estimates a per-serving GBP cost for each recipe using Gemini, stored once at
// backfill time so meal-plan generation just reads it (no AI on the hot path).
// Verified Gemini specifics (ai.google.dev, 2026): gemini-2.5-flash-lite, REST
// v1beta generateContent, x-goog-api-key header, flat responseMimeType +
// responseSchema (uppercase Type enum), text returned as a raw JSON string.

// ponytail: a single UK-average per-serving fallback used when a recipe hasn't
// been priced yet or a Gemini call fails — so the budget is always a real number
// and never hard-breaks. Per-recipe estimates replace it once the backfill runs.
export const FLAT_FALLBACK_GBP = 2.5;

const MODEL = "gemini-2.5-flash-lite";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

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

// Gemini responseSchema (flat form). Uses the documented uppercase Type enum
// (STRING/NUMBER/INTEGER/ARRAY/OBJECT) per the /api/generate-content reference —
// universally accepted, unlike lowercase which only works via undocumented
// endpoint leniency. Forces the exact per-recipe priced shape.
export const BATCH_RESPONSE_SCHEMA = {
  type: "ARRAY",
  items: {
    type: "OBJECT",
    properties: {
      id: { type: "INTEGER" },
      ingredients: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            gbp: { type: "NUMBER" },
          },
          required: ["name", "gbp"],
        },
      },
    },
    required: ["id", "ingredients"],
  },
};

/** Parse the model's JSON text into a map of recipe id → priced ingredients (bad entries dropped). */
export function parseBatchResponse(text: string): Map<number, PricedIngredient[]> {
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) throw new Error("Gemini cost response is not an array");
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

// ── Gemini call + batch orchestration (verified via deploy smoke, not unit-tested) ──

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function callGemini(prompt: string, apiKey: string): Promise<string> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", responseSchema: BATCH_RESPONSE_SCHEMA },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const error = new Error(`Gemini ${res.status}: ${err?.error?.message ?? res.statusText}`);
    (error as Error & { status?: number }).status = res.status;
    // Honour the server's RetryInfo (e.g. "1.773s") so 429 backoff waits exactly
    // as long as Gemini asks, instead of guessing — fixes per-minute rate limits.
    const retry = (err?.error?.details ?? []).find((d: { retryDelay?: string }) => d?.retryDelay)?.retryDelay;
    const secs = typeof retry === "string" ? parseFloat(retry) : NaN;
    if (Number.isFinite(secs)) (error as Error & { retryMs?: number }).retryMs = Math.ceil(secs * 1000);
    throw error;
  }
  const data = await res.json();
  const candidate = data?.candidates?.[0];
  if (candidate?.finishReason && candidate.finishReason !== "STOP") {
    throw new Error(`Gemini stopped early: ${candidate.finishReason}`);
  }
  const text = candidate?.content?.parts?.[0]?.text;
  if (typeof text !== "string") throw new Error("Gemini returned no text part");
  return text;
}

export interface BackfillSummary {
  priced: number;
  alreadyPriced: number;
  failed: number;
  remaining: number;
  // The first batch error message, surfaced so a silent all-failed run is debuggable
  // (e.g. a Gemini auth/quota/schema error) instead of just reporting "0 priced".
  firstError?: string;
}

/**
 * Price recipes that lack an estimate, in throttled batches with 429 backoff.
 * Resumable: only recipes missing cost_per_serving_gbp are touched, so re-running
 * continues where a daily quota left off. `maxBatches` caps a single run.
 * Returns just the newly-priced recipes (to persist) plus a summary.
 */
export async function estimateMissingCosts(
  allRecipes: NewRecipe[],
  apiKey: string,
  opts: {
    batchSize?: number;
    maxBatches?: number;
    throttleMs?: number;
    // Persist each batch's priced recipes as they complete, so an edge-function
    // timeout never discards finished work (the run stays resumable).
    onPriced?: (recipes: NewRecipe[]) => Promise<void>;
  } = {},
): Promise<{ pricedRecipes: NewRecipe[]; summary: BackfillSummary }> {
  // Larger batches = fewer Gemini requests for the same recipes, and a slower
  // throttle keeps us under the free-tier per-minute request cap (~20/min).
  const batchSize = opts.batchSize ?? 20;
  const throttleMs = opts.throttleMs ?? 3500;
  const todo = allRecipes.filter(r => r.cost_per_serving_gbp == null);
  const batches = chunk(todo, batchSize);
  const cap = Math.min(opts.maxBatches ?? batches.length, batches.length);

  const pricedRecipes: NewRecipe[] = [];
  let failed = 0;
  let firstError: string | undefined;

  for (let b = 0; b < cap; b++) {
    const batch = batches[b];
    for (let attempt = 0; ; attempt++) {
      try {
        const costs = parseBatchResponse(await callGemini(buildBatchPrompt(batch), apiKey));
        const batchPriced = applyCosts(batch, costs).filter(r => r.cost_per_serving_gbp != null);
        pricedRecipes.push(...batchPriced);
        if (opts.onPriced && batchPriced.length > 0) await opts.onPriced(batchPriced);
        break;
      } catch (error) {
        const status = (error as Error & { status?: number }).status;
        // Retry transient server-side conditions: 429 (rate limit) and 5xx (e.g.
        // 503 "model overloaded", common with Gemini). Keep retries short and
        // capped: the whole run shares one edge-function time budget, so a long
        // backoff would time out the request and lose the not-yet-persisted work.
        // Failures stay queued and the run is resumable, so re-running continues.
        const transient = status === 429 || (status !== undefined && status >= 500);
        if (transient && attempt < 3) {
          // Prefer the server's requested delay; otherwise capped exponential
          // backoff. Cap keeps a run within the edge-function time budget.
          const asked = (error as Error & { retryMs?: number }).retryMs ?? 0;
          await sleep(Math.min(Math.max(asked, throttleMs * 2 ** attempt), 8000));
          continue;
        }
        // Genuine failure (schema 400, malformed JSON, auth, network) — surface it
        // so a hand-run backfill is debuggable, then move on to the next batch.
        console.error(`Recipe cost batch ${b} failed:`, (error as Error).message);
        if (!firstError) firstError = (error as Error).message;
        failed += batch.length;
        break;
      }
    }
    if (b < cap - 1) await sleep(throttleMs);
  }

  return {
    pricedRecipes,
    summary: {
      priced: pricedRecipes.length,
      alreadyPriced: allRecipes.length - todo.length,
      failed,
      remaining: Math.max(0, todo.length - pricedRecipes.length - failed),
      firstError,
    },
  };
}
