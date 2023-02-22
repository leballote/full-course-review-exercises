export function findLoopStart(head) {
  let turtle = head;
  let hare = head;

  let counter = 0;
  do {
    turtle = turtle?.next;
    hare = hare?.next?.next;
    if (hare == null) {
      return null;
    }
    counter++;
  } while (turtle !== hare);
  let current1 = head;
  let current2 = head;
  while (counter--) {
    current2 = current2.next;
  }
  while (current1 != current2) {
    current1 = current1.next;
    current2 = current2.next;
  }
  return current1;
}
