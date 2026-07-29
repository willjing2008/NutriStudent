import Anthropic from "npm:@anthropic-ai/sdk";
import { NewRecipe } from "./recipe-data.ts";
import { applyCosts, buildBatchPrompt, parseBatchResponse, BATCH_RESPONSE_SCHEMA } from "./recipe-cost.ts";

// Prices recipes via Claude Haiku and orchestrates the resumable batch backfill.
// Kept separate from recipe-cost.ts (pure helpers) so the Anthropic SDK import
// (a Deno `npm:` specifier) doesn't load when the unit-tested helpers are
// imported under Node/Vitest. Switched from Gemini because its free-tier
// per-minute request cap blocked the backfill; Anthropic's limits clear it.

// Haiku: cheap and fast, well-suited to bulk structured extraction like pricing.
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 8192;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// maxRetries: 0 — our own batch loop owns retry/backoff so a single run stays
// within the edge-function time budget rather than the SDK retrying underneath us.
function createClient(apiKey: string): Anthropic {
  return new Anthropic({ apiKey, maxRetries: 0 });
}

async function callClaude(client: Anthropic, prompt: string): Promise<string> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
    // Structured output: constrain the response to the exact batch shape.
    output_config: { format: { type: "json_schema", schema: BATCH_RESPONSE_SCHEMA } },
  });
  if (message.stop_reason === "refusal") throw new Error("Claude refused the request");
  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") throw new Error("Claude returned no text block");
  return block.text;
}

export interface BackfillSummary {
  priced: number;
  alreadyPriced: number;
  failed: number;
  remaining: number;
  // The first batch error message, surfaced so a silent all-failed run is debuggable
  // (e.g. an auth/quota/schema error) instead of just reporting "0 priced".
  firstError?: string;
}

/**
 * Price recipes that lack an estimate, in throttled batches with backoff.
 * Resumable: only recipes missing cost_per_serving_gbp are touched, so re-running
 * continues where a previous run left off. `maxBatches` caps a single run.
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
  // Larger batches = fewer model requests for the same recipes; the throttle
  // spaces requests out to stay comfortably under rate limits.
  const batchSize = opts.batchSize ?? 20;
  const throttleMs = opts.throttleMs ?? 3500;
  const todo = allRecipes.filter(r => r.cost_per_serving_gbp == null);
  const batches = chunk(todo, batchSize);
  const cap = Math.min(opts.maxBatches ?? batches.length, batches.length);

  const client = createClient(apiKey);
  const pricedRecipes: NewRecipe[] = [];
  let failed = 0;
  let firstError: string | undefined;

  for (let b = 0; b < cap; b++) {
    const batch = batches[b];
    for (let attempt = 0; ; attempt++) {
      try {
        const costs = parseBatchResponse(await callClaude(client, buildBatchPrompt(batch)));
        const batchPriced = applyCosts(batch, costs).filter(r => r.cost_per_serving_gbp != null);
        pricedRecipes.push(...batchPriced);
        if (opts.onPriced && batchPriced.length > 0) await opts.onPriced(batchPriced);
        break;
      } catch (error) {
        const status = (error as Error & { status?: number }).status;
        // Retry transient server-side conditions: 429 (rate limit) and 5xx (e.g.
        // 529 overloaded). Keep retries short and capped: the whole run shares one
        // edge-function time budget, so a long backoff would time out the request
        // and lose not-yet-persisted work. Failures stay queued (resumable).
        const transient = status === 429 || (status !== undefined && status >= 500);
        if (transient && attempt < 3) {
          await sleep(Math.min(throttleMs * 2 ** attempt, 8000));
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
