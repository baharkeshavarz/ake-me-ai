import { ProjectSetting } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingProps = {
  projectInfo: ProjectSetting;
  onSet: (infoData: ProjectSetting) => void;
  onRemove: () => void;
};

const emptyInfo: ProjectSetting = {
  id: "",
  name: "",
  user: {
    role: "",
    id: "",
    name: "",
    firstProfile: 0,
    profileContent: "",
    historyList: [],
  },
  modelType: 0,
  modelTypeMsg: "",
};

export const useSetting = create(
  persist(
    (set: any) => ({
      projectInfo: emptyInfo,
      onSet: (data: ProjectSetting) => {
        set({ projectInfo: data });
      },
      onRemove: () => set({ projectInfo: emptyInfo }),
    }),
    {
      name: "project-info",
    }
  )
);
