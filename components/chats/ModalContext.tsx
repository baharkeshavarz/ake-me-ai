"use client";

import React from "react";
import ContextSelector from "../context/ContextSelector";
import FaqModal from "../shared/modal/FaqModel";

interface ModalContextProps{
  open: boolean;
  setModalOpen: any;
}

const ModalContext = ({ open, setModalOpen }: ModalContextProps) => {
  return (
    <FaqModal width="600px" open={open} setModalOpen={setModalOpen} onCloseFunc={() => {}}>
       <ContextSelector />
    </FaqModal>
  );
};

export default ModalContext;
