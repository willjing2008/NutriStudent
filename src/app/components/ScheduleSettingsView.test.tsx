import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScheduleSettingsView } from './ScheduleSettingsView';
import type { AcademicSchedule } from '../types/calendar';

// Toggled per test: true = native (import-only classes), false = web fallback.
const calState = vi.hoisted(() => ({ native: true }));
vi.mock('../utils/systemCalendar', () => ({
  get calendarImportSupported() {
    return calState.native;
  },
}));

function makeSchedule(): AcademicSchedule {
  return {
    classes: [
      { id: 'c1', name: 'Maths', dayOfWeek: 1, startTime: '09:00', endTime: '10:00', color: '#3B82F6' },
      { id: 'c2', name: 'Biology', dayOfWeek: 2, startTime: '11:00', endTime: '12:00', color: '#8B5CF6' },
    ],
    testingPeriods: [],
    sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
    mealTimeOverrides: [],
    updatedAt: '2026-07-01T00:00:00.000Z',
  };
}

function renderView(overrides: Partial<Parameters<typeof ScheduleSettingsView>[0]> = {}) {
  const props = {
    schedule: makeSchedule(),
    onImportClasses: vi.fn(),
    onManageClasses: vi.fn(),
    onEditExamsSleep: vi.fn(),
    onDeleteClass: vi.fn(),
    ...overrides,
  };
  render(<ScheduleSettingsView {...props} />);
  return props;
}

beforeEach(() => {
  calState.native = true;
});

describe('ScheduleSettingsView - native per-class delete (P1-3)', () => {
  it('shows a delete button per class on native and reports the class id', () => {
    const { onDeleteClass } = renderView();

    fireEvent.click(screen.getByRole('button', { name: 'Delete Biology' }));

    expect(onDeleteClass).toHaveBeenCalledTimes(1);
    expect(onDeleteClass).toHaveBeenCalledWith('c2');
  });

  it('hides delete buttons on web, where the manual editor already handles it', () => {
    calState.native = false;
    renderView();

    expect(screen.queryByRole('button', { name: /^Delete / })).not.toBeInTheDocument();
    // Web fallback keeps the manual entry point instead.
    expect(screen.getByRole('button', { name: /Edit/ })).toBeInTheDocument();
  });

  it('renders no delete buttons when onDeleteClass is not provided', () => {
    renderView({ onDeleteClass: undefined });
    expect(screen.queryByRole('button', { name: /^Delete / })).not.toBeInTheDocument();
  });

  it('disables delete buttons while a schedule save is pending', () => {
    const { onDeleteClass } = renderView({ isSaving: true });
    const deleteButton = screen.getByRole('button', { name: 'Delete Biology' });

    expect(deleteButton).toBeDisabled();
    fireEvent.click(deleteButton);
    expect(onDeleteClass).not.toHaveBeenCalled();
  });
});
