import React from 'react'
import MessageCard from './MessageCard';
import { messageList } from '@/constants';

const MessageList = () => {
  return (
    <>
      {messageList.map((message, index) => 
        <MessageCard
            key={index}
            item={message}
        />
      )}
    </>
  )
}

export default MessageList
