import { API_URL } from '@/lib/axios';
import React from 'react'

interface VoicePlayerProps {
    voiceId: string;
  }

const VoicePlayer = ({voiceId} : VoicePlayerProps) => {
  return (
    <div className="w-full flex-center">
       <figure className="w-full">
            <figcaption className="text-sm text-center py-2">به فایل صوتی گوش دهید</figcaption>
                <audio 
                   controls 
                    src={`${API_URL}/voice?text=${voiceId}&gender=woman`} 
                    className="w-full"
                >
                <a href="/animal.mp3">دانلود صدا </a>
             </audio>
         </figure>
    </div>
    )
}

export default VoicePlayer
