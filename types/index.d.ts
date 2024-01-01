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
  role: roles.SYSTEM | roles.USER
}

/* Profile */
export interface ProfileItem {
  id: number;
  profile: string;
  name: string;
}

/* Chat */
export interface ChatFaq {
  faq_id: number;
  question: string;
}

export interface ChatResponse {
  response: string;
  msg: string;
  response_id: string;
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