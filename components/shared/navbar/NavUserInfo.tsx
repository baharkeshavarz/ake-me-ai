"use client";

import React, { useState } from "react";
import UserProfile from "./UserProfile";
import { useSetting } from "@/hooks/useSetting";
import { getFirstLetters } from "@/lib/utils";

const NavUserInfo = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { projectInfo } = useSetting();

  return (
    <div className="relative z-10">
      <div
        className={`flex-center h-24 w-full gap-2 hover:rounded-lg hover:bg-dark-400 cursor-pointer ${
          showMenu ? "bg-dark-400" : ""
        }`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="text-light-850 text-sm">
           {projectInfo.user && projectInfo.user.name}
        </div>
        <div className="flex-center h-10 w-10 text-center rounded-full bg-primary-500 p-1 text-[0.6rem]">
            {getFirstLetters(projectInfo.user && projectInfo.user.name)}
        </div>
      </div>
      {showMenu && <UserProfile setShowMenu={setShowMenu} />}
    </div>
  );
};

export default NavUserInfo;
