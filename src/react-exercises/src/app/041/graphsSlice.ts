import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
type GraphsState = {
  [id: string]: {
    values: [number, number][];
  };
};

// Define the initial state using that type
const initialState: GraphsState = {};

export const graphsSlice = createSlice({
  name: "graphs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createGraph(
      state,
      {
        payload,
      }: PayloadAction<{ id: string; initialValues: [number, number][] }>
    ) {
      state[payload.id] = {
        values: payload.initialValues,
      };
    },

    updateGraph(
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        newValues: [number, number][];
      }>
    ) {
      state[payload.id].values = payload.newValues;
    },

    deleteGraph(state, { payload }: PayloadAction<{ id: string }>) {
      delete state[payload.id];
    },
  },
});

export const { createGraph, deleteGraph, updateGraph } = graphsSlice.actions;

createAction("graphs/create", function prepare() {
  return {
    payload: {
      id: nanoid(),
    },
  };
});

export default graphsSlice.reducer;
