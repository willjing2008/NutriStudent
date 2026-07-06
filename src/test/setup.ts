// Global test setup. Adds jest-dom matchers (toBeInTheDocument, etc.) to
// Vitest's expect for component tests.
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Unmount React trees between tests (globals are off, so this isn't automatic).
afterEach(() => cleanup())
