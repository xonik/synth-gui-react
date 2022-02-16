import React from 'react';
import MainPanel from './components/MainPanel';
import Keyboard from './components/Keyboard';
import './App.scss';

function App() {
  return (
    <div className="App">
      <MainPanel/>
      <Keyboard/>
    </div>
  );
}

export default App;
