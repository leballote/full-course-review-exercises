//recursive
export function flattenArray(input) {
  if (!Array.isArray(input)) return input;
  let out = [];
  for (const el of input) {
    if (!Array.isArray(el)) {
      out.push(el);
    } else {
      out = out.concat(flattenArray(el));
    }
  }
  return out;
}

export function iterativeFlattenArray(input) {
  if (!Array.isArray(input) || input.length === 0) return input;
  const out = [];
  const stack = [];
  for (let i = input.length - 1; i >= 0; i--) {
    stack.push(input[i]);
  }
  while (stack.length > 0) {
    const el = stack.pop();
    if (!Array.isArray(el)) {
      out.push(el);
    } else {
      for (let i = el.length - 1; i >= 0; i--) {
        stack.push(el[i]);
      }
    }
  }
  return out;
}

/**
 * expected output:
 * [1,2,3,4,5,6,7,8,9,10]
 */
