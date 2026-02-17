import { useState } from 'react';
import { ChevronRight, Check, RefreshCw, Plus, Home, Calendar, ShoppingCart, User, Bell, ChevronLeft, Flame, Zap } from 'lucide-react';
import { UserPreferences } from '../App';
import { getRecipeImage } from '../utils/recipeImages';

interface Ingredient {
  name: string;
  category: 'dairy' | 'produce' | 'meat' | 'pantry' | 'frozen' | 'bakery';
  price: number;
  unit: string;
  amount: string;
  estimatedPrice: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  available: boolean;
}

interface MealPlanMeal {
  id: string;
  name: string;
  description: string;
  image: string;
  rationale: string;
  benefits: string[];
  mealType: string;
  category: 'one-pot' | 'microwave' | 'meal-prep';
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  ingredients: Ingredient[];
  ingredientNames: string[];
  instructions: string[];
  cost: number;
  totalCost: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
  };
  dayNumber?: number;
  mealNumber?: number;
  youtubeUrl?: string;
  sourceUrl?: string;
}

interface MealPlan {
  meals: MealPlanMeal[];
  totalCost: number;
  dailyBudget: number;
  weeklyBudget: number;
  withinBudget: boolean;
  cookingDays?: number;
  totalMealsNeeded?: number;
  mealsPerDay?: number;
}

interface MobileDashboardProps {
  user: any;
  mealPlan: MealPlan | null;
  preferences: UserPreferences;
  onGenerateNewPlan: () => void;
  onViewFullPlan: () => void;
}

const MEAL_TYPE_LABELS: Record<string, string> = {
  'breakfast': 'Breakfast',
  'lunch': 'Lunch',
  'dinner': 'Dinner',
  'snack': 'Snack',
};

const MEAL_TYPE_ICONS: Record<string, string> = {
  'breakfast': '☀️',
  'lunch': '🌤️',
  'dinner': '🌙',
  'snack': '🍎',
};

export function MobileDashboard({ 
  user, 
  mealPlan, 
  preferences, 
  onGenerateNewPlan,
  onViewFullPlan 
}: MobileDashboardProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [cookedMeals, setCookedMeals] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('plan');

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';
  const greeting = getGreeting();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  const getDayMeals = (dayIndex: number) => {
    if (!mealPlan || !mealPlan.meals) return [];
    const mealsPerDay = preferences.mealsPerDay || 3;
    const startIndex = dayIndex * mealsPerDay;
    const endIndex = startIndex + mealsPerDay;
    return mealPlan.meals.slice(startIndex, endIndex);
  };

  const todaysMeals = getDayMeals(currentDayIndex);
  const totalDays = mealPlan?.cookingDays || 7;

  const dailyBudgetUsed = todaysMeals.reduce((sum, meal) => sum + (meal.totalCost || 0), 0);
  const dailyBudgetLimit = mealPlan?.dailyBudget || 0;

  const todayNutrition = todaysMeals.reduce(
    (totals, meal) => ({
      calories: totals.calories + (meal.nutrition?.calories || 0),
      protein: totals.protein + (meal.nutrition?.protein || 0),
      carbs: totals.carbs + (meal.nutrition?.carbs || 0),
      fats: totals.fats + (meal.nutrition?.fats || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Target nutrition (can be customized)
  const targetCalories = 2200;
  const targetProtein = 140;
  const targetCarbs = 250;
  const targetFats = 65;

  const caloriePercentage = Math.round((todayNutrition.calories / targetCalories) * 100);

  const toggleMealCooked = (mealId: string) => {
    setCookedMeals(prev => {
      const updated = new Set(prev);
      if (updated.has(mealId)) {
        updated.delete(mealId);
      } else {
        updated.add(mealId);
      }
      return updated;
    });
  };

  const cookedCount = todaysMeals.filter(meal => cookedMeals.has(meal.id)).length;

  // Generate week days for calendar
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Start from Monday

    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        isToday: i === currentDayIndex,
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  if (!mealPlan || !mealPlan.meals || mealPlan.meals.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A1F13] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-7xl mb-6">🥗</div>
          <h2 className="text-2xl font-bold text-white mb-3">No meal plan yet</h2>
          <p className="text-[#9CA3AF] mb-8">Create your personalized nutrition plan</p>
          <button
            onClick={onGenerateNewPlan}
            className="px-8 py-4 bg-[#22C55E] text-[#052E16] font-semibold rounded-full hover:bg-[#4ADE80] transition-all"
          >
            Generate Your First Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1F13] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt={userName}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <p className="text-[#6B7280] text-sm">{greeting}</p>
              <h1 className="text-xl font-bold text-white">{userName}</h1>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#142A1D] flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#9CA3AF]" />
          </button>
        </div>
      </div>

      {/* Calendar Week */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-center">
          {weekDays.map((day, index) => (
            <button
              key={index}
              onClick={() => setCurrentDayIndex(index)}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all ${
                day.isToday
                  ? 'bg-[#22C55E] text-[#052E16]'
                  : 'text-[#6B7280] hover:bg-[#142A1D]'
              }`}
            >
              <span className="text-xs font-medium mb-1">{day.day}</span>
              <span className={`text-lg font-bold ${day.isToday ? 'text-[#052E16]' : 'text-white'}`}>
                {day.date}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Goal Card */}
      <div className="px-5 mb-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F13]/95 via-[#0A1F13]/80 to-[#0A1F13]/60" />
          
          {/* Content */}
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22C55E] rounded-full">
                <span className="text-[#052E16] text-xs font-semibold">✓ DAILY GOAL</span>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-[#22C55E] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#22C55E]" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-1">{caloriePercentage}%</h2>
            <p className="text-xl text-white/80 mb-2">On Track</p>
            <p className="text-[#9CA3AF] text-sm">
              {cookedCount === todaysMeals.length 
                ? "You've completed all meals today!"
                : `${todaysMeals.length - cookedCount} meals remaining`}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Calories */}
          <div className="bg-[#142A1D] rounded-2xl p-4 border border-[#1E4029]">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-[#6B7280] text-sm">Calories</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{todayNutrition.calories}</span>
              <span className="text-[#6B7280] text-sm">/{targetCalories}</span>
            </div>
          </div>
          
          {/* Budget */}
          <div className="bg-[#142A1D] rounded-2xl p-4 border border-[#1E4029]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#22C55E]">£</span>
              <span className="text-[#6B7280] text-sm">Left</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">£{(dailyBudgetLimit - dailyBudgetUsed).toFixed(2)}</span>
              <span className="text-[#6B7280] text-sm">/£{dailyBudgetLimit.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Macro Breakdown */}
      <div className="px-5 mb-6">
        <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#1E4029]">
          <h3 className="text-white font-semibold mb-4">Macro Breakdown</h3>
          <div className="space-y-4">
            {/* Protein */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#9CA3AF]">Protein</span>
                <span className="text-white">{todayNutrition.protein}g/{targetProtein}g</span>
              </div>
              <div className="h-2 bg-[#1E4029] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#22C55E] rounded-full transition-all"
                  style={{ width: `${Math.min((todayNutrition.protein / targetProtein) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            {/* Carbs */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#9CA3AF]">Carbs</span>
                <span className="text-white">{todayNutrition.carbs}g/{targetCarbs}g</span>
              </div>
              <div className="h-2 bg-[#1E4029] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#4ADE80] rounded-full transition-all"
                  style={{ width: `${Math.min((todayNutrition.carbs / targetCarbs) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            {/* Fats */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#9CA3AF]">Fats</span>
                <span className="text-white">{todayNutrition.fats}g/{targetFats}g</span>
              </div>
              <div className="h-2 bg-[#1E4029] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#86EFAC] rounded-full transition-all"
                  style={{ width: `${Math.min((todayNutrition.fats / targetFats) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Meals */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Today's Meals</h3>
          <button 
            onClick={onViewFullPlan}
            className="text-[#22C55E] text-sm font-medium hover:underline"
          >
            Edit Plan
          </button>
        </div>
        
        <div className="space-y-3">
          {todaysMeals.map((meal) => {
            const isCooked = cookedMeals.has(meal.id);
            const mealType = meal.mealType?.toLowerCase() || 'meal';
            
            return (
              <div
                key={meal.id}
                className={`bg-[#142A1D] rounded-2xl overflow-hidden border transition-all ${
                  isCooked 
                    ? 'border-[#22C55E]/50 bg-[#22C55E]/5' 
                    : 'border-[#1E4029]'
                }`}
              >
                <div className="flex gap-4 p-4">
                  {/* Meal Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={meal.imageUrl || getRecipeImage(meal.id, meal.image)}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = '1';
                          target.src = getRecipeImage(meal.id);
                        }
                      }}
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22C55E]" />
                  </div>

                  {/* Meal Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[#6B7280] text-xs font-medium uppercase tracking-wide">
                      {MEAL_TYPE_LABELS[mealType] || 'Meal'}
                    </span>
                    <h4 className={`text-white font-semibold mt-0.5 line-clamp-1 ${
                      isCooked ? 'line-through text-[#6B7280]' : ''
                    }`}>
                      {meal.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        {meal.nutrition?.calories} kcal
                      </span>
                      <span>•</span>
                      <span className="text-[#22C55E]">{meal.nutrition?.protein}g Prot</span>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <button
                    onClick={() => toggleMealCooked(meal.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCooked
                        ? 'bg-[#22C55E] text-[#052E16]'
                        : 'bg-[#1E4029] text-[#6B7280] hover:bg-[#2D5A3D]'
                    }`}
                  >
                    {isCooked ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generate New Plan Button */}
      <div className="px-5 mb-6">
        <button
          onClick={onGenerateNewPlan}
          className="w-full py-4 bg-[#142A1D] border border-[#2D5A3D] text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-[#1A3625] hover:border-[#22C55E] transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Generate New Plan
        </button>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-5 w-14 h-14 bg-[#22C55E] rounded-full flex items-center justify-center shadow-lg shadow-[#22C55E]/30 hover:bg-[#4ADE80] transition-all">
        <Plus className="w-6 h-6 text-[#052E16]" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A1F13] border-t border-[#1E4029] px-6 py-3">
        <div className="max-w-md mx-auto flex justify-around">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'plan', icon: Calendar, label: 'Plan' },
            { id: 'shop', icon: ShoppingCart, label: 'Shop' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                  isActive ? 'text-[#22C55E]' : 'text-[#6B7280]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
