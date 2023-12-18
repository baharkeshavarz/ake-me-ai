"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const MessageButton = () => {
  return (
    <div className="background-light800_dark400 relative flex min-h-[56px] w-full items-center justify-center gap-1 rounded-xl px-4">
      <Input
        type="text"
        placeholder="Messsage Chat Bot"
        value=""
        className="no-focus placeholder paragraph-regular background-light800_dark400 border-none shadow-none outline-none"
      />
       <Image
        src="/assets/icons/upvote.svg"
        width={24}
        height={24}
        alt="search"
        className="cursor-pointer"
      />
    </div>
  );
};

export default MessageButton;
