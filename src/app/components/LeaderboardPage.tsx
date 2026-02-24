import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Trophy, Flame, RefreshCw, GraduationCap } from 'lucide-react';
import { BottomNavigation, NavTab } from './BottomNavigation';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface LeaderboardEntry {
  userId: string;
  name: string;
  currentStreak: number;
  rank: number;
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
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
        className="px-5 pt-4 pb-3"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))' }}
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-white text-xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              {t('leaderboard')}
            </h1>
            <p className="text-[#6B7280] text-xs mt-0.5 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {schoolName}
            </p>
          </div>
          <button
            onClick={() => fetchLeaderboard(true)}
            disabled={refreshing}
            className="w-9 h-9 rounded-full bg-[#142A1D] flex items-center justify-center"
          >
            <RefreshCw className={`w-4 h-4 text-[#22C55E] ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Leaderboard list */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {loading ? (
          // Skeleton loading
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-[#142A1D] animate-pulse" />
            ))}
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Trophy className="w-12 h-12 text-[#1E4029] mb-3" />
            <p className="text-[#6B7280] text-sm text-center">
              No students have started cooking yet. Be the first!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((entry) => {
              const style = getRankStyle(entry.rank);
              const isCurrentUser = entry.userId === currentUserId;
              const initial = (entry.name?.[0] || '?').toUpperCase();

              return (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${style.bg} ${style.border} ${
                    isCurrentUser ? 'ring-1 ring-[#22C55E]/40' : ''
                  }`}
                >
                  {/* Rank */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      entry.rank <= 3 ? `${style.badge} text-white` : 'bg-[#1E4029] text-[#6B7280]'
                    }`}
                  >
                    {entry.rank}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                      isCurrentUser
                        ? 'bg-[#22C55E] text-[#052E16]'
                        : 'bg-[#1E4029] text-[#9CA3AF]'
                    }`}
                  >
                    {initial}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isCurrentUser ? 'text-[#22C55E]' : 'text-white'}`}>
                      {entry.name}
                      {isCurrentUser && <span className="text-[#6B7280] text-xs ml-1">(you)</span>}
                    </p>
                  </div>

                  {/* Streak */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Flame className={`w-4 h-4 ${entry.currentStreak > 0 ? 'text-orange-400' : 'text-[#6B7280]'}`} />
                    <span className={`text-sm font-semibold ${entry.currentStreak > 0 ? 'text-orange-400' : 'text-[#6B7280]'}`}>
                      {entry.currentStreak}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
