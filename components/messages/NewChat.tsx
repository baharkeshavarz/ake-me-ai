"use client";

import { HiOutlinePencilAlt } from "react-icons/hi";
import useThemeStore from "@/store/useThemeStore";
import useMessageStore from "@/hooks/useMessages";

const NewChat = () => {
  const theme = useThemeStore((state: any) => state.theme);
  const {removeList} = useMessageStore();

  return (
      <HiOutlinePencilAlt 
         color={theme === "light" ? "gray" : "white"}
         size="20"
         onClick={removeList}
       />
  )
}

export default NewChat
