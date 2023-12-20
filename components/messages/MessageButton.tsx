"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const MessageButton = () => {
  return (
    <div className="background-light900_dark400 light-border relative flex min-h-[56px] w-full items-center justify-center gap-4 rounded-xl px-4">
      <Image
        src="/assets/icons/upvote.svg"
        width={24}
        height={24}
        alt="search"
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder="از من سوالت را بپرس"
        value=""
        onChange={() => {}}
        className="no-focus placeholder paragraph-regular background-light900_dark400 border-none text-right text-red-800 shadow-none outline-none"
      />
    </div>
  );
};

export default MessageButton;
