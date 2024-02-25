import { FaqItem } from "@/types";
import axios from "../lib/axios";

export const getFaqs = () => {
  return axios.get("/faq");
};

export const updateOrInsertFaqService = (data: FaqItem) => {
  const url = `/faq?id=${data.id}&name=${encodeURIComponent(
    data.name
  )}&faq=${encodeURIComponent(data.faq)}`;
  return axios.post(url);
};

export const getSampleFaqsQuery = (faqCount: number) => {
  return axios.get(`/faq/samples/${faqCount}`);
}