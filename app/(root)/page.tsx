import Messages from "@/components/messages/Messages";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <div className="sticky left-0 top-0 h-screen overflow-y-auto">
         <Messages/>
      </div>
    </div>
  );
}
