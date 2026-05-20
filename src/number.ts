/**
 * Options for the {@link number} function.
 * @example
 * const opts: NumberOptions = { locale: 'en-US', compactDisplay: 'short', maximumFractionDigits: 2 };
 */
export type NumberOptions = {
  /** BCP 47 locale(s). Defaults to the runtime default. */
  locale?: string | string[];
  /** `'short'` → `"1.2K"`, `'long'` → `"1.2 thousand"`. Defaults to `'short'`. */
  compactDisplay?: 'short' | 'long';
  /** Maximum fraction digits. Defaults to `1`. */
  maximumFractionDigits?: number;
  /** Minimum fraction digits. Defaults to `0`. */
  minimumFractionDigits?: number;
  /** Maximum significant digits. Overrides fraction digit options when set. */
  maximumSignificantDigits?: number;
};

/**
 * Formats a number using compact notation.
 * @example number(1234) // "1.2K"
 * @example number(1234567) // "1.2M"
 * @example number(999) // "999"
 * @example number(1500, { compactDisplay: 'long' }) // "1.5 thousand"
 */
export function number(value: number, options?: NumberOptions): string {
  if (!isFinite(value)) throw new TypeError(`number: value must be finite, got ${value}`);

  const {
    locale,
    compactDisplay = 'short',
    maximumFractionDigits = 1,
    minimumFractionDigits = 0,
    maximumSignificantDigits,
  } = options ?? {};

  const nfOptions: Intl.NumberFormatOptions = {
    notation: 'compact',
    compactDisplay,
    maximumFractionDigits,
    minimumFractionDigits,
  };

  if (maximumSignificantDigits !== undefined) {
    nfOptions.maximumSignificantDigits = maximumSignificantDigits;
    delete nfOptions.maximumFractionDigits;
    delete nfOptions.minimumFractionDigits;
  }

  return new Intl.NumberFormat(locale, nfOptions).format(value);
}
