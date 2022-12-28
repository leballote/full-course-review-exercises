// import { arrayFunctions, pipeWithArgs as pipe } from "../utils/functionalUtils";

// const { map, concat, filter, reduce, flat, flatMap, forEach } = arrayFunctions;

const oldObj = {
  name: "Sara",
  gender: "Apache Attack Helicopter",
  address: {
    location: {
      city: "SF",
      state: "CA",
    },
    preferredLocation: {
      city: "SF",
      state: ["CA", "MN"],
    },
    other: undefined,
  },
};
/**
 *
 * @param {Object} oldObject
 * @param {String} parentName
 */

const flettened = flatten(oldObj, "oldObj");
console.log(flettened);
/**
 *  expected output:
 *  {
 *    oldObj_name: 'Sara',
 *    oldObj_gender: 'Apache Attack Helicopter',
 *    oldObj_address_location_city: 'SF',
 *    oldObj_address_location_state: 'CA',
 *    oldObj_address_preferredLocation_state: 'SF',
 *    oldObj_address_preferredLocation_city: ['CA', 'MN'],
 *    oldObj_address_other: undefined
 *  }
 */

function isPureObject(oldObj) {
  return typeof oldObj == "object" && oldObj != null && !Array.isArray(oldObj);
}

export function flatten(oldObj, parentName) {
  console.log("oldObj", oldObj);
  console.log("oldObj pureness", isPureObject(oldObj));
  if (!isPureObject(oldObj)) return oldObj;

  const out = {};
  for (const key in oldObj) {
    if (Object.hasOwnProperty.call(oldObj, key)) {
      const value = oldObj[key];
      if (typeof value != "object" || Array.isArray(value) || value == null) {
        out[`${parentName}_${key}`] = value;
      } else {
        const flattenedValue = flatten(value, key);
        for (const innerKey in flattenedValue) {
          if (Object.hasOwnProperty.call(flattenedValue, innerKey)) {
            const innerValue = flattenedValue[innerKey];
            out[`${parentName}_${innerKey}`] = innerValue;
          }
        }
      }
    }
  }
  return out;
}

//TODO: finish the functional version
// function flattenEntries(objEntries, parentName) {
//   if (!isPureObject(oldObj)) return oldObj;
//   pipe(Object.entries, [
//     map,
//     ([key, val]) => {
//       if (isPureObject(val)) {
//         return [`${parentName}_${key}`, val];
//       } else {
//         return [key, val];
//       }
//     },
//   ])(oldObj);
// }

// function flattenFunctional(oldObj, parentName) {
//   if (!isPureObject(oldObj)) return oldObj;
//   pipe(Object.entries, [
//     map,
//     ([key, val]) => {
//       flattenFunctional;
//     },
//   ])(oldObj);
// }
