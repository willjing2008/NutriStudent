# 🚀 Quick Start: Access Admin Dashboard

The fastest way to check and manage your cuisine database!

---

## ⚡ Method 1: Add Admin Button to Welcome Screen (Recommended)

**Time: 2 minutes**

### Step 1: Open `/src/app/components/WelcomeStep.tsx`

### Step 2: Add this button near the bottom (before the "Get Started" button):

```tsx
{/* Admin Dashboard Access Button */}
<button
  onClick={() => {
    // Navigate to step 5 (or add a new route)
    window.location.href = '/admin'; // Or use your routing method
  }}
  className="mt-4 px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-2"
>
  🔧 Admin Dashboard
  <span className="text-xs opacity-75">(Manage 16 Recipes)</span>
</button>
```

---

## ⚡ Method 2: Direct Component Access

**Time: 1 minute**

### Step 1: Open `/src/app/App.tsx`

### Step 2: Add import at top:

```tsx
import { AdminDashboard } from './components/AdminDashboard';
```

### Step 3: Add a new step in your return statement:

```tsx
{currentStep === 5 && (
  <AdminDashboard />
)}
```

### Step 4: Create a way to navigate to step 5

In WelcomeStep.tsx, add:

```tsx
<button
  onClick={() => {
    // Assuming you have access to setCurrentStep or a navigation function
    // Pass this down from App.tsx if needed
    setCurrentStep(5);
  }}
  className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800"
>
  🔧 Admin Dashboard
</button>
```

---

## ⚡ Method 3: Browser Console (No Code Changes!)

**Time: 30 seconds**

### Step 1: Open your app in the browser

### Step 2: Open browser DevTools (F12 or Cmd+Option+I)

### Step 3: Go to Console tab

### Step 4: Paste this code and press Enter:

```javascript
// Get all recipes from database
(async () => {
  const projectId = 'YOUR_PROJECT_ID'; // Get from utils/supabase/info
  const publicAnonKey = 'YOUR_ANON_KEY'; // Get from utils/supabase/info
  
  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;
  
  // 1. Get all cuisines
  const cuisinesResponse = await fetch(`${baseUrl}/cuisines`, {
    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
  });
  const cuisines = await cuisinesResponse.json();
  
  console.log('📊 Available Cuisines:');
  console.table(cuisines.stats);
  
  // 2. Get all recipes
  const recipesResponse = await fetch(`${baseUrl}/admin/all-recipes`, {
    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
  });
  const recipes = await recipesResponse.json();
  
  console.log(`\n🍽️ Total Recipes: ${recipes.count}`);
  console.table(recipes.recipes);
  
  // 3. Initialize database if empty
  if (recipes.count === 0) {
    console.log('⚠️ Database is empty. Initializing...');
    const initResponse = await fetch(`${baseUrl}/init-cuisine-database`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}` 
      }
    });
    const initData = await initResponse.json();
    console.log('✅ Database initialized:', initData);
  }
})();
```

---

## 🎯 What You'll See in Admin Dashboard:

```
┌──────────────────────────────────────────────────────┐
│  🗄️ Recipe Database Admin                            │
│  Manage your cuisine recipe database                 │
├──────────────────────────────────────────────────────┤
│                                                       │
│  [Initialize Database (16 Recipes)] [Refresh]        │
│                                                       │
│  Search: [________________]  [Search]                 │
│                                                       │
├─────────────┬────────────────────────────────────────┤
│ RECIPES(16) │  SELECT A RECIPE TO VIEW DETAILS       │
│             │                                         │
│ 🇬🇧 Shepherd's │  Click any recipe from the left      │
│    Pie      │  to see:                               │
│ £8.10       │                                         │
│             │  • Full ingredient list with prices    │
│ 🇮🇹 Carbonara│  • Step-by-step instructions          │
│ £6.75       │  • Nutrition information               │
│             │  • Cooking time & difficulty           │
│ 🇨🇳 Sweet &  │  • Edit or Delete options             │
│    Sour...  │                                         │
│ £8.95       │                                         │
│             │                                         │
│ 🇮🇳 Chicken  │                                         │
│    Tikka    │                                         │
│ £8.40       │                                         │
│             │                                         │
│ ... 12 more │                                         │
│             │                                         │
└─────────────┴────────────────────────────────────────┘
```

---

## 🔥 Quick Actions in Admin Dashboard:

### 1️⃣ Initialize Database
- **Button:** "Initialize Database (16 Recipes)"
- **Purpose:** Load all cuisine recipes into Supabase KV store
- **When:** First time setup, or if database is empty
- **Result:** 16 recipes across 8 cuisines will be loaded

### 2️⃣ View All Recipes
- **Auto-loads** when dashboard opens
- Shows: Name, Cuisine, Category, Cooking Time, Total Cost
- Click any recipe to see full details

### 3️⃣ Search Recipes
- **Search by:** Recipe name or ingredient
- **Example:** Type "chicken" → Shows all chicken recipes
- **Example:** Type "pasta" → Shows all pasta dishes

### 4️⃣ View Recipe Details
- Click any recipe from the list
- See complete information:
  - Ingredients with individual prices
  - Step-by-step instructions
  - Nutrition facts (calories, protein, carbs, fats)
  - Tags and benefits
  - Difficulty and cooking time

### 5️⃣ Edit Recipe (Limited)
- Click "Edit" button when viewing a recipe
- Currently supports editing basic fields
- Click "Save Changes" to update

### 6️⃣ Delete Recipe
- Click "Delete" button when viewing a recipe
- Confirms before deletion
- Permanently removes from database

---

## 📊 Database Status Check:

### After initialization, you should see:

```
✅ Total Recipes: 16

Cuisine Breakdown:
🇬🇧 British:        2 recipes
🇮🇹 Italian:        2 recipes
🇨🇳 Chinese:        2 recipes
🇮🇳 Indian:         2 recipes
🇲🇽 Mexican:        2 recipes
🇯🇵 Japanese:       2 recipes
🌊 Mediterranean:   2 recipes
🇺🇸 American:       1 recipe

Categories:
🥘 One Pot:         8 recipes
📱 Microwave:       4 recipes
📦 Meal Prep:       4 recipes

Spice Levels:
🔵 Mild:            10 recipes
🟡 Medium:          4 recipes
🔴 Hot:             2 recipes
```

---

## 🐛 Troubleshooting:

### Issue: "No recipes found"
**Solution:**
1. Click "Initialize Database (16 Recipes)" button
2. Wait for success message
3. Click "Refresh" button
4. Recipes should now appear

### Issue: "Failed to fetch recipes"
**Check:**
- Internet connection is active
- Supabase project is running
- API keys are correct in `utils/supabase/info.tsx`

### Issue: Can't access Admin Dashboard
**Solution:**
- Use Method 3 (Browser Console) as temporary workaround
- Or manually add the route using Method 1 or 2 above

---

## 🎓 Learn More:

For detailed information, see:
- **`CUISINE_DATABASE_ACCESS_GUIDE.md`** - Complete guide to all access methods
- **`DATABASE_ADMIN_GUIDE.md`** - General database admin operations

---

## ✨ Pro Tips:

1. **First time?** Always click "Initialize Database" first
2. **Can't find a recipe?** Use the search feature
3. **Need to check a specific cuisine?** Use the API method (see full guide)
4. **Want raw data?** Access Supabase dashboard directly

---

**That's it! You're ready to manage your cuisine database! 🎉**
