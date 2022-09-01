import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const containerStyle = {
  width: '60%',
  height: '1000px'
};

const options = {
  gestureHandling: 'greedy'
};

const center = {
  lat: -34.921230,
  lng: 138.599503
};

function App() {
  const [cameras, setCameras] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch('/cameras').then(res => res.json()).then(data => {
      setCameras(data);
    });
  }, []);

  useEffect(() => {
    fetch('/cameras-today').then(res => res.json()).then(data => {
      setPoints(data);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  if (!isLoaded) {
    return
  }

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
          onLoad={map => setMap(map)}
        >
          {points[0]?.cameras.map(({ position }) => (
            <Marker
              position={position}
            >
            </Marker>
          ))}
        </GoogleMap>

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
    </div >
  );
}

export default App;