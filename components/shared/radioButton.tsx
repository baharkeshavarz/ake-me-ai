"use client";

import React, { useEffect, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SpinningLoading from "./loader/SpinningLoading";
import ModalInfo from "../chats/ModalInfo";

interface RadioButtonComponentProps {
  id: string;
  labelText: string;
  name: string;
  value: string;
  content: string;
  hasHover?: boolean;
  changeHandler?: (e: any) => void;
  card: string;
  setListUpdated: any;
}

const RadioButtonComponent = ({
  id,
  labelText,
  name,
  value,
  content,
  hasHover = false,
  changeHandler,
  card,
  setListUpdated,
}: RadioButtonComponentProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(true);
  }

  const handleToggleUpdate = () => {
    setIsUpdating(!isUpdating);
  };

  useEffect(() => {
    setIsUpdating(false);
  }, []);

  return (
    <div className="mb-3.5 flex items-center gap-1 px-1 w-full justify-start">
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        data-card={card}
        onClick={changeHandler}
        className="h-4 w-4 text-primary-500 checked:bg-primary-500 focus:outline-none focus:ring-1"
    />
      {!hasHover ? (
        <label
          htmlFor={name}
          className="ms-2 text-sm text-gray-900 dark:text-gray-300"
        >
          {labelText}
        </label>
      ) : (
        <HoverCard>
          <HoverCardTrigger className="text-[0.75rem] hover:cursor-pointer ltr-grid">
            {isUpdating && loading && <SpinningLoading />}
            {isUpdating && !loading ? (
              <ModalInfo
                id={value}
                title={labelText}
                description={content}
                type={card}
                setListUpdated={setListUpdated}
                setLoading={setLoading}
                open={modalOpen}
                setModalOpen={setModalOpen}
              />
            ) : (
              ""
            )}
            {!loading ? (
              <div onClick={handleModal} >
                <div
                  onClick={handleToggleUpdate}
                  className="small-regular text-dark-100 py-2 cursor-pointer hover:underline hover:rounded-md"
                >
                  {labelText}
                </div>
              </div>
            ) : (
              ""
            )}
          </HoverCardTrigger>
          {!isUpdating && (
            <HoverCardContent className="background-light850_dark100 w-[700px] text-sm">
              {content}
            </HoverCardContent>
          )}
        </HoverCard>
      )}
    
    </div>
  );
};

export default RadioButtonComponent;
