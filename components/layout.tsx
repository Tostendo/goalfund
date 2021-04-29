import React from "react";
import { useRouter } from "next/router";

import Navbar from "./navbar";
import Footer from "./footer";

type LayoutProps = {
  children: any;
  inContainer?: boolean;
  preview?: boolean | null;
};

const Layout = ({ children, inContainer = true, preview }: LayoutProps) => {
  const router = useRouter();
  return (
    <div className="relative my-0 p-0 min-h-screen">
      {preview && (
        <div className="fixed z-50 w-32 px-4 py-1 font-bold text-white bg-red-800">
          <button
            onClick={() => {
              router.replace("/api/stopPreview");
            }}
          >
            Stop preview
          </button>
        </div>
      )}
      <div className="bg-primary px-8 shadow-lg lg:shadow-none">
        <Navbar />
      </div>
      <div className={inContainer ? "mx-auto max-w-screen-xl" : "mx-auto"}>
        <div className="pb-24 w-full">{children}</div>
      </div>
      <div className="bg-gray-500 px-8">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
