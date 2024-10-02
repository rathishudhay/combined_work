import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

const EventsTable = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch the events data from the backend
        fetch('http://localhost:3001/events/dazzling-liger-dfbacf')
            .then(response => response.json())
            .then(data => {
                setEvents(data.events);
            })
            .catch(error => {
                console.error('Error fetching events data:', error);
            });
    }, []);

    const totalActions = events.reduce((sum, event) => sum + event.totalAction, 0);
    const totalUsers = events.reduce((sum, event) => sum + event.uniqueUserCount, 0);
    const eventCountPerUser = totalUsers ? (totalActions / totalUsers).toFixed(2) : 0;

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto w-events">
                <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className=" text-left text-sm font-medium uppercase tracking-wider"></th>
                            <th className=" py-2 text-left text-sm font-medium text-black font-semibold uppercase tracking-wider text-left">Event Name</th>
                            <th className=" py-2 text-left text-sm font-medium text-black font-semibold uppercase tracking-wider text-right">Event Count</th>
                            <th className=" py-2 text-left text-sm font-medium text-black font-semibold uppercase tracking-wider text-right">Total Users</th>
                            <th className="px-2 py-2 text-left text-sm font-medium text-black font-semibold uppercase tracking-wider text-right">Event Count per User</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=""></td>
                            <td className="px-4 py-4 text-sm">Total</td>
                            <td className="px-4 py-4 text-sm text-right">{totalActions}</td>
                            <td className="px-4 py-4 text-sm text-right">{totalUsers}</td>
                            <td className="px-4 py-4 text-sm text-right">{eventCountPerUser}</td>
                        </tr>
                        {events.map((event, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="px-2 py-2 text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="px-4 py-2 text-sm font-medium text-blue-700">{event.eventName}</td>
                                <td className="px-4 py-2 text-sm text-gray-500 text-right">{event.totalAction}</td>
                                <td className="px-4 py-2 text-sm text-gray-500 text-right">{event.uniqueUserCount}</td>
                                <td className="px-4 py-2 text-sm text-gray-500 text-right">{(event.totalAction / event.uniqueUserCount).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventsTable;
