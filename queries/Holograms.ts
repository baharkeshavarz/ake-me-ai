import axios from "../lib/axios"

export const getHolograms = () => {
    return axios.get("/hologram");
}

export const downloadHologramByName = (name: string) => {
    return axios.get(`/download/${name}`);
}