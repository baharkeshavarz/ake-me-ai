import { voiceByQuestion } from "@/queries/Voices";
import { VoiceItem } from "@/types";

export const getVoiceByQuestion = async(question: string, gender="woman") => {
  return (await voiceByQuestion(question, gender).then(
    (result) => result.data
  )) as VoiceItem;
};


