import React, { useState, useEffect } from 'react';
import './App.css';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const containerStyle = {
  width: '60%',
  height: '1000px'
};

const options = {
  gestureHandling: 'greedy',
  clickableIcons: false
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

  const [activeMarker, setActiveMarker] = useState(null);

  if (!isLoaded) {
    return
  }

  return (
    <div className="App">
      <header className="App-header">
        <h4> Nhan's FineAvoidanceSA2.0 </h4>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
          onLoad={map => setMap(map)}
          onClick={() => setActiveMarker(null)}
        >
          {points[0]?.cameras.map(({ position, location }, id) => (
            <Marker
              key={id}
              position={position}
              onClick={() => { setActiveMarker(id) }}
            >
              {activeMarker && activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div style={{ color: "black" }}>{location}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>

        {cameras?.map((camera, index) => {
          return (
            <div key={index}>
              <h6>{camera.date}</h6>

              {camera.cameras.map(street_name => {
                return (
                  <li style={{ fontSize: 14 }}>{street_name}</li>
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