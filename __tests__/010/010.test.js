import { createBinaryTreeNode as N } from "../../dist/utils/ds.utils";
import printTree from "../../dist/010";

const tree1 = N(
  25,
  N(15, N(10, N(4), N(12)), N(22, N(18), N(24))),
  N(50, N(35, N(31), N(44)), N(70, N(66), N(90)))
);
const tree2 = N(
  "A",
  N("B", N("D"), N("E")),
  N("C", N("F", N("H"), N("I")), N("G", null, N("J")))
);

function expectToBeCalledSequentiallyExactlyWith(fn, arrayArgs) {
  expect(fn).toHaveBeenCalledTimes(arrayArgs.length);
  for (let i = 1; i <= arrayArgs.length; i++) {
    const args = arrayArgs[i - 1];
    expect(fn).toHaveBeenNthCalledWith(i, ...args);
  }
}

function customTest(
  title,
  { tree, mode, options: { onTraverse = jest.fn() } = {} } = {},
  traverseOrder
) {
  test(title, () => {
    printTree(tree, mode, { onTraverse: onTraverse });
    expectToBeCalledSequentiallyExactlyWith(
      onTraverse,
      traverseOrder.map((el) => [el])
    );
  });
}

// const defaultOnTraverse = jest.fn();

describe("infix", () => {
  const mode = "infix";
  describe("edge cases", () => {
    customTest("Null tree", { tree: null, mode }, []);
  });

  describe("normal cases", () => {
    customTest(
      "Example 1",
      { tree: tree1, mode },
      [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]
    );
    customTest("Example 2", { tree: tree2, mode }, [
      "D",
      "B",
      "E",
      "A",
      "H",
      "F",
      "I",
      "C",
      "G",
      "J",
    ]);
  });
});

describe("prefix", () => {
  const mode = "prefix";
  describe("edge cases", () => {
    customTest("Null tree", { tree: null, mode }, []);
  });

  describe("edge cases", () => {
    customTest(
      "Example 1",
      { tree: tree1, mode },
      [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90]
    );
    customTest("Example 2", { tree: tree2, mode }, [
      "A",
      "B",
      "D",
      "E",
      "C",
      "F",
      "H",
      "I",
      "G",
      "J",
    ]);
  });
});

describe("postfix", () => {
  const mode = "postfix";
  describe("edge cases", () => {
    customTest("Null tree", { tree: null, mode }, []);
  });

  describe("normal cases", () => {
    customTest(
      "Example 1",
      { tree: tree1, mode: "postfix" },
      [4, 12, 10, 18, 24, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25]
    );
    customTest("Example 2", { tree: tree2, mode }, [
      "D",
      "E",
      "B",
      "H",
      "I",
      "F",
      "J",
      "G",
      "C",
      "A",
    ]);
  });
});

describe("others", () => {
  test("Should throw on not supported mode", () => {
    const thunk = () => {
      //bad written postfix
      printTree(tree1, "postFix");
    };
    expect(thunk).toThrow(Error);
  });
});
