//I really don't get why  would want to do it in one pass, if it performs the same number of operations, this solution is more complex and less modular. Or maybe this wasn't the expected implementation, but I don't see how could you get the middle and the half at the same time with less operations.

export function isLinkedListPalindrome(head) {
  if (head == null) return true;
  let middle = head;
  let aux = head;
  const firstHalf = [];
  while (aux?.next) {
    firstHalf.push(middle.value);
    middle = middle.next;
    aux = aux.next.next;
  }

  let current = aux ? middle.next : middle;

  let index = firstHalf.length - 1;

  while (current) {
    if (current.value !== firstHalf[index]) {
      return false;
    }
    current = current.next;
    index--;
  }
  return true;
}
