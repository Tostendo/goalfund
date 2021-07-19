import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import Icon from "./icon";
import SearchInput from "./searchInput";
import { usePlayers } from "../hooks/usePlayers";

const navItems = {
  loggedIn: [
    {
      label: "Top Lists",
      link: "/toplists",
      icon: null,
    },
    {
      label: "Charities",
      link: "/charities",
      icon: null,
    },
    {
      label: "Pledge",
      link: "/playerSearch",
      icon: null,
    },
    {
      label: "Account",
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
      label: "Top Lists",
      link: "/toplists",
      icon: null,
    },
    {
      label: "Charities",
      link: "/charities",
      icon: null,
    },
    {
      label: "Pledge",
      link: "/playerSearch",
      icon: null,
    },
    {
      label: "Login",
      link: "/login",
      icon: null,
    },
  ],
};

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const items = auth.user ? navItems.loggedIn : navItems.anonym;
  return (
    <nav className="py-2 flex items-center justify-between flex-wrap">
      <Link href="/" as="/" passHref>
        <a className="bg-secondary md:bg-white p-2 md:p-3 rounded-full">
          <img
            src="/logo.png"
            alt="Goalfund"
            className="h-4 hidden md:inline-block"
          />
          <img src="/img/logo_small.png" alt="GF" className="h-6 md:hidden" />
        </a>
      </Link>
      <div className="w-auto md:w-2/4">
        <SearchInput
          onSearch={(value) => router.push(`/playerSearch?s=${value}`)}
        />
      </div>
      <button
        onClick={() => setShow(!show)}
        className="rounded lg:hidden outline-none focus:outline-none"
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
                <Link href={item.link} passHref={false}>
                  <span
                    onClick={() => {
                      setShow(!show);
                      Router.push(item.link);
                    }}
                  >
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
