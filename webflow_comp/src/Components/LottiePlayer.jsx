import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottiePlayer = ({ loop = true, playReverse = true, renderer = 'svg' }) => {
    const [animationFile, setAnimationFile] = useState(null);
    const [animation, setAnimation] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (animationFile) {
            const anim = lottie.loadAnimation({
                container: containerRef.current,
                renderer: renderer,
                loop: loop,
                autoplay: true,
                path: animationFile,
                direction: playReverse ? -1 : 1,
            });
            setAnimation(anim);
        }
    }, [animationFile, loop, renderer]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target.result;
            setAnimationFile(result);
        };

        reader.readAsDataURL(file);
    };

    const play = () => {
        if (animation) {
            if (playReverse) {
                animation.setDirection(-1);
            } else {
                animation.setDirection(1);
            }
            animation.play();
        }
    };


    return (
        <div className="flex flex-col items-center">
            <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="my-4"
            />
            <div ref={containerRef} style={{ width: '300px', height: '300px' }}></div>
        </div>
    );
};

export default LottiePlayer;
