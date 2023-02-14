export function cancellableFetch(url) {
  let controller = new AbortController();
  const promise = fetch(url, {
    signal: controller.signal,
  });
  promise.cancel = function () {
    controller.abort();
  };
  return promise;
}
