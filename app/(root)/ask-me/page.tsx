"use client";

import TypingAnimation from "@/components/chats/TypingAnimation";
import Logo from "@/components/shared/Logo";
import React from "react";
import Error from "@/components/shared/Error";
import VoicePlayer from "@/components/shared/VoicePlayer";
import SpinningLoading from "@/components/shared/loader/SpinningLoading";
import PulseLoading from "@/components/shared/loader/PulseLoading";
import { configInfo } from "@/constants";
import toast from "react-hot-toast";

const AskMe = () => {
  return (
    <>
      <PulseLoading size={22} color="green" />
      <SpinningLoading />
      <div className="text-dark400_light900 flex justify-end px-5 py-3">
        <div className="flex-1 px-2">
          <div className="base-semibold pt-1 text-right">
            {configInfo.systemLabel}
          </div>
          <p className="py-1 text-right text-sm">
            <TypingAnimation text="بدون‌اینکه من درخبر باشم برای من حساب باز کردن وام گرفتن و تقربیا سه ماه پیش از حسابم برداشت بعداز تحقیق فهمیدم که سه فقره وام 50 میلیون تومانی گرفته بعداز این که فهمیدم بازرسی کرمان درمیان گذاشتم وچند روز پیش که خبر گرفتم به من گفتم تمام مدارک لازم هست که شما بودین وتعهد رو دادین وبازرس گفت چون شما از اون شرکت‌ اومدین بیرون شما دارین شکایت میکنید الان شما به من کمک میکنید که چیکار باید بکنم" />
          </p>
        </div>
        <div>
          <Logo width={100} height={100} />
        </div>
      </div>

      <Error message="خطایی رخ داده است" />
      <VoicePlayer voiceUrl="" />

      <div className="text-dark400_light900 flex justify-end px-5 py-3">
        <div className="flex-1 px-2">
          <div className="base-semibold pt-1 text-right">
            {configInfo.systemLabel}
          </div>
          <p className="py-1 text-right text-sm">
            <video style={{ width: "100%", height: "200px" }} controls>
              <source src={"./hint.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </p>
        </div>
        <div>
          <Logo width={30} height={30} />
        </div>
      </div>

      {/* <div className="text-dark400_light900 flex justify-end px-5 py-3">
       <div className="flex-1 px-2">
          <div className="base-semibold pt-1 text-right">سیستم</div>
          <p className="py-1 text-right text-sm">
          <AudioPlayer src="https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3" />
         </p>
       </div>
        <div>      
         <Logo width={30} height={30} />
        </div>
    </div> */}
    </>
  );
};

export default AskMe;
