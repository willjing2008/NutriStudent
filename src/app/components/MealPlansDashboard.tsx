import { useLanguage } from '../hooks/useLanguage';
import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Search, Plus, ChevronRight, Check, Calendar, Sparkles, ChefHat, Flame } from 'lucide-react';
import { BottomNavigation, NavTab } from './BottomNavigation';
import { authedPost } from '../utils/apiClient';

interface MyRecipe {
  recipeId: string;
  name: string;
  category: string;
  timesCooked: number;
  lastCooked: string;
}

interface MealPlan {
  id: string;
  name: string;
  description: string;
  image: string;
  week?: number;
  calories: number;
  protein: number;
  isActive?: boolean;
  onTrack?: boolean;
  tags?: string[];
}


interface MealPlansDashboardProps {
  user: any;
  onCreateNew: () => void;
  onViewPlan: (planId: string) => void;
  onNavigateHome: () => void;
  onNavigateGrocery: () => void;
  onNavigateProfile: () => void;
  onNavTabChange?: (tab: NavTab) => void;
  activePlan?: MealPlan | null;
  savedPlans?: MealPlan[];
  onDeletePlan?: (planId: string) => Promise<void>;
  onEditPlan?: () => void;
}

export function MealPlansDashboard({
  user,
  onCreateNew,
  onViewPlan,
  onNavigateHome,
  onNavigateGrocery,
  onNavigateProfile,
  activePlan,
  savedPlans = [],
  onDeletePlan,
  onNavTabChange,
  onEditPlan,
}: MealPlansDashboardProps) {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'active' | 'saved' | 'history'>('active');

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';

  const tabs = [
    { id: 'active' as const, label: 'Active' },
    { id: 'saved' as const, label: 'Saved' },
    { id: 'history' as const, label: 'History' },
  ];

  const [savedPlansState, setSavedPlansState] = useState<any[]>(savedPlans);

  // Sync local state when the prop updates (e.g. after async load on login)
  useEffect(() => {
    setSavedPlansState(savedPlans);
  }, [savedPlans]);

  const [myRecipes, setMyRecipes] = useState<MyRecipe[]>([]);
  const [myRecipesLoading, setMyRecipesLoading] = useState(false);

  const fetchMyRecipes = useCallback(async () => {
    if (!user?.id) return;
    setMyRecipesLoading(true);
    try {
      const data = await authedPost<{ recipes?: MyRecipe[] }>('my-recipes', { userId: user.id });
      if (data.recipes) setMyRecipes(data.recipes);
    } catch (err) {
      console.error('Failed to fetch my recipes:', err);
    } finally {
      setMyRecipesLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchMyRecipes();
  }, [fetchMyRecipes]);

  const getCategoryEmoji = (category: string) => {
    const lower = (category || '').toLowerCase();
    if (lower.includes('breakfast')) return '🥣';
    if (lower.includes('lunch')) return '🥗';
    if (lower.includes('dinner')) return '🍽️';
    if (lower.includes('snack')) return '🍎';
    return '🍳';
  };

  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPlansState(prev => prev.map(p => p.id === id ? { ...p, name: renameValue } : p));
    setEditingPlanId(null);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPlansState(prev => prev.filter(p => p.id !== id));
    setEditingPlanId(null);
    if (onDeletePlan) {
      await onDeletePlan(id);
    }
  };

  const startEditing = (id: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPlanId(id);
    setRenameValue(currentName);
  };

  const handleNavTabChange = (tab: NavTab) => {
    switch (tab) {
      case 'home':
        onNavigateHome();
        break;
      case 'shop':
        onNavigateGrocery();
        break;
      case 'profile':
        onNavigateProfile();
        break;
      case 'plan':
        onViewPlan('active-plan');
        break;
      default:
        onNavTabChange?.(tab);
        break;
    }
  };

  const currentActivePlan: MealPlan | null = activePlan || null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt={userName}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <h1 className="text-xl font-bold text-white">{t("yourMealPlans")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={onCreateNew}
              className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="px-5 mb-6">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#22C55E] text-[#052E16]'
                  : 'bg-[#1A1A1A] text-[#9CA3AF] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 space-y-6">
        {/* Currently Active Section */}
        {activeTab === 'active' && !currentActivePlan && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#6B7280]" />
            </div>
            <h3 className="text-white font-semibold mb-2">No Active Plan</h3>
            <p className="text-[#6B7280] text-sm mb-6">Create a meal plan to get started</p>
            <button
              onClick={onCreateNew}
              className="px-6 py-3 bg-[#22C55E] text-[#052E16] font-bold rounded-full hover:bg-[#4ADE80] transition-colors"
            >
              Create Plan
            </button>
          </div>
        )}

        {activeTab === 'active' && currentActivePlan && (
          <>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">{t("currentlyActive")}</h2>
                <button className="text-[#22C55E] text-sm font-medium">{t("manage")}</button>
              </div>

              {/* Active Plan Card */}
              <div className="relative bg-gradient-to-br from-[#1A2A1F] to-[#0F1A14] rounded-2xl p-5 border border-[#2D5A3D]/30 min-h-[160px]">
                <div className="flex">
                  <div className="flex-1 pr-32">
                    {currentActivePlan.week && (
                      <span className="inline-block px-2.5 py-1 bg-[#22C55E] text-[#052E16] text-xs font-bold rounded-full mb-3">
                        WEEK {currentActivePlan.week}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-1">{currentActivePlan.name}</h3>
                    <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2">{currentActivePlan.description}</p>

                    {/* Stats */}
                    <div className="flex gap-2 mb-4">
                      <div className="bg-[#1A1A1A] rounded-xl px-3 py-2">
                        <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">{t("calories")}</div>
                        <div className="text-white font-bold">{currentActivePlan.calories.toLocaleString()}</div>
                      </div>
                      <div className="bg-[#1A1A1A] rounded-xl px-3 py-2">
                        <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">{t("protein")}</div>
                        <div className="text-[#22C55E] font-bold">{currentActivePlan.protein}g</div>
                      </div>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center justify-between">
                      {currentActivePlan.onTrack && (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#052E16]" />
                          </div>
                          <span className="text-[#9CA3AF] text-sm">{t("onTrackToday")}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {onEditPlan && (
                          <button
                            onClick={onEditPlan}
                            className="flex items-center gap-1 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#9CA3AF] text-sm font-medium px-4 py-2 rounded-full transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => onViewPlan(currentActivePlan.id)}
                          className="flex items-center gap-1 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Plan Image */}
                  <div className="absolute top-5 right-5 w-28 h-28 rounded-xl overflow-hidden shadow-lg shadow-black/20 rotate-3 border-2 border-[#2D5A3D]/20">
                    <img
                      src={currentActivePlan.image}
                      alt={currentActivePlan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Create New Plan Button */}
            <button
              onClick={onCreateNew}
              className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-2xl p-5 hover:from-[#4ADE80] hover:to-[#22C55E] transition-all shadow-lg shadow-[#22C55E]/20 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-white font-bold text-lg">{t("createNewPlan")}</h4>
                <p className="text-white/70 text-sm">{t("aiPowered")}</p>
              </div>
              <Plus className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Saved Plans Section */}
        {(activeTab === 'active' || activeTab === 'saved') && (
          <div>
            <h2 className="text-white font-semibold mb-4">{t("savedPlans")}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-5 px-5">
              {savedPlansState.length === 0 ? (
              <div className="w-full text-center py-8">
                <p className="text-[#6B7280] text-sm">{t("noSavedPlans")}</p>
              </div>
            ) : savedPlansState.map((plan) => (
                <div key={plan.id} className="relative flex-shrink-0 w-48 group">
                   <button onClick={() => onViewPlan(plan.id)} className="w-full text-left">
                     <div className="w-48 h-32 rounded-2xl overflow-hidden mb-3 relative">
                       <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                     </div>
                     <h4 className="text-white font-semibold text-sm mb-1">{plan.name}</h4>
                     <p className="text-[#6B7280] text-xs mb-1 line-clamp-1">{plan.description}</p>
                     {plan.createdAt && (
                       <p className="text-[#4B5563] text-[10px] mb-2">
                         Created: {new Date(plan.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                       </p>
                     )}
                     
                     <div className="flex flex-wrap gap-1 mb-2">
                       {plan.goal && <span className="text-[10px] px-2 py-0.5 bg-[#1A1A1A] text-[#9CA3AF] rounded-full border border-[#2D2D2D]">{plan.goal}</span>}
                     </div>
                   </button>
                   
                   <button
                     onClick={(e) => startEditing(plan.id, plan.name, e)}
                     className="absolute top-2 right-2 p-2.5 bg-black/60 backdrop-blur-md rounded-full text-white shadow-lg hover:bg-black/80 hover:scale-110 transition-all"
                   >
                     <Edit2 className="w-4 h-4" />
                   </button>

                   {editingPlanId === plan.id && (
                     <div className="absolute inset-0 bg-[#1A1A1A] rounded-2xl p-3 flex flex-col justify-center gap-2 z-10 border border-[#2D2D2D]">
                       <input 
                         autoFocus
                         value={renameValue}
                         onChange={(e) => setRenameValue(e.target.value)}
                         onClick={(e) => e.stopPropagation()}
                         className="bg-[#0A0A0A] text-white text-sm rounded px-2 py-1 border border-[#2D2D2D] outline-none focus:border-[#22C55E] w-full"
                       />
                       <div className="flex gap-2">
                         <button onClick={(e) => handleRename(plan.id, e)} className="flex-1 bg-[#22C55E] text-[#052E16] text-xs font-bold py-1 rounded">{t("save")}</button>
                         <button onClick={(e) => { e.stopPropagation(); setEditingPlanId(null); }} className="flex-1 bg-[#2D2D2D] text-white text-xs py-1 rounded">{t("cancel")}</button>
                       </div>
                       <button onClick={(e) => handleDelete(plan.id, e)} className="w-full bg-red-500/20 text-red-400 text-xs py-1.5 rounded mt-2 hover:bg-red-500/30 transition-colors">{t("deletePlan")}</button>
                     </div>
                   )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Recipes Section */}
        {activeTab === 'active' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <ChefHat className="w-4.5 h-4.5 text-[#22C55E]" />
                My Recipes
              </h2>
              {myRecipes.length > 0 && (
                <span className="text-[#6B7280] text-xs">{myRecipes.length} recipe{myRecipes.length !== 1 ? 's' : ''}</span>
              )}
            </div>

            {myRecipesLoading ? (
              <div className="space-y-2.5">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-2xl bg-[#1A1A1A] animate-pulse" />
                ))}
              </div>
            ) : myRecipes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#2D2D2D] bg-[#111111] py-8 px-4 text-center">
                <ChefHat className="w-8 h-8 text-[#3D3D3D] mx-auto mb-2.5" />
                <p className="text-[#6B7280] text-sm font-medium mb-1">No custom recipes yet</p>
                <p className="text-[#4B5563] text-xs">Swap a meal in your plan and choose "Create Your Own" to add one</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {myRecipes.map((recipe) => (
                  <div
                    key={recipe.recipeId}
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-[#111111] border border-[#1E1E1E]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1A2A1F] flex items-center justify-center text-xl flex-shrink-0">
                      {getCategoryEmoji(recipe.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium truncate text-white">{recipe.name}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {recipe.timesCooked} {recipe.timesCooked === 1 ? 'time' : 'times'} cooked
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-semibold text-orange-400">{recipe.timesCooked}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab Content */}
        {activeTab === 'history' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#6B7280]" />
            </div>
            <h3 className="text-white font-semibold mb-2">No History Yet</h3>
            <p className="text-[#6B7280] text-sm">Your completed meal plans will appear here</p>
          </div>
        )}
      </div>

      {/* Shared Bottom Navigation */}
      <BottomNavigation activeTab="home" onTabChange={handleNavTabChange} />
    </div>
  );
}
