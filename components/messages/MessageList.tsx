import React from 'react'
import MessageCard from './MessageCard';
import { ChatProfileResponse } from '@/types';

interface MessageListProps {
  chatList: ChatProfileResponse[];
}

const MessageList = ({chatList}: MessageListProps) => {
  return (
    <>
      {chatList.map((message, index) => 
        <MessageCard
            key={index}
            item={message}
        />
      )}
    </>
  )
}

export default MessageList
