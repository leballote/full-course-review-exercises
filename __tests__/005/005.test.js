import { reverseBlocks } from "../../dist/005";

describe("Should reverse the blocks", () => {
  test("generic1", () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const blockSize = 3;
    const ans = reverseBlocks(arr, blockSize);
    expect(ans).toEqual([2, 1, 0, 5, 4, 3, 8, 7, 6, 9]);
  });

  // test("non sorte", () => {
  //   const arr = [];
  // });

  test("length multiple of blockSize", () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const blockSize = 4;
    const ans = reverseBlocks(arr, blockSize);
    expect(ans).toEqual([3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8]);
  });

  test("blockSize bigger than length", () => {
    const arr = [5, 10, 3];
    const blockSize = 10;
    const ans = reverseBlocks(arr, blockSize);
    expect(ans).toEqual([3, 10, 5]);
  });

  test("blockSize == 1", () => {
    expect(reverseBlocks([1, 2, 3, 4, 5, 6], 1)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("blockSize == 0", () => {
    const fnToError = () => {
      reverseBlocks([1, 2, 3, 4, 5, 6], 0);
    };
    expect(fnToError).toThrow(Error);
  });

  test("length == 1", () => {
    expect(reverseBlocks([29], 1));
  });

  test("length == 0", () => {
    expect(reverseBlocks([], 20)).toEqual([]);
  });
});

it("should return a pointer to the original array", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const blockSize = 3;
  const ans = reverseBlocks(arr, blockSize);
  expect(ans).toBe(arr);
});

//TODO make a big array test
