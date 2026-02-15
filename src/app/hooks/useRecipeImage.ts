import { useState, useEffect, useRef } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

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

  // Fallback to temporary Pollinations.ai URL
  const temporaryImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imageQuery)}?width=800&height=600&nologo=true`;

  const generateAndStore = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/generate-recipe-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            imageQuery,
            recipeId,
            cuisine
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate and store image');
      }

      const data = await response.json();

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
      // Fallback to temporary URL
      setImageUrl(temporaryImageUrl);
      setIsStored(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Try to load stored image on mount (only once)
  useEffect(() => {
    if (hasAttemptedLoad.current || !recipeId || !imageQuery) {
      return;
    }

    hasAttemptedLoad.current = true;

    const loadStoredImage = async () => {
      // Start with temporary URL immediately
      setImageUrl(temporaryImageUrl);

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
            console.log(`✓ Using stored image for ${recipeId}`);
            return;
          }
        }

        // If no stored image exists and autoGenerate is true, generate it
        if (autoGenerate) {
          console.log(`No stored image found for ${recipeId}, generating...`);
          await generateAndStore();
        } else {
          // Otherwise keep using temporary URL
          setIsStored(false);
        }
      } catch (err: any) {
        // Silently fail and use temporary URL
        console.log(`Using temporary image for ${recipeId} (stored image not available)`);
        setImageUrl(temporaryImageUrl);
        setIsStored(false);
      }
    };

    loadStoredImage();
  }, []); // Empty dependency array - only run once on mount

  return {
    imageUrl: imageUrl || temporaryImageUrl,
    isLoading,
    error,
    isStored,
    generateAndStore
  };
}
