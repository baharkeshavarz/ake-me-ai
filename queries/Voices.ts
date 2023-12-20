import axios from "../lib/axios"

export const getVoice = (chatId: number, gender: string) => {
    return axios.get("/api/v1/getVoice", {
        params: {
            chatId,
            gender
        }
      })
}