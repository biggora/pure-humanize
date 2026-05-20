import { ordinal } from '../src/ordinal.js';

describe('ordinal', () => {
  describe('st suffix', () => {
    it('formats 1 as "1st"', () => {
      expect(ordinal(1, { locale: 'en-US' })).toBe('1st');
    });

    it('formats 21 as "21st"', () => {
      expect(ordinal(21, { locale: 'en-US' })).toBe('21st');
    });

    it('formats 101 as "101st"', () => {
      expect(ordinal(101, { locale: 'en-US' })).toBe('101st');
    });
  });

  describe('nd suffix', () => {
    it('formats 2 as "2nd"', () => {
      expect(ordinal(2, { locale: 'en-US' })).toBe('2nd');
    });

    it('formats 22 as "22nd"', () => {
      expect(ordinal(22, { locale: 'en-US' })).toBe('22nd');
    });
  });

  describe('rd suffix', () => {
    it('formats 3 as "3rd"', () => {
      expect(ordinal(3, { locale: 'en-US' })).toBe('3rd');
    });

    it('formats 23 as "23rd"', () => {
      expect(ordinal(23, { locale: 'en-US' })).toBe('23rd');
    });
  });

  describe('th suffix — general case', () => {
    it('formats 4 as "4th"', () => {
      expect(ordinal(4, { locale: 'en-US' })).toBe('4th');
    });

    it('formats 11 as "11th" (teen exception)', () => {
      expect(ordinal(11, { locale: 'en-US' })).toBe('11th');
    });

    it('formats 12 as "12th" (teen exception)', () => {
      expect(ordinal(12, { locale: 'en-US' })).toBe('12th');
    });

    it('formats 13 as "13th" (teen exception)', () => {
      expect(ordinal(13, { locale: 'en-US' })).toBe('13th');
    });

    it('formats 100 as "100th"', () => {
      expect(ordinal(100, { locale: 'en-US' })).toBe('100th');
    });
  });

  describe('zero', () => {
    it('formats 0 as "0th"', () => {
      expect(ordinal(0, { locale: 'en-US' })).toBe('0th');
    });
  });
});
