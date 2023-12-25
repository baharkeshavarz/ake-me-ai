"use client"

import React, { useState } from 'react'
import MessageList from './MessageList'
import MessageButton from './MessageButton'
import Welcome from '../Welcome'
import { ChatProfileResponse } from '@/types'

const Messages = () => {
  const [chatList, setChatList] = useState<ChatProfileResponse[]>([]);

  return (
    <div className="w-full flex-col p-5">
        <div className="flex-1">
         {chatList.length 
           ? <MessageList chatList={chatList}/>
           : <Welcome/>       
         }
        </div>
        <div className="sticky bottom-0 h-[56px] w-full px-4">
          <MessageButton
             chatList={chatList}
             setChatList={setChatList}
           />
        </div>
    </div>
  )
}

export default Messages
