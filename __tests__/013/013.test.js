import { isSameLevel } from "../../src/013";
import { createTreeNode as N } from "../../src/utils/ds.utils";

const root = N(0, [
  N(1),
  N(2, [N(1), N(5, [N(3), N(5, [N(6)]), N(9)])]),
  N(3, [N(0)]),
  N(5),
  N(7, [N(3, [N(3), N(0, [N(9), N(4)])])]),
]);

describe("Same level", () => {
  test("Only two levels", () => {
    const tree = N(4, [N(2), N(2)]);
    const ans = isSameLevel(tree, 2, 2);
    expect(ans).toEqual(true);
  });
  test("Same numbers", () => {
    const ans = isSameLevel(root, 3, 3);
    expect(ans).toEqual(true);
  });

  test("From left to right generic", () => {
    const ans = isSameLevel(root, 3, 5);
    expect(ans).toEqual(true);
  });

  test("From right to left generic", () => {
    const ans = isSameLevel(root, 5, 3);
    expect(ans).toEqual(true);
  });
});

describe("Not same level", () => {
  test("Null", () => {
    const ans = isSameLevel(null, 21, 18);
    expect(ans).toEqual(false);
  });
  test("One node", () => {
    const tree = N(13);
    const ans = isSameLevel(tree, 13, null);
    expect(ans).toEqual(false);
  });
  test("Generic example 1", () => {
    const ans = isSameLevel(root, 1, 1);
    expect(ans).toEqual(false);
  });
  test("Different types", () => {
    const ans = isSameLevel(root, 3, "3");
    expect(ans).toEqual(false);
  });
});
