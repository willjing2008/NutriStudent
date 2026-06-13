import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
