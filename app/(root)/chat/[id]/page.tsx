"use client";

import ChatInput from "@/components/chats/ChatInput";
import ChatList from "@/components/chats/ChatList";
import { ParamsProps } from "@/types";
import React from "react";

const ChatPage = ({ params: { id } }: ParamsProps) => {
  return (
    <div className="flex h-screen flex-col overflow-y-auto">
      <ChatList chatId={id} />
      <div className="sticky bottom-0 h-[56px] w-full px-4">
        <ChatInput chatId={id} />
      </div>
    </div>
  );
};

export default ChatPage;
