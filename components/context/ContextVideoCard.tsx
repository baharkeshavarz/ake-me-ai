import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ContextVideoCardProps {
  items: any[];
}

const ContextVideoCard = ({ items }: ContextVideoCardProps) => {
  return (
    <RadioGroup defaultValue={items[0].id}>
      <div className="rtl-grid grid w-full grid-cols-1 gap-4 pb-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="text-dark400_light900 w-full text-center"
          >
            <video style={{ width: "100%", height: "200px" }} controls>
              <source src={"./hint.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex-center gap-2 py-3">
              <RadioGroupItem value={item.id} id={`option-${item.id}`} />
              <Label htmlFor={`option-${item.id}`}>{item.title}</Label>
            </div>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ContextVideoCard;
