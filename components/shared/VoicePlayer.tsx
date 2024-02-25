interface VoicePlayerProps {
  voiceUrl: string;
}

const VoicePlayer = ({ voiceUrl }: VoicePlayerProps) => {
  return (
    <div className="flex-center flex-col w-full">
      <figure className="w-[100%]">
        <figcaption className="py-1 text-center text-[0.7rem]">
          به فایل صوتی گوش دهید
        </figcaption>
        <audio controls className="w-[100%] pt-4">
          <source src={voiceUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </figure>
    </div>
  );
};

export default VoicePlayer;
