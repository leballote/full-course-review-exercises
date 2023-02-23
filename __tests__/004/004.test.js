import { mergeArrays } from "../../dist/004";

describe("mergeArray should merge", () => {
  test("generic 1", () => {
    const largeArray = [1, 3, 5, 7, 9].concat(new Array(5));
    const smallArray = [0, 2, 4, 6, 8];
    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("generic 2", () => {
    const smallArray = [
      3, 7, 9, 20, 23, 35, 41, 44, 50, 51, 58, 61, 67, 70, 74, 75, 85, 98, 103,
    ];
    const largeArray = [
      12, 26, 41, 49, 52, 60, 72, 77, 93, 99, 109, 145, 171, 182, 186, 191, 194,
      196, 205, 209, 218, 237, 240, 250, 264, 274,
    ].concat(new Array(smallArray.length));
    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([
      3, 7, 9, 12, 20, 23, 26, 35, 41, 41, 44, 49, 50, 51, 52, 58, 60, 61, 67,
      70, 72, 74, 75, 77, 85, 93, 98, 99, 103, 109, 145, 171, 182, 186, 191,
      194, 196, 205, 209, 218, 237, 240, 250, 264, 274,
    ]);
  });

  test("repeated numbers1", () => {
    const smallArray = [2, 2, 2, 2];
    const largeArray = [1, 1, 1, 1, 1, 1, 1, 1].concat(
      new Array(smallArray.length)
    );
    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
  });

  test("repeated numbers2", () => {
    const smallArray = [1, 1, 1, 1, 1, 1, 1, 1];
    const largeArray = [2, 2, 2, 2].concat(new Array(smallArray.length));
    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
  });

  //I considered that you have exactly enough space, but I let this test to be activated just in case
  test.skip("more space than necessary", () => {
    const smallArray = [1, 3, 5, 7];
    const largeArray = [0, 2, 4, 6].concat(new Array(smallArray.length + 4));
    mergeArrays(largeArray, smallArray);
    console.log(largeArray);
    expect(largeArray).toEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  });

  //again I considered exactly enough space, but I believe this is a sane behavior
  test.skip("less space than necessary", () => {
    const smallArray = [1, 3, 5, 7];
    const largeArray = [0, 2, 4, 6].concat(new Array(smallArray.length - 2));
    mergeArrays(largeArray, smallArray);
    expect(largeArray).toEqual([0, 2, 3, 4, 5]);
  });
});
