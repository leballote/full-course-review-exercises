import { flattenArray } from "../../dist/009";

describe("edge cases", () => {
  test("primitive e.g. number", () => {
    expect(flattenArray(3)).toEqual(3);
  });

  test("primitive e.g. string", () => {
    expect(flattenArray("good bye!")).toEqual("good bye!");
  });

  test("null", () => {
    expect(flattenArray(null)).toEqual(null);
  });

  test("0 length array", () => {
    expect(flattenArray([])).toEqual([]);
  });

  test("1 length array", () => {
    expect(flattenArray([1000])).toEqual([1000]);
  });
});

describe("generic cases", () => {
  test("example 1", () => {
    const input = [1, 2, 3, [4, 5, [6, [[7]], 8]], [9, 10]];
    expect(flattenArray(input)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("example 2", () => {
    const input = [[[[[[[[0]]]]]]]];
    expect(flattenArray(input)).toEqual([0]);
  });

  test("example 3", () => {
    const input = [30, [20], 10, [2], [4], 3, [3, [5]], [7, [8, [9], [10]]]];
    expect(flattenArray(input)).toEqual([
      30, 20, 10, 2, 4, 3, 3, 5, 7, 8, 9, 10,
    ]);
  });
});
