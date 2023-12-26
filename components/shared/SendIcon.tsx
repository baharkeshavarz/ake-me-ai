"use client";

import { SendHorizontal, StopCircle } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import ContextSelector from "../context/ContextSelector";
import useThemeStore from "@/store/useThemeStore";
import { ContextValues } from "@/types";
import {getChatByFaq, getChatByProfile} from "@/actions/get-chat";
import useMessageStore from "@/hooks/useMessages";
import { getSendButtonColor } from "@/lib/utils";
import { contexts } from "@/constants";

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
    contextType: "",
    contextId: 0,
    hologram: ""
  });
  
  const handleContextClick = () => {
    setShowContext((prevShowContext) => !prevShowContext);
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
    setCanAskQuestion(false);
    // Send first call in chat accordint to the user's selcetion "profile || faq"
    let response: any = null;
    setError(false);
    if (!contextValues.contextType || !contextValues.contextId || !contextValues.hologram || !question) {
        setError(true);
    } else {
      // Add message to list
        addMessage(
          {
            id: "",
            message: question,
            creator: "شما",
          }
        );
      // Call API
      try {
          if (contextValues.contextType === contexts.faq) {
            response = await getChatByFaq(Number(contextValues.contextId), question);
          } else {
            response = await getChatByProfile(Number(contextValues.contextId), question);
          }
          if (response?.data) {
              addMessage(
                {
                  id: response.data.response_id,
                  message: response.data.response,
                  creator: "سیستم",
                }
              );
            }
         } catch (error) {
          setError(true);
         } finally {
            setError(false);
            setQuestion("");
         }
      }
  }

  const handleSendQuestion = async() => {
    addMessage(
      {
        id: "",
        message: question,
        creator: "شما",
      }
    );

    let response: any = null;
    if (contextValues.contextType === contexts.faq) {
      response = await getChatByFaq(Number(contextValues.contextId), question);
    } else {
      response = await getChatByProfile(Number(contextValues.contextId), question);
    }
    if (response?.data) {
      addMessage(
        {
          id: response.data.response_id,
          message: response.data.response,
          creator: "سیستم",
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
          color={getSendButtonColor(theme, question)}
          aria-hidden="true"
          onClick={handleSendQuestion}
        />
     : showContext
        ?  <StopCircle 
              onClick={handleSendClick}
              className="cursor-pointer"
          />
        :  <SendHorizontal
            className="relative top-[1px] ml-1 h-5 w-5 rotate-180 transition-transform duration-200"
            color={theme === "light" ? "#000000" : "#f3f3f3"}
            aria-hidden="true"
            onClick={handleContextClick} 
            />
      }
     error:{error.toString()}
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




