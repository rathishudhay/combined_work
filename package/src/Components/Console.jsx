import React from 'react'
import { useAnalyticsContext } from '../context/AnalyticsContext';
import { Link } from 'react-router-dom';

const TestAnalytics = () => {
    const { handleEventTrigger } = useAnalyticsContext();
    return (
        <div>
            <button onClick={() => handleEventTrigger("E1")}>E1</button>
            <button onClick={() => handleEventTrigger("E2")}>E2</button>
            <button onClick={() => handleEventTrigger("E3")}>E3</button>
        </div>
    )
}

const Console = () => {
    return (
        <div>
            Console
            <TestAnalytics />

            <Link to="/"> Home </Link>

        </div>
    )
}

export default Console