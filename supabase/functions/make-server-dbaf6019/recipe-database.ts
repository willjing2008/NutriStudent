// Recipe Database for Student Nutrition Meal Planner
// Focused on One Pot, Microwave, and Meal Prep recipes

export interface RecipeIngredient {
  name: string;
  amount: string;
  category: 'dairy' | 'produce' | 'meat' | 'pantry' | 'frozen' | 'bakery';
  estimatedPrice: number; // in pounds
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: 'one-pot' | 'microwave' | 'meal-prep';
  cookingTime: number; // in minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  tags: string[];
  benefits: string[];
  suitableFor: ('studying' | 'working' | 'fitness')[];
  imageQuery: string; // For Unsplash search
  youtubeUrl?: string; // YouTube cooking video URL
  sourceUrl?: string; // Original recipe source URL
}

export const RECIPE_DATABASE: Recipe[] = [
  // ONE POT MEALS
  {
    id: 'one-pot-chicken-rice',
    name: 'One Pot Chicken & Rice',
    description: 'Tender chicken with fluffy rice and vegetables, all cooked in one pot for easy cleanup',
    category: 'one-pot',
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    ingredients: [
      { name: 'Chicken Breast', amount: '400g', category: 'meat', estimatedPrice: 3.50 },
      { name: 'Long Grain Rice', amount: '300g', category: 'pantry', estimatedPrice: 0.80 },
      { name: 'Onion', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Garlic Cloves', amount: '3 cloves', category: 'produce', estimatedPrice: 0.20 },
      { name: 'Frozen Peas', amount: '150g', category: 'frozen', estimatedPrice: 0.80 },
      { name: 'Chicken Stock Cube', amount: '2 cubes', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Olive Oil', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.20 },
      { name: 'Mixed Herbs', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.15 },
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat',
      'Add diced chicken and cook until golden (5 min)',
      'Add chopped onion and garlic, cook until soft (3 min)',
      'Add rice and stir to coat in oil (1 min)',
      'Add 600ml boiling water with stock cubes dissolved',
      'Bring to boil, then reduce heat, cover and simmer (15 min)',
      'Add frozen peas, stir, cover and cook (3 min)',
      'Let stand covered for 5 min, then fluff with fork'
    ],
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 52,
      fats: 8,
      fiber: 3,
    },
    tags: ['High Protein', 'Budget Friendly', 'Easy Cleanup'],
    benefits: [
      'Complete protein from chicken supports muscle recovery',
      'Complex carbs from rice provide sustained energy for studying',
      'Low prep time means more time for coursework'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'chicken rice bowl',
    sourceUrl: 'https://www.budgetbytes.com/one-pot-chicken-and-rice/',
  },
  {
    id: 'one-pot-pasta-tomato',
    name: 'One Pot Tomato Pasta',
    description: 'Creamy tomato pasta with spinach and basil, ready in 15 minutes',
    category: 'one-pot',
    cookingTime: 15,
    servings: 3,
    difficulty: 'easy',
    ingredients: [
      { name: 'Penne Pasta', amount: '300g', category: 'pantry', estimatedPrice: 0.60 },
      { name: 'Tinned Tomatoes', amount: '400g tin', category: 'pantry', estimatedPrice: 0.45 },
      { name: 'Fresh Spinach', amount: '100g', category: 'produce', estimatedPrice: 0.80 },
      { name: 'Garlic Cloves', amount: '2 cloves', category: 'produce', estimatedPrice: 0.15 },
      { name: 'Onion', amount: '1 medium', category: 'produce', estimatedPrice: 0.30 },
      { name: 'Cheddar Cheese', amount: '50g', category: 'dairy', estimatedPrice: 0.70 },
      { name: 'Olive Oil', amount: '1 tbsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Dried Basil', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
    ],
    instructions: [
      'Add pasta, tinned tomatoes, 500ml water to large pot',
      'Add chopped onion, garlic, olive oil, basil, and salt',
      'Bring to boil, then simmer uncovered, stirring occasionally (12 min)',
      'Add spinach and stir until wilted (1 min)',
      'Remove from heat and stir in grated cheese',
      'Let stand 2 min before serving'
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 65,
      fats: 7,
      fiber: 5,
    },
    tags: ['Quick', 'Vegetarian', 'Budget Friendly'],
    benefits: [
      'Iron from spinach helps with concentration and reduces fatigue',
      'Quick cooking time perfect for busy students',
      'Calcium from cheese supports bone health'
    ],
    suitableFor: ['studying', 'working'],
    imageQuery: 'tomato pasta spinach',
    sourceUrl: 'https://www.recipetineats.com/one-pot-pasta/',
  },
  {
    id: 'one-pot-lentil-curry',
    name: 'One Pot Lentil Curry',
    description: 'Warming spiced lentils with coconut milk - vegan and protein-packed',
    category: 'one-pot',
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    ingredients: [
      { name: 'Red Lentils', amount: '250g', category: 'pantry', estimatedPrice: 1.20 },
      { name: 'Coconut Milk', amount: '400ml tin', category: 'pantry', estimatedPrice: 1.00 },
      { name: 'Onion', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Garlic Cloves', amount: '3 cloves', category: 'produce', estimatedPrice: 0.20 },
      { name: 'Fresh Ginger', amount: '2cm piece', category: 'produce', estimatedPrice: 0.30 },
      { name: 'Curry Powder', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.25 },
      { name: 'Tinned Tomatoes', amount: '400g tin', category: 'pantry', estimatedPrice: 0.45 },
      { name: 'Spinach', amount: '100g', category: 'produce', estimatedPrice: 0.80 },
      { name: 'Vegetable Stock Cube', amount: '1 cube', category: 'pantry', estimatedPrice: 0.15 },
    ],
    instructions: [
      'Fry chopped onion in a large pot until soft (5 min)',
      'Add minced garlic, ginger, and curry powder (1 min)',
      'Add lentils, tinned tomatoes, coconut milk, and 300ml water with stock cube',
      'Bring to boil, then simmer covered (20 min) until lentils are soft',
      'Stir in spinach until wilted (2 min)',
      'Season to taste and serve'
    ],
    nutrition: {
      calories: 310,
      protein: 16,
      carbs: 42,
      fats: 10,
      fiber: 8,
    },
    tags: ['Vegan', 'High Fiber', 'Budget Friendly'],
    benefits: [
      'Plant-based protein from lentils supports sustained energy',
      'High fiber content aids digestion and keeps you full',
      'Anti-inflammatory spices may improve cognitive function'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'lentil curry coconut',
    sourceUrl: 'https://www.bbcgoodfoodme.com/recipes/lentil-curry/',
  },

  // MICROWAVE MEALS - BREAKFAST (1-10)
  {
    id: 'microwave-perfect-scramble',
    name: 'The Perfect Scramble',
    description: 'Fluffy scrambled eggs ready in under 2 minutes - no pan needed',
    category: 'microwave',
    cookingTime: 2,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Eggs', amount: '2 large', category: 'dairy', estimatedPrice: 0.40 },
      { name: 'Milk', amount: '1 tbsp', category: 'dairy', estimatedPrice: 0.05 },
      { name: 'Butter', amount: '1 tsp', category: 'dairy', estimatedPrice: 0.10 },
      { name: 'Salt', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
      { name: 'Black Pepper', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
    ],
    instructions: [
      'Grease a microwave-safe bowl with butter',
      'Crack 2 eggs into the bowl',
      'Add milk, salt, and pepper',
      'Whisk well with a fork until fully combined',
      'Microwave for 45 seconds on high',
      'Remove and stir with fork',
      'Microwave for another 30-45 seconds until fluffy',
      'Let stand for 30 seconds before eating'
    ],
    nutrition: {
      calories: 150,
      protein: 12,
      carbs: 2,
      fats: 11,
      fiber: 0,
    },
    tags: ['High Protein', 'Under 5 Minutes', 'Budget Friendly'],
    benefits: [
      'Complete protein supports muscle recovery and concentration',
      'Ready in 2 minutes - perfect for rushed mornings',
      'No pan to wash - just a bowl and fork'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'scrambled eggs bowl',
    sourceUrl: 'https://www.biggerbolderbaking.com/microwave-scrambled-eggs/',
  },
  {
    id: 'microwave-banana-oat-mug-cake',
    name: 'Banana Oat Mug Cake',
    description: 'Warm banana bread in a mug - like a cozy hug for breakfast',
    category: 'microwave',
    cookingTime: 3,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Ripe Banana', amount: '1 medium', category: 'produce', estimatedPrice: 0.25 },
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'Rolled Oats', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Milk', amount: '1 tbsp', category: 'dairy', estimatedPrice: 0.05 },
      { name: 'Cinnamon', amount: '1/4 tsp', category: 'pantry', estimatedPrice: 0.02 },
    ],
    instructions: [
      'Mash 1 ripe banana in a microwave-safe mug using a fork',
      'Crack in 1 egg and mix well',
      'Add oats, milk, and cinnamon',
      'Stir until completely combined',
      'Microwave on high for 2-3 minutes',
      'Cake should rise and spring back when touched',
      'Let cool for 1 minute before eating'
    ],
    nutrition: {
      calories: 250,
      protein: 10,
      carbs: 38,
      fats: 7,
      fiber: 5,
    },
    tags: ['High Fiber', 'Natural Sweetness', 'Energizing'],
    benefits: [
      'Natural banana sweetness eliminates need for added sugar',
      'Oats provide slow-release carbs for sustained focus',
      'Potassium from banana supports brain function'
    ],
    suitableFor: ['studying', 'working'],
    imageQuery: 'banana bread mug cake',
    sourceUrl: 'https://www.budgetbytes.com/banana-bread-oatmeal/',
  },
  {
    id: 'microwave-breakfast-burrito',
    name: 'Loaded Breakfast Burrito',
    description: 'Protein-packed burrito with scrambled eggs, cheese, and salsa',
    category: 'microwave',
    cookingTime: 2,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'Tortilla Wrap', amount: '1 large', category: 'bakery', estimatedPrice: 0.30 },
      { name: 'Cheddar Cheese', amount: '30g', category: 'dairy', estimatedPrice: 0.40 },
      { name: 'Salsa', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Black Pepper', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
    ],
    instructions: [
      'Whisk egg in a bowl with pepper',
      'Microwave egg for 60 seconds, stirring halfway',
      'Lay tortilla flat and add cooked egg',
      'Top with cheese and salsa',
      'Roll up the burrito tightly',
      'Wrap in paper towel and microwave for 20 seconds',
      'Let cool for 30 seconds before eating'
    ],
    nutrition: {
      calories: 320,
      protein: 17,
      carbs: 28,
      fats: 15,
      fiber: 2,
    },
    tags: ['High Protein', 'Portable', 'Under 5 Minutes'],
    benefits: [
      'Protein and carbs provide balanced energy for workouts',
      'Portable format perfect for eating on the go',
      'Cheese provides calcium for strong bones'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'breakfast burrito eggs cheese',
    sourceUrl: 'https://www.budgetbytes.com/freezer-breakfast-burritos/',
  },
  {
    id: 'microwave-french-toast',
    name: '5-Minute French Toast',
    description: 'Classic French toast made in a mug - no pan required',
    category: 'microwave',
    cookingTime: 2,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Bread', amount: '1 slice', category: 'bakery', estimatedPrice: 0.15 },
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'Milk', amount: '2 tbsp', category: 'dairy', estimatedPrice: 0.08 },
      { name: 'Cinnamon', amount: '1/4 tsp', category: 'pantry', estimatedPrice: 0.02 },
      { name: 'Vanilla Extract', amount: '2 drops', category: 'pantry', estimatedPrice: 0.05 },
    ],
    instructions: [
      'Cube 1 slice of bread into bite-sized pieces',
      'In a mug, whisk together egg, milk, cinnamon, and vanilla',
      'Add bread cubes to the mug',
      'Toss until bread is completely coated',
      'Microwave on high for 1 minute 30 seconds',
      'Stir and check - if egg is still runny, add 15 seconds',
      'Drizzle with maple syrup if desired'
    ],
    nutrition: {
      calories: 200,
      protein: 10,
      carbs: 24,
      fats: 7,
      fiber: 1,
    },
    tags: ['Comfort Food', 'Quick Carbs', 'Budget Friendly'],
    benefits: [
      'Quick carbohydrates fuel mental energy for studying',
      'Cinnamon may help regulate blood sugar levels',
      'Nostalgic comfort food reduces stress'
    ],
    suitableFor: ['studying'],
    imageQuery: 'french toast cinnamon',
    sourceUrl: 'https://tasty.co/recipe/blueberry-french-toast-in-a-mug',
  },
  {
    id: 'microwave-poached-egg',
    name: 'Microwave Poached Egg',
    description: 'Perfectly poached egg in 60 seconds - easier than you think',
    category: 'microwave',
    cookingTime: 1,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'Water', amount: '1/2 cup', category: 'pantry', estimatedPrice: 0.00 },
      { name: 'Salt', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
      { name: 'Black Pepper', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
    ],
    instructions: [
      'Fill a microwave-safe mug with 1/2 cup water',
      'Carefully crack egg into the water',
      'Cover mug with a small plate or saucer',
      'Microwave on high for 60 seconds',
      'Check if white is set - if runny, add 10 seconds',
      'Carefully remove egg with slotted spoon',
      'Season with salt and pepper'
    ],
    nutrition: {
      calories: 70,
      protein: 6,
      carbs: 0,
      fats: 5,
      fiber: 0,
    },
    tags: ['High Protein', 'Under 5 Minutes', 'Low Carb'],
    benefits: [
      'Pure protein with minimal calories',
      'Zero carbs ideal for low-carb fitness goals',
      'Versatile - top on toast, salad, or eat alone'
    ],
    suitableFor: ['studying', 'fitness'],
    imageQuery: 'poached egg runny yolk',
    sourceUrl: 'https://www.recipetineats.com/poached-eggs/',
  },
  {
    id: 'microwave-spinach-feta-quiche',
    name: 'Spinach & Feta Crustless Quiche',
    description: 'Individual protein-packed quiche with greens and tangy feta',
    category: 'microwave',
    cookingTime: 3,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'Milk', amount: '1 tbsp', category: 'dairy', estimatedPrice: 0.05 },
      { name: 'Fresh Spinach', amount: '1 handful', category: 'produce', estimatedPrice: 0.30 },
      { name: 'Feta Cheese', amount: '30g', category: 'dairy', estimatedPrice: 0.50 },
      { name: 'Black Pepper', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
    ],
    instructions: [
      'Roughly chop spinach into small pieces',
      'In a ramekin, whisk together egg and milk',
      'Add chopped spinach and crumbled feta',
      'Season with black pepper',
      'Stir to combine all ingredients',
      'Microwave on high for 2 minutes',
      'Let sit for 1 minute to firm up before eating'
    ],
    nutrition: {
      calories: 180,
      protein: 14,
      carbs: 4,
      fats: 12,
      fiber: 1,
    },
    tags: ['High Protein', 'Vegetarian', 'Nutrient Dense'],
    benefits: [
      'Spinach provides iron for energy and cognitive function',
      'High protein supports muscle recovery after exercise',
      'Feta adds calcium and satisfying savory flavor'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'spinach feta egg muffin',
    sourceUrl: 'https://www.budgetbytes.com/spinach-mushroom-feta-crustless-quiche/',
  },
  {
    id: 'microwave-bacon-egg-cheese-sandwich',
    name: 'Bacon, Egg & Cheese Sandwich',
    description: 'Classic breakfast sandwich made entirely in the microwave',
    category: 'microwave',
    cookingTime: 4,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Bacon Rashers', amount: '2 slices', category: 'meat', estimatedPrice: 0.60 },
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'English Muffin', amount: '1 whole', category: 'bakery', estimatedPrice: 0.30 },
      { name: 'Cheddar Cheese Slice', amount: '1 slice', category: 'dairy', estimatedPrice: 0.25 },
    ],
    instructions: [
      'Place bacon between 2 paper towels on a plate',
      'Microwave bacon for 2 minutes until crispy',
      'Whisk egg in a small ramekin (for round shape)',
      'Microwave egg for 1 minute, checking at 45 seconds',
      'Toast the English muffin',
      'Assemble: bottom muffin, egg, cheese, bacon, top muffin',
      'Microwave assembled sandwich for 15 seconds to melt cheese'
    ],
    nutrition: {
      calories: 380,
      protein: 20,
      carbs: 30,
      fats: 19,
      fiber: 2,
    },
    tags: ['High Protein', 'Hearty', 'Breakfast Classic'],
    benefits: [
      'Balanced protein, carbs, and fats for sustained energy',
      'Satisfying breakfast keeps you full until lunch',
      'Perfect fuel for physically demanding work'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'bacon egg cheese sandwich',
    sourceUrl: 'https://tasty.co/recipe/microwaved-egg-breakfast-sandwich',
  },
  {
    id: 'microwave-cinnamon-quinoa-bowl',
    name: 'Cinnamon Quinoa Bowl',
    description: 'Creamy breakfast quinoa with warming cinnamon and maple syrup',
    category: 'microwave',
    cookingTime: 10,
    servings: 2,
    difficulty: 'easy',
    ingredients: [
      { name: 'Quinoa', amount: '1/2 cup', category: 'pantry', estimatedPrice: 0.60 },
      { name: 'Water', amount: '1 cup', category: 'pantry', estimatedPrice: 0.00 },
      { name: 'Milk', amount: '1/4 cup', category: 'dairy', estimatedPrice: 0.15 },
      { name: 'Cinnamon', amount: '1/2 tsp', category: 'pantry', estimatedPrice: 0.03 },
      { name: 'Maple Syrup', amount: '1 tbsp', category: 'pantry', estimatedPrice: 0.20 },
    ],
    instructions: [
      'Rinse quinoa under cold water',
      'Combine quinoa and water in a large covered bowl',
      'Microwave on high for 6 minutes',
      'Stir, then microwave for another 2-4 minutes',
      'Continue until water is absorbed',
      'Stir in milk, cinnamon, and maple syrup',
      'Divide into 2 servings and enjoy warm'
    ],
    nutrition: {
      calories: 220,
      protein: 8,
      carbs: 42,
      fats: 3,
      fiber: 4,
    },
    tags: ['High Fiber', 'Complete Protein', 'Meal Prep Friendly'],
    benefits: [
      'Quinoa is a complete protein with all 9 essential amino acids',
      'Complex carbs provide steady energy for long study sessions',
      'High fiber keeps you satisfied and focused'
    ],
    suitableFor: ['studying', 'working'],
    imageQuery: 'quinoa breakfast bowl cinnamon',
    sourceUrl: 'https://minimalistbaker.com/the-perfect-bowl-of-oats/',
  },
  {
    id: 'microwave-shakshuka-mug',
    name: '"Shakshuka" in a Mug',
    description: 'Microwave version of the classic egg-in-tomato-sauce dish',
    category: 'microwave',
    cookingTime: 2,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Marinara Sauce', amount: '1/2 cup', category: 'pantry', estimatedPrice: 0.40 },
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'Bread', amount: '1 slice', category: 'bakery', estimatedPrice: 0.15 },
      { name: 'Paprika', amount: 'pinch', category: 'pantry', estimatedPrice: 0.02 },
    ],
    instructions: [
      'Pour marinara sauce into a microwave-safe bowl',
      'Make a small well in the center of the sauce',
      'Carefully crack egg into the well',
      'Poke egg yolk once with a toothpick (prevents explosion)',
      'Sprinkle with paprika',
      'Cover bowl with a plate',
      'Microwave on high for 2 minutes',
      'Let stand 30 seconds, then dip toast into it'
    ],
    nutrition: {
      calories: 240,
      protein: 11,
      carbs: 32,
      fats: 8,
      fiber: 3,
    },
    tags: ['Mediterranean', 'Vegetarian', 'Comfort Food'],
    benefits: [
      'Lycopene from tomatoes supports cardiovascular health',
      'Balanced meal with protein, carbs, and vegetables',
      'Warm, comforting dish reduces morning stress'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'shakshuka eggs tomato sauce',
    sourceUrl: 'https://www.budgetbytes.com/shakshuka/',
  },
  {
    id: 'microwave-yogurt-berry-compote',
    name: 'Greek Yogurt & Berry Compote',
    description: 'Warm berry sauce over cold yogurt with crunchy granola',
    category: 'microwave',
    cookingTime: 2,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Frozen Mixed Berries', amount: '1 handful', category: 'frozen', estimatedPrice: 0.50 },
      { name: 'Greek Yogurt', amount: '150g', category: 'dairy', estimatedPrice: 0.60 },
      { name: 'Granola', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.25 },
      { name: 'Honey', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
    ],
    instructions: [
      'Place frozen berries in a microwave-safe bowl',
      'Microwave berries for 1-2 minutes until soft and saucy',
      'Stir berries to break them down into compote',
      'Scoop Greek yogurt into a serving bowl',
      'Pour warm berry compote over cold yogurt',
      'Top with granola for crunch',
      'Drizzle with honey if desired'
    ],
    nutrition: {
      calories: 220,
      protein: 18,
      carbs: 32,
      fats: 4,
      fiber: 4,
    },
    tags: ['High Protein', 'Antioxidant Rich', 'No Cooking'],
    benefits: [
      'Greek yogurt provides probiotics for gut health',
      'Antioxidants from berries improve memory and focus',
      'High protein keeps you full and energized'
    ],
    suitableFor: ['studying', 'fitness'],
    imageQuery: 'greek yogurt berries granola',
    sourceUrl: 'https://minimalistbaker.com/simple-berry-compote/',
  },

  // MICROWAVE MEALS - MAINS (11-20)
  {
    id: 'microwave-mac-cheese',
    name: 'Creamy Mac & Cheese',
    description: 'Single-serve mac and cheese made in a mug - ultimate comfort food',
    category: 'microwave',
    cookingTime: 6,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Macaroni Pasta', amount: '1/2 cup', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Water', amount: '1/2 cup', category: 'pantry', estimatedPrice: 0.00 },
      { name: 'Milk', amount: '3 tbsp', category: 'dairy', estimatedPrice: 0.12 },
      { name: 'Cheddar Cheese', amount: '60g', category: 'dairy', estimatedPrice: 0.75 },
      { name: 'Salt', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
    ],
    instructions: [
      'Combine macaroni and water in a large mug',
      'Microwave on high for 2 minutes',
      'Stir, then microwave for another 2 minutes',
      'Check if pasta is tender - if not, add 1 minute',
      'Drain any excess water',
      'Stir in milk and shredded cheddar cheese',
      'Microwave for 30 seconds to melt cheese',
      'Stir vigorously until creamy'
    ],
    nutrition: {
      calories: 420,
      protein: 20,
      carbs: 48,
      fats: 16,
      fiber: 2,
    },
    tags: ['Comfort Food', 'Budget Friendly', 'High Protein'],
    benefits: [
      'Ultimate comfort food reduces study stress',
      'Carbs provide quick energy for brain function',
      'Calcium from cheese supports bone health'
    ],
    suitableFor: ['studying'],
    imageQuery: 'mac and cheese creamy',
    sourceUrl: 'https://tasty.co/recipe/microwave-5-minute-mac-n-cheese',
  },
  {
    id: 'microwave-loaded-baked-potato',
    name: 'Classic Loaded Baked Potato',
    description: 'Fluffy baked potato loaded with butter, sour cream, and bacon',
    category: 'microwave',
    cookingTime: 7,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Russet Potato', amount: '1 large', category: 'produce', estimatedPrice: 0.40 },
      { name: 'Butter', amount: '1 tbsp', category: 'dairy', estimatedPrice: 0.15 },
      { name: 'Sour Cream', amount: '2 tbsp', category: 'dairy', estimatedPrice: 0.25 },
      { name: 'Cheddar Cheese', amount: '30g', category: 'dairy', estimatedPrice: 0.40 },
      { name: 'Chives', amount: '1 tsp', category: 'produce', estimatedPrice: 0.10 },
      { name: 'Bacon Bits', amount: '1 tbsp', category: 'meat', estimatedPrice: 0.30 },
    ],
    instructions: [
      'Wash potato thoroughly and poke holes all over with fork',
      'Place on microwave-safe plate',
      'Microwave on high for 5 minutes',
      'Flip potato and microwave for 2-3 more minutes',
      'Check if soft by squeezing (use oven mitt)',
      'Slice open and fluff inside with fork',
      'Add butter, sour cream, cheese, chives, and bacon bits'
    ],
    nutrition: {
      calories: 510,
      protein: 19,
      carbs: 56,
      fats: 23,
      fiber: 4,
    },
    tags: ['Comfort Food', 'Filling', 'Budget Friendly'],
    benefits: [
      'High fiber from potato skin keeps you satisfied',
      'Complex carbs provide sustained energy',
      'Versatile - customize toppings to your preference'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'loaded baked potato sour cream',
    sourceUrl: 'https://tasty.co/recipe/microwave-10-minute-loaded-potato',
  },
  {
    id: 'microwave-lemon-dill-salmon',
    name: 'Lemon-Dill Salmon',
    description: 'Perfectly cooked salmon fillet with fresh lemon and dill',
    category: 'microwave',
    cookingTime: 4,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Salmon Fillet', amount: '150g', category: 'meat', estimatedPrice: 2.50 },
      { name: 'Fresh Lemon', amount: '1/2 lemon', category: 'produce', estimatedPrice: 0.25 },
      { name: 'Fresh Dill', amount: '1 tsp', category: 'produce', estimatedPrice: 0.15 },
      { name: 'Olive Oil', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Salt', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
      { name: 'Black Pepper', amount: 'pinch', category: 'pantry', estimatedPrice: 0.01 },
    ],
    instructions: [
      'Place salmon fillet on a microwave-safe plate',
      'Drizzle with olive oil',
      'Squeeze fresh lemon juice over salmon',
      'Sprinkle with dill, salt, and pepper',
      'Cover plate loosely with vented plastic wrap',
      'Microwave on high for 3-3.5 minutes',
      'Check if fish flakes easily - if not, add 30 seconds',
      'Let rest for 1 minute before serving'
    ],
    nutrition: {
      calories: 280,
      protein: 34,
      carbs: 2,
      fats: 15,
      fiber: 0,
    },
    tags: ['High Protein', 'Omega-3 Rich', 'Low Carb'],
    benefits: [
      'Omega-3 fatty acids support brain health and focus',
      'Extremely high protein ideal for muscle recovery',
      'Quick cooking preserves nutrients and flavor'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'salmon fillet lemon dill',
    sourceUrl: 'https://www.themediterraneandish.com/lemon-dill-salmon/',
  },
  {
    id: 'microwave-fried-rice',
    name: 'Microwave Fried Rice',
    description: 'Better-than-takeout fried rice made in minutes',
    category: 'microwave',
    cookingTime: 3,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Pre-cooked Rice', amount: '1 cup', category: 'pantry', estimatedPrice: 0.40 },
      { name: 'Frozen Peas & Carrots', amount: '1/2 cup', category: 'frozen', estimatedPrice: 0.35 },
      { name: 'Egg', amount: '1 large', category: 'dairy', estimatedPrice: 0.20 },
      { name: 'Soy Sauce', amount: '1 tbsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Sesame Oil', amount: '1/2 tsp', category: 'pantry', estimatedPrice: 0.08 },
    ],
    instructions: [
      'Combine rice, frozen vegetables, and soy sauce in a bowl',
      'Microwave for 2 minutes, stirring halfway',
      'Push rice to the edges, creating a well in center',
      'Crack egg into the well',
      'Microwave for 1 minute',
      'Stir everything together vigorously to scramble egg',
      'Drizzle with sesame oil and serve'
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 62,
      fats: 8,
      fiber: 3,
    },
    tags: ['Budget Friendly', 'Uses Leftovers', 'Balanced Meal'],
    benefits: [
      'Perfect way to use up leftover rice',
      'Balanced carbs and protein for sustained energy',
      'Vegetables add vitamins and fiber'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'fried rice vegetables egg',
    sourceUrl: 'https://www.recipetineats.com/egg-fried-rice/',
  },
  {
    id: 'microwave-stuffed-peppers',
    name: 'Stuffed Bell Peppers',
    description: 'Colorful bell pepper stuffed with rice, beans, and melted cheese',
    category: 'microwave',
    cookingTime: 5,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Bell Pepper', amount: '1 large', category: 'produce', estimatedPrice: 0.60 },
      { name: 'Pre-cooked Rice', amount: '1/2 cup', category: 'pantry', estimatedPrice: 0.20 },
      { name: 'Canned Black Beans', amount: '1/4 cup', category: 'pantry', estimatedPrice: 0.25 },
      { name: 'Salsa', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Taco Seasoning', amount: '1/2 tsp', category: 'pantry', estimatedPrice: 0.05 },
      { name: 'Cheddar Cheese', amount: '30g', category: 'dairy', estimatedPrice: 0.40 },
    ],
    instructions: [
      'Cut top off bell pepper and remove all seeds',
      'Mix rice, beans, salsa, and taco seasoning in a bowl',
      'Stuff the mixture into the bell pepper',
      'Place pepper upright in a bowl with 1 tbsp water',
      'Cover loosely with plastic wrap',
      'Microwave on high for 4-5 minutes until pepper is tender',
      'Top with shredded cheese and microwave for 30 seconds'
    ],
    nutrition: {
      calories: 340,
      protein: 16,
      carbs: 52,
      fats: 9,
      fiber: 10,
    },
    tags: ['High Fiber', 'Vegetarian', 'Colorful'],
    benefits: [
      'Extremely high fiber supports digestive health',
      'Bell peppers rich in vitamin C boost immunity',
      'Plant-based protein from beans aids recovery'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'stuffed bell pepper rice beans',
    sourceUrl: 'https://www.budgetbytes.com/stuffed-bell-peppers/',
  },
  {
    id: 'microwave-chicken-fajita-bowl',
    name: 'Chicken Fajita Bowl',
    description: 'Sizzling fajita flavors with tender chicken and peppers',
    category: 'microwave',
    cookingTime: 7,
    servings: 1,
    difficulty: 'medium',
    ingredients: [
      { name: 'Chicken Breast', amount: '150g', category: 'meat', estimatedPrice: 1.50 },
      { name: 'Bell Pepper', amount: '1/2 pepper', category: 'produce', estimatedPrice: 0.30 },
      { name: 'Onion', amount: '1/4 onion', category: 'produce', estimatedPrice: 0.10 },
      { name: 'Fajita Seasoning', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.15 },
      { name: 'Olive Oil', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
    ],
    instructions: [
      'Slice chicken breast into thin strips',
      'Slice bell pepper and onion into strips',
      'Place chicken in glass dish with vegetables',
      'Drizzle with olive oil and sprinkle with fajita seasoning',
      'Toss to coat everything evenly',
      'Cover dish with vented plastic wrap',
      'Microwave on high for 4 minutes',
      'Stir, then microwave for 3 more minutes',
      'Check chicken is cooked through before serving'
    ],
    nutrition: {
      calories: 280,
      protein: 38,
      carbs: 12,
      fats: 9,
      fiber: 3,
    },
    tags: ['High Protein', 'Low Carb', 'Restaurant Style'],
    benefits: [
      'Extremely high protein supports muscle building',
      'Low carb option ideal for fitness goals',
      'Vegetables provide vitamins and antioxidants'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'chicken fajitas peppers onions',
    sourceUrl: 'https://www.recipetineats.com/chicken-fajitas/',
  },
  {
    id: 'microwave-single-serve-lasagna',
    name: 'Single-Serve Lasagna',
    description: 'All the layers of lasagna in a mug - pure comfort',
    category: 'microwave',
    cookingTime: 6,
    servings: 1,
    difficulty: 'medium',
    ingredients: [
      { name: 'Lasagna Noodles', amount: '2 sheets', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Marinara Sauce', amount: '1/2 cup', category: 'pantry', estimatedPrice: 0.40 },
      { name: 'Ricotta Cheese', amount: '3 tbsp', category: 'dairy', estimatedPrice: 0.50 },
      { name: 'Mozzarella Cheese', amount: '40g', category: 'dairy', estimatedPrice: 0.55 },
      { name: 'Italian Herbs', amount: '1/4 tsp', category: 'pantry', estimatedPrice: 0.03 },
    ],
    instructions: [
      'Break lasagna noodles to fit inside a large mug',
      'Layer 1: spoon of sauce at bottom',
      'Layer 2: noodle piece, ricotta, herbs',
      'Layer 3: sauce, noodle, mozzarella',
      'Repeat layers until mug is 3/4 full',
      'Top with extra mozzarella',
      'Microwave at 50% power for 4-6 minutes',
      'Let stand 2 minutes for noodles to soften'
    ],
    nutrition: {
      calories: 440,
      protein: 22,
      carbs: 38,
      fats: 20,
      fiber: 2,
    },
    tags: ['Comfort Food', 'Italian', 'Cheesy'],
    benefits: [
      'Satisfying comfort food reduces exam stress',
      'Balanced meal with protein, carbs, and dairy',
      'Individual portion prevents overeating'
    ],
    suitableFor: ['studying', 'working'],
    imageQuery: 'lasagna layers cheese',
    sourceUrl: 'https://tasty.co/recipe/6-minute-microwave-lasagna',
  },
  {
    id: 'microwave-enchilada-casserole',
    name: 'Enchilada Casserole',
    description: 'Layered Mexican casserole with beans, corn, and melted cheese',
    category: 'microwave',
    cookingTime: 3,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Corn Tortillas', amount: '2 small', category: 'bakery', estimatedPrice: 0.30 },
      { name: 'Enchilada Sauce', amount: '1/3 cup', category: 'pantry', estimatedPrice: 0.35 },
      { name: 'Canned Black Beans', amount: '1/4 cup', category: 'pantry', estimatedPrice: 0.25 },
      { name: 'Frozen Corn', amount: '2 tbsp', category: 'frozen', estimatedPrice: 0.10 },
      { name: 'Cheddar Cheese', amount: '40g', category: 'dairy', estimatedPrice: 0.50 },
    ],
    instructions: [
      'Tear tortillas into bite-sized pieces',
      'In a bowl, create first layer: tortilla pieces',
      'Add enchilada sauce, beans, corn',
      'Sprinkle with cheese',
      'Repeat layers until bowl is full',
      'Top with extra cheese',
      'Microwave on high for 2-3 minutes',
      'Let stand 1 minute until bubbly and hot'
    ],
    nutrition: {
      calories: 375,
      protein: 17,
      carbs: 50,
      fats: 14,
      fiber: 14,
    },
    tags: ['High Fiber', 'Vegetarian', 'Mexican'],
    benefits: [
      'High fiber from beans supports digestive health',
      'Plant-based protein ideal for vegetarian diets',
      'Corn provides B vitamins for energy'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'enchilada casserole cheese',
    sourceUrl: 'https://www.budgetbytes.com/vegetable-enchilada-casserole/',
  },
  {
    id: 'microwave-mug-meatloaf',
    name: 'Mug Meatloaf',
    description: 'Classic meatloaf in individual portion - ready in 4 minutes',
    category: 'microwave',
    cookingTime: 4,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Lean Ground Beef', amount: '115g', category: 'meat', estimatedPrice: 1.20 },
      { name: 'Quick Oats', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.08 },
      { name: 'Ketchup', amount: '1 tbsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Egg', amount: '1/4 beaten', category: 'dairy', estimatedPrice: 0.10 },
      { name: 'Onion Powder', amount: '1/4 tsp', category: 'pantry', estimatedPrice: 0.02 },
    ],
    instructions: [
      'In a mug, mix ground beef, oats, egg, and onion powder',
      'Add half the ketchup and mix thoroughly',
      'Press mixture down firmly into mug',
      'Spread remaining ketchup on top',
      'Microwave on high for 3-4 minutes',
      'Check internal temperature reaches 70°C',
      'Drain any excess grease carefully',
      'Let rest for 2 minutes before eating'
    ],
    nutrition: {
      calories: 295,
      protein: 23,
      carbs: 12,
      fats: 17,
      fiber: 1,
    },
    tags: ['High Protein', 'Comfort Food', 'Budget Friendly'],
    benefits: [
      'High protein supports muscle repair and growth',
      'Iron from beef improves energy and focus',
      'Comfort food flavor in healthy portion size'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'meatloaf ketchup glaze',
    sourceUrl: 'https://www.myplate.gov/recipes/meatloaf-mug',
  },
  {
    id: 'microwave-spaghetti-squash-pasta',
    name: 'Spaghetti Squash "Pasta"',
    description: 'Low-carb pasta alternative with marinara and parmesan',
    category: 'microwave',
    cookingTime: 12,
    servings: 2,
    difficulty: 'medium',
    ingredients: [
      { name: 'Spaghetti Squash', amount: '1 small', category: 'produce', estimatedPrice: 1.50 },
      { name: 'Marinara Sauce', amount: '1 cup', category: 'pantry', estimatedPrice: 0.80 },
      { name: 'Parmesan Cheese', amount: '30g', category: 'dairy', estimatedPrice: 0.60 },
      { name: 'Olive Oil', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
      { name: 'Italian Herbs', amount: '1/2 tsp', category: 'pantry', estimatedPrice: 0.05 },
    ],
    instructions: [
      'Carefully poke holes all over squash with fork',
      'Place on microwave-safe plate',
      'Microwave on high for 5 minutes',
      'Rotate squash, microwave for 5 more minutes',
      'Let cool for 5 minutes until safe to handle',
      'Cut squash in half lengthwise',
      'Scoop out and discard seeds',
      'Use fork to shred flesh into "noodles"',
      'Toss with marinara, herbs, and parmesan'
    ],
    nutrition: {
      calories: 180,
      protein: 8,
      carbs: 28,
      fats: 6,
      fiber: 6,
    },
    tags: ['Low Carb', 'High Fiber', 'Veggie-Based'],
    benefits: [
      'Low-calorie pasta alternative ideal for weight management',
      'High fiber supports digestive health',
      'Rich in vitamins A and C for immunity'
    ],
    suitableFor: ['fitness'],
    imageQuery: 'spaghetti squash marinara',
    sourceUrl: 'https://tasty.co/recipe/spaghetti-squash-pasta-meal-prep-2-ways',
  },

  // MEAL PREP
  {
    id: 'meal-prep-chicken-veg',
    name: 'Meal Prep Chicken & Veg Bowls',
    description: 'Make 5 healthy lunches in 30 minutes - perfectly balanced macros',
    category: 'meal-prep',
    cookingTime: 30,
    servings: 5,
    difficulty: 'easy',
    ingredients: [
      { name: 'Chicken Breast', amount: '600g', category: 'meat', estimatedPrice: 5.00 },
      { name: 'Broccoli', amount: '300g', category: 'produce', estimatedPrice: 1.20 },
      { name: 'Sweet Potato', amount: '500g', category: 'produce', estimatedPrice: 1.50 },
      { name: 'Brown Rice', amount: '250g', category: 'pantry', estimatedPrice: 0.80 },
      { name: 'Olive Oil', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Soy Sauce', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.20 },
      { name: 'Garlic Powder', amount: '1 tsp', category: 'pantry', estimatedPrice: 0.10 },
    ],
    instructions: [
      'Preheat oven to 200°C',
      'Cut chicken into chunks, sweet potato into cubes',
      'Toss chicken and sweet potato with olive oil, garlic powder, salt',
      'Spread on baking tray and bake for 25 minutes',
      'Meanwhile, cook rice according to package (20 min)',
      'Steam broccoli for 5 minutes until tender',
      'Divide into 5 containers: rice, chicken, sweet potato, broccoli',
      'Drizzle with soy sauce and store in fridge up to 5 days'
    ],
    nutrition: {
      calories: 420,
      protein: 38,
      carbs: 48,
      fats: 9,
      fiber: 6,
    },
    tags: ['High Protein', 'Meal Prep', 'Balanced Macros'],
    benefits: [
      'High protein supports muscle recovery after gym sessions',
      'Pre-portioned meals save time and reduce food waste',
      'Complex carbs and lean protein keep energy stable all day'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'meal prep chicken sweet potato',
    sourceUrl: 'https://www.budgetbytes.com/sheet-pan-greek-chicken-and-vegetables/',
  },
  {
    id: 'meal-prep-overnight-oats',
    name: 'Berry Overnight Oats (x5)',
    description: 'Grab-and-go breakfasts ready in the fridge - no morning cooking needed',
    category: 'meal-prep',
    cookingTime: 5,
    servings: 5,
    difficulty: 'easy',
    ingredients: [
      { name: 'Rolled Oats', amount: '250g', category: 'pantry', estimatedPrice: 0.75 },
      { name: 'Greek Yogurt', amount: '500g', category: 'dairy', estimatedPrice: 2.00 },
      { name: 'Milk', amount: '500ml', category: 'dairy', estimatedPrice: 0.60 },
      { name: 'Honey', amount: '5 tbsp', category: 'pantry', estimatedPrice: 0.50 },
      { name: 'Mixed Berries', amount: '300g frozen', category: 'frozen', estimatedPrice: 2.50 },
      { name: 'Chia Seeds', amount: '50g', category: 'pantry', estimatedPrice: 0.80 },
    ],
    instructions: [
      'In each of 5 jars/containers, add 50g oats',
      'Add 100g yogurt and 100ml milk to each jar',
      'Add 1 tbsp honey and 1 tsp chia seeds to each',
      'Stir well to combine',
      'Top each with 60g frozen berries',
      'Seal and refrigerate overnight (or up to 5 days)',
      'Grab and eat cold, or microwave for 1 min if preferred'
    ],
    nutrition: {
      calories: 340,
      protein: 12,
      carbs: 54,
      fats: 9,
      fiber: 10,
    },
    tags: ['Meal Prep', 'No Cooking', 'Grab & Go'],
    benefits: [
      'Zero morning prep - perfect for early lectures',
      'Probiotics from yogurt support gut health and immunity',
      'Antioxidants from berries improve memory and focus'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'overnight oats berries jar',
    sourceUrl: 'https://www.budgetbytes.com/overnight-oats-base-recipe-plus-variations/',
  },
  {
    id: 'meal-prep-burrito-bowls',
    name: 'Mexican Burrito Bowl Prep',
    description: '5 colorful, protein-rich burrito bowls for the week',
    category: 'meal-prep',
    cookingTime: 35,
    servings: 5,
    difficulty: 'medium',
    ingredients: [
      { name: 'Turkey Mince', amount: '500g', category: 'meat', estimatedPrice: 4.00 },
      { name: 'Black Beans', amount: '2 x 400g tins', category: 'pantry', estimatedPrice: 1.60 },
      { name: 'Brown Rice', amount: '300g', category: 'pantry', estimatedPrice: 0.95 },
      { name: 'Bell Peppers', amount: '2 large', category: 'produce', estimatedPrice: 1.40 },
      { name: 'Sweetcorn', amount: '300g frozen', category: 'frozen', estimatedPrice: 1.00 },
      { name: 'Cherry Tomatoes', amount: '250g', category: 'produce', estimatedPrice: 1.20 },
      { name: 'Cheddar Cheese', amount: '150g', category: 'dairy', estimatedPrice: 2.00 },
      { name: 'Taco Seasoning', amount: '2 tbsp', category: 'pantry', estimatedPrice: 0.30 },
      { name: 'Lime', amount: '2 limes', category: 'produce', estimatedPrice: 0.60 },
    ],
    instructions: [
      'Cook rice according to package instructions',
      'Brown turkey mince in a large pan (8 min)',
      'Add taco seasoning, drained beans, and 100ml water (5 min)',
      'Dice peppers and tomatoes, drain sweetcorn',
      'Divide rice into 5 containers',
      'Top each with turkey-bean mix, peppers, corn, tomatoes',
      'Add grated cheese and lime wedge to each',
      'Store in fridge up to 4 days, reheat when needed'
    ],
    nutrition: {
      calories: 480,
      protein: 35,
      carbs: 55,
      fats: 14,
      fiber: 12,
    },
    tags: ['High Protein', 'High Fiber', 'Meal Prep'],
    benefits: [
      'Lean turkey provides complete protein without excess fat',
      'Black beans offer plant protein and support stable blood sugar',
      'Colorful vegetables provide vitamins for immune support'
    ],
    suitableFor: ['working', 'fitness'],
    imageQuery: 'burrito bowl meal prep',
    sourceUrl: 'https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/',
  },
  {
    id: 'meal-prep-buddha-bowl',
    name: 'Rainbow Buddha Bowl Prep',
    description: 'Vibrant vegetarian bowls packed with nutrients - 5 lunches sorted',
    category: 'meal-prep',
    cookingTime: 40,
    servings: 5,
    difficulty: 'medium',
    ingredients: [
      { name: 'Quinoa', amount: '250g', category: 'pantry', estimatedPrice: 2.00 },
      { name: 'Chickpeas', amount: '2 x 400g tins', category: 'pantry', estimatedPrice: 1.60 },
      { name: 'Sweet Potato', amount: '600g', category: 'produce', estimatedPrice: 1.80 },
      { name: 'Kale', amount: '200g', category: 'produce', estimatedPrice: 1.20 },
      { name: 'Red Cabbage', amount: '1/4 head', category: 'produce', estimatedPrice: 0.60 },
      { name: 'Avocado', amount: '2 large', category: 'produce', estimatedPrice: 2.00 },
      { name: 'Tahini', amount: '100g', category: 'pantry', estimatedPrice: 1.50 },
      { name: 'Lemon', amount: '2 lemons', category: 'produce', estimatedPrice: 0.60 },
      { name: 'Olive Oil', amount: '3 tbsp', category: 'pantry', estimatedPrice: 0.30 },
    ],
    instructions: [
      'Preheat oven to 200°C',
      'Cube sweet potato, toss with olive oil, roast for 30 min',
      'Drain chickpeas, toss with spices, roast alongside (25 min)',
      'Cook quinoa according to package (15 min)',
      'Massage kale with lemon juice until softened',
      'Thinly slice red cabbage',
      'Make tahini dressing: mix tahini, lemon juice, water until smooth',
      'Divide quinoa, sweet potato, chickpeas, kale, cabbage into 5 containers',
      'Store avocado and dressing separately, add when serving'
    ],
    nutrition: {
      calories: 500,
      protein: 16,
      carbs: 65,
      fats: 21,
      fiber: 14,
    },
    tags: ['Vegan', 'High Fiber', 'Nutrient Dense'],
    benefits: [
      'Plant-based complete protein from quinoa and chickpeas',
      'Extremely high fiber supports digestive health',
      'Rich in vitamins A, C, K for immune and bone health'
    ],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'buddha bowl quinoa chickpeas',
    sourceUrl: 'https://minimalistbaker.com/sweet-potato-chickpea-buddha-bowl/',
  },
];

// Helper function to get recipes by category
export function getRecipesByCategory(category: 'one-pot' | 'microwave' | 'meal-prep'): Recipe[] {
  return RECIPE_DATABASE.filter(recipe => recipe.category === category);
}

// Helper function to get recipes suitable for specific need
export function getRecipesByNeed(need: 'studying' | 'working' | 'fitness'): Recipe[] {
  return RECIPE_DATABASE.filter(recipe => recipe.suitableFor.includes(need));
}

// Helper function to get recipes within budget
export function getRecipesWithinBudget(maxBudget: number, servings: number = 1): Recipe[] {
  return RECIPE_DATABASE.filter(recipe => {
    const totalCost = recipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);
    const costPerServing = totalCost / recipe.servings;
    return costPerServing * servings <= maxBudget;
  });
}

// Helper function to calculate total cost of a recipe
export function getRecipeTotalCost(recipe: Recipe): number {
  return recipe.ingredients.reduce((sum, ing) => sum + ing.estimatedPrice, 0);
}

// Helper function to organize ingredients by supermarket section
export function organizeIngredientsBySection(ingredients: RecipeIngredient[]): {
  dairy: RecipeIngredient[];
  produce: RecipeIngredient[];
  meat: RecipeIngredient[];
  pantry: RecipeIngredient[];
  frozen: RecipeIngredient[];
  bakery: RecipeIngredient[];
} {
  const organized = {
    dairy: [] as RecipeIngredient[],
    produce: [] as RecipeIngredient[],
    meat: [] as RecipeIngredient[],
    pantry: [] as RecipeIngredient[],
    frozen: [] as RecipeIngredient[],
    bakery: [] as RecipeIngredient[],
  };

  ingredients.forEach(ingredient => {
    organized[ingredient.category].push(ingredient);
  });

  return organized;
}