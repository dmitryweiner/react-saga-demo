import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeUserId,
  FETCH_ACTION,
  selectApiState, selectUserId,
} from "./fetcherSlice";
import styles from "./Fetcher.module.css"

export default function Fetcher() {
  const {result, isLoading, isError, errorMessage} = useSelector(selectApiState);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const handleUserIdChange = (event) => {
    dispatch(changeUserId(Number(event.target.value) || 0));
  };
  return <div className={styles.wrapper}>
      <div className={styles.row}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={handleUserIdChange}/>
        </label>
        <button onClick={() => {dispatch({type: FETCH_ACTION})}}>Get the data!</button>
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
