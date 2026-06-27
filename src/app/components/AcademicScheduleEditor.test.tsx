import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AcademicScheduleEditor } from './AcademicScheduleEditor';
import type { AcademicSchedule, ClassEntry, MealTimeOverride } from '../types/calendar';

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

function makeSchedule(classes: ClassEntry[], overrides: MealTimeOverride[] = []): AcademicSchedule {
  return {
    classes,
    testingPeriods: [],
    sleepSchedule: { bedtime: '23:00', wakeTime: '07:00', lastMealBeforeBed: 120 },
    mealTimeOverrides: overrides,
    updatedAt: '2026-06-16T00:00:00.000Z',
  };
}

function renderEditor(overrides: Partial<Parameters<typeof AcademicScheduleEditor>[0]> = {}) {
  const props = {
    schedule: makeSchedule([makeClass()]),
    onSave: vi.fn().mockResolvedValue(undefined),
    onClose: vi.fn(),
    // jsdom is treated as the web build, so manual class entry stays available.
    ...overrides,
  };
  render(<AcademicScheduleEditor {...props} />);
  return props;
}

describe('AcademicScheduleEditor — class time validation (web fallback)', () => {
  it('saves a valid schedule (end after start), preserving meal-time overrides', async () => {
    const overrides: MealTimeOverride[] = [{ dayOfWeek: 1, mealSlot: 'lunch', time: '13:00' }];
    const onSave = vi.fn().mockResolvedValue(undefined);
    renderEditor({ schedule: makeSchedule([makeClass()], overrides), onSave });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    // Whole blob must be passed back so the backend doesn't wipe non-calendar fields.
    expect(onSave.mock.calls[0][0]).toMatchObject({
      mealTimeOverrides: overrides,
      classes: expect.any(Array),
    });
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

describe('AcademicScheduleEditor — exam periods (focus mode driver)', () => {
  it('lets the user add an exam period and saves it', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    renderEditor({ schedule: makeSchedule([]), onSave });

    fireEvent.click(screen.getByRole('button', { name: /Exam Periods/i }));
    fireEvent.click(screen.getByRole('button', { name: /Add Exam Period/i }));

    fireEvent.change(screen.getByPlaceholderText(/Name \(e\.g\., Midterm Exams\)/i), {
      target: { value: 'Finals' },
    });
    const dateInputs = document.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[0], { target: { value: '2026-12-10' } });
    fireEvent.change(dateInputs[1], { target: { value: '2026-12-18' } });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave.mock.calls[0][0].testingPeriods).toEqual([
      expect.objectContaining({ name: 'Finals', startDate: '2026-12-10', endDate: '2026-12-18', type: 'midterm' }),
    ]);
  });

  it('blocks saving when an exam period ends before it starts', () => {
    const schedule = makeSchedule([]);
    schedule.testingPeriods = [
      { id: 'p1', name: 'Bad', startDate: '2026-12-18', endDate: '2026-12-10', type: 'final' },
    ];
    renderEditor({ schedule });

    fireEvent.click(screen.getByRole('button', { name: /Exam Periods/i }));
    expect(screen.getByText('End date must be on or after the start date.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });
});

describe('AcademicScheduleEditor — sleep schedule (sleep-friendly dinners driver)', () => {
  it('edits bedtime and persists the sleep schedule', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    renderEditor({ schedule: makeSchedule([]), onSave });

    fireEvent.click(screen.getByRole('button', { name: /Sleep/i }));
    const bedtime = screen.getByDisplayValue('23:00');
    fireEvent.change(bedtime, { target: { value: '22:30' } });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave.mock.calls[0][0].sleepSchedule).toMatchObject({ bedtime: '22:30' });
  });
});

describe('AcademicScheduleEditor — native build hides manual class entry', () => {
  it('does not render a Classes tab when class entry is disallowed', () => {
    renderEditor({ schedule: makeSchedule([]), allowClassEntry: false });
    expect(screen.queryByRole('button', { name: /Add Class$/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Exam Periods/i })).toBeInTheDocument();
  });
});
