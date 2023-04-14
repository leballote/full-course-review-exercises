import { useEffect, useRef, useState } from "react";
import { LinearPlot } from "./LinearPlot";
import {
  eventChannel,
  END,
  runSaga,
  stdChannel,
  EventChannel,
} from "redux-saga";
import { take, call, cancel, takeEvery, put } from "redux-saga/effects";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { store } from "../app/store";
import { useDispatch } from "react-redux";
import { createGraph, deleteGraph, updateGraph } from "../app/041/graphsSlice";
import { graphChannels } from "./graphsGlobals";

type Point = [number, number];

type Props = {
  plotId: string;
  initialValues?: Point[];
};

export function LinearPlotFromSource({ plotId, initialValues = [] }: Props) {
  const dispatch = useAppDispatch();
  const values =
    useAppSelector((state) => state.graphs[plotId]?.values) ?? initialValues;
  console.log("vals", values);

  useEffect(() => {
    dispatch(createGraph({ id: plotId, initialValues }));
  }, []);

  return <LinearPlot values={values} />;
}
