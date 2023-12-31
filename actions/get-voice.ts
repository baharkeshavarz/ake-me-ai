import { uploadVoice, voiceByQuestion } from "@/queries/Voices";
import { VoiceItem } from "@/types";

export const getVoiceByQuestion = async(question: string, gender="woman") => {
  return (await voiceByQuestion(question, gender).then(
    (result) => result.data
  )) as VoiceItem;
};


export const uploadVoiceToGetTransscribe = async(file: any) => {
  return (await uploadVoice(file).then(
    (result) => result
  ));
};


