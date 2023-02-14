// jest.useFakeTimers();
jest.setTimeout(10000);
import FakeTimers from "@sinonjs/fake-timers";
import { queryRetry } from "../../dist/002";

import fetchMock from "jest-fetch-mock";

const clock = FakeTimers.install();
jest.spyOn(global, "setTimeout");

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("timers", () => {
  test("with useIncrement", async () => {
    const urlQuery = (url) => jest.fn(() => fetch(url));
    const query = urlQuery("https://example.com");
    fetchMock.mockResponses(
      [JSON.stringify("failed"), { status: 500 }],
      [JSON.stringify("failed"), { status: 503 }],
      [JSON.stringify("failed"), { status: 404 }],
      [JSON.stringify("ok"), { status: 200 }]
    );
    const delay = 300;
    expect(query).not.toBeCalled();
    queryRetry(query, 3, delay, true);
    expect(query).toBeCalledTimes(1);
    await clock.tickAsync(delay);
    expect(query).toBeCalledTimes(2);
    await clock.tickAsync(2 * delay);
    expect(query).toBeCalledTimes(3);
    await clock.tickAsync(delay);
    expect(query).toBeCalledTimes(3);
    await clock.tickAsync(4 * delay);
    expect(query).toBeCalledTimes(4);
  });

  test.skip("without useIncrement", async () => {
    const urlQuery = (url) => jest.fn(() => fetch(url));
    const query = urlQuery("https://example.com");
    fetchMock.mockResponses(
      [JSON.stringify("failed"), { status: 500 }],
      [JSON.stringify("failed"), { status: 503 }],
      [JSON.stringify("failed"), { status: 404 }],
      [JSON.stringify("ok"), { status: 200 }]
    );
    queryRetry(query, 2, 300, true);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(query).toHaveBeenCalledTimes(1);
  });
});
