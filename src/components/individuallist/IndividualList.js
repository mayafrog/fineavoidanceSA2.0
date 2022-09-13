import { Typography, Unstable_Grid2 as Grid } from '@mui/material'

function IndividualList({ markers, setMarkers, markerData }) {
    return (
        <Grid xs={2}>
            <br></br>
            <Typography variant="h6">{markers?.date}</Typography>
            {markers?.cameras?.map(({ location, position }) => {
                return (
                    <Typography key={location} variant='body2' style={{ fontSize: 14 }}>{location}</Typography>
                );
            })}
        </Grid>
    );

}
export default IndividualList;

