import axios from "../lib/axios"

export const getVideo = (gender: string) => {
    return axios.get("/api/v1/getVoice", {
        params: {
            gender
        }
      })
}