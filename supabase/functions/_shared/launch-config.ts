// Product launch policy is owned here for both the web bundle and Edge Function.
// These values must not be inferred from missing credentials or platform state.
// Ranks needs no flag: the feature was fully removed (client tab and backend
// routes deleted), so old clients simply receive plain 404s.
export const LAUNCH_CONFIG = {
  subscriptionsEnabled: false,
} as const
