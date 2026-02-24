import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Trophy, Flame, RefreshCw, GraduationCap, ChefHat, Loader2 } from 'lucide-react';
import { BottomNavigation, NavTab } from './BottomNavigation';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

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
}

interface LeaderboardPageProps {
  user: any;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

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
      const res = await fetch(`${API_BASE}/leaderboard`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ schoolId }),
      });
      const data = await res.json();
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
      const res = await fetch(`${API_BASE}/recipe-leaderboard`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ schoolId, limit: PAGE_SIZE, offset }),
      });
      const data = await res.json();
      if (data.recipes) {
        if (loadMore) {
          setRecipeLeaderboard(prev => [...prev, ...data.recipes]);
        } else {
          setRecipeLeaderboard(data.recipes);
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
                <div className="space-y-2.5">
                  {recipeLeaderboard.map((recipe) => {
                    const style = getRankStyle(recipe.rank);

                    return (
                      <div
                        key={recipe.recipeId}
                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border transition-colors ${style.bg} ${style.border}`}
                      >
                        {/* Rank */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            recipe.rank <= 3 ? `${style.badge} text-white` : 'bg-[#1E4029] text-[#6B7280]'
                          }`}
                        >
                          {recipe.rank}
                        </div>

                        {/* Recipe emoji */}
                        <div className="w-10 h-10 rounded-full bg-[#1E4029] flex items-center justify-center text-xl flex-shrink-0">
                          {getCategoryEmoji(recipe.category)}
                        </div>

                        {/* Recipe name */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-medium truncate text-white">{recipe.name}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {recipe.timesCooked} {recipe.timesCooked === 1 ? 'time' : 'times'} cooked
                          </p>
                        </div>

                        {/* Times cooked badge */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <Flame className="w-4 h-4 text-orange-400" />
                          <span className="text-[15px] font-semibold text-orange-400">{recipe.timesCooked}</span>
                        </div>
                      </div>
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

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
