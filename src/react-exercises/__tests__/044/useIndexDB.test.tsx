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
// import setGlobalVars from "indexeddbshim/src/node-UnicodeIdentifiers";
// setGlobalVars(); // See signature below
import "fake-indexeddb/auto";
import { render, waitFor } from "@testing-library/react";
import useIndexDB from "../../src/044/hooks/useIndexDB";
import { renderHook, act } from "@testing-library/react";
import * as idb from "idb";

describe("State is sychronized with useIndexDB", () => {
  test("At initialization", async () => {
    const mydb = await idb.openDB("useIndexDB", 1, {
      upgrade(db) {
        db.createObjectStore("state");
      },
    });
    const { result } = renderHook(() => useIndexDB("foo", 6));
    expect(result.current[0]).toEqual(6);
    // const mydb = await idb.openDB("useIndexDB");
    await waitFor(() => {
      expect(result.current[2]).toBe(true);
    });
    const valueFromDB = await mydb.get("state", "foo");
    expect(valueFromDB).toEqual(6);
  });

  test("After changing state", async () => {
    const mydb = await idb.openDB("useIndexDB2", 1, {
      upgrade(db) {
        db.createObjectStore("state");
      },
    });
    const { result } = renderHook(() =>
      useIndexDB("foo", 6, {
        dbName: "useIndexDB2",
      })
    );

    act(() => {
      result.current[1](11);
    });
    await waitFor(async () => {
      const valueFromDB = await mydb.get("state", "foo");
      expect(valueFromDB).toEqual(11);
    });
    expect(result.current[0]).toEqual(11);
  });
});

describe("It should accept objects as initial state", () => {
  test("simple object", async () => {
    const mydb = await idb.openDB("useIndexDB3", 1, {
      upgrade(db) {
        db.createObjectStore("state");
      },
    });
    const { result } = renderHook(() =>
      useIndexDB("foo", { baz: true }, { dbName: "useIndexDB3" })
    );
    expect(result.current[0]).toEqual({ baz: true });
    await waitFor(async () => {
      const valueFromDB = await mydb.get("state", "foo");
      expect(valueFromDB).toEqual({ baz: true });
    });
    act(() => {
      result.current[1]({ baz: false });
    });
    expect(result.current[0]).toEqual({ baz: false });

    await waitFor(async () => {
      const valueFromDB = await mydb.get("state", "foo");
      expect(valueFromDB).toEqual({ baz: false });
    });
  });

  test("complex objects", async () => {
    const mydb = await idb.openDB("useIndexDB4", 1, {
      upgrade(db) {
        db.createObjectStore("state");
      },
    });
    const { result } = renderHook(() =>
      useIndexDB(
        "foo",
        {
          foo: {
            a: [1, 5, { hey: 7 }],
          },
        },
        { dbName: "useIndexDB4" }
      )
    );
    expect(result.current[0]).toEqual({
      foo: {
        a: [1, 5, { hey: 7 }],
      },
    });
    await waitFor(async () => {
      const valueFromDB = await mydb.get("state", "foo");
      expect(valueFromDB).toEqual({
        foo: {
          a: [1, 5, { hey: 7 }],
        },
      });
    });
    act(() => {
      result.current[1]({
        foo: {
          a: [1],
          b: [7, true, "haha"],
          c: 4,
        },
      } as any);
    });
    expect(result.current[0]).toEqual({
      foo: {
        a: [1],
        b: [7, true, "haha"],
        c: 4,
      },
    });

    await waitFor(async () => {
      const valueFromDB = await mydb.get("state", "foo");
      expect(valueFromDB).toEqual({
        foo: {
          a: [1],
          b: [7, true, "haha"],
          c: 4,
        },
      });
    });
  });
});

test("It should fetch the data from the database as initial value", async () => {
  const mydb = await idb.openDB("useIndexDB5", 1, {
    upgrade(db) {
      db.createObjectStore("state");
    },
  });
  renderHook(() => useIndexDB("foo", "hi", { dbName: "useIndexDB5" }));

  await waitFor(async () => {
    const valueFromDB = await mydb.get("state", "foo");
    expect(valueFromDB).toEqual("hi");
  });

  const { result: result2 } = renderHook(() =>
    useIndexDB("foo", "bye", { dbName: "useIndexDB5" })
  );

  await waitFor(async () => {
    expect(result2.current[0]).toEqual("hi");
  });
});
