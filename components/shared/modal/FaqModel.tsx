"use client";

import { HiMiniXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";

const defaultWidth = "sm:w-[550px] w-full"

type FaqModalProps = {
  children: React.ReactNode;
  open: boolean;
  setModalOpen: any;
  onCloseFunc?: any;
  width?: string;
};

const FaqModal = ({ children, onCloseFunc, open, setModalOpen, width = defaultWidth}: FaqModalProps) => {
  const [isOpen, setIsOpen] = useState(open);
  useEffect(()  => {
    setIsOpen(open);
  }, [open])

  
  const hanleClose = () => {
    setIsOpen(false);
    setModalOpen(false);
    if (onCloseFunc) {
      onCloseFunc();
    }
    //router.push(pathname);
  };

  return (
    <>
      {isOpen && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-[9999] overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white rounded-lg m-auto p-4 max-h-[700px] overflow-y-scroll">
            <div
               className={`flex flex-col items-center p-2 gap-4 ${width}`}
             >
              <div className="flex-end w-full p-0 pb-2">
                <button
                  onClick={hanleClose}
                  type="button"
                  className="bg-black text-white text-sm p-2 flex-center rounded-md hover:bg-black/70 transition-all delay-75"
                >
                  <HiMiniXMark />
                 بستن
                </button>
              </div>
              <div className={`${defaultWidth} ${width}`}>
                  {children}
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default FaqModal;
