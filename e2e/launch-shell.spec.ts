import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

// Free-launch app shell (July 2026): Ranks is fully removed (tab, page and
// backend routes) and all subscription UI is hidden behind the launch policy.
// This spec pins that shipped state: exactly four tabs, no leaderboard
// requests, no paywall, and no Billing entry - while community streak stats
// and the profile surface keep working.

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
  'get-meal-plans': { plans: [] },
  // Personal streaks/achievements stay fully working in the free launch.
  'user-stats': {
    plansCreated: 2,
    mealsLogged: 12,
    moneySaved: 30,
    currentStreak: 3,
    longestStreak: 5,
    earnedBadges: [],
    uniqueRecipes: 7,
    totalCookingDays: 6,
  },
};

const RANKS_ENDPOINTS = ['leaderboard', 'recipe-leaderboard'];

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
  await page.route('**/auth/v1/**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
  await page.route(/\.(png|jpe?g|webp|gif)(\?.*)?$/i, route => route.abort());
};

test('free launch ships four tabs, no Ranks requests and no subscription UI', async ({ page }) => {
  const calledEndpoints: string[] = [];
  await mockBackend(page, calledEndpoints);
  await page.addInitScript(
    ({ key, session }) => window.localStorage.setItem(key, JSON.stringify(session)),
    { key: STORAGE_KEY, session: buildSession() },
  );

  await page.goto('/');

  // The authenticated user lands on the dashboard - never a mandatory paywall.
  await expect(page.getByRole('heading', { name: 'Your Meal Plans' })).toBeVisible();
  await expect(page.getByText(/Unlock/i)).toHaveCount(0);
  await expect(page.getByText(/Subscribe/i)).toHaveCount(0);

  // Exactly four bottom tabs; the Ranks tab is gone entirely.
  const nav = page.locator('.fixed.bottom-0');
  await expect(nav.getByRole('button')).toHaveCount(4);
  await expect(nav.getByText('Home')).toBeVisible();
  await expect(nav.getByText('Plan')).toBeVisible();
  await expect(nav.getByText('Shop')).toBeVisible();
  await expect(nav.getByText('Profile')).toBeVisible();
  await expect(nav.getByText('Ranks')).toHaveCount(0);

  const evidenceDir = process.env.EVIDENCE_DIR || 'test-results';
  await page.screenshot({
    path: path.join(evidenceDir, 'launch-shell-four-tabs.png'),
    fullPage: true,
  });

  // Profile: streak stats work, but no Billing entry and no Pro badge.
  await nav.getByText('Profile').click();
  await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
  await expect(page.getByText('Billing')).toHaveCount(0);
  await expect(page.getByText('Pro', { exact: true })).toHaveCount(0);

  await page.screenshot({
    path: path.join(evidenceDir, 'launch-shell-profile-no-billing.png'),
    fullPage: true,
  });

  // The removed Ranks routes were never called from anywhere in the shell.
  for (const endpoint of RANKS_ENDPOINTS) {
    expect(calledEndpoints).not.toContain(endpoint);
  }
  // The personal streak surface did load through its kept route.
  expect(calledEndpoints).toContain('user-stats');
});
