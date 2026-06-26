import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { WeeklyScheduleView, mealColumnDow } from './WeeklyScheduleView';
import type { AcademicSchedule, ClassEntry, MealConflict } from '../types/calendar';

// WeeklyScheduleView does not call useLanguage itself, but it is mocked per the
// project convention so any nested child that reaches for it stays isolated and
// no real provider is ever required.
vi.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (k: string) => k,
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

// ── Fixtures ──────────────────────────────────────────────────────────────

// DAY_LABELS in the component is Sunday-first: ['Sun','Mon','Tue','Wed','Thu',
// 'Fri','Sat'] (index 0 = Sun ... index 6 = Sat). Meals map via dayNumber % 7:
//   day1 -> 1 (Mon), day2 -> 2 (Tue) ... day6 -> 6 (Sat), day7 -> 0 (Sun).
// This is the *correct* mapping the test locks in.
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Meal blocks are positioned with `left: calc(${((dayIdx + 1) / 8) * 100}% + 2px)`
// where dayIdx is the 0-based DAY_LABELS column index. Reproduce that here so the
// assertion fails loudly if the placement math drifts.
function expectedLeft(dayIdx: number): string {
  return `calc(${((dayIdx + 1) / 8) * 100}% + 2px)`;
}

function makeClass(overrides: Partial<ClassEntry> = {}): ClassEntry {
  return {
    id: 'class-default',
    name: 'Economics',
    dayOfWeek: 1, // Monday (0=Sun..6=Sat)
    startTime: '09:00',
    endTime: '10:00',
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

// A meal as it appears in currentWeekMeals. Names are kept <=8 chars so the
// component's `meal.name?.slice(0, 8)` renders them verbatim for text matching.
type WeekMeal = {
  dayNumber: number;
  category: string;
  name: string;
  nutrition?: { calories: number; protein: number };
  cookingTime?: number;
};

function makeMeal(overrides: Partial<WeekMeal> = {}): WeekMeal {
  return {
    dayNumber: 1,
    category: 'breakfast',
    name: 'Oats',
    ...overrides,
  };
}

type ViewProps = Parameters<typeof WeeklyScheduleView>[0];

function renderView(overrides: Partial<ViewProps> = {}) {
  const props: ViewProps = {
    schedule: makeSchedule([makeClass()]),
    mealConflicts: [],
    isTestingPeriod: false,
    onEditSchedule: vi.fn(),
    ...overrides,
  };
  render(<WeeklyScheduleView {...props} />);
  return props;
}

// ── Empty / setup state ─────────────────────────────────────────────────────

describe('WeeklyScheduleView — empty schedule', () => {
  it('shows the setup empty state when schedule is null', () => {
    const onEditSchedule = vi.fn();
    renderView({ schedule: null, onEditSchedule });

    expect(screen.getByText('Set Up Your Schedule')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add Classes' }));
    expect(onEditSchedule).toHaveBeenCalledWith('classes');
  });

  it('shows the setup empty state when there are no classes', () => {
    renderView({ schedule: makeSchedule([]) });

    expect(screen.getByText('Set Up Your Schedule')).toBeInTheDocument();
    // The weekly grid (and its day headers) must not render in the empty state.
    expect(screen.queryByText('Edit Schedule')).not.toBeInTheDocument();
  });
});

// ── Grid scaffold + classes ─────────────────────────────────────────────────

describe('WeeklyScheduleView — grid and classes', () => {
  it('renders all seven Sunday-first day-header columns', () => {
    renderView();

    // Header labels appear (Sat/Sun included). getAllByText guards against the
    // labels also showing inside popovers later — here only the headers exist.
    DAY_LABELS.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('renders a class block with its name and location', () => {
    renderView({
      schedule: makeSchedule([
        makeClass({ id: 'c1', name: 'Calculus', location: 'Room 204', dayOfWeek: 2 }),
      ]),
    });

    expect(screen.getByText('Calculus')).toBeInTheDocument();
    expect(screen.getByText('Room 204')).toBeInTheDocument();
  });

  it('positions a class block in the column matching its dayOfWeek (Sun-first)', () => {
    renderView({
      schedule: makeSchedule([
        // dayOfWeek 0 = Sunday -> left column (dayIdx 0).
        makeClass({ id: 'sun', name: 'SunClass', dayOfWeek: 0 }),
        // dayOfWeek 6 = Saturday -> last column (dayIdx 6).
        makeClass({ id: 'sat', name: 'SatClass', dayOfWeek: 6 }),
      ]),
    });

    const sun = screen.getByText('SunClass').closest('button')!;
    const sat = screen.getByText('SatClass').closest('button')!;
    // Class blocks share the same left formula as meals: ((dayOfWeek+1)/8)*100%.
    expect(sun.style.left).toBe(expectedLeft(0));
    expect(sat.style.left).toBe(expectedLeft(6));
  });

  it('opens a class detail popover showing the day label and time on click', () => {
    renderView({
      schedule: makeSchedule([
        makeClass({ id: 'c1', name: 'History', dayOfWeek: 3, startTime: '14:00', endTime: '15:00' }),
      ]),
    });

    fireEvent.click(screen.getByText('History'));

    // The popover renders "<day>, <time range>" — a single combined node. The
    // bare "Wed" header column is a separate node, so match the full string.
    expect(screen.getByText('Wed, 2pm – 3pm')).toBeInTheDocument();
    expect(screen.getByText('Edit Class')).toBeInTheDocument();
  });
});

// ── Meal -> day-column mapping (the core regression lock) ────────────────────

describe('WeeklyScheduleView — meal day-column mapping', () => {
  // One breakfast meal per dayNumber 1..7. Unique <=8-char names so each is
  // individually findable, and the day7 -> Sunday wrap is exercised explicitly.
  const weekBreakfasts: WeekMeal[] = [
    makeMeal({ dayNumber: 1, name: 'MonMeal' }), // -> Mon (col 1)
    makeMeal({ dayNumber: 2, name: 'TueMeal' }), // -> Tue (col 2)
    makeMeal({ dayNumber: 3, name: 'WedMeal' }), // -> Wed (col 3)
    makeMeal({ dayNumber: 4, name: 'ThuMeal' }), // -> Thu (col 4)
    makeMeal({ dayNumber: 5, name: 'FriMeal' }), // -> Fri (col 5)
    makeMeal({ dayNumber: 6, name: 'SatMeal' }), // -> Sat (col 6)
    makeMeal({ dayNumber: 7, name: 'SunMeal' }), // -> Sun (col 0)  <-- boundary
  ];

  // dayNumber -> expected DAY_LABELS column index (dayNumber % 7).
  const cases: Array<{ name: string; dayIdx: number; label: string }> = [
    { name: 'MonMeal', dayIdx: 1, label: 'Mon' },
    { name: 'TueMeal', dayIdx: 2, label: 'Tue' },
    { name: 'WedMeal', dayIdx: 3, label: 'Wed' },
    { name: 'ThuMeal', dayIdx: 4, label: 'Thu' },
    { name: 'FriMeal', dayIdx: 5, label: 'Fri' },
    { name: 'SatMeal', dayIdx: 6, label: 'Sat' },
    { name: 'SunMeal', dayIdx: 0, label: 'Sun' },
  ];

  it.each(cases)(
    'places $name in the $label column (dayNumber % 7 = $dayIdx)',
    ({ name, dayIdx }) => {
      renderView({ currentWeekMeals: weekBreakfasts });

      const block = screen.getByText(name).closest('button')!;
      expect(block.style.left).toBe(expectedLeft(dayIdx));
    },
  );

  it('maps day7 to the Sunday column, NOT a Monday/eighth-day off-by-one', () => {
    renderView({ currentWeekMeals: [makeMeal({ dayNumber: 7, name: 'SunMeal' })] });

    const sunBlock = screen.getByText('SunMeal').closest('button')!;
    // Sunday is column index 0 -> left = ((0+1)/8)*100% = 12.5%.
    expect(sunBlock.style.left).toBe(expectedLeft(0));
    // It must specifically NOT land where Monday (col 1) or a phantom 8th day sit.
    expect(sunBlock.style.left).not.toBe(expectedLeft(1));
    expect(sunBlock.style.left).not.toBe(expectedLeft(7));
  });

  it('confirms the meal block opens a popover labelled with its mapped day', () => {
    renderView({ currentWeekMeals: [makeMeal({ dayNumber: 7, name: 'SunMeal' })] });

    fireEvent.click(screen.getByText('SunMeal'));

    // MealPopover header reads "<label> — <DAY_LABELS[dayIdx]>"; day7 -> Sun.
    expect(screen.getByText(/Breakfast — Sun/)).toBeInTheDocument();
    // The off-by-one (day7 -> Mon) header must NOT appear.
    expect(screen.queryByText(/Breakfast — Mon/)).not.toBeInTheDocument();
  });

  it('routes meals into the correct slot row by category', () => {
    renderView({
      currentWeekMeals: [
        makeMeal({ dayNumber: 1, category: 'breakfast', name: 'Brekkie' }),
        makeMeal({ dayNumber: 1, category: 'lunch', name: 'Lunchie' }),
        makeMeal({ dayNumber: 1, category: 'dinner', name: 'Dinnie' }),
      ],
    });

    const breakfast = screen.getByText('Brekkie').closest('button')!;
    const lunch = screen.getByText('Lunchie').closest('button')!;
    const dinner = screen.getByText('Dinnie').closest('button')!;

    // All three sit in the same Monday column (dayIdx 1)...
    expect(breakfast.style.left).toBe(expectedLeft(1));
    expect(lunch.style.left).toBe(expectedLeft(1));
    expect(dinner.style.left).toBe(expectedLeft(1));
    // ...but stack at different vertical positions (08:00 < 12:00 < 18:00).
    const top = (el: HTMLElement) => parseInt(el.style.top, 10);
    expect(top(breakfast)).toBeLessThan(top(lunch));
    expect(top(lunch)).toBeLessThan(top(dinner));
  });

  it('falls back to the dinner slot when a meal has no category', () => {
    renderView({
      currentWeekMeals: [{ dayNumber: 2, name: 'NoCat' } as WeekMeal],
    });

    fireEvent.click(screen.getByText('NoCat'));
    // Uncategorised meals default to the dinner slot, still on Tuesday.
    expect(screen.getByText(/Dinner — Tue/)).toBeInTheDocument();
  });
});

// ── Empty days + no meals ───────────────────────────────────────────────────

describe('WeeklyScheduleView — empty days', () => {
  it('still renders every empty meal slot block when no meals are provided', () => {
    renderView({ currentWeekMeals: [] });

    // 3 slots x 7 days = 21 meal-slot buttons, all empty (emoji-only). They have
    // no meal name, so we count emoji occurrences across the grid.
    const breakfastEmojis = screen.getAllByText('🌅');
    const lunchEmojis = screen.getAllByText('☀️');
    const dinnerEmojis = screen.getAllByText('🌙');
    expect(breakfastEmojis).toHaveLength(7);
    expect(lunchEmojis).toHaveLength(7);
    expect(dinnerEmojis).toHaveLength(7);
  });

  it('shows the "no meal assigned" popover for an empty day-slot', () => {
    // A single Monday breakfast — clicking any *other* empty slot shows the empty
    // popover. Click an empty Sunday breakfast (no meal there).
    renderView({ currentWeekMeals: [makeMeal({ dayNumber: 1, name: 'MonMeal' })] });

    // Grab all breakfast slot buttons; the Sunday one (col 0) holds no meal.
    const breakfastButtons = screen.getAllByText('🌅').map((s) => s.closest('button')!);
    const sundaySlot = breakfastButtons.find(
      (b) => b.style.left === expectedLeft(0),
    )!;
    expect(sundaySlot).toBeTruthy();

    fireEvent.click(sundaySlot);
    expect(screen.getByText('No meal assigned yet')).toBeInTheDocument();
  });

  it('leaves a day with no meal empty while a neighbouring day shows its meal', () => {
    // Only Tuesday (day2) has a meal; Monday (day1) column stays meal-less.
    renderView({ currentWeekMeals: [makeMeal({ dayNumber: 2, name: 'TueMeal' })] });

    const tueBlock = screen.getByText('TueMeal').closest('button')!;
    expect(tueBlock.style.left).toBe(expectedLeft(2));

    // No meal-name text exists in the Monday column; only the emoji placeholder.
    expect(screen.queryByText('MonMeal')).not.toBeInTheDocument();
  });
});

// ── Start-weekday anchoring (regression: plan-day-1 vs real start day) ───────

describe('WeeklyScheduleView — weekStartDow anchoring', () => {
  it('mealColumnDow anchors day 1 to the start weekday', () => {
    // Monday start (default) reproduces the historical dayNumber % 7 mapping.
    expect(mealColumnDow(1, 1)).toBe(1); // Mon
    expect(mealColumnDow(1, 7)).toBe(0); // Sun (boundary)
    // Wednesday start (3): day 1 -> Wed, day 5 wraps to Sun.
    expect(mealColumnDow(3, 1)).toBe(3);
    expect(mealColumnDow(3, 5)).toBe(0);
    // Sunday start (0) must not produce a negative column.
    expect(mealColumnDow(0, 1)).toBe(0);
    expect(mealColumnDow(0, 7)).toBe(6);
  });

  it('places plan day 1 under the real start weekday column when provided', () => {
    // Plan starts on a Wednesday (dayIdx 3) — day 1's meal belongs in that column,
    // not the Monday column the old `dayNumber % 7` would have used.
    renderView({
      weekStartDow: 3,
      currentWeekMeals: [makeMeal({ dayNumber: 1, name: 'Day1Meal' })],
    });

    const block = screen.getByText('Day1Meal').closest('button')!;
    expect(block.style.left).toBe(expectedLeft(3)); // Wed
    expect(block.style.left).not.toBe(expectedLeft(1)); // not Mon
  });
});

// ── Conflicts ───────────────────────────────────────────────────────────────

describe('WeeklyScheduleView — conflicts', () => {
  it('surfaces a conflict warning inside the meal popover for the conflicting slot', () => {
    const conflict: MealConflict = {
      mealSlot: 'lunch',
      className: 'Statistics',
      classStart: '12:00',
      classEnd: '13:00',
      suggestion: 'Move lunch earlier',
    };
    renderView({
      mealConflicts: [conflict],
      currentWeekMeals: [makeMeal({ dayNumber: 1, category: 'lunch', name: 'Salad' })],
    });

    fireEvent.click(screen.getByText('Salad'));

    expect(screen.getByText(/Statistics/)).toBeInTheDocument();
    expect(screen.getByText(/Move lunch earlier/)).toBeInTheDocument();
  });

  it('renders the conflict-resolution panel when weekConflicts are supplied', () => {
    const weekConflicts = new Map<number, MealConflict[]>([
      [
        1,
        [
          {
            mealSlot: 'lunch',
            className: 'Statistics',
            classStart: '12:00',
            classEnd: '13:00',
            suggestion: 'Move lunch earlier',
          },
        ],
      ],
    ]);
    renderView({ weekConflicts, onSaveMealTimeOverride: vi.fn() });

    expect(
      screen.getByText('Adjust Meal Times for Conflict Days'),
    ).toBeInTheDocument();
    // Panel lists the conflicting class under its day (dow 1 -> Mon).
    const panel = screen
      .getByText('Adjust Meal Times for Conflict Days')
      .closest('div')!.parentElement!;
    expect(within(panel).getByText('Statistics')).toBeInTheDocument();
  });
});
