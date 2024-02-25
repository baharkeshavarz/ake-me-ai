"use client";

import React from "react";
import MessageCard from "./ChatCard";
import { ChatMessageResponse } from "@/types";
import ModelSetting from "./ModelSetting";

type ChatListProps = {
  chatId: string;
  list: ChatMessageResponse[];
  setList: any;
  scrollToButtom?: any;
};

const ChatList = ({ chatId, list, setList, scrollToButtom }: ChatListProps) => {
  return (
    <div className="realtive">
      <div className="sticky top-0 left-0 mx-auto px-5 z-10 bg-black bg-opacity-5 backdrop-blur w-full rounded-md">
        <ModelSetting setList={setList} scrollToButtom={scrollToButtom} />
      </div>
      <div className="flex-1">
        {list.map((message, index) => (
          <MessageCard key={index} item={message} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
