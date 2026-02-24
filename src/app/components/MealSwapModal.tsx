import { X, Loader2, ArrowRight, TrendingUp, TrendingDown, Minus, Clock, Users, Flame, Plus, Trash2, ChefHat, ImagePlus, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../../utils/supabaseClient';

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

interface CommunityRecipe {
  id: string;
  name: string;
  description: string;
  image: string;
  imageUrl?: string;
  category: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
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
  };
  creatorId: string;
  creatorName: string;
  createdAt: string;
  timesCooked: number;
  likesCount: number;
  likedByMe: boolean;
}

type ModalView = 'browse' | 'create' | 'community';

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingRecipe, setUploadingRecipe] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Community state
  const [communityRecipes, setCommunityRecipes] = useState<CommunityRecipe[]>([]);
  const [communityLoading, setCommunityLoading] = useState(false);
  const [communityError, setCommunityError] = useState<string | null>(null);
  const [selectedCommunityRecipe, setSelectedCommunityRecipe] = useState<CommunityRecipe | null>(null);
  const [togglingLike, setTogglingLike] = useState<string | null>(null);
  const [shareWithCommunity, setShareWithCommunity] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string } | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return; // 5MB limit
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    fetchSwapOptions();
  }, []);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser({
          id: user.id,
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous',
        });
      }
    };
    fetchUser();
  }, []);

  // Fetch community recipes when switching to community tab
  useEffect(() => {
    if (view === 'community' && currentUser) {
      fetchCommunityRecipes();
    }
  }, [view, currentUser]);

  const fetchCommunityRecipes = async () => {
    if (!currentUser) return;
    setCommunityLoading(true);
    setCommunityError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/list-community-recipes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId: currentUser.id }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to load community recipes');
      setCommunityRecipes(data.recipes || []);
    } catch (err: any) {
      console.error('Error fetching community recipes:', err);
      setCommunityError(err.message || 'Failed to load community recipes.');
    } finally {
      setCommunityLoading(false);
    }
  };

  const handleToggleLike = async (recipeId: string) => {
    if (!currentUser || togglingLike) return;
    setTogglingLike(recipeId);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/toggle-community-like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId: currentUser.id, recipeId }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to toggle like');

      setCommunityRecipes(prev =>
        prev.map(r =>
          r.id === recipeId
            ? { ...r, likedByMe: data.liked, likesCount: data.likesCount }
            : r
        )
      );
    } catch (err) {
      console.error('Error toggling like:', err);
    } finally {
      setTogglingLike(null);
    }
  };

  const handleSwapCommunityRecipe = () => {
    if (!selectedCommunityRecipe) return;

    const swappedMeal = {
      ...selectedCommunityRecipe,
      cost: selectedCommunityRecipe.totalCost / selectedCommunityRecipe.servings,
      rationale: selectedCommunityRecipe.description,
      benefits: [selectedCommunityRecipe.description],
      mealType: selectedCommunityRecipe.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    };

    onSwap(swappedMeal);
    onClose();
  };

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

  const handleCreateRecipe = async () => {
    if (!imageFile) return;
    setUploadingRecipe(true);

    const filteredIngredients = recipeIngredients.filter(i => i.trim());
    const filteredInstructions = recipeInstructions.filter(i => i.trim());
    const recipeId = `custom-${Date.now()}`;

    // Upload image to Supabase Storage
    let imageUrl = imagePreview || LOCAL_IMAGE_FALLBACK;
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('recipeId', recipeId);
      formData.append('cuisine', 'custom');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/upload-recipe-image`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.imageUrl) {
        imageUrl = data.imageUrl;
      }
    } catch (err) {
      console.error('Image upload failed, using local preview:', err);
    }

    const customMeal = {
      id: recipeId,
      name: recipeName.trim(),
      description: `Custom recipe: ${recipeName.trim()}`,
      image: imageUrl,
      imageUrl,
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

    // Share with community if checked
    if (shareWithCommunity && currentUser) {
      try {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/save-community-recipe`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              userId: currentUser.id,
              creatorName: currentUser.name,
              recipe: customMeal,
            }),
          }
        );
      } catch (err) {
        console.error('Failed to share recipe with community:', err);
      }
    }

    onSwap(customMeal);
    onClose();
  };

  const canSubmitRecipe =
    recipeName.trim().length > 0 &&
    imageFile !== null &&
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
            Browse
          </button>
          <button
            onClick={() => setView('community')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
              view === 'community'
                ? 'bg-[#22C55E] text-[#052E16]'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Community
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
            Create
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {view === 'browse' && (
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
        )}

        {view === 'community' && (
          <>
            {communityLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#22C55E] animate-spin mb-4" />
                <p className="text-[#9CA3AF]">Loading community recipes...</p>
              </div>
            ) : communityError ? (
              <div className="bg-red-900/30 border-2 border-red-800 rounded-xl p-6 text-center">
                <p className="text-red-400 mb-4">{communityError}</p>
                <button
                  onClick={fetchCommunityRecipes}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : communityRecipes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#142A1D] flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#22C55E]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No community recipes yet</h3>
                <p className="text-[#9CA3AF] max-w-xs">Be the first to share a recipe! Switch to the Create tab and check &quot;Share with community&quot;.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityRecipes.map((recipe) => {
                  const isSelected = selectedCommunityRecipe?.id === recipe.id;

                  return (
                    <button
                      key={recipe.id}
                      onClick={() => setSelectedCommunityRecipe(recipe)}
                      className={`text-left bg-[#142A1D] rounded-2xl overflow-hidden border-2 transition-all hover:shadow-lg ${
                        isSelected
                          ? 'border-[#22C55E] shadow-lg shadow-green-900/30 scale-[1.02]'
                          : 'border-[#1E4029] hover:border-[#2D5A3D]'
                      }`}
                    >
                      {/* Recipe Image */}
                      <div className="relative h-40 bg-[#1E4029]">
                        <ImageWithFallback
                          src={recipe.imageUrl || recipe.image || LOCAL_IMAGE_FALLBACK}
                          alt={recipe.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Category Badge */}
                        <div className="absolute top-2 left-2">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full border backdrop-blur-sm text-xs font-semibold ${CATEGORY_COLORS[recipe.category as keyof typeof CATEGORY_COLORS] || 'bg-[#1E4029] text-[#9CA3AF] border-[#2D5A3D]'}`}>
                            <span>{CATEGORY_ICONS[recipe.category as keyof typeof CATEGORY_ICONS]}</span>
                            <span>{CATEGORY_LABELS[recipe.category as keyof typeof CATEGORY_LABELS] || recipe.category}</span>
                          </div>
                        </div>

                        {/* Like Button */}
                        <div
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleLike(recipe.id);
                          }}
                        >
                          <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold transition-all ${
                            recipe.likedByMe
                              ? 'bg-red-500/80 text-white'
                              : 'bg-black/40 text-white hover:bg-black/60'
                          }`}>
                            <Heart className={`w-3.5 h-3.5 ${recipe.likedByMe ? 'fill-current' : ''} ${togglingLike === recipe.id ? 'animate-pulse' : ''}`} />
                            <span>{recipe.likesCount}</span>
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
                        <h4 className="font-bold text-white mb-1 line-clamp-2">
                          {recipe.name}
                        </h4>
                        <p className="text-xs text-[#22C55E] mb-3">
                          by {recipe.creatorName}
                        </p>

                        {/* Nutrition Stats */}
                        <div className="flex items-center gap-3 mb-3 text-xs">
                          <div className="flex items-center gap-1 text-[#9CA3AF]">
                            <Flame className="w-3 h-3 text-orange-500" />
                            <span className="font-semibold text-white">{recipe.nutrition.calories}</span> cal
                          </div>
                          <div className="flex items-center gap-1 text-[#9CA3AF]">
                            <TrendingUp className="w-3 h-3 text-blue-400" />
                            <span className="font-semibold text-white">{recipe.nutrition.protein}g</span> protein
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {recipe.cookingTime}min
                          </div>
                          <div className="flex items-center gap-1">
                            <ChefHat className="w-3 h-3" />
                            {recipe.timesCooked}x cooked
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {view === 'create' && (
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

            {/* Recipe Image (required) */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Recipe Image <span className="text-red-400">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-[#1E4029]">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-black/80 transition-colors"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 border-2 border-dashed border-[#1E4029] rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#22C55E] hover:bg-[#142A1D] transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#142A1D] flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">Upload a photo</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">JPG, PNG or WebP (max 5MB)</p>
                  </div>
                </button>
              )}
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

            {/* Share with Community */}
            <div
              onClick={() => setShareWithCommunity(!shareWithCommunity)}
              className="flex items-start gap-3 p-4 bg-[#142A1D] border border-[#1E4029] rounded-xl cursor-pointer hover:border-[#2D5A3D] transition-colors"
            >
              <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all ${
                shareWithCommunity
                  ? 'bg-[#22C55E] border-[#22C55E]'
                  : 'border-[#6B7280]'
              }`}>
                {shareWithCommunity && (
                  <svg className="w-3 h-3 text-[#052E16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white">Share with community</p>
                <p className="text-xs text-[#6B7280] mt-0.5">Let other students discover and cook your recipe</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 bg-[#0A1F13] border-t border-[#1E4029] p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        {view === 'browse' && (
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
        )}

        {view === 'community' && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#6B7280]">
              {selectedCommunityRecipe ? (
                <span className="font-semibold text-[#22C55E]">
                  ✓ {selectedCommunityRecipe.name} selected
                </span>
              ) : (
                <span>Select a community recipe</span>
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
                onClick={handleSwapCommunityRecipe}
                disabled={!selectedCommunityRecipe}
                className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedCommunityRecipe
                    ? 'bg-[#22C55E] text-[#052E16] hover:bg-[#4ADE80]'
                    : 'bg-[#1E4029] text-[#6B7280] cursor-not-allowed'
                }`}
              >
                Swap Meal
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {view === 'create' && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#6B7280]">
              {canSubmitRecipe
                ? 'Ready to create your recipe'
                : 'Fill in image, name, ingredients & instructions'}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={uploadingRecipe}
                className="px-5 py-3 border border-[#1E4029] text-[#9CA3AF] rounded-xl hover:bg-[#142A1D] transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRecipe}
                disabled={!canSubmitRecipe || uploadingRecipe}
                className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  canSubmitRecipe && !uploadingRecipe
                    ? 'bg-[#22C55E] text-[#052E16] hover:bg-[#4ADE80]'
                    : 'bg-[#1E4029] text-[#6B7280] cursor-not-allowed'
                }`}
              >
                {uploadingRecipe ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <ChefHat className="w-5 h-5" />
                    Create & Swap
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
