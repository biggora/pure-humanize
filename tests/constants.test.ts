import { CURRENCY_CODES, CURRENCY_CODE_LIST, type CurrencyCode } from '../src/constants/currencies.js';
import { LOCALES, LOCALE_LIST } from '../src/constants/locales.js';
import {
  RELATIVE_TIME_STYLE,
  LIST_TYPE,
  CURRENCY_DISPLAY,
  PLURAL_CATEGORY,
  TRUNCATE_POSITION,
} from '../src/constants/styles.js';
import {
  TIME_UNIT_SECONDS,
  BINARY_BYTE_UNITS,
  SI_BYTE_UNITS,
  ORDINAL_SUFFIXES_EN,
} from '../src/constants/units.js';
import * as constantsBarrel from '../src/constants/index.js';
import { currency } from '../src/currency.js';
import { timeAgo } from '../src/timeAgo.js';
import { list } from '../src/list.js';

describe('constants/currencies', () => {
  it('exposes USD/EUR/JPY codes', () => {
    expect(CURRENCY_CODES.USD).toBe('USD');
    expect(CURRENCY_CODES.EUR).toBe('EUR');
    expect(CURRENCY_CODES.JPY).toBe('JPY');
  });

  it('CURRENCY_CODE_LIST has same length as CURRENCY_CODES keys', () => {
    expect(CURRENCY_CODE_LIST.length).toBe(Object.keys(CURRENCY_CODES).length);
  });

  it('includes major active ISO 4217 codes', () => {
    const required: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'RUB', 'UAH', 'CAD', 'AUD', 'CHF'];
    for (const code of required) {
      expect(CURRENCY_CODE_LIST).toContain(code);
    }
  });

  it('passes through currency() without error', () => {
    expect(currency(100, CURRENCY_CODES.USD, { locale: 'en-US' })).toBe('$100.00');
  });
});

describe('constants/locales', () => {
  it('maps locale keys to themselves', () => {
    expect(LOCALES['en-US']).toBe('en-US');
    expect(LOCALES['ru-RU']).toBe('ru-RU');
    expect(LOCALES['zh-CN']).toBe('zh-CN');
  });

  it('LOCALE_LIST length matches LOCALES keys', () => {
    expect(LOCALE_LIST.length).toBe(Object.keys(LOCALES).length);
  });
});

describe('constants/styles', () => {
  it('relative time style values are valid for Intl', () => {
    expect(RELATIVE_TIME_STYLE.LONG).toBe('long');
    expect(RELATIVE_TIME_STYLE.SHORT).toBe('short');
    expect(RELATIVE_TIME_STYLE.NARROW).toBe('narrow');
  });

  it('passes through timeAgo() without error', () => {
    const result = timeAgo(Date.now() - 3600_000, {
      style: RELATIVE_TIME_STYLE.SHORT,
      locale: 'en-US',
    });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('passes through list() without error', () => {
    const result = list(['a', 'b'], { type: LIST_TYPE.DISJUNCTION, locale: 'en-US' });
    expect(result).toContain('or');
  });

  it('currency display constants match Intl values', () => {
    expect(CURRENCY_DISPLAY.SYMBOL).toBe('symbol');
    expect(CURRENCY_DISPLAY.NARROW_SYMBOL).toBe('narrowSymbol');
    expect(CURRENCY_DISPLAY.CODE).toBe('code');
    expect(CURRENCY_DISPLAY.NAME).toBe('name');
  });

  it('plural categories cover CLDR set', () => {
    expect(PLURAL_CATEGORY.ZERO).toBe('zero');
    expect(PLURAL_CATEGORY.ONE).toBe('one');
    expect(PLURAL_CATEGORY.TWO).toBe('two');
    expect(PLURAL_CATEGORY.FEW).toBe('few');
    expect(PLURAL_CATEGORY.MANY).toBe('many');
    expect(PLURAL_CATEGORY.OTHER).toBe('other');
  });

  it('truncate positions match expected', () => {
    expect(TRUNCATE_POSITION.END).toBe('end');
    expect(TRUNCATE_POSITION.MIDDLE).toBe('middle');
    expect(TRUNCATE_POSITION.START).toBe('start');
  });
});

describe('constants/units', () => {
  it('TIME_UNIT_SECONDS has correct values', () => {
    expect(TIME_UNIT_SECONDS.MINUTE).toBe(60);
    expect(TIME_UNIT_SECONDS.HOUR).toBe(3600);
    expect(TIME_UNIT_SECONDS.DAY).toBe(86400);
    expect(TIME_UNIT_SECONDS.WEEK).toBe(604800);
    expect(TIME_UNIT_SECONDS.MONTH).toBe(2592000);
    expect(TIME_UNIT_SECONDS.YEAR).toBe(31536000);
  });

  it('byte unit arrays have matching length', () => {
    expect(BINARY_BYTE_UNITS).toEqual(['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB']);
    expect(SI_BYTE_UNITS).toEqual(['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB']);
    expect(BINARY_BYTE_UNITS.length).toBe(SI_BYTE_UNITS.length);
  });

  it('ordinal suffixes cover required CLDR keys', () => {
    expect(ORDINAL_SUFFIXES_EN.one).toBe('st');
    expect(ORDINAL_SUFFIXES_EN.two).toBe('nd');
    expect(ORDINAL_SUFFIXES_EN.few).toBe('rd');
    expect(ORDINAL_SUFFIXES_EN.other).toBe('th');
  });
});

describe('constants barrel', () => {
  it('re-exports all named constants', () => {
    expect(constantsBarrel.CURRENCY_CODES).toBe(CURRENCY_CODES);
    expect(constantsBarrel.LOCALES).toBe(LOCALES);
    expect(constantsBarrel.RELATIVE_TIME_STYLE).toBe(RELATIVE_TIME_STYLE);
    expect(constantsBarrel.TIME_UNIT_SECONDS).toBe(TIME_UNIT_SECONDS);
  });
});
