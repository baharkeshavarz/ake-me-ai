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