import { loginInfo } from '@/constants/login'
import React from 'react'

const NavUserInfo = () => {
  return (
    <div className="flex-center h-24 w-full gap-2 hover:rounded-lg hover:bg-dark-400">
       <div className="text-light-850">
          {loginInfo[0].user.name}
        </div>
       <div className="flex-center h-10 w-10 rounded-full bg-primary-500 p-1 text-[0.7rem]">
          {loginInfo[0].user.abbreviation}
        </div>
     </div>
  )
}

export default NavUserInfo
