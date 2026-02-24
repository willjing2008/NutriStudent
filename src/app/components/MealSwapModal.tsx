import { X, Loader2, ArrowRight, TrendingUp, TrendingDown, Minus, Clock, Users, Flame, Plus, Trash2, ChefHat } from 'lucide-react';
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
    priceMatch?: string;
    calorieMatch: string;
    proteinMatch: string;
    matchScore: string;
  };
  imageUrl?: string;
  youtubeUrl?: string;
  sourceUrl?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  'breakfast': '🌅',
  'lunch': '🥗',
  'dinner': '🍽️',
  'one-pot': '🥘',
  'microwave': '📱',
  'meal-prep': '📦',
};

const CATEGORY_LABELS: Record<string, string> = {
  'breakfast': 'Breakfast',
  'lunch': 'Lunch',
  'dinner': 'Dinner',
  'one-pot': 'One Pot',
  'microwave': 'Microwave',
  'meal-prep': 'Meal Prep',
};

const CATEGORY_COLORS: Record<string, string> = {
  'breakfast': 'bg-yellow-900/40 text-yellow-400 border-yellow-700',
  'lunch': 'bg-green-900/40 text-green-400 border-green-700',
  'dinner': 'bg-indigo-900/40 text-indigo-400 border-indigo-700',
  'one-pot': 'bg-orange-900/40 text-orange-400 border-orange-700',
  'microwave': 'bg-blue-900/40 text-blue-400 border-blue-700',
  'meal-prep': 'bg-purple-900/40 text-purple-400 border-purple-700',
};

type ModalView = 'browse' | 'create';

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
  const [view, setView] = useState<ModalView>('browse');

  // Create recipe form state
  const [recipeName, setRecipeName] = useState('');
  const [recipeCategory, setRecipeCategory] = useState(currentMeal.category || 'lunch');
  const [recipeDifficulty, setRecipeDifficulty] = useState('easy');
  const [recipeCookingTime, setRecipeCookingTime] = useState(30);
  const [recipeServings, setRecipeServings] = useState(2);
  const [recipeCalories, setRecipeCalories] = useState(0);
  const [recipeProtein, setRecipeProtein] = useState(0);
  const [recipeCarbs, setRecipeCarbs] = useState(0);
  const [recipeFats, setRecipeFats] = useState(0);
  const [recipeIngredients, setRecipeIngredients] = useState<string[]>(['']);
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>(['']);

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

      const imageMap: Record<string, string> = {};
      for (const option of data.swapOptions) {
        imageMap[option.id] = option.imageUrl || option.image || LOCAL_IMAGE_FALLBACK;
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

  const handleCreateRecipe = () => {
    const filteredIngredients = recipeIngredients.filter(i => i.trim());
    const filteredInstructions = recipeInstructions.filter(i => i.trim());

    const customMeal = {
      id: `custom-${Date.now()}`,
      name: recipeName.trim(),
      description: `Custom recipe: ${recipeName.trim()}`,
      image: LOCAL_IMAGE_FALLBACK,
      category: recipeCategory,
      cookingTime: recipeCookingTime,
      servings: recipeServings,
      difficulty: recipeDifficulty,
      cuisine: 'Custom',
      tags: ['custom'],
      ingredients: filteredIngredients.map(name => ({ name, amount: '', unit: '', available: true })),
      ingredientNames: filteredIngredients,
      instructions: filteredInstructions,
      totalCost: 0,
      nutrition: {
        calories: recipeCalories,
        protein: recipeProtein,
        carbs: recipeCarbs,
        fats: recipeFats,
      },
      cost: 0,
      rationale: `Custom recipe created by user`,
      benefits: ['Custom recipe'],
      mealType: recipeCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      timesCooked: 0,
    };

    onSwap(customMeal);
    onClose();
  };

  const canSubmitRecipe =
    recipeName.trim().length > 0 &&
    recipeIngredients.some(i => i.trim()) &&
    recipeInstructions.some(i => i.trim());

  const addIngredient = () => setRecipeIngredients([...recipeIngredients, '']);
  const removeIngredient = (index: number) => {
    if (recipeIngredients.length <= 1) return;
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };
  const updateIngredient = (index: number, value: string) => {
    const updated = [...recipeIngredients];
    updated[index] = value;
    setRecipeIngredients(updated);
  };

  const addInstruction = () => setRecipeInstructions([...recipeInstructions, '']);
  const removeInstruction = (index: number) => {
    if (recipeInstructions.length <= 1) return;
    setRecipeInstructions(recipeInstructions.filter((_, i) => i !== index));
  };
  const updateInstruction = (index: number, value: string) => {
    const updated = [...recipeInstructions];
    updated[index] = value;
    setRecipeInstructions(updated);
  };

  const getDifferenceIcon = (current: number, option: number) => {
    const diff = option - current;
    if (Math.abs(diff) < current * 0.05) return <Minus className="w-4 h-4 text-[#6B7280]" />;
    return diff > 0 ? <TrendingUp className="w-4 h-4 text-[#22C55E]" /> : <TrendingDown className="w-4 h-4 text-blue-400" />;
  };

  const getDifferenceColor = (current: number, option: number) => {
    const diff = option - current;
    if (Math.abs(diff) < current * 0.05) return 'text-[#6B7280]';
    return diff > 0 ? 'text-[#22C55E]' : 'text-blue-400';
  };

  return (
    <div className="fixed inset-0 bg-[#0A1F13] z-50 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-[#0A1F13] border-b border-[#1E4029] px-5 pt-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Swap Meal</h2>
            <p className="text-sm text-[#9CA3AF] mt-0.5">
              Replace: <span className="font-semibold text-[#22C55E]">{currentMeal.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#142A1D] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#9CA3AF]" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 bg-[#142A1D] rounded-xl p-1">
          <button
            onClick={() => setView('browse')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              view === 'browse'
                ? 'bg-[#22C55E] text-[#052E16]'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Browse Alternatives
          </button>
          <button
            onClick={() => setView('create')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
              view === 'create'
                ? 'bg-[#22C55E] text-[#052E16]'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            Create Your Own
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {view === 'browse' ? (
          <>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#22C55E] animate-spin mb-4" />
                <p className="text-[#9CA3AF]">Finding similar meal options...</p>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border-2 border-red-800 rounded-xl p-6 text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={fetchSwapOptions}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : swapOptions.length === 0 ? (
              <div className="bg-orange-900/30 border-2 border-orange-800 rounded-xl p-6 text-center">
                <p className="text-orange-400">No alternative meals found. Try adjusting your preferences.</p>
              </div>
            ) : (
              <>
                {/* Current Meal Summary */}
                <div className="mb-5 p-4 bg-[#142A1D] rounded-xl border border-[#1E4029]">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    Current Meal Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-xs text-[#6B7280] mb-1">Calories</div>
                      <div className="font-bold text-white">{currentMeal.nutrition.calories}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#6B7280] mb-1">Protein</div>
                      <div className="font-bold text-white">{currentMeal.nutrition.protein}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#6B7280] mb-1">Time</div>
                      <div className="font-bold text-white">{currentMeal.cookingTime}min</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#6B7280] mb-1">Servings</div>
                      <div className="font-bold text-white">{currentMeal.servings}</div>
                    </div>
                  </div>
                </div>

                {/* Swap Options Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {swapOptions.map((option) => {
                    const isSelected = selectedOption?.id === option.id;
                    const calorieDiff = option.nutrition.calories - currentMeal.nutrition.calories;
                    const proteinDiff = option.nutrition.protein - currentMeal.nutrition.protein;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedOption(option)}
                        className={`text-left bg-[#142A1D] rounded-2xl overflow-hidden border-2 transition-all hover:shadow-lg ${
                          isSelected
                            ? 'border-[#22C55E] shadow-lg shadow-green-900/30 scale-[1.02]'
                            : 'border-[#1E4029] hover:border-[#2D5A3D]'
                        }`}
                      >
                        {/* Recipe Image */}
                        <div className="relative h-40 bg-[#1E4029]">
                          {optionImages[option.id] ? (
                            <ImageWithFallback
                              src={optionImages[option.id]}
                              alt={option.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#1E4029]">
                              <Loader2 className="w-8 h-8 text-[#6B7280] animate-spin" />
                            </div>
                          )}

                          {/* Match Score Badge */}
                          <div className="absolute top-2 right-2">
                            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                              {option.similarity.matchScore}% Match
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-2 left-2">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full border backdrop-blur-sm text-xs font-semibold ${CATEGORY_COLORS[option.category as keyof typeof CATEGORY_COLORS] || 'bg-[#1E4029] text-[#9CA3AF] border-[#2D5A3D]'}`}>
                              <span>{CATEGORY_ICONS[option.category as keyof typeof CATEGORY_ICONS]}</span>
                              <span>{CATEGORY_LABELS[option.category as keyof typeof CATEGORY_LABELS]}</span>
                            </div>
                          </div>

                          {/* Selected Checkmark */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#22C55E]/20 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center text-[#052E16] text-3xl font-bold shadow-lg">
                                ✓
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Recipe Info */}
                        <div className="p-4">
                          <h4 className="font-bold text-white mb-2 line-clamp-2">
                            {option.name}
                          </h4>
                          <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">
                            {option.description}
                          </p>

                          {/* Comparison Stats */}
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#6B7280]">Calories</span>
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

                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#6B7280]">Protein</span>
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
                          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
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
          </>
        ) : (
          /* Create Your Own Recipe Form */
          <div className="space-y-5">
            {/* Recipe Name */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Recipe Name</label>
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g. Chicken Stir Fry"
                className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
              />
            </div>

            {/* Category + Difficulty */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Category</label>
                <select
                  value={recipeCategory}
                  onChange={(e) => setRecipeCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white focus:outline-none focus:border-[#22C55E] transition-colors appearance-none"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="one-pot">One Pot</option>
                  <option value="microwave">Microwave</option>
                  <option value="meal-prep">Meal Prep</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Difficulty</label>
                <select
                  value={recipeDifficulty}
                  onChange={(e) => setRecipeDifficulty(e.target.value)}
                  className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white focus:outline-none focus:border-[#22C55E] transition-colors appearance-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Cooking Time + Servings */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Cooking Time (min)</label>
                <input
                  type="number"
                  value={recipeCookingTime}
                  onChange={(e) => setRecipeCookingTime(Number(e.target.value))}
                  min={1}
                  className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white focus:outline-none focus:border-[#22C55E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Servings</label>
                <input
                  type="number"
                  value={recipeServings}
                  onChange={(e) => setRecipeServings(Number(e.target.value))}
                  min={1}
                  className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white focus:outline-none focus:border-[#22C55E] transition-colors"
                />
              </div>
            </div>

            {/* Nutrition */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Nutrition (per serving)</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1">Calories</label>
                  <input
                    type="number"
                    value={recipeCalories || ''}
                    onChange={(e) => setRecipeCalories(Number(e.target.value))}
                    placeholder="0"
                    min={0}
                    className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={recipeProtein || ''}
                    onChange={(e) => setRecipeProtein(Number(e.target.value))}
                    placeholder="0"
                    min={0}
                    className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={recipeCarbs || ''}
                    onChange={(e) => setRecipeCarbs(Number(e.target.value))}
                    placeholder="0"
                    min={0}
                    className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B7280] mb-1">Fats (g)</label>
                  <input
                    type="number"
                    value={recipeFats || ''}
                    onChange={(e) => setRecipeFats(Number(e.target.value))}
                    placeholder="0"
                    min={0}
                    className="w-full px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Ingredients</label>
              <div className="space-y-2">
                {recipeIngredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="flex-1 px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                    />
                    {recipeIngredients.length > 1 && (
                      <button
                        onClick={() => removeIngredient(index)}
                        className="p-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-red-400 hover:bg-red-900/30 hover:border-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addIngredient}
                className="mt-2 flex items-center gap-1.5 text-sm text-[#22C55E] hover:text-[#4ADE80] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
              </button>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Instructions</label>
              <div className="space-y-2">
                {recipeInstructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-shrink-0 w-8 h-12 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#22C55E] text-[#052E16] flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      className="flex-1 px-4 py-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                    />
                    {recipeInstructions.length > 1 && (
                      <button
                        onClick={() => removeInstruction(index)}
                        className="p-3 bg-[#142A1D] border border-[#1E4029] rounded-xl text-red-400 hover:bg-red-900/30 hover:border-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addInstruction}
                className="mt-2 flex items-center gap-1.5 text-sm text-[#22C55E] hover:text-[#4ADE80] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 bg-[#0A1F13] border-t border-[#1E4029] p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        {view === 'browse' ? (
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#6B7280]">
              {selectedOption ? (
                <span className="font-semibold text-[#22C55E]">
                  ✓ {selectedOption.name} selected
                </span>
              ) : (
                <span>Select a meal to swap</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3 border border-[#1E4029] text-[#9CA3AF] rounded-xl hover:bg-[#142A1D] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSwap}
                disabled={!selectedOption || swapping}
                className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedOption && !swapping
                    ? 'bg-[#22C55E] text-[#052E16] hover:bg-[#4ADE80]'
                    : 'bg-[#1E4029] text-[#6B7280] cursor-not-allowed'
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
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#6B7280]">
              {canSubmitRecipe
                ? 'Ready to create your recipe'
                : 'Fill in name, ingredients & instructions'}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3 border border-[#1E4029] text-[#9CA3AF] rounded-xl hover:bg-[#142A1D] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRecipe}
                disabled={!canSubmitRecipe}
                className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  canSubmitRecipe
                    ? 'bg-[#22C55E] text-[#052E16] hover:bg-[#4ADE80]'
                    : 'bg-[#1E4029] text-[#6B7280] cursor-not-allowed'
                }`}
              >
                <ChefHat className="w-5 h-5" />
                Create & Swap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
