"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const MessageButton = () => {
  return (
    <div className="bg-dark-400 relative flex min-h-[56px] w-full items-center justify-center gap-1 rounded-xl px-4">
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
        className="no-focus placeholder paragraph-regular bg-dark-400 border-none shadow-none outline-none text-right"
      />
    </div>
  );
};

export default MessageButton;
