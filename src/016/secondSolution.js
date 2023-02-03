export function findLoopStart(head) {
  const valueLists = {};
  let current = head;
  while (current) {
    if (valueLists[current.value] == undefined) valueLists[current.value] = [];
    if (valueLists[current.value].includes(current)) {
      return current;
    } else {
      valueLists[current.value].push(current);
    }
    current = current.next;
  }
  return null;
}
