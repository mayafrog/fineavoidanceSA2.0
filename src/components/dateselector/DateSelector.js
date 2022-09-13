import { TextField } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

function DateSelector({ selectedDate, setSelectedDate, historicalCameras }) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label="Date"
                inputFormat="DD/MM/YYYY"
                value={selectedDate}
                onChange={(newValue) => {
                    setSelectedDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default DateSelector;