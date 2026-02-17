// Brain-focused recipes for study and cognitive enhancement
// Goal: Improve memory and concentration
// Rich in Omega-3s (DHA/EPA), Choline, Antioxidants, and Healthy Fats

export const BRAIN_RECIPES: any[] = [
  {
    id: "smoked-salmon-poached-eggs",
    name: "Smoked Salmon & Poached Eggs",
    description: "Omega-3 rich breakfast combining smoked salmon with perfectly poached eggs for brain-boosting choline and healthy fats.",
    cuisine: "british",
    category: "one-pot",
    cookingTime: 15,
    servings: 1,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Smoked Salmon Poached Eggs British breakfast brain food",
    sourceUrl: "https://www.jamieoliver.com/recipes/eggs/blanched-asparagus-poached-egg-fresh-smoked-salmon/",
    ingredients: [
      { name: "Smoked salmon", amount: "100g", estimatedPrice: 2.50 },
      { name: "Eggs", amount: "2 large", estimatedPrice: 0.40 },
      { name: "Wholegrain bread", amount: "2 slices", estimatedPrice: 0.30 },
      { name: "Lemon", amount: "1/2", estimatedPrice: 0.25 },
      { name: "Fresh dill", amount: "5g", estimatedPrice: 0.40 },
      { name: "Black pepper", amount: "to taste", estimatedPrice: 0.05 }
    ],
    instructions: [
      "Bring a pot of water to a gentle simmer and add a splash of vinegar",
      "Crack eggs into small cups, then gently slide into simmering water",
      "Poach eggs for 3-4 minutes until whites are set but yolks remain runny",
      "Toast wholegrain bread until golden",
      "Top toast with smoked salmon, then carefully place poached eggs on top",
      "Garnish with fresh dill, lemon juice, and black pepper"
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 28,
      fats: 18,
      fiber: 4
    },
    tags: ["brain-food", "omega-3", "high-protein", "breakfast", "quick"],
    benefits: ["Improves memory", "Supports brain structure", "Rich in choline"],
    suitableFor: ["study"]
  },
  {
    id: "sardines-toast-tomato",
    name: "Sardines on Toast with Tomato",
    description: "The highest source of DHA brain fats - tinned sardines on crispy toast with fresh tomatoes.",
    cuisine: "british",
    category: "microwave",
    cookingTime: 10,
    servings: 1,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Sardines on Toast British food brain health omega-3",
    sourceUrl: "https://www.jamieoliver.com/recipes/fish/sardines-on-toast-tomato-salad/",
    ingredients: [
      { name: "Tinned sardines in olive oil", amount: "120g tin", estimatedPrice: 1.20 },
      { name: "Wholegrain bread", amount: "2 slices", estimatedPrice: 0.30 },
      { name: "Cherry tomatoes", amount: "100g", estimatedPrice: 0.60 },
      { name: "Garlic", amount: "1 clove", estimatedPrice: 0.10 },
      { name: "Lemon juice", amount: "1 tbsp", estimatedPrice: 0.15 },
      { name: "Fresh parsley", amount: "5g", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Toast bread until golden and crispy",
      "Halve cherry tomatoes and crush garlic",
      "Drain sardines and mash lightly with a fork",
      "Mix sardines with lemon juice and crushed garlic",
      "Spread sardine mixture on toast",
      "Top with halved tomatoes and fresh parsley"
    ],
    nutrition: {
      calories: 380,
      protein: 28,
      carbs: 32,
      fats: 16,
      fiber: 5
    },
    tags: ["brain-food", "DHA", "omega-3", "quick-lunch", "student-budget"],
    benefits: ["Highest DHA content", "Supports neural processing", "Brain fuel"],
    suitableFor: ["study"]
  },
  {
    id: "sardine-salad-lemon",
    name: "Sardine Salad with Lemon & Olive Oil",
    description: "Fresh, potent brain fuel salad with sardines, mixed greens, and Mediterranean flavors.",
    cuisine: "mediterranean",
    category: "meal-prep",
    cookingTime: 15,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Sardine Salad Mediterranean brain food healthy",
    sourceUrl: "https://www.jamieoliver.com/recipes/fish/harissa-sardines-with-couscous-salad/",
    ingredients: [
      { name: "Tinned sardines", amount: "2 x 120g tins", estimatedPrice: 2.40 },
      { name: "Mixed salad leaves", amount: "150g", estimatedPrice: 1.20 },
      { name: "Cucumber", amount: "1 medium", estimatedPrice: 0.60 },
      { name: "Red onion", amount: "1 small", estimatedPrice: 0.30 },
      { name: "Extra virgin olive oil", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "Lemon", amount: "1 whole", estimatedPrice: 0.50 },
      { name: "Capers", amount: "1 tbsp", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Wash and dry salad leaves, place in a large bowl",
      "Slice cucumber and thinly slice red onion",
      "Drain sardines and break into large chunks",
      "Add cucumber, onion, and sardines to salad",
      "Whisk together olive oil, lemon juice, and capers",
      "Dress salad just before serving"
    ],
    nutrition: {
      calories: 340,
      protein: 26,
      carbs: 12,
      fats: 22,
      fiber: 4
    },
    tags: ["brain-food", "omega-3", "meal-prep", "Mediterranean", "fresh"],
    benefits: ["Potent brain fuel", "Rich in Omega-3s", "Anti-inflammatory"],
    suitableFor: ["study"]
  },
  {
    id: "baked-salmon-asparagus",
    name: "Baked Salmon with Asparagus",
    description: "Sheet-pan dinner rich in essential fatty acids for cognitive health, with tender salmon and roasted asparagus.",
    cuisine: "british",
    category: "one-pot",
    cookingTime: 30,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Baked Salmon Asparagus sheet pan brain food omega-3",
    sourceUrl: "https://www.recipetineats.com/lemon-garlic-salmon-tray-bake-easy-healthy/",
    ingredients: [
      { name: "Salmon fillets", amount: "2 x 150g", estimatedPrice: 5.00 },
      { name: "Asparagus", amount: "250g", estimatedPrice: 2.00 },
      { name: "Olive oil", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "Lemon", amount: "1 whole", estimatedPrice: 0.50 },
      { name: "Garlic", amount: "2 cloves", estimatedPrice: 0.20 },
      { name: "Fresh dill", amount: "10g", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Preheat oven to 200°C (180°C fan)",
      "Trim woody ends from asparagus and place on baking sheet",
      "Place salmon fillets on the same sheet",
      "Drizzle everything with olive oil, minced garlic, and lemon juice",
      "Season with salt, pepper, and fresh dill",
      "Bake for 15-18 minutes until salmon is cooked through"
    ],
    nutrition: {
      calories: 364,
      protein: 37,
      carbs: 3,
      fats: 22,
      fiber: 1
    },
    tags: ["brain-food", "omega-3", "high-protein", "one-pot", "dinner"],
    benefits: ["Essential fatty acids", "Supports cognitive health", "Brain-boosting"],
    suitableFor: ["study"]
  },
  {
    id: "mackerel-sourdough",
    name: "Mackerel on Sourdough",
    description: "Oily fish supporting neural processing speed, served on tangy sourdough bread.",
    cuisine: "british",
    category: "microwave",
    cookingTime: 15,
    servings: 1,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Mackerel Sourdough Toast British brain food",
    sourceUrl: "https://www.jamieoliver.com/recipes/fish/smoked-mackerel-pate-with-griddled-toast-and-cress-salad/",
    ingredients: [
      { name: "Smoked mackerel fillet", amount: "125g", estimatedPrice: 1.80 },
      { name: "Sourdough bread", amount: "2 slices", estimatedPrice: 0.60 },
      { name: "Cream cheese", amount: "50g", estimatedPrice: 0.40 },
      { name: "Rocket leaves", amount: "30g", estimatedPrice: 0.50 },
      { name: "Lemon", amount: "1/2", estimatedPrice: 0.25 },
      { name: "Black pepper", amount: "to taste", estimatedPrice: 0.05 }
    ],
    instructions: [
      "Toast sourdough bread until golden",
      "Spread cream cheese on toasted bread",
      "Flake smoked mackerel into large pieces",
      "Top cream cheese with mackerel flakes",
      "Add rocket leaves and squeeze lemon juice over",
      "Season with black pepper and serve"
    ],
    nutrition: {
      calories: 480,
      protein: 32,
      carbs: 36,
      fats: 22,
      fiber: 3
    },
    tags: ["brain-food", "omega-3", "quick-lunch", "oily-fish"],
    benefits: ["Neural processing speed", "Rich in DHA/EPA", "Brain health"],
    suitableFor: ["study"]
  },
  {
    id: "baked-cod-brussels-sprouts",
    name: "Baked Cod with Roasted Brussels Sprouts",
    description: "Lean white fish with brain-protecting Brussels sprouts, roasted to perfection.",
    cuisine: "british",
    category: "one-pot",
    cookingTime: 30,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Baked Cod Brussels Sprouts British healthy brain food",
    sourceUrl: "https://www.foodnetwork.com/recipes/food-network-kitchen/roasted-cod-with-carrots-and-brussels-sprouts-3568165",
    ingredients: [
      { name: "Cod fillets", amount: "2 x 150g", estimatedPrice: 4.00 },
      { name: "Brussels sprouts", amount: "300g", estimatedPrice: 1.50 },
      { name: "Olive oil", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "Garlic", amount: "3 cloves", estimatedPrice: 0.30 },
      { name: "Lemon", amount: "1 whole", estimatedPrice: 0.50 },
      { name: "Almonds (flaked)", amount: "30g", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Preheat oven to 200°C (180°C fan)",
      "Halve Brussels sprouts and toss with olive oil and minced garlic",
      "Spread sprouts on baking sheet and roast for 15 minutes",
      "Add cod fillets to the sheet, drizzle with lemon juice",
      "Sprinkle flaked almonds over everything",
      "Bake for another 12-15 minutes until cod is cooked through"
    ],
    nutrition: {
      calories: 380,
      protein: 35,
      carbs: 18,
      fats: 18,
      fiber: 7
    },
    tags: ["brain-food", "lean-protein", "antioxidants", "one-pot"],
    benefits: ["Brain-protecting nutrients", "High protein", "Antioxidant-rich"],
    suitableFor: ["study"]
  },
  {
    id: "walnut-blueberry-oats",
    name: "Walnut & Blueberry Steel-Cut Oats",
    description: "Power breakfast with walnuts and blueberries linked to slower cognitive decline.",
    cuisine: "american",
    category: "meal-prep",
    cookingTime: 15,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Walnut Blueberry Oatmeal brain food breakfast",
    sourceUrl: "https://minimalistbaker.com/the-perfect-bowl-of-oats/",
    ingredients: [
      { name: "Quick-cook steel-cut oats", amount: "100g", estimatedPrice: 0.60 },
      { name: "Walnuts", amount: "40g", estimatedPrice: 0.80 },
      { name: "Fresh blueberries", amount: "150g", estimatedPrice: 2.00 },
      { name: "Milk (dairy or plant)", amount: "400ml", estimatedPrice: 0.50 },
      { name: "Honey", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "Cinnamon", amount: "1 tsp", estimatedPrice: 0.10 }
    ],
    instructions: [
      "Bring milk to a boil in a saucepan",
      "Add oats and reduce heat to simmer",
      "Cook for 10-12 minutes, stirring occasionally",
      "Remove from heat and stir in honey and cinnamon",
      "Top with fresh blueberries and chopped walnuts",
      "Serve warm or prepare ahead for meal prep"
    ],
    nutrition: {
      calories: 420,
      protein: 14,
      carbs: 52,
      fats: 18,
      fiber: 8
    },
    tags: ["brain-food", "breakfast", "meal-prep", "antioxidants", "omega-3"],
    benefits: ["Slower cognitive decline", "Brain antioxidants", "Memory support"],
    suitableFor: ["study"]
  },
  {
    id: "turmeric-chicken-curry",
    name: "Turmeric Chicken Curry",
    description: "Golden curry with curcumin that increases Brain-Derived Neurotrophic Factor (BDNF) for brain growth.",
    cuisine: "indian",
    category: "one-pot",
    cookingTime: 45,
    servings: 4,
    difficulty: "medium",
    spiceLevel: "medium",
    authentic: true,
    imageQuery: "Turmeric Chicken Curry Indian brain food golden",
    sourceUrl: "https://www.recipetineats.com/golden-coconut-chicken-curry/",
    ingredients: [
      { name: "Chicken thighs", amount: "600g", estimatedPrice: 4.00 },
      { name: "Onions", amount: "2 medium", estimatedPrice: 0.60 },
      { name: "Turmeric powder", amount: "2 tbsp", estimatedPrice: 0.50 },
      { name: "Coconut milk", amount: "400ml tin", estimatedPrice: 1.00 },
      { name: "Garlic & ginger paste", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "Tomatoes (tinned)", amount: "400g", estimatedPrice: 0.50 },
      { name: "Curry powder", amount: "2 tsp", estimatedPrice: 0.30 },
      { name: "Fresh coriander", amount: "15g", estimatedPrice: 0.50 }
    ],
    instructions: [
      "Dice chicken thighs and finely chop onions",
      "Heat oil in large pot and sauté onions until soft",
      "Add garlic-ginger paste, turmeric, and curry powder, cook for 1 minute",
      "Add chicken and brown on all sides",
      "Pour in coconut milk and tinned tomatoes",
      "Simmer for 30 minutes until chicken is tender",
      "Garnish with fresh coriander and serve with rice"
    ],
    nutrition: {
      calories: 517,
      protein: 27,
      carbs: 16,
      fats: 42,
      fiber: 5
    },
    tags: ["brain-food", "curcumin", "BDNF", "curry", "one-pot"],
    benefits: ["Increases BDNF", "Neuroplasticity", "Anti-inflammatory"],
    suitableFor: ["study"]
  },
  {
    id: "overnight-oats-cacao-cherries",
    name: "Overnight Oats with Cacao & Cherries",
    description: "No-cook breakfast with cacao flavonoids that increase blood flow to the brain.",
    cuisine: "american",
    category: "meal-prep",
    cookingTime: 5,
    servings: 1,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Overnight Oats Cacao Cherries brain food breakfast",
    sourceUrl: "https://minimalistbaker.com/chocolate-overnight-oats/",
    ingredients: [
      { name: "Rolled oats", amount: "50g", estimatedPrice: 0.20 },
      { name: "Raw cacao powder", amount: "1 tbsp", estimatedPrice: 0.40 },
      { name: "Dried cherries", amount: "40g", estimatedPrice: 0.80 },
      { name: "Milk (dairy or plant)", amount: "200ml", estimatedPrice: 0.25 },
      { name: "Chia seeds", amount: "1 tbsp", estimatedPrice: 0.30 },
      { name: "Maple syrup", amount: "1 tbsp", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Combine oats, cacao powder, and chia seeds in a jar",
      "Add milk and maple syrup, stir well",
      "Chop dried cherries and mix in",
      "Cover and refrigerate overnight (or minimum 4 hours)",
      "Stir before eating, add extra milk if needed",
      "Top with extra cherries and cacao nibs if desired"
    ],
    nutrition: {
      calories: 371,
      protein: 12,
      carbs: 54,
      fats: 16,
      fiber: 11
    },
    tags: ["brain-food", "flavonoids", "no-cook", "meal-prep", "breakfast"],
    benefits: ["Increases brain blood flow", "Cognitive enhancement", "Antioxidants"],
    suitableFor: ["study"]
  },
  {
    id: "beetroot-goat-cheese-salad",
    name: "Warm Beetroot & Goat Cheese Salad",
    description: "Nitrate-rich beetroot improves blood flow to the frontal lobe, paired with creamy goat cheese.",
    cuisine: "mediterranean",
    category: "one-pot",
    cookingTime: 30,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Beetroot Goat Cheese Salad brain food healthy",
    sourceUrl: "https://www.recipetineats.com/rocket-aragula-beetroot-walnuts-feta-wbalsamic-dressing/",
    ingredients: [
      { name: "Fresh beetroot", amount: "400g", estimatedPrice: 1.20 },
      { name: "Goat cheese", amount: "100g", estimatedPrice: 2.00 },
      { name: "Mixed salad leaves", amount: "100g", estimatedPrice: 0.80 },
      { name: "Walnuts", amount: "40g", estimatedPrice: 0.80 },
      { name: "Balsamic vinegar", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "Olive oil", amount: "2 tbsp", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Peel and cube beetroot into 2cm pieces",
      "Roast beetroot at 200°C for 25 minutes until tender",
      "Arrange salad leaves on plates",
      "Add warm roasted beetroot",
      "Crumble goat cheese and sprinkle walnuts over",
      "Drizzle with balsamic vinegar and olive oil"
    ],
    nutrition: {
      calories: 340,
      protein: 14,
      carbs: 24,
      fats: 22,
      fiber: 6
    },
    tags: ["brain-food", "nitrates", "blood-flow", "salad", "vegetarian"],
    benefits: ["Frontal lobe blood flow", "Cognitive performance", "Nitrate-rich"],
    suitableFor: ["study"]
  },
  {
    id: "lamb-chops-rosemary",
    name: "Lamb Chops with Rosemary",
    description: "Tender lamb chops with rosemary - both the scent and compounds aid memory retention.",
    cuisine: "british",
    category: "one-pot",
    cookingTime: 20,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Lamb Chops Rosemary British brain food memory",
    sourceUrl: "https://www.recipetineats.com/lamb-chops-with-rosemary-gravy/",
    ingredients: [
      { name: "Lamb chops", amount: "4 pieces", estimatedPrice: 5.00 },
      { name: "Fresh rosemary", amount: "4 sprigs", estimatedPrice: 0.60 },
      { name: "Garlic", amount: "3 cloves", estimatedPrice: 0.30 },
      { name: "Olive oil", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "New potatoes", amount: "300g", estimatedPrice: 0.80 },
      { name: "Green beans", amount: "200g", estimatedPrice: 0.90 }
    ],
    instructions: [
      "Rub lamb chops with olive oil, minced garlic, and rosemary",
      "Season with salt and pepper, let marinate for 10 minutes",
      "Heat a large pan over high heat",
      "Sear lamb chops for 3-4 minutes each side for medium",
      "Meanwhile, boil potatoes and steam green beans",
      "Serve lamb with vegetables, garnish with fresh rosemary"
    ],
    nutrition: {
      calories: 415,
      protein: 34,
      carbs: 32,
      fats: 17,
      fiber: 5
    },
    tags: ["brain-food", "memory", "rosemary", "high-protein", "dinner"],
    benefits: ["Memory retention", "Rosemary aromatherapy", "Brain compounds"],
    suitableFor: ["study"]
  },
  {
    id: "eggplant-parmesan",
    name: "Eggplant Parmesan",
    description: "Italian comfort food with nasunin in eggplant skin that protects brain cell membranes.",
    cuisine: "italian",
    category: "one-pot",
    cookingTime: 45,
    servings: 4,
    difficulty: "medium",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Eggplant Parmesan Italian brain food healthy",
    sourceUrl: "https://www.recipetineats.com/eggplant-parmigiana/",
    ingredients: [
      { name: "Aubergines (eggplant)", amount: "2 large", estimatedPrice: 2.00 },
      { name: "Passata (tomato sauce)", amount: "500g", estimatedPrice: 1.00 },
      { name: "Mozzarella cheese", amount: "250g", estimatedPrice: 2.00 },
      { name: "Parmesan cheese", amount: "100g", estimatedPrice: 1.50 },
      { name: "Basil", amount: "20g", estimatedPrice: 0.60 },
      { name: "Breadcrumbs", amount: "100g", estimatedPrice: 0.40 },
      { name: "Garlic", amount: "3 cloves", estimatedPrice: 0.30 }
    ],
    instructions: [
      "Slice aubergines into 1cm rounds, salt and let sit for 15 minutes",
      "Rinse and pat dry, then coat in breadcrumbs",
      "Bake at 200°C for 20 minutes until golden",
      "In a baking dish, layer passata, aubergine, mozzarella, and parmesan",
      "Repeat layers, ending with cheese on top",
      "Bake for 25 minutes until bubbly, garnish with fresh basil"
    ],
    nutrition: {
      calories: 400,
      protein: 20,
      carbs: 30,
      fats: 22,
      fiber: 10
    },
    tags: ["brain-food", "nasunin", "Italian", "vegetarian", "comfort-food"],
    benefits: ["Protects brain cell membranes", "Antioxidants", "Neuroprotective"],
    suitableFor: ["study"]
  },
  {
    id: "seared-scallops",
    name: "Seared Scallops",
    description: "Luxurious scallops rich in Vitamin B12, vital for nerve health and cognitive function.",
    cuisine: "british",
    category: "one-pot",
    cookingTime: 15,
    servings: 2,
    difficulty: "medium",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Seared Scallops British seafood brain food elegant",
    sourceUrl: "https://downshiftology.com/recipes/pan-seared-scallops-lemon-garlic-butter/",
    ingredients: [
      { name: "Fresh scallops", amount: "8 large", estimatedPrice: 6.00 },
      { name: "Butter", amount: "30g", estimatedPrice: 0.30 },
      { name: "Garlic", amount: "2 cloves", estimatedPrice: 0.20 },
      { name: "Lemon", amount: "1 whole", estimatedPrice: 0.50 },
      { name: "Parsley", amount: "10g", estimatedPrice: 0.40 },
      { name: "Spinach", amount: "200g", estimatedPrice: 1.00 }
    ],
    instructions: [
      "Pat scallops completely dry with paper towels",
      "Heat a large pan over high heat until very hot",
      "Season scallops with salt and pepper",
      "Sear scallops for 2 minutes per side until golden crust forms",
      "Remove scallops, add butter, garlic, and spinach to pan",
      "Wilt spinach, return scallops, add lemon juice and parsley"
    ],
    nutrition: {
      calories: 280,
      protein: 24,
      carbs: 10,
      fats: 16,
      fiber: 3
    },
    tags: ["brain-food", "vitamin-B12", "seafood", "quick-dinner", "elegant"],
    benefits: ["Nerve health", "B12 for cognition", "Brain support"],
    suitableFor: ["study"]
  },
  {
    id: "chia-seed-pudding",
    name: "Chia Seed Pudding",
    description: "Creamy, no-cook pudding high in ALA Omega-3s for brain health.",
    cuisine: "american",
    category: "meal-prep",
    cookingTime: 5,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Chia Seed Pudding brain food omega-3 healthy breakfast",
    sourceUrl: "https://minimalistbaker.com/how-to-make-chia-pudding/",
    ingredients: [
      { name: "Chia seeds", amount: "60g", estimatedPrice: 1.20 },
      { name: "Almond milk", amount: "400ml", estimatedPrice: 1.00 },
      { name: "Honey or maple syrup", amount: "2 tbsp", estimatedPrice: 0.40 },
      { name: "Vanilla extract", amount: "1 tsp", estimatedPrice: 0.20 },
      { name: "Fresh berries", amount: "150g", estimatedPrice: 2.00 },
      { name: "Almonds (sliced)", amount: "30g", estimatedPrice: 0.60 }
    ],
    instructions: [
      "Mix chia seeds, almond milk, honey, and vanilla in a jar",
      "Stir well to prevent clumping",
      "Refrigerate for at least 4 hours or overnight",
      "Stir again before serving to break up any clumps",
      "Top with fresh berries and sliced almonds",
      "Enjoy cold as breakfast or snack"
    ],
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 38,
      fats: 16,
      fiber: 14
    },
    tags: ["brain-food", "omega-3", "ALA", "no-cook", "meal-prep"],
    benefits: ["High in ALA Omega-3s", "Brain health", "Anti-inflammatory"],
    suitableFor: ["study"]
  },
  {
    id: "avocado-hemp-toast",
    name: "Whole Grain Toast with Avocado & Hemp Seeds",
    description: "Simple, quick toast topped with healthy fats for sustained brain function.",
    cuisine: "american",
    category: "microwave",
    cookingTime: 5,
    servings: 1,
    difficulty: "easy",
    spiceLevel: "mild",
    authentic: true,
    imageQuery: "Avocado Toast Hemp Seeds brain food healthy breakfast",
    sourceUrl: "https://minimalistbaker.com/my-go-to-avocado-toast/",
    ingredients: [
      { name: "Wholegrain bread", amount: "2 slices", estimatedPrice: 0.30 },
      { name: "Avocado", amount: "1 medium", estimatedPrice: 1.20 },
      { name: "Hemp seeds", amount: "2 tbsp", estimatedPrice: 0.60 },
      { name: "Cherry tomatoes", amount: "50g", estimatedPrice: 0.30 },
      { name: "Lemon juice", amount: "1 tsp", estimatedPrice: 0.10 },
      { name: "Red pepper flakes", amount: "pinch", estimatedPrice: 0.05 }
    ],
    instructions: [
      "Toast wholegrain bread until golden",
      "Mash avocado with lemon juice and a pinch of salt",
      "Spread mashed avocado generously on toast",
      "Sprinkle hemp seeds over the top",
      "Add halved cherry tomatoes",
      "Finish with red pepper flakes and enjoy immediately"
    ],
    nutrition: {
      calories: 390,
      protein: 12,
      carbs: 32,
      fats: 24,
      fiber: 8
    },
    tags: ["brain-food", "healthy-fats", "omega-3", "quick-breakfast", "vegan"],
    benefits: ["Sustained brain function", "Healthy fats", "Omega-3s"],
    suitableFor: ["study"]
  },
  {
    id: "shakshuka",
    name: "Shakshuka (Eggs in Tomato Sauce)",
    description: "Middle Eastern one-pot dish with lycopene that fights oxidative stress in brain cells.",
    cuisine: "mediterranean",
    category: "one-pot",
    cookingTime: 30,
    servings: 2,
    difficulty: "easy",
    spiceLevel: "medium",
    authentic: true,
    imageQuery: "Shakshuka brain food Mediterranean eggs tomato",
    sourceUrl: "https://www.recipetineats.com/shakshuka-baked-eggs/",
    ingredients: [
      { name: "Tinned tomatoes", amount: "400g", estimatedPrice: 0.50 },
      { name: "Eggs", amount: "4 large", estimatedPrice: 0.80 },
      { name: "Red bell pepper", amount: "1 large", estimatedPrice: 0.80 },
      { name: "Onion", amount: "1 medium", estimatedPrice: 0.30 },
      { name: "Garlic", amount: "3 cloves", estimatedPrice: 0.30 },
      { name: "Cumin", amount: "1 tsp", estimatedPrice: 0.15 },
      { name: "Paprika", amount: "1 tsp", estimatedPrice: 0.15 },
      { name: "Fresh parsley", amount: "10g", estimatedPrice: 0.40 }
    ],
    instructions: [
      "Dice onion and bell pepper, mince garlic",
      "Sauté onion and pepper in a large pan until soft",
      "Add garlic, cumin, and paprika, cook for 1 minute",
      "Pour in tinned tomatoes, simmer for 15 minutes",
      "Make 4 wells in the sauce and crack an egg into each",
      "Cover and cook for 8-10 minutes until eggs are set",
      "Garnish with parsley and serve with crusty bread"
    ],
    nutrition: {
      calories: 354,
      protein: 14,
      carbs: 23,
      fats: 24,
      fiber: 4
    },
    tags: ["brain-food", "lycopene", "one-pot", "Mediterranean", "breakfast"],
    benefits: ["Fights oxidative stress", "Brain cell protection", "Antioxidants"],
    suitableFor: ["study"]
  }
];