import { describe, expect, it, vi } from 'vitest'
import { createPremiumAccessMiddleware } from '../entitlement.ts'
import { createRanksEnabledMiddleware } from '../launch-policy.ts'

type Middleware = (context: any, next: () => Promise<void>) => Promise<unknown>

const makeContext = () => ({
  json: vi.fn((body: unknown, status = 200) => ({ body, status })),
})

describe('premium access launch policy', () => {
  it('grants free launch access without calling RevenueCat policy', async () => {
    const paidPolicy = vi.fn()
    const next = vi.fn(async () => {})
    const middleware = createPremiumAccessMiddleware(false, paidPolicy as Middleware)

    await middleware(makeContext() as any, next)

    expect(next).toHaveBeenCalledOnce()
    expect(paidPolicy).not.toHaveBeenCalled()
  })

  it('delegates to fail-closed paid enforcement when re-enabled', async () => {
    const response = { status: 503 }
    const paidPolicy = vi.fn(async () => response)
    const next = vi.fn(async () => {})
    const middleware = createPremiumAccessMiddleware(true, paidPolicy as Middleware)

    await expect(middleware(makeContext() as any, next)).resolves.toBe(response)
    expect(paidPolicy).toHaveBeenCalledOnce()
    expect(next).not.toHaveBeenCalled()
  })
})

describe('Ranks launch policy', () => {
  it('returns 404 before the ranking handler runs', async () => {
    const context = makeContext()
    const next = vi.fn(async () => {})
    const middleware = createRanksEnabledMiddleware(false)

    await expect(middleware(context as any, next)).resolves.toEqual({
      body: { error: 'Feature unavailable' },
      status: 404,
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('allows the dormant ranking handlers when deliberately re-enabled', async () => {
    const next = vi.fn(async () => {})
    const middleware = createRanksEnabledMiddleware(true)

    await middleware(makeContext() as any, next)

    expect(next).toHaveBeenCalledOnce()
  })
})
