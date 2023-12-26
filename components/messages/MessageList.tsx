import React from 'react'
import MessageCard from './MessageCard';
import useMessageStore from '@/hooks/useMessages';
import MessageError from './MessageError';

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
      <MessageError message="خطایی رخ داده است"/>
    </>
  )
}

export default MessageList
