import { prepareData } from "./index";
import { Entity } from "./types";
const data = require("./__mockdata__/input.json") as Entity[];

describe("Всегда возвращает ожидаемый формат данных", () => {
  it("если не переданы никакие аргументы", () => {
    expect(prepareData()).toMatchSnapshot();
  });

  it("если первый аргумент пустой массив", () => {
    expect(prepareData([])).toMatchSnapshot();
  });

  it("если первый и второй аргументы пустые", () => {
    expect(
      prepareData([], {
        sprintId: 0,
      })
    ).toMatchSnapshot();
  });
});

describe("Функция работает правильно", () => {
  it("Возвращает правильные данные", () => {
    expect(prepareData(data, { sprintId: 977 })).toMatchSnapshot();
  });
});
