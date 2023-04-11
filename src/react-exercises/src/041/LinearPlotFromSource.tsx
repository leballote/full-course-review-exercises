import { useEffect, useRef, useState } from "react";
import { LinearPlot } from "./LinearPlot";
import { eventChannel, END, runSaga, stdChannel } from "redux-saga";
import { take, call, cancel, takeEvery } from "redux-saga/effects";
type Point = [number, number];

type Props = {
  intialValues?: Point[];
  source: {
    sourceFn: any;
  };
};

export function LinearPlotFromSource({ intialValues = [], source }: Props) {
  const [valuesRef, setValues] = useRefState<Point[]>(intialValues);
  const values = valuesRef.current ?? [];

  function eventCh() {
    function getValues() {
      return valuesRef.current;
    }
    const inputEventChFn = (emitter: any) => {
      return source.sourceFn(emitter, END, getValues);
    };
    return eventChannel(inputEventChFn as any);
  }

  function* saga() {
    // @ts-ignore
    const chan = yield call(eventCh);
    while (true) {
      //@ts-ignore
      const newValues = yield take(chan);
      setValues(newValues.slice(0, 100));
    }
    //utilidad
  }

  useEffect(() => {
    const ru = runSaga({}, saga);
    return () => {
      runSaga({}, function* clearSaga() {
        yield cancel(ru);
      });
    };
  }, []);

  return <LinearPlot values={values} />;
}

function useRefState<T>(
  initialValue: T
): [React.MutableRefObject<T>, (val: T) => void] {
  const [, setX] = useState<T>(initialValue);
  const y = useRef<T>(initialValue);
  function setXY(val: T) {
    setX(val);
    y.current = val;
  }
  return [y, setXY];
}
