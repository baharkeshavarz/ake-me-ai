"use client";

import Welcome from "@/components/Welcome";
import ChatInput from "@/components/chats/ChatInput";
import ChatList from "@/components/chats/ChatList";
import { ParamsProps } from "@/types";
import React, { useState } from "react";

const ChatPage = ({ params: { id } }: ParamsProps) => {
  const [list, setList] = useState([]);
  return (
    <div className={`flex h-screen flex-col ${list.length ? "overflow-y-auto" : ""}`}>
      <div className="flex-1">
        {list.length ? <ChatList chatId={id} list={list} setList={setList}  /> : <Welcome/>}
      </div>
       <div className="sticky bottom-0 h-[56px] w-full px-4">
         <ChatInput chatId={id} list={list} setList={setList} />
       </div>
    </div>
  );
};

export default ChatPage;
