// import Welcome from "@/components/Welcome";
import Messages from "@/components/messages/Messages";
import TypingAnimation from "@/components/messages/TypingAnimation";

export default function Home() {
  return (
    <div className="flex-center flex-col">
      <div className="sticky left-0 top-0 h-screen overflow-y-auto">
        <TypingAnimation text="بدون‌اینکه من درخبر باشم برای من حساب باز کردن وام گرفتن و تقربیا سه ماه پیش از حسابم برداشت بعداز تحقیق فهمیدم که سه فقره وام 50 میلیون تومانی گرفته بعداز این که فهمیدم بازرسی کرمان درمیان گذاشتم وچند روز پیش که خبر گرفتم به من گفتم تمام مدارک لازم هست که شما بودین وتعهد رو دادین وبازرس گفت چون شما از اون شرکت‌ اومدین بیرون شما دارین شکایت میکنید الان شما به من کمک میکنید که چیکار باید بکنم"/>
         {/* <Welcome/> */}
         <Messages/>
      </div>
    </div>
  );
}
