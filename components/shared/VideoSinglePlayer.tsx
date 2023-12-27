"use client";

import { API_URL } from '@/lib/axios';
import React from 'react';

interface VideoSinglePlayerProps {
  videoId: string;
  width: string;
  height: string;
}

const VideoSinglePlayer: React.FC<VideoSinglePlayerProps> = ({ videoId, width, height }) => {
  return (
    <div className="flex h-[200px] w-full">
     <video  width={width} height={height} controls>
      <source
         src={`${API_URL}/video/${videoId}`} 
         type="video/mp4"
      />
      مرورگر شما از این فرمت ویدثو پشتیبانی نمی کند
    </video>
    </div>
  );
};

export default VideoSinglePlayer;
