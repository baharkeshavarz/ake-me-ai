import { ChatMessageResponse } from '@/types';
import React from 'react'
import Logo from '../shared/Logo';
import TypingAnimation from './TypingAnimation';

interface MessageCardProps {
    item: ChatMessageResponse;
}

const MessageCard = ({item}: MessageCardProps) => {
  return (
    <div className="text-dark400_light900 flex justify-end px-5 py-3">
       <div className="flex-1 px-2">
          <div className="base-semibold pt-1 text-right">{item.creator}</div>
          <p className="py-1 text-right text-sm">
            <TypingAnimation text={item.message}/>
         </p>
       </div>
        <div>      
            {item.creator === "سیستم" 
                    ? <Logo width={30} height={30} />
                    : <div className="flex-center h-1 w-1 rounded-full bg-primary-500 p-5 text-sm">ک م</div>
            }
        </div>
    </div>
  )
}

export default MessageCard
