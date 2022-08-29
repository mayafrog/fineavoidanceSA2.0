import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [cameras, setCameras] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
    fetch('/cameras').then(res => res.json()).then(data => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;