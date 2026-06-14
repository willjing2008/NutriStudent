import type { Context, Next } from "npm:hono";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

// Types attached to the Hono context by the auth middleware.
declare module "npm:hono" {
  interface ContextVariableMap {
    user: {
      id: string;
      email?: string;
      app_metadata?: { role?: string };
      user_metadata?: Record<string, unknown>;
    };
    userId: string;
  }
}

// Single service-role client reused across requests (cheaper than re-creating
// one per call, which the old per-handler code did).
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** True when `value` is a well-formed UUID string. */
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

/**
 * Verify the Supabase JWT from the Authorization header and attach the verified
 * user (and userId) to the context. Rejects missing/invalid tokens with 401.
 *
 * Apply this to every endpoint that reads or writes a user's own data. Handlers
 * must then derive the user id from `getUserId(c)` — NEVER from the request body.
 *
 * Must be registered AFTER cors() so OPTIONS preflight is never blocked by a 401.
 */
export async function requireAuth(c: Context, next: Next): Promise<Response | void> {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("user", {
    id: user.id,
    email: user.email,
    app_metadata: user.app_metadata as { role?: string } | undefined,
    user_metadata: user.user_metadata,
  });
  c.set("userId", user.id);
  await next();
}

/**
 * Require an authenticated admin. Chain AFTER `requireAuth`.
 *
 * The role lives in `app_metadata` (settable only with the service-role key),
 * NOT `user_metadata` (which users can write via update-profile) — using the
 * latter would be a privilege-escalation hole.
 */
export async function requireAdmin(c: Context, next: Next): Promise<Response | void> {
  const user = c.get("user");
  if (!user || user.app_metadata?.role !== "admin") {
    return c.json({ error: "Forbidden" }, 403);
  }
  await next();
}

/** The server-verified user id (a Supabase auth UUID). Use instead of body.userId. */
export function getUserId(c: Context): string {
  return c.get("userId");
}
