export function isSymmetric(root) {
  if (root == null) {
    return true;
  }
  const leftStack = [];
  const rightStack = [];
  leftStack.push(root.left);
  rightStack.push(root.right);
  let safe = 10;
  while (leftStack.length > 0 && rightStack.length > 0 && safe--) {
    let currentLeft = leftStack.pop();
    let currentRight = rightStack.pop();
    if (
      (currentLeft == null && currentRight != null) ||
      (currentRight == null && currentLeft != null)
    ) {
      return false;
    }
    if (currentLeft == null && currentRight === null) {
      continue;
    }
    if (currentLeft.value !== currentRight.value) {
      return false;
    }
    leftStack.push(currentLeft.left);
    leftStack.push(currentLeft.right);
    rightStack.push(currentRight.right);
    rightStack.push(currentRight.left);
  }
  return true;
}
