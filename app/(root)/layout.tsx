import React from "react";
import LeftSidebar from "@/components/shared/LeftSidebar";
import MobileNav from "@/components/shared/navbar/MobileNav";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <main className="background-light800_dark400 relative">
      <div className="flex sm:hidden">
        <MobileNav />
      </div>
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col sm:px-14">
          <div className="mx-auto w-full max-w-4xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
