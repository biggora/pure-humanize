import { timeAgo } from '../src/timeAgo.js';

// Fixed reference point so all tests are deterministic.
const NOW = 1700000000000;
// Helper: returns a timestamp N seconds before NOW.
const sec = (n: number) => NOW - n * 1000;
const opts = { locale: 'en-US', now: NOW } as const;

describe('timeAgo', () => {
  describe('past — seconds', () => {
    it('formats 30 seconds ago', () => {
      // abs=30 < 45 → seconds unit
      expect(timeAgo(sec(30), opts)).toBe('30 seconds ago');
    });
  });

  describe('past — minutes', () => {
    it('formats 1 minute ago (45–90 s threshold)', () => {
      // abs=60, 45 <= 60 < 90 → value=-1, unit=minute
      expect(timeAgo(sec(60), opts)).toBe('1 minute ago');
    });

    it('formats 5 minutes ago', () => {
      // abs=300, 90 <= 300 < 2700 → value=round(-300/60)=-5
      expect(timeAgo(sec(300), opts)).toBe('5 minutes ago');
    });
  });

  describe('past — hours', () => {
    it('formats 1 hour ago (2700–5400 s threshold)', () => {
      // abs=3600, 2700 <= 3600 < 5400 → value=-1, unit=hour
      expect(timeAgo(sec(3600), opts)).toBe('1 hour ago');
    });

    it('formats 2 hours ago', () => {
      // abs=7200, 5400 <= 7200 < 75600 → value=round(-7200/3600)=-2
      expect(timeAgo(sec(7200), opts)).toBe('2 hours ago');
    });
  });

  describe('past — days', () => {
    it('formats "yesterday" with numeric auto for 1 day ago', () => {
      // abs=86400, 75600 <= 86400 < 129600 → value=-1, unit=day; numeric=auto → "yesterday"
      expect(timeAgo(sec(86400), { ...opts, numeric: 'auto' })).toBe('yesterday');
    });

    it('formats "1 day ago" with numeric always for 1 day ago', () => {
      // same threshold, but numeric=always forces "1 day ago"
      expect(timeAgo(sec(86400), { ...opts, numeric: 'always' })).toBe('1 day ago');
    });

    it('formats 3 days ago', () => {
      // abs=259200, 129600 <= 259200 < 561600 → value=round(-259200/86400)=-3
      expect(timeAgo(sec(259200), opts)).toBe('3 days ago');
    });
  });

  describe('past — weeks', () => {
    it('formats 1 week ago with numeric always (561600–907200 s threshold)', () => {
      // abs=604800, 561600 <= 604800 < 907200 → value=-1, unit=week
      // numeric:'auto' (the default) yields "last week"; use 'always' to force "1 week ago"
      expect(timeAgo(sec(604800), { ...opts, numeric: 'always' })).toBe('1 week ago');
    });

    it('formats "last week" with numeric auto for 1 week ago', () => {
      expect(timeAgo(sec(604800), { ...opts, numeric: 'auto' })).toBe('last week');
    });

    it('formats 2 weeks ago', () => {
      // abs=1209600, 907200 <= 1209600 < 2116800 → value=round(-1209600/604800)=-2
      expect(timeAgo(sec(1209600), opts)).toBe('2 weeks ago');
    });
  });

  describe('past — months', () => {
    it('formats 1 month ago (2116800–3888000 s threshold)', () => {
      // abs=2592000, 2116800 <= 2592000 < 3888000 → value=-1, unit=month
      expect(timeAgo(sec(2592000), opts)).toContain('month');
    });
  });

  describe('past — years', () => {
    it('formats 1 year ago (27648000–47304000 s threshold)', () => {
      // abs=31536000, 27648000 <= 31536000 < 47304000 → value=-1, unit=year
      expect(timeAgo(sec(31536000), opts)).toContain('year');
    });
  });

  describe('future', () => {
    it('formats 5 minutes in the future', () => {
      // seconds = +300, 90 <= 300 < 2700 → value=round(300/60)=5, unit=minute
      expect(timeAgo(NOW + 300_000, opts)).toBe('in 5 minutes');
    });
  });

  describe('input type acceptance', () => {
    it('accepts a Date object without throwing', () => {
      expect(() => timeAgo(new Date(sec(60)), opts)).not.toThrow();
    });

    it('accepts an ISO date string without throwing', () => {
      expect(() => timeAgo(new Date(sec(60)).toISOString(), opts)).not.toThrow();
    });
  });

  describe('error cases', () => {
    it('throws TypeError for an invalid date string', () => {
      expect(() => timeAgo('not-a-date', opts)).toThrow(TypeError);
    });
  });
});
