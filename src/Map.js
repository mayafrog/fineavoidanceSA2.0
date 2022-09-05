import React, {
    useState,
    useEffect
} from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api'

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

function Map() {
    const [points, setPoints] = useState([]);

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

    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);
    //     setMap(map)
    // }, [])

    const [activeMarker, setActiveMarker] = useState(null);

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className="Map">
            <header className="Map-header">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    options={options}
                    onLoad={map => setMap(map)}
                    onClick={() => setActiveMarker(null)}
                >
                    {points[0]?.cameras?.map(({ position, location }, id) => (
                        <Marker
                            key={location}
                            position={position}
                            onClick={() => { setActiveMarker(location) }}
                        >
                            {activeMarker && activeMarker === location ? (
                                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                    <div style={{ color: "black" }}>{location}</div>
                                </InfoWindowF>
                            ) : null}
                        </Marker>
                    ))}
                </GoogleMap>
            </header>
        </div >
    );
}

export default Map;