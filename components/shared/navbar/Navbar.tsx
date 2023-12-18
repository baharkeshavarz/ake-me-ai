"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="absolute w-full flex-between z-50 shadow-light-300 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow"
        />
        <p className="h2-bold text-light-850 dark:text-light-900 max-sm:hidden">
          Ask <span className="text-primary-500">AI</span>
        </p>
      </Link>
      <div className="flex-between gap-1">
        <Theme />
      </div>
    </nav>
  );
};

export default Navbar;
