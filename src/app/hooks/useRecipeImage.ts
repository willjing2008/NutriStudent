import { useState, useEffect, useRef } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { authedPost } from '../utils/apiClient';

interface UseRecipeImageOptions {
  recipeId: string;
  imageQuery: string;
  cuisine?: string;
  autoGenerate?: boolean; // Whether to automatically generate and store the image
}

interface UseRecipeImageResult {
  imageUrl: string;
  isLoading: boolean;
  error: string | null;
  isStored: boolean; // Whether the image is permanently stored
  generateAndStore: () => Promise<void>; // Manual trigger to generate and store
}

/**
 * Hook to manage recipe images with permanent storage
 * 
 * Usage:
 * const { imageUrl, isLoading, isStored, generateAndStore } = useRecipeImage({
 *   recipeId: 'one-pot-chicken-rice',
 *   imageQuery: 'chicken rice bowl',
 *   autoGenerate: false  // Set to true to auto-generate on mount
 * });
 */
export function useRecipeImage({
  recipeId,
  imageQuery,
  cuisine = 'base',
  autoGenerate = false
}: UseRecipeImageOptions): UseRecipeImageResult {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isStored, setIsStored] = useState<boolean>(false);
  const hasAttemptedLoad = useRef(false);

  const generateAndStore = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authedPost<{ success?: boolean; imageUrl?: string; cached?: boolean }>(
        'generate-recipe-image',
        { imageQuery, recipeId, cuisine },
      );

      if (data.success && data.imageUrl) {
        setImageUrl(data.imageUrl);
        setIsStored(true);
        console.log(`✓ Image ${data.cached ? 'loaded from cache' : 'generated and stored'} for ${recipeId}`);
      } else {
        throw new Error('Invalid response from image generation endpoint');
      }
    } catch (err: any) {
      console.error(`Error generating image for ${recipeId}:`, err);
      setError(err.message || 'Failed to generate image');
      setImageUrl('');
      setIsStored(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Try to load stored image on mount (only once)
  useEffect(() => {
    if (hasAttemptedLoad.current || !recipeId) {
      return;
    }

    hasAttemptedLoad.current = true;

    // Short-circuit: if imageQuery looks like a direct URL (from allrecipes), use it directly
    if (imageQuery && (imageQuery.startsWith('http://') || imageQuery.startsWith('https://'))) {
      setImageUrl(imageQuery);
      setIsStored(true);
      return;
    }

    if (!imageQuery) return;

    const loadStoredImage = async () => {
      setImageUrl('');

      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/recipe-image/${recipeId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.imageUrl) {
            setImageUrl(data.imageUrl);
            setIsStored(true);
            return;
          }
        }

        // If no stored image exists and autoGenerate is true, generate it
        if (autoGenerate) {
          await generateAndStore();
        } else {
          setIsStored(false);
        }
      } catch (err: any) {
        setImageUrl('');
        setIsStored(false);
      }
    };

    loadStoredImage();
  }, []); // Empty dependency array - only run once on mount

  return {
    imageUrl,
    isLoading,
    error,
    isStored,
    generateAndStore
  };
}
