import { Activity, Flame, Drumstick, Wheat, Droplet } from 'lucide-react';

interface NutritionDashboardProps {
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
  };
  dailyTargets?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  goal: string;
  dayNumber?: number; // NEW: Optional day number for header
}

// Circular progress ring component
function ProgressRing({ 
  percentage, 
  color, 
  size = 120,
  strokeWidth = 10 
}: { 
  percentage: number; 
  color: string; 
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-gray-200"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

export function NutritionDashboard({ totalNutrition, dailyTargets, goal, dayNumber }: NutritionDashboardProps) {
  // Default targets based on goal if not provided
  const targets = dailyTargets || {
    calories: goal === 'fitness' ? 2400 : goal === 'work' ? 2200 : 2000,
    protein: goal === 'fitness' ? 150 : goal === 'work' ? 80 : 70,
    carbs: goal === 'fitness' ? 250 : goal === 'work' ? 250 : 230,
    fats: goal === 'fitness' ? 70 : goal === 'work' ? 75 : 65,
  };

  const stats = [
    {
      label: 'Calories',
      value: totalNutrition.calories,
      target: targets.calories,
      unit: 'kcal',
      icon: Flame,
      color: '#f59e0b', // amber-500
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Protein',
      value: totalNutrition.protein,
      target: targets.protein,
      unit: 'g',
      icon: Drumstick,
      color: '#ef4444', // red-500
      gradient: 'from-red-500 to-pink-500',
    },
    {
      label: 'Carbs',
      value: totalNutrition.carbs,
      target: targets.carbs,
      unit: 'g',
      icon: Wheat,
      color: '#3b82f6', // blue-500
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Fats',
      value: totalNutrition.fats,
      target: targets.fats,
      unit: 'g',
      icon: Droplet,
      color: '#8b5cf6', // violet-500
      gradient: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-green-600" />
        <h3 className="text-gray-900 flex items-center gap-2">
          Today's Nutrition Overview
          {dayNumber && <span className="text-sm font-semibold text-gray-500"> - Day {dayNumber}</span>}
        </h3>
      </div>

      {/* Nutrition Rings Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const percentage = Math.round((stat.value / stat.target) * 100);
          const Icon = stat.icon;
          const isComplete = percentage >= 100;
          const isLow = percentage < 50;

          return (
            <div key={stat.label} className="flex flex-col items-center">
              {/* Circular Progress Ring */}
              <div className="relative mb-3">
                <ProgressRing percentage={percentage} color={stat.color} size={110} strokeWidth={8} />
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Icon className="w-6 h-6 mb-1" style={{ color: stat.color }} />
                  <div className="text-2xl font-bold text-gray-900">
                    {percentage}%
                  </div>
                </div>
              </div>

              {/* Label and values */}
              <div className="text-center">
                <div className={`text-sm font-semibold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-900">{stat.value}</span> / {stat.target} {stat.unit}
                </div>
                
                {/* Status indicator */}
                {isComplete ? (
                  <div className="text-xs text-green-600 font-medium mt-1">
                    ✓ Target met!
                  </div>
                ) : isLow ? (
                  <div className="text-xs text-orange-600 font-medium mt-1">
                    {stat.target - stat.value} {stat.unit} to go
                  </div>
                ) : (
                  <div className="text-xs text-blue-600 font-medium mt-1">
                    {stat.target - stat.value} {stat.unit} left
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fiber info if available */}
      {totalNutrition.fiber && totalNutrition.fiber > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-700">Dietary Fiber</span>
            </div>
            <span className="text-sm font-bold text-green-600">
              {totalNutrition.fiber}g
            </span>
          </div>
        </div>
      )}

      {/* Goal-specific tip */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-700">
          {goal === 'fitness' && (
            <>
              <span className="font-semibold text-blue-900">💪 Fitness Tip:</span> Aim for {targets.protein}g protein daily to support muscle recovery and growth.
            </>
          )}
          {goal === 'work' && (
            <>
              <span className="font-semibold text-blue-900">💼 Work Tip:</span> Balanced macros help maintain steady energy throughout your workday.
            </>
          )}
          {goal === 'study' && (
            <>
              <span className="font-semibold text-blue-900">📚 Study Tip:</span> Complex carbs and protein fuel your brain for better concentration and memory.
            </>
          )}
        </p>
      </div>
    </div>
  );
}