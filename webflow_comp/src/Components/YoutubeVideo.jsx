import React, { useEffect, useState } from 'react';

const YoutubeVideo = ({ url, title, startAt, mute, autoplay, controls, limitRelated, width, height }) => {
    const [videoId, setVideoId] = useState('');

    const extractVideoId = (url) => {
        if (url.includes('youtu.be')) {
            const parts = url.split('/');
            return parts[parts.length - 1].split('?')[0];
        } else {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        }
    };

    useEffect(() => {
        const id = extractVideoId(url);
        setVideoId(id);
    }, [url]);

    const convertTimeToSeconds = (time) => {
        const parts = time.split(':');
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const seconds = parseInt(parts[2]) || 0;

        return hours * 3600 + minutes * 60 + seconds;
    };

    const generateVideoUrl = () => {
        let videoUrl = `https://www.youtube.com/embed/${videoId}?`;

        if (startAt) {
            const startTimeInSeconds = convertTimeToSeconds(startAt);
            videoUrl += `start=${startTimeInSeconds}&`;
        }

        if (mute) {
            videoUrl += `mute=1&`;
        }

        if (autoplay) {
            videoUrl += `autoplay=1&`;
        } else {
            videoUrl += `autoplay=0&`;
        }

        if (controls) {
            videoUrl += `controls=1&`;
        } else {
            videoUrl += `controls=0&`;
        }

        if (limitRelated) {
            videoUrl += `rel=0&`;
        }

        console.log(videoUrl)

        return videoUrl;
    };

    return (
        <iframe
            width={width || "560"}
            height={height || "315"}
            controls={controls}
            autoPlay={autoplay}
            muted={mute}
            src={generateVideoUrl()}
            title={title ?? "YouTube video player"}
            style={{ border: "0px" }}
        ></iframe>
    );
};

export default YoutubeVideo;
