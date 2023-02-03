export function createBinaryTreeNode(value, left = null, right = null) {
  return {
    value: value,
    left: left,
    right: right,
  };
}

export function createTreeNode(value, children = []) {
  return {
    value: value,
    children: children,
  };
}

export function createLinkedListNode(value, next = null) {
  return {
    value,
    next,
  };
}

export function connectNodesSequentially(nodes) {
  const head = nodes[0] || null;
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  return head;
}
