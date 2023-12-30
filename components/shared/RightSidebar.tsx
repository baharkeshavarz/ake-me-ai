"use client";

import React from "react";
import Navbar from "./navbar/Navbar";
import NavUserInfo from "./navbar/NavUserInfo";
import NavbarMessageList from "../chats/NavbarMessageList";
import { configInfo } from "@/constants";

const RightSidebar = () => {
  const drawer = `lg:w-[${configInfo.drawerLength}px]`;
  return (
    <section
      className={`flex h-screen flex-col justify-start border-r bg-dark-500 p-5
            shadow-light-200 max-sm:hidden dark:shadow-none ${drawer}`}
    >
      <Navbar />
      <NavbarMessageList />
      <NavUserInfo />
    </section>
  );
};

export default RightSidebar;
