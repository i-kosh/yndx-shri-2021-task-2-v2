/**
 * http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
 */

export default function getPlural(n: number, form: [string, string, string]) {
  return form[
    n % 10 == 1 && n % 100 != 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
}

export { getPlural };
