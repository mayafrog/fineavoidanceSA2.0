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
            <header className="List-header">
                {cameras?.map((camera) => {
                    return (
                        <div key={camera}>
                            <h6>{camera.date}</h6>

                            {camera?.cameras?.map(street_name => {
                                return (
                                    <li style={{ fontSize: 14 }}>{street_name}</li>
                                );
                            })}

                            <hr />
                        </div>
                    );
                })
                }
            </header>
        </div >
    );
}

export default List;