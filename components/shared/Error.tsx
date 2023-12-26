import React from 'react'

interface ErrorProsp {
    message: string;
}

const Error = ({message} : ErrorProsp) => {
  return (
    <div className="flex-center error-border-handler error-bg-handler text-dark300_light900 rounded-md p-5 text-[0.8rem]">
         {message}
    </div>
  )
}

export default Error
