import { Text, useMantineColorScheme } from '@mantine/core';
import { GoogleMap, InfoWindowF, Marker, useJsApiLoader } from '@react-google-maps/api';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

function Map({ cameras, selectedDate }) {
    const containerStyle = {
        width: '100%',
        height: '81vh'
    };

    const darkStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#263c3f"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6b9a76"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#38414e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#212a37"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9ca5b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#1f2835"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#f3d19c"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2f3948"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#515c6d"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        }
    ];


    // const center = {
    //     lat: -34.921230,
    //     lng: 138.599503
    // };

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const options = {
        gestureHandling: 'greedy',
        clickableIcons: false,
        styles: colorScheme === 'dark' ? darkStyle : [],
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
                                <Text style={{ color: "black" }}>{location}</Text>
                            </InfoWindowF>
                        ) : null}
                    </Marker>
                ))}
            </GoogleMap>
        </>
    );
}

export default Map;