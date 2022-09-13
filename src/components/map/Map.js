import React, {
    useState
} from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material'

function Map({ markers, setMarkers, markerData, today }) {
    const containerStyle = {
        width: '100%',
        height: '79vh'
    };

    // const center = {
    //     lat: -34.921230,
    //     lng: 138.599503
    // };

    const options = {
        gestureHandling: 'greedy',
        clickableIcons: false
    };

    const handleOnLoad = async (map) => {
        let data = await markerData;
        setMarkers(data);

        const bounds = new window.google.maps.LatLngBounds();
        data?.cameras?.forEach(({ position }) => bounds.extend(position));
        map?.fitBounds(bounds);
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
                <Typography style={{ textAlign: "left", fontSize: 18 }}>Today's date: {today}</Typography>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    options={options}
                    onLoad={handleOnLoad}
                    onClick={() => setActiveMarker(null)}
                >
                    {markers?.cameras?.map(({ location, position }) => (
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