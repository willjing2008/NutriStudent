# Deployment and release checklist

This guide captures the current NutriStudent launch workflow for web assets, the Supabase Edge Function backend, and iOS packaging.

## Local quality gates

Run these before every commit:

```bash
npm run typecheck
npm test
npm run build
```

Run the web E2E smoke tests when touching auth, landing, subscription, or network/offline flows:

```bash
npm run test:e2e
```

The Playwright tests start from a production build via `vite preview`. If browsers are missing on a new machine, install Chromium once:

```bash
npx playwright install chromium
```

Generated Playwright output (`test-results/`, `playwright-report/`) is ignored by git.

## Supabase Edge Function deploy

Project ref: `awufigzenzypanymzoqy`.

1. Confirm the full local gate is green.
2. Confirm with Will before any production deploy.
3. Deploy the single Hono function:

```bash
npx supabase@latest functions deploy make-server-dbaf6019 --project-ref awufigzenzypanymzoqy
```

A local Docker warning is non-blocking for this project; the CLI deploys via the Supabase API.

4. Smoke-check production:

```bash
curl -i https://awufigzenzypanymzoqy.supabase.co/functions/v1/make-server-dbaf6019/health
```

For protected endpoints, use a real Supabase session JWT. Public anon-key checks are useful for confirming auth gates reject anonymous access.

## Edge Function secrets

Use `supabase secrets set` for backend-only values:

```bash
npx supabase@latest secrets set NAME=value --project-ref awufigzenzypanymzoqy
```

Current backend secret names are listed in `.env.example`. Never commit service-role keys, webhook secrets, or third-party API keys.

## Recipe data re-seed

Changes to `recipe-data.ts` and `recipe-adapter.ts` only affect new data after deploy. Updating the live KV recipe catalogue requires an `/init-recipes` re-seed with an admin token.

Treat re-seeding as destructive: it clears and repopulates recipe records. Get explicit confirmation before running it.

## iOS build notes

For normal native development:

```bash
npm run build
npx cap sync ios
npx cap open ios
```

If Capacitor sync hangs on the current simulator workflow, update the already-installed simulator app without reinstalling:

```bash
npm run build
UDID=<simulator-udid>
APP=$(xcrun simctl get_app_container "$UDID" com.nutritionapp.students app)
rm -rf "$APP/public/assets"
cp -R dist/assets "$APP/public/assets"
cp dist/index.html "$APP/public/index.html"
xcrun simctl terminate "$UDID" com.nutritionapp.students
xcrun simctl launch "$UDID" com.nutritionapp.students
```

This preserves login/session state in the simulator while refreshing web assets.

## App Store launch blockers

Track these before release:

- Replace the sandbox RevenueCat key with the production iOS public key.
- Set `REVENUECAT_SECRET_KEY` in production: server-side entitlement enforcement (`entitlement.ts`) is implemented but fails open without it. Optionally add a RevenueCat webhook + webhook secret for push-based updates.
- Remove the web paywall bypass in `useSubscription.tsx` once web policy is decided.
- Add account deletion flow and endpoint.
- Add `PrivacyInfo.xcprivacy`, legal links, EULA, privacy labels, metadata, and screenshots.
- Confirm bundle id, display name, version/build numbers, and App Store product ids.
- Add Sentry once a DSN is available.
