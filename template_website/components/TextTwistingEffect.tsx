import React from 'react';
import './TextTwistingEffect.css';

// Define the type for the props
interface TextTwistingEffectProps {
    text: string;
}

const TextTwistingEffect: React.FC<TextTwistingEffectProps> = ({ text }) => {
    return (
        <a href="#" className="text-twisting-effect">
            {text}
        </a>
    );
};

export default TextTwistingEffect;
