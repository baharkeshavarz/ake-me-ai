import { ProfileItem } from "@/types";
import { getProfiles } from "@/queries/Profiles";

const getAllProfiles = async() => {
  return (await getProfiles().then(
    (result) => result.data
  )) as ProfileItem[];
};


export default getAllProfiles;