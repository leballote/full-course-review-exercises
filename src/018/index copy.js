

const val = 7;
set(obj, "a.a2", val); //throw
set(obj, "c.c2.c3", val); 
let obj2Ans = {
  a: 1,
  b: {
    foo: 2,
  },
  d: () => {},
  c: {
    c2: {
      c3: val
    }
  }
}
//if property doesn't exist, you create an object
const obj = {
  a: 1,
  b: {
    foo: 2,
  },
  d: () => {},
};
set(obj, "b.foo", val);
const objAns2 = {
  a: 1,
  b: {
    foo: ,
  },
  d: () => {},
};
set(obj, "b.foo.bar", val); //throw

export function set(obj, path, value) {
  if (!isPropertyAssignable(obj)) {
    throw NotAssignableError();
  }
  const pathList = path.split(".");
  let current = obj;
  for (let i = 0; i < pathList.length; i++) {
    const segment = pathList[i];
    if (
      !isPropertyAssignable(current[segment]) &&
      current[segment] !== undefined
    ) {
      throw NotAssignableError();
    }
    if (
      (typeof current[segment] != "object" || current[segment] === null) &&
      i != pathList.length - 1
    ) {
      current[segment] = {};
    }
    if (i == pathList.length - 1) {
      current[segment] = value;
    }
    current = current[segment];
  }
  return obj;
}

function isPropertyAssignable(obj) {
  return (typeof obj === "object" || typeof obj === "function") && obj != null;
}

export class NotAssignableError {
  constructor(...args) {
    super(...args);
  }
}
