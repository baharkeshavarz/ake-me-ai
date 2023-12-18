"use client";

import React from "react";
import Navbar from "./navbar/Navbar";
import Logo from "./Logo";

const LeftSidebar = () => {
  return (
    <section
      className="bg-dark-500 flex
            h-screen flex-col justify-between border-r 
            shadow-light-300 dark:shadow-none max-sm:hidden
            lg:w-[266px]"
    >
      <Navbar/>
      <div className="flex flex-col text-light-800 h-[1200px] custom-scrollbar overflow-y-auto text-sm">
      با جت وام هرجایی که هستی فقط کافیه به اینترنت متصل باشی و با سفته الکترونیک یا چک صیادی و بدون دردسر و خیلی سریع وام بگیری
      با جت وام هرجایی که هستی فقط کافیه به اینترنت متصل باشی و با سفته الکترونیک یا چک صیادی و بدون دردسر و خیلی سریع وام بگیری
      با جت وام هرجایی که هستی فقط کافیه به اینترنت متصل باشی و با سفته الکترونیک یا چک صیادی و بدون دردسر و خیلی سریع وام بگیری
      با جت وام هرجایی که هستی فقط کافیه به اینترنت متصل باشی و با سفته الکترونیک یا چک صیادی و بدون دردسر و خیلی سریع وام بگیری
      با جت وام هرجایی که هستی فقط کافیه به اینترنت متصل باشی و با سفته الکترونیک یا چک صیادی و بدون دردسر و خیلی سریع وام بگیری
      با جت وام هرجایی که هستی فقط کافیه به اینترنت متصل باشی و با سفته الکترونیک یا چک صیادی و بدون دردسر و خیلی سریع وام بگیری
     
      کل فرآیندهای گرفتن وام رو با سرعت جت طی کن
      کل فرآیندهای گرفتن وام رو با سرعت جت طی کنکل فرآیندهای گرفتن وام رو با سرعت جت طی کن

      کل فرآیندهای گرفتن وام رو با سرعت جت طی کن
      کل فرآیندهای گرفتن وام رو با سرعت جت طی کن
      </div>

      <div className="w-full h-28 flex-center gap-2">
        <Logo width={20} height={20} />
        <span className="text-light-850">Bahar Keshavarz</span>
      </div>
    </section>
  );
};

export default LeftSidebar;
