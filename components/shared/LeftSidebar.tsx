"use client";

import React from "react";
import Navbar from "./navbar/Navbar";
import { drawerLength } from "@/constants";
import NavUserInfo from "./navbar/NavUserInfo";
import NavbarMessageList from "../messages/NavbarMessageList";

const LeftSidebar = () => {
  const drawer = `lg:w-[${drawerLength}px]`; 
  return (
    <section
      className={`flex h-screen flex-col justify-between border-r bg-dark-500 p-5
            shadow-light-300 dark:shadow-none max-sm:hidden ${drawer}`}
    >
      <Navbar/>
      <NavbarMessageList/>
      <NavUserInfo/>
    </section>
  );
};

export default LeftSidebar;
