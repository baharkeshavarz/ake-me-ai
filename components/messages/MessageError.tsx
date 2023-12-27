import React from 'react'
import Error from '../shared/Error'
import Logo from '../shared/Logo'
import { configInfo } from '@/constants';

interface MessageErrorProps {
    message: string;
}

const MessageError = ({message}: MessageErrorProps) => {
  return (
    <div className="text-dark400_light900 flex justify-end px-5 py-3">
    <div className="flex-1 px-2">
       <div className="base-semibold pt-1 text-right">{configInfo.systemLabel}</div>
         <Error message={message}/>
    </div>
     <div>      
      <Logo width={30} height={30} />
     </div>
 </div>
  )
}

export default MessageError
