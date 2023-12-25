import React from 'react'
import MessageCard from './MessageCard';
import useMessageStore from '@/hooks/useMessages';

const MessageList = () => {
  const { chatList } = useMessageStore();
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
