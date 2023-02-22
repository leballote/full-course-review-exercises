// this solution is given in case that you are not allowed to modify the object at any point but it occupies O(N) extra space
export function isLinkedListPalindrome(head) {
  const array = fromLinkedListToArray(head);
  return isArrayPalindrome(array);
}
export function fromLinkedListToArray(head) {
  let current = head;
  const array = [];
  while (current) {
    array.push(current.value);
    current = current.next;
  }
  return array;
}

function isArrayPalindrome(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] != array[array.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

import {
  connectNodesSequentially,
  createLinkedListNode as N,
} from "../../src/utils/ds.utils";

const list = connectNodesSequentially([
  N("a"),
  N("b"),
  N("c"),
  N("d"),
  N("c"),
  N("b"),
  N("a"),
]);

const ans = fromLinkedListToArray(list);
console.log("ans", ans);
