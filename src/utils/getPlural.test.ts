import { getPlural } from "./getPlural";

describe("функция работает правильно", () => {
  const one = "коммит";
  const two = "коммита";
  const three = "коммитов";

  test("для 1", () => {
    expect(getPlural(1, [one, two, three])).toEqual(one);
  });

  test("для 2", () => {
    expect(getPlural(2, [one, two, three])).toEqual(two);
  });

  test("для 10", () => {
    expect(getPlural(10, [one, two, three])).toEqual(three);
  });

  test("для 11", () => {
    expect(getPlural(11, [one, two, three])).toEqual(three);
  });

  test("для 21", () => {
    expect(getPlural(21, [one, two, three])).toEqual(one);
  });

  test("для 101", () => {
    expect(getPlural(101, [one, two, three])).toEqual(one);
  });

  test("для -11", () => {
    expect(getPlural(-11, [one, two, three])).toEqual(three);
  });

  test("для -23", () => {
    expect(getPlural(-23, [one, two, three])).toEqual(two);
  });

  test("для -1", () => {
    expect(getPlural(-1, [one, two, three])).toEqual(one);
  });
});
