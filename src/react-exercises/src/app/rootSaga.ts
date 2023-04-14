import { all } from "redux-saga/effects";
import watchPlotSagas from "../041/plotsSagas";

export default function* rootSaga() {
  yield all([watchPlotSagas()]);
}
