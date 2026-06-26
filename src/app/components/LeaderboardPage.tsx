import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Trophy, Flame, RefreshCw, GraduationCap, ChefHat, Loader2, Heart, Clock, X, Users } from 'lucide-react';
import { BottomNavigation, NavTab } from './BottomNavigation';
import { authedPost } from '../utils/apiClient';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LeaderboardEntry {
  userId: string;
  name: string;
  currentStreak: number;
  rank: number;
}

interface RecipeLeaderboardEntry {
  rank: number;
  recipeId: string;
  name: string;
  category: string;
  timesCooked: number;
  creatorName: string | null;
  likesCount: number;
  likedByMe: boolean;
  image: string | null;
  nutrition: { calories: number; protein: number; carbs: number; fats: number } | null;
  cookingTime: number | null;
  servings: number | null;
  difficulty: string | null;
  description: string | null;
  ingredients: string[] | null;
  instructions: string[] | null;
}

interface LeaderboardPageProps {
  user: any;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function LeaderboardPage({ user, activeTab, onTabChange }: LeaderboardPageProps) {
  const { t } = useLanguage();
  const [view, setView] = useState<'streaks' | 'recipes'>('streaks');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [recipeLeaderboard, setRecipeLeaderboard] = useState<RecipeLeaderboardEntry[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [recipesRefreshing, setRecipesRefreshing] = useState(false);
  const [recipesHasMore, setRecipesHasMore] = useState(false);
  const [recipesTotal, setRecipesTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const recipesFetched = useRef(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeLeaderboardEntry | null>(null);
  const [togglingLike, setTogglingLike] = useState<string | null>(null);

  const PAGE_SIZE = 10;

  const schoolId = user?.user_metadata?.school_id;
  const schoolName = user?.user_metadata?.school_name;
  const currentUserId = user?.id;

  const fetchLeaderboard = useCallback(async (isRefresh = false) => {
    if (!schoolId) {
      setLoading(false);
      return;
    }

    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await authedPost<{ leaderboard?: LeaderboardEntry[] }>('leaderboard', { schoolId });
      if (data.leaderboard) {
        setLeaderboard(data.leaderboard);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const fetchRecipeLeaderboard = useCallback(async (opts: { refresh?: boolean; loadMore?: boolean } = {}) => {
    if (!schoolId) return;

    const { refresh = false, loadMore = false } = opts;

    if (refresh) {
      setRecipesRefreshing(true);
    } else if (loadMore) {
      setLoadingMore(true);
    } else {
      setRecipesLoading(true);
    }

    try {
      const offset = loadMore ? recipeLeaderboard.length : 0;
      const data = await authedPost<{ recipes?: RecipeLeaderboardEntry[]; hasMore: boolean; total: number }>(
        'recipe-leaderboard',
        { schoolId, userId: currentUserId, limit: PAGE_SIZE, offset },
      );
      if (data.recipes) {
        const newRecipes = data.recipes;
        if (loadMore) {
          setRecipeLeaderboard(prev => [...prev, ...newRecipes]);
        } else {
          setRecipeLeaderboard(newRecipes);
        }
        setRecipesHasMore(data.hasMore);
        setRecipesTotal(data.total);
      }
    } catch (err) {
      console.error('Failed to fetch recipe leaderboard:', err);
    } finally {
      setRecipesLoading(false);
      setRecipesRefreshing(false);
      setLoadingMore(false);
    }
  }, [schoolId, recipeLeaderboard.length]);

  // Fetch recipes on first tab switch
  useEffect(() => {
    if (view === 'recipes' && !recipesFetched.current) {
      recipesFetched.current = true;
      fetchRecipeLeaderboard();
    }
  }, [view, fetchRecipeLeaderboard]);

  const getCategoryEmoji = (category: string) => {
    const lower = (category || '').toLowerCase();
    if (lower.includes('breakfast')) return '🥣';
    if (lower.includes('lunch')) return '🥗';
    if (lower.includes('dinner')) return '🍽️';
    if (lower.includes('snack')) return '🍎';
    if (lower.includes('smoothie') || lower.includes('drink')) return '🥤';
    return '🍳';
  };

  const handleToggleLike = async (recipeId: string) => {
    if (!currentUserId || togglingLike) return;
    setTogglingLike(recipeId);

    try {
      const data = await authedPost<{ success: boolean; liked: boolean; likesCount: number }>(
        'toggle-community-like',
        { userId: currentUserId, recipeId },
      );
      if (data.success) {
        setRecipeLeaderboard(prev =>
          prev.map(r =>
            r.recipeId === recipeId
              ? { ...r, likedByMe: data.liked, likesCount: data.likesCount }
              : r
          )
        );
        if (selectedRecipe?.recipeId === recipeId) {
          setSelectedRecipe(prev =>
            prev ? { ...prev, likedByMe: data.liked, likesCount: data.likesCount } : prev
          );
        }
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
    } finally {
      setTogglingLike(null);
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500' };
    if (rank === 2) return { bg: 'bg-gray-300/10', border: 'border-gray-400/30', text: 'text-gray-300', badge: 'bg-gray-400' };
    if (rank === 3) return { bg: 'bg-amber-700/15', border: 'border-amber-600/30', text: 'text-amber-500', badge: 'bg-amber-600' };
    return { bg: 'bg-transparent', border: 'border-[#1E4029]', text: 'text-[#6B7280]', badge: 'bg-[#1E4029]' };
  };

  // No school set
  if (!schoolId) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
          <div className="w-16 h-16 rounded-full bg-[#1E4029] flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-[#22C55E]" />
          </div>
          <h2 className="text-white text-lg font-semibold mb-2">No School Selected</h2>
          <p className="text-[#6B7280] text-sm text-center max-w-xs">
            Set your school in your profile to see how you rank against classmates.
          </p>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <div
        className="px-5 pt-6 pb-2"
        style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top, 0px))' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold flex items-center gap-2.5">
              <Trophy className="w-6 h-6 text-yellow-400" />
              {t('leaderboard')}
            </h1>
            <p className="text-[#9CA3AF] text-sm mt-1.5 flex items-center gap-1.5 pl-0.5">
              <GraduationCap className="w-4 h-4 text-[#22C55E]/70" />
              {schoolName}
            </p>
          </div>
          <button
            onClick={() => {
              if (view === 'streaks') fetchLeaderboard(true);
              else fetchRecipeLeaderboard({ refresh: true });
            }}
            disabled={refreshing || recipesRefreshing}
            className="w-11 h-11 rounded-full bg-[#142A1D] border border-[#1E4029] flex items-center justify-center hover:bg-[#1B3324] active:scale-95 transition-all disabled:opacity-40"
          >
            <RefreshCw className={`w-5 h-5 text-[#22C55E] ${refreshing || recipesRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="px-5 pt-4 pb-5">
        <div className="flex gap-2">
          <button onClick={() => setView('streaks')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              view === 'streaks'
                ? 'bg-[#22C55E] text-[#052E16] shadow-lg shadow-[#22C55E]/20'
                : 'bg-[#141414] text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] border border-[#1E1E1E]'
            }`}>
            Streaks
          </button>
          <button onClick={() => setView('recipes')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              view === 'recipes'
                ? 'bg-[#22C55E] text-[#052E16] shadow-lg shadow-[#22C55E]/20'
                : 'bg-[#141414] text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] border border-[#1E1E1E]'
            }`}>
            Recipes
          </button>
        </div>
      </div>

      {/* Leaderboard list */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {view === 'streaks' && (
          <>
            {loading ? (
              // Skeleton loading
              <div className="space-y-2.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[68px] rounded-2xl bg-[#142A1D]/60 animate-pulse" />
                ))}
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-16 h-16 rounded-full bg-[#1E4029]/50 flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-[#22C55E]/40" />
                </div>
                <p className="text-white text-base font-medium mb-1">No Rankings Yet</p>
                <p className="text-[#6B7280] text-sm text-center max-w-[240px]">
                  No students have started cooking yet. Be the first!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {leaderboard.map((entry) => {
                  const style = getRankStyle(entry.rank);
                  const isCurrentUser = entry.userId === currentUserId;
                  const initial = (entry.name?.[0] || '?').toUpperCase();

                  return (
                    <div
                      key={entry.userId}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border transition-colors ${style.bg} ${style.border} ${
                        isCurrentUser ? 'ring-1 ring-[#22C55E]/40' : ''
                      }`}
                    >
                      {/* Rank */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          entry.rank <= 3 ? `${style.badge} text-white` : 'bg-[#1E4029] text-[#6B7280]'
                        }`}
                      >
                        {entry.rank}
                      </div>

                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                          isCurrentUser
                            ? 'bg-[#22C55E] text-[#052E16]'
                            : 'bg-[#1E4029] text-[#9CA3AF]'
                        }`}
                      >
                        {initial}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-[15px] font-medium truncate ${isCurrentUser ? 'text-[#22C55E]' : 'text-white'}`}>
                          {entry.name}
                          {isCurrentUser && <span className="text-[#6B7280] text-xs ml-1.5">(you)</span>}
                        </p>
                      </div>

                      {/* Streak */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Flame className={`w-4.5 h-4.5 ${entry.currentStreak > 0 ? 'text-orange-400' : 'text-[#6B7280]'}`} />
                        <span className={`text-[15px] font-semibold ${entry.currentStreak > 0 ? 'text-orange-400' : 'text-[#6B7280]'}`}>
                          {entry.currentStreak}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {view === 'recipes' && (
          <>
            {recipesLoading ? (
              <div className="space-y-2.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[68px] rounded-2xl bg-[#142A1D]/60 animate-pulse" />
                ))}
              </div>
            ) : recipeLeaderboard.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-16 h-16 rounded-full bg-[#1E4029]/50 flex items-center justify-center mb-4">
                  <ChefHat className="w-8 h-8 text-[#22C55E]/40" />
                </div>
                <p className="text-white text-base font-medium mb-1">No Recipes Cooked Yet</p>
                <p className="text-[#6B7280] text-sm text-center max-w-[240px]">
                  Start cooking meals to see which recipes are most popular at your school!
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {recipeLeaderboard.map((recipe) => {
                    const style = getRankStyle(recipe.rank);

                    return (
                      <button
                        key={recipe.recipeId}
                        onClick={() => setSelectedRecipe(recipe)}
                        className="text-left bg-[#141414] rounded-2xl overflow-hidden border border-[#1E1E1E] hover:border-[#2D5A3D] transition-all"
                      >
                        {/* Image area */}
                        <div className="relative h-32 bg-[#1E4029]">
                          {recipe.image ? (
                            <ImageWithFallback
                              src={recipe.image}
                              alt={recipe.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#0D1F14]">
                              <span className="text-4xl">{getCategoryEmoji(recipe.category)}</span>
                            </div>
                          )}

                          {/* Rank badge */}
                          <div className="absolute top-2 left-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              recipe.rank <= 3 ? `${style.badge} text-white` : 'bg-black/60 text-white'
                            }`}>
                              #{recipe.rank}
                            </div>
                          </div>

                          {/* Like button */}
                          <div
                            className="absolute top-2 right-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleLike(recipe.recipeId);
                            }}
                          >
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-sm text-xs font-semibold transition-all ${
                              recipe.likedByMe
                                ? 'bg-red-500/80 text-white'
                                : 'bg-black/40 text-white hover:bg-black/60'
                            }`}>
                              <Heart className={`w-3 h-3 ${recipe.likedByMe ? 'fill-current' : ''} ${togglingLike === recipe.recipeId ? 'animate-pulse' : ''}`} />
                              <span>{recipe.likesCount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <p className="text-sm font-semibold text-white truncate">{recipe.name}</p>
                          {recipe.creatorName && (
                            <p className="text-xs text-[#22C55E] mt-0.5 truncate">by {recipe.creatorName}</p>
                          )}

                          {/* Stats row */}
                          <div className="flex items-center gap-2 mt-2 text-[11px] text-[#6B7280]">
                            <div className="flex items-center gap-0.5">
                              <Flame className="w-3 h-3 text-orange-400" />
                              <span className="text-orange-400 font-semibold">{recipe.timesCooked}x</span>
                            </div>
                            {recipe.nutrition && (
                              <div className="flex items-center gap-0.5">
                                <span className="font-medium text-white">{recipe.nutrition.calories}</span> cal
                              </div>
                            )}
                            {recipe.cookingTime && (
                              <div className="flex items-center gap-0.5">
                                <Clock className="w-3 h-3" />
                                {recipe.cookingTime}m
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {recipesHasMore && (
                  <button
                    onClick={() => fetchRecipeLeaderboard({ loadMore: true })}
                    disabled={loadingMore}
                    className="w-full mt-4 py-3 rounded-2xl border border-[#1E4029] bg-[#0D1F14]/50 text-[#9CA3AF] text-sm font-medium hover:bg-[#142A1D] hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Show More ({recipesTotal - recipeLeaderboard.length} remaining)</>
                    )}
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {/* Image header */}
            <div className="relative h-56 bg-[#1E4029]">
              {selectedRecipe.image ? (
                <ImageWithFallback
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#0D1F14]">
                  <span className="text-6xl">{getCategoryEmoji(selectedRecipe.category)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
              >
                <X className="w-5 h-5" />
              </button>
              {/* Rank badge on image */}
              <div className="absolute top-4 left-4" style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  getRankStyle(selectedRecipe.rank).badge
                } text-white shadow-lg`}>
                  #{selectedRecipe.rank}
                </div>
              </div>
              {/* Title overlay */}
              <div className="absolute bottom-4 left-5 right-5">
                <h2 className="text-white text-xl font-bold">{selectedRecipe.name}</h2>
                {selectedRecipe.creatorName && (
                  <p className="text-[#22C55E] text-sm mt-1">by {selectedRecipe.creatorName}</p>
                )}
              </div>
            </div>

            <div className="px-5 py-5 space-y-5 bg-[#0A0A0A]">
              {/* Stats grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-3 text-center">
                  <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <p className="text-white text-sm font-bold">{selectedRecipe.timesCooked}</p>
                  <p className="text-[#6B7280] text-[10px]">cooked</p>
                </div>
                <div
                  className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${
                    selectedRecipe.likedByMe
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-[#141414] border-[#1E1E1E] hover:border-red-500/30'
                  }`}
                  onClick={() => handleToggleLike(selectedRecipe.recipeId)}
                >
                  <Heart className={`w-4 h-4 mx-auto mb-1 ${selectedRecipe.likedByMe ? 'text-red-500 fill-current' : 'text-[#6B7280]'} ${togglingLike === selectedRecipe.recipeId ? 'animate-pulse' : ''}`} />
                  <p className="text-white text-sm font-bold">{selectedRecipe.likesCount}</p>
                  <p className="text-[#6B7280] text-[10px]">{selectedRecipe.likedByMe ? 'liked' : 'likes'}</p>
                </div>
                {selectedRecipe.cookingTime && (
                  <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-3 text-center">
                    <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <p className="text-white text-sm font-bold">{selectedRecipe.cookingTime}</p>
                    <p className="text-[#6B7280] text-[10px]">min</p>
                  </div>
                )}
                {selectedRecipe.servings && (
                  <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-3 text-center">
                    <Users className="w-4 h-4 text-[#22C55E] mx-auto mb-1" />
                    <p className="text-white text-sm font-bold">{selectedRecipe.servings}</p>
                    <p className="text-[#6B7280] text-[10px]">servings</p>
                  </div>
                )}
              </div>

              {/* Nutrition */}
              {selectedRecipe.nutrition && (
                <div>
                  <h3 className="text-white text-sm font-semibold mb-3">Nutrition (per serving)</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-3 text-center">
                      <p className="text-white text-base font-bold">{selectedRecipe.nutrition.calories}</p>
                      <p className="text-[#6B7280] text-[10px]">cal</p>
                    </div>
                    <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-3 text-center">
                      <p className="text-white text-base font-bold">{selectedRecipe.nutrition.protein}g</p>
                      <p className="text-[#6B7280] text-[10px]">protein</p>
                    </div>
                    <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-3 text-center">
                      <p className="text-white text-base font-bold">{selectedRecipe.nutrition.carbs}g</p>
                      <p className="text-[#6B7280] text-[10px]">carbs</p>
                    </div>
                    <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-3 text-center">
                      <p className="text-white text-base font-bold">{selectedRecipe.nutrition.fats}g</p>
                      <p className="text-[#6B7280] text-[10px]">fats</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
                <div>
                  <h3 className="text-white text-sm font-semibold mb-3">Ingredients</h3>
                  <div className="bg-[#141414] border border-[#1E1E1E] rounded-xl p-4 space-y-2">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1.5 flex-shrink-0" />
                        <p className="text-[#D1D5DB] text-sm">{typeof ing === 'string' ? ing : (ing as any).name || String(ing)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions */}
              {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 && (
                <div>
                  <h3 className="text-white text-sm font-semibold mb-3">Instructions</h3>
                  <div className="space-y-3">
                    {selectedRecipe.instructions.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#22C55E] text-[#052E16] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-[#D1D5DB] text-sm flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Spacer for safe area */}
              <div className="h-6" />
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
