import axios, { API_URL } from "../lib/axios";

export const gettSettingList = () => {
  return axios.get("/bankinfo");
};


export const getProjectLogo = (name: string) => {
  return fetch(`${API_URL}/download/bank/image/${name}`);
}

