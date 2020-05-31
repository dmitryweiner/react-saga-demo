import {createSlice} from "@reduxjs/toolkit";

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

export const fetchData = () => async dispatch => {
  dispatch(loading());
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const responseData = await response.json();
    dispatch(received(responseData));
  } catch (e) {
    dispatch(errored(e.message));
  }
};

export const selectApiState = state => state.fetcher.apiState;

export default fetcherSlice.reducer;
