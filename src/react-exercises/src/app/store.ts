import { configureStore } from "@reduxjs/toolkit";
import graphsReducer from "./041/graphsSlice";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddelware = createSagaMiddleware();
const middleware = [sagaMiddelware];

export const store = configureStore({
  reducer: {
    graphs: graphsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

sagaMiddelware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
