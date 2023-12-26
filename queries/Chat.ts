import { ChatFaq, ChatProfile } from "@/types"
import axios from "../lib/axios"

export const chatFaq = (data: ChatFaq) => {
    const url = `/chat/faq?faq_id=${data.faq_id}&question=${encodeURIComponent(data.question)}`;
    return axios.post(url);
}

export const chatProfile = (data: ChatProfile) => {
    const url = `/chat/profile?profile_id=${data.profile_id}&question=${encodeURIComponent(data.question)}`;
    return axios.post(url);
}