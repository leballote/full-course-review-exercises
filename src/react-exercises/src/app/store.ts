import { configureStore } from "@reduxjs/toolkit";
import graphsReducer from "./041/graphsSlice";
import galleryReducer from "./042/gallerySlice";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import { galleryApi } from "../042/services/gallery";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const sagaMiddelware = createSagaMiddleware();
const middleware = [sagaMiddelware];

export const store = configureStore({
  reducer: {
    graphs: graphsReducer,
    gallery: galleryReducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(middleware)
      .concat(galleryApi.middleware);
  },
});

sagaMiddelware.run(rootSaga);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
