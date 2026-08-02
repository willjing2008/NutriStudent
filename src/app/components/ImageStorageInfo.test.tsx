import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ImageStorageInfo } from './ImageStorageInfo';

const fetchMock = vi.fn();

describe('ImageStorageInfo', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a fallback error when the endpoint check rejects null', async () => {
    fetchMock.mockRejectedValue(null);

    render(<ImageStorageInfo />);
    fireEvent.click(screen.getByRole('button', { name: /check system status/i }));

    await waitFor(() => {
      expect(screen.getByText(/Cannot connect to image storage endpoints/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Error: Unknown error/i)).toBeInTheDocument();
  });
});
