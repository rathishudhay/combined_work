import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Setting = () => {

    const ref = useRef({})

    const handleOnclick = (id) => {
        if (ref.current[id] === undefined) {
            ref.current[id] = 0;
        }
        ref.current[id]++;
    }

    const handlePrint = () => {
        console.log(ref);
    }

    return (
        <div>
            <button>
                <Link to="/">
                    Go Home
                </Link>
            </button>

            <button onClick={() => handleOnclick("event1")}>
                Event1
            </button>
            <button onClick={() => handleOnclick("event2")}>
                Event2
            </button>

            <button onClick={handlePrint}>
                Print
            </button>

        </div>

    )
}

export default Setting