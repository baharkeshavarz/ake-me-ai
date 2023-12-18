import Image from 'next/image'
import React from 'react';

interface LogoProps {
    width: number;
    height: number;
}

const Logo = ({ width, height }: LogoProps) => {
  return (
    <Image
       src="/assets/images/site-logo.svg"
       width={width}
       height={height}
       alt="ask ai"
   />
  )
}

export default Logo
