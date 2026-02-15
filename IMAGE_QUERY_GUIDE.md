# 🖼️ Recipe Image Query Guide

## How to Ensure Accurate Recipe Images

The app uses **Pollinations.ai** to generate AI images for recipes. The accuracy of these images depends on how well you craft the `imageQuery` field in each recipe.

---

## 📊 Current Image System

### Image URL Generation
```typescript
const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imageQuery)}`;
```

### Where Images Are Used
1. **Meal Cards** - In RecommendationsStep.tsx
2. **Shopping Mode** - Full-screen meal display
3. **Daily Schedule** - Carousel meal cards
4. **Admin Dashboard** - Recipe preview

---

## ✅ Best Practices for Image Queries

### 1. **Be Specific with Food Names**

❌ **Bad:** `"pasta"`
✅ **Good:** `"creamy carbonara pasta with bacon and parmesan"`

❌ **Bad:** `"chicken"`  
✅ **Good:** `"grilled chicken breast with herbs and lemon"`

### 2. **Include Food Photography Keywords**

Always add professional photography terms:
- `food photography`
- `professional lighting`
- `macro shot`
- `close-up`
- `appetizing`
- `high quality`

**Example:**
```typescript
imageQuery: "butter chicken curry, food photography, creamy orange sauce, basmati rice, professional lighting, appetizing"
```

### 3. **Add Cuisine-Specific Styling**

Match the visual style to the cuisine:

| Cuisine | Style Keywords |
|---------|----------------|
| Italian | `rustic, wooden table, mediterranean style` |
| British | `comfort food, hearty, home cooked` |
| Indian | `colorful spices, vibrant, traditional serving` |
| Chinese | `asian cuisine, chopsticks, bowl presentation` |
| Japanese | `minimal, elegant plating, artistic` |
| Mexican | `colorful, fresh cilantro, lime wedge` |

### 4. **Include Visual Details**

Describe what makes the dish visually appealing:
- **Texture:** `crispy`, `creamy`, `fluffy`, `golden brown`
- **Color:** `vibrant orange`, `deep red`, `golden yellow`
- **Garnish:** `fresh herbs`, `parsley garnish`, `sesame seeds`
- **Steam/Action:** `steam rising`, `melted cheese`, `drizzling sauce`

### 5. **Use Category-Specific Keywords**

**One-Pot Meals:**
```typescript
imageQuery: "beef stew one pot meal, rustic dutch oven, hearty comfort food, food photography"
```

**Microwave Recipes:**
```typescript
imageQuery: "microwave mug cake, individual serving, chocolate dessert, quick meal, simple plating"
```

**Meal Prep:**
```typescript
imageQuery: "meal prep containers, organized portions, grilled chicken and vegetables, weekly meal planning"
```

---

## 🎯 Formula for Perfect Image Queries

```
[DISH NAME] + [KEY INGREDIENTS] + [VISUAL DETAILS] + [CUISINE STYLE] + [PHOTOGRAPHY KEYWORDS]
```

### Examples:

**Microwave Oatmeal:**
```typescript
imageQuery: "oatmeal bowl, topped with fresh blueberries and honey, creamy texture, morning breakfast, food photography, rustic wooden spoon, warm lighting"
```

**One-Pot Pasta:**
```typescript
imageQuery: "one pot spaghetti bolognese, rich tomato sauce, parmesan cheese, Italian cuisine, rustic pot, food photography, appetizing close-up"
```

**Meal Prep Chicken:**
```typescript
imageQuery: "meal prep chicken teriyaki, rice and broccoli, organized containers, asian cuisine, healthy portions, food photography, clean presentation"
```

---

## 🛠️ Using the Image Query Helper

Import and use the helper functions:

```typescript
import { generateImageQuery, generateFocusedImageQuery } from './image-query-helper.ts';

// Auto-generate optimized query
const query = generateImageQuery(
  'Chicken Tikka Masala',  // Recipe name
  'indian',                 // Cuisine
  'one-pot',               // Category
  ['creamy sauce', 'naan bread']  // Additional keywords
);

// Result: "Chicken Tikka Masala, food photography, colorful spices, vibrant, single pot, creamy sauce, naan bread, high quality, appetizing, detailed close-up"
```

### With Negative Prompts (What to Avoid)

```typescript
const query = generateFocusedImageQuery(
  'poached egg',                    // Main subject
  ['runny yolk', 'toast', 'breakfast'],  // Include
  ['fried egg', 'scrambled', 'multiple eggs']  // Exclude
);

// Result: "poached egg, runny yolk, toast, breakfast, food photography, professional lighting, macro shot --no fried egg, scrambled, multiple eggs"
```

---

## 📝 Recipe-Specific Examples

### Breakfast Recipes

```typescript
// Scrambled Eggs
imageQuery: "fluffy scrambled eggs, golden yellow, buttery texture, breakfast plate, food photography, close-up, appetizing"

// Pancakes
imageQuery: "stack of fluffy pancakes, maple syrup drizzling, butter melting, golden brown, breakfast photography, warm morning light"

// Avocado Toast
imageQuery: "avocado toast, mashed avocado, whole grain bread, poached egg on top, breakfast food photography, rustic plate"
```

### Microwave Recipes

```typescript
// Mug Cake
imageQuery: "chocolate mug cake, molten center, microwave dessert, individual ceramic mug, spoon ready, food photography, indulgent"

// Microwave Mac & Cheese
imageQuery: "creamy mac and cheese in mug, microwave recipe, cheese sauce, comfort food, quick meal, food photography"

// Microwave Salmon
imageQuery: "microwave salmon fillet, lemon slices, fresh dill, healthy protein, quick cooking, food photography, light and fresh"
```

### Main Dishes

```typescript
// Curry
imageQuery: "chicken tikka masala curry, creamy orange sauce, basmati rice, Indian cuisine, colorful spices, naan bread, food photography, vibrant and appetizing"

// Stir Fry
imageQuery: "vegetable stir fry, colorful peppers and broccoli, soy sauce glaze, wok cooking, asian cuisine, chopsticks, food photography, sizzling hot"

// Pasta
imageQuery: "spaghetti carbonara, creamy egg sauce, crispy bacon, parmesan cheese, Italian pasta, fork twirling, food photography, rustic presentation"
```

---

## 🔄 Updating Existing Recipes

To improve image queries for existing recipes:

1. **Review Current Query:** Check if it's too simple
2. **Apply Formula:** Use the formula above
3. **Test the Image:** View in browser to check accuracy
4. **Refine:** Add/remove keywords based on results

### Before & After Examples:

**Before:**
```typescript
imageQuery: "chicken rice"
```

**After:**
```typescript
imageQuery: "one pot chicken and rice, golden chicken pieces, fluffy rice, green peas, comfort food photography, steam rising, appetizing home-cooked meal"
```

---

## 🎨 Visual Quality Tips

1. **Always specify serving style:**
   - `in bowl`
   - `on plate`
   - `in pot`
   - `in mug`
   - `in meal prep container`

2. **Add perspective:**
   - `overhead view`
   - `close-up shot`
   - `macro photography`
   - `side angle`

3. **Include context:**
   - `wooden table`
   - `kitchen counter`
   - `rustic background`
   - `marble surface`

4. **Lighting matters:**
   - `natural light`
   - `warm lighting`
   - `professional lighting`
   - `soft shadows`

---

## 🚀 Quick Reference Table

| Recipe Type | Must-Have Keywords |
|-------------|-------------------|
| **Breakfast** | breakfast, morning, fresh, light |
| **Lunch/Dinner** | main course, hearty, satisfying |
| **Snacks** | quick bite, portioned, convenient |
| **Desserts** | indulgent, sweet, tempting |
| **Healthy** | fresh, vibrant, colorful vegetables |
| **Comfort Food** | rustic, homey, warm, cozy |
| **Quick Meals** | simple plating, minimal, efficient |

---

## 💡 Pro Tips

1. **Use 5-8 keywords** - Not too few (vague) or too many (conflicting)
2. **Put most important words first** - AI prioritizes early keywords
3. **Test and iterate** - View the generated image and refine
4. **Be consistent** - Use similar styles for similar recipe categories
5. **Avoid contradictions** - Don't say "crispy" and "soft" together

---

## Example: Complete Recipe with Optimized Image Query

```typescript
{
  id: 'microwave-breakfast-burrito',
  name: 'Microwave Breakfast Burrito',
  description: 'Quick protein-packed breakfast wrap ready in 2 minutes',
  category: 'microwave',
  cookingTime: 2,
  servings: 1,
  difficulty: 'easy',
  ingredients: [...],
  instructions: [...],
  nutrition: {...},
  tags: ['Quick', 'High Protein', 'Portable'],
  benefits: [...],
  suitableFor: ['studying', 'working'],
  
  // Optimized Image Query
  imageQuery: 'breakfast burrito cut in half, scrambled eggs and cheese filling, tortilla wrap, microwave meal, Mexican-inspired breakfast, food photography, appetizing cross-section, fresh cilantro garnish'
}
```

This generates an accurate image showing a burrito cut open to reveal the filling, clearly identifying it as a breakfast item with Mexican influences.

---

## 🎯 Summary

**The key to accurate images:**
1. ✅ Be specific about the dish
2. ✅ Include "food photography" keywords  
3. ✅ Add visual descriptors (color, texture, garnish)
4. ✅ Match cuisine style
5. ✅ Specify serving presentation
6. ✅ Test and refine

By following these guidelines, your recipe images will accurately match the dish name and look professional and appetizing! 🍽️✨
