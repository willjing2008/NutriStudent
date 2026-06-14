import { supabase } from '../../utils/supabaseClient';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;

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
  return fetch(`${API_BASE}/${endpoint}`, { ...init, headers });
}

export async function authedPost<T>(endpoint: string, body?: object): Promise<T> {
  const res = await authedFetch(endpoint, {
    method: 'POST',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `API error: ${res.status}`);
  return data as T;
}

export async function authedGet<T>(endpoint: string): Promise<T> {
  const res = await authedFetch(endpoint, { method: 'GET' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `API error: ${res.status}`);
  return data as T;
}

/**
 * Call a genuinely public endpoint (no user data) with the anon key. Edge
 * Functions still require a bearer at the gateway, so the anon key is correct
 * here.
 */
export async function publicPost<T>(endpoint: string, body?: object): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `API error: ${res.status}`);
  return data as T;
}

export { API_BASE };
