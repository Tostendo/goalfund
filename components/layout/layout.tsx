import styles from "./layout.module.scss";

import React from "react";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

type LayoutProps = {
  children: any;
  center?: boolean;
};

const Layout = ({ children, center }: LayoutProps) => (
  <div className={styles.container}>
    <Navbar />
    <div
      className={
        styles.content + " " + (center ? styles.center : "") + " u-full-width"
      }
    >
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
