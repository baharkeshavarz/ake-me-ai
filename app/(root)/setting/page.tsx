"use client";

import { gettSetting } from "@/actions/get-setting";
import SpinningLoading from "@/components/shared/loader/SpinningLoading";
import { Button } from "@/components/ui/button";
import { useSetting } from "@/hooks/useSetting";
import { ProjectItem, ProjectSetting } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Setting = () => {
  const [loading, setLoading] = useState(false);
  const [settingList, setSettingList] = useState<ProjectItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectSetting>({
    id: "",
    name: "",
    user: { id: "", name: "", role: "", profileContent: "", historyList: [] },
    modelType: 0,
    modelTypeMsg: "",
  });
  const { onSet } = useSetting();
  const router = useRouter();

  useEffect(() => {
    const getSettings = async () => {
      try {
        setLoading(true);
        const response = await gettSetting();
        setSettingList(response);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    getSettings();
  }, []);

  const handleSetting = () => {
    setLoading(true);
    onSet({
      id: selectedProject.id,
      name: selectedProject.name,
      user: {
        id: "",
        name: "",
        role: "",
        profileContent: "",
        historyList: [],
      },
      modelType: 0,
      modelTypeMsg: "",
    });

    toast.success(`بزن بریم که باید کلی سوال رو جواب بدیم`);
    router.push("/chat/1");
  };

  return (
    <div className="flex-start max-w-2xl mx-auto flex-col bg-gray-50 border border-md mt-10 rtl-grid">
      {settingList.map((info) => (
        <div key={info.id} className="w-full gap-2">
          <div className="flex items-center border border-md p-2 m-2 bg-white">
            <input
              id={info.id.toString()}
              type="radio"
              value=""
              name="default-radio"
              onClick={() =>
                setSelectedProject({
                  id: info.filename,
                  name: info.name,
                  user: { id: "", name: "", role: "", profileContent: "", historyList: [] },
                  modelType: 0,
                  modelTypeMsg: "",           
                })
              }
              className="w-4 h-4 cursor-pointer text-primary-500 bg-gray-100 border-gray-300 focus:ring-primary-500
                      dark:focus:ring-primary-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={info.id.toString()}
              className="ms-2 flex-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {info.name}
            </label>
          </div>
        </div>
      ))}
      <div className="flex-center w-full gap-4 py-2">
        <Button
          type="submit"
          disabled={loading}
          className="bg-black text-white flex-center gap-3"
          onClick={handleSetting}
        >
          {loading ? (
            <>
              ثبت
              <SpinningLoading width="4" height="4" />
            </>
          ) : (
            "ثبت"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Setting;
