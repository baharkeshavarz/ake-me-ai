"use client"
import { PulseLoader } from 'react-spinners'

interface PulseLoadingProps {
  size?: number;
  color?: string;
}

const PulseLoading = ({ size= 18, color= "black"}: PulseLoadingProps) => {
  return (
    <div className="flex-center">
        <PulseLoader size={size} color={color} />
    </div>
  )
}

export default PulseLoading