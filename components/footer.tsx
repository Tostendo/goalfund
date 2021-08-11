import React from "react";
import Link from "next/link";
import Icon from "./icon";

const Footer = () => {
  return (
    <footer className="absolute w-full inset-x-0 bottom-0 h-16">
      <div className="mx-auto h-16 px-4 text-primary flex items-center justify-between">
        <img src="/logo.png" alt="Goalfund" className="h-3" />
        <div className="flex items-center justify-center gap-4">
          <Link href="mailto:feedback@goalfund.de">Contact</Link>
          <Link href="https://www.instagram.com/goal_fund/">
            <div className="h-6 w-6 cursor-pointer">
              <Icon type="instagram" />
            </div>
          </Link>
          <Link href="/about-us">About</Link>
        </div>
        <span>© 2021 Goalfund</span>
      </div>
    </footer>
  );
};

export default Footer;
