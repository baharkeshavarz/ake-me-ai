"use client";

import React from "react";
import Link from "next/link";
import Theme from "./Theme";
import Logo from "../Logo";
import NewChat from "@/components/messages/NewChat";

const Navbar = () => {
  return (
    <nav className="flex-between z-50 flex h-16 w-full bg-dark-450 px-5 shadow-dark-200 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <Logo
          width={23}
          height={23}
        />
        <p className="h3-bold text-light-850 dark:text-light-900 max-sm:hidden">
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
