import {
  setup as setupDevServer,
  teardown as teardownDevServer,
} from "jest-dev-server";
import { HtmlDiffer } from "html-differ";
import "expect-puppeteer";
import puppeteer from "puppeteer";

jest.setTimeout(15000);
describe("Tests with server and page", () => {
  let myBrowser;
  beforeAll(async () => {
    await setupDevServer({
      command: `cd src/019 && npm run dev:headless -- --port=8081`,
      port: 8081,
    });
  });

  afterAll(async () => {
    await teardownDevServer();
    await myBrowser.close();
  });

  beforeEach(async () => {
    const myBrowser = puppeteer.launch({ slowMo: 250 });
    global.browser = myBrowser;
    page = await myBrowser.newPage();
    page.on("console", (message) => {
      console.log("PUPPETEER:", message.text());
    });

    await page.goto("http://localhost:8081", { waitUntil: "networkidle0" });

    await page.addScriptTag({
      url: "https://cdn.jsdelivr.net/npm/lolex@6.0.0/lolex.js",
    });

    await page.evaluate(() => {
      // const myClock = {
      //   tick() {},
      // };
      // const lolex = {
      //   install() {
      //     return myClock;
      //   },
      // };
      window.clock = lolex.install();
      // window.clock = myClock;
      console.log("clock install", clock);
      setTimeout(() => {
        console.log("Hello, world!");
      }, 600);
      clock.tick(600);
    });
  });

  test("should match the reference image", async () => {
    const initialResults = await page.evaluate(() => {
      const el = document.getElementById("results");
      return el.outerHTML;
    });
    const resultsHandles = await page.$("#results");

    console.log("initialResults", initialResults);
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

    const finished = ` <ul results="id">
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

    await page.waitForTimeout(500);

    const resultsOuterHTML1 = await page.evaluate((el) => {
      // window.clock.tick(20000);
      return el.outerHTML;
    }, resultsHandles);

    await page.waitForTimeout(1000);

    const resultsOuterHTML2 = await page.evaluate((el) => {
      // window.clock.tick(20000);
      return el.outerHTML;
    }, resultsHandles);

    const htmlDiffer = new HtmlDiffer({ preset: "bem", ignoreAttributes: [] });
    // console.log("beforeB\n", beforeB);
    console.log("initial results\n", initialResults);
    console.log("resultsOuterHTML1\n", resultsOuterHTML1);
    console.log("resultsOuterHTML2\n", resultsOuterHTML2);
    // console.log("diff\n", htmlDiffer.diffHtml(beforeB, resultsOuterHTML1));

    // expect(htmlDiffer.isEqual(finished, resultsOuterHTML1)).toEqual(true);
  });
});
