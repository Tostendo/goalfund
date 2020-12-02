import styles from "./layout.module.scss";

import React from "react";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Layout;
