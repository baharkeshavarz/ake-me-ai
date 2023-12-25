import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaqItem } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface ContextFaqCardProps {
  id: string;
  title: string;
  messages: FaqItem[];
  changeHandler: (e: any) => void;
}

const ContextFaqCard = ({ id, title , messages, changeHandler }: ContextFaqCardProps) => {
  return (
    <div className="flex w-full flex-col items-end justify-start px-5 pb-5">
      <h3 className="text-light400_light500 py-5 text-right">
        {title}
      </h3>
      <RadioGroup
          defaultValue={messages[0].id.toString()}
          className="flex flex-col items-end justify-end gap-4"
       >
        {messages.map((message, index) =>
           <div 
               key={index}
               className="text-dark400_light900 flex w-full gap-5 text-right"
           >
          <HoverCard>
            <HoverCardTrigger className="w-full text-[0.75rem] hover:cursor-pointer">
                {message.faq.substring(0, 100)}...
            </HoverCardTrigger>
            <HoverCardContent className="background-light850_dark100 w-[800px] text-sm">
               {message.faq}
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

export default ContextFaqCard
