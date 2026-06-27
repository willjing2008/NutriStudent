export type IngredientCategory =
  | 'produce'
  | 'dairy'
  | 'meat'
  | 'pantry'
  | 'frozen'
  | 'bakery'

// Checked in order — the first category whose keyword appears in the (lowercased)
// ingredient name wins. Ordering resolves overlaps: "ice cream" is frozen before
// dairy's "cream"; "eggplant"/"butternut" are produce before dairy's "egg"/"butter";
// bakery beats produce for "...bread". Anything unmatched falls back to pantry.
const RULES: Array<{ category: IngredientCategory; keywords: string[] }> = [
  { category: 'frozen', keywords: ['frozen', 'ice cream'] },
  {
    category: 'bakery',
    keywords: ['bread', 'bagel', 'tortilla', 'pita', 'baguette', 'croissant', 'bun', 'roll', 'muffin', 'pastry', 'naan', 'wrap'],
  },
  {
    category: 'meat',
    keywords: ['chicken', 'beef', 'pork', 'lamb', 'turkey', 'bacon', 'ham', 'sausage', 'steak', 'mince', 'salami', 'prosciutto', 'duck', 'veal', 'fish', 'salmon', 'tuna', 'cod', 'prawn', 'shrimp', 'crab', 'lobster', 'anchovy', 'mackerel', 'sardine'],
  },
  {
    // Spice/seasoning/dry forms — checked BEFORE produce so "Garlic Powder",
    // "Black Pepper", "Dried Oregano" etc. don't get pulled in by garlic/pepper.
    category: 'pantry',
    keywords: ['powder', 'ground', 'to taste', 'dried', 'seasoning', 'black pepper', 'peppercorn', 'baking soda', 'baking powder', 'extract', 'bouillon', 'stock cube'],
  },
  {
    category: 'produce',
    keywords: ['lettuce', 'spinach', 'kale', 'arugula', 'rocket', 'tomato', 'onion', 'garlic', 'pepper', 'carrot', 'celery', 'cucumber', 'broccoli', 'cauliflower', 'zucchini', 'courgette', 'eggplant', 'aubergine', 'butternut', 'squash', 'potato', 'mushroom', 'apple', 'banana', 'berry', 'berries', 'grape', 'lemon', 'lime', 'orange', 'avocado', 'basil', 'cilantro', 'coriander', 'parsley', 'ginger', 'cabbage', 'beet', 'corn', 'scallion', 'leek', 'radish', 'lentil', 'chickpea', 'cucumber', 'fruit', 'vegetable', 'greens', 'salad'],
  },
  {
    category: 'dairy',
    keywords: ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'yoghurt', 'egg', 'ghee', 'custard', 'curd', 'paneer'],
  },
]

/** Categorize a shopping-list ingredient by its name. Falls back to 'pantry'. */
export function categorizeIngredient(name: string): IngredientCategory {
  const n = name.toLowerCase().trim()
  for (const { category, keywords } of RULES) {
    if (keywords.some((k) => n.includes(k))) return category
  }
  return 'pantry'
}
