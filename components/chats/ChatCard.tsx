import { ChatMessageResponse } from "@/types";
import React from "react";
import Logo from "../shared/Logo";
import TypingAnimation from "./TypingAnimation";
import VoicePlayer from "../shared/VoicePlayer";
import { API_URL } from "@/lib/axios";
import { configInfo, messageTypes } from "@/constants";
import VideoSinglePlayer from "../shared/VideoSinglePlayer";
import { loginInfo } from "@/constants/login";

interface ChatCardProps {
  item: ChatMessageResponse;
}

const ChatCard = ({ item }: ChatCardProps) => {
  return (
    <div className="text-dark400_light900 flex justify-end px-5 py-3">
      <div className="flex-1 px-2">
        <div className="base-semibold pt-1 text-right">{item.creator}</div>
        <p className="py-1 text-right text-[0.8rem]">
          {item.type === messageTypes.text &&
          item.creator === configInfo.systemLabel ? (
            <TypingAnimation text={item.message} />
          ) : item.type === messageTypes.text ? (
            <div dangerouslySetInnerHTML={{ __html: item.message }} />
          ) : (
            ""
          )}
          {item.type === messageTypes.voice && (
            <VoicePlayer voiceUrl={`${API_URL}/download/voice/${item.id}`} />
          )}
          {item.type === messageTypes.video && (
            <VideoSinglePlayer videoId={item.id} width="100%" height="150px" />
          )}
        </p>
      </div>
      <div>
        {item.creator === configInfo.systemLabel ? (
          <Logo width={30} height={30} />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-400 p-1 text-[0.7rem]">
             {loginInfo[0].user.abbreviation}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
