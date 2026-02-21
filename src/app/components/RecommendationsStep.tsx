import { ShoppingCart, ArrowLeft, Loader2, X, Clock, ChefHat, Users, Flame, RefreshCw, Repeat2, MapPin, ArrowRight, Save, Check, Plus, Bell, ExternalLink, Play } from 'lucide-react';
import { UserPreferences } from '../App';
import { useState, useEffect, useCallback, useRef } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { ShoppingMode } from './ShoppingMode';
import { getRecipeImage, getRecipeImageByName, getRecipeImageWithCache } from '../utils/recipeImages';
import { MealSwapModal } from './MealSwapModal';
import { KitchenInventoryWizard } from './KitchenInventoryWizard';
import { supabase } from '../../utils/supabaseClient';
import { SavedPlansModal } from './SavedPlansModal';
import { BottomNavigation, NavTab } from './BottomNavigation';
import { CelebrationOverlay, CelebrationType } from './CelebrationOverlay';

interface RecommendationsStepProps {
  preferences: UserPreferences;
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
  onSaveMealPlan?: (mealPlan: any) => Promise<boolean | undefined>;
  onNavigateHome?: () => void;
  activeNavTab?: NavTab;
  onNavTabChange?: (tab: NavTab) => void;
  savedMealPlan?: any;
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

const MEAL_TYPE_LABELS: Record<string, string> = {
  'breakfast': 'BREAKFAST',
  'lunch': 'LUNCH',
  'dinner': 'DINNER',
  'snack': 'SNACK',
};

const LOCAL_IMAGE_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiMxNDJBMUQiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjMUU0MDI5Ii8+PHJlY3QgeD0iNzIiIHk9IjE2MiIgd2lkdGg9IjE3NiIgaGVpZ2h0PSIxMiIgcng9IjYiIGZpbGw9IiMyMkM1NUUiIG9wYWNpdHk9IjAuNzUiLz48L3N2Zz4=';

// Client-side recipe source URL fallback (used when API doesn't include sourceUrl)
const RECIPE_SOURCE_URLS: Record<string, string> = {
  'one-pot-chicken-rice': 'https://www.budgetbytes.com/one-pot-chicken-and-rice/',
  'one-pot-pasta-tomato': 'https://www.recipetineats.com/one-pot-pasta/',
  'one-pot-lentil-curry': 'https://www.bbcgoodfoodme.com/recipes/lentil-curry/',
  'microwave-perfect-scramble': 'https://www.biggerbolderbaking.com/microwave-scrambled-eggs/',
  'microwave-banana-oat-mug-cake': 'https://www.budgetbytes.com/banana-bread-oatmeal/',
  'microwave-breakfast-burrito': 'https://www.budgetbytes.com/freezer-breakfast-burritos/',
  'microwave-french-toast': 'https://tasty.co/recipe/blueberry-french-toast-in-a-mug',
  'microwave-poached-egg': 'https://www.recipetineats.com/poached-eggs/',
  'microwave-spinach-feta-quiche': 'https://www.budgetbytes.com/spinach-mushroom-feta-crustless-quiche/',
  'microwave-bacon-egg-cheese-sandwich': 'https://tasty.co/recipe/microwaved-egg-breakfast-sandwich',
  'microwave-cinnamon-quinoa-bowl': 'https://minimalistbaker.com/the-perfect-bowl-of-oats/',
  'microwave-shakshuka-mug': 'https://www.budgetbytes.com/shakshuka/',
  'microwave-yogurt-berry-compote': 'https://minimalistbaker.com/simple-berry-compote/',
  'microwave-mac-cheese': 'https://tasty.co/recipe/microwave-5-minute-mac-n-cheese',
  'microwave-loaded-baked-potato': 'https://tasty.co/recipe/microwave-10-minute-loaded-potato',
  'microwave-lemon-dill-salmon': 'https://www.themediterraneandish.com/lemon-dill-salmon/',
  'microwave-fried-rice': 'https://www.recipetineats.com/egg-fried-rice/',
  'microwave-stuffed-peppers': 'https://www.budgetbytes.com/stuffed-bell-peppers/',
  'microwave-chicken-fajita-bowl': 'https://www.recipetineats.com/chicken-fajitas/',
  'microwave-single-serve-lasagna': 'https://tasty.co/recipe/6-minute-microwave-lasagna',
  'microwave-enchilada-casserole': 'https://www.budgetbytes.com/vegetable-enchilada-casserole/',
  'microwave-mug-meatloaf': 'https://www.myplate.gov/recipes/meatloaf-mug',
  'microwave-spaghetti-squash-pasta': 'https://tasty.co/recipe/spaghetti-squash-pasta-meal-prep-2-ways',
  'meal-prep-chicken-veg': 'https://www.budgetbytes.com/sheet-pan-greek-chicken-and-vegetables/',
  'meal-prep-overnight-oats': 'https://www.budgetbytes.com/overnight-oats-base-recipe-plus-variations/',
  'meal-prep-burrito-bowls': 'https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/',
  'meal-prep-buddha-bowl': 'https://minimalistbaker.com/sweet-potato-chickpea-buddha-bowl/',
  'british-shepherds-pie': 'https://www.recipetineats.com/shepherds-pie/',
  'british-fish-chips': 'https://www.jamieoliver.com/recipes/fish/fish-chips-and-mushy-peas/',
  'italian-carbonara': 'https://www.recipetineats.com/carbonara/',
  'italian-margherita-pasta': 'https://www.mob.co.uk/recipes/mobs-ultimate-carbonara',
  'chinese-fried-rice': 'https://www.recipetineats.com/egg-fried-rice/',
  'chinese-sweet-sour-chicken': 'https://www.recipetineats.com/oven-baked-sweet-sour-chicken/',
  'indian-butter-chicken': 'https://www.recipetineats.com/butter-chicken/',
  'indian-chana-masala': 'https://www.recipetineats.com/easy-chickpea-potato-curry-chana-aloo-curry/',
  'mexican-chicken-fajitas': 'https://www.recipetineats.com/chicken-fajitas/',
  'mexican-bean-quesadilla': 'https://www.budgetbytes.com/hearty-black-bean-quesadillas/',
  'mediterranean-greek-salad-bowl': 'https://www.recipetineats.com/greek-salad/',
  'japanese-teriyaki-chicken': 'https://www.recipetineats.com/teriyaki-chicken/',
  'american-chili-con-carne': 'https://www.recipetineats.com/chilli-con-carne/',
  'smoked-salmon-poached-eggs': 'https://www.jamieoliver.com/recipes/eggs/blanched-asparagus-poached-egg-fresh-smoked-salmon/',
  'sardines-toast-tomato': 'https://www.jamieoliver.com/recipes/fish/sardines-on-toast-tomato-salad/',
  'sardine-salad-lemon': 'https://www.jamieoliver.com/recipes/fish/harissa-sardines-with-couscous-salad/',
  'baked-salmon-asparagus': 'https://www.recipetineats.com/lemon-garlic-salmon-tray-bake-easy-healthy/',
  'mackerel-sourdough': 'https://www.jamieoliver.com/recipes/fish/smoked-mackerel-pate-with-griddled-toast-and-cress-salad/',
  'baked-cod-brussels-sprouts': 'https://www.foodnetwork.com/recipes/food-network-kitchen/roasted-cod-with-carrots-and-brussels-sprouts-3568165',
  'walnut-blueberry-oats': 'https://minimalistbaker.com/the-perfect-bowl-of-oats/',
  'turmeric-chicken-curry': 'https://www.recipetineats.com/golden-coconut-chicken-curry/',
  'overnight-oats-cacao-cherries': 'https://minimalistbaker.com/chocolate-overnight-oats/',
  'beetroot-goat-cheese-salad': 'https://www.recipetineats.com/rocket-aragula-beetroot-walnuts-feta-wbalsamic-dressing/',
  'lamb-chops-rosemary': 'https://www.recipetineats.com/lamb-chops-with-rosemary-gravy/',
  'eggplant-parmesan': 'https://www.recipetineats.com/eggplant-parmigiana/',
  'seared-scallops': 'https://downshiftology.com/recipes/pan-seared-scallops-lemon-garlic-butter/',
  'chia-seed-pudding': 'https://minimalistbaker.com/how-to-make-chia-pudding/',
  'avocado-hemp-toast': 'https://minimalistbaker.com/my-go-to-avocado-toast/',
  'shakshuka': 'https://www.recipetineats.com/shakshuka-baked-eggs/',
  'quinoa-breakfast-bowl': 'https://minimalistbaker.com/dark-chocolate-quinoa-breakfast-bowl/',
  'lentil-soup-spinach': 'https://www.budgetbytes.com/creamy-coconut-curry-lentils-with-spinach/',
  'beef-broccoli-stir-fry': 'https://www.recipetineats.com/chinese-beef-and-broccoli-extra-saucy-take-out-style/',
  'liver-onions': 'https://www.bbcgoodfoodme.com/recipes/liver-and-bacon-with-onion-gravy/',
  'black-bean-sweet-potato-bowl': 'https://www.budgetbytes.com/sweet-potato-black-bean-skillet/',
  'sweet-potato-lentil-curry': 'https://www.recipetineats.com/lentil-curry-mega-flavour-lentil-recipe/',
  'buckwheat-pancakes-cinnamon': 'https://minimalistbaker.com/5-ingredient-buckwheat-crepes/',
  'miso-glazed-halibut': 'https://www.recipetineats.com/miso-marinated-side-of-salmon/',
  'mediterranean-chickpea-salad': 'https://www.budgetbytes.com/spinach-chickpea-and-quinoa-salad/',
  'soba-noodle-salad-edamame': 'https://www.budgetbytes.com/peanut-soba-stir-fry/',
  'cauliflower-rice-risotto-shrimp': 'https://www.recipetineats.com/prawn-risotto-shrimp/',
  'bean-egg-breakfast-burrito': 'https://www.budgetbytes.com/freezer-breakfast-burritos/',
  'minestrone-soup': 'https://www.recipetineats.com/minestrone-soup/',
  'pesto-zucchini-noodles-chicken': 'https://www.budgetbytes.com/easy-pesto-chicken-and-vegetables/',
  'chili-con-carne': 'https://www.recipetineats.com/chilli-con-carne/',
  'vietnamese-summer-rolls': 'https://www.recipetineats.com/vietnamese-rice-paper-rolls-spring-rolls/',
  'greek-yogurt-parfait-seeds': 'https://www.budgetbytes.com/tropical-yogurt-parfaits/',
  'turkey-sausage-sweet-potato-hash': 'https://www.budgetbytes.com/sweet-potato-hash/',
  'grilled-chicken-quinoa-salad': 'https://www.recipetineats.com/my-favourite-quinoa-salad/',
  'bison-burgers': 'https://www.recipetineats.com/hamburger-recipe/',
  'turkey-hummus-wrap': 'https://www.budgetbytes.com/roasted-red-pepper-hummus-wraps/',
  'tuna-salad-stuffed-peppers': 'https://www.budgetbytes.com/sweet-and-spicy-tuna-salad/',
  'chicken-avocado-caprese': 'https://www.recipetineats.com/caprese-salad/',
  'grilled-tempeh-broccoli-bowl': 'https://minimalistbaker.com/simple-vegetable-tempeh-stir-fry/',
  'tofu-scramble-kale': 'https://minimalistbaker.com/southwest-tofu-scramble/',
  'spinach-feta-mushroom-omelet': 'https://www.budgetbytes.com/scrambled-eggs-with-spinach-and-feta/',
  'leftover-roast-beef-rollups': 'https://bowl-me-over.com/roast-beef-rollups-recipe/',
  'shrimp-whole-wheat-pasta': 'https://www.recipetineats.com/creamy-garlic-prawn-pasta/',
  'stuffed-acorn-squash-turkey': 'https://www.budgetbytes.com/wild-rice-stuffed-acorn-squash/',
  'lemon-herb-roasted-chicken-thighs': 'https://www.budgetbytes.com/garlic-butter-baked-chicken-thighs/',
  'cottage-cheese-bowl': 'https://www.budgetbytes.com/cottage-cheese-breakfast-bowls-6-ways/',
  'ricotta-berry-toast': 'https://www.budgetbytes.com/ricotta-toast-4-ways/',
  'protein-buckwheat-pancakes': 'https://minimalistbaker.com/1-bowl-peanut-butter-protein-pancakes/',
};

// Enrich meals with source URLs from client-side lookup if not provided by API
function enrichMealsWithSourceUrls(meals: MealPlanMeal[]): MealPlanMeal[] {
  return meals.map(meal => ({
    ...meal,
    sourceUrl: meal.sourceUrl || RECIPE_SOURCE_URLS[meal.id] || undefined,
  }));
}

function enrichMealPlan(plan: MealPlan): MealPlan {
  return {
    ...plan,
    meals: enrichMealsWithSourceUrls(plan.meals),
  };
}

export function RecommendationsStep({ preferences, onBack, onNext, onReset, onSaveMealPlan, onNavigateHome, activeNavTab, onNavTabChange, savedMealPlan: initialSavedPlan }: RecommendationsStepProps) {
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
  
  const [showKitchenWizard, setShowKitchenWizard] = useState(false);
  const [checkingWizardStatus, setCheckingWizardStatus] = useState(true);
  const [missingEssentials, setMissingEssentials] = useState<any[]>([]);
  
  const [savingPlan, setSavingPlan] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);
  const [savedMealPlanSnapshot, setSavedMealPlanSnapshot] = useState<string | null>(null);
  
  const [showSavedPlansModal, setShowSavedPlansModal] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  
  const [user, setUser] = useState<any>(null);

  const [celebration, setCelebration] = useState<{
    type: CelebrationType;
    message: string;
    subMessage?: string;
    icon?: string;
  } | null>(null);
  const [totalCookedEver, setTotalCookedEver] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

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
        isRenderableImageUrl(meal.imageUrl) ? meal.imageUrl : undefined,
        isRenderableImageUrl(meal.image) ? meal.image : undefined,
        getRecipeImage(meal.id, meal.image),
        getRecipeImage(meal.id),
        getRecipeImageByName(meal.name),
        getRecipeImage('default'),
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
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/load-meal-plan-by-id`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId: user.id, planId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load plan');
      }

      setMealPlan(enrichMealPlan(data.mealPlan));

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

  useEffect(() => {
    // If a saved plan was passed in, use it directly instead of generating a new one
    if (initialSavedPlan?.meals?.length) {
      const enriched = enrichMealPlan(initialSavedPlan);
      setMealPlan(enriched);
      setLoading(false);
      setCheckingWizardStatus(false);
      setPlanSaved(true);
      setSavedMealPlanSnapshot(JSON.stringify(enriched.meals.map(m => m.id).sort()));
      fetchMealImages(enriched.meals);
    } else {
      checkKitchenInventoryStatus();
    }
  }, []);
  
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
    const today = new Date().toISOString().split('T')[0];

    // Load today's cooked meals
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/cooked-meals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
      body: JSON.stringify({ userId: user.id, date: today }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.mealIds?.length) {
          setCookedMeals(new Set(data.mealIds));
        }
      })
      .catch(err => console.error('Failed to load cooked meals:', err));

    // Load user stats for streak and total cooked count
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/user-stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
      body: JSON.stringify({ userId: user.id }),
    })
      .then(res => res.json())
      .then(data => {
        setTotalCookedEver(data.mealsLogged || 0);
        setCurrentStreak(data.currentStreak || 0);
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
    const container = calendarScrollRef.current;
    requestAnimationFrame(() => {
      const idx = calendarDays.findIndex(d => d.offset === selectedCalendarOffset);
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

  // Check if required preferences are set
  const hasRequiredPreferences = preferences.goal !== null;

  const checkKitchenInventoryStatus = async () => {
    // If preferences aren't set, don't fetch meal plan - show setup prompt instead
    if (!hasRequiredPreferences) {
      setCheckingWizardStatus(false);
      setLoading(false);
      return;
    }

    setCheckingWizardStatus(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setCheckingWizardStatus(false);
        fetchMealPlan();
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/check-kitchen-inventory`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId: user.id }),
        }
      );

      const data = await response.json();

      if (data.completed) {
        setMissingEssentials(data.missingEssentials || []);
        setCheckingWizardStatus(false);
        fetchMealPlan();
      } else {
        setCheckingWizardStatus(false);
        setShowKitchenWizard(true);
        // Don't fetch meal plan yet - wait for wizard completion to avoid double fetch
      }
    } catch (err) {
      console.error('Error checking kitchen inventory status:', err);
      setCheckingWizardStatus(false);
      fetchMealPlan();
    }
  };

  const handleKitchenWizardComplete = async (missing: any[]) => {
    setMissingEssentials(missing);
    setShowKitchenWizard(false);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/save-kitchen-inventory`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              userId: user.id,
              missingEssentials: missing,
            }),
          }
        );
      }
    } catch (err) {
      console.error('Error saving kitchen inventory:', err);
    }

    fetchMealPlan();
  };

  const handleKitchenWizardSkip = () => {
    setShowKitchenWizard(false);
    setMissingEssentials([]);
    fetchMealPlan();
  };

  const fetchMealPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/generate-meal-plan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            storeName: 'Generic UK Supermarket',
            mealsPerDay: preferences.mealsPerDay,
            budget: preferences.budget,
            goal: preferences.goal,
            shoppingDate: preferences.shoppingDate,
            maxCookingTime: preferences.maxCookingTime,
            cookingMethods: preferences.cookingMethods,
            avoidIngredients: preferences.avoidIngredients || [],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate meal plan');
      }

      setMealPlan(enrichMealPlan(data.mealPlan));

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
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/shuffle-recipe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            currentRecipeId: mealId,
            goal: preferences.goal,
            currentMealIds: currentMealIds,
            maxCookingTime: preferences.maxCookingTime,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to find alternative recipe');
      }

      const updatedMeals = mealPlan.meals.map(meal => 
        meal.id === mealId ? data.replacementMeal : meal
      );

      const newTotalCost = updatedMeals.reduce((sum, meal) => sum + meal.totalCost, 0);

      setMealPlan(enrichMealPlan({
        ...mealPlan,
        meals: updatedMeals,
        totalCost: parseFloat(newTotalCost.toFixed(2)),
        withinBudget: newTotalCost <= mealPlan.weeklyBudget,
      }));

      const newMeal = data.replacementMeal;
      const aiImage = getMealImageCandidates(newMeal)[0] || getRecipeImage(newMeal.id, newMeal.image);
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

  const handleMealSwap = (newMeal: MealPlanMeal) => {
    if (!mealPlan || !selectedMealForSwap) return;

    const updatedMeals = mealPlan.meals.map(meal => 
      meal.id === selectedMealForSwap.id ? newMeal : meal
    );

    const newTotalCost = updatedMeals.reduce((sum, meal) => sum + meal.totalCost, 0);

    setMealPlan(enrichMealPlan({
      ...mealPlan,
      meals: updatedMeals,
      totalCost: parseFloat(newTotalCost.toFixed(2)),
      withinBudget: newTotalCost <= mealPlan.weeklyBudget,
    }));

    const aiImage = getMealImageCandidates(newMeal)[0] || getRecipeImage(newMeal.id, newMeal.image);
    setMealImages(prev => ({
      ...prev,
      [newMeal.id]: aiImage,
    }));
    void fetchImageWithTimeout(newMeal).then((cachedImage) => {
      if (!cachedImage) return;
      setMealImages(prev => ({ ...prev, [newMeal.id]: cachedImage }));
    });

    setShowMealSwapModal(false);
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
    const today = new Date().toISOString().split('T')[0];

    // Persist to backend
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/track-meal-cooked`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
      body: JSON.stringify({
        userId: user.id,
        mealId,
        date: today,
        recipeId: meal?.id || mealId,
        recipeName: meal?.name || '',
        mealCost: meal?.totalCost || 0,
        category: meal?.category || '',
        isCooked: !wasCooked,
      }),
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
    const d = new Date(preferences.shoppingDate + 'T00:00:00');
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
      days.push({
        offset: i,
        date,
        dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: date.getDate(),
        monthLabel: date.toLocaleDateString('en-US', { month: 'short' }),
        showMonthLabel: month !== prevMonth,
        hasMeals: i >= 0 && i < daysWithMeals.length,
        isToday: date.getTime() === today.getTime(),
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

  // Target nutrition based on user's goal
  const nutritionTargets = (() => {
    switch (preferences.goal) {
      case 'fitness':
        return { calories: 2200, protein: 160, carbs: 260, fats: 75 };
      case 'work':
        return { calories: 2000, protein: 120, carbs: 270, fats: 70 };
      case 'study':
      default:
        return { calories: 1850, protein: 130, carbs: 250, fats: 65 };
    }
  })();
  const targetCalories = nutritionTargets.calories;
  const targetProtein = nutritionTargets.protein;
  const targetCarbs = nutritionTargets.carbs;
  const targetFats = nutritionTargets.fats;

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
        totalCost={mealPlan.totalCost}
        onBack={() => setShoppingMode(false)}
        missingEssentials={missingEssentials}
      />
    );
  }

  // Needs Setup State - when preferences aren't complete AND no plan is loaded/incoming
  if (!hasRequiredPreferences && !loading && !checkingWizardStatus && !mealPlan && !initialSavedPlan?.meals?.length) {
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

  // Loading State (don't show if kitchen wizard is active)
  if (loading && !showKitchenWizard) {
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

  // Show kitchen wizard before meal plan is loaded
  if (showKitchenWizard) {
    return (
      <KitchenInventoryWizard
        onComplete={handleKitchenWizardComplete}
        onSkip={handleKitchenWizardSkip}
      />
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
                  className={`flex-shrink-0 w-14 flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-[#22C55E]'
                      : day.isToday
                      ? 'bg-[#142A1D] border border-[#22C55E]/50'
                      : 'hover:bg-[#142A1D]'
                  }`}
                >
                  <span className={`text-[11px] font-medium mb-0.5 ${isSelected ? 'text-[#052E16]' : 'text-[#6B7280]'}`}>
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

          {/* Budget */}
          <div className="bg-[#142A1D] rounded-2xl p-4 border border-[#1E4029]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#22C55E] text-lg">£</span>
              <span className="text-[#6B7280] text-sm">Left</span>
                          </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">£{Math.max(0, dailyBudgetLimit - dailyBudgetUsed).toFixed(2)}</span>
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

            {/* Fiber */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#9CA3AF]">Fiber</span>
                <span className="text-white">{todayNutrition.fiber}g/30g</span>
              </div>
              <div className="h-2 bg-[#1E4029] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#BBF7D0] rounded-full transition-all"
                  style={{ width: `${Math.min((todayNutrition.fiber / 30) * 100, 100)}%` }}
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
            {currentStreak > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium">
                {'\u{1F525}'} {currentStreak} day streak
              </span>
            )}
          </div>
          <button
            onClick={onReset}
            className="text-[#22C55E] text-sm font-medium hover:underline"
          >
            Edit Plan
          </button>
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
                      <span className="shrink-0">•</span>
                      <span className="shrink-0">£{meal.totalCost?.toFixed(2)}</span>
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

      </div>

      {/* Shared Bottom Navigation */}
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
              </div>
            </div>

            <div className="p-5 space-y-6">
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
                    <div key={index} className="flex items-center justify-between p-3 bg-[#142A1D] rounded-xl border border-[#1E4029]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <span className="text-white">{ingredient.name}</span>
                      </div>
                      <div className="text-sm text-[#6B7280] flex items-center gap-3">
                        <span>{ingredient.amount}</span>
                        <span className="text-[#22C55E]">£{ingredient.estimatedPrice.toFixed(2)}</span>
                      </div>
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
                  onClick={() => handleShuffleRecipe(selectedMeal.id)}
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
          goal={preferences.goal}
          currentMealIds={mealPlan.meals.map(m => m.id)}
          maxCookingTime={preferences.maxCookingTime}
          projectId={projectId}
          publicAnonKey={publicAnonKey}
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
