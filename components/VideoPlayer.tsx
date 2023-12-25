interface VideoPlayerProps {
  id: string;
  width: string;
  height: string;
}

const VideoPlayer = ({ id, width, height }: VideoPlayerProps) => {
  return (
    <video style={{ width, height }} controls>
      <source src={`/api/videos?videoId=${id}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
