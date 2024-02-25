"use client";

import React, { useEffect, useState } from "react";
import NavbarMessageCard from "./NavbarMessageCard";
import { getSampleFaqs } from "@/actions/get-faqs";

const NavbarMessageList = () => {
  const [historyList, setHistoryList ] = useState([]);
  useEffect(() => {
    const getData = async() => {
      const list = await getSampleFaqs(10);
      setHistoryList(list);
    }
    getData();
  }, [])
  
  return (
    <div className="custom-scrollbar flex flex-col overflow-y-auto px-2 text-sm sm:min-h-[400px]">
        {historyList.map((item: string) => (
          <NavbarMessageCard
            key={item}
            title={item}
          />
        ))}
    </div>
  );
};

export default NavbarMessageList;
