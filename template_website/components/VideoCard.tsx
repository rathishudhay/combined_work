import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './VideoCard.css';

interface VideoCardProps {
    videoUrl: string;
    previewImageUrl: string;
    height?: string;
    width?: string;
    autoPlayOnHover?: boolean;
    title?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
    videoUrl,
    previewImageUrl,
    height = '300px',
    width = '500px',
    autoPlayOnHover = false,
    title = ''
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!autoPlayOnHover && videoRef.current && !videoError) {
                    videoRef.current.play();
                }
                setIsPlaying(true);
            } else {
                if (videoRef.current) {
                    videoRef.current.pause();
                }
                setIsPlaying(false);
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [videoError]);

    const handleMouseEnter = () => {
        if (autoPlayOnHover && videoRef.current && !videoError) {
            videoRef.current.play();
            setIsPlaying(true);
        }
        setIsPlaying(true);
    };

    const handleMouseLeave = () => {
        if (autoPlayOnHover && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        setIsPlaying(false);
    };

    const handleVideoError = () => {
        setVideoError(true);
    };

    return (
        <div
            className="video-card-main"
            style={{ width }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="video-card"
                style={{ height, width }}
            >
                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        width="100%"
                        height="100%"
                        playsInline
                        disablePictureInPicture
                        muted /* Mute the video by default */
                        style={{ display: isPlaying ? 'block' : 'none' }}
                        onError={handleVideoError}
                    />
                    {(!isPlaying || videoError) && <img src={previewImageUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />}
                </div>
            </div>
            <div className='mt-2 overflow-hidden'>
                <div className="video-title text-twisting-effect">
                    {title}
                </div>
            </div>
        </div>
    );
};

VideoCard.propTypes = {
    videoUrl: PropTypes.string.isRequired,
    previewImageUrl: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    autoPlayOnHover: PropTypes.bool,
    title: PropTypes.string,
};

export default VideoCard;
