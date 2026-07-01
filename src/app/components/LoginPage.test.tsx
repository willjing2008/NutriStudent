import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ── Mocks ────────────────────────────────────────────────────────────────────
// LoginPage talks to four external surfaces. We mock all of them so the screen
// renders in isolation and we can assert which auth path it drives.

// 1. Supabase client — the sign-in path calls auth.signInWithPassword.
//    vi.hoisted lets the spy exist before the hoisted vi.mock factory runs.
const { signInWithPassword } = vi.hoisted(() => ({
  signInWithPassword: vi.fn(),
}));
vi.mock('../../utils/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithPassword,
    },
  },
}));

// 2. Subscription context — the component calls useSubscription() at render.
//    isPro is false so the auto-login paywall effect never fires during tests.
const { rcIdentify } = vi.hoisted(() => ({ rcIdentify: vi.fn() }));
vi.mock('../hooks/useSubscription', () => ({
  useSubscription: () => ({
    isPro: false,
    identify: rcIdentify,
  }),
}));

// 3. Post-signup step components — replaced with markers so we can detect the
//    transition without pulling in their own dependencies.
vi.mock('./SchoolSelectionStep', () => ({
  SchoolSelectionStep: ({ userId }: { userId: string }) => (
    <div data-testid="school-step">school step for {userId}</div>
  ),
}));
vi.mock('./SubscriptionPage', () => ({
  SubscriptionPage: () => <div data-testid="subscription-page">paywall</div>,
}));

import { LoginPage } from './LoginPage';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// ── Helpers ──────────────────────────────────────────────────────────────────

type SignInResult = {
  data: {
    user: { id: string } | null;
    session: { access_token: string } | null;
  };
  error: { message: string } | null;
};

const signInSuccess = (
  token = 'access-token-xyz',
  user = { id: 'user-1' },
): SignInResult => ({
  data: { user, session: { access_token: token } },
  error: null,
});

const signInError = (message: string): SignInResult => ({
  data: { user: null, session: null },
  error: { message },
});

const jsonResponse = (
  body: unknown,
  init: { ok?: boolean; status?: number } = {},
): Response => {
  const { ok = true, status = 200 } = init;
  return { ok, status, json: async () => body } as unknown as Response;
};

const getFetchMock = (): ReturnType<typeof vi.fn> =>
  global.fetch as unknown as ReturnType<typeof vi.fn>;

// Open the auth form from the landing page in the requested mode.
const openForm = (mode: 'signin' | 'signup') => {
  fireEvent.click(
    screen.getByText(
      mode === 'signup' ? 'Build Your Plan' : 'I already have an account',
    ),
  );
};

const typeInto = (label: RegExp, value: string) => {
  fireEvent.change(screen.getByPlaceholderText(label), {
    target: { value },
  });
};

// The form's submit button shares its label ("Sign In") with the tab switcher,
// so target it by type to disambiguate.
const submitForm = () => {
  const form = document.querySelector('form');
  const submit = form?.querySelector('button[type="submit"]');
  fireEvent.click(submit as HTMLElement);
};

beforeEach(() => {
  signInWithPassword.mockReset();
  rcIdentify.mockReset();
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ── Landing page ─────────────────────────────────────────────────────────────

describe('LoginPage — landing page', () => {
  it('shows the two landing CTAs before any auth form', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);

    expect(screen.getByText('Build Your Plan')).toBeInTheDocument();
    expect(screen.getByText('I already have an account')).toBeInTheDocument();
    // Form fields are not mounted yet.
    expect(
      screen.queryByPlaceholderText(/student@university/),
    ).not.toBeInTheDocument();
  });

  it('"Build Your Plan" opens the form in sign-up mode (name field shown)', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);

    openForm('signup');

    expect(
      screen.getByRole('heading', { name: 'Create Account' }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('"I already have an account" opens the form in sign-in mode (no name field)', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);

    openForm('signin');

    expect(
      screen.getByRole('heading', { name: 'Welcome Back' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Enter your name'),
    ).not.toBeInTheDocument();
  });
});

// ── Sign in / sign up toggle ─────────────────────────────────────────────────

describe('LoginPage — mode toggle', () => {
  it('switches from sign-in to sign-up via the tab switcher', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);
    openForm('signin');

    expect(screen.queryByPlaceholderText('Enter your name')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(
      screen.getByRole('heading', { name: 'Create Account' }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('switches from sign-up to sign-in via the footer "Sign in" link', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);
    openForm('signup');

    // Footer link (distinct from the tab "Sign In").
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(
      screen.getByRole('heading', { name: 'Welcome Back' }),
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Enter your name')).toBeNull();
  });
});

// ── Field validation (native HTML constraints) ───────────────────────────────

describe('LoginPage — field validation', () => {
  it('marks email and password required, with email type', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);
    openForm('signin');

    const email = screen.getByPlaceholderText(/student@university/);
    const password = screen.getByPlaceholderText('Enter your password');

    expect(email).toBeRequired();
    expect(email).toHaveAttribute('type', 'email');
    expect(password).toBeRequired();
  });

  it('enforces a 6-char minimum password only in sign-up mode', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);

    openForm('signup');
    expect(screen.getByPlaceholderText('Create a strong password')).toHaveAttribute(
      'minLength',
      '6',
    );
    expect(screen.getByPlaceholderText('Enter your name')).toBeRequired();

    // Sign-in mode drops the minLength constraint.
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(
      screen.getByPlaceholderText('Enter your password'),
    ).not.toHaveAttribute('minLength');
  });
});

// ── Sign in path ─────────────────────────────────────────────────────────────

describe('LoginPage — sign in', () => {
  it('calls signInWithPassword with the entered credentials and signals success', async () => {
    const onLoginSuccess = vi.fn();
    signInWithPassword.mockResolvedValue(signInSuccess('tok-99', { id: 'u-42' }));

    render(<LoginPage onLoginSuccess={onLoginSuccess} />);
    openForm('signin');

    typeInto(/student@university/, 'will@uni.ac.uk');
    typeInto(/Enter your password/, 'hunter2!');
    submitForm();

    await waitFor(() => {
      expect(signInWithPassword).toHaveBeenCalledWith({
        email: 'will@uni.ac.uk',
        password: 'hunter2!',
      });
    });
    expect(onLoginSuccess).toHaveBeenCalledWith({ id: 'u-42' }, 'tok-99');
    // No network call on the sign-in path.
    expect(getFetchMock()).not.toHaveBeenCalled();
  });

  it('renders the auth error message and does not call onLoginSuccess', async () => {
    const onLoginSuccess = vi.fn();
    signInWithPassword.mockResolvedValue(
      signInError('Invalid login credentials'),
    );

    render(<LoginPage onLoginSuccess={onLoginSuccess} />);
    openForm('signin');

    typeInto(/student@university/, 'will@uni.ac.uk');
    typeInto(/Enter your password/, 'wrongpass');
    submitForm();

    expect(
      await screen.findByText('Invalid login credentials'),
    ).toBeInTheDocument();
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });

  it('shows a generic error when sign-in succeeds but no session is returned', async () => {
    const onLoginSuccess = vi.fn();
    signInWithPassword.mockResolvedValue({
      data: { user: { id: 'u-1' }, session: null },
      error: null,
    } as SignInResult);

    render(<LoginPage onLoginSuccess={onLoginSuccess} />);
    openForm('signin');

    typeInto(/student@university/, 'will@uni.ac.uk');
    typeInto(/Enter your password/, 'hunter2!');
    submitForm();

    expect(await screen.findByText('No session returned')).toBeInTheDocument();
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });
});

// ── Sign up path ─────────────────────────────────────────────────────────────

describe('LoginPage — sign up', () => {
  it('POSTs the signup endpoint with name/email/password and advances to school selection', async () => {
    getFetchMock().mockResolvedValue(
      jsonResponse({ user: { id: 'new-user-7' } }),
    );

    render(<LoginPage onLoginSuccess={vi.fn()} />);
    openForm('signup');

    typeInto(/Enter your name/, 'Will T');
    typeInto(/student@university/, 'will@uni.ac.uk');
    typeInto(/Create a strong password/, 'sixchars');
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() =>
      expect(screen.getByTestId('school-step')).toBeInTheDocument(),
    );
    expect(screen.getByText('school step for new-user-7')).toBeInTheDocument();

    const [url, init] = getFetchMock().mock.calls[0];
    expect(url).toBe(
      `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/auth/signup`,
    );
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toEqual({
      email: 'will@uni.ac.uk',
      password: 'sixchars',
      name: 'Will T',
    });
    expect((init.headers as Record<string, string>).Authorization).toBe(
      `Bearer ${publicAnonKey}`,
    );
  });

  it('renders the server error from a failed signup and stays on the form', async () => {
    getFetchMock().mockResolvedValue(
      jsonResponse({ error: 'Email already registered' }, { ok: false, status: 400 }),
    );

    render(<LoginPage onLoginSuccess={vi.fn()} />);
    openForm('signup');

    typeInto(/Enter your name/, 'Will T');
    typeInto(/student@university/, 'taken@uni.ac.uk');
    typeInto(/Create a strong password/, 'sixchars');
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(
      await screen.findByText('Email already registered'),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('school-step')).not.toBeInTheDocument();
  });
});

// ── Password visibility toggle ───────────────────────────────────────────────

describe('LoginPage — password visibility', () => {
  it('toggles the password field between hidden and visible', () => {
    render(<LoginPage onLoginSuccess={vi.fn()} />);
    openForm('signin');

    const password = screen.getByPlaceholderText('Enter your password');
    expect(password).toHaveAttribute('type', 'password');

    // The eye toggle is the only non-submit button inside the form area.
    const toggle = password.parentElement?.querySelector('button[type="button"]');
    expect(toggle).not.toBeNull();
    fireEvent.click(toggle as HTMLElement);

    expect(password).toHaveAttribute('type', 'text');
  });
});
