const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const WEEK = 604800;
const MONTH = 2592000;
const YEAR = 31536000;

type RTFUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

interface UnitSelection {
  value: number;
  unit: RTFUnit;
}

function selectUnit(seconds: number): UnitSelection {
  const abs = Math.abs(seconds);
  const sign = seconds < 0 ? -1 : 1;

  if (abs < 45)      return { value: Math.round(seconds),          unit: 'second' };
  if (abs < 90)      return { value: sign,                          unit: 'minute' };
  if (abs < 2700)    return { value: Math.round(seconds / MINUTE),  unit: 'minute' };
  if (abs < 5400)    return { value: sign,                          unit: 'hour'   };
  if (abs < 75600)   return { value: Math.round(seconds / HOUR),    unit: 'hour'   };
  if (abs < 129600)  return { value: sign,                          unit: 'day'    };
  if (abs < 561600)  return { value: Math.round(seconds / DAY),     unit: 'day'    };
  if (abs < 907200)  return { value: sign,                          unit: 'week'   };
  if (abs < 2116800) return { value: Math.round(seconds / WEEK),    unit: 'week'   };
  if (abs < 3888000) return { value: sign,                          unit: 'month'  };
  if (abs < 27648000) return { value: Math.round(seconds / MONTH),  unit: 'month'  };
  if (abs < 47304000) return { value: sign,                          unit: 'year'   };
  return               { value: Math.round(seconds / YEAR),          unit: 'year'   };
}

/**
 * Options for {@link timeAgo}.
 * @example
 * const opts: TimeAgoOptions = { locale: 'fr', style: 'short', numeric: 'always' };
 */
export interface TimeAgoOptions {
  /** BCP 47 locale(s). Defaults to runtime default. */
  locale?: string | string[];
  /** `'long'` | `'short'` | `'narrow'`. Defaults to `'long'`. */
  style?: Intl.RelativeTimeFormatStyle;
  /** `'always'` forces numeric ("1 day ago"). `'auto'` allows "yesterday". Defaults to `'auto'`. */
  numeric?: 'always' | 'auto';
  /** Reference point for "now". Defaults to `Date.now()`. */
  now?: Date | number;
}

/**
 * Formats a date into a human-readable relative time string.
 * @example timeAgo(Date.now() - 3_600_000) // "1 hour ago"
 * @example timeAgo(Date.now() - 86_400_000) // "yesterday"
 * @example timeAgo(Date.now() + 300_000) // "in 5 minutes"
 * @example timeAgo('2020-01-01', { locale: 'de', style: 'short' }) // "vor 5 J."
 */
export function timeAgo(date: Date | number | string, options?: TimeAgoOptions): string {
  const target =
    date instanceof Date
      ? date.getTime()
      : typeof date === 'string'
        ? new Date(date).getTime()
        : date;

  if (Number.isNaN(target)) throw new TypeError('timeAgo: invalid date');

  const now =
    options?.now instanceof Date
      ? options.now.getTime()
      : (options?.now ?? Date.now());

  const seconds = (target - now) / 1000;
  const { value, unit } = selectUnit(seconds);

  return new Intl.RelativeTimeFormat(options?.locale, {
    style: options?.style ?? 'long',
    numeric: options?.numeric ?? 'auto',
  }).format(value, unit);
}
