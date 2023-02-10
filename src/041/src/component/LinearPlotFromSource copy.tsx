import { NotUndefined } from "@redux-saga/types";
import { useEffect, useMemo, useState } from "react";
import {
  eventChannel,
  END,
  runSaga,
  stdChannel,
  EventChannel,
} from "redux-saga";
import { call, take, put, cancel, select } from "redux-saga/effects";

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

function sourceFn(
  emitter: (input: NotUndefined | END) => void,
  END: END,
  getNewValues: (prevValues: Point[]) => Point[]
) {
  let secs = 10000;
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
}

function* newSaga() {
  //@ts-expect-error
  const chan = yield call(sourceFn, 10);
  while (true) {
    // take(END) will cause the saga to terminate by jumping to the finally block
    // let newValues = yield take(chan);
    // const values = yield select();
    //@ts-expect-error
    yield put((values) => [...values, seconds] as any);
  }
}

type Point = [number, number];
type Props = {
  initialPoints: Point[];
  source: Source;
};

interface Source {
  values: Point[];
  subscribe: (...args: any[]) => {};
  unsubscribe: (...args: any[]) => {};
}

export function LinearPlotFromSource({ initialPoints = [], source }: Props) {
  const [values, setValues] = useState<number[][]>(initialPoints);
  const channel = useMemo(() => stdChannel(), []);

  function* saga() {
    //@ts-expect-error
    const chan = yield call(countdown, 10);
    while (true) {
      console.log("iteration");
      // take(END) will cause the saga to terminate by jumping to the finally block
      // @ts-expect-error
      let seconds = yield take(chan);
      // @ts-ignore
      // const values = yield select();
      const newValues = [...values, seconds];
      // @ts-ignore
      yield put(
        // @ts-ignore
        (values) => newValues
        // [...values, seconds]
      );
    }
  }

  useEffect(() => {
    const ru = runSaga(
      {
        channel,
        dispatch(output) {
          setValues(output as any);
        },
        getState() {
          return values;
        },
      },
      saga
    );
    return () => {
      runSaga({}, function* () {
        yield cancel(ru);
        return true;
      });
    };
  }, []);

  return <p>{JSON.stringify(values)}</p>;

  // return <LinearPlot values={values} />;
}
