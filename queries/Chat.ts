import { ChatFaq, ChatModelType, ChatProfile } from "@/types";
import axios from "../lib/axios";

export const chatFaq = (data: ChatFaq) => {
  const url = `/chat/faq?chat_id=${data.chat_id}&question=${encodeURIComponent(
    data.question
  )}`;
  return axios.post(url);
};

export const chatProfile = (data: ChatProfile) => {
  const url = `/chat/profile?profile_id=${
    data.profile_id
  }&question=${encodeURIComponent(data.question)}`;
  return axios.post(url);
};

export const setChatModelType = (data: ChatModelType) => {
  const url = `/chat/setting/model/${data.model}`;
  return axios.post(url);
};

export const getChatModelType = () => {
  const url = "/chat/setting/model";
  return axios.get(url);
};
