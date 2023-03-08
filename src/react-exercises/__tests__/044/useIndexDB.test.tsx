import React from "react";
import {
  test,
  expect,
  describe,
  it,
  afterAll,
  afterEach,
  beforeEach,
} from "vitest";
import setGlobalVars from "indexeddbshim/src/node-UnicodeIdentifiers";
setGlobalVars(); // See signature below
import { render, waitFor } from "@testing-library/react";
import useIndexDB from "../../src/044/hooks/useIndexDB";
import { renderHook, act } from "@testing-library/react";
import * as idb from "idb";

beforeEach(() => {
  localStorage.clear();
});

describe("State is sychronized with useIndexDB", () => {
  test("At initialization", async () => {
    const { result } = renderHook(() => useIndexDB("foo", 5));
    expect(result.current[0]).toEqual(5);
    const mydb = await idb.openDB("useIndexDB");
    await waitFor(async () => {
      expect(result.current[2].current == null).toBe(false);
    });

    await waitFor(async () => {
      const data = await mydb.getAll("state", "foo");
      expect(data == undefined).toBe(false);
    });
    const data = await mydb.get("state", "foo");
    console.log("data outside", data);
    // console.log(result.current[2].current);
  });

  // test("After changing state", () => {
  //   const { result } = renderHook(() => useIndexDB("foo", 5));
  //   act(() => {
  //     result.current[1](11);
  //   });
  //   expect(result.current[0]).toEqual(11);
  // });
});

// describe("It should accept objects as initial state", () => {
//   test("simple object", () => {
//     const { result } = renderHook(() => useIndexDB("foo", { baz: true }));
//     expect(result.current[0]).toEqual({ baz: true });
//     const valueFromStorage1 = localStorage.getItem("foo");
//     expect(valueFromStorage1).not.toEqual(null);
//     expect(result.current[0]).toEqual(JSON.parse(valueFromStorage1!));
//     act(() => {
//       result.current[1]({ baz: false });
//     });
//     expect(result.current[0]).toEqual({ baz: false });
//     const valueFromStorage2 = localStorage.getItem("foo");
//     expect(valueFromStorage2).not.toEqual(null);
//     expect(result.current[0]).toEqual(JSON.parse(valueFromStorage2!));
//   });

//   test("complex objects", () => {
//     const { result } = renderHook(() =>
//       useLocalStorage<object>("foo", {
//         foo: {
//           a: [1, 5, { hey: 7 }],
//         },
//       })
//     );
//     expect(result.current[0]).toEqual({
//       foo: {
//         a: [1, 5, { hey: 7 }],
//       },
//     });
//     const valueFromStorage1 = localStorage.getItem("foo");
//     expect(valueFromStorage1).not.toEqual(null);
//     expect(result.current[0]).toEqual(JSON.parse(valueFromStorage1!));
//     act(() => {
//       result.current[1]({
//         foo: {
//           a: [1],
//           b: [7, true, "haha"],
//           c: 4,
//         },
//       });
//     });
//     expect(result.current[0]).toEqual({
//       foo: {
//         a: [1],
//         b: [7, true, "haha"],
//         c: 4,
//       },
//     });
//     const valueFromStorage2 = localStorage.getItem("foo");
//     expect(valueFromStorage2).not.toEqual(null);
//     expect(result.current[0]).toEqual(JSON.parse(valueFromStorage2!));
//   });
// });
