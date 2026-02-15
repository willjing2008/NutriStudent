// Cuisine-Specific Recipe Database for Student Nutrition Meal Planner
// Organized by cuisine type with British supermarket availability in mind

import { Recipe, RecipeIngredient } from './recipe-database.ts';

export type CuisineType = 
  | 'british' 
  | 'italian' 
  | 'chinese' 
  | 'indian' 
  | 'mexican' 
  | 'mediterranean' 
  | 'japanese'
  | 'american';

export interface CuisineRecipe extends Recipe {
  cuisine: CuisineType;
  spiceLevel: 'mild' | 'medium' | 'hot';
  authentic: boolean; // True if authentic, false if student-friendly adaptation
}

export const CUISINE_RECIPES: CuisineRecipe[] = [
  // ========== BRITISH CUISINE ==========
  {
    id: 'british-shepherds-pie',
    name: "Shepherd's Pie",
    description: 'Classic British comfort food with minced lamb and creamy mashed potato topping',
    cuisine: 'british',
    category: 'one-pot',
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    spiceLevel: 'mild',
    authentic: true,
    ingredients: [
      { name: 'Lamb Mince', amount: '500g', category: 'meat', estimatedPrice: 4.50 },
      { name: 'Potatoes', amount: '800g', category: 'produce', estimatedPrice: 1.20 },
      { name: 'Carrots', amount: '2 large', category: 'produce', estimatedPrice: 0.60 },
      { name: 'Onion', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Frozen Peas', amount: '150g', category: 'frozen', estimatedPrice: 0.80 },
      { name: 'Beef Stock Cube', amount: '1 cube', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Butter', amount: '50g', category: 'dairy', estimatedPrice: 0.40 },
      { name: 'Milk', amount: '100ml', category: 'dairy', estimatedPrice: 0.15 },
      { name: 'Worcestershire Sauce', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.30 },
    ],
    instructions: [
      'Peel and boil potatoes until tender (20 min)',
      'Meanwhile, fry lamb mince until browned (8 min)',
      'Add diced onion and carrots, cook until soft (5 min)',
      'Add stock, Worcestershire sauce, peas, simmer (10 min)',
      'Drain potatoes, mash with butter and milk until smooth',
      'Transfer meat to oven dish, top with mashed potato',
      'Bake at 200°C for 20 min until golden',
      'Let stand 5 min before serving'
    ],
    nutrition: {
      calories: 493,
      protein: 31,
      carbs: 35,
      fats: 23,
      fiber: 4,
    },
    tags: ['Traditional British', 'Comfort Food', 'High Protein'],
    benefits: [
      'Complete balanced meal in one dish',
      'High protein from lamb supports muscle recovery',
      'Traditional British comfort food perfect for cold days'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'shepherds pie british',
    sourceUrl: 'https://www.recipetineats.com/shepherds-pie/',
  },
  {
    id: 'british-fish-chips',
    name: 'Oven-Baked Fish & Chips',
    description: 'Healthier student-friendly version of the British classic',
    cuisine: 'british',
    category: 'one-pot',
    cookingTime: 35,
    servings: 2,
    difficulty: 'easy',
    spiceLevel: 'mild',
    authentic: false,
    ingredients: [
      { name: 'Cod Fillets', amount: '2 large', category: 'meat', estimatedPrice: 4.00 },
      { name: 'Potatoes', amount: '4 medium', category: 'produce', estimatedPrice: 0.80 },
      { name: 'Breadcrumbs', amount: '100g', category: 'pantry', estimatedPrice: 0.60 },
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.25 },
      { name: 'Frozen Peas', amount: '150g', category: 'frozen', estimatedPrice: 0.80 },
      { name: 'Olive Oil', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Lemon', amount: '1 lemon', category: 'produce', estimatedPrice: 0.30 },
    ],
    instructions: [
      'Preheat oven to 220°C',
      'Cut potatoes into chips, toss with olive oil',
      'Spread on baking tray, bake for 25 min',
      'Beat egg in shallow bowl, breadcrumbs in another',
      'Dip fish in egg, then breadcrumbs to coat',
      'Add fish to tray with chips, bake for 10 min until golden',
      'Meanwhile, microwave peas for 2 min',
      'Serve with lemon wedges'
    ],
    nutrition: {
      calories: 520,
      protein: 34,
      carbs: 58,
      fats: 16,
      fiber: 6,
    },
    tags: ['British Classic', 'High Protein', 'Student Friendly'],
    benefits: [
      'Omega-3 from fish supports brain function',
      'Healthier baked version of traditional fried fish',
      'Complete British meal without deep frying'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'fish chips british',
    sourceUrl: 'https://www.jamieoliver.com/recipes/fish/fish-chips-and-mushy-peas/',
  },

  // ========== ITALIAN CUISINE ==========
  {
    id: 'italian-carbonara',
    name: 'Spaghetti Carbonara',
    description: 'Creamy Roman pasta with bacon and eggs - authentic student-friendly recipe',
    cuisine: 'italian',
    category: 'one-pot',
    cookingTime: 20,
    servings: 3,
    difficulty: 'medium',
    spiceLevel: 'mild',
    authentic: true,
    ingredients: [
      { name: 'Spaghetti', amount: '300g', category: 'pantry', estimatedPrice: 0.70 },
      { name: 'Bacon', amount: '150g', category: 'meat', estimatedPrice: 2.00 },
      { name: 'Eggs', amount: '3 large', category: 'dairy', estimatedPrice: 0.75 },
      { name: 'Parmesan Cheese', amount: '80g', category: 'dairy', estimatedPrice: 1.80 },
      { name: 'Garlic Cloves', amount: '2 cloves', category: 'produce', estimatedPrice: 0.15 },
      { name: 'Black Pepper', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
    ],
    instructions: [
      'Cook spaghetti in salted boiling water (10 min)',
      'Meanwhile, fry bacon until crispy (6 min)',
      'Add crushed garlic to bacon (1 min), remove from heat',
      'Whisk eggs with grated parmesan and black pepper',
      'Drain pasta, reserving 1 cup pasta water',
      'Add hot pasta to bacon pan, toss quickly',
      'Remove from heat, add egg mixture, toss vigorously',
      'Add pasta water bit by bit until creamy (not scrambled!)',
      'Serve immediately with extra parmesan'
    ],
    nutrition: {
      calories: 650,
      protein: 30,
      carbs: 60,
      fats: 28,
      fiber: 3,
    },
    tags: ['Authentic Italian', 'Quick', 'High Protein'],
    benefits: [
      'Quick 20-minute authentic Italian meal',
      'High protein from eggs and bacon',
      'Creamy without cream - traditional Roman technique'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'spaghetti carbonara italian',
    sourceUrl: 'https://www.recipetineats.com/carbonara/',
  },
  {
    id: 'italian-margherita-pasta',
    name: 'Pasta alla Margherita',
    description: 'Simple tomato and basil pasta - Italian comfort in 15 minutes',
    cuisine: 'italian',
    category: 'one-pot',
    cookingTime: 15,
    servings: 3,
    difficulty: 'easy',
    spiceLevel: 'mild',
    authentic: true,
    ingredients: [
      { name: 'Penne Pasta', amount: '300g', category: 'pantry', estimatedPrice: 0.60 },
      { name: 'Tinned Tomatoes', amount: '400g tin', category: 'pantry', estimatedPrice: 0.45 },
      { name: 'Mozzarella Cheese', amount: '125g', category: 'dairy', estimatedPrice: 1.50 },
      { name: 'Fresh Basil', amount: '1 bunch', category: 'produce', estimatedPrice: 0.80 },
      { name: 'Garlic Cloves', amount: '3 cloves', category: 'produce', estimatedPrice: 0.20 },
      { name: 'Olive Oil', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.30 },
    ],
    instructions: [
      'Cook pasta in boiling salted water (10 min)',
      'Heat olive oil, fry sliced garlic until golden (2 min)',
      'Add tinned tomatoes, simmer and break up (5 min)',
      'Drain pasta, add to tomato sauce',
      'Tear in fresh basil leaves',
      'Top with torn mozzarella',
      'Cover for 1 min to melt cheese slightly',
      'Serve with extra basil and olive oil drizzle'
    ],
    nutrition: {
      calories: 480,
      protein: 20,
      carbs: 64,
      fats: 16,
      fiber: 4,
    },
    tags: ['Authentic Italian', 'Vegetarian', 'Quick'],
    benefits: [
      'Simple Italian flavors in 15 minutes',
      'Lycopene from tomatoes supports heart health',
      'Calcium from mozzarella for bone health'
    ],
    suitableFor: ['studying', 'working'],
    imageQuery: 'pasta margherita italian',
    sourceUrl: 'https://www.mob.co.uk/recipes/mobs-ultimate-carbonara',
  },

  // ========== CHINESE CUISINE ==========
  {
    id: 'chinese-fried-rice',
    name: 'Egg Fried Rice',
    description: 'Classic Chinese takeaway favorite - easy to make at home',
    cuisine: 'chinese',
    category: 'one-pot',
    cookingTime: 15,
    servings: 3,
    difficulty: 'easy',
    spiceLevel: 'mild',
    authentic: false,
    ingredients: [
      { name: 'Long Grain Rice', amount: '300g cooked', category: 'pantry', estimatedPrice: 0.80 },
      { name: 'Eggs', amount: '3 large', category: 'dairy', estimatedPrice: 0.75 },
      { name: 'Frozen Peas', amount: '100g', category: 'frozen', estimatedPrice: 0.50 },
      { name: 'Sweetcorn', amount: '100g frozen', category: 'frozen', estimatedPrice: 0.40 },
      { name: 'Spring Onions', amount: '3 stalks', category: 'produce', estimatedPrice: 0.50 },
      { name: 'Soy Sauce', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.20 },
      { name: 'Sesame Oil', amount: '1 tbsp', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Garlic Cloves', amount: '2 cloves', category: 'produce', estimatedPrice: 0.15 },
    ],
    instructions: [
      'Cook rice and let cool (use day-old rice if possible)',
      'Beat eggs, scramble in hot wok, remove and set aside',
      'Heat sesame oil in wok, fry minced garlic (30 sec)',
      'Add peas and sweetcorn, stir-fry (2 min)',
      'Add cold rice, break up lumps, fry on high heat (3 min)',
      'Add soy sauce, toss to coat evenly',
      'Add scrambled eggs back in, mix through',
      'Top with sliced spring onions and serve'
    ],
    nutrition: {
      calories: 395,
      protein: 16,
      carbs: 56,
      fats: 11,
      fiber: 3,
    },
    tags: ['Chinese Takeaway', 'Quick', 'Budget Friendly'],
    benefits: [
      'Cheaper than takeaway - under £1 per serving',
      'Quick 15-minute meal using leftover rice',
      'Customizable with any vegetables in your fridge'
    ],
    suitableFor: ['studying', 'working'],
    imageQuery: 'egg fried rice chinese',
    sourceUrl: 'https://www.recipetineats.com/egg-fried-rice/',
  },
  {
    id: 'chinese-sweet-sour-chicken',
    name: 'Sweet & Sour Chicken',
    description: 'Student-friendly takeaway classic made at home',
    cuisine: 'chinese',
    category: 'one-pot',
    cookingTime: 25,
    servings: 3,
    difficulty: 'medium',
    spiceLevel: 'mild',
    authentic: false,
    ingredients: [
      { name: 'Chicken Breast', amount: '400g', category: 'meat', estimatedPrice: 3.50 },
      { name: 'Bell Peppers', amount: '2 mixed', category: 'produce', estimatedPrice: 1.40 },
      { name: 'Pineapple Chunks', amount: '200g tin', category: 'pantry', estimatedPrice: 0.80 },
      { name: 'Tomato Ketchup', amount: '4 tbsp', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'White Vinegar', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Brown Sugar', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Cornflour', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Soy Sauce', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.15 },
    ],
    instructions: [
      'Cut chicken into bite-sized pieces, coat in cornflour',
      'Fry chicken in hot oil until golden (8 min)',
      'Meanwhile, mix ketchup, vinegar, sugar, soy sauce, pineapple juice',
      'Remove chicken, stir-fry peppers (3 min)',
      'Add sauce mixture, bring to simmer (2 min)',
      'Add chicken and pineapple chunks back in',
      'Simmer until sauce thickens (3 min)',
      'Serve over rice'
    ],
    nutrition: {
      calories: 480,
      protein: 35,
      carbs: 48,
      fats: 12,
      fiber: 2,
    },
    tags: ['Chinese Takeaway', 'High Protein', 'Student Friendly'],
    benefits: [
      'Takeaway taste for fraction of the cost',
      'High protein from lean chicken',
      'Vitamin C from peppers and pineapple'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'sweet sour chicken chinese',
    sourceUrl: 'https://www.recipetineats.com/oven-baked-sweet-sour-chicken/',
  },

  // ========== INDIAN CUISINE ==========
  {
    id: 'indian-butter-chicken',
    name: 'Butter Chicken (Murgh Makhani)',
    description: 'Creamy tomato-based curry - student-friendly version of the classic',
    cuisine: 'indian',
    category: 'one-pot',
    cookingTime: 35,
    servings: 4,
    difficulty: 'medium',
    spiceLevel: 'medium',
    authentic: false,
    ingredients: [
      { name: 'Chicken Breast', amount: '500g', category: 'meat', estimatedPrice: 4.00 },
      { name: 'Tinned Tomatoes', amount: '400g tin', category: 'pantry', estimatedPrice: 0.45 },
      { name: 'Double Cream', amount: '150ml', category: 'dairy', estimatedPrice: 1.20 },
      { name: 'Greek Yogurt', amount: '100g', category: 'dairy', estimatedPrice: 0.50 },
      { name: 'Onion', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Garlic Cloves', amount: '4 cloves', category: 'produce', estimatedPrice: 0.25 },
      { name: 'Fresh Ginger', amount: '3cm piece', category: 'produce', estimatedPrice: 0.30 },
      { name: 'Garam Masala', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.40 },
      { name: 'Butter', amount: '50g', category: 'dairy', estimatedPrice: 0.40 },
    ],
    instructions: [
      'Marinate chicken pieces in yogurt and 1 tbsp garam masala (10 min)',
      'Melt butter in large pot, fry chicken until golden (8 min)',
      'Remove chicken, fry onion until soft (5 min)',
      'Add minced garlic, ginger, remaining garam masala (2 min)',
      'Add tinned tomatoes, simmer (10 min)',
      'Blend sauce until smooth (optional)',
      'Add chicken back, add cream, simmer (8 min)',
      'Serve with rice or naan bread'
    ],
    nutrition: {
      calories: 520,
      protein: 32,
      carbs: 14,
      fats: 34,
      fiber: 2,
    },
    tags: ['Indian Classic', 'High Protein', 'Creamy'],
    benefits: [
      'Restaurant-quality curry at home',
      'Anti-inflammatory spices support immune system',
      'High protein for muscle recovery and satiety'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'butter chicken indian curry',
    sourceUrl: 'https://www.recipetineats.com/butter-chicken/',
  },
  {
    id: 'indian-chana-masala',
    name: 'Chana Masala (Chickpea Curry)',
    description: 'Vegan protein-packed Indian curry ready in 25 minutes',
    cuisine: 'indian',
    category: 'one-pot',
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    spiceLevel: 'medium',
    authentic: true,
    ingredients: [
      { name: 'Chickpeas', amount: '2 x 400g tins', category: 'pantry', estimatedPrice: 1.60 },
      { name: 'Tinned Tomatoes', amount: '400g tin', category: 'pantry', estimatedPrice: 0.45 },
      { name: 'Onion', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Garlic Cloves', amount: '3 cloves', category: 'produce', estimatedPrice: 0.20 },
      { name: 'Fresh Ginger', amount: '2cm piece', category: 'produce', estimatedPrice: 0.25 },
      { name: 'Curry Powder', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.25 },
      { name: 'Cumin Seeds', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Spinach', amount: '100g', category: 'produce', estimatedPrice: 0.80 },
    ],
    instructions: [
      'Heat oil, fry cumin seeds until fragrant (30 sec)',
      'Add diced onion, cook until golden (6 min)',
      'Add minced garlic, ginger, curry powder (2 min)',
      'Add tinned tomatoes and drained chickpeas',
      'Add 200ml water, simmer covered (15 min)',
      'Stir in spinach until wilted (2 min)',
      'Season with salt and serve with rice'
    ],
    nutrition: {
      calories: 310,
      protein: 15,
      carbs: 44,
      fats: 8,
      fiber: 12,
    },
    tags: ['Vegan', 'High Fiber', 'Budget Friendly'],
    benefits: [
      'Plant-based protein and fiber keep you full for hours',
      'Under £1 per serving - extremely budget friendly',
      'Anti-inflammatory spices support overall health'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'chana masala chickpea curry',
    sourceUrl: 'https://www.recipetineats.com/easy-chickpea-potato-curry-chana-aloo-curry/',
  },

  // ========== MEXICAN CUISINE ==========
  {
    id: 'mexican-chicken-fajitas',
    name: 'Chicken Fajitas',
    description: 'Sizzling Mexican favorite with peppers and spices',
    cuisine: 'mexican',
    category: 'one-pot',
    cookingTime: 20,
    servings: 3,
    difficulty: 'easy',
    spiceLevel: 'medium',
    authentic: false,
    ingredients: [
      { name: 'Chicken Breast', amount: '400g', category: 'meat', estimatedPrice: 3.50 },
      { name: 'Bell Peppers', amount: '3 mixed', category: 'produce', estimatedPrice: 2.00 },
      { name: 'Onion', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Tortilla Wraps', amount: '6 wraps', category: 'bakery', estimatedPrice: 1.20 },
      { name: 'Lime', amount: '1 lime', category: 'produce', estimatedPrice: 0.30 },
      { name: 'Paprika', amount: '2 tsp', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Cumin', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Olive Oil', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.20 },
    ],
    instructions: [
      'Slice chicken into strips, peppers and onion into strips',
      'Mix paprika, cumin, salt, rub into chicken',
      'Heat oil in large pan, cook chicken until golden (8 min)',
      'Remove chicken, fry peppers and onion until soft (6 min)',
      'Add chicken back, squeeze lime juice over',
      'Warm tortillas in microwave (30 sec)',
      'Serve chicken and veg in tortillas',
      'Optional: add cheese, salsa, sour cream'
    ],
    nutrition: {
      calories: 510,
      protein: 38,
      carbs: 44,
      fats: 16,
      fiber: 4,
    },
    tags: ['Mexican Classic', 'High Protein', 'Quick'],
    benefits: [
      'High protein from lean chicken',
      'Vitamin C from peppers boosts immune system',
      'Customizable with your favorite toppings'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'chicken fajitas mexican',
    sourceUrl: 'https://www.recipetineats.com/chicken-fajitas/',
  },
  {
    id: 'mexican-bean-quesadilla',
    name: 'Black Bean Quesadillas',
    description: 'Quick vegetarian Mexican meal in 10 minutes',
    cuisine: 'mexican',
    category: 'microwave',
    cookingTime: 10,
    servings: 2,
    difficulty: 'easy',
    spiceLevel: 'mild',
    authentic: false,
    ingredients: [
      { name: 'Tortilla Wraps', amount: '4 wraps', category: 'bakery', estimatedPrice: 0.80 },
      { name: 'Black Beans', amount: '400g tin', category: 'pantry', estimatedPrice: 0.80 },
      { name: 'Cheddar Cheese', amount: '100g', category: 'dairy', estimatedPrice: 1.30 },
      { name: 'Spring Onions', amount: '2 stalks', category: 'produce', estimatedPrice: 0.30 },
      { name: 'Bell Pepper', amount: '1 pepper', category: 'produce', estimatedPrice: 0.70 },
      { name: 'Cumin', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
    ],
    instructions: [
      'Drain and mash black beans with cumin',
      'Dice pepper and slice spring onions',
      'Spread beans on tortilla, top with cheese, pepper, onions',
      'Top with another tortilla',
      'Heat dry pan, cook quesadilla 3 min each side until golden',
      'Cut into wedges and serve',
      'Optional: serve with salsa or sour cream'
    ],
    nutrition: {
      calories: 450,
      protein: 21,
      carbs: 56,
      fats: 16,
      fiber: 11,
    },
    tags: ['Vegetarian', 'Quick', 'High Fiber'],
    benefits: [
      'Ready in just 10 minutes',
      'Plant protein and fiber keep you full',
      'Budget-friendly vegetarian option'
    ],
    suitableFor: ['studying', 'working'],
    imageQuery: 'quesadilla black beans mexican',
    sourceUrl: 'https://www.budgetbytes.com/hearty-black-bean-quesadillas/',
  },

  // ========== MEDITERRANEAN CUISINE ==========
  {
    id: 'mediterranean-greek-salad-bowl',
    name: 'Greek Chicken Bowl',
    description: 'Fresh Mediterranean flavors with grilled chicken and feta',
    cuisine: 'mediterranean',
    category: 'meal-prep',
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    spiceLevel: 'mild',
    authentic: false,
    ingredients: [
      { name: 'Chicken Breast', amount: '500g', category: 'meat', estimatedPrice: 4.00 },
      { name: 'Couscous', amount: '200g', category: 'pantry', estimatedPrice: 1.00 },
      { name: 'Cherry Tomatoes', amount: '250g', category: 'produce', estimatedPrice: 1.20 },
      { name: 'Cucumber', amount: '1 large', category: 'produce', estimatedPrice: 0.70 },
      { name: 'Feta Cheese', amount: '150g', category: 'dairy', estimatedPrice: 2.00 },
      { name: 'Kalamata Olives', amount: '100g', category: 'pantry', estimatedPrice: 1.20 },
      { name: 'Lemon', amount: '2 lemons', category: 'produce', estimatedPrice: 0.60 },
      { name: 'Olive Oil', amount: '4 tbsp', category: 'pantry', estimatedPrice: 0.40 },
      { name: 'Oregano', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.15 },
    ],
    instructions: [
      'Marinate chicken in lemon juice, oregano, olive oil (10 min)',
      'Grill or pan-fry chicken until cooked through (12 min)',
      'Meanwhile, prepare couscous according to package',
      'Dice tomatoes and cucumber',
      'Slice cooked chicken',
      'Divide couscous into 4 containers',
      'Top with chicken, tomatoes, cucumber, olives, crumbled feta',
      'Drizzle with olive oil and lemon juice before serving'
    ],
    nutrition: {
      calories: 480,
      protein: 35,
      carbs: 36,
      fats: 20,
      fiber: 4,
    },
    tags: ['Mediterranean', 'Meal Prep', 'High Protein'],
    benefits: [
      'Heart-healthy Mediterranean diet principles',
      'Omega-3 and healthy fats from olives and olive oil',
      'Fresh vegetables provide vitamins and antioxidants'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'greek chicken bowl mediterranean',
    sourceUrl: 'https://www.recipetineats.com/greek-salad/',
  },

  // ========== JAPANESE CUISINE ==========
  {
    id: 'japanese-teriyaki-chicken',
    name: 'Teriyaki Chicken Rice Bowl',
    description: 'Sweet and savory Japanese classic - easy student version',
    cuisine: 'japanese',
    category: 'one-pot',
    cookingTime: 25,
    servings: 3,
    difficulty: 'easy',
    spiceLevel: 'mild',
    authentic: false,
    ingredients: [
      { name: 'Chicken Thighs', amount: '400g', category: 'meat', estimatedPrice: 3.00 },
      { name: 'Long Grain Rice', amount: '300g', category: 'pantry', estimatedPrice: 0.80 },
      { name: 'Soy Sauce', amount: '4 tbsp', category: 'pantry', estimatedPrice: 0.25 },
      { name: 'Honey', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.20 },
      { name: 'Fresh Ginger', amount: '2cm piece', category: 'produce', estimatedPrice: 0.20 },
      { name: 'Garlic Cloves', amount: '2 cloves', category: 'produce', estimatedPrice: 0.15 },
      { name: 'Spring Onions', amount: '3 stalks', category: 'produce', estimatedPrice: 0.50 },
      { name: 'Sesame Seeds', amount: '1 tbsp', category: 'pantry', estimatedPrice: 0.30 },
    ],
    instructions: [
      'Cook rice according to package instructions',
      'Mix soy sauce, honey, minced ginger, garlic for teriyaki sauce',
      'Cut chicken into bite-sized pieces',
      'Fry chicken in hot pan until golden (8 min)',
      'Add teriyaki sauce, simmer until sticky (5 min)',
      'Serve chicken over rice',
      'Top with sliced spring onions and sesame seeds'
    ],
    nutrition: {
      calories: 530,
      protein: 30,
      carbs: 60,
      fats: 14,
      fiber: 1,
    },
    tags: ['Japanese Classic', 'High Protein', 'Student Friendly'],
    benefits: [
      'Sweet and savory Japanese flavors',
      'High protein from chicken',
      'Cheaper than takeaway, ready in 25 minutes'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'teriyaki chicken rice bowl',
    sourceUrl: 'https://www.recipetineats.com/teriyaki-chicken/',
  },

  // ========== AMERICAN CUISINE ==========
  {
    id: 'american-chili-con-carne',
    name: 'Chili Con Carne',
    description: 'Hearty American-style beef and bean chili - perfect for batch cooking',
    cuisine: 'american',
    category: 'one-pot',
    cookingTime: 40,
    servings: 6,
    difficulty: 'easy',
    spiceLevel: 'medium',
    authentic: false,
    ingredients: [
      { name: 'Beef Mince', amount: '500g', category: 'meat', estimatedPrice: 3.80 },
      { name: 'Kidney Beans', amount: '2 x 400g tins', category: 'pantry', estimatedPrice: 1.60 },
      { name: 'Tinned Tomatoes', amount: '2 x 400g tins', category: 'pantry', estimatedPrice: 0.90 },
      { name: 'Onion', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Bell Peppers', amount: '2 peppers', category: 'produce', estimatedPrice: 1.40 },
      { name: 'Garlic Cloves', amount: '3 cloves', category: 'produce', estimatedPrice: 0.20 },
      { name: 'Chili Powder', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Cumin', amount: '1 tbsp', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Beef Stock Cube', amount: '1 cube', category: 'pantry', estimatedPrice: 0.15 },
    ],
    instructions: [
      'Brown beef mince in large pot (8 min)',
      'Add diced onion, peppers, garlic, cook (5 min)',
      'Add chili powder and cumin, stir (1 min)',
      'Add tinned tomatoes, drained beans, stock cube',
      'Add 200ml water, bring to boil',
      'Reduce heat, simmer uncovered (30 min)',
      'Stir occasionally, season to taste',
      'Serve with rice or in tortillas'
    ],
    nutrition: {
      calories: 410,
      protein: 30,
      carbs: 34,
      fats: 14,
      fiber: 9,
    },
    tags: ['American Classic', 'Batch Cooking', 'High Fiber'],
    benefits: [
      'Makes 6 servings - freeze extras for later',
      'High protein and fiber keeps you full',
      'Even better the next day - flavors develop'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'chili con carne american',
    sourceUrl: 'https://www.recipetineats.com/chilli-con-carne/',
  },
];

// Helper functions
export function getRecipesByCuisine(cuisine: CuisineType): CuisineRecipe[] {
  return CUISINE_RECIPES.filter(recipe => recipe.cuisine === cuisine);
}

export function getRecipesBySpiceLevel(level: 'mild' | 'medium' | 'hot'): CuisineRecipe[] {
  return CUISINE_RECIPES.filter(recipe => recipe.spiceLevel === level);
}

export function getAllCuisines(): CuisineType[] {
  return ['british', 'italian', 'chinese', 'indian', 'mexican', 'mediterranean', 'japanese', 'american'];
}

export function getCuisineStats() {
  const cuisines = getAllCuisines();
  return cuisines.map(cuisine => ({
    cuisine,
    count: CUISINE_RECIPES.filter(r => r.cuisine === cuisine).length,
    avgPrice: CUISINE_RECIPES
      .filter(r => r.cuisine === cuisine)
      .reduce((sum, r) => sum + r.ingredients.reduce((s, i) => s + i.estimatedPrice, 0), 0) / 
      CUISINE_RECIPES.filter(r => r.cuisine === cuisine).length,
  }));
}
