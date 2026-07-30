import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

// Product-level regression journey for the backend restoration.
// It exercises a real authenticated app shell from empty dashboard, through
// plan generation and a resolved recipe image, to a confirmed Save This Plan
// action and the newly active dashboard card.

const PROJECT_REF = 'awufigzenzypanymzoqy';
const STORAGE_KEY = `sb-${PROJECT_REF}-auth-token`;
const evidenceDir = process.env.EVIDENCE_DIR || 'test-results';

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

const generatedMealPlan = {
  meals: [
    {
      id: 'recipe-101',
      name: 'Lemon Herb Chickpea Bowl',
      description: 'A bright, affordable study lunch.',
      image: 'http://127.0.0.1:4173/recipe-proof.svg',
      imageUrl: 'http://127.0.0.1:4173/recipe-proof.svg',
      cuisine: 'Mediterranean',
      category: 'lunch',
      mealSlot: 'lunch',
      mealType: 'Lunch',
      cookingTime: 20,
      servings: 1,
      difficulty: 'easy',
      tags: ['study', 'vegetarian'],
      ingredients: [
        { name: 'Chickpeas', amount: '1 tin', estimatedPrice: 1.2 },
        { name: 'Rice', amount: '100 g', estimatedPrice: 0.6 },
      ],
      ingredientNames: ['Chickpeas', 'Rice'],
      instructions: ['Cook the rice.', 'Mix with chickpeas and herbs.'],
      cost: 1.8,
      totalCost: 1.8,
      nutrition: { calories: 510, protein: 22, carbs: 74, fats: 14, fiber: 13 },
      dayNumber: 1,
      mealNumber: 1,
    },
  ],
  totalCost: 1.8,
  dailyBudget: 10,
  weeklyBudget: 70,
  withinBudget: true,
  cookingDays: 1,
  totalMealsNeeded: 1,
  mealsPerDay: 1,
};

const proofSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
    <defs>
      <linearGradient id="bg" x1="0" x2="1">
        <stop stop-color="#e6f4ce"/>
        <stop offset="1" stop-color="#f7d98a"/>
      </linearGradient>
    </defs>
    <rect width="800" height="520" fill="url(#bg)"/>
    <ellipse cx="400" cy="285" rx="260" ry="150" fill="#f8faf5" stroke="#375c31" stroke-width="18"/>
    <circle cx="330" cy="270" r="72" fill="#d6a445"/>
    <circle cx="435" cy="245" r="68" fill="#e7c15f"/>
    <circle cx="470" cy="340" r="58" fill="#82a94f"/>
    <path d="M205 185c60-90 150-115 245-95" fill="none" stroke="#5f8f41" stroke-width="22" stroke-linecap="round"/>
    <text x="400" y="478" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#17351f">LEMON HERB CHICKPEA BOWL</text>
  </svg>
`;

const mockBackend = async (
  page: Page,
  savePayloads: Record<string, unknown>[],
) => {
  await page.route('**/recipe-proof.svg', route =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: proofSvg }),
  );
  await page.route('**/api.dicebear.com/**', route =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: proofSvg }),
  );
  await page.route('**/functions/v1/make-server-dbaf6019/**', route => {
    const url = new URL(route.request().url());
    const endpoint = url.pathname.split('make-server-dbaf6019/')[1] ?? '';

    if (endpoint === 'get-meal-plans') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ plans: [] }),
      });
    }
    if (endpoint === 'generate-meal-plan') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ mealPlan: generatedMealPlan }),
      });
    }
    if (endpoint === 'save-meal-plan') {
      savePayloads.push(route.request().postDataJSON() as Record<string, unknown>);
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, planId: 'saved-plan-101' }),
      });
    }
    if (endpoint === 'cooked-meals') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ mealIds: [] }),
      });
    }
    if (endpoint === 'user-stats') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ mealsLogged: 0, totalCookingDays: 0 }),
      });
    }

    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  await page.route('**/auth/v1/**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
};

test('student sees a restored recipe image and can save the generated plan', async ({ page }) => {
  const savePayloads: Record<string, unknown>[] = [];
  await mockBackend(page, savePayloads);
  await page.addInitScript(
    ({ key, session }) => window.localStorage.setItem(key, JSON.stringify(session)),
    { key: STORAGE_KEY, session: buildSession() },
  );

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your Meal Plans' })).toBeVisible();
  await page.getByRole('button', { name: 'Create Plan' }).click();
  await page.getByRole('spinbutton', { name: 'Number of days' }).fill('1');
  await page.getByRole('spinbutton', { name: /budget per meal/i }).fill('3.50');
  await page.getByRole('button', { name: /Study Focus/ }).click();
  await page.getByRole('button', { name: /^Continue$/ }).click();

  await expect(page.getByText('Lemon Herb Chickpea Bowl')).toBeVisible();
  const recipeImage = page.getByRole('img', { name: 'Lemon Herb Chickpea Bowl' });
  await expect(recipeImage).toHaveAttribute('src', /recipe-proof\.svg/);
  await expect.poll(() => recipeImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole('button', { name: 'Schedule' })).toHaveCount(0);
  await page.screenshot({
    path: path.join(evidenceDir, 'restored-recipe-image-before-save.png'),
    fullPage: true,
  });

  await page.getByRole('button', { name: 'Save This Plan' }).click();
  await expect(page.getByRole('heading', { name: 'Currently Active' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'View Details' })).toBeVisible();
  const activePlanImage = page.getByRole('img', { name: /Meal Plan -/ }).first();
  await expect(activePlanImage).toHaveAttribute('src', /recipe-proof\.svg/);
  await expect.poll(() => activePlanImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  expect(savePayloads).toHaveLength(1);
  expect(savePayloads[0]).toMatchObject({
    userId: 'user-1',
    mealPlan: generatedMealPlan,
    preferences: {
      planDays: 1,
      goal: 'study',
      budgetPerMealGbp: 3.5,
    },
  });
  await page.screenshot({
    path: path.join(evidenceDir, 'saved-plan-active-dashboard.png'),
    fullPage: true,
  });
});
