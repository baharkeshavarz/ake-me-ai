"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const MessageButton = () => {
  return (
    <div className="background-light800_dark400 relative flex min-h-[56px] w-full items-center justify-center gap-4 rounded-xl px-4 light-border">
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
        className="no-focus placeholder paragraph-regular background-light800_dark400 border-none shadow-none outline-none text-right text-red-800"
      />
    </div>
  );
};

export default MessageButton;
