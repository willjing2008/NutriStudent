import { describe, it, expect } from 'vitest';
import { TESTING_TYPE_OPTIONS, normalizeTestingType } from './testingPeriodTypes';

describe('normalizeTestingType', () => {
  it('passes through the universal taxonomy values unchanged', () => {
    for (const value of ['exam', 'mock', 'coursework', 'custom'] as const) {
      expect(normalizeTestingType(value)).toBe(value);
    }
  });

  it('collapses the legacy US-centric values onto "exam"', () => {
    expect(normalizeTestingType('midterm')).toBe('exam');
    expect(normalizeTestingType('final')).toBe('exam');
    expect(normalizeTestingType('quiz')).toBe('exam');
  });

  it('falls back to "custom" for unknown, empty, or missing values', () => {
    expect(normalizeTestingType('pop-quiz')).toBe('custom');
    expect(normalizeTestingType('')).toBe('custom');
    expect(normalizeTestingType(null)).toBe('custom');
    expect(normalizeTestingType(undefined)).toBe('custom');
  });

  it('every editor option value normalizes to itself', () => {
    for (const opt of TESTING_TYPE_OPTIONS) {
      expect(normalizeTestingType(opt.value)).toBe(opt.value);
    }
  });
});
