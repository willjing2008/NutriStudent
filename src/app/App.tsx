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
import { SubscriptionPage } from './components/SubscriptionPage';
import { NavTab } from './components/BottomNavigation';
import { supabase } from '../utils/supabaseClient';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useSubscription } from './hooks/useSubscription';
import { Apple, LogOut } from 'lucide-react';

export type EquipmentType = 'microwave' | 'hot-plate' | 'rice-cooker' | 'kettle' | 'toaster' | 'full-kitchen';

export interface UserPreferences {
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
  cookingMethods: ('one-pot' | 'microwave' | 'meal-prep')[];
  avoidIngredients: string[];
  availableEquipment: EquipmentType[];
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
  
  // Meal plan state
  const [savedPlansHistory, setSavedPlansHistory] = useState<any[]>([]);
  const [savedMealPlan, setSavedMealPlan] = useState<any>(null);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [loadingSavedPlan, setLoadingSavedPlan] = useState(false);
  
  // User preferences
  const [preferences, setPreferences] = useState<UserPreferences>({
    location: '',
    selectedStore: null,
    selectedStores: [],
    shoppingDate: '',
    mealsPerDay: 3,
    budget: 100,
    goal: null,
    maxCookingTime: 30,
    cookingMethods: [],
    avoidIngredients: [],
    availableEquipment: [],
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
        activeNavTab === 'home' || activeNavTab === 'shop' || activeNavTab === 'profile'
          ? '#0A0A0A'
          : '#0A1F13';
    }

    document.documentElement.style.setProperty('--safe-area-bg', safeAreaBg);
  }, [isAuthenticated, showAdminDashboard, isOnboarding, activeNavTab, isPro, isReady]);

  const loadSavedMealPlan = async (userId: string) => {
    setLoadingSavedPlan(true);
    try {
      // Step 1: get the list to find the most recent plan ID
      const listResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/get-meal-plans`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const listData = await listResponse.json();

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
        costPerDay: p.totalCost ? parseFloat((p.totalCost / 7).toFixed(2)) : 0,
        weeklyBudget: p.totalCost || 0,
      }));
      setSavedPlansHistory(historyItems);

      // Step 2: load the most recent plan by its ID
      const latestPlanId = listData.plans[0].planId;
      setActivePlanId(latestPlanId);
      const planResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/load-meal-plan-by-id`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId, planId: latestPlanId }),
        }
      );

      const planData = await planResponse.json();

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

  const saveMealPlan = async (mealPlan: any, planName?: string) => {
    if (!user) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/save-meal-plan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            userId: user.id,
            mealPlan,
            preferences,
            planName: planName || `Meal Plan - ${new Date().toLocaleDateString('en-GB')}`
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log('Meal plan saved successfully');
        setSavedMealPlan(mealPlan);
        const newPlanId = data.planId || Date.now().toString();
        setActivePlanId(newPlanId);

        // Add to saved plans history
        const newSavedPlan = {
          id: newPlanId,
          name: planName || `Meal Plan - ${new Date().toLocaleDateString('en-GB')}`,
          createdAt: new Date().toISOString(),
          description: `${preferences.goal || 'Custom'} plan`,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
          calories: mealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.calories || 0), 0) || 2000,
          protein: mealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.protein || 0), 0) || 100,
          costPerDay: mealPlan.dailyBudget || preferences.budget / 7,
          goal: preferences.goal || 'Custom',
          mealsPerDay: preferences.mealsPerDay || 3,
          weeklyBudget: preferences.budget || 50,
        };
        setSavedPlansHistory(prev => [newSavedPlan, ...prev]);
        
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
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/delete-meal-plan-by-id`,
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
      location: '',
      selectedStore: null,
      selectedStores: [],
      shoppingDate: '',
      mealsPerDay: 3,
      budget: 100,
      goal: null,
      maxCookingTime: 30,
      cookingMethods: [],
      avoidIngredients: [],
      availableEquipment: [],
    });
  };

  const handleNavTabChange = (tab: NavTab) => {
    setActiveNavTab(tab);
    setIsOnboarding(false);
  };

  const startOnboarding = () => {
    setIsOnboarding(true);
    setOnboardingStep(2);
  };

  // Loading State
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0A1F13] flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Apple className="w-10 h-10 text-[#22C55E] animate-pulse" />
          </div>
          <div className="text-[#9CA3AF]">Loading...</div>
        </div>
      </div>
    );
  }

  // Login Page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Mandatory Paywall — non-Pro authenticated users
  if (isAuthenticated && isReady && !isPro) {
    return <SubscriptionPage mandatory onLogout={handleLogout} />;
  }

  // Admin Dashboard
  if (showAdminDashboard) {
    return (
      <div className="min-h-screen bg-[#0A1F13]">
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
              const success = await saveMealPlan(mealPlan);
              if (success) {
                setIsOnboarding(false);
                setActiveNavTab('home');
              }
              return success;
            }}
            onNavigateHome={() => {
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
      {/* Home Tab - Meal Plans Dashboard */}
      {activeNavTab === 'home' && (
        <MealPlansDashboard
          user={user}
          savedPlans={savedPlansHistory}
          onCreateNew={startOnboarding}
          onViewPlan={() => setActiveNavTab('plan')}
          onNavigateHome={() => setActiveNavTab('home')}
          onNavigateGrocery={() => setActiveNavTab('shop')}
          onNavigateProfile={() => setActiveNavTab('profile')}
          onDeletePlan={deleteSavedMealPlanById}
          activePlan={savedMealPlan ? {
            id: activePlanId || 'active-plan',
            name: savedPlansHistory[0]?.name || 'Your Current Plan',
            description: `${preferences.goal === 'study' ? 'Study focus' : preferences.goal === 'work' ? 'Work efficiency' : 'Fitness'} meal plan`,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
            calories: savedMealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.calories || 0), 0) || 0,
            protein: savedMealPlan.meals?.reduce((sum: number, m: any) => sum + (m.nutrition?.protein || 0), 0) || 0,
            costPerDay: savedMealPlan.dailyBudget || preferences.budget / 7,
            isActive: true,
          } : null}
        />
      )}

      {/* Plan Tab - Weekly Meal Plan View */}
      {activeNavTab === 'plan' && (
        <RecommendationsStep
          preferences={preferences}
          onBack={() => setActiveNavTab('home')}
          onNext={() => setActiveNavTab('shop')}
          onReset={startOnboarding}
          onSaveMealPlan={saveMealPlan}
          onNavigateHome={() => setActiveNavTab('home')}
          activeNavTab={activeNavTab}
          onNavTabChange={handleNavTabChange}
          savedMealPlan={savedMealPlan}
        />
      )}

      {/* Shop Tab - Shopping/Grocery List */}
      {activeNavTab === 'shop' && (
        <ShoppingMode
          ingredients={uniqueIngredients}
          storeName={preferences.selectedStores[0]?.name || 'Supermarket'}
          totalCost={savedMealPlan?.totalCost || 0}
          onBack={() => setActiveNavTab('home')}
          activeNavTab={activeNavTab}
          onNavTabChange={handleNavTabChange}
        />
      )}

      {/* Profile Tab */}
      {activeNavTab === 'profile' && (
        <ProfilePage
          user={user}
          onLogout={handleLogout}
          onOpenAdmin={() => setShowAdminDashboard(true)}
          onUserUpdate={setUser}
          activeTab={activeNavTab}
          onTabChange={handleNavTabChange}
        />
      )}
    </>
  );
}
