// ── Academic Schedule ─────────────────────────────────────────────────

export interface ClassEntry {
  id: string;
  name: string;
  dayOfWeek: number;      // 0=Sun, 1=Mon, ..., 6=Sat
  startTime: string;       // "09:00" (24h)
  endTime: string;         // "10:30"
  location?: string;
  color?: string;          // hex for UI blocks
}

export interface TestingPeriod {
  id: string;
  name: string;            // "Midterm Exams"
  startDate: string;       // "YYYY-MM-DD"
  endDate: string;
  type: 'midterm' | 'final' | 'quiz' | 'custom';
}

export interface SleepSchedule {
  bedtime: string;         // "23:00"
  wakeTime: string;        // "07:00"
  lastMealBeforeBed: number; // minutes before bedtime, default 120
}

export interface MealTimeOverride {
  dayOfWeek: number;          // 0=Sun..6=Sat
  mealSlot: string;           // "breakfast" | "lunch" | "dinner"
  time: string;               // "HH:MM" alternative time
}

export interface AcademicSchedule {
  classes: ClassEntry[];
  testingPeriods: TestingPeriod[];
  sleepSchedule: SleepSchedule;
  mealTimeOverrides?: MealTimeOverride[];
  updatedAt: string;
}

// ── Recipe Queue ─────────────────────────────────────────────────────

export interface QueuedMeal {
  recipeId: string;
  recipe: any;             // MealPlanMeal shape from backend
  dayNumber: number;       // 1-28
  mealSlot: 'breakfast' | 'lunch' | 'dinner';
  mealNumber: number;
  isConsumed: boolean;
  swappedFrom?: string;
}

export interface RecipeQueue {
  userId: string;
  queueId: string;
  createdAt: string;
  focusMode: boolean;
  meals: QueuedMeal[];
  mealsPerDay: number;
  goal: string;
}

// ── Meal Conflicts ───────────────────────────────────────────────────

export interface MealConflict {
  mealSlot: string;
  className: string;
  classStart: string;
  classEnd: string;
  suggestion: string;
}

// ── Queue Week (MealPlan-shaped response from backend) ───────────────

export interface QueueWeekMealPlan {
  meals: any[];
  totalCost: number;
  dailyBudget: number;
  weeklyBudget: number;
  withinBudget: boolean;
  cookingDays: number;
  totalMealsNeeded: number;
  mealsPerDay: number;
  weekNumber: number;
  totalWeeks: number;
}

export interface ShoppingIngredient {
  name: string;
  amount: string;
  category: 'dairy' | 'produce' | 'meat' | 'pantry' | 'frozen' | 'bakery';
  estimatedPrice: number;
  checked: boolean;
}
