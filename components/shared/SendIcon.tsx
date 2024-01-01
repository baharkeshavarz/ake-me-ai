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
import useMessageStore from "@/hooks/useMessages";
import { getSendButtonColor } from "@/lib/utils";
import { configInfo, contexts, messageTypes } from "@/constants";
import { getVoiceByQuestion } from "@/actions/get-voice";
import { useMessageContext } from "@/hooks/useMessageContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SendIconProps {
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  setCanAskQuestion: Dispatch<SetStateAction<boolean>>;
  chatId: string;
}

const SendIcon = ({
  question,
  setQuestion,
  setCanAskQuestion,
  chatId,
}: SendIconProps) => {
  const theme = useThemeStore((state: any) => state.theme);
  const { chatList, addMessage } = useMessageStore();
  const [error, setError] = useState(false);
  const router = useRouter();

  const [openBox, setOpenBox] = useState(false);
  const { contextValues } = useMessageContext();

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
      setError(true);
    } else {
      setCanAskQuestion(true);
      // Add user's message to list
      addMessage({
        id: "",
        type: messageTypes.text,
        message: question,
        creator: configInfo.userLabel,
      });
      // Call API
      try {
        if (contextValues.contextType === contexts.faq) {
          response = await getChatByFaq(
            Number(contextValues.contextId),
            question
          );
        } else {
          response = await getChatByProfile(
            Number(contextValues.contextId),
            question
          );
        }
        // call api for getting the voice
        voiceResponse = await getVoiceByQuestion(question);
        if (response?.data) {
          addMessage({
            id: response.data.response_id,
            type: messageTypes.text,
            message: response.data.response,
            creator: configInfo.systemLabel,
          });
          if (voiceResponse?.url) {
            addMessage({
              id: voiceResponse!.unique_id,
              type: messageTypes.voice,
              message: "voice",
              creator: configInfo.systemLabel,
            });
            addMessage({
              id: voiceResponse!.unique_id,
              type: messageTypes.video,
              message: "video",
              creator: configInfo.systemLabel,
            });
          }
          router.push(`/chat/${chatId}`);
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
    let textNotification = "";
    addMessage({
      id: "",
      type: messageTypes.text,
      message: question,
      creator: configInfo.userLabel,
    });

    let response: any = null;
    let voiceResponse: any = null;
    if (contextValues.contextType === contexts.faq) {
      textNotification = toast.loading("!سیستم در حال فکر کردنه");
      response = await getChatByFaq(Number(contextValues.contextId), question);
    } else {
      response = await getChatByProfile(
        Number(contextValues.contextId),
        question
      );
    }
    // call api for getting the voice
    voiceResponse = await getVoiceByQuestion(question);

    if (response?.data) {
      addMessage({
        id: response.data.response_id,
        type: messageTypes.text,
        message: response.data.response,
        creator: configInfo.systemLabel,
      });

      toast.success("پاسخ شما دریافت شد", {
        id: textNotification,
      });

      if (voiceResponse?.url) {
        addMessage({
          id: voiceResponse!.unique_id,
          type: messageTypes.voice,
          message: "voice",
          creator: configInfo.systemLabel,
        });
        addMessage({
          id: voiceResponse!.unique_id,
          type: messageTypes.video,
          message: "video",
          creator: configInfo.systemLabel,
        });
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
      {chatList.length ? (
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
