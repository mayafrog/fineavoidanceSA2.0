import React, {
    useState,
    useEffect
} from 'react';

function List() {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        fetch('/cameras').then(res => res.json()).then(data => {
            setCameras(data);
        });
    }, []);

    return (
        <div className="List">
            {cameras?.map((camera) => {
                return (
                    <div key={camera}>
                        <h6>{camera.date}</h6>

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