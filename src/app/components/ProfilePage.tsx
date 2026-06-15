import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useSubscription } from '../hooks/useSubscription';
import { LogOut, Settings, Bell, Shield, HelpCircle, ChevronRight, Moon, Globe, Crown, Pencil, Search, GraduationCap, Check, Loader2, X, Plus, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BottomNavigation, NavTab } from './BottomNavigation';
import { ACHIEVEMENTS } from '../constants/achievements';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { authedPost } from '../utils/apiClient';
import { Gender } from '../utils/nutritionTargets';

interface ProfilePageProps {
  user: any;
  onLogout: () => void;
  onOpenAdmin: () => void;
  onUserUpdate: (user: any) => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

interface UserStats {
  plansCreated: number;
  mealsLogged: number;
  moneySaved: number;
  currentStreak: number;
  longestStreak: number;
  earnedBadges: string[];
  uniqueRecipes: number;
  totalCookingDays: number;
}

interface School {
  id: string;
  name: string;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019`;
// Anon-key headers, used only for the genuinely public schools/search endpoint.
// Authenticated calls go through authedPost (session JWT).
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

export function ProfilePage({ user, onLogout, onOpenAdmin, onUserUpdate, activeTab, onTabChange }: ProfilePageProps) {
  const { language, setLanguage, t } = useLanguage();
  const { showCustomerCenter, isPro } = useSubscription();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';
  const userEmail = user?.email || 'student@university.ac.uk';
  const isAdmin = user?.app_metadata?.role === 'admin';

  useEffect(() => {
    if (!user?.id) {
      setLoadingStats(false);
      return;
    }

    authedPost<UserStats>('user-stats', { userId: user.id })
      .then(data => {
        setStats(data);
      })
      .catch(err => {
        console.error('Failed to load user stats:', err);
      })
      .finally(() => setLoadingStats(false));
  }, [user?.id]);

  interface SettingsItem {
    icon: LucideIcon;
    label: string;
    value?: string;
    action: () => void;
  }

  const settingsGroups: { title: string; items: SettingsItem[] }[] = [
    {
      title: t('preferences'),
      items: [
        { icon: Bell, label: t('notifications'), value: 'On', action: () => {} },
        { icon: Globe, label: t('language'), value: language === 'zh-CN' ? '中文' : 'English', action: () => setShowLanguageModal(true) },
        { icon: Moon, label: t('darkMode'), value: 'On', action: () => {} },
      ],
    },
    {
      title: t('account'),
      items: [
        { icon: Crown, label: t('billing'), action: showCustomerCenter },
        { icon: Shield, label: t('privacySecurity'), action: () => {} },
        // Admin Dashboard entry is only shown to admins. This is cosmetic —
        // the backend remains the real authorization gate.
        ...(isAdmin ? [{ icon: Settings, label: t('adminDashboard'), action: onOpenAdmin }] : []),
        { icon: HelpCircle, label: t('helpSupport'), action: () => {} },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="px-5 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

        {/* User Card */}
        <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2D2D2D]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt={userName}
                className="w-14 h-14 rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{userName}</h2>
                {isPro && (
                  <span className="px-2 py-0.5 bg-[#22C55E]/20 border border-[#22C55E]/50 rounded-full text-[10px] font-bold text-[#22C55E] uppercase flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Pro
                  </span>
                )}
              </div>
              <p className="text-[#6B7280] text-sm">{userEmail}</p>
              {user?.user_metadata?.school_name && (
                <p className="text-[#6B7280] text-xs mt-0.5">{user.user_metadata.school_name}</p>
              )}
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="p-2 bg-[#2D2D2D] rounded-full hover:bg-[#3D3D3D] transition-colors"
            >
              <Pencil className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-[#2D2D2D]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#22C55E]">
                {loadingStats ? '...' : stats?.plansCreated ?? 0}
              </div>
              <div className="text-xs text-[#6B7280]">Plans Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {loadingStats ? '...' : stats?.mealsLogged ?? 0}
              </div>
              <div className="text-xs text-[#6B7280]">Meals Logged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {loadingStats ? '...' : `\u00A3${stats?.moneySaved ?? 0}`}
              </div>
              <div className="text-xs text-[#6B7280]">Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div className="px-5 mb-6">
        <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2D2D2D]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <span className="text-2xl">{'\u{1F525}'}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  {loadingStats ? '...' : stats?.totalCookingDays ?? 0}
                </span>
                <span className="text-[#6B7280] text-sm">
                  {(stats?.totalCookingDays ?? 0) === 1 ? 'day' : 'days'} cooked
                </span>
              </div>
              <p className="text-[#6B7280] text-xs mt-0.5">
                Best streak: {loadingStats ? '...' : stats?.longestStreak ?? 0} {(stats?.longestStreak ?? 0) === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="px-5 mb-6">
        <h3 className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider mb-3 px-1">
          Achievements
        </h3>
        <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#2D2D2D]">
          <div className="grid grid-cols-4 gap-3">
            {ACHIEVEMENTS.map((achievement) => {
              const isEarned = stats?.earnedBadges?.includes(achievement.id) ?? false;
              return (
                <div
                  key={achievement.id}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                    isEarned
                      ? 'bg-[#22C55E]/20 border-[#22C55E]/50'
                      : 'bg-[#2D2D2D]/30 border-[#2D2D2D] opacity-40 grayscale'
                  }`}
                >
                  <span className="text-2xl mb-1">{achievement.icon}</span>
                  <span className="text-[10px] text-white font-medium text-center leading-tight">
                    {achievement.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="px-5 space-y-6">
        {settingsGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider mb-3 px-1">
              {group.title}
            </h3>
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#2D2D2D] overflow-hidden">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`w-full flex items-center gap-4 p-4 hover:bg-[#222222] transition-colors ${
                      index !== group.items.length - 1 ? 'border-b border-[#2D2D2D]' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#9CA3AF]" />
                    </div>
                    <span className="flex-1 text-white text-left">{item.label}</span>
                    {item.value && (
                      <span className="text-[#6B7280] text-sm mr-2">{item.value}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-[#4B4B4B]" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 font-medium hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('signOut')}
        </button>

        {/* App Version */}
        <div className="text-center pb-4">
          <p className="text-[#4B4B4B] text-xs">NutriStudent v1.0.0</p>
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-[#1A1A1A] w-full max-w-md rounded-t-3xl p-6 pb-10">
            <h3 className="text-white font-bold text-lg mb-6 text-center">{t('language')}</h3>
            <div className="space-y-3">
              <button
                onClick={() => { setLanguage('en'); setShowLanguageModal(false); }}
                className={`w-full p-4 rounded-xl flex items-center justify-between ${language === 'en' ? 'bg-[#22C55E]/20 border border-[#22C55E]' : 'bg-[#2D2D2D]'}`}
              >
                <span className="text-white font-medium">English</span>
                {language === 'en' && <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center"><span className="text-[#052E16] text-xs">✓</span></div>}
              </button>
              <button
                onClick={() => { setLanguage('zh-CN'); setShowLanguageModal(false); }}
                className={`w-full p-4 rounded-xl flex items-center justify-between ${language === 'zh-CN' ? 'bg-[#22C55E]/20 border border-[#22C55E]' : 'bg-[#2D2D2D]'}`}
              >
                <span className="text-white font-medium">简体中文</span>
                {language === 'zh-CN' && <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center"><span className="text-[#052E16] text-xs">✓</span></div>}
              </button>
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full mt-6 p-3 bg-[#2D2D2D] text-white rounded-xl font-medium"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditProfile(false)}
          onSave={(updatedUser) => {
            onUserUpdate(updatedUser);
            setShowEditProfile(false);
          }}
        />
      )}

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}

const GENDER_OPTIONS: { id: Gender; name: string }[] = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'decline', name: 'Decline to Answer' },
];

function EditProfileModal({ user, onClose, onSave }: { user: any; onClose: () => void; onSave: (user: any) => void }) {
  const [name, setName] = useState(user?.user_metadata?.name || '');
  const [gender, setGender] = useState<Gender>(user?.user_metadata?.gender || null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(
    user?.user_metadata?.school_id
      ? { id: user.user_metadata.school_id, name: user.user_metadata.school_name }
      : null
  );
  const [schoolSearch, setSchoolSearch] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [searching, setSearching] = useState(false);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [addingSchool, setAddingSchool] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const searchSchools = React.useCallback(async (query: string) => {
    setSearching(true);
    try {
      const res = await fetch(`${API_BASE}/schools/search?q=${encodeURIComponent(query)}`, { headers: API_HEADERS });
      const data = await res.json();
      setSchools(data.schools || []);
    } catch {
      setSchools([]);
    } finally {
      setSearching(false);
    }
  }, []);

  React.useEffect(() => {
    searchSchools('');
  }, [searchSchools]);

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchSchools(schoolSearch), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [schoolSearch, searchSchools]);

  const handleAddSchool = async () => {
    if (!newSchoolName.trim()) return;
    setAddingSchool(true);
    setError(null);
    try {
      const data = await authedPost<{ school: School }>('schools', { name: newSchoolName.trim() });
      setSelectedSchool(data.school);
      setNewSchoolName('');
      setShowAddSchool(false);
      searchSchools(schoolSearch);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingSchool(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const body: Record<string, any> = {};
      if (name.trim() !== (user?.user_metadata?.name || '')) {
        body.name = name.trim();
      }
      if (gender !== (user?.user_metadata?.gender || null)) {
        body.gender = gender;
      }
      if (selectedSchool && selectedSchool.id !== user?.user_metadata?.school_id) {
        body.school_id = selectedSchool.id;
        body.school_name = selectedSchool.name;
      }

      if (Object.keys(body).length === 0) {
        onClose();
        return;
      }

      body.userId = user.id;

      await authedPost<{ success?: boolean }>('auth/update-profile', body);

      // Merge updated metadata back into user object
      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...(body.name !== undefined && { name: body.name }),
          ...(body.gender !== undefined && { gender: body.gender }),
          ...(body.school_id !== undefined && { school_id: body.school_id, school_name: body.school_name }),
        },
      };
      onSave(updatedUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-t-3xl p-6 pb-10 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">Edit Profile</h3>
          <button onClick={onClose} className="p-1 text-[#9CA3AF] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-5">
          {/* Error */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-[#2D2D2D] border border-[#3D3D3D] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Gender</label>
            <div className="space-y-2">
              {GENDER_OPTIONS.map((option) => {
                const isSelected = gender === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setGender(option.id)}
                    className={`w-full p-3 rounded-xl transition-all flex items-center justify-between text-sm ${
                      isSelected
                        ? 'bg-[#22C55E]/10 border border-[#22C55E] text-white'
                        : 'bg-[#2D2D2D] border border-[#3D3D3D] text-[#D1D5DB] hover:border-[#22C55E]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#22C55E] shrink-0" />
                      <span>{option.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#22C55E] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* School */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#9CA3AF]">School</label>
              <button
                onClick={() => setShowAddSchool(!showAddSchool)}
                className="flex items-center gap-1 text-xs text-[#22C55E] hover:text-[#4ADE80] transition-colors"
              >
                {showAddSchool ? (
                  <>
                    <Search className="w-3 h-3" />
                    Search instead
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    Add new
                  </>
                )}
              </button>
            </div>

            {showAddSchool ? (
              /* Add new school view */
              <div className="space-y-3">
                <p className="text-[#6B7280] text-xs">Can't find your school? Add it here.</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSchoolName}
                    onChange={(e) => setNewSchoolName(e.target.value)}
                    placeholder="Enter school name..."
                    className="flex-1 px-3 py-2.5 bg-[#2D2D2D] border border-[#3D3D3D] rounded-xl text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#22C55E] transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSchool()}
                    autoFocus
                  />
                  <button
                    onClick={handleAddSchool}
                    disabled={!newSchoolName.trim() || addingSchool}
                    className="px-4 py-2.5 bg-[#22C55E] text-[#052E16] font-medium rounded-xl hover:bg-[#4ADE80] transition-all disabled:opacity-50 text-sm"
                  >
                    {addingSchool ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add'}
                  </button>
                </div>
              </div>
            ) : (
              /* Search & select view */
              <>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                  <input
                    type="text"
                    value={schoolSearch}
                    onChange={(e) => setSchoolSearch(e.target.value)}
                    placeholder="Search schools..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#2D2D2D] border border-[#3D3D3D] rounded-xl text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#22C55E] transition-colors"
                  />
                  {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22C55E] animate-spin" />}
                </div>

                <div className="space-y-1.5 max-h-[25vh] overflow-y-auto">
                  {schools.map((school) => (
                    <button
                      key={school.id}
                      onClick={() => setSelectedSchool(school)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between text-sm ${
                        selectedSchool?.id === school.id
                          ? 'bg-[#22C55E]/10 border-[#22C55E] text-white'
                          : 'bg-[#2D2D2D] border-[#3D3D3D] text-[#D1D5DB] hover:border-[#22C55E]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#22C55E] shrink-0" />
                        <span>{school.name}</span>
                      </div>
                      {selectedSchool?.id === school.id && <Check className="w-4 h-4 text-[#22C55E] shrink-0" />}
                    </button>
                  ))}
                  {schools.length === 0 && !searching && (
                    <p className="text-center text-[#6B7280] text-xs py-3">
                      {schoolSearch ? 'No schools found' : 'No schools yet'}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-6 py-3.5 bg-[#22C55E] text-[#052E16] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
}
