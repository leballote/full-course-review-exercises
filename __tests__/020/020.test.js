import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

it("should demonstrate this matcher`s usage", () => {
  expect().toMatchImageSnapshot();
});
