/**
 * http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
 */

export default function getPlural(n: number, form: [string, string, string]) {
  const absN = Math.abs(n);

  return form[
    absN % 10 == 1 && absN % 100 != 11
      ? 0
      : absN % 10 >= 2 &&
        absN % 10 <= 4 &&
        (absN % 100 < 10 || absN % 100 >= 20)
      ? 1
      : 2
  ];
}

export { getPlural };
