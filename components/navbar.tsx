import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();
  const [show, setShow] = useState(false);
  return (
    <nav className="bg-white lg:bg-transparent shadow-lg lg:shadow-none lg:my-4 -mx-2 lg:mx-0 lg:px-4 px-6 flex items-center justify-between flex-wrap">
      <Link href="/" as="/" passHref>
        <a>
          <img src="/logo.png" alt="Goalfund" className="h-4" />
        </a>
      </Link>
      <button
        onClick={() => setShow(!show)}
        className="p-3 rounded lg:hidden ml-auto outline-none focus:outline-none"
      >
        <img src="/svg/menu.svg" className="h-6 w-6" />
      </button>
      <div
        className={
          !show ? "hidden lg:inline-flex" : "w-full lg:w-auto inline-flex"
        }
      >
        <ul className="list-none mb-0">
          {!auth.user && (
            <li className="lg:float-left w-full lg:w-auto my-1 uppercase">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {!auth.user && (
            <li className="lg:float-left w-full lg:w-auto my-1 uppercase ml-4">
              <Link href="/register">
                <a>Register</a>
              </Link>
            </li>
          )}
          {auth.user && (
            <li className="lg:float-left w-full lg:w-auto my-1 lg:m-0 uppercase">
              <Link href="/search">
                <a>Players</a>
              </Link>
            </li>
          )}
          {auth.user && (
            <li className="lg:float-left w-full lg:w-auto uppercase my-1 lg:m-0 lg:ml-4">
              <Link href="/dashboard">
                <a>My account</a>
              </Link>
            </li>
          )}
          {auth.user && (
            <li className="lg:float-left w-full lg:w-auto uppercase my-1 lg:m-0 lg:ml-4">
              <a onClick={() => auth.signOut()}>Logout</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
