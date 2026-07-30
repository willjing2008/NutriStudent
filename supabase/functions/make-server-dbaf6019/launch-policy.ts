import type { Context, Next } from 'npm:hono'
import { LAUNCH_CONFIG } from '../_shared/launch-config.ts'

export function createRanksEnabledMiddleware(ranksEnabled: boolean) {
  return async function ranksEnabledMiddleware(
    c: Context,
    next: Next,
  ): Promise<Response | void> {
    if (!ranksEnabled) {
      return c.json({ error: 'Feature unavailable' }, 404)
    }
    await next()
  }
}

export const requireRanksEnabled = createRanksEnabledMiddleware(
  LAUNCH_CONFIG.ranksEnabled,
)
