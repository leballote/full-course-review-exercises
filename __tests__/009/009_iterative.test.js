import { iterativeFlattenArray } from "../../dist/009";

describe("edge cases", () => {
  test("primitive e.g. number", () => {
    expect(iterativeFlattenArray(3)).toEqual(3);
  });

  test("primitive e.g. string", () => {
    expect(iterativeFlattenArray("good bye!")).toEqual("good bye!");
  });

  test("null", () => {
    expect(iterativeFlattenArray(null)).toEqual(null);
  });

  test("0 length array", () => {
    expect(iterativeFlattenArray([])).toEqual([]);
  });

  test("1 length array", () => {
    expect(iterativeFlattenArray([1000])).toEqual([1000]);
  });
});

describe("regular cases", () => {
  test("generic case", () => {
    const input = [1, 2, 3, [4, 5, [6, [[7]], 8]], [9, 10]];
    expect(iterativeFlattenArray(input)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  test("generic case 2", () => {
    const input = [30, [20], 10, [2], [4], 3, [3, [5]], [7, [8, [9], [10]]]];
    expect(iterativeFlattenArray(input)).toEqual([
      30, 20, 10, 2, 4, 3, 3, 5, 7, 8, 9, 10,
    ]);
  });

  test("it should work for a deep nested array", () => {
    const input = [[[[[[[[0]]]]]]]];
    expect(iterativeFlattenArray(input)).toEqual([0]);
  });
});
