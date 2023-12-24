"use client";

import { SendHorizontal, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ContextSelector from "../context/ContextSelector";
import useThemeStore from "@/store/useThemeStore";
import { ChatFaq, ContextValues } from "@/types";
import { chatFaq } from "@/queries/Chat";
import getChatByFaq from "@/actions/get-chat";

const SendIcon = () => {
  const theme = useThemeStore((state: any) => state.theme);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState(false);

  const [openBox, setOpenBox] = useState(false);
  const [contextValues, setContextValues] = useState<ContextValues>({
    faq: '',
    profile: '',
    hologram: ''
  });
  
  const handleClick = () => {
    setIsClicked((prevStatus) => !prevStatus);
    setOpenBox((prevOpenBox) => !prevOpenBox);
  } 
  const closeBoxOnOutsideClick = (event: any) => {
    if (openBox && !event.target.closest('.optionBox')) {
      setOpenBox(false);
    }
  };

  const handleSendClick = async() => {
    setOpenBox((prevOpenBox) => !prevOpenBox);
    // Send first call in chat accordint to the user's selcetion "profile || faq"
    let response;
    try {
      setError(false);
      if (contextValues.faq) {
        response = await getChatByFaq(Number(contextValues.faq), "ask");
        console.log(response);

      } else {
        response = await getChatByFaq(Number(contextValues.profile), "ask");
      }
      setDataList(response);
     } catch (error) {
      setError(true);
     } finally {
        setError(false);
     }


  }

  useEffect(() => {
    document.addEventListener('click', closeBoxOnOutsideClick);
    return () => {
      document.removeEventListener('click', closeBoxOnOutsideClick);
    };
  }, [openBox]);

  return (
    <>
     {isClicked 
     ? <StopCircle onClick={handleSendClick}/>
     : <SendHorizontal
          className="relative top-[1px] ml-1 h-5 w-5 rotate-180 transition-transform duration-200"
          color={theme === "light" ? "#000000" : "#f3f3f3"}
          aria-hidden="true"
          onClick={handleClick}
         />
     }
     {openBox && <div className="optionBox light-border1 duration-400 shadow-light100_dark200 background-light900_dark400 absolute bottom-16 right-0 w-full p-5 transition-all ease-in-out">
                    <ContextSelector
                       contextValues={contextValues}
                       setContextValues={setContextValues}
                     />
                 </div>
     }
    </>
  )
}
export default SendIcon




