import React from 'react'
import NavbarMessageCard from './NavbarMessageCard'
import { historyMessageList } from '@/constants'

const NavbarMessageList = () => {
  return (
    <div className="custom-scrollbar flex flex-col overflow-y-auto text-sm">
       <div className="h-[500px]">
          { historyMessageList.map((item, index) => 
              <NavbarMessageCard
                key={index}
                title={item.title} 
                messages={item.messages}
             />
           )}
       </div>
     </div>
  )
}

export default NavbarMessageList
