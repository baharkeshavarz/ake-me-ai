import { ProfileHistory, ProfileItem } from "@/types";
import axios from "../lib/axios"

export const getProfiles = () => {
    return axios.get("/profile");
}

export const getProfileHistory = (data: ProfileHistory) => {
    const url = `/chat/profile/history/${encodeURIComponent(data.profile_id)}`;
    return axios.get(url);
 }

export const updateOrInsertProfileService = (data: ProfileItem) => {
   const url = `/profile?id=${data.id}&name=${encodeURIComponent(data.name)}&profile=${encodeURIComponent(data.profile)}`;
   return axios.post(url);
}


export const deleteProfileHistory = (data: ProfileHistory) => {
    const url = `/chat/profile/history/${encodeURIComponent(data.profile_id)}`;
    return axios.delete(url);
 }