import React from "react";

import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContent}>
        Powered by <img src="/logo.png" alt="Goalfund" />
      </div>
    </footer>
  );
};

export default Footer;
