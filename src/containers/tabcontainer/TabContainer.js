import React from "react";
import { useState, useEffect } from 'react';
import { Map, List } from '../../components'
import { Box, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab"

function TabContainer() {
    const [currentTab, setCurrentTab] = useState('1');
    const handleTab = (event, newTab) => {
        setCurrentTab(newTab);
    };

    const [markers, setMarkers] = useState([]);

    const markerData = fetch('/cameras-today').then(res => res.json()).then(data => {
        return data;
    });

    const [scrapedCameras, setScrapedCameras] = useState([]);
    useEffect(() => {
        fetch('/cameras').then(res => res.json()).then(data => {
            setScrapedCameras(data);
        });
    }, []);

    const [historicalCameras, setHistoricalCameras] = useState([]);
    useEffect(() => {
        fetch('/all-cameras').then(res => res.json()).then(data => {
            data.sort(function (a, b) {
                a = a.date.split('/');
                b = b.date.split('/');
                return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
            });
            setHistoricalCameras(data);
        });
    }, []);

    return (
        <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
                <TabList onChange={handleTab} textColor="inherit" indicatorColor='white'>
                    <Tab label="Map" value="1" />
                    <Tab label="Current Data" value="2" />
                    <Tab label="Historical Data" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"> <Map markers={markers} setMarkers={setMarkers} markerData={markerData} /> </TabPanel>
            <TabPanel value="2"> <List cameras={scrapedCameras} setCameras={setScrapedCameras} /> </TabPanel>
            <TabPanel value="3"> <List cameras={historicalCameras} setCameras={setHistoricalCameras} /> </TabPanel>
        </TabContext>
    )

}
export default TabContainer;