import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useRecipeImage } from './useRecipeImage';
import { authedPost } from '../utils/apiClient';

vi.mock('../utils/apiClient', () => ({
  authedPost: vi.fn(),
}));

const authedPostMock = vi.mocked(authedPost);

describe('useRecipeImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles null image-generation rejections without throwing', async () => {
    authedPostMock.mockRejectedValue(null);

    const { result } = renderHook(() => useRecipeImage({
      recipeId: 'recipe-1',
      imageQuery: 'https://example.com/original.jpg',
    }));

    await act(async () => {
      await result.current.generateAndStore();
    });

    expect(result.current.error).toBe('Failed to generate image');
    expect(result.current.imageUrl).toBe('');
    expect(result.current.isStored).toBe(false);
  });

  it('stores a generated image without writing debug logs', async () => {
    authedPostMock.mockResolvedValue({
      success: true,
      imageUrl: 'https://example.com/stored.jpg',
      cached: true,
    });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { result } = renderHook(() => useRecipeImage({
      recipeId: 'recipe-1',
      imageQuery: 'https://example.com/original.jpg',
    }));

    await act(async () => {
      await result.current.generateAndStore();
    });

    await waitFor(() => expect(result.current.imageUrl).toBe('https://example.com/stored.jpg'));
    expect(result.current.isStored).toBe(true);
    expect(logSpy).not.toHaveBeenCalled();
  });
});
