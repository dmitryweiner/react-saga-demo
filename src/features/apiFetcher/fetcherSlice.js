import {createSlice} from "@reduxjs/toolkit";
import {call, delay, put, takeEvery} from "redux-saga/effects";

export const FETCH_ACTION = "fetcher/fetch";

function getInitialApiState() {
  return {
    result: null,
    isLoading: false,
    isError: false,
    errorMessage: ""
  };
}

function getErroredApiState(errorMessage) {
  return {
    result: null,
    isLoading: false,
    isError: true,
    errorMessage
  };
}

function getResultApiState(result) {
  return {
    result,
    isLoading: false,
    isError: false,
    errorMessage: ""
  };
}

function getLoadingApiState() {
  return {
    result: null,
    isLoading: true,
    isError: false,
    errorMessage: ""
  };
}

export const fetcherSlice = createSlice({
  name: 'fetcher',
  initialState: {
    apiState: getInitialApiState()
  },
  reducers: {
    loading: state => {
      state.apiState = getLoadingApiState();
    },
    received: (state, action) => {
      state.apiState = getResultApiState(action.payload);
    },
    errored: (state, action) => {
      state.apiState = getErroredApiState(action.payload);
    }
  },
});

export const {loading, received, errored} = fetcherSlice.actions;

export function* fetchData() {
  // обрабатываем каждый экшн fetch/action
  yield takeEvery(FETCH_ACTION, fetchingSaga);
}

export function* fetchingSaga() {
  // поднимаем флаг loading
  yield put(loading());
  try {
    const response = yield call(() => fetch("https://jsonplaceholder.typicode.com/todos/1"));
    yield delay(1000);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const responseData = yield call(() => response.json());
    // кладём результат в стейт
    yield put(received(responseData));
  } catch (e) {
    yield put(errored(e.message));
  }
}

export const selectApiState = state => state.fetcher.apiState;

export default fetcherSlice.reducer;
