import { DatePicker } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';

function DateSelector({ selectedDate, setSelectedDate, historicalCameras }) {
    const dayjs = require('dayjs')
    const isMobile = useMediaQuery('(max-width: 755px)');

    return (
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
            dropdownType={isMobile ? 'modal' : 'popover'}
        />
    )
}

export default DateSelector;