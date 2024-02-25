"use client";

import { ChatMessageResponse } from "@/types";
import React, { useState } from "react";
import Logo from "../shared/Logo";
import TypingAnimation from "./TypingAnimation";
import VoicePlayer from "../shared/VoicePlayer";
import { API_URL } from "@/lib/axios";
import { configInfo } from "@/constants";
import VideoSinglePlayer from "../shared/VideoSinglePlayer";
import Image from "next/image";
import resumeSVG from "../../public/assets/icons/play.svg";
import SpinningLoading from "../shared/loader/SpinningLoading";
import { useSetting } from "@/hooks/useSetting";
import { getFirstLetters } from "@/lib/utils";
import { HiClock } from "react-icons/hi";
import useThemeStore from "@/store/useThemeStore";

interface ChatCardProps {
  item: ChatMessageResponse;
}

const ChatCard = ({ item }: ChatCardProps) => {
  const { projectInfo } = useSetting();
  const [requestPlaying, setRequestPlaying] = useState(false);
  const theme = useThemeStore((state: any) => state.theme);

  const onRequestVideo = () => {
    setRequestPlaying(true);
  };
  return (
    <div className="text-dark400_light900 flex px-5 py-3">
      <div className="flex flex-col w-full">
        <div className="flex-end gap-x-2 pb-1">
          {item.creator === configInfo.userLabel && (
            <div className="text-sm rtl-grid">{item.message}</div>
          )}
          {item.creator === configInfo.systemLabel && (
            <div className="base-semibold pt-1 flex justify-end">
              {item.creator}
            </div>
          )}

          <div>
            {item.creator === configInfo.systemLabel ? (
              <Logo width={40} height={40} />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-400 p-1 text-[0.7rem]">
                {getFirstLetters(projectInfo.user && projectInfo.user.name)}
              </div>
            )}
          </div>
        </div>

        {item.creator === configInfo.systemLabel && (
          <div
            className={`py-1 text-right shadow-sm rounded-md flex-end text-[0.8rem] cursor-pointer px-4 sm:flex-row flex-col-reverse hover:bg-[#fdfdfd]/50`}
          >
            {/* Just show voice and video after getting message */}
            {item.message !== "" && (
              <div className="flex gap-2 md:flex-row flex-col">
                <div
                  className="md:w-48 min-h-44 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 hover:bg-gray-600 text-white flex-center gap-x-1 relative"
                  onClick={onRequestVideo}
                >
                  {item.videoId && (
                    <div className="absolute top-0">
                      <VideoSinglePlayer
                        videoId={item.videoId}
                        width="100%"
                        height=""
                      />
                    </div>
                  )}
                  {item.videoId === "" && requestPlaying && <SpinningLoading />}
                  {item.videoId === "" && !requestPlaying && (
                    <>
                      <Image
                        src={resumeSVG}
                        width={20}
                        height={20}
                        className="shadow-sm bg-white p-1"
                        alt="پخس ویدیو"
                      />
                      <p className="hover:text-primary-500 hover:underline">
                        ویدیو را برام پخش کن
                      </p>
                    </>
                  )}
                </div>
                {!requestPlaying && !item.isHistory && item.voiceId && (
                  <div className="md:w-48 min-h-44 flex-center backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 hover:bg-gray-600 text-white">
                    <VoicePlayer
                      voiceUrl={`${API_URL}/download/voice/${item.voiceId}`}
                    />
                  </div>
                )}

                {!requestPlaying && item.isHistory && (
                  <div className="md:w-48 min-h-44 flex-center backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 hover:bg-gray-600 text-white">
                    <VoicePlayer
                      voiceUrl={`${API_URL}/download/voice/${item.voiceId}`}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="min-h-[150px] py-2 flex w-full flex-1 flex-col">
              {item.message === "" && (
                <div className="flex-end w-full">
                  <div className="animate-blink h-3 w-3 rounded-full bg-red-500"></div>
                  <TypingAnimation
                    text="سیستم در حال پاسخگویی"
                    textSpeed={100}
                  />
                </div>
              )}

              {/* History or live chat */}
              {item.message !== "" && (
                <div className="w-full min-h-[150px] py-2 px-1 rtl-grid">
                  {item.isHistory ? (
                    item.message
                  ) : (
                    <TypingAnimation text={item.message} />
                  )}
                </div>
              )}

              {item.message !== "" && item.elapsedTime > 0 && (
                <div className="flex justify-start rtl-grid text-light400_light500">
                  <HiClock
                    color={theme === "light" ? "gray" : "white"}
                    size="20"
                    className="cursor-pointer"
                  />
                  جوابت رو توی
                  <span className="font-bold px-1">
                    {item.elapsedTime || 0}
                  </span>
                  ثانیه گرفتی!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
