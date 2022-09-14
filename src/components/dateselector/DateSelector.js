import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

function DateSelector({ selectedDate, setSelectedDate, historicalCameras }) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label="Date"
                inputFormat="DD/MM/YYYY"
                minDate={moment(historicalCameras[0]?.date, 'DD/MM/YYYY')}
                maxDate={moment(historicalCameras[historicalCameras.length - 1]?.date, 'DD/MM/YYYY')}
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