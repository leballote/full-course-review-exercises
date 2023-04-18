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

// export function parseTree(treeString) {
//   return parseAux({ treeString }, 0)[0];
// }

//pass a container in order to not make multiple copies of the string
function parseTree(treeString) {
  let i = -1;
  const START = "(";
  const END = ")";
  const SEP = ",";
  if (treeString == "") {
    return null;
  }

  function parseNodeValue() {
    let value = "";
    while (treeString[i] != SEP && treeString[i] != END) {
      if (treeString[i] == START || treeString[i] == undefined) {
        throw new ParsingError(`Unexpected character ${treeString[i]} at ${i}`);
      }
      value += treeString[i];
      i++;
    }
    return value;
  }

  function parseNode() {
    const node = {
      value: "",
    };

    i++;
    if (treeString[i] == SEP || treeString[i] == END) {
      return null;
    } else if (treeString[i] == START) {
      i++;
      node.value = parseNodeValue();
    } else {
      throw new ParsingError(`Unexpected character ${treeString[i]} at ${i}`);
    }

    //s[i] can only be END or SEP
    if (treeString[i] == END) {
      i++;
      return node;
    }
    //s[i] can only be SEP
    node.left = parseNode();

    //only SEP or END
    // console.log("here", treeString[i], i);
    if (treeString[i] == END) {
      i++;
      return node;
    }

    // console.log("we start parsing node", treeString[i], i);
    node.right = parseNode();
    if (treeString[i] != END) {
      throw new ParsingError(`Expected ${END}`);
    }
    i++;

    return node;
  }

  const tree = parseNode();
  if (treeString[i] !== undefined) {
    throw new ParsingError(`Expected end of string`);
  }
  return tree;
}

// const treeString = "(A,(B,,))";
// // console.log("treeString", treeString);

// const tree = parseTree(treeString);

// const util = require("util");

// console.log(util.inspect(tree, { depth: null }));
