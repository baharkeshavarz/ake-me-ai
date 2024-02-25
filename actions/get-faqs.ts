import { FaqItem, FaqResponse } from "@/types";
import { getFaqs, getSampleFaqsQuery, updateOrInsertFaqService } from "@/queries/Faqs";

export const getAllFaqs = async() => {
  return (await getFaqs().then(
    (result) => result.data
  )) as FaqItem[];
};


export const updateOrInsertFaq = async(id: number, name: string, faq: string) => {
  const formData: FaqItem = {
       "id": id,
       "name": name,
       "faq": faq,
     };

 return (await updateOrInsertFaqService(formData).then(
   (result) => result.data
 )) as FaqResponse;
};


export const getSampleFaqs = async(faqCount: number ) => {
  return (await getSampleFaqsQuery(faqCount).then(
    (result) => result.data
  ));
};