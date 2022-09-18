import dayjs from 'dayjs';

function IndividualList({ cameras, selectedDate }) {

    const temp = cameras.filter(val => val.date === dayjs(selectedDate).format("DD/MM/YYYY"))[0];

    return (
        <>
            <h2>{temp?.date}</h2>
            {temp?.cameras?.map(({ location, position }) => {
                return (
                    <p key={location}>{location}</p>
                );
            })}
        </>
    );

}
export default IndividualList;

