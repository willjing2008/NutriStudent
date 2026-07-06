import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// --- Mock the supabase client module that apiClient imports. ---
// We control auth.getSession so we can drive the "logged in" vs "anon" branches.
// vi.hoisted lets the mock fn exist before the hoisted vi.mock factory runs.
const { getSession } = vi.hoisted(() => ({ getSession: vi.fn() }));
vi.mock('../../utils/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession,
    },
  },
}));

import {
  authedFetch,
  authedPost,
  authedGet,
  publicPost,
  API_BASE,
  NETWORK_ERROR_MESSAGE,
  OFFLINE_ERROR_MESSAGE,
} from './apiClient';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

type SessionResult = {
  data: { session: { access_token: string } | null };
};

const loggedIn = (token: string): SessionResult => ({
  data: { session: { access_token: token } },
});

const loggedOut = (): SessionResult => ({ data: { session: null } });

// Build a minimal Response-like object so we don't depend on a real fetch impl.
const jsonResponse = (
  body: unknown,
  init: { ok?: boolean; status?: number } = {},
): Response => {
  const { ok = true, status = 200 } = init;
  return {
    ok,
    status,
    json: async () => body,
  } as unknown as Response;
};

const getFetchMock = (): ReturnType<typeof vi.fn> =>
  global.fetch as unknown as ReturnType<typeof vi.fn>;

const setNavigatorOnline = (isOnline: boolean) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value: isOnline,
  });
};

beforeEach(() => {
  getSession.mockReset();
  getSession.mockResolvedValue(loggedOut());
  setNavigatorOnline(true);
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('API_BASE', () => {
  it('points at the project edge-function base', () => {
    expect(API_BASE).toBe(
      `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`,
    );
  });
});

describe('authedFetch', () => {
  it('attaches the session JWT as a Bearer token when logged in', async () => {
    getSession.mockResolvedValue(loggedIn('user-jwt-123'));
    getFetchMock().mockResolvedValue(jsonResponse({}));

    await authedFetch('me');

    const [url, init] = getFetchMock().mock.calls[0];
    expect(url).toBe(`${API_BASE}/me`);
    const headers = new Headers(init.headers);
    expect(headers.get('Authorization')).toBe('Bearer user-jwt-123');
  });

  it('falls back to the anon key when there is no session', async () => {
    getSession.mockResolvedValue(loggedOut());
    getFetchMock().mockResolvedValue(jsonResponse({}));

    await authedFetch('me');

    const [, init] = getFetchMock().mock.calls[0];
    const headers = new Headers(init.headers);
    expect(headers.get('Authorization')).toBe(`Bearer ${publicAnonKey}`);
  });

  it('sets Content-Type application/json when a body is present', async () => {
    getSession.mockResolvedValue(loggedIn('t'));
    getFetchMock().mockResolvedValue(jsonResponse({}));

    await authedFetch('meals', { method: 'POST', body: JSON.stringify({ a: 1 }) });

    const [, init] = getFetchMock().mock.calls[0];
    const headers = new Headers(init.headers);
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('does not set Content-Type when there is no body', async () => {
    getSession.mockResolvedValue(loggedIn('t'));
    getFetchMock().mockResolvedValue(jsonResponse({}));

    await authedFetch('me', { method: 'GET' });

    const [, init] = getFetchMock().mock.calls[0];
    const headers = new Headers(init.headers);
    expect(headers.has('Content-Type')).toBe(false);
  });

  it('does not override a caller-supplied Content-Type', async () => {
    getSession.mockResolvedValue(loggedIn('t'));
    getFetchMock().mockResolvedValue(jsonResponse({}));

    await authedFetch('upload', {
      method: 'POST',
      body: JSON.stringify({ a: 1 }),
      headers: { 'Content-Type': 'text/plain' },
    });

    const [, init] = getFetchMock().mock.calls[0];
    const headers = new Headers(init.headers);
    expect(headers.get('Content-Type')).toBe('text/plain');
  });

  it('does not set Content-Type for FormData bodies', async () => {
    getSession.mockResolvedValue(loggedIn('t'));
    getFetchMock().mockResolvedValue(jsonResponse({}));

    const form = new FormData();
    form.append('file', 'x');
    await authedFetch('upload', { method: 'POST', body: form });

    const [, init] = getFetchMock().mock.calls[0];
    const headers = new Headers(init.headers);
    expect(headers.has('Content-Type')).toBe(false);
  });
});

describe('authedPost', () => {
  it('sends a POST with the serialized body and returns parsed json', async () => {
    getSession.mockResolvedValue(loggedIn('jwt-post'));
    getFetchMock().mockResolvedValue(jsonResponse({ id: 7, name: 'plan' }));

    const result = await authedPost<{ id: number; name: string }>('plans', {
      name: 'plan',
    });

    expect(result).toEqual({ id: 7, name: 'plan' });
    const [url, init] = getFetchMock().mock.calls[0];
    expect(url).toBe(`${API_BASE}/plans`);
    expect(init.method).toBe('POST');
    expect(init.body).toBe(JSON.stringify({ name: 'plan' }));
    const headers = new Headers(init.headers);
    expect(headers.get('Authorization')).toBe('Bearer jwt-post');
  });

  it('sends an undefined body when none is provided', async () => {
    getSession.mockResolvedValue(loggedIn('jwt'));
    getFetchMock().mockResolvedValue(jsonResponse({ ok: true }));

    await authedPost('ping');

    const [, init] = getFetchMock().mock.calls[0];
    expect(init.body).toBeUndefined();
  });

  it('throws the API error message on a non-ok response', async () => {
    getSession.mockResolvedValue(loggedIn('jwt'));
    getFetchMock().mockResolvedValue(
      jsonResponse({ error: 'Not allowed' }, { ok: false, status: 403 }),
    );

    await expect(authedPost('plans', {})).rejects.toThrow('Not allowed');
  });

  it('throws a generic status message when the error field is absent', async () => {
    getSession.mockResolvedValue(loggedIn('jwt'));
    getFetchMock().mockResolvedValue(
      jsonResponse({}, { ok: false, status: 500 }),
    );

    await expect(authedPost('plans', {})).rejects.toThrow('API error: 500');
  });

  it('throws a user-facing network message when fetch rejects', async () => {
    getSession.mockResolvedValue(loggedIn('jwt'));
    getFetchMock().mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(authedPost('plans', {})).rejects.toThrow(NETWORK_ERROR_MESSAGE);
  });
});

describe('authedGet', () => {
  it('sends a GET and returns parsed json', async () => {
    getSession.mockResolvedValue(loggedIn('jwt-get'));
    getFetchMock().mockResolvedValue(jsonResponse({ items: [1, 2] }));

    const result = await authedGet<{ items: number[] }>('meals');

    expect(result).toEqual({ items: [1, 2] });
    const [url, init] = getFetchMock().mock.calls[0];
    expect(url).toBe(`${API_BASE}/meals`);
    expect(init.method).toBe('GET');
    const headers = new Headers(init.headers);
    expect(headers.get('Authorization')).toBe('Bearer jwt-get');
  });

  it('throws on a non-ok response', async () => {
    getSession.mockResolvedValue(loggedIn('jwt'));
    getFetchMock().mockResolvedValue(
      jsonResponse({ error: 'Unauthorized' }, { ok: false, status: 401 }),
    );

    await expect(authedGet('meals')).rejects.toThrow('Unauthorized');
  });
});

describe('publicPost', () => {
  it('uses the anon key as the Bearer token regardless of session', async () => {
    // Even when a user IS logged in, publicPost must use the anon key.
    getSession.mockResolvedValue(loggedIn('a-user-jwt'));
    getFetchMock().mockResolvedValue(jsonResponse({ ok: true }));

    await publicPost('signup', { email: 'a@b.com' });

    expect(getSession).not.toHaveBeenCalled();
    const [url, init] = getFetchMock().mock.calls[0];
    expect(url).toBe(`${API_BASE}/signup`);
    expect(init.method).toBe('POST');
    expect(init.body).toBe(JSON.stringify({ email: 'a@b.com' }));
    const headers = new Headers(init.headers);
    expect(headers.get('Authorization')).toBe(`Bearer ${publicAnonKey}`);
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('sends an undefined body when none is provided', async () => {
    getFetchMock().mockResolvedValue(jsonResponse({ ok: true }));

    await publicPost('health');

    const [, init] = getFetchMock().mock.calls[0];
    expect(init.body).toBeUndefined();
  });

  it('throws the API error message on a non-ok response', async () => {
    getFetchMock().mockResolvedValue(
      jsonResponse({ error: 'Bad request' }, { ok: false, status: 400 }),
    );

    await expect(publicPost('signup', {})).rejects.toThrow('Bad request');
  });

  it('throws a generic status message when the error field is absent', async () => {
    getFetchMock().mockResolvedValue(
      jsonResponse({}, { ok: false, status: 502 }),
    );

    await expect(publicPost('signup', {})).rejects.toThrow('API error: 502');
  });

  it('prefers the offline message when the browser reports no connection', async () => {
    setNavigatorOnline(false);
    getFetchMock().mockRejectedValue(new TypeError('Load failed'));

    await expect(publicPost('signup', {})).rejects.toThrow(OFFLINE_ERROR_MESSAGE);
  });
});
