# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Branding / product name

- The user-facing product name is **ChefPocket** (chosen for the first iOS ship, July 2026). It replaced two older inconsistent names: the iOS home-screen name "Nutrition App" and the brand "NutriStudent". All user-facing surfaces now read "ChefPocket": `CFBundleDisplayName` (Info.plist), `appName` (both `capacitor.config.json` copies), `index.html` `<title>`/`apple-mobile-web-app-title`, the iOS calendar permission strings (`NSCalendars*UsageDescription`), and UI copy in LoginPage, ProfilePage, SubscriptionPage, CalendarImportModal, and `apiClient` NETWORK_ERROR_MESSAGE.
- **Deliberately NOT renamed** (technical identifiers, not brand copy — renaming would break external registration):
  - Bundle identifier `com.nutritionapp.students` (Info.plist `PRODUCT_BUNDLE_IDENTIFIER`, `project.pbxproj`, both `capacitor.config.json` `appId`) — the App Store identity; leave exactly as-is.
  - `CFBundleName` in Info.plist is `$(PRODUCT_NAME)` → `$(TARGET_NAME)` = "App" (internal executable name, not user-facing) — left unchanged.
  - Internal `package.json` `"name"`, git repo name, test fixture identifiers — not user-facing, left unchanged.
- Paid-mode RevenueCat naming is unresolved: this repo keeps entitlement `NutriStudent Pro` while the deployed v97 backend source says `ChefPocket Pro`. Do NOT rename either side until a human confirms the exact live RevenueCat dashboard identifier; subscriptions are disabled so nothing depends on it yet.
  Follow the activation contract in `docs/DEPLOYMENT.md` before enabling paid mode.

## Security: backend auth & paywall

- Backend release status and deploy boundaries are owned by `docs/DEPLOYMENT.md`; merging source does not deploy production.
- The Supabase edge function (`supabase/functions/make-server-dbaf6019/`) runs on the service-role key (bypasses RLS), so each route's middleware IS the authorization.
  - `auth-middleware.ts`: `requireAuth` verifies the caller's JWT and sets a token-derived `userId` — handlers must use `getUserId(c)`, NEVER `body.userId`. `requireAdmin` chains after it and checks `app_metadata.role` (NOT `user_metadata`, which users can self-write).
  - Initial launch policy lives in `supabase/functions/_shared/launch-config.ts`, with subscriptions explicitly disabled. The four premium routes retain `requireAuth` and per-user rate limiting before `requirePremiumAccess`; free mode skips RevenueCat intentionally. The client hides all subscription UI behind `LAUNCH_CONFIG.subscriptionsEnabled` (mandatory paywall, Profile billing entry, RevenueCat identify/reset); dormant paid-mode SDK calls stay guarded by `isRevenueCatConfigured()`.
  - Ranks was FULLY eliminated (July 30, 2026 captain decision): the client tab/page and the backend `leaderboard`/`recipe-leaderboard` routes (the only service-role `listUsers` scans) are deleted, so old clients get plain 404s. Community recipes, likes (`toggle-community-like`), personal streaks (`user-stats`), achievements and cooked history keep their own routes.
  - `entitlement.ts`: dormant paid-mode enforcement must fail closed when its secret or RevenueCat is unavailable.
    Its activation requirements are owned by `docs/DEPLOYMENT.md`.
- Client API calls: use `src/app/utils/apiClient.ts` — `authedFetch`/`authedPost`/`authedGet` send the real session JWT and are required for any `requireAuth` route. The anon key (`publicPost` / hand-rolled headers) is ONLY for genuinely public endpoints (`health`, `schools/search`, `recipe-image/:id`, `get-recipe-image-with-cache`, `auth/signup`, the Google-proxy location routes). Never send the anon key to an authed route.

## Error responses

- Edge-function handlers must NOT return raw `error.message` to clients on 5xx (it leaks internals).
  Pattern: `log(...)` the real error server-side, return `{ error: "Internal server error" }` with the 5xx status.
  Intentional 4xx validation errors keep their actionable messages.
- Routes that surface other users' data must never return raw auth UUIDs.
  The deleted leaderboard routes set the pattern (see git history): flag the caller's own row server-side via `getUserId(c)` instead of letting the client compare UUIDs.

## Signup / auth flow

- `auth/signup` (edge route; admin-creates the user with a confirmed email) returns NO session. `LoginPage.handleSignUp` must `signInWithPassword` with the same credentials immediately after signup, BEFORE rendering `SchoolSelectionStep` — the post-signup steps (`schools/select`, `auth/update-profile`) go through `authedPost` and 401 without a session JWT. `App.tsx` reads the session only once on mount (no `onAuthStateChange` listener), so signing in mid-flow does not eject the user from signup onboarding; `LoginPage` stays mounted until it calls `onLoginSuccess`. If that post-signup sign-in fails, `handleSignUp` must NOT advance to `SchoolSelectionStep`: it flips back to sign-in mode (`setIsSignUp(false)`) and surfaces a message telling the user the account exists and to sign in manually — the account was already created, so a retry of signup would collide.

## Rendering resilience

- `src/app/components/ErrorBoundary.tsx` is the app's React error boundary: one instance wraps the whole tree in `src/main.tsx`, and a labelled one wraps `<AdminDashboard />` in `App.tsx` so an admin-panel crash degrades to an in-place error card (header/"Back to App" keep working) instead of unmounting the app. Wrap new top-level surfaces the same way rather than adding bespoke try/catch rendering.
- Recipe data from the KV store is NOT uniformly shaped: seeded recipes can lack `estimatedPrice` on ingredients and even the whole `nutrition` block (and sometimes `name`/`amount`). Never render `x.toFixed(...)` or `recipe.nutrition.<field>` unguarded — check `typeof x === 'number'` / optional-chain and fall back to `'—'`. An unguarded `ing.estimatedPrice.toFixed(2)` in AdminDashboard blank-screened the entire app (P0, July 2026).

## Onboarding flow

- Onboarding is two steps: preferences (`onboardingStep === 2`) → plan preview (`=== 3`); it exits from step 3 via "Save This Plan"/"Discard Plan". The historical steps 1 (`WelcomeStep`) and 4 (`LocationStep`) were removed as unreachable dead code. `onboardingStep` is in-memory only (never persisted); the 2/3 numbering was kept just to minimize that diff — refactoring it to a two-value union is fine. Don't re-add an `onNext` prop to `RecommendationsStep`: its "Go Shopping" opens the internal `ShoppingMode`, it never advances a step.

## Meal swap / mark-cooked (queue slot targeting)

- Queue mutations (`queue-swap-meal`, `mark-queue-meal-consumed`) are keyed by **absolute queue day (1-28) + mealSlot**. `get-queue-week` stamps every meal with `queueDayNumber` (absolute) and `mealSlot` exactly for this; the shared resolver `src/app/utils/mealSwap.ts` (`resolveSwapSlot` / `applyQueueMealSwap`) uses the stamped values, falling back to `(weekNumber-1)*7 + dayNumber` only for unstamped data. Don't re-derive slot math inline in new surfaces, and never resolve a slot by recipe-id lookup — a recipe repeats across queue days, so find-by-id targets the wrong day (this was a P0: swap/mark-cooked silently wrote to slots the user never saw).
- `mealSlot` is authoritative over `category`: after a swap, the occupying recipe's own `category` can differ from the slot it sits in.
- In queue mode, `RecommendationsStep`'s rendered plan MUST be `currentWeekMealPlan` (the queue week). The saved active plan is a different object with unrelated day numbers — the mount effect deliberately skips seeding from `savedMealPlan` when a queue week exists. Breaking that precedence re-introduces the render-one-plan/mutate-another bug. Regression tests: `RecommendationsStep.queueSlot.test.tsx` (the rendered slot must equal the mutated slot).
- `MealSwapModal.onSwap` is awaited: the modal only closes when the apply resolves and shows the error on rejection — so swap-apply implementations must **throw** on failure (including a null result from `swapQueueMeal`, which swallows network errors into null), never resolve silently.
- The dashboard's "My Recipes" section (cooked-history list with per-row Swap) was removed from the UI in July 2026; the `my-recipes` backend route still exists. If a new surface adds swapping, reuse `MealSwapModal` because its `get-swap-options` call goes through the launch-policy-controlled premium gate; there is no client-side gate on swap buttons, and reusing the modal keeps the active free or paid policy consistent.

## Plan length / start date (planDays)

- The meal plan's length is user-chosen: `preferences.planDays` (1–14, default 7) travels in the `generate-meal-plan` payload; the handler bounds it with `vNum(planDays, 1, 14, 7)`, rounds it to an integer, and feeds it as `cookingDays`. The "Plan Start Date" card in PreferencesStep is the old "Next Shopping Date" — the internal field is still `shoppingDate` everywhere (deliberate: label-only rename).
- The backend budget and compatibility contract is owned by `docs/DEPLOYMENT.md` and implemented in `supabase/functions/_shared/budget-contract.ts`.
  Route handlers must use the shared helpers instead of re-deriving budget math.
- The client is on the canonical per-meal budget (July 2026): `preferences.budgetPerMealGbp` (`number | null`, £1.00-£50.00 hard cap) replaced the whole-plan `budget`. The PreferencesStep field starts EMPTY and is required before Continue (captain decision: empty-required, typed entry only, no preset chips). `src/app/utils/userPreferences.ts` normalizes saved preferences on load, lazily migrating legacy `budget/(planDays*mealsPerDay)`. `generate-meal-plan` dual-sends the legacy whole-plan `budget` alongside `budgetPerMealGbp` for exactly one release of rollback compatibility - drop it in the release after this one. Budget comparisons go through `toPence` (integer pence), unpriced recipes cost `UNPRICED_RECIPE_FALLBACK_GBP` (£2.50) via `safeCost`.
- Allergies are hierarchical (July 2026): `supabase/functions/_shared/allergy-contract.ts` owns the taxonomy - groups Nuts (Peanuts, Tree Nuts), Seafood (Fish, Shellfish), Dairy (Milk, Cheese, Butter, Cream, Yogurt), Gluten/Wheat, Eggs, Soy. A group choice covers every sub-option; a sub-option alone restricts just that family; unknown strings are free-text dislikes matched literally. Normalize with `normalizeAllergyChoices` at every load/request/persistence boundary and get filter keywords only via `allergyKeywordsForChoice` (legacy `fish` now maps to the narrow `Fish`, not `Seafood` - the captain-approved granularity).
- `e2e/plan-days.spec.ts` (Playwright, route-mocked backend per repo e2e convention) pins the canonical per-meal payload contract (including the one-release dual-send), the N-day calendar anchored on the chosen start date, and the day-scoped shopping list; `e2e/launch-shell.spec.ts` pins the four-tab no-Ranks no-billing shell. The 28-day recipe-queue path remains fixed-length.
- `src/app/components/RecommendationsStep.tsx` has **mixed line endings (mostly CRLF)** committed; whole-file rewrites (or editors that normalize the dominant ending) produce a huge whitespace diff. Patch it with byte-preserving edits and check `git diff --stat` before committing.

## Release-simulator smoke test without prod credentials

- The web bundle hardcodes the prod Supabase URL, and un-deployed edge-function changes can't be exercised against prod. Pattern that works: temporarily repoint `src/utils/supabaseClient.ts` + `src/app/utils/apiClient.ts` at `http://127.0.0.1:8787` (loopback is ATS-exempt; serve CORS `*` and handle OPTIONS), run a small Node mock implementing `/auth/v1/token`, `/auth/v1/user` and the needed `make-server-dbaf6019/*` routes, `npm run build && npx cap sync ios`, then **revert the two files before committing** (the built bundle keeps the patch). Drive the UI headlessly by appending a self-driving `<script>` to `dist/index.html` (or directly into `App.app/public/`) that dispatches clicks/`nativeInputValueSetter` input events and renders a PASS/FAIL banner, then `simctl io booted screenshot`. The app's first screen is the welcome page ("I already have an account" → login form); the empty dashboard's button is "Create Plan", the non-empty one "Create New Plan".

## Build / CI sharp edges

- `tsconfig.json` EXCLUDES `supabase/`, so `npm run typecheck` (CI) does NOT typecheck the Deno edge function. Validate edge-function changes via tests/deploy, not tsc.
- Vitest runs the pure backend modules under `supabase/functions/.../__tests__/` (type-only `npm:`/`jsr:` imports are erased by esbuild, so they work in vitest). Modules needing the Deno runtime (`index.ts`, `kv_store`, `rate-limit`, `auth-middleware`, `entitlement` middleware) are covered via tests of their pure helpers + deploy, per `vitest.config.ts`.
- If `npm run build` ever hangs or flaky-exits 1 *after* `✓ built in …`: something is keeping Node's event loop alive (a dangling socket). Check with `process._getActiveHandles()` after a `vite build`. This repo had committed malware in `postcss.config.mjs` (obfuscated `eval` after `export default {};` on one long line) that opened an outbound TLS connection at build time — keep `postcss.config.mjs` to just the clean `export default {};`.

## Launch policy: schedule feature gated off

- The whole academic-schedule feature (Plan|Schedule toggle, conflict banner, week-strip "!" badges, schedule settings/editor, calendar import) is soft-removed for launch behind `launchPolicy.scheduleEnabled` in `src/app/config/launchPolicy.ts` (July 2026, deliberate product deferral - revival is that one-line flip).
  Gates live at the render sites in `RecommendationsStep.tsx` and in `useAcademicCalendar.initCalendar` (schedule/testing/conflict fetches skipped; the recipe-queue load is meal-plan-critical and always runs).
  Nothing schedule-related was deleted: components, server routes, saved data and the Info.plist calendar permission strings all stay.
  Tests that exercise schedule UI force the flag on via `vi.mock('../config/launchPolicy', ...)`; the shipped-off state is pinned by `RecommendationsStep.launchPolicy.test.tsx` and `e2e/schedule-gated.spec.ts` (which also asserts no schedule endpoints are fetched).
  The FOCUS badge code is intact but dormant while the flag is off.

## System-calendar import (Feature A)

- Classes come from the user's system calendar, not a manual grid. Plugin: `@ebarooni/capacitor-calendar` (Capacitor 8 line; iOS uses **Swift Package Manager**, so `cap sync ios` needs no CocoaPods/`pod install`). On iOS, EventKit federates Google/iCloud/Exchange accounts, so an EventKit read returns the student's Google class events too — no separate Google OAuth.
- iOS permissions live in `ios/App/App/Info.plist`: `NSCalendarsFullAccessUsageDescription` (iOS 17+) and `NSCalendarsUsageDescription` (legacy). Missing keys → silent denial.
- `src/app/utils/systemCalendar.ts` is the thin wrapper (`requestAccess`/`listCalendars`/`readWeekEvents`/`currentWeekStart`); every call is wrapped so a denial or missing plugin resolves to `false`/`[]`, never throws. `calendarImportSupported = Capacitor.isNativePlatform()` — the browser has no EventKit, so the import button is native-only and the web build keeps manual class entry in `AcademicScheduleEditor` (`allowClassEntry` defaults to `!calendarImportSupported`).
- `src/app/utils/eventsToClasses.ts` is the pure, unit-tested mapper from an occurrence to a `ClassEntry`.
  EventKit returns expanded weekly occurrences for a date range, so the mapper reads each occurrence's local day and time without parsing RRULEs.
  It drops all-day, blank-title, degenerate, cross-midnight, and 16-hour-or-longer events, and scopes by a chosen calendar-id set.
  The plugin's iOS bridge serializes the all-day flag as `allDay` while its TypeScript interface declares `isAllDay`, so the mapper must check both keys.
  Regression coverage lives in `src/app/utils/eventsToClasses.test.ts`.
- The import picker remembers the user's last calendar selection in localStorage (`chefpocket.calendarImportSelection`; helpers in `src/app/utils/calendarImportSelection.ts`) and on first run pre-selects everything except holiday/birthday calendars.
- **Regression guard (the #1 risk):** importing classes saves through the existing `save-academic-schedule`, and `buildAcademicSchedule` REPLACES the whole blob. So the import path (`RecommendationsStep.handleImportClasses`) and the editor's save MUST re-send `testingPeriods`, `sleepSchedule` AND `mealTimeOverrides` from the current schedule, or focus mode / sleep-friendly dinners / conflict overrides get silently wiped. The editor was trimmed to those two non-calendar fields (exam periods are now editable; they were pass-through before).

## iOS App Store release

- **Build number must strictly increase on every App Store Connect upload.** App Store Connect rejects an upload whose `CFBundleVersion` (`CURRENT_PROJECT_VERSION` in `project.pbxproj`, both Debug+Release) is ≤ the last uploaded build. The last uploaded build was **6** (test uploads predating the first real submission), so v1 ships at build **7**; bump it again for every subsequent upload. `MARKETING_VERSION` (1.0) is the user-facing version and can stay across builds.
- `ITSAppUsesNonExemptEncryption=false` in `ios/App/App/Info.plist`: the app uses only standard HTTPS, so this declares export-compliance and skips the per-build encryption prompt on every TestFlight/App Store upload. Keep it unless the app adds non-exempt crypto.
- `ios/exportOptions.plist` is the App Store export config for `xcodebuild -exportArchive` (`method=app-store-connect`, `destination=export` → writes a signed `.ipa` locally for deliberate upload via Organizer/Transporter; switch `destination` to `upload` for direct CI upload). `teamID=7F8UL5VST3`, automatic signing. Distribution signing is Xcode cloud-managed (not shown by `security find-identity`) but resolves at export time when signed into the paid account.
- RevenueCat activation and server-secret requirements are owned by `docs/DEPLOYMENT.md`.
  Initial free-launch Release builds leave `VITE_REVENUECAT_IOS_API_KEY` unset because subscriptions are disabled, and no secret is committed.
- **RevenueCat kills non-DEBUG builds carrying a `test_` key.**
  purchases-ios intentionally shows a "Wrong API Key" alert and then `fatalError()`s any Release-configuration build configured with a Test Store (`test_...`) key (`Configuration.swift` `checkForSimulatedStoreAPIKeyInRelease`, `#if !DEBUG`).
  This is what killed TestFlight build 7 at launch: the web bundle was built without `VITE_REVENUECAT_IOS_API_KEY`, so the sandbox key shipped.
  Debug/Xcode runs and web builds never hit the check, so normal testing is blind to it.
  Since build 8, `revenuecat.ts` only falls back to the sandbox key when `import.meta.env.DEV`; a production bundle without the env var skips `Purchases.configure` entirely.
  In keyless native builds, all RevenueCat SDK and RevenueCatUI calls must be guarded by `isRevenueCatConfigured()` / `subscriptionsAvailable`, and mandatory paywalls must be bypassed so the app stays usable with subscriptions disabled.
  To exercise Test Store purchases on device/sim, pass the sandbox key explicitly (`VITE_REVENUECAT_IOS_API_KEY=test_... npm run build`) and only run it in a Debug configuration.
- **ALWAYS smoke-test a Release-configuration launch before archiving** (`xcodebuild -configuration Release -destination 'generic/platform=iOS Simulator' …` then `simctl install`/`launch`, or Edit Scheme → Run → Release). Debug builds hide `#if !DEBUG` failure modes like the one above.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
