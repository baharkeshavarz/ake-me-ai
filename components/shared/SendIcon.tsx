"use client";

import { SendHorizontal, StopCircle } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import ContextSelector from "../context/ContextSelector";
import useThemeStore from "@/store/useThemeStore";
import { getChatByFaq, getChatByProfile } from "@/actions/get-chat";
import { getSendButtonColor, randomNumberInRange } from "@/lib/utils";
import { configInfo, contexts, messageTypes } from "@/constants";
import { getVoiceByQuestion } from "@/actions/get-voice";
import { useMessageContext } from "@/hooks/useMessageContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { systemChatLoading, systemChatSuccess } from "@/constants/general";
import { useChatNumber } from "@/hooks/useChatNumber";

interface SendIconProps {
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  setCanAskQuestion: Dispatch<SetStateAction<boolean>>;
  chatId: string;
  list: any;
  setList: any;
}

const SendIcon = ({
  question,
  setQuestion,
  setCanAskQuestion,
  chatId,
  list,
  setList,
}: SendIconProps) => {
  const theme = useThemeStore((state: any) => state.theme);
  const {inx, onSet} = useChatNumber();
  const [error, setError] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const { contextValues } = useMessageContext();
  const [itemIndexToUpdate, setItemIndexToUpdate] = useState(0);
  let randId = 0;

  const updateObjectInList = (updatedObject: any, index: number) => {
    // console.log("itemIndexToUpdate in updateObjectInList:::", itemIndexToUpdate);
    setList((prevList: any) =>
      prevList.map((obj: any) => {
        if (obj.id === index) {
          return { ...obj, ...updatedObject };
        }
        return obj;
      })
    );
  };

  const router = useRouter();
  let textNotification = "";
  let userQuestion = question;

  const handleContextClick = () => {
    setOpenBox((prevOpenBox) => !prevOpenBox);
  };

  const closeBoxOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (openBox && !(event.target as HTMLElement).closest(".optionBox")) {
        setOpenBox(false);
      }
    },
    [openBox, setOpenBox]
  );

  const handleSendClick = async () => {
    console.log("handleSendClick")
    randId = randomNumberInRange(100, 1000);
    setCanAskQuestion(false);
    // Send first call in chat accordint to the user's selcetion "profile || faq"
    let response: any = null;
    let voiceResponse: any = null;
    setError(false);

    if (
      !contextValues.contextType ||
      !contextValues.contextId ||
      question === ""
    ) {
      toast.error("زمینه ی سوال و خود سوال رو برام بفرست");
    } else {
      userQuestion = question;
      setCanAskQuestion(true);
      setQuestion("");
      textNotification = toast.loading(systemChatLoading.message);

      setItemIndexToUpdate(randId);
      // Add user's message to list
      setList((prevList: any) => [...prevList, {
        id: "",
        type: messageTypes.text,
        message: userQuestion,
        creator: configInfo.userLabel,
      }]);

      onSet(randId);
      // Call API
      try {
        setList((prevList: any) => [...prevList, {
          id: randId,
          type: messageTypes.text,
          message: "",
          creator: configInfo.systemLabel,
        }]);

        if (contextValues.contextType === contexts.faq) {
          response = await getChatByFaq(
            Number(contextValues.contextId),
            userQuestion
          );
        } else {
          response = await getChatByProfile(
            Number(contextValues.contextId),
            userQuestion
          );
        }

        if (response?.data) {
          updateObjectInList({
            id: response.data.response_id,
            type: messageTypes.text,
            message: response.data.msg,
            creator: configInfo.systemLabel,
          }, randId);

         toast.success(systemChatSuccess.message, {
              id: textNotification,
          });
          router.push(`/chat/${chatId}`);

          // call api for getting the voice
          voiceResponse = await getVoiceByQuestion(response.data.msg);
          if (voiceResponse?.url) {
            setList((prevList: any) => [...prevList, {
              id: voiceResponse!.unique_id,
              type: messageTypes.voice,
              message: "voice",
              creator: configInfo.systemLabel,
            }]);

            setList((prevList: any) => [...prevList, {
              id: voiceResponse!.unique_id,
              type: messageTypes.video,
              message: "video",
              creator: configInfo.systemLabel,
            }]);
          }
        }
      } catch (error) {
        setError(true);
      } finally {
        setError(false);
        setQuestion("");
      }
    }
  };

  const handleSendQuestion = async () => {
    console.log("handleSendQuestion")

    setList((prevList: any) => [...prevList, {
      id: "",
      type: messageTypes.text,
      message: question,
      creator: configInfo.userLabel,
    }]);


    textNotification = toast.loading(systemChatLoading.message);

    let response: any = null;
    let voiceResponse: any = null;
    if (contextValues.contextType === contexts.faq) {
      response = await getChatByFaq(Number(contextValues.contextId), question);
    } else {
      response = await getChatByProfile(
        Number(contextValues.contextId),
        question
      );
    }

    setList((prevList: any) => [...prevList, {
      id: randId,
      type: messageTypes.text,
      message: "",
      creator: configInfo.systemLabel,
    }]);

     if (response?.data) {
      updateObjectInList({
        id: response.data.response_id,
        type: messageTypes.text,
        message: response.data.msg,
        creator: configInfo.systemLabel,
      }, randId);

      // call api for getting the voice
      voiceResponse = await getVoiceByQuestion(response.data.msg);

      toast.success(systemChatSuccess.message, {
        id: textNotification,
      });

      if (voiceResponse?.url) {
        setList((prevList: any) => [...prevList, {
          id: voiceResponse!.unique_id,
          type: messageTypes.voice,
          message: "voice",
          creator: configInfo.systemLabel,
        }]);
        
        setList((prevList: any) => [...prevList, {
          id: voiceResponse!.unique_id,
          type: messageTypes.video,
          message: "video",
          creator: configInfo.systemLabel,
        }]);
              }
      setQuestion("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeBoxOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeBoxOnOutsideClick);
    };
  }, [openBox, closeBoxOnOutsideClick]);

  return (
    <>
      {list.length ? (
        <SendHorizontal
          className="relative top-[1px] ml-1 h-5 w-5 rotate-180 cursor-pointer transition-transform duration-500"
          color={getSendButtonColor(theme, question)}
          aria-hidden="true"
          onClick={handleSendQuestion}
        />
      ) : !contextValues.contextType ? (
          <StopCircle onClick={handleContextClick} className="cursor-pointer" />
      ) : (
        <SendHorizontal
          className="relative top-[1px] ml-1 h-5 w-5 rotate-180 cursor-pointer transition-transform duration-200"
          color={theme === "light" ? "#000000" : "#f3f3f3"}
          aria-hidden="true"
          onClick={handleSendClick}
        />
      )}
      {openBox && (
        <div
          className="optionBox light-border1 duration-400 shadow-light100_dark200 
                                background-light900_dark400 absolute bottom-16 right-0 w-full p-5 
                                transition-all duration-500 ease-in-out"
        >
          <ContextSelector />
        </div>
      )}
    </>
  );
};
export default SendIcon;
