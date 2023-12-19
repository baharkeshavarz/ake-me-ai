import { MessageItem } from '@/types';
import React from 'react'

interface MessageCardProps {
    item: MessageItem;
}

const MessageCard = ({item}: MessageCardProps) => {
  return (
    <div className="flex justify-end px-5 py-3">
       <div className="px-2">
          <div className="base-semibold pt-2 text-right">{item.owner}</div>
          <p className="text-justify py-1 text-sm">
            {item.message}
         </p>
      </div>
      <div className="flex-center rounded-full bg-green-100 p-5 w-3 h-3">
          BA
      </div>
    </div>
  )
}

export default MessageCard
