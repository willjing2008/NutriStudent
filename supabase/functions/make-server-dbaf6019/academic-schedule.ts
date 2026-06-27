// Pure builder for the stored academic-schedule blob. Lives outside index.ts so
// it can be unit-tested under vitest (index.ts needs the Deno runtime).
//
// Regression guard: mealTimeOverrides MUST be persisted here. It was previously
// dropped (the handler destructured only classes/testingPeriods/sleepSchedule),
// so overrides written by the client and read by get-meal-conflicts silently
// vanished on reload.

const DEFAULT_SLEEP = { bedtime: "23:00", wakeTime: "07:00", lastMealBeforeBed: 120 };

// Build the persisted blob from untrusted request body. Each field defaults the
// same way (`?? []` / default object), consistent with classes/testingPeriods.
export function buildAcademicSchedule(body: any, updatedAt: string) {
  return {
    classes: body?.classes ?? [],
    testingPeriods: body?.testingPeriods ?? [],
    sleepSchedule: body?.sleepSchedule ?? DEFAULT_SLEEP,
    mealTimeOverrides: body?.mealTimeOverrides ?? [],
    updatedAt,
  };
}
