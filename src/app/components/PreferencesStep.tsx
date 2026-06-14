import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X, Calendar, Users, Target, Clock, AlertCircle, Sunrise, Sun, Moon } from 'lucide-react';
import { UserPreferences, MealTimes } from '../App';
import { getLocalTodayISO } from '../utils/dateUtils';

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
  // Default the shopping date to today; never start it in the past (a stale
  // saved value could otherwise anchor the whole plan to a past week).
  const [shoppingDate, setShoppingDate] = useState(
    preferences.shoppingDate && preferences.shoppingDate >= getLocalTodayISO()
      ? preferences.shoppingDate
      : getLocalTodayISO(),
  );
  const [mealsPerDay, setMealsPerDay] = useState(preferences.mealsPerDay);
  const [goal, setGoal] = useState(preferences.goal);
  const [maxCookingTime, setMaxCookingTime] = useState(preferences.maxCookingTime);
  const [avoidIngredients, setAvoidIngredients] = useState<string[]>(
    preferences.avoidIngredients || []
  );
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mealTimes, setMealTimes] = useState<MealTimes>(
    preferences.mealTimes || { breakfast: '08:00', lunch: '12:00', dinner: '18:00' }
  );
  const [selectedMealSlots, setSelectedMealSlots] = useState<Set<'breakfast' | 'lunch' | 'dinner'>>(
    new Set(preferences.selectedMealSlots || ['breakfast', 'lunch', 'dinner'])
  );

  // Dietary restrictions state
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(
    preferences.dietaryRestrictions || []
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

  const handleNext = () => {
    // For 3+ meals all slots are active; for <3, use the user's selection
    const activeSlots = mealsPerDay >= 3
      ? ['breakfast', 'lunch', 'dinner'] as ('breakfast' | 'lunch' | 'dinner')[]
      : (['breakfast', 'lunch', 'dinner'] as const).filter(k => selectedMealSlots.has(k));
    updatePreferences({
      shoppingDate,
      mealsPerDay,
      goal,
      maxCookingTime,
      avoidIngredients,
      dietaryRestrictions,
      mealTimes,
      selectedMealSlots: activeSlots,
    });
    onNext();
  };

  const canProceed = shoppingDate && goal;

  const goals = [
    { id: 'study' as const, name: 'Study Focus', description: 'Brain-boosting meals' },
    { id: 'work' as const, name: 'Work Efficiency', description: 'Energy-sustaining foods' },
    { id: 'fitness' as const, name: 'Fitness Goals', description: 'High-protein meals' },
  ];

  const restrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'keto', label: 'Keto' },
  ];

  const cookingTimeOptions = [
    { time: 15, label: '15 min', name: 'Quicker' },
    { time: 30, label: '30 min', name: 'Quick' },
    { time: 45, label: '45 min', name: 'Moderate' },
    { time: 60, label: '60 min', name: 'Take Time' },
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
            Help us tailor a meal plan that fits your lifestyle.
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
                min={getLocalTodayISO()}
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
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setMealsPerDay(num);
                    if (num >= 3) {
                      setSelectedMealSlots(new Set(['breakfast', 'lunch', 'dinner']));
                    } else {
                      // Keep current selection but trim to fit, or default sensibly
                      setSelectedMealSlots(prev => {
                        if (prev.size <= num) return prev;
                        const kept = [...prev].slice(0, num);
                        return new Set(kept) as Set<'breakfast' | 'lunch' | 'dinner'>;
                      });
                    }
                  }}
                  className={`py-4 rounded-xl font-semibold text-lg transition-all ${
                    mealsPerDay === num
                      ? 'bg-[#22C55E] text-[#052E16]'
                      : 'bg-[#0A1F13] text-white border border-[#2D5A3D] hover:border-[#22C55E]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Meal Type Selection — only shown when fewer than 3 meals */}
          {mealsPerDay < 3 && (
            <div className="bg-[#142A1D] rounded-2xl p-5 border border-[#2D5A3D]">
              <SectionHeader icon={Clock} title="Which Meals?" />
              <p className="text-[#6B7280] text-sm mb-4">
                {`Pick which ${mealsPerDay === 1 ? 'meal' : 'meals'} you'd like to include.`}
              </p>

              <div className="flex gap-2">
                {([
                  { key: 'breakfast' as const, label: 'Breakfast', icon: Sunrise, color: '#F59E0B' },
                  { key: 'lunch' as const, label: 'Lunch', icon: Sun, color: '#22C55E' },
                  { key: 'dinner' as const, label: 'Dinner', icon: Moon, color: '#8B5CF6' },
                ]).map(({ key, label, icon: MealIcon, color }) => {
                  const active = selectedMealSlots.has(key);
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedMealSlots(prev => {
                          const next = new Set(prev);
                          if (active) {
                            if (next.size > 1) next.delete(key);
                          } else {
                            if (next.size < mealsPerDay) next.add(key);
                            else {
                              const first = [...next][0];
                              next.delete(first);
                              next.add(key);
                            }
                          }
                          return next;
                        });
                      }}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all ${
                        active
                          ? 'bg-[#0A1F13] border-2 border-[#22C55E]'
                          : 'bg-[#0A1F13] border border-[#2D5A3D] opacity-50 hover:opacity-75'
                      }`}
                    >
                      <MealIcon className="w-4 h-4" style={{ color: active ? color : '#6B7280' }} />
                      <span className={`text-xs font-medium ${active ? 'text-white' : 'text-[#6B7280]'}`}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                    className={`w-full p-4 rounded-xl transition-all flex items-center ${
                      isSelected
                        ? 'bg-[#22C55E]/20 border-2 border-[#22C55E]'
                        : 'bg-[#0A1F13] border border-[#2D5A3D] hover:border-[#22C55E]'
                    }`}
                  >
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
                We'll only suggest recipes that take <strong>{maxCookingTime} minutes or less</strong> to cook
              </p>
            </div>
          </div>

          {/* Section 6: Dietary Restrictions */}
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

          {/* Section 7: Allergies & Dislikes */}
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
