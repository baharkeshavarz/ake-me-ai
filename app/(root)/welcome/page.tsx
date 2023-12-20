import ContextSelector from '@/components/context/ContextSelector'
import Welcome from '@/components/Welcome'
import React from 'react'

const WelcomePage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Welcome/>
      <ContextSelector/>
    </div>
  )
}

export default WelcomePage
