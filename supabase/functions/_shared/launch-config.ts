// Product launch policy is owned here for both the web bundle and Edge Function.
// These values must not be inferred from missing credentials or platform state.
export const LAUNCH_CONFIG = {
  subscriptionsEnabled: false,
  ranksEnabled: false,
} as const
