import TypingAnimation from '@/components/messages/TypingAnimation'
import Logo from '@/components/shared/Logo'
import React from 'react'

const AskMe = () => {
  return (
    <div className="text-dark400_light900 flex justify-end px-5 py-3">
       <div className="flex-1 px-2">
          <div className="base-semibold pt-1 text-right">سیستم</div>
          <p className="py-1 text-right text-sm">
            <TypingAnimation text="بدون‌اینکه من درخبر باشم برای من حساب باز کردن وام گرفتن و تقربیا سه ماه پیش از حسابم برداشت بعداز تحقیق فهمیدم که سه فقره وام 50 میلیون تومانی گرفته بعداز این که فهمیدم بازرسی کرمان درمیان گذاشتم وچند روز پیش که خبر گرفتم به من گفتم تمام مدارک لازم هست که شما بودین وتعهد رو دادین وبازرس گفت چون شما از اون شرکت‌ اومدین بیرون شما دارین شکایت میکنید الان شما به من کمک میکنید که چیکار باید بکنم"/>
         </p>
       </div>
        <Logo width={30} height={30} />
    </div>
  )
}

export default AskMe
