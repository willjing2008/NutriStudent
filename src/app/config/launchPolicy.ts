/**
 * Launch policy: product-level feature switches for what ships in the current release.
 *
 * This is deliberately a plain constant module (no env plumbing): flipping a flag is a
 * one-line code change reviewed like any other. If/when a server-shared launch-config
 * module lands under supabase/functions/_shared, this file should re-export from it so
 * client and server stay in lockstep.
 */
export interface LaunchPolicy {
  scheduleEnabled: boolean;
}

export const launchPolicy: LaunchPolicy = {
  /**
   * The academic-schedule feature (class calendar import, exam periods, sleep schedule,
   * conflict banners/badges, schedule tab & settings editor). Deferred from the initial
   * launch; all schedule UI is hidden when false. Server routes and any saved schedule
   * data are untouched - flipping this back to true revives the feature intact.
   */
  scheduleEnabled: false,
};
