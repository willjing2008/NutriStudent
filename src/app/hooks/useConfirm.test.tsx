import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConfirmProvider, useConfirm } from './useConfirm';
import type { ConfirmOptions } from './useConfirm';

/**
 * A consumer that exposes a button to trigger confirm() and records the
 * resolved boolean once the promise settles, so tests can assert on it.
 */
function Consumer({
  options,
  onResolved,
}: {
  options: ConfirmOptions;
  onResolved: (value: boolean) => void;
}) {
  const confirm = useConfirm();
  return (
    <button
      type="button"
      onClick={() => {
        void confirm(options).then(onResolved);
      }}
    >
      ask
    </button>
  );
}

function renderConsumer(options: ConfirmOptions) {
  const onResolved = vi.fn();
  render(
    <ConfirmProvider>
      <Consumer options={options} onResolved={onResolved} />
    </ConfirmProvider>,
  );
  return { onResolved };
}

describe('useConfirm', () => {
  it('throws if used outside a ConfirmProvider', () => {
    // Render the consumer with no provider; React surfaces the thrown error.
    expect(() =>
      render(<Consumer options={{ description: 'x' }} onResolved={vi.fn()} />),
    ).toThrow('useConfirm must be used within a ConfirmProvider');
  });

  it('does not render the dialog until confirm() is called', () => {
    renderConsumer({ description: 'Delete this meal plan?' });

    expect(screen.queryByText('Delete this meal plan?')).not.toBeInTheDocument();
  });

  it('renders the title and description once confirm() is triggered', async () => {
    renderConsumer({
      title: 'Delete plan',
      description: 'This cannot be undone.',
    });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));

    expect(await screen.findByText('Delete plan')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  it('falls back to the default title when none is provided', async () => {
    renderConsumer({ description: 'Proceed with checkout?' });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));

    expect(await screen.findByText('Are you sure?')).toBeInTheDocument();
  });

  it('uses custom confirm and cancel button labels', async () => {
    renderConsumer({
      description: 'Discard changes?',
      confirmText: 'Discard',
      cancelText: 'Keep editing',
    });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));

    expect(await screen.findByText('Discard')).toBeInTheDocument();
    expect(screen.getByText('Keep editing')).toBeInTheDocument();
  });

  it('uses the default Confirm/Cancel labels when none are provided', async () => {
    renderConsumer({ description: 'Generic prompt?' });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));

    expect(await screen.findByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('resolves true when the confirm action is clicked', async () => {
    const { onResolved } = renderConsumer({ description: 'Are you sure?' });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));
    fireEvent.click(await screen.findByText('Confirm'));

    await waitFor(() => expect(onResolved).toHaveBeenCalledWith(true));
  });

  it('resolves false when the cancel action is clicked', async () => {
    const { onResolved } = renderConsumer({ description: 'Are you sure?' });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));
    fireEvent.click(await screen.findByText('Cancel'));

    await waitFor(() => expect(onResolved).toHaveBeenCalledWith(false));
  });

  it('closes the dialog after a choice is made', async () => {
    renderConsumer({ description: 'Dismiss me' });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));
    expect(await screen.findByText('Dismiss me')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() =>
      expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument(),
    );
  });

  it('applies destructive styling to the confirm action when flagged', async () => {
    renderConsumer({
      description: 'Delete account?',
      confirmText: 'Delete',
      destructive: true,
    });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));

    const action = await screen.findByText('Delete');
    expect(action).toHaveClass('bg-red-500');
  });

  it('does not apply destructive styling when the flag is absent', async () => {
    renderConsumer({
      description: 'Save changes?',
      confirmText: 'Save',
    });

    fireEvent.click(screen.getByRole('button', { name: 'ask' }));

    const action = await screen.findByText('Save');
    expect(action).not.toHaveClass('bg-red-500');
  });

  it('resolves a fresh promise on each successive confirm() call', async () => {
    const { onResolved } = renderConsumer({ description: 'Round one?' });

    // First round: confirm -> true.
    fireEvent.click(screen.getByRole('button', { name: 'ask' }));
    fireEvent.click(await screen.findByText('Confirm'));
    await waitFor(() => expect(onResolved).toHaveBeenLastCalledWith(true));

    // Second round: cancel -> false.
    fireEvent.click(screen.getByRole('button', { name: 'ask' }));
    fireEvent.click(await screen.findByText('Cancel'));
    await waitFor(() => expect(onResolved).toHaveBeenLastCalledWith(false));

    expect(onResolved).toHaveBeenCalledTimes(2);
  });
});
