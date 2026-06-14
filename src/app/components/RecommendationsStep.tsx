import { ShoppingCart, ArrowLeft, Loader2, X, Clock, ChefHat, Users, Flame, RefreshCw, Repeat2, MapPin, ArrowRight, Save, Check, Plus, Bell, ExternalLink, Play, Trash2, AlertTriangle } from 'lucide-react';
import { UserPreferences, MealTimes } from '../App';
import { getNutritionTargets } from '../utils/nutritionTargets';
import { getLocalTodayISO, parseLocalDate, initialPlanOffset } from '../utils/dateUtils';
import { useState, useEffect, useCallback, useRef } from 'react';
import { authedPost, publicPost } from '../utils/apiClient';
import { ShoppingMode } from './ShoppingMode';
import { getRecipeImageWithCache } from '../utils/recipeImages';
import { MealSwapModal } from './MealSwapModal';

import { supabase } from '../../utils/supabaseClient';
import { SavedPlansModal } from './SavedPlansModal';
import { BottomNavigation, NavTab } from './BottomNavigation';
import { CelebrationOverlay, CelebrationType } from './CelebrationOverlay';
import { PlanTabSubNav } from './PlanTabSubNav';
import { MealReminderBanner } from './MealReminderBanner';
import { WeeklyScheduleView } from './WeeklyScheduleView';
import { AcademicScheduleEditor } from './AcademicScheduleEditor';
import { useMealReminders } from '../hooks/useMealReminders';
import type { AcademicSchedule, RecipeQueue, MealConflict, MealTimeOverride, QueueWeekMealPlan } from '../types/calendar';

interface RecommendationsStepProps {
  preferences: UserPreferences;
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
  onSaveMealPlan?: (mealPlan: any) => Promise<boolean | undefined>;
  onDeletePlan?: (planId: string) => Promise<void>;
  activePlanId?: string | null;
  onNavigateHome?: () => void;
  activeNavTab?: NavTab;
  onNavTabChange?: (tab: NavTab) => void;
  savedMealPlan?: any;
  // Academic calendar + queue props
  academicSchedule?: AcademicSchedule | null;
  recipeQueue?: RecipeQueue | null;
  currentWeekMealPlan?: QueueWeekMealPlan | null;
  isTestingPeriod?: boolean;
  mealConflicts?: MealConflict[];
  queueShoppingList?: any[];
  weekConflicts?: Map<number, MealConflict[]>;
  onSaveSchedule?: (userId: string, schedule: Omit<AcademicSchedule, 'updatedAt'>, mealTimes?: MealTimes) => Promise<any>;
  onGenerateQueue?: (userId: string, params: any) => Promise<any>;
  onSwapQueueMeal?: (userId: string, dayNumber: number, mealSlot: string, newRecipeId: string) => Promise<any>;
  onMarkMealConsumed?: (userId: string, dayNumber: number, mealSlot: string) => Promise<boolean>;
  onCheckQueueTestingChange?: (userId: string) => Promise<any>;
  onSaveMealTimeOverride?: (userId: string, override: MealTimeOverride, mealTimes?: any) => Promise<void>;
  onRemoveMealTimeOverride?: (userId: string, dayOfWeek: number, mealSlot: string, mealTimes?: any) => Promise<void>;
  onDiscard?: () => void;
  onUpdatePreferences?: (updates: Partial<import('../App').UserPreferences>) => void;
}

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
  category: string;
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
  timesCooked?: number;
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

const MEAL_TYPE_LABELS: Record<string, string> = {
  'breakfast': 'BREAKFAST',
  'lunch': 'LUNCH',
  'dinner': 'DINNER',
  'snack': 'SNACK',
};

const LOCAL_IMAGE_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiMxNDJBMUQiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjMUU0MDI5Ii8+PHJlY3QgeD0iNzIiIHk9IjE2MiIgd2lkdGg9IjE3NiIgaGVpZ2h0PSIxMiIgcng9IjYiIGZpbGw9IiMyMkM1NUUiIG9wYWNpdHk9IjAuNzUiLz48L3N2Zz4=';


export function RecommendationsStep({
  preferences, onBack, onNext, onReset, onSaveMealPlan, onDeletePlan, activePlanId,
  onNavigateHome, activeNavTab, onNavTabChange, savedMealPlan: initialSavedPlan,
  // Calendar + queue props
  academicSchedule, recipeQueue, currentWeekMealPlan,
  isTestingPeriod = false, mealConflicts = [], weekConflicts, queueShoppingList,
  onSaveSchedule, onGenerateQueue, onSwapQueueMeal,
  onMarkMealConsumed, onCheckQueueTestingChange,
  onSaveMealTimeOverride, onRemoveMealTimeOverride,
  onDiscard, onUpdatePreferences,
}: RecommendationsStepProps) {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealPlanMeal | null>(null);
  const [showRationaleModal, setShowRationaleModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [shoppingMode, setShoppingMode] = useState(false);
  const [mealImages, setMealImages] = useState<Record<string, string>>({});
  const [shufflingMealId, setShufflingMealId] = useState<string | null>(null);
  // selectedCalendarOffset = number of days since plan start (0 = shopping date).
  // Lazy-initialised to today's offset so the correct day is selected from the very first render.
  const [selectedCalendarOffset, setSelectedCalendarOffset] = useState<number>(() => {
    if (!preferences.shoppingDate) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(preferences.shoppingDate + 'T00:00:00');
    if (isNaN(start.getTime())) return 0;
    start.setHours(0, 0, 0, 0);
    const diff = Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  });
  const calendarScrollRef = useRef<HTMLDivElement>(null);
  // Tracks whether the first instant-scroll has happened so subsequent taps use smooth scroll
  const hasDoneInitialScrollRef = useRef(false);
  const [showMealSwapModal, setShowMealSwapModal] = useState(false);
  const [selectedMealForSwap, setSelectedMealForSwap] = useState<MealPlanMeal | null>(null);
  const [cookedMeals, setCookedMeals] = useState<Set<string>>(new Set());


  const [savingPlan, setSavingPlan] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);
  const [savedMealPlanSnapshot, setSavedMealPlanSnapshot] = useState<string | null>(null);

  const [showSavedPlansModal, setShowSavedPlansModal] = useState(false);

  // Leave warning for unsaved new plans
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [pendingNavAction, setPendingNavAction] = useState<(() => void) | null>(null);
  // True when user is creating a new plan (onboarding) and hasn't saved yet
  const isNewUnsavedPlan = !activeNavTab && !planSaved && !activePlanId;

  // Calendar + queue state
  const [planSubView, setPlanSubView] = useState<'meals' | 'schedule'>('meals');
  const [showScheduleEditor, setShowScheduleEditor] = useState(false);
  const [scheduleEditorTab, setScheduleEditorTab] = useState<'classes' | 'meals'>('classes');
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Whether we're operating in queue mode (queue exists and has meals)
  const isQueueMode = !!(currentWeekMealPlan?.meals?.length);

  // Use meal reminders hook
  const {
    activeConflicts: reminderConflicts,
    dismissConflict,
    requestNotificationPermission,
  } = useMealReminders(academicSchedule || null, mealConflicts, preferences.mealTimes);

  // When queue provides a week meal plan, sync it to the local mealPlan state
  useEffect(() => {
    if (currentWeekMealPlan?.meals?.length) {
      setMealPlan(currentWeekMealPlan as any);
      setLoading(false);
      fetchMealImages(currentWeekMealPlan.meals);
    }
  }, [currentWeekMealPlan]);
  const [loadingPlan, setLoadingPlan] = useState(false);
  
  const [user, setUser] = useState<any>(null);

  const [celebration, setCelebration] = useState<{
    type: CelebrationType;
    message: string;
    subMessage?: string;
    icon?: string;
  } | null>(null);
  const [totalCookedEver, setTotalCookedEver] = useState<number>(0);
  const [totalCookingDays, setTotalCookingDays] = useState<number>(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [shoppingMode]);

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

  const isRenderableImageUrl = (value?: string | null): value is string =>
    typeof value === 'string' && /^(https?:\/\/|data:image\/|blob:)/i.test(value);

  const getMealImageCandidates = useCallback(
    (meal: MealPlanMeal): string[] => {
      const urls = [
        mealImages[meal.id],
        isRenderableImageUrl(meal.image) ? meal.image : undefined,
        LOCAL_IMAGE_FALLBACK,
      ].filter((url): url is string => isRenderableImageUrl(url));

      return Array.from(new Set(urls));
    },
    [mealImages]
  );

  const handleMealImageError = useCallback((event: any) => {
    const target = event.currentTarget as HTMLImageElement;
    const fallbacksRaw = target.dataset.fallbacks;
    if (!fallbacksRaw) return;

    let fallbacks: string[] = [];
    try {
      fallbacks = JSON.parse(fallbacksRaw);
    } catch {
      return;
    }

    const currentIndex = Number(target.dataset.fallbackIndex || '0');
    const nextIndex = currentIndex + 1;

    if (nextIndex < fallbacks.length) {
      target.dataset.fallbackIndex = String(nextIndex);
      target.src = fallbacks[nextIndex];
      return;
    }

    target.onerror = null;
  }, []);

  const fetchImageWithTimeout = useCallback(async (meal: MealPlanMeal, timeoutMs = 5000) => {
    if (!meal.image) return null;

    const cachePromise = getRecipeImageWithCache(
      meal.id,
      meal.image,
      (meal as any).cuisine || 'base'
    );

    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeoutMs);
    });

    try {
      const resolved = await Promise.race([cachePromise, timeoutPromise]);
      return isRenderableImageUrl(resolved) ? resolved : null;
    } catch {
      return null;
    }
  }, []);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }
  
  const handleSavePlan = async () => {
    if (!mealPlan || !onSaveMealPlan || !user) return;

    setSavingPlan(true);
    setPlanSaved(false);

    try {
      const success = await onSaveMealPlan(mealPlan);
      if (success) {
        setPlanSaved(true);
        // Snapshot the saved plan's meal IDs so we can detect changes
        setSavedMealPlanSnapshot(JSON.stringify(mealPlan.meals.map(m => m.id).sort()));
      }
    } catch (err) {
      console.error('Error saving plan:', err);
    } finally {
      setSavingPlan(false);
    }
  };
  
  const handleLoadSavedPlan = async (planId: string) => {
    if (!user) return;
    
    setLoadingPlan(true);
    setShowSavedPlansModal(false);
    
    try {
      const data = await authedPost<{ mealPlan?: any }>('load-meal-plan-by-id', {
        userId: user.id,
        planId,
      });

      setMealPlan((data.mealPlan));

      if (data.mealPlan?.meals) {
        fetchMealImages(data.mealPlan.meals);
      }

    } catch (err: any) {
      console.error('Error loading plan:', err);
      alert(err.message || 'Failed to load plan');
    } finally {
      setLoadingPlan(false);
    }
  };

  // Check if required preferences are set
  const hasRequiredPreferences = preferences.goal !== null;

  useEffect(() => {
    // If a saved plan was passed in, use it directly instead of generating a new one
    if (initialSavedPlan?.meals?.length) {
      const enriched = (initialSavedPlan);
      setMealPlan(enriched);
      setLoading(false);
      setPlanSaved(true);
      setSavedMealPlanSnapshot(JSON.stringify(enriched.meals.map((m: MealPlanMeal) => m.id).sort()));
      fetchMealImages(enriched.meals);
    } else if (hasRequiredPreferences) {
      fetchMealPlan();
    } else {
      setLoading(false);
    }
  }, []);

  // When the saved plan is deleted externally, clear local state
  useEffect(() => {
    if (!initialSavedPlan && planSaved) {
      setMealPlan(null);
      setPlanSaved(false);
      setSavedMealPlanSnapshot(null);
      setLoading(false);
    }
  }, [initialSavedPlan]);
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    getUser();
  }, []);

  // Load persisted cooked meals and stats when user is available
  useEffect(() => {
    if (!user) return;
    const today = getLocalTodayISO();

    // Load today's cooked meals
    authedPost<{ mealIds?: string[] }>('cooked-meals', { userId: user.id, date: today })
      .then(data => {
        if (data.mealIds?.length) {
          setCookedMeals(new Set(data.mealIds));
        }
      })
      .catch(err => console.error('Failed to load cooked meals:', err));

    // Load user stats for streak and total cooked count
    authedPost<{ mealsLogged?: number; totalCookingDays?: number }>('user-stats', { userId: user.id })
      .then(data => {
        setTotalCookedEver(data.mealsLogged || 0);
        setTotalCookingDays(data.totalCookingDays || 0);
      })
      .catch(err => console.error('Failed to load user stats:', err));
  }, [user]);

  // Reset planSaved when the meal plan changes (e.g. after swap/shuffle)
  useEffect(() => {
    if (!mealPlan || !savedMealPlanSnapshot) return;
    const currentSnapshot = JSON.stringify(mealPlan.meals.map(m => m.id).sort());
    if (currentSnapshot !== savedMealPlanSnapshot) {
      setPlanSaved(false);
    }
  }, [mealPlan, savedMealPlanSnapshot]);

  // Instant-centre the calendar the moment the plan (and therefore the calendar DOM) first appears.
  // Uses 'instant' so there is no visible slide-in animation on page open.
  useEffect(() => {
    if (!mealPlan || !calendarScrollRef.current) return;
    // Select the day for "today" within the plan, clamped to a real plan day so
    // the meals always display (a stale/past shopping date previously pushed the
    // index past the plan end, leaving "Today's Meals" empty).
    const targetOffset = initialPlanOffset(
      preferences.shoppingDate,
      getLocalTodayISO(),
      daysWithMeals.length,
    );
    setSelectedCalendarOffset(targetOffset);
    const container = calendarScrollRef.current;
    requestAnimationFrame(() => {
      const idx = calendarDays.findIndex(d => d.offset === targetOffset);
      if (idx < 0) return;
      const DAY_W = 64;
      container.scrollTo({
        left: Math.max(0, idx * DAY_W - container.clientWidth / 2 + DAY_W / 2),
        behavior: 'instant' as ScrollBehavior,
      });
      hasDoneInitialScrollRef.current = true;
    });
  }, [mealPlan]); // fires whenever plan is set/replaced

  // Smooth-scroll when the user taps a different day (but not on the initial load)
  useEffect(() => {
    if (!hasDoneInitialScrollRef.current || !calendarScrollRef.current) return;
    const container = calendarScrollRef.current;
    const raf = requestAnimationFrame(() => {
      const idx = calendarDays.findIndex(d => d.offset === selectedCalendarOffset);
      if (idx < 0) return;
      const DAY_W = 64;
      container.scrollTo({
        left: Math.max(0, idx * DAY_W - container.clientWidth / 2 + DAY_W / 2),
        behavior: 'smooth',
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [selectedCalendarOffset]);

  // Schedule editor save
  const handleSaveSchedule = async (
    newSchedule: Omit<AcademicSchedule, 'updatedAt'>,
    newMealTimes?: import('../App').MealTimes,
    newSelectedSlots?: ('breakfast' | 'lunch' | 'dinner')[],
  ) => {
    if (!user || !onSaveSchedule) return;
    setSavingSchedule(true);
    try {
      const effectiveMealTimes = newMealTimes || preferences.mealTimes;
      // Propagate meal time / slot changes to parent preferences
      if (onUpdatePreferences) {
        const updates: Partial<import('../App').UserPreferences> = {};
        if (newMealTimes) updates.mealTimes = newMealTimes;
        if (newSelectedSlots) updates.selectedMealSlots = newSelectedSlots;
        if (Object.keys(updates).length) onUpdatePreferences(updates);
      }
      await onSaveSchedule(user.id, newSchedule, effectiveMealTimes);
      setShowScheduleEditor(false);
      // Check if testing period status changed and queue needs regeneration
      if (onCheckQueueTestingChange) {
        const result = await onCheckQueueTestingChange(user.id);
        if (result.shouldRegenerate && onGenerateQueue) {
          await onGenerateQueue(user.id, {
            mealsPerDay: preferences.mealsPerDay,
            goal: preferences.goal,
            avoidIngredients: preferences.avoidIngredients,
            maxCookingTime: preferences.maxCookingTime,
            budget: preferences.budget,
            selectedMealSlots: newSelectedSlots || preferences.selectedMealSlots,
          });
        }
      }
    } catch (err) {
      console.error('Failed to save schedule:', err);
    } finally {
      setSavingSchedule(false);
    }
  };

  const fetchMealPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await publicPost<{ mealPlan?: any }>('generate-meal-plan', {
        storeName: 'Generic UK Supermarket',
        mealsPerDay: preferences.mealsPerDay,
        budget: preferences.budget,
        goal: preferences.goal,
        shoppingDate: preferences.shoppingDate,
        maxCookingTime: preferences.maxCookingTime,
        avoidIngredients: preferences.avoidIngredients || [],
        dietaryRestrictions: preferences.dietaryRestrictions || [],
        mealTimes: preferences.mealTimes,
        selectedMealSlots: preferences.selectedMealSlots || ['breakfast', 'lunch', 'dinner'],
      });

      setMealPlan((data.mealPlan));

      if (data.mealPlan?.meals) {
        fetchMealImages(data.mealPlan.meals);
      }
    } catch (err: any) {
      console.error('Error fetching meal plan:', err);
      setError(err.message || 'Failed to generate meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMealImages = async (meals: MealPlanMeal[]) => {
    const immediateImageMap: Record<string, string> = {};
    for (const meal of meals) {
      const fallback = getMealImageCandidates(meal)[0];
      if (fallback) {
        immediateImageMap[meal.id] = fallback;
      }
    }
    if (Object.keys(immediateImageMap).length > 0) {
      setMealImages(prev => ({ ...prev, ...immediateImageMap }));
    }

    const settled = await Promise.allSettled(
      meals.map(async (meal) => ({
        mealId: meal.id,
        imageUrl: await fetchImageWithTimeout(meal),
      }))
    );

    const resolvedImageMap: Record<string, string> = {};
    settled.forEach((result) => {
      if (result.status !== 'fulfilled') return;
      if (!result.value.imageUrl) return;
      resolvedImageMap[result.value.mealId] = result.value.imageUrl;
    });

    if (Object.keys(resolvedImageMap).length > 0) {
      setMealImages(prev => ({ ...prev, ...resolvedImageMap }));
    }
  };

  const handleShuffleRecipe = async (mealId: string) => {
    if (!mealPlan) return;

    setShufflingMealId(mealId);

    try {
      const currentMealIds = mealPlan.meals.map(m => m.id);

      const data = await publicPost<{ replacementMeal: any }>('shuffle-recipe', {
        currentRecipeId: mealId,
        goal: preferences.goal,
        currentMealIds: currentMealIds,
        maxCookingTime: preferences.maxCookingTime,
      });

      const updatedMeals = mealPlan.meals.map(meal =>
        meal.id === mealId ? data.replacementMeal : meal
      );

      const newTotalCost = updatedMeals.reduce((sum, meal) => sum + meal.totalCost, 0);

      setMealPlan(({
        ...mealPlan,
        meals: updatedMeals,
        totalCost: parseFloat(newTotalCost.toFixed(2)),
        withinBudget: newTotalCost <= mealPlan.weeklyBudget,
      }));

      const newMeal = data.replacementMeal;
      const aiImage = getMealImageCandidates(newMeal)[0] || LOCAL_IMAGE_FALLBACK;
      setMealImages(prev => ({
        ...prev,
        [newMeal.id]: aiImage,
      }));
      void fetchImageWithTimeout(newMeal).then((cachedImage) => {
        if (!cachedImage) return;
        setMealImages(prev => ({ ...prev, [newMeal.id]: cachedImage }));
      });

    } catch (err: any) {
      console.error('Error shuffling recipe:', err);
    } finally {
      setShufflingMealId(null);
    }
  };

  const handleMealSwap = async (newMeal: MealPlanMeal) => {
    if (!mealPlan || !selectedMealForSwap) return;

    const updatedMeals = mealPlan.meals.map(meal =>
      meal.id === selectedMealForSwap.id
        ? { ...newMeal, dayNumber: meal.dayNumber, mealNumber: meal.mealNumber }
        : meal
    );

    const newTotalCost = updatedMeals.reduce((sum, meal) => sum + meal.totalCost, 0);

    const updatedPlan = {
      ...mealPlan,
      meals: updatedMeals,
      totalCost: parseFloat(newTotalCost.toFixed(2)),
      withinBudget: newTotalCost <= mealPlan.weeklyBudget,
    };

    setMealPlan(updatedPlan);

    const aiImage = getMealImageCandidates(newMeal)[0] || LOCAL_IMAGE_FALLBACK;
    setMealImages(prev => ({
      ...prev,
      [newMeal.id]: aiImage,
    }));
    void fetchImageWithTimeout(newMeal).then((cachedImage) => {
      if (!cachedImage) return;
      setMealImages(prev => ({ ...prev, [newMeal.id]: cachedImage }));
    });

    setShowMealSwapModal(false);

    // Auto-save the updated plan and delete the old one
    if (onSaveMealPlan && user) {
      const oldPlanId = activePlanId;
      try {
        const success = await onSaveMealPlan(updatedPlan);
        if (success) {
          setPlanSaved(true);
          setSavedMealPlanSnapshot(JSON.stringify(updatedPlan.meals.map((m: MealPlanMeal) => m.id).sort()));
          // Delete the old plan now that the new one is saved
          if (oldPlanId && onDeletePlan) {
            await onDeletePlan(oldPlanId);
          }
        }
      } catch (err) {
        console.error('Error auto-saving swapped plan:', err);
      }
    }
  };

  const COOK_MESSAGES = [
    'Great job!', 'Nicely done!', 'Keep it up!', 'Well cooked!',
    'Tasty!', 'Nailed it!', 'Chef mode!', 'Delicious!',
  ];

  const handleCelebration = useCallback(() => {
    setTotalCookedEver(prev => {
      if (prev === 0) {
        setCelebration({
          type: 'first_cook',
          message: 'First Meal Cooked!',
          subMessage: 'Your cooking journey begins!',
          icon: '\u{1F373}',
        });
      } else {
        setCelebration({
          type: 'cook',
          message: COOK_MESSAGES[Math.floor(Math.random() * COOK_MESSAGES.length)],
          icon: '\u2705',
        });
      }
      return prev + 1;
    });
  }, []);

  const toggleMealCooked = (mealId: string) => {
    if (!user?.id) return;

    const wasCooked = cookedMeals.has(mealId);

    // Optimistic update
    setCookedMeals(prev => {
      const updated = new Set(prev);
      if (wasCooked) {
        updated.delete(mealId);
      } else {
        updated.add(mealId);
      }
      return updated;
    });

    const meal = currentDayMeals.find(m => m.id === mealId);
    const today = getLocalTodayISO();

    // Increment/decrement timesCooked for user-created recipes
    if (meal && meal.timesCooked !== undefined && mealPlan) {
      setMealPlan({
        ...mealPlan,
        meals: mealPlan.meals.map(m =>
          m.id === mealId
            ? { ...m, timesCooked: Math.max(0, (m.timesCooked || 0) + (wasCooked ? -1 : 1)) }
            : m
        ),
      });
    }

    // Persist to backend
    authedPost('track-meal-cooked', {
      userId: user.id,
      mealId,
      date: today,
      recipeId: meal?.id || mealId,
      recipeName: meal?.name || '',
      mealCost: meal?.totalCost || 0,
      category: meal?.category || '',
      isCooked: !wasCooked,
    }).catch(err => {
      console.error('Failed to persist cooked meal:', err);
      // Revert on failure
      setCookedMeals(prev => {
        const reverted = new Set(prev);
        if (wasCooked) {
          reverted.add(mealId);
        } else {
          reverted.delete(mealId);
        }
        return reverted;
      });
    });

    // Trigger celebration on cook (not uncook)
    if (!wasCooked) {
      handleCelebration();
    }
  };

  // Group meals by day
  const groupMealsByDay = (): Record<number, MealPlanMeal[]> => {
    if (!mealPlan) return {};
    
    const grouped: Record<number, MealPlanMeal[]> = {};
    
    mealPlan.meals.forEach(meal => {
      const day = meal.dayNumber || 1;
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(meal);
    });
    
    return grouped;
  };

  const dailyMealSchedule = groupMealsByDay();
  const daysWithMeals = Object.keys(dailyMealSchedule).map(Number).sort((a, b) => a - b);

  // currentDayMeals derived from calendar offset
  const currentDayMeals =
    selectedCalendarOffset >= 0 && selectedCalendarOffset < daysWithMeals.length
      ? dailyMealSchedule[daysWithMeals[selectedCalendarOffset]] || []
      : [];

  // Parse the plan start date from preferences (shoppingDate is 'YYYY-MM-DD' from date input)
  const planStartDate: Date | null = (() => {
    if (!preferences.shoppingDate) return null;
    const d = parseLocalDate(preferences.shoppingDate);
    return isNaN(d.getTime()) ? null : d;
  })();

  // Generate scrollable calendar days: 14 days before plan start → plan end + 14 days
  const calendarDays = (() => {
    const start = planStartDate ? new Date(planStartDate) : new Date();
    start.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const planLen = Math.max(daysWithMeals.length, 1);
    const days = [];
    let prevMonth = -1;
    for (let i = -14; i < planLen + 14; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      date.setHours(0, 0, 0, 0);
      const month = date.getMonth();
      const dow = date.getDay();
      const hasConflict = !!(weekConflicts?.has(dow) && weekConflicts.get(dow)!.length > 0);
      days.push({
        offset: i,
        date,
        dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: date.getDate(),
        monthLabel: date.toLocaleDateString('en-US', { month: 'short' }),
        showMonthLabel: month !== prevMonth,
        hasMeals: i >= 0 && i < daysWithMeals.length,
        isToday: date.getTime() === today.getTime(),
        hasConflict,
      });
      prevMonth = month;
    }
    return days;
  })();

  // Calculate nutrition for selected day — only cooked/eaten meals count toward progress
  const todayNutrition = currentDayMeals
    .filter(meal => cookedMeals.has(meal.id))
    .reduce(
      (totals, meal) => ({
        calories: totals.calories + (meal.nutrition?.calories || 0),
        protein: totals.protein + (meal.nutrition?.protein || 0),
        carbs: totals.carbs + (meal.nutrition?.carbs || 0),
        fats: totals.fats + (meal.nutrition?.fats || 0),
        fiber: totals.fiber + (meal.nutrition?.fiber || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
    );

  const dailyBudgetUsed = currentDayMeals.reduce((sum, meal) => sum + (meal.totalCost || 0), 0);
  const dailyBudgetLimit = mealPlan?.dailyBudget || (preferences.budget / 7);

  // Target nutrition based on user's gender
  const nutritionTargets = getNutritionTargets(preferences.gender);
  const targetCalories = nutritionTargets.calories;
  const targetProtein = nutritionTargets.protein;
  const targetCarbs = nutritionTargets.carbs;
  const targetFats = nutritionTargets.fats;
  const targetFiber = nutritionTargets.fiber;

  const caloriePercentage = Math.round((todayNutrition.calories / targetCalories) * 100);
  const cookedCount = currentDayMeals.filter(meal => cookedMeals.has(meal.id)).length;


  // Prepare shopping list
  const allIngredients = mealPlan?.meals.flatMap(meal => 
    meal.ingredients.map(ing => ({
      ...ing,
      checked: false,
    }))
  ) || [];

  const uniqueIngredients = allIngredients.reduce((acc, ingredient) => {
    const existing = acc.find(i => i.name === ingredient.name);
    if (!existing) {
      acc.push(ingredient);
    }
    return acc;
  }, [] as typeof allIngredients);

  if (shoppingMode && mealPlan) {
    return (
      <ShoppingMode
        ingredients={uniqueIngredients}
        storeName={preferences.selectedStores[0]?.name || 'Supermarket'}
        onBack={() => setShoppingMode(false)}
      />
    );
  }

  // Needs Setup State - when preferences aren't complete AND no plan is loaded/incoming
  if (!hasRequiredPreferences && !loading && !mealPlan && !initialSavedPlan?.meals?.length) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col pb-24">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8 text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-[#22C55E]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Create Your First Plan</h2>
            <p className="text-[#9CA3AF] mb-6">
              Set up your preferences to generate a personalized meal plan tailored to your goals.
            </p>
            <button
              onClick={onReset}
              className="px-6 py-3 bg-[#22C55E] text-[#052E16] rounded-full font-semibold hover:bg-[#4ADE80] transition-all"
            >
              Set Up Preferences
            </button>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation 
          activeTab={activeNavTab || 'plan'} 
          onTabChange={(tab) => {
            if (onNavTabChange) {
              onNavTabChange(tab);
            } else if (tab === 'home' && onNavigateHome) {
              onNavigateHome();
            }
          }} 
        />
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1F13] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#22C55E] animate-spin mx-auto mb-4" />
          <p className="text-[#9CA3AF]">Creating your personalized meal plan...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#0A1F13] flex items-center justify-center p-6">
        <div className="bg-[#142A1D] border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchMealPlan}
            className="px-6 py-3 bg-[#22C55E] text-[#052E16] rounded-full font-semibold hover:bg-[#4ADE80] transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!mealPlan) return null;

  return (
    <div className="min-h-screen bg-[#0A1F13] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt={userName}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <p className="text-[#6B7280] text-sm">{getGreeting()}</p>
              <h1 className="text-xl font-bold text-white">{userName}</h1>
          </div>
        </div>
          <button className="w-10 h-10 rounded-full bg-[#142A1D] flex items-center justify-center border border-[#1E4029]">
            <Bell className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>
            </div>

      {/* Plan Sub-Navigation: Meals | Schedule */}
      <PlanTabSubNav
        activeView={planSubView}
        onViewChange={setPlanSubView}
        isTestingPeriod={isTestingPeriod}
        scheduleDisabled={isNewUnsavedPlan}
      />

      {/* Meal Reminder Banners */}
      {planSubView === 'meals' && (
        <MealReminderBanner conflicts={reminderConflicts} onDismiss={dismissConflict} />
      )}

      {/* Schedule View */}
      {planSubView === 'schedule' && (
        <>
          <WeeklyScheduleView
            schedule={academicSchedule || null}
            mealConflicts={mealConflicts}
            weekConflicts={weekConflicts}
            isTestingPeriod={isTestingPeriod}
            onEditSchedule={(tab) => {
              setScheduleEditorTab(tab || 'classes');
              setShowScheduleEditor(true);
            }}
            onViewMeal={(_dayIdx, _slot) => {
              setPlanSubView('meals');
            }}
            onSaveMealTimeOverride={user && onSaveMealTimeOverride ? (override) => {
              onSaveMealTimeOverride(user.id, override, preferences.mealTimes);
            } : undefined}
            onRemoveMealTimeOverride={user && onRemoveMealTimeOverride ? (dayOfWeek, mealSlot) => {
              onRemoveMealTimeOverride(user.id, dayOfWeek, mealSlot, preferences.mealTimes);
            } : undefined}
            currentWeekMeals={mealPlan?.meals}
            mealTimes={preferences.mealTimes}
          />
          {/* Schedule Editor Modal */}
          {showScheduleEditor && (
            <AcademicScheduleEditor
              schedule={academicSchedule || null}
              onSave={handleSaveSchedule}
              onClose={() => setShowScheduleEditor(false)}
              isSaving={savingSchedule}
              initialTab={scheduleEditorTab}
              mealTimes={preferences.mealTimes}
              mealsPerDay={preferences.mealsPerDay}
              selectedMealSlots={preferences.selectedMealSlots}
            />
          )}
        </>
      )}

      {/* Meals View — only show when on meals sub-tab */}
      {planSubView === 'meals' && (
      <>

      {/* Calendar — scrollable, anchored to plan start date */}
      <div className="mb-4">
        {/* Month / year label for selected day */}
        <div className="px-5 mb-2 flex items-center gap-2">
          <span className="text-white font-semibold text-sm">
            {calendarDays.find(d => d.offset === selectedCalendarOffset)?.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) ?? ''}
          </span>
        </div>

        {/* Scrollable day strip */}
        <div
          ref={calendarScrollRef}
          className="overflow-x-auto hide-scrollbar pb-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex gap-2 px-5 w-max">
            {calendarDays.map((day) => {
              const isSelected = day.offset === selectedCalendarOffset;
              return (
                <button
                  key={day.offset}
                  onClick={() => setSelectedCalendarOffset(day.offset)}
                  className={`relative flex-shrink-0 w-14 flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-[#22C55E]'
                      : day.hasConflict
                      ? 'bg-red-500/10 border border-red-500/30'
                      : day.isToday
                      ? 'bg-[#142A1D] border border-[#22C55E]/50'
                      : 'hover:bg-[#142A1D]'
                  }`}
                >
                  {/* Conflict indicator */}
                  {day.hasConflict && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isSelected ? 'bg-red-500 text-white' : 'bg-red-500/80 text-white'
                    }`}>!</span>
                  )}
                  <span className={`text-[11px] font-medium mb-0.5 ${isSelected ? 'text-[#052E16]' : day.hasConflict ? 'text-red-400' : 'text-[#6B7280]'}`}>
                    {day.dayLabel}
                  </span>
                  <span className={`text-lg font-bold leading-none ${isSelected ? 'text-[#052E16]' : 'text-white'}`}>
                    {day.dateNum}
                  </span>
                  {/* Dot — green for days in plan, dim for today indicator */}
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                    day.hasMeals
                      ? isSelected ? 'bg-[#052E16]/40' : 'bg-[#22C55E]'
                      : day.isToday && !isSelected ? 'bg-[#6B7280]/50' : 'bg-transparent'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Goal Card */}
      <div className="px-5 mb-6">
        <div className="relative rounded-3xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F13]/95 via-[#0A1F13]/80 to-[#0A1F13]/60" />
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22C55E] rounded-full">
                <Check className="w-3 h-3 text-[#052E16]" />
                <span className="text-[#052E16] text-xs font-semibold">DAILY GOAL</span>
                                </div>
              <div className="w-14 h-14 rounded-full border-4 border-[#22C55E] flex items-center justify-center bg-[#0A1F13]/50">
                <Flame className="w-6 h-6 text-[#22C55E]" />
                              </div>
                            </div>
                            
            <h2 className="text-4xl font-bold text-white mb-1">{Math.min(caloriePercentage, 100)}%</h2>
            <p className="text-xl text-white/80 mb-2">On Track</p>
            <p className="text-[#9CA3AF] text-sm">
              {cookedCount === currentDayMeals.length && currentDayMeals.length > 0
                ? "You're crushing your nutrition goals today!"
                : `${currentDayMeals.length - cookedCount} meals remaining`}
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

            {/* Fiber */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#9CA3AF]">Fiber</span>
                <span className="text-white">{todayNutrition.fiber}g/{targetFiber}g</span>
              </div>
              <div className="h-2 bg-[#1E4029] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#BBF7D0] rounded-full transition-all"
                  style={{ width: `${Math.min((todayNutrition.fiber / targetFiber) * 100, 100)}%` }}
                />
              </div>
            </div>
                                </div>
                              </div>
                            </div>

      {/* Today's Meals */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-lg">Today's Meals</h3>
            {totalCookingDays > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium">
                {'\u{1F525}'} {totalCookingDays} days cooked
              </span>
            )}
          </div>
                              </div>

        <div className="space-y-3">
          {currentDayMeals.map((meal) => {
            const isCooked = cookedMeals.has(meal.id);
            const mealType = meal.mealType?.toLowerCase() || 'meal';
            const mealImageCandidates = getMealImageCandidates(meal);
            
            return (
              <div
                key={meal.id}
                                  onClick={() => {
                                    setSelectedMeal(meal);
                                    setShowRecipeModal(true);
                                  }}
                className={`bg-[#142A1D] rounded-2xl overflow-hidden border transition-all cursor-pointer hover:border-[#22C55E]/50 ${
                  isCooked 
                    ? 'border-[#22C55E]/50 bg-[#22C55E]/5' 
                    : 'border-[#1E4029]'
                }`}
              >
                <div className="flex gap-4 p-4">
                  {/* Meal Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={mealImageCandidates[0]}
                      data-fallbacks={JSON.stringify(mealImageCandidates)}
                      data-fallback-index="0"
                      alt={meal.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={handleMealImageError}
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22C55E]" />
                  </div>

                  {/* Meal Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[#6B7280] text-xs font-medium uppercase tracking-wide">
                      {MEAL_TYPE_LABELS[mealType] || 'MEAL'}
                    </span>
                    <h4 className={`text-white font-semibold mt-0.5 line-clamp-1 ${
                      isCooked ? 'line-through text-[#6B7280]' : ''
                    }`}>
                      {meal.name}
                    </h4>
                    <div className="flex flex-nowrap items-center gap-1.5 mt-2 text-[11px] text-[#6B7280] whitespace-nowrap">
                      <span className="flex items-center gap-1 shrink-0">
                        <Flame className="w-3.5 h-3.5" />
                        {meal.nutrition?.calories} kcal
                      </span>
                      <span className="shrink-0">•</span>
                      <span className="text-[#22C55E] shrink-0">{meal.nutrition?.protein}g protein</span>
                      {meal.timesCooked !== undefined && (
                        <>
                          <span className="shrink-0">•</span>
                          <span className="flex items-center gap-1 shrink-0 text-[#22C55E]">
                            <ChefHat className="w-3 h-3" />
                            {meal.timesCooked}x cooked
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Checkbox */}
                                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMealCooked(meal.id);
                    }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCooked
                        ? 'bg-[#22C55E] text-[#052E16] animate-pulse-glow'
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

      {/* Action Buttons */}
      <div className="px-5 space-y-3 mb-6">
        {/* Go Shopping Button */}
        <button
          onClick={() => setShoppingMode(true)}
          className="w-full py-4 bg-[#22C55E] text-[#052E16] rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-[#4ADE80] transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          Go Shopping
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Save Plan Button - hidden once saved */}
            {user && !planSaved && (
              <button
                onClick={handleSavePlan}
                disabled={savingPlan}
            className={`w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all ${
                  savingPlan
                ? 'bg-[#1E4029] text-[#6B7280]'
                : 'bg-[#142A1D] border border-[#2D5A3D] text-white hover:border-[#22C55E]'
                }`}
              >
                {savingPlan ? (
                  <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
                  </>
                ) : (
                  <>
                <Save className="w-5 h-5" />
                Save This Plan
                  </>
                )}
              </button>
            )}

        {/* Discard Plan Button - shown only for new unsaved plans */}
        {isNewUnsavedPlan && onDiscard && (
          <button
            onClick={onDiscard}
            className="w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all bg-[#142A1D] border border-red-500/30 text-red-400 hover:border-red-500/50 hover:bg-red-500/10"
          >
            <Trash2 className="w-5 h-5" />
            Discard Plan
          </button>
        )}

      </div>

      </>
      )}
      {/* End of planSubView === 'meals' conditional */}

      {/* Shared Bottom Navigation — hidden when recipe details or swap modal are open */}
      {!showRecipeModal && !showMealSwapModal && (
        <BottomNavigation
          activeTab={activeNavTab || 'plan'}
          onTabChange={(tab) => {
            if (isNewUnsavedPlan) {
              const action = () => {
                if (onNavTabChange) {
                  onNavTabChange(tab);
                } else if (tab === 'home' && onNavigateHome) {
                  onNavigateHome();
                }
              };
              setPendingNavAction(() => action);
              setShowLeaveWarning(true);
              return;
            }
            if (onNavTabChange) {
              onNavTabChange(tab);
            } else if (tab === 'home' && onNavigateHome) {
              onNavigateHome();
            }
          }}
        />
      )}

      {/* Leave Warning Modal */}
      {showLeaveWarning && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70] p-6">
          <div className="bg-[#142A1D] border border-[#1E4029] rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold text-lg">Unsaved Plan</h3>
            </div>
            <p className="text-[#9CA3AF] text-sm mb-6">
              Your meal plan hasn't been saved yet. Please save or discard your plan before leaving.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowLeaveWarning(false);
                  handleSavePlan();
                }}
                disabled={savingPlan}
                className="w-full py-3 bg-[#22C55E] text-[#052E16] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all"
              >
                <Save className="w-4 h-4" />
                Save Plan
              </button>
              {onDiscard && (
                <button
                  onClick={() => {
                    setShowLeaveWarning(false);
                    setPendingNavAction(null);
                    onDiscard();
                  }}
                  className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 bg-[#1E4029] border border-red-500/30 text-red-400 hover:border-red-500/50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Discard Plan
                </button>
              )}
              <button
                onClick={() => {
                  setShowLeaveWarning(false);
                  setPendingNavAction(null);
                }}
                className="w-full py-3 rounded-xl font-medium text-[#9CA3AF] hover:text-white transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Modal */}
      {showRecipeModal && selectedMeal && (
        <div className="fixed inset-0 bg-black/80 flex items-end justify-center z-50">
          <div className="bg-[#0A1F13] rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0A1F13] p-4 flex items-center justify-between border-b border-[#1E4029]">
              <h3 className="text-white font-semibold">{selectedMeal.name}</h3>
              <button
                onClick={() => setShowRecipeModal(false)}
                className="p-2 hover:bg-[#142A1D] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            
            {/* Recipe Image */}
            <div className="relative h-48 bg-[#142A1D]">
              <img
                src={getMealImageCandidates(selectedMeal)[0]}
                data-fallbacks={JSON.stringify(getMealImageCandidates(selectedMeal))}
                data-fallback-index="0"
                alt={selectedMeal.name}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                onError={handleMealImageError}
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedMeal.cookingTime} min
                </span>
                <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {selectedMeal.servings} servings
                </span>
                {selectedMeal.timesCooked !== undefined && (
                  <span className="px-3 py-1 bg-[#22C55E]/80 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-1 font-medium">
                    <ChefHat className="w-3 h-3" />
                    {selectedMeal.timesCooked}x cooked
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 pb-24 space-y-6">
              {/* Nutrition Grid */}
              <div className="grid grid-cols-5 gap-2">
                <div className="bg-[#142A1D] rounded-xl p-3 text-center border border-[#1E4029]">
                  <div className="text-lg font-bold text-white">{selectedMeal.nutrition.calories}</div>
                  <div className="text-xs text-[#6B7280]">kcal</div>
                </div>
                <div className="bg-[#142A1D] rounded-xl p-3 text-center border border-[#1E4029]">
                  <div className="text-lg font-bold text-[#22C55E]">{selectedMeal.nutrition.protein}g</div>
                  <div className="text-xs text-[#6B7280]">Protein</div>
                </div>
                <div className="bg-[#142A1D] rounded-xl p-3 text-center border border-[#1E4029]">
                  <div className="text-lg font-bold text-[#4ADE80]">{selectedMeal.nutrition.carbs}g</div>
                  <div className="text-xs text-[#6B7280]">Carbs</div>
                </div>
                <div className="bg-[#142A1D] rounded-xl p-3 text-center border border-[#1E4029]">
                  <div className="text-lg font-bold text-[#86EFAC]">{selectedMeal.nutrition.fats}g</div>
                  <div className="text-xs text-[#6B7280]">Fats</div>
                </div>
                <div className="bg-[#142A1D] rounded-xl p-3 text-center border border-[#1E4029]">
                  <div className="text-lg font-bold text-[#BBF7D0]">{selectedMeal.nutrition.fiber || 0}g</div>
                  <div className="text-xs text-[#6B7280]">Fiber</div>
                </div>
              </div>

              {/* Recipe Source Links */}
              {(selectedMeal.youtubeUrl || selectedMeal.sourceUrl) && (
                <div className="bg-[#0D2818] rounded-2xl p-4 border border-[#1E4029]">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#22C55E]" />
                    Recipe Source
                  </h4>
                  <div className="space-y-2">
                    {selectedMeal.youtubeUrl && (
                      <a
                        href={selectedMeal.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[#142A1D] rounded-xl border border-[#1E4029] hover:border-[#FF0000] transition-all active:scale-[0.98]"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(selectedMeal.youtubeUrl, '_blank');
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FF0000] flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium">Watch on YouTube</div>
                          <div className="text-[#6B7280] text-xs truncate">
                            {selectedMeal.youtubeUrl.replace(/https?:\/\/(www\.)?/, '')}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                      </a>
                    )}
                    {selectedMeal.sourceUrl && (
                      <a
                        href={selectedMeal.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[#142A1D] rounded-xl border border-[#1E4029] hover:border-[#22C55E] transition-all active:scale-[0.98]"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(selectedMeal.sourceUrl, '_blank');
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#1E4029] flex items-center justify-center flex-shrink-0">
                          <ExternalLink className="w-5 h-5 text-[#22C55E]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium">View Original Recipe</div>
                          <div className="text-[#22C55E] text-xs truncate font-medium">
                            {(() => {
                              try {
                                return new URL(selectedMeal.sourceUrl!).hostname.replace('www.', '');
                              } catch {
                                return selectedMeal.sourceUrl;
                              }
                            })()}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Ingredients */}
              <div>
                <h4 className="text-white font-semibold mb-3">Ingredients</h4>
                <div className="space-y-2">
                  {selectedMeal.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start gap-3 px-3 py-2.5 bg-[#142A1D] rounded-xl border border-[#1E4029]">
                      <div className="w-2 h-2 rounded-full bg-[#22C55E] mt-1.5 flex-shrink-0" />
                      <span className="text-white text-sm leading-relaxed">{ingredient.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-white font-semibold mb-3">Instructions</h4>
                <ol className="space-y-3">
                  {selectedMeal.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#22C55E] text-[#052E16] flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-[#9CA3AF] text-sm pt-1 flex-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Video & Source Links - removed from here, moved above ingredients */}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedMealForSwap(selectedMeal);
                    setShowRecipeModal(false);
                    setShowMealSwapModal(true);
                  }}
                  className="flex-1 py-3 bg-[#142A1D] border border-[#2D5A3D] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:border-[#22C55E] transition-all"
                >
                  <Repeat2 className="w-4 h-4" />
                  Swap Meal
                </button>
                <button
                  onClick={() => {
                    setShowRecipeModal(false);
                    handleShuffleRecipe(selectedMeal.id);
                  }}
                  disabled={shufflingMealId === selectedMeal.id}
                  className="flex-1 py-3 bg-[#22C55E] text-[#052E16] rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${shufflingMealId === selectedMeal.id ? 'animate-spin' : ''}`} />
                  {shufflingMealId === selectedMeal.id ? 'Finding...' : 'Shuffle'}
                </button>
                  </div>
                  </div>
          </div>
        </div>
      )}

      {/* Meal Swap Modal */}
      {showMealSwapModal && selectedMealForSwap && (
        <MealSwapModal
          currentMeal={selectedMealForSwap}
          goal={preferences.goal || 'Custom'}
          currentMealIds={mealPlan.meals.map(m => m.id)}
          maxCookingTime={preferences.maxCookingTime}
          onSwap={handleMealSwap}
          onClose={() => setShowMealSwapModal(false)}
        />
      )}

      {/* Saved Plans Modal */}
      {showSavedPlansModal && user && (
        <SavedPlansModal
          userId={user.id}
          onClose={() => setShowSavedPlansModal(false)}
          onLoadPlan={handleLoadSavedPlan}
        />
      )}

      {/* Loading overlay */}
      {loadingPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#142A1D] rounded-2xl p-8 flex flex-col items-center gap-4 border border-[#1E4029]">
            <Loader2 className="w-12 h-12 text-[#22C55E] animate-spin" />
            <p className="text-white font-medium">Loading your meal plan...</p>
          </div>
        </div>
      )}

      {/* Celebration Overlay */}
      {celebration && (
        <CelebrationOverlay
          type={celebration.type}
          message={celebration.message}
          subMessage={celebration.subMessage}
          icon={celebration.icon}
          onComplete={() => setCelebration(null)}
          duration={celebration.type === 'cook' ? 1500 : 2500}
        />
      )}
    </div>
  );
}
