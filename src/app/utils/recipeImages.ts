// Recipe Image Utilities
// Images are now sourced from Unsplash and stored in Supabase Storage

import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// Get recipe image - returns undefined (images come exclusively from Supabase Storage now)
export function getRecipeImage(_recipeId: string, _imageQuery?: string): string | undefined {
  return undefined;
}

// Get recipe image with cache - checks cache first, then generates if needed
export async function getRecipeImageWithCache(
  recipeId: string,
  imageQuery: string,
  cuisine: string = 'base'
): Promise<string | null> {
  try {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/get-recipe-image-with-cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        recipeId,
        imageQuery,
        cuisine
      })
    });

    if (!response.ok) {
      console.error(`Failed to get recipe image: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.success) {
      console.log(`✓ ${data.cached ? 'Using cached' : 'Generated new'} image for ${recipeId}`);
      return data.imageUrl;
    } else {
      console.error(`Error getting recipe image: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.error(`Error calling get-recipe-image-with-cache:`, error);
    return null;
  }
}
