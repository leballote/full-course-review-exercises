import { isSymmetric } from "../../dist/012";

const symmetricTree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: {
        value: 5,
        left: null,
        right: null,
      },
      right: null,
    },
  },
  right: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: {
        value: 5,
        left: null,
        right: null,
      },
    },
    right: {
      value: 3,
      left: null,
      right: null,
    },
  },
};

//let's take the following representation

const asymmetricTree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: {
        value: 5,
        left: null,
        right: null,
      },
      right: null,
    },
  },
  right: {
    value: 2,
    left: {
      value: 5,
      left: null,
      right: {
        value: 5,
        left: null,
        right: null,
      },
    },
    right: {
      value: 3,
      left: null,
      right: null,
    },
  },
};

describe("Symmetric trees", () => {
  test("null tree", () => {
    expect(isSymmetric(null)).toStrictEqual(true);
  });
  test("One not null node", () => {
    expect(
      isSymmetric({
        value: 1,
        left: null,
        right: null,
      })
    ).toEqual(true);
  });
  test("Generic tree", () => {
    expect(isSymmetric(symmetricTree)).toEqual(true);
  });
});

describe("Asymmetric trees", () => {
  test("small tree", () => {
    expect(
      isSymmetric({
        value: 3,
        left: {
          value: 7,
          left: null,
          right: null,
        },
        right: null,
      })
    ).toEqual(false);
  });
  test("Generic tree", () => {
    expect(isSymmetric(asymmetricTree)).toEqual(false);
  });

  test("Different types", () => {
    expect(
      isSymmetric({
        value: 10,
        left: {
          value: "5",
          left: null,
          right: null,
        },
        right: {
          value: 5,
          left: null,
          right: null,
        },
      })
    ).toEqual(false);
  });
});
