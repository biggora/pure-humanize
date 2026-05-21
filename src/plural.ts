import { PLURAL_TYPE, type PluralType } from './constants/styles.js';

/**
 * Plural form templates keyed by CLDR plural category.
 * `#` in any template is replaced by the locale-formatted count.
 * @example
 * plural(1, { one: '# item', other: '# items' }) // "1 item"
 */
export type PluralForms = {
  /** @example "# item" */
  one?: string;
  /** Required fallback form. @example "# items" */
  other: string;
  zero?: string;
  two?: string;
  few?: string;
  many?: string;
};

/**
 * Options for {@link plural}.
 * @example
 * plural(3, { one: '# cat', other: '# cats' }, { locale: 'en' }) // "3 cats"
 */
export type PluralOptions = {
  locale?: string | string[];
  type?: PluralType;
};

/**
 * Selects the correct plural form for a count.
 * `#` in the template is replaced by the locale-formatted count.
 * @example plural(1, { one: '# item', other: '# items' }) // "1 item"
 * @example plural(5, { one: '# item', other: '# items' }) // "5 items"
 * @example plural(0, { zero: 'no items', other: '# items' }) // "no items"
 */
export function plural(count: number, forms: PluralForms, options?: PluralOptions): string {
  const pr = new Intl.PluralRules(options?.locale, { type: options?.type ?? PLURAL_TYPE.CARDINAL });
  const category = pr.select(count);
  const template = forms[category as keyof PluralForms] ?? forms.other;
  const formattedCount = new Intl.NumberFormat(options?.locale).format(count);
  return template.replace(/#/g, formattedCount);
}
