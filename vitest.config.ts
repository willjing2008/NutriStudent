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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      // UI primitives are vendored shadcn copies; main.tsx is the bootstrap.
      exclude: ['src/app/components/ui/**', 'src/**/*.d.ts', 'src/main.tsx'],
      // Thresholds are enabled in Phase 3 once meaningful coverage exists.
    },
  },
})
