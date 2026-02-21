import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
import { 
  RECIPE_DATABASE, 
  Recipe, 
  RecipeIngredient,
  getRecipesByCategory, 
  getRecipesByNeed, 
  getRecipeTotalCost,
  organizeIngredientsBySection 
} from "./recipe-database.ts";
import {
  CUISINE_RECIPES,
  CuisineRecipe,
  CuisineType,
  getRecipesByCuisine,
  getRecipesBySpiceLevel,
  getAllCuisines,
  getCuisineStats
} from "./cuisine-database.ts";
import { BRAIN_RECIPES } from "./brain-recipes.ts";
import { WORK_EFFICIENCY_RECIPES } from "./work-efficiency-recipes.ts";
import { FITNESS_RECOVERY_RECIPES } from "./fitness-recovery-recipes.ts";
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

// Helper function to download and store image from Pollinations.ai
async function storeRecipeImage(imageQuery: string, recipeId: string, cuisine: string): Promise<string | null> {
  if (!imageQuery) return null;
  
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    
    // Ensure bucket exists
    await ensureRecipeImagesBucket();
    
    // Download image from Pollinations.ai
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imageQuery)}?width=800&height=600&nologo=true`;
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
    const { storeName, mealsPerDay, budget, goal, shoppingDate, maxCookingTime, cookingMethods, avoidIngredients } = await c.req.json();
    
    if (!mealsPerDay || !budget || !goal) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    // Calculate number of cooking days from today to shopping date
    let cookingDays = 7; // Default to 7 days
    if (shoppingDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset to start of day
      const targetDate = new Date(shoppingDate);
      targetDate.setHours(0, 0, 0, 0); // Reset to start of day
      
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Ensure at least 1 day, and cap at 14 days
      cookingDays = Math.max(1, Math.min(diffDays, 14));
      
      console.log(`📅 Cooking days calculation: Today=${today.toISOString().split('T')[0]}, Target=${targetDate.toISOString().split('T')[0]}, Days=${cookingDays}`);
    }

    // Calculate total meals needed
    const totalMealsNeeded = cookingDays * mealsPerDay;
    console.log(`🍽️ Total meals needed: ${cookingDays} days × ${mealsPerDay} meals/day = ${totalMealsNeeded} meals`);

    // Calculate weekly budget
    const weeklyBudget = budget;

    // Get recipes suitable for the user's goal
    const suitableRecipes = getRecipesByNeed(goal === 'study' ? 'studying' : goal === 'work' ? 'working' : 'fitness');

    // Log avoid ingredients
    if (avoidIngredients && avoidIngredients.length > 0) {
      console.log(`🚫 Avoiding ingredients: ${avoidIngredients.join(', ')}`);
    }

    // Generate meal plan that fits within budget with daily variety
    const mealPlan = generateMealPlanFromRecipes(
      suitableRecipes,
      mealsPerDay,
      weeklyBudget,
      goal,
      maxCookingTime,
      cookingMethods,
      cookingDays, // NEW: Pass cooking days for daily meal planning
      avoidIngredients // NEW: Pass avoid ingredients
    );

    return c.json({ mealPlan });
  } catch (error: any) {
    console.log(`Error in /generate-meal-plan endpoint: ${error.message}`);
    return c.json({ error: error.message || "Failed to generate meal plan" }, 500);
  }
});

// New helper function to generate meal plan from recipe database
function generateMealPlanFromRecipes(
  recipes: Recipe[],
  mealsPerDay: number,
  weeklyBudget: number,
  goal: string,
  maxCookingTime?: number,
  cookingMethods?: string[],
  cookingDays: number = 7, // NEW: Number of days to cook for
  avoidIngredients?: string[] // NEW: Ingredients to avoid
) {
  const selectedRecipes: Recipe[] = [];
  const dailyBudget = weeklyBudget / 7;
  const totalMealsNeeded = cookingDays * mealsPerDay;
  
  console.log(`🎯 Generating meal plan for ${cookingDays} days with ${mealsPerDay} meals/day = ${totalMealsNeeded} total meals`);
  
  // Filter recipes by avoided ingredients if specified
  let filteredRecipes = recipes;
  if (avoidIngredients && avoidIngredients.length > 0) {
    const avoidLowercase = avoidIngredients.map(i => i.toLowerCase());
    filteredRecipes = recipes.filter(recipe => {
      // Check if any ingredient in the recipe matches avoided ingredients
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
      const hasAvoidedIngredient = avoidLowercase.some(avoid => 
        recipeIngredients.some(ing => ing.includes(avoid) || avoid.includes(ing))
      );
      return !hasAvoidedIngredient;
    });
    console.log(`🚫 Filtered recipes by avoided ingredients: ${filteredRecipes.length}/${recipes.length} recipes remaining`);
  }

  // Filter recipes by cooking time if specified
  if (maxCookingTime && maxCookingTime > 0) {
    filteredRecipes = filteredRecipes.filter(r => r.cookingTime <= maxCookingTime);
    console.log(`Filtered recipes by max cooking time ${maxCookingTime} min: ${filteredRecipes.length} recipes available`);
  }

  // If no recipes match the filters, use all recipes (fallback)
  if (filteredRecipes.length === 0) {
    console.log('No recipes match filters, using all recipes');
    filteredRecipes = recipes;
  }
  
  // Filter by preferred cooking methods if specified
  let methodFilteredRecipes = filteredRecipes;
  if (cookingMethods && cookingMethods.length > 0) {
    methodFilteredRecipes = filteredRecipes.filter(r => cookingMethods.includes(r.category));
    console.log(`Filtered recipes by cooking methods [${cookingMethods.join(', ')}]: ${methodFilteredRecipes.length} recipes available`);
    
    // If no recipes match the preferred methods, use all recipes (fallback)
    if (methodFilteredRecipes.length === 0) {
      console.log('No recipes match preferred cooking methods, using all filtered recipes');
      methodFilteredRecipes = filteredRecipes;
    }
  }
  
  // Use methodFilteredRecipes for the rest of the function
  filteredRecipes = methodFilteredRecipes;
  
  // Shuffle recipes for variety
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const shuffledRecipes = shuffleArray(filteredRecipes);
  
  // Prioritize variety: categorize recipes
  const onePotRecipes = shuffledRecipes.filter(r => r.category === 'one-pot');
  const microwaveRecipes = shuffledRecipes.filter(r => r.category === 'microwave');
  const mealPrepRecipes = shuffledRecipes.filter(r => r.category === 'meal-prep');

  // Generate meals for each day with variety
  const dailyMeals: Recipe[][] = [];
  const usedRecipeIds = new Set<string>(); // Track used recipe IDs to prevent exact duplicates
  
  for (let day = 0; day < cookingDays; day++) {
    const dayMeals: Recipe[] = [];
    
    // For each meal on this day
    for (let mealNum = 0; mealNum < mealsPerDay; mealNum++) {
      let selectedRecipe: Recipe | null = null;
      
      // If user has cooking method preferences, use them
      if (cookingMethods && cookingMethods.length > 0) {
        const preferredMethod = cookingMethods[mealNum % cookingMethods.length];
        
        let candidates: Recipe[] = [];
        if (preferredMethod === 'one-pot') candidates = onePotRecipes;
        else if (preferredMethod === 'microwave') candidates = microwaveRecipes;
        else if (preferredMethod === 'meal-prep') candidates = mealPrepRecipes;
        
        // Find a recipe that hasn't been used yet
        selectedRecipe = candidates.find(r => !usedRecipeIds.has(r.id)) || null;
      } else {
        // No preference - cycle through categories for variety
        let candidates: Recipe[] = [];
        if (mealNum % 3 === 0) candidates = onePotRecipes;
        else if (mealNum % 3 === 1) candidates = microwaveRecipes;
        else candidates = mealPrepRecipes;
        
        selectedRecipe = candidates.find(r => !usedRecipeIds.has(r.id)) || null;
      }
      
      // If no recipe from preferred category, get any available recipe
      if (!selectedRecipe) {
        selectedRecipe = shuffledRecipes.find(r => !usedRecipeIds.has(r.id)) || null;
      }
      
      // FALLBACK: If we've run out of unique recipes, start from the pool again
      // but still try to pick different ones than current day
      if (!selectedRecipe && shuffledRecipes.length > 0) {
        console.log(`⚠️ Running out of unique recipes, selecting from pool for Day ${day + 1}, Meal ${mealNum + 1}`);
        
        // Try to find recipes not used in the current day at least
        const currentDayRecipeIds = new Set(dayMeals.map(m => m.id));
        selectedRecipe = shuffledRecipes.find(r => !currentDayRecipeIds.has(r.id)) || shuffledRecipes[0];
      }
      
      // Add recipe if found
      if (selectedRecipe) {
        dayMeals.push(selectedRecipe);
        selectedRecipes.push(selectedRecipe);
        usedRecipeIds.add(selectedRecipe.id);
      } else {
        console.log(`❌ ERROR: Could not find recipe for Day ${day + 1}, Meal ${mealNum + 1}`);
      }
    }
    
    dailyMeals.push(dayMeals);
    console.log(`📆 Day ${day + 1}: ${dayMeals.length} meals selected - ${dayMeals.map(m => m.name).join(', ')}`);
  }
  
  console.log(`✅ Total recipes selected: ${selectedRecipes.length} for ${totalMealsNeeded} meals needed across ${cookingDays} days`);

  // Convert recipes to meal plan format with day assignment
  const meals = selectedRecipes.map((recipe, index) => {
    const totalCost = getRecipeTotalCost(recipe);
    const costPerServing = totalCost / recipe.servings;
    
    // Calculate which day this meal belongs to
    const dayNumber = Math.floor(index / mealsPerDay) + 1;
    const mealNumber = (index % mealsPerDay) + 1;

    // Transform recipe ingredients to match expected format
    const ingredients = recipe.ingredients.map(ing => ({
      name: ing.name,
      category: ing.category,
      price: ing.estimatedPrice,
      unit: ing.amount,
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      available: true,
      amount: ing.amount,
      estimatedPrice: ing.estimatedPrice,
    }));

    return {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      image: recipe.imageQuery,
      imageUrl: recipe.imageUrl || null,
      rationale: recipe.benefits.join('. '),
      benefits: recipe.benefits,
      mealType: recipe.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      category: recipe.category,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      tags: recipe.tags,
      ingredients,
      ingredientNames: recipe.ingredients.map(ing => ing.name),
      instructions: recipe.instructions,
      cost: parseFloat(costPerServing.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      nutrition: recipe.nutrition,
      youtubeUrl: recipe.youtubeUrl,
      sourceUrl: recipe.sourceUrl,
      // NEW: Add day and meal information
      dayNumber,
      mealNumber,
    };
  });

  const totalCost = meals.reduce((sum, meal) => sum + meal.totalCost, 0);

  return {
    meals,
    totalCost: parseFloat(totalCost.toFixed(2)),
    dailyBudget,
    weeklyBudget,
    withinBudget: totalCost <= weeklyBudget,
    // NEW: Add metadata about the meal plan
    cookingDays,
    totalMealsNeeded,
    mealsPerDay,
  };
}

// ========== CUISINE-SPECIFIC ENDPOINTS ==========

// Initialize cuisine database in KV store
app.post("/make-server-dbaf6019/init-cuisine-database", async (c) => {
  try {
    // Store all cuisine recipes in the KV store
    for (const recipe of CUISINE_RECIPES) {
      const key = `cuisine:${recipe.cuisine}:${recipe.id}`;
      await kv.set(key, JSON.stringify(recipe));
    }

    // Store cuisine metadata
    const cuisineStats = getCuisineStats();
    await kv.set('cuisine:stats', JSON.stringify(cuisineStats));

    return c.json({ 
      message: "Cuisine database initialized successfully",
      totalRecipes: CUISINE_RECIPES.length,
      cuisines: getAllCuisines(),
      stats: cuisineStats
    });
  } catch (error: any) {
    console.log(`Error initializing cuisine database: ${error.message}`);
    return c.json({ error: error.message || "Failed to initialize cuisine database" }, 500);
  }
});

// Initialize base recipe database (one-pot, microwave, meal-prep)
app.post("/make-server-dbaf6019/init-base-recipes", async (c) => {
  try {
    console.log('=== Base Recipe Database Initialization Started ===');
    console.log(`Total base recipes to process: ${RECIPE_DATABASE.length}`);
    
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];
    
    // Store all base recipes in the KV store
    for (const recipe of RECIPE_DATABASE) {
      try {
        const key = `base-recipe:${recipe.category}:${recipe.id}`;
        console.log(`Storing recipe: ${key}`);
        await kv.set(key, JSON.stringify(recipe));
        successCount++;
      } catch (error: any) {
        errorCount++;
        const errorMsg = `Failed to store ${recipe.id}: ${error.message}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    console.log(`=== Initialization Complete ===`);
    console.log(`Success: ${successCount}, Errors: ${errorCount}`);
    
    if (errors.length > 0) {
      console.error('Errors encountered:', errors);
    }

    return c.json({ 
      message: "Base recipe database initialized successfully",
      totalRecipes: RECIPE_DATABASE.length,
      successCount,
      errorCount,
      errors: errors.length > 0 ? errors : undefined,
      categories: {
        'one-pot': RECIPE_DATABASE.filter(r => r.category === 'one-pot').length,
        'microwave': RECIPE_DATABASE.filter(r => r.category === 'microwave').length,
        'meal-prep': RECIPE_DATABASE.filter(r => r.category === 'meal-prep').length,
      }
    });
  } catch (error: any) {
    console.log(`Error initializing base recipe database: ${error.message}`);
    return c.json({ error: error.message || "Failed to initialize base recipe database" }, 500);
  }
});

// Initialize brain-focused study recipes
app.post("/make-server-dbaf6019/init-brain-recipes", async (c) => {
  try {
    console.log('=== Brain Recipes Initialization Started ===');
    console.log(`Total brain recipes to process: ${BRAIN_RECIPES.length}`);
    
    let successCount = 0;
    let errorCount = 0;

    // Store all brain-focused recipes with permanent images
    for (const recipe of BRAIN_RECIPES) {
      try {
        const key = `cuisine:${recipe.cuisine}:${recipe.id}`;
        console.log(`Processing recipe: ${recipe.name} (${key})`);
        
        // Generate and store permanent image
        let recipeWithImage = { ...recipe };
        if (recipe.imageQuery) {
          console.log(`Generating image for: ${recipe.name}`);
          const imageUrl = await storeRecipeImage(recipe.imageQuery, recipe.id, recipe.cuisine);
          if (imageUrl) {
            recipeWithImage.imageUrl = imageUrl;
            console.log(`Image stored for ${recipe.name}: ${imageUrl}`);
          } else {
            console.log(`Failed to store image for ${recipe.name}, continuing without image`);
          }
        }
        
        await kv.set(key, JSON.stringify(recipeWithImage));
        successCount++;
        console.log(`✓ Successfully stored: ${recipe.name}`);
      } catch (error: any) {
        console.log(`✗ Error storing recipe ${recipe.name}: ${error.message}`);
        console.error(error);
        errorCount++;
      }
    }

    console.log(`=== Initialization Complete: ${successCount} success, ${errorCount} errors ===`);
    
    return c.json({ 
      message: "Brain-focused study recipes initialized successfully",
      totalRecipes: BRAIN_RECIPES.length,
      successCount,
      errorCount,
      recipes: BRAIN_RECIPES.map(r => ({ name: r.name, cuisine: r.cuisine, cookingTime: r.cookingTime }))
    });
  } catch (error: any) {
    console.log(`Error initializing brain recipes: ${error.message}`);
    console.error(error);
    return c.json({ error: error.message || "Failed to initialize brain recipes" }, 500);
  }
});

// Initialize work efficiency recipes for sustained energy
app.post("/make-server-dbaf6019/init-work-efficiency-recipes", async (c) => {
  try {
    console.log('=== Work Efficiency Recipes Initialization Started ===');
    console.log(`Total work efficiency recipes to process: ${WORK_EFFICIENCY_RECIPES.length}`);
    
    let successCount = 0;
    let errorCount = 0;
    const BATCH_SIZE = 4; // Process 4 recipes at a time
    
    // Process in batches to avoid compute resource limits
    for (let i = 0; i < WORK_EFFICIENCY_RECIPES.length; i += BATCH_SIZE) {
      const batch = WORK_EFFICIENCY_RECIPES.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(WORK_EFFICIENCY_RECIPES.length / BATCH_SIZE)}`);
      
      for (const recipe of batch) {
        try {
          const key = `cuisine:${recipe.cuisine}:${recipe.id}`;
          console.log(`Processing recipe: ${recipe.name} (${key})`);
          
          // Store recipe without image first for faster processing
          // Images will be generated on-demand when recipes are viewed
          const recipeWithImage = { ...recipe };
          
          await kv.set(key, JSON.stringify(recipeWithImage));
          successCount++;
          console.log(`✓ Successfully stored: ${recipe.name}`);
        } catch (error: any) {
          console.log(`✗ Error storing recipe ${recipe.name}: ${error.message}`);
          console.error(error);
          errorCount++;
        }
      }
      
      // Small delay between batches to prevent resource exhaustion
      if (i + BATCH_SIZE < WORK_EFFICIENCY_RECIPES.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log(`=== Initialization Complete: ${successCount} success, ${errorCount} errors ===`);
    
    return c.json({ 
      message: "Work efficiency recipes initialized successfully",
      totalRecipes: WORK_EFFICIENCY_RECIPES.length,
      successCount,
      errorCount,
      note: "Images will be generated on-demand when recipes are viewed",
      analysis: {
        maxCookingTime: Math.max(...WORK_EFFICIENCY_RECIPES.map(r => r.cookingTime)),
        avgCookingTime: Math.round(WORK_EFFICIENCY_RECIPES.reduce((sum, r) => sum + r.cookingTime, 0) / WORK_EFFICIENCY_RECIPES.length),
        cookingMethods: {
          "one-pot": WORK_EFFICIENCY_RECIPES.filter(r => r.category === "one-pot").length,
          "microwave": WORK_EFFICIENCY_RECIPES.filter(r => r.category === "microwave").length,
          "meal-prep": WORK_EFFICIENCY_RECIPES.filter(r => r.category === "meal-prep").length
        },
        cuisines: [...new Set(WORK_EFFICIENCY_RECIPES.map(r => r.cuisine))]
      },
      recipes: WORK_EFFICIENCY_RECIPES.map(r => ({ 
        name: r.name, 
        cuisine: r.cuisine, 
        cookingTime: r.cookingTime,
        category: r.category 
      }))
    });
  } catch (error: any) {
    console.log(`Error initializing work efficiency recipes: ${error.message}`);
    console.error(error);
    return c.json({ error: error.message || "Failed to initialize work efficiency recipes" }, 500);
  }
});

// Initialize fitness recovery recipes for post-workout
app.post("/make-server-dbaf6019/init-fitness-recovery-recipes", async (c) => {
  try {
    console.log('=== Fitness Recovery Recipes Initialization Started ===');
    console.log(`Total fitness recovery recipes to process: ${FITNESS_RECOVERY_RECIPES.length}`);
    
    let successCount = 0;
    let errorCount = 0;
    const BATCH_SIZE = 4; // Process 4 recipes at a time
    
    // Process in batches to avoid compute resource limits
    for (let i = 0; i < FITNESS_RECOVERY_RECIPES.length; i += BATCH_SIZE) {
      const batch = FITNESS_RECOVERY_RECIPES.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(FITNESS_RECOVERY_RECIPES.length / BATCH_SIZE)}`);
      
      for (const recipe of batch) {
        try {
          const key = `cuisine:${recipe.cuisine}:${recipe.id}`;
          console.log(`Processing recipe: ${recipe.name} (${key})`);
          
          // Store recipe without image first for faster processing
          // Images will be generated on-demand when recipes are viewed
          const recipeWithImage = { ...recipe };
          
          await kv.set(key, JSON.stringify(recipeWithImage));
          successCount++;
          console.log(`✓ Successfully stored: ${recipe.name}`);
        } catch (error: any) {
          console.log(`✗ Error storing recipe ${recipe.name}: ${error.message}`);
          console.error(error);
          errorCount++;
        }
      }
      
      // Small delay between batches to prevent resource exhaustion
      if (i + BATCH_SIZE < FITNESS_RECOVERY_RECIPES.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log(`=== Initialization Complete: ${successCount} success, ${errorCount} errors ===`);
    
    return c.json({ 
      message: "Fitness recovery recipes initialized successfully",
      totalRecipes: FITNESS_RECOVERY_RECIPES.length,
      successCount,
      errorCount,
      note: "Images will be generated on-demand when recipes are viewed",
      analysis: {
        maxCookingTime: Math.max(...FITNESS_RECOVERY_RECIPES.map(r => r.cookingTime)),
        avgCookingTime: Math.round(FITNESS_RECOVERY_RECIPES.reduce((sum, r) => sum + r.cookingTime, 0) / FITNESS_RECOVERY_RECIPES.length),
        cookingMethods: {
          "one-pot": FITNESS_RECOVERY_RECIPES.filter(r => r.category === "one-pot").length,
          "microwave": FITNESS_RECOVERY_RECIPES.filter(r => r.category === "microwave").length,
          "meal-prep": FITNESS_RECOVERY_RECIPES.filter(r => r.category === "meal-prep").length
        },
        cuisines: [...new Set(FITNESS_RECOVERY_RECIPES.map(r => r.cuisine))]
      },
      recipes: FITNESS_RECOVERY_RECIPES.map(r => ({ 
        name: r.name, 
        cuisine: r.cuisine, 
        cookingTime: r.cookingTime,
        category: r.category 
      }))
    });
  } catch (error: any) {
    console.log(`Error initializing fitness recovery recipes: ${error.message}`);
    console.error(error);
    return c.json({ error: error.message || "Failed to initialize fitness recovery recipes" }, 500);
  }
});

// Get all available cuisines
app.get("/make-server-dbaf6019/cuisines", async (c) => {
  try {
    const cuisines = getAllCuisines();
    const stats = getCuisineStats();
    
    return c.json({ 
      cuisines,
      stats,
      total: CUISINE_RECIPES.length
    });
  } catch (error: any) {
    console.log(`Error fetching cuisines: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch cuisines" }, 500);
  }
});

// Get recipes by cuisine
app.get("/make-server-dbaf6019/cuisines/:cuisine", async (c) => {
  try {
    const cuisine = c.req.param('cuisine') as CuisineType;
    
    if (!getAllCuisines().includes(cuisine)) {
      return c.json({ error: "Invalid cuisine type" }, 400);
    }

    const recipes = getRecipesByCuisine(cuisine);
    
    return c.json({ 
      cuisine,
      recipes,
      count: recipes.length
    });
  } catch (error: any) {
    console.log(`Error fetching recipes by cuisine: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch recipes" }, 500);
  }
});

// Get recipes from KV store by cuisine
app.get("/make-server-dbaf6019/kv-cuisines/:cuisine", async (c) => {
  try {
    const cuisine = c.req.param('cuisine') as CuisineType;
    
    if (!getAllCuisines().includes(cuisine)) {
      return c.json({ error: "Invalid cuisine type" }, 400);
    }

    // Fetch all recipes for this cuisine from KV store
    const prefix = `cuisine:${cuisine}:`;
    const recipeData = await getByPrefixWithKeys(prefix);
    
    const recipes = recipeData.map(item => {
      // item.value is already the object from JSONB, no need to parse
      return typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
    });
    
    return c.json({ 
      cuisine,
      recipes,
      count: recipes.length,
      source: 'kv-store'
    });
  } catch (error: any) {
    console.log(`Error fetching recipes from KV store: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch recipes from KV store" }, 500);
  }
});

// Get recipes by spice level
app.get("/make-server-dbaf6019/spice-level/:level", async (c) => {
  try {
    const level = c.req.param('level') as 'mild' | 'medium' | 'hot';
    
    if (!['mild', 'medium', 'hot'].includes(level)) {
      return c.json({ error: "Invalid spice level. Use: mild, medium, or hot" }, 400);
    }

    const recipes = getRecipesBySpiceLevel(level);
    
    return c.json({ 
      spiceLevel: level,
      recipes,
      count: recipes.length
    });
  } catch (error: any) {
    console.log(`Error fetching recipes by spice level: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch recipes" }, 500);
  }
});

// Generate meal plan with cuisine preference
app.post("/make-server-dbaf6019/generate-meal-plan-cuisine", async (c) => {
  try {
    const { mealsPerDay, budget, goal, cuisinePreference, spiceLevel } = await c.req.json();
    
    if (!mealsPerDay || !budget || !goal) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    const weeklyBudget = budget;

    // Filter recipes by cuisine and/or spice level
    let filteredRecipes = CUISINE_RECIPES;
    
    if (cuisinePreference && getAllCuisines().includes(cuisinePreference)) {
      filteredRecipes = filteredRecipes.filter(r => r.cuisine === cuisinePreference);
    }
    
    if (spiceLevel && ['mild', 'medium', 'hot'].includes(spiceLevel)) {
      filteredRecipes = filteredRecipes.filter(r => r.spiceLevel === spiceLevel);
    }

    // Filter by goal (studying/working/fitness)
    const goalMap: { [key: string]: 'studying' | 'working' | 'fitness' } = {
      study: 'studying',
      work: 'working',
      fitness: 'fitness'
    };
    const suitableRecipes = filteredRecipes.filter(r => 
      r.suitableFor.includes(goalMap[goal] || 'studying')
    );

    if (suitableRecipes.length === 0) {
      return c.json({ 
        error: "No recipes found matching your preferences. Try different filters." 
      }, 400);
    }

    // Generate meal plan
    const mealPlan = generateCuisineMealPlan(
      suitableRecipes,
      mealsPerDay,
      weeklyBudget,
      goal
    );

    return c.json({ mealPlan });
  } catch (error: any) {
    console.log(`Error generating cuisine meal plan: ${error.message}`);
    return c.json({ error: error.message || "Failed to generate meal plan" }, 500);
  }
});

// Helper function to generate cuisine-based meal plan
function generateCuisineMealPlan(
  recipes: CuisineRecipe[],
  mealsPerDay: number,
  weeklyBudget: number,
  goal: string
) {
  const selectedRecipes: CuisineRecipe[] = [];
  const dailyBudget = weeklyBudget / 7;
  
  // Try to get variety across different categories and cuisines
  const onePotRecipes = recipes.filter(r => r.category === 'one-pot');
  const microwaveRecipes = recipes.filter(r => r.category === 'microwave');
  const mealPrepRecipes = recipes.filter(r => r.category === 'meal-prep');

  // Shuffle and select to get variety
  const shuffleArray = (arr: any[]) => arr.sort(() => Math.random() - 0.5);
  
  if (mealsPerDay >= 1 && onePotRecipes.length > 0) {
    selectedRecipes.push(shuffleArray([...onePotRecipes])[0]);
  }
  if (mealsPerDay >= 2 && microwaveRecipes.length > 0) {
    selectedRecipes.push(shuffleArray([...microwaveRecipes])[0]);
  }
  if (mealsPerDay >= 3 && mealPrepRecipes.length > 0) {
    selectedRecipes.push(shuffleArray([...mealPrepRecipes])[0]);
  }
  if (mealsPerDay >= 4 && onePotRecipes.length > 1) {
    const remaining = onePotRecipes.filter(r => !selectedRecipes.includes(r));
    if (remaining.length > 0) {
      selectedRecipes.push(shuffleArray([...remaining])[0]);
    }
  }

  // Convert recipes to meal plan format
  const meals = selectedRecipes.map((recipe) => {
    const totalCost = recipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);
    const costPerServing = totalCost / recipe.servings;

    const ingredients = recipe.ingredients.map(ing => ({
      name: ing.name,
      category: ing.category,
      price: ing.estimatedPrice,
      unit: ing.amount,
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      available: true,
      amount: ing.amount,
      estimatedPrice: ing.estimatedPrice,
    }));

    return {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      cuisine: recipe.cuisine,
      spiceLevel: recipe.spiceLevel,
      authentic: recipe.authentic,
      image: recipe.imageQuery,
      imageUrl: recipe.imageUrl || null,
      rationale: recipe.benefits.join('. '),
      benefits: recipe.benefits,
      mealType: recipe.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      category: recipe.category,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      tags: recipe.tags,
      ingredients,
      ingredientNames: recipe.ingredients.map(ing => ing.name),
      instructions: recipe.instructions,
      cost: parseFloat(costPerServing.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      nutrition: recipe.nutrition,
      youtubeUrl: recipe.youtubeUrl,
      sourceUrl: recipe.sourceUrl,
    };
  });

  const totalCost = meals.reduce((sum, meal) => sum + meal.totalCost, 0);

  return {
    meals,
    totalCost: parseFloat(totalCost.toFixed(2)),
    dailyBudget,
    weeklyBudget,
    withinBudget: totalCost <= weeklyBudget,
  };
}

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

// Get all recipe keys
app.get("/make-server-dbaf6019/admin/all-recipes", async (c) => {
  try {
    // Get cuisine-based recipes
    const cuisineData = await getByPrefixWithKeys('cuisine:');
    
    // Filter out stats, only get recipe data
    const cuisineRecipes = cuisineData
      .filter(item => item.key !== 'cuisine:stats')
      .map(item => {
        // item.value is already the object from JSONB, no need to parse if it's an object
        const recipe = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
        return {
          key: item.key,
          id: recipe.id,
          name: recipe.name,
          cuisine: recipe.cuisine,
          category: recipe.category,
          cookingTime: recipe.cookingTime,
          totalCost: recipe.ingredients?.reduce((sum: number, ing: any) => sum + ing.estimatedPrice, 0).toFixed(2) || 0,
        };
      });
    
    // Get base recipes (one-pot, microwave, meal-prep)
    const baseData = await getByPrefixWithKeys('base-recipe:');
    
    const baseRecipes = baseData.map(item => {
      const recipe = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
      return {
        key: item.key,
        id: recipe.id,
        name: recipe.name,
        cuisine: 'base', // Mark as base recipe
        category: recipe.category,
        cookingTime: recipe.cookingTime,
        totalCost: recipe.ingredients?.reduce((sum: number, ing: any) => sum + ing.estimatedPrice, 0).toFixed(2) || 0,
      };
    });
    
    // Combine both types of recipes
    const allRecipes = [...cuisineRecipes, ...baseRecipes];
    
    return c.json({ 
      count: allRecipes.length,
      recipes: allRecipes
    });
  } catch (error: any) {
    console.log(`Error fetching all recipes: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch recipes" }, 500);
  }
});

// Get a specific recipe by key
app.get("/make-server-dbaf6019/admin/recipe/:cuisine/:recipeId", async (c) => {
  try {
    const cuisine = c.req.param('cuisine');
    const recipeId = c.req.param('recipeId');
    
    // Handle base recipes differently
    let key: string;
    if (cuisine === 'base') {
      // Try to find the recipe in any base category
      const categories = ['one-pot', 'microwave', 'meal-prep'];
      for (const category of categories) {
        const testKey = `base-recipe:${category}:${recipeId}`;
        const testValue = await kv.get(testKey);
        if (testValue) {
          key = testKey;
          const recipe = JSON.parse(testValue);
          return c.json({ key, recipe });
        }
      }
      return c.json({ error: "Base recipe not found" }, 404);
    } else {
      key = `cuisine:${cuisine}:${recipeId}`;
    }
    
    const value = await kv.get(key);
    
    if (!value) {
      return c.json({ error: "Recipe not found" }, 404);
    }
    
    const recipe = JSON.parse(value);
    
    return c.json({ 
      key,
      recipe
    });
  } catch (error: any) {
    console.log(`Error fetching recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to fetch recipe" }, 500);
  }
});

// Add or update a recipe
app.post("/make-server-dbaf6019/admin/recipe", async (c) => {
  try {
    const recipe = await c.req.json();
    
    if (!recipe.id || !recipe.cuisine) {
      return c.json({ error: "Recipe must have 'id' and 'cuisine' fields" }, 400);
    }
    
    // If recipe has an imageQuery, download and store the image
    let storedImageUrl = recipe.imageUrl; // Keep existing image URL if present
    
    if (recipe.imageQuery && (!recipe.imageUrl || recipe.imageUrl.includes('pollinations.ai'))) {
      console.log(`Generating and storing permanent image for recipe: ${recipe.name}`);
      const imageUrl = await storeRecipeImage(recipe.imageQuery, recipe.id, recipe.cuisine);
      if (imageUrl) {
        storedImageUrl = imageUrl;
        console.log(`Image stored successfully: ${imageUrl}`);
      } else {
        console.log(`Failed to store image, will use dynamic URL`);
      }
    }
    
    // Save recipe with stored image URL
    const recipeToSave = {
      ...recipe,
      imageUrl: storedImageUrl // Add the permanent image URL
    };
    
    const key = `cuisine:${recipe.cuisine}:${recipe.id}`;
    await kv.set(key, JSON.stringify(recipeToSave));
    
    return c.json({ 
      message: "Recipe saved successfully",
      key,
      recipe: recipeToSave
    });
  } catch (error: any) {
    console.log(`Error saving recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to save recipe" }, 500);
  }
});

// Update a specific recipe field
app.patch("/make-server-dbaf6019/admin/recipe/:cuisine/:recipeId", async (c) => {
  try {
    const cuisine = c.req.param('cuisine');
    const recipeId = c.req.param('recipeId');
    const key = `cuisine:${cuisine}:${recipeId}`;
    const updates = await c.req.json();
    
    const value = await kv.get(key);
    
    if (!value) {
      return c.json({ error: "Recipe not found" }, 404);
    }
    
    const recipe = JSON.parse(value);
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
app.delete("/make-server-dbaf6019/admin/recipe/:cuisine/:recipeId", async (c) => {
  try {
    const cuisine = c.req.param('cuisine');
    const recipeId = c.req.param('recipeId');
    const key = `cuisine:${cuisine}:${recipeId}`;
    
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

// Clear all cuisine data (use with caution!)
app.delete("/make-server-dbaf6019/admin/clear-all-cuisines", async (c) => {
  try {
    const data = await getByPrefixWithKeys('cuisine:');
    const keys = data.map(item => item.key);
    
    if (keys.length > 0) {
      await kv.mdel(keys);
    }
    
    return c.json({ 
      message: "All cuisine data cleared",
      deletedCount: keys.length
    });
  } catch (error: any) {
    console.log(`Error clearing cuisine data: ${error.message}`);
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
    
    const data = await getByPrefixWithKeys('cuisine:');
    const recipes = data
      .filter(item => item.key !== 'cuisine:stats')
      .map(item => {
        // item.value is already the object from JSONB, no need to parse if it's an object
        return typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
      })
      .filter(recipe => {
        const searchStr = query.toLowerCase();
        const nameMatch = recipe.name?.toLowerCase().includes(searchStr);
        const ingredientMatch = recipe.ingredients?.some((ing: any) => 
          ing.name?.toLowerCase().includes(searchStr)
        );
        return nameMatch || ingredientMatch;
      });
    
    return c.json({ 
      query,
      count: recipes.length,
      recipes
    });
  } catch (error: any) {
    console.log(`Error searching recipes: ${error.message}`);
    return c.json({ error: error.message || "Failed to search recipes" }, 500);
  }
});

// ========== SHUFFLE/REPLACE RECIPE ENDPOINT ==========

// Smart recipe replacement - find similar recipe by price, nutrition, and category
app.post("/make-server-dbaf6019/shuffle-recipe", async (c) => {
  try {
    const { currentRecipeId, goal, currentMealIds, preferCuisine, maxCookingTime } = await c.req.json();
    
    if (!currentRecipeId || !goal) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    // Get all recipes from both databases
    const standardRecipes = getRecipesByNeed(goal === 'study' ? 'studying' : goal === 'work' ? 'working' : 'fitness');
    
    // Also check cuisine database
    const goalMap: { [key: string]: 'studying' | 'working' | 'fitness' } = {
      study: 'studying',
      work: 'working',
      fitness: 'fitness'
    };
    const cuisineRecipes = CUISINE_RECIPES.filter(r => 
      r.suitableFor.includes(goalMap[goal] || 'studying')
    );

    // Combine both recipe sources
    let allRecipes = [...standardRecipes, ...cuisineRecipes];

    // Filter by max cooking time if specified
    if (maxCookingTime && maxCookingTime > 0) {
      allRecipes = allRecipes.filter(r => r.cookingTime <= maxCookingTime);
      console.log(`Filtered recipes by max cooking time ${maxCookingTime} min for shuffle`);
    }

    // Find the current recipe to get its properties
    const currentRecipe = allRecipes.find(r => r.id === currentRecipeId);
    
    if (!currentRecipe) {
      return c.json({ error: "Current recipe not found" }, 404);
    }

    // Calculate current recipe's total cost
    const currentCost = currentRecipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);

    // Filter out recipes that are already selected (including current one)
    const excludedIds = currentMealIds || [currentRecipeId];
    
    // First try: Same category, not already selected
    let candidateRecipes = allRecipes.filter(recipe => 
      !excludedIds.includes(recipe.id) &&
      recipe.category === currentRecipe.category // Same category (one-pot, microwave, meal-prep)
    );

    // If no candidates found with same category, relax constraint and allow any category
    if (candidateRecipes.length === 0) {
      console.log(`No recipes found in same category. Expanding search to all categories...`);
      candidateRecipes = allRecipes.filter(recipe => 
        !excludedIds.includes(recipe.id)
      );
    }

    // If still no candidates (very rare), allow re-using recipes from different meal slots
    if (candidateRecipes.length === 0) {
      console.log(`No unique recipes available. Allowing recipe reuse...`);
      candidateRecipes = allRecipes.filter(recipe => 
        recipe.id !== currentRecipeId // Just exclude the exact same recipe
      );
    }

    // If absolutely no alternatives exist, return friendly error
    if (candidateRecipes.length === 0) {
      return c.json({ 
        error: "No alternative recipes available. The recipe database may need more recipes for your preferences." 
      }, 400);
    }

    // Smart scoring algorithm to find best replacement
    const scoredRecipes = candidateRecipes.map(recipe => {
      const recipeCost = recipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);
      
      // Calculate similarity scores (0-1, higher is better)
      const priceDiff = Math.abs(recipeCost - currentCost);
      const priceScore = Math.max(0, 1 - (priceDiff / currentCost)); // Closer price = higher score
      
      const calorieDiff = Math.abs(recipe.nutrition.calories - currentRecipe.nutrition.calories);
      const calorieScore = Math.max(0, 1 - (calorieDiff / 500)); // Within 500 cal = good
      
      const proteinDiff = Math.abs(recipe.nutrition.protein - currentRecipe.nutrition.protein);
      const proteinScore = Math.max(0, 1 - (proteinDiff / 30)); // Within 30g = good

      // Cuisine preference bonus
      let cuisineBonus = 0;
      if (preferCuisine && 'cuisine' in recipe && recipe.cuisine === preferCuisine) {
        cuisineBonus = 0.3;
      }

      // Weighted total score
      const totalScore = 
        (priceScore * 0.35) +      // 35% weight on price similarity
        (calorieScore * 0.25) +    // 25% weight on calorie similarity
        (proteinScore * 0.25) +    // 25% weight on protein similarity
        cuisineBonus +             // Bonus for preferred cuisine
        (Math.random() * 0.15);    // 15% randomness for variety

      return {
        recipe,
        score: totalScore,
        recipeCost,
        priceDiff,
        calorieDiff,
        proteinDiff
      };
    });

    // Sort by score and pick the best match
    scoredRecipes.sort((a, b) => b.score - a.score);
    const bestMatch = scoredRecipes[0];

    // Convert to meal plan format
    const totalCost = bestMatch.recipeCost;
    const costPerServing = totalCost / bestMatch.recipe.servings;

    const ingredients = bestMatch.recipe.ingredients.map(ing => ({
      name: ing.name,
      category: ing.category,
      price: ing.estimatedPrice,
      unit: ing.amount,
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      available: true,
      amount: ing.amount,
      estimatedPrice: ing.estimatedPrice,
    }));

    const replacementMeal = {
      id: bestMatch.recipe.id,
      name: bestMatch.recipe.name,
      description: bestMatch.recipe.description,
      cuisine: 'cuisine' in bestMatch.recipe ? bestMatch.recipe.cuisine : 'standard',
      spiceLevel: 'spiceLevel' in bestMatch.recipe ? bestMatch.recipe.spiceLevel : 'mild',
      authentic: 'authentic' in bestMatch.recipe ? bestMatch.recipe.authentic : false,
      image: bestMatch.recipe.imageQuery,
      rationale: bestMatch.recipe.benefits.join('. '),
      benefits: bestMatch.recipe.benefits,
      mealType: bestMatch.recipe.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      category: bestMatch.recipe.category,
      cookingTime: bestMatch.recipe.cookingTime,
      servings: bestMatch.recipe.servings,
      difficulty: bestMatch.recipe.difficulty,
      tags: bestMatch.recipe.tags,
      ingredients,
      ingredientNames: bestMatch.recipe.ingredients.map(ing => ing.name),
      instructions: bestMatch.recipe.instructions,
      cost: parseFloat(costPerServing.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      nutrition: bestMatch.recipe.nutrition,
      youtubeUrl: bestMatch.recipe.youtubeUrl,
      sourceUrl: bestMatch.recipe.sourceUrl,
    };

    return c.json({
      replacementMeal,
      similarity: {
        priceMatch: `${(bestMatch.priceDiff).toFixed(2)} difference`,
        calorieMatch: `${Math.abs(bestMatch.calorieDiff).toFixed(0)} cal difference`,
        proteinMatch: `${Math.abs(bestMatch.proteinDiff).toFixed(0)}g difference`,
        overallScore: (bestMatch.score * 100).toFixed(1) + '%'
      },
      message: `Found great alternative! Similar price and nutrition.`
    });
  } catch (error: any) {
    console.log(`Error shuffling recipe: ${error.message}`);
    return c.json({ error: error.message || "Failed to find replacement recipe" }, 500);
  }
});

// NEW: Get multiple meal swap options for user to choose from
app.post("/make-server-dbaf6019/get-swap-options", async (c) => {
  try {
    const { currentRecipeId, goal, currentMealIds, maxCookingTime, limit = 6 } = await c.req.json();
    
    if (!currentRecipeId || !goal) {
      return c.json({ error: "Missing required parameters" }, 400);
    }

    // Get all recipes from both databases
    const standardRecipes = getRecipesByNeed(goal === 'study' ? 'studying' : goal === 'work' ? 'working' : 'fitness');
    
    // Also check cuisine database
    const goalMap: { [key: string]: 'studying' | 'working' | 'fitness' } = {
      study: 'studying',
      work: 'working',
      fitness: 'fitness'
    };
    const cuisineRecipes = CUISINE_RECIPES.filter(r => 
      r.suitableFor.includes(goalMap[goal] || 'studying')
    );

    // Combine both recipe sources
    let allRecipes = [...standardRecipes, ...cuisineRecipes];

    // Filter by max cooking time if specified
    if (maxCookingTime && maxCookingTime > 0) {
      allRecipes = allRecipes.filter(r => r.cookingTime <= maxCookingTime);
      console.log(`Filtered recipes by max cooking time ${maxCookingTime} min for swap options`);
    }

    // Find the current recipe to get its properties
    const currentRecipe = allRecipes.find(r => r.id === currentRecipeId);
    
    if (!currentRecipe) {
      return c.json({ error: "Current recipe not found" }, 404);
    }

    // Calculate current recipe's total cost
    const currentCost = currentRecipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);

    // Filter out recipes that are already selected (including current one)
    const excludedIds = currentMealIds || [currentRecipeId];
    
    // Get candidate recipes (prefer same category, but allow any category if needed)
    let candidateRecipes = allRecipes.filter(recipe => 
      !excludedIds.includes(recipe.id) &&
      recipe.category === currentRecipe.category
    );

    // If not enough candidates with same category, include other categories
    if (candidateRecipes.length < limit) {
      const otherCategoryRecipes = allRecipes.filter(recipe => 
        !excludedIds.includes(recipe.id) &&
        recipe.category !== currentRecipe.category
      );
      candidateRecipes = [...candidateRecipes, ...otherCategoryRecipes];
    }

    // If still not enough, allow recipe reuse
    if (candidateRecipes.length < limit) {
      const reusableRecipes = allRecipes.filter(recipe => 
        recipe.id !== currentRecipeId
      );
      candidateRecipes = [...new Set([...candidateRecipes, ...reusableRecipes])];
    }

    if (candidateRecipes.length === 0) {
      return c.json({ 
        error: "No alternative recipes available." 
      }, 400);
    }

    // Smart scoring algorithm to find best replacements
    const scoredRecipes = candidateRecipes.map(recipe => {
      const recipeCost = recipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);
      
      // Calculate similarity scores (0-1, higher is better)
      const priceDiff = Math.abs(recipeCost - currentCost);
      const priceScore = Math.max(0, 1 - (priceDiff / currentCost));
      
      const calorieDiff = Math.abs(recipe.nutrition.calories - currentRecipe.nutrition.calories);
      const calorieScore = Math.max(0, 1 - (calorieDiff / 500));
      
      const proteinDiff = Math.abs(recipe.nutrition.protein - currentRecipe.nutrition.protein);
      const proteinScore = Math.max(0, 1 - (proteinDiff / 30));

      // Category match bonus
      const categoryBonus = recipe.category === currentRecipe.category ? 0.2 : 0;

      // Weighted total score
      const totalScore = 
        (priceScore * 0.35) +
        (calorieScore * 0.25) +
        (proteinScore * 0.25) +
        categoryBonus +
        (Math.random() * 0.15);

      return {
        recipe,
        score: totalScore,
        recipeCost,
        priceDiff: Math.abs(priceDiff),
        calorieDiff: Math.abs(calorieDiff),
        proteinDiff: Math.abs(proteinDiff)
      };
    });

    // Sort by score and get top options
    scoredRecipes.sort((a, b) => b.score - a.score);
    const topOptions = scoredRecipes.slice(0, limit);

    // Convert to meal plan format
    const swapOptions = topOptions.map(option => {
      const totalCost = option.recipeCost;
      const costPerServing = totalCost / option.recipe.servings;

      const ingredients = option.recipe.ingredients.map(ing => ({
        name: ing.name,
        category: ing.category,
        price: ing.estimatedPrice,
        unit: ing.amount,
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        available: true,
        amount: ing.amount,
        estimatedPrice: ing.estimatedPrice,
      }));

      return {
        id: option.recipe.id,
        name: option.recipe.name,
        description: option.recipe.description,
        cuisine: 'cuisine' in option.recipe ? option.recipe.cuisine : 'standard',
        spiceLevel: 'spiceLevel' in option.recipe ? option.recipe.spiceLevel : 'mild',
        authentic: 'authentic' in option.recipe ? option.recipe.authentic : false,
        image: option.recipe.imageQuery,
        rationale: option.recipe.benefits.join('. '),
        benefits: option.recipe.benefits,
        mealType: option.recipe.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        category: option.recipe.category,
        cookingTime: option.recipe.cookingTime,
        servings: option.recipe.servings,
        difficulty: option.recipe.difficulty,
        tags: option.recipe.tags,
        ingredients,
        ingredientNames: option.recipe.ingredients.map(ing => ing.name),
        instructions: option.recipe.instructions,
        cost: parseFloat(costPerServing.toFixed(2)),
        totalCost: parseFloat(totalCost.toFixed(2)),
        nutrition: option.recipe.nutrition,
        youtubeUrl: option.recipe.youtubeUrl,
        sourceUrl: option.recipe.sourceUrl,
        similarity: {
          priceMatch: option.priceDiff.toFixed(2),
          calorieMatch: option.calorieDiff.toFixed(0),
          proteinMatch: option.proteinDiff.toFixed(0),
          matchScore: (option.score * 100).toFixed(0)
        }
      };
    });

    return c.json({ 
      swapOptions,
      currentRecipe: {
        cost: currentCost,
        calories: currentRecipe.nutrition.calories,
        protein: currentRecipe.nutrition.protein
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

// Batch generate and store images for all recipes
app.post("/make-server-dbaf6019/generate-all-recipe-images", async (c) => {
  try {
    console.log('=== Batch Image Generation Started ===');
    
    // Get all recipes from all databases
    const allRecipes = [
      ...RECIPE_DATABASE.map(r => ({ ...r, cuisine: 'base' })),
      ...CUISINE_RECIPES,
      ...BRAIN_RECIPES.map(r => ({ ...r, cuisine: 'brain' })),
      ...WORK_EFFICIENCY_RECIPES,
      ...FITNESS_RECOVERY_RECIPES
    ];
    
    console.log(`Total recipes to process: ${allRecipes.length}`);
    
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    
    // Process in small batches to avoid timeouts
    const BATCH_SIZE = 3;
    
    for (let i = 0; i < allRecipes.length; i += BATCH_SIZE) {
      const batch = allRecipes.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(allRecipes.length / BATCH_SIZE)}`);
      
      for (const recipe of batch) {
        try {
          // Check if image already exists
          const existingImageKey = `recipe-image:${recipe.id}`;
          const existingImage = await kv.get(existingImageKey);
          
          if (existingImage) {
            console.log(`✓ Skipped (already exists): ${recipe.name}`);
            skippedCount++;
            continue;
          }
          
          // Generate and store image
          const imageUrl = await storeRecipeImage(
            recipe.imageQuery, 
            recipe.id, 
            recipe.cuisine || 'base'
          );
          
          if (imageUrl) {
            // Cache the URL
            await kv.set(existingImageKey, imageUrl);
            successCount++;
            console.log(`✓ Generated image for: ${recipe.name}`);
          } else {
            errorCount++;
            console.log(`✗ Failed to generate image for: ${recipe.name}`);
          }
        } catch (error: any) {
          errorCount++;
          console.log(`✗ Error processing ${recipe.name}: ${error.message}`);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('=== Batch Image Generation Complete ===');
    console.log(`Success: ${successCount}, Errors: ${errorCount}, Skipped: ${skippedCount}`);
    
    return c.json({
      success: true,
      totalRecipes: allRecipes.length,
      successCount,
      errorCount,
      skippedCount
    });
  } catch (error: any) {
    console.log(`Error in batch image generation: ${error.message}`);
    return c.json({ error: error.message || "Failed to generate images" }, 500);
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

    // Try the new list-based format first (load most recent plan)
    const listKey = `meal_plan_list_${userId}`;
    const list = await kv.get(listKey);

    if (list?.plans?.length > 0) {
      const latestPlanId = list.plans[0].planId;
      const planKey = `meal_plan_${userId}_${latestPlanId}`;
      const data = await kv.get(planKey);

      if (data) {
        console.log(`✅ Loaded latest meal plan for user ${userId} (id: ${latestPlanId})`);
        return c.json({
          hasSavedPlan: true,
          mealPlan: data.mealPlan,
          preferences: data.preferences,
          savedAt: data.savedAt
        });
      }
    }

    // Fall back to legacy single-plan key
    const legacyKey = `meal_plan_${userId}`;
    const legacyData = await kv.get(legacyKey);

    if (!legacyData) {
      return c.json({ hasSavedPlan: false });
    }

    console.log(`✅ Loaded meal plan for user ${userId} (legacy key)`);

    return c.json({
      hasSavedPlan: true,
      mealPlan: legacyData.mealPlan,
      preferences: legacyData.preferences,
      savedAt: legacyData.savedAt
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
    const cuisineRecipes = await getByPrefixWithKeys("cuisine:");
    const baseRecipes = await getByPrefixWithKeys("base-recipe:");
    const allRecipes = [...cuisineRecipes, ...baseRecipes];

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

Deno.serve(app.fetch);