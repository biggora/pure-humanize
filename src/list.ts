/**
 * Options for the {@link list} function.
 * @example
 * const opts: ListOptions = { locale: 'en-US', type: 'conjunction', style: 'long' };
 */
export type ListOptions = {
  /** BCP 47 locale(s). Defaults to the runtime default. */
  locale?: string | string[];
  /** List join style. `'conjunction'` → "and", `'disjunction'` → "or", `'unit'` → bare list. Defaults to `'conjunction'`. */
  type?: 'conjunction' | 'disjunction' | 'unit';
  /** Format style. Defaults to `'long'`. */
  style?: 'long' | 'short' | 'narrow';
};

/**
 * Formats a list of items into a human-readable string.
 * @example list(['Alice', 'Bob', 'Charlie']) // "Alice, Bob, and Charlie"
 * @example list(['Alice', 'Bob'], { type: 'disjunction' }) // "Alice or Bob"
 * @example list(['5 kg', '10 km'], { type: 'unit', style: 'narrow' }) // "5 kg 10 km"
 * @example list([]) // ""
 */
export function list(items: string[], options?: ListOptions): string {
  if (items.length === 0) return '';

  const { locale, type = 'conjunction', style = 'long' } = options ?? {};

  return new Intl.ListFormat(locale, { type, style }).format(items);
}
