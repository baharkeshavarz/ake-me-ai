import { FaqItem } from "@/types";
import RadioButtonComponent from "../shared/radioButton";
import { useState } from "react";
import ModalInfo from "../chats/ModalInfo";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { HiOutlinePlus } from "react-icons/hi";

interface ContextFaqCardProps {
  id: string;
  title: string;
  messages: FaqItem[];
  changeHandler: (e: any) => void;
  card: string;
  setListUpdated: any;
}

const ContextFaqCard = ({
  id,
  title,
  messages,
  changeHandler,
  card,
  setListUpdated,
}: ContextFaqCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(true);
  }

  return (
    <div className="flex w-full flex-col items-end justify-start px-5 pb-5 h-[250px] overflow-y-scroll">
      <div className="flex-center sm:flex-row flex-col-reverse text-center gap-x-2 w-full border-b shadow-light-100">
        <h3 className="base-semibold text-black py-2">{title}</h3>
        <div
          className="italic hover:underline hover:text-gray-500 font-normal text-[0.8rem] hover:rounded-md hover:border-gray-500 hover:border"
          onClick={() => {setIsAdding(!isAdding); handleModal()}}
        >
         <HoverCard>
              <HoverCardTrigger>
                  <HiOutlinePlus 
                    size="20"
                    className="cursor-pointer"
                  />
              </HoverCardTrigger>
              <HoverCardContent className="background-light850_dark100 text-dark400_light900 max-w-fit p-2 text-[0.7rem]">
              سوال خودت را اضافه کن
              </HoverCardContent>
         </HoverCard>
        </div>

        {isAdding && (
          <ModalInfo
            id=""
            title=""
            description=""
            type={card}
            setListUpdated={setListUpdated}
            setLoading={setLoading}
            open={modalOpen}
            setModalOpen={setModalOpen}
          />
        )}
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 w-full rtl-grid pt-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className="text-dark400_light900 text-right"
            >
              <RadioButtonComponent
                  id={`${id}-${message.id.toString()}`}
                  labelText={message.name}
                  content={message.faq}
                  name="context-type-faq"
                  value={message.id.toString()}
                  hasHover
                  changeHandler={changeHandler}
                  card={card}
                  setListUpdated={setListUpdated}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContextFaqCard;
