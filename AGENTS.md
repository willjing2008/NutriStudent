# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Branding / product name

- The user-facing product name is **ChefPocket** (chosen for the first iOS ship, July 2026). It replaced two older inconsistent names: the iOS home-screen name "Nutrition App" and the brand "NutriStudent". All user-facing surfaces now read "ChefPocket": `CFBundleDisplayName` (Info.plist), `appName` (both `capacitor.config.json` copies), `index.html` `<title>`/`apple-mobile-web-app-title`, the iOS calendar permission strings (`NSCalendars*UsageDescription`), and UI copy in LoginPage, ProfilePage, SubscriptionPage, CalendarImportModal, and `apiClient` NETWORK_ERROR_MESSAGE.
- **Deliberately NOT renamed** (technical identifiers, not brand copy — renaming would break external registration):
  - Bundle identifier `com.nutritionapp.students` (Info.plist `PRODUCT_BUNDLE_IDENTIFIER`, `project.pbxproj`, both `capacitor.config.json` `appId`) — the App Store identity; leave exactly as-is.
  - RevenueCat entitlement id `"NutriStudent Pro"` (`ENTITLEMENT_ID` in `src/app/services/revenuecat.ts`, plus key lookups in `SubscriptionPage`/`useSubscription` and their tests). This string must match the RevenueCat dashboard config. The paywall *display heading* is now "ChefPocket Pro", but the entitlement KEY stays `"NutriStudent Pro"` — don't rename the code without also renaming the dashboard entitlement.
  - `CFBundleName` in Info.plist is `$(PRODUCT_NAME)` → `$(TARGET_NAME)` = "App" (internal executable name, not user-facing) — left unchanged.
  - Internal `package.json` `"name"`, git repo name, test fixture identifiers — not user-facing, left unchanged.

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
- The dashboard's "My Recipes" section (cooked-history list with per-row Swap) was removed from the UI in July 2026; the `my-recipes` backend route still exists. If a new surface adds swapping, reuse `MealSwapModal` — its `get-swap-options` call is the Pro paywall (server-side `requirePro`); there is no client-side gate on swap buttons, and reusing the modal is what keeps the paywall consistent.

## Plan length / start date (planDays)

- The meal plan's length is user-chosen: `preferences.planDays` (1–14, default 7) travels in the `generate-meal-plan` payload; the handler bounds it with `vNum(planDays, 1, 14, 7)`, rounds it to an integer, and feeds it as `cookingDays`. The "Plan Start Date" card in PreferencesStep is the old "Next Shopping Date" — the internal field is still `shoppingDate` everywhere (deliberate: label-only rename).
- **Budget is the total for the whole plan**, not weekly: the backend divides it by `cookingDays` (`dailyBudget = weeklyBudget / cookingDays`) and the UI says "Budget for this plan". The `weeklyBudget` variable/response-field name is historical; its meaning is now plan-total. Don't reintroduce `/7`.
- `e2e/plan-days.spec.ts` (Playwright, route-mocked backend per repo e2e convention) pins the payload contract, the N-day calendar anchored on the chosen start date, and the day-scoped shopping list. The 28-day recipe-queue path is independent and still fixed-length.
- `src/app/components/RecommendationsStep.tsx` has **mixed line endings (mostly CRLF)** committed; whole-file rewrites (or editors that normalize the dominant ending) produce a huge whitespace diff. Patch it with byte-preserving edits and check `git diff --stat` before committing.

## Release-simulator smoke test without prod credentials

- The web bundle hardcodes the prod Supabase URL, and un-deployed edge-function changes can't be exercised against prod. Pattern that works: temporarily repoint `src/utils/supabaseClient.ts` + `src/app/utils/apiClient.ts` at `http://127.0.0.1:8787` (loopback is ATS-exempt; serve CORS `*` and handle OPTIONS), run a small Node mock implementing `/auth/v1/token`, `/auth/v1/user` and the needed `make-server-dbaf6019/*` routes, `npm run build && npx cap sync ios`, then **revert the two files before committing** (the built bundle keeps the patch). Drive the UI headlessly by appending a self-driving `<script>` to `dist/index.html` (or directly into `App.app/public/`) that dispatches clicks/`nativeInputValueSetter` input events and renders a PASS/FAIL banner, then `simctl io booted screenshot`. The app's first screen is the welcome page ("I already have an account" → login form); the empty dashboard's button is "Create Plan", the non-empty one "Create New Plan".

## Build / CI sharp edges

- `tsconfig.json` EXCLUDES `supabase/`, so `npm run typecheck` (CI) does NOT typecheck the Deno edge function. Validate edge-function changes via tests/deploy, not tsc.
- Vitest runs the pure backend modules under `supabase/functions/.../__tests__/` (type-only `npm:`/`jsr:` imports are erased by esbuild, so they work in vitest). Modules needing the Deno runtime (`index.ts`, `kv_store`, `rate-limit`, `auth-middleware`, `entitlement` middleware) are covered via tests of their pure helpers + deploy, per `vitest.config.ts`.
- If `npm run build` ever hangs or flaky-exits 1 *after* `✓ built in …`: something is keeping Node's event loop alive (a dangling socket). Check with `process._getActiveHandles()` after a `vite build`. This repo had committed malware in `postcss.config.mjs` (obfuscated `eval` after `export default {};` on one long line) that opened an outbound TLS connection at build time — keep `postcss.config.mjs` to just the clean `export default {};`.

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
- Release build must set `VITE_REVENUECAT_IOS_API_KEY` (prod iOS public key) at build time; prod Supabase must set `REVENUECAT_SECRET_KEY` or the server paywall fails open. Neither is committed.
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
