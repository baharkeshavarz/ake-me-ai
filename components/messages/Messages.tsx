"use client"

import React from 'react'
import MessageList from './MessageList'
import MessageButton from './MessageButton'
import Welcome from '../Welcome'
import useMessageStore from '@/hooks/useMessages'


const Messages = () => {
  const { chatList} = useMessageStore();
  return (
    <div className="w-full flex-col p-5">
        <div className="flex-1">
         {chatList.length 
           ? <MessageList/>
           : <Welcome/>       
         }
        </div>
        <div className="sticky bottom-0 h-[56px] w-full px-4">
          <MessageButton/>
        </div>
    </div>
  )
}

export default Messages
