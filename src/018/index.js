export function set(obj, path, value) {
  const pathList = path.split(".");
  let current = obj;
  for (let i = 0; i < pathList.length; i++) {
    const prop = pathList[i];
    if (!isPropertyAssignable(current)) {
      throw new NotAssignableError();
    }
    if (current[prop] === undefined) {
      current[prop] = {};
    }

    if (i == pathList.length - 1) {
      current[prop] = value;
    }
    current = current[prop];
  }
  return obj;
}

function isPropertyAssignable(obj) {
  return (typeof obj === "object" || typeof obj === "function") && obj != null;
}

export class NotAssignableError extends Error {
  constructor(...args) {
    super(...args);
  }
}
