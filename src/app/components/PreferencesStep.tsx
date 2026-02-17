import { useState } from 'react';
import { ArrowRight, ArrowLeft, X, Calendar, Users, DollarSign, Target, Clock, ChefHat, Utensils, AlertCircle } from 'lucide-react';
import { UserPreferences, EquipmentType } from '../App';

// Common ingredients for autocomplete
const COMMON_INGREDIENTS = [
  'Milk', 'Eggs', 'Peanuts', 'Tree Nuts', 'Fish', 'Shellfish', 'Soy', 'Wheat', 'Gluten',
  'Cheese', 'Butter', 'Cream', 'Yogurt', 'Chicken', 'Beef', 'Pork', 'Lamb', 'Turkey',
  'Bacon', 'Salmon', 'Tuna', 'Prawns', 'Tofu', 'Onion', 'Garlic', 'Tomato', 'Mushroom',
  'Rice', 'Pasta', 'Bread', 'Beans', 'Chickpeas', 'Lentils', 'Coconut', 'Sesame'
].sort();

interface PreferencesStepProps {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PreferencesStep({ preferences, updatePreferences, onNext, onBack }: PreferencesStepProps) {
  const [shoppingDate, setShoppingDate] = useState(preferences.shoppingDate);
  const [mealsPerDay, setMealsPerDay] = useState(preferences.mealsPerDay);
  const [budget, setBudget] = useState(preferences.budget);
  const [goal, setGoal] = useState(preferences.goal);
  const [maxCookingTime, setMaxCookingTime] = useState(preferences.maxCookingTime);
  const [cookingMethods, setCookingMethods] = useState<('one-pot' | 'microwave' | 'meal-prep')[]>(
    preferences.cookingMethods || []
  );
  const [avoidIngredients, setAvoidIngredients] = useState<string[]>(
    preferences.avoidIngredients || []
  );
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Dietary restrictions state
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  
  // Kitchen equipment state (Dorm Chef Mode)
  const [availableEquipment, setAvailableEquipment] = useState<EquipmentType[]>(
    preferences.availableEquipment || []
  );

  const filteredSuggestions = COMMON_INGREDIENTS.filter(
    ingredient => 
      ingredient.toLowerCase().includes(searchInput.toLowerCase()) &&
      !avoidIngredients.includes(ingredient)
  ).slice(0, 6);

  const addIngredient = (ingredient: string) => {
    if (!avoidIngredients.includes(ingredient) && ingredient.trim()) {
      setAvoidIngredients([...avoidIngredients, ingredient]);
      setSearchInput('');
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setAvoidIngredients(avoidIngredients.filter(item => item !== ingredient));
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const toggleEquipment = (eq: EquipmentType) => {
    setAvailableEquipment(prev =>
      prev.includes(eq)
        ? prev.filter(e => e !== eq)
        : [...prev, eq]
    );
  };

  const toggleCookingMethod = (method: 'one-pot' | 'microwave' | 'meal-prep') => {
    setCookingMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleNext = () => {
    updatePreferences({
      shoppingDate,
      mealsPerDay,
      budget,
      goal,
      maxCookingTime,
      cookingMethods,
      avoidIngredients,
      availableEquipment,
    });
    onNext();
  };

  const canProceed = shoppingDate && goal;

  const goals = [
    { id: 'study' as const, name: 'Study Focus', icon: '📚', description: 'Brain-boosting meals' },
    { id: 'work' as const, name: 'Work Efficiency', icon: '💼', description: 'Energy-sustaining foods' },
    { id: 'fitness' as const, name: 'Fitness Goals', icon: '💪', description: 'High-protein meals' },
  ];

  const restrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'keto', label: 'Keto' },
  ];

  const equipmentOptions: { id: EquipmentType; label: string; icon: string; desc: string }[] = [
    { id: 'microwave', label: 'Microwave', icon: '📱', desc: 'Mug meals & quick cooking' },
    { id: 'hot-plate', label: 'Hot Plate', icon: '🔥', desc: 'One-pot & stir fry' },
    { id: 'rice-cooker', label: 'Rice Cooker', icon: '🍚', desc: 'Rice & grain bowls' },
    { id: 'kettle', label: 'Kettle', icon: '☕', desc: 'Noodles & hot drinks' },
    { id: 'toaster', label: 'Toaster', icon: '🍞', desc: 'Toast & sandwiches' },
    { id: 'full-kitchen', label: 'Full Kitchen', icon: '🍳', desc: 'Oven, stove & all tools' },
  ];

  const cookingTimeOptions = [
    { time: 15, label: '15 min', emoji: '⚡', name: 'Super Quick' },
    { time: 30, label: '30 min', emoji: '🚀', name: 'Quick' },
    { time: 45, label: '45 min', emoji: '⏰', name: 'Moderate' },
    { time: 60, label: '60 min', emoji: '🍳', name: 'Take Time' },
  ];

  const cookingMethodOptions = [
    { method: 'one-pot' as const, label: 'One-Pot Meals', desc: 'Everything in one pot', icon: '🥘' },
    { method: 'microwave' as const, label: 'Microwave Meals', desc: 'Quick microwave cooking', icon: '📱' },
    { method: 'meal-prep' as const, label: 'Meal Prep', desc: 'Make ahead & store', icon: '📦' },
  ];

  // Section header component for consistency
  const SectionHeader = ({ icon: Icon, title, optional = false }: { icon: any; title: string; optional?: boolean }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-[#22C55E]/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#22C55E]" />
      </div>
      <h3 className="text-lg font-semibold text-white">
        {title}
        {optional && <span className="text-[#6B7280] text-sm font-normal ml-2">(Optional)</span>}
      </h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1F13] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Set Your Preferences
          </h1>
          <p className="text-[#9CA3AF]">
            Help us tailor a meal plan that fits your lifestyle, budget, and kitchen setup.
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 px-6 pb-32 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-8">
          
          {/* Section 1: Shopping Date */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={Calendar} title="Next Shopping Date" />
            <div className="relative">
              <input
                type="date"
                value={shoppingDate}
                onChange={(e) => setShoppingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-4 bg-[#0A1F13] border border-[#2D5A3D] rounded-xl text-white focus:outline-none focus:border-[#22C55E] transition-colors [color-scheme:dark] appearance-none"
                placeholder="dd/mm/yyyy"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Section 2: Meals Per Day */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={Users} title="Meals Per Day" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setMealsPerDay(num)}
                  className={`py-4 rounded-xl font-semibold text-lg transition-all ${
                    mealsPerDay === num
                      ? 'bg-[#22C55E] text-[#052E16]'
                      : 'bg-[#0A1F13] text-white border border-[#2D5A3D] hover:border-[#22C55E]'
                  }`}
                >
                  {num} {num === 1 ? 'meal' : 'meals'}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Weekly Budget */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={DollarSign} title="Weekly Budget (£)" />
            <div className="relative mb-2">
              <div className="h-2 bg-[#2D5A3D] rounded-full">
                <div 
                  className="h-full bg-[#22C55E] rounded-full transition-all"
                  style={{ width: `${((budget - 30) / 170) * 100}%` }}
                />
              </div>
              <input
                type="range"
                min="30"
                max="200"
                step="5"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#22C55E] rounded-full shadow-lg pointer-events-none transition-all"
                style={{ left: `calc(${((budget - 30) / 170) * 100}% - 10px)` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7280]">£30</span>
              <span className="px-3 py-1 bg-[#22C55E]/20 text-[#22C55E] font-bold rounded-full">£{budget}</span>
              <span className="text-sm text-[#6B7280]">£200</span>
            </div>
          </div>

          {/* Section 4: Choose Your Goal */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={Target} title="Choose Your Goal" />
            <div className="space-y-3">
              {goals.map((item) => {
                const isSelected = goal === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    className={`w-full p-4 rounded-xl transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-[#22C55E]/20 border-2 border-[#22C55E]'
                        : 'bg-[#0A1F13] border border-[#2D5A3D] hover:border-[#22C55E]'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#22C55E]/30' : 'bg-[#1A3625]'
                    }`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-semibold ${isSelected ? 'text-[#22C55E]' : 'text-white'}`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-[#6B7280]">{item.description}</div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                        <span className="text-[#052E16] text-sm">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Maximum Cooking Time */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={Clock} title="Maximum Cooking Time per Meal" />
            <div className="grid grid-cols-4 gap-2">
              {cookingTimeOptions.map((option) => (
                <button
                  key={option.time}
                  onClick={() => setMaxCookingTime(option.time)}
                  className={`py-4 rounded-xl font-medium transition-all flex flex-col items-center gap-1 ${
                    maxCookingTime === option.time
                      ? 'bg-[#22C55E] text-[#052E16] border-2 border-[#22C55E]'
                      : 'bg-[#0A1F13] text-white border border-[#2D5A3D] hover:border-[#22C55E]'
                  }`}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className={`text-xs ${maxCookingTime === option.time ? 'text-[#052E16]' : 'text-[#22C55E]'}`}>
                    {option.name}
                  </span>
                  <span className="text-sm font-semibold">{option.label}</span>
                </button>
              ))}
            </div>
            {/* Info hint */}
            <div className="mt-4 p-3 bg-[#22C55E]/10 rounded-xl border border-[#22C55E]/20">
              <p className="text-sm text-[#22C55E]">
                🍳 We'll only suggest recipes that take <strong>{maxCookingTime} minutes or less</strong> to cook
              </p>
            </div>
          </div>

          {/* Section 6: Preferred Cooking Methods */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={ChefHat} title="Preferred Cooking Methods" optional />
            <div className="grid grid-cols-3 gap-3">
              {cookingMethodOptions.map((option) => {
                const isSelected = cookingMethods.includes(option.method);
                return (
                  <button
                    key={option.method}
                    onClick={() => toggleCookingMethod(option.method)}
                    className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'bg-[#22C55E]/20 border-2 border-[#22C55E]'
                        : 'bg-[#0A1F13] border border-[#2D5A3D] hover:border-[#22C55E]'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className={`text-xs text-center font-medium ${isSelected ? 'text-[#22C55E]' : 'text-white'}`}>
                      {option.label}
                    </span>
                    <span className="text-[10px] text-[#6B7280] text-center">{option.desc}</span>
                  </button>
                );
              })}
            </div>
            {cookingMethods.length === 0 && (
              <div className="mt-4 p-3 bg-[#0A1F13] rounded-xl border border-[#2D5A3D]">
                <p className="text-sm text-[#6B7280]">
                  🔍 No preference selected - we'll include all cooking methods
                </p>
              </div>
            )}
          </div>

          {/* Section 7: Dorm Chef Mode - Kitchen Equipment */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={Utensils} title="Your Kitchen Equipment" optional />
            <p className="text-[#6B7280] text-sm mb-4">Select what you have — we'll only suggest recipes you can actually make.</p>
            <div className="grid grid-cols-3 gap-3">
              {equipmentOptions.map((eq) => {
                const isSelected = availableEquipment.includes(eq.id);
                return (
                  <button
                    key={eq.id}
                    onClick={() => toggleEquipment(eq.id)}
                    className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'bg-[#22C55E]/20 border-2 border-[#22C55E]'
                        : 'bg-[#0A1F13] border border-[#2D5A3D] hover:border-[#22C55E]'
                    }`}
                  >
                    <span className="text-2xl">{eq.icon}</span>
                    <span className={`text-xs text-center font-medium ${isSelected ? 'text-[#22C55E]' : 'text-white'}`}>
                      {eq.label}
                    </span>
                    <span className="text-[10px] text-[#6B7280] text-center">{eq.desc}</span>
                  </button>
                );
              })}
            </div>
            {availableEquipment.length === 0 && (
              <div className="mt-4 p-3 bg-[#0A1F13] rounded-xl border border-[#2D5A3D]">
                <p className="text-sm text-[#6B7280]">
                  🔍 No equipment selected — we'll include all recipes
                </p>
              </div>
            )}
            {availableEquipment.length > 0 && !availableEquipment.includes('full-kitchen') && (
              <div className="mt-4 p-3 bg-[#22C55E]/10 rounded-xl border border-[#22C55E]/20">
                <p className="text-sm text-[#22C55E]">
                  🏠 Dorm Chef Mode active — showing recipes for: {availableEquipment.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Section 8: Dietary Restrictions */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={AlertCircle} title="Dietary Restrictions" optional />
            <div className="flex flex-wrap gap-3">
              {restrictions.map((item) => {
                const isSelected = dietaryRestrictions.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleDietaryRestriction(item.id)}
                    className={`px-4 py-2.5 rounded-full transition-all ${
                      isSelected
                        ? 'bg-[#22C55E] text-[#052E16] font-medium'
                        : 'bg-[#0A1F13] text-[#9CA3AF] border border-[#2D5A3D] hover:border-[#22C55E] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 9: Allergies & Dislikes */}
          <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
            <SectionHeader icon={AlertCircle} title="Allergies & Dislikes" optional />
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-4 py-4 bg-[#0A1F13] border border-[#2D5A3D] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                placeholder="Search ingredients to avoid..."
              />
              {showSuggestions && searchInput && filteredSuggestions.length > 0 && (
                <div className="absolute z-50 w-full bg-[#1A3625] border border-[#2D5A3D] rounded-xl mt-2 overflow-hidden shadow-xl">
                  {filteredSuggestions.map((ingredient) => (
                    <button
                      key={ingredient}
                      onClick={() => addIngredient(ingredient)}
                      className="block w-full px-4 py-3 text-left text-white hover:bg-[#22C55E] hover:text-[#052E16] transition-colors"
                    >
                      {ingredient}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {avoidIngredients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {avoidIngredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => removeIngredient(ingredient)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full text-sm hover:bg-red-500/30 transition-colors"
                  >
                    {ingredient}
                    <X className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-[#0A1F13] via-[#0A1F13] to-transparent">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={onBack}
            className="py-4 px-6 bg-[#142A1D] text-white rounded-full border border-[#2D5A3D] hover:border-[#22C55E] transition-all flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex-1 py-4 px-8 bg-[#22C55E] text-[#052E16] font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
