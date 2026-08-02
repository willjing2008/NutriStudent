# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start Vite dev server (localhost:5173)
npm run build        # Production build → dist/
npm run typecheck    # tsc --noEmit (excludes supabase/)
npm test             # Vitest unit/integration tests
npm run test:e2e     # Playwright E2E smoke tests (needs `npx playwright install chromium`)
npx cap sync ios     # Sync web assets + native dependencies to iOS
npx cap open ios     # Open Xcode project
```

See `docs/DEPLOYMENT.md` for the full quality-gate and release workflow.

## Architecture Overview

**ChefPocket** is a React + Capacitor iOS mobile app for student meal planning and nutrition.
The web app (React/Vite) runs inside a native iOS shell via Capacitor's WKWebView.

### Stack

- **Frontend**: React 18 + TypeScript, Vite 6, Tailwind CSS v4
- **UI**: Radix UI primitives (shadcn/ui pattern) + MUI for some icons
- **Mobile**: Capacitor 8 targeting iOS
- **Backend**: Supabase (auth, edge functions, storage)
- **Subscriptions**: RevenueCat SDK + StoreKit v2
- **Edge Functions**: Hono framework on Deno (in `supabase/functions/make-server-dbaf6019/`)

### Path Alias

`@` → `./src` (configured in `vite.config.ts`)

### Key Source Layout

- `src/app/App.tsx` — Root component, all top-level state (auth, navigation, preferences, meal plans)
- `src/app/components/` — Page-level and feature components
- `src/app/components/ui/` — Radix/shadcn primitives (buttons, dialogs, etc.)
- `src/app/hooks/useSubscription.tsx` — RevenueCat subscription context provider
- `src/app/hooks/useLanguage.tsx` — i18n context provider
- `src/app/services/revenuecat.ts` — RevenueCat SDK wrapper
- `src/utils/supabaseClient.ts` — Supabase client instance
- `src/styles/theme.css` — Design tokens (CSS custom properties)
- `utils/supabase/info.tsx` — Supabase project ID and anon key
- `supabase/functions/make-server-dbaf6019/` — All edge function endpoints (Hono)
- `ios/App/` — Native iOS project (Xcode, Swift, StoreKit config)

### State Management

App.tsx manages all top-level state via useState/useEffect — no external state library. Context providers wrap the app for subscriptions (`useSubscription`) and i18n (`useLanguage`).

### Navigation

Tab-based bottom navigation using a `NavTab` enum (`home`, `plan`, `shop`, `profile`). State lives in App.tsx. Modal overlays for admin dashboard and subscription pages.

### App Flows

1. **Auth**: Supabase email/password + OAuth → session check on mount
2. **Onboarding**: PreferencesStep → RecommendationsStep (exits via "Save This Plan"/"Discard Plan")
3. **Main**: MealPlansDashboard (home) → RecommendationsStep (plan view) → ShoppingMode
4. **Subscriptions**: Disabled for the initial free launch by `supabase/functions/_shared/launch-config.ts`.
   See `docs/DEPLOYMENT.md` before enabling paid mode.

### Backend API Pattern

Frontend calls Supabase edge functions at:
```
https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/{endpoint}
```
Authed routes require the caller's real session JWT via `src/app/utils/apiClient.ts` (`authedFetch`/`authedPost`/`authedGet`); the anon key is only for genuinely public endpoints. The edge function uses Hono routing and a `kv_store` table for persistence. See `AGENTS.md` for the backend auth & paywall model.

### Theming

Dark theme with forest green palette. All tokens in `src/styles/theme.css` as CSS custom properties (`--background: #0A1F13`, `--primary: #22C55E`, etc.). Font: DM Sans / SF Pro Display.

## Mobile-First Guidelines

- Design for small screens first; desktop is secondary
- Keep tap targets thumb-friendly with appropriate spacing
- Respect iOS safe areas (`env(safe-area-inset-*)`)
- Preserve Capacitor/iOS integration under `ios/` — don't break `npx cap sync`
- Test that changes work in iOS simulator context (cold start, resume, reconnect)
- Keep bundle size in check; prefer runtime efficiency on mobile
