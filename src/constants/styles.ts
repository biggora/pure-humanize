export const RELATIVE_TIME_STYLE = {
  LONG: 'long',
  SHORT: 'short',
  NARROW: 'narrow',
} as const;
export type RelativeTimeStyle = (typeof RELATIVE_TIME_STYLE)[keyof typeof RELATIVE_TIME_STYLE];

export const RELATIVE_TIME_NUMERIC = {
  ALWAYS: 'always',
  AUTO: 'auto',
} as const;
export type RelativeTimeNumeric = (typeof RELATIVE_TIME_NUMERIC)[keyof typeof RELATIVE_TIME_NUMERIC];

export const LIST_STYLE = {
  LONG: 'long',
  SHORT: 'short',
  NARROW: 'narrow',
} as const;
export type ListStyle = (typeof LIST_STYLE)[keyof typeof LIST_STYLE];

export const LIST_TYPE = {
  CONJUNCTION: 'conjunction',
  DISJUNCTION: 'disjunction',
  UNIT: 'unit',
} as const;
export type ListType = (typeof LIST_TYPE)[keyof typeof LIST_TYPE];

export const COMPACT_DISPLAY = {
  SHORT: 'short',
  LONG: 'long',
} as const;
export type CompactDisplay = (typeof COMPACT_DISPLAY)[keyof typeof COMPACT_DISPLAY];

export const CURRENCY_DISPLAY = {
  SYMBOL: 'symbol',
  NARROW_SYMBOL: 'narrowSymbol',
  CODE: 'code',
  NAME: 'name',
} as const;
export type CurrencyDisplay = (typeof CURRENCY_DISPLAY)[keyof typeof CURRENCY_DISPLAY];

export const TRAILING_ZERO_DISPLAY = {
  AUTO: 'auto',
  STRIP_IF_INTEGER: 'stripIfInteger',
} as const;
export type TrailingZeroDisplay = (typeof TRAILING_ZERO_DISPLAY)[keyof typeof TRAILING_ZERO_DISPLAY];

export const NOTATION = {
  STANDARD: 'standard',
  COMPACT: 'compact',
  SCIENTIFIC: 'scientific',
  ENGINEERING: 'engineering',
} as const;
export type Notation = (typeof NOTATION)[keyof typeof NOTATION];

export const NUMBER_STYLE = {
  DECIMAL: 'decimal',
  CURRENCY: 'currency',
  PERCENT: 'percent',
  UNIT: 'unit',
} as const;
export type NumberStyle = (typeof NUMBER_STYLE)[keyof typeof NUMBER_STYLE];

export const PLURAL_TYPE = {
  CARDINAL: 'cardinal',
  ORDINAL: 'ordinal',
} as const;
export type PluralType = (typeof PLURAL_TYPE)[keyof typeof PLURAL_TYPE];

export const PLURAL_CATEGORY = {
  ZERO: 'zero',
  ONE: 'one',
  TWO: 'two',
  FEW: 'few',
  MANY: 'many',
  OTHER: 'other',
} as const;
export type PluralCategory = (typeof PLURAL_CATEGORY)[keyof typeof PLURAL_CATEGORY];

export const TRUNCATE_POSITION = {
  END: 'end',
  MIDDLE: 'middle',
  START: 'start',
} as const;
export type TruncatePosition = (typeof TRUNCATE_POSITION)[keyof typeof TRUNCATE_POSITION];
