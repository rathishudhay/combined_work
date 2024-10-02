import React, { useState } from 'react';

const ManualSpacing = () => {
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState('px');

    const handleSliderChange = (e) => {
        setValue(e.target.value);
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    return (
        <div className="flex items-center p-4 w-custom ml-20 bg-blue-200">
            <div className="flex items-center mr-4">

                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="ml-2 p-2 w-16 border border-gray-300 rounded"
                />
                <select
                    value={unit}
                    onChange={handleUnitChange}
                    className="ml-2 p-2 w-16 border border-gray-300 rounded"
                >
                    <option value="px">px</option>
                    <option value="rem">rem</option>
                    <option value="em">em</option>
                    <option value="%">%</option>
                </select>
            </div>
            <input
                type="range"
                min="0"
                max="200"
                value={value}
                onChange={handleSliderChange}
                className="w-10"
            />
        </div>
    );
};

export default ManualSpacing;
