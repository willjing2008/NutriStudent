import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Verifies the paid-mode security ordering on the four premium routes:
//   requireAuth -> rateLimit -> requirePremiumAccess
// When subscriptions are re-enabled, the policy delegates to requirePro, so a
// flood is throttled before an expensive RevenueCat entitlement check.
//
// We exercise the REAL middleware. kv_store is the only runtime import and is
// mocked with an in-memory store; requireAuth (JWT verify, needs Deno/Supabase)
// is stubbed to just set the verified userId, which is all the downstream
// middleware reads.

// In-memory KV so the real rateLimit limiter actually counts.
const store = new Map<string, number>()
vi.mock('../kv_store.tsx', () => ({
  get: async (k: string) => store.get(k),
  set: async (k: string, v: number) => { store.set(k, v) },
}))

import { rateLimit } from '../rate-limit.ts'
import { createPremiumAccessMiddleware, requirePro } from '../entitlement.ts'

const paidPremiumPolicy = createPremiumAccessMiddleware(true, requirePro)

// Count RevenueCat lookups so we can prove the limiter caps them.
let revenueCatCalls = 0
const originalDeno = (globalThis as any).Deno
const originalFetch = globalThis.fetch

beforeEach(() => {
  store.clear()
  revenueCatCalls = 0
  // Pretend production has the key set so requirePro really calls RevenueCat.
  ;(globalThis as any).Deno = { env: { get: (k: string) => (k === 'REVENUECAT_SECRET_KEY' ? 'sk_test' : undefined) } }
  // Fake RevenueCat: 404 => unknown subscriber => not entitled => 402.
  globalThis.fetch = (async () => {
    revenueCatCalls++
    return new Response('not found', { status: 404 })
  }) as typeof fetch
})

afterEach(() => {
  ;(globalThis as any).Deno = originalDeno
  globalThis.fetch = originalFetch
})

// Minimal Hono-compatible context + compose, faithful to how Hono runs a
// middleware stack: each middleware gets (c, next); returning a Response (from
// c.json) short-circuits the chain.
type Mw = (c: any, next: () => Promise<any>) => Promise<any>

function makeContext(userId: string) {
  const data = new Map<string, any>()
  const c: any = {
    res: undefined,
    get: (k: string) => data.get(k),
    set: (k: string, v: any) => data.set(k, v),
    req: { header: () => undefined },
    // Like Hono: c.json sets the response on the context and returns it.
    json: (body: any, status = 200) => { c.res = { status, body }; return c.res },
  }
  return c
}

async function run(userId: string, chain: Mw[]) {
  const c = makeContext(userId)
  const dispatch = async (i: number): Promise<any> => {
    const mw = chain[i]
    return mw(c, () => dispatch(i + 1))
  }
  await dispatch(0)
  return c.res
}

// Stubbed requireAuth: sets the token-derived userId, as the real one does.
const requireAuth = (userId: string): Mw => async (c, next) => { c.set('userId', userId); return next() }
const handler: Mw = async (c) => c.json({ ok: true }, 200)

const MAX = 15 // matches generate-meal-plan's configured limit
const USER = 'non-pro-user-123'

describe('paywalled route middleware order: rateLimit before requirePro', () => {
  it('keeps authentication and rate limiting active during free launch', async () => {
    const freePremiumPolicy = createPremiumAccessMiddleware(false, requirePro)
    const chain: Mw[] = [
      requireAuth(USER),
      rateLimit({ name: 'generate-meal-plan', max: MAX, windowSec: 60 }),
      freePremiumPolicy,
      handler,
    ]

    for (let i = 1; i <= MAX + 1; i++) {
      const res = await run(USER, chain)
      expect(res.status).toBe(i <= MAX ? 200 : 429)
    }
    expect(revenueCatCalls).toBe(0)
  })

  it('throttles a non-Pro flood at the limiter and caps RevenueCat calls', async () => {
    // Paid-mode order corresponding to /generate-meal-plan registration.
    const chain: Mw[] = [
      requireAuth(USER),
      rateLimit({ name: 'generate-meal-plan', max: MAX, windowSec: 60 }),
      paidPremiumPolicy,
      handler,
    ]

    for (let i = 1; i <= MAX + 5; i++) {
      const res = await run(USER, chain)
      if (i <= MAX) expect(res.status).toBe(402) // reached requirePro, non-Pro => 402
      else expect(res.status).toBe(429)          // throttled before requirePro
    }

    // The whole point: a single caller can trigger at most `max` RevenueCat
    // lookups per window, no matter how hard they hammer the endpoint.
    expect(revenueCatCalls).toBe(MAX)

    // Contrast: the OLD order (requirePro first) would let the same flood hit
    // RevenueCat on every request — unbounded denial-of-wallet.
    store.clear()
    revenueCatCalls = 0
    const oldChain: Mw[] = [
      requireAuth(USER),
      requirePro,
      rateLimit({ name: 'generate-meal-plan', max: MAX, windowSec: 60 }),
      handler,
    ]
    for (let i = 1; i <= MAX + 5; i++) await run(USER, oldChain)
    const oldOrderCalls = revenueCatCalls
    expect(oldOrderCalls).toBe(MAX + 5) // every request reached RevenueCat
  })
})
