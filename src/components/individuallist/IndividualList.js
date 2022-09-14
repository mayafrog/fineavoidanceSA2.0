import { Typography, Unstable_Grid2 as Grid } from '@mui/material';

function IndividualList({ historicalCameras, selectedDate }) {
    const temp = historicalCameras.filter(val => val.date === selectedDate.format('DD/MM/YYYY'))[0];

    return (
        <>
            <br></br>
            <Typography variant="h6">{temp?.date}</Typography>
            {temp?.cameras?.map(({ location, position }) => {
                return (
                    <Typography key={location} variant='body2' style={{ fontSize: 14 }}>{location}</Typography>
                );
            })}
        </>
    );

}
export default IndividualList;

