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
        <div className="h-6 w-6 text-primary">
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
                    {item.label && <a>{item.label}</a>}
                    {item.icon && (
                      <div className="h-6 w-6 text-primary cursor-pointer">
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
