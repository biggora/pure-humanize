/**
 * Options for the {@link currency} function.
 * @example
 * const opts: CurrencyOptions = { locale: 'en-US', currencyDisplay: 'symbol', compact: false };
 */
export type CurrencyOptions = {
    /** BCP 47 locale(s). Defaults to the runtime default. */
    locale?: string | string[];
    /** How the currency is displayed. Defaults to `'symbol'`. */
    currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
    /** Use compact notation, e.g. `"$1M"` instead of `"$1,000,000"`. Defaults to `false`. */
    compact?: boolean;
    /** Maximum fraction digits. When omitted, Intl uses the currency's default (e.g. 2 for USD, 0 for JPY). */
    maximumFractionDigits?: number;
    /** Minimum fraction digits. When omitted, Intl uses the currency's default. */
    minimumFractionDigits?: number;
    /** Whether to strip trailing zeros on integers. */
    trailingZeroDisplay?: 'auto' | 'stripIfInteger';
};

/**
 * Formats a number as a currency string.
 * @example currency(1234.5, 'USD') // "$1,234.50"
 * @example currency(1000000, 'USD', { compact: true }) // "$1M"
 * @example currency(1500, 'EUR', { currencyDisplay: 'code' }) // "EUR 1,500.00"
 * @example currency(1000, 'JPY') // "¥1,000"
 */
export function currency(value: number, currencyCode: string, options?: CurrencyOptions): string {
    if (!isFinite(value)) throw new TypeError(`currency: value must be finite, got ${value}`);

    const {
        locale,
        currencyDisplay = 'symbol',
        compact = false,
        maximumFractionDigits,
        minimumFractionDigits,
        trailingZeroDisplay,
    } = options ?? {};

    const nfOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay,
    };

    if (compact) nfOptions.notation = 'compact';
    if (maximumFractionDigits !== undefined) nfOptions.maximumFractionDigits = maximumFractionDigits;
    if (minimumFractionDigits !== undefined) nfOptions.minimumFractionDigits = minimumFractionDigits;
    if (trailingZeroDisplay !== undefined) (nfOptions as Record<string, unknown>)['trailingZeroDisplay'] = trailingZeroDisplay;

    return new Intl.NumberFormat(locale, nfOptions).format(value);
}
