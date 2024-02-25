import { getChatModel, setChatModel } from "@/actions/get-chat";
import { modelPrecision, userRoles } from "@/constants";
import { useSetting } from "@/hooks/useSetting";
import React, { useEffect, useState } from "react";
import ModalContext from "./ModalContext";
import toast from "react-hot-toast";
import { deleteUserProfileHistory } from "@/actions/get-profiles";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi";
import { systemChatModelSpeed } from "@/constants/general";
import SpinningLoading from "../shared/loader/SpinningLoading";
import { useRouter } from "next/navigation";
import { RandomNumberInRange } from "@/lib/utils";

type ModelSettingProps = {
  setList: any;
  scrollToButtom?: any;
};

const ModelSetting = ({ setList, scrollToButtom }: ModelSettingProps) => {
  const [modelType, setModelType] = useState(0);
  const { projectInfo, onSet } = useSetting();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    scrollToButtom();
  }, []);

  useEffect(() => {
    const getModelInfo = async () => {
      setLoading(true);
      const response = await getChatModel();
      if (response?.data && response?.data?.result) {
        setModelType(response?.data.result.key),
          onSet({
            ...projectInfo,
            modelType: response?.data.result.key,
            modelTypeMsg: response.data.msg,
          });
      }
      setLoading(false);
    };
    getModelInfo();
  }, []);

  const changeModelType = async (model: number) => {
    setLoading(true);
    const response = await setChatModel(Number(model));
    if (response?.data) {
      setModelType(model),
        onSet({
          ...projectInfo,
          modelType: model,
          modelTypeMsg: response.data.msg,
        });
      setLoading(false);
    }
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  const handleDeleteHistory = async () => {
    if (projectInfo.user.role === userRoles.LOGGEDIN) {
      // Fetch the history
      const response = await deleteUserProfileHistory(
        Number(projectInfo?.user.id)
      );
      if (response?.data?.ok) {
        setList([]);
        toast.success("!تاریخچه سوالاتت رو پاک کردم");
      } else {
        toast.error("!نتونستم تاریخچه رو برات پاک کنم، دوباره تلاش کن");
      }
    } else {
      const randomChatId = RandomNumberInRange(2, 1000);
      router.push("/chat/" + randomChatId);
      setList([]);
      toast.success("!تاریخچه سوالاتت رو پاک کردم");
    }
  };

  return (
    <>
      {loading && <SpinningLoading fullHeight={true} width="16" height="16" />}
      {!loading && (
        <div className="flex flex-col h-fit px-2 py-5">
          <div className="flex justify-between w-full flex-col border rounded-lg background-system-setting">
            <div className="flex justify-center mt-6 gap-6">
              <div className="flex-center gap-x-1">
                <label
                  htmlFor="normalModel"
                  className="ms-2 flex-1 text-sm font-medium cursor-pointer"
                >
                  {modelPrecision[1].label}
                </label>
                <input
                  id="normalModel"
                  type="radio"
                  value={modelPrecision[1].value}
                  name="normal-radio"
                  checked={modelType === modelPrecision[1].value}
                  onChange={() => {
                    changeModelType(modelPrecision[1].value);
                  }}
                  className="w-4 h-4 cursor-pointer text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500
                                  dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex-center gap-x-1">
                <label
                  htmlFor="powerfulModel"
                  className="ms-2 flex-1 text-sm font-medium cursor-pointer"
                >
                  {modelPrecision[0].label}
                </label>
                <input
                  id="powerfulModel"
                  type="radio"
                  value={modelPrecision[0].value}
                  name="powerful-radio"
                  checked={modelType === modelPrecision[0].value}
                  onChange={() => {
                    changeModelType(modelPrecision[0].value);
                  }}
                  className="w-4 h-4 cursor-pointer text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500
                              dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <div className="background-send_upload text-light700_dark500 text-center text-[0.9rem] py-1 mt-5 rtl-grid rounded-md">
              {projectInfo.modelTypeMsg || systemChatModelSpeed.message}
            </div>
          </div>
          <div className="cursor-pointer w-full text-dark400_light900 text-base font-bold flex-center gap-3 py-3 hover:underline sm:flex-row flex-col-reverse">
            <div
              onClick={handleModal}
              className="px-2 py-3 gap-2 text-[0.8rem] flex-center flex-col text-center background-system-setting rounded-md h-full"
            >
              دوست داری هولوگرام رو برات عوض کنم؟
              <HiOutlineHeart size={24} color="red" />
            </div>

            <div
              onClick={handleDeleteHistory}
              className="px-2 py-3 gap-2 text-[0.8rem] flex-col flex-center text-center background-system-setting rounded-md h-full"
            >
              نظرت چیه که تاریخچه سوالاتت رو پاک کنم؟
              <HiQuestionMarkCircle size={24} color="green" />
            </div>
          </div>
          {modalOpen && (
            <ModalContext open={modalOpen} setModalOpen={setModalOpen} />
          )}
        </div>
      )}
    </>
  );
};

export default ModelSetting;
