"use client";

import { API_URL } from '@/lib/axios';
import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoId: string;
  width: string;
  height: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, width, height }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, [videoId]);

  return (
    <video ref={videoRef} width={width} height={height} controls>
      <source
         src={`${API_URL}/download/hologram/${videoId}`} 
         type="video/mp4"
      />
      مرورگر شما از این فرمت ویدثو پشتیبانی نمی کند
    </video>
  );
};

export default VideoPlayer;
