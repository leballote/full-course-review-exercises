import { flatten } from "../../dist/008";
describe("For not pure objects it should return them", () => {
  test("null", () => {
    expect(flatten(null)).toEqual(null);
  });

  test("Primitives, e.g. number", () => {
    expect(flatten(3)).toEqual(3);
  });

  test("Primitives, e.g. string", () => {
    expect(flatten("hello")).toEqual("hello");
  });
});

test("Empty objects should flatten to empty", () => {
  const emtpyObj = {};
  expect(flatten(emtpyObj)).toEqual({});
});

describe("Generic examples", () => {
  test("Example 1", () => {
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
    expect(flatten(oldObj, "oldObj")).toStrictEqual({
      oldObj_name: "Sara",
      oldObj_gender: "Apache Attack Helicopter",
      oldObj_address_location_city: "SF",
      oldObj_address_location_state: "CA",
      oldObj_address_preferredLocation_city: "SF",
      oldObj_address_preferredLocation_state: ["CA", "MN"],
      oldObj_address_other: undefined,
    });
  });
});

test("should throw on ambiguous assignation", () => {
  const thunk = () => {
    flatten(
      {
        first_name: "Luis",
        first: {
          name: "Something else",
        },
      },
      "root"
    );
  };
  expect(thunk).toThrow(Error);
});

test("should throw on ambiguous assignation 2", () => {
  const thunk = () => {
    flatten(
      {
        first_name: "Luis",
        first: {
          name: "Something else",
        },
      },
      "root"
    );
  };
  expect(thunk).toThrow(Error);
});
