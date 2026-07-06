import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

// Home dashboard (MealPlansDashboard) rendered through the real app shell with
// a seeded Supabase session and a fully mocked edge-function API. Guards the
// July 2026 removal of the "My Recipes" section: the section must not render
// and the `my-recipes` endpoint must not be called, while the rest of the
// dashboard (active plan card, saved plans) stays intact.

const PROJECT_REF = 'awufigzenzypanymzoqy';
const STORAGE_KEY = `sb-${PROJECT_REF}-auth-token`;

const b64url = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');

const buildSession = () => {
  const nowSec = Math.floor(Date.now() / 1000);
  const exp = nowSec + 3600;
  const user = {
    id: 'user-1',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'student@example.com',
    email_confirmed_at: '2026-01-01T00:00:00.000Z',
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: { name: 'Alex' },
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  };
  const accessToken = [
    b64url({ alg: 'HS256', typ: 'JWT' }),
    b64url({ sub: user.id, role: 'authenticated', email: user.email, exp, aud: 'authenticated' }),
    'signature',
  ].join('.');
  return {
    access_token: accessToken,
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: exp,
    refresh_token: 'fake-refresh-token',
    user,
  };
};

const API_RESPONSES: Record<string, unknown> = {
  'get-meal-plans': {
    plans: [{ planId: 'plan-1', planName: 'Exam Week Plan', savedAt: '2026-06-28T10:00:00.000Z' }],
  },
  'load-meal-plan-by-id': {
    mealPlan: {
      weekNumber: 1,
      meals: [
        { id: 'recipe-1', name: 'Overnight Oats', category: 'breakfast', dayNumber: 1, nutrition: { calories: 420, protein: 22 }, ingredients: [] },
        { id: 'recipe-2', name: 'Chicken Rice Bowl', category: 'lunch', dayNumber: 1, nutrition: { calories: 650, protein: 45 }, ingredients: [] },
      ],
    },
    preferences: { goal: 'study', mealsPerDay: 3, maxCookingTime: 30 },
  },
  // Still served by the backend; the dashboard must simply never ask for it.
  'my-recipes': {
    recipes: [
      { recipeId: 'recipe-1', name: 'Overnight Oats', category: 'breakfast', timesCooked: 3, lastCooked: '2026-06-30T08:00:00.000Z' },
    ],
  },
};

const mockBackend = async (page: Page, calledEndpoints: string[]) => {
  await page.route('**/functions/v1/make-server-dbaf6019/**', route => {
    const url = new URL(route.request().url());
    const endpoint = url.pathname.split('make-server-dbaf6019/')[1] ?? '';
    calledEndpoints.push(endpoint);
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(API_RESPONSES[endpoint] ?? {}),
    });
  });
  // The seeded session is unexpired so no refresh should fire, but keep any
  // stray auth traffic off the network.
  await page.route('**/auth/v1/**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
  await page.route(/\.(png|jpe?g|webp|gif)(\?.*)?$/i, route => route.abort());
};

test('home dashboard renders without the My Recipes section', async ({ page }) => {
  const calledEndpoints: string[] = [];
  await mockBackend(page, calledEndpoints);
  await page.addInitScript(
    ({ key, session }) => window.localStorage.setItem(key, JSON.stringify(session)),
    { key: STORAGE_KEY, session: buildSession() },
  );

  await page.goto('/');

  // The dashboard is fully loaded: header, active plan card, saved plans.
  await expect(page.getByRole('heading', { name: 'Your Meal Plans' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Currently Active' })).toBeVisible();
  await expect(page.getByText('Exam Week Plan').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Saved Plans' })).toBeVisible();

  // The removed section: no heading, no cooked-count rows, no per-row Swap.
  await expect(page.getByText('My Recipes')).toHaveCount(0);
  await expect(page.getByText(/times? cooked/)).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Swap / })).toHaveCount(0);

  // And the dashboard no longer fetches the cooked-history list at all.
  expect(calledEndpoints).not.toContain('my-recipes');

  const evidenceDir = process.env.EVIDENCE_DIR || 'test-results';
  await page.screenshot({
    path: path.join(evidenceDir, 'home-dashboard-no-my-recipes.png'),
    fullPage: true,
  });
});
