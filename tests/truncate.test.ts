import { truncate } from '../src/truncate.js';

describe('truncate', () => {
  describe('no-op cases', () => {
    it('returns the string unchanged when shorter than length', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });

    it('returns the string unchanged when exactly equal to length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('returns empty string unchanged', () => {
      expect(truncate('', 5)).toBe('');
    });
  });

  describe('end truncation (default position)', () => {
    it('truncates from the end with default ellipsis', () => {
      // availableLength = 8 - 3 = 5; "Hello" + "..."
      expect(truncate('Hello, World!', 8)).toBe('Hello...');
    });

    it('uses a custom ellipsis', () => {
      // availableLength = 6 - 1 = 5; "Hello" + "…"
      expect(truncate('Hello, World!', 6, { ellipsis: '…' })).toBe('Hello…');
    });

    it('explicit position end behaves identically to default', () => {
      expect(truncate('Hello, World!', 8, { position: 'end' })).toBe('Hello...');
    });
  });

  describe('middle truncation', () => {
    it('truncates from the middle', () => {
      // availableLength = 5; left = ceil(5/2) = 3; right = floor(5/2) = 2
      // "Hel" + "..." + "d!"
      expect(truncate('Hello, World!', 8, { position: 'middle' })).toBe('Hel...d!');
    });
  });

  describe('start truncation', () => {
    it('truncates from the start', () => {
      // availableLength = 5; str.slice(13 - 5) = "orld!"
      expect(truncate('Hello, World!', 8, { position: 'start' })).toBe('...orld!');
    });
  });

  describe('word boundary', () => {
    it('cuts at the nearest word boundary when wordBoundary is true', () => {
      // availableLength = 9; str.slice(0,9) = "Hello Wor"; lastIndexOf(' ') = 5
      // end = 5; "Hello" + "..."
      expect(truncate('Hello World Test', 12, { wordBoundary: true })).toBe('Hello...');
    });

    it('falls back to character boundary when no space is found before the cut point', () => {
      // "Helloworld" slice(0,5) = "Hello" — no space, lastIndexOf = -1, end stays 5
      expect(truncate('Helloworldtest', 8, { wordBoundary: true })).toBe('Hello...');
    });
  });

  describe('edge cases', () => {
    it('returns empty string when length is 0', () => {
      // availableLength = 0 - 3 = -3; ellipsis.slice(0, 0) = ""
      expect(truncate('Hello', 0)).toBe('');
    });

    it('returns truncated ellipsis when length is less than ellipsis length', () => {
      // length = 2; availableLength = 2 - 3 = -1; ellipsis.slice(0, 2) = ".."
      expect(truncate('Hello', 2)).toBe('..');
    });

    it('returns exactly the ellipsis when length equals ellipsis length', () => {
      // length = 3; availableLength = 0; ellipsis.slice(0, 3) = "..."
      expect(truncate('Hello', 3)).toBe('...');
    });
  });
});
