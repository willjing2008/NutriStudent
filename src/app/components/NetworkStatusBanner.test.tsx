import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { NetworkStatusBanner } from './NetworkStatusBanner';

const setNavigatorOnline = (isOnline: boolean) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value: isOnline,
  });
};

beforeEach(() => {
  setNavigatorOnline(true);
});

describe('NetworkStatusBanner', () => {
  it('is hidden while the device is online', () => {
    render(<NetworkStatusBanner />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows an offline status message and hides again after reconnecting', () => {
    setNavigatorOnline(false);
    render(<NetworkStatusBanner />);

    expect(screen.getByRole('status')).toHaveTextContent('No internet connection');
    expect(screen.getByText(/saved meal plans still work/i)).toBeInTheDocument();

    act(() => {
      setNavigatorOnline(true);
      window.dispatchEvent(new Event('online'));
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
