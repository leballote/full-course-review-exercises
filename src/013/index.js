class NodeWithLevel {
  constructor(node, level) {
    this.node = node;
    this.level = level;
  }
}

export function isSameLevel(tree, value1, value2) {
  //If value1 == value2, that number has to appear two times in the same level
  if (tree == null) {
    return false;
  }
  let countValues = {};
  if (value1 == value2) {
    countValues = { value1: 0 };
  } else {
    countValues = { value1: 0, value2: 0 };
  }
  const treeWithLevel = new NodeWithLevel(tree, 0);
  const queue = [treeWithLevel];
  let prevElement = null;
  let currElement = null;
  while (queue.length > 0) {
    prevElement = currElement;
    currElement = queue.shift();
    if (prevElement?.level != currElement?.level) {
      countValues.value1 = 0;
      countValues.value2 = 0;
    }
    if (value1 === currElement.node.value) {
      countValues.value1++;
    }
    if (value2 === currElement.node.value) {
      countValues.value2++;
    }
    if (value1 === value2 && countValues.value1 >= 2) {
      return true;
    }
    if (
      value1 != value2 &&
      countValues.value1 >= 1 &&
      countValues.value2 >= 1
    ) {
      return true;
    }
    for (const child of currElement.node.children) {
      queue.push(new NodeWithLevel(child, currElement.level + 1));
    }
  }
  return false;
}
