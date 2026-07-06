import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ImageWithFallback } from './ImageWithFallback';

describe('ImageWithFallback', () => {
  it('lazy-loads and async-decodes images by default', () => {
    render(<ImageWithFallback src="meal.jpg" alt="Meal" />);

    const image = screen.getByRole('img', { name: 'Meal' });
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('allows callers to opt critical images into eager loading', () => {
    render(<ImageWithFallback src="hero.jpg" alt="Hero meal" loading="eager" />);

    expect(screen.getByRole('img', { name: 'Hero meal' })).toHaveAttribute('loading', 'eager');
  });

  it('still calls caller-provided load handlers after clearing the skeleton', () => {
    const onLoad = vi.fn();
    render(<ImageWithFallback src="meal.jpg" alt="Meal" onLoad={onLoad} />);

    const image = screen.getByRole('img', { name: 'Meal' });
    fireEvent.load(image);

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(image).not.toHaveClass('animate-pulse');
  });
});
