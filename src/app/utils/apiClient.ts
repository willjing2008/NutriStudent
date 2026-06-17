import { supabase } from '../../utils/supabaseClient';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;

export const NETWORK_ERROR_MESSAGE = "We couldn't reach NutriStudent. Check your connection and try again.";
export const OFFLINE_ERROR_MESSAGE = "You're offline. Connect to the internet and try again.";

type ApiErrorBody = {
  error?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isBrowserOffline = (): boolean =>
  typeof navigator !== 'undefined' && navigator.onLine === false;

const networkErrorMessage = (): string =>
  isBrowserOffline() ? OFFLINE_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE;

const request = async (url: string, init: RequestInit): Promise<Response> => {
  try {
    return await fetch(url, init);
  } catch {
    throw new Error(networkErrorMessage());
  }
};

const readJson = async (res: Response): Promise<unknown> => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const responseErrorMessage = (body: unknown, status: number): string => {
  const apiError = isRecord(body) ? (body as ApiErrorBody).error : undefined;
  if (typeof apiError === 'string' && apiError.trim()) return apiError;
  return `API error: ${status}`;
};

const parseApiResponse = async <T>(res: Response): Promise<T> => {
  const data = await readJson(res);
  if (!res.ok) throw new Error(responseErrorMessage(data, res.status));
  return data as T;
};

export const getUserFacingApiErrorMessage = (
  error: unknown,
  fallback = NETWORK_ERROR_MESSAGE,
): string => {
  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
};

/**
 * Resolve the bearer token for a request. Reads the live session (so it picks
 * up supabase-js auto-refresh) and falls back to the public anon key when the
 * user is not logged in — authenticated endpoints will then correctly 401.
 */
async function getAuthToken(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token ?? publicAnonKey;
}

/**
 * Call an authenticated edge-function endpoint, sending the user's session JWT.
 * The backend derives the userId from this token — callers must NOT send a
 * userId in the body to identify themselves.
 */
export async function authedFetch(endpoint: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAuthToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  return request(`${API_BASE}/${endpoint}`, { ...init, headers });
}

export async function authedPost<T>(endpoint: string, body?: object): Promise<T> {
  const res = await authedFetch(endpoint, {
    method: 'POST',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseApiResponse<T>(res);
}

export async function authedGet<T>(endpoint: string): Promise<T> {
  const res = await authedFetch(endpoint, { method: 'GET' });
  return parseApiResponse<T>(res);
}

/**
 * Call a genuinely public endpoint (no user data) with the anon key. Edge
 * Functions still require a bearer at the gateway, so the anon key is correct
 * here.
 */
export async function publicPost<T>(endpoint: string, body?: object): Promise<T> {
  const res = await request(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseApiResponse<T>(res);
}

export { API_BASE };
