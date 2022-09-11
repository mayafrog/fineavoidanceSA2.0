import React, {
    useState,
    useEffect
} from 'react';
import moment from 'moment';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function HistoricalList() {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        fetch('/all-cameras').then(res => res.json()).then(data => {
            data.sort(function (a, b) {
                a = a.date.split('/');
                b = b.date.split('/');
                return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
            });
            setCameras(data);
        });
    }, []);

    const today = moment().format('DD/MM/YYYY');

    return (
        <Box className="HistoricalList">
            {cameras?.map((camera) => {
                return (
                    <Box key={camera.date}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                {camera.date === today ? <Typography fontWeight={"500"}>{camera.date} (TODAY)</Typography> : <Typography variant='subtitle2' fontWeight={300}>{camera.date}</Typography>}
                            </AccordionSummary>
                            <AccordionDetails>
                                {camera?.cameras?.map((location, index) => {
                                    return (
                                        <Typography key={camera.date + " " + index} variant='body2' style={{ fontSize: 14 }}>{location.location}</Typography>
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

export default HistoricalList;