import { number } from '../src/number.js';

describe('number', () => {
  describe('compact short notation (default)', () => {
    it('returns plain number string for values below 1000', () => {
      expect(number(999, { locale: 'en-US' })).toBe('999');
    });

    it('formats thousands with K suffix', () => {
      expect(number(1234, { locale: 'en-US' })).toBe('1.2K');
    });

    it('formats millions with M suffix', () => {
      expect(number(1234567, { locale: 'en-US' })).toBe('1.2M');
    });

    it('formats billions with B suffix', () => {
      expect(number(1234567890, { locale: 'en-US' })).toBe('1.2B');
    });

    it('formats zero', () => {
      expect(number(0, { locale: 'en-US' })).toBe('0');
    });

    it('formats negative thousands with K suffix', () => {
      expect(number(-1500, { locale: 'en-US' })).toBe('-1.5K');
    });
  });

  describe('compact long notation', () => {
    it('uses the word "thousand" for long display', () => {
      const result = number(1500, { locale: 'en-US', compactDisplay: 'long' });
      expect(result).toContain('thousand');
    });
  });

  describe('maximumSignificantDigits option', () => {
    it('respects maximumSignificantDigits over fraction digit defaults', () => {
      // 3 significant digits on 1234 in compact → "1.23K"
      expect(number(1234, { locale: 'en-US', maximumSignificantDigits: 3 })).toBe('1.23K');
    });
  });

  describe('error handling', () => {
    it('throws TypeError for NaN', () => {
      expect(() => number(NaN)).toThrow(TypeError);
    });

    it('throws TypeError for positive Infinity', () => {
      expect(() => number(Infinity)).toThrow(TypeError);
    });

    it('throws TypeError for negative Infinity', () => {
      expect(() => number(-Infinity)).toThrow(TypeError);
    });

    it('includes the bad value in the error message', () => {
      expect(() => number(Infinity)).toThrow('Infinity');
    });
  });
});
