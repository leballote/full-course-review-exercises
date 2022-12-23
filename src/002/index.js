//TODO: test it
const urlQuery = (url) => () => fetch(url);

const maxRetry = 3;
const useIncrement = true;
const delay = 1000;

/**
 * perform query successfully once or try up to a maximum of maxRetry times
 * if unsuccessful, delay the next attempt for an amount of time. If attempts
 * continue to fail then increase the delay between attempts if useIncrements
 * is set to true.
 */
queryRetry(urlQuery("some/url"), maxRetry, delay, useIncrement)
  .then(handleSuccess)
  .catch(handleErrorOrMaxRetryExceeded);

// function queryRetry(query, maxRetry = 0, delay = 10000, useIncrement = false) {
//   let res;
//   let tryNo = 0;
//   while (tryNo <= maxRetry) {
//     query();
//   }
//   return res;
// }

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function queryRetry(
  query,
  maxRetry = 0,
  delay = 10000,
  useIncrement = false
) {
  let res;
  let tryNo = 0;

  while (tryNo < maxRetry) {
    try {
      res = await query();
      return res;
    } catch (e) {
      await sleep(delay);
      if (useIncrement) {
        delay = delay * delay;
      }
    }
  }
  throw new Error("Max retry exeeded");
}

function handleSuccess(data) {
  console.log(data);
}

function handleErrorOrMaxRetryExceeded(data) {
  console.log(data);
}
