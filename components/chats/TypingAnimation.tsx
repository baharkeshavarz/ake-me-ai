"use client";

import Typed from 'react-typed';

interface TypingAnimationProps{
  text: string;
  textSpeed?: number;
}

const TypingAnimation = ({ text, textSpeed= 50 }: TypingAnimationProps) => {
  return (
    <Typed
       strings={[text]}
       typeSpeed={textSpeed}
       backSpeed={10}
    />
  );
};

export default TypingAnimation;
