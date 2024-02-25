"use client";

import { SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import ContextSelector from "../context/ContextSelector";
import useThemeStore from "@/store/useThemeStore";
import { getChatByFaq, getChatByProfile } from "@/actions/get-chat";
import { getSendButtonColor, randomNumberInRange } from "@/lib/utils";
import { configInfo, contexts, messageTypes, userRoles } from "@/constants";
import { getVoiceByQuestion } from "@/actions/get-voice";
import { useMessageContext } from "@/hooks/useMessageContext";
import toast from "react-hot-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { systemChatLoading, systemChatSuccess } from "@/constants/general";
import { useChatNumber } from "@/hooks/useChatNumber";
import { Input } from "@/components/ui/input";
import { useSetting } from "@/hooks/useSetting";

interface SendIconProps {
  chatId: string;
  list: any;
  setList: any;
  scrollToButtom: any;
}

const SendIcon = ({ chatId, list, setList, scrollToButtom }: SendIconProps) => {
  const theme = useThemeStore((state: any) => state.theme);
  const { inx, onSet } = useChatNumber();
  const [error, setError] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const { contextValues } = useMessageContext();
  const [itemIndexToUpdate, setItemIndexToUpdate] = useState(0);
  const [canAskQuestion, setCanAskQuestion] = useState(false);
  const { projectInfo } = useSetting();
  let randId = 0;
  const params = useSearchParams();
  const [question, setQuestion] = useState("");

  // Add Faq from the right list as a new question
  useEffect(() => {
    if (params.has('q') && params.get('q') != "") {
        setQuestion(params.get("q")!);
    }
  }, [params])

  const updateObjectInList = (updatedObject: any, index: number) => {
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

  // const handleContextClick = () => {
  //   setOpenBox((prevOpenBox) => !prevOpenBox);
  // };

  const closeBoxOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (openBox && !(event.target as HTMLElement).closest(".optionBox")) {
        setOpenBox(false);
      }
    },
    [openBox, setOpenBox]
  );

  const handleSendClick = async (e: any) => {
    console.log("handleSendClick");
    e.preventDefault();
    randId = randomNumberInRange(100, 1000);
    setCanAskQuestion(false);
    // Send first call in chat accordint to the user's selcetion "profile || faq"
    let response: any = null;
    let voiceResponse: any = null;
    setError(false);

    if (
      !contextValues.contextType ||
      question === ""
    ) {
      toast.error("سوالت رو برام بفرست");
    } else {
      if (
        contextValues.contextType === "faq" &&
        projectInfo.user.role === userRoles.LOGGEDIN &&
        !contextValues.selectedProfile
      ) {
        toast.error(
          "حالا که داری از پرسش های متدوال می پرسی، پروفایلت رو هم انتخاب کن"
        );
      } else {
        userQuestion = question;
        setCanAskQuestion(true);
        setQuestion("");
        textNotification = toast.loading(systemChatLoading.message);

        setItemIndexToUpdate(randId);
        // Add user's message to list
        setList((prevList: any) => [
          ...prevList,
          {
            id: "",
            type: messageTypes.text,
            message: userQuestion,
            creator: configInfo.userLabel,
          },
        ]);

        scrollToButtom();
        onSet(randId);
        // Call API
        try {
          setList((prevList: any) => [
            ...prevList,
            {
              id: randId,
              type: messageTypes.text,
              message: "",
              creator: configInfo.systemLabel,
              voiceId: "",
              videoId: "",
              elapsedTime: "",
            },
          ]);
          scrollToButtom();
          if (contextValues.contextType === contexts.faq) {
            response = await getChatByFaq(
              Number(chatId),
              userQuestion,
            );
          } else {
            response = await getChatByProfile(
              Number(contextValues.contextId),
              userQuestion
            );
          }

          if (response?.data) {
            updateObjectInList(
              {
                id: response.data.response_id,
                type: messageTypes.text,
                message: response.data.msg,
                creator: configInfo.systemLabel,
                elapsedTime: Math.round(response.data.elapsed_time * 100) / 100,
              },
              randId
            );

            toast.success(systemChatSuccess.message, {
              id: textNotification,
            });

            router.push(`/chat/${chatId}`);

            // call api for getting the voice
            voiceResponse = await getVoiceByQuestion(response.data.msg);
            if (voiceResponse?.url) {
              updateObjectInList(
                {
                  voiceId: voiceResponse!.unique_id,
                },
                response.data.response_id
              );
              updateObjectInList(
                {
                  videoId: voiceResponse!.unique_id,
                },
                response.data.response_id
              );
              scrollToButtom();
            }
          }
        } catch (error) {
          setError(true);
        } finally {
          setError(false);
          setQuestion("");
        }
      }
    }
  };

  // const handleSendQuestion = async () => {
  //   console.log("handleSendQuestion");

  //   if (!question) {
  //     toast.error("سوال مدنظرت رو برام بفرست");
  //   } else {
  //     if (
  //       contextValues.contextType === "faq" &&
  //       projectInfo.user.role === userRoles.LOGGEDIN &&
  //       !contextValues.selectedProfile
  //     ) {
  //       toast.error(
  //         "حالا که داری از پرسش های متدوال می پرسی، پروفایلت رو هم انتخاب کن"
  //       );
  //     } else {
  //       setList((prevList: any) => [
  //         ...prevList,
  //         {
  //           id: "",
  //           type: messageTypes.text,
  //           message: question,
  //           creator: configInfo.userLabel,
  //         },
  //       ]);

  //       textNotification = toast.loading(systemChatLoading.message);
  //       let response: any = null;
  //       let voiceResponse: any = null;
  //       if (contextValues.contextType === contexts.faq) {
  //         response = await getChatByFaq(
  //           Number(chatId),
  //           question,
  //         );
  //       } else {
  //         response = await getChatByProfile(
  //           Number(contextValues.contextId),
  //           question
  //         );
  //       }

  //       setList((prevList: any) => [
  //         ...prevList,
  //         {
  //           id: randId,
  //           type: messageTypes.text,
  //           message: "",
  //           creator: configInfo.systemLabel,
  //         },
  //       ]);

  //       if (response?.data) {
  //         updateObjectInList(
  //           {
  //             id: response.data.response_id,
  //             type: messageTypes.text,
  //             message: response.data.msg,
  //             creator: configInfo.systemLabel,
              
  //           },
  //           randId
  //         );

  //         // call api for getting the voice
  //         voiceResponse = await getVoiceByQuestion(response.data.msg);

  //         toast.success(systemChatSuccess.message, {
  //           id: textNotification,
  //         });

  //         if (voiceResponse?.url) {
  //           setList((prevList: any) => [
  //             ...prevList,
  //             {
  //               id: voiceResponse!.unique_id,
  //               type: messageTypes.voice,
  //               message: "",
  //               creator: configInfo.systemLabel,
  //             },
  //           ]);

  //           setList((prevList: any) => [
  //             ...prevList,
  //             {
  //               id: voiceResponse!.unique_id,
  //               type: messageTypes.video,
  //               message: "",
  //               creator: configInfo.systemLabel,
  //             },
  //           ]);
  //         }
  //         setQuestion("");
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    document.addEventListener("click", closeBoxOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeBoxOnOutsideClick);
    };
  }, [openBox, closeBoxOnOutsideClick]);

  return (
    <>
      {/* {JSON.stringify(contextValues)} */}
      {list.length ? (
        <SendHorizontal
          className="relative top-[1px] ml-1 h-5 w-5 rotate-180 cursor-pointer transition-transform duration-500"
          color={getSendButtonColor(theme, question)}
          aria-hidden="true"
          onClick={handleSendClick} //handleSendQuestion
        />
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
      <form onSubmit={handleSendClick} className="w-full">
        <Input
          type="text"
          placeholder={
            !canAskQuestion && !contextValues.contextType
              ? "سوالت رو ازم بپرس، مشتاقم که جوابتو بدم"
              : "چه جوری می تونم کمکت کنم؟"
          }
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="no-focus placeholder small-notification sm:paragraph-regular background-light900_dark400 border-none text-right shadow-none outline-none rtl-grid"
        />
      </form>
    </>
  );
};
export default SendIcon;
