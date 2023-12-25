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
    <div className="flex w-full flex-col items-end justify-start px-5 pb-5">
      <h3 className="text-light400_light500 py-5 text-right">
        {title}
      </h3>
      <RadioGroup
          defaultValue={messages[0].id.toString()}
         className="flex flex-col items-start justify-start gap-4"
       >
        {messages.map((message, index) =>
           <div 
               key={index}
               className="text-dark400_light900 flex  w-full gap-5 text-right"
           >
          <HoverCard>
            <HoverCardTrigger className="w-full text-[0.75rem] hover:cursor-pointer">
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
