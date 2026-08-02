# AGENTS

## Product Context
- This project is **mobile-first** and should be treated as an app experience first, not a desktop web app.
- Primary target platform is **iOS** (Capacitor + Xcode simulator/device workflows).
- Any UI, interaction, or architecture decision should prefer iPhone usability, performance, and clarity.

## Core Principles
- Design and implement for small screens first; desktop is secondary.
- Keep interactions thumb-friendly (tap targets, spacing, bottom navigation patterns).
- Favor smooth, native-feeling transitions and fast perceived performance on iOS devices.
- Avoid introducing desktop-only patterns that degrade the mobile experience.

## Engineering Guidance
- Preserve existing Capacitor/iOS integration and project structure under `ios/`.
- When changing frontend behavior, validate that flows still work in iOS simulator expectations.
- Keep dependencies and bundle impact in check; prioritize runtime efficiency on mobile devices.
- Prefer resilient network handling and graceful loading/error states for real mobile conditions.

## Auth and Backend Notes
- Frontend uses Supabase auth and edge functions.
- API and session-related changes should be tested from a mobile usage perspective (cold start, resume, reconnect).

## Definition of Done (for agent changes)
- Mobile layouts remain coherent across common iPhone sizes.
- No regressions to key app flows: login, onboarding, meal plan generation, profile, and navigation.
- iOS build/sync workflow is not broken by file or config changes.
