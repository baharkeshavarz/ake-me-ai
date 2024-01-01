"use client";

import React, { useState } from "react";
import MessageCard from "./ChatCard";
import useMessageStore from "@/hooks/useMessages";

type ChatListProps = {
  chatId: string;
  list: any;
  setList: any;
};

const ChatList = ({ chatId, list }: ChatListProps) => {
  const { chatList } = useMessageStore();
  return (
    <div className="flex-1">
      {list.map((message, index) => (
        <MessageCard key={index} item={message} index={index} />
      ))}
    </div>
  );
};

export default ChatList;
