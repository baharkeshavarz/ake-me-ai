import { boolean } from "zod";
import { messageTypes, roles } from "../constants";

/* General interfaces */
export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export interface URLProps {
  params: { id: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}

/* Faq */
export interface FaqItem {
  id: number;
  faq: string;
  name: string;
}

export interface HologramItem {
  id: number;
  name: string;
  unique_id: string;
  role: roles.SYSTEM | roles.USER;
}

/* Profile */
export interface ProfileItem {
  id: number;
  profile: string;
  name: string;
}

export interface ProfileResponse {
  ok: boolean;
  msg: string;
}

export interface ProfileHistory {
  profile_id: number;
}


export interface ProfileHistoryResponse{
  data: ProfileHistoryResponse;
  role: string;
  content: {
    type: string;
    value: string;
  }[];
};


/* Chat */
export interface ChatFaq {
  chat_id: number;
  question: string;
}

export interface FaqResponse {
  ok: boolean;
  msg: string;
}

export interface ChatResponse {
  response: string;
  msg: string;
  response_id: string;
  elapsed_time: float;
}

export interface ChatProfile {
  profile_id: number;
  question: string;
}

export interface ChatMessageResponse {
  id: string;
  type: messageTypes.text | messageTypes.voice | messageTypes.video;
  message: string;
  creator: string;
  voiceId?: string;
  videoId?: string;
  elapsedTime?: float;
  isHistory?: boolean,
}

/* Voice */
export interface VoiceItem {
  url: number;
  unique_id: string;
}

/* Data for choosing the contex */
export interface ContextValues {
  contextType: string;
  contextId: number;
  hologram: string;
  selectedProfile: number;
}

export interface historyMessages {
  id: string;
  message: string;
}

export interface historyMessageItem {
  id: string;
  title: string;
  content: historyMessages[];
}

export interface transcriptResponse {
  ok: boolean;
  transcript: string;
}

/* Setting */
export interface ProjectSetting {
  id: string;
  name: string;
  user: {
    id: string;
    role: string;
    name: string;
    firstProfile?: number;
    profileContent: string;
    historyList: ChatMessageResponse[]; 
  };
  modelType: number;
  modelTypeMsg: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  filename: string;
}

export interface UserItem {
  value: number;
  label: string;
  content: string;
}


export interface ChatModelType {
  model: number;
}

