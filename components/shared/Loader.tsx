"use client"
import { PulseLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
       <PulseLoader size={20} color="black" />
    </div>
  )
}

export default Loader