import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();
  return (
    <nav className="my-4 mx-0 px-4 flex items-center justify-between">
      <Link href="/" as="/" passHref>
        <a>
          <img src="/logo.png" alt="Goalfund" className="h-4" />
        </a>
      </Link>
      <ul className="list-none mb-0">
        {!auth.user && (
          <li className="float-left uppercase">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        )}
        {!auth.user && (
          <li className="float-left uppercase ml-4">
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
        )}
        {auth.user && (
          <li className="float-left uppercase">
            <Link href="/search">
              <a>Players</a>
            </Link>
          </li>
        )}
        {auth.user && (
          <li className="float-left uppercase ml-4">
            <Link href="/dashboard">
              <a>My account</a>
            </Link>
          </li>
        )}
        {auth.user && (
          <li className="float-left uppercase ml-4">
            <a onClick={() => auth.signOut()}>Logout</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
