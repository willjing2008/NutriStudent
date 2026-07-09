import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

let shouldThrow = true;
function Bomb() {
  if (shouldThrow) throw new Error('boom');
  return <div>recovered content</div>;
}

beforeEach(() => {
  shouldThrow = true;
  // React logs caught render errors to console.error; keep test output clean.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  it('contains a child render crash instead of unmounting siblings', () => {
    render(
      <div>
        <div>sibling content</div>
        <ErrorBoundary label="Admin Dashboard">
          <Bomb />
        </ErrorBoundary>
      </div>
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Admin Dashboard ran into a problem');
    expect(screen.getByText('sibling content')).toBeInTheDocument();
  });

  it('re-renders children after "Try again"', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');

    shouldThrow = false;
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByText('recovered content')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
