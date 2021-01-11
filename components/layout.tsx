import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

type LayoutProps = {
  children: any;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="relative my-0 p-0 min-h-screen">
    <div className="bg-primary px-8 shadow-lg lg:shadow-none">
      <Navbar />
    </div>
    <div className="mx-auto max-w-screen-xl">
      <div className="pt-8 pb-24 w-full">{children}</div>
    </div>
    <div className="bg-gray-500 px-8">
      <Footer />
    </div>
  </div>
);

export default Layout;
