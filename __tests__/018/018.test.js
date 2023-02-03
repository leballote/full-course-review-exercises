import { set } from "../../dist/018";

describe("Can insert", () => {
  test("In empty object", () => {
    const obj = {};
    const ans = {
      path: {
        to: {
          deeply: {
            nested: {
              property: 42,
            },
          },
        },
      },
    };
    const toEval = set(obj, "path.to.deeply.nested.property", 42);
    expect(toEval).toEqual(ans);
    expect(toEval).toBe(obj);
  });

  test("Properties already assigned in the way", () => {
    const obj = {
      foo: 1,
      path: {
        to: {
          bar: 2,
        },
      },
    };
    const ans = {
      foo: 1,
      path: {
        to: {
          bar: 2,
          deeply: {
            nested: {
              property: 23,
            },
          },
        },
      },
    };
    const toEval = set(obj, "path.to.deeply.nested.property", 23);
    expect(toEval).toEqual(ans);
    expect(toEval).toBe(obj);
  });
  test("Should overwrite if already set", () => {
    const obj = {
      foo: 1,
      path: {
        to: {
          bar: 2,
          deeply: {
            nested: {
              property: 5,
            },
          },
        },
      },
    };
    const ans = {
      foo: 1,
      path: {
        to: {
          bar: 2,
          deeply: {
            nested: {
              property: 42,
            },
          },
        },
      },
    };
    const toEval = set(obj, "path.to.deeply.nested.property", 42);
    expect(toEval).toEqual(ans);
    expect(toEval).toBe(obj);
  });

  test("if setting an object, shouldn't set a copy", () => {
    const obj = {
      a: 7,
    };
    const prop = {
      foo: 1,
      bar: 2,
    };
    const ans = {
      a: {
        b: {
          c: prop,
        },
      },
    };
    const toEval = set(obj, "a.b.c", prop);
    expect(toEval).toEqual(ans);
    expect(toEval).toBe(obj);
    expect(toEval.a.b.c).toBe(prop);
  });
});

describe("Can't insert", () => {
  test("null Object", () => {
    const thunk = () => set(null, "path.to.deeply.nested.property");
    expect(thunk).toThrow(Error);
  });
});
