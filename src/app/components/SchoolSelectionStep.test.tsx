import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ── Mocks ────────────────────────────────────────────────────────────────────
// SchoolSelectionStep talks to two external surfaces:
//   1. raw `fetch` for the genuinely-public schools/search endpoint, and
//   2. authedPost (apiClient) for adding a school and confirming the selection.
// We mock both so the unit renders in isolation and never hits the network.
// (The component itself does not call useLanguage — all of its copy is
// hardcoded English — so there is nothing to mock there.)

const { authedPost } = vi.hoisted(() => ({ authedPost: vi.fn() }));
vi.mock('../utils/apiClient', () => ({ authedPost }));

import { SchoolSelectionStep } from './SchoolSelectionStep';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// ── Helpers ──────────────────────────────────────────────────────────────────
// Real timers are used throughout. The search debounce is 300ms, comfortably
// inside waitFor's default 1000ms window, so we let it elapse naturally rather
// than installing fake timers (which deadlock waitFor's own polling).

type School = { id: string; name: string };

const SEARCH_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/schools/search`;

const searchResponse = (schools: School[]): Response =>
  ({ ok: true, status: 200, json: async () => ({ schools }) } as unknown as Response);

const getFetchMock = (): ReturnType<typeof vi.fn> =>
  global.fetch as unknown as ReturnType<typeof vi.fn>;

// Pull the `q` query param out of a recorded fetch call URL.
const queryOf = (url: string): string =>
  new URL(url).searchParams.get('q') ?? '';

const renderStep = (overrides: { userId?: string; onComplete?: () => void } = {}) => {
  const props = {
    userId: 'user-1',
    onComplete: vi.fn(),
    ...overrides,
  };
  render(<SchoolSelectionStep {...props} />);
  return props;
};

beforeEach(() => {
  authedPost.mockReset();
  // Default search returns two schools for both the mount call and debounce.
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      searchResponse([
        { id: 's1', name: 'Oxford University' },
        { id: 's2', name: 'Cambridge University' },
      ]),
    ),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ── Mount: initial unfiltered search ─────────────────────────────────────────

describe('SchoolSelectionStep — initial load', () => {
  it('searches with an empty query on mount and renders the results', async () => {
    renderStep();

    // The mount effect fires searchSchools('') immediately.
    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );
    expect(screen.getByText('Cambridge University')).toBeInTheDocument();

    const [url, init] = getFetchMock().mock.calls[0];
    expect((url as string).startsWith(SEARCH_BASE)).toBe(true);
    expect(queryOf(url as string)).toBe('');
    // Public endpoint is hit with the anon key, not a session JWT.
    expect((init.headers as Record<string, string>).Authorization).toBe(
      `Bearer ${publicAnonKey}`,
    );
  });
});

// ── Search input drives the query ────────────────────────────────────────────

describe('SchoolSelectionStep — search', () => {
  it('queries the endpoint with the typed text after the debounce', async () => {
    renderStep();

    // Let the mount search settle first.
    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );

    getFetchMock().mockResolvedValue(
      searchResponse([{ id: 's2', name: 'Cambridge University' }]),
    );

    fireEvent.change(screen.getByPlaceholderText('Search for your school...'), {
      target: { value: 'cambridge' },
    });

    // The debounced effect eventually queries with the typed text.
    await waitFor(() => {
      const calls = getFetchMock().mock.calls;
      const lastUrl = calls[calls.length - 1][0] as string;
      expect(queryOf(lastUrl)).toBe('cambridge');
    });

    // Filtered results replace the list.
    await waitFor(() =>
      expect(screen.queryByText('Oxford University')).not.toBeInTheDocument(),
    );
    expect(screen.getByText('Cambridge University')).toBeInTheDocument();
  });

  it('shows the no-results empty state when a query returns nothing', async () => {
    renderStep();
    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );

    getFetchMock().mockResolvedValue(searchResponse([]));

    fireEvent.change(screen.getByPlaceholderText('Search for your school...'), {
      target: { value: 'nonexistent' },
    });

    await waitFor(() =>
      expect(screen.getByText('No schools found')).toBeInTheDocument(),
    );
    expect(screen.queryByText('Oxford University')).not.toBeInTheDocument();
  });

  it('falls back to the no-schools-yet state when search fails with an empty query', async () => {
    // Mount search rejects -> catch sets schools to []. With no query typed,
    // the empty state reads "No schools yet".
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    renderStep();

    await waitFor(() =>
      expect(screen.getByText('No schools yet')).toBeInTheDocument(),
    );
  });
});

// ── Selecting a school ───────────────────────────────────────────────────────

describe('SchoolSelectionStep — selection', () => {
  it('marks a school as selected when its row is clicked', async () => {
    renderStep();
    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );

    // Continue is disabled until something is selected.
    const continueBtn = screen.getByRole('button', { name: /Continue/ });
    expect(continueBtn).toBeDisabled();

    fireEvent.click(screen.getByText('Oxford University'));

    // Selecting enables Continue and highlights the chosen row.
    expect(continueBtn).toBeEnabled();
    const selectedRow = screen.getByText('Oxford University').closest('button');
    expect(selectedRow?.className).toContain('border-[#22C55E]');
  });
});

// ── Confirm forwards the chosen school ───────────────────────────────────────

describe('SchoolSelectionStep — confirm', () => {
  it('posts the chosen school via authedPost and calls onComplete', async () => {
    authedPost.mockResolvedValue({ success: true });
    const { onComplete } = renderStep({ userId: 'user-42' });

    await waitFor(() =>
      expect(screen.getByText('Cambridge University')).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText('Cambridge University'));
    fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith('schools/select', {
        userId: 'user-42',
        schoolId: 's2',
        schoolName: 'Cambridge University',
      }),
    );
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });

  it('renders the server error and does not call onComplete when confirm fails', async () => {
    authedPost.mockRejectedValue(new Error('Could not save school'));
    const { onComplete } = renderStep();

    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText('Oxford University'));
    fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

    await waitFor(() =>
      expect(screen.getByText('Could not save school')).toBeInTheDocument(),
    );
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('does nothing when Continue is clicked with no school selected', async () => {
    renderStep();
    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );

    // Disabled button: clicking it must not reach authedPost.
    fireEvent.click(screen.getByRole('button', { name: /Continue/ }));
    expect(authedPost).not.toHaveBeenCalled();
  });
});

// ── Add a new school ─────────────────────────────────────────────────────────

describe('SchoolSelectionStep — add new school', () => {
  it('creates a school via authedPost and selects it', async () => {
    authedPost.mockResolvedValue({ school: { id: 's-new', name: 'New College' } });
    renderStep();
    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText('Add new school'));

    fireEvent.change(screen.getByPlaceholderText('Enter school name'), {
      target: { value: 'New College' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith('schools', { name: 'New College' }),
    );

    // Adding selects the new school, so Continue becomes enabled and confirming
    // forwards the freshly-created school.
    authedPost.mockResolvedValue({ success: true });
    const continueBtn = screen.getByRole('button', { name: /Continue/ });
    await waitFor(() => expect(continueBtn).toBeEnabled());

    fireEvent.click(continueBtn);
    await waitFor(() =>
      expect(authedPost).toHaveBeenCalledWith(
        'schools/select',
        expect.objectContaining({ schoolId: 's-new', schoolName: 'New College' }),
      ),
    );
  });

  it('toggles between the search view and the add-school view', async () => {
    renderStep();
    await waitFor(() =>
      expect(screen.getByText('Oxford University')).toBeInTheDocument(),
    );

    expect(
      screen.getByPlaceholderText('Search for your school...'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add new school'));
    expect(screen.getByPlaceholderText('Enter school name')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Search for your school...'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Search instead'));
    expect(
      screen.getByPlaceholderText('Search for your school...'),
    ).toBeInTheDocument();
  });
});
