# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Security: backend auth & paywall

- The Supabase edge function (`supabase/functions/make-server-dbaf6019/`) runs on the service-role key (bypasses RLS), so each route's middleware IS the authorization.
  - `auth-middleware.ts`: `requireAuth` verifies the caller's JWT and sets a token-derived `userId` — handlers must use `getUserId(c)`, NEVER `body.userId`. `requireAdmin` chains after it and checks `app_metadata.role` (NOT `user_metadata`, which users can self-write).
  - `entitlement.ts`: `requirePro` enforces the paywall server-side via the RevenueCat REST API, keyed by the authenticated `userId` (RevenueCat is identified client-side with `session.user.id`). Gated routes: `generate-meal-plan`, `generate-recipe-queue`, `shuffle-recipe`, `get-swap-options`. Needs env `REVENUECAT_SECRET_KEY`; entitlement id is `"NutriStudent Pro"`. Fails OPEN if the key is unset or RevenueCat is unreachable (so non-prod/outage doesn't lock out users) — **production MUST set `REVENUECAT_SECRET_KEY`** or the paywall is a no-op. The client gate (`useSubscription`, `isPro` hard-coded true on web) is cosmetic only.
- Client API calls: use `src/app/utils/apiClient.ts` — `authedFetch`/`authedPost`/`authedGet` send the real session JWT and are required for any `requireAuth` route. The anon key (`publicPost` / hand-rolled headers) is ONLY for genuinely public endpoints (`health`, `schools/search`, `recipe-image/:id`, `get-recipe-image-with-cache`, `auth/signup`, the Google-proxy location routes). Never send the anon key to an authed route.

## Build / CI sharp edges

- `tsconfig.json` EXCLUDES `supabase/`, so `npm run typecheck` (CI) does NOT typecheck the Deno edge function. Validate edge-function changes via tests/deploy, not tsc.
- Vitest runs the pure backend modules under `supabase/functions/.../__tests__/` (type-only `npm:`/`jsr:` imports are erased by esbuild, so they work in vitest). Modules needing the Deno runtime (`index.ts`, `kv_store`, `rate-limit`, `auth-middleware`, `entitlement` middleware) are covered via tests of their pure helpers + deploy, per `vitest.config.ts`.
- If `npm run build` ever hangs or flaky-exits 1 *after* `✓ built in …`: something is keeping Node's event loop alive (a dangling socket). Check with `process._getActiveHandles()` after a `vite build`. This repo had committed malware in `postcss.config.mjs` (obfuscated `eval` after `export default {};` on one long line) that opened an outbound TLS connection at build time — keep `postcss.config.mjs` to just the clean `export default {};`.
