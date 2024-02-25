import { gettSettingLogo } from '@/actions/get-setting';
import { useSetting } from '@/hooks/useSetting';
import Image from 'next/image'
import React, { useEffect, useState } from 'react';

interface LogoProps {
    width: number;
    height: number;
}

const Logo = ({ width, height }: LogoProps) => {
  const { projectInfo } = useSetting();
  const [logo, setLogo] = useState("");

    // Find the logo
    useEffect(() => {
      const getSettingLogo = async () => {
        try {
        const response = await gettSettingLogo(projectInfo.id);
        const data = await response.blob();
        const logoUrl = URL.createObjectURL(data);
        setLogo(logoUrl);
        } catch (error) {
          console.log("error", error);
        } 
      };
      getSettingLogo();
    }, [projectInfo]);
  

  return (
    <Image
       src={logo}
       width={width}
       height={height}
       alt="سامانه هوشمند"
   />
  )
}

export default Logo
