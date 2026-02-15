import { useLanguage } from '../hooks/useLanguage';
import { Home, Calendar, ShoppingCart, User } from 'lucide-react';

export type NavTab = 'home' | 'plan' | 'shop' | 'profile';

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
    { id: 'profile', icon: User, label: t('profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A1F13] border-t border-[#1E4029] px-6 py-3 z-40">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
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
