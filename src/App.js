import './App.css';
import { useJsApiLoader } from '@react-google-maps/api'
import { default as Map } from "./Map.js";
import { default as List } from "./List.js";


function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return <Map />;

  return (
    <div className="App">
      <header className="App-header">
        <h4> Nhan's FineAvoidanceSA2.0 </h4>
        <Map />

        <List />

      </header>
    </div >
  );
}

export default App;