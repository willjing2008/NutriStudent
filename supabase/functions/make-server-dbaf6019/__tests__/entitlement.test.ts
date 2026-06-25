import { describe, it, expect } from 'vitest'
import { isEntitlementActive } from '../entitlement.ts'

const NOW = Date.parse('2026-06-25T00:00:00Z')
const ID = 'NutriStudent Pro'

describe('isEntitlementActive', () => {
  it('is false when the subscriber is missing or has no entitlements', () => {
    expect(isEntitlementActive(null, ID, NOW)).toBe(false)
    expect(isEntitlementActive(undefined, ID, NOW)).toBe(false)
    expect(isEntitlementActive({}, ID, NOW)).toBe(false)
    expect(isEntitlementActive({ entitlements: {} }, ID, NOW)).toBe(false)
  })

  it('is false when the entitlement exists but is expired', () => {
    const sub = { entitlements: { [ID]: { expires_date: '2026-06-24T23:59:59Z' } } }
    expect(isEntitlementActive(sub, ID, NOW)).toBe(false)
  })

  it('is true when the entitlement expires in the future', () => {
    const sub = { entitlements: { [ID]: { expires_date: '2026-07-25T00:00:00Z' } } }
    expect(isEntitlementActive(sub, ID, NOW)).toBe(true)
  })

  it('is true for a lifetime grant (null expiry)', () => {
    expect(isEntitlementActive({ entitlements: { [ID]: { expires_date: null } } }, ID, NOW)).toBe(true)
    expect(isEntitlementActive({ entitlements: { [ID]: {} } }, ID, NOW)).toBe(true)
  })

  it('is false for an unparseable expiry', () => {
    const sub = { entitlements: { [ID]: { expires_date: 'not-a-date' } } }
    expect(isEntitlementActive(sub, ID, NOW)).toBe(false)
  })

  it('only matches the configured entitlement id', () => {
    const sub = { entitlements: { 'Some Other Pro': { expires_date: null } } }
    expect(isEntitlementActive(sub, ID, NOW)).toBe(false)
  })
})
