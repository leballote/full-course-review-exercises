import { createBar } from "../../src/023/app.mjs";
import { execSync } from "child_process";

describe("Tests for the loading bar", () => {
  // test('', () => {
  //   createBar()
  // });

  test("It should display a progressing loading bar", () => {
    const output = execSync("cd src/023 && ./index.js 10", {
      encoding: "utf-8",
      stdio: "pipe",
    });
    console.log("output: ", output);
  });
});
