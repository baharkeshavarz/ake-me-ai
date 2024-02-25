"use client"

interface SpinningLoadingProsp {
  width?: string;
  height?: string;
  fullHeight?: boolean;
}

const SpinningLoading = ({width="8", height="8", fullHeight= false}: SpinningLoadingProsp) => {
  return (
    <div className={`flex-center ${fullHeight ? "min-h-screen" : ""}`}>
       <div className={`w-${width} h-${height} animate-spin rounded-full border-2 border-gray-300 border-t-primary-500`}/>
    </div>
  )
}

export default SpinningLoading