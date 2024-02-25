"use client"
import { configInfo } from "@/constants";
import Link from "next/link";
import { useParams } from "next/navigation";

interface NavbarMessageCardProps {
  title: string;
  // content: historyMessages[];
}

const NavbarMessageCard = ({ title }: NavbarMessageCardProps) => {
  const drawer = `lg:max-w-[${configInfo.drawerLength}px]`;
  const params = useParams();
  return (
    <div className="pt-5">
      <Link href={`/chat/${params.id}?q=${title}`}>
          <h4 className="text-light400_light500 w-full text-right text-[0.8rem]" style={{ maxWidth: `${configInfo.drawerLength}px` }}>
            {title}
          </h4>
      </Link>
      {/* <ul className="text-right">
        {content.map((item) => (
          <li key={item.id} className="small-semibold p-3 text-white">
            <Link href={`/chat/${item.id}`}>{item.message}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default NavbarMessageCard;
