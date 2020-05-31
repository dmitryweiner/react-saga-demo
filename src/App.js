import React from 'react';
import './App.css';
import { Counter } from './features/counter/Counter';
import Fetcher from "./features/apiFetcher/Fetcher";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <Fetcher />
      </header>
    </div>
  );
}

export default App;
