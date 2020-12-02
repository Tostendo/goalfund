import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navContent}>
      <Link href="/" as="/" passHref>
        <a>
          <img src="/logo.png" alt="Goalfund" />
        </a>
      </Link>
      <ul>
        <li>
          <a>Sign In</a>
        </li>
        <li>
          <a>Register</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
