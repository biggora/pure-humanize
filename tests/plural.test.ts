import { plural } from '../src/plural.js';

describe('plural', () => {
  describe('basic English cardinal forms', () => {
    it('uses the "one" form for count 1', () => {
      expect(plural(1, { one: '# item', other: '# items' }, { locale: 'en-US' })).toBe('1 item');
    });

    it('uses the "other" form for count 5', () => {
      expect(plural(5, { one: '# item', other: '# items' }, { locale: 'en-US' })).toBe('5 items');
    });

    it('uses the "other" form for count 0 in English', () => {
      expect(plural(0, { one: '# item', other: '# items' }, { locale: 'en-US' })).toBe('0 items');
    });
  });

  describe('zero form', () => {
    it('falls back to "other" for count 0 in English (no "zero" CLDR category in English)', () => {
      // English PluralRules never selects 'zero', so the zero form is ignored and 'other' is used
      expect(
        plural(0, { zero: 'no items', one: '# item', other: '# items' }, { locale: 'en-US' }),
      ).toBe('0 items');
    });
  });

  describe('# token replacement', () => {
    it('replaces all # occurrences in the template', () => {
      expect(plural(3, { other: '# of # max' }, { locale: 'en-US' })).toBe('3 of 3 max');
    });

    it('returns the template unchanged when no # is present', () => {
      expect(plural(1, { one: 'single', other: 'multiple' }, { locale: 'en-US' })).toBe('single');
    });
  });

  describe('large numbers', () => {
    it('formats large counts with locale-appropriate separators', () => {
      expect(plural(1000, { one: '# item', other: '# items' }, { locale: 'en-US' })).toBe(
        '1,000 items',
      );
    });
  });
});
