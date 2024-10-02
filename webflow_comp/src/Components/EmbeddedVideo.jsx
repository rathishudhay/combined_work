import React from 'react';

const EmbeddedVideo = ({ url, title, width, height }) => {
    return (
        <video
            height={height || "315"}
            width={width || "560"}
            // src={url}
            controls
            // allowFullScreen
            title={title}
            style={{ border: "0" }}
        >
            <source src={url} type="video/mp4"></source>
        </video>
    );
};

export default EmbeddedVideo;
