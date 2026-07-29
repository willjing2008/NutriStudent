// Helper functions to generate accurate image search queries
// Ensures images match the recipe name and cuisine style

/**
 * Generates an optimized image query for food photography
 * @param recipeName - The name of the recipe
 * @param cuisine - The cuisine type (e.g., 'italian', 'british', 'base')
 * @param category - The cooking category (e.g., 'one-pot', 'microwave', 'meal-prep')
 * @param additionalKeywords - Optional specific descriptors
 * @returns A well-formatted image search query
 */
export function generateImageQuery(
  recipeName: string,
  cuisine?: string,
  category?: string,
  additionalKeywords?: string[]
): string {
  const baseKeywords = [
    'food photography',
    'professional',
    'appetizing',
    'high quality',
    'detailed',
  ];

  // Add cuisine-specific styling
  const cuisineStyles: Record<string, string[]> = {
    italian: ['rustic', 'mediterranean style', 'wooden table'],
    british: ['comfort food', 'hearty', 'home cooked'],
    indian: ['colorful spices', 'vibrant', 'traditional serving'],
    chinese: ['asian cuisine', 'chopsticks', 'bowl presentation'],
    mexican: ['colorful', 'vibrant', 'fresh ingredients'],
    japanese: ['minimal', 'elegant plating', 'artistic'],
    american: ['generous portions', 'classic', 'casual dining'],
    mediterranean: ['olive oil', 'fresh herbs', 'bright colors'],
  };

  // Add category-specific styling
  const categoryStyles: Record<string, string[]> = {
    'one-pot': ['single pot', 'family style', 'rustic'],
    'microwave': ['quick meal', 'simple plating', 'convenient'],
    'meal-prep': ['meal prep containers', 'organized', 'portioned'],
  };

  // Build the query
  const parts: string[] = [];
  
  // 1. Recipe name (most important)
  parts.push(recipeName);
  
  // 2. Food photography style
  parts.push('food photography');
  
  // 3. Cuisine styling
  if (cuisine && cuisine !== 'base' && cuisineStyles[cuisine]) {
    parts.push(...cuisineStyles[cuisine].slice(0, 2));
  }
  
  // 4. Category styling
  if (category && categoryStyles[category]) {
    parts.push(categoryStyles[category][0]);
  }
  
  // 5. Additional keywords
  if (additionalKeywords && additionalKeywords.length > 0) {
    parts.push(...additionalKeywords);
  }
  
  // 6. Quality indicators
  parts.push('high quality', 'appetizing', 'detailed close-up');
  
  return parts.join(', ');
}

/**
 * Generates a focused image query with negative prompts
 * This ensures more accurate results by specifying what NOT to include
 */
export function generateFocusedImageQuery(
  mainSubject: string,
  includeKeywords: string[],
  excludeKeywords?: string[]
): string {
  const positive = [mainSubject, ...includeKeywords, 'food photography', 'professional lighting', 'macro shot'].join(', ');
  
  // Negative prompts with --no flag
  if (excludeKeywords && excludeKeywords.length > 0) {
    const negative = excludeKeywords.join(', ');
    return `${positive} --no ${negative}`;
  }
  
  return positive;
}

/**
 * Pre-configured queries for common recipe types
 * Use these as templates for consistency
 */
export const IMAGE_QUERY_TEMPLATES = {
  breakfast: {
    eggs: 'scrambled eggs, breakfast food photography, morning light, fluffy texture, golden yellow',
    oatmeal: 'oatmeal bowl, topped with fruits, breakfast photography, rustic wooden spoon, healthy meal',
    toast: 'toast on plate, breakfast spread, butter melting, golden brown, close-up food photography',
    pancakes: 'stack of pancakes, syrup drizzling, breakfast photography, fluffy texture, morning meal',
  },
  mains: {
    pasta: 'pasta dish, Italian food, fork twirling pasta, steam rising, professional food photography',
    curry: 'curry in bowl, rice on side, Indian cuisine, vibrant colors, aromatic food photography',
    stirfry: 'stir fry in wok, colorful vegetables, Asian cuisine, chopsticks, sizzling food',
    rice: 'rice bowl, topped ingredients, Asian cuisine, steam rising, appetizing presentation',
  },
  microwave: {
    mugCake: 'mug cake, chocolate dessert, microwave recipe, individual serving, spoon ready',
    microwaveOatmeal: 'oatmeal in bowl, microwave breakfast, quick meal, topped with berries',
    microwaveEgg: 'microwave scrambled eggs, fluffy texture, quick breakfast, simple plating',
  },
  categories: {
    onePot: 'one pot meal, family style serving, rustic cooking pot, comfort food photography',
    mealPrep: 'meal prep containers, organized portions, healthy meal planning, weekly meals',
    budget: 'affordable ingredients, budget meal, simple presentation, home cooking',
  }
};

/**
 * Validates and enhances an existing image query
 */
export function enhanceImageQuery(existingQuery: string): string {
  const query = existingQuery.toLowerCase().trim();
  
  // Check if it already has photography keywords
  const hasPhotographyKeywords = 
    query.includes('photography') || 
    query.includes('professional') || 
    query.includes('high quality');
  
  if (!hasPhotographyKeywords) {
    return `${existingQuery}, food photography, professional, appetizing, high quality`;
  }
  
  return existingQuery;
}

/**
 * Example usage:
 * 
 * const query1 = generateImageQuery(
 *   'Chicken Tikka Masala',
 *   'indian',
 *   'one-pot',
 *   ['creamy sauce', 'basmati rice']
 * );
 * // Result: "Chicken Tikka Masala, food photography, colorful spices, vibrant, single pot, creamy sauce, basmati rice, high quality, appetizing, detailed close-up"
 * 
 * const query2 = generateFocusedImageQuery(
 *   'poached egg',
 *   ['runny yolk', 'toast', 'breakfast'],
 *   ['multiple eggs', 'fried', 'scrambled']
 * );
 * // Result: "poached egg, runny yolk, toast, breakfast, food photography, professional lighting, macro shot --no multiple eggs, fried, scrambled"
 */
