import React from 'react'
import Logo from '../Logo'

const NavUserInfo = () => {
  return (
    <div className="flex-center h-24 w-full gap-2 hover:rounded-lg hover:bg-dark-400">
      <Logo width={20} height={20} />
       <span className="text-light-850">Bahar Keshavarz</span>
     </div>
  )
}

export default NavUserInfo
