import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

type LayoutProps = {
  children: any;
  inContainer?: boolean;
};

const Layout = ({ children, inContainer = true }: LayoutProps) => (
  <div className="relative my-0 p-0 min-h-screen">
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

export default Layout;
