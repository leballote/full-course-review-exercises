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
import { render } from "@testing-library/react";
import useSessionStorage from "../../src/044/hooks/useSessionStorage";
import { renderHook, act } from "@testing-library/react";

beforeEach(() => {
  sessionStorage.clear();
});

describe("State is sychronized with local storage", () => {
  test("At initialization", () => {
    const { result } = renderHook(() => useSessionStorage("foo", 5));
    expect(result.current[0]).toEqual(5);
    const valueFromStorage = sessionStorage.getItem("foo");
    expect(valueFromStorage).not.toEqual(null);
    expect(result.current[0]).toEqual(JSON.parse(valueFromStorage!));
  });

  test("After changing state", () => {
    const { result } = renderHook(() => useSessionStorage("foo", 5));
    act(() => {
      result.current[1](11);
    });
    expect(result.current[0]).toEqual(11);
    const valueFromStorage = sessionStorage.getItem("foo");
    expect(valueFromStorage).not.toEqual(null);
    expect(result.current[0]).toEqual(JSON.parse(valueFromStorage!));
  });
});

describe("It should accept objects as initial state", () => {
  test("basic object", () => {
    const { result } = renderHook(() =>
      useSessionStorage("foo", { baz: true })
    );
    expect(result.current[0]).toEqual({ baz: true });
    const valueFromStorage1 = sessionStorage.getItem("foo");
    expect(valueFromStorage1).not.toEqual(null);
    expect(result.current[0]).toEqual(JSON.parse(valueFromStorage1!));
    act(() => {
      result.current[1]({ baz: false });
    });
    expect(result.current[0]).toEqual({ baz: false });
    const valueFromStorage2 = sessionStorage.getItem("foo");
    expect(valueFromStorage2).not.toEqual(null);
    expect(result.current[0]).toEqual(JSON.parse(valueFromStorage2!));
  });

  test("complex objects", () => {
    const { result } = renderHook(() =>
      useSessionStorage<object>("foo", {
        foo: {
          a: [1, 5, { hey: 7 }],
        },
      })
    );
    expect(result.current[0]).toEqual({
      foo: {
        a: [1, 5, { hey: 7 }],
      },
    });
    const valueFromStorage1 = sessionStorage.getItem("foo");
    expect(valueFromStorage1).not.toEqual(null);
    expect(result.current[0]).toEqual(JSON.parse(valueFromStorage1!));
    act(() => {
      result.current[1]({
        foo: {
          a: [1],
          b: [7, true, "haha"],
          c: 4,
        },
      });
    });
    expect(result.current[0]).toEqual({
      foo: {
        a: [1],
        b: [7, true, "haha"],
        c: 4,
      },
    });
    const valueFromStorage2 = sessionStorage.getItem("foo");
    expect(valueFromStorage2).not.toEqual(null);
    expect(result.current[0]).toEqual(JSON.parse(valueFromStorage2!));
  });
});
