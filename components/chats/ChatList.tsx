import React from "react";
import MessageCard from "./ChatCard";
import useMessageStore from "@/hooks/useMessages";

type ChatListProps = {
  chatId: string;
};

const ChatList = ({ chatId }: ChatListProps) => {
  const { chatList } = useMessageStore();
  return (
    <div className="flex-1">
      {chatList.map((message, index) => (
        <MessageCard key={index} item={message} />
      ))}
    </div>
  );
};

export default ChatList;
