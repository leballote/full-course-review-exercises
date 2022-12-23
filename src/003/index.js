function cancellableFetch(url) {
  let controller = new AbortController();
  const promise = fetch(url, {
    signal: controller.signal,
  });
  promise.cancel = function () {
    controller.abort();
  };
  return promise;
}

const result = cancellableFetch(
  "https://63a117dee3113e5a5c4d120d.mockapi.io/api/v1/person/1"
);

result
  .then((data) => data.json())
  .then(console.log)
  .catch((err) => {
    if (err.name == "AbortError") {
      console.error("Aborted!");
    }
  });

const someCondition = true;

if (someCondition) {
  result.cancel();
}
