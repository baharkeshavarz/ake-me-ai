"use client";

import React from "react";
import Navbar from "./navbar/Navbar";
import { drawerLength } from "@/constants";
import NavUserInfo from "./navbar/NavUserInfo";
import NavbarMessageList from "../messages/NavbarMessageList";

const RightSidebar = () => {
  const drawer = `lg:w-[${drawerLength}px]`; 
  return (
    <section
      className={`flex h-screen flex-col justify-between border-r bg-dark-500 p-5
            shadow-light-200 dark:shadow-none max-sm:hidden ${drawer}`}
    >
      <Navbar/>
      <NavbarMessageList/>
      <NavUserInfo/>
    </section>
  );
};

export default RightSidebar;
