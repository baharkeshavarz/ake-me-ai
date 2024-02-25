"use client"

import { ChatMessageResponse } from "@/types";
import React, { useState } from "react";
import Logo from "../shared/Logo";
import TypingAnimation from "./TypingAnimation";
import VoicePlayer from "../shared/VoicePlayer";
import { API_URL } from "@/lib/axios";
import { configInfo, messageTypes } from "@/constants";
import VideoSinglePlayer from "../shared/VideoSinglePlayer";
import Image from "next/image";
import resumeSVG from "../../public/assets/icons/play.svg";
import SpinningLoading from "../shared/loader/SpinningLoading";
import { useSetting } from "@/hooks/useSetting";
import { getFirstLetters } from "@/lib/utils";

interface ChatCardProps {
  item: ChatMessageResponse;
  index: number;
}

const ChatCard = ({ item, index }: ChatCardProps) => {
  const { projectInfo } = useSetting();
  const [requestPlaying, setRequestPlaying] = useState(false);

  const onRequestVideo = () => {
    setRequestPlaying(true)
  }
  return (
    <div className="text-dark400_light900 flex justify-end px-5 py-3">
      <div className="flex-1 px-2">
        <div className="base-semibold pt-1 text-right">{item.creator}</div>
          <div className={`py-1 text-right text-[0.8rem]  ${item.creator === configInfo.systemLabel && "bg-[#fdfdfd] p-4" }`}>
            {item.type === messageTypes.text &&
              item.creator === configInfo.systemLabel ?
              (
                <div className="flex-start gap-x-2 px-2">
                  <div className="flex-1">
                      {item.videoId && item.message !== "" &&
                        <VideoSinglePlayer videoId={item.videoId} width="100%" height="150px" />
                      }
                      {item.videoId === "" && item.message !== "" && (
                        <div 
                          className="rounded-full bg-primary-500 gap-1 p-4 
                                    shadow-md shadow-slate-400 flex-center cursor-pointer text-white/80"
                          onClick={onRequestVideo}
                        >
                        {requestPlaying && <SpinningLoading/>}
                        {!requestPlaying && (
                          <>
                              <Image
                                src={resumeSVG}
                                width={20}
                                height={20}
                                className="shadow-sm bg-white p-1"
                                alt="پخس ویدیو"
                              />
                            ویدیو را برام پخش کن
                          </>
                      )}
                      </div>
                      )}
                  </div>
                  {item.message === "" && (
                    <div className="flex-1 flex-end">
                      <div className="animate-blink h-3 w-3 rounded-full bg-red-500"></div>
                      <TypingAnimation text="سیستم در حال پاسخگویی" textSpeed={100} />
                    </div>
                  )}
                  {item.message !== "" && (
                    <div className="flex-1 w-full min-h-[200px] py-2">
                        <TypingAnimation text={item.message} />
                    </div>
                  )}
               </div>
              )
            : item.type === messageTypes.text ? (
              <div dangerouslySetInnerHTML={{ __html: item.message }} />
            ) : (
              ""
            )}

            {item.type === messageTypes.voice && (
              <VoicePlayer voiceUrl={`${API_URL}/download/voice/${item.id}`} />
            )}
            {/* {item.type === messageTypes.video && (
              <VideoSinglePlayer videoId={item.id} width="100%" height="150px" />
            )} */}
          </div>
      </div>
      <div>
        {item.creator === configInfo.systemLabel ? (
          <Logo width={50} height={50} />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-400 p-1 text-[0.7rem]">
               {getFirstLetters(projectInfo.name)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
