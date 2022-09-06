import React, {
    useState,
    useEffect
} from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api'

function Map() {
    const containerStyle = {
        width: '80vw',
        height: '80vh'
    };

    const options = {
        gestureHandling: 'greedy',
        clickableIcons: false
    };

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        fetch('/cameras-today').then(res => res.json()).then(data => {
            setMarkers(data);
        });
    }, []);

    const [activeMarker, setActiveMarker] = useState(null);

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers[0]?.cameras?.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

    if (!isLoaded) {
        return <div>Loading...</div>
    }


    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            options={options}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
        >
            {markers[0]?.cameras?.map(({ location, position }) => (
                <Marker
                    key={location}
                    position={position}
                    onClick={() => setActiveMarker(location)}
                >
                    {activeMarker === location ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                            <div style={{ color: "black" }}>{location}</div>
                        </InfoWindowF>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default Map;