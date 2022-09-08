import React, {
    useState,
    useEffect
} from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api'
import moment from 'moment';

function Map() {
    const containerStyle = {
        width: '80vw',
        height: '80vh'
    };

    // const center = {
    //     lat: -34.921230,
    //     lng: 138.599503
    // };

    const options = {
        gestureHandling: 'greedy',
        clickableIcons: false
    };

    const [markers, setMarkers] = useState([]);

    const [map, setMap] = useState(null);

    const [activeMarker, setActiveMarker] = useState(null);

    const today = moment().format('DD/MM/YYYY');

    useEffect(() => {
        fetch('/cameras-today').then(res => res.json()).then(data => {
            setMarkers(data);
        });
    }, []);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    const bounds = new window.google.maps.LatLngBounds();
    markers[0]?.cameras?.forEach(({ position }) => bounds.extend(position));
    map?.fitBounds(bounds);

    return (
        <div>
            <p style={{ textAlign: "left", fontSize: 18}}>Today's date: {today}</p>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                onLoad={(map) => setMap(map)}
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
        </div>
    );
}

export default Map;