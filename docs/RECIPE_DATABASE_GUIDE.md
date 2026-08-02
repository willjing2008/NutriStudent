# 📚 Recipe Database Management Guide

## Three Ways to Edit Your Recipe Database

---

## 1. 🎨 **Admin Dashboard (UI - EASIEST)**

### How to Access:
1. Log into your app
2. Click the **"🔧 Admin Panel"** button in the top right corner
3. You'll see a full-featured admin interface

### Features:
- **📋 View All Recipes** - Browse all recipes in the database
- **🔍 Search** - Find recipes by name or cuisine
- **👁️ View Details** - Click any recipe to see full details including ingredients, instructions, nutrition
- **✏️ Edit** - Click "Edit" button to modify any recipe field (name, description, cooking time, ingredients, etc.)
- **🗑️ Delete** - Remove recipes you don't want
- **➕ Add New** - Create brand new recipes from scratch
- **🔄 Initialize Database** - Reset/populate the database with default recipes

### Best For:
✅ Quick edits  
✅ Visual browsing  
✅ Non-technical users  
✅ Bulk viewing and management

---

## 2. 🔌 **REST API Endpoints (FOR DEVELOPERS)**

Base URL: `https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/`

### Admin Endpoints:

#### **GET /admin/all-recipes**
Get all recipes from the database
```bash
curl -X GET \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/all-recipes" \
  -H "Authorization: Bearer {publicAnonKey}"
```

#### **GET /admin/recipe/:cuisine/:recipeId**
Get a specific recipe
```bash
curl -X GET \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/recipe/british/shepherds-pie" \
  -H "Authorization: Bearer {publicAnonKey}"
```

#### **POST /admin/recipe**
Add or update a recipe
```bash
curl -X POST \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/recipe" \
  -H "Authorization: Bearer {publicAnonKey}" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new-recipe-id",
    "name": "My New Recipe",
    "cuisine": "british",
    "category": "one-pot",
    "cookingTime": 30,
    "servings": 4,
    "difficulty": "easy",
    "spiceLevel": "mild",
    "description": "A delicious meal",
    "ingredients": [...],
    "instructions": [...],
    "nutrition": {...},
    "tags": ["quick", "healthy"],
    "benefits": ["High protein"],
    "suitableFor": ["studying"],
    "imageQuery": "delicious food plate",
    "authentic": true
  }'
```

#### **DELETE /admin/recipe/:cuisine/:recipeId**
Delete a recipe
```bash
curl -X DELETE \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/recipe/british/old-recipe" \
  -H "Authorization: Bearer {publicAnonKey}"
```

#### **POST /admin/search-recipes**
Search recipes by query
```bash
curl -X POST \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/search-recipes" \
  -H "Authorization: Bearer {publicAnonKey}" \
  -H "Content-Type: application/json" \
  -d '{"query": "chicken"}'
```

#### **POST /init-cuisine-database**
Initialize/reset the database with default recipes
```bash
curl -X POST \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/init-cuisine-database" \
  -H "Authorization: Bearer {publicAnonKey}"
```

#### **DELETE /admin/clear-all-cuisines**
⚠️ **DANGER!** Clear all recipes (use with caution)
```bash
curl -X DELETE \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/clear-all-cuisines" \
  -H "Authorization: Bearer {publicAnonKey}"
```

#### **GET /admin/keys/:prefix**
Get all keys with a prefix (debugging)
```bash
curl -X GET \
  "https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/keys/cuisine" \
  -H "Authorization: Bearer {publicAnonKey}"
```

### Best For:
✅ Programmatic access  
✅ Bulk operations  
✅ Integration with other tools  
✅ Automated scripts

---

## 3. 💾 **Direct Supabase Dashboard Access**

### How to Access:
1. Go to [supabase.com](https://supabase.com)
2. Navigate to your project
3. Click on **"Table Editor"** in the left sidebar
4. Find the `kv_store_dbaf6019` table
5. Filter by keys starting with `cuisine:`

### Recipe Key Format:
```
cuisine:{cuisineName}:{recipeId}
```

Examples:
- `cuisine:british:shepherds-pie`
- `cuisine:indian:chicken-curry`
- `cuisine:italian:pasta-carbonara`

### How to Edit:
1. Find the row with your recipe key
2. Click the row to view the JSON value
3. Edit the JSON directly
4. Save changes

### Recipe JSON Structure:
```json
{
  "id": "recipe-id",
  "name": "Recipe Name",
  "cuisine": "british",
  "category": "one-pot",
  "cookingTime": 30,
  "servings": 4,
  "difficulty": "easy",
  "spiceLevel": "mild",
  "description": "Recipe description",
  "ingredients": [
    {
      "name": "Ingredient name",
      "amount": "200g",
      "category": "protein",
      "estimatedPrice": 2.50
    }
  ],
  "instructions": [
    "Step 1",
    "Step 2"
  ],
  "nutrition": {
    "calories": 450,
    "protein": 25,
    "carbs": 45,
    "fats": 15,
    "fiber": 5
  },
  "tags": ["quick", "healthy"],
  "benefits": ["High protein", "Energy boost"],
  "suitableFor": ["studying", "working", "fitness"],
  "imageQuery": "search query for AI image",
  "authentic": true
}
```

### Best For:
✅ Direct database access  
✅ Advanced users  
✅ Debugging  
✅ Viewing raw data

---

## 📝 Recipe Schema Reference

### Required Fields:
- `id` (string) - Unique identifier (lowercase, use hyphens)
- `name` (string) - Recipe display name
- `cuisine` (string) - One of: british, indian, chinese, italian, mexican, japanese, mediterranean, american
- `category` (string) - One of: one-pot, microwave, meal-prep
- `cookingTime` (number) - In minutes
- `servings` (number) - Number of servings
- `difficulty` (string) - One of: easy, medium, hard
- `spiceLevel` (string) - One of: mild, medium, spicy, very-spicy
- `description` (string) - Brief description
- `ingredients` (array) - List of ingredient objects
- `instructions` (array) - Step-by-step cooking instructions
- `nutrition` (object) - Nutritional information
- `tags` (array) - Tags for filtering
- `benefits` (array) - Health benefits
- `suitableFor` (array) - Goals: studying, working, fitness
- `imageQuery` (string) - Query for AI-generated images
- `authentic` (boolean) - Whether the recipe is authentic to its cuisine

### Category Options:
- `one-pot` - Everything cooked in one pot
- `microwave` - Microwave-only recipes
- `meal-prep` - Make-ahead batch cooking

### Cuisine Options:
- `british` - British cuisine
- `indian` - Indian cuisine
- `chinese` - Chinese cuisine
- `italian` - Italian cuisine
- `mexican` - Mexican cuisine
- `japanese` - Japanese cuisine
- `mediterranean` - Mediterranean cuisine
- `american` - American cuisine

### Spice Levels:
- `mild` - No heat
- `medium` - Slightly spicy
- `spicy` - Hot
- `very-spicy` - Very hot

### Suitable For:
- `studying` - Brain food, focus
- `working` - Energy, productivity
- `fitness` - High protein, muscle building

---

## 🚀 Quick Start Examples

### Example 1: Add a New Recipe via Admin UI
1. Click "🔧 Admin Panel"
2. Click "➕ Add New Recipe"
3. Fill in all fields
4. Click "Save Recipe"

### Example 2: Edit via API (using fetch in browser console)
```javascript
const projectId = 'your-project-id';
const publicAnonKey = 'your-anon-key';

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/recipe`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: JSON.stringify({
    id: 'quick-omelette',
    name: 'Quick Microwave Omelette',
    cuisine: 'british',
    category: 'microwave',
    cookingTime: 5,
    servings: 1,
    difficulty: 'easy',
    spiceLevel: 'mild',
    description: 'A super quick breakfast',
    ingredients: [
      { name: 'Eggs', amount: '2', category: 'protein', estimatedPrice: 0.40 },
      { name: 'Milk', amount: '2 tbsp', category: 'dairy', estimatedPrice: 0.10 },
      { name: 'Cheese', amount: '30g', category: 'dairy', estimatedPrice: 0.50 }
    ],
    instructions: [
      'Beat eggs with milk in a microwave-safe bowl',
      'Microwave for 1 minute',
      'Stir and add cheese',
      'Microwave for another minute',
      'Serve hot'
    ],
    nutrition: {
      calories: 250,
      protein: 18,
      carbs: 5,
      fats: 18,
      fiber: 0
    },
    tags: ['quick', 'breakfast', 'protein'],
    benefits: ['High protein', 'Quick energy'],
    suitableFor: ['studying', 'working', 'fitness'],
    imageQuery: 'fluffy microwave omelette cheese',
    authentic: false
  })
})
.then(r => r.json())
.then(data => console.log('Recipe added:', data));
```

### Example 3: Search Recipes
```javascript
fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/search-recipes`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: JSON.stringify({ query: 'chicken' })
})
.then(r => r.json())
.then(data => console.log('Search results:', data));
```

---

## 💡 Tips & Best Practices

1. **Always test in the UI first** - The Admin Dashboard is the safest way to make changes
2. **Backup before bulk operations** - Use the GET /admin/all-recipes endpoint to download a backup
3. **Use consistent naming** - Recipe IDs should be lowercase with hyphens (e.g., `chicken-curry`)
4. **Price estimation** - Keep ingredient prices realistic for UK supermarkets
5. **Cooking times** - Be honest about cooking times to match user preferences
6. **Images** - Write descriptive imageQuery strings for better AI-generated images
7. **Categories matter** - Properly categorize recipes so cooking method filtering works

---

## 🐛 Troubleshooting

**Problem:** Recipe doesn't appear in the app
- **Solution:** Check that the recipe key format is correct: `cuisine:{cuisineName}:{recipeId}`

**Problem:** Can't find a recipe in Admin Dashboard
- **Solution:** Try using the search function or check if it was saved with a different cuisine name

**Problem:** Recipe shows "Image not found"
- **Solution:** Update the `imageQuery` field to a more descriptive search term

**Problem:** Recipe isn't being filtered by cooking method
- **Solution:** Ensure the `category` field is set to one of: `one-pot`, `microwave`, or `meal-prep`

---

## 📞 Need Help?

If you need to make complex changes to the database structure, the KV store is flexible and can handle any JSON structure. Just make sure to maintain consistency with the recipe schema above.
