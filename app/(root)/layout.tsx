import React from "react";
import LeftSidebar from "@/components/shared/LeftSidebar";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <main className="bg-light-850 relative">
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
