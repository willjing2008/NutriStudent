import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { NetworkStatusBanner } from './NetworkStatusBanner';

const setNavigatorOnline = (isOnline: boolean) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value: isOnline,
  });
};

const goOnline = () => {
  setNavigatorOnline(true);
  window.dispatchEvent(new Event('online'));
};

const goOffline = () => {
  setNavigatorOnline(false);
  window.dispatchEvent(new Event('offline'));
};

function NavigationHarness() {
  const [screenName, setScreenName] = useState('Home');

  return (
    <>
      <NetworkStatusBanner />
      <button type="button" onClick={() => setScreenName('Create Plan')}>
        Navigate
      </button>
      <div>{screenName}</div>
    </>
  );
}

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
      goOnline();
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('hides for the rest of the offline episode when dismissed', () => {
    setNavigatorOnline(false);
    render(<NetworkStatusBanner />);

    const banner = screen.getByRole('status');
    expect(banner).toHaveAttribute('aria-live', 'polite');

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows again for a fresh offline episode after a reconnect', () => {
    setNavigatorOnline(false);
    render(<NetworkStatusBanner />);

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    act(() => {
      goOnline();
    });
    act(() => {
      goOffline();
    });

    expect(screen.getByRole('status')).toHaveTextContent('No internet connection');
  });

  it('stays dismissed while navigating during the same offline episode', () => {
    setNavigatorOnline(false);
    render(<NavigationHarness />);

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    fireEvent.click(screen.getByRole('button', { name: 'Navigate' }));

    expect(screen.getByText('Create Plan')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
