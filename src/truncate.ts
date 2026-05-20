/**
 * Options for the {@link truncate} function.
 * @example
 * const opts: TruncateOptions = { ellipsis: '…', position: 'middle', wordBoundary: false };
 */
export type TruncateOptions = {
  /** Truncation indicator. Defaults to `'...'` */
  ellipsis?: string;
  /** Where to truncate: `'end'` (default), `'middle'`, or `'start'`. */
  position?: 'end' | 'middle' | 'start';
  /** Avoid cutting words in the middle. Only applies when `position` is `'end'`. Defaults to `false`. */
  wordBoundary?: boolean;
};

/**
 * Truncates a string to a maximum length with an ellipsis indicator.
 * @example truncate('Hello, World!', 8) // "Hello..."
 * @example truncate('Hello, World!', 8, { position: 'middle' }) // "He...d!"
 * @example truncate('Hello, World!', 8, { position: 'start' }) // "...orld!"
 * @example truncate('Hello World', 8, { wordBoundary: true }) // "Hello..."
 */
export function truncate(str: string, length: number, options?: TruncateOptions): string {
  const ellipsis = options?.ellipsis ?? '...';
  const position = options?.position ?? 'end';

  if (str.length <= length) return str;

  const availableLength = length - ellipsis.length;

  if (availableLength <= 0) return ellipsis.slice(0, length);

  if (position === 'start') {
    return ellipsis + str.slice(str.length - availableLength);
  }

  if (position === 'middle') {
    const left = Math.ceil(availableLength / 2);
    const right = Math.floor(availableLength / 2);
    return str.slice(0, left) + ellipsis + str.slice(str.length - right);
  }

  let end = availableLength;

  if (options?.wordBoundary) {
    const lastSpace = str.slice(0, availableLength).lastIndexOf(' ');
    if (lastSpace > 0) end = lastSpace;
  }

  return str.slice(0, end) + ellipsis;
}
