import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchData,
  selectApiState,
} from "./fetcherSlice";
import styles from "./Fetcher.module.css"

export default function Fetcher() {
  const {result, isLoading, isError, errorMessage} = useSelector(selectApiState);
  const dispatch = useDispatch();
  return <div className={styles.wrapper}>
      <div className={styles.row}>
        <button onClick={() => {dispatch(fetchData())}}>Get the data!</button>
      </div>
      <div className={styles.results}>
        <div>Is loading: {isLoading ? "true" : "false"}</div>
        <div>Is error: {isError ? "true" : "false"}</div>
        <div>Error message: {errorMessage}</div>
        <div>
          Result:
          {result && (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>;
}
