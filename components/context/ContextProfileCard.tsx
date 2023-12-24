import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ProfileItem } from "@/types";


interface ContextProfileCardProps {
  id: string;
  title: string;
  messages: ProfileItem[];
  changeHandler: (e: any) => void;
}

const ContextProfileCard = ({ id, title , messages, changeHandler }: ContextProfileCardProps) => {
  return (
    <div className="pb-5 w-full flex flex-col justify-start items-end px-5">
      <h3 className="text-light400_light500 py-5 text-right">
        {title}
      </h3>
      <RadioGroup
          defaultValue={messages[0].id.toString()}
         className="gap-4 flex flex-col justify-start items-start"
       >
        {messages.map((message, index) =>
           <div 
               key={index}
               className="text-dark400_light900 flex  gap-5 text-right w-full"
           >
          <HoverCard>
            <HoverCardTrigger className="text-[0.75rem] w-full hover:cursor-pointer">
                {message.profile.substring(0, 100)}...
            </HoverCardTrigger>
            <HoverCardContent className="background-light850_dark100 w-[800px] text-sm">
               {message.profile}
            </HoverCardContent>
          </HoverCard>

          <RadioGroupItem 
                value={message.id.toString()}
                id={`${id}-${message.id.toString()}`}
                onClick={changeHandler}
            />
            </div>
         )}
      </RadioGroup>
    </div>
  )
}

export default ContextProfileCard
