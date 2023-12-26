import React from 'react'
import Logo from './shared/Logo'

const Welcome = () => {
  return (
    <div className="my-auto flex h-[600px] flex-col items-center justify-center gap-2">
      <Logo
        width={23}
        height={23}
      />
      <h1 className="md:h2-bold h3-bold text-dark500_light500 text-center">
         !ما ظرف چند دقیقه آینده به همه سوالاتت جواب می‌دیم. فقط کمی صبر کن. ازت بی‌نهایت ممنونیم
      </h1>
  </div>
  )
}

export default Welcome
