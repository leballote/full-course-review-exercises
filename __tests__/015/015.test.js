import { findBalanceIndex } from "../../dist/015";

describe("Balanceable", () => {
  test("Generic example 1", () => {
    const array = [1, 2, 3, 4, 9, 9, 2, 7, 10, 13];
    expect(findBalanceIndex(array)).toEqual(6);
  });

  test("Generic example 2", () => {
    const array = [1, 2, 13, 3, 4, 9, 9, 2, 7, 23, 13];
    expect(findBalanceIndex(array)).toEqual(7);
  });

  test("Small array", () => {
    const array = [1, 1];
    expect(findBalanceIndex(array)).toEqual(0);
  });

  test("Small array 2", () => {
    const array = [1, 2, 3];
    expect(findBalanceIndex(array)).toEqual(1);
  });
});

describe("Not balanceable", () => {
  test("Empty array", () => {
    const array = [];
    expect(findBalanceIndex(array)).toEqual(-1);
  });

  test("Length 1 array", () => {
    const array = [10];
    expect(findBalanceIndex(array)).toEqual(-1);
  });

  test("Small array", () => {
    const array = [10, 5];
    expect(findBalanceIndex(array)).toEqual(-1);
  });

  test("Generic", () => {
    const array = [10, 5, 2, 23, 11, 1, 2, 1000];
    expect(findBalanceIndex(array)).toEqual(-1);
  });
});
