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

  test("Testing pupeteer", async () => {
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test("should match the reference image", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:8080", { waitUntil: "networkidle0" });
    const elementHandle = await page.$("#serpinski-triangle-container");
    const screenshot = await elementHandle.screenshot("hola");
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: "hola",
      noColors: true,
    });
  });
});
