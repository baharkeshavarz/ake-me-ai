"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import NewChat from "@/components/chats/NewChat";
import NavbarMessageList from "@/components/chats/NavbarMessageList";
import Navbar from "./Navbar";
import NavUserInfo from "./NavUserInfo";

const MobileNav = () => {
  return (
    <div className="background-light900_dark400 flex-between w-full p-5">
      <NewChat />
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="chatBot"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
          AI <span className="text-primary-500">Questioning</span>
        </p>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/assets/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Manu"
            className="invert-colors sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="right" className="border-none bg-black">
          <div className="flex flex-col">
            <SheetClose asChild>
              <>
                <Navbar />
                <div className="flex-1 overflow-y-auto px-2">
                  <NavbarMessageList />
                </div>
                <NavUserInfo />
              </>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
