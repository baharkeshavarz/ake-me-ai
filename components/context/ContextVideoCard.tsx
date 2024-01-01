"use client"

import { HologramItem } from "@/types";
import VideoPlayer from "../shared/VideoPlayer";
import { Dispatch, SetStateAction, useState } from "react";
import WebcamVideo from "../shared/WebcamVideo";
import PulseLoading from "../shared/loader/PulseLoading";
import { roles } from "@/constants";
import { DeleteIcon } from "lucide-react";
import { deleterHologramByUniqueId } from "@/actions/get-holograms";
import toast from "react-hot-toast";

interface ContextVideoCardProps {
  items: HologramItem[];
  setHolograms: Dispatch<SetStateAction<HologramItem[]>>;
  changeHandler: (e: any) => void;
}

const ContextVideoCard = ({ items, setHolograms, changeHandler }: ContextVideoCardProps) => {
  const [videoId, setVideoId] = useState(items[0].unique_id || "");
  const [isCapturing, setIsCapturing] = useState(false);

  const handleUploadNew = () => {
    setIsCapturing(!isCapturing);
  }

  function playVideo(e:any, videoId: string){
    e.preventDefault()
    setVideoId(videoId)
  }

  const handleDeleterHologram = async(uniqueId: string) => {
    try {
      const response = await deleterHologramByUniqueId(uniqueId);
      if (response.ok) {
        const filteredHolograms = items.filter(hologram => hologram.unique_id !== uniqueId ? hologram : "");
        setHolograms([...filteredHolograms]);
        toast.success("فایل ویدثو حذف شد");
        setVideoId(items[0].unique_id || "");
      }
    } catch (error) {
      toast.error("توی حذف ویدثو مشکلی پیش اومده. دوباره تلاش کن");
    }
  }

  return (
     <>
        {isCapturing 
          ? <WebcamVideo setIsCapturing={setIsCapturing}  holograms={items} setHolograms={setHolograms}/>
          : (
              <div className="flex h-[300px] w-full">
                  {videoId && <VideoPlayer
                                   videoId={videoId} 
                                   width="100%"
                                   height="h-full"
                              />
                  } 
             </div>
          )
       }
      <div className="rtl-grid grid w-full grid-cols-1 gap-3 py-2 sm:grid-cols-4 lg:grid-cols-4">
        <button
            onClick={handleUploadNew}
            className="background-dark400_light900 text-light700_dark500 flex-center min-w-fit rounded-lg p-3 text-sm" 
         >
          {isCapturing && <PulseLoading color="white" size={16}/>}
          آپلود ویدیوی من
        </button> 
        {!isCapturing && (
            items.map((item) => (
              <div key={item.id} className="flex-center gap-x-1">
                 <button
                     onClick={(e)=>{
                       playVideo(e, item.unique_id);
                       changeHandler(e);
                     }}
                     id={`hologram-${item.id.toString()}`}
                     value={item.id}
                     className={`rounded-lg p-3
                         ${item.unique_id === videoId 
                           ? "background-dark400_light900 text-light700_dark500" 
                           : "background-light900_dark400 text-dark400_light900"}
                        `}   
                   >
                    {item.name}
                 </button>
                 {item.role === roles.USER && (
                            <button 
                               className="flex-center gap-x-1 rounded-lg bg-red-500 p-2 text-white hover:bg-red-500/80"
                               onClick={() => handleDeleterHologram(item.unique_id)}
                             >
                            <DeleteIcon/>
                             حذف
                          </button>
                 )}
              </div>
           ))
          )
        }
      </div>
    </>
  );
};

export default ContextVideoCard;
