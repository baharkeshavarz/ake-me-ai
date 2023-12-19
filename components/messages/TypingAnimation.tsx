"use client";
import { TypeAnimation } from 'react-type-animation';

interface TypingAnimationProps{
  text: string;
}

const TypingAnimation = ({ text }: TypingAnimationProps) => {
  return (
    <TypeAnimation
    sequence={[
      text,
    ]}
    wrapper="span"
    speed={50}
    style={{ display: 'inline-block' }}
  />
  );
};

export default TypingAnimation;
