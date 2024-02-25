"use client";

import React, { useEffect, useState } from "react";
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
import { useSetting } from "@/hooks/useSetting";
import { gettSettingLogo } from "@/actions/get-setting";


const MobileNav = () => {
  const { projectInfo } = useSetting();
  const [logo, setLogo] = useState("");

  // Find the logo
  useEffect(() => {
    const getSettingLogo = async () => {
      try {
      const response = await gettSettingLogo(projectInfo.id);
      const data = await response.blob();
      const logoUrl = URL.createObjectURL(data);
      setLogo(logoUrl);
      } catch (error) {
        console.log("error", error);
      } 
    };
    getSettingLogo();
  }, [projectInfo]);


  return (
    <div className="background-light900_dark400 flex-between w-full p-5">
      <NewChat />
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={logo}
          width={35}
          height={35}
          alt="لوگو"
        />
        <p className="h5-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
         دستیار هوشمند <span className="text-primary-500"> {projectInfo.name}</span>
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
