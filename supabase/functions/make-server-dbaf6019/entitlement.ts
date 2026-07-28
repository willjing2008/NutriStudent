import type { Context, Next } from "npm:hono";
import { LAUNCH_CONFIG } from "../_shared/launch-config.ts";

// Server-side paywall enforcement (audit C-5). The client gate (useSubscription)
// is cosmetic — `isPro` is even hard-coded true on web — so premium routes must
// verify the caller's RevenueCat entitlement here, keyed by the *authenticated*
// user id (NEVER a client-sent isPro flag). RevenueCat is identified on the
// client with the Supabase user id (App.tsx), so the token's userId is the
// RevenueCat app_user_id.

// Entitlement identifier configured in RevenueCat (matches services/revenuecat.ts).
const ENTITLEMENT_ID = "ChefPocket Pro";
const RC_SUBSCRIBERS_URL = "https://api.revenuecat.com/v1/subscribers";

interface RcEntitlement {
  expires_date?: string | null;
}
interface RcSubscriber {
  entitlements?: Record<string, RcEntitlement>;
}

interface RevenueCatResponse {
  status: number;
  ok: boolean;
  json(): Promise<unknown>;
}

type RevenueCatFetch = (
  input: string,
  init?: { headers: Record<string, string> },
) => Promise<RevenueCatResponse>;

export type EntitlementCheckResult =
  | { status: "active" }
  | { status: "inactive" }
  | { status: "unavailable"; reason: string };

/**
 * Pure decision: does this RevenueCat subscriber hold an active entitlement?
 * Active = the entitlement exists and either has no expiry (lifetime) or an
 * expiry in the future. Exported for unit testing the money path.
 */
export function isEntitlementActive(
  subscriber: RcSubscriber | null | undefined,
  entitlementId: string,
  nowMs: number,
): boolean {
  const ent = subscriber?.entitlements?.[entitlementId];
  if (!ent) return false;
  const expires = ent.expires_date;
  if (expires === null || expires === undefined) return true; // lifetime grant
  const t = Date.parse(expires);
  return Number.isFinite(t) && t > nowMs;
}

/**
 * Look up a RevenueCat subscriber without ever converting provider/configuration
 * failures into paid access. The caller maps "unavailable" to a retryable 503.
 */
export async function checkRevenueCatEntitlement(
  userId: string,
  secret: string | undefined,
  fetcher: RevenueCatFetch = fetch,
  nowMs = Date.now(),
): Promise<EntitlementCheckResult> {
  if (!secret) {
    return {
      status: "unavailable",
      reason: "REVENUECAT_SECRET_KEY is not configured",
    };
  }

  try {
    const res = await fetcher(
      `${RC_SUBSCRIBERS_URL}/${encodeURIComponent(userId)}`,
      { headers: { Authorization: `Bearer ${secret}` } },
    );

    if (res.status === 404) return { status: "inactive" };
    if (!res.ok) {
      return {
        status: "unavailable",
        reason: `RevenueCat returned HTTP ${res.status}`,
      };
    }

    const data = await res.json() as { subscriber?: RcSubscriber };
    return isEntitlementActive(data?.subscriber, ENTITLEMENT_ID, nowMs)
      ? { status: "active" }
      : { status: "inactive" };
  } catch {
    return {
      status: "unavailable",
      reason: "RevenueCat request failed",
    };
  }
}

/**
 * Require an active "ChefPocket Pro" entitlement. Chain AFTER `requireAuth`
 * (it reads the verified userId from the context).
 *
 * Failure model:
 *  - No active entitlement (verified) -> 402 Payment Required.
 *  - RevenueCat unreachable / 5xx / 429 -> retryable 503.
 *  - REVENUECAT_SECRET_KEY unset -> retryable 503.
 *
 * Paid access must never be granted because payment verification is broken.
 */
export async function requirePro(c: Context, next: Next): Promise<Response | void> {
  const userId = c.get("userId");
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const secret = Deno.env.get("REVENUECAT_SECRET_KEY");
  const result = await checkRevenueCatEntitlement(userId, secret);

  if (result.status === "unavailable") {
    console.error(`[entitlement] Subscription verification unavailable: ${result.reason}`);
    return c.json({
      error: "Subscription verification is temporarily unavailable. Please try again.",
    }, 503);
  }

  if (result.status === "inactive") {
    return c.json({
      error: "An active ChefPocket Pro subscription is required.",
    }, 402);
  }

  await next();
}

type PremiumMiddleware = (
  c: Context,
  next: Next,
) => Promise<Response | void>;

/**
 * Product-policy gate for premium routes.
 * Free launch bypasses RevenueCat intentionally while authentication and rate
 * limiting remain earlier in each route chain. Paid mode delegates unchanged
 * to the fail-closed entitlement middleware above.
 */
export function createPremiumAccessMiddleware(
  subscriptionsEnabled: boolean,
  paidMiddleware: PremiumMiddleware = requirePro,
): PremiumMiddleware {
  return async (c, next) => {
    if (!subscriptionsEnabled) {
      await next();
      return;
    }
    return paidMiddleware(c, next);
  };
}

export const requirePremiumAccess = createPremiumAccessMiddleware(
  LAUNCH_CONFIG.subscriptionsEnabled,
);
