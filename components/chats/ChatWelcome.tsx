"use client";

import React from "react";
import Welcome from "../Welcome";
import ChatInput from "./ChatInput";

const ChatWelcome = () => {
  return (
    <div className="flex h-screen w-full flex-col p-5">
      <div className="flex-1">
        <Welcome />
      </div>
      <div className="sticky bottom-0 h-[56px] w-full px-4">
        <ChatInput chatId="1" />
      </div>
    </div>
  );
};

export default ChatWelcome;
