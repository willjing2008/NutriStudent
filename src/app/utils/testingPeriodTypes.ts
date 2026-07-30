import type { TestingPeriodType } from '../types/calendar';

/**
 * Exam-period type options shown in the schedule editor. Deliberately
 * market-neutral: the old Midterm/Final/Quiz taxonomy read as US-only
 * (a sixth-former sitting A-levels has none of those).
 */
export const TESTING_TYPE_OPTIONS: { value: TestingPeriodType; label: string }[] = [
  { value: 'exam', label: 'Exam' },
  { value: 'mock', label: 'Mock exam' },
  { value: 'coursework', label: 'Coursework deadline' },
  { value: 'custom', label: 'Custom' },
];

/**
 * Map any stored exam-period type (including the legacy US-centric values)
 * onto the universal taxonomy. Legacy real-assessment types collapse to
 * 'exam'; anything unrecognized becomes 'custom'.
 */
export function normalizeTestingType(type: string | null | undefined): TestingPeriodType {
  switch (type) {
    case 'exam':
    case 'mock':
    case 'coursework':
    case 'custom':
      return type;
    case 'midterm':
    case 'final':
    case 'quiz':
      return 'exam';
    default:
      return 'custom';
  }
}
