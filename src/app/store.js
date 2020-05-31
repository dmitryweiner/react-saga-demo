import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import fetcherReducer from '../features/apiFetcher/fetcherSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    fetcher: fetcherReducer,
  },
});
