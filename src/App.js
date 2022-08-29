import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetch('/cameras').then(res => res.json()).then(data => {
      setCameras(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

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