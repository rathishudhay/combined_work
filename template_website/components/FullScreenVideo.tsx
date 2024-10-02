import React, { useEffect, useRef, useState } from 'react';
import './FullScreenVideo.css';

interface FullScreenVideoProps {
    videoUrl: string;
}

const FullScreenVideo: React.FC<FullScreenVideoProps> = ({ videoUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoElementRef = useRef<HTMLVideoElement>(null);

    const [zoomLevel, setZoomLevel] = useState<string>('10vw');
    const [sidePos, setSidePos] = useState<string>('5%');
    const minZoom = 10; // in vw
    const maxZoom = 100; // in vw

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const containerTop = container ? container.offsetTop : 0;
            const containerHeight = window.innerHeight; // 100vh in pixels

            if (scrollY >= containerTop && scrollY <= containerTop + containerHeight) {
                const scrollPosition = scrollY - containerTop;
                const zoomFactor = minZoom + (scrollPosition / containerHeight) * (maxZoom - minZoom);
                const newZoomLevel = Math.min(maxZoom, Math.max(minZoom, zoomFactor));

                setZoomLevel(`${newZoomLevel}vw`);

                // Calculate sidePos dynamically based on zoomLevel
                const sidePosFactor = 5 + (zoomFactor - minZoom) * (24 - 5) / (maxZoom - minZoom);
                const newSidePos = `${sidePosFactor}%`;
                setSidePos(newSidePos);
            } else if (scrollY < containerTop) {
                setZoomLevel(`${minZoom}vw`);
                setSidePos('5%');
            } else if (scrollY > containerTop + containerHeight) {
                setZoomLevel(`${maxZoom}vw`);
                setSidePos('24%');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="zoom-container" ref={containerRef}>
            <div className="test">
                <div className="fullScreen-text text-left text-white" style={{ left: sidePos }}>
                    Play
                </div>
                <div className="video-wrapper-2" style={{ width: zoomLevel, height: 'auto' }}>
                    <video
                        ref={videoElementRef}
                        controls={false}
                        autoPlay
                        loop
                        style={{ width: '100%', height: '100%' }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                </div>
                <div className="fullScreen-text text-right text-white" style={{ right: sidePos }}>
                    Reel
                </div>
            </div>
        </div>
    );
};

export default FullScreenVideo;
