# 🍽️ Cuisine Database Access Guide

Complete guide to accessing and managing your cuisine recipe database in the British Student Nutrition Planner app.

---

## 📋 Table of Contents

1. [Admin Dashboard (UI Method)](#1-admin-dashboard-ui-method)
2. [REST API Endpoints](#2-rest-api-endpoints)
3. [Supabase Dashboard (Direct Access)](#3-supabase-dashboard-direct-access)
4. [Database Structure](#4-database-structure)
5. [Quick Reference](#5-quick-reference)

---

## 1. Admin Dashboard (UI Method)

### 🎯 Best for: Non-technical users, visual interface, quick browsing

The Admin Dashboard is a full-featured UI component for managing your cuisine database.

### Access Steps:

#### **Option A: Create a dedicated admin route**

1. **Add AdminDashboard to your App.tsx:**

```tsx
// Add import at top
import { AdminDashboard } from './components/AdminDashboard';

// Inside your App component, add a route/step:
{currentStep === 5 && <AdminDashboard />}
```

2. **Add navigation button** (e.g., in WelcomeStep.tsx):

```tsx
<button
  onClick={() => setCurrentStep(5)}
  className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700"
>
  🔧 Admin Dashboard
</button>
```

#### **Option B: Standalone admin page**

Create `/src/app/admin.tsx`:

```tsx
import { AdminDashboard } from './components/AdminDashboard';

export default function Admin() {
  return <AdminDashboard />;
}
```

Then access via: `http://localhost:5173/admin` (adjust based on your routing setup)

---

### Features Available:

✅ **View all recipes** - Browse complete list with filters  
✅ **Search recipes** - Search by name or ingredients  
✅ **View recipe details** - Full recipe information with nutrition  
✅ **Edit recipes** - Modify recipe properties (currently limited)  
✅ **Delete recipes** - Remove recipes from database  
✅ **Initialize database** - Load all 16 cuisine recipes into KV store  
✅ **Refresh data** - Reload recipe list  

---

### Admin Dashboard Screenshot Layout:

```
┌─────────────────────────────────────────────────────────┐
│  🗄️ Recipe Database Admin                               │
│  Manage your cuisine recipe database                    │
├─────────────────────────────────────────────────────────┤
│  [Initialize Database] [Refresh]                        │
│                                                          │
│  [Search bar: "Search recipes..."]      [Search]        │
├──────────────┬──────────────────────────────────────────┤
│ RECIPES (16) │  RECIPE DETAILS                          │
│              │                                           │
│ 🇬🇧 Shepherd's│  🇬🇧 Shepherd's Pie                      │
│    Pie       │  British Cuisine                         │
│              │                                           │
│ 🇮🇹 Carbonara│  [Edit] [Delete]                         │
│              │                                           │
│ 🇨🇳 Sweet &  │  Basic Information:                      │
│    Sour...   │  Name: Shepherd's Pie                    │
│              │  Category: one-pot                       │
│ 🇮🇳 Chicken  │  Cooking Time: 45 minutes                │
│    Tikka     │  ...                                     │
│              │                                           │
│ ...          │  Ingredients: (9 items)                  │
│              │  Instructions: (8 steps)                 │
│              │  Nutrition: 480 cal, 28g protein...     │
└──────────────┴──────────────────────────────────────────┘
```

---

## 2. REST API Endpoints

### 🎯 Best for: Developers, automated scripts, custom integrations

All API endpoints are available via your Supabase Edge Function.

### Base URL:
```
https://{projectId}.supabase.co/functions/v1/make-server-dbaf6019
```

### Authentication:
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {publicAnonKey}'
}
```

---

### Available Endpoints:

#### **1. Get All Cuisines**
```http
GET /cuisines
```

**Response:**
```json
{
  "cuisines": ["british", "italian", "chinese", "indian", "mexican", "mediterranean", "japanese", "american"],
  "stats": {
    "british": 2,
    "italian": 2,
    "chinese": 2,
    ...
  },
  "total": 16
}
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/cuisines`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const data = await response.json();
console.log('Available cuisines:', data.cuisines);
```

---

#### **2. Get Recipes by Cuisine**
```http
GET /cuisines/{cuisine}
```

**Parameters:**
- `{cuisine}`: british | italian | chinese | indian | mexican | mediterranean | japanese | american

**Response:**
```json
{
  "cuisine": "british",
  "recipes": [
    {
      "id": "british-shepherds-pie",
      "name": "Shepherd's Pie",
      "description": "Classic British comfort food...",
      "cuisine": "british",
      "category": "one-pot",
      "cookingTime": 45,
      "spiceLevel": "mild",
      "ingredients": [...],
      "nutrition": {...},
      ...
    }
  ],
  "count": 2
}
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/cuisines/british`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const data = await response.json();
console.log('British recipes:', data.recipes);
```

---

#### **3. Get Recipes by Spice Level**
```http
GET /spice-level/{level}
```

**Parameters:**
- `{level}`: mild | medium | hot

**Response:**
```json
{
  "spiceLevel": "hot",
  "recipes": [...],
  "count": 3
}
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/spice-level/hot`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const data = await response.json();
console.log('Hot spicy recipes:', data.recipes);
```

---

#### **4. Initialize Cuisine Database**
```http
POST /init-cuisine-database
```

**Purpose:** Load all 16 cuisine recipes into the KV store

**Response:**
```json
{
  "message": "Cuisine database initialized successfully",
  "totalRecipes": 16,
  "cuisines": ["british", "italian", "chinese", ...],
  "stats": {
    "british": 2,
    "italian": 2,
    ...
  }
}
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/init-cuisine-database`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const data = await response.json();
console.log(data.message); // "Cuisine database initialized successfully"
```

---

#### **5. Get All Recipes (Admin)**
```http
GET /admin/all-recipes
```

**Purpose:** Get a summary of all recipes in the database

**Response:**
```json
{
  "count": 16,
  "recipes": [
    {
      "key": "cuisine:british:british-shepherds-pie",
      "id": "british-shepherds-pie",
      "name": "Shepherd's Pie",
      "cuisine": "british",
      "category": "one-pot",
      "cookingTime": 45,
      "totalCost": "8.10"
    },
    ...
  ]
}
```

---

#### **6. Get Specific Recipe (Admin)**
```http
GET /admin/recipe/{cuisine}/{recipeId}
```

**Parameters:**
- `{cuisine}`: british | italian | chinese | etc.
- `{recipeId}`: Recipe ID (e.g., british-shepherds-pie)

**Response:**
```json
{
  "key": "cuisine:british:british-shepherds-pie",
  "recipe": {
    "id": "british-shepherds-pie",
    "name": "Shepherd's Pie",
    "description": "...",
    "cuisine": "british",
    "category": "one-pot",
    "cookingTime": 45,
    "servings": 4,
    "difficulty": "medium",
    "spiceLevel": "mild",
    "authentic": true,
    "ingredients": [
      {
        "name": "Lamb Mince",
        "amount": "500g",
        "category": "meat",
        "estimatedPrice": 4.50
      },
      ...
    ],
    "instructions": [...],
    "nutrition": {
      "calories": 480,
      "protein": 28,
      "carbs": 52,
      "fats": 18,
      "fiber": 6
    },
    "tags": [...],
    "benefits": [...],
    "suitableFor": ["studying", "working", "fitness"]
  }
}
```

**Example:**
```javascript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/admin/recipe/british/british-shepherds-pie`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
const data = await response.json();
console.log('Full recipe details:', data.recipe);
```

---

#### **7. Add/Update Recipe (Admin)**
```http
POST /admin/recipe
```

**Request Body:**
```json
{
  "id": "new-recipe-id",
  "name": "New Recipe Name",
  "cuisine": "british",
  "category": "one-pot",
  "cookingTime": 30,
  "servings": 2,
  "difficulty": "easy",
  "spiceLevel": "mild",
  "authentic": true,
  "ingredients": [...],
  "instructions": [...],
  "nutrition": {...},
  "tags": [...],
  "benefits": [...],
  "suitableFor": ["studying"],
  "description": "...",
  "imageQuery": "..."
}
```

**Response:**
```json
{
  "message": "Recipe saved successfully",
  "key": "cuisine:british:new-recipe-id"
}
```

---

#### **8. Delete Recipe (Admin)**
```http
DELETE /admin/recipe/{cuisine}/{recipeId}
```

**Response:**
```json
{
  "message": "Recipe deleted successfully",
  "key": "cuisine:british:british-shepherds-pie"
}
```

---

#### **9. Search Recipes (Admin)**
```http
POST /admin/search-recipes
```

**Request Body:**
```json
{
  "query": "chicken"
}
```

**Response:**
```json
{
  "query": "chicken",
  "recipes": [
    {
      "id": "chinese-sweet-sour-chicken",
      "name": "Sweet & Sour Chicken",
      ...
    },
    {
      "id": "indian-chicken-tikka",
      "name": "Chicken Tikka Masala",
      ...
    },
    ...
  ],
  "count": 3
}
```

---

## 3. Supabase Dashboard (Direct Access)

### 🎯 Best for: Direct database inspection, debugging, bulk operations

Access the raw KV store data directly through the Supabase dashboard.

### Access Steps:

1. **Go to your Supabase project dashboard:**
   ```
   https://supabase.com/dashboard/project/{projectId}
   ```

2. **Navigate to Table Editor**
   - Click "Table Editor" in left sidebar
   - Select table: `kv_store_dbaf6019`

3. **View cuisine recipes:**
   - Look for keys starting with `cuisine:`
   - Format: `cuisine:{cuisineName}:{recipeId}`

---

### Key Structure:

```
cuisine:british:british-shepherds-pie  → Shepherd's Pie recipe
cuisine:british:british-fish-chips     → Fish & Chips recipe
cuisine:italian:italian-carbonara      → Carbonara recipe
cuisine:italian:italian-margherita-pizza → Margherita Pizza recipe
cuisine:chinese:chinese-stir-fry-noodles → Stir-Fry Noodles recipe
cuisine:chinese:chinese-sweet-sour-chicken → Sweet & Sour Chicken recipe
cuisine:indian:indian-chicken-tikka    → Chicken Tikka Masala recipe
cuisine:indian:indian-dal-curry        → Dal Curry recipe
cuisine:mexican:mexican-chicken-burrito → Chicken Burrito Bowl recipe
cuisine:mexican:mexican-beef-tacos     → Beef Tacos recipe
cuisine:japanese:japanese-chicken-ramen → Chicken Ramen recipe
cuisine:japanese:japanese-teriyaki-salmon → Teriyaki Salmon recipe
cuisine:mediterranean:mediterranean-greek-salad → Greek Salad recipe
cuisine:mediterranean:mediterranean-falafel-wrap → Falafel Wrap recipe
cuisine:american:american-mac-cheese   → Mac & Cheese recipe
cuisine:stats                          → Metadata about cuisines
```

---

### Filtering Tips:

**To view all British recipes:**
- Filter by key: `cuisine:british:%` (SQL LIKE pattern)

**To view all recipes:**
- Filter by key: `cuisine:%`
- Exclude: `cuisine:stats`

**To view specific recipe:**
- Search exact key: `cuisine:italian:italian-carbonara`

---

### Supabase SQL Editor Method:

```sql
-- Get all cuisine recipes
SELECT * FROM kv_store_dbaf6019 
WHERE key LIKE 'cuisine:%' 
AND key != 'cuisine:stats';

-- Get all British recipes
SELECT * FROM kv_store_dbaf6019 
WHERE key LIKE 'cuisine:british:%';

-- Get specific recipe
SELECT * FROM kv_store_dbaf6019 
WHERE key = 'cuisine:italian:italian-carbonara';

-- Count recipes by cuisine
SELECT 
  SPLIT_PART(key, ':', 2) as cuisine,
  COUNT(*) as recipe_count
FROM kv_store_dbaf6019 
WHERE key LIKE 'cuisine:%' 
AND key != 'cuisine:stats'
GROUP BY cuisine;
```

---

## 4. Database Structure

### Recipe Object Schema:

```typescript
interface CuisineRecipe {
  // Identity
  id: string;                          // "british-shepherds-pie"
  name: string;                        // "Shepherd's Pie"
  description: string;                 // "Classic British comfort food..."
  
  // Cuisine Properties
  cuisine: CuisineType;                // "british" | "italian" | "chinese" | ...
  spiceLevel: 'mild' | 'medium' | 'hot';
  authentic: boolean;                  // true = authentic, false = student-friendly
  
  // Recipe Properties
  category: 'one-pot' | 'microwave' | 'meal-prep';
  cookingTime: number;                 // minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  
  // Content
  ingredients: RecipeIngredient[];     // Array of ingredients with prices
  instructions: string[];              // Step-by-step cooking instructions
  
  // Nutrition
  nutrition: {
    calories: number;                  // Total calories
    protein: number;                   // Total protein (g)
    carbs: number;                     // Total carbs (g)
    fats: number;                      // Total fats (g)
    fiber: number;                     // Total fiber (g)
  };
  
  // Metadata
  tags: string[];                      // ["High Protein", "Budget Friendly", ...]
  benefits: string[];                  // Educational benefits
  suitableFor: ('studying' | 'working' | 'fitness')[];
  imageQuery: string;                  // For image search/generation
}

interface RecipeIngredient {
  name: string;                        // "Lamb Mince"
  amount: string;                      // "500g"
  category: 'dairy' | 'produce' | 'meat' | 'pantry' | 'frozen' | 'bakery';
  estimatedPrice: number;              // 4.50 (in GBP)
}
```

---

### Current Database Contents:

| Cuisine | Recipe Count | Recipes |
|---------|--------------|---------|
| 🇬🇧 British | 2 | Shepherd's Pie, Fish & Chips |
| 🇮🇹 Italian | 2 | Carbonara, Margherita Pizza |
| 🇨🇳 Chinese | 2 | Stir-Fry Noodles, Sweet & Sour Chicken |
| 🇮🇳 Indian | 2 | Chicken Tikka Masala, Dal Curry |
| 🇲🇽 Mexican | 2 | Chicken Burrito Bowl, Beef Tacos |
| 🇯🇵 Japanese | 2 | Chicken Ramen, Teriyaki Salmon |
| 🌊 Mediterranean | 2 | Greek Salad, Falafel Wrap |
| 🇺🇸 American | 1 | Mac & Cheese |
| **Total** | **16** | **All cuisines** |

---

## 5. Quick Reference

### Initialization Checklist:

```bash
✅ Step 1: Initialize the database
   → Call POST /init-cuisine-database
   → Or click "Initialize Database" in Admin Dashboard

✅ Step 2: Verify recipes loaded
   → Call GET /cuisines
   → Should return 8 cuisines and 16 total recipes

✅ Step 3: Test retrieval
   → Call GET /cuisines/british
   → Should return 2 British recipes

✅ Step 4: Test meal plan generation
   → Call POST /generate-meal-plan with cuisinePreference
   → Recipes should be filtered by cuisine
```

---

### Common API Calls:

```javascript
// Import credentials
import { projectId, publicAnonKey } from '../utils/supabase/info';

const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
};

// 1. Initialize database
await fetch(`${baseUrl}/init-cuisine-database`, { 
  method: 'POST', 
  headers 
});

// 2. Get all cuisines
const cuisines = await fetch(`${baseUrl}/cuisines`, { headers })
  .then(r => r.json());

// 3. Get Italian recipes
const italian = await fetch(`${baseUrl}/cuisines/italian`, { headers })
  .then(r => r.json());

// 4. Get spicy recipes
const spicy = await fetch(`${baseUrl}/spice-level/hot`, { headers })
  .then(r => r.json());

// 5. Get all recipes (admin)
const allRecipes = await fetch(`${baseUrl}/admin/all-recipes`, { headers })
  .then(r => r.json());

// 6. Search recipes
const results = await fetch(`${baseUrl}/admin/search-recipes`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ query: 'chicken' })
}).then(r => r.json());
```

---

### Browser DevTools Console Testing:

Open browser console on your app and paste:

```javascript
// Quick test: Get all cuisines
(async () => {
  const projectId = 'your-project-id'; // Replace with actual
  const publicAnonKey = 'your-anon-key'; // Replace with actual
  
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/cuisines`,
    {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    }
  );
  const data = await response.json();
  console.table(data.stats);
})();
```

---

### Troubleshooting:

**Problem:** "No recipes found"
- **Solution:** Run database initialization first
- **API:** `POST /init-cuisine-database`
- **UI:** Click "Initialize Database" button

**Problem:** "Recipe not found"
- **Check:** Recipe ID format is correct (e.g., `british-shepherds-pie`)
- **Check:** Cuisine name is lowercase (e.g., `british` not `British`)

**Problem:** API returns 401 Unauthorized
- **Check:** Authorization header is included
- **Check:** Using correct `publicAnonKey`

**Problem:** Can't see recipes in Supabase dashboard
- **Check:** Looking at `kv_store_dbaf6019` table
- **Check:** Filter for keys starting with `cuisine:`

---

## 📌 Summary

You have **3 powerful ways** to access your cuisine database:

1. **🖥️ Admin Dashboard** - Best for visual browsing and editing
2. **🔌 REST API** - Best for programmatic access and automation
3. **🗄️ Supabase Dashboard** - Best for direct database inspection

Choose the method that best fits your current task!

---

**Need more help?** Check the main `DATABASE_ADMIN_GUIDE.md` for additional database operations.
