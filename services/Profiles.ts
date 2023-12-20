import axios from "../lib/axios"

export const getProfiles = () => {
    return axios.get("/api/v1/getProfiles")
}