import React, { useState, useEffect } from 'react';
import { WelcomeStep } from './components/WelcomeStep';
import { LocationStep } from './components/LocationStep';
import { PreferencesStep } from './components/PreferencesStep';
import { RecommendationsStep } from './components/RecommendationsStep';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { MealPlansDashboard } from './components/MealPlansDashboard';
import { ShoppingMode } from './components/ShoppingMode';
import { ProfilePage } from './components/ProfilePage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { NetworkStatusBanner } from './components/NetworkStatusBanner';
import { NavTab } from './components/BottomNavigation';
import { supabase } from '../utils/supabaseClient';
import { authedPost } from './utils/apiClient';
import { useSubscription } from './hooks/useSubscription';
import { useAcademicCalendar } from './hooks/useAcademicCalendar';
import { Apple, LogOut } from 'lucide-react';
import { Gender } from './utils/nutritionTargets';

export type { Gender } from './utils/nutritionTargets';

export interface MealTimes {
  breakfast: string; // "08:00" (24h)
  lunch: string;     // "12:00"
  dinner: string;    // "18:00"
}

export interface UserPreferences {
  gender: Gender;
  location: string;
  selectedStore: {
    id: string;
    name: string;
    distance: string;
    address: string;
  } | null;
  selectedStores: Array<{
    id: string;
    name: string;
    distance: string;
    address: string;
  }>;
  shoppingDate: string;
  mealsPerDay: number;
  budget: number;
  goal: 'study' | 'work' | 'fitness' | null;
  maxCookingTime: number;
  avoidIngredients: string[];
  dietaryRestrictions: string[];
  mealTimes: MealTimes;
  selectedMealSlots: ('breakfast' | 'lunch' | 'dinner')[];
}

export default function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Navigation state
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);

  // RevenueCat subscription
  const { identify: rcIdentify, reset: rcReset, isPro, isReady } = useSubscription();

  // Academic calendar + recipe queue
  const calendar = useAcademicCalendar();

  // Meal plan state
  const [savedPlansHistory, setSavedPlansHistory] = useState<any[]>([]);
  const [savedMealPlan, setSavedMealPlan] = useState<any>(null);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [loadingSavedPlan, setLoadingSavedPlan] = useState(false);
  
  // User preferences
  const [preferences, setPreferences] = useState<UserPreferences>({
    gender: null,
    location: '',
    selectedStore: null,
    selectedStores: [],
    shoppingDate: '',
    mealsPerDay: 3,
    budget: 100,
    goal: null,
    maxCookingTime: 30,
    avoidIngredients: [],
    dietaryRestrictions: [],
    mealTimes: { breakfast: '08:00', lunch: '12:00', dinner: '18:00' },
    selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
  });

  // Shopping list ingredients (derived from meal plan)
  const shoppingIngredients = savedMealPlan?.meals?.flatMap((meal: any) => 
    meal.ingredients?.map((ing: any) => ({
      ...ing,
      checked: false,
    })) || []
  ) || [];

  // Remove duplicate ingredients
  const uniqueIngredients = shoppingIngredients.reduce((acc: any[], ingredient: any) => {
    const existing = acc.find((i: any) => i.name === ingredient.name);
    if (!existing) {
      acc.push(ingredient);
    }
    return acc;
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && session.user) {
          setIsAuthenticated(true);
          setUser(session.user);
          setAccessToken(session.access_token);
          loadSavedMealPlan(session.user.id);
          calendar.initCalendar(session.user.id, preferences.mealTimes);

          // Restore gender from user_metadata if available
          if (session.user.user_metadata?.gender) {
            setPreferences(prev => ({
              ...prev,
              gender: prev.gender || session.user.user_metadata.gender,
            }));
          }

          // Identify returning user with RevenueCat
          try {
            await rcIdentify(session.user.id);
          } catch (err) {
            console.error('RevenueCat identify failed:', err);
          }
        }
      } catch (err) {
        console.error('Error checking session:', err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (checkingAuth) {
      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [
    checkingAuth,
    isAuthenticated,
    showAdminDashboard,
    isOnboarding,
    onboardingStep,
    activeNavTab,
  ]);

  useEffect(() => {
    let safeAreaBg = '#0A1F13';

    if (isAuthenticated && isReady && !isPro) {
      // Mandatory paywall screen
      safeAreaBg = '#0A0A0A';
    } else if (isAuthenticated && !showAdminDashboard && !isOnboarding) {
      safeAreaBg =
        activeNavTab === 'home' || activeNavTab === 'shop' || activeNavTab === 'leaderboard' || activeNavTab === 'profile'
          ? '#0A0A0A'
          : '#0A1F13';
    }

    document.documentElement.style.setProperty('--safe-area-bg', safeAreaBg);
  }, [isAuthenticated, showAdminDashboard, isOnboarding, activeNavTab, isPro, isReady]);

  // Persist gender selection to user_metadata
  useEffect(() => {
    if (!user?.id || preferences.gender === null) return;

    authedPost('auth/update-profile', {
      userId: user.id,
      gender: preferences.gender,
    }).catch(err => console.error('Failed to persist gender:', err));
  }, [preferences.gender, user?.id]);

  const loadSavedMealPlan = async (userId: string) => {
    setLoadingSavedPlan(true);
    try {
      // Step 1: get the list to find the most recent plan ID
      const listData = await authedPost<{ plans?: any[] }>('get-meal-plans', { userId });

      if (!listData.plans?.length) {
        console.log('No saved meal plans found');
        return;
      }

      // Populate the saved plans history for the home screen
      const historyItems = listData.plans.map((p: any) => ({
        id: p.planId,
        name: p.planName,
        createdAt: p.savedAt,
        description: 'Saved meal plan',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        calories: 0,
        protein: 0,
      }));
      setSavedPlansHistory(historyItems);

      // Step 2: load the most recent plan by its ID
      const latestPlanId = listData.plans[0].planId;
      setActivePlanId(latestPlanId);
      const planData = await authedPost<{ mealPlan?: any; preferences?: any }>(
        'load-meal-plan-by-id',
        { userId, planId: latestPlanId },
      );

      if (planData.mealPlan) {
        console.log('Found saved meal plan');
        setSavedMealPlan(planData.mealPlan);
        if (planData.preferences) {
          setPreferences(planData.preferences);
          // Enrich plan metadata with goal from preferences
          setSavedPlansHistory(prev => prev.map((p, i) =>
            i === 0 ? { ...p, goal: planData.preferences.goal, description: `${planData.preferences.goal || 'Custom'} plan` } : p
          ));
        }
      }
    } catch (err) {
      console.error('Error loading saved meal plan:', err);
    } finally {
      setLoadingSavedPlan(false);
    }
  };

  const saveMealPlan = async (mealPlan: any, planName?: string, replacePlanId?: string | null) => {
    if (!user) return;

    try {
      // If replacing an existing plan, delete it first
      if (replacePlanId) {
        await deleteSavedMealPlanById(replacePlanId);
      }

      const data = await authedPost<{ success?: boolean; planId?: string }>('save-meal-plan', {
        userId: user.id,
        mealPlan,
        preferences,
        planName: planName || `Meal Plan - ${new Date().toLocaleDateString('en-GB')}`,
      });

      if (data.success) {
        console.log('Meal plan saved successfully');
        setSavedMealPlan(mealPlan);
        const newPlanId = data.planId || Date.now().toString();
        setActivePlanId(newPlanId);

        const planEntry = {
          id: newPlanId,
          name: planName || `Meal Plan - ${new Date().toLocaleDateString('en-GB')}`,
          createdAt: new Date().toISOString(),
          description: `${preferences.goal || 'Custom'} plan`,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
          calories: mealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.calories || 0), 0) || 2000,
          protein: mealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.protein || 0), 0) || 100,
          goal: preferences.goal || 'Custom',
          mealsPerDay: preferences.mealsPerDay || 3,
        };
        setSavedPlansHistory(prev => [planEntry, ...prev]);

        return true;
      }
      return false;
    } catch (err) {
      console.error('Error saving meal plan:', err);
      return false;
    }
  };

  const deleteSavedMealPlanById = async (planId: string) => {
    if (!user) return;

    try {
      const data = await authedPost<{ success?: boolean }>('delete-meal-plan-by-id', {
        userId: user.id,
        planId,
      });

      if (data.success) {
        console.log('Meal plan deleted successfully:', planId);
        setSavedPlansHistory(prev => prev.filter(p => p.id !== planId));
        if (planId === activePlanId) {
          setSavedMealPlan(null);
          setActivePlanId(null);
        }
      }
    } catch (err) {
      console.error('Error deleting meal plan:', err);
    }
  };

  const handleLoginSuccess = async (loggedInUser: any, token: string) => {
    setIsAuthenticated(true);
    setUser(loggedInUser);
    setAccessToken(token);
    setActiveNavTab('home');
    setIsOnboarding(false);
    loadSavedMealPlan(loggedInUser.id);
    calendar.initCalendar(loggedInUser.id, preferences.mealTimes);

    // Restore gender from user_metadata if available
    if (loggedInUser.user_metadata?.gender) {
      setPreferences(prev => ({
        ...prev,
        gender: prev.gender || loggedInUser.user_metadata.gender,
      }));
    }

    // Identify user with RevenueCat
    try {
      await rcIdentify(loggedInUser.id);
    } catch (err) {
      console.error('RevenueCat identify failed:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    // Reset RevenueCat identity
    try {
      await rcReset();
    } catch (err) {
      console.error('RevenueCat reset failed:', err);
    }

    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
    setShowAdminDashboard(false);
    setSavedMealPlan(null);
    setSavedPlansHistory([]);
    setActivePlanId(null);
    setActiveNavTab('home');
    setIsOnboarding(false);
    resetPreferences();
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const resetPreferences = () => {
    setPreferences({
      gender: null,
      location: '',
      selectedStore: null,
      selectedStores: [],
      shoppingDate: '',
      mealsPerDay: 3,
      budget: 100,
      goal: null,
      maxCookingTime: 30,
      avoidIngredients: [],
      dietaryRestrictions: [],
      mealTimes: { breakfast: '08:00', lunch: '12:00', dinner: '18:00' },
      selectedMealSlots: ['breakfast', 'lunch', 'dinner'],
    });
  };

  const handleNavTabChange = (tab: NavTab) => {
    setActiveNavTab(tab);
    setIsOnboarding(false);
  };

  const startOnboarding = (createNew = false) => {
    if (createNew) {
      setActivePlanId(null);
      setSavedMealPlan(null);
    }
    setIsOnboarding(true);
    setOnboardingStep(2);
  };

  // Loading State
  if (checkingAuth) {
    return (
      <>
        <NetworkStatusBanner />
        <div className="min-h-screen bg-[#0A1F13] flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Apple className="w-10 h-10 text-[#22C55E] animate-pulse" />
            </div>
            <div className="text-[#9CA3AF]">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  // Login Page
  if (!isAuthenticated) {
    return (
      <>
        <NetworkStatusBanner />
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  // Mandatory Paywall — non-Pro authenticated users
  if (isAuthenticated && isReady && !isPro) {
    return (
      <>
        <NetworkStatusBanner />
        <SubscriptionPage mandatory onLogout={handleLogout} />
      </>
    );
  }

  // Admin Dashboard
  if (showAdminDashboard) {
    return (
      <div className="min-h-screen bg-[#0A1F13]">
        <NetworkStatusBanner />
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between bg-[#142A1D] rounded-2xl p-4 border border-[#1E4029]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAdminDashboard(false)}
                className="px-4 py-2 bg-[#1E4029] text-white rounded-xl hover:bg-[#2D5A3D] transition-colors text-sm font-medium flex items-center gap-2"
              >
                ← Back to App
              </button>
              <div className="text-xl font-bold text-white">Recipe Database Admin</div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
          <AdminDashboard />
        </div>
      </div>
    );
  }

  // Onboarding Flow (Creating new meal plan)
  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-[#0A1F13]">
        <NetworkStatusBanner />
        {onboardingStep === 1 && (
          <WelcomeStep 
            onNext={() => setOnboardingStep(2)} 
            onBack={() => {
              setIsOnboarding(false);
              setActiveNavTab('home');
            }}
          />
        )}
        {onboardingStep === 2 && (
          <PreferencesStep
            preferences={preferences}
            updatePreferences={updatePreferences}
            onNext={() => setOnboardingStep(3)}
            onBack={() => {
              setIsOnboarding(false);
              setActiveNavTab('home');
            }}
          />
        )}
        {onboardingStep === 3 && (
          <RecommendationsStep
            preferences={preferences}
            onBack={() => setOnboardingStep(2)}
            onNext={() => setOnboardingStep(4)}
            onReset={() => {
              resetPreferences();
              setOnboardingStep(2);
            }}
            onSaveMealPlan={async (mealPlan) => {
              const success = await saveMealPlan(mealPlan, undefined, activePlanId);
              if (success) {
                setIsOnboarding(false);
                setActiveNavTab('home');
              }
              return success;
            }}
            onDeletePlan={deleteSavedMealPlanById}
            activePlanId={activePlanId}
            onNavigateHome={() => {
              setIsOnboarding(false);
              setActiveNavTab('home');
            }}
            onDiscard={() => {
              setIsOnboarding(false);
              setActiveNavTab('home');
            }}
          />
        )}
        {onboardingStep === 4 && (
          <LocationStep
            preferences={preferences}
            updatePreferences={updatePreferences}
            onNext={() => {
              setIsOnboarding(false);
              setActiveNavTab('shop');
            }}
            onBack={() => setOnboardingStep(3)}
          />
        )}
      </div>
    );
  }

  // Main App with Tab Navigation
  return (
    <>
      <NetworkStatusBanner />
      {/* Home Tab - Meal Plans Dashboard */}
      {activeNavTab === 'home' && (
        <MealPlansDashboard
          user={user}
          savedPlans={savedPlansHistory}
          onCreateNew={() => startOnboarding(true)}
          onViewPlan={() => setActiveNavTab('plan')}
          onNavigateHome={() => setActiveNavTab('home')}
          onNavigateGrocery={() => setActiveNavTab('shop')}
          onNavigateProfile={() => setActiveNavTab('profile')}
          onNavTabChange={handleNavTabChange}
          onDeletePlan={deleteSavedMealPlanById}
          activePlan={savedMealPlan ? {
            id: activePlanId || 'active-plan',
            name: savedPlansHistory[0]?.name || 'Your Current Plan',
            description: `${preferences.goal === 'study' ? 'Study focus' : preferences.goal === 'work' ? 'Work efficiency' : 'Fitness'} meal plan`,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
            calories: savedMealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.calories || 0), 0) || 0,
            protein: savedMealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.protein || 0), 0) || 0,
            isActive: true,
          } : null}
          onEditPlan={() => startOnboarding()}
        />
      )}

      {/* Plan Tab - Weekly Meal Plan View */}
      {activeNavTab === 'plan' && (
        <RecommendationsStep
          preferences={preferences}
          onBack={() => setActiveNavTab('home')}
          onNext={() => setActiveNavTab('shop')}
          onReset={startOnboarding}
          onSaveMealPlan={(mealPlan) => saveMealPlan(mealPlan, undefined, activePlanId)}
          onDeletePlan={deleteSavedMealPlanById}
          activePlanId={activePlanId}
          onNavigateHome={() => setActiveNavTab('home')}
          activeNavTab={activeNavTab}
          onNavTabChange={handleNavTabChange}
          savedMealPlan={savedMealPlan}
          // Calendar + queue props
          academicSchedule={calendar.schedule}
          recipeQueue={calendar.recipeQueue}
          currentWeekMealPlan={calendar.currentWeekMealPlan}
          isTestingPeriod={calendar.isTestingPeriod}
          mealConflicts={calendar.mealConflicts}
          queueShoppingList={calendar.queueShoppingList}
          weekConflicts={calendar.weekConflicts}
          onSaveSchedule={calendar.saveSchedule}
          onGenerateQueue={calendar.generateQueue}
          onSwapQueueMeal={calendar.swapQueueMeal}
          onMarkMealConsumed={calendar.markMealConsumed}
          onCheckQueueTestingChange={calendar.checkQueueTestingChange}
          onSaveMealTimeOverride={calendar.saveMealTimeOverride}
          onRemoveMealTimeOverride={calendar.removeMealTimeOverride}
          onUpdatePreferences={updatePreferences}
        />
      )}

      {/* Shop Tab - Shopping/Grocery List */}
      {activeNavTab === 'shop' && (
        <ShoppingMode
          ingredients={
            calendar.recipeQueue && calendar.queueShoppingList?.length
              ? calendar.queueShoppingList
              : savedMealPlan ? uniqueIngredients : []
          }
          storeName={preferences.selectedStores[0]?.name || 'Supermarket'}
          onBack={() => setActiveNavTab('home')}
          activeNavTab={activeNavTab}
          onNavTabChange={handleNavTabChange}
        />
      )}

      {/* Leaderboard Tab */}
      {activeNavTab === 'leaderboard' && (
        <LeaderboardPage
          user={user}
          activeTab={activeNavTab}
          onTabChange={handleNavTabChange}
        />
      )}

      {/* Profile Tab */}
      {activeNavTab === 'profile' && (
        <ProfilePage
          user={user}
          onLogout={handleLogout}
          onOpenAdmin={() => setShowAdminDashboard(true)}
          onUserUpdate={(updatedUser) => {
            setUser(updatedUser);
            if (updatedUser.user_metadata?.gender !== undefined) {
              setPreferences(prev => ({ ...prev, gender: updatedUser.user_metadata.gender }));
            }
          }}
          activeTab={activeNavTab}
          onTabChange={handleNavTabChange}
        />
      )}
    </>
  );
}
