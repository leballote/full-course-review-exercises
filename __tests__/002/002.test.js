import { queryRetry, MaxRetryExceededError } from "../../dist/002";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Number of tries related", () => {
  test.skip("Successful on the first try should work as fetch", async () => {
    const returnValue = {
      data: {
        message: "hi",
      },
    };
    fetchMock.mockResponse(JSON.stringify(returnValue));

    const urlQuery = (url) => jest.fn(() => fetch(url));
    const query = urlQuery("https://example.com");
    const res = await queryRetry(query);
    expect(res.ok).toBe(true);
    const json = await res.json();
    expect(json).toStrictEqual(returnValue);
    expect(query).toBeCalledTimes(1);
  });

  test("It should resolve if the fetch reesponse is ok in less than the number of retries", async () => {
    const returnValue = {
      data: {
        message: "hi",
      },
    };
    fetchMock.mockResponses(
      ["failed", { status: 500 }],
      ["failed", { status: 503 }],
      [JSON.stringify(returnValue), { status: 200 }]
    );

    const urlQuery = (url) => jest.fn(() => fetch(url));
    const query = urlQuery("https://example.com");
    const res = await queryRetry(query, 2);

    expect(res.ok).toBe(true);
    const json = await res.json();
    expect(json).toStrictEqual(returnValue);
    expect(query).toBeCalledTimes(3);
  });

  test("It should fail if the fetch response is not ok within the number of retries", async () => {
    const returnValue = {
      data: {
        message: "hi",
      },
    };
    fetchMock.mockResponses(
      [JSON.stringify("failed"), { status: 503 }],
      [JSON.stringify("failed"), { status: 500 }],
      [JSON.stringify("failed"), { status: 404 }],
      [JSON.stringify(returnValue), { status: 200 }]
    );

    const urlQuery = (url) => jest.fn(() => fetch(url));
    const query = urlQuery("https://example.com");
    let error = null;
    try {
      await queryRetry(query, 2);
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(MaxRetryExceededError);

    //TODO: check why this didn't throw
    // const t = async () => {
    //   await queryRetry(query, 2);
    // };

    // expect(t).toThrow(Error);
    expect(query).toBeCalledTimes(3);
  });
});
