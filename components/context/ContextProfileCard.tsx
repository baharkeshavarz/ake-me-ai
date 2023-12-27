import { ProfileItem } from "@/types";
import RadioButtonComponent from "../shared/radioButton";

interface ContextProfileCardProps {
  id: string;
  title: string;
  messages: ProfileItem[];
  changeHandler: (e: any) => void;
}

const ContextProfileCard = ({ id, title , messages, changeHandler }: ContextProfileCardProps) => {
  return (
    <div className="flex w-full flex-col items-end justify-start px-5 pb-5">
      <h3 className="base-semibold py-2 text-dark100_light900">{title}</h3>
       {messages.map((message, index) =>
          <div 
               key={index}
               className="text-dark400_light900 flex w-full gap-5 text-right"
           >
                <RadioButtonComponent
                    id={`${id}-${message.id.toString()}`}
                    labelText={message.profile}
                    name="context-type"
                    value={message.id.toString()}
                    hasHover
                    changeHandler={changeHandler}
              />
           </div>
         )}
    </div>
  )
}

export default ContextProfileCard
