import React, { useState } from 'react';
import './App.css';
import { Trash } from 'lucide-react';

function App() {
  const [animationName, setAnimationName] = useState('');
  const [keyframes, setKeyframes] = useState([{ percent: '', style: '' }]);
  const [allAnimation, setAllAnimation] = useState({});
  const [apply, setApply] = useState('');

  const handleAddKeyframeField = () => {
    setKeyframes(prevKeyframes => [
      ...prevKeyframes,
      { percent: '', style: '' }
    ]);
  };

  const handleRemoveKeyframeField = (index) => {
    setKeyframes(prevKeyframes => prevKeyframes.filter((_, i) => i !== index));
  };

  const handleKeyframeChange = (index, field, value) => {
    setKeyframes(prevKeyframes =>
      prevKeyframes.map((keyframe, i) =>
        i === index ? { ...keyframe, [field]: value } : keyframe
      )
    );
  };

  const handleAddAnimation = () => {
    try {
      convertToKeyframes(keyframes);
      console.log(allAnimation)
    } catch (err) {
      console.error(err);
    }
  };

  const convertToKeyframes = (keyframeArray) => {
    let keyframesString = '';
    for (const keyframe of keyframeArray) {
      const styleObj = JSON.parse(keyframe.style);
      keyframesString += `${keyframe.percent}% {`;
      for (const property in styleObj) {
        const hyphenatedProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();
        keyframesString += `${hyphenatedProperty}: ${styleObj[property]}; `;
      }
      keyframesString += `} `;
    }

    const animationString = `@keyframes ${animationName} { ${keyframesString} }`;
    setAllAnimation(prev => ({
      ...prev,
      [animationName]: animationString
    }));
    setKeyframes([{ percent: '', style: '' }]);
    setAnimationName('');
  };

  function applyAnimationToClass(str) {
    const [animationName, className] = str.split(',').map(s => s.trim());
    const animation = allAnimation[animationName];
    if (!animation) {
      console.error(`Animation '${animationName}' not found.`);
      return;
    }

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`.${className} { animation: ${animationName} 1s infinite; }`, styleSheet.cssRules.length);
    styleSheet.insertRule(animation, styleSheet.cssRules.length);
  }

  return (
    <div className="App p-10">
      <h1 className='text-4xl text-center m-10 mt-0 text-red-800 font-bold'>Animation</h1>
      <div className='mb-10'>
        <div className='flex justify-between'>
          <div>
            <input
              className='mb-5 bg-slate-100 p-2 border border-slate-400'
              type="text"
              placeholder="Enter animation name"
              value={animationName}
              onChange={(e) => setAnimationName(e.target.value)}
            />
            <br />
            <div>
              {keyframes.map((keyframe, index) => (
                <div key={index} className="flex gap-10 align-middle justify-center mb-4">
                  <input
                    type="text"
                    placeholder="Enter percent"
                    className='bg-slate-100 p-2 border border-slate-400'
                    value={keyframe.percent}
                    onChange={(e) => handleKeyframeChange(index, 'percent', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter style"
                    className='bg-slate-100 p-2 border border-slate-400'
                    value={keyframe.style}
                    onChange={(e) => handleKeyframeChange(index, 'style', e.target.value)}
                  />
                  <button onClick={() => handleRemoveKeyframeField(index)}><Trash /></button>
                </div>
              ))}
              <button onClick={handleAddKeyframeField} className='bg-yellow-300 m-5 ml-0 p-1 text-sm pl-2 pr-2 rounded-md'>Add percentage</button>
            </div>
          </div>
          <div className='pr-20 '>
            <h3 className='font-semibold text-xl text-green-700'>All animations</h3>
            {
              Object.keys(allAnimation).map((v) => <div className='font-semibold text-center' key={v}>{v}</div>)
            }
          </div>
        </div>

        <button
          onClick={handleAddAnimation}
          className='p-2 bg-blue-700 text-white rounded-md mt-5'
        >
          Add Animation
        </button>
        <br />
        <br />

        <input
          type="text"
          placeholder="Animation-name, class-name"
          className='bg-slate-100 p-2 border border-slate-400 w-80'
          value={apply}
          onChange={(e) => setApply(e.target.value)}
        />
        <br />

        <button
          onClick={() => { applyAnimationToClass(apply) }}
          className='p-2 bg-blue-700 text-white rounded-md mt-5'
        >
          Apply Animation
        </button>
      </div>

      <span className="myClass">
        Hello
      </span>
    </div>
  );
}

export default App;
