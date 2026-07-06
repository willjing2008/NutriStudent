import { expect, test, type Page } from '@playwright/test';

// Evidence output dir for this validation run.
const EVIDENCE =
  '/var/folders/s_/g8wv8cnn0031gt1lysnfftkr0000gn/T/no-mistakes-evidence/01KWJKZRS5E19NBGDJA0HK5AAV';

const PROJECT = 'awufigzenzypanymzoqy';
const FN = `https://${PROJECT}.supabase.co/functions/v1/make-server-dbaf6019`;

const b64url = (obj: unknown) =>
  Buffer.from(JSON.stringify(obj))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

// A decodable JWT — supabase-js decodes the access_token to read its expiry, so
// a non-JWT string makes getSession() treat the session as invalid and return
// null (which would make authedPost fall back to the anon key).
const JWT = `${b64url({ alg: 'HS256', typ: 'JWT' })}.${b64url({
  sub: 'new-user-7',
  role: 'authenticated',
  aud: 'authenticated',
  exp: Math.floor(Date.now() / 1000) + 3600,
  iat: Math.floor(Date.now() / 1000),
})}.sig`;

// A valid-looking supabase-js session body so signInWithPassword persists a
// session and getSession() (used by authedPost) later returns this JWT.
const sessionBody = (accessToken: string, userId: string) => ({
  access_token: accessToken,
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: 'refresh-token-abc',
  user: {
    id: userId,
    aud: 'authenticated',
    role: 'authenticated',
    email: 'will@uni.ac.uk',
    app_metadata: {},
    user_metadata: {},
    created_at: '2026-07-03T00:00:00Z',
  },
});

const blockDecorativeImages = async (page: Page) => {
  await page.route(/\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i, route => route.abort());
};

const fillSignupForm = async (page: Page) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Build Your Plan' }).click();
  await page.getByPlaceholder('Enter your name').fill('Will T');
  await page.getByPlaceholder('student@university.ac.uk').fill('will@uni.ac.uk');
  await page.getByPlaceholder('Create a strong password').fill('sixchars');
};

test.beforeEach(async ({ page }) => {
  await blockDecorativeImages(page);
});

test('fresh signup gets a session JWT and onboarding authed calls do NOT 401', async ({
  page,
}) => {
  // Records the Authorization header the app sent on each authed onboarding call.
  const authedCalls: Record<string, string | undefined> = {};

  // 1. Edge signup route: creates the user, returns NO session (as in prod).
  await page.route(`${FN}/auth/signup`, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ user: { id: 'new-user-7' } }),
    }),
  );

  // 2. Supabase sign-in (signInWithPassword) — succeeds, hands back a session.
  await page.route(/\/auth\/v1\/token/, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(sessionBody(JWT, 'new-user-7')),
    }),
  );

  // 3. Public school search (anon key is fine here).
  await page.route(`${FN}/schools/search*`, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        schools: [{ id: 's1', name: 'University of Testville' }],
      }),
    }),
  );

  // 4. AUTHED onboarding call — this is the one that used to 401. It must carry
  //    the session JWT, not the anon key. We reproduce the server's auth check:
  //    JWT present -> 200, otherwise -> 401 (the pre-fix behaviour).
  const guardAuthed = (name: string) => (route: import('@playwright/test').Route) => {
    const auth = route.request().headers()['authorization'];
    authedCalls[name] = auth;
    if (auth === `Bearer ${JWT}`) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    } else {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Unauthorized' }),
      });
    }
  };
  await page.route(`${FN}/schools/select`, guardAuthed('schools/select'));
  await page.route(`${FN}/auth/update-profile`, guardAuthed('auth/update-profile'));

  // ── Drive the signup ────────────────────────────────────────────────────
  await fillSignupForm(page);
  await page.locator('form').getByRole('button', { name: 'Create Account' }).click();

  // Advanced to school selection — the session was established first.
  await expect(
    page.getByRole('heading', { name: 'Select Your School' }),
  ).toBeVisible();
  await expect(page.getByText('University of Testville')).toBeVisible();
  await page.screenshot({
    path: `${EVIDENCE}/01-signup-advances-to-school-selection.png`,
  });

  // Pick a school and continue -> triggers authedPost('schools/select').
  await page.getByRole('button', { name: /University of Testville/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();

  // Reaching the gender step proves schools/select returned 200 (JWT accepted),
  // i.e. the onboarding authed call did NOT 401.
  await expect(
    page.getByRole('heading', { name: 'Select Your Gender' }),
  ).toBeVisible();
  await page.screenshot({
    path: `${EVIDENCE}/02-authed-onboarding-call-succeeded-gender-step.png`,
  });

  // The authed onboarding call carried the session JWT (not the anon key).
  expect(authedCalls['schools/select']).toBe(`Bearer ${JWT}`);
});

test('signup whose post-signup sign-in fails shows recovery copy and flips to sign-in', async ({
  page,
}) => {
  await page.route(`${FN}/auth/signup`, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ user: { id: 'new-user-7' } }),
    }),
  );
  // Sign-in fails this time.
  await page.route(/\/auth\/v1\/token/, route =>
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'invalid_grant',
        error_description: 'Invalid login credentials',
      }),
    }),
  );
  // Keep the school-search backend out of it (unreached, but no live calls).
  await page.route(`${FN}/schools/search*`, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ schools: [] }),
    }),
  );

  await fillSignupForm(page);
  await page.locator('form').getByRole('button', { name: 'Create Account' }).click();

  // Does not proceed into onboarding; shows a clear recovery message and flips
  // the form to sign-in mode (account WAS created).
  await expect(
    page.getByText(
      'Your account was created, but signing you in failed. Please sign in with your new email and password.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Select Your School' }),
  ).toHaveCount(0);
  await page.screenshot({
    path: `${EVIDENCE}/03-signin-failure-recovery-copy.png`,
  });
});
