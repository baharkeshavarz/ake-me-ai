"use client"

interface SpinningLoadingProsp {
  width?: string;
  height?: string;
}

const SpinningLoading = ({width="8", height="8"}: SpinningLoadingProsp) => {
  return (
    <div className="w-full flex-center">
       <div className={`w-${width} h-${height} animate-spin rounded-full border-2 border-gray-300 border-t-primary-500`}/>
    </div>
  )
}

export default SpinningLoading