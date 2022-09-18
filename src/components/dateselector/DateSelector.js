import { DatePicker } from '@mantine/dates';

function DateSelector({ selectedDate, setSelectedDate, historicalCameras }) {
    const dayjs = require('dayjs')

    return (
        <>
            <DatePicker
                label="Selected date"
                value={dayjs(selectedDate).toDate()}
                onChange={(newDate) => {
                    setSelectedDate(newDate);
                }}
                clearable={false}
                inputFormat="DD/MM/YYYY"
                minDate={dayjs(historicalCameras[0]?.date, 'DD/MM/YYYY').toDate()}
                maxDate={dayjs(historicalCameras[historicalCameras.length - 1]?.date, 'DD/MM/YYYY').toDate()}
                withAsterisk
            />
        </>
    )
}

export default DateSelector;