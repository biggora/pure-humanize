import { list } from '../src/list.js';

describe('list', () => {
  describe('empty and single-item cases', () => {
    it('returns empty string for an empty array', () => {
      expect(list([])).toBe('');
    });

    it('returns the single item as-is', () => {
      expect(list(['Alice'], { locale: 'en-US' })).toBe('Alice');
    });
  });

  describe('conjunction (default type)', () => {
    it('joins two items with "and"', () => {
      expect(list(['Alice', 'Bob'], { locale: 'en-US' })).toBe('Alice and Bob');
    });

    it('joins three items with Oxford comma and "and"', () => {
      expect(list(['Alice', 'Bob', 'Charlie'], { locale: 'en-US' })).toBe('Alice, Bob, and Charlie');
    });

    it('explicit type "conjunction" behaves identically to default', () => {
      expect(
        list(['Alice', 'Bob'], { locale: 'en-US', type: 'conjunction' }),
      ).toBe('Alice and Bob');
    });
  });

  describe('disjunction type', () => {
    it('joins two items with "or"', () => {
      expect(list(['Alice', 'Bob'], { locale: 'en-US', type: 'disjunction' })).toBe('Alice or Bob');
    });

    it('joins three items with "or" disjunction', () => {
      const result = list(['Alice', 'Bob', 'Charlie'], { locale: 'en-US', type: 'disjunction' });
      expect(result).toContain('or');
      expect(result).toContain('Alice');
      expect(result).toContain('Charlie');
    });
  });

  describe('unit type', () => {
    it('includes all items when type is "unit"', () => {
      const result = list(['5 kg', '200 g'], { locale: 'en-US', type: 'unit' });
      expect(result).toContain('5 kg');
      expect(result).toContain('200 g');
    });
  });
});
