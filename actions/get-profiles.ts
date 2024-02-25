import { ProfileHistory, ProfileItem, ProfileResponse } from "@/types";
import { deleteProfileHistory, getProfileHistory, getProfiles, updateOrInsertProfileService } from "@/queries/Profiles";

export const getAllProfiles = async() => {
  return (await getProfiles().then(
    (result) => result.data
  )) as ProfileItem[];
};


export const getAllProfileHistory = async(profileId: number) => {
  const formData: ProfileHistory = {
    "profile_id": profileId,
  };
  
 return (await getProfileHistory(formData).then(
   (result) => result
 ));
};

export const updateOrInsertProfile = async(id: number, name: string, profile: string) => {
  const formData: ProfileItem = {
       "id": id,
       "name": name,
       "profile": profile,
     };

 return (await updateOrInsertProfileService(formData).then(
   (result) => result.data
 )) as ProfileResponse;
};

export const deleteUserProfileHistory = async(profileId: number) => {
  const formData: ProfileHistory = {
    "profile_id": profileId,
  };
  
 return (await deleteProfileHistory(formData).then(
   (result) => result
 ));
};