import React, { useState, useEffect } from 'react';
import './spacing.css';

const Spacing = () => {
    const [pressedButton, setPressedButton] = useState(null);
    const [marginTop, setMarginTop] = useState(0);
    const [marginBottom, setMarginBottom] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const [marginRight, setMarginRight] = useState(0);
    const [paddingTop, setPaddingTop] = useState(0);
    const [paddingBottom, setPaddingBottom] = useState(0);
    const [paddingLeft, setPaddingLeft] = useState(0);
    const [paddingRight, setPaddingRight] = useState(0);
    const [initialMouseY, setInitialMouseY] = useState(0);
    const [initialMouseX, setInitialMouseX] = useState(0);
    const [opacity, setOpacity] = useState({});

    const handleMouseDown = (e, button) => {
        setPressedButton(button);
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        console.log(`Center Coordinates: (${centerX}, ${centerY})`);
        setInitialMouseY(centerY);
        setInitialMouseX(centerX);
        setOpacity({ ...opacity, [button]: 0.6 });
    };

    const handleMouseUp = () => {
        setPressedButton(null);
        setOpacity({});
    };

    const handleMouseMove = (e) => {
        if (pressedButton) {
            const deltaY = Math.round((e.clientY - initialMouseY) * 0.2);
            const deltaX = Math.round((e.clientX - initialMouseX) * 0.2);
            console.log(`Difference in Y: ${deltaY}`);

            if (pressedButton === 'top') {
                setMarginTop(-1 * deltaY);
            } else if (pressedButton === 'bottom') {
                setMarginBottom(deltaY);
            } else if (pressedButton === 'left') {
                setMarginLeft(-1 * deltaX);
            } else if (pressedButton === 'right') {
                setMarginRight(deltaX);
            } else if (pressedButton === 'padding-top') {
                setPaddingTop(-1 * deltaY);
            } else if (pressedButton === 'padding-bottom') {
                setPaddingBottom(deltaY);
            } else if (pressedButton === 'padding-left') {
                setPaddingLeft(-1 * deltaX);
            } else if (pressedButton === 'padding-right') {
                setPaddingRight(deltaX);
            }
        }
    };


    useEffect(() => {
        if (pressedButton) {
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
        }

        const handleDocumentMouseUp = () => {
            if (pressedButton) {
                setPressedButton(null);
            }
        };

        document.addEventListener('mouseup', handleDocumentMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [pressedButton]);

    return (
        <div className="spacing">
            <div className="box-frame" style={{ opacity: opacity.box }}>
                <button className={`margin-edge margin-edge-top ${pressedButton === 'top' ? 'pressed' : ''}`}
                    onMouseDown={(e) => handleMouseDown(e, 'top')}
                    onMouseUp={handleMouseUp}
                >
                    <p>{marginTop}</p>
                </button>
                <button className={`margin-edge margin-edge-bottom ${pressedButton === 'bottom' ? 'pressed' : ''}`}
                    onMouseDown={(e) => handleMouseDown(e, 'bottom')}
                    onMouseUp={handleMouseUp}
                >
                    <p>{marginBottom}</p>
                </button>
                <button className={`margin-edge margin-edge-right ${pressedButton === 'right' ? 'pressed' : ''}`}
                    onMouseDown={(e) => handleMouseDown(e, 'right')}
                    onMouseUp={handleMouseUp}
                >
                    <p>{marginRight}</p>
                </button>
                <button className={`margin-edge margin-edge-left ${pressedButton === 'left' ? 'pressed' : ''}`}
                    onMouseDown={(e) => handleMouseDown(e, 'left')}
                    onMouseUp={handleMouseUp}
                >
                    <p>{marginLeft}</p>
                </button>

                <div className="padding-main" style={{ opacity: opacity.padding }}>
                    <button className={`padding-edge padding-edge-top ${pressedButton === 'padding-top' ? 'pressed' : ''}`}
                        onMouseDown={(e) => handleMouseDown(e, 'padding-top')}
                        onMouseUp={handleMouseUp}
                    >
                        <p>{paddingTop}</p>
                    </button>
                    <button className={`padding-edge padding-edge-bottom ${pressedButton === 'padding-bottom' ? 'pressed' : ''}`}
                        onMouseDown={(e) => handleMouseDown(e, 'padding-bottom')}
                        onMouseUp={handleMouseUp}
                    >
                        <p>{paddingBottom}</p>
                    </button>
                    <button className={`padding-edge padding-edge-right ${pressedButton === 'padding-right' ? 'pressed' : ''}`}
                        onMouseDown={(e) => handleMouseDown(e, 'padding-right')}
                        onMouseUp={handleMouseUp}
                    >
                        <p>{paddingRight}</p>
                    </button>
                    <button className={`padding-edge padding-edge-left ${pressedButton === 'padding-left' ? 'pressed' : ''}`}
                        onMouseDown={(e) => handleMouseDown(e, 'padding-left')}
                        onMouseUp={handleMouseUp}
                    >
                        <p>{paddingLeft}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Spacing;
