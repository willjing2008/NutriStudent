import { useState } from 'react';
import { User, Activity, Calendar, Ruler, Weight, Target, ArrowRight, ArrowLeft, Info } from 'lucide-react';

interface PersonalInfo {
  age: number;
  height: number;
  weight: number;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  gender: 'male' | 'female' | 'other' | '';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active' | '';
  dietaryGoal: 'maintain' | 'lose' | 'gain' | 'muscle' | '';
}

interface PersonalInfoStepProps {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: PersonalInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoStep({ personalInfo, updatePersonalInfo, onNext, onBack }: PersonalInfoStepProps) {
  const [info, setInfo] = useState<PersonalInfo>(personalInfo);
  const [showBMI, setShowBMI] = useState(false);

  const updateField = <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
    const updated = { ...info, [field]: value };
    setInfo(updated);
    updatePersonalInfo(updated);
  };

  const handleHeightChange = (value: string) => {
    updateField('height', parseFloat(value) || 0);
  };

  const handleWeightChange = (value: string) => {
    updateField('weight', parseFloat(value) || 0);
  };

  const toggleHeightUnit = () => {
    const newUnit = info.heightUnit === 'cm' ? 'ft' : 'cm';
    let newHeight = info.height;
    
    if (newUnit === 'ft' && info.heightUnit === 'cm') {
      // Convert cm to ft
      newHeight = parseFloat((info.height / 30.48).toFixed(1));
    } else if (newUnit === 'cm' && info.heightUnit === 'ft') {
      // Convert ft to cm
      newHeight = parseFloat((info.height * 30.48).toFixed(0));
    }
    
    setInfo({ ...info, height: newHeight, heightUnit: newUnit });
    updatePersonalInfo({ ...info, height: newHeight, heightUnit: newUnit });
  };

  const toggleWeightUnit = () => {
    const newUnit = info.weightUnit === 'kg' ? 'lbs' : 'kg';
    let newWeight = info.weight;
    
    if (newUnit === 'lbs' && info.weightUnit === 'kg') {
      // Convert kg to lbs
      newWeight = parseFloat((info.weight * 2.20462).toFixed(1));
    } else if (newUnit === 'kg' && info.weightUnit === 'lbs') {
      // Convert lbs to kg
      newWeight = parseFloat((info.weight / 2.20462).toFixed(1));
    }
    
    setInfo({ ...info, weight: newWeight, weightUnit: newUnit });
    updatePersonalInfo({ ...info, weight: newWeight, weightUnit: newUnit });
  };

  const calculateBMI = (): number | null => {
    if (!info.height || !info.weight) return null;
    
    let heightInMeters = info.height;
    let weightInKg = info.weight;
    
    if (info.heightUnit === 'ft') {
      heightInMeters = info.height * 0.3048; // ft to meters
    } else {
      heightInMeters = info.height / 100; // cm to meters
    }
    
    if (info.weightUnit === 'lbs') {
      weightInKg = info.weight / 2.20462; // lbs to kg
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Healthy Weight', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-amber-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const calculateDailyCalories = (): number | null => {
    if (!info.age || !info.height || !info.weight || !info.gender || !info.activityLevel) return null;
    
    let heightInCm = info.height;
    let weightInKg = info.weight;
    
    if (info.heightUnit === 'ft') {
      heightInCm = info.height * 30.48;
    }
    
    if (info.weightUnit === 'lbs') {
      weightInKg = info.weight / 2.20462;
    }
    
    // Mifflin-St Jeor Equation
    let bmr: number;
    if (info.gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * info.age + 5;
    } else if (info.gender === 'female') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * info.age - 161;
    } else {
      // Use average for 'other'
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * info.age - 78;
    }
    
    // Activity multipliers
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    
    const tdee = bmr * activityMultipliers[info.activityLevel];
    
    // Adjust based on dietary goal
    let adjusted = tdee;
    if (info.dietaryGoal === 'lose') {
      adjusted = tdee - 500; // 500 calorie deficit
    } else if (info.dietaryGoal === 'gain' || info.dietaryGoal === 'muscle') {
      adjusted = tdee + 300; // 300 calorie surplus
    }
    
    return Math.round(adjusted);
  };

  const isFormValid = () => {
    return info.age > 0 && info.height > 0 && info.weight > 0;
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(bmi) : null;
  const dailyCalories = calculateDailyCalories();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Personal Information</h1>
              <p className="text-white/90 mt-1">Help us personalize your nutrition plan</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Info className="w-4 h-4" />
            <span>Your data is private and used only for personalized recommendations</span>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {/* Age & Gender */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  Age
                </label>
                <input
                  type="number"
                  value={info.age || ''}
                  onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                  placeholder="Enter your age"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
                  min="1"
                  max="120"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-green-500" />
                  Gender
                </label>
                <select
                  value={info.gender}
                  onChange={(e) => updateField('gender', e.target.value as PersonalInfo['gender'])}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Ruler className="w-4 h-4 text-green-500" />
                Height
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.1"
                  value={info.height || ''}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  placeholder={info.heightUnit === 'cm' ? "e.g., 175" : "e.g., 5.7"}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
                />
                <button
                  onClick={toggleHeightUnit}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold border-2 border-gray-200"
                >
                  {info.heightUnit}
                </button>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Weight className="w-4 h-4 text-green-500" />
                Weight
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.1"
                  value={info.weight || ''}
                  onChange={(e) => handleWeightChange(e.target.value)}
                  placeholder={info.weightUnit === 'kg' ? "e.g., 70" : "e.g., 154"}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
                />
                <button
                  onClick={toggleWeightUnit}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold border-2 border-gray-200"
                >
                  {info.weightUnit}
                </button>
              </div>
            </div>

            {/* BMI Display */}
            {bmi && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Your BMI</div>
                    <div className="text-2xl font-bold text-gray-900">{bmi}</div>
                  </div>
                  {bmiInfo && (
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${bmiInfo.color}`}>
                        {bmiInfo.category}
                      </div>
                      <div className="text-xs text-gray-500">Body Mass Index</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Activity className="w-4 h-4 text-green-500" />
                Activity Level
              </label>
              <select
                value={info.activityLevel}
                onChange={(e) => updateField('activityLevel', e.target.value as PersonalInfo['activityLevel'])}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors"
              >
                <option value="">Select your activity level</option>
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very-active">Very Active (intense exercise daily)</option>
              </select>
            </div>

            {/* Dietary Goal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Target className="w-4 h-4 text-green-500" />
                Dietary Goal
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'maintain', label: 'Maintain Weight', emoji: '⚖️' },
                  { value: 'lose', label: 'Lose Weight', emoji: '📉' },
                  { value: 'gain', label: 'Gain Weight', emoji: '📈' },
                  { value: 'muscle', label: 'Build Muscle', emoji: '💪' },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => updateField('dietaryGoal', goal.value as PersonalInfo['dietaryGoal'])}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      info.dietaryGoal === goal.value
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{goal.emoji}</div>
                    <div className="text-xs font-semibold text-gray-700">{goal.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Calorie Recommendation */}
            {dailyCalories && (
              <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Recommended Daily Calories</div>
                    <div className="text-3xl font-bold text-gray-900">{dailyCalories} kcal</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Based on your personal metrics and {info.dietaryGoal === 'maintain' ? 'maintenance' : info.dietaryGoal === 'lose' ? 'weight loss' : 'weight gain'} goal
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all shadow-md border-2 border-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <button
              onClick={onNext}
              disabled={!isFormValid()}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-lg ${
                isFormValid()
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
