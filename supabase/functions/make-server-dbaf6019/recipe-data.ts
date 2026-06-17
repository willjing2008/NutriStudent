// Auto-generated from allrecipes_clean.json
// This file is ONLY used for DB initialization via the /init-recipes endpoint

export interface NewRecipe {
  url: string;
  category: string;
  id: number;
  name: string;
  description: string;
  author: string;
  image: { url: string; alt: string };
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  total_time_minutes: number | null;
  servings: string;
  ingredients: string[];
  instructions: string[];
  nutrition_per_serving: {
    calories: number;
    total_fat_g: number;
    carbohydrates_g: number;
    fiber_g: number;
    sugar_g: number;
    protein_g: number;
    sodium_mg: number;
    cholesterol_mg: number;
    saturated_fat_g: number;
    unsaturated_fat_g: number;
  };
  rating: number;
  review_count: number;
  recipe_category: string;
  cuisine: string;
  meal_type: "work" | "fitness" | "study";
}

export const ALL_RECIPES: NewRecipe[] = [
  {
    "url": "https://www.allrecipes.com/recipe/37095/yogurt-parfait/",
    "category": "granola",
    "id": 37095,
    "name": "Yogurt Parfait",
    "description": "This yogurt parfait is made by simply layering vanilla yogurt, granola and fruit in a glass. A delicious and beautiful beginning to your day!",
    "author": "Natalie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/PIqxvUIl8Ccf1gJbETkLJyjz_w8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/407889-Yogurt-Parfait-Alberta-Rose-4x3-1-73a635ff9d0e47608a138aa9eac518ed.jpg",
      "alt": "Yogurt Parfait"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "2",
    "ingredients": [
      "2 cups vanilla yogurt",
      "1 cup granola",
      "8 blackberries"
    ],
    "instructions": [
      "Layer 1 cup yogurt, 1/2 cup granola, and 4 blackberries in a large glass; repeat layers."
    ],
    "nutrition_per_serving": {
      "calories": 515,
      "total_fat_g": 18.0,
      "carbohydrates_g": 68.0,
      "fiber_g": 7.0,
      "sugar_g": 47.0,
      "protein_g": 21.0,
      "sodium_mg": 177,
      "cholesterol_mg": 12,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 73,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/246106/classic-chicken-caesar-salad/",
    "category": "green-salads",
    "id": 246106,
    "name": "Classic Chicken Caesar Salad",
    "description": "This chicken Caesar salad is delicious and satisfying with crunchy romaine, juicy chicken, seasoned croutons, rich Parmesan, and a creamy bottled dressing.",
    "author": "Cracker Barrel",
    "image": {
      "url": "https://www.allrecipes.com/thmb/YklaDZF1zj7z4bU8Q28mYFryr5g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3186344-9400cb8415144a2db2660cd6762c8cde.jpg",
      "alt": "Classic Chicken Caesar Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "4",
    "ingredients": [
      "6 cups tightly packed chopped romaine lettuce",
      "1 pound cooked boneless skinless chicken breasts, cut into strips",
      "0.5 cup CRACKER BARREL Finely Shredded 100% Parmesan Cheese",
      "0.5 cup seasoned croutons",
      "0.25 cup KRAFT Creamy Caesar Dressing"
    ],
    "instructions": [
      "Arrange lettuce on four serving plates. Top with chicken, Parmesan, and croutons, then drizzle with dressing."
    ],
    "nutrition_per_serving": {
      "calories": 333,
      "total_fat_g": 17.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 36.0,
      "sodium_mg": 385,
      "cholesterol_mg": 90,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 19,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/33129/corned-beef-hash/",
    "category": "breakfast-potatoes",
    "id": 33129,
    "name": "Corned Beef Hash",
    "description": "This corned beef hash with potatoes is prepared in one skillet with leftover or canned corned beef for a quick and filling breakfast with eggs.",
    "author": "Jodi McRobb",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ep9bIvKCRR1NYN4E9H4qznCF6qE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-33129-corned-beef-hash-VAT-step-03-2noegg-e394299aaecf47b48ac6fce1afabf4dc.jpg",
      "alt": "Corned Beef Hash"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "6 large potatoes, peeled and diced",
      "1 (12 ounce) can corned beef, cut into chunks",
      "1 medium onion, chopped",
      "1 cup beef broth"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Combine potatoes, corned beef, onion, and broth in a large, deep skillet over medium heat. Cover and simmer until potatoes are soft enough to mash and liquid is almost gone.",
      "Mix well and serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 434,
      "total_fat_g": 9.0,
      "carbohydrates_g": 66.0,
      "fiber_g": 8.0,
      "sugar_g": 4.0,
      "protein_g": 23.0,
      "sodium_mg": 718,
      "cholesterol_mg": 48,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 241,
    "recipe_category": "Breakfast",
    "cuisine": "English",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/12905/super-easy-chicken-noodle-soup/",
    "category": "chicken-noodle-soups",
    "id": 12905,
    "name": "Super Easy Chicken Noodle Soup",
    "description": "This chicken noodle soup with bouillon cubes, tender pieces of chicken, and thin egg noodles is incredibly quick and easy to prepare for a comforting meal.",
    "author": "lori",
    "image": {
      "url": "https://www.allrecipes.com/thmb/lpYjX0iX2t79CklGRGyBsVIxvGA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/12905super-easy-chicken-noodle-soupSoupLovingNicole4x3-d27c31c93a1241ed9656764035efd2f4.jpg",
      "alt": "Super Easy Chicken Noodle Soup"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "8 cups water",
      "1 pound boneless, skinless chicken meat",
      "4 cubes chicken bouillon",
      "2 cups thin egg noodles"
    ],
    "instructions": [
      "Measure water into a large pot. Add chicken and bouillon; bring to a boil. Cook until chicken is no longer pink in the center and the juices run clear. An instant-read thermometer inserted into the center of chicken should read at least 165 degrees F (74 degrees C).",
      "Remove chicken from broth. Chop into small pieces, then return meat to the pot.",
      "Add egg noodles and cook until tender."
    ],
    "nutrition_per_serving": {
      "calories": 294,
      "total_fat_g": 14.0,
      "carbohydrates_g": 15.0,
      "fiber_g": 1.0,
      "sugar_g": 0.0,
      "protein_g": 26.0,
      "sodium_mg": 1230,
      "cholesterol_mg": 93,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 83,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241673/corned-beef-special-sandwiches/",
    "category": "corned-beef",
    "id": 241673,
    "name": "Corned Beef Special Sandwiches",
    "description": "You\u2019ll love this corned beef sandwich recipe if you're a fan of Reuben. Served on untoasted rye bread, this sandwich uses coleslaw instead of sauerkraut.",
    "author": "SHORECOOK",
    "image": {
      "url": "https://www.allrecipes.com/thmb/UFONMJwB0tWwba_kjQWmrCBUmfY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2158467-5140b6268bf0493facb079b2d2624659.jpg",
      "alt": "Corned Beef Special Sandwiches"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "4",
    "ingredients": [
      "0.33333334326744 cup Russian salad dressing",
      "8 slices Jewish rye bread",
      "1 pound thin-sliced corned beef",
      "0.5 pound prepared coleslaw"
    ],
    "instructions": [
      "Spread 1/4 of the Russian salad dressing onto one side of each of four bread slices. Top each with 4 ounces corned beef, 2 ounces coleslaw, and remaining bread slices. Cut each sandwich in half diagonally and serve."
    ],
    "nutrition_per_serving": {
      "calories": 557,
      "total_fat_g": 35.0,
      "carbohydrates_g": 35.0,
      "fiber_g": 4.0,
      "sugar_g": 11.0,
      "protein_g": 25.0,
      "sodium_mg": 1715,
      "cholesterol_mg": 116,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 12,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/160708/strawberry-banana-protein-smoothie/",
    "category": "high-fiber",
    "id": 160708,
    "name": "Strawberry Banana Protein Smoothie",
    "description": "This balanced strawberry banana protein smoothie is easy to make with banana, strawberries, almonds, and protein powder; great for after a workout.",
    "author": "cookiequeen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OO3ZPO_khw2J0PLTojgOY6bM4T8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/404644-strawberry-banana-protein-smoothie-Alberta-Rose-4x3-1-8c15bbb36b964fe3a3fda4a52f5cd546.jpg",
      "alt": "Strawberry Banana Protein Smoothie"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "1.25 cups sliced fresh strawberries",
      "1 banana",
      "10 whole almonds",
      "2 tablespoons water",
      "1 cup ice cubes",
      "3 tablespoons chocolate flavored protein powder"
    ],
    "instructions": [
      "Place strawberries, banana, almonds, and water into a blender; blend to combine. Add ice cubes and puree until smooth. Add protein powder and mix until evenly incorporated, about 30 seconds."
    ],
    "nutrition_per_serving": {
      "calories": 349,
      "total_fat_g": 8.0,
      "carbohydrates_g": 53.0,
      "fiber_g": 10.0,
      "sugar_g": 25.0,
      "protein_g": 21.0,
      "sodium_mg": 195,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 64,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/286357/air-fryer-hamburger-patties/",
    "category": "burgers",
    "id": 286357,
    "name": "Air Fryer Hamburgers",
    "description": "Air fryer hamburgers are impossibly juicy and ready in just 20 minutes. Use your air fryer to cook hamburger patties when it's too cold to grill outside.",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/r2U0ddgVg2Z5ZxM5eYcyEMIs1e0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9447681-d7768711b16a49bdaca02c6be0d3007d.jpg",
      "alt": "Air Fryer Hamburgers"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 pound 80% lean ground beef",
      "2 tablespoons melted butter",
      "1 tablespoon beef base (such as Better than Bouillon\u00ae)",
      "freshly ground black pepper to taste"
    ],
    "instructions": [
      "Preheat an air fryer to 400 degrees F (195 degrees C).",
      "Form beef into 4 patties, approximately 3/4 inches thick and 4 1/2 inches in diameter. Make the patties slightly bigger than the buns to allow for shrinkage.",
      "Whisk together warm melted butter and beef soup base in a small bowl. Brush lightly onto both sides of patties and season with pepper. Set patties into the air fryer basket. Depending on the size of your air fryer, you may need to cook them in batches.",
      "Air-fry patties for 7 minutes, flipping halfway through, for medium doneness. For well done, air-fry for an additional 2 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 279,
      "total_fat_g": 20.0,
      "carbohydrates_g": 0,
      "fiber_g": 0,
      "sugar_g": 0,
      "protein_g": 23.0,
      "sodium_mg": 871,
      "cholesterol_mg": 94,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 36,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/219431/parmesan-crusted-chicken/",
    "category": "chicken-parmesan",
    "id": 219431,
    "name": "Parmesan Crusted Chicken",
    "description": "This Parmesan-crusted chicken with mayo is the simplest and most savory way to dress up chicken breasts for a tasty supper that's ready in 30 minutes!",
    "author": "Hellmann's",
    "image": {
      "url": "https://www.allrecipes.com/thmb/zU1MZwoeFz8xMtFTToQpP0fd3AA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-219431-parmesan-crusted-chicken-DDMFS-4x3-Beauty-8c1ce965914c416c8f59480ec8a26b71.jpg",
      "alt": "Parmesan Crusted Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "0.5 cup Hellmann's\u00ae or Best Foods\u00ae Real Mayonnaise",
      "0.25 cup grated Parmesan cheese",
      "4 (5 ounce) boneless, skinless chicken breast halves",
      "4 teaspoons Italian seasoned dry bread crumbs"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 425 degrees F (220 degrees C).",
      "Mix mayonnaise and Parmesan cheese together in a medium bowl until well combined.",
      "Arrange chicken breasts on a baking sheet. Evenly top with mayonnaise mixture, then sprinkle with bread crumbs to coat.",
      "Bake in the preheated oven until golden on top and chicken is cooked through, about 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 400,
      "total_fat_g": 28.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 32.0,
      "sodium_mg": 374,
      "cholesterol_mg": 96,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 363,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/229099/breaded-parmesan-ranch-chicken/",
    "category": "chicken-parmesan",
    "id": 229099,
    "name": "Breaded Parmesan Ranch Chicken",
    "description": "Parmesan ranch chicken is ready in under an hour with just five simple ingredients.",
    "author": "Trish McQuhae",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IxOHriuBVdFknDtxK6nn3Ae77VY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4577034-breaded-parmesan-ranch-chicken-gnomeygoose-1x1-1-b07bde2038764f6f8091ddb064e2f80f.jpg",
      "alt": "Breaded Parmesan Ranch Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 45,
    "total_time_minutes": 55,
    "servings": "8",
    "ingredients": [
      "0.75 cup crushed corn flakes",
      "0.75 cup grated Parmesan cheese",
      "1 (1 ounce) envelope ranch salad dressing mix",
      "8 (4 ounce) skinless, boneless chicken breast halves",
      "0.5 cup butter, melted"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.",
      "Combine corn flakes, Parmesan cheese, and ranch dressing mix in a bowl. Dip chicken in melted butter; roll each chicken breast in corn flake mixture until evenly coated. Place coated chicken in the prepared baking dish.",
      "Bake in the preheated oven until chicken is no longer pink in the center and the juices run clear, about 45 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 278,
      "total_fat_g": 16.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 27.0,
      "sodium_mg": 517,
      "cholesterol_mg": 102,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 346,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/80388/lemon-rosemary-salmon/",
    "category": "cooking-for-one",
    "id": 80388,
    "name": "Lemon-Rosemary Salmon",
    "description": "An easy yet impressive rosemary and lemon salmon, baked with bright, savory flavors. This dish works as a weeknight meal or special occasion dinner.",
    "author": "CHEDDAR97005",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jtP8DYeAjk6JDOwoqTfgKI9N2eE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/693200-lemon-rosemary-salmon-Allison-TX-4x3-1-f4f326f735cf4ba19660b6bafe259c57.jpg",
      "alt": "Lemon-Rosemary Salmon"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "1 lemon, thinly sliced",
      "4 sprigs fresh rosemary",
      "2 salmon fillets, bones and skin removed",
      "coarse salt to taste",
      "1 tablespoon olive oil, or as needed"
    ],
    "instructions": [
      "Preheat the oven to 450 degrees F (250 degrees C).",
      "Arrange half the lemon slices in a single layer in a baking dish. Layer with 2 sprigs rosemary, and top with salmon fillets. Sprinkle salmon with salt, layer with remaining rosemary sprigs, and top with remaining lemon slices. Drizzle with olive oil.",
      "Bake in the preheated oven until fish is easily flaked with a fork, 12 to 15 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 257,
      "total_fat_g": 18.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 21.0,
      "sodium_mg": 1017,
      "cholesterol_mg": 56,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 423,
    "recipe_category": "Dinner",
    "cuisine": "U.S.",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/258968/scrambled-eggs-with-chorizo/",
    "category": "cooking-for-one",
    "id": 258968,
    "name": "Scrambled Eggs with Chorizo",
    "description": "This chorizo and egg recipe is a quick, easy, flavorful scramble with spicy sausage that's perfect when you're looking for a no-cheese breakfast dish.",
    "author": "cupcake_sweetie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/fDwX7kV5gyQV56TaMzYhFG8LU4M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6187714-scrambled-eggs-with-chorizo-MangoPickle-4x3-1-678f45d37cc14cffb8b165128cb20c82.jpg",
      "alt": "Scrambled Eggs with Chorizo"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "2",
    "ingredients": [
      "cooking spray",
      "0.25 cup Mexican-style chorizo, or more to taste",
      "6 large eggs",
      "salt to taste"
    ],
    "instructions": [
      "Grease a large nonstick skillet with cooking spray; warm over medium-high heat. Cook and stir chorizo in the hot skillet until browned, about 5 minutes.",
      "Whisk together eggs and salt in a medium bowl until combined; pour over chorizo in the skillet; cook and stir until eggs are set, about 5 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 232,
      "total_fat_g": 16.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 0,
      "sugar_g": 1.0,
      "protein_g": 20.0,
      "sodium_mg": 331,
      "cholesterol_mg": 561,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 36,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/255305/simple-chicken-mayo-with-parmesan-and-bread-crumbs/",
    "category": "cooking-for-two",
    "id": 255305,
    "name": "Simple Chicken Mayo with Parmesan and Bread Crumbs",
    "description": "This chicken breast recipe with mayonnaise, Parmesan cheese, bread crumbs, and herbs is incredibly juicy and delicious, plus quick and easy to make!",
    "author": "EmmieYum",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mTRtvp7iURQiJd0V3sy-4mSlrFs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/255305simple-chicken-mayo-with-parmesan-and-bread-crumbsChefMo4x3-87eb261a5087425c8664db84dc3d4952.jpg",
      "alt": "Simple Chicken Mayo with Parmesan and Bread Crumbs"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "2",
    "ingredients": [
      "2 skinless, boneless chicken breasts",
      "2.5 tablespoons grated Parmesan cheese",
      "2 tablespoons mayonnaise, or more to taste",
      "2 tablespoons bread crumbs, or more to taste",
      "1.5 teaspoons herbes de Provence"
    ],
    "instructions": [
      "Preheat the oven to 425 degrees F (220 degrees C). Place chicken breasts in a baking pan.",
      "Mix Parmesan cheese and mayonnaise together in a bowl until well combined; spread evenly over chicken breasts. Coat with bread crumbs and sprinkle with herbes de Provence.",
      "Bake in the preheated oven until chicken breasts are no longer pink in the center and the juices run clear, 20 to 25 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 272,
      "total_fat_g": 16.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 26.0,
      "sodium_mg": 273,
      "cholesterol_mg": 72,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 146,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/83569/tuna-egg-sandwich/",
    "category": "cooking-for-two",
    "id": 83569,
    "name": "Tuna Egg Sandwich",
    "description": "This tuna salad with egg recipe is perfect for a satisfying sandwich. It's simple to make with canned tuna, hard-cooked eggs, mayo, and celery.",
    "author": "LISALC98",
    "image": {
      "url": "https://www.allrecipes.com/thmb/59Zl5aj3tLORlvbb1R3KnBHl5ZA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/83569-tuna-egg-salad-sandwich-mfs-4-099850f40fd143e79b215b6977a30feb.jpg",
      "alt": "Tuna Egg Sandwich"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "2",
    "ingredients": [
      "3 hard-cooked eggs, peeled and chopped",
      "1 (5 ounce) can tuna, drained",
      "1 cup chopped celery",
      "1 tablespoon mayonnaise",
      "salt and pepper to taste",
      "4 slices whole wheat bread"
    ],
    "instructions": [
      "Combine eggs, tuna, celery, and mayonnaise in a medium bowl. Season with salt and pepper to taste.",
      "Divide tuna mixture evenly onto two slices of bread; top with remaining slices of bread."
    ],
    "nutrition_per_serving": {
      "calories": 420,
      "total_fat_g": 17.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 5.0,
      "sugar_g": 5.0,
      "protein_g": 35.0,
      "sodium_mg": 777,
      "cholesterol_mg": 312,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 80,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/274968/taco-lettuce-wraps/",
    "category": "ground-turkey",
    "id": 274968,
    "name": "Taco Lettuce Wraps",
    "description": "These lettuce tacos with spicy ground turkey, black beans, tomatoes, and corn are quick and easy to make for a tasty but lean option on Taco Tuesday.",
    "author": "Kristina72913",
    "image": {
      "url": "https://www.allrecipes.com/thmb/p-BDOt-xRaZo-BchqJgZJd9IkzE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5013718-06c1e3422d26495eb54d9ccf79bfbccb.jpg",
      "alt": "Taco Lettuce Wraps"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "1 pound ground turkey",
      "1 (16 ounce) package frozen corn",
      "1 (15 ounce) can black beans, rinsed and drained",
      "1 (14.5 ounce) can diced tomatoes",
      "1 (1 ounce) package taco seasoning mix",
      "romaine leaves, rinsed and dried"
    ],
    "instructions": [
      "Heat a large nonstick skillet over medium-high heat. Cook and stir ground turkey in the hot skillet until browned and crumbly, 5 to 7 minutes. Stir in corn, black beans, diced tomatoes, and taco seasoning. Bring to a simmer and cook until heated through, 10 to 12 minutes.",
      "Lay lettuce leaves on a flat surface and fill with turkey and bean mixture."
    ],
    "nutrition_per_serving": {
      "calories": 275,
      "total_fat_g": 7.0,
      "carbohydrates_g": 33.0,
      "fiber_g": 8.0,
      "sugar_g": 5.0,
      "protein_g": 22.0,
      "sodium_mg": 770,
      "cholesterol_mg": 56,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 32,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/260193/instant-pot-salsa-chicken/",
    "category": "instant-pot",
    "id": 260193,
    "name": "Instant Pot Salsa Chicken",
    "description": "This salsa chicken Instant Pot recipe uses frozen chicken breasts rubbed with taco seasoning, then cooked in salsa and broth for an easy Tex-Mex meal.",
    "author": "Tammy Lynn",
    "image": {
      "url": "https://www.allrecipes.com/thmb/GbjAlcfOP2VPhxRSC6NW39GguxE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4604057-instant-pot-salsa-chicken-Buckwheat-Queen-1x1-1-6f508c5da1074fcaa3a12c2e1ecb1b01.jpg",
      "alt": "Instant Pot Salsa Chicken"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 25,
    "total_time_minutes": 50,
    "servings": "2",
    "ingredients": [
      "1 pound frozen skinless, boneless chicken breast halves",
      "1 (1 ounce) packet taco seasoning mix",
      "0.5 cup salsa",
      "0.5 cup low-sodium chicken broth"
    ],
    "instructions": [
      "Place chicken breasts in a multi-functional cooker (such as Instant Pot). Sprinkle all sides with taco seasoning. Pour salsa and chicken broth on top.",
      "Close and lock the lid. Select Poultry setting; set the timer for 15 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure using the natural-release method according to manufacturer's instructions, about 20 minutes. Unlock and remove the lid.",
      "Shred chicken and serve as desired."
    ],
    "nutrition_per_serving": {
      "calories": 300,
      "total_fat_g": 5.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 1.0,
      "sugar_g": 5.0,
      "protein_g": 46.0,
      "sodium_mg": 1546,
      "cholesterol_mg": 118,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 193,
    "recipe_category": "Dinner",
    "cuisine": "Tex Mex",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/263512/instant-pot-steel-cut-oats/",
    "category": "instant-pot",
    "id": 263512,
    "name": "Instant Pot Steel-Cut Oats",
    "description": "Make steel-cut oats in an Instant Pot with this delicious recipe that has the perfect oat-to-water ratio for a chewy, nutty, nutritious breakfast.",
    "author": "MoMosGoGo",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nvX2ZrnQHpfSCBBmc5PTCWBlHEI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/263512-ddmfs-instant-pot-steel-cut-oats-3X4-2044-5ca39f404f6042d29321fa061aae0ce7.jpg",
      "alt": "Instant Pot Steel-Cut Oats"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "2",
    "ingredients": [
      "3 cups water",
      "1 cup steel-cut oats"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Combine water and oats in a multi-functional pressure cooker (such as Instant Pot). Close and lock the lid. Select high pressure according to manufacturer's instructions; set timer for 3 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure using the natural-release method according to manufacturer's instructions, 10 to 40 minutes. Oats will thicken as they cool."
    ],
    "nutrition_per_serving": {
      "calories": 300,
      "total_fat_g": 5.0,
      "carbohydrates_g": 54.0,
      "fiber_g": 8.0,
      "sugar_g": 2.0,
      "protein_g": 10.0,
      "sodium_mg": 11,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 30,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/222171/easy-parmesan-crusted-chicken/",
    "category": "chicken-parmesan",
    "id": 222171,
    "name": "Easy Parmesan-Crusted Chicken",
    "description": "Try this Parmesan-crusted chicken recipe for juicy, tender chicken breasts coated in a mixture of Parmesan cheese and seasoned bread crumbs.",
    "author": "Hellmann's",
    "image": {
      "url": "https://www.allrecipes.com/thmb/wNz05Z-fA5sprOWEcjtNDxIlFbs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/222171-easy-parmesan-crusted-chicken-DDMFS-4x3-2961-8a1b3eba9f9e434184790bd29accd2f9.jpg",
      "alt": "Easy Parmesan-Crusted Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "0.5 cup Hellmann's\u00ae Real Mayonnaise",
      "0.25 cup grated Parmesan cheese",
      "4 (5 ounce) boneless, skinless chicken breast halves",
      "4 teaspoons Italian-seasoned dry bread crumbs"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 425 degrees F (220 degrees C). Line a rimmed baking sheet with parchment paper.",
      "Mix mayonnaise and Parmesan together in a medium bowl until well combined.",
      "Arrange chicken on the prepared baking sheet. Spread mayonnaise mixture over top, then top with bread crumbs.",
      "Cook in the preheated oven until chicken is no longer pink in the center and the juices run clear, about 20 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 367,
      "total_fat_g": 23.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 35.0,
      "sodium_mg": 384,
      "cholesterol_mg": 97,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 314,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/9011/simple-lemon-herb-chicken/",
    "category": "cooking-for-one",
    "id": 9011,
    "name": "Simple Lemon Herb Chicken",
    "description": "This lemon herb chicken is a quick and easy main dish of juicy chicken breasts flavored with lemon, oregano, and parsley\u2014ready in just 15 minutes.",
    "author": "Carolyn Stilwell",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-UKM4NTWBZnLnkeOCh7ESmeTOcI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simple-Lemon-Herb-Chicken-2000-610e2f2a1e9a4ba292d775e72f3dc888.jpg",
      "alt": "Simple Lemon Herb Chicken"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "2",
    "ingredients": [
      "2 (5 ounce) skinless, boneless chicken breast halves",
      "1 medium lemon, juiced, divided",
      "salt to taste",
      "1 tablespoon olive oil",
      "1 pinch dried oregano",
      "2 sprigs fresh parsley, for garnish"
    ],
    "instructions": [
      "Place chicken in a bowl; pour 1/2 of the lemon juice over chicken and season with salt.",
      "Heat olive oil in a medium skillet over medium-low heat. Place chicken into hot oil. Add remaining lemon juice and oregano; season with black pepper. Cook chicken until golden brown and the juices run clear, 5 to 10 minutes per side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
      "Garnish chicken with parsley to serve."
    ],
    "nutrition_per_serving": {
      "calories": 264,
      "total_fat_g": 11.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 37.0,
      "sodium_mg": 91,
      "cholesterol_mg": 102,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 300,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/269616/easy-no-mess-baked-salmon/",
    "category": "cooking-for-one",
    "id": 269616,
    "name": "Easy, No-Mess Baked Salmon",
    "description": "Baking salmon in aluminum foil cuts down on cleanup in this easy recipe that could work for both casual and formal dinners.",
    "author": "N Adams",
    "image": {
      "url": "https://www.allrecipes.com/thmb/A2SuKMWK1Q2ij4svujjOTVU7IOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7852427-7b0f66b41fc34c22b54fc009281b81ef.jpg",
      "alt": "Easy, No-Mess Baked Salmon"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "0.5 pound boneless salmon fillet",
      "1 tablespoon olive oil",
      "1 tablespoon balsamic vinegar",
      "1 tablespoon lemon pepper seasoning",
      "1 teaspoon lemon juice",
      "0.25 teaspoon salt"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Lay salmon fillet skin-side down on a wide piece of aluminum foil.",
      "Drizzle olive oil and balsamic vinegar over salmon. Sprinkle lemon pepper, lemon juice, and salt on top. Fold foil up and over the fillet, tenting it at the top. Roll top down to seal salmon in foil. Transfer to a baking sheet.",
      "Bake in the preheated oven until salmon flakes easily with a fork, about 15 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 251,
      "total_fat_g": 18.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 2.0,
      "protein_g": 20.0,
      "sodium_mg": 1039,
      "cholesterol_mg": 56,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 27,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/218562/super-easy-chicken-and-dumplings/",
    "category": "dumplings",
    "id": 218562,
    "name": "Super Easy Chicken and Dumplings",
    "description": "This hearty chicken and dumplings soup could not be simpler to make in one pot with easy ingredients for a comforting meal that tastes great!",
    "author": "ALLIE101",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DjIUlrazrP_4S2xnZ9bXc35csts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/218562-Super-Easy-Chicken-Dumplings-DDMFS-3x4-0647-66859426562849a89d4d7d20c47fd533.jpg",
      "alt": "Super Easy Chicken and Dumplings"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "8",
    "ingredients": [
      "2 (10.5 ounce) cans condensed cream of chicken soup",
      "3 (14 ounce) cans chicken broth",
      "3 cups shredded cooked chicken meat",
      "2 (10 ounce) cans refrigerated biscuit dough"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Stir condensed soup, chicken broth, and shredded chicken together in a large saucepan over medium-high heat until it begins to simmer.",
      "Cut each biscuit into quarters, and gently stir into the simmering soup.",
      "Reduce heat to medium-low, cover, and simmer until biscuits are no longer doughy in the center, 10 to 15 minutes.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 400,
      "total_fat_g": 18.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 1.0,
      "sugar_g": 6.0,
      "protein_g": 22.0,
      "sodium_mg": 1924,
      "cholesterol_mg": 50,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 421,
    "recipe_category": "Dinner",
    "cuisine": "Southern",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/86649/fast-english-muffin-pizzas/",
    "category": "Pizza",
    "id": 86649,
    "name": "Fast English Muffin Pizzas",
    "description": "This English muffin pizza recipe uses your favorite pizza sauce, cheese, and pepperoni to make a quick savory snack or kid-friendly anytime meal!",
    "author": "RHONDA35",
    "image": {
      "url": "https://www.allrecipes.com/thmb/1aEA7jAi1wXGZhzDzx3xETWJC60=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-86649-Fast-English-Muffin-Pizzas-DDMFS-4x3-450f2134f10849f3b2f957109c1d7427.jpg",
      "alt": "Fast English Muffin Pizzas"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "4 English muffins, split",
      "0.5 cup canned pizza sauce",
      "2 cups shredded mozzarella cheese",
      "16 slices pepperoni sausage"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 375 degrees F (190 degrees C).",
      "Arrange the English muffin halves cut-side up on a baking sheet.",
      "Spread pizza sauce evenly on top of each one.",
      "Sprinkle with mozzarella cheese and top with pepperoni slices.",
      "Bake in the preheated oven until cheese is melted and browned on the edges, about 10 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 327,
      "total_fat_g": 14.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 21.0,
      "sodium_mg": 839,
      "cholesterol_mg": 45,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 338,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235158/worlds-best-honey-garlic-pork-chops/",
    "category": "Pork-Chops",
    "id": 235158,
    "name": "World's Best Honey Garlic Pork Chops",
    "description": "These glazed honey garlic pork chops are quick and simple to cook on the grill in less than 30 minutes for a mouth-watering meal.",
    "author": "John Chandler",
    "image": {
      "url": "https://www.allrecipes.com/thmb/xijdHGCdDvaDbX0cZioCuboPPX4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235158-worlds-best-honey-garlic-pork-chops-DDMFS-4x3-6d16c2884cdd407eb8e1e2f494791542.jpg",
      "alt": "World's Best Honey Garlic Pork Chops"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "0.5 cup ketchup",
      "2.6666667461395 tablespoons honey",
      "2 tablespoons low-sodium soy sauce",
      "2 cloves garlic, crushed",
      "6 (4 ounce) (1-inch thick) pork chops"
    ],
    "instructions": [
      "Preheat grill for medium heat and lightly oil the grate. Gather ingredients.",
      "Whisk ketchup, honey, soy sauce, and garlic together in a bowl to make a glaze.",
      "Sear the pork chops on both sides on the preheated grill. Lightly brush glaze onto each side of the chops as they cook; grill until no longer pink in the center, about 7 to 9 minutes per side. An instant-read thermometer inserted into the center should read 145 degrees F (63 degrees C).",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 291,
      "total_fat_g": 13.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 0.0,
      "sugar_g": 12.0,
      "protein_g": 30.0,
      "sodium_mg": 421,
      "cholesterol_mg": 95,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 715,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/24156/potato-skillet/",
    "category": "breakfast-potatoes",
    "id": 24156,
    "name": "Potato Skillet",
    "description": "Good old-fashioned fried potatoes and bacon topped with melted cheese.",
    "author": "LaDonna",
    "image": {
      "url": "https://www.allrecipes.com/thmb/M92hIaUHFTjTost9E6M4LJH0fak=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4519011-ffc4a2f6c1d94c28bb79161587f798eb.jpg",
      "alt": "Potato Skillet"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "2",
    "ingredients": [
      "4 slices bacon",
      "2 peeled and diced potatoes",
      "0.125 teaspoon garlic salt",
      "0.125 teaspoon seasoning salt",
      "0.125 teaspoon black pepper",
      "3 eggs, beaten",
      "0.25 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Place bacon in a large, deep skillet. Cook over medium-high heat until evenly brown. Remove bacon slices, reserving grease. Crumble bacon and set aside.",
      "Add potatoes to bacon grease and season with garlic salt, seasoned salt and black pepper. Cook until potatoes are soft.",
      "When potatoes are tender, add crumbled bacon. Pour eggs over potatoes and cook until firm. Spread with cheese and cover with lid until melted."
    ],
    "nutrition_per_serving": {
      "calories": 485,
      "total_fat_g": 37.0,
      "carbohydrates_g": 16.0,
      "fiber_g": 3.0,
      "sugar_g": 1.0,
      "protein_g": 21.0,
      "sodium_mg": 837,
      "cholesterol_mg": 332,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 384,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/20040/seasoned-turkey-burgers/",
    "category": "burgers",
    "id": 20040,
    "name": "Seasoned Turkey Burgers",
    "description": "Homemade turkey burger seasoning made with garlic, pepper, and soy sauce makes the best turkey burgers. Easy to make and great for grilling seasoning.",
    "author": "Kym 22",
    "image": {
      "url": "https://www.allrecipes.com/thmb/4DsccJv-7Vg9PIj1qeJ9aGjTpvA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20040seasoned-turkey-burgersFranceC4x3-4bf123d7bb744b3f895afe4ca2fd99e7.jpg",
      "alt": "Seasoned Turkey Burgers"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "1.5 pounds ground turkey",
      "1 large egg, lightly beaten",
      "1 (1 ounce) package dry onion soup mix",
      "1.5 tablespoons soy sauce",
      "0.5 teaspoon ground black pepper",
      "0.5 teaspoon garlic powder",
      "6 hamburger buns, split"
    ],
    "instructions": [
      "Mix turkey, egg, onion soup mix, soy sauce, pepper, and garlic powder in a large bowl until well combined; refrigerate mixture for about 10 minutes, then form into 6 equal-sized patties.",
      "Preheat an outdoor grill for medium-high heat and lightly oil the grate.",
      "Cook turkey burgers on the preheated grill, turning once, until no longer pink in the center and the juices run clear, about 20 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C). Serve on buns."
    ],
    "nutrition_per_serving": {
      "calories": 315,
      "total_fat_g": 11.0,
      "carbohydrates_g": 25.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 28.0,
      "sodium_mg": 920,
      "cholesterol_mg": 115,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 690,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/257967/easy-chilaquiles/",
    "category": "chilaquiles",
    "id": 257967,
    "name": "Easy Chilaquiles",
    "description": "Here's a quick and easy version of chilaquiles with tortilla pieces, whisked eggs, green taco sauce, and shredded Monterey Jack cheese.",
    "author": "Christina Bleeker",
    "image": {
      "url": "https://www.allrecipes.com/thmb/lwlU4xicADWr6O_k1LXdBbjlTuM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7683722-56e1241ce3ef480b83a77caab136382a.jpg",
      "alt": "Easy Chilaquiles"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 9,
    "total_time_minutes": 19,
    "servings": "4",
    "ingredients": [
      "8 (6 inch) corn tortillas, cut into 2-inch pieces",
      "5 tablespoons vegetable oil",
      "8 eggs, beaten",
      "salt and ground black pepper to taste",
      "0.5 cup green taco sauce",
      "1 cup shredded Monterey Jack cheese"
    ],
    "instructions": [
      "Heat oil in a skillet over medium-high heat. Add tortilla pieces to oil and fry until crisp, about 5 minutes.",
      "Pour beaten eggs over the tortilla pieces in the skillet. Season with salt and pepper. Cook, stirring occasionally, until eggs have set, about 4 minutes. Remove from heat. Top with taco sauce and Monterey Jack cheese."
    ],
    "nutrition_per_serving": {
      "calories": 505,
      "total_fat_g": 36.0,
      "carbohydrates_g": 26.0,
      "fiber_g": 3.0,
      "sugar_g": 1.0,
      "protein_g": 21.0,
      "sodium_mg": 517,
      "cholesterol_mg": 353,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 5,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236432/brown-sugar-ham-steak/",
    "category": "cooking-for-one",
    "id": 236432,
    "name": "Brown Sugar Ham Steak",
    "description": "This ham steak recipe is sweet and savory and cooks in minutes. You'll need just three ingredients, and it pairs beautifully with any number of sides.",
    "author": "CassieB",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IjwIoPhuA-NKnLP4bYg6tRnBU1g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-236432-brown-sugar-ham-steak-ddmfs-4x3-hero-bcfc91ba56d14ae49142a2bd297c757e.jpg",
      "alt": "Brown Sugar Ham Steak"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "1 (8 ounce) bone-in fully cooked ham steak",
      "5 tablespoons butter, cubed",
      "5 tablespoons brown sugar"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Cook ham steak in a large skillet over medium heat until browned, 3 to 4 minutes per side.",
      "Remove ham from skillet; drain off any fat. Melt butter in the same skillet over medium-low heat. Stir in brown sugar.",
      "Return ham to skillet. Cook, turning ham often, until heated through and brown sugar has dissolved, about 10 minutes. Reduce heat if brown sugar/butter mixture starts to pop or splatter.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 521,
      "total_fat_g": 34.0,
      "carbohydrates_g": 33.0,
      "fiber_g": 0,
      "sugar_g": 33.0,
      "protein_g": 22.0,
      "sodium_mg": 1648,
      "cholesterol_mg": 127,
      "saturated_fat_g": 20.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 193,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16536/perfect-porterhouse-steak/",
    "category": "cooking-for-one",
    "id": 16536,
    "name": "Perfect Porterhouse Steak",
    "description": "Tenderize porterhouse steak and marinate it for 20 minutes, then pop it on the BBQ for a perfectly grilled cut of beef that's worthy of a special occasion.",
    "author": "chefpaularwine",
    "image": {
      "url": "https://www.allrecipes.com/thmb/U1ub7wui1oayjFZ3NsTX0jempKw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16536-perfect-porterhouse-steak-DDMFS-4x3-3068-19296120c3d24724a68199f7726cc65a.jpg",
      "alt": "Perfect Porterhouse Steak"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 35,
    "servings": "2",
    "ingredients": [
      "20 ounces porterhouse steak",
      "1 teaspoon olive oil",
      "1 tablespoon meat tenderizer",
      "1 teaspoon steak seasoning"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Place steak onto a plate; coat with olive oil, rub with tenderizer, then gently rub with steak seasoning. Cover with plastic wrap and let stand for 20 minutes.",
      "Meanwhile, preheat a grill for high heat. When hot, lightly oil the grate.",
      "Cook steak on the preheated grill until hot, slightly pink in the center, and beginning to firm, 3 to 5 minutes per side. An instant-read thermometer inserted into the center should read 140 degrees F (60 degrees C) for medium."
    ],
    "nutrition_per_serving": {
      "calories": 461,
      "total_fat_g": 37.0,
      "carbohydrates_g": 0,
      "fiber_g": 0,
      "sugar_g": 0,
      "protein_g": 27.0,
      "sodium_mg": 1025,
      "cholesterol_mg": 94,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 48,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275343/cajun-air-fryer-salmon/",
    "category": "cooking-for-one",
    "id": 275343,
    "name": "Cajun Air Fryer Salmon",
    "description": "This air fryer salmon recipe uses just 3 simple ingredients to turn out moist and flavorful fish fillets with just Cajun seasoning and brown sugar.",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/xDVHhGA5xLfwEKleLeERiFDDBaw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/275343-Cajun-Air-Fryer-Salmon-DDMFS-4x3-5-db9b4d1d2a764ff1a9dedd8e69941827.jpg",
      "alt": "Cajun Air Fryer Salmon"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "cooking spray",
      "1 tablespoon Cajun seasoning",
      "1 teaspoon brown sugar",
      "2 (6 ounce) skin-on salmon fillets"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the air fryer to 390 degrees F (200 degrees C).",
      "Rinse and dry salmon fillets with a paper towel. Mist fillets with cooking spray.",
      "Mix together Cajun seasoning and brown sugar in a small bowl until combined; spread onto a plate.",
      "Press fillets, flesh-side down, into seasoning mixture.",
      "Spray the basket of the air fryer with cooking spray and place salmon fillets skin-side down. Mist salmon again lightly with cooking spray.",
      "Close the lid and cook in the preheated air fryer for 8 minutes. Remove from the air fryer and let rest for 2 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 327,
      "total_fat_g": 19.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 0.0,
      "sugar_g": 2.0,
      "protein_g": 34.0,
      "sodium_mg": 811,
      "cholesterol_mg": 99,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 55,
    "recipe_category": "Dinner",
    "cuisine": "Cajun",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/271092/microwave-frittata-for-one/",
    "category": "frittatas",
    "id": 271092,
    "name": "Microwave Frittata for One",
    "description": "This is a quick breakfast frittata for 1 person, made with pesto, ricotta, and Parmesan cheese. From start to finish, it is ready in about 5 minutes.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/V-JVS4-12Vpe_X7xgYYqvdF8nOM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6442885-7046387bcc9e46a3bfee3c75b0e5d99d.jpg",
      "alt": "Microwave Frittata for One"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 5,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "1 serving cooking spray",
      "2 large eggs",
      "1 tablespoon pesto",
      "2 tablespoons ricotta cheese",
      "2 tablespoons freshly grated Parmesan cheese",
      "freshly ground black pepper to taste",
      "1 tablespoon chopped green onion, or to taste"
    ],
    "instructions": [
      "Spray a large coffee mug with cooking spray.",
      "Whisk eggs, pesto, ricotta cheese, Parmesan cheese, and pepper together in a small bowl. Pour frittata mixture into coffee mug.",
      "Cook the frittata in a microwave oven for 1 minute and 30 seconds, stirring at thirty-second intervals (you will stir twice). Invert cooked frittata onto a plate or eat it right out of the coffee mug. Garnish with green onions."
    ],
    "nutrition_per_serving": {
      "calories": 313,
      "total_fat_g": 23.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 23.0,
      "sodium_mg": 452,
      "cholesterol_mg": 395,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/285031/air-fryer-spinach-and-mushroom-frittata/",
    "category": "frittatas",
    "id": 285031,
    "name": "Air Fryer Spinach and Mushroom Frittata",
    "description": "For a quick and easy breakfast for one, this spinach and mushroom frittata cooked in the air fryer is the perfect choice.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ClNtHyVTUPI4X0Hp77cXDb_zSEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9307155-de8f3e000bf8434394aae8447e11d227.jpg",
      "alt": "Air Fryer Spinach and Mushroom Frittata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "1",
    "ingredients": [
      "nonstick cooking spray",
      "2 large eggs",
      "1.5 tablespoons heavy whipping cream",
      "1 cup coarsely chopped spinach leaves",
      "0.5 cup diced mushrooms",
      "0.25 cup shredded sharp Cheddar cheese",
      "salt and freshly ground black pepper to taste"
    ],
    "instructions": [
      "Preheat an air fryer to 400 degrees F (200 degrees C). Spray a 4 1/2-inch ramekin with nonstick spray.",
      "Whisk eggs and cream together in a bowl. Stir in spinach, mushrooms, Cheddar cheese, salt, and pepper until well combined. Pour into the prepared ramekin and cover tightly with foil.",
      "Air-fry for 12 minutes. Remove foil and air-fry until top starts to brown and a toothpick inserted into the center comes out clean, 4 to 8 more minutes."
    ],
    "nutrition_per_serving": {
      "calories": 356,
      "total_fat_g": 28.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 23.0,
      "sodium_mg": 366,
      "cholesterol_mg": 432,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 7,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/53299/ramen-noodle-frittata/",
    "category": "frittatas",
    "id": 53299,
    "name": "Ramen Noodle Frittata",
    "description": "Ramen noodles are baked into a frittata and topped with shredded cheese. My kids love this frittata for lunch! It's so easy to make!",
    "author": "Judy M",
    "image": {
      "url": "https://www.allrecipes.com/thmb/olA6sCwyaLSite2axDvQ3S7uz9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/622241-4052ac5e5df5441fbc6af421d9e50727.jpg",
      "alt": "Ramen Noodle Frittata"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "2 (3 ounce) packages chicken flavored ramen noodles",
      "6 eggs",
      "2 teaspoons butter",
      "0.5 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Place noodles in a saucepan filled with boiling water, reserving the seasoning packet. Cook until tender, and drain. In a medium bowl, whisk together the eggs and seasoning packets from the noodles. Mix in noodles.",
      "Melt butter in a large skillet over medium heat. Add the noodle mixture, and cook over medium-low heat until firm, 5 to 7 minutes. Cut into fourths, and turn over to brown the other side for 1 to 2 minutes. Sprinkle cheese over the top, and serve."
    ],
    "nutrition_per_serving": {
      "calories": 339,
      "total_fat_g": 16.0,
      "carbohydrates_g": 29.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 20.0,
      "sodium_mg": 681,
      "cholesterol_mg": 303,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.9,
    "review_count": 118,
    "recipe_category": "Lunch",
    "meal_type": "fitness",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/214761/collins-goulash/",
    "category": "goulash",
    "id": 214761,
    "name": "Collins Goulash",
    "description": "This goulash recipe is what you need when the family is hungry and you have hamburger in the fridge. This tasty, creamy dish will fill everyone up.",
    "author": "Mary Smallwood",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0kcNTYtSloUOyA44Sye6dVJkJY8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7054296-0f231100825b47b7bc4513ef481b93e6.jpg",
      "alt": "Collins Goulash"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 25,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "1 (16 ounce) package elbow macaroni",
      "1 pound ground beef",
      "1 (8 ounce) package cream cheese, softened",
      "2 (10.5 ounce) cans condensed cream of mushroom soup",
      "1 cup milk, or as needed"
    ],
    "instructions": [
      "Fill a large pot with lightly salted water and bring to a rolling boil over high heat. Once water is boiling, stir in macaroni and return to a boil. Cook uncovered, stirring occasionally until pasta is tender and cooked through, about 10 minutes. Drain well.",
      "Cook ground beef in a skillet over medium heat, breaking meat up as it cooks until beef is browned and no longer pink. Drain excess fat. Stir in cream cheese until melted, then mix in condensed soup until thoroughly combined. Stir in milk, about 1/4 cup at a time, until the mixture has the consistency of gravy.",
      "Stir in macaroni, bring to a simmer, and serve."
    ],
    "nutrition_per_serving": {
      "calories": 486,
      "total_fat_g": 22.0,
      "carbohydrates_g": 49.0,
      "fiber_g": 2.0,
      "sugar_g": 4.0,
      "protein_g": 21.0,
      "sodium_mg": 623,
      "cholesterol_mg": 68,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 56,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/228425/chicken-and-feta-burgers/",
    "category": "ground-chicken",
    "id": 228425,
    "name": "Chicken and Feta Burgers",
    "description": "Ground chicken makes for great, lean burgers with the addition of olive, oregano, and feta cheese.",
    "author": "Jeanette",
    "image": {
      "url": "https://www.allrecipes.com/thmb/MzsEvRhXs0iqsw7YaZom93Mo3C8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/999203-chicken-and-feta-burgers-Delta365-4x3-2-d60740707bd94090a90f513f3087c7dd.jpg",
      "alt": "Chicken and Feta Burgers"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1.5 pounds ground chicken",
      "3 tablespoons chopped fresh oregano",
      "1 tablespoon Kalamata-olive tapenade",
      "2 ounces crumbled feta cheese",
      "1.5 tablespoons crushed garlic",
      "0.25 teaspoon kosher salt",
      "0.125 tablespoon coarse-ground black pepper"
    ],
    "instructions": [
      "Mix chicken, oregano, tapenade, feta cheese, and garlic together in a bowl; form into 4 patties. Season burgers with salt and pepper.",
      "Preheat an outdoor grill for high heat and lightly oil the grate with olive oil.",
      "Cook patties until charred on bottom, about 5 minutes. Flip the burgers and finish cooking, refraining from flattening with your spatula until no longer pink in the middle, about 5 minutes more. Drain on a plate lined with paper towels before serving."
    ],
    "nutrition_per_serving": {
      "calories": 265,
      "total_fat_g": 9.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 41.0,
      "sodium_mg": 401,
      "cholesterol_mg": 117,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 52,
    "cuisine": "Mediterranean Inspired",
    "recipe_category": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/139972/pesto-turkey-burgers/",
    "category": "ground-turkey",
    "id": 139972,
    "name": "Pesto Turkey Burgers",
    "description": "This Mediterranean-style turkey burger is flavored with basil pesto and crumbled feta cheese. It's delicious, fancy, and ready in only 20 minutes! Serve on buns with lettuce and tomato.",
    "author": "ELADOUSA",
    "image": {
      "url": "https://www.allrecipes.com/thmb/LW5U5YZL82R95i2_yTyj6MMVhUU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/139972pesto-turkey-burgersFranceC4x3-f1b12c9d0ef9429badf0bcdd661923ec.jpg",
      "alt": "Pesto Turkey Burgers"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1.25 pounds lean ground turkey",
      "2 tablespoons basil pesto",
      "1 teaspoon minced garlic",
      "0.5 cup crumbled feta cheese",
      "1.5 teaspoons seasoned salt",
      "0.5 cup bread crumbs",
      "0.5 teaspoon seasoned salt"
    ],
    "instructions": [
      "Preheat an outdoor grill for medium-high heat.",
      "Mix together ground turkey, pesto, garlic, feta cheese, 1 1/2 teaspoons seasoned salt, and breadcrumbs in a bowl until evenly blended. Form into 4 patties.",
      "Grill pesto burgers until no longer pink in the center, about 5 minutes per side. Sprinkle with seasoned salt halfway through cooking."
    ],
    "nutrition_per_serving": {
      "calories": 354,
      "total_fat_g": 19.0,
      "carbohydrates_g": 12.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 34.0,
      "sodium_mg": 907,
      "cholesterol_mg": 124,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 407,
    "recipe_category": "Dinner",
    "cuisine": "Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/242100/eggs-n-fries/",
    "category": "breakfast-potatoes",
    "id": 242100,
    "name": "Eggs n' Fries",
    "description": "Grandma's secret recipe for breakfast eggs is out, and it's delicious! It's an egg scramble made with French fries.",
    "author": "Chelsea Goldman",
    "image": {
      "url": "https://www.allrecipes.com/thmb/RIgccjx9EInMmb1FP5OZtAblhX0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2217331-b4dbd7eb084a48e2b229b3f1fdb13d78.jpg",
      "alt": "Eggs n' Fries"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "1",
    "ingredients": [
      "1 teaspoon butter, or to taste",
      "0.25 cup frozen French fries, or to taste",
      "2 eggs, beaten",
      "1 pinch salt and ground black pepper to taste"
    ],
    "instructions": [
      "Melt butter in a skillet over medium heat. Add French fries; cook and stir until browned and hot, 3 to 5 minutes. Add eggs and season with salt and pepper; cook and stir until scrambled and set, 3 to 5 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 212,
      "total_fat_g": 15.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 13.0,
      "sodium_mg": 399,
      "cholesterol_mg": 383,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 11,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275850/baked-gnocchi/",
    "category": "gnocchi",
    "id": 275850,
    "name": "Baked Gnocchi",
    "description": "This easy baked gnocchi recipe is the perfect choice when you're cooking for one--it's got just 3 ingredients and will be on the table for you to enjoy in no time.",
    "author": "ConnieD",
    "image": {
      "url": "https://www.allrecipes.com/thmb/YjUUfTdgHQv0mduwK1grFa-iNIg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/275850baked-gnocchiMyHotSouthernMess4x3-e6cb5bc1eeba47cab54b39c7b7099cb2.jpg",
      "alt": "Baked Gnocchi"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "1",
    "ingredients": [
      "4 ounces shelf-stable gnocchi",
      "0.33333334326744 cup pasta sauce",
      "0.25 cup shredded mozzarella cheese, or to taste"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Cook gnocchi in the boiling water until they float to the top, about 3 minutes. Drain.",
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Spread 1/2 of the pasta sauce on the bottom of a 5-inch round casserole dish. Layer with gnocchi and spread the remaining pasta sauce on top. Sprinkle with mozzarella cheese.",
      "Bake in the preheated oven until cheese is melted and bubbling, about 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 304,
      "total_fat_g": 15.0,
      "carbohydrates_g": 32.0,
      "fiber_g": 3.0,
      "sugar_g": 8.0,
      "protein_g": 11.0,
      "sodium_mg": 601,
      "cholesterol_mg": 41,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 5,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/19660/no-bake-pizza-appetizer/",
    "category": "spinach-dips",
    "id": 19660,
    "name": "No Bake Pizza Appetizer",
    "description": "This is a pizza bread crust slathered with spinach dip and covered with scrumptious toppings: broccoli, chicken or turkey, green onions, and tomato.",
    "author": "Ter Denlinger",
    "image": {
      "url": "https://www.allrecipes.com/thmb/v-PP5Mm1u3AXS4EIlZzZnGQftaI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1082390-341a33b5129c4300aad8a1afbf32bfbc.jpg",
      "alt": "No Bake Pizza Appetizer"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "8",
    "ingredients": [
      "1 cup prepared spinach dip",
      "1 (10 ounce) package prepared pizza crust",
      "1 cup chopped broccoli",
      "1 cup cooked and cubed chicken",
      "0.33333334326744 cup chopped green onions",
      "1 tomato, seeded and chopped"
    ],
    "instructions": [
      "Spread spinach dip evenly over the pizza crust to within 1/2 inch of the edge. Top with broccoli, chicken, green onions and tomato. Cut into wedges to serve."
    ],
    "nutrition_per_serving": {
      "calories": 306,
      "total_fat_g": 20.0,
      "carbohydrates_g": 23.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 10.0,
      "sodium_mg": 439,
      "cholesterol_mg": 30,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 19,
    "recipe_category": "Lunch",
    "cuisine": "",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/25473/the-perfect-basic-burger/",
    "category": "burgers",
    "id": 25473,
    "name": "The Perfect Basic Burger",
    "description": "This hamburger patty recipe combines ground beef, bread crumbs, and seasonings to make 4 flavorsome patties that are ready to grill in minutes.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
      "alt": "The Perfect Basic Burger"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 large egg",
      "0.5 teaspoon salt",
      "0.5 teaspoon ground black pepper",
      "1 pound ground beef",
      "0.5 cup fine dry bread crumbs"
    ],
    "instructions": [
      "Preheat an outdoor grill for high heat and lightly oil grate.",
      "Whisk egg, salt, and pepper together in a medium bowl.",
      "Add ground beef and bread crumbs; mix with your hands or a fork until well blended.",
      "Form into four 3/4-inch-thick patties.",
      "Place patties on the preheated grill. Cover and cook 6 to 8 minutes per side, or to desired doneness. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C).",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 317,
      "total_fat_g": 18.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 27.0,
      "sodium_mg": 475,
      "cholesterol_mg": 125,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 260,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8495600/creamy-chicken-ramen-soup-with-dill/",
    "category": "chicken-noodle-soups",
    "id": 8495600,
    "name": "Creamy Chicken Ramen Soup with Dill",
    "description": "Try this quick and easy creamy chicken ramen soup when you're not in the mood for cooking.",
    "author": "Chef Mo",
    "image": {
      "url": "https://www.allrecipes.com/thmb/FzHj_hcYXy_V61woWRAFRWnf9No=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Creamy-Dill-Chicken-Ramen-Soup-77430740658947f6b29255f9f3e6ecf9.jpg",
      "alt": "Creamy Chicken Ramen Soup with Dill"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "1",
    "ingredients": [
      "1.75 cups water",
      "1 (3 ounce) package chicken flavored ramen noodles",
      "1 (5 ounce) can canned chicken, drained",
      "2 tablespoons sour cream",
      "2 teaspoons dried dill weed",
      "green onions for garnish (optional)"
    ],
    "instructions": [
      "Bring water to a boil in a saucepan. Break up noodles and toss into boiling water. Cook until tender, about 3 minutes. Stir in chicken, sour cream, seasoning packet, and dill. Simmer until heated through. Serve garnished with green onions."
    ],
    "nutrition_per_serving": {
      "calories": 589,
      "total_fat_g": 18.0,
      "carbohydrates_g": 58.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 45.0,
      "sodium_mg": 1655,
      "cholesterol_mg": 101,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 5,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/244146/home-style-chicken-piccata/",
    "category": "chicken-piccata",
    "id": 244146,
    "name": "Home-Style Chicken Piccata",
    "description": "Chicken is breaded and cooked in the skillet with a squeeze of lemon in this quick and easy, home-style chicken piccata recipe.",
    "author": "SANDY331",
    "image": {
      "url": "https://www.allrecipes.com/thmb/TZJwuPgbB1r0I1YkkroaQdIWAX4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8965520-d0bbbe76193c46d789f96ae98fa2ec28.jpg",
      "alt": "Home-Style Chicken Piccata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "0.5 cup all-purpose flour",
      "2 teaspoons garlic powder",
      "1 teaspoon paprika",
      "1 egg",
      "0.25 cup butter",
      "1 pound skinless, boneless chicken breast halves",
      "1 cup chicken broth",
      "0.5 lemon"
    ],
    "instructions": [
      "Whisk flour, garlic powder, and paprika together in a bowl. Beat egg in a separate bowl. Melt butter in a skillet over medium heat.",
      "Dip chicken in egg until coated. Dredge chicken through flour mixture until evenly coated, shaking off excess.",
      "Fry chicken in the melted butter until browned, 2 to 3 minutes per side. Add chicken broth to skillet, cover, and cook until chicken is not longer pink in the center, about 20 minutes. Squeeze lemon over chicken."
    ],
    "nutrition_per_serving": {
      "calories": 301,
      "total_fat_g": 15.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 26.0,
      "sodium_mg": 388,
      "cholesterol_mg": 137,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 15,
    "recipe_category": "Dinner",
    "cuisine": "Italian Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16248/easy-homemade-chili/",
    "category": "chili-recipes",
    "id": 16248,
    "name": "Easy Homemade Chili",
    "description": "This easy homemade chili recipe made with ground beef, onion, tomatoes, beans, and seasonings cooks in just 20 minutes for a crowd-pleasing meal.",
    "author": "Tobi Hargis",
    "image": {
      "url": "https://www.allrecipes.com/thmb/27bQEkOcNY92EISSF209Tl9g0-A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16248-easy-homemade-chili-PICS-Beauty-4x3-8b815c471f304be7b93457218ab103e1.jpg",
      "alt": "Easy Homemade Chili"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "1 pound ground beef",
      "1 onion, chopped",
      "1 (15 ounce) can tomato sauce",
      "1 (15 ounce) can kidney beans",
      "1 (14.5 ounce) can stewed tomatoes",
      "1.5 cups water",
      "1 pinch chili powder",
      "1 pinch garlic powder",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Place ground beef and onion in a large saucepan over medium heat; cook and stir until meat is browned and onion is tender, about 5 to 7 minutes.",
      "Stir in tomato sauce, kidney beans, and stewed tomatoes with juice. If you prefer a thinner consistency, you can add water. Season with chili powder, garlic powder, salt, and black pepper. Bring to a boil, reduce heat to low, cover and let simmer for 15 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 394,
      "total_fat_g": 9.0,
      "carbohydrates_g": 49.0,
      "fiber_g": 18.0,
      "sugar_g": 4.0,
      "protein_g": 31.0,
      "sodium_mg": 526,
      "cholesterol_mg": 46,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 586,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23909/the-real-reuben/",
    "category": "corned-beef",
    "id": 23909,
    "name": "The Real Reuben",
    "description": "Dark pumpernickel rye, heaped corned beef, drained sauerkraut and imported Swiss cheese make this sandwich something special.",
    "author": "ALDO1938",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0xlflOaCoJRgyzg9frIXzrmxmO8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1179107-1ddee5e4de884814a8f2315c0a5971e0.jpg",
      "alt": "The Real Reuben"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 3,
    "total_time_minutes": 8,
    "servings": "1",
    "ingredients": [
      "2 slices dark rye bread",
      "0.25 pound thinly sliced corned beef",
      "3 ounces sauerkraut, drained",
      "2 slices Swiss cheese",
      "0.25 cup thousand island dressing"
    ],
    "instructions": [
      "Place bread on baking sheet or broiling pan. Layer corned beef, sauerkraut and cheese on top of bread slices.",
      "Broil on high heat for 3 to 4 minutes, until cheese has melted. Serve hot with Thousand Island dressing."
    ],
    "nutrition_per_serving": {
      "calories": 874,
      "total_fat_g": 59.0,
      "carbohydrates_g": 53.0,
      "fiber_g": 6.0,
      "sugar_g": 17.0,
      "protein_g": 36.0,
      "sodium_mg": 2716,
      "cholesterol_mg": 152,
      "saturated_fat_g": 20.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 97,
    "recipe_category": "Dinner",
    "cuisine": "U.S.",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/263852/filipino-corned-beef-and-cabbage/",
    "category": "corned-beef",
    "id": 263852,
    "name": "Filipino Corned Beef and Cabbage",
    "description": "This Filipino version of corned beef and cabbage is really simple to cook and an Asian take on the classic Irish combination.",
    "author": "Shela F Diehr",
    "image": {
      "url": "https://www.allrecipes.com/thmb/aXpFc4lzaJxkcO6-EupZCiG8Hds=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7051746-filipino-corned-beef-and-cabbage-charm-4x3-1-825ac33a1f83476e83362f4bec66b3e3.jpg",
      "alt": "Filipino Corned Beef and Cabbage"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "0.33333334326744 cup butter",
      "1 teaspoon olive oil",
      "0.5 onion, chopped",
      "3 cloves garlic, minced",
      "4 Roma tomatoes, cubed",
      "0.33333334326744 small head cabbage, cored and cut into strips",
      "0.25 cup chicken stock, or more to taste",
      "1 (12 ounce) can corned beef"
    ],
    "instructions": [
      "Heat butter and oil in a large pot over medium heat. Add onion and garlic and cook until onion is soft and translucent, about 5 minutes. Add tomatoes and heat through, about 3 minutes.",
      "Stir in cabbage and and cook until softened, about 5 minutes. Add a splash of chicken stock and heat through, about 3 minutes.",
      "Mix in corned beef and cook until heated through and flavors have combined, about 10 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 398,
      "total_fat_g": 29.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 3.0,
      "sugar_g": 5.0,
      "protein_g": 25.0,
      "sodium_mg": 1012,
      "cholesterol_mg": 113,
      "saturated_fat_g": 15.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 14,
    "recipe_category": "Dinner",
    "cuisine": "Filipino",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278761/leftover-corned-beef-hash/",
    "category": "corned-beef",
    "id": 278761,
    "name": "Leftover Corned Beef Hash",
    "description": "Use up leftover corned beef hash from St. Patrick's Day by frying it with potatoes and eggs on the stovetop for a quick and easy meal.",
    "author": "The Kitchen Alchemist",
    "image": {
      "url": "https://www.allrecipes.com/thmb/sxfWJjFT0CcAkOJjZAozHX7bqTI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7827311-49f2a95c05844cdaac622720b6597223.jpg",
      "alt": "Leftover Corned Beef Hash"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "2 tablespoons vegetable oil",
      "5 red potatoes, peeled and sliced 1/4-inch thick",
      "1 pound cooked corned beef, sliced 1-inch thick",
      "salt and ground black pepper to taste",
      "2 eggs, or more to taste"
    ],
    "instructions": [
      "Heat oil in a pan over medium-high heat until sizzling. Place potatoes in the oil and cook, turning every couple of minutes, until golden brown, about 10 minutes.",
      "Shred corned beef and toss into the pan. Cook until heated through, about 10 minutes. Season with salt and pepper and give a good stir. Crack eggs on top, sprinkle with more salt and pepper, and cover until eggs are set, 3 to 4 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 563,
      "total_fat_g": 31.0,
      "carbohydrates_g": 43.0,
      "fiber_g": 5.0,
      "sugar_g": 3.0,
      "protein_g": 28.0,
      "sodium_mg": 1373,
      "cholesterol_mg": 193,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 1,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/53303/shrimp-egg-salad/",
    "category": "egg-salads",
    "id": 53303,
    "name": "Shrimp Egg Salad",
    "description": "Make this tasty shrimp and egg salad with pre-cooked shrimp and hard-boiled eggs. It's a delicious upgrade from your standard egg salad!",
    "author": "MEISENBACH",
    "image": {
      "url": "https://www.allrecipes.com/thmb/4sDUE_-LDjKbqJ5oITxNRXGfUBg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4514945-28d94bae093348d1a31827beed81f9ff.jpg",
      "alt": "Shrimp Egg Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "1 pound cooked shrimp - peeled, deveined, and chopped",
      "4 hard-cooked eggs, chopped",
      "4 tablespoons mayonnaise",
      "1 teaspoon Dijon mustard",
      "1 sprig chopped fresh dill",
      "4 leaves green leaf lettuce"
    ],
    "instructions": [
      "In a medium bowl, mix together shrimp, eggs, mayonnaise, mustard, and dill. Spoon onto lettuce leaves to serve."
    ],
    "nutrition_per_serving": {
      "calories": 292,
      "total_fat_g": 18.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 30.0,
      "sodium_mg": 429,
      "cholesterol_mg": 439,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 58,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241771/chicken-broccoli-alfredo-with-fettuccine/",
    "category": "fettuccini",
    "id": 241771,
    "name": "Chicken & Broccoli Alfredo with Fettuccine",
    "description": "Also delicious with sliced grilled chicken!",
    "author": "RAG",
    "image": {
      "url": "https://www.allrecipes.com/thmb/66t11-jfJGiUSZjm70Jvbm2dWC8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2178717-a6a191af2773479fb719099a43a44c94.jpg",
      "alt": "Chicken & Broccoli Alfredo with Fettuccine"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "6",
    "ingredients": [
      "1 tablespoon I Can't Believe It's Not Butter!\u00ae Spread",
      "1.5 pounds boneless, skinless chicken breasts, cut into strips",
      "1 (16 ounce) jar Ragu\u00ae Classic Alfredo Sauce",
      "1 (12 ounce) package frozen broccoli florets, thawed",
      "1 (12 ounce) package fettuccine, cooked"
    ],
    "instructions": [
      "Melt Spread in large nonstick skillet over medium-high heat and cook chicken, in batches if necessary, stirring occasionally, until chicken is thoroughly cooked. Remove chicken and set aside.",
      "Stir Sauce and broccoli into same skillet. Bring to a boil over medium-high heat. Reduce heat to low and simmer covered, stirring occasionally, until broccoli is heated through, about 5 minutes. Stir in chicken and cook, stirring occasionally, until heated through, about 2 minutes. Serve over hot fettuccine and sprinkle, if desired, with grated Parmesan cheese."
    ],
    "nutrition_per_serving": {
      "calories": 484,
      "total_fat_g": 18.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 4.0,
      "sugar_g": 3.0,
      "protein_g": 32.0,
      "sodium_mg": 513,
      "cholesterol_mg": 96,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 22,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/229360/bacon-and-chicken-fried-rice/",
    "category": "fried-rice",
    "id": 229360,
    "name": "Bacon and Chicken Fried Rice",
    "description": "This bacon and chicken fried rice recipe includes a savory soy sauce and chopped green onions. It's a winning combo and a great, flavorful side dish.",
    "author": "ljburrill",
    "image": {
      "url": "https://www.allrecipes.com/thmb/xtvPC5ZYuBbxxQ5l7j_BPUn9ma4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7114720-2e3b6129b4b5467f93c472a1dbc8739f.jpg",
      "alt": "Bacon and Chicken Fried Rice"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "3 cups water",
      "3 cups instant white rice (such as Minute\u00ae)",
      "2 teaspoons vegetable oil",
      "3 skinless, boneless chicken breasts, cut into chunks",
      "12 slices bacon",
      "1 cup chopped green onion",
      "0.5 cup soy sauce, or to taste"
    ],
    "instructions": [
      "Bring water to a boil in a saucepan; add rice and cook, stirring often, until soft, about 5 minutes. Remove from heat; set aside.",
      "Heat oil in a large wok or skillet over medium heat. Add chicken; cook until no longer pink in centers, 5 to 7 minutes. Transfer to saucepan with rice.",
      "Cook bacon in the wok or skillet over medium-high heat, turning occasionally, until cooked through but not crunchy, 2 to 3 minutes per side. Drain on a paper towel-lined plate. Drain and discard all but 1 to 2 tablespoons drippings from the wok. Cut bacon into small pieces; set aside.",
      "Return the wok to medium-high heat. Add rice, chicken, bacon, green onions, and soy sauce; cook and stir until mixture is heated through, 2 to 3 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 384,
      "total_fat_g": 12.0,
      "carbohydrates_g": 42.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 25.0,
      "sodium_mg": 1668,
      "cholesterol_mg": 56,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 28,
    "recipe_category": "Dinner",
    "cuisine": "Asian Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/238325/roast-beef-and-cheddar-frittata/",
    "category": "frittatas",
    "id": 238325,
    "name": "Roast Beef and Cheddar Frittata",
    "description": "Let this recipe teach you a very easy way to turn delicatessen roast beef and Cheddar cheese into a delicious brunch-style egg frittata.",
    "author": "michelep",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IFhDUdQMkO40stkJnOtqhQyTGxs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8072608-ff1d86ae62204a7bb89bdb7490ef3ed5.jpg",
      "alt": "Roast Beef and Cheddar Frittata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 45,
    "total_time_minutes": 55,
    "servings": "4",
    "ingredients": [
      "cooking spray",
      "10 eggs, beaten",
      "1 (10.5 ounce) can condensed cream of mushroom soup",
      "2 cups shredded Cheddar cheese",
      "8 ounces deli-style roast beef, chopped",
      "0.5 teaspoon ground black pepper"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Prepare a 2-quart shallow baking dish with cooking spray.",
      "Stir eggs and cream of mushroom soup together in a large bowl until smooth. Stir Cheddar cheese, roast beef, and black pepper into the egg mixture.",
      "Bake in preheated oven until set in the the center and golden brown on top, 45 to 50 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 535,
      "total_fat_g": 37.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 0.0,
      "sugar_g": 3.0,
      "protein_g": 43.0,
      "sodium_mg": 1582,
      "cholesterol_mg": 552,
      "saturated_fat_g": 18.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 15,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/285091/ground-turkey-ricotta-meatballs/",
    "category": "ground-turkey",
    "id": 285091,
    "name": "Ground Turkey-Ricotta Meatballs",
    "description": "This recipe for savory, pillowy-soft turkey-ricotta meatballs with basil is great for a quick dinner or crowd-pleasing appetizer. They freeze well, too.",
    "author": "TipsyT",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ZIkrM_hayMSBqDrcbD2Fu_n3kHk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9346500-331bbfab57764479b9d30be30d8d17c9.jpg",
      "alt": "Ground Turkey-Ricotta Meatballs"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "1 pound ground turkey",
      "0.5 cup ricotta cheese",
      "0.5 cup Italian-seasoned bread crumbs",
      "0.25 cup chopped fresh basil",
      "1 large egg, slightly beaten",
      "0.5 teaspoon salt",
      "0.5 teaspoon freshly ground black pepper"
    ],
    "instructions": [
      "Preheat the oven to 375 degrees F (190 degrees C). Line a baking sheet with parchment paper.",
      "Combine turkey, ricotta, bread crumbs, basil, egg, salt, and black pepper in a bowl until just mixed.",
      "Scoop mixture into meatballs using a 1-ounce measure onto the prepared baking sheet.",
      "Bake in the preheated oven for 15 minutes; flip meatballs. Bake until browned and no longer pink in centers, about 5 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 280,
      "total_fat_g": 13.0,
      "carbohydrates_g": 12.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 29.0,
      "sodium_mg": 623,
      "cholesterol_mg": 139,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 13,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/100195/baked-haddock/",
    "category": "kosher",
    "id": 100195,
    "name": "Baked Haddock",
    "description": "This baked haddock recipe is quick and easy to prepare with a Parmesan bread crumb coating for a kid-friendly dinner in less than 30 minutes!",
    "author": "linda",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jWIHVlM1bGEylpNGfybNRB_xN28=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/100195-BakedHaddock-mfs-4x3-1441-867e32979a2b409bb7445f59f8c170bb.jpg",
      "alt": "Baked Haddock"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "0.75 cup milk",
      "2 teaspoons salt",
      "0.75 cup bread crumbs",
      "0.25 cup grated Parmesan cheese",
      "0.25 teaspoon ground dried thyme",
      "4 haddock fillets",
      "0.25 cup butter, melted"
    ],
    "instructions": [
      "Preheat oven to 500 degrees F (260 degrees C).",
      "In a small bowl, combine the milk and salt. In a separate bowl, mix together the bread crumbs, Parmesan cheese, and thyme.",
      "Dip the haddock fillets in the milk, then press into the crumb mixture to coat. Place haddock fillets in a glass baking dish, and drizzle with melted butter.",
      "Bake on the top rack of the preheated oven until the fish flakes easily, about 15 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 325,
      "total_fat_g": 16.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 1.0,
      "sugar_g": 4.0,
      "protein_g": 28.0,
      "sodium_mg": 1565,
      "cholesterol_mg": 103,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 1104,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/260368/keto-tuna-salad/",
    "category": "keto",
    "id": 260368,
    "name": "Keto Tuna Salad",
    "description": "Take tuna salad to the keto level with olive oil mayonnaise, lime, celery, red onion, and mustard. Enjoy this recipe on a salad or in a sandwich.",
    "author": "Jacob Collins",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Zd5GK25gQttOMrjt5Ts-rgW43P0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/60368keto-tuna-saladSoupLovingNicole4x3-938137f33c204481abfa2cb0cd9e31d9.jpg",
      "alt": "Keto Tuna Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "2 (6 ounce) cans water-packed tuna, drained",
      "2 (6 ounce) cans olive oil-packed tuna, drained",
      "0.75 cup reduced-fat olive oil mayonnaise",
      "2 stalks celery, chopped",
      "0.25 red onion, chopped",
      "0.5 lime, juiced",
      "2 tablespoons mustard",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Combine water-packed tuna, oil-packed tuna, mayonnaise, celery, red onion, lime juice, mustard, salt, and pepper in a bowl. Mix well."
    ],
    "nutrition_per_serving": {
      "calories": 423,
      "total_fat_g": 23.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 47.0,
      "sodium_mg": 1027,
      "cholesterol_mg": 56,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 24,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/81102/moms-barbeque-style-turkey/",
    "category": "leftovers",
    "id": 81102,
    "name": "Mom's Barbecue-Style Turkey",
    "description": "Leftover turkey is simmered in a sweet and tangy barbecue sauce with onions, celery, and peppers. Try it on a roll, over rice, with noodles, or all on its own!",
    "author": "Katie P",
    "image": {
      "url": "https://www.allrecipes.com/thmb/hRYz6MPhFiVIvUgaGK55BUDJve4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3789448-9f22703600b949d6927a5fe86b7cc04c.jpg",
      "alt": "Mom's Barbecue-Style Turkey"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "0.25 cup butter",
      "0.5 cup chopped onion",
      "1 cup chopped celery",
      "0.5 cup chopped green bell pepper",
      "1 cup ketchup",
      "3 tablespoons brown sugar",
      "1.5 teaspoons chili powder",
      "1 tablespoon Worcestershire sauce",
      "salt to taste",
      "4 cups chopped cooked turkey"
    ],
    "instructions": [
      "Melt butter in a skillet over medium heat. Place onion, celery, and green pepper in the skillet, and cook 5 minutes. Mix in ketchup, brown sugar, chili powder, and Worcestershire sauce. Season with salt. Cook over low heat until bubbly. Stir in turkey, cover, and simmer 30 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 307,
      "total_fat_g": 13.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 1.0,
      "sugar_g": 17.0,
      "protein_g": 29.0,
      "sodium_mg": 619,
      "cholesterol_mg": 91,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 24,
    "recipe_category": "Dinner",
    "cuisine": "U.S.",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/276831/air-fryer-ranch-pork-chops/",
    "category": "keto",
    "id": 276831,
    "name": "Air Fryer Ranch Pork Chops",
    "description": "This keto-friendly air fryer pork chop recipe couldn't be easier\u2014 just a bit of ranch seasoning mix turns plain pork into a flavorful feast in 10 minutes!",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/7WgSRYAUnWGwbZIBsbJDPjFa9yo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/276831-Air-Fryer-Pork-Chops-ddmfs-4x3-170-1-1fa27f00f474428f85f7f7b6aa267709.jpg",
      "alt": "Air Fryer Ranch Pork Chops"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "4 boneless, center-cut pork chops, 1-inch thick",
      "cooking spray",
      "2 teaspoons dry ranch salad dressing mix (such as Hidden Valley Ranch\u00ae)"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Place pork chops onto a plate and lightly spray both sides with cooking spray.",
      "Sprinkle both sides with ranch seasoning mix and let sit at room temperature for 10 minutes.",
      "Spray an air fryer basket with cooking spray and preheat the air fryer to 390 degrees F (200 degrees C).",
      "Working in batches if necessary to ensure they are not overcrowded, place chops into the preheated air fryer. Cook for 10 minutes, flipping halfway through. An instant-read thermometer inserted into the center should read at least 145 degrees F (63 degrees C).",
      "Transfer to a foil-covered plate and let sit for 5 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 260,
      "total_fat_g": 9.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 0,
      "sugar_g": 0,
      "protein_g": 41.0,
      "sodium_mg": 148,
      "cholesterol_mg": 107,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 50,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/274923/freezer-breakfast-sandwiches/",
    "category": "meal-prep",
    "id": 274923,
    "name": "Freezer Breakfast Sandwiches",
    "description": "These freezer breakfast sandwiches are great when you're pressed for time in the mornings--just 30 minutes of weekend prep time yields 6 quick breakfast sandwiches for the week.",
    "author": "HannahSilvestre8214",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Ervp0kxFcW7fABsZquenOFw--0Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1647988-ca73901ae2514396b576cccf97ab2a16.jpg",
      "alt": "Freezer Breakfast Sandwiches"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "6 sausage patties",
      "coconut oil cooking spray",
      "6 eggs, divided",
      "6 dashes cayenne pepper, divided",
      "salt and ground black pepper to taste",
      "6 whole grain English muffins, split and toasted",
      "6 slices American processed cheese"
    ],
    "instructions": [
      "Heat a large skillet over medium heat. Cook sausage patties in the hot skillet, turning often, until sausage is cooked through and browned, 10 to 12 minutes. Remove patties to a paper-towel lined plate.",
      "Meanwhile, coat a 3-inch mini frying pan with coconut oil cooking spray and place over medium heat. Whisk 1 egg and 1 dash of cayenne pepper in a small bowl and season with salt and pepper. Pour egg mixture into frying pan. Cook, without stirring, until set on the bottom, about 1 1/2 minutes. Flip egg and cook, without stirring, until set on the other side, about 1 minute more. Remove from heat, place on a plate, and repeat with remaining eggs and cayenne pepper.",
      "Assemble breakfast sandwiches when eggs and sausage are cool: place an egg patty on the bottom piece of an English muffin, top with a slice of cheese, a sausage patty, and the English muffin top. Wrap in aluminum foil and freeze.",
      "Unwrap and microwave each sandwich for 2 minutes when ready to eat."
    ],
    "nutrition_per_serving": {
      "calories": 343,
      "total_fat_g": 16.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 0.0,
      "sugar_g": 2.0,
      "protein_g": 20.0,
      "sodium_mg": 878,
      "cholesterol_mg": 199,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 1,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/279188/cheater-carbonara/",
    "category": "Pasta-Carbonara",
    "id": 279188,
    "name": "Cheater Carbonara",
    "description": "Using milk and cream cheese in place of eggs makes for an extra-creamy carbonara that everyone will enjoy.",
    "author": "Allrecipes Magazine",
    "image": {
      "url": "https://www.allrecipes.com/thmb/4l2KkZ9Bsl4pb47e9FtPu5Rf7aA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7854281-d1a16b1867ce432c98afec7dcc041912.jpg",
      "alt": "Cheater Carbonara"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "1 (8 ounce) package linguine pasta",
      "1 cup frozen peas",
      "5 slices bacon",
      "1 clove garlic, minced",
      "1 cup milk",
      "0.5 (8 ounce) package cream cheese",
      "0.25 cup grated Parmesan cheese"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Cook linguine at a boil until tender yet firm to the bite, about 11 minutes, adding peas in the last minute of cooking. Drain and keep warm in a bowl.",
      "Place bacon in a large skillet and cook over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Transfer bacon to paper towels, reserving 1 tablespoon of drippings in the skillet.",
      "Add garlic to the skillet; saute for 1 minute. Reduce heat to low and stir in milk and cream cheese until blended.",
      "Crumble bacon and add to the linguine along with sauce and Parmesan cheese; stir to coat."
    ],
    "nutrition_per_serving": {
      "calories": 443,
      "total_fat_g": 19.0,
      "carbohydrates_g": 50.0,
      "fiber_g": 4.0,
      "sugar_g": 7.0,
      "protein_g": 20.0,
      "sodium_mg": 495,
      "cholesterol_mg": 53,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 1,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275553/breaded-air-fryer-pork-chops/",
    "category": "Pork-Chops",
    "id": 275553,
    "name": "Breaded Air Fryer Pork Chops",
    "description": "These breaded pork chops made in the air fryer turn out perfectly tender and juicy in just 10 minutes. Try different crouton flavors for variety.",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/5mEDm6SdyHs9MMgR9W9QwY1-2BE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/275553-breaded-air-fryer-pork-chops-DDMFS-4x3-b397b8e1a7634fbf90826b63e509b4e4.jpg",
      "alt": "Breaded Air Fryer Pork Chops"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "4 (5 ounce) boneless, center-cut pork chops, 1-inch thick",
      "1 teaspoon Cajun seasoning",
      "1.5 cups cheese and garlic croutons",
      "2 large eggs",
      "cooking spray"
    ],
    "instructions": [
      "Preheat an air fryer to 400 degrees F (200 degrees C).",
      "Place pork chops on a plate and season both sides with Cajun seasoning.",
      "Pulse croutons in a small food processor until fine; transfer to a shallow dish. Lightly beat eggs in a separate shallow dish. Working one at a time, dip pork chops into beaten egg, letting excess drip off; press into crouton breading to coat both sides and place breaded chop, unstacked, onto a plate. Repeat with remaining chops. Mist chops with cooking spray.",
      "Spray the air fryer basket with cooking spray and arrange chops in a single layer in the air fryer basket. You may have to do two batches depending on the size of your air fryer.",
      "Cook in the preheated air fryer for 5 minutes; flip chops and mist again with cooking spray if there are dry areas. Cook 5 minutes more. An instant-read thermometer inserted into the center of the chops should read 145 degrees F (63 degrees C).",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 327,
      "total_fat_g": 15.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 1.0,
      "sugar_g": 0,
      "protein_g": 35.0,
      "sodium_mg": 407,
      "cholesterol_mg": 189,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 91,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/284536/nova-lox-everything-breakfast-bagel/",
    "category": "bagels",
    "id": 284536,
    "name": "Nova Lox Everything Breakfast Bagel",
    "description": "Save the money and make your own breakfast bagels with cream cheese, capers, and smoked salmon instead of doing grab-and-go.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0UAbwU2rRntUeZgPF6EDRj2gYn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9218276-e1e2c3a98f4e4378820b98af670a3c4d.jpg",
      "alt": "Nova Lox Everything Breakfast Bagel"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 2,
    "total_time_minutes": 7,
    "servings": "8",
    "ingredients": [
      "8 everything bagel thins",
      "1 (8 ounce) container whipped cream cheese",
      "1 medium tomato, sliced",
      "1 (4 ounce) jar capers"
    ],
    "instructions": [
      "Split bagel thins and toast the bagel thins until lightly golden.",
      "Smear 2 tablespoons whipped cream cheese on each bagel. Top each bagel with a tomato slice, 1 ounce flaked smoked salmon, and capers. Serve immediately."
    ],
    "nutrition_per_serving": {
      "calories": 315,
      "total_fat_g": 11.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 14.0,
      "sodium_mg": 1143,
      "cholesterol_mg": 33,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/270409/quick-instant-pot-baked-beans/",
    "category": "baked-beans",
    "id": 270409,
    "name": "Quick Instant Pot\u00ae Baked Beans",
    "description": "This baked bean recipe uses canned baked beans with pork, bacon and seasonings. Cooking it in the Instant Pot\u00ae cuts the cooking time in half.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/INp4rOXAep2mzcubmgduJ8PozT0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6316765-quick-instant-pot-baked-beans-thedailygourmet-4x3-1-474896f7d32d4bac8727a0723908e8cb.jpg",
      "alt": "Quick Instant Pot\u00ae Baked Beans"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "8 slices bacon, chopped",
      "2 (15 ounce) cans baked beans with pork",
      "0.5 cup ketchup",
      "6 tablespoons brown sugar",
      "0.5 teaspoon dry mustard powder"
    ],
    "instructions": [
      "Turn on a multi-functional pressure cooker (such as Instant Pot\u00ae) and select Saute function. Add bacon and cook until browned and crispy but not burned, about 6 minutes. Transfer bacon to a baking sheet lined with paper towels. Allow grease to drain.",
      "Pour off some liquid from the beans, clearing at least 1 inch from the top of the can, but leaving some liquid. Add beans and remaining liquid, ketchup, brown sugar, and mustard to the Instant Pot\u00ae. Mix in bacon. Close and lock the lid. Select high pressure according to manufacturer's instructions; set timer for 3 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure carefully using the quick-release method according to manufacturer's instructions, about 5 minutes. Unlock and remove the lid."
    ],
    "nutrition_per_serving": {
      "calories": 270,
      "total_fat_g": 6.0,
      "carbohydrates_g": 48.0,
      "fiber_g": 6.0,
      "sugar_g": 29.0,
      "protein_g": 12.0,
      "sodium_mg": 988,
      "cholesterol_mg": 13,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 3,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/257865/easy-chorizo-street-tacos/",
    "category": "cooking-for-one",
    "id": 257865,
    "name": "Easy Chorizo Street Tacos",
    "description": "Easy chorizo tacos made with crumbled chorizo quickly cooked with chipotle peppers, then topped with chopped cilantro and onion in a warm tortilla.",
    "author": "evostoplight",
    "image": {
      "url": "https://www.allrecipes.com/thmb/B8LABI3tZsd91f1lwxvlS6w6HMo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/image-321-1acc9ef3a3cf44dc93bea4921c0d517a.jpg",
      "alt": "Easy Chorizo Street Tacos"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "2",
    "ingredients": [
      "1 chorizo sausage link, casing removed and meat crumbled",
      "2 tablespoons chipotle peppers in adobo sauce",
      "4 corn tortillas",
      "2 tablespoons chopped onion, or to taste",
      "2 tablespoons chopped fresh cilantro, or to taste"
    ],
    "instructions": [
      "Combine crumbled chorizo and chipotle peppers in adobo sauce in a bowl.",
      "Heat a skillet over medium-high heat; add chorizo mixture and cook until crisp, 5 to 7 minutes. Transfer to a plate, reserving grease in the skillet.",
      "Heat tortillas in reserved grease in the skillet over medium heat until warmed, 1 to 2 minutes per side. Stack 2 tortillas for each taco, then fill with chorizo, onion, and cilantro."
    ],
    "nutrition_per_serving": {
      "calories": 262,
      "total_fat_g": 13.0,
      "carbohydrates_g": 26.0,
      "fiber_g": 4.0,
      "sugar_g": 1.0,
      "protein_g": 10.0,
      "sodium_mg": 466,
      "cholesterol_mg": 26,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 51,
    "recipe_category": "Dinner",
    "cuisine": "Mexican",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/215753/simple-pesto-pasta/",
    "category": "fettuccini",
    "id": 215753,
    "name": "Simple Pesto Pasta",
    "description": "Simply noodles with a pesto and butter sauce.",
    "author": "MOMof5",
    "image": {
      "url": "https://www.allrecipes.com/thmb/G7FCn6rNxO6tfUt4wqra65BkHBs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/468533-simple-pesto-pasta-Pam-Ziegler-Lutz-4x3-1-ec36ff66e34e495991809383e3de445a.jpg",
      "alt": "Simple Pesto Pasta"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "0.5 (16 ounce) box dry fettuccine pasta",
      "0.25 cup butter, or to taste",
      "3 tablespoons minced garlic",
      "0.25 cup pesto"
    ],
    "instructions": [
      "Bring a pot of lightly salted water to a rolling boil; cook the fettuccini at a boil until cooked through yet firm to the bite, about 8 minutes; drain. Transfer the fettuccini to a bowl.",
      "Melt the butter in a saucepan over medium heat. Cook the garlic and pesto in the melted butter until warmed, 2 to 3 minutes; pour over the fettuccini and toss to coat."
    ],
    "nutrition_per_serving": {
      "calories": 392,
      "total_fat_g": 20.0,
      "carbohydrates_g": 44.0,
      "fiber_g": 3.0,
      "sugar_g": 2.0,
      "protein_g": 11.0,
      "sodium_mg": 205,
      "cholesterol_mg": 36,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 33,
    "cuisine": "Italian Inspired",
    "recipe_category": "",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/263032/90-second-keto-bread-in-a-mug/",
    "category": "gluten-free",
    "id": 263032,
    "name": "90-Second Keto Bread in a Mug",
    "description": "Try keto bread is microwaved quickly and easily with only 5 ingredients in 90 seconds! This bread is so tasty and perfect for sandwiches and toast.",
    "author": "Fioa",
    "image": {
      "url": "https://www.allrecipes.com/thmb/z6ttDgXGVxkDloboSMdwf_6VEQA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5192971-dfb57819b2374fdabed1826dac1c7431.jpg",
      "alt": "90-Second Keto Bread in a Mug"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 2,
    "total_time_minutes": 9,
    "servings": "1",
    "ingredients": [
      "1 tablespoon butter",
      "0.33333334326744 cup blanched almond flour",
      "1 egg",
      "0.5 teaspoon baking powder",
      "1 pinch salt"
    ],
    "instructions": [
      "Microwave butter in a microwave-safe mug until melted, about 15 seconds. Swirl the mug to coat with butter.",
      "Add almond flour, egg, baking powder, and salt to the mug; whisk until smooth.",
      "Microwave on high until set, about 90 seconds. Let cool for 2 minutes before slicing."
    ],
    "nutrition_per_serving": {
      "calories": 408,
      "total_fat_g": 36.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 4.0,
      "sugar_g": 2.0,
      "protein_g": 15.0,
      "sodium_mg": 542,
      "cholesterol_mg": 194,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 483,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/73686/beautiful-salad/",
    "category": "green-salads",
    "id": 73686,
    "name": "Beautiful Salad",
    "description": "A spur-of-the-moment creation when I wanted something with a great flavor punch and lots of color, plus quick to prepare---this one fills the bill, with baby spinach and colorful cranberries and mandarin oranges, plus the crunch of sweetened almonds and the pungent feta cheese---a new favorite at our house! You may substitute blue cheese for the feta and any kind of sweetened pecans or walnuts, if desired, for the almonds.",
    "author": "Wendy Gayle Wright Epps",
    "image": {
      "url": "https://www.allrecipes.com/thmb/_fKdOreMFNSm3jODbWpXPyeyRUI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/330492-5f1eba33a6de43b2abaf87a5f9d2df09.jpg",
      "alt": "Beautiful Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "6",
    "ingredients": [
      "8 cups baby spinach leaves",
      "0.5 medium red onion, sliced and separated into rings",
      "1 (11 ounce) can mandarin oranges, drained",
      "1.5 cups sweetened dried cranberries",
      "1 cup honey-roasted sliced almonds",
      "1 cup crumbled feta cheese",
      "1 cup balsamic vinaigrette salad dressing, or to taste"
    ],
    "instructions": [
      "Place servings of spinach onto salad plates. Top with red onion, mandarin oranges, cranberries, sliced almonds and feta cheese in that order. Drizzle dressing over each salad."
    ],
    "nutrition_per_serving": {
      "calories": 459,
      "total_fat_g": 30.0,
      "carbohydrates_g": 44.0,
      "fiber_g": 6.0,
      "sugar_g": 31.0,
      "protein_g": 10.0,
      "sodium_mg": 811,
      "cholesterol_mg": 22,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 355,
    "recipe_category": "Lunch",
    "cuisine": "North American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/265006/simple-cauliflower-keto-casserole/",
    "category": "keto",
    "id": 265006,
    "name": "Simple Cauliflower Keto Casserole",
    "description": "This keto cauliflower recipe is a simple low-carb side dish made with boiled cauliflower florets baked with melty Cheddar cheese and heavy cream.",
    "author": "Natasha Titanov",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0hG-6y7-7wmMnRPzkHHVkDcE85Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7033221-simple-cauliflower-keto-casserole-Mackenzie-Schieck-1x1-1-ff1907847e214385aff9595b7f9b9f28.jpg",
      "alt": "Simple Cauliflower Keto Casserole"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "2",
    "ingredients": [
      "0.5 head cauliflower florets",
      "1 cup shredded Cheddar cheese",
      "0.5 cup heavy cream",
      "salt and freshly ground black pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C).",
      "Bring a large pot of lightly salted water to a boil and cook cauliflower until tender but firm to the bite, about 10 minutes. Drain, then arrange cauliflower in a small casserole dish.",
      "Combine Cheddar cheese, cream, salt, and pepper in a bowl. Cover cauliflower with cheese mixture.",
      "Bake in the preheated oven until cheese is bubbly and golden brown, about 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 469,
      "total_fat_g": 41.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 4.0,
      "sugar_g": 4.0,
      "protein_g": 18.0,
      "sodium_mg": 494,
      "cholesterol_mg": 141,
      "saturated_fat_g": 26.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 88,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/87586/delicious-grilled-hamburgers/",
    "category": "burgers",
    "id": 87586,
    "name": "Delicious Grilled Hamburgers",
    "description": "These meaty grilled burgers made with lean ground beef and seasoned with garlic and Worcestershire sauce are juicy, smoky, and delicious.",
    "author": "BIGGUY728",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OG8RnYDLpfpXcqlPTFq60ddZlhg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/87586-Delicious-Grilled-Hamburgers-ddmfs-4x3-RM-1501-b513fb32b46f4789ae5f54e35966bc4e.jpg",
      "alt": "Delicious Grilled Hamburgers"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "3",
    "ingredients": [
      "1 pound lean ground beef",
      "1 tablespoon Worcestershire sauce",
      "1 tablespoon liquid smoke flavoring",
      "1 teaspoon garlic powder",
      "1 tablespoon olive oil",
      "seasoned salt to taste"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Preheat an outdoor grill for high heat and lightly oil the grate.",
      "Combine ground beef, Worcestershire sauce, liquid smoke, and garlic powder in a medium bowl; lightly mix until just combined.",
      "With minimal handling, form mixture into three patties.",
      "Brush oil onto both sides of each patty, then season with salt.",
      "Cook patties on the preheated grill until no longer pink in the center, about 5 minutes per side. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 396,
      "total_fat_g": 30.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 28.0,
      "sodium_mg": 220,
      "cholesterol_mg": 99,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 169,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/279354/pan-fried-turkey-burgers/",
    "category": "burgers",
    "id": 279354,
    "name": "Pan-Fried Turkey Burgers",
    "description": "You don't need a grill to prepare these flavorful pan-fried turkey burgers that are super easy to make on the stovetop.",
    "author": "FrackFamily5 CACT",
    "image": {
      "url": "https://www.allrecipes.com/thmb/1g55EhEmtNj1Pudgg1TD3-ghBqc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8080247-7a7d2039f8d348d6bd176fb5195bda9b.jpg",
      "alt": "Pan-Fried Turkey Burgers"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 shallot",
      "1.25 pounds ground turkey",
      "2 tablespoons mayonnaise",
      "2 tablespoons steak sauce (such as A1\u00ae)",
      "2 tablespoons dried parsley",
      "0.25 teaspoon garlic salt, divided, or to taste",
      "ground black pepper to taste",
      "cooking spray"
    ],
    "instructions": [
      "Grate shallot with a medium plane of a grater into a large bowl. Be sure to collect the juice. Add turkey, mayonnaise, steak sauce, and parsley. Mix gently with your hands until fully incorporated. Divide into 4 equal portions and gently form into patties. Season tops with garlic salt and pepper.",
      "Spray a large skillet with cooking spray and place over medium-high heat. When the pan is hot, place in burgers, seasoned-sides down. Season the opposite sides with more garlic salt and pepper. Cook until browned, 4 to 5 minutes. Flip; continue to cook until no longer pink, 4 to 5 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 275,
      "total_fat_g": 16.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 29.0,
      "sodium_mg": 349,
      "cholesterol_mg": 107,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 5,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8636/parmesan-chicken-ii/",
    "category": "chicken-parmesan",
    "id": 8636,
    "name": "Parmesan Chicken Legs",
    "description": "Crispy, delicious Parmesan chicken leg drumsticks are baked in the oven until golden brown, ready to enjoy in just about an hour.",
    "author": "Anika",
    "image": {
      "url": "https://www.allrecipes.com/thmb/AF8uwSlnaHqK0Xvw_IJfWAtD4pU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2238158-4c1ae626d57e459c906f020e6bde9951.jpg",
      "alt": "Parmesan Chicken Legs"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 45,
    "total_time_minutes": 60,
    "servings": "6",
    "ingredients": [
      "1 large egg",
      "2 cups grated Parmesan cheese",
      "1 teaspoon ground black pepper",
      "1 teaspoon salt",
      "12 chicken drumsticks"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Line a baking dish with foil.",
      "Whisk egg in a shallow bowl. Mix Parmesan, pepper, and salt together in another shallow bowl. Dip each chicken drumstick in egg; lift up so excess egg drips back into the bowl. Roll in Parmesan mixture until well coated. Place into the prepared baking pan.",
      "Bake in the preheated oven until golden brown on the outside, no longer pink at the bone, and the juices run clear, about 45 minutes. An instant-read thermometer inserted near the bone should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 466,
      "total_fat_g": 27.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 52.0,
      "sodium_mg": 981,
      "cholesterol_mg": 225,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 650,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/230664/a-20-minute-chicken-parmesan/",
    "category": "chicken-parmesan",
    "id": 230664,
    "name": "A 20-Minute Chicken Parmesan",
    "description": "Your family will enjoy a tasty dish of chicken Parmesan in just a few minutes, thanks to a simplified cooking technique and pre-made pasta sauce.",
    "author": "Aleksa",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0kxxjN5FJKo60QcXa7gd_Y_JgyA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/962460-76cc80dc3959444b83ea395dcdf9b80f.jpg",
      "alt": "A 20-Minute Chicken Parmesan"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "4 skinless, boneless chicken breast halves",
      "1 egg",
      "0.5 cup seasoned bread crumbs",
      "2 tablespoons butter",
      "1.75 cups pasta sauce (such as Barilla Napoletana\u00ae)",
      "0.5 cup shredded mozzarella cheese",
      "1 tablespoon grated Parmesan cheese",
      "0.25 cup chopped fresh parsley"
    ],
    "instructions": [
      "Press chicken breasts with the palm of your hand to flatten to an even thickness.",
      "Beat egg into a shallow bowl; place bread crumbs into a separate shallow bowl. Dip each chicken breast into beaten egg and press into bread crumbs to coat.",
      "Heat butter in a large skillet over medium heat and fry coated chicken breasts until golden brown, about 5 minutes per side.",
      "Pour pasta sauce over chicken, cover, and bring sauce to a boil. Reduce heat to low and simmer for 10 minutes. Sprinkle chicken with mozzarella cheese, Parmesan cheese, and parsley. Cover and simmer until cheeses melt, about 5 more minutes."
    ],
    "nutrition_per_serving": {
      "calories": 383,
      "total_fat_g": 16.0,
      "carbohydrates_g": 26.0,
      "fiber_g": 4.0,
      "sugar_g": 11.0,
      "protein_g": 33.0,
      "sodium_mg": 929,
      "cholesterol_mg": 135,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 40,
    "cuisine": "Italian Inspired",
    "recipe_category": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/271115/super-easy-chilaquiles/",
    "category": "chilaquiles",
    "id": 271115,
    "name": "Super Easy Chilaquiles",
    "description": "Chilaquiles are a quick brunch item with scrambled eggs, salsa, cheese, and tortillas. This super easy chilaquiles recipe can be scaled up or down.",
    "author": "Alona Sandoval-Grenacher",
    "image": {
      "url": "https://www.allrecipes.com/thmb/fAP2QoB0CKfcxmTYfuI5BxWXIwo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1018304-f3e38e59c27e4ae89ca22daff456b574.jpg",
      "alt": "Super Easy Chilaquiles"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "2",
    "ingredients": [
      "5 tablespoons corn oil",
      "8 (8 inch) corn tortillas, cut into triangles",
      "1 cup chipotle salsa",
      "6 eggs",
      "salt and ground black pepper to taste",
      "1 cup shredded pepper Jack cheese"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium-high heat; fry tortilla triangles until just starting to turn golden brown and crisp, 3 to 5 minutes. Add salsa; reduce heat to medium-low. Carefully mix tortillas and salsa with a spatula; cook 5 minutes.",
      "Beat eggs, salt, and black pepper together in a small bowl; add to tortilla mixture. Increase heat to medium-high; gently scramble eggs until just set. Top with pepper Jack cheese, cover skillet, and turn off heat. Let sit for 3 minutes until cheese is melted."
    ],
    "nutrition_per_serving": {
      "calories": 1074,
      "total_fat_g": 74.0,
      "carbohydrates_g": 65.0,
      "fiber_g": 10.0,
      "sugar_g": 6.0,
      "protein_g": 42.0,
      "sodium_mg": 1519,
      "cholesterol_mg": 629,
      "saturated_fat_g": 22.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/67394/easy-microwave-chilaquiles/",
    "category": "chilaquiles",
    "id": 67394,
    "name": "Easy Microwave Chilaquiles",
    "description": "This recipe is a speedy alternative to the more traditional Mexican breakfast dish. Enchilada sauce, tortilla chips, and Mexican cheese are assembled in layers, and then heated in the microwave to meld the flavors together.",
    "author": "Patty Pelfrey",
    "image": {
      "url": "https://www.allrecipes.com/thmb/GbK85uqbTij_xwXjRx2KOSsmzEE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4496166-90e96ca5c21645ef8a9d9dc4fe4f38a4.jpg",
      "alt": "Easy Microwave Chilaquiles"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 2,
    "total_time_minutes": 17,
    "servings": "4",
    "ingredients": [
      "1.75 cups enchilada sauce",
      "1 (7-1/2 ounce) bag corn tortilla chips",
      "2 cups sour cream",
      "12 ounces shredded queso asadero (white Mexican cheese)"
    ],
    "instructions": [
      "Cover the bottom of a shallow microwaveable dish, with some of the enchilada sauce. Arrange a layer of tortilla chips on top. Follow with another layer of sauce, then a layer of sour cream. Sprinkle cheese over the top. Repeat layers to use up all ingredients, finishing with cheese on top.",
      "Cook in the microwave on high for 2 minutes, or until cheese has melted throughout. Serve immediately."
    ],
    "nutrition_per_serving": {
      "calories": 950,
      "total_fat_g": 74.0,
      "carbohydrates_g": 47.0,
      "fiber_g": 4.0,
      "sugar_g": 1.0,
      "protein_g": 28.0,
      "sodium_mg": 858,
      "cholesterol_mg": 180,
      "saturated_fat_g": 39.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 12,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/262688/curried-chicken-salad-with-greek-yogurt/",
    "category": "chicken-salads",
    "id": 262688,
    "name": "Curried Chicken Salad with Greek Yogurt",
    "description": "Greek yogurt is the secret to this chicken salad, a quick, low-fat lunch option balanced with delicate almonds, lemon juice, and a hint of curry.",
    "author": "amanda85",
    "image": {
      "url": "https://www.allrecipes.com/thmb/beJTRf5V2FY_iA0feWyzWH81qA8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9333641-a07a1dbf71594d16bc0b79a808d56715.jpg",
      "alt": "Curried Chicken Salad with Greek Yogurt"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "1 pound cooked chicken breast, chopped",
      "2 stalks celery, chopped",
      "0.5 cup sliced almonds",
      "0.75 cup Greek yogurt",
      "2 teaspoons honey",
      "1.5 teaspoons lemon juice",
      "1.5 teaspoons curry powder",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Combine chicken with celery and almonds in a bowl.",
      "Mix Greek yogurt, honey, lemon juice, curry powder, salt, and pepper together in a small bowl. Pour dressing over the chicken salad and stir to combine."
    ],
    "nutrition_per_serving": {
      "calories": 346,
      "total_fat_g": 18.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 2.0,
      "sugar_g": 5.0,
      "protein_g": 36.0,
      "sodium_mg": 150,
      "cholesterol_mg": 94,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 11,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/14140/baked-macaroni-and-cheese/",
    "category": "cooking-for-two",
    "id": 14140,
    "name": "Baked Macaroni and Cheese",
    "description": "This easy mac and cheese is baked in the oven for a quick and easy meal, making this delicious casserole the perfect homemade comfort food dinner.",
    "author": "Meredith",
    "image": {
      "url": "https://www.allrecipes.com/thmb/_TpDrBwFIQbT_A6Pn6XZYC_8ioc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14140-baked-macaroni-and-cheese-ddmfs-0346-beauty-4x3-9b975d9c35f04f459a661405c1c85b7d.jpg",
      "alt": "Baked Macaroni and Cheese"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "6",
    "ingredients": [
      "1 (12 ounce) package macaroni",
      "2 cups milk",
      "1 egg",
      "2.5 cups shredded Cheddar cheese",
      "2 tablespoons butter, melted",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a 2-quart baking dish.",
      "Boil macaroni in a large pot of salted water until barely done, about 5 minutes. Drain and set aside to cool slightly.",
      "Whisk milk and egg together in a large bowl; stir in cheese and butter.",
      "Place par-boiled macaroni in the prepared baking dish. Pour milk mixture over macaroni, season with salt and pepper, and stir until combined. Press mixture evenly into the baking dish.",
      "Bake, uncovered, in the preheated oven until top is golden brown, 30 to 40 minutes.",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 472,
      "total_fat_g": 22.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 2.0,
      "sugar_g": 0,
      "protein_g": 22.0,
      "sodium_mg": 356,
      "cholesterol_mg": 66,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 616,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/237179/baked-halibut-with-crispy-panko/",
    "category": "cooking-for-one",
    "id": 237179,
    "name": "Baked Halibut with Crispy Panko",
    "description": "These baked halibut fillets feature Dijon mustard, bright lemon, butter, and crispy panko bread crumbs for one of the best healthy fish recipes ever.",
    "author": "Lindsey",
    "image": {
      "url": "https://www.allrecipes.com/thmb/_d_RqkcJvlBJRJgz3ubF_yFsaiQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/237179-ddmfs-baked-halibut-with-crispy-panko-3X4-2097-211aab6f66064139aa85977d7a6985af.jpg",
      "alt": "Baked Halibut with Crispy Panko"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "2",
    "ingredients": [
      "0.5 cup panko bread crumbs",
      "1.5 tablespoons butter, melted",
      "0.25 cup chicken stock, or as needed",
      "2 (8 ounce) fillets halibut",
      "1 teaspoon lemon juice",
      "salt and ground black pepper to taste",
      "1 tablespoon Dijon mustard"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Stir together panko bread crumbs and melted butter in a bowl until well combined. Set aside.",
      "Pour enough chicken stock into an oven-proof skillet to cover the bottom; arrange halibut fillets in the skillet.",
      "Drizzle lemon juice over fillets; season with salt and pepper. Spread a thin layer of Dijon mustard over each fillet; press bread crumb mixture into mustard.",
      "Bake fish in the skillet in the preheated oven until fillets flake easily with a fork and topping is browned, about 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 404,
      "total_fat_g": 14.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 0,
      "sugar_g": 0.0,
      "protein_g": 51.0,
      "sodium_mg": 591,
      "cholesterol_mg": 106,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 77,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/247066/parmesan-crusted-pork-chops/",
    "category": "cooking-for-one",
    "id": 247066,
    "name": "Parmesan Crusted Pork Chops",
    "description": "Parmesan crusted pork chops with Cajun seasoning have a crispy crust in this quick and easy baked recipe that makes a simple weeknight dish for two.",
    "author": "Chelsey Seamon",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9fAkglz99mtygNT6Fd7TZ5Q5_As=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3875421-parmesan-crusted-pork-chops-sanzoe-4x3-1-9a623021be7741738fe67a3f8b9d0d23.jpg",
      "alt": "Parmesan Crusted Pork Chops"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "2",
    "ingredients": [
      "cooking spray",
      "1 large egg",
      "0.25 cup grated Parmesan cheese",
      "1 teaspoon Cajun seasoning",
      "2 boneless pork chops, trimmed"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Spray a baking dish with cooking spray.",
      "Whisk egg in a shallow bowl.",
      "Mix Parmesan cheese and Cajun seasoning together on a plate.",
      "Dip each pork chop into egg. Press into Parmesan mixture until coated on both sides. Place in the prepared baking dish.",
      "Bake in the preheated oven until golden and an instant-read thermometer inserted into the center reads at least 145 degrees F (63 degrees C), 35 to 40 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 246,
      "total_fat_g": 13.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 31.0,
      "sodium_mg": 459,
      "cholesterol_mg": 161,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 457,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/11819/spaghetti-with-corned-beef/",
    "category": "corned-beef",
    "id": 11819,
    "name": "Spaghetti with Corned Beef",
    "description": "Ready-made spaghetti sauce is simmered with savory corned beef to make a thick, hearty topping for spaghetti cooked in bouillon.",
    "author": "Lymari",
    "image": {
      "url": "https://www.allrecipes.com/thmb/XZhcdFs8ZlqsGvtDaJZ0r_kD4LI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7705-c3a615a24b2d4ff0bb88a97ebd6ed25d.jpg",
      "alt": "Spaghetti with Corned Beef"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "8 ounces spaghetti",
      "1 (12 ounce) can corned beef",
      "1 cup spaghetti sauce",
      "1 cube chicken bouillon",
      "1 teaspoon Italian seasoning",
      "0.5 teaspoon garlic powder",
      "0.5 tablespoon dried minced onion"
    ],
    "instructions": [
      "Dissolve bouillon in boiling water. Break spaghetti noodles in half and add to boiling water until done.",
      "Over medium heat empty can of corned beef onto a skillet. Add spaghetti sauce to meat. Stir until heated; corned beef will come apart and a thick sauce will form. If desired, add Italian seasoning, garlic powder, dry onion, or any other spices.",
      "Once noodles are done, drain and combine with corned beef sauce."
    ],
    "nutrition_per_serving": {
      "calories": 383,
      "total_fat_g": 12.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 3.0,
      "sugar_g": 6.0,
      "protein_g": 25.0,
      "sodium_mg": 1114,
      "cholesterol_mg": 59,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 25,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/239428/crispy-panko-chicken-breasts/",
    "category": "fried-chicken",
    "id": 239428,
    "name": "Crispy Panko Chicken Breasts",
    "description": "This easy panko chicken recipe results in deliciously crispy pan-fried chicken breasts that are ready to serve in less than 15 minutes!",
    "author": "Mazola",
    "image": {
      "url": "https://www.allrecipes.com/thmb/H6WZudlkKqfnTCxK5syiE4cxQPM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/239428crispy-panko-chicken-breastsChefMo4x3-8295d05593e94a06b93d831786256f14.jpg",
      "alt": "Crispy Panko Chicken Breasts"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "1 pound boneless skinless chicken breasts",
      "1 egg",
      "1 cup panko crumbs",
      "0.5 teaspoon Spice Islands\u00ae Garlic Powder",
      "0.5 teaspoon Spice Islands\u00ae Onion Powder",
      "0.5 teaspoon Spice Islands\u00ae Fine Grind Sea Salt",
      "0.25 teaspoon Spice Islands\u00ae Fine Grind Black Pepper",
      "0.25 cup Mazola\u00ae Corn Oil"
    ],
    "instructions": [
      "Pound chicken breasts, one at a time, in a resealable plastic bag until about 1/2-inch thick.",
      "Lightly beat egg in a shallow bowl. Combine panko crumbs, garlic powder, onion powder, salt, and pepper in a separate shallow bowl.",
      "Dip chicken breasts in egg until coated, then dip in panko mixture, pressing chicken into the crumbs until fully coated. Arrange in a single layer on a plate.",
      "Heat oil in a large skillet over medium-high heat. Add chicken and cook until golden brown and cooked through, about 2 to 3 minutes per side."
    ],
    "nutrition_per_serving": {
      "calories": 335,
      "total_fat_g": 18.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 31.0,
      "sodium_mg": 546,
      "cholesterol_mg": 112,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 190,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235724/gluten-free-chicken-nuggets/",
    "category": "fried-chicken",
    "id": 235724,
    "name": "Gluten-Free Chicken Nuggets",
    "description": "These homemade chicken nuggets are breaded with rice flour and corn cereal for a gluten-free option of a kids' favorite.",
    "author": "Lacy Thon",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mUgbhDGQi7ecsF6QHPmIKpcAgyw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2433192-gluten-free-chicken-nuggets-Allrecipes-Magazine-4x3-1-cce9886caa4945a182749859f765cdd9.jpg",
      "alt": "Gluten-Free Chicken Nuggets"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 5,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "2 cups bite-size corn square cereal (such as Corn Chex\u00ae)",
      "2 eggs",
      "0.33333334326744 cup rice flour",
      "4 skinless, boneless chicken breast halves, cut into bite-size pieces",
      "0.25 cup oil for frying, or as needed"
    ],
    "instructions": [
      "Blend cereal in a blender or food processor until it has the consistency of bread crumbs; pour into a bowl.",
      "Beat eggs in a separate bowl until smooth. Pour rice flour into a third bowl.",
      "Dredge chicken pieces in the rice flour, dip in beaten egg, and then press into the cereal to coat. Keep breaded chicken on a large plate until all are finished, but do not stack.",
      "Pour enough oil into a large skillet to just cover the bottom and heat over medium-high heat.",
      "Cook chicken nuggets in hot oil until no longer pink in the center and the juices run clear, 2 to 3 minutes per side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 326,
      "total_fat_g": 9.0,
      "carbohydrates_g": 24.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 36.0,
      "sodium_mg": 249,
      "cholesterol_mg": 179,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 13,
    "recipe_category": "",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/281147/air-fryer-cornflake-chicken-fingers/",
    "category": "fried-chicken",
    "id": 281147,
    "name": "Air Fryer Cornflake Chicken Fingers",
    "description": "These cornflake chicken fingers are simply seasoned and cooked in the air fryer in 20 minutes for a quick and easy meal the whole family will love.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DkftD8EVsMFHEAIXj7FvP-R9G0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8392752-e8c46e23fc034b6fbec84468673db42d.jpg",
      "alt": "Air Fryer Cornflake Chicken Fingers"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 pound chicken tenders",
      "1 teaspoon poultry seasoning",
      "1 teaspoon salt",
      "0.5 teaspoon ground black pepper",
      "1 large egg, beaten",
      "1 cup corn flakes, crushed",
      "1 serving avocado oil cooking spray"
    ],
    "instructions": [
      "Preheat the air fryer to 375 degrees F (190 degrees C).",
      "Season chicken with poultry seasoning, salt, and black pepper.",
      "Place beaten egg onto a small rimmed plate. Place cornflakes onto a second rimmed plate.",
      "Dip chicken in beaten egg, then press in cornflakes to coat. Place in the air fryer basket and spray the tops with avocado oil.",
      "Cook in the preheated air fryer for 7 to 8 minutes. Flip chicken, spray again with avocado oil, and air fry for 3 to 5 minutes more. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 375,
      "total_fat_g": 10.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 55.0,
      "sodium_mg": 1419,
      "cholesterol_mg": 231,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 7,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275856/gnocchi-with-pesto-and-shrimp/",
    "category": "gnocchi",
    "id": 275856,
    "name": "Gnocchi with Pesto and Shrimp",
    "description": "Shrimp and asparagus are saut\u00e9ed in olive oil and garlic with gnocchi in pesto and a splash of lemon juice for a quick and easy recipe you'll enjoy.",
    "author": "Erica Monjeau",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9NbbvIYOqUXH6t3eYs5rBQVjXuI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8289160-e20212a393a7419ba073a8c778da0a98.jpg",
      "alt": "Gnocchi with Pesto and Shrimp"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 (16 ounce) package gnocchi",
      "2 tablespoons olive oil, divided",
      "1 bunch fresh asparagus, trimmed and sliced",
      "2 cloves garlic, minced",
      "1 pound uncooked medium shrimp, peeled and deveined",
      "5 ounces pesto, divided",
      "2 tablespoons fresh lemon juice, divided"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Cook gnocchi in the boiling water until they float to the top, 2 to 4 minutes. Transfer to a bowl using a slotted spoon; set aside.",
      "Meanwhile, heat 1 tablespoon olive oil in a large skillet over medium-high heat. Add asparagus and garlic; saut\u00e9 until asparagus is tender, about 5 minutes. Transfer to a plate.",
      "Heat remaining 1 tablespoon olive oil in the same skillet over medium-high heat. Add shrimp, 2 tablespoons pesto, and 1 tablespoon lemon juice; saut\u00e9 until shrimp are fully cooked and opaque, about 5 minutes. Add cooked gnocchi, asparagus, remaining pesto, and remaining 1 tablespoon lemon juice; stir to combine."
    ],
    "nutrition_per_serving": {
      "calories": 522,
      "total_fat_g": 33.0,
      "carbohydrates_g": 28.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 31.0,
      "sodium_mg": 573,
      "cholesterol_mg": 206,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 13,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21736/pan-seared-salmon-i/",
    "category": "gluten-free",
    "id": 21736,
    "name": "Pan-Seared Salmon",
    "description": "Learn how long to cook salmon on the stove with this quick and easy recipe for pan-seared salmon fillets that are seasoned with capers and lemon.",
    "author": "Noreen421",
    "image": {
      "url": "https://www.allrecipes.com/thmb/QodNcsUkNk-NdhkMQT20k-2vKgo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21736-PanSearedSalmon-ddmfs-Step4-0349-7f86294cb2bf420fa99f4dea30922492.jpg",
      "alt": "Pan-Seared Salmon"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "4 (6 ounce) fillets salmon",
      "2 tablespoons olive oil",
      "2 tablespoons capers",
      "0.125 teaspoon salt",
      "0.125 teaspoon ground black pepper",
      "4 slices lemon"
    ],
    "instructions": [
      "Preheat a large heavy skillet over medium heat for 3 minutes.",
      "Coat salmon fillets with olive oil; place skin-side down in the preheated skillet and increase heat to high.",
      "Sprinkle with capers, salt, and pepper; cook for 3 minutes on one side. Turn salmon fillets over; continue to cook until salmon flakes easily with a fork, about 5 minutes.",
      "Transfer salmon to individual plates and garnish with lemon slices."
    ],
    "nutrition_per_serving": {
      "calories": 371,
      "total_fat_g": 25.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 1.0,
      "sugar_g": 0,
      "protein_g": 34.0,
      "sodium_mg": 300,
      "cholesterol_mg": 99,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 260,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275855/baked-gnocchi-with-ground-turkey-and-marinara-sauce/",
    "category": "gnocchi",
    "id": 275855,
    "name": "Baked Gnocchi with Ground Turkey and Marinara Sauce",
    "description": "Gnocchi is baked with ground turkey and marinara sauce in this casserole dish that's a quick and easy weeknight option that only requires 5 ingredients.",
    "author": "wendylady72",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-ymlONs5t4D2FzVdumFBq3MC-A0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9370801-51184809d7fb45bea86e3b815bfcddda.jpg",
      "alt": "Baked Gnocchi with Ground Turkey and Marinara Sauce"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "8",
    "ingredients": [
      "1 (16 ounce) package potato gnocchi",
      "1 pound ground turkey",
      "1 (28 ounce) jar marinara sauce",
      "2 cups shredded Cheddar cheese",
      "1 cup sour cream"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Bring a large pot of lightly salted water to a boil. Cook gnocchi in the boiling water until they float to the top, 2 to 4 minutes.",
      "Meanwhile, heat a large skillet over medium-high heat. Cook and stir ground turkey in the hot skillet until browned and crumbly, about 5 minutes, making sure not to overcook as meat will continue to brown in the oven. Stir in marinara sauce; remove from heat.",
      "Transfer cooked gnocchi to a 9-inch square baking dish using a slotted spoon. Top with meat sauce. Sprinkle Cheddar cheese on top.",
      "Bake in the preheated oven until cheese begins to brown, 25 to 35 minutes. Serve with sour cream on the side."
    ],
    "nutrition_per_serving": {
      "calories": 450,
      "total_fat_g": 28.0,
      "carbohydrates_g": 25.0,
      "fiber_g": 3.0,
      "sugar_g": 9.0,
      "protein_g": 24.0,
      "sodium_mg": 706,
      "cholesterol_mg": 103,
      "saturated_fat_g": 15.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 3,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/14189/warm-shrimp-salad/",
    "category": "green-salads",
    "id": 14189,
    "name": "Warm Shrimp Salad",
    "description": "The gently sauteed shrimp are combined with butter lettuce, tomatoes, avocado, cucumbers, and shredded carrots, and then topped with your favorite dressing.",
    "author": "Liz Evans",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nIno-XqAzLgfsBIz9tNElE5S2Iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1959881-fc2874f140564ea289cead200a37e391.jpg",
      "alt": "Warm Shrimp Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "3",
    "ingredients": [
      "1 pound medium shrimp - peeled and deveined",
      "2 tablespoons butter",
      "2 lemons, juiced",
      "2 heads butter lettuce",
      "2 tomatoes, chopped",
      "1 avocado - peeled, pitted and diced",
      "2 stalks celery, chopped",
      "1 cucumber, cleaned and chopped",
      "0.5 cup shredded carrots",
      "0.33333334326744 cup vinaigrette salad dressing"
    ],
    "instructions": [
      "In a large saute pan melt butter over medium heat. Add the shrimp and lemon juice, cook until shrimp just turn pink. Remove from heat and drain.",
      "In a large bowl tear lettuce into bite-size pieces, add the tomatoes, avocado, celery, cucumber carrots and cooked shrimp, toss to combine. Top with your favorite dressing or vinaigrette."
    ],
    "nutrition_per_serving": {
      "calories": 460,
      "total_fat_g": 26.0,
      "carbohydrates_g": 29.0,
      "fiber_g": 12.0,
      "sugar_g": 9.0,
      "protein_g": 37.0,
      "sodium_mg": 566,
      "cholesterol_mg": 250,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 33,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/51283/maple-salmon/",
    "category": "healthy-recipes",
    "id": 51283,
    "name": "Maple Salmon",
    "description": "These maple-glazed salmon fillets are marinated and baked in a tasty sauce made with maple syrup, soy sauce, and garlic for an easy but elegant meal.",
    "author": "STARFLOWER",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Igk94cV2EmK7VB3SsS0NHXKlIGw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/51283-RM-maple-salmon-ddmfs-3x4-2624-1e5a9dc354a54744b72c6e19e8fbbcca.jpg",
      "alt": "Maple Salmon"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 60,
    "servings": "4",
    "ingredients": [
      "0.25 cup maple syrup",
      "2 tablespoons soy sauce",
      "1 clove garlic, minced",
      "0.25 teaspoon garlic salt",
      "0.125 teaspoon ground black pepper",
      "1 pound salmon"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Stir maple syrup, soy sauce, garlic, garlic salt, and pepper together in a small bowl.",
      "Cut salmon into 4 equal-sized fillets; place in a shallow glass baking dish and coat with maple syrup mixture. Cover the dish and marinate salmon in the refrigerator for 30 minutes, turning once halfway.",
      "Preheat the oven to 400 degrees F (200 degrees C).",
      "Place the baking dish in the preheated oven and bake salmon uncovered until flesh easily flakes with a fork, about 20 minutes.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 265,
      "total_fat_g": 12.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 0.0,
      "sugar_g": 12.0,
      "protein_g": 23.0,
      "sodium_mg": 633,
      "cholesterol_mg": 67,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 5859,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/234504/spruced-up-zatarains-jambalaya/",
    "category": "jambalayas",
    "id": 234504,
    "name": "Spruced-Up Zatarain's Jambalaya",
    "description": "A box of Zatarain's jambalaya mix is combined with andouille sausage, onion, and a can of diced tomatoes with green chile peppers for fantastic results.",
    "author": "Michelle Harris",
    "image": {
      "url": "https://www.allrecipes.com/thmb/MV5PfFybl2FMa9EYhrA9diEX9wE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8812121-spruced-up-zatarains-jambalaya-Heather-n-Jorja-Rollins-4x3-1-e7996e839b554b8f8abe88ddab46252a.jpg",
      "alt": "Spruced-Up Zatarain's Jambalaya"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "1 tablespoon olive oil, or as needed",
      "38 ounces andouille sausage, sliced",
      "1 medium onion, chopped",
      "2.5 cups water",
      "2 (8 ounce) packages jambalaya mix (such as Zatarain's\u00ae)",
      "1 (10 ounce) can diced tomatoes with green chile peppers (such as RO*TEL\u00ae), drained"
    ],
    "instructions": [
      "Heat oil in a large pot over medium-high heat. Add sausage and onion; saut\u00e9 until sausage is browned and onion is translucent, 7 to 10 minutes.",
      "Pour in water, then add jambalaya mix and diced tomatoes with chile peppers; bring to a boil. Reduce the heat to low, cover, and simmer until water is mostly absorbed and rice is tender, about 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 861,
      "total_fat_g": 53.0,
      "carbohydrates_g": 65.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 28.0,
      "sodium_mg": 2802,
      "cholesterol_mg": 103,
      "saturated_fat_g": 18.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 45,
    "recipe_category": "Dinner",
    "cuisine": "Cajun",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278090/lemon-garlic-air-fryer-salmon/",
    "category": "keto",
    "id": 278090,
    "name": "Lemon-Garlic Air Fryer Salmon",
    "description": "This buttery lemon-garlic salmon is easy to throw together in the air fryer with a few simple ingredients. For best results, use center-cut fillets that are about 1-inch thick.",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/RiD-xegoYbH2EA0niokDO50LSQI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9355544-61659415ea67452daf6ed91b428b54a0.jpg",
      "alt": "Lemon-Garlic Air Fryer Salmon"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "1 tablespoon melted butter",
      "0.5 teaspoon minced garlic",
      "2 (6 ounce) fillets center-cut salmon fillets with skin",
      "0.25 teaspoon lemon-pepper seasoning",
      "0.125 teaspoon dried parsley",
      "cooking spray",
      "3 thin slices lemon, cut in half"
    ],
    "instructions": [
      "Preheat the air fryer to 390 degrees F (200 degrees C).",
      "Combine melted butter and minced garlic in a small bowl.",
      "Rinse salmon fillets and dry with a paper towel. Brush with butter mixture and sprinkle with lemon-pepper seasoning and parsley.",
      "Spray the basket of the air fryer with cooking spray. Place salmon fillets in the basket, skin-side down, and top each with 3 lemon halves.",
      "Cook in the preheated air fryer for 8 to 10 minutes. Remove from the air fryer and let rest for 2 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 293,
      "total_fat_g": 16.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 1.0,
      "sugar_g": 0,
      "protein_g": 34.0,
      "sodium_mg": 174,
      "cholesterol_mg": 108,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 23,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/71387/best-salmon-bake/",
    "category": "Paleo",
    "id": 71387,
    "name": "Best Salmon Bake",
    "description": "Cook salmon in the oven for a deliciously quick and simple dinner. The salmon is topped with tomato and green onion, and baked to perfection.",
    "author": "MAGGIE1205",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OUIXaILEj7ylR1Ge1HZW6fj-cyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/71387-best-salmon-bake-DDMFS-4x3-91f1e33eb94440b3af4b6cf2b51d7605.jpg",
      "alt": "Best Salmon Bake"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "2",
    "ingredients": [
      "1 (1 pound) salmon fillet, halved",
      "1 small tomato, chopped",
      "5 green onions, chopped",
      "0.25 teaspoon salt",
      "0.25 teaspoon pepper"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Place salmon on a lightly oiled sheet pan or in a shallow baking dish, folding under thin outer edges of fillets for even cooking.",
      "Top salmon with chopped tomatoes and green onions, and season with salt and pepper.",
      "Cook salmon in the preheated oven, uncovered, until fish flakes easily with a fork, about 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 386,
      "total_fat_g": 22.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 40.0,
      "sodium_mg": 407,
      "cholesterol_mg": 112,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 48,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/217970/buffalo-chicken-salad/",
    "category": "buffalo-chicken-wings",
    "id": 217970,
    "name": "Buffalo Chicken Salad",
    "description": "This spicy buffalo chicken salad made with cooked chicken, ranch dressing, spicy wing sauce, celery, and green onions is a delicious sandwich filling.",
    "author": "Nikki",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DttzfTKKPGjVn951iYyiA9ZsyPM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/217970buffalo-chicken-saladfabeveryday4x3-f267c9023dc5474ab92b4b5f73ecca28.jpg",
      "alt": "Buffalo Chicken Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "2 cups cubed, cooked chicken",
      "3 stalks celery, diced",
      "2 green onions, chopped",
      "0.5 cup ranch dressing",
      "0.25 cup hot buffalo wing sauce (such as Frank's\u00ae REDHOT Buffalo Wing Sauce), or to taste",
      "salt and freshly ground black pepper to taste"
    ],
    "instructions": [
      "Combine chicken, celery, green onions, ranch dressing, Buffalo wing sauce, salt, and pepper in a bowl."
    ],
    "nutrition_per_serving": {
      "calories": 323,
      "total_fat_g": 25.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 19.0,
      "sodium_mg": 774,
      "cholesterol_mg": 63,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 37,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/",
    "category": "cooking-for-one",
    "id": 23891,
    "name": "Grilled Cheese Sandwich",
    "description": "Learn how to make a grilled cheese sandwich in a nonstick pan with buttered bread and sliced Cheddar; serve with tomato soup for a comforting classic.",
    "author": "Sara",
    "image": {
      "url": "https://www.allrecipes.com/thmb/pnEUcAXDg5GUJ77fUDzZp41NWkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-238891-Grilled-Cheese-Sandwich-beauty-4x3-362f705972e64a948b7ec547f7b2a831.jpg",
      "alt": "Grilled Cheese Sandwich"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "2",
    "ingredients": [
      "4 slices white bread",
      "3 tablespoons butter, divided",
      "2 slices Cheddar cheese"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat a nonstick skillet over medium heat. Generously butter one side of a slice of bread.",
      "Place bread butter-side down in the hot skillet; add 1 slice of cheese.",
      "Butter a second slice of bread on one side and place butter-side up on top of cheese.",
      "Cook until lightly browned on one side; flip over and continue cooking until cheese is melted.",
      "Repeat with remaining 2 slices of bread, butter, and slice of cheese. Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 400,
      "total_fat_g": 28.0,
      "carbohydrates_g": 26.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 11.0,
      "sodium_mg": 639,
      "cholesterol_mg": 76,
      "saturated_fat_g": 17.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 890,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/219756/pan-fried-wild-salmon/",
    "category": "cooking-for-one",
    "id": 219756,
    "name": "Pan-Fried Wild Salmon",
    "description": "Learn how to cook salmon with this simple recipe for flaky, moist fillets cooked on the stovetop in olive oil, served with separately fried skin.",
    "author": "Peter",
    "image": {
      "url": "https://www.allrecipes.com/thmb/gj-V3lncUA3GA4mQHBn5Wm4XhjA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/219756-pan-fried-salmon-ddmfs-4x3-0ecda59c24994aaaaec078c7932be3cc.jpg",
      "alt": "Pan-Fried Wild Salmon"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "2",
    "ingredients": [
      "2 (3 ounce) fillets salmon, with skin",
      "sea salt to taste",
      "2 tablespoons olive oil"
    ],
    "instructions": [
      "Gather all ingredients. Rinse salmon fillets and pat dry thoroughly with paper towels; season with sea salt.",
      "Heat olive oil in a large skillet over medium-high heat.Cook salmon fillets, skin-side up, in hot oil until flesh is golden brown, 5 to 7 minutes; flip and continue cooking until skin is slightly browned, about 5 minutes more.",
      "Use a slotted spatula to remove salmon, leaving drippings in the skillet.",
      "Remove skin from salmon; fry skin in drippings in the skillet until crispy, 2 to 3 minutes. Serve crispy skin with salmon."
    ],
    "nutrition_per_serving": {
      "calories": 241,
      "total_fat_g": 19.0,
      "carbohydrates_g": 0,
      "fiber_g": 0,
      "sugar_g": 0,
      "protein_g": 18.0,
      "sodium_mg": 195,
      "cholesterol_mg": 38,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 71,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/232789/easy-mini-bagel-pizzas/",
    "category": "Pizza",
    "id": 232789,
    "name": "Easy Mini Bagel Pizzas",
    "description": "These mini pizza bagels with pepperoni and melted cheese are quick and easy to make for a tasty after-school snack or light dinner for hungry kids.",
    "author": "LEANANSIDHE",
    "image": {
      "url": "https://www.allrecipes.com/thmb/NXhIKL0dtKi2CEeJNxDFMtZcGfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/232789-easy-mini-bagel-pizzas-VAT-Beauty-4x3-468e50c1f12347bf87421d1b4eb27784.jpg",
      "alt": "Easy Mini Bagel Pizzas"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "8 mini bagels, split",
      "0.25 cup pizza sauce",
      "0.33333334326744 cup shredded pizza cheese blend",
      "16 slices turkey pepperoni (such as Hormel\u00ae)"
    ],
    "instructions": [
      "Preheat the oven to 425 degrees F (220 degrees C). Line a baking sheet with aluminum foil.",
      "Arrange bagels, cut-side up, on the prepared baking sheet. Spoon a thin layer of pizza sauce over each bagel half and sprinkle with pizza cheese. Place two pepperoni slices onto each bagel half.",
      "Bake in the preheated oven until cheese is melted and pepperoni is lightly browned, about 6 minutes. Let cool slightly before serving."
    ],
    "nutrition_per_serving": {
      "calories": 232,
      "total_fat_g": 6.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 14.0,
      "sodium_mg": 788,
      "cholesterol_mg": 33,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 31,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/237788/tuna-and-avocado-salad/",
    "category": "tuna-salads",
    "id": 237788,
    "name": "Tuna and Avocado Salad",
    "description": "This tuna salad gets added creaminess from avocado and packs a punch with jalapeno and onion.",
    "author": "tjkirkwood",
    "image": {
      "url": "https://www.allrecipes.com/thmb/EmnYOwn3F_ParzhCndknTkq8Iew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1130371-9f0e520376ef4ca3876e71929e0450a2.jpg",
      "alt": "Tuna and Avocado Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "6",
    "ingredients": [
      "3 avocados - peeled, pitted, and diced",
      "3 (5 ounce) cans tuna in water, drained and flaked",
      "0.5 tomato, diced",
      "0.5 jalapeno pepper, diced",
      "0.25 cup diced white onion",
      "salt to taste"
    ],
    "instructions": [
      "Mix avocados, tuna, tomato, jalapeno pepper, and white onion together in a bowl; season with salt."
    ],
    "nutrition_per_serving": {
      "calories": 239,
      "total_fat_g": 15.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 7.0,
      "sugar_g": 1.0,
      "protein_g": 18.0,
      "sodium_mg": 65,
      "cholesterol_mg": 19,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 58,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278031/instant-pot-ground-beef-stroganoff/",
    "category": "beef-stroganoff",
    "id": 278031,
    "name": "Instant Pot Ground Beef Stroganoff",
    "description": "This crowd-pleasing, family-friendly beef stroganoff is made quickly and easily in the Instant Pot. Use ground turkey for a healthier version.",
    "author": "peloquinswife",
    "image": {
      "url": "https://www.allrecipes.com/thmb/C2BhrFkEa0sV8rKT0EGMeW1k3bU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7642847-03b8478165b7447fa1f331aab5163bbc.jpg",
      "alt": "Instant Pot Ground Beef Stroganoff"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": "8",
    "ingredients": [
      "1 pound ground beef",
      "16 ounces chopped fresh mushrooms",
      "2 onions, minced",
      "4 cloves garlic, minced",
      "4 cups water",
      "2 (10.75 ounce) cans condensed cream of mushroom soup",
      "1 (16 ounce) package egg noodles",
      "2 tablespoons Worcestershire sauce",
      "1 (1 ounce) package dry onion soup mix",
      "1 cup sour cream"
    ],
    "instructions": [
      "Turn on a multi-functional pressure cooker (such as Instant Pot) and select Saute function. Add ground beef, mushrooms, onions, and garlic. Cook and stir until beef is browned and crumbly and onions are soft, 5 to 7 minutes. Add water, soup, noodles, Worcestershire, and dry soup mix. Close and lock the lid.",
      "Select high pressure according to manufacturer's instructions; set timer for 3 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure using the natural-release method according to manufacturer's instructions, 10 to 40 minutes. Unlock and remove the lid. Stir in sour cream."
    ],
    "nutrition_per_serving": {
      "calories": 494,
      "total_fat_g": 20.0,
      "carbohydrates_g": 57.0,
      "fiber_g": 4.0,
      "sugar_g": 6.0,
      "protein_g": 22.0,
      "sodium_mg": 911,
      "cholesterol_mg": 95,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 43,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/83414/easy-baked-chicken-cordon-bleu/",
    "category": "chicken-cordon-bleu",
    "id": 83414,
    "name": "Easy Baked Chicken Cordon Bleu",
    "description": "Easy recipe that tastes like you cooked all day. Chicken breasts are wrapped around ham and mozzarella cheese for a change in this version of the classic baked dish.",
    "author": "HOLLYSTACH",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Vh4z_DX-DJwYwDGP9j-uUZ3slj0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1028120-easy-baked-chicken-cordon-bleu-Rebekah-Rose-Hills-4x3-1-18224c176cf84393b01c1710d667607c.jpg",
      "alt": "Easy Baked Chicken Cordon Bleu"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 40,
    "total_time_minutes": 60,
    "servings": "6",
    "ingredients": [
      "6 skinless, boneless chicken breast halves - pounded to 1/2 inch thickness",
      "6 string cheese sticks",
      "6 slices ham",
      "0.5 cup butter, melted",
      "1 cup seasoned dry bread crumbs",
      "toothpicks"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Lay out the pounded chicken breasts on a clean surface. Place a slice of ham on each piece, then one stick of cheese. Roll the chicken up around the cheese and ham, and secure with toothpicks. Dip each roll in melted butter, then roll in bread crumbs. Place in a shallow baking dish.",
      "Bake for 40 minutes in the preheated oven, or until chicken is browned and juices run clear."
    ],
    "nutrition_per_serving": {
      "calories": 423,
      "total_fat_g": 25.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 35.0,
      "sodium_mg": 759,
      "cholesterol_mg": 128,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 312,
    "recipe_category": "Dinner",
    "cuisine": "French Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275656/instant-pot-chicken-marsala/",
    "category": "chicken-marsala",
    "id": 275656,
    "name": "Instant Pot\u00ae Chicken Marsala",
    "description": "This chicken Marsala recipe is cooked in the Instant Pot\u00ae using the Saute function and produces moist chicken breasts in a rich Marsala wine and mushroom sauce.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/dbV63Kc7TNqkf689yHxfZ2KTDso=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6984520-1be057471d0345e7a346bc3757a42590.jpg",
      "alt": "Instant Pot\u00ae Chicken Marsala"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "0.25 cup all-purpose flour",
      "0.5 teaspoon salt, or to taste",
      "0.25 teaspoon freshly ground black pepper",
      "1.5 pounds skinless, boneless chicken breast halves",
      "0.25 cup oil",
      "2 cups sliced fresh mushrooms",
      "0.5 cup dry Marsala wine",
      "0.25 cup butter"
    ],
    "instructions": [
      "Combine flour, salt, and pepper in a shallow dish. Dredge chicken breasts through flour mixture.",
      "Turn on a multi-functional pressure cooker (such as Instant Pot\u00ae), select Saute function, and allow pot to heat up. Add oil. Add chicken and cook until lightly browned, 3 about minutes. Turn chicken over and add mushrooms. Cook, stirring mushrooms occasionally, until other side of the chicken is lightly browned, about 3 more minutes. Pour Marsala wine around chicken. Close and lock the lid, and simmer until chicken is no longer pink in the center and the juices run clear, about 5 minutes.",
      "Remove chicken from the pot and place on a serving platter. Add butter to the pot. Turn off heat and stir butter into sauce until fully blended. Pour sauce over chicken breasts and serve immediately."
    ],
    "nutrition_per_serving": {
      "calories": 322,
      "total_fat_g": 19.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 24.0,
      "sodium_mg": 300,
      "cholesterol_mg": 79,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 6,
    "recipe_category": "Dinner",
    "cuisine": "Italian Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/62696/chicken-parmesan-casserole/",
    "category": "chicken-parmesan",
    "id": 62696,
    "name": "Chicken Parmesan Casserole",
    "description": "This easy chicken Parmesan casserole with cooked chicken, pasta, mozzarella, marinara, and bread crumbs makes a tasty twist on the Italian classic.",
    "author": "morgens_aunt",
    "image": {
      "url": "https://www.allrecipes.com/thmb/it0XQ8WMzqVx9TYZ4KRS_vXWSgQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/62696-chicken-parmesan-casserole-VAT-007-Beauty-4x3-4aaf15ba8e21404f9cfd2eec560c3da6.jpg",
      "alt": "Chicken Parmesan Casserole"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 45,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "2 cups rotini pasta",
      "1 (12 ounce) can chicken chunks, drained",
      "1 cup shredded mozzarella cheese",
      "2 cups marinara sauce",
      "0.5 cup seasoned bread crumbs"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C).",
      "Fill a large pot with lightly salted water and bring to a rolling boil over high heat. Cook rotini in boiling water until tender yet firm to the bite, about 8 minutes. Drain.",
      "Stir together cooked rotini, chicken, and mozzarella cheese in a large casserole dish.",
      "Pour marinara sauce over pasta mixture; sprinkle with bread crumbs. Cover the dish with aluminum foil.",
      "Bake in the preheated oven until cheese is melted, about 35 minutes.",
      "Serve and enjoy."
    ],
    "nutrition_per_serving": {
      "calories": 359,
      "total_fat_g": 11.0,
      "carbohydrates_g": 39.0,
      "fiber_g": 3.0,
      "sugar_g": 6.0,
      "protein_g": 24.0,
      "sodium_mg": 891,
      "cholesterol_mg": 47,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 97,
    "recipe_category": "Dinner",
    "cuisine": "Italian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/25757/angelas-asian-inspired-chicken-noodle-soup/",
    "category": "chicken-noodle-soups",
    "id": 25757,
    "name": "Angela's Asian-Inspired Chicken Noodle Soup",
    "description": "Chicken-flavored ramen noodles are simmered with cooked chicken, bok choy, and carrots in this quick soup seasoned with a hint of sesame oil.",
    "author": "Angela DeMahy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/uM5UJKjAbp-ogQirxO29o-yF6cI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5199449-ddba998669c74c62a188d10dafb5ba3e.jpg",
      "alt": "Angela's Asian-Inspired Chicken Noodle Soup"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "3 cups water",
      "1 (3 ounce) package chicken-flavored ramen noodles",
      "2 cups chopped cooked chicken breast",
      "2 leaves bok choy, sliced",
      "1 carrot, sliced",
      "1 teaspoon sesame oil"
    ],
    "instructions": [
      "Bring water to a boil in a large saucepan. Break up the block of noodles and stir into the pot, reserving seasoning packet. Stir in chicken, bok choy, and carrot. Bring to a boil again, then reduce heat and simmer for 3 minutes. Stir in contents of seasoning packet and sesame oil."
    ],
    "nutrition_per_serving": {
      "calories": 218,
      "total_fat_g": 7.0,
      "carbohydrates_g": 15.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 23.0,
      "sodium_mg": 287,
      "cholesterol_mg": 53,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 27,
    "recipe_category": "Lunch",
    "cuisine": "World",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/15523/simply-parmesan-chicken/",
    "category": "chicken-parmesan",
    "id": 15523,
    "name": "Simply Parmesan Chicken",
    "description": "These easy Parmesan chicken breasts are dipped in egg and coated with herby Parmesan bread crumbs for a simple dinner the whole family will love.",
    "author": "Jenny",
    "image": {
      "url": "https://www.allrecipes.com/thmb/kNG7wvSHZ4H3wnbqWdwo017TQOQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/645375-dd641d81f7c442818cd03ac78625d657.jpg",
      "alt": "Simply Parmesan Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "5",
    "ingredients": [
      "1 large egg, beaten",
      "0.5 cup dried bread crumbs",
      "0.5 cup grated Parmesan cheese",
      "2 teaspoons Italian seasoning",
      "5 skinless, boneless chicken breasts"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Place beaten egg in a shallow bowl. Mix together bread crumbs, Parmesan cheese, and Italian seasoning in a second shallow bowl.",
      "Dip chicken breasts in egg, then press in bread crumb mixture to coat. Place coated chicken in a 9x13-inch baking dish.",
      "Bake in the preheated oven for 25 minutes. Flip chicken over and continue baking until no longer pink in the center and the juices run clear, 5 to 10 more minutes. An instant-read thermometer inserted into the center of chicken should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 224,
      "total_fat_g": 7.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 30.0,
      "sodium_mg": 274,
      "cholesterol_mg": 111,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 473,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235851/how-to-cook-trout/",
    "category": "cooking-for-one",
    "id": 235851,
    "name": "How to Cook Trout",
    "description": "This fresh trout recipe is seasoned, broiled, and served with the simplest butter-lemon sauce for a weeknight meal that couldn't be easier or quicker.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/21f52DWZ4o07ZVfYeLdS8YrGzvw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235851-how-to-cook-trout-DDMFS-4x3-eccffaf522f7447c9f7865751624b86a.jpg",
      "alt": "How to Cook Trout"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "0.25 cup butter",
      "2 (8 ounce) whole trout, butterflied and deboned",
      "salt and freshly ground black pepper to taste",
      "2 tablespoons freshly squeezed lemon juice",
      "2 tablespoons chopped fresh flat-leaf parsley"
    ],
    "instructions": [
      "Melt butter in a saucepan over medium-low heat until butter smells toasted and is golden brown, about 1 minute. Turn off heat.",
      "Line a baking sheet with a piece of aluminum foil. Place trout onto foil; open trout so skin sides are down. Drizzle each trout with about 1/2 teaspoon melted butter. Generously season with salt and black pepper.",
      "Move an oven rack to 5 or 6 inches below the heat source and preheat the oven's broiler on high heat.",
      "Broil trout until opaque and barely firm to the touch, 2 or 3 minutes. Remove from oven.",
      "Return pan of remaining melted butter over high heat; stir in lemon juice and parsley. Bring butter sauce to a boil; whisk to combine.",
      "Serve trout on plates and drizzle with butter sauce."
    ],
    "nutrition_per_serving": {
      "calories": 470,
      "total_fat_g": 33.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 40.0,
      "sodium_mg": 263,
      "cholesterol_mg": 181,
      "saturated_fat_g": 17.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 143,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/240993/lemon-garlic-chicken/",
    "category": "cooking-for-one",
    "id": 240993,
    "name": "Lemon Garlic Chicken",
    "description": "This lemon garlic chicken dish made with tender chicken breasts, butter, garlic, and lemon juice makes a quick and delicious meal in under 30 minutes.",
    "author": "Violet Kenow",
    "image": {
      "url": "https://www.allrecipes.com/thmb/U7N2mLx9q3bbyul2yrs6xW2a9ps=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-240993-lemon-garlic-chicken-VAT-4x3-4c73ee96b2b04fafa108fa7579185c87.jpg",
      "alt": "Lemon Garlic Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "3",
    "ingredients": [
      "2 tablespoons butter",
      "3 skinless, boneless chicken breast halves",
      "1.5 teaspoons salt",
      "1.5 teaspoons ground black pepper",
      "2 tablespoons garlic powder, divided",
      "1 lemon, juiced"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Melt butter in a skillet over medium-high heat. Season chicken with salt and pepper; place in melted butter. Cook chicken, flipping frequently, until browned, about 5 minutes.",
      "Sprinkle 1 tablespoon garlic powder over chicken; cook for 2 minutes. Flip and sprinkle remaining 1 tablespoon garlic powder on the second side; cook for 2 minutes.",
      "Pour lemon juice over each side of chicken and cook until no longer pink in the center, 5 to 10 minutes more. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 214,
      "total_fat_g": 11.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 25.0,
      "sodium_mg": 1275,
      "cholesterol_mg": 85,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 176,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/233683/lemon-panko-crusted-salmon/",
    "category": "cooking-for-one",
    "id": 233683,
    "name": "Lemon Panko-Crusted Salmon",
    "description": "Seasoned panko on salmon bakes up into a crispy, crunchy crust that adds excellent flavor and texture to this simple recipe for tender, flaky salmon.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Cv-7ByAlJW7Jvx0IcF2v9Cl215U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6312813-lemon-panko-crusted-salmon-Chef-Mo-4x3-1-87f39543923849b184fbc527b481e1cd.jpg",
      "alt": "Lemon Panko-Crusted Salmon"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "2",
    "ingredients": [
      "6 tablespoons panko bread crumbs",
      "1 tablespoon grated Parmesan cheese",
      "0.5 teaspoon lemon-pepper seasoning",
      "0.5 teaspoon dried thyme",
      "0.5 teaspoon dried parsley",
      "0.125 teaspoon granulated garlic",
      "0.125 teaspoon lemon zest",
      "2 (4 ounce) salmon fillets",
      "1 tablespoon butter, melted"
    ],
    "instructions": [
      "Preheat the oven to 375 degrees F (190 degrees C). Line a baking sheet with aluminum foil.",
      "Combine panko, Parmesan, lemon-pepper seasoning, thyme, parsley, garlic, and lemon zest in a bowl.",
      "Place salmon onto the prepared baking sheet. Brush melted butter over top, then sprinkle with panko mixture.",
      "Bake in the preheated oven until fish flakes easily with a fork, 20 to 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 298,
      "total_fat_g": 18.0,
      "carbohydrates_g": 15.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 23.0,
      "sodium_mg": 348,
      "cholesterol_mg": 73,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 41,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/25407/reuben-casserole/",
    "category": "corned-beef",
    "id": 25407,
    "name": "Reuben Casserole",
    "description": "This tasty Reuben casserole is made with layers of sauerkraut, corned beef, Swiss cheese, rye bread crumbs, and creamy Russian-style salad dressing.",
    "author": "JAMON0126",
    "image": {
      "url": "https://www.allrecipes.com/thmb/z6fTVbnOakKPobVnP_oOpouRIYY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25407-reuben-casserole-DDMFS-4x3-1-2ab7536cb1074a9ab49e829ffd5088b4.jpg",
      "alt": "Reuben Casserole"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "6",
    "ingredients": [
      "6 slices rye bread, cubed",
      "1 (16 ounce) can sauerkraut, drained and rinsed",
      "1 pound deli sliced corned beef, cut into strips",
      "0.75 cup Russian-style salad dressing",
      "cooking spray",
      "2 cups shredded Swiss cheese"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Spray a 9x13-inch casserole dish with cooking spray. Spray one sheet of aluminum foil with cooking spray.",
      "Spread bread cubes in the bottom of the prepared casserole dish. Layer bread cubes with sauerkraut and beef strips, then pour dressing over top. Cover with the aluminum foil, sprayed-side down.",
      "Bake in the preheated oven for 20 minutes. Remove and discard foil; sprinkle Swiss cheese over casserole. Continue baking until cheese is melted and bubbly, about 10 more minutes."
    ],
    "nutrition_per_serving": {
      "calories": 525,
      "total_fat_g": 39.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 3.0,
      "sugar_g": 4.0,
      "protein_g": 26.0,
      "sodium_mg": 1659,
      "cholesterol_mg": 115,
      "saturated_fat_g": 13.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 426,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/232102/easy-chicken-and-dumplings/",
    "category": "dumplings",
    "id": 232102,
    "name": "Easy Chicken and Dumplings",
    "description": "This chicken and dumplings soup is easy to make with chicken breasts, veggies, and baking mix for a warming weeknight dinner. Sure to put a smile on everyone's face!",
    "author": "Jen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OheU42kdBhiwo2ZY95k088A--QY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9049692-easy-chicken-and-dumplings-Dadinkel-4x3-1-9afe85b5b23c488cb9d6418b54ab9caf.jpg",
      "alt": "Easy Chicken and Dumplings"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "1 (32 ounce) container chicken broth",
      "4 skinless, boneless chicken breast halves, cubed, or more as needed",
      "1 onion, chopped",
      "0.5 (16 ounce) package baby carrots",
      "2 stalks celery, chopped",
      "1 bay leaf",
      "salt and ground black pepper to taste",
      "2.25 cups baking mix (such as Bisquick \u00ae)",
      "0.66666668653488 cup milk"
    ],
    "instructions": [
      "Combine chicken broth, chicken, onion, carrots, celery, bay leaf, salt, and pepper in a large pot; bring to a boil. Reduce the heat, cover, and simmer until chicken is no longer pink in the center and the vegetables are tender, 20 to 25 minutes.",
      "Mix baking mix and milk together in a bowl until a sticky dough forms. Drop golf ball-sized pieces of dough into the soup. Cover the pot and cook until dumplings are cooked through, about 10 more minutes."
    ],
    "nutrition_per_serving": {
      "calories": 310,
      "total_fat_g": 9.0,
      "carbohydrates_g": 35.0,
      "fiber_g": 2.0,
      "sugar_g": 6.0,
      "protein_g": 20.0,
      "sodium_mg": 1362,
      "cholesterol_mg": 45,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 196,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/281448/grilled-chicken-fajitas/",
    "category": "fajitas",
    "id": 281448,
    "name": "Grilled Chicken Fajitas",
    "description": "Grilled chicken fajitas made with chicken breasts and fajita seasoning are cooked on the grill with bell peppers until tender, juicy, and smoky.",
    "author": "mikeandmelody",
    "image": {
      "url": "https://www.allrecipes.com/thmb/AyLWtvRuldcbNvGk5rs7cKCF3fk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/281448-grilled-chicken-fajitas-mfs-4-6c901272e8e34755bf0c5a535c8cb9fa.jpg",
      "alt": "Grilled Chicken Fajitas"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 50,
    "servings": "5",
    "ingredients": [
      "2 limes, juiced",
      "2 tablespoons olive oil",
      "2 tablespoons fajita seasoning",
      "1 pound skinless, boneless chicken breast halves",
      "2 large yellow bell peppers",
      "2 large red bell peppers",
      "10 (6 inch) flour tortillas, warmed"
    ],
    "instructions": [
      "Whisk lime juice, olive oil, and fajita seasoning together in a bowl and pour into a resealable plastic bag. Add chicken breasts, coat with marinade, squeeze out excess air, and seal the bag. Marinate in the refrigerator for 30 minutes.",
      "Preheat an outdoor grill to medium heat and lightly oil the grate.",
      "Cut bell peppers in half and discard inner membranes and seeds.",
      "Remove chicken from marinade and shake off excess. Discard remaining marinade.",
      "Place chicken and peppers (cut-side down) on the preheated grill. Cook, turning occasionally until chicken is no longer pink in center, juices run clear, and peppers have nice grill marks on them, about 15 minutes. An instant-read thermometer inserted into center should read at least 165 degrees F (74 degrees C).",
      "Cut peppers and chicken into strips and serve on tortillas."
    ],
    "nutrition_per_serving": {
      "calories": 402,
      "total_fat_g": 13.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 5.0,
      "sugar_g": 6.0,
      "protein_g": 26.0,
      "sodium_mg": 625,
      "cholesterol_mg": 52,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 6,
    "recipe_category": "Dinner",
    "cuisine": "Mexican",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/47374/easy-chicken-enchiladas/",
    "category": "enchiladas",
    "id": 47374,
    "name": "Easy Chicken Enchiladas",
    "description": "These easy chicken enchiladas are stuffed tortillas with creamy shredded chicken and salsa filling, beans, and cheese for a quick and tasty dinner.",
    "author": "IANKRIS",
    "image": {
      "url": "https://www.allrecipes.com/thmb/GlNe8jwhKIDG1mQA9XxVnXRVgW8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/47374-easy-chicken-enchiladas-VAT-003-Beauty-4x3-cbf1579d64144ac1afa4f168a4f3d91d.jpg",
      "alt": "Easy Chicken Enchiladas"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "1 (8 ounce) package cream cheese",
      "1 cup salsa",
      "2 cups chopped cooked chicken breast meat",
      "1 (15.5 ounce) can pinto beans, drained",
      "6 (6 inch) flour tortillas",
      "2 cups shredded Colby-Jack cheese"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a 9x13-inch baking dish.",
      "Combine cream cheese and salsa in a small saucepan over medium heat; cook and stir until well blended. Stir in chicken and pinto beans.",
      "Fill tortillas with chicken mixture, roll up and place into the prepared baking dish. Sprinkle shredded cheese on top. Cover pan with aluminum foil.",
      "Bake in the preheated oven for until heated through, about 30 minutes.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 565,
      "total_fat_g": 34.0,
      "carbohydrates_g": 33.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 33.0,
      "sodium_mg": 1166,
      "cholesterol_mg": 120,
      "saturated_fat_g": 20.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 1287,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/177781/campbells-easy-chicken-and-cheese-enchiladas/",
    "category": "enchiladas",
    "id": 177781,
    "name": "Campbell's Easy Chicken and Cheese Enchiladas",
    "description": "A creamy filling of chicken, sour cream, and cheese gets an added \"kick\" stirred into it with Pace Picante Sauce. Rolled up in tortillas and baked until bubbly, these enchiladas couldn't be easier, or any more delicious.",
    "author": "Campbell's Kitchen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/lgKnHwwDzCNd3rI6lwS3Bmc1f7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/469150_Campbells-Easy-Chicken-and-Cheese-Enchiladas-4x3-706f34dd1e0343769c125adcc0345fe0.jpg",
      "alt": "Campbell's Easy Chicken and Cheese Enchiladas"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "1 (10.75 ounce) can Campbell's\u00ae Condensed Cream of Chicken Soup (Regular, 98% Fat Free or Healthy Request\u00ae)",
      "0.5 cup sour cream",
      "1 cup Pace\u00ae Picante Sauce",
      "2 teaspoons chili powder",
      "2 cups chopped cooked chicken",
      "0.5 cup shredded Monterey Jack cheese",
      "6 flour tortillas (6\"), warmed",
      "1 small tomato, chopped",
      "1 green onion, sliced"
    ],
    "instructions": [
      "Stir soup, sour cream, picante sauce, and chili powder in a medium bowl until combined.",
      "Transfer 1 cup of the soup-sauce mixture into a large bowl; stir in chicken and cheese.",
      "Divide chicken mixture among the tortillas. Roll up the tortillas and place them seam side up in 11x8-inch shallow baking dish. Pour the remaining picante sauce mixture over the filled tortillas. Cover the baking dish.",
      "Bake at 350 degrees F until the enchiladas are hot and bubbling, about 40 minutes. Top with tomato and onion."
    ],
    "nutrition_per_serving": {
      "calories": 456,
      "total_fat_g": 19.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 5.0,
      "sugar_g": 5.0,
      "protein_g": 23.0,
      "sodium_mg": 1248,
      "cholesterol_mg": 56,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 461,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/279295/air-fryer-shrimp-fajitas/",
    "category": "fajitas",
    "id": 279295,
    "name": "Air Fryer Shrimp Fajitas",
    "description": "Shrimp fajitas are really easy to make at home in an air fryer. Serve on flour tortillas with your favorite toppings!",
    "author": "Soup Loving Nicole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/RiSNZZWqV_vGk53TI2_1VDgGcdk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7811552-a0f4787a674544f087dec892e125cd23.jpg",
      "alt": "Air Fryer Shrimp Fajitas"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "1 pound uncooked medium shrimp, peeled and deveined",
      "1 (1.12 ounce) package fajita seasoning mix, divided",
      "3 tablespoons olive oil, divided",
      "1 red bell pepper, sliced into thin strips",
      "1 green bell pepper, sliced into thin strips",
      "1 red onion, sliced into thin strips",
      "4 (10 inch) flour tortillas, toasted"
    ],
    "instructions": [
      "Preheat an air fryer to 400 degrees F (200 degrees C).",
      "Place shrimp into a bowl and sprinkle 2 teaspoons fajita seasoning over top. Drizzle with 1 tablespoon oil and toss to combine.",
      "Place bell pepper and onion strips into a second bowl and sprinkle remaining seasoning over top. Drizzle with remaining 2 tablespoons oil and stir to combine.",
      "Place vegetables in the basket of the preheated air fryer and cook for 12 minutes, shaking halfway through the cook time. Transfer mixture to a large bowl.",
      "Place shrimp in the basket of the air fryer and cook for 5 minutes. Flip and cook for 3 minutes more.",
      "Divide vegetables among tortillas and top with shrimp."
    ],
    "nutrition_per_serving": {
      "calories": 442,
      "total_fat_g": 17.0,
      "carbohydrates_g": 48.0,
      "fiber_g": 4.0,
      "sugar_g": 4.0,
      "protein_g": 25.0,
      "sodium_mg": 1202,
      "cholesterol_mg": 173,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 9,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236060/fettuccine-alfredo-with-chicken/",
    "category": "fettuccini",
    "id": 236060,
    "name": "Fettuccine Alfredo with Chicken",
    "description": "This fettuccine Alfredo has creamy sauce, succulent chicken, perfectly al dente pasta, and a sprinkle of fresh herbs... All that's missing is the waiter and the check.",
    "author": "Philadelphia",
    "image": {
      "url": "https://www.allrecipes.com/thmb/GBi-u472X3xPkXxa9ARAqxg7964=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8269179-9c310792c4164d5dbd8a37a2dabc0144.jpg",
      "alt": "Fettuccine Alfredo with Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "0.5 pound fettuccine, uncooked",
      "cooking spray",
      "1 pound boneless skinless chicken breasts, cut into strips",
      "1.25 cups fat-free, reduced-sodium chicken broth",
      "4 teaspoons flour",
      "4 ounces PHILADELPHIA Neufchatel cheese, cubed",
      "3 tablespoons KRAFT Grated Parmesan Cheese, divided",
      "0.25 teaspoon garlic powder",
      "0.25 teaspoon pepper"
    ],
    "instructions": [
      "Fill a large pot with lightly salted water and bring to a rolling boil. Cook fettuccine at a boil until tender yet firm to the bite, about 8 minutes. Drain.",
      "Meanwhile, heat large nonstick skillet sprayed with cooking spray on medium-high heat. Add chicken; cook, stirring occasionally, until chicken is done, 5 to 7 minutes. Remove from the skillet.",
      "Mix broth and flour into the same skillet. Stir in Neufch\u00e2tel cheese, 2 tablespoons Parmesan, garlic powder, and pepper; cook, whisking constantly, until mixture boils and thickens, about 2 minutes. Stir in chicken.",
      "Place cooked fettuccine in a large serving bowl. Add chicken mixture; toss to coat. Sprinkle with remaining 1 tablespoon Parmesan."
    ],
    "nutrition_per_serving": {
      "calories": 470,
      "total_fat_g": 12.0,
      "carbohydrates_g": 49.0,
      "fiber_g": 3.0,
      "sugar_g": 1.0,
      "protein_g": 37.0,
      "sodium_mg": 552,
      "cholesterol_mg": 91,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 88,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/257306/easy-skinless-fried-chicken-thighs/",
    "category": "fried-chicken",
    "id": 257306,
    "name": "Easy Skinless Fried Chicken Thighs",
    "description": "These fried chicken thighs use skinless thighs coated with seasoned flour and fried in corn oil for a lower calorie version of Southern fried chicken.",
    "author": "Silvia",
    "image": {
      "url": "https://www.allrecipes.com/thmb/tWCFAR0wiytkXv_fP3Dx1Y9eUuA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/257306-easy-skinless-fried-chicken-thighs-ddmfs-4x3-0914-dcd76b46b8af43e49f956204fdbdc68d.jpg",
      "alt": "Easy Skinless Fried Chicken Thighs"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "1 cup corn oil, or as needed",
      "0.5 cup all-purpose flour",
      "2 teaspoons salt",
      "0.5 teaspoon ground black pepper",
      "0.5 teaspoon paprika",
      "0.5 teaspoon garlic powder",
      "8 skinless chicken thighs"
    ],
    "instructions": [
      "Gather all ingredients. Heat oil in a large, deep skillet to 350 degrees F (175 degrees C).",
      "Combine flour, salt, pepper, paprika, and garlic powder in a large resealable plastic bag; mix well.",
      "Pat chicken thighs dry with paper towels. Add to flour mixture in the plastic bag; seal the bag and shake until thoroughly coated.",
      "Fry chicken in hot oil, turning occasionally, until deep golden brown, about 20 minutes. Drain on a paper towel-lined plate."
    ],
    "nutrition_per_serving": {
      "calories": 483,
      "total_fat_g": 23.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 44.0,
      "sodium_mg": 1302,
      "cholesterol_mg": 149,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 34,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/272398/air-fryer-chicken-thigh-schnitzel/",
    "category": "fried-chicken",
    "id": 272398,
    "name": "Air Fryer Chicken Thigh Schnitzel",
    "description": "This air fryer chicken schnitzel recipe is an easy way to cook breaded chicken thighs in the air fryer until crispy for a flavorful spin on a classic.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/wDTTbUicpIPfb8YsHGrT-1cCmVw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6475870-air-fryer-chicken-thigh-schnitzel-Yoly-4x3-1-2b05f343cdbd4e80ad3f5b9295af6a4e.jpg",
      "alt": "Air Fryer Chicken Thigh Schnitzel"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "1 pound skinless, boneless chicken thighs, trimmed of fat",
      "0.5 cup seasoned bread crumbs",
      "1 teaspoon salt",
      "0.5 teaspoon ground black pepper",
      "0.25 cup flour",
      "1 large egg, beaten",
      "avocado oil cooking spray"
    ],
    "instructions": [
      "Place chicken thighs, one at a time, between 2 sheets of parchment paper and flatten with a mallet.",
      "Combine bread crumbs, salt, and black pepper in a shallow bowl. Place flour in a separate shallow bowl and beaten egg in a third shallow bowl. Dip chicken thighs first in flour, then in beaten egg. Finally, coat with seasoned bread crumbs.",
      "Preheat an air fryer to 375 degrees F (190 degrees C).",
      "Place breaded thighs in the air fryer basket, making sure they are not touching; work in batches if necessary. Mist with avocado oil and cook for 6 minutes. Flip each thigh, mist with oil, and cook an additional 3 to 4 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 293,
      "total_fat_g": 14.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 24.0,
      "sodium_mg": 927,
      "cholesterol_mg": 117,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 17,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/267403/air-fryer-breakfast-frittata/",
    "category": "frittatas",
    "id": 267403,
    "name": "Air Fryer Breakfast Frittata",
    "description": "This versatile air fryer breakfast frittata recipe uses a cake pan that fits in the air fryer basket for fuss-free, light, and fluffy results.",
    "author": "bdweld",
    "image": {
      "url": "https://www.allrecipes.com/thmb/YzQXNDJvYsnpCTvdlWn6mAPKQdI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5682775-air-fryer-breakfast-frittata-Buckwheat-Queen-1x1-1-1de72c53a775426cb38b003383bb75e2.jpg",
      "alt": "Air Fryer Breakfast Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "2",
    "ingredients": [
      "cooking spray",
      "0.25 pound breakfast sausage, fully cooked and crumbled",
      "4 large eggs, lightly beaten",
      "0.5 cup shredded Cheddar-Monterey Jack cheese blend",
      "2 tablespoons red bell pepper, diced",
      "1 green onion, chopped",
      "1 pinch cayenne pepper"
    ],
    "instructions": [
      "Preheat an air fryer to 360 degrees F (180 degrees C). Spray a nonstick 6x2-inch cake pan with cooking spray.",
      "Combine sausage, eggs, cheese, bell pepper, green onion, and cayenne pepper in a large bowl; mix well to combine.",
      "Pour egg mixture into the prepared cake pan.",
      "Cook in the preheated air fryer until frittata is set, 18 to 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 380,
      "total_fat_g": 27.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 31.0,
      "sodium_mg": 694,
      "cholesterol_mg": 443,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 74,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/213199/potato-crunchy-tenders/",
    "category": "fried-chicken",
    "id": 213199,
    "name": "Potato Crunchy Tenders",
    "description": "These potato crunchy tenders feature fried chicken fingers coated in garlic-flavored mashed potato flakes before frying, making a quick, easy meal.",
    "author": "beccalynn",
    "image": {
      "url": "https://www.allrecipes.com/thmb/TIdJCXwwDxgCz2SmIvFi-7Plq20=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1102450-3fdef42a5a3a4892a5797e8cb9ebeeab.jpg",
      "alt": "Potato Crunchy Tenders"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "6",
    "ingredients": [
      "0.5 cup vegetable oil for frying",
      "1.5 cups milk",
      "1 egg",
      "1 (7.6 ounce) package garlic flavored instant mashed potatoes",
      "2 teaspoons salt",
      "2 teaspoons ground black pepper",
      "1.5 pounds chicken tenders"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium heat.",
      "Meanwhile, beat together milk and egg in a shallow bowl. Stir together instant mashed potatoes, salt, and pepper in another shallow bowl.",
      "Stir chicken tenders with milk mixture to coat thoroughly, then shake off excess milk and dip each tender into potato flakes.",
      "Cook breaded tenders in hot oil until golden brown, 7 to 10 minutes. Drain on a paper towel-lined plate."
    ],
    "nutrition_per_serving": {
      "calories": 556,
      "total_fat_g": 26.0,
      "carbohydrates_g": 35.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 45.0,
      "sodium_mg": 945,
      "cholesterol_mg": 139,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 121,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278705/air-fryer-chicken-katsu/",
    "category": "fried-chicken",
    "id": 278705,
    "name": "Air Fryer Chicken Katsu",
    "description": "Try making your own air-fryer chicken katsu. You need only a few ingredients and it comes together very quickly. Serve with tonkatsu or barbecue sauce for dipping.",
    "author": "Bibi",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ihdUwgw8OFmHp2R2glqWHA69dWg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/278705-air-fryer-chicken-katsu-KH-031523-9554-4x3-e731ed464f914925a4c333167f139818.jpg",
      "alt": "Air Fryer Chicken Katsu"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "2",
    "ingredients": [
      "1 large egg",
      "salt to taste",
      "1 cup panko bread crumbs",
      "0.75 pound chicken breast cutlets",
      "avocado oil cooking spray",
      "1 tablespoon barbecue sauce",
      "1 tablespoon chopped green onions"
    ],
    "instructions": [
      "Preheat an air fryer to 400 degrees F (200 degrees C) according to the manufacturer's recommendations.",
      "Beat egg and salt lightly in a shallow bowl or a small casserole dish. Place panko bread crumbs on a plate.",
      "Dip each cutlet into egg mixture, allowing excess to drip back into the bowl. Turn cutlets in panko bread crumbs so both sides are coated well, pressing the cutlets gently into the crumbs. Set on a piece of parchment paper. Spray each side with cooking spray and place in the basket of the air fryer.",
      "Air-fry for 5 minutes, turn, and air-fry for an additional 4 minutes. Serve with barbecue sauce and garnish with green onions."
    ],
    "nutrition_per_serving": {
      "calories": 411,
      "total_fat_g": 13.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 0.0,
      "sugar_g": 2.0,
      "protein_g": 43.0,
      "sodium_mg": 545,
      "cholesterol_mg": 189,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 8,
    "recipe_category": "Dinner",
    "cuisine": "Asian Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/125394/day-before-pay-day-fried-rice/",
    "category": "fried-rice",
    "id": 125394,
    "name": "Day Before Pay Day Fried Rice",
    "description": "This recipes is quick to fix using leftovers from previous days of cooking. My son and husband 'fought' each other for the last of this dish the first time I made it. It tastes that good.",
    "author": "xvc",
    "image": {
      "url": "https://www.allrecipes.com/thmb/HPUW01HQOKj_nZT9oqVg3XFFy8I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5099803-057221adb9984313a4498a577e1c6def.jpg",
      "alt": "Day Before Pay Day Fried Rice"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "6",
    "ingredients": [
      "3 tablespoons vegetable oil, divided",
      "3 eggs, beaten",
      "3 cups cold, cooked white rice",
      "2 cups chopped cooked chicken",
      "0.5 cup sliced celery",
      "0.5 cup shredded carrot",
      "1 cup frozen green peas, thawed",
      "2 green onions, sliced",
      "3 tablespoons soy sauce"
    ],
    "instructions": [
      "Heat 1 tablespoon of oil in a wok or large skillet over medium-high heat. Pour in the eggs; cook and stir until scrambled and firm. Remove from wok, and set aside.",
      "Put remaining 2 tablespoons of oil in the wok and turn heat up to high. Stir in rice until each grain is coated with oil. Stir in chicken, celery, carrot, peas and green onions. Reduce heat to medium, cover and allow to steam for 5 minutes. Stir in scrambled eggs and soy sauce, and cook until eggs are heated through."
    ],
    "nutrition_per_serving": {
      "calories": 315,
      "total_fat_g": 13.0,
      "carbohydrates_g": 28.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 20.0,
      "sodium_mg": 559,
      "cholesterol_mg": 128,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 160,
    "recipe_category": "Dinner",
    "cuisine": "Asian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/230326/gnocchi-with-chicken-pesto-and-fresh-mozzarella/",
    "category": "gnocchi",
    "id": 230326,
    "name": "Gnocchi with Chicken, Pesto and Fresh Mozzarella",
    "description": "This is a quick and easy recipe for potato gnocchi with chicken and mozzarella cheese in a pesto sauce.",
    "author": "slocatelli",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ngS0-qTyhd-WUwfKIU_E3pbj5ls=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/230326gnocchi-with-chicken-pesto-and-fresh-mozzarellaMyHotSouthernMEss4x3-c649f7aa19594eeaa10530ae688ff25b.jpg",
      "alt": "Gnocchi with Chicken, Pesto and Fresh Mozzarella"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "1 tablespoon olive oil",
      "1 skinless, boneless chicken breast half - cut into 1 1/2-inch cubes",
      "salt and ground black pepper to taste",
      "2 tablespoons chicken broth",
      "1 (8 ounce) jar prepared pesto",
      "1 (12 ounce) package potato gnocchi",
      "4 ounces small fresh mozzarella balls"
    ],
    "instructions": [
      "Heat olive oil in a saucepan. Season chicken pieces with salt and pepper; cook and stir in the hot oil until no longer pink in the middle, 7 to 10 minutes. Remove chicken to a bowl using a slotted spoon, retaining drippings in the pan.",
      "Pour chicken broth into the saucepan. Bring broth to a boil while scraping the browned bits of food off of the bottom of the pan with a wooden spoon; continue cooking until the broth reduces in volume by about half, 7 to 10 minutes. Return cooked chicken to the saucepan. Stir pesto through the chicken mixture; remove from heat.",
      "Bring a large pot of lightly salted water to a rolling boil. Cook gnocchi at a boil until they float to the top, about 3 minutes. Remove gnocchi from the water to a large bowl using a slotted spoon, retaining water in the pot.",
      "Place the saucepan with the chicken and pesto over the boiling water; cook and stir over the boiling water until warmed completely, about 5 minutes. Pour chicken and pesto mixture over the gnocchi; add mozzarella and stir until evenly mixed."
    ],
    "nutrition_per_serving": {
      "calories": 570,
      "total_fat_g": 44.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 25.0,
      "sodium_mg": 653,
      "cholesterol_mg": 75,
      "saturated_fat_g": 16.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 45,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/237406/quinoa-chicken/",
    "category": "ground-chicken",
    "id": 237406,
    "name": "Quinoa Chicken",
    "description": "This ground chicken and quinoa recipe is quick and easy to make. Diced tomatoes with green chile peppers gives this one-dish dinner a spicy kick!",
    "author": "StephR0131",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Y31dNtIT2oSeCtj_w8bl8lEsvH4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/237406-ddmfs-quinoa-chicken-4X3-2108-637bbcd1ff95412faeeb77744a3488df.jpg",
      "alt": "Quinoa Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "2 cups chicken broth",
      "1 cup quinoa",
      "2 teaspoons vegetable oil, or as needed",
      "0.5 onion, chopped",
      "2 cloves garlic, or to taste, minced",
      "1.5 pounds ground chicken",
      "1.5 (10 ounce) cans diced tomatoes with green chile peppers (such as RO*TEL\u00ae)"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Bring chicken broth and quinoa to a boil in a saucepan. Reduce heat to medium-low, cover, and simmer until quinoa is tender and water has been absorbed, 15 to 20 minutes.",
      "Meanwhile, heat vegetable oil in a large skillet over medium-high heat. Saut\u00e9 onion and garlic in hot oil until onion is translucent, about 5 minutes. Add ground chicken; cook and stir until browned and crumbly, 5 to 7 minutes.",
      "Stir cooked quinoa and diced tomatoes into chicken mixture; bring to a simmer and cook long enough for flavors to meld, about 10 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 275,
      "total_fat_g": 7.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 3.0,
      "sugar_g": 0.0,
      "protein_g": 30.0,
      "sodium_mg": 343,
      "cholesterol_mg": 69,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 211,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275548/air-fryer-meatballs/",
    "category": "ground-pork",
    "id": 275548,
    "name": "Air Fryer Meatballs",
    "description": "Air fryer meatballs are quick, easy, and mess-free to make. The insides stay tender and juicy while the outsides brown up nicely. Serve with marinara.",
    "author": "Nicole Russell",
    "image": {
      "url": "https://www.allrecipes.com/thmb/uqPya1Id8Sm6ePwWMvfi0gVAugg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/275548_AirFryerMeatballs_4x3_306-106a4d48e6c44b26ac4322409993713b.jpg",
      "alt": "Air Fryer Meatballs"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "16 ounces lean ground beef",
      "4 ounces ground pork",
      "0.5 cup grated Parmesan cheese",
      "0.33333334326744 cup Italian seasoned bread crumbs",
      "1 egg",
      "2 cloves garlic, minced",
      "1 teaspoon Italian seasoning",
      "0.5 teaspoon salt"
    ],
    "instructions": [
      "Preheat an air fryer to 350 degrees F (175 degrees C).",
      "Combine beef, pork, Parmesan cheese, bread crumbs, egg, garlic, Italian seasoning, and salt in a large bowl; mix until evenly combined.",
      "Form mixture into 16 equal meatballs (a small ice cream scoop is helpful); place on a baking sheet.",
      "Place \u00bd meatballs in the air fryer basket; cook 8 minutes. Shake the basket; cook 2 minutes more. Transfer to a serving plate; rest for 5 minutes. Repeat with remaining \u00bd meatballs.",
      "Serve warm and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 457,
      "total_fat_g": 33.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 1.0,
      "sugar_g": 0,
      "protein_g": 30.0,
      "sodium_mg": 634,
      "cholesterol_mg": 114,
      "saturated_fat_g": 13.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 56,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16359/breakfast-sausage/",
    "category": "ground-pork",
    "id": 16359,
    "name": "Homemade Breakfast Sausage",
    "description": "Homemade breakfast sausage patties made with ground pork, brown sugar, and sage deliver sweet and savory flavor in every bite. Serve alongside eggs or in a breakfast sandwich!",
    "author": "Lee",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Xno7dT2Fhg9EJt_tXP0ezsAwEVE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16359-breakfast-sausage-DDMFS-4x3-b2172456aa614158a0c5e710a75215ae.jpg",
      "alt": "Homemade Breakfast Sausage"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "6",
    "ingredients": [
      "1 tablespoon brown sugar",
      "2 teaspoons dried sage",
      "2 teaspoons salt",
      "1 teaspoon ground black pepper",
      "0.25 teaspoon dried marjoram",
      "0.125 teaspoon crushed red pepper flakes",
      "1 pinch ground cloves",
      "2 pounds ground pork"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Mix together brown sugar, sage, salt, black pepper, marjoram, red pepper flakes, and cloves in a small bowl until well combined.",
      "Place pork in a large bowl. Add spice mixture and mix with your hands until well combined. Form mixture into 6 patties.",
      "Heat a large skillet over medium-high heat. Add patties and saute until browned and crispy, about 5 minutes per side. An instant-read thermometer inserted into the center should read at least 160 degrees F (71 degrees C).",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 409,
      "total_fat_g": 32.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 0.0,
      "sugar_g": 2.0,
      "protein_g": 26.0,
      "sodium_mg": 861,
      "cholesterol_mg": 109,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 835,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/139339/thai-ground-chicken-basil/",
    "category": "ground-chicken",
    "id": 139339,
    "name": "Thai Ground Chicken Basil",
    "description": "Lots of garlic, hot chilies, and a whole bunch of basil make this one flavorful dish! If you like Thai food, you'll be happy to know that you can make this simple, satisfying dish in less time that it takes to go for take-out.",
    "author": "Valery K",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OghHaMnE1T7C9OSTEl8FIqFadAA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1697597-thai-ground-chicken-basil-Marisa-R.-4x3-1-2f09c6f083a04ff196c0e735bd15b10e.jpg",
      "alt": "Thai Ground Chicken Basil"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 5,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "2 tablespoons peanut oil",
      "0.25 cup minced garlic",
      "1 pound ground chicken breast",
      "12 Thai chiles, sliced into thin rings",
      "2 teaspoons black soy sauce",
      "2 tablespoons fish sauce",
      "1 cup fresh basil leaves"
    ],
    "instructions": [
      "Heat a wok over high heat until smoking. Pour in peanut oil, then immediately add garlic. Stir-fry garlic until it begins to turn golden brown, about 20 seconds. Mix in the ground chicken and continue cooking and stirring until the meat is crumbly and no longer pink, about 2 minutes.",
      "Stir in the sliced chilies, soy sauce, and fish sauce. Cook for about 15 seconds to soften the chilies, then add the basil, and continue cooking until the basil has wilted."
    ],
    "nutrition_per_serving": {
      "calories": 273,
      "total_fat_g": 11.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 2.0,
      "sugar_g": 7.0,
      "protein_g": 29.0,
      "sodium_mg": 769,
      "cholesterol_mg": 69,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 139,
    "recipe_category": "Dinner",
    "cuisine": "Thai",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/246299/chicken-cheese-steak/",
    "category": "ground-chicken",
    "id": 246299,
    "name": "Chicken Cheesesteak",
    "description": "These tasty open-faced chicken cheesesteak sandwiches need few ingredients and are a quick and easy 10-minute option for a family-friendly dinner.",
    "author": "Anya",
    "image": {
      "url": "https://www.allrecipes.com/thmb/sFBTV9TlnnQGtV6iX2Nz5_pEkPw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chicken-Cheesesteak-Chef-Mo-1x1-1-745e29cbd4914005a47d91d6105a1822.jpg",
      "alt": "Chicken Cheesesteak"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "2 tablespoons vegetable oil, divided",
      "1 medium onion, chopped",
      "1 medium green bell pepper, chopped",
      "1 pound ground chicken",
      "salt and ground black pepper to taste",
      "4 slices American cheese",
      "2 (8 inch) hoagie rolls, split lengthwise"
    ],
    "instructions": [
      "Heat 1 tablespoon oil in a nonstick skillet over medium-high heat. Add onion and bell pepper; cook and stir until tender, 8 to 10 minutes.",
      "At the same time, heat remaining 1 tablespoon oil in another nonstick skillet over medium-high heat. Add ground chicken; cook and stir until chicken is crumbly and no longer pink, 8 to 10 minutes.",
      "Add cooked onion and pepper mixture to the chicken; season with salt and pepper. Lay American cheese slices over top and cook until melted, 2 to 3 minutes.",
      "Spread 1/4 of the cheesy chicken mixture evenly over each roll half and serve."
    ],
    "nutrition_per_serving": {
      "calories": 501,
      "total_fat_g": 21.0,
      "carbohydrates_g": 38.0,
      "fiber_g": 3.0,
      "sugar_g": 5.0,
      "protein_g": 39.0,
      "sodium_mg": 915,
      "cholesterol_mg": 93,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 7,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/239951/baked-turkey-meatballs/",
    "category": "ground-turkey",
    "id": 239951,
    "name": "Baked Turkey Meatballs",
    "description": "It doesn't take long to make these oven-baked turkey meatballs! In less than 30 minutes, they'll be ready to add to any of your favorite dishes.",
    "author": "Kudra",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9h3Ygm7WUb3ua5poyOZhOvWsHO4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-239951-baked-turkey-meatballs-dmfs-4x3-ac1e7a02513c45d6b3821de93330c137.jpg",
      "alt": "Baked Turkey Meatballs"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "1 pound ground turkey",
      "0.5 cup Italian bread crumbs",
      "0.25 cup thinly sliced baby spinach",
      "1 large egg",
      "2 tablespoons onion powder",
      "2 tablespoons garlic powder"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 375 degrees F (190 degrees C).",
      "Mix turkey, bread crumbs, spinach, egg, onion powder, and garlic powder together in a bowl until well combined.",
      "Roll mixture into eight palm-sized meatballs and place 2 inches apart on a baking sheet.",
      "Bake in the preheated oven until no longer pink in the center and the outside is browned, 15 to 20 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 267,
      "total_fat_g": 11.0,
      "carbohydrates_g": 16.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 27.0,
      "sodium_mg": 350,
      "cholesterol_mg": 130,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 51,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/213827/real-traditional-irish-soda-bread/",
    "category": "irish-soda-bread",
    "id": 213827,
    "name": "Real Traditional Irish Soda Bread",
    "description": "Traditional Irish soda bread has only 4 ingredients: flour, baking soda, salt, and buttermilk, and was cooked on an open fire or stovetop, not baked.",
    "author": "barry",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ZTCTMyXBa3MaYson-slcd3p-ZSM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/629777-63d78c8f5fd8425c9448a925c24a7647.jpg",
      "alt": "Real Traditional Irish Soda Bread"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "2 cups all-purpose flour",
      "1 pinch salt",
      "1 teaspoon baking soda",
      "1 cup buttermilk"
    ],
    "instructions": [
      "Heat a heavy skillet, griddle, or cast-iron frying pan over medium-low heat.",
      "Stir the flour and salt together in a bowl, and sift in the baking soda. Make a well in the center of the flour mixture, and pour in the buttermilk. Stir the mixture quickly together into a dough, and turn out onto a floured work surface. Knead the dough a few times, just until it comes together. Gently form the dough into a flattened, round cake about 1/2 inch thick, and cut the round into quarters with a floured knife.",
      "Sprinkle a little bit of flour into the bottom of the hot skillet, and cook the wedges 6 to 8 minutes per side, until golden brown."
    ],
    "nutrition_per_serving": {
      "calories": 252,
      "total_fat_g": 1.0,
      "carbohydrates_g": 51.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 9.0,
      "sodium_mg": 380,
      "cholesterol_mg": 3,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 50,
    "recipe_category": "Breakfast",
    "cuisine": "Irish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278092/air-fryer-keto-pork-chops/",
    "category": "keto",
    "id": 278092,
    "name": "Air Fryer Keto Pork Chops",
    "description": "This air fryer recipe for keto pork chops guarantees crisp, tasty, tender pork chops every time. Perfect for a last-minute dinner with minimal cleanup.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/YKS_ir5Oipt2ynBM848U_U52rG0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7577773-53071aa10d3d4f3e8976f7e492d02ab0.jpg",
      "alt": "Air Fryer Keto Pork Chops"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "1 egg",
      "0.33333334326744 cup grated Parmesan cheese",
      "0.33333334326744 cup almond flour",
      "0.5 teaspoon salt",
      "0.25 teaspoon pepper",
      "4 boneless pork chops, 1/2-inch thick",
      "0.25 teaspoon garlic powder",
      "1 serving avocado oil cooking spray"
    ],
    "instructions": [
      "Beat egg in a medium bowl. Mix Parmesan cheese, almond flour, salt, pepper, and garlic powder together in a second bowl.",
      "Season pork chops with salt and pepper on both sides. Dip each pork chop into egg, then into Parmesan-flour mixture to coat. Place into the air fryer basket and spritz with cooking spray.",
      "Cook in the air fryer at 375 degrees F (190 degrees C) until lightly browned, 8 to 10 minutes. Flip pork chops, spritz with cooking spray, and cook until pork is no longer pink in the center, 3 to 4 minutes more. An instant-read thermometer inserted into the center should read at least 145 degrees F (63 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 365,
      "total_fat_g": 17.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 47.0,
      "sodium_mg": 516,
      "cholesterol_mg": 159,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 12,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/17124/clam-linguine/",
    "category": "linguine",
    "id": 17124,
    "name": "Clam Linguine",
    "description": "Enjoy linguine pasta with clams and tomatoes, tossed in a mixture of butter and olive oil with aromatic garlic and fresh parsley any night of the week.",
    "author": "Paris",
    "image": {
      "url": "https://www.allrecipes.com/thmb/6QwxXGvS76Vs00GSGlG8zB3KdvI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7901235-548de4a37770435b91ba2833583666e5.jpg",
      "alt": "Clam Linguine"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "0.25 cup olive oil",
      "0.25 cup butter",
      "3 cloves garlic, crushed",
      "3 large tomatoes, diced",
      "0.5 cup chopped fresh parsley",
      "1 (6.5 ounce) can minced clams, with juice",
      "0.5 pound linguine pasta",
      "0.5 cup freshly grated Parmesan cheese"
    ],
    "instructions": [
      "In a medium skillet over medium heat, heat olive oil and butter. Add tomatoes, parsley, and garlic; simmer and let reduce, about 5 minutes. Add some clam juice if the sauce reduces too much.",
      "Meanwhile, bring a large pot of lightly salted water to a boil. Add pasta and cook for 3 minutes or until al dente; drain.",
      "Add pasta and clams to the skillet and heat through; top with Parmesan cheese and serve immediately."
    ],
    "nutrition_per_serving": {
      "calories": 461,
      "total_fat_g": 30.0,
      "carbohydrates_g": 29.0,
      "fiber_g": 3.0,
      "sugar_g": 4.0,
      "protein_g": 20.0,
      "sodium_mg": 385,
      "cholesterol_mg": 64,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 64,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/139299/simple-time-pork-chops/",
    "category": "Pork-Chops",
    "id": 139299,
    "name": "Simple Pork Chops",
    "description": "Learn how long to cook pork chops in the oven with this easy, cheesy baked pork chop recipe that makes a delicious dinner any day of the week.",
    "author": "mystery76f",
    "image": {
      "url": "https://www.allrecipes.com/thmb/aXu6-vp89poY2BjIWBTE1HsC0Tg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/139299-simple-time-pork-chops-ddmfs-3X4-0107-d565402aee8f4abbb83d9acb30b4aceb.jpg",
      "alt": "Simple Pork Chops"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "4 boneless pork chops",
      "4 teaspoons butter, softened",
      "4 teaspoons mayonnaise",
      "1 teaspoon seasoned salt",
      "1 teaspoon garlic powder",
      "1 teaspoon dried parsley",
      "1 cup shredded sharp Cheddar cheese"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (180 degrees C).",
      "Place pork chops in a baking pan. Spread 1 teaspoon of butter over each chop, then spread 1 teaspoon of mayonnaise on top of butter.",
      "Season each chop with seasoning salt, garlic powder, and parsley. Sprinkle 1/4 cup cheese over the top of each chop.",
      "Bake in the preheated oven until pork is slightly pink in the center, about 35 minutes. An instant-read thermometer inserted into the center should read at least 145 degrees F (63 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 325,
      "total_fat_g": 25.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 24.0,
      "sodium_mg": 525,
      "cholesterol_mg": 91,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 499,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/262361/pan-fried-tofu/",
    "category": "tofu",
    "id": 262361,
    "name": "Pan-Fried Tofu",
    "description": "Here's how to cook tofu in a pan. This easy tofu is breaded in nutritional yeast and favorite spices. It's a quick vegan main course, savory snack, or crunchy side.",
    "author": "KES115",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nBQY7w1VysuJpRY8yVK6b-XZzAA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5119685-pan-fried-tofu-Buckwheat-Queen-4x3-1-d8ffcf699e454c2c984673a4bb23f309.jpg",
      "alt": "Pan-Fried Tofu"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 (16 ounce) package water-packed firm tofu, drained and rinsed",
      "6 tablespoons nutritional yeast",
      "0.5 teaspoon garlic powder, or to taste",
      "salt and ground black pepper to taste",
      "1.5 tablespoons olive oil"
    ],
    "instructions": [
      "Slice tofu into 1/4-inch-thick slabs.",
      "Place nutritional yeast on a plate. Mix in garlic powder, salt, and pepper.",
      "Roll tofu slices in nutritional yeast mixture until evenly coated.",
      "Heat oil in a nonstick skillet over low to medium heat. Add tofu slices; cook until golden brown and crispy, 3 to 5 minutes per side."
    ],
    "nutrition_per_serving": {
      "calories": 248,
      "total_fat_g": 15.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 6.0,
      "sugar_g": 0.0,
      "protein_g": 24.0,
      "sodium_mg": 59,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 8,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/82280/tuna-noodles-pickles-and-cheese/",
    "category": "tuna-salads",
    "id": 82280,
    "name": "Tuna, Noodles, Pickles and Cheese",
    "description": "This tuna, noodles, pickles, and cheese recipe is reminiscent of a cold macaroni or potato salad. My grandma used peas instead of pickles in her version.",
    "author": "NERDYCHEESECAKE",
    "image": {
      "url": "https://www.allrecipes.com/thmb/37iY8GgWUtWOSEW5p6Nljc1b5Ho=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/995767-6938a9b3ee1c41b3a30d864d537dca2f.jpg",
      "alt": "Tuna, Noodles, Pickles and Cheese"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "8 ounces uncooked elbow macaroni",
      "6 ounces Colby-Jack cheese, cubed",
      "2 dill pickles, chopped",
      "1 (5 ounce) can albacore tuna in water, drained and flaked",
      "0.5 cup light mayonnaise",
      "0.5 teaspoon prepared yellow mustard",
      "1 teaspoon dill pickle juice",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Bring a saucepan of lightly salted water to a boil. Cook elbow macaroni in the boiling water, stirring occasionally, until tender yet firm to the bite, about 7 minutes. Rinse under cold running water, then drain well, and pat lightly with paper towels.",
      "Combine macaroni, Colby-Jack cheese, pickles, tuna, mayonnaise, and mustard in a large bowl; season with pickle juice, salt, and black pepper.",
      "Cover bowl; refrigerate before serving, at least 30 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 491,
      "total_fat_g": 18.0,
      "carbohydrates_g": 55.0,
      "fiber_g": 3.0,
      "sugar_g": 8.0,
      "protein_g": 26.0,
      "sodium_mg": 1611,
      "cholesterol_mg": 55,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 73,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/169329/chipotle-chicken-salad/",
    "category": "chicken-salads",
    "id": 169329,
    "name": "Chipotle Chicken Salad",
    "description": "Cubed chicken breast is combined with smoky, spicy chipotle peppers and feta cheese in this flavorful salad.",
    "author": "Toni Losada",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jEwu9Cnukd3bjhTt7wyOgS5eBGE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/169329chipotle-chicken-saladChefMo4x3-68bc1896ee0a46f794fd6f681509d6a4.jpg",
      "alt": "Chipotle Chicken Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "6",
    "ingredients": [
      "2.5 cups cubed cooked chicken",
      "1 cup mayonnaise",
      "0.25 cup crumbled reduced-fat feta cheese",
      "2 green onions, chopped",
      "3 tablespoons reduced-fat sour cream",
      "3 chipotle peppers in adobo sauce, minced",
      "garlic salt and pepper to taste"
    ],
    "instructions": [
      "Combine chicken, mayonnaise, feta cheese, green onions, sour cream, and chipotle peppers in a bowl. Season with garlic, salt, and pepper to taste. Stir until evenly combined."
    ],
    "nutrition_per_serving": {
      "calories": 404,
      "total_fat_g": 36.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 19.0,
      "sodium_mg": 472,
      "cholesterol_mg": 64,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 50,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/11760/quick-gnocchi/",
    "category": "dumplings",
    "id": 11760,
    "name": "Quick Gnocchi",
    "description": "Make tender, delicious gnocchi using instant mashed potatoes to slash prep time. Blend egg, salt, pepper, flour and mashed potatoes into a dough, cut into bite -size pieces and cook in boiling water. Serve with the sauce of your choice.",
    "author": "Sandy Metzler",
    "image": {
      "url": "https://www.allrecipes.com/thmb/TXcAy4HPPNvxDi-jAZcAWe55pRY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11760-quick-gnocchi-VAT-Beauty-4x3-4d356d345af145c282d2665e24f65aef.jpg",
      "alt": "Quick Gnocchi"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": "2",
    "ingredients": [
      "1 cup dry potato flakes",
      "1 cup boiling water",
      "1 egg, beaten",
      "1 teaspoon salt",
      "0.125 teaspoon ground black pepper",
      "1.5 cups all-purpose flour"
    ],
    "instructions": [
      "Place potato flakes in a medium-size bowl. Pour in boiling water; stir until blended. Let cool.",
      "Stir in egg, salt, and pepper. Blend in enough flour to make a fairly stiff dough. Turn dough out on a well floured board. Knead lightly.",
      "Divide dough in half. Shape each half into a long thin roll, the thickness of a breadstick. With a knife dipped in flour, cut into bite-size pieces.",
      "Place a few gnocchi in boiling water. As the gnocchi rise to the top of the pot, remove them with a slotted spoon. Repeat until all are cooked."
    ],
    "nutrition_per_serving": {
      "calories": 462,
      "total_fat_g": 4.0,
      "carbohydrates_g": 91.0,
      "fiber_g": 4.0,
      "sugar_g": 1.0,
      "protein_g": 15.0,
      "sodium_mg": 1225,
      "cholesterol_mg": 93,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 504,
    "recipe_category": "Dinner",
    "cuisine": "Italian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/261477/cheesy-chile-eggrolls/",
    "category": "egg-rolls",
    "id": 261477,
    "name": "Cheesy Chile Eggrolls",
    "description": "These cheesy chile eggrolls are deep-fried and use only 3 ingredients - eggroll wrappers, fire-roasted green chiles, and pepper Jack cheese.",
    "author": "Culinary Envy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/5DtKAkM8llmqCpX1ZKRWhzDYlmY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3083937-c0b6db94b94c4da4b48c6fbe0bce250d.jpg",
      "alt": "Cheesy Chile Eggrolls"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 3,
    "total_time_minutes": 23,
    "servings": "8",
    "ingredients": [
      "1 (16 ounce) package large egg roll wrappers (such as Nasoya\u00ae)",
      "2 (7 ounce) cans whole fire-roasted mild green chiles (such as La Victoria\u00ae), or more to taste",
      "1 pound shredded pepper Jack cheese",
      "1.5 cups canola oil for frying"
    ],
    "instructions": [
      "Place eggroll wraps on a work surface. Place 1 whole green chile diagonally on the wrap. Add about 2 tablespoons pepper Jack cheese, or enough to cover chile. Fold bottom corner over filling. Roll snugly halfway to cover filling. Fold in both sides snugly against filling to look like an envelope; moisten edges of last flap with a moistened finger. Roll wrap up and seal top corner using water again to moisten edges to make them stick. Lay flap-side down until ready to cook. Repeat with remaining ingredients.",
      "Heat canola oil in a deep saucepan over medium heat to 350\u00b0F. Lower eggrolls with the flap side down carefully into the hot oil in batches. Fry until golden, turning occasionally, 2 to 3 minutes. Transfer to a plate lined with paper towels to drain. Repeat with remaining eggrolls."
    ],
    "nutrition_per_serving": {
      "calories": 433,
      "total_fat_g": 23.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 18.0,
      "sodium_mg": 1240,
      "cholesterol_mg": 66,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 2,
    "recipe_category": "Dinner",
    "cuisine": "Asian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8532487/instant-pot-dump-and-go-seven-can-soup/",
    "category": "instant-pot",
    "id": 8532487,
    "name": "Instant Pot Dump and Go Seven Can Soup",
    "description": "The easiest Instant Pot dump and go soup with beans, corn, green beans, and potatoes.",
    "author": "Soup Loving Nicole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/y_8cOKC-DW26fmifd2U64faXOJg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1674529027IP20Dump20and20Go20720Can20Soup-2000-2df8e327122d4cfb963ed68989db44a7.jpg",
      "alt": "Instant Pot Dump and Go Seven Can Soup"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "1 (15.25 ounce) can whole kernel corn, drained",
      "1 (15 ounce) can ranch-style beans",
      "1 (15 ounce) can no-bean chili",
      "1 (14.5 ounce) can cut green beans, drained",
      "1 (14.5 ounce) can diced potatoes, drained",
      "1 (10.75 ounce) can condensed nacho cheese soup (such as Campbell's\u00ae Fiesta Nacho Cheese)",
      "1 (10 ounce) can diced tomatoes and green chiles (such as RO*TEL\u00ae)"
    ],
    "instructions": [
      "Combine corn, ranch-style beans, chili, green beans, potatatoes, cheese soup, and diced tomatoes and green chilies in a multi-functional pressure cooker (such as Instant Pot\u00ae). Stir to combine.",
      "Close and lock the lid. Select highpressure according to manufacturer's instructions; set timer for 15 minutes. Allow 25 minutes for pressure to build.",
      "Release pressure carefully using the quick-release method according to manufacturer's instructions, about 5 minutes. Unlock and remove the lid. Serve and enjoy."
    ],
    "nutrition_per_serving": {
      "calories": 288,
      "total_fat_g": 7.0,
      "carbohydrates_g": 45.0,
      "fiber_g": 9.0,
      "sugar_g": 0,
      "protein_g": 15.0,
      "sodium_mg": 1726,
      "cholesterol_mg": 22,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 5,
    "recipe_category": "",
    "cuisine": "",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/148142/curried-quinoa/",
    "category": "quinoa",
    "id": 148142,
    "name": "Curried Quinoa",
    "description": "This quinoa's light curry flavor with a kick of heat makes it a delicious side dish. For a nutritious main dish, serve it over a bed of steamed greens.",
    "author": "AF.",
    "image": {
      "url": "https://www.allrecipes.com/thmb/oVDrSTU7nGlPdicUNuRwp0U_Qng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/829915-b8293473c6de44f595f4fc11ae5a1c3a.jpg",
      "alt": "Curried Quinoa"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 35,
    "total_time_minutes": 40,
    "servings": "2",
    "ingredients": [
      "2 tablespoons olive oil, or as needed",
      "1 small onion, diced",
      "2 cloves garlic, minced",
      "1 cup quinoa",
      "2 cups chicken broth",
      "1 tablespoon curry powder, or to taste",
      "1 tablespoon ancho chile powder",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium heat. Add onion and garlic and cook, stirring until soft, about 2 minutes. Add quinoa and cook, adding more oil if the pan seems dry. Stir until quinoa is lightly toasted, about 5 minutes.",
      "Add broth to the pan and bring to a boil. Reduce heat. Add curry and chile powder. Cover and simmer until broth evaporates and quinoa is tender, about 25 minutes. Season to taste with salt and pepper."
    ],
    "nutrition_per_serving": {
      "calories": 473,
      "total_fat_g": 20.0,
      "carbohydrates_g": 63.0,
      "fiber_g": 9.0,
      "sugar_g": 2.0,
      "protein_g": 14.0,
      "sodium_mg": 48,
      "cholesterol_mg": 0,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 295,
    "recipe_category": "Dinner",
    "cuisine": "Indian",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8974/easier-chicken-marsala/",
    "category": "chicken-marsala",
    "id": 8974,
    "name": "Easier Chicken Marsala",
    "description": "This easy recipe for chicken Marsala features lightly breaded chicken breasts that are pan-seared, then braised with mushrooms in Marsala wine.",
    "author": "D Alexander",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ENQx9VckaQKJeoC8Kq-HTi4THFQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5694215-easier-chicken-marsala-Allison-Volosin-4x3-1-bbd980b9d0a843ba9248613448c9d62f.jpg",
      "alt": "Easier Chicken Marsala"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "0.25 cup all-purpose flour",
      "0.5 teaspoon garlic salt",
      "0.25 teaspoon ground black pepper",
      "0.5 teaspoon dried oregano",
      "4 boneless, skinless chicken breast halves",
      "1 tablespoon olive oil",
      "1 tablespoon butter",
      "1 cup sliced fresh mushrooms",
      "0.5 cup Marsala wine"
    ],
    "instructions": [
      "Whisk flour, garlic salt, pepper, and oregano together in a bowl. Dredge chicken in flour mixture until lightly coated.",
      "Heat oil and butter in a large skillet over medium heat. Add chicken and cook until lightly browned, about 2 minutes. Flip chicken and add mushrooms. Cook, stirring mushrooms occasionally, until chicken is browned on the other side, about 2 more minutes.",
      "Pour Marsala wine over chicken. Reduce the heat to low, cover, and simmer until chicken is no longer pink in the center and the juices run clear, about 10 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 286,
      "total_fat_g": 10.0,
      "carbohydrates_g": 11.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 28.0,
      "sodium_mg": 313,
      "cholesterol_mg": 80,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 849,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16817/easy-tomato-chicken-marsala/",
    "category": "chicken-marsala",
    "id": 16817,
    "name": "Easy Tomato Chicken Marsala",
    "description": "A generous splash of Marsala wine gives extra depth to chicken braised with stewed tomatoes, Italian seasonings and gravy mix.",
    "author": "Dana",
    "image": {
      "url": "https://www.allrecipes.com/thmb/u3aF_Gt6rzOcRB7UhRsXwrgRDeg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/412615-8e03b2911c2847328800a5ed8b9de9da.jpg",
      "alt": "Easy Tomato Chicken Marsala"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "1 tablespoon vegetable oil",
      "4 skinless, boneless chicken breast halves - cut into bite size pieces",
      "1 teaspoon Italian-style seasoning",
      "1 teaspoon garlic powder",
      "0.5 teaspoon dried sage",
      "2 (14 ounce) cans stewed tomatoes, drained",
      "2 tablespoons dry brown gravy mix",
      "0.25 cup Marsala wine"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium high heat. Add chicken and saute for about 5 minutes, until browned. Season with Italian-style seasoning, garlic powder and sage and saute for another 10 minutes, until chicken is almost cooked through and juices run clear.",
      "Pour tomatoes and liquid over chicken, then add gravy mix and wine and stir all together. Reduce heat to low and simmer for about 20 minutes. Serve hot over cooked rice, if desired."
    ],
    "nutrition_per_serving": {
      "calories": 252,
      "total_fat_g": 6.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 2.0,
      "sugar_g": 9.0,
      "protein_g": 30.0,
      "sodium_mg": 642,
      "cholesterol_mg": 68,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 18,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/102803/grandmas-bogies-parmesan-chicken/",
    "category": "chicken-parmesan",
    "id": 102803,
    "name": "Grandmas Bogie's Parmesan Chicken",
    "description": "A baked Parmesan chicken that is super easy to prepare.",
    "author": "LDP5",
    "image": {
      "url": "https://www.allrecipes.com/thmb/t38YkplqEP_P7X5CC8FrtCNWnPo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2185081-5a6c15f347024285ad836a7052d72e80.jpg",
      "alt": "Grandmas Bogie's Parmesan Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "0.5 cup grated Parmesan cheese",
      "0.25 cup dry bread crumbs",
      "1 teaspoon dried oregano",
      "1 teaspoon dried parsley",
      "0.25 teaspoon paprika",
      "0.25 teaspoon salt",
      "0.25 teaspoon ground black pepper",
      "3 tablespoons margarine, melted",
      "6 skinless, boneless chicken breast halves"
    ],
    "instructions": [
      "Preheat an oven to 400 degrees F (200 degrees C). Spray 9x13 inch baking pan with cooking spray.",
      "Combine Parmesan cheese, dry bread crumbs, oregano, parsley, paprika, salt, and pepper in a shallow bowl. Dip chicken breasts into melted margarine, then coat with bread crumb mixture. Place in prepared pan.",
      "Bake in preheated oven until chicken breasts are no longer pink in the center and the juices run clear, about 20 to 25 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 226,
      "total_fat_g": 10.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 28.0,
      "sodium_mg": 353,
      "cholesterol_mg": 73,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 188,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/272428/dry-rub-air-fried-chicken-wings/",
    "category": "cooking-for-two",
    "id": 272428,
    "name": "Dry Rub Air Fryer Chicken Wings",
    "description": "These air fryer chicken wings, seasoned with a sweet and spicy dry rub, cook in less than 30 minutes and always come out juicy inside.",
    "author": "K Knox",
    "image": {
      "url": "https://www.allrecipes.com/thmb/AZFnRbYfmIkSZMX-uH8J8ntzB0Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/272428-dry-rub-air-fried-chicken-wings-ddmfs-tep5-beauty-199-4x3-1-168604b6955b42f381aeee71673c839e.jpg",
      "alt": "Dry Rub Air Fryer Chicken Wings"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "2",
    "ingredients": [
      "1 tablespoon dark brown sugar",
      "1 tablespoon sweet paprika",
      "0.5 tablespoon kosher salt",
      "1 teaspoon garlic powder",
      "1 teaspoon onion powder",
      "1 teaspoon poultry seasoning",
      "0.5 teaspoon mustard powder",
      "0.5 teaspoon freshly ground black pepper",
      "8 chicken wings, or more as needed"
    ],
    "instructions": [
      "Preheat the air fryer to 350 degrees F (175 degrees C).",
      "Meanwhile, whisk brown sugar, paprika, salt, garlic powder, onion powder, poultry seasoning, mustard powder, and pepper together in a large bowl.",
      "Toss in chicken wings and rub seasonings into chicken with your hands until fully coated.",
      "Arrange wings in the air fryer basket, standing them up on their ends and leaning against each other and the wall of the basket.",
      "Cook in the preheated air fryer until wings are cooked through, tender inside and golden brown and crisp on the outside, about 30 to 35 minutes. Transfer wings to a plate and serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 441,
      "total_fat_g": 30.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 2.0,
      "sugar_g": 6.0,
      "protein_g": 22.0,
      "sodium_mg": 1424,
      "cholesterol_mg": 99,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 50,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/51372/favorite-barbecue-chicken/",
    "category": "cooking-for-one",
    "id": 51372,
    "name": "Favorite Barbecue Chicken",
    "description": "This homemade BBQ sauce recipe for chicken is easy to make with ketchup, honey, brown sugar, apple cider vinegar, and Worcestershire sauce.",
    "author": "Amanda Anne",
    "image": {
      "url": "https://www.allrecipes.com/thmb/bslUrpG_c32lCuO-QOpNYEzmvtA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3676993-11db461a4c144d33b8b9069156f69682.jpg",
      "alt": "Favorite Barbecue Chicken"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 25,
    "total_time_minutes": 30,
    "servings": "2",
    "ingredients": [
      "1.5 tablespoons olive oil",
      "0.25 cup diced onion",
      "2 cloves garlic, minced",
      "5 tablespoons ketchup",
      "3 tablespoons honey",
      "3 tablespoons brown sugar",
      "2 tablespoons apple cider vinegar",
      "1 tablespoon Worcestershire sauce",
      "salt and pepper to taste",
      "2 skinless, boneless chicken breast halves"
    ],
    "instructions": [
      "Preheat an outdoor grill for medium-high heat and lightly oil the grate.",
      "Heat olive oil in a skillet over medium heat. Add onion and garlic; saut\u00e9 until tender, about 2 minutes. Stir in ketchup, honey, brown sugar, apple cider vinegar, Worcestershire sauce, salt, and pepper; simmer until sauce has thickened slightly, about 1 or 2 minutes. Remove from heat; set aside to cool slightly.",
      "Dip chicken in sauce to coat on both sides; reserve remaining sauce in the skillet. Transfer chicken onto the preheated grill and cook, turning once, until nicely browned on all sides, about 10 to 15 minutes.",
      "Return chicken to the skillet with sauce; simmer over medium heat until sticky, about 5 minutes on each side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 452,
      "total_fat_g": 13.0,
      "carbohydrates_g": 60.0,
      "fiber_g": 1.0,
      "sugar_g": 56.0,
      "protein_g": 26.0,
      "sodium_mg": 714,
      "cholesterol_mg": 67,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 301,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/216980/reuben-crescent-bake/",
    "category": "corned-beef",
    "id": 216980,
    "name": "Reuben Crescent Bake",
    "description": "This savory pie made with refrigerated crescent roll dough, corned beef, Swiss cheese, and sauerkraut has all the flavors of a Reuben sandwich.",
    "author": "Patti Barrett",
    "image": {
      "url": "https://www.allrecipes.com/thmb/fF-1qfFtnsxBdrs9gVk_7hSrI4Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/216980-reuben-crescent-bake-PICS-beauty-4x3-6dfcaf6c535d47a28d6fa6d29fcb798a.jpg",
      "alt": "Reuben Crescent Bake"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "0.75 cup sauerkraut, drained and squeezed dry",
      "0.33333334326744 cup thousand island salad dressing",
      "1 (8 ounce) tube refrigerated crescent rolls (such as Pillsbury\u00ae)",
      "0.75 pound thin-sliced cooked corned beef",
      "8 slices Swiss cheese",
      "1 beaten egg white"
    ],
    "instructions": [
      "Preheat the oven to 375 degrees F (190 degrees C). Grease an 8x8-inch baking dish.",
      "Mix sauerkraut and salad dressing together in a bowl until well combined. Unroll crescent roll dough, and cut dough in half; place one half of the dough onto a floured work surface, and pinch the perforations of the dough closed to make 1 sheet. Roll dough sheet out to about 12 inches square, and fit the dough into the prepared baking sheet. Pinch perforations closed on 2nd half of dough; roll out to about 9 inches square, and set aside.",
      "Prebake dough crust in the baking dish in the preheated oven until lightly browned, 8 to 10 minutes. Remove from oven, and place 4 slices of cheese into the bottom of the crust; top cheese slices with the corned beef, and spread with the sauerkraut mixture. Lay 4 remaining slices of Swiss cheese on top of the sauerkraut mixture. Lay the 2nd sheet of crescent roll dough onto the filled baking sheet, and press the top crust down onto the edges of the dish to seal. Brush with beaten egg white.",
      "Bake in the oven until the cheese is melted and the crust is golden brown, 15 to 20 minutes; let stand about 5 minutes before slicing."
    ],
    "nutrition_per_serving": {
      "calories": 658,
      "total_fat_g": 42.0,
      "carbohydrates_g": 32.0,
      "fiber_g": 1.0,
      "sugar_g": 10.0,
      "protein_g": 37.0,
      "sodium_mg": 2123,
      "cholesterol_mg": 115,
      "saturated_fat_g": 17.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 89,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/22760/homemade-chicken-fettuccine/",
    "category": "fettuccini",
    "id": 22760,
    "name": "Homemade Chicken Fettuccine",
    "description": "This chicken fettuccine Alfredo recipe is an easy, deliciously rich, creamy pasta, without added flour like other recipes. It is unique and versatile.",
    "author": "Torrerizor",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ms3CkSYO6AzBsdAylaMT08o6JTI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2541026-homemade-chicken-fettuccine-leanne-4x3-01e1aae8d624476c8ea3fae84e20b6db.jpg",
      "alt": "Homemade Chicken Fettuccine"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "8 ounces fettuccini pasta",
      "2 tablespoons butter",
      "3 skinless, boneless chicken breast halves - cut into chunks",
      "8 ounces mushrooms, sliced",
      "1 teaspoon garlic salt",
      "0.125 teaspoon ground black pepper",
      "1.5 cups heavy cream",
      "0.25 cup grated Parmesan cheese"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Add fettuccine and cook for 8 to 10 minutes or until al dente; drain.",
      "Meanwhile, heat butter in a large skillet and brown chicken and mushrooms until chicken is cooked through. Season with garlic salt and pepper. Add whipping cream and cook until thick, stirring constantly. Add Parmesan cheese when at desired consistency. Serve over noodles."
    ],
    "nutrition_per_serving": {
      "calories": 791,
      "total_fat_g": 44.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 3.0,
      "sugar_g": 3.0,
      "protein_g": 53.0,
      "sodium_mg": 723,
      "cholesterol_mg": 245,
      "saturated_fat_g": 26.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 258,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/186983/chicken-fajita-melts/",
    "category": "fajitas",
    "id": 186983,
    "name": "Chicken Fajita Melts",
    "description": "These cheesy chicken sandwich melts have all of the flavor of fajitas without the drippy mess!",
    "author": "laughingmagpie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/FibbSX2OkhvRrSDf3Dc4w-t_Rxc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/328905-d42bf6d78bc24f68a97cb0d4f72f3e49.jpg",
      "alt": "Chicken Fajita Melts"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "8",
    "ingredients": [
      "3 tablespoons vegetable oil",
      "6 (6 ounce) skinless, boneless chicken breast halves, thinly sliced",
      "0.5 cup sliced onions",
      "0.5 cup sliced red bell pepper",
      "0.5 cup tomato juice",
      "2 tablespoons taco seasoning mix",
      "1 cup salsa",
      "8 (1/2 inch thick) slices French bread",
      "2 cups shredded Cheddar cheese"
    ],
    "instructions": [
      "Heat the oil in a large skillet over medium-high heat. Add the chicken, and cook and stir until lightly browned, about 5 minutes.",
      "Stir in the sliced onions and red peppers, and cook and stir for 5 minutes or until the vegetables are tender. Stir in the tomato juice and taco seasoning, and mix well. Cook mixture until the juice has thickened and the chicken is well coated with sauce, about an additional 7 minutes.",
      "Preheat the oven's broiler and set the oven rack about 6 inches from the heat source.",
      "Spread 2 tablespoons of salsa over each slice of French bread. Evenly spoon the chicken mixture on top of the salsa topped bread. Sprinkle each sandwich with 1/4 cup Cheddar cheese.",
      "Place sandwiches under the preheated broiler and cook for 5 minutes or until the cheese is melted and beginning to brown."
    ],
    "nutrition_per_serving": {
      "calories": 397,
      "total_fat_g": 17.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 40.0,
      "sodium_mg": 821,
      "cholesterol_mg": 104,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 392,
    "recipe_category": "Dinner",
    "cuisine": "Mexican",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/134128/easy-white-chicken-enchiladas/",
    "category": "enchiladas",
    "id": 134128,
    "name": "Easy White Chicken Enchiladas",
    "description": "These white chicken enchiladas are a cinch to make with ingredients right off the shelf. The only skill required is in measuring, the rest just works itself out!",
    "author": "LARANEFF",
    "image": {
      "url": "https://www.allrecipes.com/thmb/gGy7bKDdoFwSGQ2ET1C-KHhT9gk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1027241-71176f62c204438f8a6dd34f22c59943.jpg",
      "alt": "Easy White Chicken Enchiladas"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "4 ounces cream cheese, softened",
      "0.5 cup sour cream",
      "0.5 cup green salsa",
      "2 (6 ounce) packages seasoned cooked chicken cubes",
      "1 cup shredded Mexican-style cheese blend",
      "1.5 cups white cheese sauce, or queso dip",
      "6 (8 inch) flour tortillas"
    ],
    "instructions": [
      "Preheat oven to 375 degrees F (190 degrees C). Lightly spray an 8x8-inch glass baking dish with cooking spray.",
      "Stir together the softened cream cheese, sour cream, and salsa until blended. Fold in chicken and shredded cheese. Spread a small amount of white cheese sauce onto the bottom of the baking dish. Evenly divide the filling among the tortillas, and roll into firm cylinders. Place into prepared baking dish and cover with remaining sauce.",
      "Bake in preheated oven until golden and bubbly, about 30 minutes. Allow to rest 5 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 625,
      "total_fat_g": 37.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 2.0,
      "sugar_g": 5.0,
      "protein_g": 34.0,
      "sodium_mg": 1588,
      "cholesterol_mg": 138,
      "saturated_fat_g": 21.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 174,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/186877/easy-enchiladas/",
    "category": "enchiladas",
    "id": 186877,
    "name": "Easy Enchiladas",
    "description": "Here's a versatile and easy enchilada recipe that gets to the table fast.",
    "author": "tanyap",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mhEtQjiVmvUoJ4qkyAEbTApVbcA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7391965-419a52db8aed4dc2837040f9690ec423.jpg",
      "alt": "Easy Enchiladas"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "10",
    "ingredients": [
      "2 (16 ounce) jars prepared salsa",
      "1 pound ground beef",
      "1 (15.5 ounce) jar prepared salsa con queso",
      "20 (8 inch) flour tortillas",
      "1 (8 ounce) package shredded Cheddar-Monterey Jack cheese blend"
    ],
    "instructions": [
      "Preheat an oven to 350 degrees F (175 degrees C). Grease a 9x13 inch baking dish, and pour the salsa into the bottom of the dish. Set aside.",
      "Cook and stir the ground beef in a skillet over medium heat for about 10 minutes, until meat is browned and crumbly. Drain the grease from the beef, and add the salsa con queso to the skillet, stirring to mix well. Place about 2 tablespoons of the beef mixture down the center of each tortilla, roll the tortillas, and place them seam side down on top of the salsa in the baking dish. Sprinkle the shredded cheese on top of the enchiladas.",
      "Bake for 15 to 20 minutes in the preheated oven, until the cheese is browned and the enchiladas are hot and bubbling."
    ],
    "nutrition_per_serving": {
      "calories": 595,
      "total_fat_g": 26.0,
      "carbohydrates_g": 68.0,
      "fiber_g": 5.0,
      "sugar_g": 6.0,
      "protein_g": 24.0,
      "sodium_mg": 1757,
      "cholesterol_mg": 54,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 90,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/54633/famous-restaurant-alfredo-sauce/",
    "category": "fettuccini",
    "id": 54633,
    "name": "Famous Restaurant Alfredo Sauce",
    "description": "This is a much sought after recipe from a popular chain restaurant --my nephew worked there as a cook and gave it to me.",
    "author": "GOODNIGHTGRACIE2",
    "image": {
      "url": "https://www.allrecipes.com/thmb/6j2OAz5v7Msp0yJ41LR6XJk8DXw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1083294-04a53d9168934187973457588023ef38.jpg",
      "alt": "Famous Restaurant Alfredo Sauce"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "0.5 cup butter",
      "0.75 cup cream cheese",
      "0.75 cup half-and-half",
      "1 pinch garlic salt, or to taste",
      "lemon pepper to taste",
      "1 (16 ounce) package dry fettuccine pasta"
    ],
    "instructions": [
      "Place pasta in a large pot of lightly salted boiling water. Cook until tender, about 8 minutes. Drain.",
      "Combine the butter, cream cheese, and half and half in a saucepan. Season with garlic salt and lemon pepper. Bring to a low boil over medium-low heat. Cook, stirring, until thickened slightly. Serve over 12 ounces of pasta."
    ],
    "nutrition_per_serving": {
      "calories": 821,
      "total_fat_g": 46.0,
      "carbohydrates_g": 86.0,
      "fiber_g": 4.0,
      "sugar_g": 4.0,
      "protein_g": 20.0,
      "sodium_mg": 399,
      "cholesterol_mg": 126,
      "saturated_fat_g": 28.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 158,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/17702/fettuccine-with-sweet-pepper-cayenne-sauce/",
    "category": "fettuccini",
    "id": 17702,
    "name": "Fettuccine with Sweet Pepper-Cayenne Sauce",
    "description": "In this fettuccine dish, red bell peppers, garlic, and cayenne are saut\u00e9ed then simmered with sour cream and chicken broth to make a delicious dinner.",
    "author": "Julieliz",
    "image": {
      "url": "https://www.allrecipes.com/thmb/p5wpn3b3kvyPSz_9sqZDNuhxe3M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/805186-94a6a12a485247a4a4672badc3855e85.jpg",
      "alt": "Fettuccine with Sweet Pepper-Cayenne Sauce"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "12 ounces dry fettuccine pasta",
      "2 red bell peppers, julienned",
      "3 cloves garlic, minced",
      "0.75 teaspoon cayenne pepper",
      "1 cup reduced fat sour cream",
      "0.75 cup chicken broth",
      "0.75 cup grated Parmesan cheese",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.",
      "Meanwhile, spray cooking oil in a large skillet and saut\u00e9 red bell peppers, garlic, and cayenne pepper over medium heat for 3 to 5 minutes.",
      "Stir in sour cream and broth; simmer uncovered for 5 minutes. Remove from heat and stir in cheese.",
      "Toss hot pasta with sauce and season with salt and pepper to taste; serve."
    ],
    "nutrition_per_serving": {
      "calories": 475,
      "total_fat_g": 14.0,
      "carbohydrates_g": 69.0,
      "fiber_g": 4.0,
      "sugar_g": 5.0,
      "protein_g": 20.0,
      "sodium_mg": 403,
      "cholesterol_mg": 37,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 1157,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/161469/the-best-ever-chicken-nuggets/",
    "category": "fried-chicken",
    "id": 161469,
    "name": "The Best Ever Chicken Nuggets",
    "description": "These fried chicken nuggets are coated in a mixture of flour, garlic salt, and black pepper, then fried until brown and crisp for a great party snack.",
    "author": "Nichole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DOhcP7hAGP_ams-a-M8A-16TeK4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-161469-the-best-ever-chicken-nuggets-DDMFS-4x3-e0f5af0ce26241d888967904f66962c7.jpg",
      "alt": "The Best Ever Chicken Nuggets"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "vegetable oil for frying",
      "4 cups all-purpose flour",
      "6 tablespoons garlic salt",
      "3 tablespoons ground black pepper",
      "4 large eggs, beaten",
      "8 skinless, boneless chicken breast halves - cut into small chunks"
    ],
    "instructions": [
      "Gather all ingredients. Heat 1 inch oil in a large skillet or saucepan to 350 degrees F (175 degrees C).",
      "Stir together flour, garlic salt, and pepper in a bowl. Dip chicken pieces into beaten eggs, then press each piece into flour mixture to coat well; shake off excess flour. Place coated chicken pieces onto a plate.",
      "Working in batches, fry chicken in hot oil until golden brown and no longer pink in the center.",
      "An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C). Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 515,
      "total_fat_g": 18.0,
      "carbohydrates_g": 51.0,
      "fiber_g": 2.0,
      "sugar_g": 0.0,
      "protein_g": 36.0,
      "sodium_mg": 4175,
      "cholesterol_mg": 162,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 323,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/273734/air-fryer-bang-bang-chicken/",
    "category": "fried-chicken",
    "id": 273734,
    "name": "Air Fryer Bang-Bang Chicken",
    "description": "This air fryer bang-bang chicken features crispy, Panko-breaded tenders tossed in a sweet and spicy sauce made with mayo, sweet chili, and Sriracha.",
    "author": "Soup Loving Nicole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/TOMtZfV7fV_jWwsTtnko1hUPVmU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6652250-74eaf12240a14ce59c4e12c169e3328a.jpg",
      "alt": "Air Fryer Bang-Bang Chicken"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "1 cup mayonnaise",
      "0.5 cup sweet chili sauce",
      "2 tablespoons Sriracha sauce",
      "0.33333334326744 cup flour",
      "1 pound chicken breast tenderloins, cut into bite-size pieces",
      "1.5 cups panko bread crumbs",
      "2 green onions, chopped"
    ],
    "instructions": [
      "Whisk together mayonnaise, sweet chili sauce, and Sriracha in a large bowl until sauce is well combined. Reserve 3/4 cup sauce and set aside.",
      "Place flour into a large resealable plastic bag. Add chicken; seal the bag and shake to coat. Transfer coated chicken pieces to sauce in the large bowl and stir to combine.",
      "Place panko bread crumbs in another large resealable plastic bag. Working in batches, drop chicken pieces into bread crumbs, seal, and shake to coat.",
      "Preheat an air fryer to 400 degrees F (200 degrees C).",
      "Place as many chicken pieces into the air fryer basket without overcrowding.",
      "Cook in the preheated air fryer for 10 minutes. Flip chicken and cook for 5 more minutes. Repeat with remaining chicken.",
      "Transfer fried chicken to another large bowl and pour reserved sauce over the top. Sprinkle with green onions and toss to coat. Serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 489,
      "total_fat_g": 33.0,
      "carbohydrates_g": 35.0,
      "fiber_g": 1.0,
      "sugar_g": 7.0,
      "protein_g": 21.0,
      "sodium_mg": 818,
      "cholesterol_mg": 60,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 37,
    "recipe_category": "Dinner",
    "cuisine": "Chinese",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/188823/chili-cheese-fries/",
    "category": "fries",
    "id": 188823,
    "name": "Chili Cheese Fries",
    "description": "Smothered in chili and cheddar cheese sauce, these easy chili cheese fries are a complete meal in themselves.",
    "author": "Michael L",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0sVPdjBt69DPBb8Uf0auKN3Y8Bw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/495404-c9832113d6914c1f8cc6af405a8eea14.jpg",
      "alt": "Chili Cheese Fries"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "1 (32 ounce) package frozen seasoned french fries",
      "2 tablespoons cornstarch",
      "2 tablespoons water",
      "2 cups low-fat milk",
      "1 tablespoon margarine",
      "8 slices American cheese, cut into pieces",
      "1 (15 ounce) can chili without beans (such as Hormel\u00ae)"
    ],
    "instructions": [
      "Prepare french fries as directed on the package.",
      "Stir cornstarch and water in a small cup until cornstarch dissolves; set aside. Bring milk and margarine to a boil in a saucepan, stirring constantly. Reduce the heat and whisk the cornstarch mixture into the milk mixture, bring to a simmer over medium heat. Cook and stir until the mixture is thick and smooth. Add the cheese to the milk mixture and stir until the cheese has melted and is well combined.",
      "Prepare chili as directed on the can. Pour the cooked chili and the cheese sauce over the top of the cooked french fries."
    ],
    "nutrition_per_serving": {
      "calories": 509,
      "total_fat_g": 25.0,
      "carbohydrates_g": 52.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 20.0,
      "sodium_mg": 1484,
      "cholesterol_mg": 49,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 26,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/285775/kale-and-fennel-frond-frittata/",
    "category": "frittatas",
    "id": 285775,
    "name": "Kale and Fennel Frond Frittata",
    "description": "A very green frittata that makes delicious use of fennel fronds. Fennel fronds have a very delicate flavor and the kale and feta cheese in this frittata are a perfect match.",
    "author": "Diana Moutsopoulos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-w5XOBxfuo_zjTbtRmmbP0lmDLo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9418569-2e74c4635f4d49d8a6cd3a5abc998585.jpg",
      "alt": "Kale and Fennel Frond Frittata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "2",
    "ingredients": [
      "2 teaspoons olive oil",
      "1 cup chopped kale",
      "1/2 cup chopped fennel fronds",
      "4 large eggs, beaten",
      "salt and freshly ground black pepper to taste",
      "1 (4 ounce) package feta cheese, crumbled"
    ],
    "instructions": [
      "Set an oven rack about 6 inches from the heat source and preheat the oven's broiler.",
      "Heat olive oil in a small ovenproof skillet over medium heat. Add kale and cook until wilted, 3 to 5 minutes. Add fennel fronds and cook for 1 minute more.",
      "Season beaten eggs with salt and pepper and pour into the skillet. Stir briefly, then leave to allow the bottom of the frittata to set. Once you see the bottom setting, take a spatula to the edges of the pan to ensure that the frittata isn't sticking. When the frittata starts to set around the edges, sprinkle crumbled feta cheese over the top.",
      "Place skillet under the broiler and cook until the frittata is fully set and the edges slightly browned, 5 to 10 minutes. Serve immediately or at room temperature."
    ],
    "nutrition_per_serving": {
      "calories": 341,
      "total_fat_g": 27.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 0.0,
      "sugar_g": 3.0,
      "protein_g": 21.0,
      "sodium_mg": 777,
      "cholesterol_mg": 422,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.0,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/245160/maple-granola/",
    "category": "granola",
    "id": 245160,
    "name": "Maple Granola",
    "description": "Homemade maple granola with pecans and coconut oil is a hearty and crunchy cereal you can eat alone and sprinkle over yogurt or ice cream.",
    "author": "Luanda",
    "image": {
      "url": "https://www.allrecipes.com/thmb/w6H_AjiZwaORPTd2kkvXLQXF1aQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2855681-b20cdc3d620f4ca1b1f289632a762831.jpg",
      "alt": "Maple Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "10",
    "ingredients": [
      "0.5 cup maple syrup",
      "0.33333334326744 cup coconut oil, melted",
      "4 cups old-fashioned oats, or more to taste",
      "1 cup chopped pecans",
      "0.5 cup almond flour"
    ],
    "instructions": [
      "Preheat oven to 300 degrees F (150 degrees C).",
      "Mix maple syrup and coconut oil together in a bowl; add oats, pecans, and almond flour and mix until evenly coated. Spread onto a baking sheet.",
      "Bake in the preheated oven until lightly browned, about 40 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 345,
      "total_fat_g": 21.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 5.0,
      "sugar_g": 10.0,
      "protein_g": 7.0,
      "sodium_mg": 3,
      "cholesterol_mg": 0,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 11,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/47407/gyros-burgers/",
    "category": "ground-lamb",
    "id": 47407,
    "name": "Gyros Burgers",
    "description": "This lamb-and-beef gyros burger gets inspiration from the traditional Greek pork or lamb gyros. Serve the burgers on warm pita bread with tzatziki, onion, tomato, and lettuce.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0-CAMoVXGmmYO0et2Q1ZBS186Fo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/374573-9a541a439d7c4895b4f4520e243e27c1.jpg",
      "alt": "Gyros Burgers"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "0.5 pound lean ground beef",
      "0.5 pound lean ground lamb",
      "0.5 onion, grated",
      "2 cloves garlic, pressed",
      "1 slice bread, toasted and crumbled",
      "0.5 teaspoon dried savory",
      "0.5 teaspoon ground allspice",
      "0.5 teaspoon ground coriander",
      "0.5 teaspoon salt",
      "0.5 teaspoon ground black pepper",
      "1 dash ground cumin"
    ],
    "instructions": [
      "Preheat an outdoor grill for medium-high heat, and lightly oil grate.",
      "In large bowl, combine ground beef, ground lamb, onion, garlic, and bread crumbs. Season with savory, allspice, coriander, salt, pepper, and cumin. Knead until mixture is stiff. Shape into 4 very thin patties (1/8-inch to 1/4-inch thick).",
      "Grill patties for 5 to 7 minutes on each side, or until cooked through."
    ],
    "nutrition_per_serving": {
      "calories": 338,
      "total_fat_g": 25.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 20.0,
      "sodium_mg": 408,
      "cholesterol_mg": 84,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 297,
    "recipe_category": "Dinner",
    "cuisine": "Greek",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/74053/lazygirls-ground-turkey-stroganoff/",
    "category": "ground-turkey",
    "id": 74053,
    "name": "Lazygirl's Ground Turkey Stroganoff",
    "description": "This easy turkey stroganoff recipe features a creamy mixture of ground turkey and condensed cream of mushroom soup served over warm egg noodles.",
    "author": "HeyMomma",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-VUFjCrJOvaix_ZqV4sq5q9fpUk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1922003-5e88fa367d95497894ff8dcd12df19d4.jpg",
      "alt": "Lazygirl's Ground Turkey Stroganoff"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "1 (8 ounce) package uncooked egg noodles",
      "1 tablespoon vegetable oil",
      "1 pound ground turkey",
      "1 tablespoon minced onion",
      "1 cube chicken bouillon, crumbled",
      "1 (10.5 ounce) can condensed cream of mushroom soup",
      "0.5 cup water",
      "1 tablespoon paprika",
      "salt to taste"
    ],
    "instructions": [
      "Fill a large pot with lightly salted water and bring to a rapid boil. Cook egg noodles at a boil until tender yet firm to the bite, 7 to 9 minutes. Drain and keep warm.",
      "While the noodles are cooking, heat oil in a large skillet over medium heat. Add turkey and onion; cook and stir until turkey is browned and crumbly, 5 to 7 minutes. Stir in crumbled bouillon.",
      "Whisk condensed soup and water together in a small bowl; pour into the skillet and cook, stirring occasionally, until heated through, about 5 minutes. Season with paprika and salt. Serve over warm egg noodles."
    ],
    "nutrition_per_serving": {
      "calories": 463,
      "total_fat_g": 20.0,
      "carbohydrates_g": 42.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 31.0,
      "sodium_mg": 852,
      "cholesterol_mg": 125,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 573,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8532956/dump-and-go-instant-pot-tortilla-soup/",
    "category": "instant-pot",
    "id": 8532956,
    "name": "Dump-and-Go Instant Pot Tortilla Soup",
    "description": "This dump and go tortilla soup is ready in 30 minutes in the Instant Pot.. Perfect for busy weeknights. Serve with your favorite toppings.",
    "author": "fabeveryday",
    "image": {
      "url": "https://www.allrecipes.com/thmb/HOJ4K2EPK5GgomDXlYOsi5uk4KU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1674169949Dump-and-Go20Instant20Pot20Tortilla20Soup-26e356515e554bca8c38785be4514cd6.jpg",
      "alt": "Dump-and-Go Instant Pot Tortilla Soup"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "2 (14.5 ounce) cans chicken broth",
      "1 (15 ounce) can whole kernel corn, drained",
      "1 (15 ounce) can black beans, rinsed and drained",
      "2 (5 ounce) cans chicken breast chunks, drained",
      "1 (10 ounce) can diced tomatoes with green chile peppers (such as RO*TEL\u00ae)",
      "0.5 teaspoon chili powder",
      "0.5 teaspoon seasoning salt",
      "0.5 teaspoon garlic powder",
      "1 (3.5 ounce) package tortilla strips, for garnish",
      "2 tablespoons shredded Mexican cheese blend, or to taste"
    ],
    "instructions": [
      "Pour chicken broth, corn, black beans, chunk chicken, tomatoes with green chilies (with their juices), chili powder, seasoning salt, and garlic powder together in a multi-functional pressure cooker (such as Instant Pot\u00ae); stir to combine.",
      "Close and lock the lid. Select high pressure according to manufacturer's instructions; set timer for 5 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure carefully using the quick-release method according to manufacturer's instructions, about 5 minutes. Unlock and carefully open the lid.",
      "Ladle the soup into serving bowls and top with tortilla strips, and shredded cheese, to taste."
    ],
    "nutrition_per_serving": {
      "calories": 297,
      "total_fat_g": 16.0,
      "carbohydrates_g": 48.0,
      "fiber_g": 7.0,
      "sugar_g": 0,
      "protein_g": 24.0,
      "sodium_mg": 2198,
      "cholesterol_mg": 52,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 4,
    "recipe_category": "",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/100502/irish-soda-farls/",
    "category": "irish-soda-bread",
    "id": 100502,
    "name": "Irish Soda Farls",
    "description": "Farl is the Gaelic name for 4 parts; these soda farls are made on a dry griddle for the quickest and easiest way to make fresh soda bread.",
    "author": "Ita",
    "image": {
      "url": "https://www.allrecipes.com/thmb/GTjs28IMKr6eNEiAd_14KWU9yUY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/100502irish-soda-farlsfabeveryday4x3-6f7b87107f7444f9b1c6e6eabd2e1f3b.jpg",
      "alt": "Irish Soda Farls"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "2 cups all-purpose flour",
      "0.5 teaspoon salt",
      "1 teaspoon baking soda",
      "1 cup buttermilk"
    ],
    "instructions": [
      "Preheat a heavy based flat griddle or skillet on medium to low heat.",
      "Place flour and salt in a bowl and sift in baking soda; make a well in the center, and pour in the buttermilk.",
      "Work quickly to mix into a wet dough; knead very lightly on a well floured surface. Form into a flattened circle, about 1/2 inch thick and cut into quarters with a floured knife. The dough will be quite sticky.",
      "Sprinkle a little flour over the base of the hot pan and cook the farls for 6 to 8 minutes on each side or until golden brown."
    ],
    "nutrition_per_serving": {
      "calories": 252,
      "total_fat_g": 1.0,
      "carbohydrates_g": 51.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 9.0,
      "sodium_mg": 671,
      "cholesterol_mg": 3,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 112,
    "recipe_category": "Breakfast",
    "cuisine": "Irish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/272544/baked-lemon-butter-chicken-thighs/",
    "category": "keto",
    "id": 272544,
    "name": "Baked Lemon Butter Chicken Thighs",
    "description": "Succulent lemon and garlic baked chicken thighs; an easy and tasty weeknight meal that's guaranteed to impress the pickiest eaters!",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/CCOS9E4qmZsasrE7fgq4lIKAd2o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/272544-Baked-Lemon-Butter-Chicken-Thighs-ddmfs-146-4x3-2d49fd8b8c524fa9ba9be963adb0bfe4.jpg",
      "alt": "Baked Lemon Butter Chicken Thighs"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 40,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "4 tablespoons butter, divided",
      "4 cloves garlic",
      "2 tablespoons lemon juice",
      "0.25 teaspoon onion powder",
      "4 (8 ounce) skin-on, bone-in chicken thighs",
      "salt and ground black pepper to taste",
      "2 tablespoons fresh parsley, chopped"
    ],
    "instructions": [
      "Preheat the oven to 375 degrees F (190 degrees C).",
      "Place 3 tablespoons butter in a microwave-safe bowl and heat in a microwave oven until melted, 1 to 2 minutes. Smash garlic cloves with the side of a chef's knife and add garlic to the warm butter. Stir in lemon juice and onion powder; set aside.",
      "Sprinkle both sides of chicken thighs with salt and pepper. Heat remaining 1 tablespoon butter in a medium oven-safe skillet over medium-high heat. Brown chicken, skin-side down, for 3 to 4 minutes. Flip chicken over and brush skin with lemon-butter mixture. Pour remaining butter mixture into skillet and remove from heat.",
      "Bake in the preheated oven until chicken is no longer pink at the bone and the juices run clear, about 30 minutes. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C). Brush skin every 10 minutes with pan juices.",
      "Remove skillet from the oven and place chicken on a serving platter. Drizzle chicken with pan juices and garnish with parsley."
    ],
    "nutrition_per_serving": {
      "calories": 510,
      "total_fat_g": 34.0,
      "carbohydrates_g": 7.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 41.0,
      "sodium_mg": 257,
      "cholesterol_mg": 179,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 165,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/24681/oven-fried-pork-chops/",
    "category": "Pork-Chops",
    "id": 24681,
    "name": "Oven-Fried Pork Chops",
    "description": "Yummy oven-fried pork chops are dipped in egg and coated with an herby stuffing mix. Learn how long to bake pork chops with this quick and easy recipe.",
    "author": "RACHELHACKER",
    "image": {
      "url": "https://www.allrecipes.com/thmb/71MbX1QvP-Ele8nAoHOLc5S9Tno=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/24681-oven-fried-pork-chops-DDMFS-4x3-6587c93f04d44d359347ca5e46a7ecc2.jpg",
      "alt": "Oven-Fried Pork Chops"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "2 tablespoons butter, melted",
      "1 large egg, beaten",
      "2 tablespoons milk",
      "0.25 teaspoon black pepper",
      "1 cup herb-seasoned dry bread stuffing mix",
      "4 pork chops, trimmed"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 425 degrees F (220 degrees C). Pour butter into a 9x13-inch baking dish.",
      "Whisk together egg, milk, and pepper in a shallow dish. Place stuffing mix in a separate shallow dish. Dip pork chops in egg mixture, then coat with stuffing mix.",
      "Lay pork chops in the prepared dish.",
      "Bake in the preheated oven for 10 minutes. Flip chops and bake until no longer pink in the center and juices run clear, about 10 more minutes. An instant-read thermometer inserted into the center should read at least 145 degrees F (74 degrees C).",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 422,
      "total_fat_g": 14.0,
      "carbohydrates_g": 39.0,
      "fiber_g": 2.0,
      "sugar_g": 5.0,
      "protein_g": 32.0,
      "sodium_mg": 897,
      "cholesterol_mg": 128,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 1222,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/189460/ms-sloppy-joe-sauce/",
    "category": "sloppy-joes",
    "id": 189460,
    "name": "M's Sloppy Joe Sauce",
    "description": "This Sloppy Joe recipe is a bit more flavorful and spicy than than what you're probably used to, thanks to barbecue sauce and a bit of Sriracha.",
    "author": "Semigourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/xuNbuvu3ZSA11fCLAS7G8VByiZY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/253861-92e4b34cdeab4fb99d0c01068584eee1.jpg",
      "alt": "M's Sloppy Joe Sauce"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "1 tablespoon extra-virgin olive oil",
      "1 large onion, diced",
      "1 green bell pepper, diced",
      "1 tablespoon minced garlic",
      "1 pound ground turkey",
      "1 cup canned pureed tomatoes",
      "0.25 cup barbeque sauce (such as KC Masterpiece\u00ae)",
      "2 tablespoons ketchup",
      "2 tablespoons white vinegar",
      "2 tablespoons Worcestershire sauce",
      "1 tablespoon brown mustard",
      "1 tablespoon chile-garlic sauce (such as Sriracha\u00ae)"
    ],
    "instructions": [
      "Heat olive oil in a skillet over medium heat. Add onion and bell pepper; cook until beginning to soften, about 5 minutes. Add garlic and ground turkey; cook and stir until turkey is completely crumbled and browned, another 5 to 7 minutes.",
      "Stir in pur\u00e9ed tomatoes, barbecue sauce, ketchup, vinegar, Worcestershire sauce, mustard, and chile-garlic sauce. Simmer until completely heated, 7 to 10 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 287,
      "total_fat_g": 12.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 3.0,
      "sugar_g": 12.0,
      "protein_g": 25.0,
      "sodium_mg": 865,
      "cholesterol_mg": 84,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 97,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/237284/creamy-avocado-chicken-salad/",
    "category": "chicken-salads",
    "id": 237284,
    "name": "Creamy Avocado Chicken Salad",
    "description": "This refreshing avocado chicken salad comes together quickly by blending cooked chicken, avocado, sour cream, black pepper, garlic, and lime juice.",
    "author": "SunnyDaysNora",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nGoVmusU5V_I4QgqqSsAimzh7Rs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1320827-748ccf638eb940ee859984cc538d6e1a.jpg",
      "alt": "Creamy Avocado Chicken Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "4",
    "ingredients": [
      "2 cooked chicken breast halves, diced",
      "1 ripe avocado, sliced",
      "0.5 cup sour cream",
      "1.5 teaspoons ground black pepper",
      "1 teaspoon lime juice",
      "0.5 teaspoon garlic powder",
      "0.5 teaspoon onion powder",
      "0.25 teaspoon salt"
    ],
    "instructions": [
      "Place chicken in a food processor; process until finely chopped. Add avocado, sour cream, black pepper, lime juice, garlic powder, onion powder, and salt; blend until smooth (or the consistency you desire)."
    ],
    "nutrition_per_serving": {
      "calories": 217,
      "total_fat_g": 15.0,
      "carbohydrates_g": 7.0,
      "fiber_g": 4.0,
      "sugar_g": 1.0,
      "protein_g": 15.0,
      "sodium_mg": 197,
      "cholesterol_mg": 49,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 19,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/280361/french-toast-without-milk/",
    "category": "cooking-for-one",
    "id": 280361,
    "name": "French Toast without Milk",
    "description": "Fluffy French toast without milk flavored with cinnamon, nutmeg, and vanilla for a delicious, easy-to-make, family-approved breakfast dish.",
    "author": "Mr Shiells",
    "image": {
      "url": "https://www.allrecipes.com/thmb/U9MtJ2PAg1ZsdvboOWI4DVPiKCQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/280361french-toast-without-milklutzflcat4x3-a232f9f2c2ba432a98baf98a9e1792e2.jpg",
      "alt": "French Toast without Milk"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "2 large eggs",
      "1 tablespoon white sugar",
      "1 teaspoon vanilla extract",
      "0.5 teaspoon ground cinnamon",
      "0.25 teaspoon ground nutmeg",
      "1 tablespoon unsalted butter",
      "4 slices white bread"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Beat eggs in a wide mixing bowl; mix in sugar, vanilla extract, cinnamon, and nutmeg.",
      "Melt butter in a skillet over medium-low heat.",
      "Dip 2 slices of bread into egg mixture, ensuring both sides are covered; place in the skillet and cook until golden brown, about 4 minutes per side. Repeat with remaining 2 slices of bread. Serve warm."
    ],
    "nutrition_per_serving": {
      "calories": 289,
      "total_fat_g": 13.0,
      "carbohydrates_g": 33.0,
      "fiber_g": 2.0,
      "sugar_g": 9.0,
      "protein_g": 10.0,
      "sodium_mg": 412,
      "cholesterol_mg": 201,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 25,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241160/creamy-cottage-cheese-scrambled-eggs/",
    "category": "cooking-for-one",
    "id": 241160,
    "name": "Creamy Cottage Cheese Scrambled Eggs",
    "description": "These fluffy cottage cheese scrambled eggs are cooked in butter to make a delicious low-carb breakfast for two in just 10 minutes.",
    "author": "Kitchen Kitty",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0VXMwCY9RVNrNvWcF_9v0iZpNqA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/JF_241160_CreamyCottageCheeseScrambled_4x3_12902-619d00dc88594ea9b8ed884a108db16d.jpg",
      "alt": "Creamy Cottage Cheese Scrambled Eggs"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 5,
    "total_time_minutes": 10,
    "servings": "2",
    "ingredients": [
      "1 tablespoon butter",
      "4 large eggs, beaten",
      "0.25 cup cottage cheese",
      "1 teaspoon chopped fresh chives, or to taste",
      "ground black pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Melt butter in a skillet over medium heat. Pour beaten eggs into the skillet; let cook undisturbed until the bottom of the eggs begins to firm, 1 to 2 minutes.",
      "Stir cottage cheese and chives into eggs and season with black pepper.",
      "Cook and stir until eggs are nearly set, 3 to 4 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 224,
      "total_fat_g": 17.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 16.0,
      "sodium_mg": 295,
      "cholesterol_mg": 392,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 195,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/258568/one-skillet-corned-beef-hash-breakfast/",
    "category": "corned-beef",
    "id": 258568,
    "name": "One Skillet Corned Beef Hash Breakfast",
    "description": "Corned beef hash, onions, and bell pepper are browned in a skillet, topped with eggs and chopped tomatoes, then broiled until just set.",
    "author": "CliffG",
    "image": {
      "url": "https://www.allrecipes.com/thmb/h33lzB81QpGSgb_EGETccI2TW74=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4535789-one-skillet-corned-beef-hash-breakfast-bd.weld-4x3-1-a60b2075aa05489a925e87a0dd0a4c8c.jpg",
      "alt": "One Skillet Corned Beef Hash Breakfast"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 19,
    "total_time_minutes": 29,
    "servings": "4",
    "ingredients": [
      "1 (15 ounce) can HORMEL\u00ae Mary Kitchen\u00ae Corned Beef Hash",
      "0.25 cup finely diced onion",
      "0.25 cup finely diced green bell pepper",
      "4 large eggs",
      "2 tablespoons canned diced tomatoes and green chiles",
      "0.25 cup shredded sharp Cheddar cheese",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Combine corned beef hash, onion, and bell pepper in an ovenproof skillet. Cook, stirring occasionally, over medium-high heat until vegetables begin to soften and hash begins to brown, 10 to 15 minutes. Make 4 indentations in the hash for the eggs. Remove from heat.",
      "Set oven rack about 6 inches from the heat source and preheat the oven's broiler.",
      "Carefully crack an egg into each indentation. Top with chopped tomatoes.",
      "Place skillet under broiler; broil until eggs are cooked to preferred doneness, 4 to 10 minutes. Check often to avoid burning eggs. Remove skillet from oven. Top with shredded cheese; sprinkle with salt and pepper."
    ],
    "nutrition_per_serving": {
      "calories": 274,
      "total_fat_g": 17.0,
      "carbohydrates_g": 13.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 16.0,
      "sodium_mg": 578,
      "cholesterol_mg": 218,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 15,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/11821/tomato-alfredo/",
    "category": "fettuccini",
    "id": 11821,
    "name": "Tomato Alfredo",
    "description": "For a simple pasta with tomato Alfredo sauce, toss peas, chopped tomatoes, tart sour cream, salt, pepper and Parmesan cheese to make a tasty dish.",
    "author": "Nancy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0DE_IqBXVv5swsfXnjHKd8vaSwY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/99626-eba826bda67e43088841a138f85b9b96.jpg",
      "alt": "Tomato Alfredo"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "7",
    "ingredients": [
      "1 pound dry fettuccine pasta",
      "0.75 cup frozen green peas",
      "1 (14.5 ounce) can diced tomatoes",
      "1 cup low-fat sour cream",
      "0.75 cup grated Parmesan cheese",
      "salt to taste",
      "ground black pepper to taste"
    ],
    "instructions": [
      "Fill a large pot with lightly salted water and bring to a rolling boil. Cook fettuccine at a boil until tender yet firm to the bite, about 8 minutes, adding peas just before pasta is done. Drain.",
      "Combine tomatoes, sour cream, Parmesan, and 1/4 cup reserved juice. Add pasta and peas. Season with salt and pepper to taste."
    ],
    "nutrition_per_serving": {
      "calories": 340,
      "total_fat_g": 8.0,
      "carbohydrates_g": 53.0,
      "fiber_g": 3.0,
      "sugar_g": 5.0,
      "protein_g": 14.0,
      "sodium_mg": 298,
      "cholesterol_mg": 21,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 76,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/281607/leftover-turkey-fried-rice/",
    "category": "fried-rice",
    "id": 281607,
    "name": "Leftover Turkey Fried Rice",
    "description": "This turkey fried rice is perfect for jazzing up leftover roast turkey, cooked rice, and frozen vegetables for a tasty meal the day after Thanksgiving.",
    "author": "LBURDICK",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9PUKhoQSHmFBIlFvFH1I-OiBAL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9426363-d1c6d1afc560400aa572ab1277e43925.jpg",
      "alt": "Leftover Turkey Fried Rice"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "nonstick cooking spray",
      "1 medium onion, diced",
      "0.5 cup frozen peas and carrots",
      "2 tablespoons salted butter",
      "3 cups cold cooked rice",
      "2 cups diced cooked turkey",
      "2 tablespoons soy sauce, or more to taste",
      "1 tablespoon sesame oil, or as needed",
      "2 large eggs"
    ],
    "instructions": [
      "Coat a large pan with cooking spray. Add onion and saut\u00e9 over medium heat until translucent, about 5 minutes. Add frozen vegetables and butter; cook and stir, allowing butter to melt and veggies to thaw, 3 to 5 minutes.",
      "Increase heat to medium-high and stir in rice and turkey. Add soy sauce, 2 tablespoons at a time, and stir until rice takes on color. Push everything to the sides of the pan. Add sesame oil to the center of the pan and stir rice mixture until coated. Push everything to the sides of the pan again. Break eggs in the center of the pan. Scramble in the center until set, 2 to 3 minutes; then stir into rice mixture until well combined."
    ],
    "nutrition_per_serving": {
      "calories": 277,
      "total_fat_g": 10.0,
      "carbohydrates_g": 26.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 19.0,
      "sodium_mg": 395,
      "cholesterol_mg": 108,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 6,
    "recipe_category": "Dinner",
    "cuisine": "Asian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/150439/stir-fried-rice/",
    "category": "fried-rice",
    "id": 150439,
    "name": "Stir-Fried Rice",
    "description": "This stir-fried rice recipe is made with frozen mixed vegetables and scrambled eggs flavored with soy sauce for a quick, low-calorie, low-fat dish.",
    "author": "Minute Rice",
    "image": {
      "url": "https://www.allrecipes.com/thmb/zF7TMvIMVq54YbKXmBKt1tj44UA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1451306-0c98796445d049a6b3f29630d3cf84e5.jpg",
      "alt": "Stir-Fried Rice"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 tablespoon oil",
      "3 large eggs, lightly beaten",
      "1 (16 ounce) package frozen stir-fry vegetables, thawed",
      "1 (14.5 ounce) can chicken broth",
      "2 tablespoons soy sauce",
      "2 cups Minute\u00ae White Rice, uncooked"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium heat. Cook beaten eggs in hot oil until set, stirring occasionally. Remove scrambled eggs to a plate; set aside.",
      "Add vegetables, broth, and soy sauce to the same skillet; bring to a boil. Stir in rice; cover. Remove from heat and let stand for 5 minutes.",
      "Stir scrambled eggs into rice mixture. Serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 382,
      "total_fat_g": 9.0,
      "carbohydrates_g": 60.0,
      "fiber_g": 1.0,
      "sugar_g": 5.0,
      "protein_g": 14.0,
      "sodium_mg": 1534,
      "cholesterol_mg": 142,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 118,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/281371/sheet-pan-blueberry-pancakes/",
    "category": "meal-prep",
    "id": 281371,
    "name": "Sheet Pan Blueberry Pancakes",
    "description": "Sheet pan blueberry pancakes are the ultimate breakfast hack for busy mornings or meal prep. Customize this recipe with other fruits and toppings.",
    "author": "fabeveryday",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Pw7uv081XLxjSG_LHuq-4V75MYo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Sheet-Pan-Blueberry-Pancakes-4x3-1-503c4ce09ba24977a8540e69b2b355d7.jpg",
      "alt": "Sheet Pan Blueberry Pancakes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "1 serving cooking spray",
      "3 cups baking mix",
      "2 cups milk",
      "3 eggs",
      "0.25 teaspoon vanilla extract",
      "0.25 teaspoon ground cinnamon",
      "1 cup blueberries"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Line a large baking sheet or jelly roll pan with parchment paper; coat with cooking spray.",
      "Combine baking mix, milk, eggs, vanilla extract, and cinnamon in a large bowl; pour onto the prepared baking sheet. Sprinkle blueberries evenly on top of batter.",
      "Bake in the preheated oven until golden brown, 15 to 18 minutes.",
      "Lift parchment paper with pancake from baking sheet; set on a cutting board. Slice into squares using a pizza cutter or into desired shapes with a cookie cutter."
    ],
    "nutrition_per_serving": {
      "calories": 292,
      "total_fat_g": 5.0,
      "carbohydrates_g": 51.0,
      "fiber_g": 1.0,
      "sugar_g": 9.0,
      "protein_g": 11.0,
      "sodium_mg": 1223,
      "cholesterol_mg": 100,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 6,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23382/macaroni-and-tuna-fish-salad/",
    "category": "tuna-salads",
    "id": 23382,
    "name": "Macaroni and Tuna Fish Salad",
    "description": "In a rush and need something delicious and tummy-filling? This recipe is great for working parents whose children are constantly scouring the refrigerator for food to munch on.",
    "author": "DAJUICEMANCE",
    "image": {
      "url": "https://www.allrecipes.com/thmb/EZexo6yGdZnlONEhuK1chC0ryU8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9191862-8b2103a37fb8469fb85117393aabb7dd.jpg",
      "alt": "Macaroni and Tuna Fish Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 13,
    "total_time_minutes": 23,
    "servings": "8",
    "ingredients": [
      "1 (16 ounce) package macaroni",
      "2 (5 ounce) cans tuna, drained",
      "3 tablespoons mayonnaise, or to taste",
      "1 onion, finely chopped",
      "salt and ground black pepper to taste",
      "1 pinch garlic powder, or to taste",
      "1 pinch dried oregano, or to taste"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Add macaroni and cook for 8 to 10 minutes or until al dente; drain and cool under running water.",
      "Mix both cans of tuna into the cooled pasta. Add the mayonnaise. Stir in onion, salt, pepper, garlic powder, and oregano."
    ],
    "nutrition_per_serving": {
      "calories": 301,
      "total_fat_g": 6.0,
      "carbohydrates_g": 45.0,
      "fiber_g": 3.0,
      "sugar_g": 2.0,
      "protein_g": 16.0,
      "sodium_mg": 67,
      "cholesterol_mg": 11,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 65,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/59104/eagle-salad/",
    "category": "tuna-salads",
    "id": 59104,
    "name": "Eagle Salad",
    "description": "Don't worry! It's not really eagle! This is an easy elbow macaroni salad that my Aunt makes. Everybody LOVES it!",
    "author": "Amanda",
    "image": {
      "url": "https://www.allrecipes.com/thmb/II_wv2VBr7wIbBbh9OrkJs5UC0A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/59104eagle-saladChefMo4x3-1d4ac2009a2d420f90c311e2f10c5c87.jpg",
      "alt": "Eagle Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "5",
    "ingredients": [
      "2 cups elbow macaroni",
      "3 tablespoons mayonnaise",
      "0.5 small onion, chopped",
      "1 (5 ounce) can tuna, drained",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Bring a pot of lightly salted water to a boil. Add macaroni, and cook until al dente, about 8 minutes. Drain, and rinse with cold water to chill. Set aside to dry.",
      "Mix together the cooled macaroni noodles, mayonnaise, onion and tuna in a bowl. Taste and add more mayonnaise, if desired. Season with salt and black pepper. Refrigerate until serving."
    ],
    "nutrition_per_serving": {
      "calories": 222,
      "total_fat_g": 4.0,
      "carbohydrates_g": 34.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 12.0,
      "sodium_mg": 109,
      "cholesterol_mg": 10,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 39,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/280268/air-fryer-beef-tenderloin/",
    "category": "beef-tenderloin",
    "id": 280268,
    "name": "Air Fryer Beef Tenderloin",
    "description": "This air fryer beef tenderloin recipe is tender like filet mignon and has a lovely crisp crust perfectly seasoned with oregano, salt, and pepper.",
    "author": "Buckwheat Queen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Wi4DBCnKyVccjbd48QdstoegcwQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-280268-air-fryer-beef-tenderloin-hero-4x3-18030bb0897f421f884aa4e0a36e7009.jpg",
      "alt": "Air Fryer Beef Tenderloin"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "8",
    "ingredients": [
      "2 pounds beef tenderloin, at room temperature",
      "1 tablespoon vegetable oil",
      "1 teaspoon dried oregano",
      "1 teaspoon salt",
      "0.5 teaspoon cracked black pepper"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the air fryer to 400 degrees F (200 degrees C).",
      "Pat dry tenderloin with paper towels and place on a plate. Drizzle oil all over meat, then sprinkle with oregano, salt, and pepper.",
      "Rub spices and oil into meat.",
      "Place into the preheated air fryer basket, folding as needed to make it fit. Close the lid.",
      "Reduce heat to 390 degrees F (198 degrees C) and cook for 22 minutes. Reduce heat to 360 degrees F (182 degrees C) and cook for 10 more minutes. An instant-read thermometer inserted into the center of tenderloin should read 135 degrees F (57 degrees C) for medium doneness.",
      "Remove tenderloin to a platter. Allow to rest, uncovered, for at least 10 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 235,
      "total_fat_g": 11.0,
      "carbohydrates_g": 0.0,
      "fiber_g": 0.0,
      "sugar_g": 0,
      "protein_g": 32.0,
      "sodium_mg": 358,
      "cholesterol_mg": 90,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 6,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/239150/santa-fe-stew/",
    "category": "beef-stews",
    "id": 239150,
    "name": "Santa Fe Stew",
    "description": "This ground beef stew is easy to make thanks to use of canned beans and vegetables, making it a great winter dinner for busy parents.",
    "author": "steph",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Sx6B3Oes1VUJYZBBy7l6TwvG4w0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1920163-ecde919f90924500b8ed76020a5d91b0.jpg",
      "alt": "Santa Fe Stew"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "8",
    "ingredients": [
      "2 pounds ground beef",
      "1 onion, chopped",
      "2 (1 ounce) packets taco seasoning mix",
      "2 (1 ounce) packets ranch dressing mix",
      "2 (16 ounce) cans shoepeg corn",
      "2 (10 ounce) cans diced tomatoes with green chile peppers (such as RO*TEL\u00ae)",
      "1 (15 ounce) can red kidney beans",
      "1 (15 ounce) can black beans",
      "1 (15 ounce) can pinto beans",
      "1 (14.5 ounce) can chicken broth",
      "1 (14.5 ounce) can diced tomatoes"
    ],
    "instructions": [
      "Heat a large skillet over medium-high heat. Cook and stir beef and onion in the hot skillet until browned and crumbly, 5 to 7 minutes; drain and discard grease.",
      "Stir taco seasoning mix and ranch dressing mix into the ground beef; add shoepeg corn, diced tomatoes with green chile peppers, red kidney beans, black beans, pinto beans, chicken broth, and diced tomatoes. Bring the mixture to a simmer, stirring occasionally; cook until the tomatoes are softened, 30 to 60 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 525,
      "total_fat_g": 15.0,
      "carbohydrates_g": 62.0,
      "fiber_g": 12.0,
      "sugar_g": 8.0,
      "protein_g": 31.0,
      "sodium_mg": 2402,
      "cholesterol_mg": 72,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 29,
    "recipe_category": "Dinner",
    "cuisine": "U.S.",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/49404/juiciest-hamburgers-ever/",
    "category": "burgers",
    "id": 49404,
    "name": "Juiciest Hamburgers Ever",
    "description": "Juicy, flavorful hamburgers are just what you need for a perfect summer BBQ, party, or potluck, and these are super easy to prepare for guests.",
    "author": "Jane",
    "image": {
      "url": "https://www.allrecipes.com/thmb/3x-XkV8T36df_M4tkoDbaD-WmJs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/49404-juiciest-hamburgers-ever-DDMFS-4x3-86fc27c741dd410aa365f96490c54060.jpg",
      "alt": "Juiciest Hamburgers Ever"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 35,
    "servings": "8",
    "ingredients": [
      "2 pounds ground beef",
      "1 egg, beaten",
      "0.75 cup dry bread crumbs",
      "3 tablespoons evaporated milk",
      "2 tablespoons Worcestershire sauce",
      "0.125 teaspoon cayenne pepper",
      "2 cloves garlic, minced"
    ],
    "instructions": [
      "Gather all ingredients. Preheat a grill for high heat.",
      "Mix the ground beef, egg, bread crumbs, evaporated milk, Worcestershire sauce, cayenne pepper, and garlic in a large bowl using your hands.",
      "Form the mixture into 8 hamburger patties.",
      "Lightly oil the grill grate. Grill patties until browned and no longer pink, about 5 minutes per side. Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 288,
      "total_fat_g": 18.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 22.0,
      "sodium_mg": 196,
      "cholesterol_mg": 96,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 1328,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235997/unstuffed-cabbage-roll/",
    "category": "cabbage-rolls",
    "id": 235997,
    "name": "Unstuffed Cabbage Roll",
    "description": "Unstuffed cabbage rolls with ground beef, cabbage, garlic, and tomatoes make a family-pleasing comforting casserole that's perfect for weeknights.",
    "author": "tlc_adams",
    "image": {
      "url": "https://www.allrecipes.com/thmb/0-gN85GXkCBas2FatewuO40jXG8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235997-unstuffed-cabbage-roll-DDMFS-Beauty-4x3-ad7d13f5aa6244df935598e9db537538.jpg",
      "alt": "Unstuffed Cabbage Roll"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "2 pounds ground beef",
      "1 large onion, chopped",
      "1 small head cabbage, chopped",
      "2 (14.5 ounce) cans diced tomatoes",
      "1 (8 ounce) can tomato sauce",
      "0.5 cup water",
      "2 cloves garlic, minced",
      "2 teaspoons salt",
      "1 teaspoon ground black pepper"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Heat a Dutch oven or large skillet over medium-high heat. Cook and stir beef and onion in the hot Dutch oven until browned and crumbly, 5 to 7 minutes; drain and discard grease.",
      "Add cabbage, tomatoes, tomato sauce, water, garlic, salt, and pepper and bring to a boil. Cover Dutch oven, reduce heat, and simmer until cabbage is tender, about 30 minutes.",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 398,
      "total_fat_g": 24.0,
      "carbohydrates_g": 16.0,
      "fiber_g": 5.0,
      "sugar_g": 10.0,
      "protein_g": 29.0,
      "sodium_mg": 1294,
      "cholesterol_mg": 93,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 1812,
    "recipe_category": "Dinner",
    "cuisine": "Eastern European",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/",
    "category": "burgers",
    "id": 158968,
    "name": "Spinach and Feta Turkey Burgers",
    "description": "These spinach and feta turkey burgers are moist and easy to make in one bowl with simple ingredients, shaped into patties, and cooked on a hot grill.",
    "author": "FoodieGeek",
    "image": {
      "url": "https://www.allrecipes.com/thmb/cpf6Rics5oHGq1TZ1df5fEaImwM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1360550-582be362ee99424bb4f363c2274a9d0d.jpg",
      "alt": "Spinach and Feta Turkey Burgers"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "8",
    "ingredients": [
      "cooking spray",
      "2 pounds ground turkey",
      "1 (10 ounce) box frozen chopped spinach, thawed and squeezed dry",
      "4 ounces feta cheese",
      "2 large eggs, beaten",
      "2 cloves garlic, minced"
    ],
    "instructions": [
      "Preheat an outdoor grill for medium-high heat and lightly oil the grate.",
      "Mix together turkey, spinach, feta, eggs, and garlic in a large bowl until well combined; form into 8 patties.",
      "Cook patties on the preheated grill on both sides until no longer pink in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center of patties should read at least 165 degrees F (74 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 233,
      "total_fat_g": 13.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 27.0,
      "sodium_mg": 266,
      "cholesterol_mg": 143,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 858,
    "recipe_category": "Dinner",
    "cuisine": "Mediterranean Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/242478/buffalo-or-barbeque-chicken-and-rice-wraps/",
    "category": "buffalo-chicken-wings",
    "id": 242478,
    "name": "Buffalo Chicken and Rice Wraps",
    "description": "Shredded chicken, brown rice, shredded cheese, and Buffalo wing sauce are wrapped in tortillas and served with carrots, celery, and ranch dressing.",
    "author": "Uncle Ben's",
    "image": {
      "url": "https://www.allrecipes.com/thmb/RJohPmPAodh1OQQXsk1jAIbr9JQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2404258-aad872dcf0ae4513b1f6e8f0de3fba9a.jpg",
      "alt": "Buffalo Chicken and Rice Wraps"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "1 (8.8 ounce) pouch UNCLE BEN'S\u00ae Ready Rice\u00ae Whole Grain Brown",
      "2 tablespoons water, or as needed",
      "1 cup shredded cooked chicken breast",
      "0.25 cup Buffalo-style hot pepper sauce (such as Frank's\u00ae Red Hot\u00ae)",
      "4 (8 inch) whole-wheat tortillas",
      "0.5 cup shredded Cheddar cheese",
      "0.5 cup shredded lettuce",
      "1 cup baby carrots",
      "1 cup celery sticks",
      "1 cup reduced fat ranch dressing"
    ],
    "instructions": [
      "Gently squeeze the sides of rice pouch to break apart rice. Pour rice and water into a skillet over medium heat. Cook and stir until rice is heated through and water is absorbed, about 2 minutes. Set aside.",
      "Combine shredded chicken and buffalo sauce in a bowl; stir well and set aside.",
      "Place a tortilla on a microwave-safe plate covered with a damp paper towel. Cook on high until warm and pliable, 20 to 30 seconds. Repeat this step with remaining tortillas.",
      "Evenly divide rice among tortillas and spread to within 1/2 inch of the edges. Evenly divide chicken mixture over rice. Sprinkle with cheese, then top with lettuce. Fold in the sides of each tortilla and roll up tightly. Cut each wrap in half, diagonally.",
      "Serve each wrap with carrots, celery, and about 1/4 cup ranch dressing for dipping."
    ],
    "nutrition_per_serving": {
      "calories": 402,
      "total_fat_g": 11.0,
      "carbohydrates_g": 63.0,
      "fiber_g": 5.0,
      "sugar_g": 7.0,
      "protein_g": 20.0,
      "sodium_mg": 1475,
      "cholesterol_mg": 45,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 12,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/9044/tomato-chicken-parmesan/",
    "category": "chicken-parmesan",
    "id": 9044,
    "name": "Tomato Chicken Parmesan",
    "description": "A double cheese effect, as Parmesan-coated chicken swims in a pool of pasta sauce with a blanket of melted Monterey Jack over all.",
    "author": "vero_cn81",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-d9OawaK1lTx8RDmYDa5oWdYw_0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9225732-tomato-chicken-parmesan-crkydg-1x1-1-9c0775b4082e4380ba5971eb785e24d2.jpg",
      "alt": "Tomato Chicken Parmesan"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "6",
    "ingredients": [
      "2 eggs, beaten",
      "1 cup grated Parmesan cheese",
      "7 ounces seasoned bread crumbs",
      "6 skinless, boneless chicken breast halves",
      "1 tablespoon vegetable oil",
      "12 ounces pasta sauce",
      "6 slices Monterey Jack cheese"
    ],
    "instructions": [
      "Preheat oven to 375 degrees F (190 degrees C).",
      "Pour beaten eggs into a shallow dish or bowl. In another shallow dish or bowl, mix together the grated Parmesan cheese and bread crumbs. Dip chicken breasts into beaten egg, then into bread crumb mixture to coat.",
      "In a large skillet, heat oil over medium high heat. Add coated chicken and saute for about 8 to 10 minutes each side, or until chicken is cooked through and juices run clear.",
      "Pour tomato sauce into a lightly greased 9x13 inch baking dish. Add chicken, then place a slice of Monterey Jack cheese over each breast, and bake in the preheated oven for 20 minutes or until cheese is completely melted."
    ],
    "nutrition_per_serving": {
      "calories": 513,
      "total_fat_g": 23.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 3.0,
      "sugar_g": 7.0,
      "protein_g": 44.0,
      "sodium_mg": 1249,
      "cholesterol_mg": 168,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 2309,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8499/basic-chicken-salad/",
    "category": "chicken-salads",
    "id": 8499,
    "name": "Best Chicken Salad",
    "description": "This classic chicken salad recipe is easy to make and perfect for using leftover shredded chicken; mayo, almonds, and celery add flavor and crunch.",
    "author": "Jackie M",
    "image": {
      "url": "https://www.allrecipes.com/thmb/aPy_MqN4GgyO27vh98ns1pXaIWg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8499-Best-Chicken-Salad-DDMFS-3X4-11915-d36a5b98b1e041b3b48b62ecdfa6029e.jpg",
      "alt": "Best Chicken Salad"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 5,
    "total_time_minutes": 10,
    "servings": "2",
    "ingredients": [
      "0.5 cup blanched slivered almonds",
      "0.5 cup mayonnaise",
      "1 tablespoon lemon juice",
      "0.25 teaspoon ground black pepper",
      "2 cups chopped, cooked chicken meat",
      "1 stalk celery, chopped"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Place almonds in a skillet over medium-low heat. Cook until golden brown and toasted, shaking frequently and watching carefully, as they burn easily.",
      "Mix mayonnaise, lemon juice, and pepper together in a medium bowl until combined.",
      "Add chicken, toasted almonds, and celery; toss until just combined.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 779,
      "total_fat_g": 63.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 3.0,
      "sugar_g": 2.0,
      "protein_g": 44.0,
      "sodium_mg": 403,
      "cholesterol_mg": 126,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 827,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8382669/quick-air-fryer-chicken-parmesan/",
    "category": "chicken-parmesan",
    "id": 8382669,
    "name": "Quick Air Fryer Chicken Parmesan",
    "description": "This quick chicken Parmesan in the air fryer is made with frozen breaded chicken fillets which cuts down on prep time. Perfect for dorm cooking.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/i8FCdu-w3XLwvy90aY3sK3Pfu4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1650500889DA3B27BC-79C2-45A5-AB97-A44A8D30D782-2000-1d76c30271504d80b474ca9ef142faf7.jpeg",
      "alt": "Quick Air Fryer Chicken Parmesan"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "2",
    "ingredients": [
      "1 (8 ounce) package spaghetti",
      "0.5 tablespoon salt",
      "2 fully cooked breaded chicken fillets (such as Kirkwood\u00ae)",
      "0.5 (8 ounce) can marinara sauce",
      "1 (8 ounce) package fresh mozzarella cheese, sliced",
      "1 tablespoon fresh basil, cut in very thin strips"
    ],
    "instructions": [
      "Preheat an air fryer to 400 degrees F (200 degrees C) for 5 minutes.",
      "Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally, until tender yet firm to the bite, about 12 minutes.",
      "Meanwhile, set 2 chicken fillets into the air fryer basket.",
      "Air fry chicken fillets for 6 minutes. Flip fillets over and cook for 6 minutes on the other side. Spread marinara sauce over fillets. Top each fillet with mozzarella slices. Air fry until cheese is melted, about 3 more minutes.",
      "Drain spaghetti noodles and divide noodles between 2 bowls. Carefully add a chicken fillet to each bowl. Garnish with basil."
    ],
    "nutrition_per_serving": {
      "calories": 884,
      "total_fat_g": 34.0,
      "carbohydrates_g": 97.0,
      "fiber_g": 5.0,
      "sugar_g": 0,
      "protein_g": 41.0,
      "sodium_mg": 3513,
      "cholesterol_mg": 105,
      "saturated_fat_g": 18.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 2,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/258444/pulled-pork-chilaquiles/",
    "category": "chilaquiles",
    "id": 258444,
    "name": "Pulled Pork Chilaquiles",
    "description": "Make the pulled pork at home, and then layer it with tortilla chips, tomatillo salsa, and Cheddar cheese in this chilaquiles recipe you can prep over a campfire.",
    "author": "Ashley Baron Rodriguez",
    "image": {
      "url": "https://www.allrecipes.com/thmb/iouAASErYvvq52S6uOoPGplQgH0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4532790-1bb17da8a527493f8bc479575cd7d2ba.jpg",
      "alt": "Pulled Pork Chilaquiles"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "2 tablespoons unsalted butter",
      "1 yellow onion, thinly sliced",
      "0.5 (16 ounce) jar tomatillo salsa",
      "1 cup chicken stock",
      "8 cups tortilla chips",
      "2.5 cups shredded aged Cheddar cheese (such as Beecher's Flagship)",
      "2 cups citrus-braised pulled pork"
    ],
    "instructions": [
      "Set a cast iron Dutch oven over hot coals. Heat butter until melted. Add onion; cook, stirring often, until soft and deeply browned in parts, 5 to 7 minutes.",
      "Pour salsa and chicken stock into the Dutch oven; bring to a boil. Layer in 1/2 of the chips, Cheddar cheese, and pulled pork. Repeat with the remaining chips, Cheddar cheese, and pulled pork (see Cook's Note for recipe link). Cover and cook until cheese is melted, about 5 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 841,
      "total_fat_g": 48.0,
      "carbohydrates_g": 52.0,
      "fiber_g": 3.0,
      "sugar_g": 4.0,
      "protein_g": 49.0,
      "sodium_mg": 1968,
      "cholesterol_mg": 174,
      "saturated_fat_g": 23.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 2,
    "recipe_category": "Dinner",
    "cuisine": "",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8505574/easy-creamy-chicken-ramen/",
    "category": "cooking-for-one",
    "id": 8505574,
    "name": "Easy Creamy Chicken Ramen",
    "description": "A handful of ingredients turns an ordinary package of ramen into a comforting bowl of goodness in minutes.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/2lBJDVZ3LqM2bxWcr1GkwlaC4r8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16677760778C21FBB5-C0F0-4CA8-95FC-CF08C4904317-2000-001744e5cba84a8c9e72445b49980f38.jpeg",
      "alt": "Easy Creamy Chicken Ramen"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 5,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "1 tablespoon unsalted butter",
      "2 cloves garlic, minced",
      "0.5 cup chicken broth",
      "0.5 cup whipping cream",
      "1 (3 ounce) package ramen noodles (without flavor packet)",
      "1 teaspoon reduced-sodium soy sauce",
      "0.25 cup chopped cooked chicken",
      "1 pinch everything bagel seasoning (optional)"
    ],
    "instructions": [
      "Melt butter in a heavy skillet over medium heat. Add minced garlic and cook, stirring, until fragrant, about 30 seconds. Add chicken broth, cream, and ramen noodles. Cook, stirring occasionally, until noodles soften, about 3 minutes.",
      "Add soy sauce and chopped cooked chicken. Allow to get hot.",
      "Serve garnished with everything bagel seasoning if desired."
    ],
    "nutrition_per_serving": {
      "calories": 958,
      "total_fat_g": 73.0,
      "carbohydrates_g": 56.0,
      "fiber_g": 0.0,
      "sugar_g": 0,
      "protein_g": 21.0,
      "sodium_mg": 1208,
      "cholesterol_mg": 223,
      "saturated_fat_g": 42.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 15,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/230905/savory-pan-seared-tuna-steaks/",
    "category": "cooking-for-one",
    "id": 230905,
    "name": "Savory Pan-Seared Tuna Steaks",
    "description": "These pan-seared tuna steaks are marinated in ginger, garlic, soy sauce, sesame oil, and molasses for an easy weeknight meal that feels fancy.",
    "author": "meg_in_quebec",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Yjttb04diWa9q_JuUNE5wVhaT70=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4495988-savory-pan-seared-tuna-steaks-NateDawg1123-4x3-1-c21b7761d458498b81d81794bcc426e4.jpg",
      "alt": "Savory Pan-Seared Tuna Steaks"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 35,
    "servings": "2",
    "ingredients": [
      "0.25 cup soy sauce",
      "0.25 cup extra-virgin olive oil",
      "2 tablespoons lemon juice",
      "2 teaspoons Asian (toasted) sesame oil",
      "2 teaspoons molasses",
      "1 teaspoon cayenne pepper, or more to taste",
      "6 thin slices fresh ginger, minced",
      "2 cloves garlic, minced",
      "2 1-inch-thick tuna steaks, thawed"
    ],
    "instructions": [
      "Mix soy sauce, olive oil, lemon juice, sesame oil, molasses, cayenne pepper, ginger, and garlic together in a bowl.",
      "Place tuna steaks in a large resealable plastic bag or airtight container; pour marinade over steaks, coat with marinade, and seal. Marinate steaks at room temperature for 20 minutes.",
      "Heat a nonstick pan over medium heat.",
      "Remove steaks from marinade and discard any remaining marinade. Arrange steaks in the hot pan; gently shake the pan to avoid sticking. Cook for 1 1/2 minutes. Flip and cook 1 minute more."
    ],
    "nutrition_per_serving": {
      "calories": 592,
      "total_fat_g": 41.0,
      "carbohydrates_g": 12.0,
      "fiber_g": 1.0,
      "sugar_g": 5.0,
      "protein_g": 42.0,
      "sodium_mg": 1875,
      "cholesterol_mg": 65,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 99,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/47717/reuben-sandwich-ii/",
    "category": "corned-beef",
    "id": 47717,
    "name": "Reuben Sandwich",
    "description": "A Reuben sandwich is easy to make with corned beef, Swiss cheese, sauerkraut, and Thousand Island dressing grilled between slices of rye bread.",
    "author": "COLETTE G.",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jIwSfYU2yuwDKQrvMCvBbatRN6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/47717-reuben-sandwich-ddmfs-hero-3x4-0624-88eae0b6357843b593b4f03f7debc7e1.jpg",
      "alt": "Reuben Sandwich"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "8 slices rye bread",
      "0.5 cup Thousand Island dressing",
      "8 slices Swiss cheese",
      "8 slices deli sliced corned beef",
      "1 cup sauerkraut, drained",
      "2 tablespoons butter, softened"
    ],
    "instructions": [
      "Gather all ingredients and preheat a large griddle or skillet over medium heat.",
      "Spread one side of bread slices evenly with Thousand Island dressing.",
      "On four bread slices, layer one slice Swiss cheese, 2 slices corned beef, 1/4 cup sauerkraut, and a second slice of Swiss cheese. Top with remaining bread slices, dressing-side down. Butter the top of each sandwich.",
      "Place sandwiches, butter-side down on the preheated griddle; butter the top of each sandwich with remaining butter. Grill until both sides are golden brown, about 5 minutes per side.",
      "Serve hot. Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 657,
      "total_fat_g": 40.0,
      "carbohydrates_g": 44.0,
      "fiber_g": 5.0,
      "sugar_g": 10.0,
      "protein_g": 32.0,
      "sodium_mg": 1930,
      "cholesterol_mg": 115,
      "saturated_fat_g": 18.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 740,
    "recipe_category": "Lunch",
    "cuisine": "U.S.",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/20581/broiled-reuben-sandwich/",
    "category": "corned-beef",
    "id": 20581,
    "name": "Broiled Reuben Sandwich",
    "description": "Rye bread filled with sauerkraut, Swiss cheese and corned beef, smothered with a zesty sauce and broiled until golden.",
    "author": "Sara",
    "image": {
      "url": "https://www.allrecipes.com/thmb/SSzqgDCgRw5bGoIzdosHoyiwJM8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/464895-0a21b3b900534554a6a5e66339d3a409.jpg",
      "alt": "Broiled Reuben Sandwich"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 2,
    "total_time_minutes": 17,
    "servings": "4",
    "ingredients": [
      "1 tablespoon chili sauce",
      "0.33333334326744 cup mayonnaise",
      "0.25 cup butter, softened",
      "8 slices rye bread",
      "0.5 pound thinly sliced corned beef",
      "0.5 pound sliced Swiss cheese",
      "1 pound sauerkraut"
    ],
    "instructions": [
      "Preheat oven broiler.",
      "Mix chili sauce and mayonnaise until smooth. Spread mayonnaise mixture and butter on bread slices. Layer corned beef, Swiss and sauerkraut on 4 slices and top with remaining slices. Place on baking sheet under preheated broiler and broil until browned, turning once, 2 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 738,
      "total_fat_g": 52.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 7.0,
      "sugar_g": 6.0,
      "protein_g": 29.0,
      "sodium_mg": 1977,
      "cholesterol_mg": 128,
      "saturated_fat_g": 22.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 19,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/234487/fajita-quesadillas/",
    "category": "fajitas",
    "id": 234487,
    "name": "Fajita Quesadillas",
    "description": "These fajita quesadillas combine sliced peppers, onions, and melted cheese with leftover steak in a crispy tortilla for a quick and easy dinner.",
    "author": "DHANO923",
    "image": {
      "url": "https://www.allrecipes.com/thmb/x9YQx-YkxhGMWSODsd4c3nNMBV4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/234481-fajita-quesadillas-VAT-Beauty-4x3-b3a54b0caf564366b31826ab0f6d1f97.jpg",
      "alt": "Fajita Quesadillas"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "2 tablespoons vegetable oil, divided",
      "0.5 onion, sliced",
      "0.5 green bell pepper, sliced",
      "salt to taste",
      "4 flour tortillas",
      "0.5 pound cooked steak, cut into 1/4-inch thick pieces",
      "1 cup shredded Mexican cheese blend"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Heat 2 teaspoons oil in a 10-inch skillet over medium heat. Add onion and bell pepper; cook and stir until softened, 5 to 10 minutes. Season with salt and transfer to a bowl.",
      "Brush 1 side of each tortilla with remaining oil. Place 1 tortilla, oil-side down, in the same skillet; sprinkle with 1/2 the steak, 1/2 the onion mixture, and 1/2 the Mexican cheese mixture.",
      "Place a second tortilla, oil-side up, onto cheese layer, pressing down with a spatula to seal.",
      "Cook quesadilla over medium heat until cheese melts and tortillas are browned, 3 to 4 minutes per side.",
      "Remove quesadilla from skillet and cut into wedges. Repeat with remaining ingredients for second quesadilla."
    ],
    "nutrition_per_serving": {
      "calories": 552,
      "total_fat_g": 31.0,
      "carbohydrates_g": 40.0,
      "fiber_g": 3.0,
      "sugar_g": 2.0,
      "protein_g": 28.0,
      "sodium_mg": 762,
      "cholesterol_mg": 79,
      "saturated_fat_g": 13.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 62,
    "recipe_category": "Dinner",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/244458/buttered-noodles/",
    "category": "fettuccini",
    "id": 244458,
    "name": "Buttered Noodles",
    "description": "These saucy buttered noodles with Parmesan cheese are simple to make and perfect to serve as-is for a main dish or as a delicious side for meatballs.",
    "author": "elohel",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IAP81Be7Nyly6t_Wkq1uYKzH-qo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/244458-buttered-noodles-DDMFS-4x3-b9931662efa64b37883c0f73b296b124.jpg",
      "alt": "Buttered Noodles"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "8",
    "ingredients": [
      "1 (16 ounce) package fettuccine noodles",
      "6 tablespoons butter, cut into pieces",
      "0.33333334326744 cup grated Parmesan cheese",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Fill a large pot with lightly salted water and bring to a rolling boil.",
      "Stir in fettuccine, bring back to a boil, and cook pasta over medium heat until tender yet firm to the bite, 8 to 10 minutes.",
      "Drain and return pasta to pot. Mix butter, Parmesan cheese, salt, and pepper into pasta until evenly combined.",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 294,
      "total_fat_g": 11.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 9.0,
      "sodium_mg": 135,
      "cholesterol_mg": 26,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 280,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/11970/easy-chicken-alfredo/",
    "category": "fettuccini",
    "id": 11970,
    "name": "Easy Chicken Alfredo",
    "description": "Chicken Alfredo recipe with jar sauce, mixed vegetables, and linguine pasta; easy to make when you need quick and creamy comfort on busy weeknights.",
    "author": "jojolyn",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-kffYE8LMEO9UJSs9mX2vrRhItk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11970easy-chicken-alfredofabeveryday2x1-a4112dbccf3d4149a18eb45435e77115.jpg",
      "alt": "Easy Chicken Alfredo"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 pound uncooked fettuccine or linguine",
      "2 boneless chicken breast halves, cooked and cubed",
      "1 (16 ounce) jar Alfredo-style pasta sauce",
      "1 (10 ounce) package frozen mixed vegetables",
      "1 (4.5 ounce) can sliced mushrooms",
      "0.33333334326744 cup milk"
    ],
    "instructions": [
      "Fill a large pot with lightly salted water and bring to a rolling boil. Cook fettuccine at a boil until tender yet firm to the bite, about 8 minutes. Drain well.",
      "While the pasta is cooking, place cubed cooked chicken, Alfredo sauce, frozen vegetables, mushrooms, and milk in a large saucepan over medium-low heat. Cook and stir until chicken is heated through and vegetables are tender.",
      "Serve warm Alfredo and chicken sauce over cooked noodles."
    ],
    "nutrition_per_serving": {
      "calories": 901,
      "total_fat_g": 41.0,
      "carbohydrates_g": 100.0,
      "fiber_g": 7.0,
      "sugar_g": 9.0,
      "protein_g": 39.0,
      "sodium_mg": 1315,
      "cholesterol_mg": 89,
      "saturated_fat_g": 15.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 132,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/87473/mustard-fried-chicken/",
    "category": "fried-chicken",
    "id": 87473,
    "name": "Mustard Fried Chicken",
    "description": "This mustard fried chicken is made with wings seasoned with pantry spices, coated in mustard, then fried until crisp for a tasty appetizer or meal.",
    "author": "Othasha Thomas",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Za2LAosbx6qNprdMxYPX4FI9RME=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/135999-a03cb0dd4438483ea363a553f3d8380b.jpg",
      "alt": "Mustard Fried Chicken"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "10",
    "ingredients": [
      "5 pounds chicken wings, separated at joints, tips discarded",
      "2 tablespoons garlic powder",
      "2 tablespoons onion powder",
      "2 tablespoons ground black pepper",
      "1 tablespoon seasoned salt",
      "1 tablespoon monosodium glutamate (MSG, or Accent flavor enhancer)",
      "3 tablespoons prepared yellow mustard",
      "3 cups all-purpose flour",
      "1 quart oil for frying, or as needed"
    ],
    "instructions": [
      "Season chicken wings on both sides with garlic powder, onion powder, pepper, seasoned salt, and MSG.",
      "Use a basting brush to coat each wing with a thin layer of mustard. Pour flour into a plastic bag, add chicken, and shake to coat.",
      "Heat oil in a deep fryer or heavy skillet to 350 degrees F (175 degrees C).",
      "Cook chicken in hot oil until no longer pink and the juices run clear, about 6 minutes per side. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C). Drain on a paper towel-lined plate. Allow to cool for 5 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 400,
      "total_fat_g": 21.0,
      "carbohydrates_g": 32.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 20.0,
      "sodium_mg": 516,
      "cholesterol_mg": 48,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 114,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/262501/easy-fried-chinese-chicken-balls/",
    "category": "fried-chicken",
    "id": 262501,
    "name": "Easy Fried Chinese Chicken Balls",
    "description": "These fried Chinese chicken balls are dipped in a cornstarch batter, then fried until golden for a crispy, succulent bite better than any restaurant.",
    "author": "fa the wondercat",
    "image": {
      "url": "https://www.allrecipes.com/thmb/NuPnwq04pQG3iAHw9ToCAkCQ3jQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5071900-easy-fried-chinese-chicken-balls-AllrecipesPhoto-4x3-1-62f559266e964b8c8f1887c0acf213c9.jpg",
      "alt": "Easy Fried Chinese Chicken Balls"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 55,
    "servings": "4",
    "ingredients": [
      "1 cup all-purpose flour",
      "2 teaspoons baking powder",
      "1 pinch salt",
      "1 teaspoon sesame oil",
      "0.5 cup water, or more if needed",
      "vegetable oil for frying",
      "5 tablespoons cornstarch",
      "1 pinch ground white pepper",
      "4 boneless skinless chicken breasts, cubed"
    ],
    "instructions": [
      "Make batter: Combine flour, baking powder, and salt in a large bowl. Drizzle in sesame oil. Gradually add water, whisking constantly until smooth; batter should be the consistency of cream. Let sit for at least 30 minutes.",
      "Fill a deep pan or wok with oil and slowly heat to 375 degrees F (190 degrees C).",
      "Prepare chicken: Mix together cornstarch and white pepper in a large shallow dish. Dust chicken in cornstarch mixture, then dip into batter, evenly coating each piece.",
      "Working in batches, fry coated chicken in hot oil until golden and no longer pink in the center, 4 to 5 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).\u00a0Use a slotted spoon to remove fried chicken to a clean kitchen towel to drain."
    ],
    "nutrition_per_serving": {
      "calories": 338,
      "total_fat_g": 10.0,
      "carbohydrates_g": 34.0,
      "fiber_g": 1.0,
      "sugar_g": 0.0,
      "protein_g": 27.0,
      "sodium_mg": 341,
      "cholesterol_mg": 65,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 17,
    "recipe_category": "Dinner",
    "cuisine": "Chinese",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/14554/sirloin-steak-with-garlic-butter/",
    "category": "gluten-free",
    "id": 14554,
    "name": "Sirloin Steak with Garlic Butter",
    "description": "This grilled sirloin steak recipe includes a super garlicky melted butter that's made with freshly minced garlic and garlic powder. Simply delicious!",
    "author": "Maryellen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OJ28fIFte6Pyg93ML8IM-APbu1Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-14554-sirloin-steak-with-garlic-butter-hero-4x3-d12fa79836754fcf850388e4677bbf55.jpg",
      "alt": "Sirloin Steak with Garlic Butter"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "0.5 cup butter",
      "4 cloves garlic, minced",
      "2 teaspoons garlic powder",
      "4 pounds beef top sirloin steaks",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients. Preheat an outdoor grill for high heat and lightly oil the grate.",
      "Melt butter in a small saucepan over medium-low heat.",
      "Stir in minced garlic and garlic powder. Set aside.",
      "Season both sides of each steak with salt and pepper.",
      "Place steaks on preheated grill and cook 4 to 5 minutes per side. An instant-read thermometer inserted into the center should read 140 degrees F (60 degrees C) for medium doneness.",
      "Transfer steaks to warmed plates; brush the tops liberally with garlic butter and allow to rest for 2 to 3 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 453,
      "total_fat_g": 32.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 0.0,
      "sugar_g": 0.0,
      "protein_g": 38.0,
      "sodium_mg": 167,
      "cholesterol_mg": 151,
      "saturated_fat_g": 16.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 1025,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/11847/goulash-supreme/",
    "category": "goulash",
    "id": 11847,
    "name": "Goulash Supreme",
    "description": "Whether you call it goulash or chili mac, this weeknight skillet supper is easy and delicious.",
    "author": "Cheryle",
    "image": {
      "url": "https://www.allrecipes.com/thmb/owXS5O1WZiZKqONYvx5x9A5AmIk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6232888-goulash-supreme-Jessica-1x1-1-28b6de667a0b4ccb9e3d03e87f41a180.jpg",
      "alt": "Goulash Supreme"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "1 pound lean ground beef",
      "1 quart stewed tomatoes",
      "1.5 cups uncooked macaroni",
      "0.5 cup chopped onion",
      "1 clove garlic, minced",
      "1 tablespoon chili powder",
      "2 teaspoons paprika",
      "6 ounces tomato paste",
      "water, as needed"
    ],
    "instructions": [
      "Heat a large saucepan over medium-high heat. Add ground beef; cook and stir until browned and crumbly, 5 to 7 minutes.",
      "Reduce heat to low. Add stewed tomatoes, macaroni, onion, garlic, chili powder, and paprika; mix well. Stir in tomato paste. Simmer, adding a little water as needed if the mixture gets too dry, until macaroni is tender, about 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 565,
      "total_fat_g": 25.0,
      "carbohydrates_g": 57.0,
      "fiber_g": 7.0,
      "sugar_g": 16.0,
      "protein_g": 30.0,
      "sodium_mg": 994,
      "cholesterol_mg": 85,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 654,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/273658/keto-chicken-crust-pizza/",
    "category": "ground-chicken",
    "id": 273658,
    "name": "Keto Chicken Crust Pizza",
    "description": "Chicken pizza crust? Yes, it's possible and also ideal if you're on the keto diet. Top with your favorite toppings or sprinkle with cheese and fresh basil.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/G2rFqFeanFROj7mgqFQ_di0BREY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-273658-Keto-Chicken-Crust-Pizza-gw-ddmfs-beauty-4x3-c08a2694bea042adad75a4765dd825fd.jpg",
      "alt": "Keto Chicken Crust Pizza"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "1 pound ground chicken",
      "0.5 cup mozzarella cheese, shredded",
      "0.25 cup freshly grated Parmesan cheese",
      "3 cloves garlic, minced",
      "1 teaspoon Italian seasoning",
      "0.5 teaspoon salt",
      "0.25 teaspoon pepper",
      "1 tablespoon chopped fresh basil"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 400 degrees F (200 degrees C). Line a baking sheet with parchment paper.",
      "Mix ground chicken, mozzarella, Parmesan, garlic, Italian seasoning, salt, and pepper together in a large bowl with your hands until well combined.",
      "Fold in basil.",
      "Place chicken mixture between two pieces of parchment paper.",
      "Gently press on the top piece of parchment and spread mixture into a circle or rectangle with a thickness of 1/4 to 1/2 inch. Remove and discard the top piece of parchment paper.",
      "Bake in the preheated oven until starting to brown on the edges, 35 to 45 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 409,
      "total_fat_g": 15.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 62.0,
      "sodium_mg": 1030,
      "cholesterol_mg": 165,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 27,
    "recipe_category": "Dinner",
    "cuisine": "Italian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/280926/baked-chicken-burgers-with-mushrooms-and-spinach/",
    "category": "ground-chicken",
    "id": 280926,
    "name": "Baked Chicken Burgers with Mushrooms and Spinach",
    "description": "Try these baked chicken burgers in the oven as an alternative to hamburgers. Adding mushrooms and onions gives great flavor to these burgers.",
    "author": "Bibi",
    "image": {
      "url": "https://www.allrecipes.com/thmb/CUszzPfu4ZS5Wn1I-pWVrt5HddQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8321460-32444a628e684ac59b02c66629699633.jpg",
      "alt": "Baked Chicken Burgers with Mushrooms and Spinach"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "5",
    "ingredients": [
      "1 tablespoon avocado oil, divided",
      "0.5 cup sliced fresh mushrooms",
      "0.5 cup chopped fresh spinach",
      "0.25 cup chopped onion",
      "1 clove garlic",
      "1 pound ground chicken breast",
      "2 teaspoons chicken soup base (such as Better than Bouillon\u00ae Roasted Chicken Base)",
      "salt and ground black pepper to taste",
      "5 sandwich buns"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Lightly grease a 9x13-inch baking pan with 1/2 of the avocado oil.",
      "Combine mushrooms, spinach, onion, and garlic in the bowl of a small food processor or blender and pulse several times until chopped into very small pieces, but not pureed.",
      "Place ground chicken in a bowl. Add chopped vegetables, chicken base, salt, and pepper. Mix until vegetable pieces are evenly distributed. Divide mixture into 5 evenly sized portions and shape into patties.",
      "Place patties onto the prepared baking sheet and lightly brush with remaining avocado oil.",
      "Bake in the preheated oven for about 20 minutes. Turn on the broiler and broil each side until browned, 1 to 2 minutes per side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
      "Place each chicken burger on a bun."
    ],
    "nutrition_per_serving": {
      "calories": 327,
      "total_fat_g": 8.0,
      "carbohydrates_g": 34.0,
      "fiber_g": 1.0,
      "sugar_g": 5.0,
      "protein_g": 29.0,
      "sodium_mg": 760,
      "cholesterol_mg": 53,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 1,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/221351/german-hamburgers-frikadellen/",
    "category": "ground-pork",
    "id": 221351,
    "name": "German Hamburgers (Frikadellen)",
    "description": "This frikadellen recipe with ground pork and beef, onion, parsley, egg, and hot paprika makes a batch of delicious pan-fried German meat patties.",
    "author": "Amy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9jJ--7tmKsRMBiVUWCZT8ybPidw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/221351-German-Hamburgers-mfs_003-c67327e9edf5453193b8d398aaf4236e.jpg",
      "alt": "German Hamburgers (Frikadellen)"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "1 Kaiser roll",
      "0.66666668653488 pound ground beef",
      "0.33333334326744 pound ground pork",
      "1 onion, finely chopped",
      "0.25 cup chopped fresh parsley",
      "1 egg",
      "1 teaspoon Hungarian hot paprika",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Soak kaiser roll in a medium bowl of water for 10 minutes. Drain and squeeze out excess water; crumble into a large bowl.",
      "Add ground meats, onion, parsley, egg, paprika, salt, and black pepper to crumbled roll; mix until well blended. Shape mixture into large flattened meatballs.",
      "Heat a large nonstick skillet over medium heat. Fry meatballs in the hot skillet until browned and no longer pink in the center, about 5 minutes per side. An instant-read thermometer inserted into the center of a patty should read at least 160 degrees F (70 degrees C)."
    ],
    "nutrition_per_serving": {
      "calories": 272,
      "total_fat_g": 16.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 22.0,
      "sodium_mg": 138,
      "cholesterol_mg": 117,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 122,
    "recipe_category": "Dinner",
    "cuisine": "German",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/35554/turkey-patties/",
    "category": "ground-turkey",
    "id": 35554,
    "name": "Turkey Patties",
    "description": "These turkey patties, seasoned with garlic, ginger, and soy sauce, are quickly pan-fried for a tasty dinner that's ready in just 20 minutes.",
    "author": "Michele Quigley",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Tl7ZtF_nndYEKvgYQvHUUx7sPs0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-recipe-35554-turkey-patties-hero-01-ddmfs-4x3-a1fa4071757a48b19928e9312ea2021d.jpg",
      "alt": "Turkey Patties"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 pound ground turkey",
      "0.25 cup fine dry bread crumbs",
      "1 egg",
      "2 tablespoons minced green onions",
      "2 tablespoons soy sauce",
      "1 teaspoon minced fresh ginger root",
      "1 clove garlic, minced",
      "1 tablespoon vegetable oil",
      "2 tablespoons chopped fresh parsley"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Mix turkey, bread crumbs, egg, green onion, soy sauce, ginger, and garlic in a large bowl until combined. Shape into 4 patties.",
      "Heat oil in a wide skillet over medium heat. Add patties and cook until no longer pink in the center and the juices run clear, about 5 minutes per side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
      "Garnish with chopped parsley."
    ],
    "nutrition_per_serving": {
      "calories": 251,
      "total_fat_g": 14.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 23.0,
      "sodium_mg": 626,
      "cholesterol_mg": 136,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 43,
    "recipe_category": "Dinner",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275571/fruity-chicken-salad-with-tarragon/",
    "category": "chicken-salads",
    "id": 275571,
    "name": "Fruity Chicken Salad with Tarragon",
    "description": "This chicken salad is sweet and juicy from fruit, crunchy from pecans, and has a savory herb element from fresh tarragon. It's perfect served over greens or on a croissant.",
    "author": "lutzflcat",
    "image": {
      "url": "https://www.allrecipes.com/thmb/LEuLOX63UDFm2kFbR2dBBTTah-0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6973686-79dd0f2a7f514e5db7d591eddaf7b3f5.jpg",
      "alt": "Fruity Chicken Salad with Tarragon"
    },
    "prep_time_minutes": 30,
    "cook_time_minutes": null,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "1.5 cups grilled skinless, boneless chicken thighs, chopped",
      "0.5 red apple - peeled, cored, and diced",
      "0.5 cup halved green grapes",
      "0.33333334326744 cup toasted chopped pecans",
      "0.25 cup diced red onion",
      "0.25 cup diced celery",
      "0.25 cup mayonnaise",
      "0.25 cup low-fat plain Greek yogurt",
      "2 tablespoons chopped fresh tarragon",
      "1 teaspoon Dijon mustard",
      "1 lime, zested and juiced",
      "salt and freshly ground black pepper to taste"
    ],
    "instructions": [
      "Combine chicken, apple, grapes, pecans, red onion, and celery in a medium bowl.",
      "Whisk mayonnaise, yogurt, tarragon, Dijon mustard, and lime zest and juice together in a small bowl. Stir dressing into the chicken mixture. Season with salt and pepper."
    ],
    "nutrition_per_serving": {
      "calories": 323,
      "total_fat_g": 24.0,
      "carbohydrates_g": 12.0,
      "fiber_g": 2.0,
      "sugar_g": 7.0,
      "protein_g": 16.0,
      "sodium_mg": 207,
      "cholesterol_mg": 56,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 5,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/279529/air-fryer-spanish-tortilla/",
    "category": "frittatas",
    "id": 279529,
    "name": "Air Fryer Spanish Tortilla",
    "description": "A Spanish tortilla is just as tasty when made in your air fryer. This vegetarian version saves on cleanup and uses less oil than traditional recipes.",
    "author": "Buckwheat Queen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/SMNFBZL1hIcaAEbk1IOGS1YhMXU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7907416-3fc59ca09bb94324b6c54c15e7e6ae1a.jpg",
      "alt": "Air Fryer Spanish Tortilla"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "4",
    "ingredients": [
      "1 large potato, peeled and cut into 1-inch cubes",
      "1 tablespoon extra-virgin olive oil",
      "0.125 cup leek, sliced into 1/4-inch pieces",
      "5 eggs",
      "0.25 cup grated Pecorino Romano cheese",
      "salt and ground black pepper to taste",
      "0.125 cup chopped fresh flat-leaf parsley"
    ],
    "instructions": [
      "Rinse potato cubes and put them into a bowl with cold water to soak for about 10 minutes.",
      "Preheat an air fryer to 325 degrees F (160 degrees C).",
      "Drain potatoes and pat dry. Transfer to a bowl and toss with olive oil. Put them into the air fryer basket.",
      "Cook for 18 minutes. Raise the temperature to 350 degrees F (180 degrees C). Shake the basket. Add leek and shake basket again. Cook until leek has softened, about 3 minutes.",
      "Meanwhile, whisk eggs, Pecorino Romano cheese, salt, and pepper together in a bowl and pour into a 6-inch, nonstick cake pan. Mix in cooked potatoes and leek. Set cake pan into the air fryer basket. Cook until tortilla has browned on top and the middle no longer jiggles, about 15 minutes.",
      "Remove from the air fryer and cool for 5 minutes. Sprinkle with Italian parsley before serving."
    ],
    "nutrition_per_serving": {
      "calories": 222,
      "total_fat_g": 12.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 12.0,
      "sodium_mg": 223,
      "cholesterol_mg": 240,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 4,
    "recipe_category": "Lunch",
    "cuisine": "Spanish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/222473/huevos-rancheros-frittata/",
    "category": "frittatas",
    "id": 222473,
    "name": "Huevos Rancheros Frittata",
    "description": "This tasty Mexican-style frittata based on huevos rancheros is quick and easy to make with salsa, onion, sour cream, and cilantro.",
    "author": "StephanieRG",
    "image": {
      "url": "https://www.allrecipes.com/thmb/3NudoEhomMUlX57b-lCKj7LYPhA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6327848-6824a60763de463595be0e2ba890c14b.jpg",
      "alt": "Huevos Rancheros Frittata"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 55,
    "servings": "4",
    "ingredients": [
      "cooking spray",
      "6 eggs",
      "2 tablespoons sour cream, at room temperature",
      "1 teaspoon Mexican seasoning, or to taste",
      "0.75 cup salsa, drained",
      "1 tomato, seeded and finely chopped",
      "0.25 cup finely chopped onion",
      "2 tablespoons chopped cilantro, or to taste",
      "1.5 cups shredded Mexican cheese blend, divided",
      "1 jalapeno pepper, coarsely chopped"
    ],
    "instructions": [
      "Preheat oven to 425 degrees F (220 degrees C). Grease a 9-inch baking dish with cooking spray.",
      "Beat eggs in a large bowl with a fork until slightly frothy. Mix in sour cream and Mexican seasoning. Add salsa, tomato, onion, and cilantro. Pour into the prepared baking dish. Sprinkle 3/4 cup Mexican cheese blend on top; stir in gently with a fork.",
      "Bake in the preheated oven until firm and springs back when gently pressed, about 20 minutes. Sprinkle remaining 3/4 cup Mexican cheese blend and jalapeno on top. Continue baking until cheese bubbles and turns golden, 5 to 10 minutes.",
      "Let frittata stand for 10 minutes before slicing with a serrated knife."
    ],
    "nutrition_per_serving": {
      "calories": 342,
      "total_fat_g": 25.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 2.0,
      "sugar_g": 4.0,
      "protein_g": 22.0,
      "sodium_mg": 841,
      "cholesterol_mg": 331,
      "saturated_fat_g": 15.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 4,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8416567/2-ingredient-dough-air-fryer-blueberry-bagels/",
    "category": "bagels",
    "id": 8416567,
    "name": "2-Ingredient Dough Air Fryer Blueberry Bagels",
    "description": "Use the trendy 2-ingredient dough to make these blueberry bagels in your air fryer for a special treat!",
    "author": "lutzflcat",
    "image": {
      "url": "https://www.allrecipes.com/thmb/CXBXUGzmHEXdZD2WHf_2jnVjh7E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4-2-Ingredient-Air-Fryer-Blueberry-Bagelslutz-77c4ca6413664c5391ea4047cb35839b.jpg",
      "alt": "2-Ingredient Dough Air Fryer Blueberry Bagels"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 50,
    "servings": "4",
    "ingredients": [
      "0.67 cup dried blueberries",
      "1.25 cups self-rising flour",
      "1 cup non-fat plain Greek yogurt (such as Fage\u00ae Total 0%)",
      "1 large egg, beaten",
      "1 teaspoon water",
      "0.5 teaspoon cinnamon sugar"
    ],
    "instructions": [
      "Place blueberries in a small bowl, and pour boiling water over them. Let sit for 5 minutes, and drain",
      "Add flour, yogurt, and blueberries to a large stand mixer bowl. Using the dough hook, mix at low speed for about 3 minutes. If you're using a KitchenAid mixer, use speed 3. Dough will be crumbly.",
      "Transfer the dough to a lightly floured surface. Divide the dough into 4 equal balls, pressing, stretching, and rolling into ropes that are about 8 inches long, 3/4-inch thick. Connect the ends pinching into a bagel shape with hole in the middle.",
      "Preheat an air fryer to 280 degrees F (137 degrees C) for about 3 minutes. Combine the egg and water, and brush on each bagel, then sprinkle with cinnamon sugar. Line the air fryer basket with a parchment liner or lightly spray with cooking spray.",
      "Place the bagels in the basket not touching, and cook until golden brown, 15 to 16 minutes. Don't crowd the basket, and cook in two batches if necessary. Your time may vary depending on the size and brand of your air fryer.",
      "Remove the bagels to a rack, and cool for about 10 minutes before slicing."
    ],
    "nutrition_per_serving": {
      "calories": 273,
      "total_fat_g": 2.0,
      "carbohydrates_g": 54.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 11.0,
      "sodium_mg": 548,
      "cholesterol_mg": 50,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236469/puff-pastry-bear-claws/",
    "category": "danishes",
    "id": 236469,
    "name": "Puff Pastry Bear Claws",
    "description": "Make this recipe for puff pastry bear claws by filling a puff pastry sheet with almond filling, almonds, and a sprinkling of sugar \u2014 simple yet delicious.",
    "author": "Da Momb",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Ei-0S-vch6VkU2hoZfWITgOIaHQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1108664-5ede3bad1a944b84aa49360410d39781.jpg",
      "alt": "Puff Pastry Bear Claws"
    },
    "prep_time_minutes": 30,
    "cook_time_minutes": 15,
    "total_time_minutes": 60,
    "servings": "8",
    "ingredients": [
      "0.33333334326744 cup superfine sugar",
      "0.25 cup unsalted butter, softened",
      "2 large egg yolks",
      "0.25 teaspoon almond extract",
      "1 cup ground almonds",
      "1 tablespoon all-purpose flour",
      "1 sheet puff pastry, thawed and rolled out into a 16x16-inch square",
      "1 egg",
      "1 tablespoon water",
      "2 tablespoons superfine sugar, or to taste",
      "2 tablespoons sliced almonds, or to taste"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C).",
      "Beat \u2153 cup superfine sugar and butter together in a bowl with an electric mixer until light and fluffy, about 5 minutes. Add eggs yolks; beat well. Beat in almond extract. Stir in ground almonds and flour until reaches a thick paste-like consistency.",
      "Cut puff pastry into 8 equal pieces. Place 1 tablespoon almond mixture in lower center of each piece puff pastry. Fold puff pastry over filling; press edges together to seal. Make three \u00bd-inch cuts, equally spaced apart on bottom edge, to make \"claws.\" Transfer pastries to a baking sheet.",
      "Whisk whole egg and water together in a bowl; brush on each bear claw, then sprinkle with remaining 2 tablespoons superfine sugar and sliced almonds.",
      "Bake in the preheated oven until puffed and golden brown, 15 to 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 354,
      "total_fat_g": 22.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 1.0,
      "sugar_g": 12.0,
      "protein_g": 10.0,
      "sodium_mg": 88,
      "cholesterol_mg": 90,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/268426/blt-egg-salad/",
    "category": "meal-prep",
    "id": 268426,
    "name": "BLT Egg Salad",
    "description": "This BLT egg salad recipe combines two classics: an egg salad and a BLT merged into one delicious, easy-to-make sandwich which everyone will enjoy.",
    "author": "Soup Loving Nicole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Bu4O0DN7ZtVtdgJwM3BX41ELJ0U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5803313-9d38830fcaba42d78e0daba5670e963c.jpg",
      "alt": "BLT Egg Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 5,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "12 eggs",
      "0.75 cup reduced-fat mayonnaise",
      "0.33333334326744 cup shredded Cheddar cheese",
      "2 green onions, chopped",
      "2 teaspoons yellow mustard",
      "0.5 teaspoon ground black pepper",
      "4 strips cooked bacon, crumbled",
      "6 grape tomatoes, halved",
      "6 lettuce leaves",
      "12 slices bread"
    ],
    "instructions": [
      "Place eggs in a large saucepan over medium heat and cover with 1 inch water. Bring to a boil, cover, remove from heat, and set aside in hot water for 10 minutes. Drain; run under cold water to stop the cooking. Peel eggs, then chop.",
      "Gently fold eggs, mayonnaise, Cheddar cheese, green onions, mustard, and black pepper together in a large bowl until evenly mixed. Fold in bacon and tomatoes.",
      "Place salad and lettuce between 2 bread slices to make a sandwich. Repeat with remaining salad, lettuce, and bread slices."
    ],
    "nutrition_per_serving": {
      "calories": 366,
      "total_fat_g": 16.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 2.0,
      "sugar_g": 9.0,
      "protein_g": 19.0,
      "sodium_mg": 831,
      "cholesterol_mg": 380,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 3,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/284668/spinach-feta-frittata/",
    "category": "frittatas",
    "id": 284668,
    "name": "Spinach-Feta Frittata",
    "description": "This spinach and feta frittata is great for breakfast or lunch. Cherry tomatoes are a great side with it but fresh melon and other fruit would also be delicious with it.",
    "author": "Bibi",
    "image": {
      "url": "https://www.allrecipes.com/thmb/NmeV5aA1lytWSa3Jg79pfHnt0wk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9233552-590447384ed748c5aaf465ac67fd142f.jpg",
      "alt": "Spinach-Feta Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "1 tablespoon unsalted butter",
      "0.5 cup chopped onion",
      "1 cup Potato, red, flesh, cooked, baked",
      "0.5 (10 ounce) package frozen chopped spinach - thawed, drained, and squeezed dry",
      "1 (4 ounce) container crumbled feta cheese",
      "6 large eggs, lightly beaten",
      "0.25 cup heavy cream",
      "0.5 teaspoon smoked sweet paprika",
      "0.5 teaspoon salt, or to taste",
      "0.25 teaspoon ground black pepper, or to taste"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C).",
      "Melt butter in a 10-inch, oven-proof skillet over medium heat. Add onions and cook until they start to turn translucent, about 2 minutes. Stir in potatoes and spinach, and remove from heat. Sprinkle with feta cheese.",
      "Stir beaten eggs, heavy cream, paprika, salt, and pepper together in a bowl until well blended. Pour egg mixture over the cheese and vegetables.",
      "Place skillet in the preheated oven and bake until eggs are set and the top is lightly browned, 20 to 25 minutes. Remove from the oven and allow to cool slightly. Serve warm."
    ],
    "nutrition_per_serving": {
      "calories": 204,
      "total_fat_g": 15.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 11.0,
      "sodium_mg": 497,
      "cholesterol_mg": 221,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/266829/make-ahead-rhubarb-yogurt-parfaits/",
    "category": "meal-prep",
    "id": 266829,
    "name": "Make-Ahead Rhubarb Yogurt Parfaits",
    "description": "A quick honey-sweetened rhubarb compote is the base of this make-ahead breakfast parfait recipe laced with graham cracker crumbs and crushed walnuts.",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Qf6f_fFjLSyt-Ie2bdCoJdbphUs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5581744-83b3840b4dc840808d83f917eeb72014.jpg",
      "alt": "Make-Ahead Rhubarb Yogurt Parfaits"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "5",
    "ingredients": [
      "2.5 cups chopped rhubarb",
      "0.25 cup water",
      "1 pinch salt",
      "0.25 cup honey",
      "1.25 cups graham cracker crumbs",
      "1 (32 ounce) container vanilla Greek yogurt",
      "5 tablespoons crushed walnuts"
    ],
    "instructions": [
      "Combine rhubarb, water, and salt in a medium saucepan over medium-high heat; bring to a boil, stirring occasionally. Reduce heat to medium-low; simmer, stirring occasionally, until rhubarb has broken down, 6 to 8 minutes. Stir in honey; cook and stir until mixture has thickened, 2 to 3 minutes.",
      "Arrange five 12- to 16-ounce jars on a work surface. Place 2 tablespoons rhubarb mixture in the bottom of each jar; top each with 2 tablespoons graham cracker crumbs and each with \u2154 cup yogurt, in that order. Divide remaining rhubarb mixture and graham cracker crumbs among parfaits; top each with 1 tablespoon walnuts.",
      "Seal jars; refrigerate until ready to eat."
    ],
    "nutrition_per_serving": {
      "calories": 377,
      "total_fat_g": 16.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 2.0,
      "sugar_g": 29.0,
      "protein_g": 19.0,
      "sodium_mg": 226,
      "cholesterol_mg": 24,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/267120/vegan-pumpkin-pancakes/",
    "category": "vegan",
    "id": 267120,
    "name": "Vegan Pumpkin Pancakes",
    "description": "This vegan pumpkin pancake recipe takes on a hint of fall with the savory goodness of pumpkin, cinnamon, and pecans. Serve with pecans and maple syrup.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/qNc5iD4m7mlxVVwrghFc3RQZX-g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5602228-cfb872a68685496da2438e68851092b0.jpg",
      "alt": "Vegan Pumpkin Pancakes"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "2 cups almond milk",
      "2 tablespoons distilled white vinegar",
      "5 tablespoons water",
      "2 tablespoons flaxseed meal",
      "2 cups all-purpose flour",
      "2 tablespoons coconut sugar",
      "1 tablespoon baking powder",
      "1 tablespoon ground cinnamon",
      "2 teaspoons baking soda",
      "1 teaspoon salt",
      "1 cup pumpkin puree",
      "2 tablespoons coconut oil",
      "0.25 cup toasted chopped pecans"
    ],
    "instructions": [
      "Combine almond milk and vinegar in a measuring cup; set aside for 10 minutes. Combine water and flaxseed meal in a bowl; set aside until gelatinous, about 5 minutes.",
      "Combine flour, coconut sugar, baking powder, cinnamon, baking soda, and salt in a medium bowl; stir in almond milk mixture, flaxseed meal mixture, pumpkin pur\u00e9e, and coconut oil until well blended. Fold in pecans.",
      "Heat a lightly oiled griddle over medium-high heat. Drop batter by large spoonfuls onto the griddle; cook until bubbles form and the edges are dry, 3 to 4 minutes. Flip and cook until browned on the other side, 2 to 3 minutes. Repeat with remaining batter."
    ],
    "nutrition_per_serving": {
      "calories": 288,
      "total_fat_g": 10.0,
      "carbohydrates_g": 45.0,
      "fiber_g": 4.0,
      "sugar_g": 4.0,
      "protein_g": 6.0,
      "sodium_mg": 1206,
      "cholesterol_mg": 0,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/284542/copycat-chicken-noodle-o-soup/",
    "category": "chicken-noodle-soups",
    "id": 284542,
    "name": "Copycat Chicken Noodle-O Soup",
    "description": "Lemon juice is the secret ingredient that really brings out the tang in this copycat version of Campbell's\u00ae Chicken NoodleO's\u00ae soup.",
    "author": "Soup Loving Nicole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/fK3wliqsAMpwIz5EkJS23scv6gg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9216020-286f085a9c744c0aafda8c673aa2c51a.jpg",
      "alt": "Copycat Chicken Noodle-O Soup"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "4",
    "ingredients": [
      "4 cups organic chicken broth",
      "4 cups water",
      "0.33333334326744 cup diced carrots",
      "0.75 teaspoon chicken soup base (such as Better than Bouillon\u00ae)",
      "0.25 teaspoon dried marjoram",
      "0.125 teaspoon dried thyme",
      "0.125 teaspoon onion powder",
      "0.75 cup ditalini pasta",
      "0.5 cup chopped cooked chicken",
      "1 teaspoon lemon juice, or to taste"
    ],
    "instructions": [
      "Bring broth, water, carrots, soup base, marjoram, thyme, and onion powder to a boil in a large pot. Reduce heat and simmer for 15 minutes.",
      "Add pasta and return to a boil. Boil for 15 minutes. Turn heat off and stir in chicken and lemon juice."
    ],
    "nutrition_per_serving": {
      "calories": 136,
      "total_fat_g": 2.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 9.0,
      "sodium_mg": 1337,
      "cholesterol_mg": 19,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 1,
    "recipe_category": "Lunch",
    "meal_type": "fitness",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275458/freezer-friendly-frittata/",
    "category": "frittatas",
    "id": 275458,
    "name": "Freezer-Friendly Frittata",
    "description": "This freezer-friendly recipe makes a filling frittata full of eggs, mushrooms, bacon, and 3 types of cheese. Enjoy it right away, or freeze it for future meals.",
    "author": "Paul Brunner",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OyUE96K32k3iOH4lhyGMy5D2Kt8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/275458-freezer-friendly-frittata-France-C-4x3-1-7455749f627a42659c0359088afb92cf.jpg",
      "alt": "Freezer-Friendly Frittata"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": "8",
    "ingredients": [
      "cooking spray",
      "10 large eggs, beaten",
      "1 medium onion, chopped",
      "1 (10 ounce) package fresh mushrooms, chopped",
      "0.5 pound chopped fully cooked ham",
      "1 cup milk",
      "1 cup shredded Colby-Jack cheese",
      "0.5 cup crumbled goat cheese",
      "0.25 cup chopped cooked bacon",
      "0.25 cup shredded Parmesan cheese",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 375 degrees F (190 degrees C). Lightly coat a deep 9x13-inch baking dish with cooking spray.",
      "Combine eggs, onion, mushrooms, ham, milk, Colby-Jack cheese, and goat cheese in a large bowl; beat well. Pour egg mixture into the prepared baking dish. Sprinkle with chopped bacon, Parmesan cheese, salt, and pepper.",
      "Bake in the preheated oven until eggs are set and the edges are golden brown, about 30 minutes. Allow to cool slightly, slice into 8 pieces, and serve."
    ],
    "nutrition_per_serving": {
      "calories": 315,
      "total_fat_g": 23.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 23.0,
      "sodium_mg": 824,
      "cholesterol_mg": 254,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 1,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/262478/canadian-vegan-peanut-butter-granola-recipe/",
    "category": "granola",
    "id": 262478,
    "name": "Canadian Vegan Peanut Butter Granola Recipe",
    "description": "Save time in the morning with this vegan breakfast granola that's low in sugars, packed with coconut, flax seeds, pumpkin seeds, and raisins.",
    "author": "Vlad Didenko",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mQ7qrJeBajwugo_3TnM9WgNDWEY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4929434-bace2d8b629a475ea8d63ac195df055a.jpg",
      "alt": "Canadian Vegan Peanut Butter Granola Recipe"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 25,
    "servings": "16",
    "ingredients": [
      "0.5 cup natural, salted peanut butter",
      "0.25 cup maple syrup",
      "1 tablespoon flaxseed meal",
      "2 teaspoons vanilla extract",
      "2 teaspoons ground cinnamon",
      "4 cups rolled oats",
      "0.5 cup shredded coconut, or to taste",
      "0.25 cup pumpkin seeds, or to taste",
      "0.25 cup raisins, or to taste"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Line 1 large or 2 smaller baking sheets with parchment paper.",
      "Mix peanut butter, maple syrup, flaxseed meal, vanilla extract, and cinnamon together in a large bowl. Add oats and coconut and mix until completely combined. Transfer mixture to the prepared baking sheets.",
      "Bake in the preheated oven until toasted and fragrant, about 10 minutes. Add pumpkin seeds and stir the granola. Continue baking until evenly browned and dry to the touch, about 9 minutes more.",
      "Let granola cool slightly. Add raisins. Store granola in an airtight container."
    ],
    "nutrition_per_serving": {
      "calories": 180,
      "total_fat_g": 9.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 4.0,
      "sugar_g": 6.0,
      "protein_g": 6.0,
      "sodium_mg": 41,
      "cholesterol_mg": 0,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 1,
    "recipe_category": "Breakfast",
    "meal_type": "study",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/273916/greek-yogurt-breakfast-parfait/",
    "category": "mousses",
    "id": 273916,
    "name": "Greek Yogurt Breakfast Parfait",
    "description": "Creamy Greek yogurt and fresh berries are combined with crunchy granola in this quick and easy breakfast parfait.",
    "author": "Occasional Cooker",
    "image": {
      "url": "https://www.allrecipes.com/thmb/PT8spc1dL0IxCU5wwtkdeUTzblM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/273916greek-yogurt-breakfast-parfaitKim4x3-9a7099bd11644bebb23a78222a616f44.jpg",
      "alt": "Greek Yogurt Breakfast Parfait"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "2",
    "ingredients": [
      "0.5 cup fresh blueberries",
      "0.5 cup sliced fresh strawberries",
      "1 teaspoon white sugar",
      "6 tablespoons granola, or as needed",
      "1 (6 ounce) container nonfat vanilla Greek yogurt",
      "1 teaspoon lemon zest"
    ],
    "instructions": [
      "Add blueberries and strawberries to a small bowl. Sprinkle with sugar; stir to coat the berries.",
      "Place 2 tablespoons granola in the bottom of 2 parfait glasses. Spoon 2 tablespoons yogurt on top and sprinkle with 1/2 teaspoon lemon zest. Top with 1/3 of the berries. Repeat layers until the parfait glasses are full."
    ],
    "nutrition_per_serving": {
      "calories": 264,
      "total_fat_g": 14.0,
      "carbohydrates_g": 26.0,
      "fiber_g": 4.0,
      "sugar_g": 16.0,
      "protein_g": 9.0,
      "sodium_mg": 61,
      "cholesterol_mg": 19,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 5.0,
    "review_count": 1,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/79470/simple-scones/",
    "category": "kosher",
    "id": 79470,
    "name": "Simple Scones",
    "description": "These buttery scones are soft, tender, and easy to make with simple baking ingredients for the perfect addition to breakfast, brunch, or afternoon tea.",
    "author": "USA WEEKEND columnist Pam Anderson",
    "image": {
      "url": "https://www.allrecipes.com/thmb/izzCz28i2ipxAmJQL5o-HACHi00=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79470-Simple-Scones-DDMFS-4x3-6429-68b0f1e96e754047b21cf99da6f5047e.jpg",
      "alt": "Simple Scones"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "8",
    "ingredients": [
      "2 cups all-purpose flour",
      "0.33333334326744 cup sugar",
      "1 teaspoon baking powder",
      "0.5 teaspoon salt",
      "0.25 teaspoon baking soda",
      "8 tablespoons unsalted butter, frozen",
      "0.5 cup raisins (or dried currants)",
      "0.5 cup sour cream",
      "1 large egg",
      "1 teaspoon white sugar"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 400 degrees F (200 degrees C); adjust the oven rack to the lower-middle position. Line a baking tray with parchment paper.",
      "Mix flour, 1/3 cup sugar, baking powder, salt, and baking soda in a medium bowl. Grate butter into flour mixture on the large holes of a box grater. Use your fingers to work in butter until mixture resembles coarse crumbs, then toss in raisins.",
      "Whisk sour cream and egg together in a small bowl until combined.",
      "Stir sour cream mixture into flour mixture using a fork until large dough clumps form. Use your hands to shape dough into a ball. (Dough may seem dry at first but will come together as you work it.)",
      "Place dough on a lightly floured surface and pat into a 7 to 8-inch circle, about 3/4-inch thick. Sprinkle with remaining 1 teaspoon of sugar.",
      "Use a sharp knife to cut into 8 equal triangles; place on the prepared baking tray, about 1-inch apart.",
      "Bake scones in the preheated oven until golden, about 15 to 17 minutes. Cool for 5 minutes; serve warm or at room temperature.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 319,
      "total_fat_g": 16.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 1.0,
      "sugar_g": 15.0,
      "protein_g": 5.0,
      "sodium_mg": 249,
      "cholesterol_mg": 60,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 3092,
    "recipe_category": "Breakfast",
    "cuisine": "British",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/220814/maple-pecan-granola/",
    "category": "granola",
    "id": 220814,
    "name": "Maple Pecan Granola",
    "description": "Maple syrup and flavoring give an extra burst of maple in this granola with oats, pecans, and walnuts.",
    "author": "Dianne",
    "image": {
      "url": "https://www.allrecipes.com/thmb/n57jiUXAoe5hK8FiK57EyBKiSWU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/220814-Maple-Pecan-Granola-Dianne_5419044_original-4x3-1-31091e058fcb481aa8bb5925caedd84b.jpg",
      "alt": "Maple Pecan Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "18",
    "ingredients": [
      "4 cups old-fashioned oats",
      "0.5 cup chopped pecans",
      "0.5 cup chopped walnuts",
      "0.5 cup ground flax seed",
      "2 teaspoons ground cinnamon",
      "0.33333334326744 cup canola oil",
      "0.66666668653488 cup pure maple syrup",
      "1 teaspoon maple flavoring",
      "0.25 teaspoon salt"
    ],
    "instructions": [
      "Preheat the oven to 300 degrees F (150 degrees C).",
      "Line a baking sheet with parchment paper.",
      "Mix oats, pecans, walnuts, flax seed, and cinnamon in a large bowl.",
      "Stir canola oil, maple syrup, maple flavoring, and salt together in a small bowl; pour over the oat mixture and stir to coat evenly.",
      "Spread the resulting mixture evenly onto the prepared baking sheet.",
      "Bake in the preheated oven until lightly browned, about 40 minutes.",
      "Set granola aside to cool completely before breaking into chunks. Store in an air-tight container."
    ],
    "nutrition_per_serving": {
      "calories": 202,
      "total_fat_g": 12.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 4.0,
      "sugar_g": 7.0,
      "protein_g": 4.0,
      "sodium_mg": 36,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 53,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/222725/crunchy-romaine-salad/",
    "category": "green-salads",
    "id": 222725,
    "name": "Crunchy Romaine Salad",
    "description": "A wonderful combination of flavors in this very easy to prepare salad. A ton of crunch comes from ramen noodles, pecans, and romaine lettuce.",
    "author": "Georgia Julie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/coti7yshH1QWD8MYMEB_u5iIkg8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/940355-89e98eb6aed546b79c27a140b8ede162.jpg",
      "alt": "Crunchy Romaine Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 5,
    "total_time_minutes": 30,
    "servings": "10",
    "ingredients": [
      "1 cup white sugar",
      "0.75 cup canola oil",
      "0.5 cup red wine vinegar",
      "1 tablespoon soy sauce",
      "salt and ground black pepper, to taste",
      "1 (3 ounce) package ramen noodles",
      "0.25 cup unsalted butter",
      "1 cup chopped pecans",
      "1 bunch broccoli, coarsely chopped",
      "1 head romaine lettuce, torn into bite-size pieces",
      "4 green onions, chopped"
    ],
    "instructions": [
      "Add sugar, oil, vinegar, soy sauce, salt, and black pepper to a jar with a tight-fitting lid; shake until well blended. Set aside.",
      "Break ramen noodles into small pieces; set aside. Discard flavor packet.",
      "Melt butter in a skillet over medium heat. Add pecans and noodles; cook and stir until browned, about 5 minutes. Drain on paper towels; let cool.",
      "Toss broccoli, romaine lettuce, green onions, pecans, and noodles together in a bowl. Add 1 cup, or more, dressing; toss to coat."
    ],
    "nutrition_per_serving": {
      "calories": 393,
      "total_fat_g": 30.0,
      "carbohydrates_g": 32.0,
      "fiber_g": 3.0,
      "sugar_g": 22.0,
      "protein_g": 4.0,
      "sodium_mg": 195,
      "cholesterol_mg": 12,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 41,
    "recipe_category": "Lunch",
    "cuisine": "Asian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241419/potato-scones/",
    "category": "breakfast-potatoes",
    "id": 241419,
    "name": "Potato Scones",
    "description": "These tattie scones are similar to potato pancakes and are a traditional Scottish and Irish breakfast dish made with leftover mashed potatoes cooked on a hot griddle until golden brown.",
    "author": "Lindsay O",
    "image": {
      "url": "https://www.allrecipes.com/thmb/qOJffx8c9hFDhbeNZsM70sjJQRo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/241419-potato-scones-ddmfs-4X3-0028-22b684c81c784fc1aa62ce783497eb11.jpg",
      "alt": "Potato Scones"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "1 pound cooked potatoes",
      "4 ounces self-rising flour",
      "2 ounces butter",
      "0.5 pinch salt"
    ],
    "instructions": [
      "Gather all ingredients. Heat a lightly greased griddle or cast iron skillet over medium-high heat.",
      "Mash potatoes with flour, butter, and salt in a large bowl until a stiff dough forms.",
      "Turn dough out onto a lightly floured work surface. Knead dough lightly and roll dough out to a 1/2-inch-thick circle. Cut into 6 equal wedges.",
      "Working in batches, cook scones on the hot griddle until golden brown, 4 to 5 minutes per side."
    ],
    "nutrition_per_serving": {
      "calories": 198,
      "total_fat_g": 8.0,
      "carbohydrates_g": 29.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 3.0,
      "sodium_mg": 308,
      "cholesterol_mg": 20,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 27,
    "recipe_category": "Breakfast",
    "cuisine": "Irish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275749/grandmas-homemade-granola/",
    "category": "granola",
    "id": 275749,
    "name": "Grandma's Homemade Granola",
    "description": "Homemade granola made with oats, nuts, and coconut flakes tossed with honey and maple syrup, baked until golden for a delicious healthy breakfast.",
    "author": "MadC",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jriEL-DAe565aMnzWosea1KODwU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/275749-grandmas-homemade-granola-DDMFS-041-4x3-beauty-8d3449fb348f4ab7a20c1d2672809afd.jpg",
      "alt": "Grandma's Homemade Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 60,
    "servings": "18",
    "ingredients": [
      "4 cups old-fashioned oats",
      "1.5 cups chopped pecans",
      "1.5 cups slivered almonds",
      "1 cup coconut flakes",
      "0.5 cup vegetable oil",
      "0.33333334326744 cup packed brown sugar",
      "0.33333334326744 cup honey",
      "0.25 cup maple syrup",
      "2 teaspoons ground cinnamon",
      "2 teaspoons vanilla extract",
      "0.75 teaspoon salt",
      "2 cups dried cranberries"
    ],
    "instructions": [
      "Gather all ingredients and preheat the oven to 325 degrees F (165 degrees C). Line a large, rimmed baking sheet with parchment paper.",
      "Mix oats, pecans, almonds, and coconut together in a large bowl; set aside.",
      "Combine oil, brown sugar, honey, maple syrup, cinnamon, vanilla, and salt in a medium saucepan over medium heat. Stir gently until mixture begins to boil; remove from heat. Pour over oat mixture and fold together until dry ingredients are well coated. Spread granola on the prepared baking sheet.",
      "Bake in the preheated oven for 20 minutes. Stir and continue to bake on the top rack until golden, about 5 minutes more. Remove from the oven and let cool for 20 to 30 minutes.",
      "Toss cooled granola with cranberries. Store in an airtight container."
    ],
    "nutrition_per_serving": {
      "calories": 347,
      "total_fat_g": 20.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 5.0,
      "sugar_g": 23.0,
      "protein_g": 5.0,
      "sodium_mg": 113,
      "cholesterol_mg": 0,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 24,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/232414/the-girls-chicken-sandwiches/",
    "category": "Purim",
    "id": 232414,
    "name": "The Girls' Chicken Sandwiches",
    "description": "Chicken salad made with green onions and poppyseed dressing is served on sweet Hawaiian-style rolls spread with pineapple cream cheese and topped with fresh strawberries for a light and elegant springtime lunch.",
    "author": "HappyGrandma",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9q_JBrHV5lddiQaF-zi9gM51Nec=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1010178-d3738fac9d3a43a3bd68cf7822c5f89e.jpg",
      "alt": "The Girls' Chicken Sandwiches"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "12",
    "ingredients": [
      "3 cups diced, cooked chicken breast meat",
      "3 green onions, minced",
      "0.5 cup refrigerated poppyseed salad dressing, or to taste",
      "12 Hawaiian sweet bread rolls, sliced in half horizontally",
      "1 (8 ounce) container pineapple cream cheese spread",
      "6 large leaves Boston lettuce, halved",
      "1 (16 ounce) package fresh strawberries, hulled and diced"
    ],
    "instructions": [
      "Combine chicken with green onions in a bowl; moisten with poppyseed salad dressing. Spread both cut sides of each Hawaiian roll with pineapple cream cheese. Place a lettuce leaf half on bottom half of each roll; top with 1/4 cup chicken mixture and about 2 tablespoons of strawberries. Place tops on sandwiches to serve."
    ],
    "nutrition_per_serving": {
      "calories": 437,
      "total_fat_g": 10.0,
      "carbohydrates_g": 51.0,
      "fiber_g": 3.0,
      "sugar_g": 7.0,
      "protein_g": 22.0,
      "sodium_mg": 379,
      "cholesterol_mg": 83,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 16,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278815/air-fryer-frittata/",
    "category": "frittatas",
    "id": 278815,
    "name": "Air Fryer Frittata",
    "description": "This frittata is ready in less than 20 minutes and cooked in the air fryer. Customize it with whatever leftover sausage, vegetables, or cheese you have in your fridge.",
    "author": "Bibi",
    "image": {
      "url": "https://www.allrecipes.com/thmb/aGtwK9y6se0JhERgU65I2VTjx3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8438108-caecdfd0f65a4e09a2cbd8309bd36321.jpg",
      "alt": "Air Fryer Frittata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "3",
    "ingredients": [
      "cooking spray",
      "2 teaspoons butter",
      "0.33333334326744 cup diced bell pepper",
      "0.33333334326744 cup chopped onion",
      "0.5 cup breakfast sausage crumbles",
      "0.5 cup shredded Colby Jack cheese",
      "6 eggs",
      "salt and ground black pepper to taste",
      "0.5 teaspoon hot pepper sauce",
      "0.25 cup salsa, or more to taste"
    ],
    "instructions": [
      "Preheat a 5.8-quart or larger air fryer to 350 degrees F (175 degrees C) according to manufacturer's instructions.",
      "Spray cooking spray on the bottom and sides of a small metal container, designed to be an inner pot, about 6 inches round and 4 inches high.",
      "Add butter for flavor, insert inner pot into the air fryer, and melt butter for 45 seconds. Add bell pepper and onion and fry for 2 minutes.",
      "Carefully remove the inner pot and stir in sausage crumbles. Sprinkle with Colby Jack cheese and set aside.",
      "Crack eggs into a large bowl and whisk until well combined. Season with salt, pepper, and hot sauce; stir to combine. Pour egg mixture over sausage mixture in the inner pot and lightly mix together.",
      "Return the inner pot to the basket of the air fryer and cook until the top of frittata is lightly brown and a toothpick inserted into the center comes out clean, about 12 minutes. Continue air frying in 30-second intervals until frittata has set. Serve warm or at room temperature with salsa."
    ],
    "nutrition_per_serving": {
      "calories": 316,
      "total_fat_g": 23.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 23.0,
      "sodium_mg": 665,
      "cholesterol_mg": 416,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.9,
    "review_count": 7,
    "recipe_category": "Breakfast",
    "cuisine": "Italian Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/17652/banana-crumb-muffins/",
    "category": "food-gifts",
    "id": 17652,
    "name": "Banana Crumb Muffins",
    "description": "The best banana muffin recipes have a sweet crumb topping which is what makes these banana muffins stand apart from the ordinary. They're scrumptious!",
    "author": "Lisa Kreft",
    "image": {
      "url": "https://www.allrecipes.com/thmb/REpNyzUZKcrkixCMz1ChFMAZwTk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17652-banana-crumb-muffins-DDMFS-4x3-Beauty-5926fa976cd34a78a10dd45e48f5735c.jpg",
      "alt": "Banana Crumb Muffins"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "10",
    "ingredients": [
      "1.5 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon baking powder",
      "0.5 teaspoon salt",
      "3 bananas, mashed",
      "0.75 cup white sugar",
      "0.33333334326744 cup butter, melted",
      "1 egg, lightly beaten",
      "0.33333334326744 cup packed brown sugar",
      "2 tablespoons all-purpose flour",
      "0.125 teaspoon ground cinnamon",
      "1 tablespoon butter"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 375 degrees F (190 degrees C). Lightly grease or line 10 muffin cups with paper liners.",
      "Prepare muffins: Mix flour, baking soda, baking powder, and salt together in a large bowl.",
      "Beat bananas, white sugar, melted butter, and egg together in a separate bowl.",
      "Stir the banana mixture into the flour mixture just until combined.",
      "Spoon batter into prepared muffin cups, filling each about 3/4 full.",
      "Prepare crumb topping: Mix brown sugar, flour, and cinnamon together in a small bowl. Use a fork to mix in 1 tablespoon butter until mixture is crumbly; sprinkle topping over muffins.",
      "Bake in the preheated oven until a toothpick inserted into the center comes out clean, 18 to 20 minutes.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 263,
      "total_fat_g": 8.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 2.0,
      "sugar_g": 27.0,
      "protein_g": 3.0,
      "sodium_mg": 353,
      "cholesterol_mg": 38,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 14733,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/6820/downeast-maine-pumpkin-bread/",
    "category": "food-gifts",
    "id": 6820,
    "name": "Downeast Maine Pumpkin Bread",
    "description": "This pumpkin bread recipe is easy to make, super moist, and delicious. Spiced with cinnamon, ginger, nutmeg, and cloves, it's perfect for holiday gifts!",
    "author": "Laurie Fontaine Bennett",
    "image": {
      "url": "https://www.allrecipes.com/thmb/vVUhf_w_m23BtkSq1XFgpQtKGDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6820-downeast-maine-pumpkin-bread-VAT-014-4x3-C-fbd7df01cfdd4194be059527ddf0ea15.jpg",
      "alt": "Downeast Maine Pumpkin Bread"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 50,
    "total_time_minutes": 60,
    "servings": "24",
    "ingredients": [
      "1 (15 ounce) can pumpkin puree",
      "4 eggs",
      "1 cup vegetable oil",
      "0.66666668653488 cup water",
      "3 cups white sugar",
      "3.5 cups all-purpose flour",
      "2 teaspoons baking soda",
      "1.5 teaspoons salt",
      "1 teaspoon ground cinnamon",
      "1 teaspoon ground nutmeg",
      "0.5 teaspoon ground cloves",
      "0.25 teaspoon ground ginger"
    ],
    "instructions": [
      "Gather the ingredients. Preheat the oven to 350 degrees F (175 degrees C). Grease and flour two 9x5-inch loaf pans.",
      "Whisk flour, baking soda, salt, cinnamon, nutmeg, cloves, and ginger together in a large bowl.",
      "Mix pumpkin puree, eggs, oil, water, and sugar in a separate bowl until well blended.",
      "Stir flour mixture into pumpkin mixture until just blended.",
      "Pour batter into the prepared pans.",
      "Bake in the preheated oven until a toothpick inserted in center comes out clean, about 50 minutes.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 263,
      "total_fat_g": 10.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 1.0,
      "sugar_g": 26.0,
      "protein_g": 3.0,
      "sodium_mg": 305,
      "cholesterol_mg": 31,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 10573,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/42719/banana-muffins-ii/",
    "category": "kosher",
    "id": 42719,
    "name": "Banana Muffins",
    "description": "These banana muffins are deliciously moist and tender. Made with ripe mashed bananas and simple pantry ingredients \u2014 they are easy for kids to make!",
    "author": "ABI_GODFREY",
    "image": {
      "url": "https://www.allrecipes.com/thmb/p9T84iegPt80oP0UYyeE3DlhnL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-gw-42719-Banana-Muffins-ddmfs-4x3-step-05-e479d78a5aaf48d48b0c54bf54bb3709.jpg",
      "alt": "Banana Muffins"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "12",
    "ingredients": [
      "1.5 cups all-purpose flour",
      "1 teaspoon baking powder",
      "1 teaspoon baking soda",
      "0.5 teaspoon salt",
      "3 large bananas, mashed",
      "0.75 cup white sugar",
      "1 egg",
      "0.33333334326744 cup butter, melted"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C). Grease a 12-cup muffin tin or line cups with paper liners.",
      "Sift flour, baking powder, baking soda, and salt together in a bowl; set aside.",
      "Mix bananas, sugar, egg, and melted butter in a separate large bowl until well combined; fold in flour mixture until smooth.",
      "Spoon batter into the prepared muffin cups, filling each 2/3 full.",
      "Bake in the preheated oven until tops spring back when lightly pressed, about 25 to 30 minutes.",
      "Cool briefly in the tin, then transfer to a wire rack to cool completely."
    ],
    "nutrition_per_serving": {
      "calories": 186,
      "total_fat_g": 6.0,
      "carbohydrates_g": 32.0,
      "fiber_g": 1.0,
      "sugar_g": 17.0,
      "protein_g": 3.0,
      "sodium_mg": 280,
      "cholesterol_mg": 29,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 5167,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/14469/jamies-cranberry-spinach-salad/",
    "category": "green-salads",
    "id": 14469,
    "name": "Jamie's Cranberry Spinach Salad",
    "description": "This spinach salad is packed with fresh spinach, toasted almonds, and dried cranberries tossed with a sweet and tangy homemade poppy seed dressing.",
    "author": "Jamie Hensley",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ujOvcuxz_9VfSnk8oGk7osD9zuw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14469-jamies-cranberry-spinach-salad-DDMFS-4x3-0bba054b8846478c9fa4831afb91410f.jpg",
      "alt": "Jamie's Cranberry Spinach Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": "8",
    "ingredients": [
      "1 tablespoon butter",
      "0.75 cup almonds, blanched and slivered",
      "1 pound spinach, rinsed and torn into bite-size pieces",
      "1 cup dried cranberries",
      "0.5 cup vegetable oil",
      "0.5 cup white sugar",
      "0.25 cup cider vinegar",
      "0.25 cup white wine vinegar",
      "2 tablespoons toasted sesame seeds",
      "1 tablespoon poppy seeds",
      "2 teaspoons minced onion",
      "0.25 teaspoon paprika"
    ],
    "instructions": [
      "Melt butter in a medium saucepan over medium heat. Cook and stir almonds in butter until lightly toasted. Remove from heat and let cool.",
      "Make dressing: Whisk together oil, sugar, cider vinegar, white wine vinegar, sesame seeds, poppy seeds, minced onion, and paprika in a medium bowl.",
      "Combine spinach with toasted almonds and cranberries in a large serving bowl. Pour dressing over spinach mixture; toss well."
    ],
    "nutrition_per_serving": {
      "calories": 338,
      "total_fat_g": 24.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 4.0,
      "sugar_g": 23.0,
      "protein_g": 5.0,
      "sodium_mg": 58,
      "cholesterol_mg": 4,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 4351,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16383/basic-crepes/",
    "category": "kosher",
    "id": 16383,
    "name": "Basic Cr\u00eapes",
    "description": "This cr\u00eape recipe uses simple pantry ingredients to make delicious French-style pancakes. Perfect for brunch with a sweet or savory filling!",
    "author": "JENNYC819",
    "image": {
      "url": "https://www.allrecipes.com/thmb/hMjcfpc4E2VBN5wmwqgtHtDj_Gc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16383-basic-crepes-VAT-009-4x3-b7893c79888c41dabc8c699d60e7534f.jpg",
      "alt": "Basic Cr\u00eapes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "2 large eggs",
      "0.5 cup milk",
      "0.5 cup water",
      "0.25 teaspoon salt",
      "1 cup all-purpose flour",
      "2 tablespoons butter, melted"
    ],
    "instructions": [
      "Whisk eggs, milk, water, and salt together in a large mixing bowl. Add flour and melted butter; whisk vigorously until batter is smooth and pourable.",
      "Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the pan, using approximately 1/4 cup for each cr\u00eape. Tilt the pan with a circular motion so that the batter coats the surface evenly.",
      "Cook until the top of the cr\u00eape is no longer wet and the bottom has turned light brown, 1 to 2 minutes. Run a spatula around the edge of the skillet to loosen the cr\u00eape; flip and cook until the other side has turned light brown, about 1 minute more.",
      "Serve hot. Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 216,
      "total_fat_g": 9.0,
      "carbohydrates_g": 25.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 7.0,
      "sodium_mg": 229,
      "cholesterol_mg": 111,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 4135,
    "recipe_category": "Breakfast",
    "cuisine": "French",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/24530/buttermilk-pancakes-ii/",
    "category": "kosher",
    "id": 24530,
    "name": "Buttermilk Pancakes",
    "description": "This foolproof buttermilk pancake recipe shows you how to make 12 deliciously light, fluffy, tender pancakes from scratch for a delicious breakfast.",
    "author": "BURYGOLD",
    "image": {
      "url": "https://www.allrecipes.com/thmb/UXv_24LIE376MRgVvZDBJKa856w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/24530-ButtermilkPancakes-II-mfs-4X3-3385-b9e08648074145d18c538731c2be4215.jpg",
      "alt": "Buttermilk Pancakes"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "12",
    "ingredients": [
      "3 cups all-purpose flour",
      "3 tablespoons white sugar",
      "3 teaspoons baking powder",
      "1.5 teaspoons baking soda",
      "0.75 teaspoon salt",
      "3 cups buttermilk",
      "0.5 cup milk",
      "3 eggs",
      "0.33333334326744 cup butter, melted"
    ],
    "instructions": [
      "Combine flour, sugar, baking powder, baking soda, and salt in a large bowl. Beat buttermilk, milk, eggs, and melted butter together in a separate bowl. Keep the two mixtures separate until you are ready to cook.",
      "Heat a lightly oiled griddle or frying pan over medium-high heat. You can flick water across the surface and if it beads up and sizzles, it's ready.",
      "Pour the wet mixture into the dry mixture; use a wooden spoon or fork to mix until it's just blended together. The batter will be a little lumpy which is what you want.",
      "Pour or scoop batter onto the preheated griddle, using approximately 1/2 cup for each pancake. Cook until bubbles appear on the surface, 1 to 2 minutes; flip with a spatula and cook until browned on the other side. Repeat with remaining batter.",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 219,
      "total_fat_g": 7.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 1.0,
      "sugar_g": 7.0,
      "protein_g": 7.0,
      "sodium_mg": 516,
      "cholesterol_mg": 63,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 4024,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/20876/crustless-spinach-quiche/",
    "category": "easter",
    "id": 20876,
    "name": "Crustless Spinach Quiche",
    "description": "This crustless quiche made with eggs, spinach, and Muenster cheese is quick and easy to bake in just 30 minutes for a delicious breakfast or brunch.",
    "author": "ANY14TNS",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ccyb8eaL-AzVC-egaPGOTCifEMA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-20876-crustless-spinach-quiche-VAT-4x3-step-07-1b038ac5743e45d3888a556ad4e87e87.jpg",
      "alt": "Crustless Spinach Quiche"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "1 tablespoon vegetable oil",
      "1 medium onion, chopped",
      "1 (10 ounce) package frozen chopped spinach - thawed, drained, and squeezed dry",
      "5 large eggs, beaten",
      "0.25 teaspoon salt",
      "0.125 teaspoon ground black pepper",
      "3 cups shredded Muenster cheese"
    ],
    "instructions": [
      "Gather the ingredients. Preheat oven to 350 degrees F (175 degrees C). Lightly grease a 9-inch pie pan.",
      "Heat oil in a large skillet over medium-high heat. Add onions and cook, stirring occasionally, until soft, about 3 minutes. Stir in spinach and continue to cook until excess moisture has evaporated.",
      "Whisk together eggs, salt, and pepper in a large bowl. Add Muenster cheese and spinach mixture and stir until well blended.",
      "Pour into the prepared pan.",
      "Bake in the preheated oven until eggs have set, about 30 minutes.",
      "Remove from the oven and let cool for 10 minutes before serving.",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 310,
      "total_fat_g": 24.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 20.0,
      "sodium_mg": 546,
      "cholesterol_mg": 209,
      "saturated_fat_g": 13.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 3420,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/51304/bills-sausage-gravy/",
    "category": "gravies",
    "id": 51304,
    "name": "Bill's Sausage Gravy",
    "description": "This is the best sausage gravy recipe. Pour over hot biscuits to make the best biscuits and gravy for a rich and hearty breakfast to enjoy at home.",
    "author": "VLLYBY1",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Y1-uDWc-bGqOApg94cKhRLm66B4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-51304-bills-sausage-gravy-DDMFS-beauty-4x3-2cf197100cec4519a68fe3599cb0e643.jpg",
      "alt": "Bill's Sausage Gravy"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 25,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "1 (12 ounce) package maple flavored sausage",
      "3 tablespoons butter",
      "0.25 cup all-purpose flour",
      "3 cups whole milk",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Place sausage in a large, deep skillet. Cook and crumble over medium-high heat until evenly brown.",
      "Remove sausage with a slotted spoon, leaving the drippings in the pan. Stir butter into the pan until melted.",
      "Add flour and stir until smooth.",
      "Reduce heat to medium and cook until light brown.",
      "Gradually whisk in milk and cook until thickened. Season with salt and pepper.",
      "Add cooked sausage back to the skillet. Reduce heat and simmer for 12 to 15 minutes. If gravy becomes too thick, stir in a little more milk.",
      "Serve over biscuits and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 353,
      "total_fat_g": 31.0,
      "carbohydrates_g": 12.0,
      "fiber_g": 0.0,
      "sugar_g": 7.0,
      "protein_g": 14.0,
      "sodium_mg": 947,
      "cholesterol_mg": 63,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 2370,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/6815/monkey-bread-i/",
    "category": "kosher",
    "id": 6815,
    "name": "Best Monkey Bread",
    "description": "This monkey bread is the best thanks to this easy recipe that uses canned biscuits, cinnamon, and sugar for a sticky, gooey, and delicious breakfast treat.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/XxsBEUQQB4CUCNN7iTUQzkscIHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6815-monkey-bread-i-DDMFS-4x3-abad289abd334db6a6760e2702181e71.jpg",
      "alt": "Best Monkey Bread"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 60,
    "servings": "15",
    "ingredients": [
      "1 cup white sugar",
      "2 teaspoons ground cinnamon",
      "3 (12 ounce) packages refrigerated biscuit dough",
      "0.5 cup chopped walnuts",
      "0.5 cup raisins",
      "0.5 cup margarine",
      "1 cup packed brown sugar"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C). Grease a 9- or 10-inch tube or Bundt pan.",
      "Mix white sugar and cinnamon in a plastic bag. Cut biscuits into quarters. Shake 6 to 8 biscuit pieces in the sugar-cinnamon mix.",
      "Arrange pieces in the bottom of the prepared pan. Continue until all biscuits are coated and placed in the pan. If using walnuts and raisins, arrange in and among the biscuit pieces as you go along.",
      "Melt butter and brown sugar in a small saucepan over medium heat. Boil for 1 minute; pour over biscuits.",
      "Bake bread in the preheated oven for 35 minutes; let cool in the pan for 10 minutes, then turn out onto a plate and let everyone pull it apart."
    ],
    "nutrition_per_serving": {
      "calories": 378,
      "total_fat_g": 15.0,
      "carbohydrates_g": 57.0,
      "fiber_g": 1.0,
      "sugar_g": 0,
      "protein_g": 5.0,
      "sodium_mg": 746,
      "cholesterol_mg": 1,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 2252,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/146572/sweet-cornbread-cake/",
    "category": "cornbread",
    "id": 146572,
    "name": "Sweet Cornbread Cake",
    "description": "This sweet, moist cornbread is made with cornmeal, honey, eggs, melted butter, and whole milk; simply irresistible served hot from the oven.",
    "author": "myfoursonsks",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mCCN_bvcIqIXNiM16mULHcS4Ns8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/146572-sweet-cornbread-cake-DDMFS-4x3-1f1bf0d3425f419cbc04b4033f41171e.jpg",
      "alt": "Sweet Cornbread Cake"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 45,
    "total_time_minutes": 55,
    "servings": "12",
    "ingredients": [
      "3 cups all-purpose flour",
      "1.3333333730698 cups white sugar",
      "1 cup cornmeal",
      "2 tablespoons baking powder",
      "1 teaspoon salt",
      "2.5 cups whole milk",
      "4 eggs, beaten",
      "0.66666668653488 cup vegetable oil",
      "0.33333334326744 cup melted butter",
      "2 tablespoons honey"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.",
      "Stir flour, sugar, cornmeal, baking powder, and salt together in a mixing bowl. Pour in milk, beaten eggs, vegetable oil, melted butter, and honey; stir just to moisten.",
      "Pour batter into the prepared baking dish.",
      "Bake in the preheated oven until golden brown and a toothpick inserted in the center comes out clean, about 45 minutes.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 461,
      "total_fat_g": 21.0,
      "carbohydrates_g": 61.0,
      "fiber_g": 1.0,
      "sugar_g": 28.0,
      "protein_g": 8.0,
      "sodium_mg": 519,
      "cholesterol_mg": 81,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 902,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/57459/oven-scrambled-eggs/",
    "category": "easter",
    "id": 57459,
    "name": "Baked Scrambled Eggs",
    "description": "Baked scrambled eggs are quick to make in the oven and turn out light and fluffy every time. An easy, hands-off dish that's perfect for a crowd.",
    "author": "Erin",
    "image": {
      "url": "https://www.allrecipes.com/thmb/VOeTuH5iNQP0YjHUaEkLgLKol3I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-57459-oven-scrambled-eggs-DDMFS-4x3-step-Beauty-f31f2904bb3a4eee80ed3e135436cc77.jpg",
      "alt": "Baked Scrambled Eggs"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "12",
    "ingredients": [
      "0.5 cup butter or margarine, melted",
      "24 eggs",
      "2.25 teaspoons salt",
      "2.5 cups milk"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C).",
      "Pour melted butter into a 9x13-inch glass baking dish.",
      "Whisk eggs and salt together in a large bowl until well blended. Gradually whisk in milk. Pour egg mixture into the buttered dish.",
      "Bake uncovered in the preheated oven for 10 to 15 minutes. Stir egg mixture and continue to bake until until eggs are just set and no longer runny, about 10 to 15 minutes more.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 236,
      "total_fat_g": 19.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 0,
      "sugar_g": 3.0,
      "protein_g": 14.0,
      "sodium_mg": 651,
      "cholesterol_mg": 396,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 748,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/237358/hawaiian-ham-and-cheese-sliders/",
    "category": "sliders",
    "id": 237358,
    "name": "Hawaiian Ham and Cheese Sliders",
    "description": "The best Hawaiian sliders with ham, cheese, sweet rolls, and a buttery poppy seed sauce. These are great for potlucks and quick and easy to prepare.",
    "author": "Susan Gee",
    "image": {
      "url": "https://www.allrecipes.com/thmb/tpdiHxVtBHlPTLggH1bCE0tA-M4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-237358-hawaiian-ham-and-cheese-sliders-DDMFS-4x3-aab0e43050034bcb940cbf99aa41ee61.jpg",
      "alt": "Hawaiian Ham and Cheese Sliders"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "12",
    "ingredients": [
      "cooking spray (such as Crisco\u00ae)",
      "0.5 cup butter",
      "1 onion, minced",
      "3 tablespoons Dijon mustard",
      "1 tablespoon poppy seeds",
      "2 teaspoons Worcestershire sauce, or more to taste",
      "1 (12 count) package Hawaiian sweet rolls, split, or more as needed",
      "1 pound sliced deli ham, or more as needed",
      "8 slices Swiss cheese, or more as needed"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C). Spray a 9x13-inch baking dish with cooking spray.",
      "Melt butter in a saucepan over medium-low heat; cook and stir onion in the melted butter until softened, 5 to 10 minutes. Add mustard, poppy seeds, and Worcestershire sauce; cook and stir for 5 minutes.",
      "Arrange the roll bottoms in the prepared baking dish. Spoon 2/3 of the onion mixture over top.",
      "Add ham and cheese to each roll.",
      "Place the roll tops over the cheese layer, then brush the remaining onion mixture over top.",
      "Cover the dish with aluminum foil.",
      "Bake in the preheated oven for 15 minutes. Remove aluminum foil and bake until the roll tops are lightly browned, 5 to 10 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 484,
      "total_fat_g": 17.0,
      "carbohydrates_g": 47.0,
      "fiber_g": 3.0,
      "sugar_g": 1.0,
      "protein_g": 26.0,
      "sodium_mg": 899,
      "cholesterol_mg": 99,
      "saturated_fat_g": 13.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 224,
    "recipe_category": "Lunch",
    "cuisine": "Hawaiian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/14009/muesli/",
    "category": "high-fiber",
    "id": 14009,
    "name": "Muesli",
    "description": "This muesli recipe is packed with oats, bran, wheat germ, raisins, nuts, and seeds for a nutritious homemade breakfast cereal full of healthy whole grains.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/hHGQn3d6WY5mVf9DUZnWHgEZ9I8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14009-muesli-VAT-Beauty-4x3-6bff9d154d104727bc4ea956851c6688.jpg",
      "alt": "Muesli"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "16",
    "ingredients": [
      "4.5 cups rolled oats",
      "1 cup raisins",
      "0.5 cup toasted wheat germ",
      "0.5 cup wheat bran",
      "0.5 cup oat bran",
      "0.5 cup chopped walnuts",
      "0.25 cup packed brown sugar",
      "0.25 cup raw sunflower seeds"
    ],
    "instructions": [
      "Combine oats, raisins, wheat germ, wheat bran, oat bran, walnuts, brown sugar, and sunflower seeds in a large bowl; mix well. Store muesli in an airtight container at room temperature for up to 2 months."
    ],
    "nutrition_per_serving": {
      "calories": 188,
      "total_fat_g": 6.0,
      "carbohydrates_g": 32.0,
      "fiber_g": 5.0,
      "sugar_g": 9.0,
      "protein_g": 6.0,
      "sodium_mg": 4,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 191,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/270310/instant-pot-italian-wedding-soup/",
    "category": "instant-pot",
    "id": 270310,
    "name": "Instant Pot Italian Wedding Soup",
    "description": "This Instant Pot Italian wedding soup combines vegetables and herbs with homemade or frozen meatballs, pasta, and cheese for an easy, satisfying meal.",
    "author": "Bren",
    "image": {
      "url": "https://www.allrecipes.com/thmb/BK0bYBa-LRuYSmx0MnyOjBlNhdk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/270310-Instant-Pot-Italian-Wedding-Soup-DDMFS-3X4-0301-51b9d1934c224303a641ec6e7e3b1292.jpg",
      "alt": "Instant Pot Italian Wedding Soup"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 55,
    "servings": "4",
    "ingredients": [
      "1 tablespoon olive oil",
      "1.5 cups chopped carrots",
      "1 cup sliced celery",
      "0.5 cup diced red onion",
      "1 teaspoon dried parsley",
      "0.25 teaspoon dried basil",
      "0.25 teaspoon ground black pepper",
      "6 cups no-salt-added chicken broth",
      "20 Italian meatballs, preferably home made",
      "0.5 cup pastina pasta",
      "6 ounces baby spinach",
      "salt to taste",
      "4 teaspoons grated Parmesan cheese"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Turn on a multi-functional pressure cooker (such as Instant Pot) and select Saut\u00e9 function. Pour in olive oil and heat until hot. Cook and stir carrots, celery, and onion in hot oil until tender, 4 to 5 minutes.",
      "Season with parsley, basil, and pepper. Pour in chicken broth and add meatballs. Close and lock the lid. Close the valve and select the Soup function according to manufacturer's instructions; set the timer for 3 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure carefully using the quick-release method according to manufacturer's instructions, about 5 minutes. Unlock and remove the lid. Stir in pasta. Replace the lid. Close the valve and select the Soup function according to manufacturer's instructions; set the timer for 3 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure carefully using the quick-release method according to manufacturer's instructions, about 5 minutes. Unlock and remove the lid. Stir in spinach. Let soup sit until spinach is wilted and pasta is fully cooked, about 5 minutes. Season with salt.",
      "Ladle into bowls and top with Parmesan cheese."
    ],
    "nutrition_per_serving": {
      "calories": 309,
      "total_fat_g": 14.0,
      "carbohydrates_g": 25.0,
      "fiber_g": 4.0,
      "sugar_g": 5.0,
      "protein_g": 21.0,
      "sodium_mg": 410,
      "cholesterol_mg": 67,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 126,
    "recipe_category": "Lunch",
    "cuisine": "Italian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/222912/chicken-salad-with-apples-grapes-and-walnuts/",
    "category": "chicken-salads",
    "id": 222912,
    "name": "Chicken Salad with Apples, Grapes, and Walnuts",
    "description": "This chicken salad with apples, crunchy walnuts, and red grapes features a yogurt-based mayo dressing. A tasty recipe for leftover grilled chicken.",
    "author": "Jo Stinnett-Junkins",
    "image": {
      "url": "https://www.allrecipes.com/thmb/PtrGWby7uLMI-_nu5aeBRtixnt4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4536333-c42e71cb0f984e6ab93d3320f3f87491.jpg",
      "alt": "Chicken Salad with Apples, Grapes, and Walnuts"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": null,
    "total_time_minutes": 25,
    "servings": "12",
    "ingredients": [
      "4 cooked chicken breasts, shredded",
      "2 medium Granny Smith apples, cut into small chunks",
      "2 cups chopped walnuts, or to taste",
      "0.5 red onion, chopped",
      "3 stalks celery, chopped",
      "3 tablespoons lemon juice",
      "0.5 cup vanilla yogurt",
      "5 tablespoons creamy salad dressing (such as Miracle Whip\u00ae)",
      "5 tablespoons mayonnaise",
      "25 seedless red grapes, halved"
    ],
    "instructions": [
      "Toss together chicken, apples, walnuts, red onion, celery, and lemon juice in a large bowl.",
      "Whisk together yogurt, salad dressing, and mayonnaise in a small bowl; pour over chicken mixture and stir to coat. Gently fold in grapes."
    ],
    "nutrition_per_serving": {
      "calories": 307,
      "total_fat_g": 23.0,
      "carbohydrates_g": 11.0,
      "fiber_g": 2.0,
      "sugar_g": 7.0,
      "protein_g": 17.0,
      "sodium_mg": 128,
      "cholesterol_mg": 42,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 95,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278443/easy-breakfast-egg-muffins/",
    "category": "meal-prep",
    "id": 278443,
    "name": "Easy Breakfast Egg Muffins",
    "description": "These breakfast egg muffins with cheese, bell peppers, and bacon can be customized to your tastes and made ahead for a yummy on-the-go morning meal.",
    "author": "Catherine",
    "image": {
      "url": "https://www.allrecipes.com/thmb/rFjljUUBth7OQFwvrkwcyFUwO90=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-278443--Easy-Breakfast-Egg-Muffins-gw-ddmfs-beauty-4x3-8de490e94dac4f9baa51c73e02b67a28.jpg",
      "alt": "Easy Breakfast Egg Muffins"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "12",
    "ingredients": [
      "cooking spray",
      "1 green bell pepper, chopped",
      "1 red bell pepper, chopped",
      "1 bunch green onions, chopped",
      "8 large eggs",
      "2.75 ounces fully-cooked bacon pieces (such as Oscar Mayer\u00ae)",
      "0.25 cup whole milk",
      "1 pinch garlic powder, or to taste",
      "1 pinch onion powder, or to taste",
      "salt and ground black pepper to taste",
      "0.5 (8 ounce) package shredded mild Cheddar cheese"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C). Grease a 12-cup muffin tin with cooking spray.",
      "Place bell peppers and green onions into a large bowl.",
      "Add eggs, bacon, milk, garlic powder, onion powder, salt, and pepper.",
      "Sprinkle Cheddar cheese into the bowl and whisk until incorporated.",
      "Pour mixture equally into the prepared muffin cups.",
      "Bake in the preheated oven until a toothpick inserted into the center of a muffin comes out clean, about 30 minutes. Let cool slightly before serving."
    ],
    "nutrition_per_serving": {
      "calories": 135,
      "total_fat_g": 9.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 10.0,
      "sodium_mg": 274,
      "cholesterol_mg": 141,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 88,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/238314/bacon-and-potato-frittata-with-greens/",
    "category": "frittatas",
    "id": 238314,
    "name": "Bacon and Potato Frittata with Greens",
    "description": "Chef John's bacon and potato frittata recipe includes Swiss chard and Parmesan cheese, and is perfect at breakfast, brunch, lunch, or even dinner.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/E41sdtoFuvqzPx5jyv_9S-V54K4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4531057-468a2ed6b1774ce08204b6cfedd39590.jpg",
      "alt": "Bacon and Potato Frittata with Greens"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "8",
    "ingredients": [
      "6 slices bacon, chopped",
      "1 potato, peeled and sliced into thin 1-inch pieces",
      "2 tablespoons water, or as needed",
      "1 clove garlic, thinly sliced",
      "0.5 teaspoon red pepper flakes",
      "salt and ground black pepper to taste",
      "1 bunch Swiss chard, chopped",
      "8 eggs, beaten",
      "0.33333334326744 cup grated Parmesan cheese"
    ],
    "instructions": [
      "Set oven rack about 6 inches from the heat source and preheat the oven's broiler.",
      "Cook and stir bacon in a large oven-proof skillet over medium heat until evenly browned and crispy, about 10 minutes. Drain all but 1 teaspoon bacon grease from the skillet.",
      "Stir potato slices, water, garlic, red pepper flakes, salt, and black pepper into bacon; cover the skillet with a lid and cook until potatoes are tender, about 10 minutes.",
      "Mix Swiss chard into potato mixture; cook and stir until chard is slightly wilted, 2 to 3 minutes.",
      "Pour eggs over potato-chard mixture, stir gently, and remove skillet from heat. Top egg mixture with Parmesan cheese.",
      "Broil in the preheated oven until eggs are set and frittata is golden brown around the edges, 3 to 4 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 150,
      "total_fat_g": 9.0,
      "carbohydrates_g": 7.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 11.0,
      "sodium_mg": 342,
      "cholesterol_mg": 197,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 57,
    "recipe_category": "Breakfast",
    "cuisine": "Italian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/223507/green-gazpacho/",
    "category": "gazpacho",
    "id": 223507,
    "name": "Green Gazpacho",
    "description": "Make and serve this cold, no-cook green gazpacho recipe featuring honeydew melon, cucumber, and avocado as a starter, or as part of a light meal.",
    "author": "MrsFisher0729",
    "image": {
      "url": "https://www.allrecipes.com/thmb/WLDsM7KHUeyMphRRozIYQBwE0aU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2432598-green-gazpacho-Allrecipes-Magazine-4x3-1-6c03a91ce7c5473cb3d619947ae82ac1.jpg",
      "alt": "Green Gazpacho"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": null,
    "total_time_minutes": 55,
    "servings": "2",
    "ingredients": [
      "2 cups diced honeydew melon",
      "1 English (seedless) cucumber, peeled and diced",
      "1 small onion, diced",
      "1 avocado - peeled, pitted, and chopped",
      "0.25 cup white balsamic vinegar",
      "1 jalapeno pepper, seeded and coarsely chopped",
      "1 tablespoon lime juice",
      "1 clove garlic, chopped",
      "salt and freshly ground black pepper to taste"
    ],
    "instructions": [
      "Combine melon, cucumber, onion, avocado, vinegar, jalape\u00f1o, lime juice, garlic, salt, and black pepper in a blender; blend until smooth. Taste; adjust seasonings. Chill before serving."
    ],
    "nutrition_per_serving": {
      "calories": 276,
      "total_fat_g": 15.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 10.0,
      "sugar_g": 22.0,
      "protein_g": 5.0,
      "sodium_mg": 47,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 56,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/242351/spring-vegetable-frittata-for-mother/",
    "category": "frittatas",
    "id": 242351,
    "name": "Spring Vegetable Frittata for Mother",
    "description": "Chef John's spring vegetable frittata recipe features leeks, baby spinach, asparagus, potatoes, and feta cheese and is perfect for a Mother's Day brunch.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/5hvxi4AcLG5RhQWL2_bSyjFk_Y0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7884001-5f783e7ecf0748f48c6e445dbccaf2d2.jpg",
      "alt": "Spring Vegetable Frittata for Mother"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 35,
    "total_time_minutes": 55,
    "servings": "6",
    "ingredients": [
      "2 tablespoons olive oil",
      "1 large leek (white part only), chopped",
      "1 teaspoon salt, divided, or as needed",
      "1.5 cups (1/2-inch) sliced zucchini",
      "1 jalapeno pepper, seeded and diced",
      "1.5 cups (1/2-inch) pieces asparagus",
      "1 cup baby spinach",
      "1.5 cups sliced cooked potatoes",
      "12 large eggs",
      "0.5 teaspoon freshly ground black pepper",
      "1 pinch cayenne pepper",
      "4 ounces crumbled goat-milk feta cheese, divided"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Heat olive oil in a heavy 10-inch skillet over medium heat. Add leek and 1 pinch salt; cook, stirring occasionally, until leeks soften and start to turn translucent, 5 to 6 minutes. Add zucchini, jalape\u00f1o, and 1 pinch salt; cook until zucchini starts to become tender and pale green, about 5 minutes. Add asparagus; cook until bright green, about 1 minute. Add spinach and 1 pinch salt; cook until wilted, about 1 minute. Stir in potatoes; cook until heated through, about 5 minutes.",
      "Beat eggs in a large bowl until well combined, at least 30 seconds; season with salt, black pepper, and cayenne pepper. Pour egg mixture over vegetables in the skillet over medium heat; stir in 3 ounces goat-milk feta cheese until evenly distributed. Top with remaining 1 ounce cheese. Transfer skillet to the oven.",
      "Bake in the preheated oven until eggs are set, 12 to 15 minutes. Turn on the broiler when frittata nearly set; broil until top browns, 1 to 2 minutes. Cool slightly; serve warm."
    ],
    "nutrition_per_serving": {
      "calories": 315,
      "total_fat_g": 19.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 3.0,
      "sugar_g": 4.0,
      "protein_g": 18.0,
      "sodium_mg": 765,
      "cholesterol_mg": 389,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 51,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/238516/cheese-tortellini-salad/",
    "category": "tortellini",
    "id": 238516,
    "name": "Cheese Tortellini Salad",
    "description": "This cheese tortellini salad is a quick and easy picnic favorite with pepperoni, provolone, olives, and artichoke tossed in an Italian-style dressing!",
    "author": "DevDrew",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jhqnfFSI05A4mHG9566uov-CNR0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1548868-2e7f55b98bc54f5697234ae7f5af84f1.jpg",
      "alt": "Cheese Tortellini Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "8",
    "ingredients": [
      "3 (250 g) packages cheese tortellini",
      "2 (6.5 ounce) jars marinated artichoke hearts, drained and chopped",
      "0.5 pound pepperoni, chopped",
      "0.5 pound provolone cheese, chopped",
      "1 (6 ounce) can sliced black olives",
      "0.5 (8 ounce) bottle Italian-style salad dressing, or more to taste",
      "1 (.7 ounce) package dry Italian salad dressing mix (such as Good Seasons\u00ae)",
      "ground black pepper to taste"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Cook tortellini, stirring occasionally, until they float to the top, 6 to 8 minutes; drain. Rinse with cold water until completely cool; drain and transfer to a large bowl.",
      "Stir artichoke hearts, pepperoni, provolone cheese, black olives, Italian-style salad dressing, dry Italian dressing mix, and black pepper into the tortellini. Add more Italian dressing just before serving, if desired."
    ],
    "nutrition_per_serving": {
      "calories": 641,
      "total_fat_g": 37.0,
      "carbohydrates_g": 52.0,
      "fiber_g": 5.0,
      "sugar_g": 5.0,
      "protein_g": 28.0,
      "sodium_mg": 2048,
      "cholesterol_mg": 90,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 29,
    "recipe_category": "Lunch",
    "cuisine": "U.S.",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/256953/healthy-ham-and-egg-muffins/",
    "category": "frittatas",
    "id": 256953,
    "name": "Healthy Ham and Egg Muffins",
    "description": "Ham and egg muffins with a touch of feta cheese are a quick and easy breakfast to eat on the run and can be made in advance and frozen.",
    "author": "Darcy Loo",
    "image": {
      "url": "https://www.allrecipes.com/thmb/J2t1dNUOYUpGHEtKv10xWKpjiic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PASSANO_ALR0522_Bright_4441_preview-2000-78f76de10dc84bee90cecb2a55bde19f.jpg",
      "alt": "Healthy Ham and Egg Muffins"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "12",
    "ingredients": [
      "cooking spray",
      "6 large eggs",
      "1.5 cups frozen chopped spinach, thawed and drained",
      "1 cup chopped red bell pepper",
      "7 ounces diced fully cooked ham",
      "0.75 cup egg whites",
      "0.25 cup crumbled feta cheese",
      "2 tablespoons water",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Spray 12 muffin cups with cooking spray or line with paper liners.",
      "Combine eggs, spinach, red bell pepper, ham, egg whites, feta cheese, water, salt, and pepper in a large bowl. Ladle egg mixture into the prepared muffin cups.",
      "Bake in the preheated oven until set in the middle, 20 to 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 101,
      "total_fat_g": 6.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 9.0,
      "sodium_mg": 333,
      "cholesterol_mg": 105,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 20,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/280276/blueberry-lemon-breakfast-biscuits/",
    "category": "biscuits",
    "id": 280276,
    "name": "Blueberry Lemon Breakfast Biscuits",
    "description": "These blueberry lemon biscuits start with refrigerated buttermilk biscuits for an easy shortcut. Fresh blueberries and lemon unite in this quick recipe.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/6oO528iRsoeFchtnR8JCa6mYIzY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/280276-blueberry-lemon-breakfast-biscuits-beauty-3x4-a4db2befe449412e88985d3d82251b01.jpg",
      "alt": "Blueberry Lemon Breakfast Biscuits"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": "5",
    "ingredients": [
      "1 (10 ounce) can refrigerated buttermilk biscuit dough (such as Pillsbury\u00ae)",
      "1 cup blueberries",
      "0.5 cup powdered sugar",
      "1 tablespoon lemon juice",
      "0.5 teaspoon lemon zest"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 350 degrees F (175 degrees C). Line a cookie sheet with parchment paper.",
      "Remove biscuits from the can; split in half crosswise, for a total of 10 biscuits. Place 5 biscuits on the prepared cookie sheet; divide and place blueberries on 5 biscuits.",
      "Cover blueberries with remaining 5 biscuits.",
      "Bake in the preheated oven until golden brown, 18 to 22 minutes. Let cool for 5 minutes.",
      "Combine confectioners' sugar, lemon juice, and zest in a small bowl.",
      "Brush biscuit tops with 1/2 the glaze. Let sit until glaze sets, about 5 minutes.",
      "Repeat with remaining 1/2 glaze. Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 247,
      "total_fat_g": 8.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 1.0,
      "sugar_g": 19.0,
      "protein_g": 4.0,
      "sodium_mg": 560,
      "cholesterol_mg": 1,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 19,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/232108/crunchy-peanut-butter-chocolate-coconut-granola/",
    "category": "granola",
    "id": 232108,
    "name": "Crunchy Peanut Butter, Chocolate, Coconut Granola",
    "description": "This granola recipe is loaded with chocolate chips, coconut, and sunflower seeds and coated in honey and peanut butter for a sweet and crunchy snack or breakfast treat.",
    "author": "kellie1000",
    "image": {
      "url": "https://www.allrecipes.com/thmb/AGBcVDFwuZQlgtPl7S1464am6xQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1002299-8ddbb7161e61453c9b86a1af44a32ce2.jpg",
      "alt": "Crunchy Peanut Butter, Chocolate, Coconut Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": "10",
    "ingredients": [
      "cooking spray",
      "2 tablespoons honey",
      "2 tablespoons peanut butter",
      "2 cups rolled oats",
      "0.66666668653488 cup sunflower seeds",
      "0.66666668653488 cup chocolate chips",
      "0.33333334326744 cup shredded coconut",
      "0.33333334326744 cup brown sugar",
      "2 teaspoons vanilla extract",
      "1 teaspoon ground cinnamon"
    ],
    "instructions": [
      "Preheat oven to 325 degrees F (165 degrees C). Line a 9x13-inch baking sheet with aluminum foil; coat with cooking spray.",
      "Combine honey and peanut butter in a microwave-safe bowl; microwave on high until melted, about 20 seconds. Stir well.",
      "Place the rolled oats in a large bowl. Drizzle honey-peanut butter mixture over oats; toss to coat. Mix in sunflower seeds, chocolate chips, coconut, brown sugar, vanilla extract, and cinnamon until evenly combined. Spread mixture onto the prepared baking sheet.",
      "Bake in the preheated oven until lightly browned, about 22 minutes. Let cool for 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 245,
      "total_fat_g": 13.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 4.0,
      "sugar_g": 15.0,
      "protein_g": 6.0,
      "sodium_mg": 21,
      "cholesterol_mg": 0,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 19,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/276272/baked-apple-doughnuts/",
    "category": "doughnuts",
    "id": 276272,
    "name": "Baked Apple Doughnuts",
    "description": "This easy baked apple doughnut recipe features pieces of juicy apple to create a moist interior, paired with a cinnamon sugar crust for a tasty fall treat.",
    "author": "summer",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Wj6mOn2iklZXshLuMI1RWTZcsYc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7639294-498c034f71f14e6294705f8579e1b01e.jpg",
      "alt": "Baked Apple Doughnuts"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": 10,
    "total_time_minutes": 35,
    "servings": "24",
    "ingredients": [
      "3 cups all-purpose flour",
      "1 cup white sugar",
      "1 tablespoon baking powder",
      "1 teaspoon salt",
      "1 teaspoon ground nutmeg",
      "1 teaspoon ground cinnamon",
      "0.5 cup vegetable shortening",
      "2 cups diced apples",
      "1 cup milk",
      "2 large eggs, beaten",
      "0.5 cup butter",
      "1 cup sugar",
      "2 teaspoons ground cinnamon"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Grease two mini doughnut pans.",
      "Combine flour, 1 cup sugar, baking powder, salt, nutmeg, and 1 teaspoon cinnamon in a large bowl using a fork until combined. Mix in shortening until mixture resembles coarse crumbs.",
      "Combine apples, milk, and eggs in a separate bowl. Stir into flour mixture until just blended. Spoon batter into the prepared doughnut pans.",
      "Bake doughnuts in the preheated oven until slightly browned on the bottoms, about 10 minutes. Invert carefully onto a wire rack. Let cool completely.",
      "Meanwhile, place melted butter in a shallow bowl. Mix 1 cup sugar and 2 teaspoons cinnamon together in another shallow bowl. Dip cooled doughnuts in butter. Coat with sugar mixture."
    ],
    "nutrition_per_serving": {
      "calories": 211,
      "total_fat_g": 9.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 1.0,
      "sugar_g": 18.0,
      "protein_g": 3.0,
      "sodium_mg": 177,
      "cholesterol_mg": 27,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 18,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/256301/carne-asada-breakfast-burrito/",
    "category": "breakfast-potatoes",
    "id": 256301,
    "name": "Carne Asada Breakfast Burrito",
    "description": "Seasoned strips of flank steak, onions, potatoes, bell pepper, and jalapeno pepper make a hearty breakfast burrito.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/gSL68DQzYmQKsS_dqp8UHf9NWd0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4340194-dcdda6f445dd417b874ab230905d2b9e.jpg",
      "alt": "Carne Asada Breakfast Burrito"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "4",
    "ingredients": [
      "2 pounds beef skirt steak, cut into thin strips",
      "2 tablespoons carne asada seasoning",
      "1 tablespoon garlic powder",
      "1 tablespoon vegetable oil",
      "0.5 sweet onion, diced",
      "1 red bell pepper, seeded and chopped",
      "1 jalapeno pepper, seeded and diced",
      "1 (14.5 ounce) can Hunt's\u00ae Diced Tomatoes, drained",
      "2 cups frozen diced potatoes",
      "salt and pepper to taste",
      "3 tablespoons butter, divided",
      "6 eggs, whisked",
      "2 cups shredded Mexican cheese blend",
      "4 (12 inch) flour tortillas"
    ],
    "instructions": [
      "Place beef slices in a mixing bowl. Sprinkle with asada seasoning and garlic powder; toss in bowl to evenly coat. Let marinade 5 minutes.",
      "Heat oil in a large, deep skillet over medium-high heat. Place beef strips in skillet and cook and stir until browned. Stir in bell pepper, onions, and jalapeno pepper. Add tomatoes and potatoes. Cook mixture until potatoes are tender, 5 to 8 minutes. Season with salt and pepper. Transfer mixture to a bowl.",
      "Melt 1 tablespoon butter in the same skillet. Add the eggs, stirring occasionally, until eggs are scrambled and set. Transfer the beef mixture back to skillet. Cook and stir until warmed through, about 2 minutes. Melt the remaining 2 tablespoons butter in a small dish in microwave.",
      "Divide shredded cheese among tortillas; divide beef and veggie mixture and place on the cheese. Fold in sides of tortilla and roll up. Brush with melted butter and place folded side down in pan to brown; flip and brown on top side. Burrito should be warmed though."
    ],
    "nutrition_per_serving": {
      "calories": 1163,
      "total_fat_g": 63.0,
      "carbohydrates_g": 83.0,
      "fiber_g": 7.0,
      "sugar_g": 9.0,
      "protein_g": 65.0,
      "sodium_mg": 3109,
      "cholesterol_mg": 437,
      "saturated_fat_g": 31.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 13,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/276622/keto-breakfast-frittata/",
    "category": "frittatas",
    "id": 276622,
    "name": "Keto Breakfast Frittata",
    "description": "This keto frittata is dressed up with lots of low-carb vegetables including bell peppers, spinach, and mushrooms for great flavor and texture.",
    "author": "Bibi",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mBax6ikz7zym5W9xjMh_1wwGKog=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7164615-6ce3f59b4dbd46239c6b3a6304cc34c1.jpg",
      "alt": "Keto Breakfast Frittata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "6",
    "ingredients": [
      "4 ounces bulk breakfast sausage",
      "8 eggs",
      "2 tablespoons heavy cream",
      "8 drops hot pepper sauce (such as Tabasco\u00ae), or more to taste",
      "2 tablespoons butter",
      "1 cup chopped mushrooms",
      "0.66666668653488 cup chopped red bell pepper",
      "0.5 cup chopped onion",
      "salt and ground black pepper to taste",
      "0.5 cup chopped fresh spinach",
      "1 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Preheat the oven to 325 degrees F (165 degrees C).",
      "Crumble sausage into a 12-inch nonstick, oven-proof skillet over medium heat. Cook until browned, about 4 minutes.",
      "Meanwhile, whisk eggs in a large bowl. Add cream and hot pepper sauce; mix well.",
      "Add butter to the skillet with browned sausage and melt around the inside rim of the skillet. Add mushrooms, red bell pepper, onion, salt, and pepper. Cook until onion is soft and translucent, about 4 minutes. Turn off heat and stir in spinach. Cook for 1 minute in the hot skillet, then sprinkle with Cheddar cheese. Pour egg mixture on top, making sure all ingredients are submerged.",
      "Place skillet in the preheated oven and bake until eggs are set and no longer jiggle, about 20 minutes. Remove from oven and allow to sit for 1 to 2 minutes before cutting into serving pieces."
    ],
    "nutrition_per_serving": {
      "calories": 283,
      "total_fat_g": 23.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 17.0,
      "sodium_mg": 443,
      "cholesterol_mg": 295,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 13,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/285341/cream-cheese-filled-bagel-balls/",
    "category": "bagels",
    "id": 285341,
    "name": "Cream Cheese-Filled Bagel Balls",
    "description": "Perfect for breakfast and super easy and quick to make, these cream cheese-filled bagel balls are made with a yogurt-based dough that requires no rising time.",
    "author": "alliecappelli",
    "image": {
      "url": "https://www.allrecipes.com/thmb/SOhG1KNWhXnw8t8OUxDr_NkxmqY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8500283-ff892d05725f411d8595c0a72d5149a5.jpg",
      "alt": "Cream Cheese-Filled Bagel Balls"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "1 cup all-purpose flour, or as needed",
      "2 teaspoons baking powder",
      "0.5 teaspoon salt, or more to taste",
      "1 cup Greek yogurt",
      "0.5 cup cream cheese, or as needed",
      "1 large egg",
      "2 teaspoons half-and-half",
      "2 teaspoons everything bagel seasoning, or to taste",
      "1 tablespoon butter, melted, or as needed"
    ],
    "instructions": [
      "Preheat the oven to 450 degrees F (230 degrees C). Grease a baking pan.",
      "Mix 1 cup flour, baking powder, and 1/2 teaspoon salt together. Mix in Greek yogurt and knead until all flour is mixed in; if dough is sticky, add more flour.",
      "Cut dough into 8 equal pieces. Roll each piece into a ball and press each ball into a flat circle; they should look like mini pizzas.",
      "Scoop cream cheese into the center of each circle. Fold the edges up and pinch closed so you have a round ball of dough with cream cheese inside. Make sure you seal the edges so the cream cheese doesn't spill out during baking. Place seam side down on the prepared baking pan.",
      "Mix egg, half-and-half, and a pinch of salt in a small bowl. Brush egg wash on top of each dough ball and sprinkle with bagel seasoning.",
      "Bake in the preheated oven until golden brown, about 10 minutes. Remove from the oven and brush with melted butter before serving."
    ],
    "nutrition_per_serving": {
      "calories": 338,
      "total_fat_g": 20.0,
      "carbohydrates_g": 28.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 10.0,
      "sodium_mg": 852,
      "cholesterol_mg": 98,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 8,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/267900/pumpkin-seed-granola/",
    "category": "granola",
    "id": 267900,
    "name": "Pumpkin Seed Granola",
    "description": "Delicious homemade pumpkin seed granola with toasted pumpkin seeds, oats, shredded coconut, and pumpkin pie spice sweetened with sugar-free syrup.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ffqXQHv5HJT5m-hlgcCGXWVNYIM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5719442-9e90c20a4b934d6b91f533226dd66c5b.jpg",
      "alt": "Pumpkin Seed Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "1 cup raw pumpkin seeds",
      "1.5 cups rolled oats",
      "0.5 cup pumpkin puree",
      "0.5 cup sugar-free maple-flavored syrup",
      "0.25 cup shredded coconut",
      "2 tablespoons unsalted butter, melted",
      "0.5 teaspoon pumpkin pie spice",
      "0.5 teaspoon ground cinnamon",
      "0.25 teaspoon salt"
    ],
    "instructions": [
      "Preheat the oven to 325 degrees F (165 degrees C). Line a baking sheet with parchment paper.",
      "Mix pumpkin seeds, oats, pumpkin puree, maple-flavored syrup, coconut, butter, pumpkin pie spice, cinnamon, and salt together in a bowl until well combined. Spread mixture evenly over the prepared baking sheet.",
      "Bake in the preheated oven, stirring every 15 minutes, until desired crispness is reached, 30 to 45 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 269,
      "total_fat_g": 18.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 4.0,
      "sugar_g": 1.0,
      "protein_g": 9.0,
      "sodium_mg": 154,
      "cholesterol_mg": 10,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 5,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/242179/watermelon-strawberry-mango-lemonade-smoothie/",
    "category": "lemonade",
    "id": 242179,
    "name": "Watermelon Strawberry Mango Lemonade Smoothie",
    "description": "Watermelon, strawberries, and mango are blended with a good amount of lemon juice and sugar to create a sweet and refreshing lemonade smoothie recipe.",
    "author": "awesomecookie95",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DCleYBjF8NSSfaQlCa1PRO8mAjU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4438432-f291f89360174819837779d02ff81864.jpg",
      "alt": "Watermelon Strawberry Mango Lemonade Smoothie"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "4",
    "ingredients": [
      "8 cups cubed seeded watermelon",
      "2 cups water",
      "1 cup strawberries",
      "1 cup chopped mango",
      "1 cup white sugar",
      "0.5 cup lemon juice"
    ],
    "instructions": [
      "Combine watermelon, water, strawberries, mango, sugar, and lemon juice in a blender; blend until smooth, about 5 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 331,
      "total_fat_g": 1.0,
      "carbohydrates_g": 85.0,
      "fiber_g": 3.0,
      "sugar_g": 77.0,
      "protein_g": 2.0,
      "sodium_mg": 8,
      "cholesterol_mg": 0,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 5,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/256146/peanut-butter-granola-from-pam/",
    "category": "granola",
    "id": 256146,
    "name": "Peanut Butter Granola from PAM\u00ae",
    "description": "A classic chunky granola with a hint of peanut butter. Delicious on its own, in a bowl with milk, or tossed into yogurt or a trail mix.",
    "author": "Pam Cooking Spray",
    "image": {
      "url": "https://www.allrecipes.com/thmb/C-pdNpbke1-LRcTJM7hYT5a_deg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4134418-d5aeec97d7da4cdeade8712de7c642fd.jpg",
      "alt": "Peanut Butter Granola from PAM\u00ae"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 50,
    "servings": "12",
    "ingredients": [
      "PAM\u00ae Original No-Stick Cooking Spray",
      "0.33333334326744 cup Peter Pan\u00ae Creamy Peanut Butter",
      "0.33333334326744 cup Pure Wesson\u00ae Canola Oil",
      "0.25 cup honey",
      "4 cups quick-cooking rolled oats, divided",
      "0.5 cup firmly packed brown sugar",
      "0.25 teaspoon salt"
    ],
    "instructions": [
      "Preheat oven to 300 degrees F. Spray large baking sheet with cooking spray; set aside.",
      "Combine peanut butter, oil and honey in small saucepan. Heat on low until smooth and pourable. Meanwhile, process 1 cup of oats in blender or food processor until finely ground. Combine ground oats with remaining oats, sugar and salt in large bowl. Pour warm peanut butter mixture over oat mixture and stir well. Pour onto prepared baking sheet.",
      "Bake 30 minutes, stirring every 10 minutes. Let cool 10 minutes, break into chunks and allow to cool completely on baking sheet. Store in airtight container at room temperature for up to 7 days."
    ],
    "nutrition_per_serving": {
      "calories": 254,
      "total_fat_g": 12.0,
      "carbohydrates_g": 34.0,
      "fiber_g": 3.0,
      "sugar_g": 16.0,
      "protein_g": 5.0,
      "sodium_mg": 84,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.8,
    "review_count": 4,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/6865/to-die-for-blueberry-muffins/",
    "category": "food-gifts",
    "id": 6865,
    "name": "To Die For Blueberry Muffins",
    "description": "This blueberry muffin recipe with a sweet cinnamon crumb topping is easy to make with fresh blueberries for a moist and delicious breakfast muffin treat.",
    "author": "Colleen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/w4mqXHWaUQtNhz_NDLHmGfmy3lI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6865-to-die-for-blueberry-muffins-VAT-019-4x3-dfe4a5ca62eb49559c3431b00c266f37.jpg",
      "alt": "To Die For Blueberry Muffins"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "8",
    "ingredients": [
      "1.5 cups all-purpose flour",
      "0.75 cup white sugar",
      "2 teaspoons baking powder",
      "0.5 teaspoon salt",
      "0.33333334326744 cup vegetable oil",
      "1 egg",
      "0.33333334326744 cup milk, or more as needed",
      "1 cup fresh blueberries",
      "0.5 cup white sugar",
      "0.33333334326744 cup all-purpose flour",
      "0.25 cup butter, cubed",
      "1.5 teaspoons ground cinnamon"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 400 degrees F (200 degrees C). Grease 8 muffin cups or line with paper liners.",
      "To make the muffins: Whisk flour, sugar, baking powder, and salt together in a large bowl.",
      "Pour oil into a small liquid measuring cup. Add egg and enough milk to reach the 1-cup mark; stir until combined.",
      "Pour into flour mixture and mix just until batter is combined. Fold in blueberries; set batter aside.",
      "To make the crumb topping: Combine sugar, flour, butter, and cinnamon in a small bowl. Mix with a fork until crumbly.",
      "Spoon batter into the prepared muffin cups, filling right to the top. Sprinkle with crumb topping.",
      "Bake in the preheated oven until a toothpick inserted in the center of a muffin comes out clean, 20 to 25 minutes. Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 381,
      "total_fat_g": 16.0,
      "carbohydrates_g": 57.0,
      "fiber_g": 1.0,
      "sugar_g": 34.0,
      "protein_g": 4.0,
      "sodium_mg": 314,
      "cholesterol_mg": 39,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 15543,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16895/fluffy-french-toast/",
    "category": "kosher",
    "id": 16895,
    "name": "Fluffy French Toast",
    "description": "A small scoop of flour makes this the best French toast recipe! Thickening the batter just a little makes tender, fluffy toast and helps it brown nicely.",
    "author": "bonnie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/kpI2DQrw7zDake_7B8wOJRkZ-6Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-recipe-16895-fluffy-french-toast-hero-01-ddmfs-4x3-7fd61e054f2c4f0f868b7ab0dd8767ae.jpg",
      "alt": "Fluffy French Toast"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "12",
    "ingredients": [
      "0.25 cup all-purpose flour",
      "1 cup milk",
      "3 eggs",
      "1 tablespoon white sugar",
      "1 teaspoon vanilla extract",
      "0.5 teaspoon ground cinnamon",
      "1 pinch salt",
      "12 thick slices bread"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Place flour into a large mixing bowl; slowly whisk in milk until smooth. Whisk in eggs, sugar, vanilla, cinnamon, and salt until well combined.",
      "Heat a lightly oiled griddle or frying pan over medium heat. Meanwhile, soak bread slices in milk mixture until saturated.",
      "Working in batches, cook bread on the preheated griddle or pan until golden brown on both sides, about 2 minutes per side.",
      "Serve hot and enjoy."
    ],
    "nutrition_per_serving": {
      "calories": 123,
      "total_fat_g": 3.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 5.0,
      "sodium_mg": 230,
      "cholesterol_mg": 48,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 4655,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/7040/jps-big-daddy-biscuits/",
    "category": "biscuits",
    "id": 7040,
    "name": "J.P.'s Big Daddy Biscuits",
    "description": "This homemade fluffy biscuit recipe is easy to make with simple ingredients that help create giant biscuits. Perfect with gravy or butter and jam.",
    "author": "John Pickett",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Mca_ObrdNwRDVjOGF7UoQNQO7KA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7040-jps-big-daddy-biscuits-DDMFS-4x3-f69667ff4fda4234aa9bdc5f78705796.jpg",
      "alt": "J.P.'s Big Daddy Biscuits"
    },
    "prep_time_minutes": 30,
    "cook_time_minutes": 15,
    "total_time_minutes": 45,
    "servings": "6",
    "ingredients": [
      "2 cups all-purpose flour",
      "1 tablespoon baking powder",
      "1 tablespoon white sugar",
      "1 teaspoon salt",
      "0.33333334326744 cup shortening",
      "1 cup milk"
    ],
    "instructions": [
      "Gather all ingredients and preheat the oven to 425 degrees F (220 degrees C).",
      "Whisk flour, baking powder, sugar, and salt together in a large bowl. Cut in shortening until the mixture resembles coarse crumbs.",
      "Gradually stir in milk until dough pulls away from the side of the bowl.",
      "Turn out onto a floured surface, and knead 15 to 20 times. Pat or roll dough out to 1 inch thick. Cut biscuits with a large cutter or juice glass dipped in flour. Repeat until all dough is used. Brush off the excess flour, and place biscuits onto an ungreased baking sheet.",
      "Bake in the preheated oven until the edges begin to brown, 13 to 15 minutes. Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 282,
      "total_fat_g": 13.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 1.0,
      "sugar_g": 4.0,
      "protein_g": 6.0,
      "sodium_mg": 649,
      "cholesterol_mg": 3,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 4556,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/20513/classic-waffles/",
    "category": "kosher",
    "id": 20513,
    "name": "Classic Waffles",
    "description": "These crispy waffles are easy to make with simple ingredients you probably already have on hand for a light and fluffy breakfast treat.",
    "author": "Megan",
    "image": {
      "url": "https://www.allrecipes.com/thmb/imrP1HYi5pu7j1en1_TI-Kcnzt4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20513-classic-waffles-mfs-025-4x3-81c0f0ace44d480ca69dd5f2c949731a.jpg",
      "alt": "Classic Waffles"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "5",
    "ingredients": [
      "2 cups all-purpose flour",
      "1 teaspoon salt",
      "4 teaspoons baking powder",
      "2 tablespoons white sugar",
      "2 eggs",
      "1.5 cups warm milk",
      "0.33333334326744 cup butter, melted",
      "1 teaspoon vanilla extract"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Mix flour, salt, baking powder, and sugar together in a large bowl; set aside. Preheat waffle iron to desired temperature.",
      "Beat eggs in a separate bowl; stir in milk, butter, and vanilla.",
      "Pour milk mixture into flour mixture; beat until blended.",
      "Ladle batter into a preheated waffle iron.",
      "Cook waffles until golden and crisp.",
      "Serve immediately and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 379,
      "total_fat_g": 16.0,
      "carbohydrates_g": 48.0,
      "fiber_g": 1.0,
      "sugar_g": 9.0,
      "protein_g": 10.0,
      "sodium_mg": 899,
      "cholesterol_mg": 113,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 4137,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/45396/easy-pancakes/",
    "category": "kosher",
    "id": 45396,
    "name": "Easy Pancakes",
    "description": "This easy pancake recipe is quick to make with simple pantry ingredients. They cook up nice and fluffy for a family-pleasing breakfast or brunch.",
    "author": "Sharon Holt",
    "image": {
      "url": "https://www.allrecipes.com/thmb/pZtxkWhiaZdUmdhgv-Pj9EIMbVY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/45396-easy-pancakes-DDMFS-4x3-44411f993d7841d9b2b89bcc65bdd178.jpg",
      "alt": "Easy Pancakes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 cup all-purpose flour",
      "2 tablespoons white sugar",
      "2 teaspoons baking powder",
      "1 teaspoon salt, or to taste",
      "1 cup milk",
      "2 tablespoons vegetable oil",
      "1 egg, beaten"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Combine flour, sugar, baking powder, and salt in a large bowl. Make a well in the center, and pour in milk, oil, and egg. Mix until smooth.",
      "Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop batter onto the griddle, using approximately 1/4 cup for each pancake; cook until bubbles form and the edges are dry, 1 to 2 minutes. Flip and cook until browned on the other side. Repeat with remaining batter.",
      "Serve hot and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 247,
      "total_fat_g": 10.0,
      "carbohydrates_g": 34.0,
      "fiber_g": 1.0,
      "sugar_g": 9.0,
      "protein_g": 7.0,
      "sodium_mg": 804,
      "cholesterol_mg": 51,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 1740,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/20792/b-and-ls-strawberry-smoothie/",
    "category": "smoothies",
    "id": 20792,
    "name": "B and L's Strawberry Smoothie",
    "description": "This strawberry smoothie recipe blends fresh strawberries, milk, yogurt, sugar, and vanilla for a tasty, icy treat. Great for breakfast, or anytime.",
    "author": "Lisa and Brittany",
    "image": {
      "url": "https://www.allrecipes.com/thmb/aMLtmuAFr01C66eai_OtGRF0Xu4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20792-b-and-ls-strawberry-smoothie-ddmfs-0321-3x4-hero-f9aad20d876448a49a3561bec1da6363.jpg",
      "alt": "B and L's Strawberry Smoothie"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "2",
    "ingredients": [
      "8 strawberries, hulled",
      "0.5 cup skim milk",
      "0.5 cup plain yogurt",
      "3 tablespoons white sugar",
      "2 teaspoons vanilla extract",
      "6 cubes ice, crushed"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Combine strawberries, milk, yogurt, sugar, and vanilla in a blender. Add ice and blend until smooth and creamy.",
      "Pour into glasses and serve immediately. Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 160,
      "total_fat_g": 1.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 1.0,
      "sugar_g": 29.0,
      "protein_g": 6.0,
      "sodium_mg": 71,
      "cholesterol_mg": 5,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 1184,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/220661/quinoa-black-bean-burgers/",
    "category": "burgers",
    "id": 220661,
    "name": "Quinoa Black Bean Burgers",
    "description": "Vegetarian quinoa-black bean burgers are easy, quick, and delicious served on a whole wheat bun with garlic-lemon mayo, spinach, tomato, and onions.",
    "author": "DownHomeCitySisterscom",
    "image": {
      "url": "https://www.allrecipes.com/thmb/r5CEBYsSPSOqTxi-gpf40ZWt42o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5858755-quinoa-black-bean-burgers-Autumneyes-1x1-1-8dbacd9c8d51462ea1a9d0aa6a4b08ff.jpg",
      "alt": "Quinoa Black Bean Burgers"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "5",
    "ingredients": [
      "0.5 cup water",
      "0.25 cup quinoa",
      "1 (15 ounce) can black beans, rinsed and drained",
      "0.5 cup bread crumbs",
      "0.25 cup minced yellow bell pepper",
      "1 large egg",
      "2 tablespoons minced onion",
      "1 large clove garlic, minced",
      "1.5 teaspoons ground cumin",
      "1 teaspoon hot pepper sauce (such as Frank's RedHot\u00ae)",
      "0.5 teaspoon salt",
      "3 tablespoons olive oil"
    ],
    "instructions": [
      "Bring water and quinoa to a boil in a saucepan. Reduce heat to medium-low, cover, and simmer until quinoa is tender and water has been absorbed, about 15 to 20 minutes.",
      "Roughly mash black beans with a fork, leaving some whole, to form a paste-like mixture. Mix quinoa, bread crumbs, bell pepper, egg, onion, garlic, cumin, hot pepper sauce, and salt into black beans using your hands. Form into 5 patties.",
      "Add olive oil to a large skillet and heat on medium.",
      "Cook patties until heated through and lightly browned, 2 to 3 minutes per side."
    ],
    "nutrition_per_serving": {
      "calories": 245,
      "total_fat_g": 11.0,
      "carbohydrates_g": 29.0,
      "fiber_g": 7.0,
      "sugar_g": 1.0,
      "protein_g": 9.0,
      "sodium_mg": 680,
      "cholesterol_mg": 37,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 1162,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8565/beckys-chicken-salad/",
    "category": "chicken-salads",
    "id": 8565,
    "name": "Becky's Chicken Salad",
    "description": "Whipped cream gives this chicken salad a lift. Green grapes and crunchy almonds add sweetness and texture to this creamy chicken salad.",
    "author": "Becky Riley",
    "image": {
      "url": "https://www.allrecipes.com/thmb/XT2HN0iframr7eaN_llCmT0KJKc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2384251-17b286bf0d484d6ea1c958d6fa5e05c5.jpg",
      "alt": "Becky's Chicken Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "10",
    "ingredients": [
      "2.5 cups diced and chilled, cooked chicken meat",
      "1 cup chopped celery",
      "1 cup sliced, seedless grapes",
      "0.5 cup sliced almonds",
      "2 tablespoons chopped fresh parsley",
      "1 teaspoon salt",
      "1 cup mayonnaise",
      "0.25 cup heavy whipping cream"
    ],
    "instructions": [
      "In a medium bowl, whip cream to soft peaks.",
      "Combine meat, celery, grapes, almonds, parsley, salt, and mayonnaise with whipped cream. Chill."
    ],
    "nutrition_per_serving": {
      "calories": 274,
      "total_fat_g": 24.0,
      "carbohydrates_g": 5.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 11.0,
      "sodium_mg": 388,
      "cholesterol_mg": 43,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 916,
    "recipe_category": "Lunch",
    "meal_type": "study",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/33118/german-potato-pancakes/",
    "category": "breakfast-potatoes",
    "id": 33118,
    "name": "German Potato Pancakes",
    "description": "This German potato pancake recipe pan-fries shredded potatoes and onion until golden and crispy for a savory twist on regular pancakes.",
    "author": "SWIZZLESTICKS",
    "image": {
      "url": "https://www.allrecipes.com/thmb/CTPwMDYbMs3uWaIkdqzQRNtwlno=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/33118-german-potato-pancakes-DDMFS-beauty-4x3-d67678bd232c4ea5929bd495a5e9135d.jpg",
      "alt": "German Potato Pancakes"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 45,
    "servings": "6",
    "ingredients": [
      "2 large eggs",
      "2 tablespoons all-purpose flour",
      "0.25 teaspoon baking powder",
      "0.5 teaspoon salt",
      "0.25 teaspoon pepper",
      "6 medium potatoes, peeled and shredded",
      "0.5 cup finely chopped onion",
      "0.25 cup vegetable oil"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Beat eggs, flour, baking powder, salt, and pepper together in a large bowl; stir in shredded potatoes and onion.",
      "Heat oil in a large skillet over medium heat. Drop heaping tablespoonfuls of potato mixture into hot oil, working in batches. Flatten slightly by pressing with a spatula.",
      "Cook until golden brown and crisp, about 3 minutes per side.",
      "Transfer to a paper towel-lined plate to drain. You can cover them very loosely with aluminum foil to hold in heat without steaming them.",
      "Repeat with remaining potato mixture. Serve warm."
    ],
    "nutrition_per_serving": {
      "calories": 283,
      "total_fat_g": 11.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 7.0,
      "sodium_mg": 246,
      "cholesterol_mg": 62,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 862,
    "recipe_category": "Breakfast",
    "cuisine": "German",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21382/never-fail-biscuits/",
    "category": "biscuits",
    "id": 21382,
    "name": "Never Fail Biscuits",
    "description": "Good old white biscuits that go great with everything.",
    "author": "dakota kelly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/q-4HOBl2T66luHOdm8jfMWiY6H4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1108865-12178f5eee2442eb8b31a4f7db35fb8d.jpg",
      "alt": "Never Fail Biscuits"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "2 cups all-purpose flour",
      "0.5 teaspoon salt",
      "4 teaspoons baking powder",
      "0.5 teaspoon cream of tartar",
      "2 teaspoons white sugar",
      "0.5 cup butter, chilled and diced",
      "0.75 cup milk"
    ],
    "instructions": [
      "Preheat oven to 450 degrees F (230 degrees C).",
      "In a large bowl, sift together dry ingredients. Cut in butter until mixture resembles coarse oatmeal. Make a well in the center of the dry mixture and pour in the milk. Stir until dough begins to pull together then turn out onto a lightly floured surface.",
      "Press dough together and then roll out until 3/4 inch thick. Cut into 2 inch round biscuits and place on an ungreased baking sheet.",
      "Bake in preheated oven for 10 minutes, or until golden."
    ],
    "nutrition_per_serving": {
      "calories": 465,
      "total_fat_g": 25.0,
      "carbohydrates_g": 53.0,
      "fiber_g": 2.0,
      "sugar_g": 4.0,
      "protein_g": 8.0,
      "sodium_mg": 834,
      "cholesterol_mg": 65,
      "saturated_fat_g": 15.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 544,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/220520/classic-hash-browns/",
    "category": "breakfast-potatoes",
    "id": 220520,
    "name": "Classic Hash Browns",
    "description": "This hash browns recipe from Chef John fries shredded potatoes in clarified butter to make perfectly seasoned, crispy, diner-style hash browns.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9vdcj90wdyoowXBrEHdV8wLXEpw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/220520_ClassicHashbrowns-ddmfs_4x3_126-bf90488205684501bbf3589b7caf9632.jpg",
      "alt": "Classic Hash Browns"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "2 russet potatoes, peeled",
      "3 tablespoons clarified butter",
      "1 pinch cayenne pepper, or to taste",
      "1 pinch paprika, or to taste",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Shred potatoes into a large bowl filled with cold water. Stir until water is cloudy; drain and cover potatoes again with fresh cold water. Stir again to dissolve excess starch. Drain potatoes well, pat dry with paper towels, and squeeze out any excess moisture.",
      "Heat clarified butter in a large nonstick pan over medium heat. Sprinkle shredded potatoes into hot butter in an even layer; season with cayenne pepper, paprika, salt, and black pepper.",
      "Cook potatoes until a brown crust forms on the bottom, about 5 minutes. Flip or stir and continue to cook until potatoes are browned and crusty all over, about 5 more minutes.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 334,
      "total_fat_g": 19.0,
      "carbohydrates_g": 38.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 4.0,
      "sodium_mg": 13,
      "cholesterol_mg": 49,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 364,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236198/chicken-club-pasta-salad/",
    "category": "chicken-salads",
    "id": 236198,
    "name": "Club Chicken Pasta Salad",
    "description": "This chicken pasta salad with crispy bacon, juicy tomatoes, tender chicken, and corkscrew pasta tossed in a creamy dressing is simple and delicious.",
    "author": "Lane J",
    "image": {
      "url": "https://www.allrecipes.com/thmb/AkJRACPPP6RvQcdZomIhV_TKnu8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/236198-chicken-club-pasta-salad-DDMFS-4x3-156ea6ff8bd4454e9160f11cb148429d.jpg",
      "alt": "Club Chicken Pasta Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "8 ounces corkscrew-shaped pasta",
      "0.75 cup Italian-style salad dressing",
      "0.25 cup mayonnaise",
      "2 cups chopped, cooked rotisserie chicken",
      "12 slices crispy cooked bacon, crumbled",
      "8 ounces cherry tomatoes, halved",
      "1 cup cubed Muenster cheese",
      "1 cup chopped celery",
      "1 cup chopped green bell pepper",
      "1 avocado - peeled, pitted, and chopped"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Bring a large pot of lightly salted water to a boil. Cook pasta in the boiling water, stirring occasionally, until tender yet firm to the bite, about 10 to12 minutes. Drain and rinse under cold water.",
      "Whisk Italian-style dressing and mayonnaise together in a large bowl.",
      "Stir in pasta, chicken, bacon, tomatoes, cheese, celery, green bell pepper, and avocado until evenly coated.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 486,
      "total_fat_g": 30.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 5.0,
      "sugar_g": 5.0,
      "protein_g": 19.0,
      "sodium_mg": 723,
      "cholesterol_mg": 48,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 348,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/22960/pumpkin-chip-muffins/",
    "category": "Pumpkin-Breads",
    "id": 22960,
    "name": "Pumpkin Chip Muffins",
    "description": "This pumpkin chip muffin recipe is packed with chocolate chips and pumpkin for sweetness while warm spices like cinnamon provides a fall-forward flavor.",
    "author": "Laurie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/wKR4DlEL4CiOjJDwGu-FrbrR_7E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5917712-2aa8779b828643aea376458ff52a1a4a.jpg",
      "alt": "Pumpkin Chip Muffins"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "24",
    "ingredients": [
      "4 eggs",
      "2 cups white sugar",
      "1 (15 ounce) can pumpkin",
      "1.5 cups vegetable oil",
      "3 cups all-purpose flour",
      "2 teaspoons baking soda",
      "2 teaspoons baking powder",
      "1 teaspoon ground cinnamon",
      "1 teaspoon salt",
      "2 cups semisweet chocolate chips"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Grease two 12-cup muffin tins or line cups with paper liners.",
      "Beat eggs together in a bowl: beat in sugar, pumpkin, and oil.",
      "Whisk flour, baking soda, baking powder, cinnamon, and salt together in a bowl; stir into pumpkin mixture. Fold in chocolate chips.",
      "Divide batter among the prepared muffin cups, filling each to the top.",
      "Bake in the preheated oven until a toothpick inserted into centers comes out clean, 15 to 20 minutes. Cool in the tins for 5 minutes, then transfer muffins to a wire rack to cool completely."
    ],
    "nutrition_per_serving": {
      "calories": 327,
      "total_fat_g": 19.0,
      "carbohydrates_g": 39.0,
      "fiber_g": 2.0,
      "sugar_g": 25.0,
      "protein_g": 4.0,
      "sodium_mg": 246,
      "cholesterol_mg": 31,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 342,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/72985/feta-chicken-salad/",
    "category": "chicken-salads",
    "id": 72985,
    "name": "Feta Chicken Salad",
    "description": "This feta chicken salad is a basic chicken salad recipe with red bell peppers and feta cheese. Try using tomato-basil feta for added flavor!",
    "author": "CHELC44",
    "image": {
      "url": "https://www.allrecipes.com/thmb/biP-_VA5gRazqiUprYotAXG_1jk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/72985feta-chicken-saladfabeveryday4x3-40e22945b9ea45f8ad767fc0006f2f70.jpg",
      "alt": "Feta Chicken Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "3 cups diced cooked chicken",
      "2 large stalks celery, diced",
      "1 medium red bell pepper, seeded and diced",
      "0.5 medium red onion, diced",
      "6 tablespoons mayonnaise",
      "6 tablespoons sour cream",
      "1 (4 ounce) package feta cheese, crumbled",
      "2 teaspoons dried dill weed",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Mix chicken, celery, and red onion together in a serving bowl.",
      "Stir mayonnaise, sour cream, feta cheese, and dill together in a separate bowl. Pour over chicken mixture, and stir to blend. Taste, and season with salt and pepper as needed.",
      "Serve immediately, or refrigerate until serving."
    ],
    "nutrition_per_serving": {
      "calories": 599,
      "total_fat_g": 45.0,
      "carbohydrates_g": 7.0,
      "fiber_g": 1.0,
      "sugar_g": 5.0,
      "protein_g": 41.0,
      "sodium_mg": 1061,
      "cholesterol_mg": 163,
      "saturated_fat_g": 19.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 340,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21513/country-sausage-gravy/",
    "category": "gravies",
    "id": 21513,
    "name": "Country Sausage Gravy",
    "description": "Thick and creamy pork sausage gravy with fresh sage, thyme and red pepper flakes for a little kick.",
    "author": "Tony Zell",
    "image": {
      "url": "https://www.allrecipes.com/thmb/LoL09QozOmaTNAl103FjBQm0xVA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4588995-65e2de8ee1524892a66704cf10a87ea0.jpg",
      "alt": "Country Sausage Gravy"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "1 pound pork sausage",
      "1 onion, finely chopped",
      "1 green bell pepper, finely chopped",
      "1 teaspoon crushed red pepper flakes",
      "2 tablespoons garlic, minced",
      "4 tablespoons unsalted butter",
      "salt and pepper to taste",
      "4 tablespoons all-purpose flour",
      "1 teaspoon minced fresh sage",
      "1 teaspoon minced fresh thyme",
      "2 cups milk, divided",
      "2 cubes chicken bouillon",
      "0.25 cup minced fresh parsley"
    ],
    "instructions": [
      "In a skillet on medium heat cook pork, onion, green pepper, red pepper flakes, and garlic until pork is crumbly. Drain off excess fat, but leave a small amount.",
      "Combine butter, salt, and pepper with the meat mixture and stir until butter melts. Slowly sift flour over the top. Mix gently and allow mixture to cook for 5 minutes. It will burn, so do not let it sit unguarded. Don't forget to scrape the bottom of the pan. Add the sage and thyme.",
      "Slowly stir in milk, about a half a cup at a time, and incorporate it well. When the mixture thickens, add more milk. Do not let it boil vigorously, or it will burn. Add chicken bullion and let cook for five minutes. Again, if it thickens too much, add more milk. Adjust taste with more salt and pepper if needed.",
      "Just before serving, add the parsley, and about a 1/4 cup more milk; the gravy will thicken quickly as it cools."
    ],
    "nutrition_per_serving": {
      "calories": 700,
      "total_fat_g": 60.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 1.0,
      "sugar_g": 8.0,
      "protein_g": 20.0,
      "sodium_mg": 1389,
      "cholesterol_mg": 118,
      "saturated_fat_g": 25.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 246,
    "recipe_category": "Breakfast",
    "cuisine": "Southern",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/229355/grandmas-baking-powder-biscuits/",
    "category": "biscuits",
    "id": 229355,
    "name": "Grandma's Baking Powder Biscuits",
    "description": "Easy drop biscuits made with simple ingredients bake up golden brown in just a few minutes.",
    "author": "IMACOOKY1",
    "image": {
      "url": "https://www.allrecipes.com/thmb/xIDLwJGxpjbooyo8kCMoUIHmixU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/932085-7ed885f780724a38a2b8649dc84623af.jpg",
      "alt": "Grandma's Baking Powder Biscuits"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "12",
    "ingredients": [
      "2 cups all-purpose flour",
      "2 tablespoons white sugar",
      "4 teaspoons baking powder",
      "0.5 teaspoon cream of tartar",
      "0.5 teaspoon salt",
      "0.5 cup vegetable shortening",
      "1 egg",
      "0.66666668653488 cup milk"
    ],
    "instructions": [
      "Preheat an oven to 450 degrees F (230 degrees C).",
      "Sift flour, sugar, baking powder, cream of tartar, and salt into a bowl. Use a pastry cutter to chop vegetable shortening into the flour mixture until it resembles coarse crumbs. Whisk egg and milk together in a separate bowl and slowly add milk mixture to flour mixture, stirring as you pour, until dough is moistened and well-mixed. Drop dough by spoonfuls onto an ungreased baking sheet.",
      "Bake in the preheated oven until biscuits have risen and are golden brown, 10 to 12 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 173,
      "total_fat_g": 9.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 3.0,
      "sodium_mg": 271,
      "cholesterol_mg": 17,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 243,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/216981/deluxe-corned-beef-hash/",
    "category": "breakfast-potatoes",
    "id": 216981,
    "name": "Deluxe Corned Beef Hash",
    "description": "This corned beef hash combines cooked corned beef with crispy potatoes and onions for a delicious way to use up leftover St. Paddy's Day corned beef.",
    "author": "Debra Steward",
    "image": {
      "url": "https://www.allrecipes.com/thmb/LBqJkaS2wxwlwc16iVkCr5xgDb4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-216981-deluxe-corned-beef-hash-DDMFS-4x3-00fc2530ff484257900a6b5a860f0cde.jpg",
      "alt": "Deluxe Corned Beef Hash"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "8",
    "ingredients": [
      "2 tablespoons butter",
      "2 tablespoons extra-virgin olive oil",
      "1 large onion, chopped",
      "5 large Yukon Gold potatoes, peeled and cut into 1/4-inch cubes",
      "1 large carrot, coarsely shredded",
      "2 pounds cooked corned beef, cubed",
      "2 tablespoons chopped fresh parsley",
      "0.5 teaspoon ground black pepper, or to taste",
      "0.25 teaspoon dried thyme leaves",
      "1 pinch salt to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Melt butter with olive oil in a large skillet over medium heat. Cook and stir onion until lightly browned, about 8 minutes.",
      "Stir in potatoes and carrot; cook, stirring occasionally, until tender, about 15 minutes.",
      "Stir in corned beef, parsley, pepper, thyme, and salt. Cook, stirring often, until hash is crisp and browned, 10 to 15 more minutes.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 320,
      "total_fat_g": 14.0,
      "carbohydrates_g": 25.0,
      "fiber_g": 3.0,
      "sugar_g": 1.0,
      "protein_g": 25.0,
      "sodium_mg": 1559,
      "cholesterol_mg": 82,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 224,
    "recipe_category": "Breakfast",
    "cuisine": "Irish",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/144059/jumbo-breakfast-cookies/",
    "category": "breakfast-and-brunch",
    "id": 144059,
    "name": "Jumbo Breakfast Cookies",
    "description": "These breakfast cookies, made with oats, peanut butter, and whole grain crispy cereal, are easy to customize with your favorite healthy add-ins!",
    "author": "J Diamond",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Es0RNrW9JsJWtpep6SnItPOK4yk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/144059-Jumbo-Breakfast-Cookies-3x4-095-edf2895b944a4676aa412bcccf965cf2.jpg",
      "alt": "Jumbo Breakfast Cookies"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "24",
    "ingredients": [
      "2 cups white sugar",
      "1 cup peanut butter",
      "1 cup butter or margarine",
      "0.5 cup water",
      "2 tablespoons vanilla extract",
      "2 eggs",
      "2.25 cups all-purpose flour",
      "1 teaspoon baking soda",
      "0.5 teaspoon salt",
      "1.5 cups rolled oats",
      "1.5 cups raisins",
      "6 cups toasted oat cereal rings (such as Cheerios\u00ae)"
    ],
    "instructions": [
      "Gather the ingredients. Preheat the oven to 375 degrees F (190 degrees C).",
      "Mix sugar, peanut butter, butter, water, vanilla, and eggs together in a very large bowl until smooth.",
      "Combine flour, baking soda, and salt; stir into cookie batter. Mix in oats and raisins, then carefully stir in cereal.",
      "Drop 1/2 cupfuls of dough onto ungreased cookie sheets, spacing cookies about 4 inches apart. Flatten cookies to 1 inch thick.",
      "Bake in the preheated oven until cookies are lightly browned at the edges, about 10 to 12 minutes. Let stand on the cookie sheets for 5 minutes before removing to wire racks to cool completely.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 325,
      "total_fat_g": 14.0,
      "carbohydrates_g": 45.0,
      "fiber_g": 3.0,
      "sugar_g": 24.0,
      "protein_g": 6.0,
      "sodium_mg": 262,
      "cholesterol_mg": 36,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 216,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/234646/pumpkin-pie-muffins/",
    "category": "Pumpkin-Breads",
    "id": 234646,
    "name": "Pumpkin Pie Muffins",
    "description": "Transform all the ingredients for pumpkin pie into a muffin for a festive breakfast treat or snack during the holiday season.",
    "author": "PChicki",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OE-aIw3auBB-5jTDoOdsGD7zQ7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1583822-pumpkin-pie-muffins-Buckwheat-Queen-4x3-1-3b8179de039b4b14a8f109ae3290c264.jpg",
      "alt": "Pumpkin Pie Muffins"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": "24",
    "ingredients": [
      "1.5 cups whole wheat flour",
      "1.5 cups all-purpose flour",
      "5 teaspoons pumpkin pie spice",
      "2 teaspoons baking soda",
      "1.5 teaspoons salt",
      "1 (30 ounce) can pumpkin pie filling (such as Libby's\u00ae)",
      "3 cups white sugar, or more to taste",
      "0.5 cup vegetable oil",
      "0.5 cup water",
      "4 large eggs"
    ],
    "instructions": [
      "Preheat oven to 330 degrees F (166 degrees C). Grease 24 muffin cups or line with paper liners.",
      "Mix whole wheat flour, all-purpose flour, pumpkin pie spice, baking soda, and salt together in a large bowl. Whisk pumpkin pie filling, sugar, oil, water, and eggs together in a separate bowl until just mixed. Stir flour mixture, about 1/4 cup at a time, into pumpkin mixture until batter is just combined. Fill muffin cups with batter just below the brims.",
      "Bake in the preheated oven until a toothpick inserted in the center of a muffin comes out clean, about 30 minutes. Cool muffins on a wire rack."
    ],
    "nutrition_per_serving": {
      "calories": 241,
      "total_fat_g": 6.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 4.0,
      "sugar_g": 25.0,
      "protein_g": 3.0,
      "sodium_mg": 336,
      "cholesterol_mg": 31,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 212,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/228638/caramelized-butternut-squash-soup/",
    "category": "butternut-squash-soups",
    "id": 228638,
    "name": "Caramelized Butternut Squash Soup",
    "description": "Caramelized butternut squash soup recipe includes sweet honey, and a touch of nutmeg for extra flavor in this delicious pur\u00e9ed soup made with heavy cream.",
    "author": "Christel Boyd",
    "image": {
      "url": "https://www.allrecipes.com/thmb/RHN-UbtphzsCA_-y-yyJh8M7M0I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/974123-d2d19a41889d4a558269aecb4ed32de3.jpg",
      "alt": "Caramelized Butternut Squash Soup"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": "12",
    "ingredients": [
      "3 tablespoons extra-virgin olive oil",
      "3 pounds butternut squash, peeled and cubed",
      "1 large onion, sliced",
      "3 tablespoons butter",
      "1 tablespoon sea salt",
      "1 teaspoon freshly-cracked white pepper",
      "4 cups chicken broth, or more as needed",
      "0.25 cup honey",
      "0.5 cup heavy whipping cream",
      "1 pinch ground nutmeg, or more to taste"
    ],
    "instructions": [
      "Heat olive oil in a large pot over high heat. Add squash; cook and stir until completely browned, about 10 minutes. Add onion, butter, 1 tablespoon sea salt, and 1 teaspoon white pepper; cook and stir until onion is completely tender and beginning to brown, about 10 minutes.",
      "Add chicken broth and honey; bring to a boil. Reduce heat to medium-low; simmer until squash is tender, about 5 minutes.",
      "Fill blender halfway with soup. Cover and hold lid down with a potholder; pulse a few times before leaving on to blend. Pour into a pot. Repeat with remaining soup.",
      "Stir cream and nutmeg into pur\u00e9ed soup until well blended; season with sea salt and white pepper."
    ],
    "nutrition_per_serving": {
      "calories": 189,
      "total_fat_g": 10.0,
      "carbohydrates_g": 25.0,
      "fiber_g": 5.0,
      "sugar_g": 7.0,
      "protein_g": 3.0,
      "sodium_mg": 788,
      "cholesterol_mg": 23,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 210,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/85628/ultimate-irresistible-granola/",
    "category": "granola",
    "id": 85628,
    "name": "Ultimate Irresistible Granola",
    "description": "This is THE BEST granola out there. Walnuts, pecans, coconut, sesame seeds and honey are just a few of the delectable ingredients that make this the most delicious and nutty granola out there, you won't be disappointed!",
    "author": "Veronica Sackett",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jFlFS68eaqg86acB_ihYHADu4Jk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3863054-5211be01aaf44050aed86f792aa12e3d.jpg",
      "alt": "Ultimate Irresistible Granola"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "20",
    "ingredients": [
      "5 cups rolled oats",
      "1 cup blanched slivered almonds",
      "1 cup chopped walnuts",
      "1 cup chopped pecans",
      "1 cup sesame seeds",
      "1 cup wheat germ",
      "2 cups shredded coconut",
      "1 cup unsalted sunflower seeds",
      "1 cup canola oil",
      "1.5 cups honey",
      "1 cup raisins",
      "1 cup dried cranberries"
    ],
    "instructions": [
      "Preheat the oven to 325 degrees F (165 degrees C).",
      "In a large bowl, stir together the oats, almonds, walnuts, pecans, sesame seeds, wheat germ, coconut and sunflower seeds. In a small pan over medium heat, stir together the oil and honey. Cook and stir until blended. You could also do this in a large measuring cup in the microwave, heating for about 2 minutes and 30 seconds. Pour over the oat mixture, and stir to coat evenly. Spread out in an even layer on two cookie sheets.",
      "Bake for 20 minutes in the preheated oven, until the oats and nuts are toasted. Immediately after it comes out of the oven, stir in the raisins and dried cranberries. Let stand until cooled, and stir again to break up any large clusters. Store in an airtight container at room temperature for up to two weeks, but I guarantee it won't be around that long!"
    ],
    "nutrition_per_serving": {
      "calories": 532,
      "total_fat_g": 34.0,
      "carbohydrates_g": 56.0,
      "fiber_g": 7.0,
      "sugar_g": 31.0,
      "protein_g": 9.0,
      "sodium_mg": 9,
      "cholesterol_mg": 0,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 161,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/25162/betsys-mandarin-orange-salad/",
    "category": "fruit-salads",
    "id": 25162,
    "name": "Betsy's Mandarin Orange Salad",
    "description": "This spectacular salad features red leaf lettuce tossed with sugared almonds, mandarin orange segments and red onions, and topped with a sweet and tangy vinaigrette.",
    "author": "Doreen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/w3e6hPwqCHk1sWSWtcFmz1JWFQQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/880817-0877b72bfcf242f19805aeb2f9eb6bcc.jpg",
      "alt": "Betsy's Mandarin Orange Salad"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": null,
    "total_time_minutes": 25,
    "servings": "5",
    "ingredients": [
      "0.5 cup vegetable oil",
      "0.25 cup cider vinegar",
      "0.25 cup white sugar",
      "2 teaspoons dried parsley",
      "1 teaspoon salt",
      "1 pinch ground black pepper",
      "0.5 cup sliced almonds",
      "0.25 cup white sugar",
      "1 head red leaf lettuce - rinsed, dried and torn",
      "1 red onion, chopped",
      "1 cup chopped celery",
      "2 (11 ounce) cans mandarin orange segments, drained"
    ],
    "instructions": [
      "In a jar with a tight fitting lid, combine the oil, vinegar, sugar, parsley, salt and pepper. Cover and shake well. Refrigerate until use.",
      "In a medium saucepan over medium low heat, cook and stir the almonds and sugar until the sugar is melted and the almonds are coated. Remove from heat, cool, and break apart. Store at room temperature until ready to serve salad.",
      "In a large bowl, toss together the lettuce, celery, oranges, almonds and dressing until evenly coated."
    ],
    "nutrition_per_serving": {
      "calories": 397,
      "total_fat_g": 27.0,
      "carbohydrates_g": 38.0,
      "fiber_g": 3.0,
      "sugar_g": 33.0,
      "protein_g": 4.0,
      "sodium_mg": 509,
      "cholesterol_mg": 0,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 160,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/246803/avocado-toast-vegan/",
    "category": "road-trip-snacks",
    "id": 246803,
    "name": "Avocado Toast (Vegan)",
    "description": "This avocado toast recipe mashes avocado with lemon juice and parsley and spreads it on whole-grain toast for a hearty and delicious breakfast.",
    "author": "Carolyn Monroe",
    "image": {
      "url": "https://www.allrecipes.com/thmb/tuoOX5LzxEww-9HzfJYHzaCT6cI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3605756-4910cb02090848bebfbe1563270f38d9.jpg",
      "alt": "Avocado Toast (Vegan)"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "4",
    "ingredients": [
      "4 slices whole-grain bread",
      "1 avocado, halved and pitted",
      "2 tablespoons chopped fresh parsley",
      "1.5 teaspoons extra-virgin olive oil",
      "0.5 lemon, juiced",
      "0.5 teaspoon salt",
      "0.5 teaspoon ground black pepper",
      "0.5 teaspoon onion powder",
      "0.5 teaspoon garlic powder"
    ],
    "instructions": [
      "Toast bread in a toaster or toaster oven.",
      "Mash avocado, parsley, olive oil, lemon juice, salt, black pepper, onion powder, and garlic powder together in bowl using a potato masher; spread on top of toast slices."
    ],
    "nutrition_per_serving": {
      "calories": 170,
      "total_fat_g": 10.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 6.0,
      "sugar_g": 2.0,
      "protein_g": 5.0,
      "sodium_mg": 430,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 159,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/238379/easy-7-up-biscuits/",
    "category": "biscuits",
    "id": 238379,
    "name": "Easy 7-Up Biscuits",
    "description": "Quick and easy biscuits made with baking mix and lemon-lime soda are so moist and delicious you won't need any extra toppings.",
    "author": "Heidi M Hoiseck",
    "image": {
      "url": "https://www.allrecipes.com/thmb/EDDWxnFQExBZwilG6TYT1JKC4d4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6253717-easy-7-up-biscuits-Becky-Newman-4x3-1-2918babcdaf94a49839bef465655f15a.jpg",
      "alt": "Easy 7-Up Biscuits"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 40,
    "servings": "12",
    "ingredients": [
      "0.5 cup butter",
      "4.5 cups baking mix (such as Bisquick \u00ae)",
      "1 cup lemon-lime soda (such as 7-Up\u00ae)",
      "1 cup sour cream"
    ],
    "instructions": [
      "Preheat oven to 425 degrees F (220 degrees C). Put butter in a 9x13-inch baking dish and place dish in the preheating oven until butter is melted.",
      "Mix baking mix, lemon-lime soda, and sour cream together in a bowl until dough holds together and is sticky. Turn dough onto a floured work surface and roll into 1-inch thick circle. Cut circles out of dough using a cookie cutter or the rim of a wine glass and place in the melted butter.",
      "Bake in the preheated oven until biscuits are golden brown, 10 to 12 minutes. Remove dish from oven and let stand until biscuits have absorbed all the butter."
    ],
    "nutrition_per_serving": {
      "calories": 301,
      "total_fat_g": 19.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 4.0,
      "sodium_mg": 634,
      "cholesterol_mg": 29,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 134,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/25165/wilted-spinach-salad/",
    "category": "green-salads",
    "id": 25165,
    "name": "Wilted Spinach Salad",
    "description": "This wilted spinach salad with hard-boiled eggs is drizzled with a warm, sweet, vinegary dressing and sprinkled with bacon bits for a delightful meal.",
    "author": "CHPBD",
    "image": {
      "url": "https://www.allrecipes.com/thmb/RgVMBjCuXy5E9MXZjJv8dOGLZd0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25165-wilted-spinich-salad-DDMFS-Beauty-4x3-3409e8e5247148e6b06d00aa4b415c09.jpg",
      "alt": "Wilted Spinach Salad"
    },
    "prep_time_minutes": 30,
    "cook_time_minutes": 15,
    "total_time_minutes": 45,
    "servings": "8",
    "ingredients": [
      "6 eggs",
      "1 pound bacon",
      "2 bunches fresh spinach, rinsed and dried",
      "4 green onions, thinly sliced",
      "2 eggs",
      "0.25 cup white sugar",
      "0.25 cup white vinegar",
      "0.25 cup red wine vinegar"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Place 6 eggs in a medium saucepan with enough cold water to cover. Bring water to a boil, and immediately remove from heat. Cover, and let eggs stand in hot water for 10 to 12 minutes. Remove from hot water, cool, peel, and chop.",
      "Place bacon in a large, deep skillet. Cook over medium high heat until evenly brown. Drain, crumble, and set aside, reserving approximately 1/2 cup of drippings in the skillet.",
      "Toss spinach and green onions together in a large bowl.",
      "Heat the reserved drippings over low heat. Whisk 2 remaining eggs, sugar, white vinegar, and red wine vinegar together in a small bowl; add to warm drippings and whisk until thickened, about 1 minute.",
      "Pour warm dressing over spinach; add crumbled bacon and toss to coat. Garnish with chopped egg."
    ],
    "nutrition_per_serving": {
      "calories": 221,
      "total_fat_g": 13.0,
      "carbohydrates_g": 11.0,
      "fiber_g": 2.0,
      "sugar_g": 7.0,
      "protein_g": 16.0,
      "sodium_mg": 569,
      "cholesterol_mg": 207,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 127,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/258117/quick-crispy-home-fries/",
    "category": "breakfast-potatoes",
    "id": 258117,
    "name": "Quick and Crispy Home Fries",
    "description": "Learn how to make home fries crispy with Chef John's recipe. Precooked fries are cooled first, since a cold starch in a hot pan means a crispy exterior.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/R7q9Ftp6pbqG4VmqoM4V2LdIgdM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4516186-quick-crispy-home-fries-Chef-John-1x1-1-0dc41d131b2648e0849780ad49f77ee1.jpg",
      "alt": "Quick and Crispy Home Fries"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "3 large russet potatoes, peeled and quartered",
      "2 tablespoons olive oil",
      "1 tablespoon butter",
      "0.25 teaspoon paprika",
      "1 pinch cayenne pepper, or to taste",
      "1 pinch garlic powder",
      "1 pinch onion powder",
      "salt and ground black pepper to taste",
      "1 tablespoon chopped fresh chives"
    ],
    "instructions": [
      "Arrange potatoes evenly on a microwave-safe plate. Microwave on high until just tender, about 4 minutes. Let cool to room temperature. Cut potatoes into bite-sized chunks.",
      "Heat butter and olive oil in a nonstick skillet over medium-high heat until butter melts and starts to turn brown. Swirl the pan and add potatoes; shake the pan to arrange in an even layer. Season with paprika, cayenne, garlic powder, onion powder, salt, and pepper.",
      "Continue to toss potatoes and cook until reddish-brown, crusty, and crispy on the edges, 10 to 12 minutes. If potatoes are cooking too quickly, reduce the heat to medium. Garnish with chives."
    ],
    "nutrition_per_serving": {
      "calories": 306,
      "total_fat_g": 10.0,
      "carbohydrates_g": 51.0,
      "fiber_g": 4.0,
      "sugar_g": 0,
      "protein_g": 6.0,
      "sodium_mg": 35,
      "cholesterol_mg": 8,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 126,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235613/how-to-make-cream-biscuits/",
    "category": "biscuits",
    "id": 235613,
    "name": "How to Make Cream Biscuits",
    "description": "If you want a beautiful basket of hot biscuits sitting next to your holiday meal, give this delicious and super-simple recipe a try.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IYrYlaGKJkCQTtjn2RqmN87YZ9g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1070555-how-to-make-cream-biscuits-Chef-John-1x1-1-881a54d56670485aafaebd54e14eafaf.jpg",
      "alt": "How to Make Cream Biscuits"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "10",
    "ingredients": [
      "2 cups self-rising flour",
      "1 tablespoon white sugar",
      "1.5 cups heavy whipping cream",
      "2 tablespoons butter, melted, or as needed"
    ],
    "instructions": [
      "Move an oven rack to the enter position of your oven; preheat oven to 500 degrees F (260 degrees C). Line a baking sheet with aluminum foil.",
      "Combine self-rising flour and sugar in a mixing bowl; stir in cream until almost all the flour has been incorporated and dough is wet and sticky.",
      "Turn dough onto a well-floured work surface and gently press it into a rectangle about 1/2-inch thick. Use a bench scraper to lift up ends of dough and fold dough into thirds. Press dough again into a thick rectangle.",
      "Roll dough out into a 6x10-inch rectangle about 1/2-inch thick. Cut rounds from the dough using a 3-inch biscuit cutter. Gently press dough scraps together into a thick disk, roll out 1/2-inch thick, and cut 3 more biscuits. If any dough remains, lightly press it flat and cut one more biscuit from the remaining dough.",
      "Arrange biscuits on prepared baking sheet. Brush tops of biscuits generously with melted butter.",
      "Bake in the preheated oven until biscuits are golden brown, 10 to 12 minutes. Brush hot biscuits with melted butter again and let stand 2 to 3 minutes to cool slightly before serving."
    ],
    "nutrition_per_serving": {
      "calories": 237,
      "total_fat_g": 16.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 3.0,
      "sodium_mg": 347,
      "cholesterol_mg": 55,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 109,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/215189/fruit-and-yogurt-smoothie/",
    "category": "high-fiber",
    "id": 215189,
    "name": "Fruit and Yogurt Smoothie",
    "description": "This yogurt smoothie recipe blends strawberries, banana, pineapple juice, orange juice, and plain yogurt together for a delicious, refreshing drink.",
    "author": "Sarah",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Qx03ek_F5_clocpyE2aaZ-bq7Ac=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-215189-fruit-and-yogurt-smoothie-DDMFS-4x3-d5183e8688b8422293b89cd2562309de.jpg",
      "alt": "Fruit and Yogurt Smoothie"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "2",
    "ingredients": [
      "1 cup strawberries",
      "1 banana",
      "0.5 cup yogurt",
      "0.25 cup pineapple juice",
      "1.5 teaspoons white sugar",
      "1 teaspoon orange juice",
      "1 teaspoon milk"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Combine strawberries, banana, yogurt, pineapple juice, sugar, orange juice, and milk in a blender.",
      "Blend until smooth."
    ],
    "nutrition_per_serving": {
      "calories": 146,
      "total_fat_g": 1.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 3.0,
      "sugar_g": 22.0,
      "protein_g": 5.0,
      "sodium_mg": 45,
      "cholesterol_mg": 4,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 109,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/228585/blueberry-cornbread/",
    "category": "cornbread",
    "id": 228585,
    "name": "Blueberry Cornbread",
    "description": "In this blueberry cornbread recipe, the combination of sweet, tart blueberries with the savory base of cornbread creates the perfect snack or breakfast.",
    "author": "matt151617",
    "image": {
      "url": "https://www.allrecipes.com/thmb/t0VTCG_RD_vGUwIIL67L5MSqyS8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1001855-9ede5b003aa7406bb28bb674a997e077.jpg",
      "alt": "Blueberry Cornbread"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "6",
    "ingredients": [
      "1 cup cornmeal",
      "1 cup all-purpose flour",
      "0.5 cup white sugar",
      "3 teaspoons baking powder",
      "1 teaspoon salt",
      "0.66666668653488 cup milk",
      "0.5 cup vegetable oil",
      "2 eggs",
      "2 cups blueberries"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Grease a 9-inch square baking dish.",
      "Whisk cornmeal, flour, sugar, baking powder, and salt together in a bowl. Beat milk, oil, and eggs together in a separate large bowl; stir in cornmeal mixture until just combined. Fold in blueberries; pour into the prepared baking dish.",
      "Bake in the preheated oven until a toothpick inserted into center comes out clean, 25 to 30 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 453,
      "total_fat_g": 21.0,
      "carbohydrates_g": 60.0,
      "fiber_g": 3.0,
      "sugar_g": 23.0,
      "protein_g": 7.0,
      "sodium_mg": 668,
      "cholesterol_mg": 64,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 102,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/260471/loaded-breakfast-skillet/",
    "category": "breakfast-potatoes",
    "id": 260471,
    "name": "Loaded Breakfast Skillet",
    "description": "This breakfast skillet features flavorful layers of onions, potatoes, bacon, fried eggs, and Cheddar cheese seasoned with garlic and smoked paprika.",
    "author": "Dorinda Medley",
    "image": {
      "url": "https://www.allrecipes.com/thmb/3ZJuXJRPg86aWmYgLX2QOJ6skHU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-260471-loaded-breakfast-skillet-Keepers-3X4-e7bd39de082d4f79844bee07f01dc559.jpg",
      "alt": "Loaded Breakfast Skillet"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 40,
    "total_time_minutes": 55,
    "servings": "4",
    "ingredients": [
      "4 slices bacon, cut into 1-inch pieces",
      "1 onion, chopped",
      "3 russet potatoes, scrubbed, chopped into 3/4-inch cubes",
      "0.25 cup water",
      "2 green onions, sliced",
      "2 cloves garlic, minced",
      "0.5 teaspoon smoked paprika",
      "kosher salt and freshly ground pepper to taste",
      "4 large eggs",
      "1 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Cook bacon in a large skillet over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain on paper towels; reserve most of the bacon fat in the skillet.",
      "Crumble bacon and set aside.",
      "Reduce heat to medium. Cook and stir onion in reserved bacon fat until slightly softened, about 5 minutes. Add potatoes; toss to coat evenly in bacon fat. Pour in water and cover the skillet. Cook, stirring occasionally, until potatoes are tender, about 20 minutes.",
      "Mix in green onions, garlic, and paprika. Season with kosher salt and pepper. Make 4 wells in potato mixture using a wooden spoon, revealing the bottom of the skillet.",
      "Crack an egg into each well; season with salt and pepper.",
      "Sprinkle Cheddar cheese and bacon over the entire skillet.",
      "Cover and cook until egg whites are set and yolks are still runny, about 5 minutes. Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 418,
      "total_fat_g": 18.0,
      "carbohydrates_g": 43.0,
      "fiber_g": 4.0,
      "sugar_g": 3.0,
      "protein_g": 22.0,
      "sodium_mg": 567,
      "cholesterol_mg": 226,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 92,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236012/pancake-casserole/",
    "category": "breakfast-casseroles",
    "id": 236012,
    "name": "Pancake Casserole",
    "description": "Pancake casserole made with baking mix, Cheddar, bacon, and maple syrup is a family-pleasing breakfast for weekend mornings. Serve with maple syrup.",
    "author": "mom4life",
    "image": {
      "url": "https://www.allrecipes.com/thmb/brTL3zwK4GZd4W_n094Z6_-4HTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/236012pancake-casserolefabeveryday4x3-96454878430f46a39fe8b0d277210ece.jpg",
      "alt": "Pancake Casserole"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "8",
    "ingredients": [
      "2 cups baking mix (such as Bisquick \u00ae)",
      "2 cups shredded Cheddar cheese, divided",
      "1 cup milk",
      "5 tablespoons maple syrup",
      "2 eggs",
      "1.5 tablespoons white sugar",
      "12 slices cooked bacon, crumbled"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking pan.",
      "Mix baking mix, 1 cup Cheddar cheese, milk, maple syrup, eggs, and sugar together in a bowl; pour into prepared pan.",
      "Bake in the preheated oven until a toothpick inserted in the center comes out clean, 20 to 25 minutes. Sprinkle bacon and remaining 1 cup Cheddar cheese over casserole; return to oven until cheese is melted, about 5 more minutes."
    ],
    "nutrition_per_serving": {
      "calories": 311,
      "total_fat_g": 16.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 1.0,
      "sugar_g": 12.0,
      "protein_g": 12.0,
      "sodium_mg": 584,
      "cholesterol_mg": 79,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 68,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/152209/dijon-chicken-salad/",
    "category": "chicken-salads",
    "id": 152209,
    "name": "Dijon Chicken Salad",
    "description": "This Dijon chicken salad recipe uses canned chicken along with seedless red and green grapes, dried cranberries, and celery for a tasty, light lunch.",
    "author": "Susan C",
    "image": {
      "url": "https://www.allrecipes.com/thmb/_9fcLolf_gNAfVFnuHVws62yA4g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8406900_Dijon-Chicken-Salad-4x3-8a72e465bfbb4bc39ce3f9b414fdc99b.jpg",
      "alt": "Dijon Chicken Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "6",
    "ingredients": [
      "2 (10 ounce) cans chunk chicken",
      "1 cup sliced celery",
      "1 cup halved seedless green grapes",
      "1 cup halved seedless red grapes",
      "0.25 cup dried cranberries",
      "2 teaspoons dried chives",
      "2 tablespoons honey",
      "1 tablespoon Dijon mustard",
      "0.75 cup mayonnaise",
      "0.5 teaspoon salt",
      "0.125 teaspoon ground black pepper"
    ],
    "instructions": [
      "Mix together chicken, celery, green grapes, red grapes, cranberries, and chives in a large bowl.",
      "Whisk together honey, mustard, mayonnaise, salt, and pepper in a medium bowl. Pour over chicken mixture and stir to coat."
    ],
    "nutrition_per_serving": {
      "calories": 432,
      "total_fat_g": 30.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 1.0,
      "sugar_g": 19.0,
      "protein_g": 21.0,
      "sodium_mg": 900,
      "cholesterol_mg": 68,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 68,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8496144/apple-fritter-pancakes/",
    "category": "breakfast-and-brunch",
    "id": 8496144,
    "name": "Apple Fritter Pancakes",
    "description": "Chef John's apple fritter pancakes taste wonderful for breakfast topped with some warmed maple syrup.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ENwEz2TBq2TbZG1SryttGrk7XDA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8496144-apple-fritter-pancakes-VAT-hero-02-4x3-715c84e950754f878b2c91c98b7355c0.jpg",
      "alt": "Apple Fritter Pancakes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 6,
    "total_time_minutes": 16,
    "servings": "2",
    "ingredients": [
      "1 large egg",
      "1 tablespoon white sugar",
      "0.125 teaspoon ground cinnamon, or to taste",
      "1 pinch ground ginger",
      "1 pinch nutmeg",
      "0.25 teaspoon kosher salt",
      "0.125 teaspoon pure vanilla extract",
      "1 cup shredded apple",
      "1 teaspoon lemon juice",
      "0.5 cup all-purpose flour, or as needed",
      "0.25 teaspoon baking powder",
      "0.125 teaspoon baking soda",
      "2 tablespoons melted butter"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Combine egg, sugar, cinnamon, ginger, nutmeg, kosher salt, and vanilla extract in a bowl. Whisk until well combined and lightly foamy. Add shredded apple and lemon juice and fold in with a spatula until well combined. Add flour, baking powder, and baking soda. Mix until flour disappears and batter is thick yet spoonable.",
      "Melt butter in a skillet over medium heat. Add tablespoonfuls of apple batter to the hot butter and cook until browned, about 3 minutes. Turn and cook until apple pancakes spring back to the touch and are browned on the other side, an additional 3 minutes.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 314,
      "total_fat_g": 15.0,
      "carbohydrates_g": 40.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 7.0,
      "sodium_mg": 498,
      "cholesterol_mg": 124,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 63,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236141/cathead-biscuits/",
    "category": "biscuits",
    "id": 236141,
    "name": "Cathead Biscuits",
    "description": "This is the old-time recipe from our grandmamas. Wonderful and tasty heavy biscuit. Great with homemade sausage gravy.",
    "author": "Hollinhead77",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nlP6PVqNEIKm6HhmhKctRd61UpI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2275456-cathead-biscuits-StephW-4x3-1-8f547e7da4ae478890d44da7a1b3c7c4.jpg",
      "alt": "Cathead Biscuits"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "8",
    "ingredients": [
      "4 cups self-rising flour (such as WhiteLily\u00ae)",
      "1 pinch salt",
      "3 tablespoons room-temperature vegetable shortening (such as Crisco\u00ae), or as needed",
      "1.75 cups buttermilk, or as needed",
      "0.25 cup melted butter for brushing, or to taste"
    ],
    "instructions": [
      "Preheat an oven to 475 degrees F (245 degrees C). Grease an 8-inch cake pan.",
      "Sift flour and salt together into a large mixing bowl. Make a dent in flour by pushing flour from center toward sides of bowl. Add 2 walnut-size lumps of shortening and a splash of buttermilk to the flour where you made the dent. Work the shortening into the flour using fingers in a twisting motion (rub thumb against pointer and middle finger motion) until the shortening is fully incorporated into the flour.",
      "Pour buttermilk into the flour about 1/4 cup at a time, continuing to work it in with your fingers until the buttermilk is completely incorporated into a sticky dough.",
      "Roll dough into 8 large balls and drop into prepared cake pan, working around the outside and putting the last one in middle to fill the pan. Press dough balls with back of fingers to flatten until they touch and are about 3/4- to 1-inch thick.",
      "Bake in preheated oven until the tops are golden brown, 15 to 20 minutes. Brush tops with melted butter."
    ],
    "nutrition_per_serving": {
      "calories": 336,
      "total_fat_g": 12.0,
      "carbohydrates_g": 49.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 8.0,
      "sodium_mg": 910,
      "cholesterol_mg": 17,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 60,
    "recipe_category": "Breakfast",
    "cuisine": "Southern",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23182/vanilla-berry-parfaits/",
    "category": "mousses",
    "id": 23182,
    "name": "Vanilla Berry Parfaits",
    "description": "Delicious and easy, this is a fabulous mix of berries and yogurt! If you like, you can make a thin layer of graham crackers or granola in each vanilla/berry layer. That gives it a little more crunch.",
    "author": "Rebecca",
    "image": {
      "url": "https://www.allrecipes.com/thmb/JtTscGTKwu710IBGjNJAa8obXPY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23182-vanilla-berry-parfaits-4x3-2895ad812ba544c09506d9d7cf75dee8.jpg",
      "alt": "Vanilla Berry Parfaits"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "2",
    "ingredients": [
      "2 (8 ounce) containers vanilla yogurt",
      "1 (10 ounce) package frozen mixed berries",
      "2 tablespoons crushed graham crackers",
      "0.125 teaspoon ground nutmeg"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Cover the bottoms of two small glasses with a layer of yogurt. Cover layer with berries.",
      "Repeat until both glasses are full, ending with a fruit layer. Sprinkle with graham crackers and nutmeg."
    ],
    "nutrition_per_serving": {
      "calories": 354,
      "total_fat_g": 4.0,
      "carbohydrates_g": 69.0,
      "fiber_g": 3.0,
      "sugar_g": 33.0,
      "protein_g": 14.0,
      "sodium_mg": 186,
      "cholesterol_mg": 11,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 57,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/233655/chef-johns-beef-sliders/",
    "category": "sliders",
    "id": 233655,
    "name": "Chef John's Beef Sliders",
    "description": "These flavorful beef sliders are topped with tomato and a dollop of Chef John's secret sauce. Perfect for football Sunday or Super Bowl parties.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DfEQnYnU_9_XN880rz7Fd9Fqbe4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1549595-566165c8c9b840eda90e6b71d896ce11.jpg",
      "alt": "Chef John's Beef Sliders"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "1 pound ground beef",
      "16 paper muffin liners",
      "salt and ground black pepper to taste",
      "2 tablespoons mayonnaise",
      "1 tablespoon ketchup",
      "1 tablespoon Dijon mustard",
      "1 tablespoon sweet pickle relish",
      "8 slider-size burger buns, cut almost through horizontally",
      "8 slices roma (plum) tomato"
    ],
    "instructions": [
      "Place ground beef onto a work surface; divide into 8 equal-size pieces using a knife or pastry cutter. Line 8 muffin cups with paper liners.",
      "Sprinkle bottoms of paper liners with salt and black pepper. Form each piece of burger into a rough ball and place into a muffin cup. Season tops with salt and pepper.",
      "Place a second paper liner on top of each piece of meat and gently press it down to shape the mini burger into a round, flat shape. Pull off the paper tops and remove burgers from the muffin cups; remove bottom paper liners from burgers.",
      "Heat a large nonstick skillet over medium-high heat. Cook burgers in the hot skillet until they have a browned crust and are slightly pink in the middle, about 3 minutes per side. Flip burgers and cook 3 minutes on other side. Remove burgers to a plate to rest for 2 minutes.",
      "Mix mayonnaise, ketchup, mustard, and pickle relish in a bowl; spoon a dollop onto each bun. Place burgers onto buns, season with more black pepper, and top with a tomato slice. Close buns and serve."
    ],
    "nutrition_per_serving": {
      "calories": 214,
      "total_fat_g": 11.0,
      "carbohydrates_g": 160.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 12.0,
      "sodium_mg": 155,
      "cholesterol_mg": 36,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 56,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/278328/chaffles-with-almond-flour/",
    "category": "keto",
    "id": 278328,
    "name": "Chaffles with Almond Flour",
    "description": "This chaffle recipe uses almond flour, an egg, and mozzarella to make 2 cheesy waffles that are perfect for a low-carb breakfast or sandwich!",
    "author": "lutzflcat",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ySAP2zUfrIc74myQLlM551BxqNs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7618556-0d17f28400984b19b55f014891f43294.jpg",
      "alt": "Chaffles with Almond Flour"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "2",
    "ingredients": [
      "1 large egg",
      "1 tablespoon blanched almond flour",
      "0.25 teaspoon baking powder",
      "0.5 cup shredded mozzarella cheese",
      "cooking spray"
    ],
    "instructions": [
      "Whisk egg, almond flour, and baking powder together in a bowl. Stir in mozzarella cheese; set batter aside.",
      "Preheat a waffle iron according to the manufacturer's instructions.",
      "Spray both sides of the preheated waffle iron with cooking spray. Pour 1/2 of the batter onto the waffle iron and spread it out from the center with a spoon. Close the waffle maker and cook until chaffle reaches your desired doneness, about 3 minutes. Carefully lift chaffle out of the waffle iron and repeat with remaining batter. Allow chaffles to cool and crisp up, about 2 to 3 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 132,
      "total_fat_g": 9.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 11.0,
      "sodium_mg": 271,
      "cholesterol_mg": 111,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 55,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/229652/simply-the-best-chicken-waldorf-salad/",
    "category": "chicken-salads",
    "id": 229652,
    "name": "Simply The Best Chicken Waldorf Salad",
    "description": "A version of popular Waldorf salad made with chicken breasts, roasted walnuts, apple, dried cranberries, and grapes is served in a light mayonnaise and yogurt dressing.",
    "author": "Jackie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/3UAX7Fr-ml3NmifYSa6TdLhBg28=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6311885-simply-the-best-chicken-waldorf-salad-weedak-4x3-1-f5bceef7847c472b8371117efa40c7a0.jpg",
      "alt": "Simply The Best Chicken Waldorf Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 5,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "0.5 cup chopped walnuts",
      "2 cooked rotisserie chicken breasts, cubed",
      "1 cup seedless red grapes, halved",
      "0.5 cup dried cranberries",
      "0.5 Granny Smith apple, cored and cubed",
      "0.25 cup chopped red onion",
      "0.5 cup mayonnaise",
      "0.5 cup vanilla yogurt",
      "2 teaspoons lemon juice"
    ],
    "instructions": [
      "Preheat oven to 325 degrees F (165 degrees C).",
      "Spread chopped walnuts onto a baking sheet.",
      "Roast walnuts in the preheated oven until they are fragrant and browned, 3 to 5 minutes. Remove and let cool.",
      "Lightly toss chicken with grape halves, cranberries, apple, walnuts, and onion in a salad bowl. Whisk mayonnaise, vanilla yogurt, and lemon juice in a separate bowl. Pour dressing over salad and toss again to coat."
    ],
    "nutrition_per_serving": {
      "calories": 476,
      "total_fat_g": 34.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 3.0,
      "sugar_g": 24.0,
      "protein_g": 18.0,
      "sodium_mg": 210,
      "cholesterol_mg": 49,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 48,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/219773/mom-moaks-chicken-noodle-soup/",
    "category": "chicken-noodle-soups",
    "id": 219773,
    "name": "Mom Moak's Chicken Noodle Soup",
    "description": "Mom Moak's chicken noodle soup recipe saves time with the use of cooked, rotisserie, or leftover chicken, and gets its creaminess from evaporated milk.",
    "author": "carolann moak",
    "image": {
      "url": "https://www.allrecipes.com/thmb/hCEY_H5C6OR6omSsER4z4ybhlQY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/996489-b5deaba2b9eb403dbd1e1d93b65b08da.jpg",
      "alt": "Mom Moak's Chicken Noodle Soup"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 35,
    "total_time_minutes": 55,
    "servings": "6",
    "ingredients": [
      "1 tablespoon vegetable oil",
      "2 stalks celery, sliced",
      "2 carrots, sliced",
      "1 onion, chopped",
      "4 (10.5 ounce) cans chicken broth",
      "4 baking potatoes, peeled and diced",
      "0.25 teaspoon poultry seasoning",
      "0.25 pinch dried thyme",
      "2 cups shredded cooked chicken",
      "2 cups egg noodles",
      "1 cup evaporated milk"
    ],
    "instructions": [
      "Heat vegetable oil in a stock pot over medium heat. Add celery, carrots, and onion; cook and stir until tender, 8 to 10 minutes. Add chicken broth, potatoes, poultry seasoning, and thyme; bring to a simmer and continue cooking until potatoes are cooked through, about 15 minutes.",
      "Stir chicken, egg noodles, and evaporated milk into soup; cook until noodles are cooked through, 7 to 10 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 329,
      "total_fat_g": 9.0,
      "carbohydrates_g": 44.0,
      "fiber_g": 5.0,
      "sugar_g": 10.0,
      "protein_g": 18.0,
      "sodium_mg": 1067,
      "cholesterol_mg": 51,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 44,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/221175/cauliflower-and-egg-salad/",
    "category": "egg-salads",
    "id": 221175,
    "name": "Cauliflower and Egg Salad",
    "description": "This cauliflower salad with egg features shaved carrots and green onions tossed in a creamy mayo dressing flavored with mustard and sweet relish.",
    "author": "Rosalie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/okWna5nWQ9sXliCHIwlkmE9woxQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/875532-b2af36d1db0f4e5d86aee26c8fa17160.jpg",
      "alt": "Cauliflower and Egg Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "4 cups cauliflower, broken into small florets",
      "3 hard-boiled eggs, diced",
      "0.5 small carrot, peeled and shaved into strips using a vegetable peeler",
      "3 small green onions, chopped",
      "5 tablespoons sweet pickle relish",
      "5 tablespoons light mayonnaise",
      "1 tablespoon mustard",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Cook cauliflower in boiling water until tender, about 10 minutes; drain.",
      "Mix together cauliflower, eggs, carrot, green onions, relish, mayonnaise, and mustard in a large bowl until well combined. Season with salt and black pepper."
    ],
    "nutrition_per_serving": {
      "calories": 116,
      "total_fat_g": 7.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 2.0,
      "sugar_g": 6.0,
      "protein_g": 5.0,
      "sodium_mg": 269,
      "cholesterol_mg": 110,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 41,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/232454/lettuce-leaf-tacos/",
    "category": "lettuce-wraps",
    "id": 232454,
    "name": "Lettuce Leaf Tacos",
    "description": "These Mexican ground beef lettuce wraps make a tasty alternative on taco nights. Perfect for a lighter option or if you're avoiding carbs.",
    "author": "asliceofpi",
    "image": {
      "url": "https://www.allrecipes.com/thmb/xyXnX3158rO5tFzgRI6dfPPwmzQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2233942-4fdaf5a5a49a4e138a513edf3a308113.jpg",
      "alt": "Lettuce Leaf Tacos"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "1 green bell pepper, chopped",
      "1 yellow onion, chopped",
      "2 tablespoons olive oil",
      "2 tablespoons chicken stock",
      "1 pound ground beef",
      "3 tablespoons taco seasoning",
      "2 large roma (plum) tomatoes, chopped",
      "0.5 teaspoon salt",
      "1 (8 ounce) package shredded Cheddar cheese",
      "12 large romaine lettuce leaves"
    ],
    "instructions": [
      "Cook and stir green bell pepper and yellow onion in a skillet over medium heat with olive oil and chicken broth until onion is translucent, about 5 minutes.",
      "Place ground beef in a separate skillet over medium heat. Cook and stir with taco seasoning until beef is browned and crumbly, 5 to 8 minutes. Drain excess grease.",
      "Sprinkle tomatoes with salt in a bowl. Place Cheddar cheese into a separate bowl.",
      "Fill each lettuce leaf with about 2 tablespoons beef filling; top with 1 to 2 teaspoons green pepper mixture, tomato, and about 1 1/2 tablespoons Cheddar cheese."
    ],
    "nutrition_per_serving": {
      "calories": 550,
      "total_fat_g": 39.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 3.0,
      "sugar_g": 6.0,
      "protein_g": 35.0,
      "sodium_mg": 1223,
      "cholesterol_mg": 128,
      "saturated_fat_g": 18.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 37,
    "recipe_category": "Lunch",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/259245/keto-cinnamon-granola/",
    "category": "granola",
    "id": 259245,
    "name": "Keto Cinnamon Granola",
    "description": "If you love something crunchy-sweet in the morning, this homemade keto cinnamon granola recipe is quick, easy, flavorful, and low in carbs.",
    "author": "Andrew Long",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IEH852Tx8SnjEPQzfB8pyz1ShO4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9213793-c6cc0b80298f47df87c8132913f5b3e4.jpg",
      "alt": "Keto Cinnamon Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 8,
    "total_time_minutes": 18,
    "servings": "8",
    "ingredients": [
      "0.5 cup coarsely chopped walnuts",
      "0.5 cup coarsely chopped pecans",
      "0.5 cup unsweetened shredded coconut",
      "0.33333334326744 cup sliced almonds",
      "1 teaspoon ground cinnamon",
      "2 teaspoons granulated erythritol sweetener (such as Swerve\u00ae)",
      "1 (1 gram) packet granular sucrolose sweetener (such as Splenda\u00ae), or more to taste",
      "2 tablespoons butter, melted"
    ],
    "instructions": [
      "Preheat oven to 375 degrees F (190 degrees C).",
      "Mix walnuts, pecans, coconut, and almonds together in a bowl.",
      "Stir cinnamon, erythritol, and sucralose into melted butter; pour over nut mixture and stir to coat. Spread granola in a single layer on a baking sheet.",
      "Bake in the preheated oven until crunchy, 8 to 10 minutes. Remove from oven; stir and allow to cool."
    ],
    "nutrition_per_serving": {
      "calories": 183,
      "total_fat_g": 18.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 3.0,
      "sugar_g": 1.0,
      "protein_g": 3.0,
      "sodium_mg": 23,
      "cholesterol_mg": 8,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 28,
    "recipe_category": "Breakfast",
    "meal_type": "study",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/261054/hawaiian-roll-roast-beef-and-cheese-sandwiches/",
    "category": "sliders",
    "id": 261054,
    "name": "Hawaiian Roll Roast Beef and Cheese Sandwiches",
    "description": "This roast beef slider recipe makes easy bite-sized sandwiches with soft Hawaiian rolls, roast beef, Swiss cheese, and a sweet, buttery onion glaze.",
    "author": "Ellie Wolfenson",
    "image": {
      "url": "https://www.allrecipes.com/thmb/V9-Kthgf7M1cTdQnGTUDh7D57Pk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/261054-Hawaiin-roll-roast-beef-and-cheese-sandwich-ddmfs-4x3.2708-58733cfea28942c494dd6e2db5a095fd.jpg",
      "alt": "Hawaiian Roll Roast Beef and Cheese Sandwiches"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 40,
    "total_time_minutes": 55,
    "servings": "12",
    "ingredients": [
      "0.5 cup prepared horseradish",
      "1 (12 count) package Hawaiian bread rolls, split",
      "12 slices deli roast beef",
      "12 slices deli-sliced Swiss cheese",
      "0.5 cup butter",
      "1 onion, finely chopped",
      "2 tablespoons brown sugar",
      "1 tablespoon spicy brown mustard",
      "1.5 teaspoons Worcestershire sauce",
      "1 pinch garlic powder, or to taste",
      "2 teaspoons poppy seeds"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.",
      "Spread horseradish on the bottoms of the Hawaiian bread rolls. Top each with 1 slice roast beef and 1 slice Swiss cheese, then cover with top bread rolls. Place sandwiches in the prepared baking dish.",
      "Melt butter in a saucepan over medium heat. Cook and stir onion, brown sugar, spicy mustard, Worcestershire sauce, and garlic powder in butter until onion is soft and translucent, about 5 minutes. Pour over sandwiches and sprinkle rolls with poppy seeds. Cover the dish with aluminum foil.",
      "Bake in the preheated oven until heated through, about 25 minutes. Remove foil and continue baking until tops are lightly browned, about 10 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 445,
      "total_fat_g": 13.0,
      "carbohydrates_g": 48.0,
      "fiber_g": 3.0,
      "sugar_g": 4.0,
      "protein_g": 24.0,
      "sodium_mg": 635,
      "cholesterol_mg": 87,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 28,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/232171/brown-bears/",
    "category": "camping-recipes",
    "id": 232171,
    "name": "Brown Bears",
    "description": "Brown bears are campfire bread made from canned biscuit dough, butter, white sugar, and ground cinnamon. Both kids and grown-ups will love the recipe.",
    "author": "cookinmomma",
    "image": {
      "url": "https://www.allrecipes.com/thmb/j2UGNIA0L4MfsH2KvyZg9x4ezsI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-recipe-232171-brown-bears-VAT-4x3-945036262dfa4e4b80a6a5d0a1cb9ffc.jpg",
      "alt": "Brown Bears"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "1 cup white sugar",
      "0.25 cup ground cinnamon",
      "0.5 cup butter, melted",
      "1 (10 ounce) can refrigerated biscuit dough"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Mix sugar and cinnamon together in a shallow bowl. Pour melted butter into a separate shallow bowl.",
      "Separate biscuits; form each dough piece into a rope 4 to 5 inches long. Wrap dough pieces around skewers.",
      "Hold skewers over campfire; slowly turn until biscuit dough is browned and set, 8 to 10 minutes.",
      "Dip biscuits into melted butter, then dredge in cinnamon-sugar."
    ],
    "nutrition_per_serving": {
      "calories": 320,
      "total_fat_g": 16.0,
      "carbohydrates_g": 43.0,
      "fiber_g": 2.0,
      "sugar_g": 28.0,
      "protein_g": 3.0,
      "sodium_mg": 432,
      "cholesterol_mg": 31,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 23,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/244512/roasted-beet-arugula-and-walnut-salad/",
    "category": "green-salads",
    "id": 244512,
    "name": "Arugula Beet Salad",
    "description": "This arugula beet salad is made with tender roasted beets and walnuts tossed with an easy vinaigrette for a colorful, crunchy salad that happens to be vegan.",
    "author": "Adelma Lilliston",
    "image": {
      "url": "https://www.allrecipes.com/thmb/KdE0M78-ANQI-F6Sh9kOw8iUQ48=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2474916-c3f53d037da94c65a17f58f116727f78.jpg",
      "alt": "Arugula Beet Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "4",
    "ingredients": [
      "3 large beets, peeled and cut into cubes",
      "2 tablespoons olive oil, divided",
      "0.5 teaspoon coarse salt, divided",
      "0.25 teaspoon ground black pepper, divided",
      "1 bunch arugula, torn",
      "0.33333334326744 cup walnuts",
      "0.25 cup balsamic vinegar"
    ],
    "instructions": [
      "Preheat the oven to 425 degrees F (220 degrees C).",
      "Mix beets, 1 tablespoon olive oil, 1/4 teaspoon salt, and 1/8 teaspoon black pepper together on a baking sheet.",
      "Roast in the preheated oven until beets are tender, about 40 minutes.",
      "Mix roasted beets, arugula, walnuts, balsamic vinegar, 1 tablespoon olive oil, 1/4 teaspoon salt, and 1/8 teaspoon pepper together in a bowl until well combined."
    ],
    "nutrition_per_serving": {
      "calories": 231,
      "total_fat_g": 14.0,
      "carbohydrates_g": 24.0,
      "fiber_g": 7.0,
      "sugar_g": 16.0,
      "protein_g": 6.0,
      "sodium_mg": 406,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 21,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236693/nannys-newfoundland-tea-biscuits/",
    "category": "biscuits",
    "id": 236693,
    "name": "Nanny's Newfoundland Tea Biscuits",
    "description": "Light and delicious tea biscuits are a traditional favorite in Newfoundland, a must to serve with tea.",
    "author": "carynliles",
    "image": {
      "url": "https://www.allrecipes.com/thmb/t_-Q_wOEdCT23RAiNvrbPd3LG2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1123934-c5a53042bbd64ff7ab9eea8a8a4221a7.jpg",
      "alt": "Nanny's Newfoundland Tea Biscuits"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "24",
    "ingredients": [
      "4 cups all-purpose flour",
      "5 teaspoons baking powder",
      "0.5 cup raisins",
      "1 cup milk",
      "3 eggs",
      "0.5 cup butter, softened",
      "0.5 cup white sugar",
      "1 pinch salt"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Grease 2 baking sheets.",
      "Whisk flour and baking powder together in a bowl; stir in raisins. Whisk milk and eggs together in a separate bowl.",
      "Beat butter, sugar, and salt together in a bowl with an electric mixer until light and fluffy, about 1 minute. Beat in egg mixture, then stir in flour mixture until just combined.",
      "Turn dough out onto a lightly floured surface and pat or roll out until 1-inch thick. Cut into 24 biscuits with a biscuit cutter or juice glass; place onto the prepared baking sheets.",
      "Bake in the preheated oven until golden brown, about 10 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 149,
      "total_fat_g": 5.0,
      "carbohydrates_g": 23.0,
      "fiber_g": 1.0,
      "sugar_g": 7.0,
      "protein_g": 3.0,
      "sodium_mg": 143,
      "cholesterol_mg": 34,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 13,
    "recipe_category": "Breakfast",
    "cuisine": "Canadian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/215075/fasoulia-breakfast-kidney-bean-dish/",
    "category": "camping-recipes",
    "id": 215075,
    "name": "Fasoulia (Breakfast Kidney Bean Dish)",
    "description": "Get your day going with a bowl of fasoulia \u2014 flavorsome kidney beans in a spicy tomato, onion, and jalape\u00f1o sauce. Perfect with pita bread.",
    "author": "AiyahM",
    "image": {
      "url": "https://www.allrecipes.com/thmb/PgN6WOKsfIAXW5t6l9_fEuKoCMQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7891989-cd15c4f069084f85a201c5b9fd5b7706.jpg",
      "alt": "Fasoulia (Breakfast Kidney Bean Dish)"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "3 tablespoons olive oil",
      "1 large onion, chopped",
      "1 jalapeno pepper, finely chopped, or more to taste",
      "1 tomato, chopped",
      "2 teaspoons tomato paste",
      "2 (15 ounce) cans dark red kidney beans, undrained",
      "1.5 teaspoons ground cumin",
      "1.5 teaspoons curry powder",
      "salt and black pepper to taste"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium heat; cook onion, stirring occasionally, until translucent, about 5 minutes.",
      "Stir in jalape\u00f1o pepper; cook and stir until softened, about 5 more minutes.",
      "Mix in tomato and tomato paste; stir well to combine. Pour in kidney beans with their liquid; stir in cumin and curry powder. Bring to a boil, reduce heat to medium-low, and simmer until beans are hot and sauce has thickened, about 15 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 298,
      "total_fat_g": 11.0,
      "carbohydrates_g": 39.0,
      "fiber_g": 15.0,
      "sugar_g": 3.0,
      "protein_g": 13.0,
      "sodium_mg": 481,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 13,
    "recipe_category": "Breakfast",
    "cuisine": "Middle Eastern",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/228504/monster-breakfast-cookies/",
    "category": "Purim",
    "id": 228504,
    "name": "Monster Breakfast Cookies",
    "description": "This breakfast cookie is packed with grains and seeds to help give a quick boost you can just grab and go!",
    "author": "QuentinJess Flokstra",
    "image": {
      "url": "https://www.allrecipes.com/thmb/pg2NHbieJqjEpnwvTV3QEGaohgg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4545981-7561ed9913b14661b60c483e9c972e34.jpg",
      "alt": "Monster Breakfast Cookies"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "20",
    "ingredients": [
      "0.5 cup butter",
      "1 cup brown sugar",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "0.5 cup vegetable oil",
      "0.5 cup honey",
      "3 cups oats",
      "2.5 cups whole wheat flour",
      "0.5 cup ground flax seed",
      "0.25 cup sesame seeds",
      "0.25 cup poppy seeds",
      "0.25 cup flax seeds",
      "1 teaspoon baking soda",
      "1.5 teaspoons ground cinnamon",
      "1 cup raisins"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Lightly grease 4 baking sheets.",
      "Beat butter and sugar with an electric mixer in a large bowl until smooth. Beat the first egg into the butter until completely blended. Add second egg with vanilla extract; continue beating. Continue beating while adding vegetable oil, honey, oats, whole wheat flour, ground flax seed, sesame seeds, poppy seeds, flax seeds, baking soda, and ground cinnamon, respectively. Fold raisins into the dough.",
      "Use a 1/4 cup measuring cup to create monster cookie size and drop onto prepared baking sheets.",
      "Bake in the preheated oven until edges are just browning, about 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 337,
      "total_fat_g": 16.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 5.0,
      "sugar_g": 23.0,
      "protein_g": 6.0,
      "sodium_mg": 111,
      "cholesterol_mg": 31,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 6,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/257968/chilaquiles/",
    "category": "chilaquiles",
    "id": 257968,
    "name": "Chilaquiles with Spicy Salsa",
    "description": "A chilaquiles dish made with crispy tortilla strips, tomatoes, chile de arbol peppers, and eggs for a tasty Mexican breakfast or brunch.",
    "author": "20JEN",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nUvm3U78ecrg4SsQ8UQL3cu2HVc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4571726-4079ae95deb742b7a36f8854b91e41ba.jpg",
      "alt": "Chilaquiles with Spicy Salsa"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 34,
    "servings": "4",
    "ingredients": [
      "2 tomatoes, chopped",
      "6 dried chile de arbol peppers",
      "1 onion, sliced",
      "2 cloves garlic, minced",
      "1 teaspoon chicken bouillon granules",
      "salt to taste",
      "water to cover",
      "2 tablespoons vegetable oil, or to taste",
      "2 (6 inch) corn tortillas, cut into strips",
      "4 eggs"
    ],
    "instructions": [
      "Combine tomatoes, chile de arbol peppers, onion, garlic, chicken bouillon, and salt in a saucepan; add enough water to cover. Bring to a boil; reduce heat and cook, stirring occasionally, until tomatoes and peppers soften, 5 to 10 minutes.",
      "Transfer chile peppers to a blender using a slotted spoon; blend until smooth. Pour in tomato mixture; blend until smooth.",
      "Heat oil in a large skillet over medium heat. Cook and stir tortilla strips in the hot oil until crispy, 3 to 5 minutes. Crack in eggs; stir until scrambled and set, about 5 minutes. Strain blended sauce over tortillas and eggs; mix well."
    ],
    "nutrition_per_serving": {
      "calories": 329,
      "total_fat_g": 12.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 2.0,
      "sugar_g": 4.0,
      "protein_g": 13.0,
      "sodium_mg": 221,
      "cholesterol_mg": 164,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/242249/maple-pecan-granola-with-dried-fruit/",
    "category": "granola",
    "id": 242249,
    "name": "Maple Pecan Granola with Dried Fruit",
    "description": "Homemade maple pecan granola with plenty of spiced dried fruit is a crunchy topping for yogurt or great by itself!",
    "author": "Hope",
    "image": {
      "url": "https://www.allrecipes.com/thmb/7bAdy6_lW73Hje2xfYqOG5Xo3No=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3178002-31cdd90b63fb4eea86e7e50b1379d9b9.jpg",
      "alt": "Maple Pecan Granola with Dried Fruit"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 60,
    "servings": "20",
    "ingredients": [
      "6 cups old-fashioned oats",
      "1.5 cups finely chopped pecans",
      "0.5 cup finely chopped almonds",
      "0.5 cup vegetable oil",
      "0.5 cup pure maple syrup",
      "0.33333334326744 cup boiling water",
      "2 teaspoons ground cinnamon",
      "1 teaspoon ground cardamom",
      "0.75 cup minced dates",
      "0.75 cup minced raisins",
      "0.66666668653488 cup minced dried cranberries"
    ],
    "instructions": [
      "Preheat oven to 325 degrees F (165 degrees C).",
      "Mix oats, pecans, and almonds together in a bowl. Whisk oil, maple syrup, and water together in a measuring cup and pour over oat mixture; stir until evenly coated. Spread oat mixture onto 2 baking sheets.",
      "Bake in the preheated oven for 12 minutes; stir and continue baking for 12 minutes more. Stir and bake until granola is golden brown, about 12 minutes more. Cool to room temperature.",
      "Mix cinnamon and cardamom together in a container with a lid; add dates, raisins, and cranberries. Cover container and shake until fruit is coated. Stir dried fruit into cooled granola."
    ],
    "nutrition_per_serving": {
      "calories": 278,
      "total_fat_g": 14.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 5.0,
      "sugar_g": 15.0,
      "protein_g": 5.0,
      "sodium_mg": 3,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241207/auntie-maes-irish-bread/",
    "category": "irish-soda-bread",
    "id": 241207,
    "name": "Auntie Mae's Irish Bread",
    "description": "This traditional recipe for Irish soda bread has been passed down through multiple generations and produces a tried-and-true result every time.",
    "author": "NancyShaw",
    "image": {
      "url": "https://www.allrecipes.com/thmb/SJLGr8L4nxsBwbHDLxyfKi1YPOQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2157495-a94ffd0f0d584bf0982741e67ca6d49e.jpg",
      "alt": "Auntie Mae's Irish Bread"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 50,
    "total_time_minutes": 60,
    "servings": "12",
    "ingredients": [
      "3 cups all-purpose flour",
      "1.25 cups milk, or more as needed",
      "1 cup raisins",
      "0.75 cup white sugar",
      "2 tablespoons caraway seeds",
      "1 tablespoon vegetable oil",
      "2 teaspoons baking powder",
      "1 teaspoon baking soda",
      "0.25 teaspoon salt"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Grease an 8-inch round glass baking dish.",
      "Mix flour, milk, raisins, sugar, caraway seeds, vegetable oil, baking powder, baking soda, and salt together in a bowl until dough is not wet enough to pour and not dry enough to handle. Add more milk if dough is too dry. Transfer dough to the baking dish.",
      "Bake in the preheated oven until a toothpick inserted in the center comes out clean, about 50 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 230,
      "total_fat_g": 2.0,
      "carbohydrates_g": 49.0,
      "fiber_g": 2.0,
      "sugar_g": 22.0,
      "protein_g": 5.0,
      "sodium_mg": 247,
      "cholesterol_mg": 2,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "cuisine": "Irish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/273782/chicken-avocado-and-bacon-lettuce-wrap/",
    "category": "lettuce-wraps",
    "id": 273782,
    "name": "Chicken, Avocado, and Bacon Lettuce Wrap",
    "description": "This recipe uses leftover rotisserie chicken to create an easy and delicious bacon lettuce wrap with avocado, onion, and tomato.",
    "author": "ERIKIM21",
    "image": {
      "url": "https://www.allrecipes.com/thmb/EgWQLp7t1p_rCtpLaeZsHdcZf8c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6697947-f42b7ddc60f94fb894a49b822dcfcca3.jpg",
      "alt": "Chicken, Avocado, and Bacon Lettuce Wrap"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "1",
    "ingredients": [
      "2 slices bacon",
      "0.33333334326744 cup shredded rotisserie chicken",
      "coarse salt and ground black pepper to taste",
      "1 avocado",
      "1 tablespoon lemon juice",
      "1 clove garlic, minced",
      "1 tomato, chopped",
      "1 onion, chopped",
      "2 lettuce leaves, or as needed"
    ],
    "instructions": [
      "Place bacon in a large skillet and cook over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain bacon slices on paper towels, reserving grease in skillet.",
      "Add chicken to skillet and stir to coat with bacon drippings. Season with salt and pepper.",
      "Mash avocado in a bowl and season with lemon juice, garlic, salt, and pepper. Add tomato and onion to taste.",
      "Divide cooked bacon, chicken, and avocado spread between lettuce leaves and wrap up."
    ],
    "nutrition_per_serving": {
      "calories": 584,
      "total_fat_g": 41.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 18.0,
      "sugar_g": 11.0,
      "protein_g": 26.0,
      "sodium_mg": 629,
      "cholesterol_mg": 54,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.7,
    "review_count": 3,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/",
    "category": "kosher",
    "id": 21014,
    "name": "Good Old-Fashioned Pancakes",
    "description": "This easy pancake recipe makes delicious, fluffy homemade pancakes from scratch with basic ingredients you probably already have in your pantry!",
    "author": "dakota kelly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ywrODZNVX6SDdyA3XqkgeqBF1M4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-good-old-fashioned-pancakes-VAT-004-4x3-02-d6ce3b61def840fcaf40a43f805b733e.jpg",
      "alt": "Good Old-Fashioned Pancakes"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "8",
    "ingredients": [
      "1.5 cups all-purpose flour",
      "3.5 teaspoons baking powder",
      "1 tablespoon white sugar",
      "0.25 teaspoon salt, or more to taste",
      "1.25 cups milk",
      "3 tablespoons butter, melted",
      "1 egg"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Sift flour, baking powder, sugar, and salt together in a large bowl. Make a well in the center and add milk, melted butter, and egg; mix until smooth.",
      "Heat a lightly oiled griddle or pan over medium-high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake; cook until bubbles form and the edges are dry, about 2 to 3 minutes.",
      "Flip and cook until browned on the other side. Repeat with remaining batter.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 158,
      "total_fat_g": 6.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 1.0,
      "sugar_g": 4.0,
      "protein_g": 5.0,
      "sodium_mg": 504,
      "cholesterol_mg": 38,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 20069,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/12974/butternut-squash-soup/",
    "category": "butternut-squash-soups",
    "id": 12974,
    "name": "Butternut Squash Soup with Cream Cheese",
    "description": "This butternut squash soup with cream cheese is blended for a smooth and creamy texture. Marjoram and cayenne pepper add even more delicious flavor.",
    "author": "Mary",
    "image": {
      "url": "https://www.allrecipes.com/thmb/JXOa4dNWdtfEEtWNglxezCcRGSk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/195750-99bf67de50344f0c8a6c8b273d6ed163.jpg",
      "alt": "Butternut Squash Soup with Cream Cheese"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": 30,
    "total_time_minutes": 55,
    "servings": "6",
    "ingredients": [
      "4 tablespoons margarine",
      "6 cups peeled and cubed butternut squash",
      "6 tablespoons chopped onion",
      "3 cups water",
      "4 cubes chicken bouillon",
      "0.5 teaspoon dried marjoram",
      "0.25 teaspoon ground black pepper",
      "0.125 teaspoon ground cayenne pepper",
      "2 (8 ounce) packages cream cheese"
    ],
    "instructions": [
      "Melt margarine in a large saucepan over medium-low heat. Add onion and saut\u00e9 until soft and translucent, about 5 minutes. Add butternut squash, water, bouillon, marjoram, black pepper, and cayenne pepper.",
      "Bring to a boil over medium-high heat; reduce heat and simmer until squash is tender, about 20 minutes.",
      "Pur\u00e9e squash mixture and cream cheese in a blender or food processor in batches until smooth. Return to saucepan and cook until just heated through."
    ],
    "nutrition_per_serving": {
      "calories": 398,
      "total_fat_g": 33.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 3.0,
      "sugar_g": 4.0,
      "protein_g": 8.0,
      "sodium_mg": 1081,
      "cholesterol_mg": 83,
      "saturated_fat_g": 18.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 3373,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21135/e-z-drop-biscuits/",
    "category": "biscuits",
    "id": 21135,
    "name": "E-Z Drop Biscuits",
    "description": "Quick and easy drop biscuits that taste great with butter and jam or plain with sausage and gravy.",
    "author": "Angela",
    "image": {
      "url": "https://www.allrecipes.com/thmb/N0VqWnh6EETvcJPb6vY-lryjx_w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5576551-bc2e8a0883934b4fb6390f1c19653389.jpg",
      "alt": "E-Z Drop Biscuits"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "12",
    "ingredients": [
      "2 cups all-purpose flour",
      "1 tablespoon baking powder",
      "2 teaspoons white sugar",
      "0.5 teaspoon cream of tartar",
      "0.25 teaspoon salt",
      "0.5 cup melted butter",
      "1 cup milk"
    ],
    "instructions": [
      "Preheat oven to 450 degrees F (230 degrees C).",
      "In a large bowl, combine flour, baking powder, sugar, cream of tartar and salt. Stir in butter and milk just until moistened. Drop batter on a lightly greased cookie sheet by the tablespoon.",
      "Bake in preheated oven until golden on the edges, about 8 to 12 minutes. Serve warm."
    ],
    "nutrition_per_serving": {
      "calories": 155,
      "total_fat_g": 8.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 3.0,
      "sodium_mg": 196,
      "cholesterol_mg": 22,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 1326,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/6874/best-ever-muffins/",
    "category": "kosher",
    "id": 6874,
    "name": "Best Ever Muffins",
    "description": "These muffins can be your starting point for a range of sweet and savory muffins, depending on what you add. From berries to bacon \u2014 it's up to you!",
    "author": "Lori",
    "image": {
      "url": "https://www.allrecipes.com/thmb/2N4nB0qbWKcIka_wxaPazzFrPgY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6874-Best-Ever-Muffins-DDMFS-4x3-1388-1f15dbdcaf7b4141bc8eafb91cb9ada3.jpg",
      "alt": "Best Ever Muffins"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "12",
    "ingredients": [
      "2 cups all-purpose flour",
      "3 teaspoons baking powder",
      "0.5 teaspoon salt",
      "0.75 cup white sugar",
      "1 egg",
      "1 cup milk",
      "0.25 cup vegetable oil"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 400 degrees F (200 degrees C). Grease a 12-cup muffin tin or line cups with paper liners.",
      "Stir flour, baking powder, salt, and sugar together in a large bowl; make a well in the center.",
      "Beat egg with a fork in a small bowl or 2-cup measuring cup; whisk in milk and oil.",
      "Pour egg mixture all at once into flour mixture; mix quickly and lightly with a fork until just moistened. The batter will be lumpy. (Fold in additional ingredients if using; see variations below).",
      "Spoon batter into the prepared muffin cups, filling each 3/4 full.",
      "Bake in the preheated oven until tops spring back when lightly pressed, about 25 minutes.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 182,
      "total_fat_g": 6.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 1.0,
      "sugar_g": 14.0,
      "protein_g": 3.0,
      "sodium_mg": 233,
      "cholesterol_mg": 17,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 1308,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/191885/vegan-pancakes/",
    "category": "vegan",
    "id": 191885,
    "name": "Vegan Pancakes",
    "description": "These vegan pancakes are light, fluffy, and delicious. The dairy-free batter is easy to make with pantry ingredients for perfect pancakes every time!",
    "author": "NICDELIS",
    "image": {
      "url": "https://www.allrecipes.com/thmb/lAjsaSmT8Fbb6mFAiWK7hNPwJdU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/191885-vegan-pancakes-DDMFS-4x3-a9467f894f0b4599a1e188752d00fd6c.jpg",
      "alt": "Vegan Pancakes"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "3",
    "ingredients": [
      "1.25 cups all-purpose flour",
      "2 tablespoons white sugar",
      "2 teaspoons baking powder",
      "0.5 teaspoon salt",
      "1.25 cups water",
      "1 tablespoon oil"
    ],
    "instructions": [
      "Sift flour, sugar, baking powder, and salt into a large bowl; make a well in the center. Whisk together water and oil in a small bowl.",
      "Pour oil and water into flour mixture.",
      "Stir just until blended; mixture will be lumpy.",
      "Heat a lightly oiled griddle over medium-high heat.",
      "Drop batter by large spoonfuls onto the griddle. Cook until bubbles form and edges are dry. Flip, then cook until bottoms are browned, 1 to 2 minutes. Repeat with remaining batter.",
      "Serve with berries."
    ],
    "nutrition_per_serving": {
      "calories": 264,
      "total_fat_g": 5.0,
      "carbohydrates_g": 49.0,
      "fiber_g": 1.0,
      "sugar_g": 9.0,
      "protein_g": 5.0,
      "sodium_mg": 717,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 866,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/24145/easy-cream-cheese-danish/",
    "category": "danishes",
    "id": 24145,
    "name": "Easy Cream Cheese Danish",
    "description": "This recipe makes the best cream cheese Danish I have ever tasted. It is very simple to make.",
    "author": "Natalie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/iPCfFVTpJqSThIhZSfHHVnt6GS8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9133257-easy-cream-cheese-danish-Mindyl-4x3-1-4729446fefd54b7890d58c87a60da801.jpg",
      "alt": "Easy Cream Cheese Danish"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "10",
    "ingredients": [
      "2 (10 ounce) cans refrigerated crescent roll dough",
      "2 (8 ounce) packages cream cheese, diced",
      "0.75 cup white sugar",
      "1.5 teaspoons lemon juice",
      "1 teaspoon vanilla extract",
      "2 teaspoons sour cream",
      "1 cup confectioners' sugar",
      "1 tablespoon milk",
      "1 tablespoon butter, softened"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Lightly grease a 9x13 inch baking pan.",
      "Line bottom of baking pan with 1 can of crescent rolls. Pinch all seams together to seal.",
      "In a large bowl, mix together cream cheese, white sugar, lemon juice, vanilla extract and sour cream. Spread filling on top of rolls. Place second can of rolls on top of filling.",
      "Bake in preheated oven for 20 to 30 minutes.",
      "In a small bowl, stir together confectioners' sugar, milk and butter. After Danish has cooled, drizzle with icing."
    ],
    "nutrition_per_serving": {
      "calories": 498,
      "total_fat_g": 29.0,
      "carbohydrates_g": 51.0,
      "fiber_g": 0,
      "sugar_g": 32.0,
      "protein_g": 8.0,
      "sodium_mg": 582,
      "cholesterol_mg": 53,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 614,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/24822/carols-chicken-salad/",
    "category": "chicken-salads",
    "id": 24822,
    "name": "Carol's Chicken Salad",
    "description": "Tender chicken breast chunks are mixed with sweet green grapes, diced Swiss cheese, crunchy celery, and minced green onions, and folded into a tangy, creamy dressing.",
    "author": "Sharon Sisson",
    "image": {
      "url": "https://www.allrecipes.com/thmb/muWD3ih7hN5cjksLXYBZaeE8_sY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5351185-carols-chicken-sala-LynnInHK-4x3-1-6e6f4b4a6b374b308a66be3c5a7d6a60.jpg",
      "alt": "Carol's Chicken Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "9",
    "ingredients": [
      "0.5 cup mayonnaise",
      "0.5 teaspoon salt",
      "0.75 teaspoon poultry seasoning",
      "0.25 teaspoon onion powder",
      "0.25 teaspoon garlic powder",
      "0.25 teaspoon ground black pepper",
      "1 tablespoon lemon juice",
      "3 cups diced, cooked chicken breast meat",
      "0.5 cup finely chopped celery",
      "0.5 cup chopped green onions",
      "1 (8 ounce) can water chestnuts, drained and chopped",
      "1.5 cups diced Swiss cheese",
      "1.5 cups halved green grapes"
    ],
    "instructions": [
      "In a medium bowl, whisk together the mayonnaise, salt, poultry seasoning, onion powder, garlic powder, pepper, and lemon juice.",
      "In a large bowl, toss together the chicken, celery, green onions, water chestnuts, Swiss cheese, and grapes. Add the mayonnaise mixture, and stir to coat. Chill until serving."
    ],
    "nutrition_per_serving": {
      "calories": 293,
      "total_fat_g": 20.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 1.0,
      "sugar_g": 6.0,
      "protein_g": 19.0,
      "sodium_mg": 279,
      "cholesterol_mg": 60,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 558,
    "recipe_category": "Lunch",
    "meal_type": "fitness",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/88758/easy-spicy-roasted-potatoes/",
    "category": "breakfast-potatoes",
    "id": 88758,
    "name": "Easy, Spicy Roasted Potatoes",
    "description": "Spicy roasted potatoes made with chili powder and other seasonings are sprinkled with Cheddar cheese for a nice addition to a weekend breakfast.",
    "author": "Yolanda Miles",
    "image": {
      "url": "https://www.allrecipes.com/thmb/HJ5fuVfNFTp7_TKMW69vbwsD19A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/548200-b056004ffeee4a5ab7e031790a2d8d53.jpg",
      "alt": "Easy, Spicy Roasted Potatoes"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 35,
    "total_time_minutes": 60,
    "servings": "4",
    "ingredients": [
      "5 medium red potatoes, diced with peel",
      "1 medium onion, chopped",
      "1 tablespoon garlic powder",
      "1 tablespoon kosher salt",
      "2 teaspoons chili powder",
      "0.25 cup extra virgin olive oil",
      "1 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Preheat the oven to 450 degrees F (220 degrees C). Grease a 9x13-inch baking dish.",
      "Evenly distribute potatoes and onions in the prepared baking dish. Season with garlic powder, kosher salt, and chili powder. Drizzle with olive oil and stir until well coated.",
      "Bake in the preheated oven, stirring every 10 minutes, until potatoes are fork-tender and slightly crispy, 35 to 40 minutes. Remove from the oven and immediately sprinkle Cheddar cheese over top. Let sit until cheese melts, about 5 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 473,
      "total_fat_g": 26.0,
      "carbohydrates_g": 48.0,
      "fiber_g": 6.0,
      "sugar_g": 5.0,
      "protein_g": 14.0,
      "sodium_mg": 1685,
      "cholesterol_mg": 36,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 473,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/231510/amazing-muffin-cups/",
    "category": "breakfast-potatoes",
    "id": 231510,
    "name": "Amazing Muffin Cups",
    "description": "You'll love these breakfast egg muffins with hash brown crusts filled with eggs, sausage, bell pepper, and cheese. Plate them up or eat them on the go!",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/7y7ZvRvGUJFpounSMFE7W_QWHEI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4589482-amazing-muffin-cups-From-the-Kitchen-at-Johnsonville-Sausage-1x1-1-dce376cdb81142dd9f8b1c419af986d9.jpg",
      "alt": "Amazing Muffin Cups"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": 25,
    "total_time_minutes": 50,
    "servings": "12",
    "ingredients": [
      "12 links Johnsonville\u00ae Original breakfast sausage",
      "3 cups frozen country style shredded hash brown potatoes, thawed",
      "3 tablespoons butter, melted",
      "0.125 teaspoon salt",
      "0.125 teaspoon pepper",
      "2 cups shredded 4-cheese Mexican blend cheese",
      "6 large eggs, lightly beaten",
      "0.25 cup chopped red bell pepper",
      "1 teaspoon chopped fresh chives, or to taste"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Grease a 12-cup muffin pan.",
      "Heat a nonstick skillet over medium-low heat. Add sausage links and cook, turning frequently, until well browned, 12 to 16 minutes. An instant-read thermometer inserted into the center should read 160 degrees F (70 degrees C).",
      "While the sausage is cooking, mix hash browns, melted butter, salt, and pepper together in a bowl until well combined. Press mixture into the bottom and sides of the prepared muffin cups.",
      "Bake in the preheated oven until lightly browned, about 12 minutes.",
      "Cut sausage into 1/2-inch pieces. Stir cheese, beaten eggs, and bell pepper together in a bowl.",
      "Remove hash brown crusts from the oven. Divide sausage between crusts, then spoon egg mixture over top. Sprinkle with chives.",
      "Return to the oven and bake until set, 13 to 15 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 224,
      "total_fat_g": 18.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 1.0,
      "sugar_g": 0.0,
      "protein_g": 11.0,
      "sodium_mg": 413,
      "cholesterol_mg": 114,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 399,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/93132/stovetop-granola/",
    "category": "granola",
    "id": 93132,
    "name": "Stovetop Granola",
    "description": "A delicious quick and easy granola with almonds and dried cranberries that is made on the stovetop.",
    "author": "mamaiscookin",
    "image": {
      "url": "https://www.allrecipes.com/thmb/NTuG98lAV_-GSUhT9nsNvrTPV98=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1230306-stovetop-granol-Nakia-1x1-1-26cd0b9dfa9f4ace91ce0a0e0a2acd44.jpg",
      "alt": "Stovetop Granola"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 tablespoon olive oil",
      "2 cups rolled oats",
      "0.33333334326744 cup butter",
      "2 tablespoons honey",
      "0.33333334326744 cup packed brown sugar",
      "0.5 cup chopped almonds",
      "0.33333334326744 cup dried cranberries"
    ],
    "instructions": [
      "Heat the oil in a large skillet over medium-high heat. Add oats then cook and stir until starting to brown and crisp, about 5 minutes. Remove from heat and spread out on a cookie sheet to cool.",
      "Melt the butter in the same pan over medium heat. Stir in the honey and brown sugar; cook, stirring constantly, until bubbly. Return the oats to the pan. Cook and stir for another 5 minutes or so. Pour out onto the cookie sheet and spread to cool.",
      "Once cool, transfer to an airtight container and stir in the almonds and dried cranberries. Any additional nuts and fruit can be stirred in at this time also."
    ],
    "nutrition_per_serving": {
      "calories": 529,
      "total_fat_g": 30.0,
      "carbohydrates_g": 60.0,
      "fiber_g": 7.0,
      "sugar_g": 28.0,
      "protein_g": 9.0,
      "sodium_mg": 115,
      "cholesterol_mg": 41,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 358,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/234702/quick-almond-flour-pancakes/",
    "category": "gluten-free",
    "id": 234702,
    "name": "Quick Almond Flour Pancakes",
    "description": "These almond flour pancakes are naturally gluten-free and a delicious and filling way to start your day. Serve with your favorite pancake toppings.",
    "author": "Allie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/z6tQRzAcaMdvkkaCzvEPUlEunWU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-234702-quick-almond-flour-pancakes-DDMFS-4x3-hero-b38342e16a1a4a0dbc9eb4f7063409e6.jpg",
      "alt": "Quick Almond Flour Pancakes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "1 cup almond flour",
      "0.25 cup water",
      "2 eggs",
      "1 tablespoon maple syrup",
      "0.25 teaspoon salt",
      "1 teaspoon oil, or as needed"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Whisk almond flour, water, eggs, maple syrup, and salt together in a large bowl until smooth.",
      "Heat oil on a griddle over medium heat. Drop batter by large spoonfuls onto the griddle.",
      "Cook until bubbles form and edges are dry, 3 to 5 minutes. Flip and cook until bottoms are browned, 3 to 5 minutes.",
      "Repeat with remaining batter. Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 221,
      "total_fat_g": 18.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 4.0,
      "sugar_g": 4.0,
      "protein_g": 9.0,
      "sodium_mg": 169,
      "cholesterol_mg": 93,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 343,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/15034/mandarin-almond-salad/",
    "category": "green-salads",
    "id": 15034,
    "name": "Mandarin Almond Salad",
    "description": "Romaine, Mandarin oranges and green onions are coated with a sweet, sour and peppery dressing and then sprinkled with lovely sugared almonds.",
    "author": "BDEGER",
    "image": {
      "url": "https://www.allrecipes.com/thmb/yo5gLrks9aA86BbJ3AiGh0lX32w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/55229-a7ba491d9b024e1eacef005803023f84.jpg",
      "alt": "Mandarin Almond Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 40,
    "servings": "8",
    "ingredients": [
      "1 head romaine lettuce - rinsed, dried and chopped",
      "2 (11 ounce) cans mandarin oranges, drained",
      "6 green onions, thinly sliced",
      "2 tablespoons white sugar",
      "0.5 cup sliced almonds",
      "0.25 cup red wine vinegar",
      "0.5 cup olive oil",
      "1 tablespoon white sugar",
      "0.125 teaspoon crushed red pepper flakes",
      "ground black pepper to taste"
    ],
    "instructions": [
      "In a large bowl, combine the romaine lettuce, oranges and green onions.",
      "Heat 2 tablespoons sugar with the almonds in saucepan over medium heat. Cook and stir while sugar starts to melt and coat almonds. Stir constantly until almonds are light brown. Turn onto a plate, and cool for 10 minutes.",
      "Combine red wine vinegar, olive oil, one tablespoon sugar, red pepper flakes and black pepper in a jar with a tight fitting lid. Shake vigorously until sugar is dissolved.",
      "Before serving, toss lettuce with salad dressing until coated. Transfer to a decorative serving bowl, and sprinkle with sugared almonds."
    ],
    "nutrition_per_serving": {
      "calories": 235,
      "total_fat_g": 17.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 2.0,
      "sugar_g": 17.0,
      "protein_g": 2.0,
      "sodium_mg": 12,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 256,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/147539/steves-famous-garlic-home-fries/",
    "category": "breakfast-potatoes",
    "id": 147539,
    "name": "Steve's Famous Garlic Home Fries",
    "description": "Steve's famous garlic home fries recipe cooks potatoes in butter, seasons them with garlic, paprika, salt, pepper, and chives, and yields lots of flavor.",
    "author": "BACHELORSTEVE",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mufGcHK6_K5wL0yEfygiRTXULN0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7233078-7a412fd2b5524574b7865d763992a3c2.jpg",
      "alt": "Steve's Famous Garlic Home Fries"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "8",
    "ingredients": [
      "0.25 cup butter or margarine",
      "4 (8 ounce) russet potatoes, quartered and sliced",
      "1 clove garlic, minced",
      "0.25 teaspoon paprika",
      "0.25 teaspoon salt",
      "0.25 teaspoon ground black pepper",
      "2 teaspoons chopped fresh chives"
    ],
    "instructions": [
      "Melt butter in a large skillet over medium heat. Add potatoes in an even layer; cover and cook for 5 minutes.",
      "Season with garlic, paprika, salt, and black pepper; stir to coat. Cover; cook 15 minutes more, flipping potatoes occasionally. Stir in chives.",
      "Increase heat to medium-high; cook until potatoes are tender, about 10 minutes more, stirring frequently."
    ],
    "nutrition_per_serving": {
      "calories": 139,
      "total_fat_g": 6.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 3.0,
      "sugar_g": 1.0,
      "protein_g": 2.0,
      "sodium_mg": 121,
      "cholesterol_mg": 15,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 165,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/257429/egg-roll-bowl/",
    "category": "egg-rolls",
    "id": 257429,
    "name": "Egg Roll Bowl",
    "description": "This breakfast egg roll bowl features all the basic egg roll ingredients (pork, cabbage, soy sauce, and sesame oil) with no deep-fried wrappers.",
    "author": "ComerCastIron",
    "image": {
      "url": "https://www.allrecipes.com/thmb/1OYX_Zd_sQ_GM4NAKNDITEiyWWQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/257429-egg-roll-bowl-ddmfs-Beauty-3x4-be2eb66e6a8e4a76a52bd6480f98f158.jpg",
      "alt": "Egg Roll Bowl"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "1 pound bulk pork sausage",
      "1 (16 ounce) package coleslaw mix",
      "0.25 cup soy sauce",
      "0.25 cup toasted sesame oil",
      "1 tablespoon grated ginger",
      "1 clove garlic, minced",
      "1 tablespoon lemon zest",
      "1 teaspoon chopped fresh cilantro"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Cook and stir sausage in a large skillet over medium heat until browned and crumbly, about 10 minutes. Drain excess grease.",
      "Stir coleslaw mix, soy sauce, sesame oil, ginger, and garlic into the skillet. Cook until coleslaw softens, about 8 minutes.",
      "Stir in lemon zest and cilantro; cook until the flavors combine, about 2 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 682,
      "total_fat_g": 58.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 3.0,
      "sugar_g": 12.0,
      "protein_g": 23.0,
      "sodium_mg": 2051,
      "cholesterol_mg": 107,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 162,
    "recipe_category": "Breakfast",
    "cuisine": "Asian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/45729/chilaquiles-ii/",
    "category": "chilaquiles",
    "id": 45729,
    "name": "Chilaquiles",
    "description": "This chilaquiles recipe makes a quick and easy Mexican breakfast of crispy tortilla pieces fried with onions, salsa, eggs, and lots of cheese.",
    "author": "Jessica Mariscal",
    "image": {
      "url": "https://www.allrecipes.com/thmb/zkgyoiOepROKfMa2eQQ7hJVXTHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/45729-chilaquiles-VAT-003-4x3-02-1-ee1f317d2ccf4eb7bdea4760813ae1da.jpg",
      "alt": "Chilaquiles"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "10",
    "ingredients": [
      "2 cups oil for frying",
      "30 (6 inch) corn tortillas, torn into strips",
      "0.25 cup chopped onion",
      "6 eggs, lightly beaten",
      "2 teaspoons salt",
      "1 (7.75 ounce) can Mexican style hot tomato sauce",
      "0.5 cup water",
      "0.5 cup shredded Monterey Jack cheese"
    ],
    "instructions": [
      "Gather all ingredients. Heat oil in a large, heavy skillet to 350 degrees F (175 degrees C).",
      "Fry tortillas and onion in hot oil until crisp and golden brown, stirring frequently.",
      "Remove to a paper towel-lined plate to drain. Drain the skillet, leaving only a thin residue of oil.",
      "Place the skillet over medium heat. Return fried tortillas and onion to the skillet and stir in beaten eggs; season with salt. Cook and stir until eggs are firm.",
      "Stir in tomato salsa and water. Reduce heat and simmer until thickened, about 10 minutes.",
      "Sprinkle with cheese and continue cooking until cheese is melted."
    ],
    "nutrition_per_serving": {
      "calories": 279,
      "total_fat_g": 11.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 10.0,
      "sodium_mg": 677,
      "cholesterol_mg": 117,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 128,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/222600/fluffy-whole-wheat-biscuits/",
    "category": "biscuits",
    "id": 222600,
    "name": "Fluffy Whole Wheat Biscuits",
    "description": "These whole wheat biscuits made with all-purpose and whole wheat flour bake up light and fluffy and are ready to eat in less than 30 minutes.",
    "author": "redwine",
    "image": {
      "url": "https://www.allrecipes.com/thmb/8F7sQOBpss_uXnIHvPF4cshprys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/863849-fluffy-whole-wheat-biscuits-MrsFisher0729-4x3-1-12086d602d294c31ace54ddd67a4a245.jpg",
      "alt": "Fluffy Whole Wheat Biscuits"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "12",
    "ingredients": [
      "1 cup all-purpose flour",
      "1 cup whole wheat flour",
      "4 teaspoons baking powder",
      "1 tablespoon white sugar",
      "0.75 teaspoon salt",
      "0.25 cup butter",
      "1 cup buttermilk"
    ],
    "instructions": [
      "Preheat the oven to 450 degrees F (230 degrees C).",
      "Combine all-purpose flour, whole wheat flour, baking powder, sugar, and salt in a large bowl. Cut in cold butter with 2 knives or a pastry blender until the mixture resembles coarse crumbs; stir in buttermilk until just moistened.",
      "Turn dough out on a lightly floured surface; knead gently 8 to 10 times. Roll out to about 3/4-inch thick. Use a 2 1/2-inch round biscuit cutter to cut biscuits; reroll any scraps to cut more biscuits. Place biscuits on an ungreased baking sheet.",
      "Bake in preheated oven until biscuits are lightly browned, 10 to 12 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 119,
      "total_fat_g": 4.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 3.0,
      "sodium_mg": 357,
      "cholesterol_mg": 11,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 124,
    "recipe_category": "Breakfast",
    "meal_type": "study",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/17658/restaurant-style-house-salad/",
    "category": "green-salads",
    "id": 17658,
    "name": "Restaurant-Style House Salad",
    "description": "This is a very nice chopped salad with two kinds of lettuce, artichoke hearts, red onion and pimento thrown in for a bit of color and sweetness. The vinegar and oil dressing has lots of Parmesan cheese, and pours deliciously over this salad for six.",
    "author": "Louise",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-NmU_QyJmMohveBU0W7MiraQwFs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4479962-67d62c6738294919bb32d44ab1a5d9f8.jpg",
      "alt": "Restaurant-Style House Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "6",
    "ingredients": [
      "1 large head romaine lettuce- rinsed, dried and torn into bite sized pieces",
      "1 large head iceberg - rinsed, dried and torn into bite sized pieces",
      "1 (14 ounce) can artichoke hearts, drained and quartered",
      "1 cup sliced red onion",
      "1 (4 ounce) jar diced pimento peppers, drained",
      "0.66670000553131 cup extra virgin olive oil",
      "0.33329999446869 cup red wine vinegar",
      "1 teaspoon salt",
      "0.25 teaspoon ground black pepper",
      "0.66670000553131 cup grated Parmesan cheese"
    ],
    "instructions": [
      "In a large bowl, combine the romaine lettuce, iceberg lettuce, artichoke hearts, red onions and pimentos. Toss together.",
      "Prepare the dressing by whisking together the olive oil, red wine vinegar, salt, pepper and cheese. Refrigerate until chilled and pour over salad to coat. Toss and serve."
    ],
    "nutrition_per_serving": {
      "calories": 352,
      "total_fat_g": 29.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 6.0,
      "sugar_g": 5.0,
      "protein_g": 9.0,
      "sodium_mg": 976,
      "cholesterol_mg": 10,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 94,
    "recipe_category": "Lunch",
    "meal_type": "study",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/213795/dees-dark-chocolate-granola/",
    "category": "granola",
    "id": 213795,
    "name": "Dee's Dark Chocolate Granola",
    "description": "This crunchy peanut butter and chocolate granola is great for breakfast, or any time that a chocolate craving hits.",
    "author": "CusineLover",
    "image": {
      "url": "https://www.allrecipes.com/thmb/4AxP2eY1_kxHLyHeOjCt8I1YIZo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/617297-a44aac63d0984fb7a59d5e47711d13fd.jpg",
      "alt": "Dee's Dark Chocolate Granola"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "cooking spray",
      "0.5 cup brown sugar",
      "2 tablespoons peanut butter",
      "2 tablespoons honey",
      "2 tablespoons butter flavored spread (such as I Can't Believe It's Not Butter!\u00ae Spread)",
      "1 teaspoon vanilla extract",
      "2 cups oats (such as Quaker Oats\u00ae)",
      "1 teaspoon ground cinnamon",
      "0.25 teaspoon salt",
      "0.25 cup dark chocolate chips",
      "0.25 cup sweetened dried cranberries (such as Craisins\u00ae)",
      "0.25 cup sliced almonds"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Line a 9x13-inch baking dish with aluminum foil and spray with nonstick cooking spray.",
      "Melt together the brown sugar, peanut butter, honey, butter flavored spread, and vanilla extract in a small saucepan over low heat. Stir until well combined; remove from heat.",
      "Combine the oats, cinnamon, and salt in a large bowl. Pour the brown sugar mixture into bowl; stir well to combine. Stir in the chocolate chips, dried cranberries, and almonds. Spoon into the prepared pan; pat down and spread evenly.",
      "Bake in preheated oven until browned, 15 to 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 249,
      "total_fat_g": 9.0,
      "carbohydrates_g": 40.0,
      "fiber_g": 3.0,
      "sugar_g": 21.0,
      "protein_g": 5.0,
      "sodium_mg": 121,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 76,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/212389/samoan-panikeke/",
    "category": "doughnuts",
    "id": 212389,
    "name": "Samoan Panikeke",
    "description": "Samoan pancakes (called panikeke) are made with ripe bananas and deep-fried until golden brown. You'll love these round, crispy, tropical fritters!",
    "author": "Koki",
    "image": {
      "url": "https://www.allrecipes.com/thmb/y4i0usMJsKAcY0rU5IROPicTSgE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1569442-ab0acd8f1a2042b2b3df0b47135bee08.jpg",
      "alt": "Samoan Panikeke"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "12",
    "ingredients": [
      "3.5 cups all-purpose flour",
      "1.3333333730698 cups white sugar",
      "2 teaspoons baking powder",
      "1.5 cups water",
      "2 medium very ripe bananas, mashed",
      "1 tablespoon vanilla extract",
      "1.5 cups vegetable oil for frying, or as needed"
    ],
    "instructions": [
      "Whisk flour, sugar, and baking powder together in a bowl until thoroughly mixed. Stir in water, bananas, and vanilla until combined; dough will be smooth and sticky.",
      "Heat 3 inches oil in a deep fryer to 350 degrees F (175 degrees C).",
      "Working in batches of four to five at a time, scoop a scant 1/4 cup batter with a large spoon, then use another spoon to gently push it off into the deep fryer. Fry until panikeke float to the top and turn golden brown, about 3 minutes per side. Drain on paper towels."
    ],
    "nutrition_per_serving": {
      "calories": 337,
      "total_fat_g": 11.0,
      "carbohydrates_g": 55.0,
      "fiber_g": 2.0,
      "sugar_g": 25.0,
      "protein_g": 4.0,
      "sodium_mg": 83,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 66,
    "recipe_category": "Breakfast",
    "cuisine": "Oceanic",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/231749/strawberry-raspberry-smoothie/",
    "category": "smoothies",
    "id": 231749,
    "name": "Strawberry Raspberry Smoothie",
    "description": "This strawberry and raspberry smoothie recipe is easy and filling. Fruit is blended with yogurt, creating a probiotic-enhanced breakfast treat.",
    "author": "SHAWNDRAM",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Zd5avDj0tV4jqWXyRhpCNV64sM4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-231749-strawberry-raspberry-smoothie-ddmfs-3x4-aabb843c85a34ed09105a7d2e13b7973.jpg",
      "alt": "Strawberry Raspberry Smoothie"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "1 cup hulled fresh strawberries",
      "0.5 cup frozen raspberries",
      "0.5 cup lowfat milk",
      "0.5 cup vanilla yogurt",
      "1 tablespoon honey",
      "1 teaspoon vanilla extract"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Blend strawberries, raspberries, milk, yogurt, honey, and vanilla together in a blender until smooth."
    ],
    "nutrition_per_serving": {
      "calories": 318,
      "total_fat_g": 5.0,
      "carbohydrates_g": 59.0,
      "fiber_g": 7.0,
      "sugar_g": 50.0,
      "protein_g": 12.0,
      "sodium_mg": 134,
      "cholesterol_mg": 16,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 57,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/266642/egg-bites/",
    "category": "breakfast-potatoes",
    "id": 266642,
    "name": "Egg Bites",
    "description": "This egg bites recipe is made with eggs, spinach, ham, potatoes, onion, and bell pepper baked in muffin cups for the ultimate grab-and-go breakfast.",
    "author": "VB Leghorn",
    "image": {
      "url": "https://www.allrecipes.com/thmb/RHXOAtltDylW8upDx6zh9JzKsQs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/266642egg-bitesFranceC4x3-6f3be14f3f764e8da541761c67a431c8-7b66c9f88f78447eb859e0a392f5dbef.jpg",
      "alt": "Egg Bites"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 45,
    "servings": "12",
    "ingredients": [
      "cooking spray",
      "5 small tri-color baby potatoes, thinly sliced",
      "0.25 stick butter",
      "10 small eggs",
      "1 small yellow bell pepper, finely chopped",
      "1 small tomato, finely chopped",
      "0.5 cup fresh spinach",
      "0.25 cup chopped ham",
      "0.25 cup chopped white onion",
      "1 slice mozzarella cheese, cut into 12 cubes"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Spray a 12-cup muffin tin with nonstick cooking spray.",
      "Place a thin layer of potato slices in the bottom of each muffin cup. Add a little butter on top.",
      "Bake in the preheated oven for 5 minutes.",
      "Mix together eggs, bell pepper, tomato, spinach, ham, and onion in a large bowl. Ladle egg mixture over warm potatoes. Top each muffin cup with a mozzarella cube.",
      "Continue baking until eggs are set, about 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 108,
      "total_fat_g": 6.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 6.0,
      "sodium_mg": 111,
      "cholesterol_mg": 123,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 49,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/162936/nonies-best-bbq/",
    "category": "sloppy-joes",
    "id": 162936,
    "name": "Nonie's Best BBQ",
    "description": "Ground beef simmers in a quick barbeque sauce in this filling recipe.",
    "author": "Samantha Kristina",
    "image": {
      "url": "https://www.allrecipes.com/thmb/zd33H607LjrOZe48sQTBmEl-h5I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/813799-f3bf2a8d856249c5a5b775559d47dc16.jpg",
      "alt": "Nonie's Best BBQ"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "12",
    "ingredients": [
      "1 (14 ounce) bottle ketchup",
      "0.5 cup water",
      "0.25 cup white sugar",
      "1 tablespoon brown sugar",
      "1 tablespoon red wine vinegar",
      "1 tablespoon prepared yellow mustard",
      "1 teaspoon salt",
      "0.25 teaspoon ground black pepper",
      "0.25 teaspoon paprika",
      "2 pounds ground beef",
      "2 teaspoons minced onion",
      "12 hamburger buns, split"
    ],
    "instructions": [
      "Whisk ketchup, water, white sugar, brown sugar, vinegar, mustard, salt, pepper, and paprika together in a large saucepan. Bring to a simmer over medium-high heat; reduce heat to medium-low and simmer 15 minutes.",
      "Meanwhile, heat a large skillet over medium-high heat. Add ground beef and onion; cook and stir until beef is crumbly, evenly browned, and no longer pink. Drain and discard excess grease. Stir beef into simmering barbecue sauce; continue to simmer for 10 minutes. Serve on buns."
    ],
    "nutrition_per_serving": {
      "calories": 314,
      "total_fat_g": 12.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 1.0,
      "sugar_g": 13.0,
      "protein_g": 17.0,
      "sodium_mg": 863,
      "cholesterol_mg": 47,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 45,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/22198/zucchini-oven-frittata/",
    "category": "frittatas",
    "id": 22198,
    "name": "Zucchini Frittata",
    "description": "This zucchini frittata is packed with sliced zucchini and delicious veggies topped with melted mozzarella and Parmesan cheese for a pleasing brunch.",
    "author": "Marian Collins",
    "image": {
      "url": "https://www.allrecipes.com/thmb/azUGDgILBO73ZLSVcSI110GAu8g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7759493-132fa53e73074e06ae6a3e4e92be7582.jpg",
      "alt": "Zucchini Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 45,
    "servings": "5",
    "ingredients": [
      "3 medium zucchini, cut into 1/2-inch slices",
      "0.5 medium green bell pepper, seeded and chopped",
      "2 cloves garlic, peeled",
      "0.5 teaspoon salt",
      "3 tablespoons olive oil",
      "1 small onion, diced",
      "6 fresh chopped mushrooms",
      "1 tablespoon butter",
      "5 large eggs",
      "salt and pepper to taste",
      "1 cup shredded mozzarella cheese",
      "3 tablespoons Parmesan cheese"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Combine zucchini, bell pepper, garlic, and salt in a large, oven-safe skillet. Add 1 cup water and simmer until zucchini is tender, 5 to 7 minutes.",
      "Drain vegetables in a colander; discard garlic.",
      "Heat oil in the same skillet over medium heat. Stir in onion, mushrooms, and butter; add drained vegetables. Cook and stir until onion is transparent, about 5 minutes. Stir in beaten eggs and season with salt and pepper. Reduce the heat to low and cook until eggs are set, about 5 minutes. Remove from the heat and sprinkle mozzarella cheese over top.",
      "Bake in the preheated oven for 10 minutes. Remove from the oven and turn on the broiler.",
      "Sprinkle Parmesan cheese over frittata. Place under the preheated broiler until cheese is bubbling and golden brown, about 5 minutes.",
      "Remove from the oven and let stand for 5 minutes before cutting into 5 wedges and serving."
    ],
    "nutrition_per_serving": {
      "calories": 269,
      "total_fat_g": 20.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 2.0,
      "sugar_g": 4.0,
      "protein_g": 15.0,
      "sodium_mg": 618,
      "cholesterol_mg": 209,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 41,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275451/mexican-frittata/",
    "category": "frittatas",
    "id": 275451,
    "name": "Mexican Frittata",
    "description": "The addition of peppers, cumin, and salsa provides Mexican flair to this quick and easy breakfast frittata that's perfect when cooking for one.",
    "author": "tracyfer",
    "image": {
      "url": "https://www.allrecipes.com/thmb/W79KVDxdrHyMbwIpMHQgJP2IlFY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7019430-mexican-frittata-Kim-4x3-1-fa673cece3444b47a2e6cba02b61c8b2.jpg",
      "alt": "Mexican Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "2",
    "ingredients": [
      "cooking spray",
      "1 teaspoon olive oil",
      "1 red bell pepper, cut into thin strips",
      "1 medium white onion, thinly sliced",
      "0.25 cup milk",
      "4 egg whites",
      "2 eggs",
      "0.5 teaspoon salt",
      "0.5 teaspoon ground black pepper",
      "1 pinch ground cumin",
      "0.5 cup salsa"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Spray a small casserole dish with cooking spray.",
      "Heat oil in a 12-inch nonstick skillet over medium heat. Add bell pepper and onion and cook until tender, about 5 minutes.",
      "While pepper and onion are cooking, combine milk, egg whites, whole eggs, salt, pepper, and cumin into a medium bowl using a whisk.",
      "Transfer cooked vegetables to the prepared casserole dish. Pour egg mixture over the top.",
      "Bake in the preheated oven until eggs are set, about 30 minutes.",
      "Remove frittata from the oven and cut into wedges or squares. Place onto a plate and top with salsa."
    ],
    "nutrition_per_serving": {
      "calories": 202,
      "total_fat_g": 9.0,
      "carbohydrates_g": 16.0,
      "fiber_g": 3.0,
      "sugar_g": 9.0,
      "protein_g": 17.0,
      "sodium_mg": 1169,
      "cholesterol_mg": 188,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 37,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican Inspired",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/214563/giselas-butternut-squash-soup/",
    "category": "butternut-squash-soups",
    "id": 214563,
    "name": "Gisela's Butternut Squash Soup",
    "description": "This smooth butternut squash soup, with the warm flavor of orange, relies on the simplest of ingredients to let the flavor of the squash shine through.",
    "author": "SouthAfricanSweetie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nBTUpPoPrFIdg7tRjVKkM0AxVtw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7975787-fe20a237a6a245af8cd2134b568e433b.jpg",
      "alt": "Gisela's Butternut Squash Soup"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": 25,
    "total_time_minutes": 50,
    "servings": "4",
    "ingredients": [
      "2 tablespoons butter",
      "1 onion, finely chopped",
      "1 (14.5 ounce) can chicken broth",
      "1 (2 pound) butternut squash - peeled, seeded, and cut into 1-inch cubes",
      "1 orange, juiced",
      "1 orange, juiced and zested",
      "3 tablespoons sour cream",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Melt butter in a large saucepan or soup pot over medium heat, and cook and stir the onion until translucent, about 5 minutes. Pour in the chicken broth, and stir in the butternut squash cubes, orange juice, and orange zest. Bring to a boil, reduce heat, and simmer until the squash cubes are tender, 15 to 20 minutes.",
      "Pour the soup into a blender, filling the pitcher no more than halfway full. Hold down the lid of the blender with a folded kitchen towel, and carefully start the blender, using a few quick pulses to get the soup moving before leaving it on to puree. Puree in batches until smooth and pour back into the pot. Alternately, you can use a stick blender and puree the soup right in the cooking pot. Whisk in sour cream until smooth, and season to taste with salt and pepper. Heat over medium-low heat until almost simmering, and serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 245,
      "total_fat_g": 9.0,
      "carbohydrates_g": 43.0,
      "fiber_g": 8.0,
      "sugar_g": 16.0,
      "protein_g": 5.0,
      "sodium_mg": 532,
      "cholesterol_mg": 22,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 31,
    "recipe_category": "Lunch",
    "cuisine": "South African",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/258805/the-brutus-salad/",
    "category": "green-salads",
    "id": 258805,
    "name": "The Brutus Salad",
    "description": "Chef John's Brutus salad, featuring crisp romaine lettuce, apples, Cheddar, herbs, and toasted pecans, tossed in a Dijon vinaigrette, tastes amazing.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/tV3HIwFm_LsDuaRp3-6R6nysyYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4529365-9831150cb32148d6a6cd0cc49f780861.jpg",
      "alt": "The Brutus Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 5,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "0.25 cup real French Dijon mustard",
      "0.25 cup seasoned rice vinegar",
      "0.25 cup vegetable oil",
      "0.25 teaspoon Worcestershire sauce",
      "1 pinch cayenne pepper, or to taste",
      "freshly ground black pepper",
      "0.75 cup pecan halves",
      "2 teaspoons vegetable oil",
      "1 teaspoon white sugar",
      "1 pinch salt, or to taste",
      "4 hearts of romaine, cut or torn into bite-size pieces",
      "1 apple, thinly sliced",
      "2 tablespoons chopped fresh dill",
      "2 tablespoons chopped fresh tarragon",
      "2 ounces extra sharp aged Cheddar cheese"
    ],
    "instructions": [
      "Whisk mustard, vinegar, oil, Worcestershire sauce, cayenne, and pepper together in a bowl until thoroughly blended, about 1 minute. Transfer to an easy-to-pour container.",
      "Toast the pecans: Place pecans into a skillet over medium heat and drizzle in 2 teaspoons oil.\u00a0Cook and stir until pecans smell toasty and have darkened slightly, 1 to 2 minutes. Sprinkle with sugar and salt. Cook and stir for 1 minute, then transfer to a plate to cool.",
      "Make the salad: Add romaine, apple slices, dill, and tarragon to a large bowl; add a handful of pecans, reserving some for garnish. Grate Cheddar on top, reserving some for garnish. Drizzle in some vinaigrette; toss. Taste; add more salt or vinaigrette, if desired. You may not need all of the vinaigrette.",
      "Garnish with a few toasted pecans and some grated Cheddar cheese."
    ],
    "nutrition_per_serving": {
      "calories": 404,
      "total_fat_g": 35.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 5.0,
      "sugar_g": 10.0,
      "protein_g": 7.0,
      "sodium_mg": 831,
      "cholesterol_mg": 15,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 27,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/244960/strawberry-banana-protein-shake/",
    "category": "smoothies",
    "id": 244960,
    "name": "Strawberry Banana Protein Shake",
    "description": "This strawberry banana protein powder shake is made with skim milk and natural peanut butter for a great post-workout meal or on-the-go breakfast.",
    "author": "TEVANS211",
    "image": {
      "url": "https://www.allrecipes.com/thmb/wTao3HNeTIM8wb8F0m-6WScmwa0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5064472-strawberry-banana-protein-shake-CoachJen-4x3-1-df8495ed80ab4b618155dc3f8165d172.jpg",
      "alt": "Strawberry Banana Protein Shake"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "2",
    "ingredients": [
      "1 cup skim milk",
      "1 scoop vanilla-flavored whey protein powder",
      "2 cups ice",
      "1 cup strawberries",
      "1 large banana",
      "1 tablespoon natural peanut butter"
    ],
    "instructions": [
      "Layer milk, protein powder, ice, strawberries, banana, and peanut butter in a blender in this order; blend until creamy and smooth."
    ],
    "nutrition_per_serving": {
      "calories": 261,
      "total_fat_g": 5.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 4.0,
      "sugar_g": 19.0,
      "protein_g": 26.0,
      "sodium_mg": 187,
      "cholesterol_mg": 9,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 21,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/276002/air-fryer-donut-sticks/",
    "category": "doughnuts",
    "id": 276002,
    "name": "Air Fryer Donut Sticks",
    "description": "Use your air fryer, crescent croissant dough, and cinnamon sugar to make these delicious doughnut sticks for breakfast, brunch, or a sweet afternoon snack.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/lcdeiKgyr0gEq4-Glm33wWK89cU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-276002-air-fryer-donut-sticks-VAT-4x3-hero1-6e5f7174e4dd4ccd8585a7bc6bed6939.jpg",
      "alt": "Air Fryer Donut Sticks"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "8",
    "ingredients": [
      "1 (8 ounce) package refrigerated crescent roll dough",
      "0.25 cup butter, melted",
      "0.5 cup white sugar",
      "2 teaspoons ground cinnamon",
      "0.5 cup any flavor fruit jam"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Unroll crescent roll dough and press into an 8x12-inch rectangle. Cut in half lengthwise with a pizza cutter, then cut each piece crosswise into 1/2-inch-wide strips.",
      "Working in batches, dip strips in melted butter and place in a single layer in the air fryer basket without overcrowding.",
      "Cook in the air fryer at 380 degrees F (195 degrees C) until well browned, 4 to 5 minutes per batch.",
      "While the doughnut sticks are cooking, stir sugar and cinnamon together in a pie plate or shallow bowl.",
      "Remove doughnut sticks from the air fryer and roll in cinnamon-sugar mixture.",
      "Serve with jam, Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 266,
      "total_fat_g": 12.0,
      "carbohydrates_g": 38.0,
      "fiber_g": 1.0,
      "sugar_g": 24.0,
      "protein_g": 2.0,
      "sodium_mg": 267,
      "cholesterol_mg": 15,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 18,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/283627/chocolate-almond-breakfast-donuts/",
    "category": "doughnuts",
    "id": 283627,
    "name": "Chocolate Almond Breakfast Donuts",
    "description": "Unlike most dense almond flour recipes, Chef John's high-protein chocolate almond breakfast donuts are super light--and they're free of gluten and grain.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IKoKZBSuGc01y2aMmBRc2h580t4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/image-181-87ce30a0dd094461b848e45363f8385a.jpg",
      "alt": "Chocolate Almond Breakfast Donuts"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 45,
    "servings": "6",
    "ingredients": [
      "nonstick vegetable oil cooking spray",
      "2 large eggs",
      "2 tablespoons vegetable oil",
      "3 tablespoons maple syrup",
      "1.25 cups finely ground almond flour",
      "1.5 teaspoons baking powder",
      "0.5 teaspoon kosher salt",
      "2 tablespoons Dutch-process cocoa powder"
    ],
    "instructions": [
      "Preheat the oven to 375 degrees F (190 degrees C). Generously spray or brush a nonstick donut pan with cooking spray; set aside until needed.",
      "Place eggs, vegetable oil, and maple syrup into a mixing bowl and whisk thoroughly until the mixture is emulsified, light, and a little bit foamy, 3 to 4 minutes. Add almond flour, baking powder, salt, and cocoa powder; mix everything together thoroughly with a spatula until all the almond flour is incorporated and you've achieved a very thick batter.",
      "Transfer batter into a pastry bag, or a plastic zip-top bag with one of the corners cut off. Pipe the batter evenly into the prepared donut pan.",
      "Dip a finger in water and smooth the tops of the batter to even out. Tap the pan on a work surface a few times to settle the batter even more.",
      "Bake in the center of the preheated oven until a wooden skewer inserted into a donut comes out clean, 9 to 10 minutes. Let cool in the pan for 10 minutes before inverting onto a wire cooling rack. Cool completely before serving."
    ],
    "nutrition_per_serving": {
      "calories": 246,
      "total_fat_g": 19.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 3.0,
      "sugar_g": 7.0,
      "protein_g": 8.0,
      "sodium_mg": 307,
      "cholesterol_mg": 62,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 16,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/233293/ham-and-egg-frittata/",
    "category": "frittatas",
    "id": 233293,
    "name": "Ham and Cheese Frittata",
    "description": "This simple ham and cheese frittata with onion and potatoes is very versatile. Easy to make in one pan for a hearty breakfast or brunch.",
    "author": "CHERIEO1",
    "image": {
      "url": "https://www.allrecipes.com/thmb/U6TBh8E9TZ4QU5C84XAMwESu-z4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HamandEggFrittata4x3-f718aff234ff4feb9172130f04bbb771.jpg",
      "alt": "Ham and Cheese Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "3 eggs",
      "3 tablespoons milk",
      "2 tablespoons butter",
      "2 potatoes, cubed",
      "0.5 cup cubed fully cooked ham",
      "0.25 cup chopped onion",
      "1.5 teaspoons minced garlic",
      "0.25 cup water, or as needed",
      "salt and ground black pepper to taste",
      "0.25 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Set an oven rack about 6 inches from the heat source; preheat the broiler.",
      "Beat eggs and milk in a bowl; set aside.",
      "Melt butter in a large, oven-proof skillet over medium heat; cook and stir potatoes, ham, onion, and garlic in melted butter until potatoes are tender, about 15 minutes. Add water if vegetables become dry. Season with salt and pepper.",
      "Pour egg mixture over vegetable mixture. Cook, without stirring, until eggs are slightly browned on the bottom.",
      "Broil in the preheated oven until eggs are nearly set, about 5 minutes. Sprinkle Cheddar cheese over eggs and continue broiling until frittata is completely set and cheese is melted, about 5 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 268,
      "total_fat_g": 15.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 3.0,
      "sugar_g": 2.0,
      "protein_g": 12.0,
      "sodium_mg": 366,
      "cholesterol_mg": 173,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 16,
    "recipe_category": "Breakfast",
    "cuisine": "Italian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8400714/two-ingredient-bagels/",
    "category": "bagels",
    "id": 8400714,
    "name": "Two-Ingredient Bagels",
    "description": "Use the viral two-ingredient dough to make these quick and easy bagels. Top with any seed combination you like.",
    "author": "Karla Harmer",
    "image": {
      "url": "https://www.allrecipes.com/thmb/l6CF2oq7Irl3sZh3fVlgG2MUAtQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8400714two-ingredient-bagelsKim4x3-bdb42cc51ab54b8db04ca38d7b109309.jpg",
      "alt": "Two-Ingredient Bagels"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "1.25 cups self-rising flour, or more as needed",
      "1 cup plain whole-milk Greek yogurt",
      "1 tablespoon bagel seasoning blend",
      "avocado oil cooking spray"
    ],
    "instructions": [
      "Line a baking sheet with parchment paper.",
      "Combine flour and yogurt in a large bowl and mixed until a soft dough forms. Turn out the mixture onto a lightly floured surface and knead the dough for 3 minutes.",
      "Divide dough into 4 equal pieces. Working with 1 piece at a time roll into a ball. From dough ball into a bagel shape, using your finger to create a small hole in the center. Set on the prepared baking sheet. Repeat with remaining dough.",
      "Allow the bagels to rest for 15 minutes. Spray with cooking spray and sprinkle with everything bagel seasoning.",
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Bake in the preheated oven until the bagels begin to brown, 20 to 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 203,
      "total_fat_g": 5.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 1.0,
      "sugar_g": 0,
      "protein_g": 7.0,
      "sodium_mg": 529,
      "cholesterol_mg": 11,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 8,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236896/egg-style-avocado-salad-sandwiches/",
    "category": "egg-salads",
    "id": 236896,
    "name": "Egg-Style Avocado Salad Sandwiches",
    "description": "Avocado and kala namak salt work together to create the texture and flavor of eggs in this egg-free egg-salad-like picnic salad.",
    "author": "tried2bmerciful",
    "image": {
      "url": "https://www.allrecipes.com/thmb/m54HnoPEcXyV0713EExbLVYU0YA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1916484-50a31d79aeac497fbef2585b1f6fed03.jpg",
      "alt": "Egg-Style Avocado Salad Sandwiches"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "0.33333334326744 cup egg-free mayonnaise",
      "2 large green onions, sliced",
      "2 tablespoons prepared yellow mustard",
      "0.25 teaspoon ground black pepper",
      "0.25 teaspoon paprika",
      "2 large semi-firm avocados, diced",
      "0.5 teaspoon kala namak (black salt)",
      "8 slices potato bread"
    ],
    "instructions": [
      "Whisk mayonnaise, green onion, mustard, black pepper, and paprika together in a mixing bowl; add diced avocado, sprinkle with black salt, and stir.",
      "Divide salad between 4 bread slices. Top with remaining bread slices to finish sandwiches."
    ],
    "nutrition_per_serving": {
      "calories": 466,
      "total_fat_g": 32.0,
      "carbohydrates_g": 42.0,
      "fiber_g": 11.0,
      "sugar_g": 4.0,
      "protein_g": 8.0,
      "sodium_mg": 736,
      "cholesterol_mg": 1,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 5,
    "recipe_category": "Lunch",
    "cuisine": "U.S.",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/273291/ham-egg-salad/",
    "category": "egg-salads",
    "id": 273291,
    "name": "Ham & Egg Salad",
    "description": "This protein-packed breakfast requires no cooking, takes only minutes to make, and is an egg-cellent make-ahead morning meal.",
    "author": "Rachael Ray Every Day",
    "image": {
      "url": "https://www.allrecipes.com/thmb/uV0jcDirL5AhDi-QR-vY1DPnc0I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6866209-2e3cb58fbabe417faf07e7a198b239f4.jpg",
      "alt": "Ham & Egg Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "6",
    "ingredients": [
      "6 hard-boiled eggs",
      "0.25 cup mayonnaise, or more to taste",
      "1 tablespoon mustard",
      "1 dash hot sauce",
      "1 pinch Salt and pepper to taste",
      "1 (8 ounce) package Smithfield\u00ae Cubed Ham",
      "1 shallot, chopped",
      "2 ribs celery, chopped"
    ],
    "instructions": [
      "Halve the hard-boiled eggs and remove the yolks to a bowl. Coarsely chop the egg whites and set aside.",
      "To the bowl with the egg yolks, add the mayonnaise, mustard, hot sauce, salt, and pepper. Using a fork, smash the mixture until smooth. Add the reserved chopped egg whites, ham, shallot, and celery. Toss to combine. If you like a creamier texture, add more mayonnaise."
    ],
    "nutrition_per_serving": {
      "calories": 195,
      "total_fat_g": 14.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 13.0,
      "sodium_mg": 632,
      "cholesterol_mg": 236,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.6,
    "review_count": 5,
    "recipe_category": "Lunch",
    "meal_type": "fitness",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/6714/banana-oat-muffins/",
    "category": "kosher",
    "id": 6714,
    "name": "Banana Oat Muffins",
    "description": "These oatmeal banana muffins make a deliciously sweet, healthy breakfast and are made with bananas and rolled oats. They're a tasty grab-and-go treat.",
    "author": "Karen Resciniti",
    "image": {
      "url": "https://www.allrecipes.com/thmb/3YwpM1HVSsQSxnKeMylSYjdKIBA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-6714-Banana-Oat-Muffin-ddmfs-4x3-1f6bc539938e4482a8e5b9f7f0678d44.jpg",
      "alt": "Banana Oat Muffins"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "12",
    "ingredients": [
      "1.5 cups unbleached all-purpose flour",
      "1 cup rolled oats",
      "0.5 cup white sugar",
      "2 teaspoons baking powder",
      "1 teaspoon baking soda",
      "0.5 teaspoon salt",
      "1 egg",
      "0.75 cup milk",
      "0.33333334326744 cup vegetable oil",
      "0.5 teaspoon vanilla extract",
      "1 cup mashed bananas"
    ],
    "instructions": [
      "Gather all ingredients. Preheat the oven to 400 degrees F (205 degrees C). Line a 12-cup muffin tin with paper liners.",
      "Combine flour, oats, sugar, baking powder, soda, and salt in a medium bowl; set aside.",
      "Beat egg lightly in a large bowl. Whisk in milk, oil, and vanilla.",
      "Stir in mashed bananas.",
      "Add the flour mixture and stir until just combined.",
      "Spoon batter into the prepared muffin cups, filling each 3/4 full.",
      "Bake in the preheated oven until tops spring back when lightly pressed, 18 to 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 200,
      "total_fat_g": 8.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 2.0,
      "sugar_g": 12.0,
      "protein_g": 4.0,
      "sodium_mg": 296,
      "cholesterol_mg": 17,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 1663,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/69549/neat-sloppy-joes/",
    "category": "sloppy-joes",
    "id": 69549,
    "name": "Neat Sloppy Joes",
    "description": "No green pepper in this recipe, so it's a hit with kids. We added this to the menu at a children's camp, and it has been a favorite for several years. The mixture is thick, so they are 'neat' rather than sloppy. This freezes and reheats well.",
    "author": "AUNT MAMIE",
    "image": {
      "url": "https://www.allrecipes.com/thmb/a4UbdvJqHbRTbSEsdWUdLprqIvU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/717743-94e83f65b0ed449faf7496e17c21db98.jpg",
      "alt": "Neat Sloppy Joes"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": "8",
    "ingredients": [
      "2 pounds lean ground beef",
      "1 cup chopped celery",
      "0.5 cup chopped onion",
      "1 (10.75 ounce) can condensed tomato soup",
      "0.25 cup ketchup",
      "0.25 cup packed brown sugar",
      "1 tablespoon white vinegar",
      "1.5 teaspoons Worcestershire sauce",
      "0.5 teaspoon salt",
      "0.25 teaspoon garlic powder",
      "8 hamburger buns"
    ],
    "instructions": [
      "Cook ground beef in a large skillet over medium heat until evenly browned, stirring to crumble. I like to use a potato masher to even out the lumps. Add celery and onion, cover and cook until tender and translucent, about 5 minutes. Drain off any grease.",
      "Stir in (undiluted) tomato soup, ketchup, brown sugar, vinegar, and Worcestershire sauce; season with salt and garlic powder. Heat over low heat until simmering; simmer until thoroughly heated, stirring frequently to prevent burning on the bottom.",
      "Spoon beef mixture on buns; serve."
    ],
    "nutrition_per_serving": {
      "calories": 407,
      "total_fat_g": 17.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 2.0,
      "sugar_g": 12.0,
      "protein_g": 26.0,
      "sodium_mg": 774,
      "cholesterol_mg": 74,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 1085,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/83412/corn-dog-muffins/",
    "category": "cornbread",
    "id": 83412,
    "name": "Corn Dog Muffins",
    "description": "These tasty corn dog muffins are quick and easy to make for a fun way to recreate a family favorite savory treat from the state fair.",
    "author": "TINA3031",
    "image": {
      "url": "https://www.allrecipes.com/thmb/izhIBy4tLe7ThNkhPzgngCGKGdc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/image-253-0603cf46008f4b8fa85508614f1c035a.jpg",
      "alt": "Corn Dog Muffins"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "18",
    "ingredients": [
      "2 (8.5 ounce) packages cornbread mix",
      "2 tablespoons brown sugar",
      "2 eggs",
      "1.5 cups milk",
      "1 cup grated Cheddar cheese",
      "9 hot dogs, cut in half"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Lightly grease muffin tins.",
      "Stir cornbread mix and brown sugar together in a large bowl. Whisk eggs and milk in a small bowl until smooth. Fold eggs and cheese into cornbread mixture until moistened. Spoon mixture into muffin tins about 2/3 full. Add 1 hot dog half to each muffin.",
      "Bake in the preheated oven until golden brown, about 14 to 18 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 246,
      "total_fat_g": 14.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 0.0,
      "sugar_g": 6.0,
      "protein_g": 8.0,
      "sodium_mg": 806,
      "cholesterol_mg": 45,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 721,
    "recipe_category": "Lunch",
    "cuisine": "U.S.",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/69471/baby-spinach-omelet/",
    "category": "gluten-free",
    "id": 69471,
    "name": "Baby Spinach Omelet",
    "description": "Make this delicious spinach omelet with baby greens, Parmesan cheese, and a little nutmeg for a simple and quick meal\u2014perfect for any time of day.",
    "author": "HOLLYJUNE",
    "image": {
      "url": "https://www.allrecipes.com/thmb/xPSphQUyrNBb_DIAVBS1NcvxtKY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/69471-baby-spinach-omelet-hero-4x3-5e7db70704f141edb6aee119a1d750c6.jpg",
      "alt": "Baby Spinach Omelet"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "1",
    "ingredients": [
      "2 eggs",
      "1 cup torn baby spinach leaves",
      "1.5 tablespoons grated Parmesan cheese",
      "0.25 teaspoon onion powder",
      "0.125 teaspoon ground nutmeg",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Beat eggs in a bowl, and stir in baby spinach and Parmesan cheese.",
      "Season with onion powder, nutmeg, salt, and pepper.",
      "Spray a small skillet with cooking spray and place over medium heat. Once warm, add in the egg mixture and cook until partially set, about 3 minutes.",
      "Flip with a spatula, and continue cooking, 2 to 3 minutes.",
      "Reduce heat to low and continue cooking, 2 to 3 minutes, or until omelet reaches desired doneness. Serve warm and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 186,
      "total_fat_g": 12.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 16.0,
      "sodium_mg": 279,
      "cholesterol_mg": 379,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 385,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/36168/louisiana-sweet-potato-pancakes/",
    "category": "breakfast-potatoes",
    "id": 36168,
    "name": "Louisiana Sweet Potato Pancakes",
    "description": "This sweet potato pancake recipe combines mashed sweet potatoes and nutmeg with regular pancake batter for a delicious twist on classic pancakes.",
    "author": "SWIZZLESTICKS",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IlMOKMx4-mvNuajdjDVuxfVLF9U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/36168-louisiana-sweet-potato-pancakes-VAT-Beauty-4x3-f57c29340685449c99398d08a87a977e.jpg",
      "alt": "Louisiana Sweet Potato Pancakes"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 40,
    "total_time_minutes": 60,
    "servings": "8",
    "ingredients": [
      "0.75 pound sweet potatoes",
      "1.5 cups all-purpose flour",
      "3.5 teaspoons baking powder",
      "1 teaspoon salt",
      "0.5 teaspoon ground nutmeg",
      "1.5 cups milk",
      "0.25 cup unsalted butter, melted",
      "2 large eggs, beaten"
    ],
    "instructions": [
      "Bring a medium saucepan of lightly salted water to a boil. Add sweet potatoes and cook until tender but still a bit firm, about 15 minutes. Drain, then immediately immerse in cold water to loosen skins. Drain again; remove and discard skins.",
      "Sift flour, baking powder, salt, and nutmeg together into a medium bowl.",
      "Chop sweet potatoes, transfer to another medium bowl, and mash. Mix in milk, melted butter, and egg. Gradually mix in flour mixture until well combined.",
      "Lightly grease a griddle and preheat over medium heat.",
      "Working in batches, drop heaping tablespoonfuls batter onto the hot griddle and cook until the surface begins to bubble, 3 to 4 minutes. Flip and cook on the other side until golden brown, 2 to 3 more minutes."
    ],
    "nutrition_per_serving": {
      "calories": 217,
      "total_fat_g": 8.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 2.0,
      "sugar_g": 5.0,
      "protein_g": 6.0,
      "sodium_mg": 534,
      "cholesterol_mg": 65,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 384,
    "recipe_category": "Breakfast",
    "cuisine": "Southern",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241925/super-easy-egg-casserole/",
    "category": "breakfast-casseroles",
    "id": 241925,
    "name": "Super Easy Egg Casserole",
    "description": "This egg casserole is super easy to make and delicious. Beaten eggs are baked with Cheddar cheese, bell pepper, bacon, green onions, and garlic.",
    "author": "5MOM",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-_BMzmEEdJ1L67ZXivFy0yZWUh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-241925-super-easy-egg-casserole-VAT-4x3-1closeup-6c51c5add27a4451ba92787e7c4c15c7.jpg",
      "alt": "Super Easy Egg Casserole"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "6 eggs, whisked",
      "1 cup shredded Cheddar cheese",
      "6 slices bacon, diced",
      "2 slices bread, cubed",
      "0.33 red bell pepper, diced",
      "2 green onions, chopped",
      "3 tablespoons milk",
      "0.5 teaspoon minced garlic, or to taste",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.",
      "Mix eggs, cheese, bacon, bread, red bell pepper, green onion, milk, garlic, salt, and black pepper together in a bowl until well-combined; pour into the prepared baking dish.",
      "Bake in the preheated oven until eggs are set, about 20 to 25 minutes.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 340,
      "total_fat_g": 23.0,
      "carbohydrates_g": 9.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 23.0,
      "sodium_mg": 728,
      "cholesterol_mg": 325,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 368,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/34021/fluffy-cake-doughnuts/",
    "category": "doughnuts",
    "id": 34021,
    "name": "Fluffy Cake Donuts",
    "description": "This cake donut recipe makes a dozen crispy cakey donuts in 30 minutes; enjoy them plain, glazed, or rolled in cinnamon sugar!",
    "author": "SYNEVA B",
    "image": {
      "url": "https://www.allrecipes.com/thmb/wqrcbz7aRBPlsylxShDdkKNvDpc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1536786-8e004e78b55141298ef1faf17bd3337d.jpg",
      "alt": "Fluffy Cake Donuts"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "12",
    "ingredients": [
      "2 cups all-purpose flour",
      "0.75 cup white sugar",
      "2 teaspoons baking powder",
      "0.25 teaspoon ground nutmeg",
      "0.25 teaspoon ground cinnamon",
      "1 teaspoon salt",
      "0.75 cup milk",
      "2 eggs, beaten",
      "1 tablespoon shortening",
      "1 teaspoon vanilla extract",
      "1 cup confectioners' sugar",
      "2 tablespoons hot water",
      "0.5 teaspoon almond extract"
    ],
    "instructions": [
      "Preheat the oven to 325 degrees F (165 degrees C). Lightly grease a donut pan.",
      "Mix flour, sugar, baking powder, nutmeg, cinnamon, and salt together in a large bowl. Stir in milk, eggs, butter, and vanilla. Beat until well blended. Fill each prepared donut cup approximately 3/4 full.",
      "Bake in the preheated oven until donuts spring back when touched, 8 to 10 minutes. Allow to cool slightly before removing from the pan.",
      "While the donuts are cooling, make the glaze: Blend confectioners' sugar, hot water, and almond extract together in a small bowl. Dip doughnuts in the glaze when serving."
    ],
    "nutrition_per_serving": {
      "calories": 196,
      "total_fat_g": 2.0,
      "carbohydrates_g": 40.0,
      "fiber_g": 1.0,
      "sugar_g": 24.0,
      "protein_g": 4.0,
      "sodium_mg": 272,
      "cholesterol_mg": 32,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 272,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/14966/cheese-blintzes/",
    "category": "blintzes",
    "id": 14966,
    "name": "Cheese Blintzes",
    "description": "A modern and speedy take on a traditional old country favorite: These no-fry blintzes have a white-bread base; sugar butter and cream cheese sweeten things up.",
    "author": "shelly15",
    "image": {
      "url": "https://www.allrecipes.com/thmb/kzFr48A5JHAz7o8UfLOMkavHOZ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8498818-b85de0e147b445e0848b61138fb9e122.jpg",
      "alt": "Cheese Blintzes"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "9",
    "ingredients": [
      "1 (1 pound) loaf white bread",
      "4 tablespoons white sugar",
      "2 teaspoons ground cinnamon",
      "2 (8 ounce) packages cream cheese, softened",
      "2 tablespoons milk",
      "1 teaspoon vanilla extract",
      "0.5 cup butter, melted",
      "1 pint sour cream"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Spray a cookie sheet generously with non-stick cooking spray.",
      "Trim crusts from bread and roll the slices flat.",
      "In a small bowl combine sugar and cinnamon to make a mixture.",
      "In a large mixing bowl, mix softened cream cheese, milk and vanilla until smooth. Spread this mixture onto each slice of flattened bread. Roll each bread slice up. Dip bread/cream cheese rolls in melted butter, roll the blintzes immediately in the sugar-cinnamon mixture. Cut rolls into 1 inch pieces. Arrange the blintzes on the prepared cookie sheet.",
      "Bake for 10 minutes. Serve with sour cream."
    ],
    "nutrition_per_serving": {
      "calories": 534,
      "total_fat_g": 40.0,
      "carbohydrates_g": 35.0,
      "fiber_g": 2.0,
      "sugar_g": 8.0,
      "protein_g": 10.0,
      "sodium_mg": 592,
      "cholesterol_mg": 105,
      "saturated_fat_g": 25.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 152,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21487/easy-potato-pancakes/",
    "category": "breakfast-potatoes",
    "id": 21487,
    "name": "Easy Potato Pancakes",
    "description": "These potato pancakes are crispy on the outside, tender inside, and simple to make for breakfast, brunch, or as a side for pork chops and applesauce.",
    "author": "Judy B",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Xy2PTz6pKNrKmorBRz8sxcfC9-c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8886101-9b5e2be59720407daa6d90f02f78c5a3.jpg",
      "alt": "Easy Potato Pancakes"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": "5",
    "ingredients": [
      "5 medium potatoes, peeled and shredded",
      "1 medium onion, finely chopped",
      "2 large eggs, beaten",
      "3 tablespoons all-purpose flour",
      "salt and pepper to taste",
      "3 tablespoons vegetable oil"
    ],
    "instructions": [
      "Place shredded potatoes in a clean kitchen towel and squeeze out excess liquid.",
      "Combine shredded potatoes, onion, eggs, flour, salt, and pepper in a large bowl; stir until well combined.",
      "Heat oil in a large skillet over medium-high heat. Working in batches, drop large spoonfuls of potato batter into the hot skillet. Flatten batter lightly with a spatula and cook until golden brown and crisp on both sides, about 4 minutes per side. Keep finished pancakes warm while cooking remaining batches. Serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 291,
      "total_fat_g": 10.0,
      "carbohydrates_g": 43.0,
      "fiber_g": 5.0,
      "sugar_g": 0,
      "protein_g": 8.0,
      "sodium_mg": 42,
      "cholesterol_mg": 74,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 147,
    "recipe_category": "Breakfast",
    "cuisine": "Eastern European",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/208878/israeli-salad/",
    "category": "jewish",
    "id": 208878,
    "name": "Israeli Salad Recipe",
    "description": "This Israeli salad recipe yields a lightly dressed, colorful salad, typically sold at falafel stands in Israel. Serve it alone, as a side, or in a pita.",
    "author": "Maslow",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nWwL222zPWrRaddbPzsZwhTIlws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8288753-16a55053c23e44b691da73881ceaa46a.jpg",
      "alt": "Israeli Salad Recipe"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": null,
    "total_time_minutes": 25,
    "servings": "5",
    "ingredients": [
      "6 cucumbers, diced",
      "4 roma (plum) tomatoes, seeded and diced",
      "1 red bell pepper, seeded and diced",
      "1 cup chopped fresh parsley",
      "5 green onions, sliced",
      "0.5 cup minced fresh mint leaves",
      "0.33333334326744 cup chopped garlic",
      "0.5 cup olive oil",
      "2 tablespoons fresh lemon juice",
      "1 tablespoon salt",
      "1 tablespoon ground black pepper"
    ],
    "instructions": [
      "Combine cucumbers, tomatoes, bell pepper, parsley, green onions, mint, and garlic in a bowl.",
      "Drizzle olive oil and lemon juice over salad; season with salt and black pepper and toss to coat."
    ],
    "nutrition_per_serving": {
      "calories": 272,
      "total_fat_g": 22.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 4.0,
      "sugar_g": 7.0,
      "protein_g": 4.0,
      "sodium_mg": 1415,
      "cholesterol_mg": 0,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 134,
    "recipe_category": "Lunch",
    "cuisine": "Israeli",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23553/basic-fruit-smoothie/",
    "category": "high-fiber",
    "id": 23553,
    "name": "Basic Fruit Smoothie",
    "description": "A tasty fruit smoothie recipe with strawberries, banana, peaches, fruit juice, and ice. Feel free to experiment with your favorite fruits!",
    "author": "STARGIRL577",
    "image": {
      "url": "https://www.allrecipes.com/thmb/qYiY2yd-OUkBcmKOJR-57uXAfrg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23553-basic-fruit-smoothie-DDMFS-4x3-bd82b17e9afd4b6d989aecdd646d3ddb.jpg",
      "alt": "Basic Fruit Smoothie"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "4",
    "ingredients": [
      "1 quart strawberries, hulled",
      "2 fresh peaches - peeled, pitted, and sliced",
      "1 banana, broken into chunks",
      "2 cups ice",
      "1 cup orange-peach-mango juice"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Combine strawberries, peaches, and banana in a blender; blend until smooth.",
      "Add ice and pour in juice; blend again to desired consistency.",
      "Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 118,
      "total_fat_g": 1.0,
      "carbohydrates_g": 29.0,
      "fiber_g": 4.0,
      "sugar_g": 20.0,
      "protein_g": 2.0,
      "sodium_mg": 16,
      "cholesterol_mg": 0,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 89,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/141983/dallas-style-sloppy-joes/",
    "category": "sloppy-joes",
    "id": 141983,
    "name": "Dallas-Style Sloppy Joes",
    "description": "A zesty sauce, fresh onion, and bell pepper make this easy-to-make sandwich a Dallas-area favorite.",
    "author": "Caitlin",
    "image": {
      "url": "https://www.allrecipes.com/thmb/rVDLUmPGyD_AkfMSGLNnUI4QJWQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5366386-b705ca271f544f9fabea402a2a34eca8.jpg",
      "alt": "Dallas-Style Sloppy Joes"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 45,
    "servings": "5",
    "ingredients": [
      "1.5 pounds lean ground beef",
      "1 yellow onion, chopped",
      "1 red bell pepper, chopped",
      "sea salt and ground black pepper to taste",
      "1.5 cups ketchup",
      "3 tablespoons apple cider vinegar",
      "3 tablespoons Worcestershire sauce",
      "3 tablespoons brown sugar",
      "3 tablespoons yellow mustard",
      "3 tablespoons hickory flavored barbecue sauce",
      "2 tablespoons grated Parmesan cheese",
      "5 large hamburger buns, toasted"
    ],
    "instructions": [
      "Cook the ground beef in a large skillet over medium heat until completely browned, 5 to 7 minutes. Add the onion and bell pepper, season with sea salt and black pepper, and cook until vegetables soften, about 7 minutes.",
      "Stir in the ketchup, vinegar, Worcestershire sauce, brown sugar, mustard, and barbeque sauce. Reduce heat to low and simmer the mixture until thickened, about 10 minutes. Add Parmesan cheese and serve on toasted hamburger buns."
    ],
    "nutrition_per_serving": {
      "calories": 530,
      "total_fat_g": 20.0,
      "carbohydrates_g": 59.0,
      "fiber_g": 3.0,
      "sugar_g": 31.0,
      "protein_g": 30.0,
      "sodium_mg": 1531,
      "cholesterol_mg": 85,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 81,
    "recipe_category": "Lunch",
    "cuisine": "Southwestern",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/71928/smoked-salmon-frittata/",
    "category": "frittatas",
    "id": 71928,
    "name": "Smoked Salmon Frittata",
    "description": "This delicious salmon frittata recipe is made with smoked salmon and cream cheese. Add fresh herbs or avocado slices for a beautiful presentation.",
    "author": "DEBBIST",
    "image": {
      "url": "https://www.allrecipes.com/thmb/2ervxzViQCc55UqbUf3Fe7rYu8M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8105159-270ad65f68ba4740ab44f144ba2d28bc.jpg",
      "alt": "Smoked Salmon Frittata"
    },
    "prep_time_minutes": 30,
    "cook_time_minutes": 30,
    "total_time_minutes": 60,
    "servings": "4",
    "ingredients": [
      "4 tablespoons olive oil",
      "0.25 medium onion, chopped",
      "salt and pepper to taste",
      "4 ounces pepper smoked salmon",
      "8 black olives, chopped",
      "6 eggs",
      "2 tablespoons milk",
      "2 tablespoons heavy cream",
      "0.5 (8 ounce) package cream cheese, cubed"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Heat olive oil in an 8-inch, oven-safe skillet over medium heat. Add onion and season with a little salt and pepper. Cook, stirring until translucent, about 5 minutes. Add salmon and olives; cook and stir briefly to release the flavors.",
      "In a medium bowl, whisk together eggs, milk, and cream. Pour over salmon and onion, and stir gently. Scatter cubes of cream cheese over the top. Cook over medium heat without stirring, until the edges appear firm.",
      "Place the skillet in the preheated oven, and bake for 20 minutes, or until nicely browned and puffed. Flip onto a serving plate, and cut into wedges to serve."
    ],
    "nutrition_per_serving": {
      "calories": 401,
      "total_fat_g": 36.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 17.0,
      "sodium_mg": 543,
      "cholesterol_mg": 327,
      "saturated_fat_g": 13.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 76,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/14020/breakfast-grits/",
    "category": "grits",
    "id": 14020,
    "name": "Breakfast Grits",
    "description": "Learn how to cook grits with this recipe. Fresh pepper and sharp Cheddar cheese liven up this dish. Simple and tasty, just the way grits should be.",
    "author": "jen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/6Tw2fzXUvRIE9ePqhDSGEO3h7_Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-14020-breakfast-grits-ddmfs-beauty-4x3-9437f9c827e747a6832e5f7988894fa5.jpg",
      "alt": "Breakfast Grits"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "3 cups water",
      "0.5 teaspoon salt",
      "1 cup hominy grits",
      "0.5 cup shredded sharp Cheddar cheese",
      "1 tablespoon butter",
      "freshly ground black pepper"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Bring water and salt to a boil in a saucepan. Whisk in grits; continue to whisk for 1 minute.",
      "When the mixture comes to a boil again, turn the heat to low. Stir frequently, cook for 10 to 15 minutes.",
      "Remove grits from the heat and add cheese, butter, and pepper; mix well.",
      "Stir until butter and cheese are melted."
    ],
    "nutrition_per_serving": {
      "calories": 240,
      "total_fat_g": 9.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 1.0,
      "sugar_g": 0.0,
      "protein_g": 8.0,
      "sodium_mg": 424,
      "cholesterol_mg": 26,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 67,
    "recipe_category": "Breakfast",
    "cuisine": "Southern",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/100506/irish-potato-farls/",
    "category": "breakfast-potatoes",
    "id": 100506,
    "name": "Irish Potato Farls",
    "description": "Potato farls (also known as potato bread) are easy to make with mashed potatoes, flour, butter, and salt for a delicious addition to an Irish breakfast.",
    "author": "Ita",
    "image": {
      "url": "https://www.allrecipes.com/thmb/EpQsg0EIB5VxStAQ6JhxzleAzLc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/RM-100506-IrishPotatoFarls-ddmfs-2x3-7007-29292e86929342808de8c6b0c9f57519.jpg",
      "alt": "Irish Potato Farls"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "4 medium potatoes, peeled and halved",
      "0.25 cup all-purpose flour, plus extra for dusting",
      "1 tablespoon melted butter",
      "1 pinch salt"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Cover potatoes with water in a pot and bring to a boil over high heat. Simmer on medium-high heat until center of potatoes are tender when pricked with a fork, about 20 minutes. Turn off heat. Drain, return potatoes to the pot, and allow to completely dry out over the remaining residual heat.",
      "Mash with a potato masher until smooth.",
      "Place warm mashed potato in a medium bowl. Stir in flour, melted butter, and salt. Mix lightly until dough forms.",
      "Knead dough lightly on a well-floured surface. The dough will be sticky. Use a floured rolling pin to flatten into a 9-inch circle about 1/4 inch thick. Cut into quarters using a floured knife.",
      "Sprinkle a little flour into the bottom of a skillet and cook farls until evenly browned, about 3 minutes on each side. Season with a little salt and serve straight away."
    ],
    "nutrition_per_serving": {
      "calories": 218,
      "total_fat_g": 3.0,
      "carbohydrates_g": 43.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 5.0,
      "sodium_mg": 33,
      "cholesterol_mg": 8,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 52,
    "recipe_category": "Breakfast",
    "cuisine": "Irish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/143425/blue-cheese-and-dried-cranberry-tossed-salad/",
    "category": "green-salads",
    "id": 143425,
    "name": "Blue Cheese and Dried Cranberry Tossed Salad",
    "description": "This salad is a tried and true crowd pleaser. A basic romaine salad is dressed up with toasted pecans, cranberries, and crumbled blue cheese and tossed with balsamic vinaigrette to serve. Make this an easy meal by adding grilled chicken and serving with a crusty baguette.",
    "author": "Michelle",
    "image": {
      "url": "https://www.allrecipes.com/thmb/AhqE4hUpQnwmflU4j-2oAog_gUQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4531571-ea6b6837e662402a9bbf1c9599e9bf3a.jpg",
      "alt": "Blue Cheese and Dried Cranberry Tossed Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "6",
    "ingredients": [
      "4 hearts of romaine lettuce, chopped",
      "0.75 cup grape tomatoes, halved",
      "0.5 English cucumber, sliced",
      "0.5 cup chopped toasted pecans",
      "0.5 cup dried cranberries",
      "0.5 cup crumbled blue cheese",
      "0.75 cup balsamic vinaigrette"
    ],
    "instructions": [
      "Layer romaine lettuce, grape tomatoes, cucumber, pecans, cranberries, and blue cheese in a large salad bowl. Toss salad with balsamic vinaigrette before serving."
    ],
    "nutrition_per_serving": {
      "calories": 258,
      "total_fat_g": 20.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 5.0,
      "sugar_g": 10.0,
      "protein_g": 5.0,
      "sodium_mg": 520,
      "cholesterol_mg": 8,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 48,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/56565/corn-fritters-with-maple-syrup/",
    "category": "cornbread",
    "id": 56565,
    "name": "Corn Fritters with Maple Syrup",
    "description": "Served warm with maple syrup or honey, these corn fritters with creamed corn are great for breakfast or as a snack, and the recipe is easy to make.",
    "author": "Niki",
    "image": {
      "url": "https://www.allrecipes.com/thmb/TtqCrJHhLtJ6Gt9YDO_-vpzelZU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3579371-78e6d566dda944049d4712291d1c8a16.jpg",
      "alt": "Corn Fritters with Maple Syrup"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "16",
    "ingredients": [
      "4 cups vegetable oil for deep-frying",
      "1 cup cream-style corn",
      "1 egg",
      "1 cup all-purpose flour",
      "1 teaspoon sugar",
      "0.75 teaspoon baking powder",
      "0.5 teaspoon salt",
      "1 cup maple flavored pancake syrup"
    ],
    "instructions": [
      "Heat oil in a deep fryer to 350 degrees F (175 degrees C).",
      "Combine cream-style corn and egg in a small bowl. Combine flour, sugar, baking powder, and salt in a medium bowl; stir in corn mixture until just blended.",
      "Drop batter by \u215b cupfuls into hot oil. Fry until golden brown, turning once if fritters don't turn over by themselves. Drain on paper towels; serve with syrup."
    ],
    "nutrition_per_serving": {
      "calories": 849,
      "total_fat_g": 81.0,
      "carbohydrates_g": 33.0,
      "fiber_g": 1.0,
      "sugar_g": 13.0,
      "protein_g": 2.0,
      "sodium_mg": 221,
      "cholesterol_mg": 17,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 45,
    "recipe_category": "Breakfast",
    "cuisine": "New England",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16045/matzo-brei/",
    "category": "jewish",
    "id": 16045,
    "name": "Matzo Brei",
    "description": "Matzo brei is a Jewish breakfast dish of crispy matzo with cooked eggs served savory or sweet for a super simple but delicious Passover meal.",
    "author": "Janice Weisberger",
    "image": {
      "url": "https://www.allrecipes.com/thmb/jQMsBqsUjkmG8vb7XSrN5XWjS3c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16045-matzo-brei-DDMFS-4x3_2-9ed99dbb5dbc45b08141e58d6eaa3e6b.jpg",
      "alt": "Matzo Brei"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": "1",
    "ingredients": [
      "1 matzo cracker",
      "1 egg",
      "salt and pepper to taste",
      "1 teaspoon vegetable oil"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Break matzo into pieces in a bowl; cover with hot water and soak until matzo just begins to soften, about 30 to 60 seconds. Drain and squeeze out water; set matzo aside.",
      "Beat egg, salt, and pepper together in a small bowl until fluffy; mix in matzo.",
      "Heat butter or oil in a skillet over medium heat; pour matzo-egg mixture into skillet. Cook until egg is cooked on one side, about 1 minute; flip and cook on other side, about 1 minute more."
    ],
    "nutrition_per_serving": {
      "calories": 222,
      "total_fat_g": 10.0,
      "carbohydrates_g": 24.0,
      "fiber_g": 0,
      "sugar_g": 1.0,
      "protein_g": 9.0,
      "sodium_mg": 70,
      "cholesterol_mg": 186,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 37,
    "recipe_category": "Breakfast",
    "cuisine": "Jewish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/233007/maple-breakfast-sausage/",
    "category": "ground-pork",
    "id": 233007,
    "name": "Maple Breakfast Sausage",
    "description": "This homemade maple sausage is made with ground pork, maple syrup, fresh sage, red pepper flakes, fennel seeds, and garlic for amazing flavor.",
    "author": "Melissa",
    "image": {
      "url": "https://www.allrecipes.com/thmb/1QvAtF0ekzCDR3BZKX6yMxSQ0ic=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8039382-6c496fa10863419f831dc036eeaf8279.jpg",
      "alt": "Maple Breakfast Sausage"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "12",
    "ingredients": [
      "2.5 pounds ground pork",
      "0.25 cup maple syrup",
      "1.5 tablespoons chopped fresh sage",
      "1 tablespoon salt",
      "2.5 teaspoons fennel seed",
      "2.5 teaspoons red pepper flakes",
      "2.5 teaspoons garlic powder",
      "2.5 teaspoons onion powder",
      "1 teaspoon anise seed",
      "1 tablespoon olive oil"
    ],
    "instructions": [
      "Mix pork, maple syrup, sage, salt, fennel seed, red pepper flakes, garlic powder, onion powder, and anise seed in a large bowl until evenly blended. Shape pork mixture into small patties.",
      "Heat olive oil in a large skillet over medium heat; fry patties in batches until pork is browned and no longer pink in the center, 4 to 5 minutes per side."
    ],
    "nutrition_per_serving": {
      "calories": 229,
      "total_fat_g": 15.0,
      "carbohydrates_g": 6.0,
      "fiber_g": 0.0,
      "sugar_g": 4.0,
      "protein_g": 17.0,
      "sodium_mg": 631,
      "cholesterol_mg": 61,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 35,
    "recipe_category": "Breakfast",
    "meal_type": "fitness",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/49613/chilaquiles-iii/",
    "category": "chilaquiles",
    "id": 49613,
    "name": "Chilaquiles III",
    "description": "One taste of this great Mexican breakfast dish made with crisp corn tortillas, eggs, and chile peppers, and you'll be hooked!",
    "author": "SpiffyPrawn2289",
    "image": {
      "url": "https://www.allrecipes.com/thmb/q8yKM6XEsCnIcXku9414EdKovKA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5136487-25ed0823ff924852a623c68725fd204e.jpg",
      "alt": "Chilaquiles III"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 30,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "1 tablespoon vegetable oil",
      "4 (6 inch) corn tortillas, torn into strips",
      "1 small onion, diced",
      "0.5 tomato, diced",
      "3 serrano chile peppers, diced",
      "salt and pepper to taste",
      "6 eggs, lightly beaten"
    ],
    "instructions": [
      "Heat the oil in a medium skillet over medium heat, and fry the tortillas until lightly browned and crisp.",
      "Mix the onion, tomato, and serrano chile peppers into the skillet. Season with salt and pepper. Continue to cook and stir until onions are tender.",
      "Stir the eggs into the skillet, and cook until firm."
    ],
    "nutrition_per_serving": {
      "calories": 205,
      "total_fat_g": 12.0,
      "carbohydrates_g": 15.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 11.0,
      "sodium_mg": 119,
      "cholesterol_mg": 279,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 34,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/201510/sweet-and-salty-granola/",
    "category": "granola",
    "id": 201510,
    "name": "Sweet and Salty Granola",
    "description": "A great granola recipe that's a perfect addition to cereal, yogurt, fruit or even just to enjoy plain.",
    "author": "Alison M",
    "image": {
      "url": "https://www.allrecipes.com/thmb/fhrL7Te3J_VxrRdX0_8zDSY28JY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201510sweet-and-salty-granolaTammyLynn4x3-913f6ee27ddf4785a7cbc5f91b4a5e9d.jpg",
      "alt": "Sweet and Salty Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 45,
    "total_time_minutes": 60,
    "servings": "16",
    "ingredients": [
      "0.75 cup brown sugar",
      "0.25 cup water",
      "3 cups rolled oats",
      "0.5 teaspoon salt",
      "1 cup chopped walnuts",
      "2 teaspoons ground cinnamon",
      "1 tablespoon honey",
      "2 teaspoons vanilla extract"
    ],
    "instructions": [
      "Preheat an oven to 275 degrees F (135 degrees C). Cover a 10x15 inch pan with wax paper.",
      "Mix brown sugar and water in a microwave safe bowl. Cook in microwave to dissolve the sugar, about 1 minute. Combine oats, salt, walnuts, and cinnamon in a large bowl. Stir in sugar mixture, honey, and vanilla extract. Mix well. Pour mixture onto the prepared pan, spreading evenly. Create clusters by squeezing small handfuls of the oat mixture together.",
      "Bake in the preheated oven for 20 minutes. Remove from oven and gently stir granola using a spoon. Return to the oven and bake for an additional 25 minutes. The granola will be slightly browned and will continue to harden as they cool."
    ],
    "nutrition_per_serving": {
      "calories": 139,
      "total_fat_g": 6.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 2.0,
      "sugar_g": 8.0,
      "protein_g": 3.0,
      "sodium_mg": 76,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 24,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/276275/baked-buttermilk-donuts/",
    "category": "doughnuts",
    "id": 276275,
    "name": "Baked Buttermilk Donuts",
    "description": "Crispy on the outside and light and airy on the inside, this recipe for baked buttermilk donuts makes an easy treat you can toss in confectioners' sugar.",
    "author": "brownie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/hA-iyEXHdZX8ZrTga8b3g-Y6JA8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8147254-e07dc79e282c4070b28da99ca8af89ad.jpg",
      "alt": "Baked Buttermilk Donuts"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 60,
    "servings": "12",
    "ingredients": [
      "cooking spray",
      "2 cups all-purpose flour",
      "1 cup white sugar",
      "2 tablespoons cornstarch",
      "1 teaspoon baking powder",
      "1 teaspoon freshly grated nutmeg",
      "0.5 teaspoon salt",
      "1 cup buttermilk",
      "2 eggs",
      "1 teaspoon baking soda",
      "1 teaspoon vanilla extract",
      "4 tablespoons vegetable shortening, melted and cooled slightly",
      "1 cup sifted powdered sugar"
    ],
    "instructions": [
      "Preheat the oven to 375 degrees F (190 degrees C) with an oven rack in the upper-middle position. Coat a donut pan with cooking spray.",
      "Sift flour, white sugar, cornstarch, baking powder, nutmeg, and salt together in a large bowl.",
      "Whisk buttermilk, eggs, baking soda, and vanilla extract together in a separate bowl.",
      "Pour melted and cooled shortening into flour mixture; stir until absorbed. Stir in buttermilk mixture; mix well. Let batter rest 10 to 15 minutes.",
      "Pour batter by scant 1 tablespoonfuls into wells of each prepared donut cup. Distribute batter evenly across bottoms of each cup using the back of a spoon; you won't use all of the batter in this batch.",
      "Bake in the preheated oven on the upper-middle rack until golden brown, 12 to 15 minutes. Cool in the pan for 2 to 3 minutes before transferring donuts to a wire rack.",
      "Place confectioners' sugar in a small paper bag; add donuts and toss to coat.",
      "Coat the donut pan with cooking spray. Repeat process with remaining batter and confectioners' sugar."
    ],
    "nutrition_per_serving": {
      "calories": 247,
      "total_fat_g": 6.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 1.0,
      "sugar_g": 28.0,
      "protein_g": 4.0,
      "sodium_mg": 276,
      "cholesterol_mg": 32,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 22,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/282292/sausage-gravy-casserole/",
    "category": "breakfast-casseroles",
    "id": 282292,
    "name": "Sausage Gravy Casserole",
    "description": "This creamy sausage gravy casserole with biscuits is quick and easy to assemble the night before and bake fresh in the morning for a hearty breakfast.",
    "author": "Margaritas On The Rocks",
    "image": {
      "url": "https://www.allrecipes.com/thmb/1mBjeksO3ZF3YPSVB-2QZV_U8ws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/282292-sausage-gravy-casserole-fabeveryday-4x3-f2bcd9c04f4244da83f74d94bd8312a3.jpg",
      "alt": "Sausage Gravy Casserole"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "8",
    "ingredients": [
      "1 (16 ounce) package Jimmy Dean\u00ae Premium Pork Regular Sausage",
      "1 teaspoon onion powder",
      "1 teaspoon garlic powder",
      "0.5 teaspoon chicken bouillon powder, or more to taste",
      "ground black pepper to taste",
      "2 tablespoons quick-mixing all-purpose flour, or more to taste",
      "3 cups milk",
      "1 teaspoon unsalted butter, or as needed",
      "1 (10 count) package refrigerated buttermilk biscuits"
    ],
    "instructions": [
      "Cook sausage in a large skillet over medium-high heat, stirring with a spatula and breaking sausage apart as it cooks, 5 to 7 minutes. Stir in onion powder, garlic powder, bouillon granules, and black pepper until well combined and sausage fully cooked, 5 to 7 minutes more.",
      "Stir in flour until mixture coated, then stir in milk and bring to a boil. Reduce heat to a simmer; stir until thickened, 5 to 7 minutes. Taste; adjust seasonings. Set aside.",
      "Preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish with butter; set aside.",
      "Cut each biscuit into four pieces. Arrange \u00bd biscuits in bottom of the prepared baking dish; cover with sausage-gravy mixture. Top with remaining \u00bd biscuits.",
      "Bake in the preheated oven until biscuits are fully cooked and golden brown, 13 to 15 minutes.",
      "Set aside before serving for 3 to 5 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 153,
      "total_fat_g": 6.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 0.0,
      "sugar_g": 6.0,
      "protein_g": 5.0,
      "sodium_mg": 365,
      "cholesterol_mg": 8,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 19,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/140617/vegan-granola/",
    "category": "granola",
    "id": 140617,
    "name": "Vegan Granola",
    "description": "This is an awesome, addictive, one hundred percent vegan granola. Excellent for sprinkling on soy yogurt or in a bowl with rice milk.",
    "author": "jana",
    "image": {
      "url": "https://www.allrecipes.com/thmb/845P4OSlCKaUW0o2Y-Lzo6RRNBs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8145427-881271b89634426ead5be8b22a10ca30.jpg",
      "alt": "Vegan Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 30,
    "total_time_minutes": 40,
    "servings": "10",
    "ingredients": [
      "cooking spray",
      "3 cups rolled oats",
      "0.66666668653488 cup wheat germ",
      "0.5 cup slivered almonds",
      "1 pinch ground nutmeg",
      "1.5 teaspoons ground cinnamon",
      "0.5 cup apple juice",
      "0.5 cup molasses",
      "1 teaspoon vanilla extract",
      "1 cup dried mixed fruit",
      "1 cup quartered dried apricots"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Prepare two cookie sheets with cooking spray.",
      "In a large bowl, combine oats, wheat germ, almonds, cinnamon and nutmeg. In a separate bowl, mix apple juice, molasses and extract. Pour the wet ingredients into the dry ingredients, stirring to coat. Spread mixture onto baking sheets.",
      "Bake for 30 minutes in preheated oven, stirring mixture every 10 to 15 minutes, or until granola has a golden brown color. Let cool. Stir in dried fruit. Store in an airtight container."
    ],
    "nutrition_per_serving": {
      "calories": 291,
      "total_fat_g": 6.0,
      "carbohydrates_g": 55.0,
      "fiber_g": 6.0,
      "sugar_g": 18.0,
      "protein_g": 7.0,
      "sodium_mg": 14,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 17,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8514636/air-fryer-pizza/",
    "category": "Pizza",
    "id": 8514636,
    "name": "Air Fryer Pizza",
    "description": "Use your air fryer to make personal pizzas which can be easily be customized to everyone's liking.",
    "author": "lutzflcat",
    "image": {
      "url": "https://www.allrecipes.com/thmb/8HxaI2M1ut7nSGMMFqEt2F1XmJk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1669917896Air20Fryer20Pizza-2000-8f8df1f8938342b3b4adb6a8f7785798.jpeg",
      "alt": "Air Fryer Pizza"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 8,
    "total_time_minutes": 23,
    "servings": "2",
    "ingredients": [
      "olive oil cooking spray",
      "1 (13.8 ounce) package refrigerated pizza dough (such as Pillsbury\u00ae)",
      "6 tablespoons pizza sauce, divided",
      "10 ounces shredded mozzarella cheese, divided",
      "14 slices pepperoni, divided",
      "0.5 cup onion slices, divided",
      "sprinkle of dried basil and red pepper flakes (optional)"
    ],
    "instructions": [
      "Preheat the air fryer for 5 minutes at 380 degrees F (190 degrees C). Spray the air fryer basket with olive oil spray or line with a parchment liner to avoid sticking.",
      "Remove crust from the can, and cut in half. Shape each piece of dough into a circle and crimping up the edges to form a crust. Make sure it'll fit in your air fryer basket. Carefully transfer one pizza crust to the air fryer basket and spray lightly with olive oil spray. Prick the dough with a fork and precook for 3 minutes.",
      "Spread 3 tablespoons pizza sauce onto the crust in the air fryer basket and sprinkle with 1/2 of the mozzarella cheese. Top with 7 pepperoni slices and half of the onion slices. Sprinkle with basil and red pepper flakes, if using.",
      "Cook until crust is golden brown and crispy and the cheese has melted, 7 to 9 minutes. Keep in mind that cooking times may vary depending on the brand and size of your air fryer, so check frequently to be sure nothing overcooks or burns. Repeat procedure with the second pizza crust. Serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 966,
      "total_fat_g": 36.0,
      "carbohydrates_g": 101.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 55.0,
      "sodium_mg": 2660,
      "cholesterol_mg": 105,
      "saturated_fat_g": 16.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 8,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/283289/spruced-up-canned-corned-beef-hash/",
    "category": "corned-beef",
    "id": 283289,
    "name": "Spruced-Up Canned Corned Beef Hash",
    "description": "This canned corned beef hash recipe is spruced up with bacon, mushrooms, cheese, and eggs in a quick, one-skillet meal that is easy to customize.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/F0bXFGnpeGNHtVIZcnMF-B3Czwc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/283289-spruced-up-canned-corned-beef-hash-RamonaCruz-Peters-Horizontal-4x3-d9c7e949556b424486e74a70ffaf93eb.jpg",
      "alt": "Spruced-Up Canned Corned Beef Hash"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "4 slices bacon, chopped, or more to taste",
      "1 small green bell pepper, diced",
      "1 small onion, diced",
      "1 tablespoon minced garlic",
      "1 (15 ounce) can corned beef hash",
      "1 (4 ounce) can sliced mushrooms, drained",
      "salt and ground black pepper to taste",
      "4 large eggs, beaten",
      "0.25 cup milk",
      "0.75 cup shredded Italian cheese blend"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Saut\u00e9 bacon, bell pepper, onion, and garlic in a large skillet over medium heat until bacon is cooked and onion is translucent, 8 to 10 minutes.",
      "Mix in corned beef hash and mushrooms. Season with salt and pepper. Cook, flipping sections of the hash occasionally, until browned, about 10 minutes.",
      "Meanwhile, whisk eggs and milk together in a small bowl. Once corned beef hash is near done, pour egg mixture into the skillet. Cook, stirring occasionally, until eggs are cooked and no liquid remains, 3 to 5 minutes.",
      "Stir in cheese and serve."
    ],
    "nutrition_per_serving": {
      "calories": 414,
      "total_fat_g": 27.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 25.0,
      "sodium_mg": 1157,
      "cholesterol_mg": 248,
      "saturated_fat_g": 12.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 4,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275456/cast-iron-skillet-vegetable-frittata/",
    "category": "frittatas",
    "id": 275456,
    "name": "Cast Iron Skillet Vegetable Frittata",
    "description": "A variety of fresh vegetables join seasonings and mozzarella cheese in this quick breakfast frittata that's easily prepared in a cast iron skillet.",
    "author": "Father Makes Breakfast",
    "image": {
      "url": "https://www.allrecipes.com/thmb/o2Nu2YLPnldLu3mxaHYGnetj850=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5473585-6bfca0bb64594db293d8049a483aaf8c.jpg",
      "alt": "Cast Iron Skillet Vegetable Frittata"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "3 tablespoons bacon grease, divided",
      "1 head broccoli, chopped",
      "1 onion, diced",
      "1 green bell pepper, chopped",
      "0.5 (6 ounce) can minced black olives",
      "2 teaspoons minced garlic",
      "1 teaspoon chopped fresh oregano",
      "1 teaspoon chopped fresh basil",
      "salt and ground black pepper to taste",
      "6 large eggs",
      "1 cup shredded mozzarella cheese"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Heat a cast iron skillet over medium to medium-low heat. Add 2 tablespoons bacon grease. Stir in broccoli, onion, bell pepper, olives, garlic, oregano, basil, salt, and pepper and cook until vegetables are tender, 7 to 10 minutes. Remove from heat.",
      "Beat eggs in a bowl using a fork. Add mozzarella cheese and cooked vegetable mixture and stir to combine.",
      "Reheat the skillet over low heat; add remaining bacon grease. Pour egg mixture into the skillet.",
      "Bake in the preheated oven until firm and slightly browned, 20 to 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 173,
      "total_fat_g": 10.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 3.0,
      "sugar_g": 4.0,
      "protein_g": 13.0,
      "sodium_mg": 355,
      "cholesterol_mg": 198,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275464/individual-baked-frittatas/",
    "category": "frittatas",
    "id": 275464,
    "name": "Individual Baked Frittatas",
    "description": "Bacon, Cheddar, and broccoli frittatas are baked in mini, single-sized portions in a muffin tin in this recipe that can be easily customized by using different meats or vegetables.",
    "author": "Amy Hendrix Borland",
    "image": {
      "url": "https://www.allrecipes.com/thmb/vd3NtHWCyQOrH3Rta0yOJ6NLP6g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8182625-be9a65e6550642f59e4c955e361ab08f.jpg",
      "alt": "Individual Baked Frittatas"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "12",
    "ingredients": [
      "cooking spray",
      "0.5 pound bacon",
      "1 cup chopped broccoli",
      "1.5 tablespoons water",
      "10 eggs",
      "salt and ground black pepper to taste",
      "1 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C). Coat a 12-cup muffin tin with cooking spray.",
      "Place bacon in a large skillet and cook over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain bacon slices on paper towels. Crumble when cool enough to handle.",
      "Meanwhile, place broccoli and water in a microwave-safe bowl. Cover and cook on high until tender, 1 1/2 to 2 minutes. Carefully remove cover and drain any liquid.",
      "Crack eggs into a bowl and beat with a whisk. Season with salt and pepper.",
      "Layer bacon and broccoli into each muffin cup, filling about 1/3 full. Pour egg mixture into each cup, leaving a bit of space at the top. Sprinkle with Cheddar cheese.",
      "Bake in the preheated oven until a toothpick inserted at the center comes out clean or nearly clean, 15 to 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 127,
      "total_fat_g": 9.0,
      "carbohydrates_g": 1.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 10.0,
      "sodium_mg": 268,
      "cholesterol_mg": 153,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/244547/mocha-granola/",
    "category": "granola",
    "id": 244547,
    "name": "Mocha Granola",
    "description": "Chocolate chips, coffee, and cocoa nibs are baked with oats in this mocha granola, similar to a coffee and chocolate granola found in grocery stores.",
    "author": "Shell Nik",
    "image": {
      "url": "https://www.allrecipes.com/thmb/VXFxB_vorh49sfPyVX0oqMlDBUo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3622600-cf170b92d3cf444da111beddc7bf30f8.jpg",
      "alt": "Mocha Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 50,
    "servings": "8",
    "ingredients": [
      "2 cups rolled oats",
      "0.5 cup coconut oil, melted",
      "0.5 cup chopped hazelnuts",
      "0.25 cup cocoa nibs",
      "3 tablespoons maple syrup",
      "2 tablespoons fresh ground coffee beans",
      "2 tablespoons dark brown sugar",
      "1.5 tablespoons unsweetened cocoa powder",
      "2 teaspoons instant coffee granules",
      "2 teaspoons coffee-flavored extract",
      "1.5 teaspoons kosher salt",
      "1 teaspoon ground cinnamon",
      "0.5 teaspoon ground black pepper",
      "0.5 teaspoon vanilla extract",
      "0.25 cup miniature chocolate chips"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Line a baking sheet with parchment paper.",
      "Mix oats, coconut oil, hazelnuts, cocoa nibs, maple syrup, ground coffee beans, brown sugar, cocoa powder, instant coffee granules, coffee-flavored extract, kosher salt, cinnamon, black pepper, and vanilla extract together in a bowl; spread onto the prepared baking sheet, smoothing with a spatula.",
      "Bake in the preheated oven for 10 minutes; stir and continue cooking until lightly browned and beginning to crisp, about 10 minutes more. Cool granola completely.",
      "Mix chocolate chips into cooled granola and store in an air-tight container."
    ],
    "nutrition_per_serving": {
      "calories": 341,
      "total_fat_g": 23.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 5.0,
      "sugar_g": 12.0,
      "protein_g": 5.0,
      "sodium_mg": 371,
      "cholesterol_mg": 0,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.5,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16715/vegetarian-chickpea-sandwich-filling/",
    "category": "cooking-for-one",
    "id": 16715,
    "name": "Vegetarian Chickpea Sandwich Filling",
    "description": "Make a chickpea sandwich with this delicious, easy, no-cook spread made with celery, onion, mayo, lemon, and dill that is vegetarian and gluten free.",
    "author": "Heather Fantasia",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Q8xvBrX9Ler0-khXkcjjtOn2UAg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16715-VegetarianChickpeaSandwichFilling-ddmfs-4x3-0108-14193ef8d4644d5b80aac2a14c473d59.jpg",
      "alt": "Vegetarian Chickpea Sandwich Filling"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "3",
    "ingredients": [
      "1 (15.5 ounce) can chickpeas, drained and rinsed",
      "1 stalk celery, chopped",
      "0.5 onion, chopped",
      "1 tablespoon mayonnaise, or to taste",
      "1 tablespoon lemon juice",
      "1 teaspoon dried dill weed",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Mash chickpeas in a medium bowl with a fork.",
      "Mix in celery, onion, mayonnaise, lemon juice, and dill until well combined. Season with salt and pepper.",
      "Serve on bread and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 259,
      "total_fat_g": 6.0,
      "carbohydrates_g": 44.0,
      "fiber_g": 9.0,
      "sugar_g": 1.0,
      "protein_g": 9.0,
      "sodium_mg": 576,
      "cholesterol_mg": 2,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 1571,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23539/strawberry-oatmeal-breakfast-smoothie/",
    "category": "high-fiber",
    "id": 23539,
    "name": "Strawberry Oatmeal Breakfast Smoothie",
    "description": "This oatmeal smoothie has a deep pink color and a rich, creamy texture. It's fast, filling, and delicious \u2014 perfect for a quick on-the-go breakfast!",
    "author": "ASTROPHE",
    "image": {
      "url": "https://www.allrecipes.com/thmb/yAqNRbr8ZGLRIJfHUNPZ3yYNiRA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23539-strawberry-oatmeal-breakfast-smoothie-ddmfs-step-4-0405-3a9f771374b24edba48ecfc919085e7e.jpg",
      "alt": "Strawberry Oatmeal Breakfast Smoothie"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "2",
    "ingredients": [
      "1 cup soy milk",
      "0.5 cup rolled oats",
      "14 frozen strawberries",
      "1 banana, broken into chunks",
      "1.5 teaspoons white sugar",
      "0.5 teaspoon vanilla extract"
    ],
    "instructions": [
      "Gather ingredients.",
      "Blend soy milk, oats, strawberries, and banana in a blender until smooth. Add sugar and vanilla and blend again until smooth.",
      "Pour into glasses and serve."
    ],
    "nutrition_per_serving": {
      "calories": 142,
      "total_fat_g": 4.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 7.0,
      "sodium_mg": 63,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 1246,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/47044/spinach-and-potato-frittata/",
    "category": "breakfast-potatoes",
    "id": 47044,
    "name": "Spinach and Potato Frittata",
    "description": "This tasty potato frittata is loaded with creamy reds, fresh spinach, garlic, green onions, and cheese for a scrumptious brunch or breakfast dish.",
    "author": "Cheryl Leiser Harding",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Dko36RXxgtT6wKpKesKyfUUZOqk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/47044-spinach-and-potato-frittata-DDMFS-4x3-127-977d4c356fdb4a469d87d22feda736e9.jpg",
      "alt": "Spinach and Potato Frittata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "2 tablespoons olive oil",
      "6 small red potatoes, sliced",
      "1 cup torn fresh spinach",
      "2 tablespoons sliced green onions",
      "1 teaspoon crushed garlic",
      "salt and pepper to taste",
      "6 large eggs",
      "0.33333334326744 cup milk",
      "0.5 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Heat olive oil in a medium skillet over medium heat. Cook potatoes in hot oil, stirring occasionally, until tender but firm, about 10 minutes.",
      "Mix in spinach, green onions, and garlic. Season with salt and pepper. Cook and stir until spinach is wilted, 1 to 2 minutes.",
      "Beat together eggs and milk in a medium bowl. Pour over vegetables in the skillet. Sprinkle with Cheddar cheese. Reduce heat to low, cover, and cook until eggs are firm, 5 to 7 minutes.",
      "Slice and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 281,
      "total_fat_g": 13.0,
      "carbohydrates_g": 29.0,
      "fiber_g": 3.0,
      "sugar_g": 3.0,
      "protein_g": 13.0,
      "sodium_mg": 175,
      "cholesterol_mg": 197,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 656,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/43051/plain-cake-doughnuts/",
    "category": "doughnuts",
    "id": 43051,
    "name": "Best Cake Doughnuts",
    "description": "This cake donut recipe is simple to make, lightly spiced with cinnamon and nutmeg, and delicious coated with cinnamon sugar or a powdered sugar glaze.",
    "author": "Jennifer Long",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ceT1zLYjFRiB89mrzwKHgGRQWws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-43051-plain-cake-doughnuts-DDMFS-4x3-1e6a5355b51e40cc8dee315160932588.jpg",
      "alt": "Best Cake Doughnuts"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "12",
    "ingredients": [
      "2 cups all-purpose flour",
      "0.5 cup white sugar",
      "1 tablespoon baking powder",
      "1 teaspoon salt",
      "0.25 teaspoon ground cinnamon",
      "1 dash ground nutmeg",
      "2 tablespoons melted butter",
      "0.5 cup milk",
      "1 egg, beaten",
      "1 quart oil for frying"
    ],
    "instructions": [
      "Gather all ingredients. Heat oil in a deep-fryer to 375 degrees F (190 degrees C).",
      "Sift together flour, sugar, baking powder, salt, cinnamon, and nutmeg in a large bowl.",
      "Mix in butter until crumbly.",
      "Stir in milk and egg until smooth.",
      "Knead lightly, then turn out onto a lightly floured surface. Roll or pat to 1/4-inch thickness.",
      "Cut with a doughnut cutter, or use two round biscuit cutters of different sizes.",
      "Lay doughnuts in hot oil, a few at a time. Do not overcrowd the pan, or oil may overflow.",
      "Fry, turning once, until golden, about 3 minutes.",
      "Drain on paper towels.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 202,
      "total_fat_g": 10.0,
      "carbohydrates_g": 25.0,
      "fiber_g": 1.0,
      "sugar_g": 9.0,
      "protein_g": 3.0,
      "sodium_mg": 302,
      "cholesterol_mg": 21,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 500,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21857/ultimate-breakfast-casserole/",
    "category": "breakfast-potatoes",
    "id": 21857,
    "name": "Ultimate Breakfast Casserole",
    "description": "Ham and potato casserole in a creamy sauce. Drizzling butter on top is the key to a delicate golden crust.",
    "author": "LyShanya Davis",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Dgx-_aAiWX6J0dh0dGvFwmq5Fao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5170723-ultimate-breakfast-casserole-Skgeiger-4x3-1-51fe7bb4808642119dfe87ac70908004.jpg",
      "alt": "Ultimate Breakfast Casserole"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 45,
    "total_time_minutes": 60,
    "servings": "8",
    "ingredients": [
      "3 eggs, beaten",
      "1 pinch ground black pepper",
      "1 (10.75 ounce) can condensed cream of chicken soup",
      "16 ounces sour cream",
      "1 (2 pound) package frozen hash brown potatoes, thawed",
      "2 cups cooked ham, cubed",
      "1 onion, chopped",
      "0.75 cup shredded Cheddar cheese",
      "0.25 cup butter, melted"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Lightly grease a 9x13 inch baking dish.",
      "Season beaten eggs with pepper; pour into baking dish. In a large bowl, combine soup, sour cream, hash browns, ham, onion and cheese. Mix thoroughly and pour over eggs.",
      "Bake uncovered for 30 minutes. Remove and drizzle butter over top of casserole. Return to oven and bake for an additional 15 minutes, until golden."
    ],
    "nutrition_per_serving": {
      "calories": 444,
      "total_fat_g": 37.0,
      "carbohydrates_g": 27.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 17.0,
      "sodium_mg": 923,
      "cholesterol_mg": 143,
      "saturated_fat_g": 19.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 283,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23913/spicy-potatoes-and-scrambled-eggs/",
    "category": "breakfast-potatoes",
    "id": 23913,
    "name": "Spicy Potatoes and Scrambled Eggs",
    "description": "Breakfast eggs and potatoes can be simple or spicy. This recipe uses cumin, coriander, turmeric, and chili powder to add a little kick to the home fries.",
    "author": "Anju",
    "image": {
      "url": "https://www.allrecipes.com/thmb/HzTvptdTMcIrWUYarEcCn5Bsdzk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23913-Spicy-Potatoes-and-Scrambled-Eggs-ddmfs-4x3-185-aa3a6afa3b6e4834b6ab421b11d08764.jpg",
      "alt": "Spicy Potatoes and Scrambled Eggs"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "2 medium potatoes, scrubbed",
      "4 tablespoons vegetable oil, divided",
      "0.5 teaspoon ground cumin",
      "0.5 teaspoon ground coriander",
      "0.5 teaspoon turmeric powder",
      "0.5 teaspoon chili powder",
      "0.5 teaspoon salt",
      "3 large eggs, beaten",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Use a fork to pierce potato skins. Microwave potatoes on high until tender, 7 to 8 minutes. Let cool briefly, then peel and cut into small cubes.",
      "Heat 2 tablespoons oil in a skillet over medium-high heat. Stir in cumin, coriander, turmeric, chili powder, and 1/2 teaspoon salt, then add potatoes. Cook, stirring occasionally, until crispy and golden brown, 5 to 10 minutes.",
      "Meanwhile, heat 2 tablespoons oil in another skillet over medium-high heat. Pour eggs into the skillet; cook and stir until eggs are set, about 5 minutes. Season with salt and pepper and serve with potatoes."
    ],
    "nutrition_per_serving": {
      "calories": 209,
      "total_fat_g": 18.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 6.0,
      "sodium_mg": 351,
      "cholesterol_mg": 140,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 80,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235546/hash-brown-waffles/",
    "category": "breakfast-potatoes",
    "id": 235546,
    "name": "Hash Brown Waffles",
    "description": "These hash brown waffles are made in a waffle maker for a perfectly crunchy potato treat that can be topped with eggs for a savory weekend breakfast.",
    "author": "Janel",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Bg9_a44fMyXb9GWbtMuIAjRg0tk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1091030-56e7b4877307491398c31945ff5368b1.jpg",
      "alt": "Hash Brown Waffles"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "cooking spray",
      "1 pound yellow potatoes, shredded",
      "2 tablespoons vegetable oil",
      "1 clove garlic, minced",
      "0.5 teaspoon salt",
      "0.25 teaspoon ground black pepper",
      "0.25 teaspoon smoked paprika",
      "2 large eggs, lightly beaten"
    ],
    "instructions": [
      "Preheat the waffle iron according to manufacturer's instructions. Grease the waffle iron with cooking spray.",
      "Place potatoes in a medium bowl. Pour in enough cold water to cover potatoes; soak for 2 to 3 minutes. Drain and rinse to remove starch. Squeeze water from potatoes by hand or roll in a clean kitchen towel and twist the towel to wring out water.",
      "Toss potatoes with oil, garlic, salt, pepper, and paprika in a large bowl until evenly coated. Stir eggs into potato mixture until well combined.",
      "Spoon 1/2 of the potato mixture into the preheated waffle iron; close and cook until potatoes are tender and golden brown, 5 to 8 minutes. Repeat with remaining potato mixture."
    ],
    "nutrition_per_serving": {
      "calories": 372,
      "total_fat_g": 19.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 11.0,
      "sodium_mg": 669,
      "cholesterol_mg": 186,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 79,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/265505/maple-and-brown-sugar-oatmeal/",
    "category": "high-fiber",
    "id": 265505,
    "name": "Maple and Brown Sugar Oatmeal",
    "description": "Recreate maple and brown sugar oatmeal packets from scratch using this super quick and easy recipe that beats store-bought oatmeal any day.",
    "author": "Brandy Despang",
    "image": {
      "url": "https://www.allrecipes.com/thmb/2-QBwvkkuKObAQDVL4B1R8ReFSU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/265505-maple-and-brown-sugar-oatmeal-DDMFS-beauty_3x4-3228-ac98030b91b84fca9e80c524332e5d01.jpg",
      "alt": "Maple and Brown Sugar Oatmeal"
    },
    "prep_time_minutes": 2,
    "cook_time_minutes": 6,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "1.5 cups water",
      "0.75 cup quick-cooking oats",
      "1 tablespoon packed dark brown sugar",
      "1 tablespoon maple syrup"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Bring water to a boil in a small pot. Add oats and cook, stirring, for 1 minute.",
      "Remove from heat and stir in brown sugar and maple syrup. Let sit until desired thickness is reached, 2 to 3 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 334,
      "total_fat_g": 4.0,
      "carbohydrates_g": 68.0,
      "fiber_g": 6.0,
      "sugar_g": 26.0,
      "protein_g": 8.0,
      "sodium_mg": 20,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 37,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/142748/bauernomlett-farmers-omelet/",
    "category": "breakfast-and-brunch",
    "id": 142748,
    "name": "Bauernomlett (Farmer's Omelet)",
    "description": "Eggs, bacon and potatoes all blend into one dish for a simple breakfast option. Serve it with ketchup for the kids or with a dill pickle for a German-style brunch.",
    "author": "anjamizner",
    "image": {
      "url": "https://www.allrecipes.com/thmb/E9axXgptI79zvcEGP3go4OUSVuM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/142748bauernomlett-farmers-omeletlutzflcat4x3-33b8c085749f437f869825678f6861d3.jpg",
      "alt": "Bauernomlett (Farmer's Omelet)"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "2",
    "ingredients": [
      "1 teaspoon butter",
      "3 slices bacon, cut into 1/2 inch pieces",
      "2 potatoes",
      "3 eggs",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Place potatoes in a saucepan covered by lightly salted water. Bring to a boil over high heat, then reduce heat to medium, and simmer until tender, 10 to 15 minutes. Drain and allow to cool, then cut into 1/4-inch slices.",
      "Melt the butter in a skillet over medium heat. Cook the bacon strips in the butter until browned, 5 to 7 minutes; remove bacon and set aside. Add the potatoes to the bacon fat and cook over medium-high heat until browned, about 5 minutes.",
      "Beat the eggs with the salt and pepper. Pour the egg mixture into the skillet, and mix with the potatoes and bacon; allow to cook until eggs are set, 3 to 5 minutes, turning once."
    ],
    "nutrition_per_serving": {
      "calories": 351,
      "total_fat_g": 15.0,
      "carbohydrates_g": 38.0,
      "fiber_g": 5.0,
      "sugar_g": 2.0,
      "protein_g": 18.0,
      "sodium_mg": 440,
      "cholesterol_mg": 266,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 32,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/279777/quick-black-bean-chilaquiles/",
    "category": "chilaquiles",
    "id": 279777,
    "name": "Quick Black Bean Chilaquiles",
    "description": "This black bean chilaquiles recipe makes a quick Mexican-style breakfast using pantry staples: tortilla chips, salsa, canned black beans, veggies, and eggs.",
    "author": "Matthew Francis",
    "image": {
      "url": "https://www.allrecipes.com/thmb/qO6bOMECEdpP90wczlWVh14Mf7A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7978520-468891b385ca485fadb8f269ca8c03ee.jpg",
      "alt": "Quick Black Bean Chilaquiles"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "1 tablespoon vegetable oil",
      "1 onion, chopped",
      "4 cups tortilla chips",
      "6 large eggs",
      "2 cups chipotle salsa",
      "1 (15 ounce) can black beans, rinsed and drained",
      "1 avocado, sliced",
      "0.5 cup crumbled queso fresco",
      "0.25 cup diced red onion",
      "2 tablespoons chopped fresh cilantro"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium-high heat until it shimmers. Add onion; cook until slightly softens, about 5 minutes. Add tortilla chips, then add eggs; stir until almost set, 3 to 4 minutes. Add salsa and black beans; stir until combined and heated through, about 5 minutes.",
      "Top chilaquiles with avocado, queso fresco, red onion, and cilantro; serve immediately."
    ],
    "nutrition_per_serving": {
      "calories": 358,
      "total_fat_g": 18.0,
      "carbohydrates_g": 35.0,
      "fiber_g": 10.0,
      "sugar_g": 5.0,
      "protein_g": 17.0,
      "sodium_mg": 963,
      "cholesterol_mg": 193,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 32,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/140318/summer-soup-of-butternut-and-corn/",
    "category": "butternut-squash-soups",
    "id": 140318,
    "name": "Summer Soup of Butternut and Corn",
    "description": "Full of summer flavor, butternut squash and corn soup is brightened with plain yogurt and seasoned with basil and nutmeg. This is an easy make ahead lunch or could be combined with a salad and crusty bread for an easy dinner.",
    "author": "the butterfly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/54bA47YvcX_uGHqrVB1aO-CQs9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2277903-17633bcd0279478ea1eb9ea1c2b0614d.jpg",
      "alt": "Summer Soup of Butternut and Corn"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "1 tablespoon olive oil",
      "1 clove garlic, minced",
      "1 onion, chopped",
      "1 butternut squash, peeled and cubed",
      "1 cup corn",
      "3 cups vegetable stock",
      "1 teaspoon dried basil",
      "0.5 teaspoon ground black pepper",
      "0.5 cup plain yogurt",
      "0.5 teaspoon ground nutmeg"
    ],
    "instructions": [
      "Heat the olive oil in a Dutch oven over medium-high heat. Cook and stir the garlic and onion in the oil until soft and translucent. Add the butternut squash and corn and cook for 3 more minutes. Pour the stock into the Dutch oven and bring to a boil; season with basil and black pepper.",
      "Reduce the heat to medium-low and simmer uncovered until the squash is tender, about 15 minutes. Remove the Dutch oven from the heat and using a hand blender, or working in batches with a counter top blender, process the soup until smooth. Stir in the yogurt and nutmeg."
    ],
    "nutrition_per_serving": {
      "calories": 235,
      "total_fat_g": 5.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 8.0,
      "sugar_g": 13.0,
      "protein_g": 7.0,
      "sodium_mg": 384,
      "cholesterol_mg": 2,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 30,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/73155/porridge/",
    "category": "low-fat",
    "id": 73155,
    "name": "Porridge",
    "description": "This creamy porridge made with rolled oats, bananas, and cinnamon makes a warm and satisfying breakfast to get your morning off to a good start!",
    "author": "AnneDuncan",
    "image": {
      "url": "https://www.allrecipes.com/thmb/-EjKvk_lbAy_9uikIR0OJKcC0EY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/73155-porridge-VAT-Beauty-4x3-007183c6c14c48e38b9ae6d709a6cd7e.jpg",
      "alt": "Porridge"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 10,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "2.5 cups water",
      "1 cup rolled oats",
      "1 tablespoon white sugar",
      "1 teaspoon salt",
      "2 bananas, sliced",
      "1 pinch ground cinnamon",
      "0.5 cup cold milk"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Combine water and oats in a saucepan; season to taste with sugar and salt. Add bananas and cinnamon.",
      "Bring to a boil, then reduce heat to low, and simmer until the liquid has been absorbed, stirring frequently.",
      "Pour into bowls, and top each with a splash of cold milk."
    ],
    "nutrition_per_serving": {
      "calories": 157,
      "total_fat_g": 2.0,
      "carbohydrates_g": 32.0,
      "fiber_g": 4.0,
      "sugar_g": 12.0,
      "protein_g": 4.0,
      "sodium_mg": 600,
      "cholesterol_mg": 2,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 25,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/145967/quick-and-easy-grilled-cheese/",
    "category": "sugar-free-recipes",
    "id": 145967,
    "name": "Quick and Easy Grilled Cheese",
    "description": "A fresh herb seasoning added to a grilled cheese sandwich takes this lunchtime favorite to new heights.",
    "author": "jofdo",
    "image": {
      "url": "https://www.allrecipes.com/thmb/usqheNHh2i7E9yl7d6pwF1By3BI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9416780-5115b56e1f584e9ab646680ee4798c48.jpg",
      "alt": "Quick and Easy Grilled Cheese"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "1",
    "ingredients": [
      "2 slices sharp Cheddar cheese",
      "2 slices bread",
      "1 tablespoon chopped fresh parsley",
      "1 teaspoon chopped fresh basil",
      "1 teaspoon chopped fresh oregano",
      "1 teaspoon chopped fresh rosemary",
      "1 teaspoon chopped fresh dill",
      "1 tablespoon butter, softened, divided"
    ],
    "instructions": [
      "Layer Cheddar slices onto 1 piece bread. Sprinkle parsley, basil, oregano, rosemary, and dill over the cheese; top with remaining bread. Spread the top of sandwich with 1 tablespoon butter.",
      "Heat a skillet over medium heat. Gently flip sandwich, buttered-side down, into the hot skillet; spread remaining 1 tablespoon butter on the top. Cook until cheese has melted, about 3 minutes per side."
    ],
    "nutrition_per_serving": {
      "calories": 471,
      "total_fat_g": 32.0,
      "carbohydrates_g": 27.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 18.0,
      "sodium_mg": 777,
      "cholesterol_mg": 90,
      "saturated_fat_g": 20.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 19,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/237292/gluten-free-donuts/",
    "category": "doughnuts",
    "id": 237292,
    "name": "Gluten-Free Donuts",
    "description": "Gluten-free donuts made with coconut flour, almond flour, and gluten-free all-purpose flour are light and airy you won't even notice they're gluten free.",
    "author": "Michelle2s",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Iuse67ttjwiE5Abpc-4xj5AKNQc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3597773-1fb39fe1172f49f68d1a585bd809e0d0.jpg",
      "alt": "Gluten-Free Donuts"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "1 quart olive oil for frying, or as needed",
      "5 tablespoons coconut milk",
      "0.25 cup gluten-free all-purpose baking flour",
      "1 egg",
      "2 tablespoons almond flour",
      "2 tablespoons coconut flour",
      "2 teaspoons honey",
      "0.25 teaspoon guar gum",
      "0.5 cup confectioners' sugar"
    ],
    "instructions": [
      "Heat oil in a deep fryer or in a large saucepan to 300 degrees F (150 degrees C).",
      "Beat coconut milk, all-purpose flour, egg, almond flour, coconut flour, honey, and guar gum together in a bowl using a hand mixer until mixture resembles thick pancake batter.",
      "Drop batter by rounded spoonfuls, in batches, into the hot oil; fry until donuts are dark brown, 3 to 5 minutes. Transfer donuts to a paper-towel-lined plate with a slotted spoon. Pour confectioners' sugar into a shallow bowl. Roll donuts in confectioners' sugar until coated."
    ],
    "nutrition_per_serving": {
      "calories": 391,
      "total_fat_g": 30.0,
      "carbohydrates_g": 30.0,
      "fiber_g": 3.0,
      "sugar_g": 19.0,
      "protein_g": 4.0,
      "sodium_mg": 20,
      "cholesterol_mg": 47,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 16,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/236205/peanut-butter-strawberry-smoothie/",
    "category": "smoothies",
    "id": 236205,
    "name": "Peanut Butter Strawberry Smoothie",
    "description": "This simple peanut butter strawberry smoothie pairs strawberries and peanut butter with yogurt and milk. The recipe yields one smoothie in 10 minutes.",
    "author": "annthefirst",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Zcij2V6FlpMwGyEzV4O8MdngzRY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1129217-d8c9929518b84c10951ba787abadb3bb.jpg",
      "alt": "Peanut Butter Strawberry Smoothie"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "8 strawberries, sliced",
      "0.5 cup plain yogurt",
      "0.25 cup milk",
      "2 tablespoons smooth peanut butter",
      "1 teaspoon brown sugar"
    ],
    "instructions": [
      "Place strawberries, yogurt, milk, peanut butter, and brown sugar together in a blender; blend for 2 minutes then rest for 10 seconds. Blend until smooth, 2 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 363,
      "total_fat_g": 20.0,
      "carbohydrates_g": 33.0,
      "fiber_g": 5.0,
      "sugar_g": 26.0,
      "protein_g": 18.0,
      "sodium_mg": 263,
      "cholesterol_mg": 12,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 12,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8508761/southwest-chicken-salad/",
    "category": "chicken-salads",
    "id": 8508761,
    "name": "Southwest Chicken Salad",
    "description": "This bold grilled chicken salad with a fresh lime-avocado-ranch dressing brings all the Southwest flavor.",
    "author": "Soup Loving Nicole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/PHbBvI8gu8OPMQKKNkKDECVxGcA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8508761-southwest-chicken-salad-DDMFS-Beauty-4x3-9c05533b04df4de387b18d6e0ab60324.jpg",
      "alt": "Southwest Chicken Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "2",
    "ingredients": [
      "1 avocado - peeled, pitted, and chopped",
      "0.25 cup sour cream",
      "1 tablespoon mayonnaise",
      "1 tablespoon water",
      "2 tablespoons freshly squeezed lime juice",
      "0.5 (1 ounce) packet ranch dressing mix",
      "0.5 teaspoon salt",
      "2 (6 ounce) skinless, boneless chicken breast halves",
      "1 tablespoon olive oil",
      "1.5 tablespoons fajita seasoning",
      "1 medium ear corn, husk and silk removed",
      "1 medium head romaine lettuce, chopped",
      "0.5 cup halved grape tomatoes",
      "1 (15 ounce) can black beans, rinsed and drained",
      "0.5 small red onion, sliced into petals"
    ],
    "instructions": [
      "Gather the ingredients.",
      "Combine avocado, sour cream, mayonnaise, water, lime juice, ranch seasoning, and salt in a food processor. Blend until smooth. Refrigerate until ready to use.",
      "Place the chicken in a bowl. Add olive oil and fajita seasoning. Toss until evenly combined.",
      "Prepare a grill over medium-high heat and lightly oil the grate. Add chicken and corn. Grill, turning once, until corn is tender and chicken is no longer pink in the center and juices run clear, about 10 minutes per side. An instant-read thermometer inserted near the center should read 165 degrees F (74 degrees C). Transfer to a cutting board.",
      "Divide romaine, tomatoes, black beans, and onions between two serving plates. Cut corn off the cob; divide between the two plates.",
      "Slice chicken breast; divide between the 2 plates. Drizzle each salad with avocado dressing to serve."
    ],
    "nutrition_per_serving": {
      "calories": 827,
      "total_fat_g": 37.0,
      "carbohydrates_g": 71.0,
      "fiber_g": 27.0,
      "sugar_g": 0,
      "protein_g": 59.0,
      "sodium_mg": 2305,
      "cholesterol_mg": 114,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 5,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8535348/leftover-pork-fried-rice/",
    "category": "fried-rice",
    "id": 8535348,
    "name": "Leftover Pork Fried Rice",
    "description": "This fried rice recipe makes use of leftover pork and rice in the most delicious way. It's faster than ordering takeout!",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/OJ0BAt7vv0NVPpDQ7PoVaOxBlTs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8535348_Leftover-Pork-Fried-Rice_thedailygourmet_4x3-d5a1926b8a5641868dd48949f09d6463.jpg",
      "alt": "Leftover Pork Fried Rice"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "2",
    "ingredients": [
      "3 large eggs",
      "1 tablespoon soy sauce",
      "3 tablespoons butter",
      "6 cloves garlic, chopped",
      "4 green onions, chopped, white and green parts separated",
      "0.5 cup frozen mixed peas and carrots",
      "0.25 onion, thinly sliced",
      "2 cooked pork chops, meat cut into 1/2-inch pieces, bones discarded",
      "2 cups cooked rice",
      "salt and freshly ground black pepper to taste"
    ],
    "instructions": [
      "Whisk eggs and soy sauce in a bowl. Stir in rice, breaking up clumps; set aside.",
      "Melt butter in a wok over medium-high heat. Stir in garlic, white part of green onion, peas and carrots, and onion slices. Stir fry for 3 minutes; stir in pork.",
      "Pour egg mixture into wok; stir fry until eggs are cooked through and rice is golden, and all ingredients are hot, about 7 minutes. Season with salt and ground black pepper; garnish with chopped green onion tops."
    ],
    "nutrition_per_serving": {
      "calories": 735,
      "total_fat_g": 39.0,
      "carbohydrates_g": 56.0,
      "fiber_g": 3.0,
      "sugar_g": 0,
      "protein_g": 39.0,
      "sodium_mg": 1353,
      "cholesterol_mg": 387,
      "saturated_fat_g": 19.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.4,
    "review_count": 5,
    "recipe_category": "Lunch",
    "cuisine": "Asian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/102151/easy-baking-powder-drop-biscuits/",
    "category": "biscuits",
    "id": 102151,
    "name": "Easy Baking Powder Drop Biscuits",
    "description": "This easy drop biscuit recipe is made with a handful of pantry and fridge staples. Whip up a batch while you make your favorite sausage gravy!",
    "author": "CookieeMonster13",
    "image": {
      "url": "https://www.allrecipes.com/thmb/BNai0t_CgmkL9bAB0NSAP5CflOM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6054694-5e46bd5379a048f5ac5ec17ffefbb9dc.jpg",
      "alt": "Easy Baking Powder Drop Biscuits"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "12",
    "ingredients": [
      "2 cups all-purpose flour",
      "1 tablespoon white sugar",
      "2.5 teaspoons baking powder",
      "0.5 teaspoon salt",
      "0.5 cup chilled butter, diced",
      "1.25 cups whole milk"
    ],
    "instructions": [
      "Gather the ingredients. Preheat the oven to 450 degrees F (230 degrees C). Lightly grease a baking sheet.",
      "Mix flour, sugar, baking powder, and salt together in a large bowl. Cut in cold butter with a knife or pastry blender until the mixture resembles coarse crumbs.",
      "Stir in milk, a little at a time, until dough is moistened.",
      "Drop dough by heaping spoonfuls onto the prepared baking sheet.",
      "Bake in the preheated oven until golden, 12 to 15 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 163,
      "total_fat_g": 9.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 3.0,
      "sodium_mg": 264,
      "cholesterol_mg": 23,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 451,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/21005/easy-banana-fritters/",
    "category": "doughnuts",
    "id": 21005,
    "name": "Easy Banana Fritters",
    "description": "These easy banana fritters made with ripe bananas are dipped in batter seasoned with cinnamon and nutmeg. They're a nice alternative to apple fritters.",
    "author": "MY2ANGELS",
    "image": {
      "url": "https://www.allrecipes.com/thmb/bUCKmZ_Zn4jjQmZkNSnwT-U0SrE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/387766-426ff2c4d3a84b6ba3e8cb97d7957ed1.jpg",
      "alt": "Easy Banana Fritters"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": "6",
    "ingredients": [
      "1 cup all-purpose flour",
      "3 tablespoons white sugar",
      "1 teaspoon baking powder",
      "0.5 teaspoon salt",
      "0.25 teaspoon ground cinnamon",
      "1 pinch ground nutmeg",
      "2 ripe bananas",
      "2 eggs",
      "2 tablespoons milk",
      "1 tablespoon margarine, melted",
      "1 quart oil for frying",
      "1 cup confectioners' sugar for dusting"
    ],
    "instructions": [
      "Combine flour, white sugar, baking powder, salt, cinnamon, and nutmeg in a small bowl.",
      "In a large bowl, mash bananas. Mix in eggs, milk, and margarine until smooth. Stir in flour mixture.",
      "Heat 1/2 inch oil in a deep fryer or heavy-bottomed pan to 375 degrees F (190 degrees C). Drop batter by spoonfuls into hot oil, and cook, turning once, until browned, 2 to 8 minutes. Drain on paper towels and dust with confectioners' sugar."
    ],
    "nutrition_per_serving": {
      "calories": 916,
      "total_fat_g": 79.0,
      "carbohydrates_g": 52.0,
      "fiber_g": 2.0,
      "sugar_g": 30.0,
      "protein_g": 5.0,
      "sodium_mg": 285,
      "cholesterol_mg": 62,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 234,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/20020/american-frittata/",
    "category": "frittatas",
    "id": 20020,
    "name": "American Frittata",
    "description": "Potatoes, onions, ham and eggs make this a frittata that's sure to please everyone.",
    "author": "Jody Howell",
    "image": {
      "url": "https://www.allrecipes.com/thmb/irdLzsdFx9Lbi-Ewgq7y8BK2nNY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2392207-american-frittata-Scotdog-4x3-1-6ff33b2f69384f909fd91e9611f06393.jpg",
      "alt": "American Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "4 potatoes, peeled and cubed",
      "0.5 onions, sliced",
      "1 tablespoon vegetable oil",
      "8 eggs, beaten",
      "0.75 cup cubed ham",
      "salt and pepper to taste",
      "0.75 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Bring a large pot of salted water to a boil. Add potatoes and cook until tender but still firm, about 5 minutes. Drain and set aside to cool. Meanwhile, preheat oven to 350 degrees F (175 degrees C).",
      "In a cast iron skillet, heat oil over medium heat. Add onions and cook slowly, stirring occasionally, until onions are soft.",
      "Stir in eggs, drained potatoes, ham, salt and pepper. Cook until eggs are firm on the bottom, about 5 minutes. Top frittata with shredded cheese and place in preheated oven until cheese is melted and eggs are completely firm, about 10 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 234,
      "total_fat_g": 11.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 2.0,
      "sugar_g": 2.0,
      "protein_g": 12.0,
      "sodium_mg": 298,
      "cholesterol_mg": 203,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 182,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/46353/asparagus-and-mushroom-frittata/",
    "category": "frittatas",
    "id": 46353,
    "name": "Asparagus and Mushroom Frittata",
    "description": "This asparagus and mushroom frittata recipe uses fresh asparagus, fresh mushrooms, fresh thyme, mozzarella cheese, and freshly grated Parmesan cheese.",
    "author": "MAGGIDEW",
    "image": {
      "url": "https://www.allrecipes.com/thmb/omMK07nWmobWlgfQ-Io2Np_flSk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/791792-b72faa907b85450a86892b6cf5d9966a.jpg",
      "alt": "Asparagus and Mushroom Frittata"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 40,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "1 tablespoon butter",
      "0.5 pound fresh asparagus, trimmed and cut into 1 inch pieces",
      "3 tablespoons olive oil",
      "0.5 pound fresh mushrooms, sliced",
      "6 eggs",
      "1 tablespoon water",
      "1 teaspoon chopped fresh thyme",
      "0.5 cup shredded mozzarella cheese",
      "3 tablespoons freshly grated Parmesan cheese"
    ],
    "instructions": [
      "Preheat the oven to 325 degrees F (165 degrees C).",
      "Melt butter in an oven-safe skillet over medium heat. Stir in asparagus and olive oil; cook until tender, about 10 minutes. Stir in mushrooms; cook about 5 minutes.",
      "Whisk eggs, water, and thyme together in a bowl; pour into the skillet. Reduce heat to low; cover and cook 5 minutes.",
      "Transfer skillet to the preheated oven; bake until eggs are no longer runny, 10 to 15 minutes. Top frittata with mozzarella cheese and Parmesan cheese. Turn on the broiler and broil until cheeses melt and are lightly browned."
    ],
    "nutrition_per_serving": {
      "calories": 199,
      "total_fat_g": 16.0,
      "carbohydrates_g": 4.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 12.0,
      "sodium_mg": 183,
      "cholesterol_mg": 199,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 119,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/75019/chicken-avocado-and-mango-salad/",
    "category": "chicken-salads",
    "id": 75019,
    "name": "Chicken, Avocado and Mango Salad",
    "description": "This is a colorful and very tasty mix of chicken, mangos, and avocados in a spicy lime dressing.",
    "author": "GreenLime",
    "image": {
      "url": "https://www.allrecipes.com/thmb/5M4pubdykHVxPxAX_pELWaYWLPI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/75019-chicken-avocado-and-mango-salad-VAT-008-4x3-ccaf8d734b0e4b5685023edc70230e09.jpg",
      "alt": "Chicken, Avocado and Mango Salad"
    },
    "prep_time_minutes": 30,
    "cook_time_minutes": null,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "2 tablespoons brown sugar",
      "0.25 cup water",
      "0.33333334326744 cup lime juice",
      "0.5 cup chili garlic sauce",
      "4 cups shredded, cooked chicken",
      "2 medium mangos - peeled, seeded and diced",
      "2 avocados - peeled, pitted and diced",
      "1 (10 ounce) package spring lettuce mix"
    ],
    "instructions": [
      "Gather all ingredients.",
      "In a saucepan over medium-high heat, stir together the brown sugar and water. Bring to a boil, then pour into a medium bowl. Stir in the garlic chili sauce and lime juice. Set the dressing aside.",
      "In a large bowl, toss together the chicken, mangos and avocados.",
      "Arrange the spring salad mix on serving plates, then top with a few spoonfuls of the chicken mixture. Pour dressing over the top."
    ],
    "nutrition_per_serving": {
      "calories": 296,
      "total_fat_g": 16.0,
      "carbohydrates_g": 20.0,
      "fiber_g": 5.0,
      "sugar_g": 12.0,
      "protein_g": 19.0,
      "sodium_mg": 698,
      "cholesterol_mg": 55,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 95,
    "recipe_category": "Lunch",
    "cuisine": "U.S.",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/104804/curried-egg-sandwiches/",
    "category": "egg-salads",
    "id": 104804,
    "name": "Curried Egg Sandwiches",
    "description": "Delicious curried egg salad sandwiches are simple and satisfying. The curry powder gives a nice flavor twist that complements the mayo and egg.",
    "author": "xIndustrialLovex",
    "image": {
      "url": "https://www.allrecipes.com/thmb/UHtxAb9VrJgbtNxsxQfsdCrsXB0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/104804-curried-egg-sandwiches-ddmfs-3x4-c75f6bc7c4f24588a2bf6b59e33b2e37.jpg",
      "alt": "Curried Egg Sandwiches"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "4",
    "ingredients": [
      "4 hard-cooked eggs, peeled and chopped",
      "0.5 cup mayonnaise",
      "1 teaspoon curry powder",
      "salt and pepper to taste",
      "8 slices bread"
    ],
    "instructions": [
      "Gather your ingredients.",
      "Mix together mayonnaise and curry powder in a bowl. Gently stir in eggs, then season to taste with salt and pepper.",
      "Evenly divide between 4 slices of bread, top with remaining 4 slices."
    ],
    "nutrition_per_serving": {
      "calories": 410,
      "total_fat_g": 29.0,
      "carbohydrates_g": 27.0,
      "fiber_g": 1.0,
      "sugar_g": 3.0,
      "protein_g": 10.0,
      "sodium_mg": 704,
      "cholesterol_mg": 222,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 73,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/139948/jamaican-fried-dumplings/",
    "category": "biscuits",
    "id": 139948,
    "name": "Jamaican Fried Dumplings",
    "description": "These fried dumplings are very quick and easy to make. They're typically served with codfish in Jamaica as part of a big weekend breakfast.",
    "author": "Stephanie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/ULTTZjT6GVdsBzkOT-vsFPM4EGA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-139948-Jamaican-Fried-Dumplings-ddmfs-beauty-4x3-6c322c3be8974fc6950a0156b4e4c290.jpg",
      "alt": "Jamaican Fried Dumplings"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "6",
    "ingredients": [
      "4 cups all-purpose flour",
      "2 teaspoons baking powder",
      "1.5 teaspoons salt",
      "0.5 cup butter, cut into cubes and softened",
      "0.5 cup cold water",
      "1 cup vegetable oil for frying"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Mix flour, baking powder, and salt together in a large bowl.",
      "Rub in butter until the mixture is crumbly.",
      "Mix in water, 1 tablespoon at a time, to form a firm dough; knead briefly.",
      "Heat oil in a large heavy skillet over medium heat. Break off pieces of dough and shape them into biscuit-like patties.",
      "Place just enough of the dumplings into the hot oil so they are not crowded; fry until golden brown, about 3 minutes per side.",
      "Remove from the pan and drain on paper towels before serving."
    ],
    "nutrition_per_serving": {
      "calories": 472,
      "total_fat_g": 20.0,
      "carbohydrates_g": 64.0,
      "fiber_g": 2.0,
      "sugar_g": 0.0,
      "protein_g": 9.0,
      "sodium_mg": 855,
      "cholesterol_mg": 41,
      "saturated_fat_g": 10.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 72,
    "recipe_category": "Breakfast",
    "cuisine": "Jamaican",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/48982/corned-beef-hash-cakes/",
    "category": "corned-beef",
    "id": 48982,
    "name": "Corned Beef Hash Cakes",
    "description": "This recipe is delicious, quick and easy. It goes great with green beans, and is the perfect way to use left over mashed potatoes. Serve these corned beef hash patties with green beans for a quick supper or eggs and toast for a hearty breakfast.",
    "author": "KATERS0404",
    "image": {
      "url": "https://www.allrecipes.com/thmb/NwJ3WxUXkUB_NuNRM9gUHcMXzrI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8077741-81408b9021cd4f7ca007dd2288fdf039.jpg",
      "alt": "Corned Beef Hash Cakes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "8",
    "ingredients": [
      "1 tablespoon vegetable oil",
      "1 small onion, chopped",
      "2 cups leftover mashed potatoes",
      "salt and pepper to taste",
      "1 cup shredded cooked corned beef"
    ],
    "instructions": [
      "Heat oil in a large skillet over medium heat. Fry onion in oil until translucent. Transfer to a medium bowl, and mix with mashed potatoes and corned beef. Season with salt and pepper. Form into 8 patties. Fry patties in the skillet over medium-high heat until golden brown on both sides."
    ],
    "nutrition_per_serving": {
      "calories": 114,
      "total_fat_g": 6.0,
      "carbohydrates_g": 10.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 5.0,
      "sodium_mg": 320,
      "cholesterol_mg": 13,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 53,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/212816/foolproof-potato-latkes/",
    "category": "breakfast-potatoes",
    "id": 212816,
    "name": "Foolproof Potato Latkes",
    "description": "Use a food processor to combine ingredients for these crispy latkes.",
    "author": "basg101",
    "image": {
      "url": "https://www.allrecipes.com/thmb/KGtRZQ4ohFf1AMd62kKwnfzys7Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6052746-8404e68069da409994855c2abac5f68c.jpg",
      "alt": "Foolproof Potato Latkes"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "5",
    "ingredients": [
      "4 potatoes, peeled and cubed",
      "1 onion, chopped",
      "2 eggs",
      "2 teaspoons salt",
      "2 tablespoons all-purpose flour, or as needed",
      "1 teaspoon baking powder",
      "0.25 cup canola oil, or as needed"
    ],
    "instructions": [
      "Place 1/4 of the potatoes, onion, eggs, salt, flour, and baking powder in the bowl of a food processor; pulse several times until the vegetables are finely chopped. Add remaining potatoes and pulse again until all potatoes are finely chopped and mixture is thoroughly combined.",
      "Heat canola oil in a skillet over medium heat. Scoop up about 1/3 cup of potato mixture at a time and place in skillet. Fry latkes until brown and crisp on the bottom, 2 to 3 minutes. Flip and cook other sides until brown, 2 to 3 minutes longer.",
      "Repeat with remaining potato mixture, replenishing oil as needed. Serve hot."
    ],
    "nutrition_per_serving": {
      "calories": 289,
      "total_fat_g": 13.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 5.0,
      "sugar_g": 3.0,
      "protein_g": 7.0,
      "sodium_mg": 1068,
      "cholesterol_mg": 74,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 35,
    "recipe_category": "Breakfast",
    "cuisine": "Israeli",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/22391/microwave-english-muffin-bread/",
    "category": "english-muffins",
    "id": 22391,
    "name": "Microwave English Muffin Bread",
    "description": "Try this microwaved bread recipe for delicate English muffin bread that's baked in your microwave! Add cinnamon and raisins if desired.",
    "author": "Larry",
    "image": {
      "url": "https://www.allrecipes.com/thmb/MU786YqTwuh9_cUO0pPI-NXgWfM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4457495-microwave-english-muffin-bread-curlychickadee-4x3-1-088c415a2d754dba9b56b046964b9532.jpg",
      "alt": "Microwave English Muffin Bread"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 55,
    "servings": "10",
    "ingredients": [
      "1 tablespoon yellow cornmeal",
      "0.25 cup warm water (110 degrees F/45 degrees C)",
      "1 (.25 ounce) package active dry yeast",
      "1 cup lukewarm milk",
      "2 teaspoons white sugar",
      "1 teaspoon salt",
      "0.125 teaspoon baking soda",
      "1 cup whole wheat flour",
      "2 cups all-purpose flour"
    ],
    "instructions": [
      "Lightly grease a 9x5-inch microwave-safe loaf pan and sprinkle with cornmeal.",
      "Pour water into a large bowl. Add yeast and stir to dissolve. Add milk, sugar, salt, and baking soda, then add whole wheat flour; beat until well combined. Beat in all-purpose flour, 1/2 cup at a time, until a soft dough forms.",
      "Turn dough out onto a lightly floured surface and knead until smooth, about 5 minutes. Shape dough into a loaf and place into the prepared pan.",
      "Cook, uncovered, in a 650-watt microwave oven set at 50% power for 1 minute. Let rest for 10 minutes.",
      "Repeat Step 4 one or two times, until loaf has doubled in size.",
      "Microwave on high until top of loaf is no longer moist, 4 to 6 minutes.",
      "Remove from the microwave and let stand in the pan for 5 minutes. Remove to a wire rack to finish cooling."
    ],
    "nutrition_per_serving": {
      "calories": 152,
      "total_fat_g": 1.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 2.0,
      "sugar_g": 0,
      "protein_g": 5.0,
      "sodium_mg": 222,
      "cholesterol_mg": 2,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 34,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/245061/healthy-chocolate-smoothie/",
    "category": "smoothies",
    "id": 245061,
    "name": "Healthy Chocolate Smoothie",
    "description": "This chocolate smoothie uses bananas, peanut butter, milk, vanilla, and cocoa for a healthy, kid-friendly beverage perfect for breakfast or a snack.",
    "author": "Chaya",
    "image": {
      "url": "https://www.allrecipes.com/thmb/MMSiRIHhQhOeYGV-cFsMnlCP4XM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8001597-2c200d7af80d4b06a73c488b9b2ab507.jpg",
      "alt": "Healthy Chocolate Smoothie"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "2",
    "ingredients": [
      "2 very ripe bananas",
      "1 cup milk",
      "6 ice cubes",
      "1.5 tablespoons unsweetened cocoa powder",
      "1 tablespoon peanut butter",
      "1 teaspoon vanilla extract"
    ],
    "instructions": [
      "Combine bananas, milk, ice cubes, cocoa powder, peanut butter, and vanilla in a blender; blend on high speed until smooth. Pour into 2 glasses."
    ],
    "nutrition_per_serving": {
      "calories": 229,
      "total_fat_g": 7.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 5.0,
      "sugar_g": 21.0,
      "protein_g": 8.0,
      "sodium_mg": 92,
      "cholesterol_mg": 10,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 27,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/265168/instant-pot-apple-pie-steel-cut-oats/",
    "category": "diabetic",
    "id": 265168,
    "name": "Instant Pot Apple Pie Steel-Cut Oats",
    "description": "Steel-cut oats cook quickly in an Instant Pot and are especially delicious in this apple pie version, which features fresh apples, cinnamon, and nutmeg.",
    "author": "Pamela Wurtz",
    "image": {
      "url": "https://www.allrecipes.com/thmb/kquc8XK8RB9CQMtaCrGdk248roM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5423107-d2b3774716c94111857194b074998718.jpg",
      "alt": "Instant Pot Apple Pie Steel-Cut Oats"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "3 cups water",
      "1 cup steel-cut oats",
      "1 apple, or more to taste, chopped",
      "1.5 teaspoons ground cinnamon",
      "0.5 teaspoon salt",
      "0.25 teaspoon ground nutmeg"
    ],
    "instructions": [
      "Combine water, oats, apple, cinnamon, salt, and nutmeg in a multi-functional pressure cooker (such as Instant Pot). Close and lock the lid. Seal the vent. Select Manual function; set the timer for 5 minutes. Allow 10 to 15 minutes for pressure to build.",
      "Release pressure using the natural-release method according to manufacturer's instructions, about 10 minutes. Release remaining pressure naturally. Stir and remove the pot carefully with oven mitts."
    ],
    "nutrition_per_serving": {
      "calories": 171,
      "total_fat_g": 3.0,
      "carbohydrates_g": 33.0,
      "fiber_g": 5.0,
      "sugar_g": 5.0,
      "protein_g": 5.0,
      "sodium_mg": 297,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 26,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/24342/spanish-tortilla/",
    "category": "frittatas",
    "id": 24342,
    "name": "Spanish Tortilla",
    "description": "Great for breakfast or brunch. Combines eggs with delicious potatoes in a very short time.",
    "author": "Leslie Rosas",
    "image": {
      "url": "https://www.allrecipes.com/thmb/A6hfvLBixz7IljHTB6b09W79RJc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8592703-64f639dbd8434eee8220aad17b1f5a0a.jpg",
      "alt": "Spanish Tortilla"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "0.25 cup olive oil",
      "2 potatoes, peeled",
      "4 slices bacon",
      "2 slices cooked ham, diced",
      "0.5 onion, thinly sliced",
      "0.5 red bell pepper, sliced",
      "4 eggs",
      "0.25 teaspoon Spanish seasoning"
    ],
    "instructions": [
      "Slice edges off of potatoes so that potatoes are roughly square; thinly slice. Heat olive oil in medium skillet over medium heat. Add potatoes and lightly fry. Remove potatoes with a slotted spoon and set aside.",
      "Place bacon in a large, deep skillet. Cook over medium-high heat until evenly brown. Remove bacon, crumble and set aside. Reserve 1 tablespoon bacon grease and cook ham, onion and red pepper. Remove from heat.",
      "Beat eggs and paprika together in a bowl; pour into skillet with vegetables. Add bacon and potatoes. Cook over medium heat, without stirring until bottom begins to brown. Turn omelet over and allow both sides to brown. Serve warm."
    ],
    "nutrition_per_serving": {
      "calories": 447,
      "total_fat_g": 34.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 14.0,
      "sodium_mg": 558,
      "cholesterol_mg": 213,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 15,
    "recipe_category": "Breakfast",
    "cuisine": "Spanish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/256952/baked-spinach-and-egg-white-muffins/",
    "category": "frittatas",
    "id": 256952,
    "name": "Baked Spinach and Egg White Muffins",
    "description": "Spinach, cheese, and egg white muffins are a great portable breakfast that are quick and easy to prepare for those busy weekday mornings.",
    "author": "cooking made izzy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/6gD2InzpaKuc1srHRcXH0-YDm14=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7002913-7292265699f949af8afcc5470561049b.jpg",
      "alt": "Baked Spinach and Egg White Muffins"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "6",
    "ingredients": [
      "cooking spray",
      "2 tablespoons olive oil",
      "2 cups fresh spinach, or to taste",
      "12 egg whites",
      "2 egg yolks",
      "1 tablespoon grated Parmesan cheese",
      "1 tablespoon shredded Mexican cheese blend",
      "1 teaspoon garlic powder",
      "0.25 teaspoon sea salt"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Spray muffin cups with cooking spray.",
      "Heat olive oil in a skillet over medium heat; cook and stir spinach until wilted. Remove from heat and cool spinach. Squeeze spinach to remove excess moisture.",
      "Whisk egg whites and egg yolks together in a large bowl; add Parmesan cheese, Mexican cheese blend, garlic powder, sea salt, and spinach and mix well. Pour egg mixture into the muffin cups almost to the top. Place the muffin tin on a rimmed baking sheet and pour water halfway up the sides of the muffin tin to create a water bath.",
      "Bake in the preheated oven until muffins are set in the middle, 20 to 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 108,
      "total_fat_g": 7.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0.0,
      "sugar_g": 1.0,
      "protein_g": 9.0,
      "sodium_mg": 228,
      "cholesterol_mg": 72,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 15,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/8396921/2-ingredient-dough-bagels/",
    "category": "bagels",
    "id": 8396921,
    "name": "2-Ingredient Dough Bagels",
    "description": "Two ingredient dough is the base for these easy, fluffy homemade bagels that are perfect for breakfast.",
    "author": "Annie Campbell",
    "image": {
      "url": "https://www.allrecipes.com/thmb/KDgiA-443rsA0D8pB5iRon27oTg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR_WTI_TwoIngredientDough-STILL-DSC00741-2000-6eeafb80b93a4523a89a2325f0a9dea9.jpg",
      "alt": "2-Ingredient Dough Bagels"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "1.5 cups self-rising flour, plus more for kneading",
      "1 cup plain Greek yogurt",
      "1 large egg",
      "2 teaspoons everything bagel seasoning, or to taste"
    ],
    "instructions": [
      "Mix flour and Greek yogurt together in a medium bowl until a shaggy dough forms. Transfer to a surface dusted with self-rising flour, and knead for 8 to 10 minutes. Continue adding flour as needed if the dough is too sticky.",
      "Preheat the oven to 375 degrees F (190 degrees C).",
      "Cut the dough into 4 pieces, roughly 4 ounces each. Roll each segment into a smooth ball. Use your thumbs to poke a hole in the center of each round, then gently stretch the dough until it becomes a uniform-sized ring.",
      "Transfer the dough to a parchment paper-lined baking sheet.",
      "Whisk the egg in a small bowl to create an egg wash, then brush a light coating on top of the dough. Sprinkle with bagel seasoning.",
      "Bake in the preheated oven for 20 to 22 minutes. Increase the oven's temperature to 450 degrees F (230 degrees C) and continue to bake until golden, 3 to 4 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 259,
      "total_fat_g": 7.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 1.0,
      "sugar_g": 0,
      "protein_g": 9.0,
      "sodium_mg": 805,
      "cholesterol_mg": 58,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 12,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/229839/veggie-frittata/",
    "category": "frittatas",
    "id": 229839,
    "name": "Veggie Frittata",
    "description": "This nutritious recipe is a favourite of egg farmers Mark and Joanie Hamel of Watford. The vegetables can be varied to your preference.",
    "author": "Egg Farmers of Ontario",
    "image": {
      "url": "https://www.allrecipes.com/thmb/43euLV6Cj-MoX6n9LDDdD7Bnr94=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8079956-51f57024699e400ca97c4c571bf3aa61.jpg",
      "alt": "Veggie Frittata"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 5,
    "total_time_minutes": 10,
    "servings": "6",
    "ingredients": [
      "1 tablespoon butter or margarine",
      "1 cup sliced mushrooms",
      "0.5 cup chopped green and/or red peppers",
      "0.33333334326744 cup chopped onion",
      "12 eggs",
      "0.25 cup water"
    ],
    "instructions": [
      "Melt butter in a medium (10-inch/25 cm) frying pan over medium heat. Add mushrooms, peppers and onion; saute until tender.",
      "While vegetables are cooking, whisk together eggs and water. Pour egg mixture over vegetables in the frying pan. Cover and cook over medium heat, occasionally poking through the mixture to allow uncooked egg to flow to the bottom of the pan.",
      "When bottom is cooked and top is almost set, finish cooking the frittata on the stove top by covering it with a lid for a few minutes, or flip it over in the pan to cook the top, or cook the top under the broiler.",
      "To flip the frittata, place a dinner plate over the pan holding it firmly in place, then turn the frying pan and plate upside down. The frittata will fall into the plate, top side down. Slide the frittata back into the frying pan, top down. Cook for a few minutes until top (now the bottom) is cooked.",
      "Alternately, place the frying pan under a preheated broiler until the top is cooked and slightly puffed, about a minute or two. The frying pan must be ovenproof in order to do this. To ovenproof the handle, wrap it with a double thickness of aluminum foil.",
      "Cut into wedges and serve."
    ],
    "nutrition_per_serving": {
      "calories": 164,
      "total_fat_g": 13.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 10.0,
      "sodium_mg": 152,
      "cholesterol_mg": 281,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 12,
    "recipe_category": "Breakfast",
    "meal_type": "study",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/213644/blue-cheese-and-asparagus-pizza/",
    "category": "lent",
    "id": 213644,
    "name": "Blue Cheese and Asparagus Pizza",
    "description": "Make a quick and easy asparagus and blue cheese pizza by using a prepared crust.",
    "author": "Cait",
    "image": {
      "url": "https://www.allrecipes.com/thmb/byBbPLfloBieopznRQKbDaXSjzo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/417125-6b4c3dae7a1d4623b4a99e61d4727e6e.jpg",
      "alt": "Blue Cheese and Asparagus Pizza"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "1 bunch asparagus, trimmed and snapped into pieces",
      "1 teaspoon olive oil, or as needed",
      "salt and black pepper to taste",
      "0.5 cup pizza sauce",
      "1 (14 ounce) prebaked pizza crust (such as Boboli\u00ae)",
      "0.75 cup crumbled blue cheese"
    ],
    "instructions": [
      "Preheat an oven to 350 degrees F (175 degrees C).",
      "Place asparagus on a baking sheet; drizzle with olive oil and sprinkle with salt and pepper.",
      "Bake the asparagus in the preheated oven for 10 minutes.",
      "While asparagus is baking, spread the pizza sauce over the pizza crust. Distribute asparagus pieces and crumbles of blue cheese evenly over the pizza.",
      "Return pizza to center rack of preheated oven; bake until the cheese is melted and bubbling, 8 to 10 more minutes."
    ],
    "nutrition_per_serving": {
      "calories": 291,
      "total_fat_g": 10.0,
      "carbohydrates_g": 39.0,
      "fiber_g": 3.0,
      "sugar_g": 3.0,
      "protein_g": 15.0,
      "sodium_mg": 733,
      "cholesterol_mg": 19,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 6,
    "recipe_category": "Lunch",
    "cuisine": "Italian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/257247/eggs-in-a-basket/",
    "category": "breakfast-potatoes",
    "id": 257247,
    "name": "Eggs in a Basket",
    "description": "Perfectly cooked eggs baked in a basket of golden grated potatoes topped with cheese. A simple and delicious breakfast that'll brighten any day!",
    "author": "ShannaleeLV",
    "image": {
      "url": "https://www.allrecipes.com/thmb/qoqIWUyippJAW4hnvTfbn-PpKwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4500288-d51263ff25794f108bc59c50fe93d4e6.jpg",
      "alt": "Eggs in a Basket"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 40,
    "total_time_minutes": 60,
    "servings": "6",
    "ingredients": [
      "cooking spray",
      "3 large potatoes, peeled and grated",
      "0.25 cup butter, melted",
      "kosher salt and ground black pepper to taste",
      "6 eggs",
      "0.75 cup shredded provolone cheese",
      "6 slices prosciutto",
      "2 teaspoons maple syrup"
    ],
    "instructions": [
      "Preheat the oven to 350 degrees F (175 degrees C). Grease a large 6-cup muffin tin or 6 (6-ounce) custard cups with cooking spray.",
      "Mix potatoes, melted butter, salt, and pepper together in a large bowl.",
      "Divide potato mixture among cups. Press to create a thin crust over the bottom and up the sides of each cup.",
      "Bake in the preheated oven until edges are a light golden brown and potatoes are tender, about 30 to 40 minutes. Crack an egg gently into each cup. Continue cooking until egg whites are set and yolk is runny, 10 to 15 minutes. Remove from the oven; cover eggs with provolone cheese.",
      "Set oven rack about 6 inches from the heat source and preheat the oven's broiler.",
      "Toss prosciutto with maple syrup and pepper in a small bowl. Spread out on a small baking sheet lined with aluminum foil.",
      "Place egg baskets and baking sheet under the preheated broiler. Broil until cheese is melted on top of baskets and prosciutto is crisp, about 1 minute.",
      "Transfer egg baskets to a serving plate. Chop prosciutto and sprinkle on top."
    ],
    "nutrition_per_serving": {
      "calories": 399,
      "total_fat_g": 22.0,
      "carbohydrates_g": 35.0,
      "fiber_g": 4.0,
      "sugar_g": 3.0,
      "protein_g": 17.0,
      "sodium_mg": 625,
      "cholesterol_mg": 230,
      "saturated_fat_g": 11.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 4,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/283284/montreal-reuben-sandwich/",
    "category": "corned-beef",
    "id": 283284,
    "name": "Montreal Reuben Sandwich",
    "description": "Recreate this Montreal Reuben sandwich at home in just 10 minutes with corned beef, Swiss, sauerkraut and Thousand Island dressing and get the most out of your lunch!",
    "author": "canadian-brit",
    "image": {
      "url": "https://www.allrecipes.com/thmb/e8BpUiL8cgj4DI_wSAJXhvz59Go=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/283284ReubenSandwichChefMo-f419c48914f346768d0afd1a154c0a67.jpg",
      "alt": "Montreal Reuben Sandwich"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 5,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "1 teaspoon salted butter, softened",
      "2 slices pumpernickel bread",
      "3 slices Swiss cheese",
      "2 teaspoons Thousand Island salad dressing",
      "4 slices deli sliced corned beef",
      "0.25 cup sauerkraut, drained",
      "1 large dill pickle, sliced"
    ],
    "instructions": [
      "Preheat a large skillet or griddle over medium heat.",
      "Lightly butter one side of each bread slice. Place buttered-sides down on the preheated skillet. Place 1 1/2 pieces of Swiss cheese on top of each bread slice, then spread Thousand Island on top.",
      "While sandwich halves are toasting, place corned beef on one side of a microwave-safe plate and sauerkraut on the other side. Cover with a dampened paper towel and microwave on high for 90 seconds.",
      "Remove bread from the skillet. Add hot corned beef and sauerkraut and close to form a sandwich.",
      "Serve with dill pickle."
    ],
    "nutrition_per_serving": {
      "calories": 798,
      "total_fat_g": 46.0,
      "carbohydrates_g": 48.0,
      "fiber_g": 7.0,
      "sugar_g": 8.0,
      "protein_g": 52.0,
      "sodium_mg": 4338,
      "cholesterol_mg": 170,
      "saturated_fat_g": 23.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.3,
    "review_count": 3,
    "recipe_category": "Lunch",
    "cuisine": "Canadian",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/173730/kale-and-banana-smoothie/",
    "category": "smoothies",
    "id": 173730,
    "name": "Kale and Banana Smoothie",
    "description": "This kale smoothie with banana is perfect to help get your daily fruits and veggies. Nutrient-rich kale is mixed in with this tasty, easy smoothie.",
    "author": "Rice",
    "image": {
      "url": "https://www.allrecipes.com/thmb/7wO87qHAxcxu1Zu_9iVgBa3m_P0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/173730-Kale-Banana-Smoothie-ddmfs-4x3-081-18208f62d6554b07befc0ca7e69a83fc.jpg",
      "alt": "Kale and Banana Smoothie"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": null,
    "total_time_minutes": 5,
    "servings": "1",
    "ingredients": [
      "2 cups chopped kale",
      "1 banana",
      "0.5 cup light unsweetened soy milk",
      "1 tablespoon flax seeds",
      "1 teaspoon maple syrup"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Place kale, banana, soy milk, flax seeds, and maple syrup into a blender.",
      "Cover and pur\u00e9e until smooth.",
      "Serve over ice."
    ],
    "nutrition_per_serving": {
      "calories": 311,
      "total_fat_g": 7.0,
      "carbohydrates_g": 57.0,
      "fiber_g": 10.0,
      "sugar_g": 21.0,
      "protein_g": 12.0,
      "sodium_mg": 110,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 202,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/68898/potato-and-cheese-frittata/",
    "category": "breakfast-potatoes",
    "id": 68898,
    "name": "Potato and Cheese Frittata",
    "description": "This potato and cheese frittata is great by itself or with some fruit on a Sunday morning.",
    "author": "DONSSWEETY",
    "image": {
      "url": "https://www.allrecipes.com/thmb/TZR2GyEBEvxqoefEhVEbqPSQuxM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1018997-fca1d3ee549b4978b47390bc258f8690.jpg",
      "alt": "Potato and Cheese Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "2 tablespoons olive oil",
      "2 large russet potatoes, peeled and shredded",
      "1 medium onion, diced",
      "salt and pepper to taste",
      "0.5 cup shredded Cheddar cheese",
      "4 eggs, beaten"
    ],
    "instructions": [
      "Preheat the oven to 400 degrees F (200 degrees C).",
      "Heat oil in a 12 inch skillet over medium-high heat. When the skillet is hot, add the potatoes, and fry until crispy and golden, about 15 minutes. Reduce heat to medium, and add onions. Cook, stirring, until softened. Season with salt and pepper. Pour eggs over the potatoes and onions.",
      "Place the skillet in the oven for about 10 minutes, or until eggs are firm. Remove from the oven, and sprinkle shredded cheese over the top. Return to the oven for about 5 minutes, or until cheese is melted."
    ],
    "nutrition_per_serving": {
      "calories": 355,
      "total_fat_g": 18.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 4.0,
      "sugar_g": 3.0,
      "protein_g": 15.0,
      "sodium_mg": 286,
      "cholesterol_mg": 204,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 176,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/231488/birds-nest-breakfast-cups/",
    "category": "breakfast-potatoes",
    "id": 231488,
    "name": "Bird's Nest Breakfast Cups",
    "description": "Fun bird nests made from baked hash brown potatoes enclose beaten egg, bacon, and cheese for a recipe that's perfect for an Easter brunch or a tasty grab-and-go breakfast.",
    "author": "EPHESIS",
    "image": {
      "url": "https://www.allrecipes.com/thmb/VRUkIIirMit6Le2ZLc_gjsUD0Es=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1043708-787ecba44a2c4c0eac7be4a2ef3c133d.jpg",
      "alt": "Bird's Nest Breakfast Cups"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 50,
    "servings": "12",
    "ingredients": [
      "1 (30 ounce) package frozen shredded hash brown potatoes, thawed",
      "2.5 teaspoons salt",
      "1 teaspoon ground black pepper",
      "2.5 tablespoons olive oil",
      "0.66666668653488 cup shredded Cheddar cheese",
      "12 eggs",
      "2 tablespoons water",
      "8 slices cooked bacon, crumbled - divided",
      "0.25 cup shredded Cheddar cheese, divided"
    ],
    "instructions": [
      "Preheat oven to 425 degrees F (220 degrees C). Grease 24 muffin cups.",
      "Mix hash brown potatoes, salt, black pepper, olive oil, and 2/3 cup shredded Cheddar cheese in a bowl. Divide mixture between prepared muffin cups and use your fingers to shape potato mixture into nests with hollows in the middle.",
      "Bake in the preheated oven until hash browns are browned on the edges and cheese has melted, 15 to 18 minutes. Remove hash brown nests.",
      "Reduce oven temperature to 350 degrees F (175 degrees C).",
      "Whisk eggs and water in a bowl until thoroughly combined; season with salt and black pepper. Pour equal amount of egg mixture into each nest; sprinkle with bacon crumbles and 1 teaspoon Cheddar cheese.",
      "Bake in the oven until eggs are set, 13 to 16 minutes. Let cool in pans and remove by sliding a knife between potato crust and muffin cup."
    ],
    "nutrition_per_serving": {
      "calories": 232,
      "total_fat_g": 18.0,
      "carbohydrates_g": 13.0,
      "fiber_g": 1.0,
      "sugar_g": 0.0,
      "protein_g": 13.0,
      "sodium_mg": 816,
      "cholesterol_mg": 204,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 169,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/162501/quinoa-porridge/",
    "category": "diabetic",
    "id": 162501,
    "name": "Quinoa Porridge",
    "description": "Looking for ideas for the quinoa you picked up at Trader Joe's? Here's a dairy and wheat free breakfast porridge thick, rich and delish for those cold mornings in the Andes. Those with nut allergies may wish to substitute soymilk or regular cow's milk for the almond. Adjust sugar to your taste or substitute with agave syrup or black strap molasses (use half as much). This recipe can easily be doubled.",
    "author": "Six Pack To Go",
    "image": {
      "url": "https://www.allrecipes.com/thmb/KJKW-RVC9YBKz6RIZW0VuMrVv-w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4463194-d5800f1340fe41ae9ac4db558ae1e1e9.jpg",
      "alt": "Quinoa Porridge"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 30,
    "total_time_minutes": 35,
    "servings": "3",
    "ingredients": [
      "0.5 cup quinoa",
      "0.25 teaspoon ground cinnamon",
      "1.5 cups almond milk",
      "0.5 cup water",
      "2 tablespoons brown sugar",
      "1 teaspoon vanilla extract",
      "1 pinch salt"
    ],
    "instructions": [
      "Heat a saucepan over medium heat and measure in the quinoa. Season with cinnamon and cook until toasted, stirring frequently, about 3 minutes. Pour in the almond milk, water and vanilla and stir in the brown sugar and salt. Bring to a boil, then cook over low heat until the porridge is thick and grains are tender, about 25 minutes. Add more water if needed if the liquid has dried up before it finishes cooking. Stir occasionally, especially at the end, to prevent burning."
    ],
    "nutrition_per_serving": {
      "calories": 173,
      "total_fat_g": 3.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 3.0,
      "sugar_g": 13.0,
      "protein_g": 4.0,
      "sodium_mg": 90,
      "cholesterol_mg": 0,
      "saturated_fat_g": 0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 87,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/217813/classic-sloppy-joes/",
    "category": "sloppy-joes",
    "id": 217813,
    "name": "Classic Sloppy Joes",
    "description": "Fun and filling, Sloppy Joes are the perfect solution for a speedy supper before driving the kids to practice or rehearsal. Moist, meaty and satisfying these tasty sandwiches will appeal to the kid in all of us.",
    "author": "Heinz",
    "image": {
      "url": "https://www.allrecipes.com/thmb/cOL7Qk_10F38xKvYcFhqoydi2yw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/975617-0452e0d68e1d4709a5e245776060978c.jpg",
      "alt": "Classic Sloppy Joes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "8",
    "ingredients": [
      "1 tablespoon vegetable oil",
      "1 small onion, chopped",
      "0.33333334326744 cup chopped green pepper",
      "1 pound lean ground beef",
      "1.5 cups Heinz Tomato Ketchup",
      "1 tablespoon Heinz Worcestershire Sauce",
      "2 tablespoons brown sugar",
      "0.25 teaspoon salt",
      "0.25 teaspoon pepper",
      "8 sandwich buns"
    ],
    "instructions": [
      "Heat oil in a large frying pan set over medium-high heat. Saute onions and green pepper for 5 minutes.",
      "Add beef to the pan. Cook, stirring until browned, about 5 to 10 minutes. Drain off fat.",
      "Stir in ketchup, Worcestershire sauce, sugar, salt and pepper. Simmer over medium-low heat, stirring occasionally, for 10 minutes or until slightly thickened. Serve on sandwich buns."
    ],
    "nutrition_per_serving": {
      "calories": 336,
      "total_fat_g": 11.0,
      "carbohydrates_g": 46.0,
      "fiber_g": 1.0,
      "sugar_g": 4.0,
      "protein_g": 16.0,
      "sodium_mg": 1088,
      "cholesterol_mg": 40,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 50,
    "recipe_category": "Lunch",
    "cuisine": "U.S.",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23096/nans-potato-and-egg-frittata/",
    "category": "frittatas",
    "id": 23096,
    "name": "Nan's Potato and Egg Frittata",
    "description": "A potato and 6 eggs are fried in olive oil to make this simple frittata. Cut it into rectangles or wedges and serve between 2 slices of Italian bread either by itself or with tomato slices. Delicious!",
    "author": "Nan",
    "image": {
      "url": "https://www.allrecipes.com/thmb/LB_xmmHIDX6tMHPJmHIrpIerqIU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3644381-559bada84f8242f0bb2b6368b130c493.jpg",
      "alt": "Nan's Potato and Egg Frittata"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 5,
    "total_time_minutes": 27,
    "servings": "4",
    "ingredients": [
      "2 tablespoons olive oil",
      "1 large baking potato, peeled and sliced 1/4 inch thick",
      "6 eggs, beaten",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Heat oil in a large skillet or frying pan over medium-high heat. Spread potato slices across bottom of the pan and cook, turning once, until golden on both sides. Remove slices from pan and drain.",
      "When all potato slices have been cooked, return them to the pan. Turn heat to high. Pour on the beaten eggs and season with salt and pepper. Tilt the pan so that the eggs flow to the bottom of the pan. Turn heat to medium low. Cover pan with a plate and flip pan so that frittata is turned out onto plate. Slide the frittata back into the pan with the uncooked side down. Cover and let cook another 2 minutes.",
      "When frittata is finished cooking, remove it from the pan and drain briefly on paper towels before serving."
    ],
    "nutrition_per_serving": {
      "calories": 238,
      "total_fat_g": 14.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 11.0,
      "sodium_mg": 109,
      "cholesterol_mg": 279,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 41,
    "recipe_category": "Breakfast",
    "cuisine": "British",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/83573/eggy-veggie-bake/",
    "category": "lent",
    "id": 83573,
    "name": "Eggy Veggie Bake",
    "description": "Seasoned sauteed vegetables are topped with eggs and cheese and baked. It's that simple, and it is delicious.",
    "author": "VenturaMama77",
    "image": {
      "url": "https://www.allrecipes.com/thmb/9XE64jHnhUKTMBwg_t99r7lUDRM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/827500-d170c21cc7a240a78f615ff69099b54c.jpg",
      "alt": "Eggy Veggie Bake"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "total_time_minutes": 45,
    "servings": "4",
    "ingredients": [
      "1 tablespoon olive oil",
      "1 cup sliced halved zucchini",
      "3 green onions, chopped",
      "0.5 sweet onion, thinly sliced",
      "2 roma (plum) tomatoes, chopped",
      "0.5 cup chopped fresh mushrooms",
      "3 cups chopped baby spinach",
      "0.5 lemon, juiced",
      "Worcestershire sauce to taste",
      "hot sauce to taste",
      "garlic powder to taste",
      "salt and ground black pepper to taste",
      "1.5 cups liquid egg substitute",
      "0.25 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Spray an 8x8 inch baking dish with cooking spray.",
      "Heat the olive oil in a skillet over medium-high heat. Place zucchini, green onions, onion, tomatoes, mushrooms, and spinach in the skillet. Sprinkle with lemon juice, Worcestershire sauce, and hot sauce. Season with garlic powder, salt, and pepper. Cook until tender. Transfer to the prepared baking dish. Pour egg substitute over the vegetables in the dish. Top with cheese.",
      "Bake 20 minutes in the preheated oven, or until egg substitute is set and cheese is melted. Cut with a spatula and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 175,
      "total_fat_g": 10.0,
      "carbohydrates_g": 8.0,
      "fiber_g": 3.0,
      "sugar_g": 3.0,
      "protein_g": 16.0,
      "sodium_mg": 268,
      "cholesterol_mg": 10,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 33,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/16562/hot-chicken-salad/",
    "category": "chicken-salads",
    "id": 16562,
    "name": "Hot Chicken Salad",
    "description": "This chicken in this recipe is keeping some pretty fine company. Lots of color - green pepper and pimento. Lots of crunch - potato chips and almonds. And then there 's the cheese and creamy mayonnaise. Serves twelve.",
    "author": "NORMAG",
    "image": {
      "url": "https://www.allrecipes.com/thmb/Y816jRlXB_QEAGdfwfWnQFKD5vI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/115725-b8adfe1b57484f2ead168793efaef725.jpg",
      "alt": "Hot Chicken Salad"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "11",
    "ingredients": [
      "2.5 cups chopped, cooked chicken meat",
      "2 cups chopped celery",
      "0.5 cup chopped salted almonds",
      "0.25 cup chopped green bell pepper",
      "2 tablespoons minced onion",
      "2 tablespoons chopped pimento peppers",
      "0.75 teaspoon salt",
      "2 tablespoons lemon juice",
      "0.5 cup mayonnaise",
      "0.33333298563957 cup shredded Swiss cheese",
      "3 cups crushed potato chips"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C).",
      "Combine the chicken, celery, almonds, bell pepper, onion, pimento, salt, lemon juice, and mayonnaise. Mix well and pour into a 1 1/2 quart casserole dish.",
      "Top with grated cheese and the crushed potato chips. Bake for 25 minutes or until cheese is melted."
    ],
    "nutrition_per_serving": {
      "calories": 288,
      "total_fat_g": 21.0,
      "carbohydrates_g": 13.0,
      "fiber_g": 2.0,
      "sugar_g": 1.0,
      "protein_g": 13.0,
      "sodium_mg": 363,
      "cholesterol_mg": 31,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 19,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235088/apple-cider-doughnuts/",
    "category": "doughnuts",
    "id": 235088,
    "name": "Apple Cider Doughnuts",
    "description": "This apple cider doughnuts recipe makes old-fashioned cider doughnuts dusted with cinnamon-sugar for a perfect treat that's delicious any time of year.",
    "author": "A Michelle",
    "image": {
      "url": "https://www.allrecipes.com/thmb/QXtRNzk00TY-PeHbuGF7HLRTwl8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1061800-842c67a5dd1a46b9a44a1245bc014875.jpg",
      "alt": "Apple Cider Doughnuts"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 30,
    "total_time_minutes": 60,
    "servings": "24",
    "ingredients": [
      "2 cups white sugar, divided",
      "1 tablespoon ground cinnamon",
      "1.5 cups apple cider",
      "3.75 cups all-purpose flour, divided",
      "2 teaspoons baking powder",
      "2 teaspoons ground cinnamon",
      "1 teaspoon salt",
      "0.25 cup butter, melted",
      "2 eggs, lightly beaten",
      "1 egg yolk, lightly beaten",
      "6 cups vegetable oil for frying"
    ],
    "instructions": [
      "Mix 1 cup sugar and 1 tablespoon cinnamon together in a resealable plastic bag.",
      "Bring apple cider to a boil in a medium saucepan; cook, stirring occasionally, until cider has reduced to 1/2 cup, about 20 minutes. Remove from heat and cool.",
      "Whisk 1 cup flour, remaining 1 cup sugar, baking powder, 2 teaspoons cinnamon, and salt together in a large bowl.",
      "Mix butter, eggs, egg yolk, and cider together in a medium bowl until smooth; stir into flour mixture. Stir remaining 2 3/4 cups flour into mixture until a smooth dough forms; refrigerate for 10 minutes.",
      "Heat oil in a large pot or deep fryer to 375 degrees F (190 degrees C).",
      "Turn dough onto a well-floured surface; pat dough to 1/2-inch thickness with floured fingers. Cut dough with a doughnut cutter or 2 round cookie cutters (1 large and 1 small). Gather scraps and re-pat dough to cut out as many doughnuts as possible.",
      "Fry doughnuts, in batches, until they rise to the surface and begin to brown, 2 to 3 minutes. Flip; continue frying until brown, about 1 1/2 minutes more.",
      "Remove doughnuts with a slotted spoon to a paper towel-lined plate; cool, about 1 minute. Toss in reserved bag of cinnamon sugar."
    ],
    "nutrition_per_serving": {
      "calories": 219,
      "total_fat_g": 8.0,
      "carbohydrates_g": 34.0,
      "fiber_g": 1.0,
      "sugar_g": 19.0,
      "protein_g": 3.0,
      "sodium_mg": 160,
      "cholesterol_mg": 29,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 15,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/277743/air-fryer-cinnamon-sugar-doughnuts/",
    "category": "doughnuts",
    "id": 277743,
    "name": "Air Fryer Cinnamon-Sugar Doughnuts",
    "description": "These doughnuts have a cinnamon-sugar coating which provides a lot of flavor, but cooking them in the air fryer makes them healthier with fewer calories.",
    "author": "Yoly",
    "image": {
      "url": "https://www.allrecipes.com/thmb/okvutmU_WKu6LlWhsTOndRfOkJ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7466455-677edf90915b457ab3f542aeb162d041.jpg",
      "alt": "Air Fryer Cinnamon-Sugar Doughnuts"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "8",
    "ingredients": [
      "0.25 cup butter, melted",
      "0.5 cup white sugar",
      "0.25 cup brown sugar",
      "1 teaspoon ground cinnamon",
      "0.25 teaspoon ground nutmeg",
      "1 (16.3 ounce) package refrigerated flaky biscuit dough (such as Pillsbury\u2122 Grands!\u2122 Flaky Layers)"
    ],
    "instructions": [
      "Place melted butter in a bowl. Combine white sugar, brown sugar, cinnamon and nutmeg in a second bowl.",
      "Separate biscuit dough into individual biscuits and cut out the centers using a biscuit cutter (or the bottom of a piping tip) to create a doughnut shape. Place doughnuts in the air fryer basket.",
      "Air fry at 350 degrees F (175 degrees C) until golden brown, 4 to 6 minutes. Flip doughnuts and cook an additional 1 to 3 minutes.",
      "Remove doughnuts from air fryer. Dip each doughnut into melted butter (making sure to coat top, bottom, and sides), followed by sugar-cinnamon mixture until completed coated. Serve immediately."
    ],
    "nutrition_per_serving": {
      "calories": 310,
      "total_fat_g": 14.0,
      "carbohydrates_g": 44.0,
      "fiber_g": 1.0,
      "sugar_g": 23.0,
      "protein_g": 4.0,
      "sodium_mg": 613,
      "cholesterol_mg": 16,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 13,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/107233/mrs-paysons-spam-and-grits-brunch-casserole/",
    "category": "grits",
    "id": 107233,
    "name": "Mrs. Payson's SPAM\u00ae and Grits Brunch Casserole",
    "description": "Grits, cheese, and luncheon meat combine into a breakfast casserole that can be put together the night before.",
    "author": "MRS PAYSON",
    "image": {
      "url": "https://www.allrecipes.com/thmb/VqeAatoGhYx7wft68UGN3Zol0-4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/673943-fcd265a2f59f41e3b4d941353435618b.jpg",
      "alt": "Mrs. Payson's SPAM\u00ae and Grits Brunch Casserole"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 45,
    "total_time_minutes": 60,
    "servings": "6",
    "ingredients": [
      "4 cups water",
      "1 cup quick-cooking grits",
      "1 (12 ounce) can fully cooked luncheon meat (such as SPAM\u00ae), grated",
      "1 (14.5 ounce) can diced tomatoes",
      "1 (8 ounce) container sour cream",
      "1 (16 ounce) package shredded Cheddar cheese"
    ],
    "instructions": [
      "Preheat an oven to 350 degrees F (175 degrees C). Grease a 9x13 inch baking dish.",
      "Bring the water to a boil in a large saucepan over high heat. Slowly pour the grits into the water while stirring constantly. Reduce heat to medium-low, and simmer until the grits are tender and thick, 3 to 4 minutes. Stir the grits constantly as they cook. Set aside.",
      "Heat a skillet over medium-high heat, and sprinkle in the grated luncheon meat. Cook, turning occasionally, until the luncheon meat has browned. Pour off any excess grease, and stir half of the luncheon meat into the grits along with the tomatoes, sour cream, and half of the Cheddar cheese. Pour the grits into the prepared baking dish, and sprinkle with the remaining luncheon meat and Cheddar cheese.",
      "Bake in the preheated oven until the casserole is hot and the cheese has melted and is bubbly, about 30 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 668,
      "total_fat_g": 48.0,
      "carbohydrates_g": 27.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 30.0,
      "sodium_mg": 1366,
      "cholesterol_mg": 135,
      "saturated_fat_g": 26.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 9,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/235340/vegetable-stovetop-frittata/",
    "category": "frittatas",
    "id": 235340,
    "name": "Vegetable Stovetop Frittata",
    "description": "Use a skillet with a lid to make a frittata on your stove. This one has olives, feta cheese, red bell pepper, broccoli, and sweet onion.",
    "author": "KIMBICA",
    "image": {
      "url": "https://www.allrecipes.com/thmb/EQ3-f_OlfGBW3LYd5ZTS-szE9Cw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2011101-vegetable-stovetop-frittata-Paula-4x3-1-bd69ead380834d8f850cee35708b6650.jpg",
      "alt": "Vegetable Stovetop Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "2",
    "ingredients": [
      "1 tablespoon olive oil",
      "0.66666668653488 cup 1-inch pieces broccoli florets",
      "0.5 red bell pepper, chopped",
      "0.5 sweet onion, chopped",
      "6 marinated olives, chopped",
      "2 eggs",
      "2 egg whites",
      "2 tablespoons whole milk",
      "1 pinch salt and ground black pepper to taste",
      "0.25 cup crumbled sheep's milk feta cheese"
    ],
    "instructions": [
      "Heat olive oil in a 10-inch skillet over medium heat. Cook and stir broccoli, bell pepper, and sweet onion in hot oil until hot, about 3 minutes. Place a cover on the skillet and continue cooking until the vegetables begin to soften, about 5 minutes more. Stir olives into the vegetable mixture.",
      "Beat eggs, egg whites, milk, salt, and pepper together with a whisk in a small bowl; pour over the vegetable mixture in the skillet. Sprinkle feta cheese over the egg mixture.",
      "Replace cover on the skillet, reduce heat to medium-low, and cook until the egg is lightly browned on the bottom, 3 to 5 minutes. Carefully flip the frittata and cook until the bottom is again lightly browned, 1 to 2 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 289,
      "total_fat_g": 21.0,
      "carbohydrates_g": 11.0,
      "fiber_g": 3.0,
      "sugar_g": 6.0,
      "protein_g": 17.0,
      "sodium_mg": 627,
      "cholesterol_mg": 215,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 5,
    "recipe_category": "Breakfast",
    "cuisine": "Italian Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/220812/crunchy-and-delicious-granola/",
    "category": "granola",
    "id": 220812,
    "name": "Crunchy and Delicious Granola",
    "description": "Applesauce and pure maple syrup sweeten this granola made with dried cherries, pumpkin and sunflower seeds, and wheat germ.",
    "author": "cait713",
    "image": {
      "url": "https://www.allrecipes.com/thmb/MRn2Gw4fZzLPZBRmfVJzFmb7_Bw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/812723-73f0c428cbc848cf8eb5f5ecfdb9f735.jpg",
      "alt": "Crunchy and Delicious Granola"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "10",
    "ingredients": [
      "3 cups thick-cut oatmeal",
      "0.5 cup hulled sunflower seeds",
      "0.33333334326744 cup hulled pumpkin seeds",
      "2 tablespoons sesame seeds",
      "2 tablespoons flax seeds",
      "1 tablespoon wheat germ",
      "1 cup chopped dried cherries",
      "0.5 teaspoon salt",
      "2 teaspoons ground cinnamon",
      "0.66666668653488 cup unsweetened applesauce",
      "0.33333334326744 cup pure maple syrup",
      "1 tablespoon vanilla extract"
    ],
    "instructions": [
      "Preheat the oven to 325 degrees F (165 degrees C).",
      "Line 2 baking sheets with parchment paper.",
      "Combine oatmeal, sunflower seeds, pumpkin seeds, sesame seeds, flax seeds, wheat germ, chopped dried cherries, salt, and cinnamon in a large bowl.",
      "Mix applesauce, maple syrup, and vanilla in a separate bowl.",
      "Pour applesauce mixture over the oatmeal mixture; mix until evenly coated.",
      "Spread the mixture onto the prepared baking sheets; smooth into a single thin layer.",
      "Bake in preheated oven 20 minutes, stir gently to turn, and continue cooking until crisp and golden brown, another 15 to 20 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 272,
      "total_fat_g": 9.0,
      "carbohydrates_g": 40.0,
      "fiber_g": 6.0,
      "sugar_g": 15.0,
      "protein_g": 8.0,
      "sodium_mg": 124,
      "cholesterol_mg": 0,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.2,
    "review_count": 5,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/161819/bacon-gravy-for-biscuits/",
    "category": "gravies",
    "id": 161819,
    "name": "Bacon Gravy for Biscuits",
    "description": "This bacon gravy recipe is quick and easy to make. Nothing makes biscuits better than being smothered in a Southern-style bacon gravy. Delightful!",
    "author": "Nikki Lakey",
    "image": {
      "url": "https://www.allrecipes.com/thmb/_BI0YFxXpmIZzjL6C2s-OKKJof8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-161819-Bacon-Gravy-Biscuits-4x3-dae9720fc8ec4039b31b34d09bb665f6.jpg",
      "alt": "Bacon Gravy for Biscuits"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "5",
    "ingredients": [
      "1 (10 ounce) can refrigerated biscuit dough",
      "4 thick slices bacon",
      "0.25 cup all-purpose flour",
      "1 cup milk, or as needed",
      "salt and pepper to taste"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Preheat the oven to 400 degrees F (200 degrees C). Place biscuits in an ungreased baking pan.",
      "Bake in the preheated oven until golden brown, 10 to 13 minutes or as directed on the package instructions.",
      "While the biscuits are baking, cook bacon in a deep skillet over medium heat until crisp, about 10 minutes.",
      "Transfer bacon to a paper towel-lined plate, reserving bacon grease in the skillet. Whisk flour into bacon grease until smooth.",
      "Add milk and continue to stir over medium heat until thickened.",
      "Crumble bacon into gravy and season with salt and pepper.",
      "Split biscuits in half and top with gravy."
    ],
    "nutrition_per_serving": {
      "calories": 282,
      "total_fat_g": 13.0,
      "carbohydrates_g": 31.0,
      "fiber_g": 1.0,
      "sugar_g": 6.0,
      "protein_g": 10.0,
      "sodium_mg": 842,
      "cholesterol_mg": 16,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 139,
    "recipe_category": "Breakfast",
    "cuisine": "Southern",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/81062/bryans-spicy-red-lentil-soup/",
    "category": "lentil-soups",
    "id": 81062,
    "name": "Bryan's Spicy Red Lentil Soup",
    "description": "This spiced red lentil soup is cooked on the stovetop with tomatoes, spinach, onion, and spices, then pur\u00e9ed in a blender for a quick and easy meal.",
    "author": "FISHFISHER2002",
    "image": {
      "url": "https://www.allrecipes.com/thmb/KMOO0Ba_GPycjt9afrxaYnj8Xx8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4589418-b6c3ad06a3934410b20f0c9397b1876a.jpg",
      "alt": "Bryan's Spicy Red Lentil Soup"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "1 teaspoon olive oil",
      "1.5 cups chopped red onion",
      "salt and pepper to taste",
      "1 (28 ounce) can diced tomatoes",
      "2 cups dry red lentils",
      "1.5 cups frozen chopped spinach",
      "2 cups water",
      "2 teaspoons dried basil",
      "1.5 teaspoons ground cardamom",
      "1 teaspoon ground cumin",
      "0.5 teaspoon ground cayenne pepper",
      "0.5 teaspoon curry powder"
    ],
    "instructions": [
      "Heat olive oil in a large pot over medium heat. Cook and stir onion in hot oil until golden brown. Season with salt and pepper. Mix in tomatoes, lentils, and spinach; pour in water. Season with basil, cardamom, cumin, cayenne pepper, and curry powder. Bring to a boil, reduce heat to low, and simmer for 25 minutes, stirring occasionally, until lentils are tender.",
      "Transfer soup to a blender and pur\u00e9e until smooth before serving."
    ],
    "nutrition_per_serving": {
      "calories": 241,
      "total_fat_g": 2.0,
      "carbohydrates_g": 41.0,
      "fiber_g": 15.0,
      "sugar_g": 8.0,
      "protein_g": 17.0,
      "sodium_mg": 268,
      "cholesterol_mg": 0,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 104,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/238064/easiest-peanut-butter-granola-ever/",
    "category": "granola",
    "id": 238064,
    "name": "Easiest Peanut Butter Granola Ever",
    "description": "Make your own peanut butter-flavored granola using just oats, raisins, cinnamon, honey, egg white, peanut butter, and this easy DIY recipe.",
    "author": "DumbleDog",
    "image": {
      "url": "https://www.allrecipes.com/thmb/hCseFRNz8OdONTQoDKSRJVbZyRU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1157695-7d953ae54ea54703af1dc5f80d42d30d.jpg",
      "alt": "Easiest Peanut Butter Granola Ever"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 55,
    "servings": "3",
    "ingredients": [
      "1.5 cups oats",
      "0.25 cup raisins",
      "0.75 teaspoon ground cinnamon",
      "3 ounces peanut butter, slightly melted",
      "1 egg white, beaten",
      "1.5 teaspoons honey"
    ],
    "instructions": [
      "Preheat oven to 325 degrees F (165 degrees C). Line a baking sheet with waxed paper.",
      "Mix oats, raisins, and cinnamon together in a bowl. Mix peanut butter with the oats mixture using your hands until ingredients are coated in peanut butter; add egg white and honey and continue mixing with hands until evenly mixed. Spread the mixture onto the baking sheet.",
      "Bake in preheated oven for 10 minutes, stir, and continue baking until beginning to brown, 5 to 10 minutes more.",
      "Let granola cool until it begins to harden, at least 30 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 377,
      "total_fat_g": 17.0,
      "carbohydrates_g": 47.0,
      "fiber_g": 7.0,
      "sugar_g": 14.0,
      "protein_g": 14.0,
      "sodium_mg": 151,
      "cholesterol_mg": 0,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 8,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/276270/grandmas-old-fashioned-cake-donuts/",
    "category": "doughnuts",
    "id": 276270,
    "name": "Grandma's Old-Fashioned Cake Donuts",
    "description": "Grandma's easy recipe for old-fashioned cake donuts is one family's Christmas morning tradition, sure to become one of your own.",
    "author": "Michael Yeo",
    "image": {
      "url": "https://www.allrecipes.com/thmb/P406eQ-VzJKmXjTgqksHWSe_JMw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/276270Grandmas-Old-Fashioned-Cake-Donuts-3_MFS-copy-2000-eb915940f79145da855d396a44fe2dcf.jpg",
      "alt": "Grandma's Old-Fashioned Cake Donuts"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 5,
    "total_time_minutes": 50,
    "servings": "6",
    "ingredients": [
      "2 eggs",
      "1 cup white sugar",
      "1 cup buttermilk",
      "1 teaspoon vanilla extract",
      "2 tablespoons butter, melted",
      "4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon baking powder",
      "0.5 teaspoon ground nutmeg",
      "0.5 teaspoon salt",
      "0.5 cup vegetable oil for frying"
    ],
    "instructions": [
      "Beat eggs in the bowl of a stand mixer until whipped to a creamy color. Mix in sugar gradually until well blended. Mix in buttermilk and vanilla extract. Mix in butter.",
      "Sift flour, baking soda, baking powder, nutmeg, and salt together in a separate bowl. Beat 1/2 of the mixture into the sugar mixture until well blended; beat in remaining 1/2. Let batter rest for 20 minutes.",
      "Heat oil in a deep-fryer or large saucepan to 375 degrees F (190 degrees C).",
      "Turn dough out onto a floured surface and knead as little as possible until it comes together. Roll dough out using a rolling pin until it is 3/8-inch thick; cut into donut shapes.",
      "Lower donuts carefully into the hot oil and cook until light brown, 2 to 3 minutes, turning once. Remove from oil and let cool on a wire rack."
    ],
    "nutrition_per_serving": {
      "calories": 595,
      "total_fat_g": 25.0,
      "carbohydrates_g": 84.0,
      "fiber_g": 2.0,
      "sugar_g": 36.0,
      "protein_g": 10.0,
      "sodium_mg": 580,
      "cholesterol_mg": 74,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.1,
    "review_count": 7,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/131668/butternut-squash-sweet-potato-ginger-bisque/",
    "category": "butternut-squash-soups",
    "id": 131668,
    "name": "Butternut Squash-Sweet Potato Ginger Bisque",
    "description": "Butternut squash and sweet potatoes blend with ginger, garlic, and onion in this creamy, pureed soup that's ideal for warming body and soul in wintertime.",
    "author": "BJ.",
    "image": {
      "url": "https://www.allrecipes.com/thmb/24MdEyWsYkjEH_TiNDFhulhOWUc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1938823-06967c11bc484acda5ee5e5dc4a458c4.jpg",
      "alt": "Butternut Squash-Sweet Potato Ginger Bisque"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": 30,
    "total_time_minutes": 55,
    "servings": "8",
    "ingredients": [
      "1 (2 pound) butternut squash - peeled, seeded, and cut into large chunks",
      "4 sweet potatoes, peeled and cut into chunks",
      "1 onion, peeled and chopped",
      "1 (2 inch) piece fresh ginger, peeled and finely chopped",
      "3 cloves garlic, peeled and chopped",
      "1.5 quarts water, or amount to cover",
      "1 cup plain yogurt, or amount desired",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Place the squash, sweet potatoes, onion, ginger, and garlic in a large pot. Pour in enough water to cover the vegetables. Bring to simmer over medium heat, and cook until vegetables are tender and can be easily pierced with a fork, 30 to 45 minutes.",
      "Remove pot from heat. Place soup in batches into a blender or the bowl of a food process. Pulse until smooth. Return soup to pot, and whisk in yogurt. Season with salt and pepper to taste. If necessary, reheat soup over low heat, but do not allow to boil."
    ],
    "nutrition_per_serving": {
      "calories": 207,
      "total_fat_g": 1.0,
      "carbohydrates_g": 47.0,
      "fiber_g": 7.0,
      "sugar_g": 12.0,
      "protein_g": 5.0,
      "sodium_mg": 111,
      "cholesterol_mg": 2,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 55,
    "recipe_category": "Lunch",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/49478/evacuation-tuna-pasta-salad/",
    "category": "tuna-salads",
    "id": 49478,
    "name": "Evacuation Tuna & Pasta Salad",
    "description": "Living on the coast we are sometimes forced to evacuate during hurricane season. Put this pasta salad in a covered container, and throw it in the cooler. It's a full meal in one bowl. It's easy to serve. Spoon it up into a cup and eat it in the car, camper, or in our case, a motel room! That's why we call it Evacuation Tuna & Pasta Salad.",
    "author": "Laurie & Roger",
    "image": {
      "url": "https://www.allrecipes.com/thmb/s-x_sXkdoIJ5QExzRFcO6vAqKqw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/147681-124de9dc5d284b7193a89bc8252c49ee.jpg",
      "alt": "Evacuation Tuna & Pasta Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 10,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "3 cups rotelle pasta",
      "3 hard-cooked eggs, chopped",
      "1 (12 ounce) can tuna, drained and flaked",
      "0.75 cup shredded Cheddar cheese",
      "0.75 cup chopped celery",
      "0.25 cup finely chopped onion",
      "0.5 cup roasted red peppers, drained and chopped",
      "1 (8 ounce) can lima beans, drained",
      "0.75 cup mayonnaise",
      "0.5 lemon, juiced",
      "0.5 teaspoon paprika",
      "salt to taste"
    ],
    "instructions": [
      "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain and cool.",
      "In a large bowl, combine pasta, eggs, tuna Cheddar cheese, celery, onion, roasted red pepper, and lima beans. Whisk together mayonnaise, lemon juice, and paprika. Season with salt. Pour dressing over pasta mixture, and mix together."
    ],
    "nutrition_per_serving": {
      "calories": 314,
      "total_fat_g": 14.0,
      "carbohydrates_g": 27.0,
      "fiber_g": 3.0,
      "sugar_g": 3.0,
      "protein_g": 21.0,
      "sodium_mg": 468,
      "cholesterol_mg": 109,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 25,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/23791/quick-microwave-frittata-casserole/",
    "category": "frittatas",
    "id": 23791,
    "name": "Quick Microwave Frittata Casserole",
    "description": "A quick and easy breakfast casserole that you can cook in the microwave. Perfect for dorm parties!",
    "author": "Sunedan",
    "image": {
      "url": "https://www.allrecipes.com/thmb/zRCexeRbU9f0wdWyieu70c0YB8c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/651110-74a95f1bfb14484492fc9fe2423c007b.jpg",
      "alt": "Quick Microwave Frittata Casserole"
    },
    "prep_time_minutes": 5,
    "cook_time_minutes": 25,
    "total_time_minutes": 30,
    "servings": "4",
    "ingredients": [
      "2 cups frozen hash brown potatoes",
      "0.5 cup shredded carrot",
      "0.25 cup chopped onion",
      "2 tablespoons chopped fresh parsley",
      "2 tablespoons butter",
      "1 to taste salt and pepper to taste",
      "8 eggs",
      "0.5 cup milk",
      "0.25 teaspoon dry mustard",
      "1 dash hot pepper sauce",
      "1 cup cubed cooked ham",
      "0.5 cup shredded Cheddar cheese"
    ],
    "instructions": [
      "In a non-metallic 2 quart casserole dish, stir together potatoes, carrot, onion, parsley and butter. Cover and microwave on High for 5 minutes, stirring once or twice. Season with salt and pepper.",
      "In a medium bowl, beat together, eggs, milk, mustard and hot pepper sauce. Stir in cubed ham. Pour egg mixture into casserole, stir to combine.",
      "Cover dish and microwave on high for 3 minutes. Draw cooked egg toward middle of dish and microwave on medium for 10 to 12 minutes. If you do not have a turntable rotate dish 2 to 3 times. Sprinkle cheese on top, cover and microwave for 30 to 60 seconds until cheese is melted. Let stand 5 minutes before serving."
    ],
    "nutrition_per_serving": {
      "calories": 422,
      "total_fat_g": 32.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 2.0,
      "sugar_g": 3.0,
      "protein_g": 25.0,
      "sodium_mg": 941,
      "cholesterol_mg": 423,
      "saturated_fat_g": 14.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 16,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/162944/easy-peezy-caramel-granola/",
    "category": "granola",
    "id": 162944,
    "name": "Easy-Peezy Caramel Granola",
    "description": "This is super easy to make and goes great with yogurt, ice cream, or just by itself! It's much sweeter than the classic honey granola.",
    "author": "Alyssa",
    "image": {
      "url": "https://www.allrecipes.com/thmb/M4ECOVb3T1zl8CqYwXa-WoKcETo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/69613-4923933838a942a69be0b0d662a63efc.jpg",
      "alt": "Easy-Peezy Caramel Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "2 cups quick cooking oats",
      "1 cup brown sugar",
      "2 tablespoons ground cinnamon",
      "0.5 cup butter, melted",
      "5 tablespoons caramel sauce",
      "2 tablespoons white sugar"
    ],
    "instructions": [
      "Stir together the oats, brown sugar, and cinnamon in a wok or large skillet over high heat, cook 5 to 10 minutes; remove from heat and add the butter and caramel sauce; stir until evenly coated. Spread the mixture onto a flat platter or baking sheet in a thin layer. Sprinkle the white sugar over the granola. Allow to cool completely before serving."
    ],
    "nutrition_per_serving": {
      "calories": 332,
      "total_fat_g": 13.0,
      "carbohydrates_g": 54.0,
      "fiber_g": 3.0,
      "sugar_g": 30.0,
      "protein_g": 3.0,
      "sodium_mg": 136,
      "cholesterol_mg": 31,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 8,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/264503/chilaquiles-scramble/",
    "category": "chilaquiles",
    "id": 264503,
    "name": "Chilaquiles Scramble",
    "description": "This recipe for chilaquiles with scrambled eggs, Cotija cheese, and avocado is a tasty way to start the day.",
    "author": "tomboy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/lLG-vGuAecmWK-YEEg0614z1Adc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5438840-6beefe3f3af04580b94d6dbb9291a4a4.jpg",
      "alt": "Chilaquiles Scramble"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "2 tablespoons olive oil, divided, or to taste",
      "1 small onion, finely chopped",
      "1 jalapeno pepper, finely chopped",
      "1 small tomato, diced",
      "2 cloves garlic, minced",
      "0.5 cup salsa verde (green salsa)",
      "0.5 teaspoon ground cumin",
      "salt and ground black pepper to taste",
      "3 cups tortilla chips",
      "5 large eggs",
      "0.5 cup crumbled Cotija cheese",
      "1 medium avocado, sliced",
      "0.25 cup chopped fresh cilantro",
      "2 tablespoons sour cream, or to taste"
    ],
    "instructions": [
      "Heat 1 tablespoon olive oil in a skillet over medium-high heat. Add onion and jalape\u00f1o; cook and stir until onion is translucent, about 5 minutes. Add tomato and garlic; cook and stir for 1 minute. Add salsa and scrape any browned bits off the bottom of the pan. Season with cumin, salt, and pepper. Reduce the heat and simmer for 2 minutes. Add tortilla chips to the pan and stir until coated with sauce.",
      "Heat remaining 1 tablespoon oil in a separate skillet over medium-high heat. Whisk eggs together in a bowl, then pour into the hot pan and cook until starting to set, about 2 minutes. Scrape cooked egg from the edges and fold into the center. Cook until eggs are halfway cooked but still runny, 2 to 3 minutes more.",
      "Fold eggs into tortilla chip mixture. Keep stirring to finish scrambling the eggs, about 2 minutes. Add Cotija cheese and turn off the heat.",
      "Divide egg mixture among four plates. Garnish with avocado, cilantro, and sour cream."
    ],
    "nutrition_per_serving": {
      "calories": 428,
      "total_fat_g": 32.0,
      "carbohydrates_g": 24.0,
      "fiber_g": 5.0,
      "sugar_g": 4.0,
      "protein_g": 15.0,
      "sodium_mg": 616,
      "cholesterol_mg": 253,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 4,
    "recipe_category": "Breakfast",
    "cuisine": "Mexican Inspired",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/255309/cinnamon-apple-and-banana-granolameal/",
    "category": "granola",
    "id": 255309,
    "name": "Cinnamon Apple and Banana \"Granolameal\"",
    "description": "Cinnamon, apple, and banana are combined with granola and oats to make this \"granolameal\" recipe that is a quick and easy twist on breakfast.",
    "author": "BW559",
    "image": {
      "url": "https://www.allrecipes.com/thmb/MHb9aheFq7MUuLNoxLZmWsfPKHE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4423846-2bf94b359dea4403bf75e920a5631efa.jpg",
      "alt": "Cinnamon Apple and Banana \"Granolameal\""
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 5,
    "total_time_minutes": 15,
    "servings": "2",
    "ingredients": [
      "1 apple - peeled, cored, and chopped",
      "2 bananas, sliced",
      "0.5 cup granola",
      "0.33333334326744 cup ground cinnamon, or to taste",
      "1 teaspoon white sugar",
      "1 teaspoon unsweetened cocoa powder",
      "1 teaspoon butter",
      "1 tablespoon almond milk, or to taste"
    ],
    "instructions": [
      "Place apple, bananas, granola, cinnamon, sugar, and cocoa powder in a container with a lid. Cover and shake until combined.",
      "Melt butter in a skillet over medium-high heat. Add apple mixture; increase heat slightly and cook, stirring constantly, until cinnamon starts to darken and turn into a paste, 2 to 3 minutes. Stir in milk.",
      "Reduce heat to medium; cook, covered, until flavors combine, about 1 minute. Uncover and stir. Cover and simmer for 1 minute more. Remove from heat and stir."
    ],
    "nutrition_per_serving": {
      "calories": 366,
      "total_fat_g": 10.0,
      "carbohydrates_g": 70.0,
      "fiber_g": 18.0,
      "sugar_g": 30.0,
      "protein_g": 7.0,
      "sodium_mg": 31,
      "cholesterol_mg": 5,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/262473/fluffy-low-fat-vegan-blueberry-muffins/",
    "category": "road-trip-snacks",
    "id": 262473,
    "name": "Fluffy Low-Fat Vegan Blueberry Muffins",
    "description": "Baking the perfect vegan blueberry muffins is possible with soy milk and applesauce for moisture, dates for sweetness, and oats for texture.",
    "author": "nutriciously",
    "image": {
      "url": "https://www.allrecipes.com/thmb/J28CgYhBOA1uYFyiP5j-PAKFCXw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5026915-27a5265029ae443799de09c07085eada.jpg",
      "alt": "Fluffy Low-Fat Vegan Blueberry Muffins"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "12",
    "ingredients": [
      "0.75 cup soy milk",
      "0.75 cup water",
      "12 dates, pitted",
      "1.5 tablespoons flax seeds",
      "2 cups rolled oats, ground",
      "1 tablespoon brown sugar",
      "1 tablespoon baking powder",
      "0.5 teaspoon ground cinnamon",
      "0.75 cup applesauce",
      "0.5 teaspoon vanilla extract",
      "1 cup fresh blueberries"
    ],
    "instructions": [
      "Combine soy milk, water, dates, and flax seeds in a bowl.",
      "Preheat the oven to 400 degrees F (200 degrees C).",
      "Combine ground oats, brown sugar, baking powder, and cinnamon in a large bowl.",
      "Combine the date mixture, applesauce, and vanilla extract in a blender. Blend until evenly mixed; pour into the bowl with the oat mixture. Stir until no dry spots remain. Fold in blueberries. Pour batter into a 12-cup muffin tin.",
      "Bake in the preheated oven until tops spring back when lightly pressed, about 20 minutes. Let cool in the tin."
    ],
    "nutrition_per_serving": {
      "calories": 110,
      "total_fat_g": 2.0,
      "carbohydrates_g": 22.0,
      "fiber_g": 3.0,
      "sugar_g": 10.0,
      "protein_g": 3.0,
      "sodium_mg": 132,
      "cholesterol_mg": 0,
      "saturated_fat_g": 0.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 4.0,
    "review_count": 1,
    "recipe_category": "Breakfast",
    "meal_type": "study",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241301/mini-ham-and-swiss-frittatas/",
    "category": "frittatas",
    "id": 241301,
    "name": "Mini Ham and Swiss Frittatas",
    "description": "This quick and easy recipe has only five ingredients and makes delicious ham and cheese mini-frittatas.",
    "author": "ruthietoothie9",
    "image": {
      "url": "https://www.allrecipes.com/thmb/nzS5L2IBxMf50hLviJc17s45io8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2088144-02ba99535170427f9e449846a9aab383.jpg",
      "alt": "Mini Ham and Swiss Frittatas"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 15,
    "total_time_minutes": 30,
    "servings": "8",
    "ingredients": [
      "cooking spray",
      "6 slices Swiss cheese, finely chopped",
      "6 slices deli ham, finely chopped",
      "8 eggs",
      "0.5 teaspoon onion powder",
      "0.5 teaspoon garlic powder",
      "0.25 teaspoon freshly ground black pepper"
    ],
    "instructions": [
      "Preheat oven to 375 degrees F (190 degrees C). Prepare 24-cup mini-muffin pan with cooking spray.",
      "Toss cheese and ham together in a bowl; distribute evenly between the 24 prepared muffin cups.",
      "Beat eggs, onion powder, garlic powder, and pepper together with a whisk in a bowl; pour in equal amounts over ham and cheese in muffin cups.",
      "Bake in preheated oven until tops turn light golden brown, about 12 minutes. Remove frittatas form cups with a spoon."
    ],
    "nutrition_per_serving": {
      "calories": 198,
      "total_fat_g": 14.0,
      "carbohydrates_g": 2.0,
      "fiber_g": 0,
      "sugar_g": 1.0,
      "protein_g": 15.0,
      "sodium_mg": 376,
      "cholesterol_mg": 195,
      "saturated_fat_g": 7.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.8,
    "review_count": 17,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/242001/diabetic-friendly-apple-muffins/",
    "category": "diabetic",
    "id": 242001,
    "name": "Diabetic-Friendly Apple Muffins",
    "description": "This muffin recipe uses stevia sugar substitute, skim milk, and reduced-calorie margarine to help make a healthier apple muffin.",
    "author": "nina myers",
    "image": {
      "url": "https://www.allrecipes.com/thmb/fb0Ip9KXfFHmrBPV0W_zHEk1-pI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2246876-a5fcb7b920d8482089e6ef8d8059b5ae.jpg",
      "alt": "Diabetic-Friendly Apple Muffins"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "total_time_minutes": 40,
    "servings": "12",
    "ingredients": [
      "vegetable oil cooking spray",
      "1.6666667461395 cups all-purpose flour",
      "2.5 teaspoons baking powder",
      "1 tablespoon stevia sugar substitute",
      "1 teaspoon ground cinnamon",
      "0.5 teaspoon sea salt",
      "0.25 teaspoon nutmeg",
      "0.66666668653488 cup skim milk",
      "1 egg, lightly beaten",
      "0.25 cup reduced-calorie margarine, melted",
      "1 cup minced apple"
    ],
    "instructions": [
      "Preheat oven to 400 degrees F (200 degrees C). Prepare 12 muffin cups with cooking spray.",
      "Mix flour, baking powder, stevia, cinnamon, sea salt, and nutmeg together in a large bowl. Beat skim milk, egg, and margarine together in a separate bowl; add to flour mixture and stir just until the dry mixture is moistened. Gently fold minced apple through the batter. Spoon batter into the prepared muffin cups.",
      "Bake in preheated oven until lightly browned on the tops, about 25 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 98,
      "total_fat_g": 3.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 3.0,
      "sodium_mg": 216,
      "cholesterol_mg": 16,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.8,
    "review_count": 12,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/279400/air-fryer-corned-beef-hash/",
    "category": "corned-beef",
    "id": 279400,
    "name": "Air Fryer Corned Beef Hash",
    "description": "This air fryer recipe for corned beef hash combines potatoes, bell peppers, and eggs with leftover corned beef. Try it for a tasty lunch or breakfast.",
    "author": "Soup Loving Nicole",
    "image": {
      "url": "https://www.allrecipes.com/thmb/JEogWXGBgJORdOKXMJY0A-2qsR4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7839431-b6d085dfab364cc0b18c3b674f279ba6.jpg",
      "alt": "Air Fryer Corned Beef Hash"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 45,
    "servings": "2",
    "ingredients": [
      "1 pound red potatoes, cubed",
      "0.5 cup chopped green bell pepper",
      "0.5 cup chopped onion",
      "2 teaspoons vegetable oil",
      "0.5 teaspoon paprika",
      "salt and ground black pepper to taste",
      "1 cup cubed leftover corned beef",
      "2 eggs"
    ],
    "instructions": [
      "Preheat an air fryer to 400 degrees F (200 degrees C).",
      "Combine potatoes, bell pepper, and onion in a large bowl. Add vegetable oil, paprika, salt, and pepper. Stir until potatoes are evenly coated. Transfer mixture to the air fryer basket.",
      "Cook in the preheated air fryer for 10 minutes. Shake the basket and cook for 5 minutes. Stir in the corned beef and cook for 5 more minutes.",
      "Make two small wells in the mixture. Crack an egg into each well. Cook until eggs are set and cooked to desired doneness, about 3 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 537,
      "total_fat_g": 28.0,
      "carbohydrates_g": 43.0,
      "fiber_g": 5.0,
      "sugar_g": 5.0,
      "protein_g": 29.0,
      "sodium_mg": 1253,
      "cholesterol_mg": 280,
      "saturated_fat_g": 9.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.5,
    "review_count": 2,
    "recipe_category": "Lunch",
    "cuisine": "Irish",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/245047/apple-pie-granola/",
    "category": "granola",
    "id": 245047,
    "name": "Apple Pie Granola",
    "description": "Apples, pecans, and raisins are baked with oats, butter, and brown sugar creating apple pie granola that tastes just like apple pie.",
    "author": "Kears",
    "image": {
      "url": "https://www.allrecipes.com/thmb/adU0uV1GE6kyWKPDl3gUQlA6gM0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3405473-4d6cbfec875f41b9b3566ccdba9d1420.jpg",
      "alt": "Apple Pie Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 45,
    "total_time_minutes": 55,
    "servings": "16",
    "ingredients": [
      "5 cups rolled oats",
      "1 cup chopped apples",
      "1 cup coarsely chopped pecans",
      "0.75 cup butter, melted",
      "0.75 cup firmly packed brown sugar",
      "1.5 teaspoons ground cinnamon",
      "1 cup raisins"
    ],
    "instructions": [
      "Preheat oven to 350 degrees F (175 degrees C). Spread oats onto a 10x15-inch jelly roll pan.",
      "Bake oats in the preheated oven until toasted, 10 to 12 minutes.",
      "Combine toasted oats, apples, pecans, butter, brown sugar, and cinnamon in a large bowl until evenly combined; spread onto jelly roll pan.",
      "Bake in the oven for 15 minutes. Stir raisins into granola and continue baking, stirring every 10 minutes, until oats granola is evenly browned, 20 to 25 minutes more. Cool granola to room temperature and stir until crumbly. Store granola in a tightly covered container in the refrigerator."
    ],
    "nutrition_per_serving": {
      "calories": 294,
      "total_fat_g": 15.0,
      "carbohydrates_g": 38.0,
      "fiber_g": 4.0,
      "sugar_g": 18.0,
      "protein_g": 4.0,
      "sodium_mg": 67,
      "cholesterol_mg": 23,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.5,
    "review_count": 2,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241544/easy-baked-doughnuts/",
    "category": "doughnuts",
    "id": 241544,
    "name": "Easy Baked Doughnuts",
    "description": "Homemade baked doughnuts are quick and easy to prepare when using baking mix in the batter. Dip doughnuts in butter and sugar for a sweet finish.",
    "author": "JESSICALKING",
    "image": {
      "url": "https://www.allrecipes.com/thmb/yz5XM38CgcfaUG-x59I_UH6Aax4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2249883-4a8ef67ef2fb4849ade1af81fd71e100.jpg",
      "alt": "Easy Baked Doughnuts"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 10,
    "total_time_minutes": 25,
    "servings": "16",
    "ingredients": [
      "2 cups baking mix (such as Bisquick \u00ae)",
      "0.33333334326744 cup milk",
      "1 egg",
      "2 tablespoons white sugar",
      "0.125 teaspoon ground cinnamon",
      "0.25 cup butter, melted",
      "0.5 cup white sugar"
    ],
    "instructions": [
      "Preheat oven to 400 degrees F (200 degrees C).",
      "Mix baking mix, milk, egg, 2 tablespoons sugar, and cinnamon together in a bowl with a whisk, beating vigorously for 20 strokes. Transfer dough to a floured work surface and knead 5 times. Roll dough into 1/2-inch thickness and cut with a floured doughnut cutter. Place doughnuts onto a baking sheet.",
      "Bake in the preheated oven until cooked through and lightly browned, 7 to 9 minutes.",
      "Pour melted butter into a bowl. Place 1/2 cup sugar in a separate bowl. Dip doughnuts into butter; transfer to sugar and lightly press until doughnuts are coated."
    ],
    "nutrition_per_serving": {
      "calories": 124,
      "total_fat_g": 6.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 0.0,
      "sugar_g": 8.0,
      "protein_g": 2.0,
      "sodium_mg": 216,
      "cholesterol_mg": 20,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.2,
    "review_count": 15,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/25758/chicken-noodle-soup-iii/",
    "category": "chicken-noodle-soups",
    "id": 25758,
    "name": "Chicken Noodle Soup III",
    "description": "Egg noodles are topped with shredded chicken and bean sprouts, bathed in hot chicken broth, drizzled with thinly sliced shallots cooked in oil and topped with green onion in this quick Asian soup.",
    "author": "Angie",
    "image": {
      "url": "https://www.allrecipes.com/thmb/IDGREupVZIAZYQeZ5k6kkiBUtKI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2782138-54938cd02ea046809cfdfe9cc2115971.jpg",
      "alt": "Chicken Noodle Soup III"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "total_time_minutes": 30,
    "servings": "6",
    "ingredients": [
      "12 shallots, thinly sliced",
      "0.25 cup vegetable oil",
      "6 ounces egg noodles",
      "1 cup bean sprouts",
      "3 quarts chicken broth",
      "3 cups shredded, cooked chicken breast meat",
      "0.5 cup chopped green onion",
      "salt and pepper to taste"
    ],
    "instructions": [
      "In a small skillet over medium heat, cook shallots in oil until brown and fragrant. Remove from heat and set aside.",
      "Bring a large pot of water to a boil. Cook noodles in boiling water until just tender, 8 to 10 minutes; drain and rinse under cold water. Set aside.",
      "Bring a small pot of water to a boil; have ready a bowl of ice water. Blanch bean sprouts by plunging them into boiling water for 1 minute, then into cold water. Drain and set aside.",
      "In a large saucepan over medium heat, bring chicken broth to a simmer.",
      "Divide noodles evenly between 6 bowls. Top with bean sprouts and shredded chicken. Pour the heated broth into the bowls. Drizzle with the shallot mixture and garnish with the green onion. Season with salt and pepper. Serve at once."
    ],
    "nutrition_per_serving": {
      "calories": 384,
      "total_fat_g": 16.0,
      "carbohydrates_g": 36.0,
      "fiber_g": 2.0,
      "sugar_g": 4.0,
      "protein_g": 25.0,
      "sodium_mg": 61,
      "cholesterol_mg": 73,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.0,
    "review_count": 3,
    "recipe_category": "Lunch",
    "cuisine": "Asian",
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/267168/harissa-egg-salad/",
    "category": "egg-salads",
    "id": 267168,
    "name": "Harissa Egg Salad",
    "description": "Boiled eggs, avocado, and harissa are stars in this spicy twist on a classic. Serve on toast or try in lettuce leaves for a refreshing touch.",
    "author": "Buckwheat Queen",
    "image": {
      "url": "https://www.allrecipes.com/thmb/H0yNH7orcNFumdtAlYB8NN1G7DI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5615023-d2c043b8369f44dea4fe9de035092e0f.jpg",
      "alt": "Harissa Egg Salad"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": null,
    "total_time_minutes": 15,
    "servings": "2",
    "ingredients": [
      "1 ripe avocado, halved and pitted",
      "1 teaspoon lime juice",
      "3 hard-boiled eggs, peeled and halved",
      "1 tablespoon harissa",
      "1 tablespoon mayonnaise",
      "2 teaspoons spicy brown mustard",
      "salt and ground black pepper to taste",
      "10 cornichons, chopped",
      "3 large radishes, diced",
      "1 spring onion, chopped",
      "1 tablespoon minced fresh cilantro",
      "1 tablespoon smoked paprika"
    ],
    "instructions": [
      "Combine 1/2 the avocado and lime juice in a bowl. Mash with a fork. Scoop egg yolks into the bowl. Add harissa, mayonnaise, and mustard. Mix until creamy. Season with salt and pepper.",
      "Add cornichons, radishes, and onion to the bowl. Mix to coat the vegetables.",
      "Coarsely chop remaining avocado and egg whites. Fold into salad mixture in the bowl, taking care to leave some chunks of avocado. Top with cilantro and paprika before serving."
    ],
    "nutrition_per_serving": {
      "calories": 357,
      "total_fat_g": 29.0,
      "carbohydrates_g": 14.0,
      "fiber_g": 9.0,
      "sugar_g": 3.0,
      "protein_g": 13.0,
      "sodium_mg": 569,
      "cholesterol_mg": 321,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.0,
    "review_count": 1,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/275460/potato-and-zucchini-frittata/",
    "category": "frittatas",
    "id": 275460,
    "name": "Potato and Zucchini Frittata",
    "description": "This easy 35-minute frittata recipe goes from stovetop, to oven, to table--and with eggs, zucchini, potatoes, and onion, can be served at any time of day.",
    "author": "Tatiana",
    "image": {
      "url": "https://www.allrecipes.com/thmb/uw05z2nZHoIxnoM4QvkCJIrOxo0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/317867-35fbf54db20a415e96258292eac6bb8b.jpg",
      "alt": "Potato and Zucchini Frittata"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 20,
    "total_time_minutes": 35,
    "servings": "4",
    "ingredients": [
      "2 large potatoes, peeled and sliced",
      "1 tablespoon olive oil",
      "2 zucchini, sliced",
      "1 large onion, finely chopped",
      "8 eggs",
      "1 teaspoon dried oregano",
      "1 teaspoon cayenne pepper",
      "salt and ground black pepper to taste"
    ],
    "instructions": [
      "Bring a large pot of water to a boil. Add potatoes and boil for 5 minutes. Drain and set aside.",
      "Heat oil in a deep cast iron skillet over medium heat. Add zucchini and onion; saute until golden, 5 to 7 minutes. Add drained potatoes and stir gently to incorporate.",
      "Beat eggs in a bowl with oregano, cayenne pepper, salt, and pepper. Pour egg mixture into the skillet until evenly distributed; stir gently with a fork. Cook until eggs are set, 5 to 10 minutes.",
      "Meanwhile, set an oven rack about 6 inches from the heat source and preheat the oven's broiler. Transfer skillet into the broiler and cook until golden brown, about 5 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 325,
      "total_fat_g": 13.0,
      "carbohydrates_g": 39.0,
      "fiber_g": 6.0,
      "sugar_g": 5.0,
      "protein_g": 16.0,
      "sodium_mg": 181,
      "cholesterol_mg": 327,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.0,
    "review_count": 1,
    "recipe_category": "Lunch",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/267932/paleo-granola/",
    "category": "granola",
    "id": 267932,
    "name": "Paleo Granola",
    "description": "Granola gets a paleo makeover in this easy recipe with almonds, pecans, walnuts, and sesame seeds coated in spiced honey butter.",
    "author": "Britt H",
    "image": {
      "url": "https://www.allrecipes.com/thmb/h8Tc0Vq-r1gsd_5kTsAoU56-hu0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5745477-38a7909529674169b0e1590c275dd32d.jpg",
      "alt": "Paleo Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 45,
    "total_time_minutes": 55,
    "servings": "20",
    "ingredients": [
      "2 cups sliced almonds",
      "1 cup chopped pecans",
      "1 cup chopped walnuts",
      "1 cup sunflower seeds",
      "0.125 cup sesame seeds",
      "0.5 cup honey",
      "2 tablespoons grass-fed butter",
      "1 teaspoon vanilla extract",
      "1 teaspoon ground cinnamon",
      "0.5 teaspoon kosher salt",
      "0.5 teaspoon ground cloves",
      "0.5 teaspoon ground allspice",
      "1 cup raisins"
    ],
    "instructions": [
      "Preheat the oven to 300 degrees F (150 degrees C). Line a baking sheet with parchment paper.",
      "Combine almonds, pecans, walnuts, sunflower seeds, and sesame seeds in a bowl.",
      "Heat honey and butter in a saucepan over low heat until butter is melted. Add vanilla extract, cinnamon, salt, cloves, and allspice. Stir together and remove from heat.",
      "Pour honey mixture over the nut and seed mixture; mix well. Spread evenly over the prepared baking sheet.",
      "Bake in the preheated oven, stirring every 15 minutes, until golden brown, about 40 minutes. Let cool until granola crumbles easily. Add raisins after granola has cooled."
    ],
    "nutrition_per_serving": {
      "calories": 242,
      "total_fat_g": 18.0,
      "carbohydrates_g": 19.0,
      "fiber_g": 3.0,
      "sugar_g": 13.0,
      "protein_g": 5.0,
      "sodium_mg": 59,
      "cholesterol_mg": 3,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 3.0,
    "review_count": 1,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/260626/air-fried-cinnamon-and-sugar-doughnuts/",
    "category": "doughnuts",
    "id": 260626,
    "name": "Air-Fried Cinnamon and Sugar Doughnuts",
    "description": "An air fryer makes healthier donuts with less oil; these use a rich sour cream dough and are lightly brushed with butter and cinnamon sugar.",
    "author": "MumAndMe",
    "image": {
      "url": "https://www.allrecipes.com/thmb/sc0g_4WDdWMiIEpRYGevnxy2UtI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4567347-1cff26a4057240cd9ab147e619d26cfe.jpg",
      "alt": "Air-Fried Cinnamon and Sugar Doughnuts"
    },
    "prep_time_minutes": 25,
    "cook_time_minutes": 16,
    "total_time_minutes": 41,
    "servings": "9",
    "ingredients": [
      "0.5 cup white sugar",
      "2.5 tablespoons butter, at room temperature",
      "2 large egg yolks",
      "2.25 cups all-purpose flour",
      "1.5 teaspoons baking powder",
      "1 teaspoon salt",
      "0.5 cup sour cream",
      "0.33333334326744 cup white sugar",
      "1 teaspoon cinnamon",
      "2 tablespoons butter, melted, or as needed"
    ],
    "instructions": [
      "Press 1/2 cup white sugar and butter together in a bowl until crumbly. Add egg yolks and stir until well combined.",
      "Sift flour, baking powder, and salt into a separate bowl. Place 1/3 of the flour mixture and 1/2 the sour cream into the sugar-egg mixture; stir until combined. Mix in the remaining flour and sour cream. Refrigerate dough until ready to use.",
      "Mix 1/3 cup sugar and cinnamon together in a bowl.",
      "Roll dough out onto a lightly floured work surface to 1/2-inch thick. Cut 9 large circles in the dough; cut a small circle out of the center of each large circle to create doughnut shapes.",
      "Preheat an air fryer to 350 degrees F (175 degrees C).",
      "Brush 1/2 of the melted butter over both sides of the doughnuts.",
      "Place 1/2 doughnuts into the basket of the air fryer; cook for 8 minutes. Paint cooked donuts with the remaining melted butter and immediately dip into the cinnamon-sugar mixture. Repeat with the remaining doughnuts."
    ],
    "nutrition_per_serving": {
      "calories": 276,
      "total_fat_g": 10.0,
      "carbohydrates_g": 44.0,
      "fiber_g": 1.0,
      "sugar_g": 19.0,
      "protein_g": 4.0,
      "sodium_mg": 390,
      "cholesterol_mg": 66,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 2.8,
    "review_count": 21,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/232084/homemade-granola-cereal/",
    "category": "granola",
    "id": 232084,
    "name": "Homemade Granola Cereal",
    "description": "Learn how to make this delicious homemade granola cereal recipe that is easy to prepare and delicious to eat! A great way to start your morning!",
    "author": "CookingZach",
    "image": {
      "url": "https://www.allrecipes.com/thmb/LPeXhYkBKwoh1XY7pxkVi0qbgh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1364384-0d07a3f9ec3d40c0aee76fe7ec168584.jpg",
      "alt": "Homemade Granola Cereal"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "total_time_minutes": 35,
    "servings": "16",
    "ingredients": [
      "4.5 cups rolled oats",
      "2 cups whole wheat flour",
      "1.25 cups honey",
      "0.75 cup wheat germ",
      "0.5 cup chopped raw cashews",
      "0.5 cup chopped raw almonds",
      "0.33333334326744 cup vegetable oil",
      "0.25 cup flaked coconut",
      "2 tablespoons brown sugar",
      "1 teaspoon vanilla extract",
      "1 teaspoon salt"
    ],
    "instructions": [
      "Preheat oven to 250 degrees F (120 degrees C).",
      "Mix oats, flour, honey, wheat germ, cashews, almonds, vegetable oil, coconut, brown sugar, vanilla, and salt together in a large bowl; spread onto a baking sheet.",
      "Bake in preheated oven for 15 minutes, stir, and increase heat to 325 degrees F (165 degrees C). Continue cooking until granola is golden brown, about 10 minutes more. Cool granola completely before storing in an airtight container."
    ],
    "nutrition_per_serving": {
      "calories": 332,
      "total_fat_g": 11.0,
      "carbohydrates_g": 55.0,
      "fiber_g": 6.0,
      "sugar_g": 25.0,
      "protein_g": 8.0,
      "sodium_mg": 180,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 2.7,
    "review_count": 3,
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/261488/mocha-morning-breakfast-yogurt/",
    "category": "granola",
    "id": 261488,
    "name": "Mocha Morning Breakfast Yogurt",
    "description": "This mocha morning breakfast yogurt is loaded with chocolate whey protein, Greek yogurt, and a jolt of caffeine to start your day off right!",
    "author": "Culinary Envy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/mUpHVw28O7rAaracCFQXKIMESng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4479476-26ed7cc4282b4413964c2b823821e42c.jpg",
      "alt": "Mocha Morning Breakfast Yogurt"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "2",
    "ingredients": [
      "2 cups plain Greek yogurt",
      "3 tablespoons honey",
      "2 scoops chocolate-flavored whey protein powder (such as ON\u2122 Gold Standard)",
      "2 tablespoons instant coffee granules",
      "4 teaspoons cocoa powder",
      "0.125 teaspoon ground cinnamon",
      "1 cup granola cereal with nuts",
      "0.5 cup sliced fresh strawberries",
      "0.5 cup fresh raspberries"
    ],
    "instructions": [
      "Stir Greek yogurt, honey, protein powder, instant coffee, cocoa powder, and cinnamon together in a bowl. Combine strawberries and raspberries in a second bowl.",
      "Layer ingredients into a glass in the following order: 1/3 cup yogurt, 1/2 cup berries, 1/3 cup yogurt, 1/2 cup granola, and 1/3 cup yogurt. Sprinkle with some granola and garnish with a piece of fruit. Fill a second glass in the same way with the remaining ingredients, reserving some granola and fruit for garnish."
    ],
    "nutrition_per_serving": {
      "calories": 772,
      "total_fat_g": 37.0,
      "carbohydrates_g": 80.0,
      "fiber_g": 10.0,
      "sugar_g": 50.0,
      "protein_g": 36.0,
      "sodium_mg": 234,
      "cholesterol_mg": 85,
      "saturated_fat_g": 13.0,
      "unsaturated_fat_g": 0.0
    },
    "rating": 2.0,
    "review_count": 1,
    "recipe_category": "Breakfast",
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/220943/chef-johns-buttermilk-biscuits/",
    "category": "biscuits",
    "id": 220943,
    "name": "Chef John's Buttermilk Biscuits",
    "description": "These homemade buttermilk biscuits are buttery and tender. Ice-cold butter and some extra dough folding are key to having lots of flaky layers in each golden brown biscuit.",
    "author": "John Mitzewich",
    "image": {
      "url": "https://www.allrecipes.com/thmb/wB1vLEB6i5GWn_OTC4IQBXOkk6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/220943-chef-johns-buttermilk-biscuits-DDMFS-4x3-e1847cefd7d34c6d928bbd132999be3b.jpg",
      "alt": "Chef John's Buttermilk Biscuits"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 15,
    "total_time_minutes": 35,
    "servings": "12",
    "ingredients": [
      "2 cups all-purpose flour",
      "2 teaspoons baking powder",
      "0.25 teaspoon baking soda",
      "1 teaspoon salt",
      "7 tablespoons unsalted butter, chilled in freezer and cut into thin slices",
      "0.75 cup cold buttermilk",
      "2 tablespoons buttermilk for brushing"
    ],
    "instructions": [
      "Gather the ingredients. Preheat oven to 425 degrees F (220 degrees C). Line a baking sheet with a silicone baking mat or parchment paper.",
      "Whisk flour, baking powder, baking soda, and salt together in a large bowl. Add cold butter slices and cut into the flour with a pastry blender until the mixture resembles coarse crumbs.",
      "Make a well in the center of the mixture. Pour cold buttermilk into the well and stir gently until just combined. Turn dough onto a floured work surface and pat it together into a rectangle.",
      "Fold the rectangle in thirds. Turn dough a half turn, gather any crumbs, and flatten back into a rectangle. Repeat twice more, folding and pressing the dough a total of three times.",
      "Roll dough on a floured surface to about 1/2 inch thick. Use a 2 1/2-inch round biscuit cutter to cut biscuits. Reroll any scraps to cut more biscuits; you should get 12 total.",
      "Transfer biscuits to the prepared baking sheet. Press an indent into the top of each biscuit with your thumb. Brush buttermilk over the tops.",
      "Bake in the preheated oven until biscuits are flaky and golden brown, about 15 minutes. Enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 143,
      "total_fat_g": 7.0,
      "carbohydrates_g": 17.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 3.0,
      "sodium_mg": 321,
      "cholesterol_mg": 19,
      "saturated_fat_g": 4.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "rating": 0,
    "review_count": 0,
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/241924/spinach-sausage-and-egg-casserole/",
    "category": "breakfast-casseroles",
    "id": 241924,
    "name": "Spinach, Sausage, and Egg Casserole",
    "description": "This spinach egg casserole is easy to make and flavored with sausage, Cheddar cheese, and oregano for a hearty breakfast dish everyone will love.",
    "author": "Lauren",
    "image": {
      "url": "https://www.allrecipes.com/thmb/SQasjneN2j3ayDCbP1G0Y27fAKw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/241924-spinach-sausage-and-egg-casserole-beauty-4x3-66dcfc2122e64402bb1edd2500d423bd.jpg",
      "alt": "Spinach, Sausage, and Egg Casserole"
    },
    "prep_time_minutes": 15,
    "cook_time_minutes": 35,
    "total_time_minutes": 50,
    "servings": "12",
    "ingredients": [
      "1 pound breakfast sausage",
      "11 large eggs",
      "0.75 cup milk",
      "2 cups shredded sharp Cheddar cheese",
      "1 (10 ounce) package frozen chopped spinach, thawed and drained",
      "1 teaspoon dried oregano"
    ],
    "instructions": [
      "Gather all ingredients and preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.",
      "Heat a large skillet over medium-high heat. Cook and stir sausage in the hot skillet until browned and crumbly, 5 to 7 minutes; drain and discard grease.",
      "Beat together eggs and milk in a large bowl.",
      "Stir in cooked sausage, Cheddar cheese, spinach, and oregano until well combined; pour into the prepared baking dish.",
      "Bake in the preheated oven until a knife inserted into the center of casserole comes out clean, 30 to 40 minutes."
    ],
    "nutrition_per_serving": {
      "calories": 238,
      "total_fat_g": 17.0,
      "carbohydrates_g": 3.0,
      "fiber_g": 1.0,
      "sugar_g": 2.0,
      "protein_g": 19.0,
      "sodium_mg": 408,
      "cholesterol_mg": 217,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "rating": 0,
    "review_count": 0,
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/285119/baked-chicken-and-vegetable-rice-paper-rolls/",
    "category": "egg-rolls",
    "id": 285119,
    "name": "Baked Chicken and Vegetable Rice Paper Rolls",
    "description": "For this recipe, cooked chicken, rice, and vegetables fill these baked chicken and vegetable rice paper rolls. They can be served with a variety of sauces.",
    "author": "The Pynns",
    "image": {
      "url": "https://www.allrecipes.com/thmb/v6boD2_jyq0fDMmcTe0wLtZ3T9I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1083801-16e191dbbc324f1eacb32ee93bd4cfd2.jpg",
      "alt": "Baked Chicken and Vegetable Rice Paper Rolls"
    },
    "prep_time_minutes": 30,
    "cook_time_minutes": 25,
    "total_time_minutes": 55,
    "servings": "6",
    "ingredients": [
      "1 teaspoon vegetable oil, divided",
      "2 teaspoons sesame oil",
      "2 teaspoons minced fresh ginger",
      "2 cloves garlic, minced",
      "2 cups shredded cooked chicken",
      "1 cup shredded cabbage",
      "1 large carrot, finely shredded",
      "2 tablespoons soy sauce",
      "2 tablespoons dry garlic sauce",
      "0.5 cup cooked jasmine rice",
      "12 rice paper sheets"
    ],
    "instructions": [
      "Preheat the oven to 425 degrees F (220 degrees C). Brush a large baking sheet with \u00bd teaspoon vegetable oil.",
      "Heat sesame oil in a large skillet over medium-high heat. Add ginger and garlic; saut\u00e9 1 to 2 minutes. Add cooked chicken, cabbage, carrot, soy sauce, and dry garlic sauce; cook and stir until vegetables soft, 2 to 3 minutes. Stir in cooked rice. Reduce heat to low while preparing rice papers.",
      "Wet a clean kitchen cloth with warm water; place 1 rice paper wrapper inside. Wrap completely in cloth; soften, about 1 minute. Place \u00bc cup chicken mixture in middle of softened rice paper wrapper; fold in both ends, then roll from one side to the other. Place wrapped roll onto the prepared baking sheet.",
      "Repeat wetting, softening, filling, and rolling with remaining rice paper wrappers and chicken mixture. Brush rolls with remaining \u00bd teaspoon vegetable oil.",
      "Bake in the preheated oven for 10 minutes; flip rolls and bake 10 minutes more."
    ],
    "nutrition_per_serving": {
      "calories": 137,
      "total_fat_g": 6.0,
      "carbohydrates_g": 7.0,
      "fiber_g": 1.0,
      "sugar_g": 1.0,
      "protein_g": 14.0,
      "sodium_mg": 341,
      "cholesterol_mg": 35,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Lunch",
    "cuisine": "Asian Inspired",
    "rating": 0,
    "review_count": 0,
    "meal_type": "fitness"
  },
  {
    "url": "https://www.allrecipes.com/recipe/98390/megans-granola/",
    "category": "granola",
    "id": 98390,
    "name": "Megan's Granola",
    "description": "This granola recipe is packed with healthy toasted oats, crunchy nuts, and seeds sweetened with maple syrup for a delicious homemade breakfast cereal.",
    "author": "annie9",
    "image": {
      "url": "https://www.allrecipes.com/thmb/6bcYMwC67tFhoyyFG6FJF-JBrkk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/98390-megans-granola-Reem-Muzahem-4x31-5e95a70a4992450aa952001c38779d85.jpg",
      "alt": "Megan's Granola"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 25,
    "total_time_minutes": 60,
    "servings": "34",
    "ingredients": [
      "8 cups rolled oats",
      "1.5 cups wheat germ",
      "1.5 cups oat bran",
      "1 cup sunflower seeds",
      "1 cup finely chopped almonds",
      "1 cup finely chopped pecans",
      "1 cup finely chopped walnuts",
      "1 cup vegetable oil",
      "0.75 cup honey",
      "0.5 cup brown sugar",
      "0.25 cup maple syrup",
      "1 tablespoon ground cinnamon",
      "1 tablespoon vanilla extract",
      "1.5 teaspoons salt",
      "2 cups raisins or sweetened dried cranberries"
    ],
    "instructions": [
      "Preheat the oven to 325 degrees F (165 degrees C). Line two large baking sheets with parchment paper or aluminum foil.",
      "Combine oats, wheat germ, oat bran, sunflower seeds, almonds, pecans, and walnuts in a large bowl.",
      "Stir oil, honey, brown sugar, maple syrup, cinnamon, vanilla, and salt together in a saucepan over medium heat. Bring to a boil, then pour over dry ingredients and stir to coat. Transfer to the prepared baking sheets and spread out evenly.",
      "Bake in the preheated oven until crispy and toasted, about 20 minutes, stirring once halfway through. Let cool for 15 to 20 minutes, then stir in raisins."
    ],
    "nutrition_per_serving": {
      "calories": 306,
      "total_fat_g": 17.0,
      "carbohydrates_g": 37.0,
      "fiber_g": 5.0,
      "sugar_g": 16.0,
      "protein_g": 7.0,
      "sodium_mg": 341,
      "cholesterol_mg": 0,
      "saturated_fat_g": 2.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "rating": 0,
    "review_count": 0,
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/213717/chakchouka-shakshouka/",
    "category": "gluten-free",
    "id": 213717,
    "name": "Shakshuka",
    "description": "Shakshuka is a classic North African and Middle Eastern breakfast dish of gently poached eggs in a delicious tomato sauce with onion, garlic, and spices.",
    "author": "Ben",
    "image": {
      "url": "https://www.allrecipes.com/thmb/6X6yMwmWIOxytR_P74lFSMRTimk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/213717-Chakchouka-DDMFS-4x3-1373-6721f79ac68347d28df5e8e44cdab25d.jpg",
      "alt": "Shakshuka"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": 20,
    "total_time_minutes": 40,
    "servings": "4",
    "ingredients": [
      "3 tablespoons olive oil",
      "1.3333333730698 cups chopped onion",
      "1 cup thinly sliced bell peppers, any color",
      "2 cloves garlic, minced, or to taste",
      "2.5 cups chopped tomatoes",
      "1 hot chile pepper, seeded and finely chopped, or to taste",
      "1 teaspoon ground cumin",
      "1 teaspoon paprika",
      "1 teaspoon salt",
      "4 large eggs"
    ],
    "instructions": [
      "Gather all ingredients.",
      "Heat olive oil in a skillet over medium heat. Stir in onion, bell pepper, and garlic; cook and stir until vegetables have softened and onion has turned translucent, about 5 minutes.",
      "Meanwhile, mix together tomatoes, chile pepper, cumin, paprika, and salt in a bowl.",
      "Stir tomato mixture into onion mixture. Simmer, uncovered, until tomato juices have cooked off, about 10 minutes.",
      "Make 4 indentations in tomato mixture; crack eggs into indentations. Cover the skillet and cook until eggs are firm but not dry, about 5 minutes.",
      "Serve and enjoy!"
    ],
    "nutrition_per_serving": {
      "calories": 209,
      "total_fat_g": 15.0,
      "carbohydrates_g": 13.0,
      "fiber_g": 3.0,
      "sugar_g": 7.0,
      "protein_g": 8.0,
      "sodium_mg": 654,
      "cholesterol_mg": 164,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "cuisine": "Israeli",
    "rating": 0,
    "review_count": 0,
    "meal_type": "study"
  },
  {
    "url": "https://www.allrecipes.com/recipe/270832/pina-colada-cottage-cheese-bowl/",
    "category": "granola",
    "id": 270832,
    "name": "Pina Colada Cottage Cheese Bowl",
    "description": "For those days you don't feel like yogurt, this cottage cheese bowl is sure to hit the spot! Play around with different fruits and toppings.",
    "author": "France Cevallos",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DGOkr_qrVSeMFKhkvFDa4qpd8R8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6401608-76c4ae55c0ff4d508278c33b85fd1f84.jpg",
      "alt": "Pina Colada Cottage Cheese Bowl"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": null,
    "total_time_minutes": 10,
    "servings": "1",
    "ingredients": [
      "0.5 cup low-fat cottage cheese",
      "0.25 cup chopped fresh pineapple",
      "1 tablespoon unsweetened toasted coconut",
      "1 tablespoon coarsely chopped macadamia nuts",
      "1 tablespoon granola"
    ],
    "instructions": [
      "Place cottage cheese into a small bowl. Arrange pineapple, coconut, macadamia nuts, and granola side-by-side on top. Serve immediately."
    ],
    "nutrition_per_serving": {
      "calories": 244,
      "total_fat_g": 12.0,
      "carbohydrates_g": 18.0,
      "fiber_g": 3.0,
      "sugar_g": 11.0,
      "protein_g": 17.0,
      "sodium_mg": 446,
      "cholesterol_mg": 5,
      "saturated_fat_g": 5.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "rating": 0,
    "review_count": 0,
    "meal_type": "fitness",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/246015/honey-nutty-granola/",
    "category": "granola",
    "id": 246015,
    "name": "Honey Nutty Granola",
    "description": "This granola is not just for breakfast, it'll also satisfy any sweet tooth; with coconut, macadamia nuts, and raisins, it tastes like dessert.",
    "author": "Culinary Envy",
    "image": {
      "url": "https://www.allrecipes.com/thmb/NruFwuCX4EC0KJu8r3lx4dJSQRg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4579695-04eb7bb404ea4ecd84b7376f03d45096.jpg",
      "alt": "Honey Nutty Granola"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 31,
    "total_time_minutes": 56,
    "servings": "16",
    "ingredients": [
      "3 cups rolled oats",
      "1.5 cups toasted almonds, coarsely chopped",
      "1 cup roasted macadamia nuts, coarsely chopped",
      "1.5 cups flaked coconut",
      "0.5 cup extra-virgin olive oil",
      "0.75 cup honey",
      "0.25 cup butter",
      "0.5 cup brown sugar",
      "1 teaspoon kosher salt",
      "0.5 teaspoon ground turmeric",
      "0.5 teaspoon ground cinnamon",
      "0.75 cup golden raisins"
    ],
    "instructions": [
      "Preheat oven to 300 degrees F (150 degrees C).",
      "Combine oats, almonds, macadamia nuts, and coconut in a large bowl. Heat olive oil, honey, butter, and brown sugar together in a separate microwave-safe bowl in the microwave until butter is melted, 30 seconds to 1 minute.",
      "Whisk butter mixture until brown sugar is dissolved; stir in salt, turmeric, and cinnamon. Pour butter mixture over oat mixture; toss to coat thoroughly. Spread granola evenly on a baking sheet.",
      "Bake granola in preheated oven until well-toasted and golden brown, about 30 minutes. Cool on the baking sheet to set, about 15 minutes. Transfer to a large bowl; stir in raisins."
    ],
    "nutrition_per_serving": {
      "calories": 404,
      "total_fat_g": 26.0,
      "carbohydrates_g": 42.0,
      "fiber_g": 5.0,
      "sugar_g": 26.0,
      "protein_g": 6.0,
      "sodium_mg": 165,
      "cholesterol_mg": 8,
      "saturated_fat_g": 6.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "rating": 0,
    "review_count": 0,
    "meal_type": "work",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/279761/spicy-tuna-and-hummus-salad/",
    "category": "hummus",
    "id": 279761,
    "name": "Spicy Tuna and Hummus Salad",
    "description": "Hummus replaces mayo in this recipe for a spicy, flavorful twist on everyone's favorite sandwich filling.",
    "author": "spiritedcharm",
    "image": {
      "url": "https://www.allrecipes.com/thmb/PRd6eDWR0xUaeR9Ma0dz8W8TEnI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5559186-e25241cf140742178e1757d022c901c7.jpg",
      "alt": "Spicy Tuna and Hummus Salad"
    },
    "prep_time_minutes": 20,
    "cook_time_minutes": null,
    "total_time_minutes": 20,
    "servings": "4",
    "ingredients": [
      "0.5 (8 ounce) jar roasted red peppers, drained",
      "4 (5 ounce) cans water-packed tuna, well drained",
      "4 hard-boiled eggs, chopped",
      "0.5 cup roasted garlic hummus",
      "1 bunch green onions, chopped",
      "2 stalks celery, finely chopped",
      "2 tablespoons Sriracha sauce",
      "2 tablespoons capers",
      "4 teaspoons seafood seasoning (such as Old Bay\u00ae)"
    ],
    "instructions": [
      "Drain roasted red peppers and pat dry. Puree in a food processor until finely chopped.",
      "Transfer roasted red peppers to a bowl. Add tuna, hard-boiled eggs, hummus, green onions, celery, Sriracha sauce, capers, and seafood seasoning. Mix together. Divide into individual 1-cup portions and refrigerate."
    ],
    "nutrition_per_serving": {
      "calories": 343,
      "total_fat_g": 13.0,
      "carbohydrates_g": 12.0,
      "fiber_g": 5.0,
      "sugar_g": 3.0,
      "protein_g": 43.0,
      "sodium_mg": 1814,
      "cholesterol_mg": 271,
      "saturated_fat_g": 3.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Lunch",
    "rating": 0,
    "review_count": 0,
    "meal_type": "fitness",
    "cuisine": "American"
  },
  {
    "url": "https://www.allrecipes.com/recipe/246467/sweet-matzo-brei/",
    "category": "lent",
    "id": 246467,
    "name": "Sweet Matzo Brei",
    "description": "This sweet matzo brei is a Passover recipe featuring matzo soaked in milk, sugar, and cinnamon, then fried like a pancake and served drizzled with honey.",
    "author": "JanAtch",
    "image": {
      "url": "https://www.allrecipes.com/thmb/qJIEZRQNHcUvnkRfAf69goRtKqA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3450649-735d213f05684b5489122af69265df3f.jpg",
      "alt": "Sweet Matzo Brei"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 10,
    "total_time_minutes": 20,
    "servings": "8",
    "ingredients": [
      "5 matzo sheets",
      "1 cup milk, or more as needed",
      "2 eggs",
      "2 tablespoons ground cinnamon, or to taste",
      "2 tablespoons white sugar, or to taste",
      "1 teaspoon vanilla extract",
      "0.5 cup butter"
    ],
    "instructions": [
      "Pass matzo sheets one at a time under cool running water briefly, then crumble into a large bowl. Stir in milk, eggs, cinnamon, sugar, and vanilla to form an evenly moist batter. Add more milk if batter is too dry.",
      "Heat butter in a large skillet over medium heat. Scoop a generous spoonful of batter into hot butter and flatten with the back of a spatula. Cook until golden brown, 3 to 5 minutes per side. Repeat with remaining batter."
    ],
    "nutrition_per_serving": {
      "calories": 222,
      "total_fat_g": 13.0,
      "carbohydrates_g": 21.0,
      "fiber_g": 1.0,
      "sugar_g": 5.0,
      "protein_g": 5.0,
      "sodium_mg": 112,
      "cholesterol_mg": 79,
      "saturated_fat_g": 8.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "cuisine": "Jewish",
    "rating": 0,
    "review_count": 0,
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/268421/sloppy-joe-sandwich-filling/",
    "category": "sloppy-joes",
    "id": 268421,
    "name": "Sloppy Joe Sandwich Filling",
    "description": "The traditional sloppy Joe goes south of the border in this tangy, flavorful sandwich filling recipe.",
    "author": "thedailygourmet",
    "image": {
      "url": "https://www.allrecipes.com/thmb/3o_ZIqoIaMu06pTMBfNk6h-T2F0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5809378-70459a47d8f1426b80fae4488c01cdf0.jpg",
      "alt": "Sloppy Joe Sandwich Filling"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "4",
    "ingredients": [
      "2 tablespoons butter",
      "0.25 cup minced onion",
      "0.25 cup chopped poblano chile pepper",
      "8 ounces extra-lean ground beef",
      "4 ounces chorizo sausage",
      "1.5 tablespoons red enchilada dry seasoning (such as Savory Spice Shop\u00ae Canyon Road)",
      "1 tablespoon tomato powder (such as Savory Spice Shop\u00ae)",
      "0.5 cup water",
      "0.33333334326744 cup ketchup",
      "2 teaspoons Worcestershire sauce",
      "1 avocado, sliced",
      "0.5 cup shredded Oaxaca cheese, or to taste",
      "4 hamburger bun, split and toasted"
    ],
    "instructions": [
      "Melt butter in a skillet over medium heat. Cook onion and poblano pepper until softened, about 5 minutes. Transfer mixture to a plate. Add ground beef and chorizo to the skillet. Cook, stirring often to break up meat, until browned and crumbly, 5 to 7 minutes. Add enchilada seasoning and tomato powder. Add water, ketchup, and Worcestershire sauce. Return cooked onion mixture to the skillet. Simmer until flavors combine, about 5 minutes more.",
      "Serve meat mixture on toasted buns topped with Oaxaca cheese and avocado."
    ],
    "nutrition_per_serving": {
      "calories": 602,
      "total_fat_g": 38.0,
      "carbohydrates_g": 38.0,
      "fiber_g": 6.0,
      "sugar_g": 6.0,
      "protein_g": 28.0,
      "sodium_mg": 1725,
      "cholesterol_mg": 94,
      "saturated_fat_g": 15.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Lunch",
    "cuisine": "Mexican Inspired",
    "rating": 0,
    "review_count": 0,
    "meal_type": "work"
  },
  {
    "url": "https://www.allrecipes.com/recipe/17036/pumpkin-pancakes/",
    "category": "thanksgiving",
    "id": 17036,
    "name": "Pumpkin Pancakes",
    "description": "This pumpkin pancake recipe, spiced with ginger, cinnamon, and allspice, and made with fresh or canned pumpkin, is perfect for a cozy fall breakfast.",
    "author": "Allrecipes Member",
    "image": {
      "url": "https://www.allrecipes.com/thmb/DIwN5oBpTt3zv5NNLcuCvTk4FMM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17036-pumpkin-pancakes-step-04-3-1d9b305c5c8442ec8afe13d7fec01a52.jpg",
      "alt": "Pumpkin Pancakes"
    },
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "total_time_minutes": 25,
    "servings": "6",
    "ingredients": [
      "1.5 cups milk",
      "1 cup pumpkin puree",
      "1 large egg",
      "2 tablespoons vegetable oil",
      "2 tablespoons vinegar",
      "2 cups all-purpose flour",
      "3 tablespoons brown sugar",
      "2 teaspoons baking powder",
      "1 teaspoon baking soda",
      "1 teaspoon ground allspice",
      "1 teaspoon ground cinnamon",
      "0.5 teaspoon ground ginger",
      "0.5 teaspoon salt",
      "cooking spray"
    ],
    "instructions": [
      "Whisk milk, pumpkin, egg, oil, and vinegar together in a large bowl until well combined.",
      "Whisk flour, sugar, baking powder, baking soda, allspice, cinnamon, ginger, and salt together in a medium bowl. Whisk into pumpkin mixture until no dry streaks remain.",
      "Spray a griddle or skillet with cooking spray; heat over medium-high heat. Pour 3 to 4 tablespoons batter for each pancake onto the griddle; flatten slightly.",
      "Cook until small bubbles form on surface, and edges look set, 2 to 3 minutes.",
      "Flip and cook until golden, about 2 minutes more. Repeat with remaining batter."
    ],
    "nutrition_per_serving": {
      "calories": 268,
      "total_fat_g": 6.0,
      "carbohydrates_g": 45.0,
      "fiber_g": 3.0,
      "sugar_g": 10.0,
      "protein_g": 8.0,
      "sodium_mg": 592,
      "cholesterol_mg": 34,
      "saturated_fat_g": 1.0,
      "unsaturated_fat_g": 0.0
    },
    "recipe_category": "Breakfast",
    "cuisine": "American",
    "rating": 0,
    "review_count": 0,
    "meal_type": "work"
  }
];
