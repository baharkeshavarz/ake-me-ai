import { historyMessages } from "@/types";
import Link from "next/link";

interface NavbarMessageCardProps {
  title: string;
  content: historyMessages[];
}

const NavbarMessageCard = ({ title, content }: NavbarMessageCardProps) => {
  console.log(content);
  return (
    <div className="pt-5">
      <h3 className="text-light400_light500 text-right">{title}</h3>
      <ul className="text-right">
        {content.map((item) => (
          <li key={item.id} className="small-semibold p-3 text-white">
            <Link href={`/chat/${item.id}`}>{item.message}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarMessageCard;
