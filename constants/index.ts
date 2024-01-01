import { string } from "zod";
import { loginInfo } from "./login";

export const configInfo = {
  drawerLength: "266",
  systemLabel: "سیستم",
  userLabel: loginInfo[0].user.name,
};

export const roles = {
  SYSTEM: "system",
  USER: "user",
};

export const themes = {
  THEME_DARK: "dark",
  THEME_LIGHT: "light",
};

export const contexts = {
  faq: "faq",
  profile: "profile",
  hologram: "hologram",
};

export const messageTypes = {
  text: "text",
  voice: "voice",
  video: "video",
};

export const themesList = [
  {
    value: "light",
    label: "روشن",
    icon: "/assets/icons/sun.svg",
  },
  {
    value: "dark",
    label: "تاریک",
    icon: "/assets/icons/moon.svg",
  },
];

export const historyMessageList: any[] = [
  {
    id: "10",
    title: "دیروز",
    content: [
      {
        id: 100,
        message: "این یک متن تستی ست",
      },
    ],
  },
  {
    id: "2",
    title: "سه روز پیش",
    content: [
      {
        id: 101,
        message: "این یک متن تستی ست",
      },
      {
        id: 102,
        message: "این یک متن تستی ست",
      },
    ],
  },
  {
    id: "3",
    title: "مهرماه",
    content: [
      {
        id: 200,
        message: "این یک متن تستی ست",
      },
      {
        id: 201,
        message: "این یک متن تستی ست",
      },
    ],
  },
  {
    id: "4",
    title: "شهریورماه",
    content: [
      {
        id: 300,
        message: "این یک متن تستی ست",
      },
    ],
  },
];



