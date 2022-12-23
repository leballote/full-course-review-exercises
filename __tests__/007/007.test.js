import { longestRunOfTwoNumbers } from "../../src/007";
test("Example 1", () => {
  expect(longestRunOfTwoNumbers("1212223311212223")).toEqual("1121222");
});

test("Example 2", () => {
  expect(longestRunOfTwoNumbers("111")).toEqual("111");
});
