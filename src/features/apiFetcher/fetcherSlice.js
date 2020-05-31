import {createSlice} from "@reduxjs/toolkit";
import {call, delay, put, takeEvery, select} from "redux-saga/effects";

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
    userId: 1,
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
    },
    changeUserId: (state, action) => {
      state.userId = action.payload;
    }
  },
});

export const {loading, received, errored, changeUserId} = fetcherSlice.actions;

export function* fetchData() {
  // обрабатываем каждый экшн fetch/action
  yield takeEvery(FETCH_ACTION, fetchingSaga);
}

export function* fetchingSaga() {
  // поднимаем флаг loading
  yield put(loading());
  try {
    const userId = yield select(selectUserId);
    const response = yield call(fetch, `https://jsonplaceholder.typicode.com/users/${userId}`);
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
export const selectUserId = state => state.fetcher.userId;

export default fetcherSlice.reducer;
