import React, { useState, useEffect } from 'react';

const FontUploader = () => {
    const [fontUrl, setFontUrl] = useState('');
    const [fontFile, setFontFile] = useState(null);
    const [fontName, setFontName] = useState('');
    const [fontOptions, setFontOptions] = useState([]);
    const [selectedFont, setSelectedFont] = useState('');
    const [error, setError] = useState('');

    const addFontFromUrl = () => {
        if (fontUrl) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;

            document.head.appendChild(link);

            const url = new URL(fontUrl);
            const fontFamily = url.searchParams.get('family').split(':')[0];

            if (fontFamily) {
                setFontOptions((prevOptions) => [...prevOptions, fontFamily]);
                setFontName(fontFamily);
                setSelectedFont(fontFamily);
                setFontUrl('');
                setError('');
            } else {
                setError('Invalid font URL');
            }
        }
    };

    useEffect(() => {
        if (fontFile) {
            const newFontName = `custom-font-${Date.now()}`;
            const reader = new FileReader();
            reader.onload = (e) => {
                const fontData = e.target.result;
                const newFont = new FontFace(newFontName, `url(http://localhost:3000/file)`);
                newFont.load()
                    .then((loadedFont) => {
                        document.fonts.add(loadedFont);
                        setFontOptions((prevOptions) => [...prevOptions, newFontName]);
                        setFontName(newFontName);
                        setSelectedFont(newFontName);
                        setFontFile(null);
                        setError('');
                    })
                    .catch(err => {
                        setError('Failed to load font from file');
                        console.error("Failed to load font from file:", err);
                    });
            };
            reader.readAsDataURL(fontFile);
        }
    }, [fontFile]);

    const handleFontUrlChange = (e) => {
        setFontUrl(e.target.value);
    };

    const handleFontFileChange = (e) => {
        setFontFile(e.target.files[0]);
    };

    const handleFontSelectChange = (e) => {
        setSelectedFont(e.target.value);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Font Integration</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font URL (JS link or CSS import statement):
                    <input
                        type="text"
                        value={fontUrl}
                        onChange={handleFontUrlChange}
                        placeholder="e.g., https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>
                <button
                    onClick={addFontFromUrl}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add Font
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Font File:
                    <input
                        type="file"
                        onChange={handleFontFileChange}
                        accept=".ttf,.otf,.woff,.woff2"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Font:
                    <select
                        value={selectedFont}
                        onChange={handleFontSelectChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select a font</option>
                        {fontOptions.map((font, index) => (
                            <option key={index} value={font}>
                                {font}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <textarea
                    style={{ fontFamily: selectedFont }}
                    placeholder="Type here to see the selected font"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
            </div>
        </div>
    );
};

export default FontUploader;
