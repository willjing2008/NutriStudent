import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LogOut, Settings, Bell, Shield, HelpCircle, ChevronRight, Moon, Globe } from 'lucide-react';
import { BottomNavigation, NavTab } from './BottomNavigation';

interface ProfilePageProps {
  user: any;
  onLogout: () => void;
  onOpenAdmin: () => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function ProfilePage({ user, onLogout, onOpenAdmin, activeTab, onTabChange }: ProfilePageProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student';
  const userEmail = user?.email || 'student@university.ac.uk';

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', value: 'On', action: () => {} },
        { icon: Globe, label: t('language'), value: language === 'zh-CN' ? '中文' : 'English', action: () => setShowLanguageModal(true) },
        { icon: Moon, label: 'Dark Mode', value: 'On', action: () => {} },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: Shield, label: 'Privacy & Security', action: () => {} },
        { icon: Settings, label: 'Admin Dashboard', action: onOpenAdmin },
        { icon: HelpCircle, label: 'Help & Support', action: () => {} },
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
              <h2 className="text-xl font-bold text-white">{userName}</h2>
              <p className="text-[#6B7280] text-sm">{userEmail}</p>
            </div>
            <button className="p-2 bg-[#2D2D2D] rounded-full hover:bg-[#3D3D3D] transition-colors">
              <Settings className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-[#2D2D2D]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#22C55E]">12</div>
              <div className="text-xs text-[#6B7280]">Plans Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">84</div>
              <div className="text-xs text-[#6B7280]">Meals Logged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">£240</div>
              <div className="text-xs text-[#6B7280]">Saved</div>
            </div>
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
          Sign Out
        </button>

        {/* App Version */}
        <div className="text-center pb-4">
          <p className="text-[#4B4B4B] text-xs">NutriStudent v1.0.0</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      
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

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}



