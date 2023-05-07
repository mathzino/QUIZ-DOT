import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=" w-screen min-h-screen h-fit bg-blue-500 text-black py-4 ">
      {/* mobile screen */}
      <div className="    h-full min-h-[750px] mx-auto shadow-lg   rounded-md  max-w-sm  relative  bg-white">
        <div>{children}</div>
      </div>
      {/*  */}
    </div>
  );
}
