import React, {
    useState,
    useEffect
} from 'react';
import moment from 'moment';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function List({ cameras, setCameras }) {
    const today = moment().format('DD/MM/YYYY');

    return (
        <Box className="List">
            {cameras?.map((camera) => {
                return (
                    <Box key={camera.date}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                {camera.date === today
                                    ? <Typography fontWeight={"500"}>{camera.date} (TODAY)</Typography>
                                    : <Typography variant='subtitle2' fontWeight={300}>{camera.date}</Typography>}
                            </AccordionSummary>
                            <AccordionDetails>
                                {camera?.cameras?.map((location, index) => {
                                    return (
                                        location.location
                                            ? <Typography key={camera.date + " " + index} variant='body2' style={{ fontSize: 14 }}>{location.location}</Typography>
                                            : <Typography key={camera.date + " " + index} variant='body2' style={{ fontSize: 14 }}>{location}</Typography>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                );
            })
            }
        </Box>
    );
}

export default List;