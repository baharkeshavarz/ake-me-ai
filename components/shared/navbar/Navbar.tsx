"use client";

import React from "react";
import Link from "next/link";
import Theme from "./Theme";
import Logo from "../Logo";
import NewChat from "@/components/messages/NewChat";

const Navbar = () => {
  return (
    <nav className="flex w-full flex-between z-50 shadow-light-300 dark:shadow-none px-5">
      <Link href="/" className="flex items-center gap-1">
        <Logo
          width={23}
          height={23}
        />
        <p className="h2-bold text-light-850 dark:text-light-900 max-sm:hidden">
          Ask <span className="text-primary-500">AI</span>
        </p>
      </Link>
      <div className="flex-between gap-1">
        <Theme />
        <NewChat />
      </div>
    </nav>
  );
};

export default Navbar;
