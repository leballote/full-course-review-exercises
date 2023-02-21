import { createBinaryTreeNode as N } from "../../dist/utils/ds.utils";
import printTree, { ParsingError } from "../../dist/010";

const consoleSpy = jest.spyOn(console, "log");
describe("Should throw parsing error", () => {
  beforeAll(() => {
    consoleSpy.mockReset();
  });
  afterEach(() => {
    consoleSpy.mockReset();
  });
  test("Unexpected (", () => {
    const treeString = "(AHI(,)";
    expect(() => printTree(treeString)).toThrow(ParsingError);
  });

  test("Doesn't close the first parentheses", () => {
    const treeString = "(AHI";
    expect(() => printTree(treeString)).toThrow(ParsingError);
  });

  test("Doesn't close inner parentheses", () => {
    const treeString = "(A, ()";
    expect(() => printTree(treeString)).toThrow(ParsingError);
  });

  test("This shouldn't throw wut?", () => {
    const treeString = "(A,(H))";
    printTree(treeString, "infix", {
      onTraverse: (val) => {
        console.log("TRACKING:", val);
      },
    });
  });
});

describe("Not erroring", () => {
  beforeAll(() => {
    consoleSpy.mockReset();
  });
  afterEach(() => {
    consoleSpy.mockReset();
  });

  describe("Edge cases", () => {
    test("Null tree", () => {
      const treeString = "";
      printTree(treeString);
      expect(console.log).not.toHaveBeenCalled();
      printTree(treeString, "prefix");
      expect(console.log).not.toHaveBeenCalled();
      printTree(treeString, "postfix");
      expect(console.log).not.toHaveBeenCalled();
    });

    test("One node tree", () => {
      const treeString = "(A)";
      printTree(treeString);
      expect(consoleSpy.mock.calls).toEqual([["A"]]);
      consoleSpy.mockReset();
      printTree(treeString, "prefix");
      expect(consoleSpy.mock.calls).toEqual([["A"]]);
      consoleSpy.mockReset();
      printTree(treeString, "postfix");
      expect(consoleSpy.mock.calls).toEqual([["A"]]);
    });
  });

  describe("Regular cases", () => {
    describe("infix", () => {
      test("Should print in infix order", () => {
        const treeString = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
        printTree(treeString);
        expect(consoleSpy.mock.calls).toEqual([
          ["D"],
          ["B"],
          ["E"],
          ["A"],
          ["H"],
          ["F"],
          ["I"],
          ["C"],
          ["G"],
          ["J"],
        ]);
      });
    });

    describe("prefix", () => {
      test("Should print in prefix order", () => {
        const treeString = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
        printTree(treeString, "prefix");
        expect(consoleSpy.mock.calls).toEqual([
          ["A"],
          ["B"],
          ["D"],
          ["E"],
          ["C"],
          ["F"],
          ["H"],
          ["I"],
          ["G"],
          ["J"],
        ]);
      });
    });

    describe("postfix", () => {
      test("Should print in postfix order", () => {
        const treeString = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
        printTree(treeString, "postfix");
        expect(consoleSpy.mock.calls).toEqual([
          ["D"],
          ["E"],
          ["B"],
          ["H"],
          ["I"],
          ["F"],
          ["J"],
          ["G"],
          ["C"],
          ["A"],
        ]);
      });
    });
  });
});
