import { useState, useEffect } from 'react';
import { Check, ChefHat, X } from 'lucide-react';

interface KitchenEssential {
  id: string;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  amount: string;
  category: 'pantry';
}

const KITCHEN_ESSENTIALS: KitchenEssential[] = [
  { id: 'salt', name: 'Salt', emoji: '🧂', price: 0.65, unit: 'pack', amount: '1', category: 'pantry' },
  { id: 'pepper', name: 'Black Pepper', emoji: '🌶️', price: 1.20, unit: 'pack', amount: '1', category: 'pantry' },
  { id: 'olive-oil', name: 'Olive Oil', emoji: '🫒', price: 3.50, unit: 'bottle', amount: '1', category: 'pantry' },
  { id: 'soy-sauce', name: 'Soy Sauce', emoji: '🥢', price: 1.80, unit: 'bottle', amount: '1', category: 'pantry' },
  { id: 'mixed-herbs', name: 'Mixed Herbs', emoji: '🌿', price: 1.00, unit: 'pack', amount: '1', category: 'pantry' },
];

interface KitchenInventoryWizardProps {
  onComplete: (missingEssentials: KitchenEssential[]) => void;
  onSkip: () => void;
}

export function KitchenInventoryWizard({ onComplete, onSkip }: KitchenInventoryWizardProps) {
  const [selectedEssentials, setSelectedEssentials] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30);
  const [isClosing, setIsClosing] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const toggleEssential = (id: string) => {
    setSelectedEssentials(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleContinue = () => {
    setIsClosing(true);
    setTimeout(() => {
      // Get the missing essentials (items that were NOT checked)
      const missingEssentials = KITCHEN_ESSENTIALS.filter(
        essential => !selectedEssentials.has(essential.id)
      );
      onComplete(missingEssentials);
    }, 300);
  };

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(() => {
      onSkip();
    }, 300);
  };

  const totalMissingCost = KITCHEN_ESSENTIALS
    .filter(essential => !selectedEssentials.has(essential.id))
    .reduce((sum, essential) => sum + essential.price, 0);

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-screen overflow-y-auto transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative mt-8">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Skip"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Kitchen Inventory Check</h2>
              <p className="text-white/90 text-sm">Quick setup before your first meal plan</p>
            </div>
          </div>
          
          {/* Timer */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
            <span className="font-semibold min-w-[3ch]">{timeLeft}s</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Do you already own these kitchen essentials?
            </h3>
            <p className="text-gray-600 text-sm">
              Check the items you <span className="font-semibold">already have</span> at home. 
              Unchecked items will be added to your first shopping list.
            </p>
          </div>

          {/* Essentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {KITCHEN_ESSENTIALS.map((essential) => {
              const isSelected = selectedEssentials.has(essential.id);
              
              return (
                <button
                  key={essential.id}
                  onClick={() => toggleEssential(essential.id)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    ${isSelected 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  {/* Checkmark */}
                  <div className={`
                    absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
                    ${isSelected 
                      ? 'bg-green-500 scale-100' 
                      : 'bg-gray-200 scale-0'
                    }
                  `}>
                    <Check className="w-4 h-4 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{essential.emoji}</div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">{essential.name}</div>
                      <div className="text-sm text-gray-500">£{essential.price.toFixed(2)}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1">
                <div className="font-semibold text-amber-900 mb-1">
                  Why this matters
                </div>
                <p className="text-sm text-amber-800">
                  This prevents the frustration of starting to cook and realizing you have no oil or basic seasonings. 
                  We'll automatically add any missing items to your shopping list.
                </p>
              </div>
            </div>
          </div>

          {/* Missing Items Summary */}
          {selectedEssentials.size < KITCHEN_ESSENTIALS.length && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="font-semibold text-blue-900 mb-2">
                Items to add to shopping list:
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {KITCHEN_ESSENTIALS.filter(e => !selectedEssentials.has(e.id)).map(essential => (
                  <div 
                    key={essential.id}
                    className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm border border-blue-300"
                  >
                    <span>{essential.emoji}</span>
                    <span className="font-medium">{essential.name}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-blue-800">
                <span className="font-semibold">One-time cost:</span> £{totalMissingCost.toFixed(2)}
                <span className="ml-2 text-xs bg-blue-200 px-2 py-0.5 rounded-full">
                  Added once to your first shopping list
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Skip for now
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all font-semibold shadow-lg"
            >
              Continue to Meal Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
