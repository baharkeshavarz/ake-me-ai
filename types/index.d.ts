import { messageTypes } from "../constants";

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
}

/* Hologram */
export interface HologramItem {
  id: number;
  name: string;
  unique_id: string;
}

/* Profile */
export interface ProfileItem {
  id: number;
  profile: string;
}

/* Chat */
export interface ChatFaq {
  faq_id: number;
  question : string;
}

export interface ChatResponse {
  response: string;
  response_id : string;
}

export interface ChatProfile {
  profile_id: number;
  question : string;
}

export interface ChatMessageResponse {
  id : string;
  type: messageTypes.text | messageTypes.voice | messageTypes.video;
  message: string;
  creator: string;
}

/* Voice */
export interface VoiceItem {
  url: number;
  unique_id : string;
}

/* Data for choosing the contex */
export interface ContextValues {
  contextType: string;
  contextId: number;
  hologram: string;
}
