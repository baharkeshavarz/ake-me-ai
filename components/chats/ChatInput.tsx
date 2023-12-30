"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import SendIcon from "../shared/SendIcon";

type ChatInputProps = {
  chatId: string;
};

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [question, setQuestion] = useState("");
  const [canAskQuestion, setCanAskQuestion] = useState(false);
  return (
    <div className="background-light900_dark400 light-border relative flex min-h-[56px] w-full items-center justify-center gap-4 rounded-xl px-4 py-2">
      <SendIcon
        question={question}
        setQuestion={setQuestion}
        setCanAskQuestion={setCanAskQuestion}
        chatId={chatId}
      />
      <Input
        type="text"
        placeholder={
          !canAskQuestion
            ? ".زمینه ی سوالت را انتخاب کن! بعدش سوالت رو از من بپرس"
            : "چه جوری می تونم کمکت کنم؟"
        }
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="no-focus placeholder paragraph-regular background-light900_dark400 border-none text-right shadow-none outline-none"
      />
    </div>
  );
};

export default ChatInput;
