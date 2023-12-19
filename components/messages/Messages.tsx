import React from 'react'
import MessageList from './MessageList'
import MessageButton from './MessageButton'

const Messages = () => {
  return (
    <div className="w-full flex-col p-5">
        <div className="flex-1">
          <MessageList/>
        </div>
        <div className="sticky bottom-0 h-[56px] w-full">
          <MessageButton/>
        </div>
    </div>
  )
}

export default Messages
