"use client";

import React from "react";
import SendIcon from "../shared/SendIcon";
import VoiceIcon from "./VoiceIcon";

type ChatInputProps = {
  chatId: string;
  list?: any;
  setList?: any;
  scrollToButtom?: any;
};

const ChatInput = ({ chatId, list, setList, scrollToButtom }: ChatInputProps) => {
  return (
    <div className="background-light900_dark400 light-border relative flex h-[56px] w-full items-center justify-center gap-4 rounded-xl px-4 py-2">
      <SendIcon
        chatId={chatId}
        list={list}
        setList={setList}
        scrollToButtom= {scrollToButtom}
      />
      
      <VoiceIcon setList={setList}/>
   </div>
  );
};

export default ChatInput;
