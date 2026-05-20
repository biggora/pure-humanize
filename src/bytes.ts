const BINARY_UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB'] as const;
const SI_UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'] as const;

/**
 * Options for {@link bytes}.
 * @example
 * bytes(1536, { binary: true, maximumFractionDigits: 2 }) // "1.5 KiB"
 */
export type BytesOptions = {
    /** BCP 47 locale(s). Defaults to runtime default. */
    locale?: string | string[];
    /** Use binary units (KiB, MiB) with base 1024. Defaults to true. */
    binary?: boolean;
    /** Number of fraction digits. Defaults to 1. */
    maximumFractionDigits?: number;
    /** Minimum fraction digits. Defaults to 0. */
    minimumFractionDigits?: number;
    /** Custom unit separator. Defaults to ' '. */
    unitSeparator?: string;
};

/**
 * Formats a byte count into a human-readable string.
 * @example bytes(1024) // "1 KiB"
 * @example bytes(1000, { binary: false }) // "1 kB"
 * @example bytes(0) // "0 B"
 * @example bytes(-2048) // "-2 KiB"
 */
export function bytes(value: number, options?: BytesOptions): string {
    if (!isFinite(value)) throw new TypeError(`bytes: value must be a finite number, got ${value}`);

    if (value === 0) return '0 B';

    const binary = options?.binary ?? true;
    const base = binary ? 1024 : 1000;
    const units = binary ? BINARY_UNITS : SI_UNITS;

    const isNeg = value < 0;
    const absValue = Math.abs(value);
    const exponent = Math.min(
        Math.floor(Math.log(absValue) / Math.log(base)),
        units.length - 1,
    );
    const scaled = absValue / Math.pow(base, exponent);

    const formatted = new Intl.NumberFormat(options?.locale, {
        maximumFractionDigits: options?.maximumFractionDigits ?? 1,
        minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    }).format(isNeg ? -scaled : scaled);

    return formatted + (options?.unitSeparator ?? ' ') + units[exponent];
}
