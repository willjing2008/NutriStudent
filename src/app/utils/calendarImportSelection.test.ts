import { describe, it, expect, beforeEach } from 'vitest';
import {
  defaultCalendarSelection,
  initialCalendarSelection,
  loadStoredCalendarSelection,
  saveStoredCalendarSelection,
} from './calendarImportSelection';

const CALS = [
  { id: 'school', title: 'School Timetable' },
  { id: 'personal', title: 'Personal' },
  { id: 'holidays', title: 'UK Holidays' },
  { id: 'bdays', title: 'Birthdays' },
];

beforeEach(() => {
  localStorage.clear();
});

describe('defaultCalendarSelection', () => {
  it('pre-selects everything except holiday/birthday calendars', () => {
    expect(defaultCalendarSelection(CALS)).toEqual(new Set(['school', 'personal']));
  });

  it('selects nothing when every calendar looks non-class', () => {
    const onlyJunk = [
      { id: 'holidays', title: 'US Holidays' },
      { id: 'bdays', title: 'Birthdays' },
    ];
    expect(defaultCalendarSelection(onlyJunk)).toEqual(new Set());
  });

  it('handles an empty calendar list', () => {
    expect(defaultCalendarSelection([])).toEqual(new Set());
  });
});

describe('stored selection round-trip', () => {
  it('remembers the last-used selection across picker opens', () => {
    saveStoredCalendarSelection(['school']);
    expect(loadStoredCalendarSelection()).toEqual(['school']);
    expect(initialCalendarSelection(CALS)).toEqual(new Set(['school']));
  });

  it('drops remembered ids for calendars that no longer exist', () => {
    saveStoredCalendarSelection(['school', 'deleted-cal']);
    expect(initialCalendarSelection(CALS)).toEqual(new Set(['school']));
  });

  it('falls back to the default when nothing remembered still exists', () => {
    saveStoredCalendarSelection(['deleted-cal']);
    expect(initialCalendarSelection(CALS)).toEqual(new Set(['school', 'personal']));
  });

  it('falls back to the default when nothing was ever stored', () => {
    expect(initialCalendarSelection(CALS)).toEqual(new Set(['school', 'personal']));
  });

  it('ignores corrupt stored values', () => {
    localStorage.setItem('chefpocket.calendarImportSelection', '{not json');
    expect(loadStoredCalendarSelection()).toBeNull();
    localStorage.setItem('chefpocket.calendarImportSelection', JSON.stringify({ a: 1 }));
    expect(loadStoredCalendarSelection()).toBeNull();
    localStorage.setItem('chefpocket.calendarImportSelection', JSON.stringify([1, 2]));
    expect(loadStoredCalendarSelection()).toBeNull();
    expect(initialCalendarSelection(CALS)).toEqual(new Set(['school', 'personal']));
  });

  it('does not throw when storage writes fail', () => {
    const throwingStorage = {
      setItem: () => {
        throw new Error('quota');
      },
    };
    expect(() => saveStoredCalendarSelection(['school'], throwingStorage)).not.toThrow();
  });
});
