import React from "react";
import RightSidebar from "@/components/shared/RightSidebar";
import MobileNav from "@/components/shared/navbar/MobileNav";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <main className="background-light900_dark400 relative">
      <div className="flex sm:hidden">
        <MobileNav />
      </div>
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default Layout;
