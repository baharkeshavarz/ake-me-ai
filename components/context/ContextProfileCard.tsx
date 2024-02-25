import { ProfileItem } from "@/types";
import RadioButtonComponent from "../shared/radioButton";
import Link from "next/link";
import { useState } from "react";
import ModalInfo from "../chats/ModalInfo";
import { HiOutlinePlus } from "react-icons/hi2";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface ContextProfileCardProps {
  id: string;
  title: string;
  messages: ProfileItem[];
  changeHandler: (e: any) => void;
  card: string;
  setListUpdated: any;
}

const ContextProfileCard = ({
  id,
  title,
  messages,
  changeHandler,
  card,
  setListUpdated,
}: ContextProfileCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex w-full flex-col items-end justify-start px-3 sm:px-4 pb-5 h-[250px] overflow-y-scroll">
      <div className="flex-center sm:flex-row flex-col-reverse text-center gap-2">
        <h3 className="base-semibold text-black py-2">{title}</h3>
         <Link
          href="?modal=true"
          className="italic hover:underline hover:text-primary-500 font-normal text-[0.7rem]"
          onClick={() => setIsAdding(!isAdding)}
        >
           <HoverCard>
              <HoverCardTrigger>
                  <HiOutlinePlus 
                    size="20"
                    className="cursor-pointer"
                  />
              </HoverCardTrigger>
              <HoverCardContent className="background-light850_dark100 text-dark400_light900 max-w-fit p-2 text-sm">
                  پروفایل خودت را اضافه کن
              </HoverCardContent>
          </HoverCard>
        </Link>

        {isAdding && (
          <ModalInfo
            id=""
            title=""
            description=""
            type={card}
            setListUpdated={setListUpdated}
            setLoading={setLoading}
            open={false}
            setModalOpen={() => {}}
          />
        )}
      </div>

      {messages.map((message, index) => (
        <div
          key={index}
          className="text-dark400_light900 flex w-full gap-1 text-right"
        >
          <RadioButtonComponent
            id={`${id}-${message.id.toString()}`}
            labelText={message.name}
            content={message.profile}
            name="context-type-profile"
            value={message.id.toString()}
            hasHover
            changeHandler={changeHandler}
            card={card}
            setListUpdated={setListUpdated}
          />
        </div>
      ))}
    </div>
  );
};

export default ContextProfileCard;
