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
  url: string;
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

export interface ChatFaqResponse {
  response: string;
  response_id : string;
}

export interface ChatProfile {
  profile_id: number;
  question : string;
}

export interface ChatProfileResponse {
  id : string;
  message: string;
}

/* Voice */
export interface Voice {
  text: number;
  gender : string;
}


/* Data for choosing the contex */
export interface ContextValues {
  faq: string;
  profile: string;
  hologram: string;
}





/* Messages */
export interface MessageItem {
  id: string;
  owner: string;
  message: string;
}
