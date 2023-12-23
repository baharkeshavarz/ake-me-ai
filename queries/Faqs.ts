import axios from "../lib/axios"

export const getFaqs = () => {
    return axios.get("/faq")
}