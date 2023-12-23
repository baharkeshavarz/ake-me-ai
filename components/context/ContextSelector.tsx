import React from "react";
import ContextMessageCard from "./ContextMessageCard";
import { contextMessageList, contextVideoPatterns } from "@/constants";
import ContextVideoCard from "./ContextVideoCard";

const ContextSelector = () => {
  return (
    <div className="flex w-full gap-5 pt-5">
      <div className="light-border flex flex-col items-center justify-center rounded-lg p-5">
        <h3 className="text-dark400_light900 py-2">
          نوع ویدثوی درخواستی خود را انتخاب نمایید
        </h3>
        <ContextVideoCard items={contextVideoPatterns} />
      </div>
      <div className="flex flex-col items-start justify-start gap-5">
        {contextMessageList.map((context) => (
          <div key={context.id} className="light-border w-full rounded-lg px-5">
            <ContextMessageCard
              id={context.id}
              title={context.title}
              messages={context.messages}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextSelector;
