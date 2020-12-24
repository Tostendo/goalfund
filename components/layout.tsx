import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

type LayoutProps = {
  children: any;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="relative my-0 mx-auto max-w-screen-xl py-0 px-8 min-h-screen">
    <Navbar />
    <div className="py-12 px-0 w-full">{children}</div>
    <Footer />
  </div>
);

export default Layout;
