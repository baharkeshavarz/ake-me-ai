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









/* Messages */
export interface MessageItem {
  id: string;
  owner: string;
  message: string;
}


export type User = {
  id: number;
  name: string;
  email: string;
};