import { FaqItem, FaqResponse, ProjectItem } from "@/types";
import { updateOrInsertFaqService } from "@/queries/Faqs";
import { getProjectLogo, gettSettingList } from "@/queries/Setting";

export const gettSetting = async() => {
  return (await gettSettingList().then(
    (result) => result.data
  )) as ProjectItem[];
};


export const gettSettingLogo = async(fileName : string) => {
  return (await getProjectLogo(fileName).then(
    (result) => result
  ));
};