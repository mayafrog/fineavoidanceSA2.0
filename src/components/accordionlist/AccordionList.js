import { Accordion } from '@mantine/core';
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
                                ? <p>{camera.date} (TODAY)</p>
                                : <p>{camera.date}</p>}
                        </Accordion.Control>
                        <Accordion.Panel>
                            {camera?.cameras?.map((location, index) => {
                                return (
                                    location.location
                                        ? <p key={camera.date + " " + index} >{location.location}</p>
                                        : <p key={camera.date + " " + index} >{location}</p>
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