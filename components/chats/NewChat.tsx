"use client";

import { HiOutlinePencilAlt } from "react-icons/hi";
import useThemeStore from "@/store/useThemeStore";
import useMessageStore from "@/hooks/useMessages";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useRouter } from 'next/navigation';
import { useMessageContext } from "@/hooks/useMessageContext";

const NewChat = () => { 
  const theme = useThemeStore((state: any) => state.theme);
  const { removeList } = useMessageStore();
  const { onRemove } = useMessageContext();
  const router = useRouter();

  const onClickNew = () => {
    removeList();
    onRemove();
    router.push("/chat/1")
  }

  return (
    <HoverCard>
        <HoverCardTrigger>
            <HiOutlinePencilAlt 
               color={theme === "light" ? "gray" : "white"}
               size="20"
               onClick={onClickNew}
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
