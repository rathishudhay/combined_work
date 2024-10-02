import React, { useEffect, useRef, useState } from 'react';

const GoogleMaps = ({ apiKey, address, title, tooltip }) => {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (!apiKey) {
            console.error('API key is required');
            return;
        }

        const existingScript = document.querySelector(`script[src*="https://maps.googleapis.com/maps/api/js"]`);
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                initMap();
            };
            document.head.appendChild(script);
        } else {
            initMap();
        }

        return () => {
            if (existingScript) {
                existingScript.onload = null;
            }
        };
    }, [apiKey]);

    const initMap = () => {
        if (!window.google || !window.google.maps) {
            console.error('Google Maps JavaScript API not loaded');
            return;
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
                const location = results[0].geometry.location;
                setLocation(location);
                const map = new window.google.maps.Map(mapRef.current, {
                    center: location,
                    zoom: 15,
                });
                const marker = new window.google.maps.Marker({
                    position: location,
                    map: map,
                    title: title,
                });
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `<div><h3>${title}</h3><p>${tooltip}</p></div>`,
                });
                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    };

    return (
        <div>
            <div style={{ height: '400px', width: '100%' }} ref={mapRef} />
            {!location && <p>Loading map...</p>}
        </div>
    );
};

export default GoogleMaps;
