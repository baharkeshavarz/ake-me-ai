import axios from "../lib/axios"

export const voiceByQuestion = (question: string, gender="woman") => {
    return axios.post(`/voice?text=${question}&gender=${gender}`);
}