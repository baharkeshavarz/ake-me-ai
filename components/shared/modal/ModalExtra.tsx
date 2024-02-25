"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { HiMiniXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

type ModalProps = {
  children: React.ReactNode;
  onCloseFunc?: any;
  width?: string;
};

const defaultWidth = "sm:w-[550px] w-full";

const ModalExtra = ({
  children,
  onCloseFunc,
  width = defaultWidth,
}: ModalProps) => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal-info");
  const pathname = usePathname();
  const router = useRouter();

  const hanleClose = () => {
    if (onCloseFunc) {
      onCloseFunc();
    }
    router.push(pathname);
  };

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 topZIndex overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white rounded-lg m-auto p-4 max-h-[700px] overflow-y-scroll">
            <div className={`flex flex-col items-center p-2 gap-4 ${width}`}>
              <div className="flex-end w-full p-0 pb-2">
                <button
                  onClick={hanleClose}
                  type="button"
                  className="bg-black text-white p-2 flex-center rounded-md hover:bg-black/70 transition-all delay-75"
                >
                  <HiMiniXMark />
                  بستن
                </button>
              </div>
              {children}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ModalExtra;
