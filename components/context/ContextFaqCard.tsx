import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaqItem } from "@/types";

interface NavbarMessageCardProps {
  id: string;
  title: string;
  messages: FaqItem[];
}

const ContextFaqCard = ({ id, title , messages }: NavbarMessageCardProps) => {
  console.log("messages", messages);
  return (
    <div className="pb-5">
      <h3 className="text-light400_light500 py-5 text-right">
        {title}
      </h3>
      <RadioGroup defaultValue={messages[0].id.toString()} className="gap-4">
        {messages.map((message, index) =>
           <div 
               key={index}
               className="text-dark400_light900 flex justify-end gap-5 text-right"
           >
            <Label htmlFor={`option-${id}-${index}`}>
              {message.faq}
            </Label>
            <RadioGroupItem 
                value={message.id.toString()}
                id={`option-${id}-${index}`}
            />
            </div>
         )}
       </RadioGroup>
    </div>
  )
}

export default ContextFaqCard
