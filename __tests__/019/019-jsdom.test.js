import { JSDOM } from "jsdom";
import FakeTimers from "@sinonjs/fake-timers";
import { HtmlDiffer } from "html-differ";

const clock = FakeTimers.install();

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example 19</title>
  </head>
  <body>
    <ul id="results"></ul>
  </body>
</html>`;

//I couldn't run the scripts inside the test block because apparently it doesn't work for type module
const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
});
global.window = dom.window;
global.document = dom.window.document;
test("Delayed 'tests' should be rendered within the block they are called", async () => {
  const beforeB = ` <ul id="results">
      <li style="color: green;">Outside and before the test block</li>
      <li>
        TestBlock A
        <ul>
          <li style="color: green;">Inside TestBlock A</li>
        </ul>
      </li>
      <li style="color: green;">Outside and after the TestBlock A</li>
      <li>
        TestBlock B
        <ul>
          <li style="color: green;">Inside TestBlock B</li>
        </ul>
      </li>
      <li style="color: green;">Outside and after TestBlock B</li>
    </ul>`;

  const beforeA = ` <ul id="results">
      <li style="color: green;">Outside and before the test block</li>
      <li>
        TestBlock A
        <ul>
          <li style="color: green;">Inside TestBlock A</li>
        </ul>
      </li>
      <li style="color: green;">Outside and after the TestBlock A</li>
      <li>
        TestBlock B
        <ul>
          <li style="color: green;">Inside TestBlock B</li>
          <li style="color: green;">test delayed B</li>
        </ul>
      </li>
      <li style="color: green;">Outside and after TestBlock B</li>
    </ul>`;

  const finished = ` <ul id="results">
      <li style="color: green;">Outside and before the test block</li>
      <li>
        TestBlock A
        <ul>
          <li style="color: green;">Inside TestBlock A</li>
          <li style="color: green;">test delayed A</li>
        </ul>
      </li>
      <li style="color: green;">Outside and after the TestBlock A</li>
      <li>
        TestBlock B
        <ul>
          <li style="color: green;">Inside TestBlock B</li>
          <li style="color: green;">test delayed B</li>
        </ul>
      </li>
      <li style="color: green;">Outside and after TestBlock B</li>
    </ul>`;

  const htmlDiffer = new HtmlDiffer({ preset: "bem", ignoreAttributes: [] });
  await import("../../src/019/nb-test.js");
  global.assert = window.assert;
  global.test = window.test;
  modifyDOM();
  let ul = document.querySelector("#results");
  expect(htmlDiffer.isEqual(ul.outerHTML, beforeB)).toBe(true);
  await clock.tickAsync(500);
  expect(htmlDiffer.isEqual(ul.outerHTML, beforeA)).toBe(true);
  await clock.tickAsync(500);
  expect(htmlDiffer.isEqual(ul.outerHTML, finished)).toBe(true);
});

function modifyDOM() {
  assert(true, "Outside and before the test block");

  test("TestBlock A", function () {
    assert(true, "Inside TestBlock A");
    setTimeout(() => assert(true, "test delayed A"), 1000);
  });
  assert(true, "Outside and after the TestBlock A");
  test("TestBlock B", function () {
    assert(true, "Inside TestBlock B");
    setTimeout(assert, 500, true, "test delayed B");
  });
  assert(true, "Outside and after TestBlock B");
}
