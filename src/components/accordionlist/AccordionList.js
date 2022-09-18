import { Accordion, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

function AccordionList({ cameras }) {
    const today = dayjs().format('DD/MM/YYYY');

    return (
        <Accordion>
            {cameras?.map((camera) => {
                return (
                    <Accordion.Item key={camera.date} value={camera.date}>
                        <Accordion.Control>
                            {camera.date === today
                                ? <Text weight={700}>{camera.date} (TODAY)</Text>
                                : <Text>{camera.date}</Text>}
                        </Accordion.Control>
                        <Accordion.Panel>
                            {camera?.cameras?.map((location, index) => {
                                return (
                                    location.location
                                        ? <Text key={camera.date + " " + index} >{location.location}</Text>
                                        : <Text key={camera.date + " " + index} >{location}</Text>
                                );
                            })}
                        </Accordion.Panel>
                    </Accordion.Item>
                );
            })
            }
        </Accordion>
    );
}

export default AccordionList;