import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';
import Setting from './Components/Setting';

const SERVER = "http://localhost:3001";

const isInstalled = () => {
  if (window.navigator.standalone) return true;
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  return false;
};

export function getSubdomain(hostname) {
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts.slice(0, -2).join('.');
  }
  return null;
}

const sendAnalytics = async (navigationData, startTime, useBeacon = false, subdomain) => {
  console.log(subdomain)
  try {
    const userAgent = navigator.userAgent;
    const screenWidth = window.innerWidth;
    const isPWA = isInstalled();
    const path = window.location.pathname;
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000;

    const updatedNavigationData = {
      ...navigationData,
      [path]: (navigationData[path] || 0) + timeSpent,
    };

    const analyticsData = {
      timestamp: new Date(),
      screenWidth,
      isPWA,
      navigationData: updatedNavigationData,
      browserInfo: userAgent,
    };

    console.log('Analytics Data:', analyticsData);

    if (useBeacon) {
      const blob = new Blob([JSON.stringify(analyticsData)], { type: 'application/json' });
      navigator.sendBeacon(`${SERVER}/analytics/${subdomain}`, blob);
    } else {
      await axios.post(`${SERVER}/analytics/${subdomain}`, analyticsData);
    }

    return updatedNavigationData;
  } catch (error) {
    console.error('Error sending analytics:', error);
  }
};

function App() {
  const [navigationData, setNavigationData] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
  const [subdomain, setSubdomain] = useState(null);

  const handleRouteChange = useCallback(() => {
    const path = window.location.pathname;
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000;

    setNavigationData((prevData) => ({
      ...prevData,
      [path]: (prevData[path] || 0) + timeSpent,
    }));

    setStartTime(Date.now());
  }, [startTime]);

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = getSubdomain(hostname);
    console.log(`Subdomain: ${subdomain}`);
    setSubdomain(subdomain);
  }, []);

  useEffect(() => {
    handleRouteChange();
  }, [window.location.pathname]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendAnalytics(navigationData, startTime, true, subdomain);
      } else {
        setStartTime(Date.now());
      }
    };

    const handleBeforeUnload = () => {
      sendAnalytics(navigationData, startTime, true, subdomain);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigationData, startTime]);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
