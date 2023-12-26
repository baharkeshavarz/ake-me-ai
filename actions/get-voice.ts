import { voiceByQuestion } from "@/queries/Voices";
import { VoiceItem } from "@/types";

// export interface voiceByQuestionProps {
//   question: string;
//   gender: string;
// }

export const getVoiceByQuestion = async(question: string, gender="woman") => {
  return (await voiceByQuestion(question, gender).then(
    (result) => result.data
  )) as VoiceItem;
};


