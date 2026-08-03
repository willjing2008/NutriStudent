import { describe, expect, it } from 'vitest'
import { LAUNCH_CONFIG } from '../launch-config.ts'

describe('initial launch policy', () => {
  it('ships with subscriptions intentionally disabled', () => {
    expect(LAUNCH_CONFIG).toEqual({
      subscriptionsEnabled: false,
    })
  })
})
