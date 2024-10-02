import React, { useState, useEffect } from 'react';
import './Work.css';

const data = [
    {
        image: "https://a.storyblok.com/f/133769/2400x2990/61c001bac1/columbia-pictures-hero.jpg/m/2400x2990/filters:quality(80)",
    },
    {
        image: "https://a.storyblok.com/f/133769/2400x2990/20d07e6f0c/pixelflakes-hero.jpg/m/2400x2990/filters:quality(80)",
    },
    {
        image: "https://a.storyblok.com/f/133769/2400x2990/8f08135741/studio-d-hero.jpg/m/2400x2990/filters:quality(80)",
    },
];

const Work: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const index = Math.floor(scrollPosition / window.innerHeight);
        setCurrentIndex(index % data.length);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const style = {
        backgroundImage: `url("${data[currentIndex]?.image}")`,
        height: '100vh',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transition: 'background-image 0.5s ease-in-out',
    };

    return (
        <div className="work-container" style={{ height: '100vh', overflowY: 'scroll' }}>
            <div className="work-content" style={style}>
                <div className="sub-image">
                    <img src={data[currentIndex]?.image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Work;
