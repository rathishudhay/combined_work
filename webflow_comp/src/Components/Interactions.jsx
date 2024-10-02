import React, { useState } from 'react';

const actions = {
    'Custom': ['Create Custom'],
    'Appear & Disappear': ['Fade', 'Slide', 'Flip', 'Grow', 'Grow big', 'Shrink', 'Shrink big', 'Spin', 'Fly', 'Drop'],
    'Emphasis': ['Pop', 'Jiggle', 'Pulse', 'Blink', 'Bounce', 'Flip left to right', 'Flip right to left', 'Rubber band', 'Jello']
};

const animations = {
    'Global variables': ['Set variable value'],
    'Transform': ['Move', 'Scale', 'Rotate', 'Skew'],
    'Style': ['Opacity', 'Filter', 'Font variation', 'BG Color', 'Border Color', 'Text Color'],
    'Miscellaneous': ['Size', 'Hide/Show']
};

const animationAction = {
    Transform: ['x', 'y', 'z'],
    Style: {
        'Opacity': ['text'],
        'BG Color': ['color'],
        'Border Color': ['color'],
        'Text Color': ['color']
    },
    Miscellaneous: {
        'Size': ['height', 'width']
    }
};

const dragDropArray = ["Item1", "Item2", "Item3", "Item4", "Item5"];

const SortableList = ({ items }) => {
    const [sortedItems, setSortedItems] = useState(items);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index) => (event) => {
        event.preventDefault();
        setHoverIndex(index);
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) {
            return;
        }

        const newItems = [...sortedItems];
        const [movedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(index, 0, movedItem);
        setSortedItems(newItems);
        setDraggedIndex(null);
        setHoverIndex(null);
    };

    const DraggableItem = ({ item, index }) => (
        <div
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className={`w-full p-2 mb-2 border border-solid border-black bg-slate-200 ${index === draggedIndex ? 'opacity-50' : ''}`}
            style={{ cursor: 'move' }}
        >
            <p className='text-black text-base'>{item}</p>
        </div>
    );

    const DropLine = ({ index }) => (
        <div
            className={`w-full h-1 border-t border-gray-400 ${hoverIndex === index ? 'bg-blue-100' : ''}`}
            style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '10px' }}
            onDragOver={(e) => handleDragOver(index)(e)}
            onDrop={() => handleDrop(index)}
        />
    );

    return (
        <div>
            {sortedItems.map((item, index) => (
                <React.Fragment key={index}>
                    <DraggableItem item={item} index={index} />
                    {index < sortedItems.length - 1 && (
                        <DropLine index={index + 1} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const ActionDetails = ({ action, category, closeActionView }) => {
    return (
        <div className='absolute inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-white'>
            <div className='bg-white p-6 border border-solid border-slate-500 relative h-screen w-custom'>
                <button onClick={closeActionView} className='absolute top-0 right-0 p-2'>x</button>
                <h3 className='mb-2'>Action Details</h3>
                <div className='flex items-center justify-between'>
                    <p className='text-black text-base'>Direction</p>
                    {
                        category === 'Appear & Disappear' &&
                        <div className='flex items-center justify-between'>
                            <button>{`${action} in`}</button>
                            <button>{`${action} out`}</button>
                        </div>
                    }
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-black text-base mr-2'>Delay</p>
                    <input type="text" />
                </div>

                <button>Preview</button>
            </div>
        </div>
    );
};

const TriggerAction = () => {
    const [triggerSettings, setTriggerSettings] = useState({
        desktopAndAbove: false,
        tablet: false,
        phoneLandscape: false,
        phonePortrait: false,
    });
    const [toggleState, setToggleState] = useState('element');
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setTriggerSettings(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleToggleChange = () => {
        setToggleState(toggleState === 'element' ? 'class' : 'element');
    };
    return (
        <div>
            <div className='mt-3'>
                <h3>Trigger Setting</h3>
                <div className='mt-2'>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                name='desktopAndAbove'
                                checked={triggerSettings.desktopAndAbove}
                                onChange={handleCheckboxChange}
                            />
                            Desktop and Above
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                name='tablet'
                                checked={triggerSettings.tablet}
                                onChange={handleCheckboxChange}
                            />
                            Tablet
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                name='phoneLandscape'
                                checked={triggerSettings.phoneLandscape}
                                onChange={handleCheckboxChange}
                            />
                            Phone Landscape
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                name='phonePortrait'
                                checked={triggerSettings.phonePortrait}
                                onChange={handleCheckboxChange}
                            />
                            Phone Portrait
                        </label>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <h3>Target Selection</h3>
                <div className='flex items-center mt-2'>
                    <button
                        className={`p-2 border border-solid ${toggleState === 'element' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={handleToggleChange}
                    >
                        Element
                    </button>
                    <button
                        className={`p-2 border border-solid ${toggleState === 'class' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={handleToggleChange}
                    >
                        Class
                    </button>
                </div>
                {toggleState === 'element' ? (
                    <div className='mt-2'>
                        <p className='text-black text-base'>Trigger only the selected element</p>
                    </div>
                ) : (
                    <div className='mt-2'>
                        <label>
                            <p className='text-black text-base'>Class:</p>
                            <input type="text" className='border border-solid border-black p-1' />
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

const TimedAnimation = ({ animationType, animation }) => {
    const [isStartDropdownVisible, setStartDropdownVisible] = useState(false);
    const [isEasingDropdownVisible, setEasingDropdownVisible] = useState(false);
    const [easing, setEasing] = useState('Linear(None)');
    const [startAnimation, setStartAnimation] = useState('After Previous Action');
    const [selectedAction, setSelectedAction] = useState(null);

    const easingOptions = ['Ease-in', 'Ease-out', 'Ease-in-out'];

    const handleActionSelect = (action) => {
        setSelectedAction(action);
    };

    console.log(animation, animationType)

    return (
        <div className='mt-2'>
            <div>
                <p className='text-black font-semibold text-base'>Action</p>
                <div>
                    {/* {
                        dragDropArray.map((val, idx) => (
                            <div className='w-full p-2 mt-2 mb-2 border border-solid border-black bg-slate-200' key={idx}>
                                <p className='text-black text-base'>
                                    {val}
                                </p>
                            </div>
                        ))
                    } */}

                    <SortableList items={dragDropArray} />
                </div>
            </div>

            <p className='text-black text-base font-semibold'>{animation}</p>
            <div className='flex items-center gap-2'>
                <input type="checkbox" />
                <label htmlFor="">Set as initial state</label>
            </div>
            <div>
                <div className='flex items-center justify-between'>
                    <p className='text-black text-base'>Start</p>
                    <p className='text-black text-base'>Delay</p>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <div className='relative w-4/5'>
                        <button
                            className='w-full text-left'
                            onClick={() => setStartDropdownVisible(!isStartDropdownVisible)}
                        >
                            {startAnimation}
                        </button>
                        {isStartDropdownVisible && (
                            <div className='absolute bg-white border border-gray-300 mt-1 p-2 z-10 border border-solid border-black'>
                                <ul className='list-none'>
                                    <li
                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                        onClick={() => { setStartAnimation("After Previous Action"); setStartDropdownVisible(false); }}
                                    >
                                        After Previous Action
                                    </li>
                                    <li
                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                        onClick={() => { setStartAnimation("With Previous Action"); setStartDropdownVisible(false); }}
                                    >
                                        With Previous Action
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <input type="text" className='w-1/5' />
                </div>
            </div>

            <div>
                <div className='flex items-center justify-between'>
                    <p className='text-black text-base'>Easing</p>
                    <p className='text-black text-base'>Delay</p>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-5 w-4/5'>
                        <button>Preset</button>
                        <button>Custom</button>
                    </div>

                    <input type="text" className='w-1/5' />
                </div>
                <div className='relative w-3/5'>
                    <button onClick={() => setEasingDropdownVisible(!isEasingDropdownVisible)}>
                        {easing}
                    </button>
                    {isEasingDropdownVisible && (
                        <div className='absolute bg-white border border-gray-300 mt-1 p-2 z-10 border border-solid border-black'>
                            <ul className='list-none'>
                                {easingOptions.map((option, idx) => (
                                    <li key={idx} className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setEasing(option); setEasingDropdownVisible(false); }}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className='mt-5'>
                {
                    animationType === "Transform" && (
                        animationAction.Transform.map((val, idx) => (
                            <div key={idx}>
                                <label>{val}</label>
                                <input type='text' />
                            </div>
                        ))
                    )
                }
                {
                    animationType === "Style" && animationAction.Style[animation] && (
                        <div>
                            <label>{animation}</label>
                            <input type={animationAction.Style[animation][0]} />
                        </div>
                    )
                }
                {
                    animationType === "Miscellaneous" && animationAction.Miscellaneous[animation] && animationAction.Miscellaneous[animation].map((val, idx) => (
                        <div key={idx}>
                            <label >{val}</label>
                            <input type='text' />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

const MouseClickDetails = ({ onActionClick }) => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [isActionDropdownVisible2, setActionDropdownVisible2] = useState(false);
    const [customOpen1, setCustomOpen1] = useState(false);
    const [customOpen2, setCustomOpen2] = useState(false);
    const [timedAnimationOpen1, setTimedAnimationOpen1] = useState(false);
    const [timedAnimationOpen2, setTimedAnimationOpen2] = useState(false);
    const [isTimedAnimationDropdownVisible1, setTimedAnimationDropdownVisible1] = useState(false);
    const [isTimedAnimationDropdownVisible2, setTimedAnimationDropdownVisible2] = useState(false);
    const [selectedAnimationType1, setSelectedAnimationType1] = useState('');
    const [selectedAnimation1, setSelectedAnimation1] = useState('');
    const [selectedAnimationType2, setSelectedAnimationType2] = useState('');
    const [selectedAnimation2, setSelectedAnimation2] = useState('');

    const handleActionClick = (action, category, setDropdownVisible) => {
        setDropdownVisible(false);
        onActionClick(action, category);
    };

    const handleTimedAnimationSelection = (action, category, setDropdownVisible, setSelectedAnimation, setSelectedAnimationType) => {
        setSelectedAnimation(action);
        setSelectedAnimationType(category);
        setDropdownVisible(false);
    };

    return (
        <div>
            <h3>Mouse Click</h3>
            <div className='mt-5'>
                <h3>On Click 1</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>Select Action</button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        {Object.keys(actions).map((category, idx) => (
                            <div key={idx}>
                                <h4 className='font-bold'>{category}</h4>
                                <ul className='list-none'>
                                    {actions[category].map((action, subIdx) => (
                                        <li
                                            className='p-1 hover:bg-gray-200 cursor-pointer'
                                            key={subIdx}
                                            onClick={() => {
                                                if (action === "Create Custom") {
                                                    setCustomOpen1(true);
                                                    setActionDropdownVisible1(false);
                                                } else {
                                                    handleActionClick(action, category, setActionDropdownVisible1);
                                                }
                                            }}
                                        >
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {
                    customOpen1 && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animation</p>
                                <button onClick={() => setTimedAnimationOpen1(true)}>+</button>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen1 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen1(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible1(!isTimedAnimationDropdownVisible1)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible1 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleTimedAnimationSelection(action, category, setTimedAnimationDropdownVisible1, setSelectedAnimation1, setSelectedAnimationType1)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='p-2'>
                                {selectedAnimation1 && <TimedAnimation animationType={selectedAnimationType1} animation={selectedAnimation1} />}
                            </div>
                        </div>
                    )
                }
            </div>

            <div className='mt-5'>
                <h3>On Click 2</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible2(!isActionDropdownVisible2)}>Select Action</button>
                </div>
                {isActionDropdownVisible2 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        {Object.keys(actions).map((category, idx) => (
                            <div key={idx}>
                                <h4 className='font-bold'>{category}</h4>
                                <ul className='list-none'>
                                    {actions[category].map((action, subIdx) => (
                                        <li
                                            className='p-1 hover:bg-gray-200 cursor-pointer'
                                            key={subIdx}
                                            onClick={() => {
                                                if (action === "Create Custom") {
                                                    setCustomOpen2(true);
                                                    setActionDropdownVisible2(false);
                                                } else {
                                                    handleActionClick(action, category, setActionDropdownVisible2);
                                                }
                                            }}
                                        >
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {
                    customOpen2 && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animation</p>
                                <button onClick={() => setTimedAnimationOpen2(true)}>+</button>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen2 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen2(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible2(!isTimedAnimationDropdownVisible2)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible2 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleTimedAnimationSelection(action, category, setTimedAnimationDropdownVisible2, setSelectedAnimation2, setSelectedAnimationType2)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='p-2'>
                                {selectedAnimation2 && <TimedAnimation animationType={selectedAnimationType2} animation={selectedAnimation2} />}
                            </div>
                        </div>
                    )
                }
            </div>
            <TriggerAction />
        </div>
    );
};

const MouseHoverDetails = ({ onActionClick }) => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [isActionDropdownVisible2, setActionDropdownVisible2] = useState(false);
    const [customOpen1, setCustomOpen1] = useState(false);
    const [customOpen2, setCustomOpen2] = useState(false);
    const [timedAnimationOpen1, setTimedAnimationOpen1] = useState(false);
    const [timedAnimationOpen2, setTimedAnimationOpen2] = useState(false);
    const [isTimedAnimationDropdownVisible1, setTimedAnimationDropdownVisible1] = useState(false);
    const [isTimedAnimationDropdownVisible2, setTimedAnimationDropdownVisible2] = useState(false);
    const [selectedAnimationType1, setSelectedAnimationType1] = useState('');
    const [selectedAnimation1, setSelectedAnimation1] = useState('');
    const [selectedAnimationType2, setSelectedAnimationType2] = useState('');
    const [selectedAnimation2, setSelectedAnimation2] = useState('');

    const handleActionClick = (action, category, setDropdownVisible) => {
        if (action !== "Create Custom") {
            onActionClick(action, category);
        }
        setDropdownVisible(false);
    };

    const handleTimedAnimationSelection = (action, category, setDropdownVisible, setSelectedAnimation, setSelectedAnimationType) => {
        setSelectedAnimation(action);
        setSelectedAnimationType(category);
        setDropdownVisible(false);
    };

    return (
        <div>
            <h3>Mouse Hover</h3>
            <div className='mt-5'>
                <h3>Hover In</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>Select Action</button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        {Object.keys(actions).map((category, idx) => (
                            <div key={idx}>
                                <h4 className='font-bold'>{category}</h4>
                                <ul className='list-none'>
                                    {actions[category].map((action, subIdx) => (
                                        <li
                                            className='p-1 hover:bg-gray-200 cursor-pointer'
                                            key={subIdx}
                                            onClick={() => {
                                                if (action === "Create Custom") {
                                                    setCustomOpen1(true);
                                                    setActionDropdownVisible1(false);
                                                } else {
                                                    handleActionClick(action, category, setActionDropdownVisible1);
                                                }
                                            }}
                                        >
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {customOpen1 && (
                    <div>
                        <div className='flex items-center justify-between'>
                            <p className='text-black text-base'>Timed Animation</p>
                            <button onClick={() => setTimedAnimationOpen1(true)}>+</button>
                        </div>
                    </div>
                )}

                {timedAnimationOpen1 && (
                    <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid'>
                        <div className='flex items-center justify-between'>
                            <h3>Timed Animation</h3>
                            <button onClick={() => setTimedAnimationOpen1(false)} className='p-2'>x</button>
                        </div>
                        <button onClick={() => setTimedAnimationDropdownVisible1(!isTimedAnimationDropdownVisible1)} className='mt-2 p-1'>+</button>
                        {isTimedAnimationDropdownVisible1 && (
                            <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                {Object.keys(animations).map((category, idx) => (
                                    <div key={idx}>
                                        <h4 className='font-bold'>{category}</h4>
                                        <ul className='list-none'>
                                            {animations[category].map((action, subIdx) => (
                                                <li
                                                    className='p-1 hover:bg-gray-200 cursor-pointer'
                                                    key={subIdx}
                                                    onClick={() => handleTimedAnimationSelection(action, category, setTimedAnimationDropdownVisible1, setSelectedAnimation1, setSelectedAnimationType1)}
                                                >
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='p-2'>
                            {selectedAnimation1 && <TimedAnimation animationType={selectedAnimationType1} animation={selectedAnimation1} />}
                        </div>
                    </div>
                )}
            </div>

            <div className='mt-5'>
                <h3>Hover Out</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible2(!isActionDropdownVisible2)}>Select Action</button>
                </div>
                {isActionDropdownVisible2 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        {Object.keys(actions).map((category, idx) => (
                            <div key={idx}>
                                <h4 className='font-bold'>{category}</h4>
                                <ul className='list-none'>
                                    {actions[category].map((action, subIdx) => (
                                        <li
                                            className='p-1 hover:bg-gray-200 cursor-pointer'
                                            key={subIdx}
                                            onClick={() => {
                                                if (action === "Create Custom") {
                                                    setCustomOpen2(true);
                                                    setActionDropdownVisible2(false);
                                                } else {
                                                    handleActionClick(action, category, setActionDropdownVisible2);
                                                }
                                            }}
                                        >
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {customOpen2 && (
                    <div>
                        <div className='flex items-center justify-between'>
                            <p className='text-black text-base'>Timed Animation</p>
                            <button onClick={() => setTimedAnimationOpen2(true)}>+</button>
                        </div>
                    </div>
                )}

                {timedAnimationOpen2 && (
                    <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid'>
                        <div className='flex items-center justify-between'>
                            <h3>Timed Animation</h3>
                            <button onClick={() => setTimedAnimationOpen2(false)} className='p-2'>x</button>
                        </div>
                        <button onClick={() => setTimedAnimationDropdownVisible2(!isTimedAnimationDropdownVisible2)} className='mt-2 p-1'>+</button>
                        {isTimedAnimationDropdownVisible2 && (
                            <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                {Object.keys(animations).map((category, idx) => (
                                    <div key={idx}>
                                        <h4 className='font-bold'>{category}</h4>
                                        <ul className='list-none'>
                                            {animations[category].map((action, subIdx) => (
                                                <li
                                                    className='p-1 hover:bg-gray-200 cursor-pointer'
                                                    key={subIdx}
                                                    onClick={() => handleTimedAnimationSelection(action, category, setTimedAnimationDropdownVisible2, setSelectedAnimation2, setSelectedAnimationType2)}
                                                >
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='p-2'>
                            {selectedAnimation2 && <TimedAnimation animationType={selectedAnimationType2} animation={selectedAnimation2} />}
                        </div>
                    </div>
                )}
            </div>
            <TriggerAction />
        </div>
    );
};

const ScrollInView = ({ onActionClick }) => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [isActionDropdownVisible2, setActionDropdownVisible2] = useState(false);
    const [customOpen1, setCustomOpen1] = useState(false);
    const [customOpen2, setCustomOpen2] = useState(false);
    const [timedAnimationOpen1, setTimedAnimationOpen1] = useState(false);
    const [timedAnimationOpen2, setTimedAnimationOpen2] = useState(false);
    const [isTimedAnimationDropdownVisible1, setTimedAnimationDropdownVisible1] = useState(false);
    const [isTimedAnimationDropdownVisible2, setTimedAnimationDropdownVisible2] = useState(false);
    const [selectedAnimationType1, setSelectedAnimationType1] = useState('');
    const [selectedAnimation1, setSelectedAnimation1] = useState('');
    const [selectedAnimationType2, setSelectedAnimationType2] = useState('');
    const [selectedAnimation2, setSelectedAnimation2] = useState('');

    const handleActionClick = (action, category, setDropdownVisible) => {
        setDropdownVisible(false);
        onActionClick(action, category);
    };

    const handleTimedAnimationSelection = (action, category, setDropdownVisible, setSelectedAnimation, setSelectedAnimationType) => {
        setSelectedAnimation(action);
        setSelectedAnimationType(category);
        setDropdownVisible(false);
    };

    return (
        <div>
            <h3>Scroll Into View</h3>
            <div className='mt-5'>
                <h3>Scrolled into view</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>Select Action</button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        {Object.keys(actions).map((category, idx) => (
                            <div key={idx}>
                                <h4 className='font-bold'>{category}</h4>
                                <ul className='list-none'>
                                    {actions[category].map((action, subIdx) => (
                                        <li
                                            className='p-1 hover:bg-gray-200 cursor-pointer'
                                            key={subIdx}
                                            onClick={() => {
                                                if (action === "Create Custom") {
                                                    setCustomOpen1(true);
                                                    setActionDropdownVisible1(false);
                                                } else {
                                                    handleActionClick(action, category, setActionDropdownVisible1);
                                                }
                                            }}
                                        >
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {
                    customOpen1 && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animation</p>
                                <button onClick={() => setTimedAnimationOpen1(true)}>+</button>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen1 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen1(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible1(!isTimedAnimationDropdownVisible1)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible1 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleTimedAnimationSelection(action, category, setTimedAnimationDropdownVisible1, setSelectedAnimation1, setSelectedAnimationType1)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='p-2'>
                                {selectedAnimation1 && <TimedAnimation animationType={selectedAnimationType1} animation={selectedAnimation1} />}
                            </div>
                        </div>
                    )
                }
            </div>

            <div className='mt-5'>
                <h3>Scrolled out of view</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible2(!isActionDropdownVisible2)}>Select Action</button>
                </div>
                {isActionDropdownVisible2 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        {Object.keys(actions).map((category, idx) => (
                            <div key={idx}>
                                <h4 className='font-bold'>{category}</h4>
                                <ul className='list-none'>
                                    {actions[category].map((action, subIdx) => (
                                        <li
                                            className='p-1 hover:bg-gray-200 cursor-pointer'
                                            key={subIdx}
                                            onClick={() => {
                                                if (action === "Create Custom") {
                                                    setCustomOpen2(true);
                                                    setActionDropdownVisible2(false);
                                                } else {
                                                    handleActionClick(action, category, setActionDropdownVisible2);
                                                }
                                            }}
                                        >
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {
                    customOpen2 && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animation</p>
                                <button onClick={() => setTimedAnimationOpen2(true)}>+</button>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen2 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen2(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible2(!isTimedAnimationDropdownVisible2)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible2 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleTimedAnimationSelection(action, category, setTimedAnimationDropdownVisible2, setSelectedAnimation2, setSelectedAnimationType2)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='p-2'>
                                {selectedAnimation2 && <TimedAnimation animationType={selectedAnimationType2} animation={selectedAnimation2} />}
                            </div>
                        </div>
                    )
                }
            </div>
            <TriggerAction />
        </div>
    );
};

const MouseMoverOverElement = () => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [mouseMoveOverAction, setMouseMoveOverAction] = useState("Select");
    const [mouseAnimationsOpen, setMouseAnimationsOpen] = useState(false);
    const [mouseXActions, setMouseXActions] = useState([{ breakpoint: '', animation: '' }]);
    const [mouseYActions, setMouseYActions] = useState([{ breakpoint: '', animation: '' }]);
    const [timedAnimationX, setTimedAnimationX] = useState(false);
    const [timedAnimationY, setTimedAnimationY] = useState(false);
    const [isTimedAnimationDropdownVisibleX, setTimedAnimationDropdownVisibleX] = useState(false);
    const [isTimedAnimationDropdownVisibleY, setTimedAnimationDropdownVisibleY] = useState(false);
    const [selectedAnimation1, setSelectedAnimation1] = useState('');
    const [selectedAnimationType1, setSelectedAnimationType1] = useState('');
    const [selectedAnimation2, setSelectedAnimation2] = useState('');
    const [selectedAnimationType2, setSelectedAnimationType2] = useState('');

    const handleMouseXChange = (index, field, value) => {
        const updatedActions = [...mouseXActions];
        updatedActions[index][field] = value;
        setMouseXActions(updatedActions);
    };

    const handleMouseYChange = (index, field, value) => {
        const updatedActions = [...mouseYActions];
        updatedActions[index][field] = value;
        setMouseYActions(updatedActions);
    };

    const addMouseXAction = () => setMouseXActions([...mouseXActions, { breakpoint: '', animation: '' }]);
    const addMouseYAction = () => setMouseYActions([...mouseYActions, { breakpoint: '', animation: '' }]);

    const deleteMouseXAction = (index) => setMouseXActions(mouseXActions.filter((_, i) => i !== index));
    const deleteMouseYAction = (index) => setMouseYActions(mouseYActions.filter((_, i) => i !== index));

    const handleTimedAnimationSelectionX = (action, category) => {
        setSelectedAnimation1(action);
        setSelectedAnimationType1(category);
        setTimedAnimationDropdownVisibleX(false);
    };

    const handleTimedAnimationSelectionY = (action, category) => {
        setSelectedAnimation2(action);
        setSelectedAnimationType2(category);
        setTimedAnimationDropdownVisibleY(false);
    };

    return (
        <div>
            <h3>Mouse move over element</h3>
            <div className='mt-5'>
                <h3>On Mouse move</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>
                        {mouseMoveOverAction}
                    </button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <ul className='list-none'>
                            <li
                                className='p-1 hover:bg-gray-200 cursor-pointer'
                                onClick={() => { setMouseMoveOverAction("Select"); setActionDropdownVisible1(false); }}
                            >
                                Select
                            </li>
                            <li
                                className='p-1 hover:bg-gray-200 cursor-pointer'
                                onClick={() => { setMouseMoveOverAction("Play mouse animation"); setActionDropdownVisible1(false); }}
                            >
                                Play mouse animation
                            </li>
                        </ul>
                    </div>
                )}

                {mouseMoveOverAction === "Play mouse animation" && (
                    <div>
                        <div className='flex items-center justify-between'>
                            <p className="text-black text-base">Mouse animations</p>
                            <button onClick={() => setMouseAnimationsOpen(true)}>+</button>
                        </div>

                        {mouseAnimationsOpen && (
                            <div className='absolute w-custom bg-white left-0 top-0 h-screen p-2 border border-black border-solid z-10'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black text-base'>
                                        <input type="text" placeholder="Search animation..." />
                                    </p>
                                    <button className='p-2' onClick={() => setMouseAnimationsOpen(false)}>
                                        Done
                                    </button>
                                </div>
                                <div className='mt-2'>
                                    <h3 className='font-semibold text-base'>Mouse X action</h3>
                                    {mouseXActions.map((action, index) => (
                                        <div key={index} className='flex items-center justify-between mt-2'>
                                            <input
                                                type="text"
                                                placeholder="Breakpoint"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.breakpoint}
                                                onChange={(e) => handleMouseXChange(index, 'breakpoint', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Animation"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.animation}
                                                onChange={(e) => handleMouseXChange(index, 'animation', e.target.value)}
                                            />
                                            <button onClick={() => deleteMouseXAction(index)} className='p-1'>-</button>
                                        </div>
                                    ))}
                                    <button onClick={addMouseXAction} className='mt-2 p-1'>Add</button>
                                    <button onClick={() => setTimedAnimationX(true)}>+</button>
                                    {timedAnimationX && (
                                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                                            <div className='flex items-center justify-between'>
                                                <h3>Timed Animation (X)</h3>
                                                <button onClick={() => setTimedAnimationX(false)} className='p-2'>x</button>
                                            </div>
                                            <button onClick={() => setTimedAnimationDropdownVisibleX(!isTimedAnimationDropdownVisibleX)} className='mt-2 p-1'>+</button>
                                            {isTimedAnimationDropdownVisibleX && (
                                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                                    {Object.keys(animations).map((category, idx) => (
                                                        <div key={idx}>
                                                            <h4 className='font-bold'>{category}</h4>
                                                            <ul className='list-none'>
                                                                {animations[category].map((action, subIdx) => (
                                                                    <li
                                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                                        key={subIdx}
                                                                        onClick={() => handleTimedAnimationSelectionX(action, category)}
                                                                    >
                                                                        {action}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className='p-2'>
                                                {selectedAnimation1 && <TimedAnimation animationType={selectedAnimationType1} animation={selectedAnimation1} />}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <h3 className='font-semibold text-base'>Mouse Y action</h3>
                                    {mouseYActions.map((action, index) => (
                                        <div key={index} className='flex items-center justify-between mt-2'>
                                            <input
                                                type="text"
                                                placeholder="Breakpoint"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.breakpoint}
                                                onChange={(e) => handleMouseYChange(index, 'breakpoint', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Animation"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.animation}
                                                onChange={(e) => handleMouseYChange(index, 'animation', e.target.value)}
                                            />
                                            <button onClick={() => deleteMouseYAction(index)} className='p-1'>-</button>
                                        </div>
                                    ))}
                                    <button onClick={addMouseYAction} className='mt-2 p-1'>Add</button>
                                    <button onClick={() => setTimedAnimationY(true)}>+</button>
                                    {timedAnimationY && (
                                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                                            <div className='flex items-center justify-between'>
                                                <h3>Timed Animation (Y)</h3>
                                                <button onClick={() => setTimedAnimationY(false)} className='p-2'>x</button>
                                            </div>
                                            <button onClick={() => setTimedAnimationDropdownVisibleY(!isTimedAnimationDropdownVisibleY)} className='mt-2 p-1'>+</button>
                                            {isTimedAnimationDropdownVisibleY && (
                                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                                    {Object.keys(animations).map((category, idx) => (
                                                        <div key={idx}>
                                                            <h4 className='font-bold'>{category}</h4>
                                                            <ul className='list-none'>
                                                                {animations[category].map((action, subIdx) => (
                                                                    <li
                                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                                        key={subIdx}
                                                                        onClick={() => handleTimedAnimationSelectionY(action, category)}
                                                                    >
                                                                        {action}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className='p-2'>
                                                {selectedAnimation2 && <TimedAnimation animationType={selectedAnimationType2} animation={selectedAnimation2} />}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className='mt-5'>
                            <p className="text-black text-base font-semibold">Animation Reseting State</p>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-black text-base">MouseX</p>
                                    <input type="text" className='w-2/5' />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-black text-base">MouseY</p>
                                    <input type="text" className='w-2/5' />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-black text-base">Smoothing</p>
                                    <input type="text" className='w-2/5' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <TriggerAction />
        </div>
    );
};

const ScrollingInView = () => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [mouseMoveOverAction, setMouseMoveOverAction] = useState("Select");
    const [mouseAnimationsOpen, setMouseAnimationsOpen] = useState(false);
    const [mouseXActions, setMouseXActions] = useState([{ breakpoint: '', animation: '' }]);
    const [mouseYActions, setMouseYActions] = useState([{ breakpoint: '', animation: '' }]);
    const [isTimedAnimationDropdownVisible, setTimedAnimationDropdownVisible] = useState(false);
    const [selectedAnimationType, setSelectedAnimationType] = useState('');
    const [selectedAnimation, setSelectedAnimation] = useState('');

    const handleMouseXChange = (index, field, value) => {
        const updatedActions = [...mouseXActions];
        updatedActions[index][field] = value;
        setMouseXActions(updatedActions);
    };

    const handleMouseYChange = (index, field, value) => {
        const updatedActions = [...mouseYActions];
        updatedActions[index][field] = value;
        setMouseYActions(updatedActions);
    };

    const addMouseXAction = () => setMouseXActions([...mouseXActions, { breakpoint: '', animation: '' }]);
    const addMouseYAction = () => setMouseYActions([...mouseYActions, { breakpoint: '', animation: '' }]);

    const deleteMouseXAction = (index) => setMouseXActions(mouseXActions.filter((_, i) => i !== index));
    const deleteMouseYAction = (index) => setMouseYActions(mouseYActions.filter((_, i) => i !== index));

    const handleTimedAnimationSelection = (action, category) => {
        setSelectedAnimation(action);
        setSelectedAnimationType(category);
        setTimedAnimationDropdownVisible(false);
    };

    return (
        <div>
            <h3>While Scrolling in View</h3>
            <div className='mt-5'>
                <h3>On Scroll</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>{mouseMoveOverAction}</button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <div>
                            <ul className='list-none'>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setMouseMoveOverAction("Select"); setActionDropdownVisible1(false) }}>
                                    Select
                                </li>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setMouseMoveOverAction("Play scroll animation"); setActionDropdownVisible1(false) }}>
                                    Play scroll animation
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {mouseMoveOverAction === "Play scroll animation" && (
                    <div>
                        <div className="animation-boundaries">
                            <p className="text-black text-base font-semibold">Animation Boundaries</p>
                            <div className="boundary-section">
                                <p className="text-black text-base font-semibold">0%</p>
                                <div className="controls">
                                    <button>Starts Entering</button>
                                    <button>Is Fully Visible</button>
                                    <input type="checkbox" id="offset-start" />
                                    <label htmlFor="offset-start">Add Offset</label>
                                </div>
                            </div>
                            <div className="boundary-section">
                                <p className="text-black text-base font-semibold">100%</p>
                                <div className="controls">
                                    <button>Starts Entering</button>
                                    <button>Is Fully Visible</button>
                                    <input type="checkbox" id="offset-end" />
                                    <label htmlFor="offset-end">Add Offset</label>
                                </div>
                            </div>
                        </div>


                        <div className='flex items-center justify-between '>
                            <p className="text-black text-base">Scroll animations</p>
                            <button onClick={() => setMouseAnimationsOpen(true)}>+</button>
                        </div>

                        {mouseAnimationsOpen && (
                            <div className='absolute w-custom bg-white left-0 top-0 h-screen p-2 border border-black border-solid'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black text-base'>
                                        <input type="text" />
                                    </p>
                                    <button className='p-2' onClick={() => setMouseAnimationsOpen(false)}>
                                        Done
                                    </button>
                                </div>
                                <div className='mt-2'>
                                    <h3 className='font-semibold text-base'>Scroll action</h3>
                                    {mouseYActions.map((action, index) => (
                                        <div key={index} className='flex items-center justify-between mt-2'>
                                            <input
                                                type="text"
                                                placeholder="Breakpoint"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.breakpoint}
                                                onChange={(e) => handleMouseYChange(index, 'breakpoint', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Animation"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.animation}
                                                onChange={(e) => handleMouseYChange(index, 'animation', e.target.value)}
                                            />
                                            <button onClick={() => deleteMouseYAction(index)} className='p-1'>-</button>
                                        </div>
                                    ))}
                                    <button onClick={addMouseYAction} className='mt-2 p-1'>Add</button>
                                </div>
                            </div>
                        )}

                        <div className='mt-5'>
                            <p className="text-black text-base font-semibold">Animation Reseting State</p>

                            <div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-black text-base">Smoothing</p>
                                    <input type="text" className='w-2/5' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {mouseAnimationsOpen && (
                    <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid'>
                        <div className='flex items-center justify-between'>
                            <h3>Timed Animation</h3>
                            <button onClick={() => setMouseAnimationsOpen(false)} className='p-2'>x</button>
                        </div>
                        <button onClick={() => setTimedAnimationDropdownVisible(!isTimedAnimationDropdownVisible)} className='mt-2 p-1'>+</button>
                        {isTimedAnimationDropdownVisible && (
                            <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                {Object.keys(animations).map((category, idx) => (
                                    <div key={idx}>
                                        <h4 className='font-bold'>{category}</h4>
                                        <ul className='list-none'>
                                            {animations[category].map((action, subIdx) => (
                                                <li
                                                    className='p-1 hover:bg-gray-200 cursor-pointer'
                                                    key={subIdx}
                                                    onClick={() => handleTimedAnimationSelection(action, category)}
                                                >
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='p-2'>
                            {selectedAnimation && <TimedAnimation animationType={selectedAnimationType} animation={selectedAnimation} />}
                        </div>
                    </div>
                )}
            </div>
            <TriggerAction />
        </div>
    );
};

const MouseMoveInViewport = () => {
    const [isActionDropdownVisible, setActionDropdownVisible] = useState(false);
    const [actionType, setActionType] = useState('Select');
    const [mouseAnimationsOpen, setMouseAnimationsOpen] = useState(false);
    const [mouseXActions, setMouseXActions] = useState([{ breakpoint: '', animation: '' }]);
    const [mouseYActions, setMouseYActions] = useState([{ breakpoint: '', animation: '' }]);
    const [timedAnimationX, setTimedAnimationX] = useState(false);
    const [timedAnimationY, setTimedAnimationY] = useState(false);
    const [isTimedAnimationDropdownVisibleX, setTimedAnimationDropdownVisibleX] = useState(false);
    const [isTimedAnimationDropdownVisibleY, setTimedAnimationDropdownVisibleY] = useState(false);
    const [selectedAnimationX, setSelectedAnimationX] = useState('');
    const [selectedAnimationTypeX, setSelectedAnimationTypeX] = useState('');
    const [selectedAnimationY, setSelectedAnimationY] = useState('');
    const [selectedAnimationTypeY, setSelectedAnimationTypeY] = useState('');

    const handleMouseXChange = (index, field, value) => {
        const updatedActions = [...mouseXActions];
        updatedActions[index][field] = value;
        setMouseXActions(updatedActions);
    };

    const handleMouseYChange = (index, field, value) => {
        const updatedActions = [...mouseYActions];
        updatedActions[index][field] = value;
        setMouseYActions(updatedActions);
    };

    const addMouseXAction = () => setMouseXActions([...mouseXActions, { breakpoint: '', animation: '' }]);
    const addMouseYAction = () => setMouseYActions([...mouseYActions, { breakpoint: '', animation: '' }]);

    const deleteMouseXAction = (index) => setMouseXActions(mouseXActions.filter((_, i) => i !== index));
    const deleteMouseYAction = (index) => setMouseYActions(mouseYActions.filter((_, i) => i !== index));

    const handleTimedAnimationSelectionX = (action, category) => {
        setSelectedAnimationX(action);
        setSelectedAnimationTypeX(category);
        setTimedAnimationDropdownVisibleX(false);
    };

    const handleTimedAnimationSelectionY = (action, category) => {
        setSelectedAnimationY(action);
        setSelectedAnimationTypeY(category);
        setTimedAnimationDropdownVisibleY(false);
    };

    return (
        <div>
            <h3>Mouse Move in Viewport</h3>
            <div className='mt-5'>
                <h3>On Move</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible(!isActionDropdownVisible)}>{actionType}</button>
                </div>
                {isActionDropdownVisible && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <div>
                            <ul className='list-none'>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setActionType("Select"); setActionDropdownVisible(false) }}>
                                    Select
                                </li>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setActionType("Custom"); setActionDropdownVisible(false) }}>
                                    Custom
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {actionType === "Custom" && (
                    <div>
                        <div className='flex items-center justify-between '>
                            <p className="text-black text-base">Mouse animations</p>
                            <button onClick={() => setMouseAnimationsOpen(true)}>+</button>
                        </div>

                        {mouseAnimationsOpen && (
                            <div className='absolute w-custom bg-white left-0 top-0 h-screen p-2 border border-black border-solid'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black text-base'>
                                        <input type="text" placeholder="Search animation..." />
                                    </p>
                                    <button className='p-2' onClick={() => setMouseAnimationsOpen(false)}>
                                        Done
                                    </button>
                                </div>
                                <div className='mt-2'>
                                    <h3 className='font-semibold text-base'>Mouse X action</h3>
                                    {mouseXActions.map((action, index) => (
                                        <div key={index} className='flex items-center justify-between mt-2'>
                                            <input
                                                type="text"
                                                placeholder="Breakpoint"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.breakpoint}
                                                onChange={(e) => handleMouseXChange(index, 'breakpoint', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Animation"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.animation}
                                                onChange={(e) => handleMouseXChange(index, 'animation', e.target.value)}
                                            />
                                            <button onClick={() => deleteMouseXAction(index)} className='p-1'>-</button>
                                        </div>
                                    ))}
                                    <button onClick={addMouseXAction} className='mt-2 p-1'>Add</button>
                                    <button onClick={() => setTimedAnimationX(true)}>+</button>
                                    {timedAnimationX && (
                                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                                            <div className='flex items-center justify-between'>
                                                <h3>Timed Animation (X)</h3>
                                                <button onClick={() => setTimedAnimationX(false)} className='p-2'>x</button>
                                            </div>
                                            <button onClick={() => setTimedAnimationDropdownVisibleX(!isTimedAnimationDropdownVisibleX)} className='mt-2 p-1'>+</button>
                                            {isTimedAnimationDropdownVisibleX && (
                                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                                    {/* Assuming animations is an object with categories as keys */}
                                                    {Object.keys(animations).map((category, idx) => (
                                                        <div key={idx}>
                                                            <h4 className='font-bold'>{category}</h4>
                                                            <ul className='list-none'>
                                                                {animations[category].map((action, subIdx) => (
                                                                    <li
                                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                                        key={subIdx}
                                                                        onClick={() => handleTimedAnimationSelectionX(action, category)}
                                                                    >
                                                                        {action}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className='p-2'>
                                                {selectedAnimationX && <TimedAnimation animationType={selectedAnimationTypeX} animation={selectedAnimationX} />}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <h3 className='font-semibold text-base'>Mouse Y action</h3>
                                    {mouseYActions.map((action, index) => (
                                        <div key={index} className='flex items-center justify-between mt-2'>
                                            <input
                                                type="text"
                                                placeholder="Breakpoint"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.breakpoint}
                                                onChange={(e) => handleMouseYChange(index, 'breakpoint', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Animation"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.animation}
                                                onChange={(e) => handleMouseYChange(index, 'animation', e.target.value)}
                                            />
                                            <button onClick={() => deleteMouseYAction(index)} className='p-1'>-</button>
                                        </div>
                                    ))}
                                    <button onClick={addMouseYAction} className='mt-2 p-1'>Add</button>
                                    <button onClick={() => setTimedAnimationY(true)}>+</button>
                                    {timedAnimationY && (
                                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                                            <div className='flex items-center justify-between'>
                                                <h3>Timed Animation (Y)</h3>
                                                <button onClick={() => setTimedAnimationY(false)} className='p-2'>x</button>
                                            </div>
                                            <button onClick={() => setTimedAnimationDropdownVisibleY(!isTimedAnimationDropdownVisibleY)} className='mt-2 p-1'>+</button>
                                            {isTimedAnimationDropdownVisibleY && (
                                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                                    {/* Assuming animations is an object with categories as keys */}
                                                    {Object.keys(animations).map((category, idx) => (
                                                        <div key={idx}>
                                                            <h4 className='font-bold'>{category}</h4>
                                                            <ul className='list-none'>
                                                                {animations[category].map((action, subIdx) => (
                                                                    <li
                                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                                        key={subIdx}
                                                                        onClick={() => handleTimedAnimationSelectionY(action, category)}
                                                                    >
                                                                        {action}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className='p-2'>
                                                {selectedAnimationY && <TimedAnimation animationType={selectedAnimationTypeY} animation={selectedAnimationY} />}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <TriggerAction />
        </div>
    );
};

const PageIsScrolling = () => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [mouseMoveOverAction, setMouseMoveOverAction] = useState("Select");
    const [mouseAnimationsOpen, setMouseAnimationsOpen] = useState(false);
    const [mouseYActions, setMouseYActions] = useState([{ breakpoint: '', animation: '' }]);

    // Timed animation state
    const [timedAnimation, setTimedAnimation] = useState(false);
    const [isTimedAnimationDropdownVisible, setTimedAnimationDropdownVisible] = useState(false);
    const [selectedAnimation, setSelectedAnimation] = useState('');
    const [selectedAnimationType, setSelectedAnimationType] = useState('');

    const handleMouseYChange = (index, field, value) => {
        const updatedActions = [...mouseYActions];
        updatedActions[index][field] = value;
        setMouseYActions(updatedActions);
    };

    const addMouseYAction = () => setMouseYActions([...mouseYActions, { breakpoint: '', animation: '' }]);
    const deleteMouseYAction = (index) => setMouseYActions(mouseYActions.filter((_, i) => i !== index));

    const handleTimedAnimationSelection = (action, category) => {
        setSelectedAnimation(action);
        setSelectedAnimationType(category);
        setTimedAnimationDropdownVisible(false);
    };

    return (
        <div>
            <h3>While page is scrolling</h3>
            <div className='mt-5'>
                <h3>On Scroll</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>{mouseMoveOverAction}</button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <div>
                            <ul className='list-none'>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setMouseMoveOverAction("Select"); setActionDropdownVisible1(false) }}>
                                    Select
                                </li>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setMouseMoveOverAction("Play scroll animation"); setActionDropdownVisible1(false) }}>
                                    Play scroll animation
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {mouseMoveOverAction === "Play scroll animation" && (
                    <div>

                        <div className='flex items-center justify-between '>
                            <p className="text-black text-base">Scroll animations</p>
                            <button onClick={() => setMouseAnimationsOpen(true)}>+</button>
                        </div>

                        {mouseAnimationsOpen && (
                            <div className='absolute w-custom bg-white left-0 top-0 h-screen p-2 border border-black border-solid'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black text-base'>
                                        <input type="text" placeholder="Search animation..." />
                                    </p>
                                    <button className='p-2' onClick={() => setMouseAnimationsOpen(false)}>
                                        Done
                                    </button>
                                </div>
                                <div className='mt-2'>
                                    <h3 className='font-semibold text-base'>Scroll action</h3>
                                    {mouseYActions.map((action, index) => (
                                        <div key={index} className='flex items-center justify-between mt-2'>
                                            <input
                                                type="text"
                                                placeholder="Breakpoint"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.breakpoint}
                                                onChange={(e) => handleMouseYChange(index, 'breakpoint', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Animation"
                                                className='border p-1 w-1/3 mr-2'
                                                value={action.animation}
                                                onChange={(e) => handleMouseYChange(index, 'animation', e.target.value)}
                                            />
                                            <button onClick={() => deleteMouseYAction(index)} className='p-1'>-</button>
                                        </div>
                                    ))}
                                    <button onClick={addMouseYAction} className='mt-2 p-1'>Add</button>
                                    <button onClick={() => setTimedAnimation(true)}>+</button>
                                    {timedAnimation && (
                                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                                            <div className='flex items-center justify-between'>
                                                <h3>Timed Animation</h3>
                                                <button onClick={() => setTimedAnimation(false)} className='p-2'>x</button>
                                            </div>
                                            <button onClick={() => setTimedAnimationDropdownVisible(!isTimedAnimationDropdownVisible)} className='mt-2 p-1'>+</button>
                                            {isTimedAnimationDropdownVisible && (
                                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                                    {/* Assuming animations is an object with categories as keys */}
                                                    {Object.keys(animations).map((category, idx) => (
                                                        <div key={idx}>
                                                            <h4 className='font-bold'>{category}</h4>
                                                            <ul className='list-none'>
                                                                {animations[category].map((action, subIdx) => (
                                                                    <li
                                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                                        key={subIdx}
                                                                        onClick={() => handleTimedAnimationSelection(action, category)}
                                                                    >
                                                                        {action}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className='p-2'>
                                                {selectedAnimation && <TimedAnimation animationType={selectedAnimationType} animation={selectedAnimation} />}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className='mt-5'>
                            <p className="text-black text-base font-semibold">Animation Reseting State</p>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-black text-base">Smoothing</p>
                                    <input type="text" className='w-2/5' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <TriggerAction />
        </div>
    );
};

const PageLoad = () => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [isActionDropdownVisible2, setActionDropdownVisible2] = useState(false);
    const [pageStartsLoading, setPageStartsLoading] = useState("Select");
    const [pageFinishesLoading, setPageFinishesLoading] = useState("Select");
    const [timedAnimationOpen1, setTimedAnimationOpen1] = useState(false);
    const [timedAnimationOpen2, setTimedAnimationOpen2] = useState(false);
    const [isTimedAnimationDropdownVisible1, setTimedAnimationDropdownVisible1] = useState(false);
    const [isTimedAnimationDropdownVisible2, setTimedAnimationDropdownVisible2] = useState(false);
    const [selectedAnimationType, setSelectedAnimationType] = useState('');
    const [selectedAnimation, setSelectedAnimation] = useState('');

    const handleActionClick = (action, category, setDropdownVisible) => {
        setSelectedAnimation(action);
        setSelectedAnimationType(category);
        setDropdownVisible(false);
    };

    return (
        <div>
            <h3>Page Load</h3>
            <div className='mt-5'>
                <h3>When page starts loading</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>{pageStartsLoading}</button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <div>
                            <ul className='list-none'>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageStartsLoading("Select"); setActionDropdownVisible1(false) }}>
                                    Select
                                </li>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageStartsLoading("Start an animation"); setActionDropdownVisible1(false) }}>
                                    Start an animation
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {
                    pageStartsLoading === "Start an animation" && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animations</p>
                                <button onClick={() => setTimedAnimationOpen1(true)}>+</button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" />
                                <label htmlFor="">Loop</label>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen1 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen1(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible1(!isTimedAnimationDropdownVisible1)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible1 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleActionClick(action, category, setTimedAnimationDropdownVisible1)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='p-2'>
                                {selectedAnimation && <TimedAnimation animationType={selectedAnimationType} animation={selectedAnimation} />}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='mt-5'>
                <h3>When page finishes loading</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible2(!isActionDropdownVisible2)}>{pageFinishesLoading}</button>
                </div>
                {isActionDropdownVisible2 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <div>
                            <ul className='list-none'>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageFinishesLoading("Select"); setActionDropdownVisible2(false) }}>
                                    Select
                                </li>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageFinishesLoading("Start an animation"); setActionDropdownVisible2(false) }}>
                                    Start an animation
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {
                    pageFinishesLoading === "Start an animation" && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animations</p>
                                <button onClick={() => setTimedAnimationOpen2(true)}>+</button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" />
                                <label htmlFor="">Loop</label>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen2 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen2(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible2(!isTimedAnimationDropdownVisible2)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible2 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleActionClick(action, category, setTimedAnimationDropdownVisible2)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className='p-2'>
                                {selectedAnimation && <TimedAnimation animationType={selectedAnimationType} animation={selectedAnimation} />}
                            </div>
                        </div>
                    )
                }

            </div>
            <TriggerAction />
        </div>
    );
};

const PageScrolled = () => {
    const [isActionDropdownVisible1, setActionDropdownVisible1] = useState(false);
    const [isActionDropdownVisible2, setActionDropdownVisible2] = useState(false);
    const [pageStartsLoading, setPageStartsLoading] = useState("Select");
    const [pageFinishesLoading, setPageFinishesLoading] = useState("Select");
    const [timedAnimationOpen1, setTimedAnimationOpen1] = useState(false);
    const [timedAnimationOpen2, setTimedAnimationOpen2] = useState(false);
    const [isTimedAnimationDropdownVisible1, setTimedAnimationDropdownVisible1] = useState(false);
    const [isTimedAnimationDropdownVisible2, setTimedAnimationDropdownVisible2] = useState(false);
    const [selectedAnimationType, setSelectedAnimationType] = useState('');
    const [selectedAnimation, setSelectedAnimation] = useState('');

    const handleActionClick = (action, category, setDropdownVisible) => {
        setSelectedAnimation(action);
        setSelectedAnimationType(category);
        setDropdownVisible(false);
    };

    return (
        <div>
            <h3>Page Scrolled</h3>
            <div className='mt-5'>
                <h3>When Scrolled Up</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible1(!isActionDropdownVisible1)}>{pageStartsLoading}</button>
                </div>
                {isActionDropdownVisible1 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <div>
                            <ul className='list-none'>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageStartsLoading("Select"); setActionDropdownVisible1(false) }}>
                                    Select
                                </li>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageStartsLoading("Start an animation"); setActionDropdownVisible1(false) }}>
                                    Start an animation
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {
                    pageStartsLoading === "Start an animation" && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animations</p>
                                <button onClick={() => setTimedAnimationOpen1(true)}>+</button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="text" />
                                <label htmlFor="">Offset</label>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen1 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid z-10'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen1(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible1(!isTimedAnimationDropdownVisible1)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible1 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleActionClick(action, category, setTimedAnimationDropdownVisible1)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='p-2'>
                                {selectedAnimation && <TimedAnimation animationType={selectedAnimationType} animation={selectedAnimation} />}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='mt-5'>
                <h3>When scrolled down</h3>
                <div className='flex items-center justify-between border border-solid border-black p-2'>
                    <p className='text-black text-base'>Action</p>
                    <button onClick={() => setActionDropdownVisible2(!isActionDropdownVisible2)}>{pageFinishesLoading}</button>
                </div>
                {isActionDropdownVisible2 && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <div>
                            <ul className='list-none'>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageFinishesLoading("Select"); setActionDropdownVisible2(false) }}>
                                    Select
                                </li>
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' onClick={() => { setPageFinishesLoading("Start an animation"); setActionDropdownVisible2(false) }}>
                                    Start an animation
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {
                    pageFinishesLoading === "Start an animation" && (
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className='text-black text-base'>Timed Animations</p>
                                <button onClick={() => setTimedAnimationOpen2(true)}>+</button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="text" />
                                <label htmlFor="">Offset</label>
                            </div>
                        </div>
                    )
                }

                {
                    timedAnimationOpen2 && (
                        <div className='absolute top-0 left-0 h-screen w-custom bg-white p-2 border border-black border-solid'>
                            <div className='flex items-center justify-between'>
                                <h3>Timed Animation</h3>
                                <button onClick={() => setTimedAnimationOpen2(false)} className='p-2'>x</button>
                            </div>
                            <button onClick={() => setTimedAnimationDropdownVisible2(!isTimedAnimationDropdownVisible2)} className='mt-2 p-1'>+</button>
                            {isTimedAnimationDropdownVisible2 && (
                                <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500 z-10'>
                                    {Object.keys(animations).map((category, idx) => (
                                        <div key={idx}>
                                            <h4 className='font-bold'>{category}</h4>
                                            <ul className='list-none'>
                                                {animations[category].map((action, subIdx) => (
                                                    <li
                                                        className='p-1 hover:bg-gray-200 cursor-pointer'
                                                        key={subIdx}
                                                        onClick={() => handleActionClick(action, category, setTimedAnimationDropdownVisible2)}
                                                    >
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className='p-2'>
                                {selectedAnimation && <TimedAnimation animationType={selectedAnimationType} animation={selectedAnimation} />}
                            </div>
                        </div>
                    )
                }

            </div>
            <TriggerAction />
        </div>
    );
};


const Interactions = () => {
    const [isElementDropdownVisible, setElementDropdownVisible] = useState(false);
    const [isPageDropdownVisible, setPageDropdownVisible] = useState(false);
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [showDetailView, setShowDetailView] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const triggers = {
        element: ["Mouse Click", "Mouse Hover", "Mouse move over element", "Scroll into view", "While scrolling in view"],
        page: ["Mouse move in viewport", "While page is scrolling", "Page load", "Page scrolled"]
    };

    const handleTriggerClick = (trigger) => {
        setSelectedTrigger(trigger);
        setShowDetailView(true);
        setElementDropdownVisible(false);
        setPageDropdownVisible(false);
    };

    const handleActionClick = (action, category) => {
        setSelectedAction(action);
        setSelectedCategory(category);
    };

    const closeDetailView = () => {
        setShowDetailView(false);
        setSelectedTrigger(null);
        setSelectedAction(null);
        setSelectedCategory(null);
    };

    const renderDetailView = () => {
        if (selectedAction && selectedCategory) {
            return (
                <ActionDetails
                    action={selectedAction}
                    category={selectedCategory}
                    closeActionView={() => setSelectedAction(null)}
                />
            );
        }

        switch (selectedTrigger) {
            case 'Mouse Click':
                return <MouseClickDetails onActionClick={handleActionClick} />;
            case 'Mouse Hover':
                return <MouseHoverDetails onActionClick={handleActionClick} />;
            case 'Mouse move in viewport':
                return <MouseMoveInViewport />;
            case 'Mouse move over element':
                return <MouseMoverOverElement />;
            case 'Scroll into view':
                return <ScrollInView onActionClick={handleActionClick} />;
            case 'While scrolling in view':
                return <ScrollingInView />;
            case 'While page is scrolling':
                return <PageIsScrolling />;
            case 'Page load':
                return <PageLoad />;
            case 'Page scrolled':
                return <PageScrolled />
            default:
                return null;
        }
    };

    return (
        <section className='relative h-screen w-custom border border-black border-solid'>
            <h3>Interactions</h3>

            <div className='h-interactionHeight border border-black m-2 border-solid p-1 flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
                    <h4 className='font-normal'>Element Trigger</h4>
                    <button onClick={() => setElementDropdownVisible(!isElementDropdownVisible)}>+</button>
                </div>
                <div className='w-full h-4/5 bg-slate-300'>
                    <p className='m-2 text-black text-base'>
                        Element trigger <br />
                        Select an element on the canvas,
                        then click + above to animate the
                        selected element when a user
                        interacts with it (such as on hover or
                        click).
                    </p>
                </div>
                {isElementDropdownVisible && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <ul className='list-none'>
                            {triggers.element.map((val, idx) => (
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' key={idx} onClick={() => handleTriggerClick(val)}>
                                    {val}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className='h-interactionHeight border border-black m-2 border-solid p-1 flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
                    <h4 className='font-normal'>Page Trigger</h4>
                    <button onClick={() => setPageDropdownVisible(!isPageDropdownVisible)}>+</button>
                </div>
                <div className='w-full h-4/5 bg-slate-300'>
                    <p className='m-2 text-black text-base'>
                        Page trigger<br />
                        Click + above to create an animation
                        triggered by a change in the page's
                        state (such as on load).
                    </p>
                </div>
                {isPageDropdownVisible && (
                    <div className='absolute bg-white mt-1 p-2 border border-solid border-slate-500'>
                        <ul className='list-none'>
                            {triggers.page.map((val, idx) => (
                                <li className='p-1 hover:bg-gray-200 cursor-pointer' key={idx} onClick={() => handleTriggerClick(val)}>
                                    {val}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {showDetailView && (
                <div className='absolute inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-white'>
                    <div className='bg-white p-6 border border-solid border-slate-500 relative h-screen w-custom'>
                        <button onClick={closeDetailView} className='absolute top-0 right-0 p-2'>×</button>
                        {renderDetailView()}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Interactions;