import { GoogleMap, InfoWindowF, Marker, useJsApiLoader } from '@react-google-maps/api';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

function Map({ cameras, selectedDate }) {
    const containerStyle = {
        width: '100%',
        height: '76.5vh'
    };

    // const center = {
    //     lat: -34.921230,
    //     lng: 138.599503
    // };

    const options = {
        gestureHandling: 'greedy',
        clickableIcons: false
    };

    const [ref, setRef] = useState(null);

    useEffect(() => {
        const temp = cameras.filter(val => val.date === dayjs(selectedDate).format("DD/MM/YYYY"))[0];;

        if (ref) {
            const bounds = new window.google.maps.LatLngBounds();
            temp?.cameras?.forEach(({ position }) => bounds.extend(position));
            ref?.fitBounds(bounds);
        }

    }, [cameras, selectedDate, ref]);

    const handleOnLoad = (map) => {
        setRef(map);
    }

    const [activeMarker, setActiveMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    });

    if (!isLoaded) {
        return <div>Loading...</div>
    };

    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                onLoad={handleOnLoad}
                onClick={() => setActiveMarker(null)}
            >
                {cameras.filter(val => val.date === dayjs(selectedDate).format("DD/MM/YYYY"))[0]?.cameras?.map(({ location, position }) => (
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
        </>
    );
}

export default Map;