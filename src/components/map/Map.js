import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import { GoogleMap, InfoWindowF, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

function Map({ historicalCameras, selectedDate }) {
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
        const temp = historicalCameras.filter(val => val.date === selectedDate.format('DD/MM/YYYY'))[0];

        if (ref) {
            const bounds = new window.google.maps.LatLngBounds();
            temp?.cameras?.forEach(({ position }) => bounds.extend(position));
            ref?.fitBounds(bounds);
        }

    }, [historicalCameras, selectedDate, ref]);

    const handleOnLoad = (map) => {
        setRef(map);
    }

    const [activeMarker, setActiveMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    });

    if (!isLoaded) {
        return <Box>Loading...</Box>
    };

    return (
        <Grid xs={10}>
            <Box>
                {/* <Typography style={{ textAlign: "left", fontSize: 18 }}>Today's date: {today}</Typography> */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    options={options}
                    onLoad={handleOnLoad}
                    onClick={() => setActiveMarker(null)}
                >
                    {historicalCameras.filter(val => val.date === selectedDate.format('DD/MM/YYYY'))[0]?.cameras?.map(({ location, position }) => (
                        <Marker
                            key={location}
                            position={position}
                            onClick={() => setActiveMarker(location)}
                        >
                            {activeMarker === location ? (
                                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                    <Box style={{ color: "black" }}>{location}</Box>
                                </InfoWindowF>
                            ) : null}
                        </Marker>
                    ))}
                </GoogleMap>
            </Box>
        </Grid>
    );
}

export default Map;