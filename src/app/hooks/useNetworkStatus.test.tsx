import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { useNetworkStatus } from './useNetworkStatus';

const setNavigatorOnline = (isOnline: boolean) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value: isOnline,
  });
};

function StatusProbe() {
  const { isOnline } = useNetworkStatus();
  return <div>{isOnline ? 'online' : 'offline'}</div>;
}

beforeEach(() => {
  setNavigatorOnline(true);
});

describe('useNetworkStatus', () => {
  it('uses navigator.onLine for the initial state', () => {
    setNavigatorOnline(false);

    render(<StatusProbe />);

    expect(screen.getByText('offline')).toBeInTheDocument();
  });

  it('updates when the browser emits online and offline events', () => {
    render(<StatusProbe />);

    expect(screen.getByText('online')).toBeInTheDocument();

    act(() => {
      setNavigatorOnline(false);
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByText('offline')).toBeInTheDocument();

    act(() => {
      setNavigatorOnline(true);
      window.dispatchEvent(new Event('online'));
    });
    expect(screen.getByText('online')).toBeInTheDocument();
  });
});
