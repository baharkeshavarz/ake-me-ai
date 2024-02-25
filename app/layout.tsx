import type { Metadata } from "next";
import "../styles/globals.css";
import React from "react";
import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: `دستیار هوشمند `,
  description: "Generated by SSL.ir",
  // icons: {
  //   icon: "/assets/images/site-logo.png",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative z-[99999]">
          <ToastProvider />
        </div>
        {children}
      </body>
    </html>
  );
}
