export const TIME_UNIT_SECONDS = {
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    WEEK: 604800,
    MONTH: 2592000,
    YEAR: 31536000,
} as const;

export const TIME_UNIT = {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
} as const;
export type TimeUnit = (typeof TIME_UNIT)[keyof typeof TIME_UNIT];

export const BINARY_BYTE_UNIT = 'B';
export const BINARY_KBYTE_UNIT = 'KiB';
export const BINARY_MBYTE_UNIT = 'MiB';
export const BINARY_GBYTE_UNIT = 'GiB';
export const BINARY_TBYTE_UNIT = 'TiB';
export const BINARY_PBYTE_UNIT = 'PiB';
export const BINARY_EBYTE_UNIT = 'EiB';

export const BINARY_BYTE_UNITS = [
    BINARY_BYTE_UNIT,
    BINARY_KBYTE_UNIT,
    BINARY_MBYTE_UNIT,
    BINARY_GBYTE_UNIT,
    BINARY_TBYTE_UNIT,
    BINARY_PBYTE_UNIT,
    BINARY_EBYTE_UNIT
] as const;
export type BinaryByteUnit = (typeof BINARY_BYTE_UNITS)[number];

export const SI_BYTE_UNIT = 'B';
export const SI_KBYTE_UNIT = 'kB';
export const SI_MBYTE_UNIT = 'MB';
export const SI_GBYTE_UNIT = 'GB';
export const SI_TBYTE_UNIT = 'TB';
export const SI_PBYTE_UNIT = 'PB';
export const SI_EBYTE_UNIT = 'EB';

export const SI_BYTE_UNITS = [
    SI_BYTE_UNIT,
    SI_KBYTE_UNIT,
    SI_MBYTE_UNIT,
    SI_GBYTE_UNIT,
    SI_TBYTE_UNIT,
    SI_PBYTE_UNIT,
    SI_EBYTE_UNIT
] as const;
export type SiByteUnit = (typeof SI_BYTE_UNITS)[number];

export const ORDINAL_SUFFIXES_EN: Record<string, string> = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
};
