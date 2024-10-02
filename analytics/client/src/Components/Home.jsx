import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            Home
            <button>
                <Link to="/setting">
                    Go Setting
                </Link>
            </button>
        </div>
    )
}

export default Home