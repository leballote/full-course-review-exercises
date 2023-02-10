import { NotUndefined } from "@redux-saga/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { eventChannel, END, runSaga, stdChannel } from "redux-saga";
import { call, take, put, cancel, select } from "redux-saga/effects";

type Point = [number, number];
type Props = {
  initialPoints?: Point[];
  source: Source;
};

interface Source {
  sourceFn: (
    emitter: (input: NotUndefined | END) => void,
    END: END,
    prevValues: Point[]
  ) => () => void;
}

export function LinearPlotFromSource({ initialPoints = [], source }: Props) {
  const valuesRef = useRef<Point[]>(initialPoints);
  const [values, setValues] = useState<Point[]>(initialPoints);
  const channel = useMemo(() => stdChannel(), []);

  function* saga() {
    //@ts-expect-error
    const chan = yield call(countdown, 6);
    while (true) {
      console.log("iteration");
      // take(END) will cause the saga to terminate by jumping to the finally block
      // @ts-expect-error
      let seconds = yield take(chan);
      // @ts-ignore
      const values = yield select();
      const newValues = [...values, [seconds, seconds]];
      // @ts-ignore
      yield put(newValues as any);
    }
  }

  useEffect(() => {
    const ru = runSaga(
      {
        channel,
        dispatch(output) {
          // @ts-ignore
          valuesRef.current = (output as any) ?? [];
          setValues((output as any) ?? []);
        },
        getState() {
          return valuesRef.current;
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

  return (
    <>
      <h1>hola</h1>
      <p>{JSON.stringify(values)}</p>
    </>
  );
}
