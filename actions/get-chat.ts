import { chatFaq } from "@/queries/Chat";
import { ChatFaq, ChatFaqResponse } from "@/types";

const getChatByFaq = async(faqId: number, questionTxt: string) => {
   const formData: ChatFaq = {
        "faq_id": faqId,
        "question": questionTxt,
      };
  return (await chatFaq(formData).then(
    (result) => console.log(`result.detail: ${result}`)
  )) as ChatFaqResponse[];
};


export default getChatByFaq;