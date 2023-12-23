import axios from "../lib/axios"

export const getHolograms = () => {
    return axios.get("/hologram")
}