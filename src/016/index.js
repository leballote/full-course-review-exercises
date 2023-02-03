export function findLoopStart(head) {
  let visited = Symbol("visited");
  let current = head;
  while (current) {
    if (current[visited]) {
      break;
    }
    current[visited] = true;
    current = current.next;
  }

  //don't know if needed, but since I added the visited property, I'd like to remove it
  current = head;
  while (current && current[visited]) {
    delete current[visited];
    current = current.next;
  }
  return current;
}
