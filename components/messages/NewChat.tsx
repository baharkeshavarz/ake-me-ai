"use client";

import { HiOutlinePencilAlt } from "react-icons/hi";
import useThemeStore from "@/store/useThemeStore";

const NewChat = () => {
  const theme = useThemeStore((state: any) => state.theme);
  return (
      <HiOutlinePencilAlt 
         color={theme === "light" ? "gray" : "white"}
         size="20"
         onClick={() => {
         }}
       />
  )
}

export default NewChat
