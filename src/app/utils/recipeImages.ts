// Recipe Image Utilities
// Images are now sourced from Unsplash and stored in Supabase Storage

import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// Get recipe image - returns undefined (images come exclusively from Supabase Storage now)
export function getRecipeImage(_recipeId: string, _imageQuery?: string): string | undefined {
  return undefined;
}

// Get recipe image with cache - checks cache first, then generates if needed
// Short-circuits for direct URLs (new AllRecipes data has real image URLs)
export async function getRecipeImageWithCache(
  recipeId: string,
  imageQuery: string,
  cuisine: string = 'base'
): Promise<string | null> {
  // Short-circuit: if imageQuery is already a URL, return it directly
  if (imageQuery && (imageQuery.startsWith('http://') || imageQuery.startsWith('https://'))) {
    return imageQuery;
  }

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
      return null;
    }

    const data = await response.json();
    return data.success ? data.imageUrl : null;
  } catch (error) {
    return null;
  }
}
