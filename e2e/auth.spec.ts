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

test.describe('mobile offline banner', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    hasTouch: true,
    isMobile: true,
  });

  test('dismisses only for the current offline episode', async ({ page, context }, testInfo) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Eat Smart.' })).toBeVisible();

    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));

    const banner = page.getByRole('status');
    const dismiss = page.getByRole('button', { name: 'Dismiss' });
    await expect(banner).toContainText('No internet connection');
    await expect(banner).toContainText('Saved meal plans still work');
    await expect(banner).toHaveAttribute('aria-live', 'polite');
    await expect(dismiss.locator('svg')).toHaveClass(/lucide-x/);

    const dismissBox = await dismiss.boundingBox();
    expect(dismissBox).not.toBeNull();
    expect(dismissBox!.width).toBeGreaterThanOrEqual(44);
    expect(dismissBox!.height).toBeGreaterThanOrEqual(44);

    const bannerBox = await banner.boundingBox();
    expect(bannerBox).not.toBeNull();
    expect(bannerBox!.y).toBeGreaterThanOrEqual(12);

    await page.screenshot({
      path: testInfo.outputPath('offline-banner-mobile.png'),
      fullPage: true,
      animations: 'disabled',
    });

    await dismiss.click();
    await expect(banner).toBeHidden();

    await page.getByRole('button', { name: 'I already have an account' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
    await expect(banner).toBeHidden();

    await context.setOffline(false);
    await page.evaluate(() => window.dispatchEvent(new Event('online')));
    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));

    await expect(banner).toContainText('No internet connection');
    await page.evaluate(
      () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
    );
    await banner.screenshot({
      path: testInfo.outputPath('offline-banner-fresh-episode-mobile.png'),
      animations: 'disabled',
    });
  });
});
