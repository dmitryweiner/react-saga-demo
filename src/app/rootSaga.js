import {fetchData} from "../features/apiFetcher/fetcherSlice";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    fetchData(),
  ])
}
