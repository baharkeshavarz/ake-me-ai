import React from 'react'
import Logo from './shared/Logo'

const Welcome = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-2">
    <Logo
      width={23}
      height={23}
    />
    <h1 className="h1-bold text-dark500_light500">امروز چه جوری می تونم کمک کنم؟</h1>
  </div>
  )
}

export default Welcome
