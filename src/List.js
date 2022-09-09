import React, {
    useState,
    useEffect
} from 'react';
import moment from 'moment';
import { Box, Typography } from '@mui/material'

function List() {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        fetch('/cameras').then(res => res.json()).then(data => {
            setCameras(data);
        });
    }, []);

    const today = moment().format('DD/MM/YYYY');

    return (
        <Box className="List">
            {cameras?.map((camera) => {
                return (
                    <Box key={camera.date}>
                        {camera.date === today ? <Typography variant='h4'fontWeight={"500"}>{camera.date} (TODAY)</Typography> : <Typography variant='h4'>{camera.date}</Typography>}

                        {camera?.cameras?.map((location, index) => {
                            return (
                                <Typography key = {camera.date + " " + index} variant='body2' style={{ fontSize: 14 }}>{location}</Typography>
                            );
                        })}

                        <hr />
                    </Box>
                );
            })
            }
        </Box >
    );
}

export default List;