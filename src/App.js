import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
    fetch('/cameras').then(res => res.json()).then(data => {
      setCameras(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <p>The current time is {currentTime}.</p>

        {cameras.map((camera, index) => {
          return (
            <div key={index}>
              <h1>{camera.date}</h1>

              {camera.cameras.map(location => {
                return (
                  <li>{location}</li>
                );
              })}

              <hr />
            </div>
          );
        })}

      </header>
    </div>
  );
}

export default App;