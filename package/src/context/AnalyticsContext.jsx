import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback
} from 'react'

const AnalyticsContext = createContext({})

export const AnalyticsContextProvider = ({
    children, analyticsURL
}) => {
    const eventsCountRef = useRef({});

    // const [navigationData, setNavigationData] = useState({});
    const navigationData = useRef({});
    const startTime = useRef(Date.now());

    // const [startTime, setStartTime] = useState(Date.now());

    // const isInstalled = () => {
    //     if (window.navigator.standalone) return true;
    //     if (window.matchMedia('(display-mode: standalone)').matches) return true;
    //     return false;
    // };

    const sendAnalytics = async (_navigationData, _startTime, useBeacon = false) => {
        try {
            // const userAgent = navigator.userAgent;
            // const screenWidth = window.innerWidth;
            // const isPWA = isInstalled();
            const path = window.location.pathname;
            const endTime = Date.now();
            const timeSpent = (endTime - _startTime) / 1000;

            const updatedNavigationData = {
                ..._navigationData,
                [path]: (_navigationData[path] || 0) + timeSpent,
            };

            const analyticsData = {
                timestamp: new Date(),
                // screenWidth,
                // isPWA,
                // browserInfo: userAgent,
                navigationData: updatedNavigationData,
                eventsCount: eventsCountRef.current
            };

            console.log('Analytics Data:', analyticsData);

            if (useBeacon) {
                const blob = new Blob([JSON.stringify(analyticsData)], { type: 'application/json' });
                navigator.sendBeacon(analyticsURL, blob);
            } else {
                await axios.post(analyticsURL, analyticsData);
            }

            return updatedNavigationData;
        } catch (error) {
            console.error('Error sending analytics:', error);
        }
    };

    const handleRouteChange = useCallback(() => {
        const path = window.location.pathname;
        const endTime = Date.now();
        const timeSpent = (endTime - startTime.current) / 1000;

        navigationData.current[path] = (navigationData.current[path] || 0) + timeSpent;

        // ((prevData) => ({
        //     ...prevData,
        //     [path]: (prevData[path] || 0) + timeSpent,
        // }));

        startTime.current = Date.now()
    }, [startTime.current]);

    useEffect(() => {
        handleRouteChange();
    }, [window.location.pathname]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                sendAnalytics(navigationData.current, startTime.current, true);
            } else {
                startTime.current = Date.now()
            }
        };

        const handleBeforeUnload = () => {
            sendAnalytics(navigationData.current, startTime.current, true);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [navigationData.current, startTime.current]);


    const handleEventTrigger = (eventId) => {
        if (eventsCountRef.current[eventId] === undefined) {
            eventsCountRef.current[eventId] = 0;
        }
        eventsCountRef.current[eventId]++;
    }

    return (
        <AnalyticsContext.Provider
            value={{
                handleEventTrigger
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    )
}

export function useAnalyticsContext() {
    const context = useContext(AnalyticsContext)
    if (context === undefined) {
        throw new Error(
            'useAnalyticsContext must be used within AnalyticsContextProvider'
        )
    }
    return context
}
