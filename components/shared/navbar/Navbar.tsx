"use client";

import React from "react";
import Link from "next/link";
import Theme from "./Theme";
import Logo from "../Logo";
import NewChat from "@/components/chats/NewChat";

const Navbar = () => {
  return (
    <nav className="flex-between z-50 flex h-16 w-full bg-dark-450 px-1 shadow-dark-200 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <Logo width={23} height={23} />
        <p className="sm:h3-bold text-[1rem] text-light-850 dark:text-light-900">
          AI <span className="text-primary-500">Questioning</span>
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
