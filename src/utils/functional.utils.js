export function pipe(...fns) {
  return function (x) {
    let out = x;
    for (const fn of fns) {
      out = fn(out);
    }
    return out;
  };
}

export function pipeWithArgs(...fnArgPairs) {
  return function (x) {
    let out = x;
    for (const fnAndArgs of fnArgPairs) {
      if (Array.isArray(fnAndArgs)) {
        const [fn, ...args] = fnAndArgs;
        out = fn(x, ...args);
      } else if (typeof fnAndArgs == "function") {
        out = fnAndArgs(x);
      }
    }
    return out;
  };
}

export function makeArrayFunctionFromMethod(method) {
  return function (arr, ...args) {
    return method.call(arr, ...args);
  };
}

const functionsToTransform = [
  "map",
  "concat",
  "filter",
  "reduce",
  "flat",
  "flatMap",
];

const arrayFunctions_ = {};

for (const fnName of functionsToTransform) {
  arrayFunctions_[fnName] = makeArrayFunctionFromMethod(
    Array.prototype[fnName]
  );
}

export const arrayFunctions = arrayFunctions_;

console.log(pipeWithArgs([arrayFunctions.map, (x) => x ** 2])([1, 2, 3]));
