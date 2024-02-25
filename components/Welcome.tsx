"use client";

import React from "react";
import Logo from "./shared/Logo";
import ModelSetting from "./chats/ModelSetting";

const Welcome = () => {
  return (
    <div className="my-auto flex h-[600px] flex-col items-center justify-center gap-2">
      <Logo width={100} height={100} />
      <h1 className="md:h2-bold h4-bold text-dark500_light500 text-center p-3 mb-4">
        !من ظرف چند دقیقه آینده به همه سوالاتت جواب میدم. فقط کمی صبر کن. ازت
        بی‌نهایت ممنونم
      </h1>

      <div className="sticky top-0 left-0 mx-auto px-5 z-10 bg-white/90 dark:bg-dark-500 w-full rounded-md">
        <ModelSetting setList={() => {}} scrollToButtom={() => {}} />
      </div>
    </div>
  );
};

export default Welcome;
