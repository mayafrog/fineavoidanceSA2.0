import React from "react";
import { useState, useEffect } from 'react';
import { Map, AccordionList, IndividualList, DateSelector } from '../../components'
import { Box, Tab, Unstable_Grid2 as Grid } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab"
import moment from 'moment';

function TabContainer() {
    const [currentTab, setCurrentTab] = useState('1');
    const handleTab = (event, newTab) => {
        setCurrentTab(newTab);
    };

    const getMarkers = fetch('/cameras-today').then(res => res.json()).then(data => {
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

    const [selectedDate, setSelectedDate] = useState(moment());
    const [markers, setMarkers] = useState(historicalCameras.filter(val => val.date === moment().format('DD/MM/YYYY')));

    return (
        <TabContext value={currentTab}>

            <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
                <TabList onChange={handleTab} textColor="inherit" indicatorColor='white'>
                    <Tab label="Map" value="1" />
                    <Tab label="Current Data" value="2" />
                    <Tab label="Historical Data" value="3" />
                </TabList>
            </Box>

            <TabPanel value="1">
                <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} historicalCameras={historicalCameras} />
                <Grid container spacing={2}>
                    <Map markers={markers} setMarkers={setMarkers} selectedDate={selectedDate} historicalCameras={historicalCameras} getMarkers={getMarkers} />
                    <IndividualList markers={markers} setMarkers={setMarkers} />
                </Grid>
            </TabPanel>

            <TabPanel value="2">
                <AccordionList cameras={scrapedCameras} setCameras={setScrapedCameras} />
            </TabPanel>

            <TabPanel value="3">
                <AccordionList cameras={historicalCameras} setCameras={setHistoricalCameras} />
            </TabPanel>
        </TabContext>
    )

}
export default TabContainer;