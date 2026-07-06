import { afterEach, describe, expect, it, vi } from 'vitest';
import { getRecipeImage, getRecipeImageWithCache } from './recipeImages';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// Helper: build a minimal Response-like object for the function under test,
// which only reads `.ok` and `.json()`.
function fakeResponse(body: unknown, ok = true): Response {
  return {
    ok,
    json: async () => body,
  } as unknown as Response;
}

describe('getRecipeImage', () => {
  it('always returns undefined (images come from Supabase Storage now)', () => {
    expect(getRecipeImage('recipe-1')).toBeUndefined();
  });

  it('ignores the optional imageQuery argument and still returns undefined', () => {
    expect(getRecipeImage('recipe-1', 'grilled chicken')).toBeUndefined();
  });

  it('returns undefined even for empty inputs', () => {
    expect(getRecipeImage('', '')).toBeUndefined();
  });
});

describe('getRecipeImageWithCache', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('URL short-circuit (no network)', () => {
    it('returns an https URL directly without calling fetch', async () => {
      const fetchSpy = vi.fn();
      vi.stubGlobal('fetch', fetchSpy);

      const url = 'https://images.example.com/photo.jpg';
      const result = await getRecipeImageWithCache('r1', url);

      expect(result).toBe(url);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('returns an http URL directly without calling fetch', async () => {
      const fetchSpy = vi.fn();
      vi.stubGlobal('fetch', fetchSpy);

      const url = 'http://images.example.com/photo.jpg';
      const result = await getRecipeImageWithCache('r1', url);

      expect(result).toBe(url);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('does NOT short-circuit a query that merely contains "http" mid-string', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(fakeResponse({ success: true, imageUrl: 'x' }));
      vi.stubGlobal('fetch', fetchSpy);

      // "http" not at the start -> not treated as a direct URL.
      await getRecipeImageWithCache('r1', 'see http for chicken');

      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('cache-server path (fetch)', () => {
    it('returns the imageUrl when the server responds success:true', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(
          fakeResponse({ success: true, imageUrl: 'https://cdn/abc.jpg' }),
        );
      vi.stubGlobal('fetch', fetchSpy);

      const result = await getRecipeImageWithCache('r1', 'pasta', 'italian');

      expect(result).toBe('https://cdn/abc.jpg');
    });

    it('returns null when the server responds success:false', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(fakeResponse({ success: false, imageUrl: 'unused' }));
      vi.stubGlobal('fetch', fetchSpy);

      const result = await getRecipeImageWithCache('r1', 'pasta');

      expect(result).toBeNull();
    });

    it('returns null when success is missing/undefined in the payload', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(fakeResponse({ imageUrl: 'https://cdn/abc.jpg' }));
      vi.stubGlobal('fetch', fetchSpy);

      const result = await getRecipeImageWithCache('r1', 'pasta');

      expect(result).toBeNull();
    });

    it('returns null when the response is not ok (e.g. 500)', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(fakeResponse({ success: true, imageUrl: 'x' }, false));
      vi.stubGlobal('fetch', fetchSpy);

      const result = await getRecipeImageWithCache('r1', 'pasta');

      expect(result).toBeNull();
    });

    it('returns null and swallows the error when fetch rejects', async () => {
      const fetchSpy = vi.fn().mockRejectedValue(new Error('network down'));
      vi.stubGlobal('fetch', fetchSpy);

      const result = await getRecipeImageWithCache('r1', 'pasta');

      expect(result).toBeNull();
    });

    it('returns null when response.json() rejects (malformed body)', async () => {
      const badResponse = {
        ok: true,
        json: async () => {
          throw new Error('invalid json');
        },
      } as unknown as Response;
      const fetchSpy = vi.fn().mockResolvedValue(badResponse);
      vi.stubGlobal('fetch', fetchSpy);

      const result = await getRecipeImageWithCache('r1', 'pasta');

      expect(result).toBeNull();
    });
  });

  describe('request construction', () => {
    it('POSTs to the cache endpoint with auth headers and a JSON body', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(fakeResponse({ success: true, imageUrl: 'ok' }));
      vi.stubGlobal('fetch', fetchSpy);

      await getRecipeImageWithCache('recipe-42', 'tofu stir fry', 'asian');

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [calledUrl, options] = fetchSpy.mock.calls[0] as [
        string,
        RequestInit,
      ];

      expect(calledUrl).toBe(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/get-recipe-image-with-cache`,
      );
      expect(options.method).toBe('POST');
      expect(options.headers).toMatchObject({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      });
      expect(JSON.parse(options.body as string)).toEqual({
        recipeId: 'recipe-42',
        imageQuery: 'tofu stir fry',
        cuisine: 'asian',
      });
    });

    it('defaults cuisine to "base" when the argument is omitted', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(fakeResponse({ success: true, imageUrl: 'ok' }));
      vi.stubGlobal('fetch', fetchSpy);

      await getRecipeImageWithCache('recipe-7', 'salad');

      const [, options] = fetchSpy.mock.calls[0] as [string, RequestInit];
      expect(JSON.parse(options.body as string)).toEqual({
        recipeId: 'recipe-7',
        imageQuery: 'salad',
        cuisine: 'base',
      });
    });

    it('falls through to fetch when imageQuery is an empty string (falsy short-circuit guard)', async () => {
      const fetchSpy = vi
        .fn()
        .mockResolvedValue(fakeResponse({ success: true, imageUrl: 'ok' }));
      vi.stubGlobal('fetch', fetchSpy);

      const result = await getRecipeImageWithCache('recipe-8', '');

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe('ok');
    });
  });
});
