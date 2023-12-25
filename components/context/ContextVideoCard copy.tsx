import { useEffect, useState } from 'react';
import { RadioGroupItem } from "@/path-to-modified-components";
import { Label } from "@/path-to-modified-components";

const ContextVideoCard = ({ items }: ContextVideoCardProps) => {
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const responses = await Promise.all(items.map(item => fetch(item.apiEndpoint)));
        const videoUrls = await Promise.all(responses.map(response => response.json()));
        setVideoUrls(videoUrls);
      } catch (error) {
        console.error('Error fetching video URLs', error);
      }
    };

    fetchVideoUrls();
  }, [items]);

  console.log("ContextVideoCard");

  return (
    <RadioGroup defaultValue={items[0].id.toString()}>
      <div className="rtl-grid grid w-full grid-cols-1 gap-4 pb-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.id} className="text-dark400_light900 w-full text-center">
            {videoUrls[index] && (
              <video style={{ width: "100%", height: "auto" }} controls>
                <source src={videoUrls[index].url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="flex-center gap-2 py-3">
              <RadioGroupItem
                value={item.id.toString()}
                id={`option-${item.id}`}
                className="text-blue-500"
              />
              <Label htmlFor={`option-${item.id}`} className="text-blue-500">
                {item.name}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ContextVideoCard;
