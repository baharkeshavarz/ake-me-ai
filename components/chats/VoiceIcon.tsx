import React from "react";
import AudioRecorder from "../shared/AudioRecorder";

interface VoiceIconProps {
  setList: any;
}

const VoiceIcon = ({ setList }: VoiceIconProps) => {
  return (
    <div className="absolute left-12 top-0 z-35 h-[56px]">
       <AudioRecorder setList={setList} />
    </div>
  );
};

export default VoiceIcon;
