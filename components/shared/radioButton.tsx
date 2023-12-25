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
    hasHover?: boolean;
    changeHandler?: (e: any) => void;
}

const RadioButtonComponent = ({
    id,
    labelText,
    name,
    value,
    hasHover=false,
    changeHandler
    } : RadioButtonComponentProps) => {
  return (
    <div className="flex items-center mb-4 gap-1">
     {!hasHover
          ? (<label
                htmlFor={name}
                className="ms-2 text-sm text-gray-900 dark:text-gray-300">
                {labelText}
              </label>
          ) : (
            <HoverCard>
                <HoverCardTrigger className="text-[0.75rem] hover:cursor-pointer">
                  {labelText.substring(0, 100)}...
                </HoverCardTrigger>
                <HoverCardContent className="background-light850_dark100 w-[700px] text-sm">
                  {labelText}
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
        className="w-4 h-4 checked:bg-primary-500 focus:outline-none focus:ring-1 text-primary-500"
     />
   </div>
  )
}

export default RadioButtonComponent
