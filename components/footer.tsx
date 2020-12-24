import React from "react";

const Footer = () => {
  return (
    <footer className="absolute w-full inset-x-0 bottom-0 h-12">
      <div className="my-0 mx-auto h-12 px-4 text-primary flex items-center justify-center">
        Powered by <img src="/logo.png" alt="Goalfund" className="h-4 ml-2" />
      </div>
    </footer>
  );
};

export default Footer;
