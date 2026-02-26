import { Check, ChevronLeft, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { BottomNavigation, NavTab } from './BottomNavigation';

interface ShoppingIngredient {
  name: string;
  amount: string;
  category: 'dairy' | 'produce' | 'meat' | 'pantry' | 'frozen' | 'bakery';
  estimatedPrice: number;
  checked: boolean;
}

interface KitchenEssential {
  id: string;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  amount: string;
  category: 'pantry';
}

interface ShoppingModeProps {
  ingredients: ShoppingIngredient[];
  storeName: string;
  onBack: () => void;
  missingEssentials?: KitchenEssential[];
  activeNavTab?: NavTab;
  onNavTabChange?: (tab: NavTab) => void;
}

const CATEGORY_CONFIG = {
  produce: {
    emoji: '🥬',
    label: 'Fresh Produce',
    bgColor: 'bg-green-500/20',
    iconBg: 'bg-green-500',
  },
  dairy: {
    emoji: '🥛',
    label: 'Dairy & Eggs',
    bgColor: 'bg-blue-500/20',
    iconBg: 'bg-blue-500',
  },
  meat: {
    emoji: '🥩',
    label: 'Meat & Fish',
    bgColor: 'bg-red-500/20',
    iconBg: 'bg-red-500',
  },
  pantry: {
    emoji: '📦',
    label: 'Pantry & Dry Goods',
    bgColor: 'bg-orange-500/20',
    iconBg: 'bg-orange-500',
  },
  frozen: {
    emoji: '❄️',
    label: 'Frozen Foods',
    bgColor: 'bg-cyan-500/20',
    iconBg: 'bg-cyan-500',
  },
  bakery: {
    emoji: '🥖',
    label: 'Bakery',
    bgColor: 'bg-amber-500/20',
    iconBg: 'bg-amber-500',
  },
};

/** Deduplicate ingredients by name (case-insensitive). */
function deduplicateIngredients(ingredients: ShoppingIngredient[]): ShoppingIngredient[] {
  const map = new Map<string, ShoppingIngredient>();
  for (const ing of ingredients) {
    const key = ing.name.toLowerCase().trim();
    if (!map.has(key)) {
      map.set(key, { ...ing });
    }
  }
  return Array.from(map.values());
}

export function ShoppingMode({ ingredients, storeName, onBack, missingEssentials = [], activeNavTab, onNavTabChange }: ShoppingModeProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (ingredientName: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(ingredientName)) {
      newChecked.delete(ingredientName);
    } else {
      newChecked.add(ingredientName);
    }
    setCheckedItems(newChecked);
  };

  // Deduplicate first, then organize by category
  const dedupedIngredients = deduplicateIngredients(ingredients);

  const organizedIngredients = dedupedIngredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, ShoppingIngredient[]>);

  // Calculate progress
  const totalItems = dedupedIngredients.length + missingEssentials.length;
  const checkedCount = checkedItems.size;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  // Category order for display
  const categoryOrder = ['produce', 'dairy', 'meat', 'pantry', 'frozen', 'bakery'];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#1E1E1E]">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-[#1E1E1E] rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold text-white">Shopping List</h1>
            </div>
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#22C55E] rounded-full" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280] font-medium uppercase tracking-wider text-xs">
                {checkedCount} of {totalItems} items collected
              </span>
              <span className="font-semibold text-[#22C55E]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22C55E] transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shopping List */}
      <div className="max-w-md mx-auto px-4 py-4 pb-48 space-y-4">
        {/* Essential Kitchen Items (if any missing) */}
        {missingEssentials.length > 0 && (
          <div className="space-y-2">
            {/* Essentials Header */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm">Essential Kitchen Items</h2>
                  <p className="text-xs text-[#6B7280]">One-time Purchase</p>
                </div>
              </div>
              <span className="text-sm font-medium text-[#6B7280]">
                {missingEssentials.filter(item => checkedItems.has(item.name)).length}/{missingEssentials.length}
              </span>
            </div>

            {/* Essentials Items */}
            {missingEssentials.map((essential) => {
              const isChecked = checkedItems.has(essential.name);

              return (
                <button
                  key={essential.id}
                  onClick={() => toggleItem(essential.name)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-[#141414] border border-[#1E1E1E] transition-all hover:border-[#2D2D2D] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isChecked
                          ? 'bg-[#22C55E] border-[#22C55E]'
                          : 'bg-transparent border-[#3D3D3D]'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{essential.emoji}</span>
                      <span
                        className={`font-medium transition-all ${
                          isChecked ? 'text-[#6B7280] line-through' : 'text-white'
                        }`}
                      >
                        {essential.name}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Category Sections */}
        {categoryOrder.map((category) => {
          const items = organizedIngredients[category];
          if (!items || items.length === 0) return null;

          const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
          const categoryChecked = items.filter(item => checkedItems.has(item.name)).length;

          return (
            <div key={category} className="space-y-2">
              {/* Category Header */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1A1A1A]">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center`}>
                    <span className="text-sm">{config.emoji}</span>
                  </div>
                  <h2 className="font-semibold text-white text-sm">{config.label}</h2>
                </div>
                <span className="text-sm font-medium text-[#6B7280]">
                  {categoryChecked}/{items.length}
                </span>
              </div>

              {/* Category Items — name only, no amounts */}
              {items.map((ingredient) => {
                const isChecked = checkedItems.has(ingredient.name);

                return (
                  <button
                    key={ingredient.name}
                    onClick={() => toggleItem(ingredient.name)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-[#141414] border border-[#1E1E1E] transition-all hover:border-[#2D2D2D] active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isChecked
                            ? 'bg-[#22C55E] border-[#22C55E]'
                            : 'bg-transparent border-[#3D3D3D]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span
                        className={`font-medium transition-all ${
                          isChecked ? 'text-[#6B7280] line-through' : 'text-white'
                        }`}
                      >
                        {ingredient.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* Empty State */}
        {dedupedIngredients.length === 0 && missingEssentials.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-[#6B7280]" />
            </div>
            <h3 className="text-white font-semibold mb-2">No Items Yet</h3>
            <p className="text-[#6B7280] text-sm">Create a meal plan to generate your shopping list</p>
          </div>
        )}
      </div>

      {/* Bottom Summary */}
      <div
        className="fixed left-0 right-0 z-30 bg-[#1A1A1A] border-t border-[#2D2D2D]"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 3.75rem)' }}
      >
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#6B7280]">
              {totalItems - checkedCount} items remaining
            </p>
            <span className="text-lg font-bold text-[#22C55E]">
              {checkedCount}/{totalItems} done
            </span>
          </div>
        </div>
      </div>

      {/* Shared Bottom Navigation */}
      <BottomNavigation
        activeTab={activeNavTab || 'shop'}
        onTabChange={(tab) => {
          if (onNavTabChange) {
            onNavTabChange(tab);
          } else if (tab === 'home') {
            onBack();
          }
        }}
      />
    </div>
  );
}
