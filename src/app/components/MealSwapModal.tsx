import { X, Loader2, ArrowRight, TrendingUp, TrendingDown, Minus, Clock, Users, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const LOCAL_IMAGE_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiMxNDJBMUQiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjMUU0MDI5Ii8+PHJlY3QgeD0iNzIiIHk9IjE2MiIgd2lkdGg9IjE3NiIgaGVpZ2h0PSIxMiIgcng9IjYiIGZpbGw9IiMyMkM1NUUiIG9wYWNpdHk9IjAuNzUiLz48L3N2Zz4=';

interface MealSwapModalProps {
  currentMeal: {
    id: string;
    name: string;
    totalCost: number;
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
    cookingTime: number;
    servings: number;
    category: string;
  };
  goal: string;
  currentMealIds: string[];
  maxCookingTime?: number;
  projectId: string;
  publicAnonKey: string;
  onSwap: (newMeal: any) => void;
  onClose: () => void;
}

interface SwapOption {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  image: string;
  category: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  tags: string[];
  ingredients: any[];
  ingredientNames: string[];
  instructions: string[];
  totalCost: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
  };
  similarity: {
    priceMatch: string;
    calorieMatch: string;
    proteinMatch: string;
    matchScore: string;
  };
  youtubeUrl?: string;
  sourceUrl?: string;
}

const CATEGORY_ICONS = {
  'one-pot': '🥘',
  'microwave': '📱',
  'meal-prep': '📦',
};

const CATEGORY_LABELS = {
  'one-pot': 'One Pot',
  'microwave': 'Microwave',
  'meal-prep': 'Meal Prep',
};

const CATEGORY_COLORS = {
  'one-pot': 'bg-orange-100 text-orange-700 border-orange-300',
  'microwave': 'bg-blue-100 text-blue-700 border-blue-300',
  'meal-prep': 'bg-purple-100 text-purple-700 border-purple-300',
};

export function MealSwapModal({
  currentMeal,
  goal,
  currentMealIds,
  maxCookingTime,
  projectId,
  publicAnonKey,
  onSwap,
  onClose,
}: MealSwapModalProps) {
  const [swapOptions, setSwapOptions] = useState<SwapOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<SwapOption | null>(null);
  const [swapping, setSwapping] = useState(false);
  const [optionImages, setOptionImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSwapOptions();
  }, []);

  const fetchSwapOptions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/get-swap-options`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            currentRecipeId: currentMeal.id,
            goal: goal,
            currentMealIds: currentMealIds,
            maxCookingTime: maxCookingTime,
            limit: 6,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load swap options');
      }

      setSwapOptions(data.swapOptions);

      // Load images for all options
      const imageMap: Record<string, string> = {};
      for (const option of data.swapOptions) {
        imageMap[option.id] = option.imageUrl || LOCAL_IMAGE_FALLBACK;
      }
      setOptionImages(imageMap);
    } catch (err: any) {
      console.error('Error fetching swap options:', err);
      setError(err.message || 'Failed to load swap options. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!selectedOption) return;

    setSwapping(true);

    try {
      // Convert selected option to the format expected by parent
      const swappedMeal = {
        ...selectedOption,
        cost: selectedOption.totalCost / selectedOption.servings,
        rationale: selectedOption.description,
        benefits: [selectedOption.description],
        mealType: selectedOption.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      };

      onSwap(swappedMeal);
      onClose();
    } catch (err: any) {
      console.error('Error swapping meal:', err);
      setError('Failed to swap meal. Please try again.');
    } finally {
      setSwapping(false);
    }
  };

  const getDifferenceIcon = (current: number, option: number) => {
    const diff = option - current;
    if (Math.abs(diff) < current * 0.05) return <Minus className="w-4 h-4 text-gray-500" />;
    return diff > 0 ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-blue-600" />;
  };

  const getDifferenceColor = (current: number, option: number) => {
    const diff = option - current;
    if (Math.abs(diff) < current * 0.05) return 'text-gray-600';
    return diff > 0 ? 'text-green-600' : 'text-blue-600';
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold mb-1">Swap Meal</h2>
            <p className="text-sm text-white/90">
              Choose a similar alternative for: <span className="font-semibold">{currentMeal.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
              <p className="text-gray-600">Finding similar meal options...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={fetchSwapOptions}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : swapOptions.length === 0 ? (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 text-center">
              <p className="text-orange-700">No alternative meals found. Try adjusting your preferences.</p>
            </div>
          ) : (
            <>
              {/* Current Meal Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  Current Meal Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Cost</div>
                    <div className="font-bold text-gray-900">£{currentMeal.totalCost.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Calories</div>
                    <div className="font-bold text-gray-900">{currentMeal.nutrition.calories}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Protein</div>
                    <div className="font-bold text-gray-900">{currentMeal.nutrition.protein}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Time</div>
                    <div className="font-bold text-gray-900">{currentMeal.cookingTime}min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Servings</div>
                    <div className="font-bold text-gray-900">{currentMeal.servings}</div>
                  </div>
                </div>
              </div>

              {/* Swap Options Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {swapOptions.map((option) => {
                  const isSelected = selectedOption?.id === option.id;
                  const priceDiff = option.totalCost - currentMeal.totalCost;
                  const calorieDiff = option.nutrition.calories - currentMeal.nutrition.calories;
                  const proteinDiff = option.nutrition.protein - currentMeal.nutrition.protein;

                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option)}
                      className={`text-left bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-lg ${
                        isSelected
                          ? 'border-green-500 shadow-lg scale-[1.02]'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {/* Recipe Image */}
                      <div className="relative h-40 bg-gray-200">
                        {optionImages[option.id] ? (
                          <ImageWithFallback
                            src={optionImages[option.id]}
                            alt={option.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                          </div>
                        )}

                        {/* Match Score Badge */}
                        <div className="absolute top-2 right-2">
                          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold shadow-lg">
                            {option.similarity.matchScore}% Match
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-2 left-2">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full border backdrop-blur-sm bg-white/90 text-xs font-semibold ${CATEGORY_COLORS[option.category as keyof typeof CATEGORY_COLORS]}`}>
                            <span>{CATEGORY_ICONS[option.category as keyof typeof CATEGORY_ICONS]}</span>
                            <span>{CATEGORY_LABELS[option.category as keyof typeof CATEGORY_LABELS]}</span>
                          </div>
                        </div>

                        {/* Selected Checkmark */}
                        {isSelected && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                              ✓
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Recipe Info */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {option.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {option.description}
                        </p>

                        {/* Comparison Stats */}
                        <div className="space-y-2 mb-3">
                          {/* Cost */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Cost</span>
                            <div className="flex items-center gap-1.5">
                              {getDifferenceIcon(currentMeal.totalCost, option.totalCost)}
                              <span className={`font-bold ${getDifferenceColor(currentMeal.totalCost, option.totalCost)}`}>
                                £{option.totalCost.toFixed(2)}
                                {priceDiff !== 0 && (
                                  <span className="ml-1 text-[10px]">
                                    ({priceDiff > 0 ? '+' : ''}£{priceDiff.toFixed(2)})
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Calories */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Calories</span>
                            <div className="flex items-center gap-1.5">
                              {getDifferenceIcon(currentMeal.nutrition.calories, option.nutrition.calories)}
                              <span className={`font-bold ${getDifferenceColor(currentMeal.nutrition.calories, option.nutrition.calories)}`}>
                                {option.nutrition.calories}
                                {calorieDiff !== 0 && (
                                  <span className="ml-1 text-[10px]">
                                    ({calorieDiff > 0 ? '+' : ''}{calorieDiff})
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Protein */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Protein</span>
                            <div className="flex items-center gap-1.5">
                              {getDifferenceIcon(currentMeal.nutrition.protein, option.nutrition.protein)}
                              <span className={`font-bold ${getDifferenceColor(currentMeal.nutrition.protein, option.nutrition.protein)}`}>
                                {option.nutrition.protein}g
                                {proteinDiff !== 0 && (
                                  <span className="ml-1 text-[10px]">
                                    ({proteinDiff > 0 ? '+' : ''}{proteinDiff}g)
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {option.cookingTime}min
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {option.servings}
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {option.difficulty}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedOption ? (
              <span className="font-semibold text-green-600">
                ✓ {selectedOption.name} selected
              </span>
            ) : (
              <span>Select a meal to swap</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSwap}
              disabled={!selectedOption || swapping}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                selectedOption && !swapping
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {swapping ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Swapping...
                </>
              ) : (
                <>
                  Swap Meal
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
