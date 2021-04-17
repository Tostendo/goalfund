import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import Icon from "./icon";

const navItems = {
  loggedIn: [
    {
      label: "Players",
      link: "/playerSearch",
      icon: null,
    },
    {
      label: "My Account",
      link: "/dashboard",
      icon: null,
    },
    {
      icon: "logout",
      link: "/logout",
      label: null,
    },
  ],
  anonym: [
    {
      label: "Players",
      link: "/playerSearch",
      icon: null,
    },
    {
      label: "Login",
      link: "/login",
      icon: null,
    },
    {
      label: "Register",
      link: "/register",
      icon: null,
    },
  ],
};

const Navbar = () => {
  const auth = useAuth();
  const [show, setShow] = useState(false);
  const items = auth.user ? navItems.loggedIn : navItems.anonym;
  return (
    <nav className="py-2 lg:py-4 flex items-center justify-between flex-wrap">
      <Link href="/" as="/" passHref>
        <a className="bg-white p-2 rounded-lg">
          <img src="/logo.png" alt="Goalfund" className="h-4" />
        </a>
      </Link>
      <button
        onClick={() => setShow(!show)}
        className="p-3 rounded lg:hidden ml-auto outline-none focus:outline-none"
      >
        <div className="h-6 w-6 text-white">
          <Icon type="menu" />
        </div>
      </button>
      <div
        className={
          !show ? "hidden lg:inline-flex" : "w-full lg:w-auto inline-flex"
        }
      >
        <ul className="list-none mb-0">
          {items.map((item, index) => {
            var classes = "lg:float-left w-full lg:w-auto my-1";
            if (index != 0) {
              classes += " lg:ml-4";
            }
            return (
              <li key={`${item.label}+${index}`} className={classes}>
                <Link href={item.link}>
                  <span>
                    {item.label && (
                      <span className="cursor-pointer text-white hover:underline">
                        {item.label}
                      </span>
                    )}
                    {item.icon && (
                      <div className="h-6 w-6 text-white cursor-pointer">
                        <Icon type="logout" />
                      </div>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
