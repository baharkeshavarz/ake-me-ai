import { chatFaq, chatProfile } from "@/queries/Chat";
import { ChatFaq, ChatProfile, ChatResponse } from "@/types";

export const getChatByFaq = async(faqId: number, questionTxt: string) => {
   const formData: ChatFaq = {
        "faq_id": faqId,
        "question": questionTxt,
      };
  return (await chatFaq(formData).then(
    (result) => result
  )) as ChatResponse[];
};

export const getChatByProfile = async(profileId: number, questionTxt: string) => {
  const formData: ChatProfile = {
       "profile_id": profileId,
       "question": questionTxt,
     };
 return (await chatProfile(formData).then(
   (result) => result
 )) as ChatResponse[];
};


