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
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>Register</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
