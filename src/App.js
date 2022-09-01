import React, {
  useState,
  useEffect
} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  useJsApiLoader,
  GoogleMap
} from '@react-google-maps/api'

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const containerStyle = {
  width: '60%',
  height: '1000px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function App() {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetch('/cameras').then(res => res.json()).then(data => {
      setCameras(data);
    });
  }, []);

  const {
    isLoaded
  } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return
  }

  return ( <
    div className = "App" >
    <
    header className = "App-header" >

    <
    img src = {
      logo
    }
    className = "App-logo"
    alt = "logo" / >

    <
    GoogleMap mapContainerStyle = {
      containerStyle
    }
    center = {
      center
    }
    zoom = {
      10
    }
    onLoad = {
      onLoad
    }
    onUnmount = {
      onUnmount
    } >
    {
      /* Child components, such as markers, info windows, etc. */ } <
    > < /> <
    /GoogleMap>

    {
      cameras.map((camera, index) => {
        return ( <
          div key = {
            index
          } >
          <
          h1 > {
            camera.date
          } < /h1>

          {
            camera.cameras.map(location => {
              return ( <
                li > {
                  location
                } < /li>
              );
            })
          }

          <
          hr / >
          <
          /div>
        );
      })
    }

    <
    /header> <
    /div>
  );
}

export default App;