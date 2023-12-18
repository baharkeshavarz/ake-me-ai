import React from 'react'
import MessageList from './MessageList'
import MessageButton from './MessageButton'

const Messages = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
        <div className="flex-1">
          <MessageList/>
        </div>
        <div className="w-full sticky bottom-0 py-5">
          <MessageButton/>
        </div>
    </div>
  )
}

export default Messages
