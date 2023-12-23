import React from 'react'
import Logo from './shared/Logo'

const Welcome = () => {
  return (
    <div className="my-auto flex flex-col items-center justify-center gap-2">
      <Logo
        width={23}
        height={23}
      />
      <h1 className="sm:h1-bold h3-bold text-dark500_light500">
        امروز چه جوری می تونم کمک کنم؟
      </h1>
  </div>
  )
}

export default Welcome
