"use client";

import { SendHorizontal, StopCircle } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import ContextSelector from "../context/ContextSelector";
import useThemeStore from "@/store/useThemeStore";
import { ContextValues } from "@/types";
import getChatByFaq from "@/actions/get-chat";
import useMessageStore from "@/hooks/useMessages";

interface SendIconProps {
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  setCanAskQuestion: Dispatch<SetStateAction<boolean>>;
}

const SendIcon = ({question, setQuestion, setCanAskQuestion}: SendIconProps) => {
  const theme = useThemeStore((state: any) => state.theme);
  const { chatList, addMessage} = useMessageStore();
  const [showContext, setShowContext] = useState(false);
  const [error, setError] = useState(false);

  const [openBox, setOpenBox] = useState(false);
  const [contextValues, setContextValues] = useState<ContextValues>({
    faq: '',
    profile: '',
    hologram: ''
  });
  
  const handleContextClick = () => {
    setShowContext((prevShowContext) => !prevShowContext);
    setCanAskQuestion(false);
    setOpenBox((prevOpenBox) => !prevOpenBox);
  } 
  
  const closeBoxOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (openBox && !((event.target as HTMLElement).closest('.optionBox'))) {
        setOpenBox(false);
      }
    },
    [openBox, setOpenBox]
  );

  const handleSendClick = async() => {
    setOpenBox((prevOpenBox) => !prevOpenBox);
    // Send first call in chat accordint to the user's selcetion "profile || faq"
    let response: any = null;
    try {
      setError(false);
      if (contextValues.faq) {
        response = await getChatByFaq(Number(contextValues.faq), "ask");
        if (response?.data) {
          addMessage(
            {
              id: response.data.response_id,
              message: response.data.response
            }
          );
        }
      }
     } catch (error) {
      setError(true);
     } finally {
        setError(false);
        setQuestion("");
     }
  }

  const handleSendQuestion = async() => {
    const response = await getChatByFaq(1, question);
    if (response?.data) {
      addMessage(
        {
          id: response.data.response_id,
          message: response.data.response
        }
      );
      setQuestion("");
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeBoxOnOutsideClick);
    return () => {
      document.removeEventListener('click', closeBoxOnOutsideClick);
    };
  }, [openBox, closeBoxOnOutsideClick]);

  return (
    <>
    {chatList.length
      ? <SendHorizontal
          className="relative top-[1px] ml-1 h-5 w-5 rotate-180 transition-transform duration-200"
          color={theme === "light" ? "#000000" : "#f3f3f3"}
          aria-hidden="true"
          onClick={handleSendQuestion}
        />
     : showContext
        ?  <StopCircle onClick={handleSendClick}/>
        :  <SendHorizontal
            className="relative top-[1px] ml-1 h-5 w-5 rotate-180 transition-transform duration-200"
            color={theme === "light" ? "#000000" : "#f3f3f3"}
            aria-hidden="true"
            onClick={handleContextClick} 
            />
      }
    
     {openBox && 
                <div className="optionBox light-border1 duration-400 shadow-light100_dark200 background-light900_dark400 absolute bottom-16 right-0 w-full p-5 transition-all ease-in-out">
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




