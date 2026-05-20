import { bytes } from '../src/bytes.js';

describe('bytes', () => {
  describe('zero and one byte', () => {
    it('returns "0 B" for 0', () => {
      expect(bytes(0)).toBe('0 B');
    });

    it('returns "1 B" for 1', () => {
      expect(bytes(1)).toBe('1 B');
    });
  });

  describe('binary units (default)', () => {
    it('formats 1024 bytes as KiB', () => {
      expect(bytes(1024, { locale: 'en-US' })).toBe('1 KiB');
    });

    it('formats 1048576 bytes as MiB', () => {
      expect(bytes(1048576, { locale: 'en-US' })).toBe('1 MiB');
    });

    it('formats 1073741824 bytes as GiB', () => {
      expect(bytes(1073741824, { locale: 'en-US' })).toBe('1 GiB');
    });

    it('formats a non-round value with one decimal by default', () => {
      // 1536 / 1024 = 1.5 KiB
      expect(bytes(1536, { locale: 'en-US' })).toBe('1.5 KiB');
    });

    it('respects maximumFractionDigits option', () => {
      expect(bytes(1536, { locale: 'en-US', maximumFractionDigits: 2 })).toBe('1.5 KiB');
    });
  });

  describe('SI units (binary: false)', () => {
    it('formats 1000 bytes as kB', () => {
      expect(bytes(1000, { binary: false, locale: 'en-US' })).toBe('1 kB');
    });

    it('formats 1000000 bytes as MB', () => {
      expect(bytes(1000000, { binary: false, locale: 'en-US' })).toBe('1 MB');
    });
  });

  describe('negative values', () => {
    it('formats negative bytes with a minus sign', () => {
      expect(bytes(-1024, { locale: 'en-US' })).toBe('-1 KiB');
    });
  });

  describe('unitSeparator option', () => {
    it('omits the separator when unitSeparator is empty string', () => {
      expect(bytes(1024, { locale: 'en-US', unitSeparator: '' })).toBe('1KiB');
    });
  });

  describe('error cases', () => {
    it('throws TypeError for NaN', () => {
      expect(() => bytes(NaN)).toThrow(TypeError);
    });

    it('throws TypeError for Infinity', () => {
      expect(() => bytes(Infinity)).toThrow(TypeError);
    });

    it('throws TypeError for negative Infinity', () => {
      expect(() => bytes(-Infinity)).toThrow(TypeError);
    });
  });
});
