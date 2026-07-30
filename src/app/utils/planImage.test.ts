import { describe, it, expect } from 'vitest';
import { firstMealImage, DEFAULT_PLAN_IMAGE } from './planImage';

describe('firstMealImage', () => {
  it('returns the first meal image when present', () => {
    expect(firstMealImage([{ image: 'a.jpg' }, { image: 'b.jpg' }])).toBe('a.jpg');
  });

  it('skips meals with no image and uses a later imageUrl', () => {
    expect(firstMealImage([{ image: '' }, { imageUrl: 'b.jpg' }])).toBe('b.jpg');
  });

  it('prefers image over imageUrl on the same meal', () => {
    expect(firstMealImage([{ image: 'a.jpg', imageUrl: 'b.jpg' }])).toBe('a.jpg');
  });

  it('returns the default when no meal has an image', () => {
    expect(firstMealImage([{ image: '' }, { imageUrl: null }])).toBe(DEFAULT_PLAN_IMAGE);
  });

  it('returns the default for empty or nullish input', () => {
    expect(firstMealImage([])).toBe(DEFAULT_PLAN_IMAGE);
    expect(firstMealImage(undefined)).toBe(DEFAULT_PLAN_IMAGE);
    expect(firstMealImage(null)).toBe(DEFAULT_PLAN_IMAGE);
  });
});
