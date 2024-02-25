"use client";

import { useMessageContext } from '@/hooks/useMessageContext';
import { API_URL } from '@/lib/axios';
import React from 'react';

interface VideoSinglePlayerProps {
  videoId: string;
  width: string;
  height: string;
}

const VideoSinglePlayer: React.FC<VideoSinglePlayerProps> = ({ videoId, width, height }) => {
  const { contextValues } = useMessageContext();

  return (
    <div className="flex h-[150px] w-full">
     <video  width={width} height={height} controls>
      <source
         src={`${API_URL}/video/${videoId}?hologram=${contextValues.hologram}`} 
         type="video/mp4"
      />
      مرورگر شما از این فرمت ویدثو پشتیبانی نمی کند
    </video>
    </div>
  );
};

export default VideoSinglePlayer;
