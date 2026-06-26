import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AcademicScheduleEditor } from './AcademicScheduleEditor';
import type { AcademicSchedule, ClassEntry } from '../types/calendar';

function makeClass(overrides: Partial<ClassEntry> = {}): ClassEntry {
  return {
    id: overrides.id ?? 'c1',
    name: 'Calculus',
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    color: '#3B82F6',
    ...overrides,
  };
}

function makeSchedule(classes: ClassEntry[]): AcademicSchedule {
  return {
    classes,
    testingPeriods: [],
    sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
    updatedAt: '2026-06-16T00:00:00.000Z',
  };
}

function renderEditor(overrides: Partial<Parameters<typeof AcademicScheduleEditor>[0]> = {}) {
  const props = {
    schedule: makeSchedule([makeClass()]),
    onSave: vi.fn().mockResolvedValue(undefined),
    onClose: vi.fn(),
    ...overrides,
  };
  render(<AcademicScheduleEditor {...props} />);
  return props;
}

describe('AcademicScheduleEditor — class time validation', () => {
  it('saves a valid schedule (end after start)', async () => {
    const { onSave } = renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
  });

  it('blocks saving and flags a class whose end is not after its start', () => {
    const { onSave } = renderEditor({
      schedule: makeSchedule([makeClass({ startTime: '10:00', endTime: '09:00' })]),
    });

    expect(screen.getByText('End time must be after the start time.')).toBeInTheDocument();
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeDisabled();

    fireEvent.click(saveButton);
    expect(onSave).not.toHaveBeenCalled();
  });

  it('treats equal start and end times as invalid', () => {
    renderEditor({
      schedule: makeSchedule([makeClass({ startTime: '12:00', endTime: '12:00' })]),
    });

    expect(screen.getByText('End time must be after the start time.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });
});
