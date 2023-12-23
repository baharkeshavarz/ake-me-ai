"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import SendIcon from "../shared/SendIcon";

const MessageButton = () => {
  return (
    <div className="background-light900_dark400 light-border relative flex min-h-[56px] w-full items-center justify-center gap-4 rounded-xl px-4">
     <SendIcon/>
      <Input
        type="text"
        placeholder="چه جوری می تونم کمکت کنم؟"
        value=""
        onChange={() => {}}
        className="no-focus placeholder paragraph-regular background-light900_dark400 border-none text-right text-red-800 shadow-none outline-none"
      />
    </div>
  );
};

export default MessageButton;
