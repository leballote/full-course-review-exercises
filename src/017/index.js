//I really don't get why  would want to do it in one pass, if it performs the same number of operations, this solution is more complex and less modular. Or maybe this wasn't the expected implementation, but I don't see how could you get the middle and the half at the same time with less operations.

export function isLinkedListPalindrome(head) {
  if (head == null) return true;
  let middle = head;
  let aux = head;
  let length = 1;
  const firstHalf = [];
  while (aux?.next?.next != null) {
    firstHalf.push(middle.value);
    middle = middle?.next;
    aux = aux?.next?.next;
    length += 2;
  }
  firstHalf.push(middle.value);
  length += aux?.next ? 1 : 0;

  let current = middle;
  let index = Math.floor(length / 2) - 1;
  current = current.next;

  while (current !== null) {
    if (current.value !== firstHalf[index]) {
      return false;
    }
    current = current.next;
    index--;
  }
  return true;
}
