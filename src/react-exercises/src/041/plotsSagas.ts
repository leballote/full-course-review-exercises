import { call, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { createGraph, updateGraph } from "../app/041/graphsSlice";
import { graphChannels } from "./graphsGlobals";
import { PayloadAction } from "@reduxjs/toolkit";
import { eventChannel } from "redux-saga";
import { END } from "redux-saga";
import { store } from "../app/store";
import type { RootState } from "../app/store";

function source1(emitter: any, END: any, getValues: any) {
  const maxSecs = 12;
  let secs = 0;
  const interval = setInterval(() => {
    if (secs++ >= maxSecs) {
      emitter(END);
    } else {
      emitter([[secs, Math.random()], ...getValues()]);
    }
  }, 100);

  return () => {
    clearInterval(interval);
  };
}

function source2(emitter: any, END: any, getValues: any) {
  const maxSecs = 40;
  let secs = 0;
  const interval = setInterval(() => {
    if (secs++ >= maxSecs) {
      emitter(END);
    } else {
      emitter([[secs, Math.random()], ...getValues()]);
    }
  }, 100);

  return () => {
    clearInterval(interval);
  };
}

function createWork(
  id: string,
  inputFn: (emitter: any, END: any, getValues: any) => void
) {
  function eventCh() {
    function getValues() {
      return store.getState().graphs[id].values;
    }
    const inputEventChFn = (emitter: any) => {
      return inputFn(emitter, END, getValues);
    };
    return eventChannel(inputEventChFn as any);
  }

  return function* out() {
    //@ts-ignore
    const chan = yield call(eventCh);
    while (true) {
      //@ts-ignore
      const newValues = yield take(chan as any);
      yield put(updateGraph({ id, newValues: newValues.slice(0, 100) }));
    }
  };
}

export function* plotsSaga() {
  yield fork(createWork("example1", source1));
  yield fork(createWork("example2", source2));
}

export default function* watchPlotSagas() {
  yield fork(plotsSaga);
}

/*
You can use workers.
On createGraph you define a new worker
and fork it
something like the following:

while (true) {
  yield take("graph/create");
  function* worker() {
    ...
  }
  yield fork(worker, graphChannels[payload.id]);
}


*/
