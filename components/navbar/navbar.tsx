import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();
  return (
    <nav className={styles.navContent}>
      <Link href="/" as="/" passHref>
        <a>
          <img src="/logo.png" alt="Goalfund" />
        </a>
      </Link>
      {!auth.user && (
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
      )}
      {auth.user && (
        <ul>
          <li>
            <Link href="/dashboard">
              <a>{auth.user.username}</a>
            </Link>
          </li>
          <li>
            <a onClick={() => auth.signOut()}>Ausloggen</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
