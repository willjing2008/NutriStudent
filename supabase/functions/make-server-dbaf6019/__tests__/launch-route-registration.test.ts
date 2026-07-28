import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(
  resolve(process.cwd(), 'supabase/functions/make-server-dbaf6019/index.ts'),
  'utf8',
)

describe('launch route registration', () => {
  it.each([
    ['generate-meal-plan', 15],
    ['shuffle-recipe', 30],
    ['get-swap-options', 30],
    ['generate-recipe-queue', 10],
  ])('keeps auth and rate limiting before free premium policy on %s', (route, max) => {
    expect(source).toContain(
      `/${route}\", requireAuth, rateLimit({ name: \"${route}\", max: ${max}, windowSec: 60 }), requirePremiumAccess`,
    )
  })

  it.each(['leaderboard', 'recipe-leaderboard'])(
    'keeps auth before the disabled Ranks policy on %s',
    (route) => {
      expect(source).toContain(`/${route}\", requireAuth, requireRanksEnabled`)
    },
  )

  it.each(['save-meal-plan', 'save-academic-schedule'])(
    'keeps authenticated ownership on %s',
    (route) => {
      expect(source).toContain(`/${route}\", requireAuth`)
    },
  )

  it('normalizes preferences before writing a saved plan', () => {
    expect(source).toContain('const normalizedPreferences = normalizePreferenceBudget(preferences);')
    expect(source).toContain('preferences: normalizedPreferences,')
  })

  it('uses the compatibility response shape when loading saved plans', () => {
    expect(source).toContain('const responsePreferences = buildPreferenceResponse(data.preferences);')
    expect(source).toContain('preferences: responsePreferences,')
  })

  it('lazily persists the canonical cap on legacy recipe queues', () => {
    expect(source).toContain('const storedQueue: RecipeQueue')
    expect(source).toContain('if (storedQueue.budgetPerMealGbp !== budgetPerMealGbp)')
    expect(source).toContain('await kv.set(`recipe_queue_${userId}`, JSON.stringify(queue));')
  })
})
