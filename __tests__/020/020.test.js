import { toMatchImageSnapshot } from "jest-image-snapshot";
import {
  setup as setupDevServer,
  teardown as teardownDevServer,
} from "jest-dev-server";

expect.extend({ toMatchImageSnapshot });

describe("Tests with server and page", () => {
  let page;
  beforeAll(async () => {
    await setupDevServer({
      command: `cd src/020 && npm run dev:headless`,
      port: 8080,
    });
  });

  afterAll(async () => {
    await teardownDevServer();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:8080", { waitUntil: "networkidle0" });
  });

  describe("Should match the reference image for different input values", () => {
    // test("n = 1", async () => {
    //   const page = await browser.newPage();
    //   await page.goto("http://localhost:8080", { waitUntil: "networkidle0" });
    //   const elementHandle = await page.$("#serpinski-triangle-container");
    //   const screenshot = await elementHandle.screenshot("serpinski-1");
    //   expect(screenshot).toMatchImageSnapshot({
    //     customSnapshotIdentifier: "serpinski-1",
    //     noColors: true,
    //   });
    // });

    test("n = 2", async () => {
      const page = await browser.newPage();
      page.on("console", (message) =>
        console.log(
          `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
        )
      );
      await page.goto("http://localhost:8080", { waitUntil: "networkidle0" });
      const elementHandle = await page.$("#serpinski-triangle-container");

      await page.evaluate(() => {
        const input = document.getElementById("serpinski-input-n-number");
        const serpinskiContainer = document.getElementById(
          "serpinski-triangle-container"
        );
        input.value = 3;
        const event = new Event("change");
        console.log("value", input.value);
        input.dispatchEvent(event);
        console.log("serpinskiContainer", serpinskiContainer.innerHTML);
      });
      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        const serpinskiContainer = document.getElementById(
          "serpinski-triangle-container"
        );
        console.log(serpinskiContainer.innerHTML);
      });

      const screenshot = await elementHandle.screenshot("");
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: "serpinski-3",
        noColors: true,
      });
    });

    // test("n = 3", async () => {
    //   const page = await browser.newPage();
    //   await page.goto("http://localhost:8080", { waitUntil: "networkidle0" });
    //   const elementHandle = await page.$("#serpinski-triangle-container");
    //   const screenshot = await elementHandle.screenshot("");
    //   expect(screenshot).toMatchImageSnapshot({
    //     customSnapshotIdentifier: "hola",
    //     noColors: true,
    //   });
    // });
  });
});
