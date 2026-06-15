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
