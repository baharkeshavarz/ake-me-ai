import axios from "../lib/axios"

export const getFaqs = () => {
    return axios.get("/api/v1/getFaqs")
}