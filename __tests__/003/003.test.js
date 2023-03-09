import { cancellableFetch } from "../../dist/003";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("it should fetch normally if not cancelled", async () => {
  fetchMock.doMock();
  fetchMock.mockResponse(JSON.stringify({ foo: "bar" }));
  const result = await cancellableFetch("http://example.com");
  const resultJson = await result.json();
  expect(resultJson).toEqual({ foo: "bar" });
});

test("It should throw AbortError if the fetch is cancelled", async () => {
  //for some reason the mock is not working, maybe is because it resolves instantly(?), anyway the mock is not really needed for this test
  fetchMock.dontMock();

  const t = async () => {
    const result = cancellableFetch("http://example.com");

    const someCondition = true;

    if (someCondition) {
      result.cancel();
    }

    await result;
  };
  await expect(t()).rejects.toThrow(Error);
  await expect(t()).rejects.toHaveProperty("name", "AbortError");
});
