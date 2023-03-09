import { isLinkedListPalindrome } from "../../dist/017";
import {
  connectNodesSequentially,
  createLinkedListNode as N,
} from "../../dist/utils/ds.utils";

describe("Palindromes", () => {
  test("null", () => {
    expect(isLinkedListPalindrome(null)).toEqual(true);
  });

  test("one node", () => {
    const head = connectNodesSequentially([N("a")]);

    expect(isLinkedListPalindrome(head)).toEqual(true);
  });

  test("two nodes", () => {
    const head = connectNodesSequentially([N("a"), N("a")]);
    expect(isLinkedListPalindrome(head)).toEqual(true);
  });

  test("even palindrome", () => {
    const head = connectNodesSequentially([
      N("a"),
      N("b"),
      N("c"),
      N("c"),
      N("b"),
      N("a"),
    ]);
    expect(isLinkedListPalindrome(head)).toEqual(true);
  });

  test("odd palindrome", () => {
    const head = connectNodesSequentially([
      N("a"),
      N("b"),
      N("c"),
      N("d"),
      N("c"),
      N("b"),
      N("a"),
    ]);
    expect(isLinkedListPalindrome(head)).toEqual(true);
  });
});

describe("Not palindromes", () => {
  test("two nodes", () => {
    const head = connectNodesSequentially([N("a"), N("b")]);
    expect(isLinkedListPalindrome(head)).toEqual(false);
  });
  test("generic example 1", () => {
    const head = connectNodesSequentially([
      N("a"),
      N("b"),
      N("c"),
      N("d"),
      N("e"),
    ]);
    expect(isLinkedListPalindrome(head)).toEqual(false);
  });
  test("generic example 2", () => {
    const head = connectNodesSequentially([N("a"), N("b"), N("a"), N("b")]);
    expect(isLinkedListPalindrome(head)).toEqual(false);
  });
  test("almost palindrome", () => {
    const head = connectNodesSequentially([
      N("a"),
      N("b"),
      N("c"),
      N("C"),
      N("b"),
      N("a"),
    ]);
    expect(isLinkedListPalindrome(head)).toEqual(false);
  });
});
