import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            Home
            <Link to="/console"> Console </Link>
        </div>
    )
}

export default Home