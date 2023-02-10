import { LinearPlotFromSource } from "./LinearPlotFromSource";
import { NotUndefined } from "@redux-saga/types";
import { END } from "redux-saga";

type Point = [number, number];

function sourceFn(
  emitter: (input: NotUndefined | END) => void,
  END: END,
  prevValues: Point[]
) {
  let secs = 1000;
  const iv = setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      emitter([...prevValues, [secs, secs]]);
    } else {
      // this causes the channel to close
      emitter(END);
    }
  }, 1000);
  // The subscriber must return an unsubscribe function
  return () => {
    clearInterval(iv);
  };
}

export function LinearPlotFromSourceExample2() {
  return (
    <LinearPlotFromSource
      source={{
        sourceFn,
      }}
    />
  );
}
