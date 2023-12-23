"use client"

import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import ContextSelector from "../context/ContextSelector";

interface SendIconProps {
  width: number;
  height: number;
}

const SendIcon = ({ width, height }: SendIconProps) => {
  const [openBox, setOpenBox] = useState(false);

  const handleClick = () => setOpenBox((prevOpenBox) => !prevOpenBox);
  const closeBoxOnOutsideClick = (event: any) => {
    if (openBox && !event.target.closest('.your-context-box-class')) {
      setOpenBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeBoxOnOutsideClick);
    return () => {
      document.removeEventListener('click', closeBoxOnOutsideClick);
    };
  }, [openBox]);

  return (
    <div className="realtive">
     <SendHorizontal
      className="relative top-[1px] ml-1 h-5 w-5 rotate-180 transition-transform duration-200"
      aria-hidden="true"
      onClick={handleClick}
     />
     {openBox && <div className="your-context-box-class  light-border1 duration-400 shadow-light100_dark200 background-light900_dark400 absolute bottom-16 right-0 w-full p-5 transition-all ease-in-out">
                   <ContextSelector/>
                 </div>
     }
    </div>
  )
}
export default SendIcon




