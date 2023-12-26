"use client";

import { HiOutlinePencilAlt } from "react-icons/hi";
import useThemeStore from "@/store/useThemeStore";
import useMessageStore from "@/hooks/useMessages";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const NewChat = () => {
  const theme = useThemeStore((state: any) => state.theme);
  const {removeList} = useMessageStore();
  return (
    <HoverCard>
        <HoverCardTrigger>
            <HiOutlinePencilAlt 
               color={theme === "light" ? "gray" : "white"}
               size="20"
               onClick={removeList}
               className="cursor-pointer"
             />
         </HoverCardTrigger>
         <HoverCardContent className="background-light850_dark100 text-dark400_light900 max-w-fit p-3 text-sm">
            چت جدید
         </HoverCardContent>
      </HoverCard>
  )
}

export default NewChat
