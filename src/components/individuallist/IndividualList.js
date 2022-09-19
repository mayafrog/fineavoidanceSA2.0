import { Text } from '@mantine/core';
import dayjs from 'dayjs';

function IndividualList({ cameras, selectedDate }) {

    const temp = cameras.filter(val => val.date === dayjs(selectedDate).format("DD/MM/YYYY"))[0];

    return (
        <>
            <Text weight={700}>{temp?.date}</Text>
            {temp?.cameras?.map(({ location, position }) => {
                return (
                    <Text size="sm" key={location}>{location}</Text>
                );
            })}
        </>
    );

}
export default IndividualList;

