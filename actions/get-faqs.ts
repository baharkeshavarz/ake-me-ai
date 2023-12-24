import { FaqItem } from "@/types";
import { getFaqs } from "@/queries/Faqs";

export const getAllFaqs = async() => {
  return (await getFaqs().then(
    (result) => result.data
  )) as FaqItem[];
};