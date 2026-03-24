import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
import { ALL_RECIPES, NewRecipe } from "./recipe-data.ts";
import { toMealPlanMeal, toSwapOption, getRecipesByMealType, getAllRecipesFromDB } from "./recipe-adapter.ts";
import { generateImageQuery, enhanceImageQuery } from "./image-query-helper.ts";
import { calculateRecipeNutrition } from "./calorie-ninjas.ts";
import { ACHIEVEMENTS } from "./achievements.ts";

const app = new Hono();

// Helper function to properly fetch data with prefix including both key and value
// This works around the kv_store.tsx getByPrefix returning only values
async function getByPrefixWithKeys(prefix: string): Promise<Array<{key: string, value: any}>> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { data, error } = await supabase
    .from("kv_store_dbaf6019")
    .select("key, value")
    .like("key", prefix + "%");
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
}

// Helper function to ensure recipe images bucket exists
async function ensureRecipeImagesBucket(): Promise<void> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  
  const bucketName = 'make-dbaf6019-recipe-images';
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  
  if (!bucketExists) {
    console.log('Creating recipe images bucket...');
    await supabase.storage.createBucket(bucketName, {
      public: true, // Make images publicly accessible
      fileSizeLimit: 5242880, // 5MB limit
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });
  }
}

// Helper function to download and store image from external source
async function storeRecipeImage(imageQuery: string, recipeId: string, cuisine: string): Promise<string | null> {
  if (!imageQuery) return null;
  
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    
    // Ensure bucket exists
    await ensureRecipeImagesBucket();
    
    // Download image from Unsplash
    const unsplashKey = Deno.env.get("UNSPLASH_ACCESS_KEY");
    if (!unsplashKey) {
      console.log('UNSPLASH_ACCESS_KEY not set, skipping image generation');
      return null;
    }
    const searchQuery = imageQuery.split(',').slice(0, 2).join(' ').trim();
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&orientation=landscape&per_page=1`;
    const searchResponse = await fetch(searchUrl, {
      headers: { 'Authorization': `Client-ID ${unsplashKey}` },
    });
    if (!searchResponse.ok) return null;
    const searchData = await searchResponse.json();
    if (!searchData.results?.length) return null;
    const imageUrl = searchData.results[0].urls.regular;
    console.log(`Downloading image from: ${imageUrl}`);
    
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      console.log(`Failed to download image: ${imageResponse.status}`);
      return null;
    }
    
    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${cuisine}/${recipeId}-${timestamp}.jpg`;
    const bucketName = 'make-dbaf6019-recipe-images';
    
    // Upload to Supabase Storage
    console.log(`Uploading image to bucket: ${bucketName}/${filename}`);
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filename, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    
    if (error) {
      console.log(`Error uploading image: ${error.message}`);
      return null;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filename);
    
    console.log(`Image stored successfully: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error: any) {
    console.log(`Error in storeRecipeImage: ${error.message}`);
    return null;
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-dbaf6019/health", (c) => {
  return c.json({ status: "ok" });
});

// Find nearby grocery stores using Google Places API
app.post("/make-server-dbaf6019/nearby-stores", async (c) => {
  try {
    const { latitude, longitude } = await c.req.json();
    
    if (!latitude || !longitude) {
      return c.json({ error: "Latitude and longitude are required" }, 400);
    }

    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      console.log("Error: GOOGLE_PLACES_API_KEY environment variable not set");
      return c.json({ error: "API key not configured" }, 500);
    }

    // Use Google Places API (Nearby Search)
    const radius = 5000; // 5km radius
    const type = "supermarket|grocery_or_supermarket";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.log(`Google Places API error: ${data.status} - ${data.error_message || 'No error message'}`);
      return c.json({ error: `Places API error: ${data.status}` }, 500);
    }

    // Transform the results
    const stores = (data.results || []).map((place: any, index: number) => {
      // Calculate distance (approximate)
      const distance = place.geometry?.location 
        ? calculateDistance(latitude, longitude, place.geometry.location.lat, place.geometry.location.lng)
        : 0;

      return {
        id: place.place_id,
        name: place.name,
        distance: `${distance.toFixed(1)} miles`,
        address: place.vicinity || place.formatted_address || 'Address not available',
        rating: place.rating || null,
        isOpen: place.opening_hours?.open_now ?? null,
      };
    }).slice(0, 10); // Limit to 10 results

    return c.json({ stores });
  } catch (error: any) {
    console.log(`Error in /nearby-stores endpoint: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch nearby stores" }, 500);
  }
});

// Geocode an address to get coordinates
app.post("/make-server-dbaf6019/geocode-address", async (c) => {
  try {
    const { address } = await c.req.json();
    
    if (!address) {
      return c.json({ error: "Address is required" }, 400);
    }

    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      console.log("Error: GOOGLE_PLACES_API_KEY environment variable not set");
      return c.json({ error: "API key not configured" }, 500);
    }

    // Use Google Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      console.log(`Google Geocoding API error: ${data.status} - ${data.error_message || 'No error message'}`);
      return c.json({ error: `Could not find location for this address` }, 400);
    }

    const location = data.results[0]?.geometry?.location;
    if (!location) {
      return c.json({ error: "Could not determine coordinates for this address" }, 400);
    }

    return c.json({ 
      latitude: location.lat, 
      longitude: location.lng,
      formattedAddress: data.results[0].formatted_address 
    });
  } catch (error: any) {
    console.log(`Error in /geocode-address endpoint: ${error.message}`);
    return c.json({ error: error.message || "Failed to geocode address" }, 500);
  }
});

// Autocomplete address suggestions
app.post("/make-server-dbaf6019/autocomplete-address", async (c) => {
  try {
    const { input } = await c.req.json();
    
    if (!input || input.length < 2) {
      return c.json({ predictions: [] });
    }

    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      console.log("Error: GOOGLE_PLACES_API_KEY environment variable not set");
      return c.json({ error: "API key not configured" }, 500);
    }

    // Use Google Places Autocomplete API with UK bias
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:gb&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.log(`Google Autocomplete API error: ${data.status} - ${data.error_message || 'No error message'}`);
      return c.json({ predictions: [] });
    }

    const predictions = (data.predictions || []).map((prediction: any) => ({
      placeId: prediction.place_id,
      description: prediction.description,
      mainText: prediction.structured_formatting?.main_text || prediction.description,
      secondaryText: prediction.structured_formatting?.secondary_text || '',
    }));

    return c.json({ predictions });
  } catch (error: any) {
    console.log(`Error in /autocomplete-address endpoint: ${error.message}`);
    return c.json({ predictions: [] });
  }
});

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Mock ingredient database with prices (simulating Uber Eats inventory)
interface Ingredient {
  name: string;
  category: string;
  price: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  available: boolean;
}

const mockIngredients: { [key: string]: Ingredient[] } = {
  // Tesco ingredients
  'tesco': [
    { name: 'Oats', category: 'grains', price: 1.20, unit: '1kg', calories: 380, protein: 13, carbs: 67, fats: 7, available: true },
    { name: 'Brown Rice', category: 'grains', price: 1.50, unit: '1kg', calories: 370, protein: 8, carbs: 77, fats: 3, available: true },
    { name: 'Wholemeal Pasta', category: 'grains', price: 1.10, unit: '500g', calories: 350, protein: 13, carbs: 72, fats: 2, available: true },
    { name: 'Quinoa', category: 'grains', price: 2.50, unit: '500g', calories: 368, protein: 14, carbs: 64, fats: 6, available: true },
    { name: 'Wholemeal Bread', category: 'grains', price: 1.00, unit: 'loaf', calories: 250, protein: 9, carbs: 47, fats: 3, available: true },
    { name: 'Chicken Breast', category: 'protein', price: 3.50, unit: '500g', calories: 165, protein: 31, carbs: 0, fats: 4, available: true },
    { name: 'Salmon Fillet', category: 'protein', price: 5.00, unit: '400g', calories: 206, protein: 22, carbs: 0, fats: 13, available: true },
    { name: 'Eggs', category: 'protein', price: 2.00, unit: '12 pack', calories: 155, protein: 13, carbs: 1, fats: 11, available: true },
    { name: 'Greek Yoghurt', category: 'dairy', price: 1.80, unit: '500g', calories: 59, protein: 10, carbs: 4, fats: 0, available: true },
    { name: 'Milk', category: 'dairy', price: 1.20, unit: '2L', calories: 42, protein: 3, carbs: 5, fats: 1, available: true },
    { name: 'Cheese', category: 'dairy', price: 2.50, unit: '400g', calories: 402, protein: 25, carbs: 1, fats: 33, available: true },
    { name: 'Broccoli', category: 'vegetables', price: 0.80, unit: '500g', calories: 34, protein: 3, carbs: 7, fats: 0, available: true },
    { name: 'Spinach', category: 'vegetables', price: 1.00, unit: '250g', calories: 23, protein: 3, carbs: 4, fats: 0, available: true },
    { name: 'Carrots', category: 'vegetables', price: 0.70, unit: '1kg', calories: 41, protein: 1, carbs: 10, fats: 0, available: true },
    { name: 'Tomatoes', category: 'vegetables', price: 1.50, unit: '500g', calories: 18, protein: 1, carbs: 4, fats: 0, available: true },
    { name: 'Lettuce', category: 'vegetables', price: 0.80, unit: 'head', calories: 15, protein: 1, carbs: 3, fats: 0, available: true },
    { name: 'Peppers', category: 'vegetables', price: 1.60, unit: '3 pack', calories: 31, protein: 1, carbs: 6, fats: 0, available: true },
    { name: 'Sweet Potato', category: 'vegetables', price: 1.30, unit: '1kg', calories: 86, protein: 2, carbs: 20, fats: 0, available: true },
    { name: 'Bananas', category: 'fruits', price: 1.00, unit: '5 pack', calories: 89, protein: 1, carbs: 23, fats: 0, available: true },
    { name: 'Blueberries', category: 'fruits', price: 2.00, unit: '200g', calories: 57, protein: 1, carbs: 14, fats: 0, available: true },
    { name: 'Strawberries', category: 'fruits', price: 2.20, unit: '400g', calories: 32, protein: 1, carbs: 8, fats: 0, available: true },
    { name: 'Beef Mince', category: 'protein', price: 3.80, unit: '500g', calories: 250, protein: 26, carbs: 0, fats: 17, available: true },
    { name: 'Lean Beef', category: 'protein', price: 4.50, unit: '500g', calories: 250, protein: 26, carbs: 0, fats: 15, available: true },
    { name: 'Black Beans', category: 'legumes', price: 0.80, unit: '400g tin', calories: 132, protein: 9, carbs: 24, fats: 1, available: true },
    { name: 'Chickpeas', category: 'legumes', price: 0.70, unit: '400g tin', calories: 164, protein: 9, carbs: 27, fats: 3, available: true },
    { name: 'Olive Oil', category: 'oils', price: 3.50, unit: '500ml', calories: 884, protein: 0, carbs: 0, fats: 100, available: true },
    { name: 'Walnuts', category: 'nuts', price: 2.50, unit: '200g', calories: 654, protein: 15, carbs: 14, fats: 65, available: true },
    { name: 'Almonds', category: 'nuts', price: 2.80, unit: '200g', calories: 579, protein: 21, carbs: 22, fats: 50, available: true },
    { name: 'Peanut Butter', category: 'spreads', price: 2.00, unit: '340g', calories: 588, protein: 25, carbs: 20, fats: 50, available: true },
    { name: 'Honey', category: 'sweeteners', price: 2.50, unit: '340g', calories: 304, protein: 0, carbs: 82, fats: 0, available: true },
    { name: 'Protein Powder', category: 'supplements', price: 12.00, unit: '1kg', calories: 400, protein: 80, carbs: 10, fats: 5, available: true },
  ],
  // Similar inventory for other stores
  'sainsbury': [],
  'waitrose': [],
  'asda': [],
  'morrisons': [],
};

// Copy Tesco inventory to other stores (in real scenario, each would be different)
mockIngredients['sainsbury'] = mockIngredients['tesco'];
mockIngredients['waitrose'] = mockIngredients['tesco'];
mockIngredients['asda'] = mockIngredients['tesco'];
mockIngredients['morrisons'] = mockIngredients['tesco'];

// Endpoint to fetch available ingredients from selected store
app.post("/make-server-dbaf6019/fetch-store-ingredients", async (c) => {
  try {
    const { storeName } = await c.req.json();
    
    if (!storeName) {
      return c.json({ error: "Store name is required" }, 400);
    }

    // Normalize store name to match our database
    const storeKey = storeName.toLowerCase().split(' ')[0];
    const ingredients = mockIngredients[storeKey] || mockIngredients['tesco'];

    return c.json({ ingredients });
  } catch (error: any) {
    console.log(`Error in /fetch-store-ingredients endpoint: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch ingredients" }, 500);
  }
});

// Endpoint to generate optimal meal plan
app.post("/make-server-dbaf6019/generate-meal-plan", async (c) => {
  try {
    const { storeName, mealsPerDay, budget, goal, shoppingDate, maxCookingTime, avoidIngredients, selectedMealSlots } = await c.req.json();

    if (!mealsPerDay || !budget || !goal) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    // Calculate number of cooking days from today to shopping date
    let cookingDays = 7; // Default to 7 days
    if (shoppingDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const targetDate = new Date(shoppingDate);
      targetDate.setHours(0, 0, 0, 0);

      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      cookingDays = Math.max(1, Math.min(diffDays, 14));
    }

    const totalMealsNeeded = cookingDays * mealsPerDay;
    const weeklyBudget = budget;

    // Fetch recipes from database by meal_type
    const mealTypeMap: Record<string, string> = { study: 'study', work: 'work', fitness: 'fitness' };
    const mealType = mealTypeMap[goal] || 'fitness';
    const suitableRecipes = await getRecipesByMealType(mealType);

    if (suitableRecipes.length === 0) {
      return c.json({ error: "No recipes found for this goal. Please run /init-recipes first." }, 400);
    }

    console.log(`🍽️ Generating meal plan: ${cookingDays} days × ${mealsPerDay} meals/day = ${totalMealsNeeded} meals from ${suitableRecipes.length} ${mealType} recipes`);

    const mealPlan = generateMealPlanFromRecipes(
      suitableRecipes,
      mealsPerDay,
      weeklyBudget,
      goal,
      maxCookingTime,
      cookingDays,
      avoidIngredients,
      selectedMealSlots
    );

    return c.json({ mealPlan });
  } catch (error: any) {
    console.log(`Error in /generate-meal-plan endpoint: ${error.message}`);
    return c.json({ error: error.message || "Failed to generate meal plan" }, 500);
  }
});

// Helper to generate meal plan from NewRecipe[] fetched from kv_store
function generateMealPlanFromRecipes(
  recipes: NewRecipe[],
  mealsPerDay: number,
  weeklyBudget: number,
  goal: string,
  maxCookingTime?: number,
  cookingDays: number = 7,
  avoidIngredients?: string[],
  selectedMealSlots?: string[]
) {
  const dailyBudget = weeklyBudget / 7;
  const totalMealsNeeded = cookingDays * mealsPerDay;

  // Filter by avoided ingredients
  let filteredRecipes = recipes;
  if (avoidIngredients && avoidIngredients.length > 0) {
    const avoidLowercase = avoidIngredients.map(i => i.toLowerCase());
    filteredRecipes = recipes.filter(recipe => {
      const hasAvoided = avoidLowercase.some(avoid =>
        recipe.ingredients.some(ing => ing.toLowerCase().includes(avoid))
      );
      return !hasAvoided;
    });
    console.log(`🚫 Filtered by avoided ingredients: ${filteredRecipes.length}/${recipes.length} remaining`);
  }

  // Filter by max cooking time
  if (maxCookingTime && maxCookingTime > 0) {
    filteredRecipes = filteredRecipes.filter(r => (r.total_time_minutes ?? r.cook_time_minutes ?? 0) <= maxCookingTime);
  }

  // Fallback if filters removed everything
  if (filteredRecipes.length === 0) {
    filteredRecipes = recipes;
  }

  // Shuffle for variety
  const shuffled = [...filteredRecipes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Categorize by recipe_category for variety
  const breakfastRecipes = shuffled.filter(r => ["Breakfast", "Brunch"].includes(r.recipe_category || ""));
  const lunchRecipes = shuffled.filter(r => ["Lunch", "Salad", "Sandwich", "Soup"].includes(r.recipe_category || ""));
  const dinnerRecipes = shuffled.filter(r => !["Breakfast", "Brunch", "Lunch", "Salad", "Sandwich", "Soup"].includes(r.recipe_category || ""));

  // Determine which meal slots to use, respecting user's selection
  let slots: string[];
  if (mealsPerDay >= 3) {
    slots = ['breakfast', 'lunch', 'dinner'];
  } else if (selectedMealSlots && selectedMealSlots.length > 0) {
    const order = ['breakfast', 'lunch', 'dinner'];
    slots = order.filter(s => selectedMealSlots.includes(s)).slice(0, mealsPerDay);
  } else {
    slots = mealsPerDay === 1 ? ['dinner'] : ['breakfast', 'dinner'];
  }

  // Map slot names to recipe pools
  const poolMap: Record<string, NewRecipe[]> = {
    breakfast: breakfastRecipes.length > 0 ? breakfastRecipes : shuffled,
    lunch: lunchRecipes.length > 0 ? lunchRecipes : shuffled,
    dinner: dinnerRecipes.length > 0 ? dinnerRecipes : shuffled,
  };

  // Select meals with variety per day
  const selectedMeals: { recipe: NewRecipe; slot: string }[] = [];
  const usedIds = new Set<number>();

  for (let day = 0; day < cookingDays; day++) {
    for (let mealNum = 0; mealNum < mealsPerDay; mealNum++) {
      // Use the slot for this meal number, or fall back to dinner for extras
      const slot = mealNum < slots.length ? slots[mealNum] : 'dinner';
      const candidates = poolMap[slot] || shuffled;

      let selected = candidates.find(r => !usedIds.has(r.id)) || null;

      // Fallback to any unused recipe
      if (!selected) {
        selected = shuffled.find(r => !usedIds.has(r.id)) || null;
      }

      // Last resort: allow repeat but avoid same-day duplicates
      if (!selected && shuffled.length > 0) {
        const dayIds = new Set(selectedMeals.slice(day * mealsPerDay).map(m => m.recipe.id));
        selected = shuffled.find(r => !dayIds.has(r.id)) || shuffled[0];
      }

      if (selected) {
        selectedMeals.push({ recipe: selected, slot });
        usedIds.add(selected.id);
      }
    }
  }

  // Convert to frontend format using adapter, passing the assigned slot
  const meals = selectedMeals.map((m, index) => {
    const dayNumber = Math.floor(index / mealsPerDay) + 1;
    const mealNumber = (index % mealsPerDay) + 1;
    return toMealPlanMeal(m.recipe, dayNumber, mealNumber, m.slot);
  });

  return {
    meals,
    totalCost: 0,
    dailyBudget,
    weeklyBudget,
    withinBudget: true,
    cookingDays,
    totalMealsNeeded,
    mealsPerDay,
  };
}

// ========== RECIPE INITIALIZATION ==========

// Initialize all recipes from recipe-data.ts into kv_store
app.post("/make-server-dbaf6019/init-recipes", async (c) => {
  try {
    console.log('=== Recipe Database Initialization Started ===');
    console.log(`Total recipes to process: ${ALL_RECIPES.length}`);

    // Clear existing recipe keys
    const existingRecipes = await getByPrefixWithKeys('recipe:');
    if (existingRecipes.length > 0) {
      await kv.mdel(existingRecipes.map(e => e.key));
      console.log(`Cleared ${existingRecipes.length} existing recipe keys`);
    }
    // Also clear old-format keys
    const oldCuisine = await getByPrefixWithKeys('cuisine:');
    if (oldCuisine.length > 0) {
      await kv.mdel(oldCuisine.map(e => e.key));
      console.log(`Cleared ${oldCuisine.length} old cuisine keys`);
    }
    const oldBase = await getByPrefixWithKeys('base-recipe:');
    if (oldBase.length > 0) {
      await kv.mdel(oldBase.map(e => e.key));
      console.log(`Cleared ${oldBase.length} old base-recipe keys`);
    }

    let successCount = 0;
    let errorCount = 0;
    const byMealType: Record<string, number> = {};

    for (const recipe of ALL_RECIPES) {
      try {
        const key = `recipe:${recipe.meal_type}:${recipe.id}`;
        await kv.set(key, JSON.stringify(recipe));
        successCount++;
        byMealType[recipe.meal_type] = (byMealType[recipe.meal_type] || 0) + 1;
      } catch (error: any) {
        errorCount++;
        console.error(`Failed to store recipe ${recipe.id}: ${error.message}`);
      }
    }

    // Store metadata
    await kv.set('recipes:meta', JSON.stringify({
      total: ALL_RECIPES.length,
      byMealType,
      initialized: new Date().toISOString()
    }));

    console.log(`=== Initialization Complete: ${successCount} success, ${errorCount} errors ===`);

    return c.json({
      message: "Recipe database initialized successfully",
      totalRecipes: ALL_RECIPES.length,
      successCount,
      errorCount,
      byMealType
    });
  } catch (error: any) {
    console.log(`Error initializing cuisine database: ${error.message}`);
    return c.json({ error: error.message || "Failed to initialize recipes" }, 500);
  }
});

// ========== DATABASE ADMIN ENDPOINTS ==========

// Get all keys with a specific prefix (for debugging)
app.get("/make-server-dbaf6019/admin/keys/:prefix", async (c) => {
  try {
    const prefix = c.req.param('prefix');
    const data = await kv.getByPrefix(prefix);
    
    return c.json({ 
      prefix,
      count: data.length,
      keys: data.map(item => item.key),
      data: data.map(item => ({
        key: item.key,
        value: item.value,
        preview: item.value.substring(0, 100) + '...'
      }))
    });
  } catch (error: any) {
    console.log(`Error fetching keys: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch keys" }, 500);
  }
});

// Get all recipes from database
app.get("/make-server-dbaf6019/admin/all-recipes", async (c) => {
  try {
    const data = await getByPrefixWithKeys('recipe:');

    const recipes = data
      .filter(item => item.key !== 'recipes:meta')
      .map(item => {
        const recipe = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
        return {
          key: item.key,
          id: recipe.id,
          name: recipe.name,
          meal_type: recipe.meal_type,
          recipe_category: recipe.recipe_category,
          cuisine: recipe.cuisine,
          total_time_minutes: recipe.total_time_minutes,
          rating: recipe.rating,
        };
      });

    return c.json({
      count: recipes.length,
      recipes
    });
  } catch (error: any) {
    console.log(`Error fetching all recipes: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch recipes" }, 500);
  }
});

// Get a specific recipe by meal_type and id
app.get("/make-server-dbaf6019/admin/recipe/:mealType/:recipeId", async (c) => {
  try {
    const mealType = c.req.param('mealType');
    const recipeId = c.req.param('recipeId');
    const key = `recipe:${mealType}:${recipeId}`;

    const value = await kv.get(key);
    if (!value) {
      return c.json({ error: "Recipe not found" }, 404);
    }

    const recipe = typeof value === 'string' ? JSON.parse(value) : value;
    return c.json({ key, recipe });
  } catch (error: any) {
    console.log(`Error fetching recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch recipe" }, 500);
  }
});

// Add or update a recipe
app.post("/make-server-dbaf6019/admin/recipe", async (c) => {
  try {
    const recipe = await c.req.json();

    if (!recipe.id || !recipe.meal_type) {
      return c.json({ error: "Recipe must have 'id' and 'meal_type' fields" }, 400);
    }

    const key = `recipe:${recipe.meal_type}:${recipe.id}`;
    await kv.set(key, JSON.stringify(recipe));

    return c.json({
      message: "Recipe saved successfully",
      key,
      recipe
    });
  } catch (error: any) {
    console.log(`Error saving recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to save recipe" }, 500);
  }
});

// Update a specific recipe field
app.patch("/make-server-dbaf6019/admin/recipe/:mealType/:recipeId", async (c) => {
  try {
    const mealType = c.req.param('mealType');
    const recipeId = c.req.param('recipeId');
    const key = `recipe:${mealType}:${recipeId}`;
    const updates = await c.req.json();

    const value = await kv.get(key);
    if (!value) {
      return c.json({ error: "Recipe not found" }, 404);
    }

    const recipe = typeof value === 'string' ? JSON.parse(value) : value;
    const updatedRecipe = { ...recipe, ...updates };
    await kv.set(key, JSON.stringify(updatedRecipe));

    return c.json({
      message: "Recipe updated successfully",
      key,
      recipe: updatedRecipe
    });
  } catch (error: any) {
    console.log(`Error updating recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to update recipe" }, 500);
  }
});

// Delete a recipe
app.delete("/make-server-dbaf6019/admin/recipe/:mealType/:recipeId", async (c) => {
  try {
    const mealType = c.req.param('mealType');
    const recipeId = c.req.param('recipeId');
    const key = `recipe:${mealType}:${recipeId}`;

    await kv.del(key);

    return c.json({
      message: "Recipe deleted successfully",
      key
    });
  } catch (error: any) {
    console.log(`Error deleting recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to delete recipe" }, 500);
  }
});

// Clear all recipe data (use with caution!)
app.delete("/make-server-dbaf6019/admin/clear-all-recipes", async (c) => {
  try {
    const data = await getByPrefixWithKeys('recipe:');
    const keys = data.map(item => item.key);

    if (keys.length > 0) {
      await kv.mdel(keys);
    }

    return c.json({
      message: "All recipe data cleared",
      deletedCount: keys.length
    });
  } catch (error: any) {
    console.log(`Error clearing recipe data: ${error.message}`);
    return c.json({ error: error.message || "Failed to clear data" }, 500);
  }
});

// Search recipes by name or ingredient
app.post("/make-server-dbaf6019/admin/search-recipes", async (c) => {
  try {
    const { query } = await c.req.json();

    if (!query || query.length < 2) {
      return c.json({ recipes: [] });
    }

    const allRecipes = await getAllRecipesFromDB();
    const searchStr = query.toLowerCase();
    const matched = allRecipes.filter(recipe => {
      const nameMatch = recipe.name?.toLowerCase().includes(searchStr);
      const ingredientMatch = recipe.ingredients?.some((ing: string) =>
        ing.toLowerCase().includes(searchStr)
      );
      return nameMatch || ingredientMatch;
    });

    return c.json({
      query,
      count: matched.length,
      recipes: matched
    });
  } catch (error: any) {
    console.log(`Error searching recipes: ${error.message}`);
    return c.json({ error: error.message || "Failed to search recipes" }, 500);
  }
});

// ========== SHUFFLE/REPLACE RECIPE ENDPOINT ==========

// Smart recipe replacement - find similar recipe by nutrition
app.post("/make-server-dbaf6019/shuffle-recipe", async (c) => {
  try {
    const { currentRecipeId, goal, currentMealIds, maxCookingTime } = await c.req.json();

    if (!currentRecipeId || !goal) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    // Fetch recipes from DB by meal_type
    const mealType = goal === 'study' ? 'study' : goal === 'work' ? 'work' : 'fitness';
    let allRecipes = await getRecipesByMealType(mealType);

    // Filter by max cooking time
    if (maxCookingTime && maxCookingTime > 0) {
      allRecipes = allRecipes.filter(r => (r.total_time_minutes ?? r.cook_time_minutes ?? 0) <= maxCookingTime);
    }

    // Find the current recipe
    const currentRecipe = allRecipes.find(r => String(r.id) === String(currentRecipeId));
    if (!currentRecipe) {
      return c.json({ error: "Current recipe not found" }, 404);
    }

    // Exclude currently selected meals
    const excludedIds = (currentMealIds || [currentRecipeId]).map(String);
    let candidates = allRecipes.filter(r => !excludedIds.includes(String(r.id)));

    if (candidates.length === 0) {
      candidates = allRecipes.filter(r => String(r.id) !== String(currentRecipeId));
    }

    if (candidates.length === 0) {
      return c.json({ error: "No alternative recipes available." }, 400);
    }

    // Score by nutrition similarity
    const currentN = currentRecipe.nutrition_per_serving;
    const scored = candidates.map(recipe => {
      const n = recipe.nutrition_per_serving;
      const calorieDiff = Math.abs(n.calories - currentN.calories);
      const calorieScore = Math.max(0, 1 - (calorieDiff / 500));
      const proteinDiff = Math.abs(n.protein_g - currentN.protein_g);
      const proteinScore = Math.max(0, 1 - (proteinDiff / 30));
      const categoryBonus = recipe.recipe_category === currentRecipe.recipe_category ? 0.2 : 0;
      const score = (calorieScore * 0.4) + (proteinScore * 0.3) + categoryBonus + (Math.random() * 0.1);

      return { recipe, score, calorieDiff, proteinDiff };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    const replacementMeal = toSwapOption(best.recipe);

    return c.json({
      replacementMeal,
      similarity: {
        calorieMatch: `${best.calorieDiff.toFixed(0)} cal difference`,
        proteinMatch: `${best.proteinDiff.toFixed(0)}g difference`,
        overallScore: (best.score * 100).toFixed(1) + '%'
      },
      message: `Found great alternative! Similar nutrition profile.`
    });
  } catch (error: any) {
    console.log(`Error shuffling recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to find replacement recipe" }, 500);
  }
});

// Get multiple meal swap options for user to choose from
app.post("/make-server-dbaf6019/get-swap-options", async (c) => {
  try {
    const { currentRecipeId, goal, currentMealIds, maxCookingTime, limit = 6 } = await c.req.json();

    if (!currentRecipeId || !goal) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    const mealType = goal === 'study' ? 'study' : goal === 'work' ? 'work' : 'fitness';
    let allRecipes = await getRecipesByMealType(mealType);

    if (maxCookingTime && maxCookingTime > 0) {
      allRecipes = allRecipes.filter(r => (r.total_time_minutes ?? r.cook_time_minutes ?? 0) <= maxCookingTime);
    }

    const currentRecipe = allRecipes.find(r => String(r.id) === String(currentRecipeId));
    if (!currentRecipe) {
      return c.json({ error: "Current recipe not found" }, 404);
    }

    const excludedIds = (currentMealIds || [currentRecipeId]).map(String);
    let candidates = allRecipes.filter(r => !excludedIds.includes(String(r.id)));

    if (candidates.length < limit) {
      const extras = allRecipes.filter(r => String(r.id) !== String(currentRecipeId) && !excludedIds.includes(String(r.id)));
      candidates = [...new Set([...candidates, ...extras])];
    }

    if (candidates.length === 0) {
      return c.json({ error: "No alternative recipes available." }, 400);
    }

    const currentN = currentRecipe.nutrition_per_serving;
    const scored = candidates.map(recipe => {
      const n = recipe.nutrition_per_serving;
      const calorieDiff = Math.abs(n.calories - currentN.calories);
      const calorieScore = Math.max(0, 1 - (calorieDiff / 500));
      const proteinDiff = Math.abs(n.protein_g - currentN.protein_g);
      const proteinScore = Math.max(0, 1 - (proteinDiff / 30));
      const categoryBonus = recipe.recipe_category === currentRecipe.recipe_category ? 0.2 : 0;
      const score = (calorieScore * 0.4) + (proteinScore * 0.3) + categoryBonus + (Math.random() * 0.1);

      return { recipe, score, calorieDiff, proteinDiff };
    });

    scored.sort((a, b) => b.score - a.score);
    const topOptions = scored.slice(0, limit);

    const swapOptions = topOptions.map(option => ({
      ...toSwapOption(option.recipe),
      similarity: {
        calorieMatch: option.calorieDiff.toFixed(0),
        proteinMatch: option.proteinDiff.toFixed(0),
        matchScore: (option.score * 100).toFixed(0)
      }
    }));

    return c.json({
      swapOptions,
      currentRecipe: {
        calories: currentN.calories,
        protein: currentN.protein_g
      }
    });
  } catch (error: any) {
    console.log(`Error getting swap options: ${error.message}`);
    return c.json({ error: error.message || "Failed to get swap options" }, 500);
  }
});

// ========== AUTHENTICATION ENDPOINTS ==========

// Sign up new user
app.post("/make-server-dbaf6019/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name: name || 'Student' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ error: error.message || "Failed to create user" }, 400);
    }

    return c.json({ 
      message: "User created successfully",
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name
      }
    });
  } catch (error: any) {
    console.log(`Error in signup endpoint: ${error.message}`);
    return c.json({ error: error.message || "Failed to sign up" }, 500);
  }
});

// Get user profile (requires authentication)
app.get("/make-server-dbaf6019/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    return c.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        created_at: user.created_at
      }
    });
  } catch (error: any) {
    console.log(`Error in profile endpoint: ${error.message}`);
    return c.json({ error: error.message || "Failed to get profile" }, 500);
  }
});

// Generate and store recipe image permanently
app.post("/make-server-dbaf6019/generate-recipe-image", async (c) => {
  try {
    const body = await c.req.json();
    const { imageQuery, recipeId, cuisine = 'base' } = body;
    
    if (!imageQuery || !recipeId) {
      return c.json({ error: "Missing imageQuery or recipeId" }, 400);
    }
    
    console.log(`Generating and storing image for recipe: ${recipeId}`);
    
    // Check if image already exists in storage
    const existingImageKey = `recipe-image:${recipeId}`;
    const existingImage = await kv.get(existingImageKey);
    
    if (existingImage) {
      console.log(`Image already exists for recipe ${recipeId}`);
      return c.json({ 
        success: true, 
        imageUrl: existingImage,
        cached: true 
      });
    }
    
    // Generate and store new image
    const imageUrl = await storeRecipeImage(imageQuery, recipeId, cuisine);
    
    if (!imageUrl) {
      return c.json({ error: "Failed to generate and store image" }, 500);
    }
    
    // Cache the image URL in KV store
    await kv.set(existingImageKey, imageUrl);
    
    return c.json({ 
      success: true, 
      imageUrl,
      cached: false 
    });
  } catch (error: any) {
    console.log(`Error generating recipe image: ${error.message}`);
    return c.json({ error: error.message || "Failed to generate image" }, 500);
  }
});

// Upload custom image for a recipe
app.post("/make-server-dbaf6019/upload-recipe-image", async (c) => {
  try {
    const formData = await c.req.formData();
    const imageFile = formData.get('image') as File;
    const recipeId = formData.get('recipeId') as string;
    const cuisine = formData.get('cuisine') as string || 'base';
    
    if (!imageFile || !recipeId) {
      return c.json({ error: "Missing image file or recipeId" }, 400);
    }
    
    console.log(`Uploading custom image for recipe: ${recipeId}`);
    
    // Ensure bucket exists
    await ensureRecipeImagesBucket();
    
    // Convert File to ArrayBuffer then to Uint8Array
    const arrayBuffer = await imageFile.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);
    
    // Determine file extension from MIME type
    const mimeType = imageFile.type || 'image/jpeg';
    let extension = 'jpg';
    if (mimeType.includes('png')) extension = 'png';
    else if (mimeType.includes('webp')) extension = 'webp';
    else if (mimeType.includes('gif')) extension = 'gif';
    
    // Create file path
    const fileName = `${cuisine}/${recipeId}.${extension}`;
    
    // Delete existing image if it exists
    try {
      await supabase.storage
        .from('make-dbaf6019-recipe-images')
        .remove([fileName]);
    } catch (deleteError) {
      console.log('No existing image to delete or error deleting:', deleteError);
    }
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('make-dbaf6019-recipe-images')
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true
      });
    
    if (uploadError) {
      console.log('Upload error:', uploadError);
      return c.json({ error: `Failed to upload image: ${uploadError.message}` }, 500);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('make-dbaf6019-recipe-images')
      .getPublicUrl(fileName);
    
    console.log(`Image uploaded successfully: ${publicUrl}`);
    
    // Cache the image URL in KV store
    const imageKey = `recipe-image:${recipeId}`;
    await kv.set(imageKey, publicUrl);
    
    return c.json({ 
      success: true, 
      imageUrl: publicUrl 
    });
  } catch (error: any) {
    console.log(`Error uploading custom image: ${error.message}`);
    return c.json({ error: error.message || "Failed to upload image" }, 500);
  }
});

// Batch generate and store images for all recipes (new recipes already have image URLs)
app.post("/make-server-dbaf6019/generate-all-recipe-images", async (c) => {
  try {
    console.log('=== Caching Recipe Image URLs ===');

    const allRecipes = await getAllRecipesFromDB();
    let cachedCount = 0;
    let skippedCount = 0;

    for (const recipe of allRecipes) {
      const imageKey = `recipe-image:${recipe.id}`;
      const existing = await kv.get(imageKey);

      if (existing) {
        skippedCount++;
        continue;
      }

      // New recipes have image URLs directly
      if (recipe.image?.url) {
        await kv.set(imageKey, recipe.image.url);
        cachedCount++;
      }
    }

    return c.json({
      success: true,
      totalRecipes: allRecipes.length,
      cachedCount,
      skippedCount
    });
  } catch (error: any) {
    console.log(`Error caching recipe images: ${error.message}`);
    return c.json({ error: error.message || "Failed to cache images" }, 500);
  }
});

// Get stored image URL for a recipe
app.get("/make-server-dbaf6019/recipe-image/:recipeId", async (c) => {
  try {
    const { recipeId } = c.req.param();
    
    if (!recipeId) {
      return c.json({ error: "Missing recipeId" }, 400);
    }
    
    const imageKey = `recipe-image:${recipeId}`;
    const imageUrl = await kv.get(imageKey);
    
    if (!imageUrl) {
      return c.json({ error: "Image not found" }, 404);
    }
    
    return c.json({ 
      success: true, 
      imageUrl 
    });
  } catch (error: any) {
    console.log(`Error fetching recipe image: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch image" }, 500);
  }
});

// ========== KITCHEN INVENTORY ENDPOINTS ==========

// Check if user has completed kitchen inventory wizard
app.post("/make-server-dbaf6019/check-kitchen-inventory", async (c) => {
  try {
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "User ID required" }, 400);
    }

    // Check if wizard completion is stored in KV
    const key = `kitchen_inventory_${userId}`;
    const data = await kv.get(key);

    if (data && data.completed) {
      return c.json({ 
        completed: true,
        missingEssentials: data.missingEssentials || []
      });
    }

    return c.json({ completed: false });
  } catch (error: any) {
    console.log(`Error checking kitchen inventory: ${error.message}`);
    return c.json({ error: error.message || "Failed to check kitchen inventory" }, 500);
  }
});

// Save user's kitchen inventory completion
app.post("/make-server-dbaf6019/save-kitchen-inventory", async (c) => {
  try {
    const { userId, missingEssentials } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "User ID required" }, 400);
    }

    // Save completion status and missing essentials to KV
    const key = `kitchen_inventory_${userId}`;
    await kv.set(key, {
      completed: true,
      missingEssentials: missingEssentials || [],
      completedAt: new Date().toISOString()
    });

    console.log(`✅ Saved kitchen inventory for user ${userId}: ${missingEssentials.length} missing items`);

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`Error saving kitchen inventory: ${error.message}`);
    return c.json({ error: error.message || "Failed to save kitchen inventory" }, 500);
  }
});

// ========== MEAL PLAN STORAGE ENDPOINTS ==========

// Save user's meal plan (now supports multiple plans)
app.post("/make-server-dbaf6019/save-meal-plan", async (c) => {
  try {
    const { userId, mealPlan, preferences, planName } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "User ID required" }, 400);
    }

    if (!mealPlan) {
      return c.json({ error: "Meal plan required" }, 400);
    }

    // Generate unique plan ID
    const planId = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    // Save individual meal plan
    const planKey = `meal_plan_${userId}_${planId}`;
    await kv.set(planKey, {
      planId,
      mealPlan,
      preferences,
      planName: planName || `Meal Plan - ${new Date().toLocaleDateString('en-GB')}`,
      savedAt: timestamp,
      userId
    });

    // Update user's plan list
    const listKey = `meal_plan_list_${userId}`;
    const existingList = await kv.get(listKey) || { plans: [] };
    
    existingList.plans.unshift({
      planId,
      planName: planName || `Meal Plan - ${new Date().toLocaleDateString('en-GB')}`,
      savedAt: timestamp,
      totalCost: mealPlan.totalCost,
      mealCount: mealPlan.meals?.length || 0
    });
    
    // Keep only last 10 plans
    if (existingList.plans.length > 10) {
      const removedPlan = existingList.plans.pop();
      // Delete the old plan data
      await kv.del(`meal_plan_${userId}_${removedPlan.planId}`);
    }
    
    await kv.set(listKey, existingList);

    console.log(`✅ Saved meal plan for user ${userId}: ${mealPlan.meals?.length || 0} meals (ID: ${planId})`);

    return c.json({ 
      success: true,
      planId,
      message: "Meal plan saved successfully"
    });
  } catch (error: any) {
    console.log(`Error saving meal plan: ${error.message}`);
    return c.json({ error: error.message || "Failed to save meal plan" }, 500);
  }
});

// Get all saved meal plans for a user
app.post("/make-server-dbaf6019/get-meal-plans", async (c) => {
  try {
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "User ID required" }, 400);
    }

    const listKey = `meal_plan_list_${userId}`;
    const data = await kv.get(listKey);

    if (!data || !data.plans || data.plans.length === 0) {
      return c.json({ 
        plans: []
      });
    }

    console.log(`✅ Retrieved ${data.plans.length} meal plans for user ${userId}`);

    return c.json({ 
      plans: data.plans
    });
  } catch (error: any) {
    console.log(`Error getting meal plans: ${error.message}`);
    return c.json({ error: error.message || "Failed to get meal plans" }, 500);
  }
});

// Load a specific meal plan by ID
app.post("/make-server-dbaf6019/load-meal-plan-by-id", async (c) => {
  try {
    const { userId, planId } = await c.req.json();
    
    if (!userId || !planId) {
      return c.json({ error: "User ID and Plan ID required" }, 400);
    }

    const planKey = `meal_plan_${userId}_${planId}`;
    const data = await kv.get(planKey);

    if (!data) {
      return c.json({ error: "Meal plan not found" }, 404);
    }

    console.log(`✅ Loaded meal plan ${planId} for user ${userId}`);

    return c.json({ 
      success: true,
      mealPlan: data.mealPlan,
      preferences: data.preferences,
      planName: data.planName,
      savedAt: data.savedAt
    });
  } catch (error: any) {
    console.log(`Error loading meal plan: ${error.message}`);
    return c.json({ error: error.message || "Failed to load meal plan" }, 500);
  }
});

// Delete a specific meal plan
app.post("/make-server-dbaf6019/delete-meal-plan-by-id", async (c) => {
  try {
    const { userId, planId } = await c.req.json();
    
    if (!userId || !planId) {
      return c.json({ error: "User ID and Plan ID required" }, 400);
    }

    // Delete the plan data
    const planKey = `meal_plan_${userId}_${planId}`;
    await kv.del(planKey);

    // Update the plan list
    const listKey = `meal_plan_list_${userId}`;
    const data = await kv.get(listKey);
    
    if (data && data.plans) {
      data.plans = data.plans.filter((p: any) => p.planId !== planId);
      await kv.set(listKey, data);
    }

    console.log(`✅ Deleted meal plan ${planId} for user ${userId}`);

    return c.json({ 
      success: true,
      message: "Meal plan deleted successfully"
    });
  } catch (error: any) {
    console.log(`Error deleting meal plan: ${error.message}`);
    return c.json({ error: error.message || "Failed to delete meal plan" }, 500);
  }
});

// Load user's saved meal plan
app.post("/make-server-dbaf6019/load-meal-plan", async (c) => {
  try {
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "User ID required" }, 400);
    }

    // Retrieve meal plan from KV
    const key = `meal_plan_${userId}`;
    const data = await kv.get(key);

    if (!data) {
      return c.json({ 
        hasSavedPlan: false
      });
    }

    console.log(`✅ Loaded meal plan for user ${userId}`);

    return c.json({ 
      hasSavedPlan: true,
      mealPlan: data.mealPlan,
      preferences: data.preferences,
      savedAt: data.savedAt
    });
  } catch (error: any) {
    console.log(`Error loading meal plan: ${error.message}`);
    return c.json({ error: error.message || "Failed to load meal plan" }, 500);
  }
});

// Delete user's saved meal plan
app.post("/make-server-dbaf6019/delete-meal-plan", async (c) => {
  try {
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "User ID required" }, 400);
    }

    // Delete meal plan from KV
    const key = `meal_plan_${userId}`;
    await kv.del(key);

    console.log(`✅ Deleted meal plan for user ${userId}`);

    return c.json({ 
      success: true,
      message: "Meal plan deleted successfully"
    });
  } catch (error: any) {
    console.log(`Error deleting meal plan: ${error.message}`);
    return c.json({ error: error.message || "Failed to delete meal plan" }, 500);
  }
});

// Get recipe image with cache - checks cache first, then generates if needed
app.post("/make-server-dbaf6019/get-recipe-image-with-cache", async (c) => {
  try {
    const { recipeId, imageQuery, cuisine = 'base' } = await c.req.json();
    
    if (!recipeId || !imageQuery) {
      return c.json({ error: "Missing recipeId or imageQuery" }, 400);
    }
    
    // Check if image already exists in cache
    const imageKey = `recipe-image:${recipeId}`;
    const cachedImage = await kv.get(imageKey);
    
    if (cachedImage) {
      console.log(`✓ Using cached image for ${recipeId}`);
      return c.json({ 
        success: true, 
        imageUrl: cachedImage,
        cached: true 
      });
    }
    
    // If not cached, generate and store new image
    console.log(`✗ No cached image found for ${recipeId}, generating...`);
    const imageUrl = await storeRecipeImage(imageQuery, recipeId, cuisine);
    
    if (!imageUrl) {
      return c.json({ error: "Failed to generate and store image" }, 500);
    }
    
    // Cache the image URL in KV store
    await kv.set(imageKey, imageUrl);
    
    return c.json({ 
      success: true, 
      imageUrl,
      cached: false 
    });
  } catch (error: any) {
    console.log(`Error getting recipe image with cache: ${error.message}`);
    return c.json({ error: error.message || "Failed to get image" }, 500);
  }
});

// Calculate nutrition for a recipe's ingredients using CalorieNinjas API
app.post("/make-server-dbaf6019/admin/calculate-nutrition", async (c) => {
  try {
    const apiKey = Deno.env.get("CALORIE_NINJAS_API_KEY");
    if (!apiKey) {
      return c.json({ error: "CALORIE_NINJAS_API_KEY not configured" }, 500);
    }

    const { ingredients, servings } = await c.req.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return c.json({ error: "ingredients array is required" }, 400);
    }

    // Validate and filter ingredients
    const validIngredients = ingredients.filter(
      (ing: any) => ing && typeof ing.name === "string" && ing.name.trim() && typeof ing.amount === "string" && ing.amount.trim()
    );

    if (validIngredients.length === 0) {
      return c.json({ error: "No valid ingredients found (each needs name and amount)" }, 400);
    }

    const servingsNum = typeof servings === "number" ? servings : 1;
    const effectiveServings = servingsNum > 0 ? Math.floor(servingsNum) : 1;

    const result = await calculateRecipeNutrition(apiKey, validIngredients, effectiveServings);

    return c.json({
      nutrition: result.perServing,
      totalNutrition: result.total,
      ingredientDetails: result.ingredientDetails,
      warnings: result.warnings,
      errors: result.errors,
      servings: effectiveServings,
    });
  } catch (error: any) {
    console.log(`Error calculating nutrition: ${error.message}`);
    return c.json({ error: error.message || "Failed to calculate nutrition" }, 500);
  }
});

// Validate nutrition for all recipes by comparing stored vs calculated values
app.post("/make-server-dbaf6019/admin/validate-nutrition", async (c) => {
  try {
    const apiKey = Deno.env.get("CALORIE_NINJAS_API_KEY");
    if (!apiKey) {
      return c.json({ error: "CALORIE_NINJAS_API_KEY not configured" }, 500);
    }

    // Fetch all recipes from KV store
    const allRecipeData = await getByPrefixWithKeys("recipe:");
    const allRecipes = allRecipeData.filter(e => e.key !== 'recipes:meta');

    const report: Array<{
      key: string;
      name: string;
      servings: number;
      stored: any;
      calculated: any;
      differences: Record<string, { stored: number; calculated: number; diffPercent: number }>;
      flagged: boolean;
      errors: string[];
      warnings: string[];
    }> = [];

    let processedCount = 0;

    for (const entry of allRecipes) {
      const recipe = entry.value;
      if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
        continue;
      }

      // Rate limiting: pause 1s every 5 recipes
      if (processedCount > 0 && processedCount % 5 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      try {
        const ingredients = recipe.ingredients.map((ing: any) => ({
          name: ing.name,
          amount: ing.amount,
        }));

        const result = await calculateRecipeNutrition(
          apiKey,
          ingredients,
          recipe.servings || 1
        );

        const stored = recipe.nutrition || {};
        const calculated = result.perServing;
        const differences: Record<string, { stored: number; calculated: number; diffPercent: number }> = {};
        let flagged = false;

        for (const macro of ['calories', 'protein', 'carbs', 'fats', 'fiber'] as const) {
          const storedVal = stored[macro] || 0;
          const calcVal = calculated[macro] || 0;
          const base = Math.max(storedVal, calcVal, 1);
          const diffPercent = Math.round(Math.abs(storedVal - calcVal) / base * 100);

          differences[macro] = {
            stored: storedVal,
            calculated: calcVal,
            diffPercent,
          };

          if (diffPercent > 20) {
            flagged = true;
          }
        }

        report.push({
          key: entry.key,
          name: recipe.name || recipe.id || entry.key,
          servings: recipe.servings || 1,
          stored,
          calculated,
          differences,
          flagged,
          errors: result.errors,
          warnings: result.warnings,
        });
      } catch (err: any) {
        report.push({
          key: entry.key,
          name: recipe.name || recipe.id || entry.key,
          servings: recipe.servings || 1,
          stored: recipe.nutrition || {},
          calculated: null,
          differences: {},
          flagged: true,
          errors: [err.message || "Failed to calculate"],
          warnings: [],
        });
      }

      processedCount++;
    }

    const flaggedCount = report.filter((r) => r.flagged).length;

    return c.json({
      totalRecipes: report.length,
      flaggedCount,
      report,
    });
  } catch (error: any) {
    console.log(`Error validating nutrition: ${error.message}`);
    return c.json({ error: error.message || "Failed to validate nutrition" }, 500);
  }
});

// ===== Retention Feature Endpoints =====

// Track a meal as cooked or uncooked
app.post("/make-server-dbaf6019/track-meal-cooked", async (c) => {
  try {
    const { userId, mealId, date, recipeId, recipeName, mealCost, category, isCooked } = await c.req.json();

    if (!userId || !mealId || !date) {
      return c.json({ error: "userId, mealId, and date are required" }, 400);
    }

    const key = `cooked_${userId}_${date}_${mealId}`;

    if (isCooked === false) {
      await kv.del(key);
      return c.json({ success: true, action: 'removed' });
    }

    await kv.set(key, {
      mealId,
      date,
      recipeId: recipeId || mealId,
      recipeName: recipeName || '',
      mealCost: mealCost || 0,
      category: category || '',
      cookedAt: new Date().toISOString(),
    });

    return c.json({ success: true, action: 'added' });
  } catch (error: any) {
    console.log(`Error in /track-meal-cooked: ${error.message}`);
    return c.json({ error: error.message || "Failed to track meal" }, 500);
  }
});

// Get cooked meals for a specific date
app.post("/make-server-dbaf6019/cooked-meals", async (c) => {
  try {
    const { userId, date } = await c.req.json();

    if (!userId || !date) {
      return c.json({ error: "userId and date are required" }, 400);
    }

    const prefix = `cooked_${userId}_${date}_`;
    const entries = await getByPrefixWithKeys(prefix);

    const cookedMeals = entries.map(e => e.value);
    const mealIds = cookedMeals.map((m: any) => m.mealId);

    return c.json({ date, cookedMeals, mealIds });
  } catch (error: any) {
    console.log(`Error in /cooked-meals: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch cooked meals" }, 500);
  }
});

// Get comprehensive user stats
app.post("/make-server-dbaf6019/user-stats", async (c) => {
  try {
    const { userId } = await c.req.json();

    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }

    // Fetch all cooked meal entries for this user
    const allCookedEntries = await getByPrefixWithKeys(`cooked_${userId}_`);

    // Plans Created: count from meal_plan_list
    let plansCreated = 0;
    try {
      const planList = await kv.get(`meal_plan_list_${userId}`);
      if (Array.isArray(planList)) {
        plansCreated = planList.length;
      }
    } catch { /* no plans yet */ }

    // Meals Logged
    const mealsLogged = allCookedEntries.length;

    // Gather data by date
    const mealsByDate: Record<string, any[]> = {};
    const uniqueRecipeIds = new Set<string>();
    let totalHomeCost = 0;
    let mealPrepCount = 0;

    for (const entry of allCookedEntries) {
      const meal = entry.value;
      const date = meal.date;
      if (!mealsByDate[date]) mealsByDate[date] = [];
      mealsByDate[date].push(meal);

      if (meal.recipeId) uniqueRecipeIds.add(meal.recipeId);
      totalHomeCost += meal.mealCost || 0;
      if (meal.category === 'meal-prep') mealPrepCount++;
    }

    // Money Saved: (mealsLogged * £8) - totalHomeCost
    const moneySaved = Math.max(0, Math.round((mealsLogged * 8) - totalHomeCost));

    // Cooking days
    const cookingDates = Object.keys(mealsByDate).sort();
    const totalCookingDays = cookingDates.length;

    // Streak calculation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    const cookingDateSet = new Set(cookingDates);

    // Current streak: consecutive days ending at today or yesterday
    let currentStreak = 0;
    let checkDate = new Date(today);
    // Start from today; if today has no meals, start from yesterday
    if (!cookingDateSet.has(formatDate(checkDate))) {
      checkDate = new Date(yesterday);
    }
    while (cookingDateSet.has(formatDate(checkDate))) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Longest streak
    let longestStreak = 0;
    if (cookingDates.length > 0) {
      let streak = 1;
      for (let i = 1; i < cookingDates.length; i++) {
        const prev = new Date(cookingDates[i - 1]);
        const curr = new Date(cookingDates[i]);
        const diffMs = curr.getTime() - prev.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          streak++;
        } else {
          longestStreak = Math.max(longestStreak, streak);
          streak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, streak);
    }

    // Full day streak (3+ meals/day) for week_warrior badge
    let fullDayStreak = 0;
    {
      let streak = 0;
      let checkD = new Date(today);
      if (!(mealsByDate[formatDate(checkD)]?.length >= 3)) {
        checkD = new Date(yesterday);
      }
      while (mealsByDate[formatDate(checkD)]?.length >= 3) {
        streak++;
        checkD.setDate(checkD.getDate() - 1);
      }
      fullDayStreak = streak;
    }

    // Average cost per meal
    const avgCost = mealsLogged > 0 ? totalHomeCost / mealsLogged : 0;

    // Compute earned badges
    const earnedBadges: string[] = [];
    for (const achievement of ACHIEVEMENTS) {
      const req = achievement.requirement;
      let earned = false;
      switch (req.type) {
        case 'meals_cooked':
          earned = mealsLogged >= req.value;
          break;
        case 'streak_days':
          earned = longestStreak >= req.value;
          break;
        case 'avg_cost':
          earned = totalCookingDays >= (req.minDays || 0) && avgCost < req.value;
          break;
        case 'cooking_days':
          earned = totalCookingDays >= req.value;
          break;
        case 'unique_recipes':
          earned = uniqueRecipeIds.size >= req.value;
          break;
        case 'meal_prep_count':
          earned = mealPrepCount >= req.value;
          break;
        case 'full_day_streak':
          earned = fullDayStreak >= req.value;
          break;
      }
      if (earned) earnedBadges.push(achievement.id);
    }

    return c.json({
      plansCreated,
      mealsLogged,
      moneySaved,
      currentStreak,
      longestStreak,
      earnedBadges,
      uniqueRecipes: uniqueRecipeIds.size,
      totalCookingDays,
    });
  } catch (error: any) {
    console.log(`Error in /user-stats: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch user stats" }, 500);
  }
});

// Get school leaderboard ranked by best (longest) cooking day streak
app.post("/make-server-dbaf6019/leaderboard", async (c) => {
  try {
    const { schoolId } = await c.req.json();

    if (!schoolId) {
      return c.json({ error: "schoolId is required" }, 400);
    }

    // Get all auth users and filter by school
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { users }, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    if (error) {
      return c.json({ error: error.message || "Failed to list users" }, 500);
    }

    const schoolUsers = (users || []).filter(
      (u: any) => u.user_metadata?.school_id === schoolId
    );

    // Compute longest (best) streak for each school user
    const leaderboard = await Promise.all(
      schoolUsers.map(async (u: any) => {
        const entries = await getByPrefixWithKeys(`cooked_${u.id}_`);
        const cookingDates = [...new Set(entries.map((e: any) => e.value?.date).filter(Boolean))].sort();

        let longestStreak = 0;
        if (cookingDates.length > 0) {
          let streak = 1;
          for (let i = 1; i < cookingDates.length; i++) {
            const prev = new Date(cookingDates[i - 1]);
            const curr = new Date(cookingDates[i]);
            const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              streak++;
            } else {
              longestStreak = Math.max(longestStreak, streak);
              streak = 1;
            }
          }
          longestStreak = Math.max(longestStreak, streak);
        }

        return {
          userId: u.id,
          name: u.user_metadata?.name || 'Anonymous',
          currentStreak: longestStreak,
        };
      })
    );

    // Sort by best streak descending, then name ascending for ties
    leaderboard.sort((a, b) => {
      if (b.currentStreak !== a.currentStreak) return b.currentStreak - a.currentStreak;
      return a.name.localeCompare(b.name);
    });

    // Add rank
    const ranked = leaderboard.map((entry, i) => ({ ...entry, rank: i + 1 }));

    return c.json({ leaderboard: ranked });
  } catch (error: any) {
    console.log(`Error in /leaderboard: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch leaderboard" }, 500);
  }
});

Deno.serve(app.fetch);