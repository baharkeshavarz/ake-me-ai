import Welcome from '@/components/Welcome'
import MessageButton from '@/components/messages/MessageButton'
import React from 'react'

const WelcomePage = async () => {
  return (
    <div className="flex h-screen flex-col px-3 py-5">
      <Welcome/>
      <MessageButton/>
    </div>
  )
}

export default WelcomePage
