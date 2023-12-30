import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <main className="relative bg-white">
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
