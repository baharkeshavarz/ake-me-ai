"use client";

import React from "react";
import Link from "next/link";
import Theme from "./Theme";
import NewChat from "@/components/chats/NewChat";
import { useSetting } from "@/hooks/useSetting";

const Navbar = () => {
  const { projectInfo } = useSetting();
  return (
    <nav className="flex-between z-30 flex h-16 w-full bg-dark-450 px-1 shadow-dark-200 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <p className="sm:h3-bold text-[0.7rem] text-light-850 dark:text-light-900">
          دستیار هوشمند
          <span className="text-primary-500"> {projectInfo.name}</span>
        </p>
      </Link>
      <div className="flex-center">
        <Theme />
        <NewChat />
      </div>
    </nav>
  );
};

export default Navbar;
