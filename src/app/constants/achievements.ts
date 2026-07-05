export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'cooking' | 'streak' | 'budget' | 'variety';
  requirement: {
    type: 'meals_cooked' | 'streak_days' | 'avg_cost' | 'cooking_days' | 'unique_recipes' | 'meal_prep_count' | 'full_day_streak';
    value: number;
    minDays?: number;
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_cook',
    name: 'First Cook',
    description: 'Cook your first meal',
    icon: '\u{1F373}',
    category: 'cooking',
    requirement: { type: 'meals_cooked', value: 1 },
  },
  {
    id: 'streak_3',
    name: '3-Day Streak',
    description: 'Cook meals for 3 consecutive days',
    icon: '\u{1F525}',
    category: 'streak',
    requirement: { type: 'streak_days', value: 3 },
  },
  {
    id: 'streak_7',
    name: '7-Day Streak',
    description: 'Cook meals for 7 consecutive days',
    icon: '\u26A1',
    category: 'streak',
    requirement: { type: 'streak_days', value: 7 },
  },
  {
    id: 'budget_master',
    name: 'Budget Master',
    description: 'Keep average meal cost under \u00A38 for 7+ days',
    icon: '\u{1F4B0}',
    category: 'budget',
    requirement: { type: 'avg_cost', value: 8, minDays: 7 },
  },
  {
    id: 'protein_hunter',
    name: 'Protein Hunter',
    description: 'Cook on 5 or more different days',
    icon: '\u{1F4AA}',
    category: 'cooking',
    requirement: { type: 'cooking_days', value: 5 },
  },
  {
    id: 'variety_chef',
    name: 'Variety Chef',
    description: 'Cook 10 unique recipes',
    icon: '\u{1F30D}',
    category: 'variety',
    requirement: { type: 'unique_recipes', value: 10 },
  },
  {
    id: 'meal_prep_pro',
    name: 'Meal Prep Pro',
    description: 'Cook 5 meal-prep recipes',
    icon: '\u{1F4E6}',
    category: 'cooking',
    requirement: { type: 'meal_prep_count', value: 5 },
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Cook all meals (3+/day) for 7 consecutive days',
    icon: '\u{1F3C6}',
    category: 'streak',
    requirement: { type: 'full_day_streak', value: 7 },
  },
];
