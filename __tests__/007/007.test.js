import { longestRunOfTwoNumbers } from "../../dist/007";
test("Generic case", () => {
  expect(longestRunOfTwoNumbers("1212223311212223")).toEqual("1121222");
});

test("Empty string", () => {
  expect(longestRunOfTwoNumbers("")).toEqual("");
});

test("1 lengths string", () => {
  expect(longestRunOfTwoNumbers("a")).toEqual("a");
});

test("All the same string", () => {
  expect(longestRunOfTwoNumbers("222222222")).toEqual("222222222");
});

test("Two distinct characters string", () => {
  expect(longestRunOfTwoNumbers("888885555588888885558855")).toEqual(
    "888885555588888885558855"
  );
});

test("Changing multiple times the longest string", () => {
  expect(longestRunOfTwoNumbers("12324426655621")).toEqual("66556");
});

test("Answer at the end of the string", () => {
  expect(longestRunOfTwoNumbers("123244266556")).toEqual("66556");
});
