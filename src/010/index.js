export default function printTree(
  treeString,
  order = "infix",
  { onTraverse = console.log } = {}
) {
  const tree = parseTree(treeString);
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

export class ParsingError extends Error {
  constructor(message, ...args) {
    super(message, ...args);
  }
}

export function parseTree(treeString) {
  return parseAux({ treeString }, 0)[0];
}

("(A,,)");
//pass a container in order to not make multiple copies of the string
function parseAux(treeStringContainer, l, kind = "root") {
  const c = treeStringContainer;
  const START = "(";
  const END = ")";
  const SEP = ",";

  let i = l;
  if (c.treeString[i] !== START) {
    if (kind === "root" && c.treeString[i] !== undefined) {
      throw new ParsingError(
        `Expected end of string. Found ${c.treeString[i]}`
      );
    }
    if (kind === "left" && c.treeString[i] !== SEP) {
      throw new ParsingError(`Expected ${SEP}. Found ${c.treeString[i]}`);
    }
    if (kind === "right" && c.treeString[i] !== END) {
      throw new ParsingError(`Expected ${END}. Found ${c.treeString[i]}`);
    }
    return [null, i];
  }
  const node = { value: null, left: null, right: null };
  //first segment you add everything before the comma
  while (c.treeString[i] !== SEP && c.treeString[i] !== END) {
    i++;
    if (c.treeString[i] === START) {
      throw new ParsingError(`Unexpected character: ${START}.`);
    }
    if (i >= c.treeString.length) {
      throw new ParsingError("Unexpected end of string");
    }
  }
  node.value = c.treeString.slice(l + 1, i);
  if (c.treeString[i] === END) {
    if (kind === "root" && c.treeString[i + 1] !== undefined) {
      throw new ParsingError(`Expected end of string`);
    }
    if (
      kind === "left" &&
      c.treeString[i + 1] !== SEP &&
      c.treeString[i + 1] !== END
    ) {
      throw new ParsingError(
        `Expected ${SEP} or ${END}. Found ${c.treeString[i + 1]}`
      );
    }
    if (kind === "right" && c.treeString[i + 1] !== END) {
      throw new ParsingError(`Expected ${END}. Found ${c.treeString[i + 1]}`);
    }
    return [node, i + 1];
  }

  //If you reached this, treeString[i] is SEP
  //second segment
  i++;
  //now we are inside the tree to parse
  const [leftNode, newIndex1] = parseAux(c, i, "left");
  i = newIndex1;
  node.left = leftNode;
  //we finished the parsing, we should have ended in a comma or in an end

  if (c.treeString[i] !== SEP) {
    if (c.treeString[i] === END) {
      return [node, i + 1];
    }
    throw new ParsingError(
      `Expected ${SEP} or ${END}. Found ${c.treeString[i]}`
    );
  }
  i++;

  //third segment
  const [rightNode, newIndex2] = parseAux(c, i, "right");
  node.right = rightNode;
  i = newIndex2;

  if (c.treeString[i] !== END) {
    throw new ParsingError(
      `Expected character ${END}. Found ${c.treeString[i]}`
    );
  }
  i++;
  return [node, i];
}
