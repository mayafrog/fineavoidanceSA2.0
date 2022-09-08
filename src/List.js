import React, {
    useState,
    useEffect
} from 'react';
import moment from 'moment';

function List() {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        fetch('/cameras').then(res => res.json()).then(data => {
            setCameras(data);
        });
    }, []);

    const today = moment().format('DD/MM/YYYY');

    return (
        <div className="List">
            {cameras?.map((camera) => {
                return (
                    <div key={camera}>
                        {camera.date === today ? <h3>{camera.date} (TODAY)</h3> : <h4>{camera.date}</h4>}

                        {camera?.cameras?.map(location => {
                            return (
                                <li style={{ fontSize: 14 }}>{location}</li>
                            );
                        })}

                        <hr />
                    </div>
                );
            })
            }
        </div >
    );
}

export default List;