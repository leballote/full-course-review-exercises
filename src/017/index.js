function findLength(head) {
  let current = head;
  let n = 0;
  while (current) {
    n++;
    current = current.next;
  }
  return n;
}

function findLeftMiddle(head) {
  let n = findLength(head);
  let midPoint = Math.ceil(n / 2);
  let middle = head;
  for (let i = 0; i < midPoint - 1; i++) {
    middle = middle.next;
  }
  return middle;
}

function reverse(head) {
  let current1 = null;
  let current2 = head;
  while (current2) {
    let temp1 = current2;
    let temp2 = current2.next;
    current2.next = current1;
    current1 = temp1;
    current2 = temp2;
  }
  return current1;
}

export function isLinkedListPalindrome(head) {
  const middle = findLeftMiddle(head);
  const middleNext = middle?.next;
  if (!middleNext) return true;
  middle.next = null;
  const head2 = reverse(middleNext);
  let current1 = head;
  let current2 = head2;
  while (current2) {
    if (current1.value != current2.value) {
      return false;
    }
    current2 = current2.next;
    current1 = current1.next;
  }

  //may need to restore the universe
  let restoredMiddleNext = reverse(head2);
  middle.next = restoredMiddleNext;
  return true;
}
