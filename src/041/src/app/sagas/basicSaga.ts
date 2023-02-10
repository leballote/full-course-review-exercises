import { take, put, call } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

// creates an event Channel from an interval of seconds
function countdown(secs: number) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        // this causes the channel to close
        emitter(END);
      }
    }, 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

const value = 1000;
export function* saga() {
  //@ts-expect-error
  const chan = yield call(countdown, value);
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      // @ts-expect-error
      let seconds = yield take(chan);
      console.log(`countdown: ${seconds}`);
    }
  } finally {
    console.log("countdown terminated");
  }
}
