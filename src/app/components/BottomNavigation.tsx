import { useLanguage } from '../hooks/useLanguage';
import { Home, Calendar, ShoppingCart, Trophy, User } from 'lucide-react';

export type NavTab = 'home' | 'plan' | 'shop' | 'leaderboard' | 'profile';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useLanguage();

  const navItems: { id: NavTab; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'plan', icon: Calendar, label: t('plan') },
    { id: 'shop', icon: ShoppingCart, label: t('shop') },
    { id: 'leaderboard', icon: Trophy, label: t('leaderboard') },
    { id: 'profile', icon: User, label: t('profile') },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-[#0A1F13] border-t border-[#1E4029] px-6 z-40"
      style={{
        paddingTop: '0.35rem',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="max-w-md mx-auto flex justify-around items-start">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-start gap-1 pt-1 pb-0.5 px-4 transition-colors ${
                isActive ? 'text-[#22C55E]' : 'text-[#6B7280]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
