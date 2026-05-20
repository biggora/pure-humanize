import { currency } from '../src/currency.js';

describe('currency', () => {
  describe('standard formatting', () => {
    it('formats USD with symbol and two decimal places', () => {
      expect(currency(1234.5, 'USD', { locale: 'en-US' })).toBe('$1,234.50');
    });

    it('formats JPY with no decimal places', () => {
      // JPY has 0 fraction digits by Intl convention
      expect(currency(1000, 'JPY', { locale: 'en-US' })).toBe('¥1,000');
    });

    it('formats zero in USD', () => {
      expect(currency(0, 'USD', { locale: 'en-US' })).toBe('$0.00');
    });

    it('formats negative values with both minus sign and currency symbol', () => {
      const result = currency(-100, 'USD', { locale: 'en-US' });
      expect(result).toContain('-');
      expect(result).toContain('$');
    });
  });

  describe('compact option', () => {
    it('uses compact notation when compact is true', () => {
      const result = currency(1000000, 'USD', { locale: 'en-US', compact: true });
      expect(result).toContain('$');
      expect(result).toContain('M');
    });
  });

  describe('currencyDisplay option', () => {
    it('shows the ISO currency code when currencyDisplay is "code"', () => {
      const result = currency(1500, 'USD', { locale: 'en-US', currencyDisplay: 'code' });
      expect(result).toContain('USD');
    });
  });

  describe('error handling', () => {
    it('throws TypeError for NaN', () => {
      expect(() => currency(NaN, 'USD')).toThrow(TypeError);
    });

    it('throws TypeError for positive Infinity', () => {
      expect(() => currency(Infinity, 'USD')).toThrow(TypeError);
    });

    it('throws TypeError for negative Infinity', () => {
      expect(() => currency(-Infinity, 'USD')).toThrow(TypeError);
    });

    it('throws RangeError for an invalid currency code', () => {
      expect(() => currency(100, 'INVALID', { locale: 'en-US' })).toThrow(RangeError);
    });
  });
});
