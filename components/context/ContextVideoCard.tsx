"use client"

import { HologramItem } from "@/types";
import VideoPlayer from "../shared/VideoPlayer";
import { useState } from "react";

interface ContextVideoCardProps {
  items: HologramItem[];
}

const ContextVideoCard = ({ items }: ContextVideoCardProps) => {
  const [videoId, setVideoId] = useState(items[0].url || "")

  function playVideo(e:any, videoId: string){
    e.preventDefault()
    setVideoId(videoId)
  }

  return (
     <>
      <div className="flex w-full h-[200px]">
          {videoId && <VideoPlayer
                             videoId={videoId} 
                             width="100%"
                             height="h-full"
                      />
          } 
      </div>
      <div className="rtl-grid grid w-full grid-cols-1 gap-4 py-2 sm:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
             <div key={item.id} className="text-center">
                <button
                    onClick={(e)=>{playVideo(e, item.url)}}
                    className={`p-3 rounded-lg
                        ${item.url === videoId ? "background-dark400_light900 text-light700_dark500 " : "background-light900_dark400 text-dark400_light900"}
                       `}   
                  >
                   {item.name}
                </button>
             </div>
          ))}
      </div>
    </>
  );
};

export default ContextVideoCard;
