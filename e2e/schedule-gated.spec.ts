import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

// The academic-schedule feature is launch-gated off (launchPolicy.scheduleEnabled
// = false, July 2026). This spec pins the shipped state on the plan view: the
// Plan | Schedule toggle, reminder banners and conflict badges must not render,
// and the app must not call any schedule endpoints - while the plan calendar
// strip and meals stay fully intact.

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
  // Still served by the backend; the gated client must simply never ask.
  'get-academic-schedule': {
    schedule: {
      classes: [{ id: 'class-1', name: 'Maths', dayOfWeek: 1, startTime: '12:00', endTime: '13:00' }],
      testingPeriods: [],
      sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
      mealTimeOverrides: [],
      updatedAt: '2026-07-28T00:00:00.000Z',
    },
  },
  'check-testing-period': { inTestingPeriod: true },
  'get-meal-conflicts': {
    conflicts: [
      {
        classId: 'class-1',
        className: 'Maths',
        classStart: '12:00',
        classEnd: '13:00',
        mealSlot: 'lunch',
        suggestion: 'Eat lunch after 13:00',
      },
    ],
  },
};

const SCHEDULE_ENDPOINTS = ['get-academic-schedule', 'check-testing-period', 'get-meal-conflicts'];

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

test('plan view renders with no schedule surfaces and no schedule fetches', async ({ page }) => {
  const calledEndpoints: string[] = [];
  await mockBackend(page, calledEndpoints);
  await page.addInitScript(
    ({ key, session }) => window.localStorage.setItem(key, JSON.stringify(session)),
    { key: STORAGE_KEY, session: buildSession() },
  );

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your Meal Plans' })).toBeVisible();

  // Open the active plan (RecommendationsStep - where the toggle used to live).
  await page.getByRole('button', { name: 'View Details' }).click();

  // The plan view is fully loaded: greeting header, calendar strip, meals.
  await expect(page.getByText('Overnight Oats')).toBeVisible();
  await expect(page.getByText('Chicken Rice Bowl')).toBeVisible();

  // No Plan | Schedule toggle, no schedule view, no reminder banner.
  await expect(page.getByRole('button', { name: 'Schedule' })).toHaveCount(0);
  await expect(page.getByText(/Eat lunch after/)).toHaveCount(0);
  await expect(page.getByText(/Import from Calendar/i)).toHaveCount(0);
  await expect(page.getByText(/Exam periods/i)).toHaveCount(0);
  // No conflict "!" badges on the week strip (the strip itself stays).
  await expect(page.getByText('!', { exact: true })).toHaveCount(0);

  // And none of the schedule endpoints were fetched.
  for (const endpoint of SCHEDULE_ENDPOINTS) {
    expect(calledEndpoints).not.toContain(endpoint);
  }

  const evidenceDir = process.env.EVIDENCE_DIR || 'test-results';
  await page.screenshot({
    path: path.join(evidenceDir, 'plan-view-schedule-gated.png'),
    fullPage: true,
  });
});
