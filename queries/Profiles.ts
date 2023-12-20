import axios from "../lib/axios"

export const getProfiles = () => {
    return axios.get("/users");
}