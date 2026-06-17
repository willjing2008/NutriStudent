import { expect, test, type Page } from '@playwright/test';

const blockDecorativeImages = async (page: Page) => {
  await page.route(/\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i, route => route.abort());
};

test.beforeEach(async ({ page }) => {
  await blockDecorativeImages(page);
});

test('opens the sign-in flow from the landing page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Eat Smart.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Study Hard.' })).toBeVisible();

  await page.getByRole('button', { name: 'I already have an account' }).click();

  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  await expect(page.getByPlaceholder('student@university.ac.uk')).toBeVisible();
  await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
});

test('renders auth errors without leaving the sign-in screen', async ({ page }) => {
  await page.route('**/auth/v1/token?grant_type=password', route =>
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'invalid_grant',
        error_description: 'Invalid login credentials',
      }),
    }),
  );

  await page.goto('/');
  await page.getByRole('button', { name: 'I already have an account' }).click();
  await page.getByPlaceholder('student@university.ac.uk').fill('wrong@example.com');
  await page.getByPlaceholder('Enter your password').fill('incorrect-password');
  await page.locator('form').getByRole('button', { name: /Sign In/ }).click();

  await expect(page.getByText('Invalid login credentials')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
});

test('shows and clears the offline banner', async ({ page, context }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Eat Smart.' })).toBeVisible();

  await context.setOffline(true);
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));

  await expect(page.getByRole('status')).toContainText('No internet connection');
  await expect(page.getByRole('status')).toContainText('Saved meal plans still work');

  await context.setOffline(false);
  await page.evaluate(() => window.dispatchEvent(new Event('online')));

  await expect(page.getByRole('status')).toBeHidden();
});
