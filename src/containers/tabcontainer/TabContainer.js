import { Grid, Tabs } from '@mantine/core';
import { IconCalendar, IconHistory, IconMap } from '@tabler/icons';
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { AccordionList, DateSelector, IndividualList, Map } from '../../components';

function TabContainer() {
    dayjs.extend(require('dayjs/plugin/customParseFormat'));

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

    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <Tabs defaultValue="map">
            <Tabs.List>
                <Tabs.Tab value="map" icon={<IconMap size={14} />}>Map</Tabs.Tab>
                <Tabs.Tab value="current" icon={<IconCalendar size={14} />}>Current Data</Tabs.Tab>
                <Tabs.Tab value="historical" icon={<IconHistory size={14} />}>Historical Data</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="map">
                <Grid>
                    <Grid.Col span={2}>
                        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} historicalCameras={historicalCameras} ></DateSelector>
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={10}>
                        <Map cameras={historicalCameras} selectedDate={selectedDate}></Map>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <IndividualList cameras={historicalCameras} selectedDate={selectedDate}></IndividualList>
                    </Grid.Col>
                </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="current">
                <AccordionList cameras={scrapedCameras}></AccordionList>
            </Tabs.Panel>

            <Tabs.Panel value="historical">
                <AccordionList cameras={historicalCameras}></AccordionList>
            </Tabs.Panel>
        </Tabs>
    )

}
export default TabContainer;