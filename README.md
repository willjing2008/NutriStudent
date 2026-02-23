# NutriStudent

Personalised meal planning app built for university students. Generates weekly meal plans based on dietary preferences, cooking equipment, and goals — then produces a shopping list to match.

## Tech Stack

- **Frontend:** React + TypeScript, Vite, Tailwind CSS
- **Mobile:** Capacitor (iOS)
- **Backend:** Supabase (Auth, Database, Edge Functions)
- **Payments:** RevenueCat (StoreKit integration)

## Features

- Onboarding flow: preferences, cooking equipment, dietary goals
- Meal plan generation with per-meal nutrition breakdown
- Meal swap functionality with nutritional comparison
- Shopping list with per-category grouping and checklist
- School selection and student community
- Mandatory paywall with monthly/yearly subscription plans
- Profile management with achievements and streak tracking
- Multi-language support (English, Simplified Chinese)
- Admin dashboard for recipe database management

## Project Structure

```
src/
  app/
    components/    # React components (pages, modals, steps)
    hooks/         # Custom hooks (useSubscription, useLanguage, etc.)
    services/      # RevenueCat SDK integration
    constants/     # Achievements, static data
    utils/         # Recipe images, helpers
  utils/           # Supabase client
supabase/
  functions/       # Supabase Edge Functions (auth, meal plans, recipes)
ios/               # Capacitor iOS project
```

## Getting Started

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

### iOS

The iOS project lives in `ios/` and is managed via Capacitor. After building:

```bash
npx cap sync ios
npx cap open ios
```

## Environment

The app connects to a Supabase project for auth, database, and edge functions. Project credentials are configured in `utils/supabase/info.ts`.

RevenueCat is configured for subscription management — see `src/app/services/revenuecat.ts` for SDK setup.
