import { getProfiles } from "@/queries/Profiles";
import { User } from "@/types";
import { defaultApiHandler } from "../lib/handleApiError";

const getAllProfiles =  async() => {
  return (await getProfiles().then(defaultApiHandler).then(
    (result) => result
  )) as User[];
};


export default getAllProfiles;