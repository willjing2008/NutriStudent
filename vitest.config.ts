import { defineConfig } from 'vitest/config'
import path from 'path'

// No @vitejs/plugin-react here: vitest transforms JSX via esbuild (automatic
// runtime, per tsconfig jsx: react-jsx). Including the plugin spun up a
// dev-server instance that kept the process alive after tests ("close timed
// out"). esbuild covers our component tests fine.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // ios/** matters: an Xcode build tree (ios/App/build) contains recursive
    // symlinks (SPM checkouts, e.g. purchases-root -> ../../..) that send the
    // test-file glob into an infinite walk — vitest then GC-thrashes at the
    // RUN banner and OOMs without ever collecting a test.
    exclude: ['node_modules/**', 'dist/**', 'e2e/**', 'ios/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/**/*.{ts,tsx}',
        // Backend pure-logic modules exercised under __tests__/. index.ts (the
        // Hono server), kv_store, rate-limit and auth-middleware need a Deno
        // runtime, and recipe-data is generated data — those are covered via
        // deploy/integration rather than Vitest.
        'supabase/functions/make-server-dbaf6019/ingredient-overlap.ts',
        'supabase/functions/make-server-dbaf6019/focus-classifier.ts',
        'supabase/functions/make-server-dbaf6019/image-query-helper.ts',
        'supabase/functions/make-server-dbaf6019/recipe-adapter.ts',
        'supabase/functions/_shared/allergy-contract.ts',
        'supabase/functions/_shared/budget-contract.ts',
        'supabase/functions/_shared/launch-config.ts',
        'supabase/functions/make-server-dbaf6019/launch-policy.ts',
        'supabase/functions/make-server-dbaf6019/meal-plan-generator.ts',
        'supabase/functions/make-server-dbaf6019/recipe-budget.ts',
        'supabase/functions/make-server-dbaf6019/recipe-queue.ts',
        'supabase/functions/make-server-dbaf6019/validate.ts',
        'supabase/functions/make-server-dbaf6019/calorie-ninjas.ts',
        'supabase/functions/make-server-dbaf6019/achievements.ts',
        'supabase/functions/make-server-dbaf6019/academic-schedule.ts',
      ],
      // UI primitives are vendored shadcn copies; main.tsx is the bootstrap.
      exclude: ['src/app/components/ui/**', 'src/**/*.d.ts', 'src/main.tsx'],
      // Thresholds are enabled in Phase 3 once meaningful coverage exists.
    },
  },
})
