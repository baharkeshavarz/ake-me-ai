import {
  chatFaq,
  chatProfile,
  getChatModelType,
  setChatModelType,
} from "@/queries/Chat";
import { ChatFaq, ChatModelType, ChatProfile, ChatResponse } from "@/types";

export const getChatByFaq = async (chatId: number, questionTxt: string) => {
  const formData: ChatFaq = {
    chat_id: chatId,
    question: questionTxt,
  };
  return (await chatFaq(formData).then((result) => result)) as ChatResponse[];
};

export const getChatByProfile = async (
  profileId: number,
  questionTxt: string
) => {
  const formData: ChatProfile = {
    profile_id: profileId,
    question: questionTxt,
  };
  return (await chatProfile(formData).then(
    (result) => result
  )) as ChatResponse[];
};

export const setChatModel = async (model: number) => {
  const formData: ChatModelType = {
    model: model,
  };
  return await setChatModelType(formData).then((result) => result);
};

export const getChatModel = async () => {
  return await getChatModelType().then((result) => result);
};
