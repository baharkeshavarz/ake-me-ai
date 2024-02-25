
export const configInfo = {
  drawerLength: "266",
  systemLabel: "سیستم",
  userLabel: "",
};

export const roles = {
  SYSTEM: "system",
  USER: "user",
};

export const userRoles = {
  LOGGEDIN: "loggedIn",
  GUEST: "guest",
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

export const contextLabels = [
  { context: "faq", label: "سوالات متداول"},
  { context: "profile", label: "پروفایل"},
  { context: "hologram", label: "هولوگرام"},
];

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


export const modelPrecision = [
  {
    value: 0,
    label: "دقیق اما باحوصله جواب بدم؟",
  },
  {
    value: 1,
    label: "دقتم رو بیارم پایین که زودتر جواب بدم؟",
  },
];

export const historyMessageList: any[] = [
  {
    id: "10",
    title: "دیروز",
    content: [
      {
        id: 100,
        message: "قرض الحسنه پس انداز",
      },
    ],
  },
  {
    id: "2",
    title: "سه روز پیش",
    content: [
      {
        id: 101,
        message: "صندوق اجاره ای",
      },
      {
        id: 102,
        message: "تسهیلات بانک ملی",
      },
    ],
  },
  {
    id: "3",
    title: "مهرماه",
    content: [
      {
        id: 200,
        message: "تسهیلات فروش اقساطی",
      },
    ],
  },
  {
    id: "4",
    title: "شهریورماه",
    content: [
      {
        id: 300,
        message: "سوالات متداول",
      },
      {
        id: 301,
        message: "سوالات متداول کارکنان",
      },
      {
        id: 302,
        message: "سوالات متداول کاربران بانک",
      },
    ],
  },
];
