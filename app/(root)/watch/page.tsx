import VideoPlayer from "@/components/shared/VideoPlayer";
import React from "react";

const page = () => {
  const id = "mrannoshe_01.mp4";
  return <VideoPlayer videoId={id} width="100%" height="200px" />;
};

export default page;
