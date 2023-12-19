import { MessageItem } from '@/types';
import React from 'react'
import Logo from '../shared/Logo';

interface MessageCardProps {
    item: MessageItem;
}

const MessageCard = ({item}: MessageCardProps) => {
  return (
    <div className="text-dark400_light900 flex justify-end px-5 py-3">
       <div className="flex-1 px-2">
          <div className="base-semibold pt-1 text-right">{item.owner}</div>
          <p className="text-sm text-right py-1">
            {item.message}
         </p>
       </div>
        <div>      
            {item.owner === "سیستم" 
                    ? <Logo width={30} height={30} />
                    : <div className="flex-center rounded-full bg-primary-500 p-5 w-1 h-1">BA</div>
            }
        </div>
    </div>
  )
}

export default MessageCard
