# pure-humanize

Zero-dependency, cross-runtime TypeScript micro-library for formatting data into human-readable strings using native `Intl` APIs.

![size](https://img.shields.io/badge/size-1.2%20KB%20brotli-blue)
![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![license](https://img.shields.io/badge/license-MIT-green)
![typescript](https://img.shields.io/badge/TypeScript-5.5+-3178c6)

## Features

- **Intl-native** — delegates all locale logic to the runtime's built-in `Intl` APIs; no bundled locale data
- **Zero dependencies** — nothing to audit, nothing to update
- **Tree-shakeable** — ESM-first with `sideEffects: false`; import only what you use
- **Cross-runtime** — works in Node.js 18+, Deno, Bun, and all modern browsers
- **Tiny** — entire bundle is under 2 KB; individual modules are a few hundred bytes each
- **Fully typed** — every function and options object ships with TypeScript types

## Install

```bash
npm install pure-humanize
```

## Quick Start

```typescript
import { timeAgo, bytes, number, currency } from 'pure-humanize';

timeAgo(Date.now() - 3_600_000);          // "1 hour ago"
bytes(1_572_864);                          // "1.5 MiB"
number(1_234_567);                         // "1.2M"
currency(4999.99, 'USD');                  // "$4,999.99"
```

## API Reference

### timeAgo

```typescript
function timeAgo(date: Date | number | string, options?: TimeAgoOptions): string
```

Formats a date into a human-readable relative time string using `Intl.RelativeTimeFormat`.

```typescript
timeAgo(Date.now() - 3_600_000)                          // "1 hour ago"
timeAgo(Date.now() - 86_400_000)                         // "yesterday"
timeAgo(Date.now() + 300_000)                            // "in 5 minutes"
timeAgo('2020-01-01', { locale: 'de', style: 'short' })  // "vor 5 J."
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `string \| string[]` | runtime default | BCP 47 locale(s) |
| `style` | `'long' \| 'short' \| 'narrow'` | `'long'` | Output verbosity |
| `numeric` | `'always' \| 'auto'` | `'auto'` | `'auto'` allows "yesterday"; `'always'` forces "1 day ago" |
| `now` | `Date \| number` | `Date.now()` | Reference point for "now" |

---

### bytes

```typescript
function bytes(value: number, options?: BytesOptions): string
```

Formats a byte count into a human-readable size string using `Intl.NumberFormat`.

```typescript
bytes(1024)                                         // "1 KiB"
bytes(1000, { binary: false })                      // "1 kB"
bytes(1536, { binary: true, maximumFractionDigits: 2 }) // "1.5 KiB"
bytes(-2048)                                        // "-2 KiB"
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `string \| string[]` | runtime default | BCP 47 locale(s) |
| `binary` | `boolean` | `true` | Use binary units (KiB, MiB, base 1024) vs SI units (kB, MB, base 1000) |
| `maximumFractionDigits` | `number` | `1` | Maximum decimal places |
| `minimumFractionDigits` | `number` | `0` | Minimum decimal places |
| `unitSeparator` | `string` | `' '` | String between number and unit |

---

### number

```typescript
function number(value: number, options?: NumberOptions): string
```

Formats a number using compact notation via `Intl.NumberFormat`.

```typescript
number(1234)                               // "1.2K"
number(1234567)                            // "1.2M"
number(999)                                // "999"
number(1500, { compactDisplay: 'long' })   // "1.5 thousand"
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `string \| string[]` | runtime default | BCP 47 locale(s) |
| `compactDisplay` | `'short' \| 'long'` | `'short'` | `'short'` → "1.2K", `'long'` → "1.2 thousand" |
| `maximumFractionDigits` | `number` | `1` | Maximum decimal places |
| `minimumFractionDigits` | `number` | `0` | Minimum decimal places |
| `maximumSignificantDigits` | `number` | — | When set, overrides fraction digit options |

---

### currency

```typescript
function currency(value: number, currencyCode: string, options?: CurrencyOptions): string
```

Formats a number as a currency string using `Intl.NumberFormat`.

```typescript
currency(1234.5, 'USD')                                   // "$1,234.50"
currency(1_000_000, 'USD', { compact: true })             // "$1M"
currency(1500, 'EUR', { currencyDisplay: 'code' })        // "EUR 1,500.00"
currency(1000, 'JPY')                                     // "¥1,000"
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `string \| string[]` | runtime default | BCP 47 locale(s) |
| `currencyDisplay` | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'` | `'symbol'` | How the currency label appears |
| `compact` | `boolean` | `false` | Use compact notation (e.g. `$1M`) |
| `maximumFractionDigits` | `number` | currency default | Maximum decimal places |
| `minimumFractionDigits` | `number` | currency default | Minimum decimal places |
| `trailingZeroDisplay` | `'auto' \| 'stripIfInteger'` | — | Strip trailing zeros on whole numbers |

---

### list

```typescript
function list(items: string[], options?: ListOptions): string
```

Formats an array of strings into a human-readable list using `Intl.ListFormat`.

```typescript
list(['Alice', 'Bob', 'Charlie'])                            // "Alice, Bob, and Charlie"
list(['Alice', 'Bob'], { type: 'disjunction' })             // "Alice or Bob"
list(['5 kg', '10 km'], { type: 'unit', style: 'narrow' })  // "5 kg 10 km"
list([])                                                     // ""
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `string \| string[]` | runtime default | BCP 47 locale(s) |
| `type` | `'conjunction' \| 'disjunction' \| 'unit'` | `'conjunction'` | `'conjunction'` → "and", `'disjunction'` → "or", `'unit'` → bare list |
| `style` | `'long' \| 'short' \| 'narrow'` | `'long'` | Output verbosity |

---

### plural

```typescript
function plural(count: number, forms: PluralForms, options?: PluralOptions): string
```

Selects the correct plural form for a count using `Intl.PluralRules`. The `#` placeholder in templates is replaced by the locale-formatted count.

```typescript
plural(1, { one: '# item', other: '# items' })   // "1 item"
plural(5, { one: '# item', other: '# items' })   // "5 items"
plural(0, { zero: 'no items', other: '# items' }) // "no items"
```

**`PluralForms`** — at minimum, `other` is required. Provide additional keys to handle CLDR plural categories:

| Key | Description |
|-----|-------------|
| `other` | Required fallback (e.g. `"# items"`) |
| `one` | Singular form (e.g. `"# item"`) |
| `zero` | Zero form (e.g. `"no items"`) |
| `two` | Dual form (used in some locales) |
| `few` | Paucal form (used in Slavic locales) |
| `many` | Used in some locales (e.g. Welsh) |

**`PluralOptions`:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `string \| string[]` | runtime default | BCP 47 locale(s) |
| `type` | `'cardinal' \| 'ordinal'` | `'cardinal'` | Plural rule type |

---

### ordinal

```typescript
function ordinal(n: number, options?: OrdinalOptions): string
```

Formats a number as an ordinal string using `Intl.PluralRules` with `type: 'ordinal'`.

> **Note (v0.1):** Suffix strings (st, nd, rd, th) are English-only. The locale option affects `PluralRules` category selection but not the suffix characters.

```typescript
ordinal(1)   // "1st"
ordinal(2)   // "2nd"
ordinal(3)   // "3rd"
ordinal(11)  // "11th"
ordinal(21)  // "21st"
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `string \| string[]` | runtime default | BCP 47 locale(s) |

---

### truncate

```typescript
function truncate(str: string, length: number, options?: TruncateOptions): string
```

Truncates a string to a maximum character length, inserting an ellipsis indicator.

```typescript
truncate('Hello, World!', 8)                              // "Hello..."
truncate('Hello, World!', 8, { position: 'middle' })     // "Hel...d!"
truncate('Hello, World!', 8, { position: 'start' })      // "...orld!"
truncate('Hello World', 8, { wordBoundary: true })        // "Hello..."
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ellipsis` | `string` | `'...'` | Truncation indicator |
| `position` | `'end' \| 'middle' \| 'start'` | `'end'` | Where to cut the string |
| `wordBoundary` | `boolean` | `false` | Avoid mid-word cuts (only applies when `position` is `'end'`) |

---

## Tree-shaking

Import the whole library or pull in individual modules — both work with any bundler that respects `sideEffects: false`:

```typescript
// Full import — bundler tree-shakes unused exports
import { timeAgo, bytes } from 'pure-humanize';

// Deep import — guaranteed single-module bundle, no tree-shaking needed
import { timeAgo } from 'pure-humanize/timeAgo';
import { bytes } from 'pure-humanize/bytes';
import { currency } from 'pure-humanize/currency';
```

Each subpath export ships as both ESM (`.js`) and CJS (`.cjs`) with a co-located `.d.ts` file.

## Runtime Compatibility

| Runtime | Minimum version |
|---------|----------------|
| Node.js | 18+ |
| Deno | 1.x+ |
| Bun | 1.x+ |
| Chrome | 72+ |
| Firefox | 78+ |
| Safari | 14.1+ |
| Edge | 79+ |

All formatting is delegated to the runtime's `Intl` implementation. The required APIs are `Intl.RelativeTimeFormat`, `Intl.NumberFormat`, `Intl.ListFormat`, and `Intl.PluralRules`.

## License

MIT
