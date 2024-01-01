import React from 'react'
import AudioRecorder from '../shared/AudioRecorder'

const VoiceIcon = () => {
  return (
    <div className="absolute left-12 top-0 z-50 h-[56px]">
       <AudioRecorder />
    </div>
  )
}

export default VoiceIcon
