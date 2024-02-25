"use client";

import Welcome from "@/components/Welcome";
import ChatInput from "@/components/chats/ChatInput";
import ChatList from "@/components/chats/ChatList";
import { useSetting } from "@/hooks/useSetting";
import { ParamsProps } from "@/types";
import React, { useRef, useState } from "react";

const ChatPage = ({ params: { id } }: ParamsProps) => {
  const { projectInfo } = useSetting();
  const [list, setList] = useState(projectInfo.user.historyList || []);
  const scrollToRef = useRef<HTMLDivElement>(null);
  const scrollToButtom = () => {
    setTimeout(
      () => scrollToRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  return (
    <div
      className={`flex h-screen flex-col pb-2 pt-0.2 ${
        list.length ? "overflow-y-auto" : ""
      }`}
    >
      <div className="flex-1">
        {list.length ? (
          <ChatList
            chatId={id}
            list={list}
            setList={setList}
            scrollToButtom={scrollToButtom}
          />
        ) : (
          <Welcome />
        )}
      </div>
      <div ref={scrollToRef} />
      <div className="sticky bottom-0 h-[56px] w-full px-4">
        <ChatInput
          chatId={id}
          list={list}
          setList={setList}
          scrollToButtom={scrollToButtom}
        />
      </div>
    </div>
  );
};

export default ChatPage;
