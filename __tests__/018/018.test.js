import { NotAssignableError, set } from "../../dist/018";

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

  test("It should not create new objects in the path if they are already there", () => {
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
  test("Should overwrite value at the end", () => {
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
      a: 7,
      x: {
        y: {
          z: prop,
        },
      },
    };
    const toEval = set(obj, "x.y.z", prop);
    expect(toEval).toEqual(ans);
    expect(toEval).toBe(obj);
    expect(toEval.x.y.z).toBe(prop);
  });

  test("Can insert in functions", () => {
    const obj = {
      a: () => {},
    };
    set(obj, "a.b.c", 10);
    expect(obj.a.b.c).toEqual(10);
  });
});

describe("Can't insert", () => {
  test("null Object", () => {
    const thunk = () => set(null, "path.to.deeply.nested.property");
    expect(thunk).toThrow(Error);
  });

  test("It shouldn't overwrite values along the path", () => {
    const obj = {
      a: 7,
    };
    expect(() => set(obj, "a.b.c", 9)).toThrow(NotAssignableError);
  });
});
