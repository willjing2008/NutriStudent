// Small input-validation helpers for write endpoints: coerce + bound untrusted
// client input so handlers never store unbounded strings/arrays or NaN values.

/** Trimmed string capped at maxLen (default 200); non-strings become "". */
export function vStr(v: unknown, maxLen = 200): string {
  return typeof v === "string" ? v.trim().slice(0, maxLen) : "";
}

/** Finite number clamped to [min, max]; non-numbers become `fallback`. */
export function vNum(v: unknown, min: number, max: number, fallback = min): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

/** Array of trimmed strings, capped to `maxItems` × `maxLen`; drops empties. */
export function vStrArr(v: unknown, maxItems = 50, maxLen = 200): string[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, maxItems).map((x) => vStr(x, maxLen)).filter(Boolean);
}

/** Cap an arbitrary array to `maxItems` (shape preserved); non-arrays → []. */
export function vArr<T>(v: unknown, maxItems = 100): T[] {
  return Array.isArray(v) ? (v.slice(0, maxItems) as T[]) : [];
}

/**
 * Constant-time string comparison — compares a request-supplied secret against a
 * stored one without leaking length/content via early-exit timing. Returns false
 * for differing lengths but still scans the full range.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    // charCodeAt past the end is NaN; `| 0` coerces it to 0.
    diff |= (a.charCodeAt(i) | 0) ^ (b.charCodeAt(i) | 0);
  }
  return diff === 0;
}
