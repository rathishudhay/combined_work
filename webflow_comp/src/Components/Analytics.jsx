import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import EventsTable from './EventsTable';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const server = "http://localhost:3001";
const subDomain = "dazzling-liger-dfbacf";

const Analytics = () => {
    const [usersByCountry, setUsersByCountry] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [interactionsPerPage, setInteractionsPerPage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredRegion, setHoveredRegion] = useState(null);

    const colorScale = ["#FF474C"];
    const hoverColor = '#FF0000';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const usersByCountryResponse = await axios.get(`${server}/users-by-country/${subDomain}`);
                const totalUsersResponse = await axios.get(`${server}/total-users/${subDomain}`);
                const interactionsPerPageResponse = await axios.get(`${server}/interactions-per-page/${subDomain}`);

                setUsersByCountry(usersByCountryResponse.data);
                setTotalUsers(totalUsersResponse.data);
                setInteractionsPerPage(interactionsPerPageResponse.data);

                // Log the fetched data
                console.log(usersByCountryResponse.data);
                console.log(totalUsersResponse.data);
                console.log(interactionsPerPageResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const lineChartData = totalUsers ? {
        labels: totalUsers.usersPerDate.map(item => item.date),
        datasets: [
            {
                label: 'Total Users',
                data: totalUsers.usersPerDate.map(item => item.userVisited),
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    } : null;

    const barChartData = interactionsPerPage ? {
        labels: interactionsPerPage.interactions.map(item => item.page),
        datasets: [
            {
                label: 'Interaction Time (s)',
                data: interactionsPerPage.interactions.map(item => item.interactionTime),
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    } : null;

    return (
        <div>
            {isLoading ? (
                <p>Loading analytics data...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <h2>Analytics</h2>
                    <div style={{ width: '400px', height: '300px' }}>
                        <h3>Total Users</h3>
                        {lineChartData && <Line data={lineChartData} />}
                    </div>
                    <div style={{ width: '400px', height: '300px' }}>
                        <h3>Interactions per Page</h3>
                        {barChartData && <Bar data={barChartData} style={{ width: '400px', height: '200px' }} />}
                    </div>
                    {usersByCountry ? (
                        <div style={{ margin: "auto", width: "700px", height: "600px" }}>
                            <VectorMap
                                map={worldMill}
                                containerStyle={{
                                    width: "700px",
                                    height: "600px",
                                }}
                                backgroundColor="transparent"
                                zoomButtons={false}
                                zoomOnScroll={false}
                                zoomMax={1}
                                zoomMin={1}
                                series={{
                                    regions: [
                                        {
                                            scale: colorScale,
                                            values: usersByCountry.countries,
                                            min: 0,
                                            max: 100,
                                            attribute: 'fill',
                                            normalizeFunction: 'linear',
                                        },
                                    ],
                                }}
                                regionStyle={{
                                    initial: {
                                        fill: '#c9c9c9'
                                    },
                                    hover: {
                                        fill: hoverColor
                                    }
                                }}
                                onRegionTipShow={(event, label, code) => {
                                    return label.html(`
                                        <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 125px; color: white; padding-left: 10px">
                                            <p><b>${label.html()}</b></p>
                                            <p>${usersByCountry.countries[code] || 0}</p>
                                        </div>
                                    `);
                                }}
                                onRegionOver={(event, code) => setHoveredRegion(code)}
                                onRegionOut={() => setHoveredRegion(null)}
                            />
                        </div>
                    ) : (
                        <p>Map Loading....</p>
                    )}
                </div>
            )}

            <EventsTable />
        </div>
    );
};

export default Analytics;
