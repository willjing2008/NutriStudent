// AI-Generated Recipe Images
// Each image is specifically generated to match the recipe name and ingredients

import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// Helper function to get recipe image - now uses permanent storage
export function getRecipeImage(recipeId: string, imageQuery?: string): string {
  // Return temporary Pollinations.ai URL as fallback
  // The RecipeImage component will handle fetching the permanent stored version
  if (imageQuery) {
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(imageQuery)}?width=800&height=600&nologo=true`;
  }
  
  // Fallback for recipes without imageQuery
  return RECIPE_IMAGES[recipeId] || RECIPE_IMAGES['default'];
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


export const RECIPE_IMAGES: Record<string, string> = {
  // ========== BRITISH CUISINE ==========
  'british-shepherds-pie': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20shepherds%20pie%20with%20golden%20mashed%20potato%20topping%20lamb%20mince%20carrots%20and%20peas%20in%20ceramic%20dish%20on%20wooden%20table%20warm%20lighting%20rustic%20British%20style?width=1200&height=800&nologo=true',
  'british-fish-chips': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20crispy%20baked%20fish%20and%20chips%20with%20cod%20fillet%20golden%20potato%20chips%20mushy%20peas%20and%20lemon%20wedge%20on%20white%20plate%20British%20pub%20style?width=1200&height=800&nologo=true',

  // ========== ITALIAN CUISINE ==========
  'italian-carbonara': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20creamy%20spaghetti%20carbonara%20with%20bacon%20eggs%20parmesan%20cheese%20black%20pepper%20in%20white%20bowl%20Italian%20restaurant%20style%20warm%20lighting?width=1200&height=800&nologo=true',
  'italian-margherita-pizza': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20homemade%20margherita%20pizza%20with%20fresh%20mozzarella%20basil%20leaves%20tomato%20sauce%20on%20wooden%20pizza%20board%20Italian%20style?width=1200&height=800&nologo=true',

  // ========== CHINESE CUISINE ==========
  'chinese-stir-fry-noodles': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20Chinese%20stir%20fried%20noodles%20with%20vegetables%20soy%20sauce%20sesame%20oil%20in%20black%20wok%20bowl%20chopsticks%20Asian%20style?width=1200&height=800&nologo=true',
  'chinese-sweet-sour-chicken': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20sweet%20and%20sour%20chicken%20with%20bell%20peppers%20pineapple%20chunks%20glossy%20red%20sauce%20served%20with%20white%20rice%20Chinese%20takeout%20style?width=1200&height=800&nologo=true',

  // ========== INDIAN CUISINE ==========
  'indian-chicken-tikka': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20chicken%20tikka%20masala%20with%20tender%20chicken%20pieces%20creamy%20tomato%20curry%20sauce%20served%20with%20basmati%20rice%20and%20naan%20bread%20Indian%20restaurant%20style?width=1200&height=800&nologo=true',
  'indian-dal-curry': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20Indian%20dal%20lentil%20curry%20with%20red%20lentils%20turmeric%20spices%20in%20copper%20bowl%20served%20with%20rice%20and%20cilantro%20garnish%20authentic%20Indian%20style?width=1200&height=800&nologo=true',

  // ========== MEXICAN CUISINE ==========
  'mexican-chicken-burrito': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20chicken%20burrito%20bowl%20with%20grilled%20chicken%20black%20beans%20rice%20corn%20salsa%20avocado%20sour%20cream%20in%20ceramic%20bowl%20Mexican%20restaurant%20style?width=1200&height=800&nologo=true',
  'mexican-beef-tacos': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20beef%20tacos%20with%20seasoned%20ground%20beef%20lettuce%20tomatoes%20cheese%20in%20corn%20tortillas%20on%20wooden%20board%20Mexican%20street%20food%20style?width=1200&height=800&nologo=true',

  // ========== JAPANESE CUISINE ==========
  'japanese-chicken-ramen': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20Japanese%20chicken%20ramen%20with%20noodles%20soft%20boiled%20egg%20green%20onions%20bamboo%20shoots%20in%20black%20bowl%20authentic%20ramen%20shop%20style?width=1200&height=800&nologo=true',
  'japanese-teriyaki-salmon': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20teriyaki%20salmon%20with%20glazed%20fish%20fillet%20steamed%20rice%20edamame%20sesame%20seeds%20on%20Japanese%20plate%20minimalist%20style?width=1200&height=800&nologo=true',

  // ========== MEDITERRANEAN CUISINE ==========
  'mediterranean-greek-salad': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20Greek%20salad%20with%20tomatoes%20cucumbers%20feta%20cheese%20olives%20red%20onion%20olive%20oil%20in%20white%20bowl%20Mediterranean%20style?width=1200&height=800&nologo=true',
  'mediterranean-falafel-wrap': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20falafel%20wrap%20with%20crispy%20chickpea%20balls%20hummus%20lettuce%20tomatoes%20in%20pita%20bread%20on%20wooden%20board%20Middle%20Eastern%20style?width=1200&height=800&nologo=true',

  // ========== AMERICAN CUISINE ==========
  'american-mac-cheese': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20creamy%20mac%20and%20cheese%20with%20elbow%20pasta%20melted%20cheddar%20cheese%20sauce%20breadcrumb%20topping%20in%20baking%20dish%20American%20comfort%20food%20style?width=1200&height=800&nologo=true',

  // ========== ONE POT MEALS ==========
  'one-pot-chicken-rice': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20one%20pot%20chicken%20and%20rice%20with%20tender%20chicken%20pieces%20fluffy%20rice%20peas%20carrots%20in%20large%20pot%20homestyle%20comfort%20food?width=1200&height=800&nologo=true',
  'one-pot-pasta-bolognese': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20one%20pot%20pasta%20bolognese%20with%20penne%20pasta%20rich%20meat%20sauce%20tomatoes%20basil%20in%20deep%20skillet%20Italian%20homestyle?width=1200&height=800&nologo=true',
  'one-pot-chili': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20one%20pot%20chili%20con%20carne%20with%20ground%20beef%20kidney%20beans%20tomatoes%20peppers%20in%20large%20pot%20topped%20with%20sour%20cream%20rustic%20style?width=1200&height=800&nologo=true',

  // ========== MICROWAVE MEALS ==========
  'microwave-scrambled-eggs': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20fluffy%20microwave%20scrambled%20eggs%20with%20cheese%20herbs%20on%20toast%20on%20white%20plate%20quick%20breakfast%20style?width=1200&height=800&nologo=true',
  'microwave-mac-cheese': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20microwave%20mac%20and%20cheese%20in%20mug%20with%20creamy%20cheese%20sauce%20elbow%20pasta%20student%20meal%20style?width=1200&height=800&nologo=true',
  'microwave-jacket-potato': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20microwave%20jacket%20potato%20with%20butter%20cheese%20beans%20on%20plate%20British%20comfort%20food%20style?width=1200&height=800&nologo=true',

  // ========== MEAL PREP ==========
  'meal-prep-chicken-broccoli': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20meal%20prep%20containers%20with%20grilled%20chicken%20breast%20steamed%20broccoli%20brown%20rice%20in%20glass%20containers%20healthy%20fitness%20meal%20prep?width=1200&height=800&nologo=true',
  'meal-prep-burrito-bowls': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20meal%20prep%20burrito%20bowls%20with%20rice%20beans%20corn%20chicken%20salsa%20in%20containers%20colorful%20Mexican%20meal%20prep?width=1200&height=800&nologo=true',
  'meal-prep-overnight-oats': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20overnight%20oats%20in%20mason%20jars%20with%20berries%20banana%20chia%20seeds%20honey%20healthy%20breakfast%20meal%20prep?width=1200&height=800&nologo=true',

  // ========== FALLBACK ==========
  'default': 'https://image.pollinations.ai/prompt/professional%20food%20photography%20of%20delicious%20healthy%20meal%20on%20white%20plate%20fresh%20ingredients%20restaurant%20quality%20presentation?width=1200&height=800&nologo=true',
};

// Helper function to get image by recipe name (fuzzy match)
export function getRecipeImageByName(recipeName: string): string {
  // Try exact match first
  const exactMatch = Object.keys(RECIPE_IMAGES).find(
    key => key.toLowerCase().includes(recipeName.toLowerCase().replace(/[^a-z0-9]/g, '-'))
  );
  
  if (exactMatch) {
    return RECIPE_IMAGES[exactMatch];
  }

  // Try partial match
  const partialMatch = Object.keys(RECIPE_IMAGES).find(
    key => {
      const keyWords = key.split('-');
      const nameWords = recipeName.toLowerCase().split(' ');
      return nameWords.some(word => keyWords.includes(word));
    }
  );

  return partialMatch ? RECIPE_IMAGES[partialMatch] : RECIPE_IMAGES['default'];
}