import type { Context, Next } from "npm:hono";
import * as kv from "./kv_store.tsx";

function clientKey(c: Context): string {
  // Prefer the verified user id (set by requireAuth) so authed limits are
  // per-account; otherwise fall back to the caller's IP.
  const userId = c.get("userId");
  if (userId) return `u:${userId}`;
  const fwd = c.req.header("x-forwarded-for");
  if (fwd) return `ip:${fwd.split(",")[0].trim()}`;
  return `ip:${c.req.header("x-real-ip") || "unknown"}`;
}

/**
 * Fixed-window per-caller rate limiter (KV-backed). Returns 429 once a caller
 * exceeds `max` requests within `windowSec`. Used to protect paid-Google-API
 * and heavy-compute endpoints from abuse / denial-of-wallet.
 *
 * Note: keys are written per window without TTL; a periodic cleanup of `rl:*`
 * keys is a worthwhile follow-up.
 */
export function rateLimit(opts: { name: string; max: number; windowSec: number }) {
  return async (c: Context, next: Next): Promise<Response | void> => {
    const window = Math.floor(Date.now() / 1000 / opts.windowSec);
    const key = `rl:${opts.name}:${clientKey(c)}:${window}`;

    let count = 0;
    try {
      count = (await kv.get(key)) ?? 0;
    } catch {
      // If the limiter store is unavailable, fail open rather than block users.
      return await next();
    }

    if (count >= opts.max) {
      return c.json({ error: "Too many requests. Please slow down and try again shortly." }, 429);
    }

    try {
      await kv.set(key, count + 1);
    } catch {
      // best-effort increment; ignore write failures
    }
    await next();
  };
}
