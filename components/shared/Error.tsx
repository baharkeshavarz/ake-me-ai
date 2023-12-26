import React from 'react'

interface ErrorProsp {
    message: string;
}

const Error = ({message} : ErrorProsp) => {
  return (
    <div className="text-sm p-5 flex-center rounded-md error-border-handler error-bg-handler text-dark300_light900">
         {message}
    </div>
  )
}

export default Error
