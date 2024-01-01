import React from 'react'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

interface RadioButtonComponentProps {
    id: string;
    labelText: string;
    name: string;
    value: string;
    content: string;
    hasHover?: boolean;
    changeHandler?: (e: any) => void;
}

const RadioButtonComponent = ({
    id,
    labelText,
    name,
    value,
    content,
    hasHover=false,
    changeHandler
    } : RadioButtonComponentProps) => {
  return (
    <div className="mb-4 flex items-center gap-1 w-full justify-end">
     {!hasHover
          ? (<label
                htmlFor={name}
                className="ms-2 text-sm text-gray-900 dark:text-gray-300">
                {labelText}
              </label>
          ) : (
            <HoverCard>
                <HoverCardTrigger className="text-[0.75rem] hover:cursor-pointer">
                  {labelText}
                </HoverCardTrigger>
                <HoverCardContent className="background-light850_dark100 w-[700px] text-sm">
                  {content}
                </HoverCardContent>
            </HoverCard>
        )
     }
     <input 
        type="radio"
        id={id}
        value={value}
        name={name}
        onClick={changeHandler}
        className="h-4 w-4 text-primary-500 checked:bg-primary-500 focus:outline-none focus:ring-1"
     />
   </div>
  )
}

export default RadioButtonComponent
