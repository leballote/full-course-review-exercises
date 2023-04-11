/**
 * perform query successfully once or try up to a maximum of maxRetry times
 * if unsuccessful, delay the next attempt for an amount of time. If attempts
 * continue to fail then increase the delay between attempts if useIncrements
 * is set to true.
 */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function queryRetry(
  query,
  maxRetry = 0,
  delay = 1000,
  useIncrement = false,
  sleepFn = sleep
) {
  let res;
  let tryNo = 0;

  while (tryNo < maxRetry + 1) {
    res = await query();
    if (res.ok) {
      return res;
    }
    await sleepFn(delay);
    if (useIncrement) {
      delay += delay;
    }
    tryNo++;
  }
  throw new MaxRetryExceededError(res);
}

export class MaxRetryExceededError extends Error {
  constructor(fetchResponse, ...args) {
    super("Max retry exceeded", ...args);
    this.fetchResponse = fetchResponse;
  }
}
