import React from 'react'
import AudioRecorder from '../shared/AudioRecorder'

interface VoiceIconProps {
  list: any,
  setList: any,
}

const VoiceIcon = ({list, setList}: VoiceIconProps) => {
  return (
    <div className="absolute left-12 top-0 z-50 h-[56px]">
       <AudioRecorder list={list} setList={setList}/>
    </div>
  )
}

export default VoiceIcon
