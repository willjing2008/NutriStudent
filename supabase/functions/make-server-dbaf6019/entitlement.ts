import type { Context, Next } from "npm:hono";

// Server-side paywall enforcement (audit C-5). The client gate (useSubscription)
// is cosmetic — `isPro` is even hard-coded true on web — so premium routes must
// verify the caller's RevenueCat entitlement here, keyed by the *authenticated*
// user id (NEVER a client-sent isPro flag). RevenueCat is identified on the
// client with the Supabase user id (App.tsx), so the token's userId is the
// RevenueCat app_user_id.

// Entitlement identifier configured in RevenueCat (matches services/revenuecat.ts).
const ENTITLEMENT_ID = "NutriStudent Pro";
const RC_SUBSCRIBERS_URL = "https://api.revenuecat.com/v1/subscribers";

interface RcEntitlement {
  expires_date?: string | null;
}
interface RcSubscriber {
  entitlements?: Record<string, RcEntitlement>;
}

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
 * Require an active "NutriStudent Pro" entitlement. Chain AFTER `requireAuth`
 * (it reads the verified userId from the context).
 *
 * Failure model:
 *  - No active entitlement (verified) → 402 Payment Required (the real gate).
 *  - RevenueCat unreachable / 5xx / 429 → fail OPEN so a provider outage never
 *    locks out paying users.
 *  - REVENUECAT_SECRET_KEY unset → fail OPEN with a loud log, so non-production
 *    environments still work.
 *    ponytail: production MUST set REVENUECAT_SECRET_KEY or the paywall is a
 *    no-op; this is the known ceiling, upgrade to fail-closed once the key is
 *    guaranteed in every deployed env.
 */
export async function requirePro(c: Context, next: Next): Promise<Response | void> {
  const userId = c.get("userId");
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const secret = Deno.env.get("REVENUECAT_SECRET_KEY");
  if (!secret) {
    console.error("[entitlement] REVENUECAT_SECRET_KEY not set; allowing premium route without verification");
    return await next();
  }

  let active = false;
  try {
    const res = await fetch(`${RC_SUBSCRIBERS_URL}/${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    if (res.status === 404) {
      active = false; // unknown subscriber → never purchased
    } else if (!res.ok) {
      console.error(`[entitlement] RevenueCat ${res.status} for ${userId}; failing open`);
      return await next();
    } else {
      const data = await res.json();
      active = isEntitlementActive(data?.subscriber, ENTITLEMENT_ID, Date.now());
    }
  } catch (err) {
    console.error("[entitlement] RevenueCat lookup failed; failing open:", err);
    return await next();
  }

  if (!active) {
    return c.json({ error: "An active NutriStudent Pro subscription is required." }, 402);
  }
  await next();
}
