import {configureStore, applyMiddleware, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import counterReducer from '../features/counter/counterSlice';
import fetcherReducer from '../features/apiFetcher/fetcherSlice';
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: true }), sagaMiddleware];
export default configureStore({
  reducer: {
    counter: counterReducer,
    fetcher: fetcherReducer,
  },
  middleware
});
sagaMiddleware.run(rootSaga);
