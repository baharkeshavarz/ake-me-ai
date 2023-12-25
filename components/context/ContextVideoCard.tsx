import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API_URL } from "@/lib/axios";
import { HologramItem } from "@/types";
import axios from "axios";

interface ContextVideoCardProps {
  items: HologramItem[];
}

const ContextVideoCard = ({ items }: ContextVideoCardProps) => {
 console.log("ContextVideoCard");
 const videoId = 'mrannoshe_01.mp4'; // Replace with the actual video ID

 const playVideo = async () => {
   try {
    const response = await axios.get(`${API_URL}/download/${videoId}`);
    //  const response = await axios.get(`/api/stream/${videoId}`, {
    //   params: {
    //     id: videoId,
    //   },
    //    headers: {
    //      Range: 'bytes=0-', // You can adjust the range header as needed
    //    },
    //    responseType: 'blob', // Set responseType to 'blob' to handle binary data
    //  });

     // Assuming you have a video element in your component
     const videoElement = document.getElementById('videoPlayer');

     if (videoElement) {
      // videoElement.src = URL.createObjectURL(new Blob([response], { type: 'video/mp4' }));
      videoElement.src = response;
      // videoElement.play();
     }
   } catch (error) {
     console.error('Error fetching video stream', error);
   }
 };
   
  return (
    <RadioGroup defaultValue={items[0].id.toString()}>
      <div className="rtl-grid grid w-full grid-cols-1 gap-4 pb-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="text-dark400_light900 w-full text-center"
          >

{/* <div>
      <video id="videoPlayer" controls style={{ width: '100%' }}>
        Your browser does not support the video tag.
      </video>
      <button onClick={playVideo}>Play Video</button>
    </div> */}

            <video style={{ width: "100%", height: "100px" }} controls>
              <source src={`${API_URL}/download/$${item.url}`} type="video/mp4" />
                 Your browser does not support the video tag.
            </video>
            <div className="flex-center gap-2 py-3">
              <RadioGroupItem value={item.id.toString()} id={`option-${item.id}`} />
              <Label htmlFor={`option-${item.id}`}>{item.name}</Label>
            </div>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ContextVideoCard;
