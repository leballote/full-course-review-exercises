export default function printTree(tree, order = "infix", { onTraverse }) {
  if (order === "infix") {
    inOrderTraverse(tree, onTraverse);
    return;
  } else if (order === "prefix") {
    preOrderTraverse(tree, onTraverse);
  } else if (order === "postfix") {
    postOrderTraverse(tree, onTraverse);
  }
}

export function inOrderTraverse(root, onTraverse) {
  if (root == null) return;
  inOrderTraverse(root.left, onTraverse);
  onTraverse(root.value);
  inOrderTraverse(root.right, onTraverse);
}

export function preOrderTraverse(root, onTraverse) {
  if (root == null) return;
  onTraverse(root.value);
  preOrderTraverse(root.left, onTraverse);
  preOrderTraverse(root.right, onTraverse);
}

export function postOrderTraverse(root, onTraverse) {
  if (root == null) return;
  postOrderTraverse(root.left, onTraverse);
  postOrderTraverse(root.right, onTraverse);
  onTraverse(root.value);
}
