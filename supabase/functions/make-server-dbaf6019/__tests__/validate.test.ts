import { describe, it, expect } from 'vitest'
import { vStr, vNum, vStrArr, vArr } from '../validate.ts'

describe('vStr', () => {
  it('trims strings and caps them at the default length', () => {
    expect(vStr('  hello  ')).toBe('hello')
    expect(vStr('x'.repeat(300))).toHaveLength(200)
  })

  it('respects a custom max length (after trimming)', () => {
    expect(vStr('  abcdef  ', 3)).toBe('abc')
  })

  it('coerces non-strings to an empty string', () => {
    expect(vStr(123)).toBe('')
    expect(vStr(null)).toBe('')
    expect(vStr(undefined)).toBe('')
    expect(vStr({})).toBe('')
  })
})

describe('vNum', () => {
  it('clamps finite numbers into [min, max]', () => {
    expect(vNum(5, 0, 10)).toBe(5)
    expect(vNum(15, 0, 10)).toBe(10)
    expect(vNum(-5, 0, 10)).toBe(0)
  })

  it('coerces numeric strings', () => {
    expect(vNum('7', 0, 10)).toBe(7)
    expect(vNum('99', 0, 10)).toBe(10)
  })

  it('returns the fallback for non-finite / non-coercible input', () => {
    expect(vNum('abc', 0, 10)).toBe(0) // default fallback is min
    expect(vNum(undefined, 2, 10)).toBe(2)
    expect(vNum('abc', 2, 10, 5)).toBe(5)
    expect(vNum(Infinity, 0, 10, 3)).toBe(3)
    expect(vNum(NaN, 0, 10, 4)).toBe(4)
  })
})

describe('vStrArr', () => {
  it('returns [] for non-arrays', () => {
    expect(vStrArr('nope')).toEqual([])
    expect(vStrArr(null)).toEqual([])
  })

  it('trims entries and drops empties', () => {
    expect(vStrArr(['  a  ', '', '   ', 'b'])).toEqual(['a', 'b'])
  })

  it('caps item count and per-item length', () => {
    expect(vStrArr(['a', 'b', 'c'], 2)).toEqual(['a', 'b'])
    expect(vStrArr(['abcdef'], 50, 3)).toEqual(['abc'])
  })

  it('coerces non-string items to "" and drops them', () => {
    expect(vStrArr(['a', 123, null, 'b'])).toEqual(['a', 'b'])
  })
})

describe('vArr', () => {
  it('returns [] for non-arrays', () => {
    expect(vArr(null)).toEqual([])
    expect(vArr('nope')).toEqual([])
  })

  it('caps to maxItems while preserving element shape', () => {
    expect(vArr([1, 2, 3], 2)).toEqual([1, 2])
    const objs = [{ a: 1 }, { b: 2 }]
    expect(vArr(objs)).toEqual(objs)
  })

  it('applies the default cap of 100', () => {
    expect(vArr(Array.from({ length: 150 }, (_, i) => i))).toHaveLength(100)
  })
})
