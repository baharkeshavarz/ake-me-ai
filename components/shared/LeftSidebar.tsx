"use client";

import Link from "next/link";
import React from "react";
import { QuestionsList } from "@/constants/patterns";

const LeftSidebar = () => {
  return (
    <section
      className="bg-dark-500 custom-scrollbar sticky left-0 top-0 flex
            h-screen flex-col justify-between overflow-y-auto border-r p-6 
            shadow-light-300 dark:shadow-none max-sm:hidden
            lg:w-[266px]"
    >
      <div className="flex flex-1 flex-col gap-6">
        {QuestionsList.map((item) => {
          return (
            <Link
              key={item.id}
              href=""
              className="flex items-center justify-start gap-2 bg-transparent p-2"
            >
              <p className="text-light-700 max-lg:hidden">
                {item.date}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
