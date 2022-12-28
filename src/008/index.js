// import { arrayFunctions, pipeWithArgs as pipe } from "../utils/functionalUtils";

// const { map, concat, filter, reduce, flat, flatMap, forEach } = arrayFunctions;

/**
 *
 * @param {Object} oldObject
 * @param {String} parentName
 */

function isPureObject(oldObj) {
  return typeof oldObj == "object" && oldObj != null && !Array.isArray(oldObj);
}

export function flatten(oldObj, parentName) {
  if (!isPureObject(oldObj)) return oldObj;

  const out = {};
  for (const key in oldObj) {
    if (Object.hasOwnProperty.call(oldObj, key)) {
      const value = oldObj[key];
      if (typeof value != "object" || Array.isArray(value) || value == null) {
        out[`${parentName}_${key}`] = value;
      } else {
        //recursive step, we flatten the value
        const flattenedValue = flatten(value, key);
        for (const innerKey in flattenedValue) {
          if (Object.hasOwnProperty.call(flattenedValue, innerKey)) {
            const innerValue = flattenedValue[innerKey];
            const newKey = `${parentName}_${innerKey}`;
            if (Object.hasOwnProperty.call(out, newKey)) {
              throw new Error(`Ambiguous object assign for key: ${newKey}`);
            }
            out[newKey] = innerValue;
          }
        }
      }
    }
  }
  return out;
}

//TODO: finish the functional version
export function flattenFunctional(oldObj, parentName) {
  if (!isPureObject(oldObj)) return oldObj;
  return Object.fromEntries(
    Object.entries(oldObj).flatMap(([key, val]) => {
      if (!isPureObject(val)) {
        return [[`${parentName}_${key}`, val]];
      } else {
        const flattened = flattenFunctional(val, key);
        const out = Object.entries(flattened).map(([innerKey, innerValue]) => {
          const newKey = `${parentName}_${innerKey}`;
          if (Object.hasOwnProperty.call(oldObj, innerKey)) {
            throw new Error(`Ambiguous object assign for key: ${innerKey}`);
          }
          return [newKey, innerValue];
        });
        return out;
      }
    })
  );
}
