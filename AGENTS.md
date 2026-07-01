# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Security: backend auth & paywall

- The Supabase edge function (`supabase/functions/make-server-dbaf6019/`) runs on the service-role key (bypasses RLS), so each route's middleware IS the authorization.
  - `auth-middleware.ts`: `requireAuth` verifies the caller's JWT and sets a token-derived `userId` — handlers must use `getUserId(c)`, NEVER `body.userId`. `requireAdmin` chains after it and checks `app_metadata.role` (NOT `user_metadata`, which users can self-write).
  - `entitlement.ts`: `requirePro` enforces the paywall server-side via the RevenueCat REST API, keyed by the authenticated `userId` (RevenueCat is identified client-side with `session.user.id`). Gated routes: `generate-meal-plan`, `generate-recipe-queue`, `shuffle-recipe`, `get-swap-options`. Needs env `REVENUECAT_SECRET_KEY`; entitlement id is `"NutriStudent Pro"`. Fails OPEN if the key is unset or RevenueCat is unreachable (so non-prod/outage doesn't lock out users) — **production MUST set `REVENUECAT_SECRET_KEY`** or the paywall is a no-op. The client gate (`useSubscription`, `isPro` hard-coded true on web) is cosmetic only.
- Client API calls: use `src/app/utils/apiClient.ts` — `authedFetch`/`authedPost`/`authedGet` send the real session JWT and are required for any `requireAuth` route. The anon key (`publicPost` / hand-rolled headers) is ONLY for genuinely public endpoints (`health`, `schools/search`, `recipe-image/:id`, `get-recipe-image-with-cache`, `auth/signup`, the Google-proxy location routes). Never send the anon key to an authed route.

## Error responses

- Edge-function handlers must NOT return raw `error.message` to clients on 5xx (it leaks internals).
  Pattern: `log(...)` the real error server-side, return `{ error: "Internal server error" }` with the 5xx status.
  Intentional 4xx validation errors keep their actionable messages.
- The school streaks `leaderboard` route must never return raw auth UUIDs.
  It flags the caller's own row with `isCurrentUser` (derived from `getUserId(c)`); the client highlights "(you)" off that flag, not a UUID compare.
  `recipe-leaderboard` is keyed by `recipeId` and uses `getUserId(c)` for "liked by me", so it exposes no user UUIDs.

## Meal swap

- Queue-mode meal swaps are applied by `src/app/utils/mealSwap.ts` (`resolveSwapSlot` / `applyQueueMealSwap`), shared by the plan view (`RecommendationsStep`) and the "My Recipes" dashboard so the slot math (`absoluteDay = (weekNumber-1)*7 + dayNumber`, `slot = category`) can't drift between the two entry points. Don't re-derive it inline.
- "My Recipes" is a cooked-history list with no plan/slot context, so its Swap button renders ONLY for rows whose `recipeId` matches a meal in the active plan (`savedMealPlan.meals`); cooked recipes not in the plan have no slot and get no button.
- Both swap surfaces reuse `MealSwapModal`, whose `get-swap-options` call is the Pro paywall (server-side `requirePro`). There is no client-side gate on the swap button itself; reusing the modal is what keeps the paywall consistent - don't add a separate gate to one surface.
- Custom/community recipes (id like `custom-…`) can be swapped even though they aren't in the `recipe:` catalog, so the backend must never 404 on a non-catalog *current* or *new* id. The client threads the full display-ready meal object through the swap path (`applyQueueMealSwap`'s `newMeal` → `queue-swap-meal`'s `newMeal` body field), and `MealSwapModal` also sends `currentNutrition`/`currentCategory` to `get-swap-options`. Backend (`index.ts` + `recipe-adapter.ts`):
  - `get-swap-options`: when `currentRecipeId` isn't a catalog id it scores against the client-sent `currentNutrition`/`currentCategory` (bounded by `vNum`/`vStr`) instead of a catalog lookup. For a custom current recipe the client can only send a meal SLOT, so candidate categories are compared via `getCategorySlot` (now exported); catalog current recipes keep comparing raw `recipe_category`. The browse *options* are always catalog recipes.
  - `queue-swap-meal`: catalog `newRecipeId`s are rebuilt from the DB with `toMealPlanMeal` as before; non-catalog ids apply `buildCustomQueueMeal(newMeal, …)` (in `recipe-adapter.ts`), which whitelists + bounds every field (like `save-community-recipe`) and FORCES `category`/`dayNumber`/`mealNumber` from the resolved swap slot, never trusting the client. It only ever writes the caller's own queue; returns null (→ 404) for a non-object or empty-name `newMeal`.

## Build / CI sharp edges

- `tsconfig.json` EXCLUDES `supabase/`, so `npm run typecheck` (CI) does NOT typecheck the Deno edge function. Validate edge-function changes via tests/deploy, not tsc.
- Vitest runs the pure backend modules under `supabase/functions/.../__tests__/` (type-only `npm:`/`jsr:` imports are erased by esbuild, so they work in vitest). Modules needing the Deno runtime (`index.ts`, `kv_store`, `rate-limit`, `auth-middleware`, `entitlement` middleware) are covered via tests of their pure helpers + deploy, per `vitest.config.ts`.
- If `npm run build` ever hangs or flaky-exits 1 *after* `✓ built in …`: something is keeping Node's event loop alive (a dangling socket). Check with `process._getActiveHandles()` after a `vite build`. This repo had committed malware in `postcss.config.mjs` (obfuscated `eval` after `export default {};` on one long line) that opened an outbound TLS connection at build time — keep `postcss.config.mjs` to just the clean `export default {};`.

## System-calendar import (Feature A)

- Classes come from the user's system calendar, not a manual grid. Plugin: `@ebarooni/capacitor-calendar` (Capacitor 8 line; iOS uses **Swift Package Manager**, so `cap sync ios` needs no CocoaPods/`pod install`). On iOS, EventKit federates Google/iCloud/Exchange accounts, so an EventKit read returns the student's Google class events too — no separate Google OAuth.
- iOS permissions live in `ios/App/App/Info.plist`: `NSCalendarsFullAccessUsageDescription` (iOS 17+) and `NSCalendarsUsageDescription` (legacy). Missing keys → silent denial.
- `src/app/utils/systemCalendar.ts` is the thin wrapper (`requestAccess`/`listCalendars`/`readWeekEvents`/`currentWeekStart`); every call is wrapped so a denial or missing plugin resolves to `false`/`[]`, never throws. `calendarImportSupported = Capacitor.isNativePlatform()` — the browser has no EventKit, so the import button is native-only and the web build keeps manual class entry in `AcademicScheduleEditor` (`allowClassEntry` defaults to `!calendarImportSupported`).
- `src/app/utils/eventsToClasses.ts` is the pure, unit-tested mapper (occurrence → `ClassEntry`). EventKit returns expanded weekly occurrences for a date range, so **no RRULE parsing** — it just reads each occurrence's local day/time. It drops all-day, blank-title, degenerate and cross-midnight events, and scopes by a chosen calendar-id set.
- **Regression guard (the #1 risk):** importing classes saves through the existing `save-academic-schedule`, and `buildAcademicSchedule` REPLACES the whole blob. So the import path (`RecommendationsStep.handleImportClasses`) and the editor's save MUST re-send `testingPeriods`, `sleepSchedule` AND `mealTimeOverrides` from the current schedule, or focus mode / sleep-friendly dinners / conflict overrides get silently wiped. The editor was trimmed to those two non-calendar fields (exam periods are now editable; they were pass-through before).
