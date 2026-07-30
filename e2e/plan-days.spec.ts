import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

// User-selectable plan start date + number of days (1-14), July 2026.
// Drives the real onboarding preferences flow in a browser with the edge API
// mocked at the network layer (repo e2e convention). The generate-meal-plan
// mock honours planDays exactly like the fixed backend (vNum(planDays,1,14,7)),
// so this pins the full frontend contract: the chosen days reach the payload,
// the preview calendar shows exactly that many in-plan days anchored on the
// chosen start date, and the shopping list only draws from those days.

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

// Mirrors the backend response shape (generateMealPlanFromRecipes return) and
// the backend's planDays handling: vNum(planDays, 1, 14, 7).
const buildMealPlan = (body: { planDays?: unknown; budget?: number; mealsPerDay?: number }) => {
  const raw = Number(body.planDays);
  const days = Number.isFinite(raw) ? Math.min(14, Math.max(1, Math.round(raw))) : 7;
  const slots = ['breakfast', 'lunch', 'dinner'].slice(0, body.mealsPerDay ?? 3);
  const meals = [] as object[];
  for (let d = 1; d <= days; d++) {
    slots.forEach((slot, i) => {
      meals.push({
        id: `r-${d}-${slot}`,
        name: `Day ${d} ${slot[0].toUpperCase()}${slot.slice(1)}`,
        description: 'test meal',
        image: '',
        category: slot,
        mealSlot: slot,
        cookingTime: 15,
        servings: 1,
        difficulty: 'easy',
        tags: [],
        ingredients: [{ name: `Ingredient for day ${d}`, amount: '1 unit', estimatedPrice: 2 }],
        ingredientNames: [`Ingredient for day ${d}`],
        instructions: ['Cook it'],
        cost: 2,
        totalCost: 2,
        nutrition: { calories: 400, protein: 20, carbs: 40, fats: 12, fiber: 5 },
        dayNumber: d,
        mealNumber: i + 1,
      });
    });
  }
  const budget = body.budget ?? 100;
  const totalCost = meals.length * 2;
  return {
    meals,
    totalCost,
    dailyBudget: budget / days,
    weeklyBudget: budget,
    withinBudget: totalCost <= budget,
    cookingDays: days,
    totalMealsNeeded: days * slots.length,
    mealsPerDay: slots.length,
  };
};

const mockBackend = async (page: Page, generatePayloads: Record<string, unknown>[]) => {
  await page.route('**/functions/v1/make-server-dbaf6019/**', route => {
    const url = new URL(route.request().url());
    const endpoint = url.pathname.split('make-server-dbaf6019/')[1] ?? '';
    if (endpoint === 'generate-meal-plan') {
      const body = route.request().postDataJSON() as Record<string, unknown>;
      generatePayloads.push(body);
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ mealPlan: buildMealPlan(body) }),
      });
    }
    if (endpoint === 'get-meal-plans') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ plans: [] }),
      });
    }
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  await page.route('**/auth/v1/**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
  await page.route(/\.(png|jpe?g|webp|gif)(\?.*)?$/i, route => route.abort());
};

// ISO date `offsetDays` from today in local time (matches the app's dateUtils).
const localISO = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n: number) => String(n).padStart(2, '0');
  return { iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, date: d };
};

// The calendar-strip day cells marked as in-plan, in order. In-plan days carry
// the green dot (bg-[#22C55E]); the selected in-plan day's dot is bg-[#052E16]/40.
// Returns each in-plan cell's day-of-month so tests can assert count + anchor.
const inPlanDays = (page: Page) =>
  page.evaluate(() => {
    const strip = document.querySelector('.overflow-x-auto .flex.gap-2');
    if (!strip) return null;
    return [...strip.querySelectorAll('button')]
      .filter(btn => {
        const dot = btn.lastElementChild as HTMLElement | null;
        const cls = dot?.className ?? '';
        return cls.includes('bg-[#22C55E]') || cls.includes('bg-[#052E16]/40');
      })
      .map(btn => Number(btn.querySelector('span.text-lg')?.textContent));
  });

// Click the Nth (0-based) in-plan day cell on the calendar strip.
const clickInPlanDay = (page: Page, index: number) =>
  page.evaluate(idx => {
    const strip = document.querySelector('.overflow-x-auto .flex.gap-2');
    const cells = [...(strip?.querySelectorAll('button') ?? [])].filter(btn => {
      const cls = (btn.lastElementChild as HTMLElement | null)?.className ?? '';
      return cls.includes('bg-[#22C55E]') || cls.includes('bg-[#052E16]/40');
    });
    (cells[idx] as HTMLButtonElement | undefined)?.click();
  }, index);

const runOnboarding = async (
  page: Page,
  { startOffset, planDays }: { startOffset: number; planDays: number },
) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Create New Plan' }).click();

  // Relabelled sections.
  await expect(page.getByRole('heading', { name: 'Plan Start Date' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Number of Days' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Budget for this plan' })).toBeVisible();
  await expect(page.getByText(/We'll keep your plan's groceries/)).toBeVisible();

  const { iso } = localISO(startOffset);
  await page.locator('input[type="date"]').fill(iso);
  await page.getByRole('spinbutton', { name: 'Number of days' }).fill(String(planDays));
  await page.getByRole('button', { name: /Study Focus/ }).click();
  await page.screenshot({
    path: path.join(process.env.EVIDENCE_DIR || 'test-results', `plan-days-${planDays}-preferences.png`),
    fullPage: true,
  });
  await page.getByRole('button', { name: /^Continue$/ }).click();
  return iso;
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    ({ key, session }) => window.localStorage.setItem(key, JSON.stringify(session)),
    { key: STORAGE_KEY, session: buildSession() },
  );
});

const evidenceDir = process.env.EVIDENCE_DIR || 'test-results';

test('3-day plan: payload carries planDays; preview shows exactly 3 days from the chosen start', async ({
  page,
}) => {
  const generatePayloads: Record<string, unknown>[] = [];
  await mockBackend(page, generatePayloads);

  const startIso = await runOnboarding(page, { startOffset: 3, planDays: 3 });

  // The plan preview rendered from the generated plan.
  await expect(page.getByText('Day 1 Breakfast')).toBeVisible();

  // The generate call carried the user's choices.
  expect(generatePayloads).toHaveLength(1);
  expect(generatePayloads[0]).toMatchObject({ planDays: 3, shoppingDate: startIso });

  // Exactly 3 in-plan days on the calendar strip, anchored on the chosen date.
  const planCells = await inPlanDays(page);
  expect(planCells).toEqual([
    localISO(3).date.getDate(),
    localISO(4).date.getDate(),
    localISO(5).date.getDate(),
  ]);

  // The last in-plan day renders day 3's meals.
  await clickInPlanDay(page, 2);
  await expect(page.getByText('Day 3 Dinner')).toBeVisible();
  await page.screenshot({ path: path.join(evidenceDir, 'plan-days-3-preview.png'), fullPage: true });

  // Shopping list covers only the 3 plan days' ingredients.
  await page.getByRole('button', { name: 'Go Shopping' }).click();
  await expect(page.getByText('Ingredient for day 1')).toBeVisible();
  await expect(page.getByText('Ingredient for day 3')).toBeVisible();
  await expect(page.getByText('Ingredient for day 4')).toHaveCount(0);
  await page.screenshot({ path: path.join(evidenceDir, 'plan-days-3-shopping.png'), fullPage: true });
});

test('14-day plan: preview shows exactly 14 days', async ({ page }) => {
  const generatePayloads: Record<string, unknown>[] = [];
  await mockBackend(page, generatePayloads);

  await runOnboarding(page, { startOffset: 2, planDays: 14 });

  await expect(page.getByText('Day 1 Breakfast')).toBeVisible();
  expect(generatePayloads[0]).toMatchObject({ planDays: 14 });
  expect(await inPlanDays(page)).toHaveLength(14);
  await page.screenshot({ path: path.join(evidenceDir, 'plan-days-14-preview.png'), fullPage: true });
});

test('number-of-days input clamps to 1-14 in the browser', async ({ page }) => {
  const generatePayloads: Record<string, unknown>[] = [];
  await mockBackend(page, generatePayloads);

  await page.goto('/');
  await page.getByRole('button', { name: 'Create New Plan' }).click();

  const days = page.getByRole('spinbutton', { name: 'Number of days' });
  await days.fill('99');
  await expect(days).toHaveValue('14');
  await days.fill('0');
  await expect(days).toHaveValue('1');
});
