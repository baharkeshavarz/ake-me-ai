import { ProfileItem } from "@/types";
import { defaultApiHandler } from "../lib/handleApiError";
import { getProfiles } from "@/queries/Profiles";

const getAllProfiles = async() => {
  return (await getProfiles().then(defaultApiHandler).then(
    (result) => console.log(result)
  )) as ProfileItem[];
};


export default getAllProfiles;