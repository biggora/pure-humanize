const SUFFIXES: Record<string, string> = { one: 'st', two: 'nd', few: 'rd', other: 'th' };

/**
 * Options for {@link ordinal}.
 * @example
 * ordinal(1, { locale: 'en' }) // "1st"
 */
export type OrdinalOptions = {
  locale?: string | string[];
};

/**
 * Formats a number as an ordinal string.
 * v0.1: English suffixes only (st, nd, rd, th). Locale affects PluralRules category selection.
 * @example ordinal(1) // "1st"
 * @example ordinal(2) // "2nd"
 * @example ordinal(3) // "3rd"
 * @example ordinal(11) // "11th"
 * @example ordinal(21) // "21st"
 */
export function ordinal(n: number, options?: OrdinalOptions): string {
  const pr = new Intl.PluralRules(options?.locale, { type: 'ordinal' });
  const category = pr.select(n);
  return new Intl.NumberFormat(options?.locale).format(n) + (SUFFIXES[category] ?? 'th');
}
