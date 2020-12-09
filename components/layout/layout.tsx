import styles from "./layout.module.scss";

import React from "react";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Navbar />
    <div className={styles.content + " " + styles.center + " u-full-width"}>
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
