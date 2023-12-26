interface VoicePlayerProps {
     voiceUrl: string;
  }

const VoicePlayer = ({voiceUrl} : VoicePlayerProps) => {
  return (
    <div className="flex-center w-full">
       <figure className="w-full">
            <figcaption className="py-2 text-right text-sm">به فایل صوتی گوش دهید</figcaption>
                <audio 
                   controls 
                    src={voiceUrl}
                    className="w-full"
                >
                <a href="/animal.mp3">دانلود صدا </a>
             </audio>
         </figure>
    </div>
    )
}

export default VoicePlayer
