import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HologramItem } from "@/types";
import VideoPlayer from "../VideoPlayer";

interface ContextVideoCardProps {
  items: HologramItem[];
}

const ContextVideoCard = ({ items }: ContextVideoCardProps) => {
  return (
    <RadioGroup defaultValue={items[0].id.toString()} className="w-full">
      <div className="rtl-grid grid w-full grid-cols-1 gap-4 pb-1 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="text-dark400_light900 text-center">
            <VideoPlayer id={item.url} width="100%" height="150px" />
            <div className="flex-center gap-2 py-3">
              <RadioGroupItem
                value={item.id.toString()}
                id={`option-${item.id}`}
              />
              <Label htmlFor={`option-${item.id}`}>{item.name}</Label>
            </div>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ContextVideoCard;
