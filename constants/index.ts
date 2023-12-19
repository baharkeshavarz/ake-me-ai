import { MessageItem } from "@/types";

export const themes = [
  {
    value: "light",
    label: "Light",
    icon: "/assets/icons/sun.svg",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "/assets/icons/moon.svg",
  },
  {
    value: "system",
    label: "System",
    icon: "/assets/icons/computer.svg",
  },
];

export const messageList: MessageItem[] = [
  {
    id: "1",
    owner: "من",
    message: "چگوه وام بگیرم؟",
  },
  {
    id: "2",
    owner: "سیستم",
    message: "اجرا قسط یک ماه را ندهیم و ماه بعد دوتا قسط را بدهیم مشکلی پیش میاد میشه جواب بدین",
  },
  {
    id: "3",
    owner: "سیستم",
    message: "بدون‌اینکه من درخبر باشم برای من حساب باز کردن وام گرفتن و تقربیا سه ماه پیش از حسابم برداشت \
    بعداز تحقیق فهمیدم که سه فقره وام 50 میلیون تومانی گرفته\
    بعداز این که فهمیدم بازرسی کرمان درمیان گذاشتم وچند روز پیش که خبر گرفتم به من گفتم تمام مدارک لازم هست که شما بودین وتعهد رو دادین\
    وبازرس گفت چون شما از اون شرکت‌ اومدین بیرون شما دارین شکایت میکنید\
    الان شما به من کمک میکنید که چیکار باید بکنم",
  },
  {
    id: "4",
    owner: "من",
    message: "کسر از حقوق ضامن بابت وام",
  },
  {
    id: "5",
    owner: "من",
    message: "دریافت وام ازدواج در صورت داشتن بدهی بانکی",
  }
];

