export type Gender = 'male' | 'female' | 'decline' | null;

export interface NutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

const TARGETS: Record<'male' | 'female' | 'decline', NutritionTargets> = {
  male:    { calories: 2500, protein: 75, carbs: 300, fats: 80, fiber: 35 },
  female:  { calories: 2000, protein: 50, carbs: 250, fats: 60, fiber: 25 },
  decline: { calories: 2250, protein: 63, carbs: 275, fats: 70, fiber: 30 },
};

export function getNutritionTargets(gender: Gender): NutritionTargets {
  return gender && gender in TARGETS ? TARGETS[gender as keyof typeof TARGETS] : TARGETS.decline;
}
