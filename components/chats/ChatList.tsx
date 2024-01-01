"use client";

import React from "react";
import MessageCard from "./ChatCard";
import { ChatMessageResponse } from "@/types";

type ChatListProps = {
  chatId: string;
  list: ChatMessageResponse[];
  setList: any;
};

const ChatList = ({ chatId, list }: ChatListProps) => {
  return (
    <div className="flex-1">
      {list.map((message, index) => (
        <MessageCard key={index} item={message} index={index} />
      ))}
    </div>
  );
};

export default ChatList;
